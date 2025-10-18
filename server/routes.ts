import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriberSchema, insertContactSubmissionSchema, insertResourceLeadSchema, insertPricebookOptimizationSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

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
      
      const optimization = await storage.createPricebookOptimization(data);
      
      res.status(201).json({ 
        message: "Success! Your optimized description will be sent to your email shortly.",
        optimization: { id: optimization.id }
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
