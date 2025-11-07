import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriberSchema, insertContactSubmissionSchema, insertResourceLeadSchema, insertPricebookOptimizationSchema, insertCoursePurchaseSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { getUncachableResendClient } from "./resend-client";
import OpenAI from "openai";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";
import path from "path";
import fs from "fs";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

// Admin middleware
const isAdmin = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const userId = req.user.claims.sub;
    const user = await storage.getUser(userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    
    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ message: "Failed to verify admin status" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // 301 Redirects for old Thinkific URL patterns
  // This preserves SEO when migrating from servicetitanhacks.com (Thinkific) to new site
  app.use((req, res, next) => {
    const redirectMap: { [key: string]: string } = {
      '/pages/servicetitan-hacks-partners': '/partners',
      '/pages/servicetitan-hacks-products': '/tools',
      '/collections/free-resources': '/resources',
      '/bundles/servicetitan-hacks-all-access-pass': '/all-access',
    };

    // Redirect old partner/products pages to new URLs
    if (redirectMap[req.path]) {
      return res.redirect(301, redirectMap[req.path]);
    }

    // Redirect login attempts to Thinkific course platform
    if (req.path === '/users/sign_in') {
      return res.redirect(301, 'https://servicetitanhacks.thinkific.com/users/sign_in');
    }

    // Redirect course collections to Thinkific subdomain
    if (req.path === '/collections/courses') {
      return res.redirect(301, 'https://servicetitanhacks.thinkific.com/collections/courses');
    }

    // Redirect individual course product pages to Thinkific
    if (req.path.startsWith('/products/courses/')) {
      const coursePath = req.path.replace('/products/courses/', '');
      return res.redirect(301, `https://servicetitanhacks.thinkific.com/products/courses/${coursePath}`);
    }

    next();
  });

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Stripe payment intent endpoint for Dashboard Course
  app.post("/api/create-payment-intent", isAuthenticated, async (req: any, res) => {
    try {
      const { courseId, amount } = req.body;
      const userId = req.user.claims.sub;
      
      // Verify user hasn't already purchased the course
      const alreadyPurchased = await storage.hasUserPurchasedCourse(userId, courseId);
      if (alreadyPurchased) {
        return res.status(400).json({ message: "You have already purchased this course" });
      }

      // Map course IDs to Stripe product IDs
      const courseProductMap: { [key: string]: string } = {
        "dashboard-course": "prod_S3xE9uvAR1cqPN",
      };

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          userId,
          courseId,
          productId: courseProductMap[courseId] || "",
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook to handle successful payments
  app.post("/api/stripe-webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const { userId, courseId } = paymentIntent.metadata;

        if (userId && courseId) {
          await storage.createCoursePurchase({
            userId,
            courseId,
            amount: paymentIntent.amount,
            stripePaymentIntentId: paymentIntent.id,
          });
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });

  // Check if user has purchased a course
  app.get("/api/course-access/:courseId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { courseId } = req.params;
      
      const hasAccess = await storage.hasUserPurchasedCourse(userId, courseId);
      res.json({ hasAccess });
    } catch (error) {
      console.error("Error checking course access:", error);
      res.status(500).json({ message: "Failed to check course access" });
    }
  });

  // Get user's course purchases
  app.get("/api/my-courses", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const purchases = await storage.getUserCoursePurchases(userId);
      res.json(purchases);
    } catch (error) {
      console.error("Error fetching user courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Admin: Get all users with their course purchases
  app.get("/api/admin/users", isAdmin, async (req: any, res) => {
    try {
      const users = await storage.getAllUsersWithPurchases();
      res.json(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Admin: Toggle user admin status
  app.patch("/api/admin/users/:userId/admin", isAdmin, async (req: any, res) => {
    try {
      const { userId } = req.params;
      const { isAdmin: newAdminStatus } = req.body;
      
      if (typeof newAdminStatus !== 'boolean') {
        return res.status(400).json({ message: "isAdmin must be a boolean" });
      }
      
      await storage.updateUserAdminStatus(userId, newAdminStatus);
      res.json({ message: "User admin status updated successfully" });
    } catch (error) {
      console.error("Error updating user admin status:", error);
      res.status(500).json({ message: "Failed to update admin status" });
    }
  });

  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertEmailSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getEmailSubscriberByEmail(data.email);
      if (existing) {
        return res.status(400).json({ 
          message: "This email is already subscribed." 
        });
      }

      const subscriber = await storage.createEmailSubscriber(data);
      
      res.status(201).json({ 
        message: "Successfully subscribed!",
        subscriber: { id: subscriber.id, email: subscriber.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Email subscription error:", error);
      res.status(500).json({ 
        message: "Failed to subscribe. Please try again." 
      });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSubmissionSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission(data);
      
      // Send email notification to bill@st-hacks.com with form data
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          id: submission.id,
          name: submission.name,
          email: submission.email,
          company: submission.company,
          role: submission.role,
          message: submission.message,
          consent: submission.consent,
          submittedAt: submission.submittedAt
        };

        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Contact Form Submission',
          html: `
            <h2>New Contact Form Submission</h2>
            <p>A new contact form has been submitted:</p>
            <pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">
${JSON.stringify(jsonData, null, 2)}
            </pre>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json({ 
        message: "Message sent successfully! We'll get back to you within 24 hours.",
        submission: { id: submission.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Failed to send message. Please try again." 
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        message: "Failed to fetch submissions." 
      });
    }
  });

  // Resource lead capture endpoint
  app.post("/api/resource-leads", async (req, res) => {
    try {
      const data = insertResourceLeadSchema.parse(req.body);
      
      const lead = await storage.createResourceLead(data);
      
      // Send email notification to admin
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: `New Resource Download: ${data.resourceName}`,
          html: `
            <h2>New Resource Download</h2>
            <p><strong>Resource:</strong> ${data.resourceName}</p>
            <p><strong>Name:</strong> ${data.firstName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
        // Don't fail the request if email fails
      }
      
      // Send resource to user via email for specific resources
      if (data.resourceName === "Automation Playbook: Zapier + Wink") {
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          // Read the PDF file
          const pdfPath = path.join(process.cwd(), 'public', 'downloads', 'automation-playbook-zapier-wink.pdf');
          const pdfBuffer = fs.readFileSync(pdfPath);
          const pdfBase64 = pdfBuffer.toString('base64');
          
          await client.emails.send({
            from: fromEmail,
            to: data.email,
            subject: '🎉 Your Automation Playbook: Zapier + Wink is Ready!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ED254E;">Hi ${data.firstName}!</h2>
                <p>Thanks for downloading the <strong>Automation Playbook: Zapier + Wink</strong>!</p>
                <p>Your free guide is attached to this email. Here's what you'll learn:</p>
                <ul style="line-height: 1.8;">
                  <li>When to use Zapier vs Wink for maximum efficiency</li>
                  <li>How to combine both tools for hybrid workflows</li>
                  <li>Setup tips and best practices</li>
                  <li>Example automation stacks for ServiceTitan contractors</li>
                </ul>
                <p style="margin-top: 30px;">
                  <strong>Want to learn more?</strong><br>
                  Check out our <a href="https://servicetitanhacks.com/resources" style="color: #ED254E;">free resources</a> 
                  and join 9,500+ contractors in our <a href="https://go.st-hacks.cc/servicetitanhacks" style="color: #ED254E;">Facebook community</a>.
                </p>
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  Questions? Reply to this email anytime!<br>
                  - The ServiceTitan Hacks Team
                </p>
              </div>
            `,
            attachments: [
              {
                filename: 'automation-playbook-zapier-wink.pdf',
                content: pdfBase64,
              },
            ],
          });
        } catch (emailError) {
          console.error("Failed to send resource email to user:", emailError);
          // Still return success to user even if email fails
        }
      }
      
      res.status(201).json({ 
        message: "Success! Check your email for the download link.",
        lead: { id: lead.id },
        shouldCheckEmail: data.resourceName === "Automation Playbook: Zapier + Wink"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Resource lead error:", error);
      res.status(500).json({ 
        message: "Failed to process request. Please try again." 
      });
    }
  });

  // Get all resource leads (for admin purposes)
  app.get("/api/resource-leads", async (req, res) => {
    try {
      const leads = await storage.getAllResourceLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching resource leads:", error);
      res.status(500).json({ 
        message: "Failed to fetch leads." 
      });
    }
  });

  // Pricebook optimization request endpoint
  app.post("/api/pricebook-optimization", async (req, res) => {
    try {
      const data = insertPricebookOptimizationSchema.parse(req.body);
      
      // Initialize OpenAI client with Replit AI Integrations
      const openai = new OpenAI({
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      });

      // Prepare the category for the prompt
      const category = data.category === "OTHER" && data.otherCategory 
        ? data.otherCategory 
        : data.category;

      // Create prompt for ChatGPT
      const systemPrompt = `You are an AI assistant that rewrites **technical product or service descriptions** into **clear, confident, and value-driven language** for **homeowners**.
Your goal is to help contractors communicate expertise and build trust by focusing on **quality, reliability, comfort, safety, efficiency, and long-term value**.

**CRITICAL RULE:** NEVER minimize the work or describe it as simple, easy, quick, or basic. The purpose is to BUILD VALUE for the homeowner, and minimizing the work takes away that value.

---

### **Instructions**

**1. Build Value Without Minimizing the Work**

* Remove technical jargon but maintain a tone of professional expertise and craftsmanship.
* NEVER use words like: *simple*, *easy*, *quick*, *basic*, *straightforward*, *just*, or *merely*.
* Focus on the skill, precision, care, and expertise required to do the work correctly.
* Emphasize the importance and value of professional-quality work.

**2. Write at an 8th Grade Reading Level**

* Use clear, everyday language that any homeowner can understand.
* Keep sentences short and direct (15-20 words maximum).
* Avoid complex vocabulary and technical terms.
* Use familiar words instead of fancy alternatives.

**3. Emphasize Homeowner Benefits**

* Explain how the service improves home comfort, safety, performance, and efficiency.
* Highlight durability, quality workmanship, and long-term peace of mind.
* Focus on protecting their investment and family.

**4. Personalize the Message**

* Use relatable scenarios that show how the service solves real problems or prevents future issues.
* Avoid sales pressure or calls to action—this copy will be used by technicians in person.
* Connect the work directly to the homeowner's needs and concerns.

**5. Highlight What Makes It Superior**

* Explain what makes this service valuable—quality materials, proven methods, professional expertise.
* Show how proper work prevents costly problems down the road.
* Emphasize the peace of mind that comes with professional service.

---

### **Formatting Rules (Plain Text Output) - MANDATORY**

**REQUIRED STRUCTURE:**
1. Start with an introductory paragraph (2-4 sentences) that explains what's being done and why it matters
2. Leave a blank line
3. Follow with 3-4 bullet points using the • character (NOT HTML tags)
4. Each bullet point should be a short, clear phrase or sentence highlighting key features/benefits

**Plain Text Format:**
* Use plain text only - NO HTML tags at all
* Use the • character (bullet point) for list items
* Do NOT use <b>, <strong>, <ul>, <li>, <br>, or any other HTML tags
* Do NOT include prices in the output
* Write naturally like you're explaining to a neighbor

**Example Format:**
We replace the failing fan motor and blade with properly matched, weather-rated parts, then set rotation, balance, and clearances to factory specs. This restores airflow, protects the compressor from overheating, and improves cooling efficiency and noise levels—especially during heat waves.
•Correct motor, blade, and capacitor pairing
•Precision balancing to reduce vibration
•Sealed bearings for durability
•Airflow and amp-draw verification

---

### **Length Rules**

* **Maximum 125 words total** (including intro and all bullet points)
* **3-4 bullet points** for all services (regardless of size)
* Each bullet point should be 1-2 sentences maximum

---

**Goal:**
Produce a professional, confident, homeowner-friendly explanation in BULLET POINT FORMAT at an 8th grade reading level that BUILDS VALUE, demonstrates expertise, and justifies the importance of quality professional work. Never minimize or simplify the work being done.`;

      const userPrompt = `Service Category: ${category}

Current Technical Description:
${data.currentDescription}

Please rewrite this service description following the instructions above.`;

      // Call ChatGPT
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const optimizedDescription = completion.choices[0]?.message?.content || "";

      // Store the optimization request with the result
      const optimization = await storage.createPricebookOptimization(data);
      
      // Send email notification to bill@st-hacks.com with JSON data including the AI result
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          id: optimization.id,
          category: optimization.category,
          otherCategory: optimization.otherCategory,
          currentDescription: optimization.currentDescription,
          optimizedDescription: optimizedDescription,
          firstName: optimization.firstName,
          lastName: optimization.lastName,
          email: optimization.email,
          submittedAt: optimization.submittedAt
        };

        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Pricebook Optimization Request',
          html: `
            <h2>New Pricebook Optimization Request</h2>
            <p>A new pricebook optimization request has been submitted:</p>
            <pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">
${JSON.stringify(jsonData, null, 2)}
            </pre>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json({ 
        message: "Success! Here's your optimized description:",
        optimization: { 
          id: optimization.id,
          optimizedDescription: optimizedDescription,
          originalDescription: data.currentDescription,
          category: category
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Pricebook optimization error:", error);
      res.status(500).json({ 
        message: "Failed to process request. Please try again." 
      });
    }
  });

  // Get all pricebook optimizations (for admin purposes)
  app.get("/api/pricebook-optimization", async (req, res) => {
    try {
      const optimizations = await storage.getAllPricebookOptimizations();
      res.json(optimizations);
    } catch (error) {
      console.error("Error fetching pricebook optimizations:", error);
      res.status(500).json({ 
        message: "Failed to fetch optimizations." 
      });
    }
  });

  // Download routes for resources
  app.get('/downloads/LTV-Analysis-Prompt.docx', (req, res) => {
    const filePath = path.join(import.meta.dirname, '..', 'attached_assets', 'LTV Analysis Prompt_1761917880987.docx');
    res.download(filePath, 'LTV-Analysis-Prompt.docx', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  });

  // Sitemap XML for SEO
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://servicetitanhacks.com";
    const currentDate = new Date().toISOString().split('T')[0];
    
    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "daily" },
      { url: "/about", priority: "0.7", changefreq: "monthly" },
      { url: "/contact", priority: "0.7", changefreq: "monthly" },
      { url: "/partners", priority: "0.8", changefreq: "weekly" },
      { url: "/all-access", priority: "0.9", changefreq: "weekly" },
      { url: "/tools", priority: "0.8", changefreq: "weekly" },
      { url: "/pricebook-optimizer", priority: "0.8", changefreq: "weekly" },
      { url: "/resources", priority: "0.7", changefreq: "weekly" },
      { url: "/purchasing-platform", priority: "0.8", changefreq: "weekly" },
      { url: "/blog", priority: "0.9", changefreq: "daily" },
      { url: "/podcast", priority: "0.7", changefreq: "weekly" },
      { url: "/courses", priority: "0.9", changefreq: "weekly" },
      { url: "/dashboard-course", priority: "0.8", changefreq: "monthly" },
      { url: "/fix-ugly-forms-course", priority: "0.8", changefreq: "monthly" },
    ];

    const blogPosts = [
      { slug: "stop-selling-other-peoples-equipment-build-your-brand", date: "2025-01-22" },
      { slug: "dmaic-process-improvement-framework", date: "2025-01-20" },
      { slug: "should-i-switch-to-servicetitan", date: "2025-01-18" },
      { slug: "ai-automation-contractors-where-to-start", date: "2025-01-15" },
      { slug: "double-booking-rate-better-forms", date: "2025-01-10" },
      { slug: "servicetitan-dashboard-metrics", date: "2025-01-05" },
      { slug: "ultimate-guide-automating-follow-up-calls", date: "2024-12-28" },
      { slug: "top-servicetitan-integrations-2025", date: "2024-12-20" },
      { slug: "convert-more-leads-better-website", date: "2024-12-15" },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Robots.txt for SEO
  app.get("/robots.txt", (req, res) => {
    const baseUrl = "https://servicetitanhacks.com";
    
    const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Directories
Allow: /courses
Allow: /tools
Allow: /resources
Allow: /partners
Allow: /blog
Allow: /podcast

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
`;

    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);

  return httpServer;
}
