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

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

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
      
      // Send email notification to bill@st-hacks.com with resource download info
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: data.resourceName,
          html: `
            <h2>New Resource Download</h2>
            <p><strong>Resource:</strong> ${data.resourceName}</p>
            <p><strong>Name:</strong> ${data.firstName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json({ 
        message: "Success! You can now download the resource.",
        lead: { id: lead.id }
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

  const httpServer = createServer(app);

  return httpServer;
}
