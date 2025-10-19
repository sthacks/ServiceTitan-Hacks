import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriberSchema, insertContactSubmissionSchema, insertResourceLeadSchema, insertPricebookOptimizationSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { getUncachableResendClient } from "./resend-client";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
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
Your goal is to help contractors communicate expertise and build trust by focusing on **quality, reliability, comfort, safety, efficiency, and long-term value**—never by implying the work is simple or quick.

---

### **Instructions**

**1. Simplify Without Downplaying Value**

* Remove jargon but maintain a tone of professional skill and craftsmanship.
* Never describe the task as *simple*, *easy*, *quick*, or *basic*.
* Focus on the precision, care, or expertise required to do it correctly.

**2. Emphasize Homeowner Benefits**

* Explain how the product or service improves home comfort, safety, performance, and efficiency.
* Highlight durability, quality workmanship, and long-term peace of mind.

**3. Personalize the Message**

* Use relatable homeowner scenarios to show how the solution addresses real issues or prevents future problems.
* Avoid sales pressure or calls to action—this copy will be used by technicians in person.

**4. Include Realistic Examples**

* Use short examples or analogies that show impact or results, not simplicity.
* Reinforce the value of doing the job right the first time.

**5. Highlight Differentiators**

* Explain what makes this product, service, or installation superior—materials, technology, precision, or efficiency.
* Connect these differentiators directly to better homeowner outcomes.

---

### **Formatting Rules (HTML Output)**

* Use <b> for headings and key terms.
* Use <br> for spacing between paragraphs.
* Use <ul> and <li> for features and benefits.
* Do **not** include <head> or <body> tags.
* Do **not** include prices in the output.

---

### **Length Rules**

* **Installations / major projects** (e.g., furnace, water heater, A/C, bathtub): ≤ **200 words**
* **Small repairs / upgrades** (e.g., component replacement, maintenance): ≤ **75 words**

---

**Goal:**
Produce a professional, confident, and homeowner-friendly explanation that demonstrates expertise, justifies value, and builds trust in the quality of the work.`;

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
