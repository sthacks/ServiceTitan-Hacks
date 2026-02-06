import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriberSchema, insertContactSubmissionSchema, insertResourceLeadSchema, insertPricebookOptimizationSchema, insertCoursePurchaseSchema, insertWinkDemoSubmissionSchema, insertSmartACDemoSubmissionSchema, insertContractorCommerceDemoSubmissionSchema, insertLiveswitchDemoSubmissionSchema, insertSmartACROISubmissionSchema, insertWinkROISubmissionSchema, insertHiringROISubmissionSchema, insertPhoneTapWaitlistSchema, insertReplayAccessSchema, insertPartnerCompanySchema, insertPartnerUserSchema, insertPartnerCampaignMetricSchema, insertPartnerContentCalendarSchema, insertPartnerBrandAssetSchema } from "@shared/schema";
import { randomUUID } from "crypto";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { getUncachableResendClient } from "./resend-client";
import { sendEmail, getBuyingGroupConfirmationEmail } from "./smtp-client";
import OpenAI from "openai";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Stripe from "stripe";
import path from "path";
import fs from "fs";
import { addOrUpdateSubscriber, getCampaignReports, getAggregateStats, getListGrowth, isMailchimpConfigured } from "./mailchimp";

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

// Master admin email - Bill
const MASTER_ADMIN_EMAIL = 'bill@st-hacks.com';

// Partner Portal middleware - checks if user is a master admin
const isMasterAdmin = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const claims = req.user.claims;
    const userId = claims.sub;
    const userEmail = claims.email;
    
    console.log(`[Partner Portal] Checking master admin for userId: ${userId}, email: ${userEmail}`);
    
    let partnerUser = await storage.getPartnerUser(userId);
    
    // Auto-create master admin for Bill (case-insensitive email check)
    if (!partnerUser && userEmail?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) {
      // Ensure user exists in users table first (foreign key requirement)
      await storage.upsertUser({
        id: userId,
        email: userEmail,
        firstName: claims.first_name,
        lastName: claims.last_name,
        profileImageUrl: claims.profile_image_url,
      });
      
      partnerUser = await storage.createPartnerUser({
        userId,
        companyId: null,
        role: 'master_admin'
      });
      console.log(`[Partner Portal] Auto-created master admin for ${userEmail}`);
    }
    
    if (!partnerUser || partnerUser.role !== 'master_admin') {
      console.log(`[Partner Portal] Access denied for ${userEmail}. partnerUser:`, partnerUser);
      return res.status(403).json({ message: "Forbidden: Master admin access required" });
    }
    
    req.partnerUser = partnerUser;
    next();
  } catch (error) {
    console.error("Error checking master admin status:", error);
    res.status(500).json({ message: "Failed to verify master admin status" });
  }
};

// Partner Portal middleware - checks if user is an account admin or master admin
const isAccountAdmin = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const userId = req.user.claims.sub;
    const partnerUser = await storage.getPartnerUser(userId);
    
    if (!partnerUser || (partnerUser.role !== 'account_admin' && partnerUser.role !== 'master_admin')) {
      return res.status(403).json({ message: "Forbidden: Account admin access required" });
    }
    
    req.partnerUser = partnerUser;
    next();
  } catch (error) {
    console.error("Error checking account admin status:", error);
    res.status(500).json({ message: "Failed to verify account admin status" });
  }
};

// Partner Portal middleware - checks if user has any partner role
const isPartnerUser = async (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const userId = req.user.claims.sub;
    const partnerUser = await storage.getPartnerUser(userId);
    
    if (!partnerUser) {
      return res.status(403).json({ message: "Forbidden: Partner access required" });
    }
    
    req.partnerUser = partnerUser;
    next();
  } catch (error) {
    console.error("Error checking partner user status:", error);
    res.status(500).json({ message: "Failed to verify partner status" });
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
      '/pages/servicetitan-hacks-products': '/apps',
      '/collections/free-resources': '/resources',
      '/bundles/servicetitan-hacks-all-access-pass': '/all-access',
      '/webinar/upfront-pricing': '/webinar/price-conversation',
    };

    // Redirect old partner/products pages to new URLs
    if (redirectMap[req.path]) {
      return res.redirect(301, redirectMap[req.path]);
    }

    // Redirect login attempts to Thinkific course platform
    if (req.path === '/users/sign_in') {
      return res.redirect(301, 'https://servicetitanhacks.thinkific.com/users/sign_in');
    }

    // Redirect /login to /api/login for Replit Auth
    if (req.path === '/login') {
      return res.redirect(302, '/api/login');
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
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        tags: ["Newsletter", "Website Signup"]
      });
      
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
      
      // Sync to Mailchimp
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      await addOrUpdateSubscriber({
        email: data.email,
        firstName,
        lastName,
        companyName: data.company || undefined,
        tags: ["Contact Form", "Website Lead", "no welcome workflow"]
      });
      
      // Send email notification to bill@st-hacks.com with form data in JSON format
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        // Parse name parts and equipment buying group fields from message if applicable
        const nameParts = submission.name.trim().split(' ');
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(' ') || "";
        
        let phoneNumber = "";
        let additionalFields: Record<string, any> = {};
        
        if (submission.role === "Equipment Buying Group Inquiry") {
          // Parse structured fields from message
          const phoneMatch = submission.message.match(/Phone:\s*(.+)/);
          const websiteMatch = submission.message.match(/Company Website:\s*(.+)/);
          const licenseMatch = submission.message.match(/Contractor License #:\s*(.+)/);
          const authorityMatch = submission.message.match(/Issuing Authority:\s*(.+)/);
          
          phoneNumber = phoneMatch ? phoneMatch[1].trim() : "";
          additionalFields = {
            companyWebsite: websiteMatch ? websiteMatch[1].trim() : null,
            contractorLicense: licenseMatch ? licenseMatch[1].trim() : null,
            issuingAuthority: authorityMatch ? authorityMatch[1].trim() : null
          };
        } else {
          additionalFields = { message: submission.message };
        }
        
        const jsonPayload = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "CONTACT_FORM",
          formName: "Contact Form",
          firstName,
          lastName,
          phoneNumber,
          email: submission.email,
          submittedAt: submission.submittedAt,
          company: submission.company || null,
          role: submission.role || null,
          ...additionalFields
        };
        
        const jsonData = JSON.stringify(jsonPayload, null, 2);

        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          replyTo: submission.email,
          subject: `New Contact Form: ${submission.name}`,
          html: `<pre style="font-family: monospace; background-color: #f4f4f5; padding: 20px; border-radius: 8px; white-space: pre-wrap;">${jsonData}</pre>`,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
      
      // Send confirmation email for Equipment Buying Group submissions via Google SMTP
      if (data.role === "Equipment Buying Group Inquiry") {
        try {
          const firstName = data.name.trim().split(' ')[0] || 'there';
          await sendEmail({
            to: data.email,
            subject: "Your Equipment Buying Group Request - Pending Approval",
            html: getBuyingGroupConfirmationEmail(firstName),
          });
          console.log(`Buying group confirmation email sent to ${data.email}`);
        } catch (smtpError) {
          console.error("Failed to send SMTP confirmation email:", smtpError);
          // Don't fail the request if email fails
        }
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

  // Giveaway newsletter signup endpoint
  app.post("/api/giveaway", async (req, res) => {
    try {
      const { firstName, lastName, email, companyName } = req.body;
      
      if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
        return res.status(400).json({ 
          message: "Please provide your first name." 
        });
      }
      
      if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
        return res.status(400).json({ 
          message: "Please provide your last name." 
        });
      }
      
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ 
          message: "Please provide a valid email address." 
        });
      }

      // Add or update subscriber in Mailchimp
      const mailchimpResult = await addOrUpdateSubscriber({
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        companyName: companyName ? companyName.trim() : undefined,
        tags: ["Giveaway Entry", "Newsletter", "no welcome workflow"]
      });

      if (!mailchimpResult.success) {
        console.error("Mailchimp sync failed:", mailchimpResult.message);
      }

      // Send email notification to admin with JSON data
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "GIVEAWAY",
          formName: "Newsletter Giveaway",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phoneNumber: "",
          email: email.trim(),
          submittedAt: new Date().toISOString(),
          companyName: companyName ? companyName.trim() : null,
          mailchimpSynced: mailchimpResult.success
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Newsletter Giveaway Entry',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send giveaway notification:", emailError);
        return res.status(500).json({ 
          message: "Failed to process entry. Please try again." 
        });
      }
      
      res.status(201).json({ 
        message: "You're entered. Check your email."
      });
    } catch (error) {
      console.error("Giveaway submission error:", error);
      res.status(500).json({ 
        message: "Failed to process entry. Please try again." 
      });
    }
  });

  // Resource lead capture endpoint
  app.post("/api/resource-leads", async (req, res) => {
    try {
      const data = insertResourceLeadSchema.parse(req.body);
      
      const lead = await storage.createResourceLead(data);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        tags: ["Resource Download", data.resourceName, "no welcome workflow"]
      });
      
      // Send email notification to admin in JSON format
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "RESOURCE_DOWNLOAD",
          formName: "Resource Download",
          firstName: data.firstName,
          lastName: "",
          phoneNumber: "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          resourceName: data.resourceName
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: `New Resource Download: ${data.resourceName}`,
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
        // Don't fail the request if email fails
      }
      
      // Send resource to user via email for specific resources
      let shouldCheckEmail = false;
      
      if (data.resourceName === "Automation Playbook: Zapier + Wink") {
        shouldCheckEmail = true;
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
      } else if (data.resourceName === "ServiceTitan Metrics Guide") {
        shouldCheckEmail = true;
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          // Read the Excel file
          const xlsxPath = path.join(process.cwd(), 'public', 'downloads', 'servicetitan-metrics-guide.xlsx');
          const xlsxBuffer = fs.readFileSync(xlsxPath);
          const xlsxBase64 = xlsxBuffer.toString('base64');
          
          await client.emails.send({
            from: fromEmail,
            to: data.email,
            subject: '📊 Your ServiceTitan Metrics Guide is Ready!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ED254E;">Hi ${data.firstName}!</h2>
                <p>Thanks for downloading the <strong>ServiceTitan Metrics Guide: 112 Essential KPIs</strong>!</p>
                <p>Your free Excel spreadsheet is attached to this email. Here's what you'll get:</p>
                <ul style="line-height: 1.8;">
                  <li>112 essential metrics organized by department (Sales, Operations, Marketing, Finance, Customer Service)</li>
                  <li>Clear definitions so you know exactly what each metric measures</li>
                  <li>Formulas and calculations built right into the spreadsheet</li>
                  <li>ServiceTitan-compatible structure for easy data pulling</li>
                </ul>
                <p style="margin-top: 30px;">
                  <strong>Ready to dive deeper?</strong><br>
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
                filename: 'servicetitan-metrics-guide.xlsx',
                content: xlsxBase64,
              },
            ],
          });
        } catch (emailError) {
          console.error("Failed to send resource email to user:", emailError);
          // Still return success to user even if email fails
        }
      } else if (data.resourceName === "Streamline Your Business with Swimlane Charts") {
        shouldCheckEmail = true;
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          // Read the PDF file
          const pdfPath = path.join(process.cwd(), 'public', 'downloads', 'tech-turnover-swimlane.pdf');
          const pdfBuffer = fs.readFileSync(pdfPath);
          const pdfBase64 = pdfBuffer.toString('base64');
          
          await client.emails.send({
            from: fromEmail,
            to: data.email,
            subject: '🔄 Your Swimlane Chart Template is Ready!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ED254E;">Hi ${data.firstName}!</h2>
                <p>Thanks for downloading the <strong>Swimlane Chart Template</strong>!</p>
                <p>Your free template is attached to this email. Here's what you can do with it:</p>
                <ul style="line-height: 1.8;">
                  <li>Map your team workflows and identify bottlenecks</li>
                  <li>Clarify who's responsible for each step in your processes</li>
                  <li>Improve handoffs between departments and roles</li>
                  <li>Build scalable systems that work as your company grows</li>
                </ul>
                <p style="margin-top: 30px;">
                  <strong>Want more process improvement tools?</strong><br>
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
                filename: 'tech-turnover-swimlane.pdf',
                content: pdfBase64,
              },
            ],
          });
        } catch (emailError) {
          console.error("Failed to send resource email to user:", emailError);
          // Still return success to user even if email fails
        }
      } else if (data.resourceName === "Master Your Pricing Objections") {
        shouldCheckEmail = true;
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          // Read the PDF file
          const pdfPath = path.join(process.cwd(), 'public', 'downloads', 'pricing-objections-iceberg.pdf');
          const pdfBuffer = fs.readFileSync(pdfPath);
          const pdfBase64 = pdfBuffer.toString('base64');
          
          await client.emails.send({
            from: fromEmail,
            to: data.email,
            subject: '💰 Your Pricing Objections Graphic is Ready!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ED254E;">Hi ${data.firstName}!</h2>
                <p>Thanks for downloading <strong>"Why It Costs What It Costs"</strong> – the pricing iceberg graphic!</p>
                <p>Your free visual tool is attached to this email. Here's how to use it:</p>
                <ul style="line-height: 1.8;">
                  <li>Show customers what they can see (technician, time, parts) vs. what your pricing actually covers</li>
                  <li>Help your team confidently explain pricing without sounding defensive</li>
                  <li>Turn pricing objections into educational conversations</li>
                  <li>Print it out or share it digitally during estimates</li>
                </ul>
                <p style="margin-top: 30px;">
                  <strong>Want more sales and pricing strategies?</strong><br>
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
                filename: 'why-it-costs-what-it-costs.pdf',
                content: pdfBase64,
              },
            ],
          });
        } catch (emailError) {
          console.error("Failed to send resource email to user:", emailError);
          // Still return success to user even if email fails
        }
      }
      
      // Send lead to partner portal webhook for Wink-related resources
      if (data.resourceName === "Automation Playbook: Zapier + Wink") {
        try {
          const webhookApiKey = process.env.LEADS_WEBHOOK_API_KEY;
          if (webhookApiKey) {
            const webhookPayload = {
              company_slug: 'wink-toolbox',
              name: data.firstName,
              email: data.email,
              source: 'Resource Download',
              source_details: 'Automation Playbook: Zapier + Wink - servicetitanhacks.com/automation-playbook',
              notes: `Downloaded the Automation Playbook: Zapier + Wink guide`
            };
            
            await fetch('https://imnhusloafhxccznjelj.supabase.co/functions/v1/create-lead', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': webhookApiKey
              },
              body: JSON.stringify(webhookPayload)
            });
          }
        } catch (webhookError) {
          console.error("Failed to send lead to partner portal:", webhookError);
        }
      }
      
      res.status(201).json({ 
        message: "Success! Check your email for the download link.",
        lead: { id: lead.id },
        shouldCheckEmail
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

  // Wink demo submission endpoint
  app.post("/api/wink-demo", async (req, res) => {
    try {
      const data = insertWinkDemoSubmissionSchema.parse(req.body);
      
      const submission = await storage.createWinkDemoSubmission(data);
      await storage.markWinkDemoAsComplete(data.email);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        tags: ["Wink Demo Request", "Partner Lead", "no welcome workflow"]
      });
      
      // Send email notification to admin in strict JSON format
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "WINK_DEMO",
          formName: "Wink Demo Request",
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: "",
          email: data.email,
          submittedAt: new Date().toISOString()
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Wink Demo Request',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json({ 
        message: "Success! Redirecting to Calendly...",
        submission: { id: submission.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Wink demo submission error:", error);
      res.status(500).json({ 
        message: "Failed to process request. Please try again." 
      });
    }
  });

  // Wink ROI Saver Calculator lead capture endpoint
  app.post("/api/wink-roi-saver", async (req, res) => {
    try {
      const schema = z.object({
        firstName: z.string().min(1).max(100),
        email: z.string().email().max(255),
        phoneNumber: z.string().max(50).optional(),
      });
      
      const data = schema.parse(req.body);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        tags: ["Wink ROI Calculator", "Partner Lead", "no welcome workflow"]
      });
      
      // Send email notification to admin
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "WINK_ROI_SAVER",
          formName: "Wink ROI Saver Calculator",
          firstName: data.firstName,
          lastName: "",
          phoneNumber: data.phoneNumber || "",
          email: data.email,
          submittedAt: new Date().toISOString()
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Wink ROI Saver Calculator Lead',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
      
      // Send lead to partner portal webhook
      try {
        const webhookApiKey = process.env.LEADS_WEBHOOK_API_KEY;
        if (webhookApiKey) {
          const webhookPayload = {
            company_slug: 'wink-toolbox',
            name: data.firstName,
            email: data.email,
            phone: data.phoneNumber || undefined,
            source: 'ROI Calculator',
            source_details: 'Wink ROI Saver Calculator - servicetitanhacks.com/wink-roi-saver',
            notes: 'Lead captured from Wink Toolbox ROI Calculator'
          };
          
          await fetch('https://imnhusloafhxccznjelj.supabase.co/functions/v1/create-lead', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': webhookApiKey
            },
            body: JSON.stringify(webhookPayload)
          });
        }
      } catch (webhookError) {
        console.error("Failed to send lead to partner portal:", webhookError);
      }
      
      res.json({ ok: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Wink ROI Saver lead error:", error);
      res.status(500).json({ message: "Failed to process request." });
    }
  });

  // SmartAC demo submission endpoint
  app.post("/api/smartac-demo", async (req, res) => {
    try {
      const data = insertSmartACDemoSubmissionSchema.parse(req.body);
      
      const submission = await storage.createSmartACDemoSubmission(data);
      await storage.markSmartACDemoAsComplete(data.email);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        tags: ["SmartAC Demo Request", "Partner Lead", "no welcome workflow"]
      });
      
      // Send email notification to admin in strict JSON format
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "SMARTAC_DEMO",
          formName: "SmartAC Demo Request",
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phone || "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          companyName: data.companyName,
          websiteUrl: data.websiteUrl,
          zipCode: data.zipCode,
          role: data.role,
          isLicensedContractor: data.isLicensedContractor,
          readyToGrow: data.readyToGrow,
          membershipAgreements: data.membershipAgreements,
          annualRevenue: data.annualRevenue,
          serviceTrucks: data.serviceTrucks
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New SmartAC Demo Request',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json({ 
        message: "Success!",
        submission: { id: submission.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("SmartAC demo submission error:", error);
      res.status(500).json({ 
        message: "Failed to process request. Please try again." 
      });
    }
  });

  // Auto-save partial Wink demo submission
  app.post("/api/wink-demo/autosave", async (req, res) => {
    try {
      const data = insertWinkDemoSubmissionSchema.parse(req.body);
      
      await storage.upsertWinkDemoSubmission(data.email, data);
      
      res.status(200).json({ message: "Auto-saved" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Wink demo auto-save error:", error);
      res.status(500).json({ 
        message: "Failed to auto-save." 
      });
    }
  });

  // Send abandoned Wink demo form email
  app.post("/api/wink-demo/abandoned", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email required" });
      }

      // Get the incomplete submission
      const submissions = await storage.getAllWinkDemoSubmissions();
      const incomplete = submissions.find(s => s.email === email && !s.completed);
      
      if (incomplete) {
        // Send email with partial data
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          const jsonData = {
            site_source: "Replit-ServiceTitan-Hacks",
            url_source: "WINK_DEMO_ABANDONED",
            formName: "Wink Demo (Abandoned)",
            firstName: incomplete.firstName || "",
            lastName: incomplete.lastName || "",
            phoneNumber: "",
            email: incomplete.email,
            submittedAt: new Date().toISOString()
          };
          
          await client.emails.send({
            from: fromEmail,
            to: 'bill@st-hacks.com',
            subject: 'Abandoned Wink Demo Form',
            text: JSON.stringify(jsonData, null, 2),
          });
        } catch (emailError) {
          console.error("Failed to send abandoned form email:", emailError);
        }
      }
      
      res.status(200).json({ message: "Processed" });
    } catch (error) {
      console.error("Abandoned form processing error:", error);
      res.status(500).json({ message: "Failed to process." });
    }
  });

  // Auto-save partial SmartAC demo submission
  app.post("/api/smartac-demo/autosave", async (req, res) => {
    try {
      const data = insertSmartACDemoSubmissionSchema.parse(req.body);
      
      await storage.upsertSmartACDemoSubmission(data.email, data);
      
      res.status(200).json({ message: "Auto-saved" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("SmartAC demo auto-save error:", error);
      res.status(500).json({ 
        message: "Failed to auto-save." 
      });
    }
  });

  // Send abandoned SmartAC demo form email
  app.post("/api/smartac-demo/abandoned", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email required" });
      }

      // Get the incomplete submission
      const submissions = await storage.getAllSmartACDemoSubmissions();
      const incomplete = submissions.find(s => s.email === email && !s.completed);
      
      if (incomplete) {
        // Send email with partial data
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          const jsonData = {
            site_source: "Replit-ServiceTitan-Hacks",
            url_source: "SMARTAC_DEMO_ABANDONED",
            formName: "SmartAC Demo (Abandoned)",
            firstName: incomplete.firstName || "",
            lastName: incomplete.lastName || "",
            phoneNumber: incomplete.phone || "",
            email: incomplete.email,
            submittedAt: new Date().toISOString(),
            companyName: incomplete.companyName || "",
            websiteUrl: incomplete.websiteUrl || "",
            zipCode: incomplete.zipCode || "",
            role: incomplete.role || "",
            isLicensedContractor: incomplete.isLicensedContractor || "",
            readyToGrow: incomplete.readyToGrow || "",
            membershipAgreements: incomplete.membershipAgreements || "",
            annualRevenue: incomplete.annualRevenue || "",
            serviceTrucks: incomplete.serviceTrucks || ""
          };
          
          await client.emails.send({
            from: fromEmail,
            to: 'bill@st-hacks.com',
            subject: 'Abandoned SmartAC Demo Form',
            text: JSON.stringify(jsonData, null, 2),
          });
        } catch (emailError) {
          console.error("Failed to send abandoned form email:", emailError);
        }
      }
      
      res.status(200).json({ message: "Processed" });
    } catch (error) {
      console.error("Abandoned form processing error:", error);
      res.status(500).json({ message: "Failed to process." });
    }
  });

  // Contractor Commerce demo submission endpoint
  app.post("/api/contractor-commerce-demo", async (req, res) => {
    try {
      const data = insertContractorCommerceDemoSubmissionSchema.parse(req.body);
      
      const submission = await storage.createContractorCommerceDemoSubmission(data);
      await storage.markContractorCommerceDemoAsComplete(data.email);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        tags: ["Contractor Commerce Demo", "Partner Lead", "no welcome workflow"]
      });
      
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "CONTRACTOR_COMMERCE_DEMO",
          formName: "Contractor Commerce Demo",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phoneNumber: data.cellPhone || "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          companyName: data.companyName || "",
          numberOfTechs: data.numberOfTechs || "",
          websiteUrl: data.websiteUrl || ""
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Contractor Commerce Demo Request',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
      
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Contractor Commerce demo submission error:", error);
      res.status(500).json({ 
        message: "Failed to submit demo request. Please try again." 
      });
    }
  });

  // Auto-save partial Contractor Commerce demo submission
  app.post("/api/contractor-commerce-demo/autosave", async (req, res) => {
    try {
      const data = insertContractorCommerceDemoSubmissionSchema.parse(req.body);
      
      await storage.upsertContractorCommerceDemoSubmission(data.email, data);
      
      res.status(200).json({ message: "Auto-saved" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Contractor Commerce demo auto-save error:", error);
      res.status(500).json({ 
        message: "Failed to auto-save." 
      });
    }
  });

  // Send abandoned Contractor Commerce demo form email
  app.post("/api/contractor-commerce-demo/abandoned", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email required" });
      }

      // Get the incomplete submission
      const submissions = await storage.getAllContractorCommerceDemoSubmissions();
      const incomplete = submissions.find(s => s.email === email && !s.completed);
      
      if (incomplete) {
        // Send email with partial data
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          const jsonData = {
            site_source: "Replit-ServiceTitan-Hacks",
            url_source: "CONTRACTOR_COMMERCE_DEMO_ABANDONED",
            formName: "Contractor Commerce Demo (Abandoned)",
            firstName: incomplete.firstName || "",
            lastName: incomplete.lastName || "",
            phoneNumber: incomplete.cellPhone || "",
            email: incomplete.email,
            submittedAt: new Date().toISOString(),
            companyName: incomplete.companyName || "",
            numberOfTechs: incomplete.numberOfTechs || "",
            websiteUrl: incomplete.websiteUrl || ""
          };
          
          await client.emails.send({
            from: fromEmail,
            to: 'bill@st-hacks.com',
            subject: 'Abandoned Contractor Commerce Demo Form',
            text: JSON.stringify(jsonData, null, 2),
          });
        } catch (emailError) {
          console.error("Failed to send abandoned form email:", emailError);
        }
      }
      
      res.status(200).json({ message: "Processed" });
    } catch (error) {
      console.error("Abandoned form processing error:", error);
      res.status(500).json({ message: "Failed to process." });
    }
  });

  // LiveSwitch demo submission endpoint
  app.post("/api/liveswitch-demo", async (req, res) => {
    try {
      const data = insertLiveswitchDemoSubmissionSchema.parse(req.body);
      
      const submission = await storage.createLiveswitchDemoSubmission(data);
      await storage.markLiveswitchDemoAsComplete(data.email);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        tags: ["LiveSwitch Demo Request", "Partner Lead", "no welcome workflow"]
      });
      
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "LIVESWITCH_DEMO",
          formName: "LiveSwitch Demo",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phoneNumber: "",
          email: data.email,
          submittedAt: new Date().toISOString()
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New LiveSwitch Demo Request',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
      
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("LiveSwitch demo submission error:", error);
      res.status(500).json({ 
        message: "Failed to submit demo request. Please try again." 
      });
    }
  });

  // Auto-save partial LiveSwitch demo submission
  app.post("/api/liveswitch-demo/autosave", async (req, res) => {
    try {
      const data = insertLiveswitchDemoSubmissionSchema.parse(req.body);
      
      await storage.upsertLiveswitchDemoSubmission(data.email, data);
      
      res.status(200).json({ message: "Auto-saved" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("LiveSwitch demo auto-save error:", error);
      res.status(500).json({ 
        message: "Failed to auto-save." 
      });
    }
  });

  // Send abandoned LiveSwitch demo form email
  app.post("/api/liveswitch-demo/abandoned", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email required" });
      }

      // Get the incomplete submission
      const submissions = await storage.getAllLiveswitchDemoSubmissions();
      const incomplete = submissions.find(s => s.email === email && !s.completed);
      
      if (incomplete) {
        // Send email with partial data
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          const jsonData = {
            site_source: "Replit-ServiceTitan-Hacks",
            url_source: "LIVESWITCH_DEMO_ABANDONED",
            formName: "LiveSwitch Demo (Abandoned)",
            firstName: incomplete.firstName || "",
            lastName: incomplete.lastName || "",
            phoneNumber: "",
            email: incomplete.email,
            submittedAt: new Date().toISOString()
          };
          
          await client.emails.send({
            from: fromEmail,
            to: 'bill@st-hacks.com',
            subject: 'Abandoned LiveSwitch Demo Form',
            text: JSON.stringify(jsonData, null, 2),
          });
        } catch (emailError) {
          console.error("Failed to send abandoned form email:", emailError);
        }
      }
      
      res.status(200).json({ message: "Processed" });
    } catch (error) {
      console.error("Abandoned form processing error:", error);
      res.status(500).json({ message: "Failed to process." });
    }
  });

  // Webinar registration webhook endpoint
  app.post("/api/webinar-registration", async (req, res) => {
    try {
      const { firstName, lastName, email, companyName, phone, optIn } = req.body;
      
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Send to Make.com webhook
      const webhookUrl = "https://hook.us1.make.com/wfq4mmnjy0lwt4iylnv1mioc63t94r7s";
      
      const webhookData = {
        firstName,
        lastName,
        email,
        companyName: companyName || "",
        phone: phone || "",
        optIn: optIn ?? true,
        webinarName: "The Invisible Labor Market",
        registeredAt: new Date().toISOString(),
      };
      
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });
      
      if (!webhookResponse.ok) {
        console.error("Webhook failed:", await webhookResponse.text());
        // Don't fail the registration if webhook fails
      }
      
      // Also sync to Mailchimp
      await addOrUpdateSubscriber({
        email,
        firstName,
        lastName,
        tags: ["Webinar Registration", "Invisible Labor Market", "no welcome workflow"]
      });
      
      res.status(200).json({ message: "Registration successful" });
    } catch (error) {
      console.error("Webinar registration error:", error);
      res.status(500).json({ message: "Registration failed" });
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
      await storage.markPricebookAsComplete(data.email);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        tags: ["Pricebook Optimizer", "Tool User", "no welcome workflow"]
      });
      
      // Send email notification to bill@st-hacks.com with JSON data including the AI result
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "PRICEBOOK_OPTIMIZER",
          formName: "Pricebook Optimizer",
          firstName: optimization.firstName,
          lastName: optimization.lastName,
          phoneNumber: "",
          email: optimization.email,
          submittedAt: optimization.submittedAt,
          category: optimization.category,
          otherCategory: optimization.otherCategory,
          currentDescription: optimization.currentDescription,
          optimizedDescription: optimizedDescription
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

  // Auto-save partial pricebook optimization
  app.post("/api/pricebook-optimization/autosave", async (req, res) => {
    try {
      const data = insertPricebookOptimizationSchema.parse(req.body);
      
      await storage.upsertPricebookOptimization(data.email, data);
      
      res.status(200).json({ message: "Auto-saved" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: validationError.message 
        });
      }
      console.error("Pricebook optimization auto-save error:", error);
      res.status(500).json({ 
        message: "Failed to auto-save." 
      });
    }
  });

  // Send abandoned pricebook optimization form email
  app.post("/api/pricebook-optimization/abandoned", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email required" });
      }

      // Get the incomplete submission
      const optimizations = await storage.getAllPricebookOptimizations();
      const incomplete = optimizations.find(o => o.email === email && !o.completed);
      
      if (incomplete) {
        // Send email with partial data
        try {
          const { client, fromEmail } = await getUncachableResendClient();
          
          const jsonData = {
            site_source: "Replit-ServiceTitan-Hacks",
            url_source: "PRICEBOOK_OPTIMIZER_ABANDONED",
            formName: "Pricebook Optimizer (Abandoned)",
            firstName: incomplete.firstName || "",
            lastName: incomplete.lastName || "",
            phoneNumber: "",
            email: incomplete.email,
            submittedAt: new Date().toISOString(),
            category: incomplete.category || "",
            currentDescription: incomplete.currentDescription ? 
              (incomplete.currentDescription.substring(0, 100) + "...") : ""
          };
          
          await client.emails.send({
            from: fromEmail,
            to: 'bill@st-hacks.com',
            subject: 'Abandoned Pricebook Optimizer Form',
            text: JSON.stringify(jsonData, null, 2),
          });
        } catch (emailError) {
          console.error("Failed to send abandoned form email:", emailError);
        }
      }
      
      res.status(200).json({ message: "Processed" });
    } catch (error) {
      console.error("Abandoned form processing error:", error);
      res.status(500).json({ message: "Failed to process." });
    }
  });

  // SmartAC ROI Calculator submission
  app.post("/api/smartac-roi", async (req, res) => {
    try {
      const parsed = insertSmartACROISubmissionSchema.safeParse(req.body);
      if (!parsed.success) {
        const validationError = fromZodError(parsed.error);
        return res.status(400).json({ message: validationError.message });
      }

      const data = parsed.data;
      
      // Save to database
      const submission = await storage.createSmartACROISubmission(data);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        tags: ["SmartAC ROI Calculator", "Tool User", "no welcome workflow"]
      });
      
      // Parse ROI results from JSON string
      const results = JSON.parse(data.roiResults);
      
      // Send ROI report to user
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;
        const formatPercent = (value: number) => `${Math.round(value)}%`;
        
        // Create booking URL with prefilled parameters
        const bookingUrl = `https://servicetitanhacks.com/partners/smartac/book-demo?firstName=${encodeURIComponent(data.firstName)}&email=${encodeURIComponent(data.email)}`;
        
        await client.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'Your SmartAC ROI Report - ServiceTitan Hacks',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      
                      <!-- Header with ServiceTitan Hacks Branding -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #ED254E 0%, #C1121F 100%); padding: 40px 30px; text-align: center;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">ServiceTitan Hacks</h1>
                          <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">AI & Automation for Home Service Contractors</p>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="margin: 0 0 20px 0; color: #2D3142; font-size: 24px; font-weight: 600;">Hi ${data.firstName}!</h2>
                          
                          <p style="margin: 0 0 25px 0; color: #2D3142; font-size: 16px; line-height: 1.6;">
                            Thanks for calculating your SmartAC ROI! Here's your personalized 5-year projection showing the growth potential for your membership program.
                          </p>
                          
                          <!-- Results Summary Box -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(237, 37, 78, 0.08), rgba(193, 18, 31, 0.05)); border-left: 4px solid #ED254E; border-radius: 8px; margin: 30px 0;">
                            <tr>
                              <td style="padding: 25px;">
                                <h3 style="margin: 0 0 20px 0; color: #ED254E; font-size: 20px; font-weight: 600;">Your Results at a Glance</h3>
                                
                                <!-- Net Gain Metric -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px; margin-bottom: 15px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">5-Year Net Gain</div>
                                      <div style="font-size: 32px; font-weight: 700; color: #22c55e; margin-bottom: 6px;">${formatCurrency(results.netGain)}</div>
                                      <div style="font-size: 12px; color: #999;">After ${formatCurrency(results.totalPlatformCost)} platform cost</div>
                                    </td>
                                  </tr>
                                </table>
                                
                                <!-- ROI Metric -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px; margin-bottom: 15px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">5-Year ROI</div>
                                      <div style="font-size: 32px; font-weight: 700; color: #ED254E; margin-bottom: 6px;">${formatPercent(results.roi)}</div>
                                      <div style="font-size: 12px; color: #999;">Return on investment</div>
                                    </td>
                                  </tr>
                                </table>
                                
                                <!-- Member Growth Metric -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px; margin-bottom: 15px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">Year 5 Member Growth</div>
                                      <div style="font-size: 32px; font-weight: 700; color: #ED254E; margin-bottom: 6px;">+${formatPercent(results.memberGrowthPercent)}</div>
                                      <div style="font-size: 12px; color: #999;">${results.year5BeforeMembers} → ${results.year5AfterMembers} members</div>
                                    </td>
                                  </tr>
                                </table>
                                
                                <!-- Revenue Metric -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">Incremental Revenue</div>
                                      <div style="font-size: 28px; font-weight: 700; color: #ED254E; margin-bottom: 6px;">${formatCurrency(results.incrementalRevenue)}</div>
                                      <div style="font-size: 12px; color: #999;">5-year total</div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- How SmartAC Works -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 8px; margin: 30px 0;">
                            <tr>
                              <td style="padding: 25px;">
                                <h3 style="margin: 0 0 15px 0; color: #2D3142; font-size: 18px; font-weight: 600;">How SmartAC Drives This Growth</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
                                  <li style="margin-bottom: 8px;">Smart sensors make memberships more valuable to customers</li>
                                  <li style="margin-bottom: 8px;">Virtual inspections reduce truck rolls and costs</li>
                                  <li style="margin-bottom: 8px;">Automated engagement boosts retention by 15 percentage points</li>
                                  <li style="margin-bottom: 0;">Mobile app doubles your membership close rates</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- CTA Button -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                            <tr>
                              <td align="center">
                                <table cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="border-radius: 6px; background: linear-gradient(135deg, #ED254E 0%, #C1121F 100%); box-shadow: 0 4px 12px rgba(237, 37, 78, 0.3);">
                                      <a href="${bookingUrl}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; letter-spacing: 0.3px;">
                                        Book Your SmartAC Demo
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 25px 0 0 0; color: #666; font-size: 14px; line-height: 1.6; text-align: center;">
                            Want to see exactly how SmartAC can transform your business?<br>
                            Book a personalized demo and we'll model your specific scenarios.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #2D3142; padding: 30px; text-align: center;">
                          <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">ServiceTitan Hacks</p>
                          <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.7); font-size: 13px;">Helping contractors grow with AI & automation</p>
                          <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5);">
                            <a href="https://servicetitanhacks.com" style="color: rgba(255,255,255,0.7); text-decoration: none;">servicetitanhacks.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send ROI report to user:", emailError);
        // Don't fail the request if email fails
      }
      
      // Send notification to bill@st-hacks.com with lead info
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "SMARTAC_ROI_CALCULATOR",
          formName: "SmartAC ROI Calculator",
          firstName: data.firstName,
          lastName: "",
          phoneNumber: "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          inputs: {
            activeMembers: data.activeMembers,
            retentionRate: data.retentionRate,
            newVisitsPerYear: data.newVisitsPerYear,
            closeRate: data.closeRate,
            revenuePerMember: data.revenuePerMember
          },
          results: JSON.parse(data.roiResults)
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New SmartAC ROI Calculator Submission',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
        // Don't fail the request if email fails
      }
      
      // Send lead to partner portal webhook
      try {
        const webhookResponse = await fetch(
          'https://imnhusloafhxccznjelj.supabase.co/functions/v1/create-lead',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.LEADS_WEBHOOK_API_KEY || ''
            },
            body: JSON.stringify({
              company_slug: 'smartac',
              name: data.firstName,
              email: data.email,
              source: 'ROI Calculator',
              source_details: 'SmartAC ROI Calculator - servicetitanhacks.com/smartac-roi-calculator',
              notes: `Calculator inputs: ${data.activeMembers} members, ${data.retentionRate}% retention, ${data.newVisitsPerYear} visits/year, ${data.closeRate}% close rate, $${data.revenuePerMember}/member. Results: ${data.roiResults}`
            })
          }
        );
        
        if (!webhookResponse.ok) {
          const error = await webhookResponse.json();
          console.error("Partner portal webhook error:", error);
        } else {
          console.log("Lead sent to partner portal successfully");
        }
      } catch (webhookError) {
        console.error("Failed to send lead to partner portal:", webhookError);
        // Don't fail the request if webhook fails
      }
      
      res.json(submission);
    } catch (error) {
      console.error("SmartAC ROI submission error:", error);
      res.status(500).json({ message: "Failed to save ROI calculation" });
    }
  });

  // Wink ROI Calculator submission
  app.post("/api/wink-roi", async (req, res) => {
    try {
      const parsed = insertWinkROISubmissionSchema.safeParse(req.body);
      if (!parsed.success) {
        const validationError = fromZodError(parsed.error);
        return res.status(400).json({ message: validationError.message });
      }

      const data = parsed.data;
      
      // Save to database
      const submission = await storage.createWinkROISubmission(data);
      
      // Sync to Mailchimp
      await addOrUpdateSubscriber({
        email: data.email,
        firstName: data.firstName,
        tags: ["Wink ROI Calculator", "Tool User", "no welcome workflow"]
      });
      
      // Parse ROI results from JSON string
      const results = JSON.parse(data.roiResults);
      
      // Send ROI report to user
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;
        const formatNumber = (value: number) => Math.round(value).toLocaleString();
        
        // Create booking URL with prefilled parameters
        const bookingUrl = `https://servicetitanhacks.com/partners/wink-toolbox/book-demo?firstName=${encodeURIComponent(data.firstName)}&email=${encodeURIComponent(data.email)}`;
        
        await client.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'Your Wink Toolbox ROI Report - ServiceTitan Hacks',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      
                      <!-- Header with ServiceTitan Hacks Branding -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #ED254E 0%, #C1121F 100%); padding: 40px 30px; text-align: center;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">ServiceTitan Hacks</h1>
                          <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">AI & Automation for Home Service Contractors</p>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="margin: 0 0 20px 0; color: #2D3142; font-size: 24px; font-weight: 600;">Hi ${data.firstName}!</h2>
                          
                          <p style="margin: 0 0 25px 0; color: #2D3142; font-size: 16px; line-height: 1.6;">
                            Thanks for calculating your Wink Toolbox ROI! Here's your personalized analysis showing how much time and money you could save by automating your invoicing process.
                          </p>
                          
                          <!-- Results Summary Box -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(237, 37, 78, 0.08), rgba(193, 18, 31, 0.05)); border-left: 4px solid #ED254E; border-radius: 8px; margin: 30px 0;">
                            <tr>
                              <td style="padding: 25px;">
                                <h3 style="margin: 0 0 20px 0; color: #ED254E; font-size: 20px; font-weight: 600;">Your Results at a Glance</h3>
                                
                                <!-- Net Savings Year 1 -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px; margin-bottom: 15px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">Year 1 Net Savings</div>
                                      <div style="font-size: 32px; font-weight: 700; color: #22c55e; margin-bottom: 6px;">${formatCurrency(results.netSavingsYear1)}</div>
                                      <div style="font-size: 12px; color: #999;">After Wink platform costs</div>
                                    </td>
                                  </tr>
                                </table>
                                
                                <!-- 5-Year ROI -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px; margin-bottom: 15px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">5-Year Cumulative Savings</div>
                                      <div style="font-size: 32px; font-weight: 700; color: #ED254E; margin-bottom: 6px;">${formatCurrency(results.netSavingsYear5)}</div>
                                      <div style="font-size: 12px; color: #999;">${results.fiveYearROI}% ROI</div>
                                    </td>
                                  </tr>
                                </table>
                                
                                <!-- Time Savings -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px; margin-bottom: 15px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">Time Saved Per Month</div>
                                      <div style="font-size: 32px; font-weight: 700; color: #ED254E; margin-bottom: 6px;">${formatNumber(results.hoursSavedPerMonth)} hours</div>
                                      <div style="font-size: 12px; color: #999;">${results.timeSavings}% faster invoicing</div>
                                    </td>
                                  </tr>
                                </table>
                                
                                <!-- Annual Savings -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 6px;">
                                  <tr>
                                    <td style="padding: 20px;">
                                      <div style="font-size: 13px; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">Total Annual Savings</div>
                                      <div style="font-size: 28px; font-weight: 700; color: #ED254E; margin-bottom: 6px;">${formatCurrency(results.totalAnnualSavings)}</div>
                                      <div style="font-size: 12px; color: #999;">Time + mistake reduction</div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- How Wink Works -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 8px; margin: 30px 0;">
                            <tr>
                              <td style="padding: 25px;">
                                <h3 style="margin: 0 0 15px 0; color: #2D3142; font-size: 18px; font-weight: 600;">How Wink Toolbox Saves You Money</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
                                  <li style="margin-bottom: 8px;">AI-powered invoice generation cuts manual entry time by ${results.timeSavings}%</li>
                                  <li style="margin-bottom: 8px;">Automated accuracy checks reduce costly billing mistakes</li>
                                  <li style="margin-bottom: 8px;">Save ${formatNumber(results.hoursSavedPerMonth)} hours per month on invoicing</li>
                                  <li style="margin-bottom: 0;">Reclaim ${formatCurrency(results.monthlySavings)}/month in labor costs</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- CTA Button -->
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                            <tr>
                              <td align="center">
                                <table cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="border-radius: 6px; background: linear-gradient(135deg, #ED254E 0%, #C1121F 100%); box-shadow: 0 4px 12px rgba(237, 37, 78, 0.3);">
                                      <a href="${bookingUrl}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; letter-spacing: 0.3px;">
                                        Book Your Wink Demo
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 25px 0 0 0; color: #666; font-size: 14px; line-height: 1.6; text-align: center;">
                            Ready to see Wink Toolbox in action?<br>
                            Book a personalized demo and discover how AI can transform your invoicing.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #2D3142; padding: 30px; text-align: center;">
                          <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">ServiceTitan Hacks</p>
                          <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.7); font-size: 13px;">Helping contractors grow with AI & automation</p>
                          <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5);">
                            <a href="https://servicetitanhacks.com" style="color: rgba(255,255,255,0.7); text-decoration: none;">servicetitanhacks.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send ROI report to user:", emailError);
        // Don't fail the request if email fails
      }
      
      // Send notification to bill@st-hacks.com with lead info
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "WINK_ROI_CALCULATOR",
          formName: "Wink ROI Calculator",
          firstName: data.firstName,
          lastName: "",
          phoneNumber: "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          inputs: {
            invoicesPerMonth: data.invoicesPerMonth,
            minutesPerInvoice: data.minutesPerInvoice,
            workerHourlyPay: data.workerHourlyPay,
            mistakeRate: data.mistakeRate,
            costPerMistake: data.costPerMistake,
            winkMonthlyCost: data.winkMonthlyCost,
            setupCost: data.setupCost,
            setupCostSpread: data.setupCostSpread
          },
          results: JSON.parse(data.roiResults)
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Wink ROI Calculator Submission',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.json(submission);
    } catch (error) {
      console.error("Wink ROI submission error:", error);
      res.status(500).json({ message: "Failed to save ROI calculation" });
    }
  });

  // Hiring ROI Calculator submission (Traderunner)
  app.post("/api/hiring-roi", async (req, res) => {
    try {
      const parsed = insertHiringROISubmissionSchema.safeParse(req.body);
      if (!parsed.success) {
        const validationError = fromZodError(parsed.error);
        return res.status(400).json({ ok: false, error: validationError.message });
      }

      const data = parsed.data;
      
      // Save to database
      const submission = await storage.createHiringROISubmission(data);
      
      // Sync to Mailchimp (only if this is a new lead)
      if (!data.leadAlreadyCaptured) {
        await addOrUpdateSubscriber({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          tags: ["Hiring ROI Calculator", "Tool User", "Traderunner Lead", "no welcome workflow"]
        });
      }
      
      // Parse results from JSON string
      const results = JSON.parse(data.calculatorResults);
      const inputs = JSON.parse(data.calculatorInputs);
      
      // Send admin notification
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "HIRING_ROI_CALCULATOR",
          formName: "Hiring ROI Calculator (Traderunner)",
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phone || "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          companyName: data.companyName,
          trade: data.trade,
          serviceTitanUser: data.serviceTitanUser,
          companySize: data.companySize,
          leadAlreadyCaptured: data.leadAlreadyCaptured || false,
          inputs: inputs,
          results: results
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New Hiring ROI Calculator Submission (Traderunner)',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
      
      // Send lead to partner portal webhook (only for new leads)
      if (!data.leadAlreadyCaptured) {
        try {
          const webhookApiKey = process.env.LEADS_WEBHOOK_API_KEY;
          if (webhookApiKey) {
            const webhookPayload = {
              company_slug: 'traderunner',
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              phone: data.phone,
              company_name: data.companyName,
              source: 'ROI Calculator',
              source_details: 'Hiring ROI Calculator - servicetitanhacks.com/hiring-roi-calculator',
              notes: `Trade: ${data.trade}, Company Size: ${data.companySize}, ServiceTitan User: ${data.serviceTitanUser}. Calculator inputs: ${inputs.weeksToHire} weeks to hire, $${inputs.avgTicket} avg ticket, ${inputs.jobsPerWeekPerTech} jobs/week/tech, ${inputs.grossMarginPct}% margin. Results: $${Math.round(results.totalCost).toLocaleString()} total cost, $${Math.round(results.costPerWeek).toLocaleString()}/week.`
            };
            
            await fetch('https://imnhusloafhxccznjelj.supabase.co/functions/v1/create-lead', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': webhookApiKey
              },
              body: JSON.stringify(webhookPayload)
            });
          }
        } catch (webhookError) {
          console.error("Failed to send lead to partner portal:", webhookError);
        }
      }
      
      res.json({ ok: true });
    } catch (error) {
      console.error("Hiring ROI submission error:", error);
      res.status(500).json({ ok: false, error: "Failed to save ROI calculation" });
    }
  });

  // PhoneTAP Waitlist endpoint
  app.post("/api/phonetap-waitlist", async (req, res) => {
    try {
      const parsed = insertPhoneTapWaitlistSchema.safeParse(req.body);
      if (!parsed.success) {
        const validationError = fromZodError(parsed.error);
        return res.status(400).json({ ok: false, error: validationError.message });
      }

      const data = parsed.data;
      
      // Save to database
      const entry = await storage.createPhoneTapWaitlistEntry(data);
      
      // Send email notification to admin
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const nameParts = data.name.trim().split(' ');
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "PHONETAP_WAITLIST",
          formName: "PhoneTAP Waitlist",
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(' ') || "",
          phoneNumber: data.phone || "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          companyName: data.companyName,
          companySize: data.companySize
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: 'New PhoneTAP Waitlist Signup',
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
      
      res.json({ ok: true, entry: { id: entry.id } });
    } catch (error) {
      console.error("PhoneTAP waitlist submission error:", error);
      res.status(500).json({ ok: false, error: "Failed to save waitlist submission" });
    }
  });

  // Replay Access endpoint
  app.post("/api/replay-access", async (req, res) => {
    try {
      const parsed = insertReplayAccessSchema.safeParse(req.body);
      if (!parsed.success) {
        const validationError = fromZodError(parsed.error);
        return res.status(400).json({ ok: false, error: validationError.message });
      }

      const data = parsed.data;
      
      // Save to database
      const entry = await storage.createReplayAccessEntry(data);
      
      // Send email notification to admin
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        
        const jsonData = {
          site_source: "Replit-ServiceTitan-Hacks",
          url_source: "REPLAY_ACCESS",
          formName: "Webinar Replay Access",
          firstName: data.firstName,
          lastName: "",
          phoneNumber: "",
          email: data.email,
          submittedAt: new Date().toISOString(),
          webinarSlug: data.webinarSlug
        };
        
        await client.emails.send({
          from: fromEmail,
          to: 'bill@st-hacks.com',
          subject: `New Replay Access Request: ${data.webinarSlug}`,
          text: JSON.stringify(jsonData, null, 2),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
      
      res.json({ ok: true, entry: { id: entry.id } });
    } catch (error) {
      console.error("Replay access submission error:", error);
      res.status(500).json({ ok: false, error: "Failed to save replay access submission" });
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
      { url: "/apps", priority: "0.8", changefreq: "weekly" },
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

  // Podcast episodes API routes
  app.get("/api/podcast/episodes", async (req, res) => {
    try {
      const episodes = await storage.getPodcastEpisodes();
      res.json(episodes);
    } catch (error) {
      console.error("Error fetching podcast episodes:", error);
      res.status(500).json({ message: "Failed to fetch podcast episodes" });
    }
  });

  app.post("/api/podcast/sync", isAdmin, async (req, res) => {
    try {
      const { syncPodcastEpisodes } = await import('./podcastSync');
      const result = await syncPodcastEpisodes();
      res.json(result);
    } catch (error) {
      console.error("Error syncing podcast episodes:", error);
      res.status(500).json({ 
        success: false, 
        episodesAdded: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // ============================================
  // PARTNER PORTAL API ROUTES
  // ============================================

  // Get current partner user info
  app.get('/api/partner-portal/me', isAuthenticated, async (req: any, res) => {
    try {
      const claims = req.user.claims;
      const userId = claims.sub;
      const userEmail = claims.email;
      
      let partnerUser = await storage.getPartnerUser(userId);
      
      // Auto-create master admin for Bill (case-insensitive)
      if (!partnerUser && userEmail?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) {
        // Ensure user exists in users table first (foreign key requirement)
        await storage.upsertUser({
          id: userId,
          email: userEmail,
          firstName: claims.first_name,
          lastName: claims.last_name,
          profileImageUrl: claims.profile_image_url,
        });
        
        partnerUser = await storage.createPartnerUser({
          userId,
          companyId: null,
          role: 'master_admin'
        });
        console.log(`[Partner Portal] Auto-created master admin for ${userEmail}`);
      }
      
      if (!partnerUser) {
        return res.json({ isPartner: false });
      }
      
      let company = null;
      if (partnerUser.companyId) {
        company = await storage.getPartnerCompany(partnerUser.companyId);
      }
      
      res.json({
        isPartner: true,
        partnerUser,
        company
      });
    } catch (error) {
      console.error("Error fetching partner user:", error);
      res.status(500).json({ message: "Failed to fetch partner user" });
    }
  });

  // Master Admin: Get all companies
  app.get('/api/partner-portal/companies', isMasterAdmin, async (req: any, res) => {
    try {
      const companies = await storage.getAllPartnerCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  // Master Admin: Create a new company
  app.post('/api/partner-portal/companies', isMasterAdmin, async (req: any, res) => {
    try {
      const validated = insertPartnerCompanySchema.parse(req.body);
      const company = await storage.createPartnerCompany(validated);
      res.status(201).json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      console.error("Error creating company:", error);
      res.status(500).json({ message: "Failed to create company" });
    }
  });

  // Master Admin: Get a specific company
  app.get('/api/partner-portal/companies/:id', isMasterAdmin, async (req: any, res) => {
    try {
      const company = await storage.getPartnerCompany(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // Master Admin: Update a company
  app.patch('/api/partner-portal/companies/:id', isMasterAdmin, async (req: any, res) => {
    try {
      const company = await storage.updatePartnerCompany(req.params.id, req.body);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      console.error("Error updating company:", error);
      res.status(500).json({ message: "Failed to update company" });
    }
  });

  // Master Admin: Delete a company
  app.delete('/api/partner-portal/companies/:id', isMasterAdmin, async (req: any, res) => {
    try {
      await storage.deletePartnerCompany(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting company:", error);
      res.status(500).json({ message: "Failed to delete company" });
    }
  });

  // Master Admin: Get users for a company
  app.get('/api/partner-portal/companies/:companyId/users', isMasterAdmin, async (req: any, res) => {
    try {
      const users = await storage.getPartnerUsersByCompany(req.params.companyId);
      res.json(users);
    } catch (error) {
      console.error("Error fetching company users:", error);
      res.status(500).json({ message: "Failed to fetch company users" });
    }
  });

  // Master Admin: Create invite for account admin
  app.post('/api/partner-portal/invites', isMasterAdmin, async (req: any, res) => {
    try {
      const { email, companyId, role } = req.body;
      const userId = req.user.claims.sub;
      
      const token = randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      
      const invite = await storage.createPartnerInvite({
        email,
        companyId,
        role: role || 'account_admin',
        invitedBy: userId,
        token,
        expiresAt
      });
      
      // Send invite email via Resend
      try {
        const { client, fromEmail } = await getUncachableResendClient();
        await client.emails.send({
          from: fromEmail,
          to: email,
          subject: 'You\'ve been invited to the ServiceTitan Hacks Partner Portal',
          html: `
            <h2>Partner Portal Invitation</h2>
            <p>You've been invited to join the ServiceTitan Hacks Partner Portal.</p>
            <p>Click the link below to accept your invitation:</p>
            <p><a href="https://servicetitanhacks.com/partner-portal/accept-invite?token=${token}">Accept Invitation</a></p>
            <p>This link expires in 7 days.</p>
          `
        });
      } catch (emailError) {
        console.error("Error sending invite email:", emailError);
      }
      
      res.status(201).json(invite);
    } catch (error) {
      console.error("Error creating invite:", error);
      res.status(500).json({ message: "Failed to create invite" });
    }
  });

  // Account Admin: Invite a user to their company
  app.post('/api/partner-portal/companies/:companyId/invites', isAccountAdmin, async (req: any, res) => {
    try {
      const { email } = req.body;
      const userId = req.user.claims.sub;
      const partnerUser = req.partnerUser;
      
      // Account admins can only invite to their own company
      if (partnerUser.role !== 'master_admin' && partnerUser.companyId !== req.params.companyId) {
        return res.status(403).json({ message: "Cannot invite users to other companies" });
      }
      
      const token = randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      
      const invite = await storage.createPartnerInvite({
        email,
        companyId: req.params.companyId,
        role: 'user',
        invitedBy: userId,
        token,
        expiresAt
      });
      
      // Send invite email
      try {
        const company = await storage.getPartnerCompany(req.params.companyId);
        const { client, fromEmail } = await getUncachableResendClient();
        await client.emails.send({
          from: fromEmail,
          to: email,
          subject: `You've been invited to ${company?.name || 'a partner'}'s portal`,
          html: `
            <h2>Partner Portal Invitation</h2>
            <p>You've been invited to join ${company?.name || 'a partner'}'s portal on ServiceTitan Hacks.</p>
            <p>Click the link below to accept your invitation:</p>
            <p><a href="https://servicetitanhacks.com/partner-portal/accept-invite?token=${token}">Accept Invitation</a></p>
            <p>This link expires in 7 days.</p>
          `
        });
      } catch (emailError) {
        console.error("Error sending invite email:", emailError);
      }
      
      res.status(201).json(invite);
    } catch (error) {
      console.error("Error creating invite:", error);
      res.status(500).json({ message: "Failed to create invite" });
    }
  });

  // Accept an invite
  app.post('/api/partner-portal/accept-invite', isAuthenticated, async (req: any, res) => {
    try {
      const { token } = req.body;
      const userId = req.user.claims.sub;
      
      const invite = await storage.getPartnerInviteByToken(token);
      if (!invite) {
        return res.status(404).json({ message: "Invite not found" });
      }
      
      if (invite.acceptedAt) {
        return res.status(400).json({ message: "Invite already accepted" });
      }
      
      if (new Date(invite.expiresAt) < new Date()) {
        return res.status(400).json({ message: "Invite has expired" });
      }
      
      // Create the partner user
      await storage.createPartnerUser({
        userId,
        companyId: invite.companyId,
        role: invite.role
      });
      
      // Mark invite as accepted
      await storage.acceptPartnerInvite(token);
      
      res.json({ message: "Invite accepted successfully" });
    } catch (error) {
      console.error("Error accepting invite:", error);
      res.status(500).json({ message: "Failed to accept invite" });
    }
  });

  // Get company invites (for account admins and master admins)
  app.get('/api/partner-portal/companies/:companyId/invites', isAccountAdmin, async (req: any, res) => {
    try {
      const partnerUser = req.partnerUser;
      
      if (partnerUser.role !== 'master_admin' && partnerUser.companyId !== req.params.companyId) {
        return res.status(403).json({ message: "Cannot view invites for other companies" });
      }
      
      const invites = await storage.getPartnerInvitesByCompany(req.params.companyId);
      res.json(invites);
    } catch (error) {
      console.error("Error fetching invites:", error);
      res.status(500).json({ message: "Failed to fetch invites" });
    }
  });

  // Partner User: Get campaign metrics for their company
  app.get('/api/partner-portal/metrics', isPartnerUser, async (req: any, res) => {
    try {
      const partnerUser = req.partnerUser;
      
      if (!partnerUser.companyId) {
        return res.status(400).json({ message: "No company associated with this user" });
      }
      
      const metrics = await storage.getPartnerCampaignMetrics(partnerUser.companyId);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // Master Admin: Create campaign metrics for a company
  app.post('/api/partner-portal/companies/:companyId/metrics', isMasterAdmin, async (req: any, res) => {
    try {
      const validated = insertPartnerCampaignMetricSchema.parse({
        ...req.body,
        companyId: req.params.companyId
      });
      const metric = await storage.createPartnerCampaignMetric(validated);
      res.status(201).json(metric);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      console.error("Error creating metric:", error);
      res.status(500).json({ message: "Failed to create metric" });
    }
  });

  // Master Admin: Update campaign metrics
  app.patch('/api/partner-portal/metrics/:id', isMasterAdmin, async (req: any, res) => {
    try {
      const metric = await storage.updatePartnerCampaignMetric(req.params.id, req.body);
      if (!metric) {
        return res.status(404).json({ message: "Metric not found" });
      }
      res.json(metric);
    } catch (error) {
      console.error("Error updating metric:", error);
      res.status(500).json({ message: "Failed to update metric" });
    }
  });

  // Master Admin: Delete campaign metrics
  app.delete('/api/partner-portal/metrics/:id', isMasterAdmin, async (req: any, res) => {
    try {
      await storage.deletePartnerCampaignMetric(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting metric:", error);
      res.status(500).json({ message: "Failed to delete metric" });
    }
  });

  // Partner User: Get content calendar for their company
  app.get('/api/partner-portal/calendar', isPartnerUser, async (req: any, res) => {
    try {
      const partnerUser = req.partnerUser;
      
      if (!partnerUser.companyId) {
        return res.status(400).json({ message: "No company associated with this user" });
      }
      
      const items = await storage.getPartnerContentCalendar(partnerUser.companyId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching calendar:", error);
      res.status(500).json({ message: "Failed to fetch calendar" });
    }
  });

  // Master Admin: Create content calendar item
  app.post('/api/partner-portal/companies/:companyId/calendar', isMasterAdmin, async (req: any, res) => {
    try {
      const validated = insertPartnerContentCalendarSchema.parse({
        ...req.body,
        companyId: req.params.companyId
      });
      const item = await storage.createPartnerContentCalendarItem(validated);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      console.error("Error creating calendar item:", error);
      res.status(500).json({ message: "Failed to create calendar item" });
    }
  });

  // Master Admin: Update content calendar item
  app.patch('/api/partner-portal/calendar/:id', isMasterAdmin, async (req: any, res) => {
    try {
      const item = await storage.updatePartnerContentCalendarItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: "Calendar item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error updating calendar item:", error);
      res.status(500).json({ message: "Failed to update calendar item" });
    }
  });

  // Master Admin: Delete content calendar item
  app.delete('/api/partner-portal/calendar/:id', isMasterAdmin, async (req: any, res) => {
    try {
      await storage.deletePartnerContentCalendarItem(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting calendar item:", error);
      res.status(500).json({ message: "Failed to delete calendar item" });
    }
  });

  // Partner User: Get brand assets for their company
  app.get('/api/partner-portal/brand-assets', isPartnerUser, async (req: any, res) => {
    try {
      const partnerUser = req.partnerUser;
      
      if (!partnerUser.companyId) {
        return res.status(400).json({ message: "No company associated with this user" });
      }
      
      const assets = await storage.getPartnerBrandAssets(partnerUser.companyId);
      res.json(assets);
    } catch (error) {
      console.error("Error fetching brand assets:", error);
      res.status(500).json({ message: "Failed to fetch brand assets" });
    }
  });

  // Account Admin: Create brand asset
  app.post('/api/partner-portal/brand-assets', isAccountAdmin, async (req: any, res) => {
    try {
      const partnerUser = req.partnerUser;
      const userId = req.user.claims.sub;
      
      if (!partnerUser.companyId && partnerUser.role !== 'master_admin') {
        return res.status(400).json({ message: "No company associated with this user" });
      }
      
      const companyId = req.body.companyId || partnerUser.companyId;
      
      const validated = insertPartnerBrandAssetSchema.parse({
        ...req.body,
        companyId,
        uploadedBy: userId
      });
      const asset = await storage.createPartnerBrandAsset(validated);
      res.status(201).json(asset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).toString() });
      }
      console.error("Error creating brand asset:", error);
      res.status(500).json({ message: "Failed to create brand asset" });
    }
  });

  // Account Admin: Delete brand asset
  app.delete('/api/partner-portal/brand-assets/:id', isAccountAdmin, async (req: any, res) => {
    try {
      await storage.deletePartnerBrandAsset(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting brand asset:", error);
      res.status(500).json({ message: "Failed to delete brand asset" });
    }
  });

  // Mailchimp integration endpoints
  app.get('/api/partner-portal/mailchimp/campaigns', isMasterAdmin, async (req: any, res) => {
    try {
      if (!isMailchimpConfigured()) {
        return res.status(503).json({ message: "Mailchimp not configured" });
      }
      
      const { count, sinceDate, beforeDate } = req.query;
      const reports = await getCampaignReports({
        count: count ? parseInt(count) : 10,
        sinceDate: sinceDate as string,
        beforeDate: beforeDate as string,
      });
      
      res.json(reports);
    } catch (error) {
      console.error("Error fetching Mailchimp campaigns:", error);
      res.status(500).json({ message: "Failed to fetch Mailchimp campaigns" });
    }
  });

  app.get('/api/partner-portal/mailchimp/stats', isMasterAdmin, async (req: any, res) => {
    try {
      if (!isMailchimpConfigured()) {
        return res.status(503).json({ message: "Mailchimp not configured" });
      }
      
      const { sinceDate, beforeDate } = req.query;
      const stats = await getAggregateStats({
        sinceDate: sinceDate as string,
        beforeDate: beforeDate as string,
      });
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching Mailchimp stats:", error);
      res.status(500).json({ message: "Failed to fetch Mailchimp stats" });
    }
  });

  app.get('/api/partner-portal/mailchimp/list-growth', isMasterAdmin, async (req: any, res) => {
    try {
      if (!isMailchimpConfigured()) {
        return res.status(503).json({ message: "Mailchimp not configured" });
      }
      
      const growth = await getListGrowth();
      res.json(growth);
    } catch (error) {
      console.error("Error fetching Mailchimp list growth:", error);
      res.status(500).json({ message: "Failed to fetch Mailchimp list growth" });
    }
  });

  app.get('/api/partner-portal/mailchimp/status', isMasterAdmin, async (req: any, res) => {
    res.json({ configured: isMailchimpConfigured() });
  });

  // Master Admin: Manually add a user as master admin (bootstrap)
  app.post('/api/partner-portal/bootstrap-master-admin', isAdmin, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Check if already a partner user
      const existing = await storage.getPartnerUser(userId);
      if (existing) {
        return res.status(400).json({ message: "Already a partner user" });
      }
      
      const partnerUser = await storage.createPartnerUser({
        userId,
        companyId: null,
        role: 'master_admin'
      });
      
      res.status(201).json(partnerUser);
    } catch (error) {
      console.error("Error bootstrapping master admin:", error);
      res.status(500).json({ message: "Failed to bootstrap master admin" });
    }
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
Allow: /apps
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
