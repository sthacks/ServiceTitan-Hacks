import { 
  type User, 
  type InsertUser, 
  type EmailSubscriber, 
  type InsertEmailSubscriber,
  type ContactSubmission,
  type InsertContactSubmission,
  type ResourceLead,
  type InsertResourceLead,
  type PricebookOptimization,
  type InsertPricebookOptimization
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createEmailSubscriber(subscriber: InsertEmailSubscriber): Promise<EmailSubscriber>;
  getEmailSubscriberByEmail(email: string): Promise<EmailSubscriber | undefined>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  createResourceLead(lead: InsertResourceLead): Promise<ResourceLead>;
  getAllResourceLeads(): Promise<ResourceLead[]>;
  
  createPricebookOptimization(optimization: InsertPricebookOptimization): Promise<PricebookOptimization>;
  getAllPricebookOptimizations(): Promise<PricebookOptimization[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailSubscribers: Map<string, EmailSubscriber>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private resourceLeads: Map<string, ResourceLead>;
  private pricebookOptimizations: Map<string, PricebookOptimization>;

  constructor() {
    this.users = new Map();
    this.emailSubscribers = new Map();
    this.contactSubmissions = new Map();
    this.resourceLeads = new Map();
    this.pricebookOptimizations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmailSubscriber(insertSubscriber: InsertEmailSubscriber): Promise<EmailSubscriber> {
    const id = randomUUID();
    const subscriber: EmailSubscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: new Date() 
    };
    this.emailSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getEmailSubscriberByEmail(email: string): Promise<EmailSubscriber | undefined> {
    return Array.from(this.emailSubscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = { 
      ...insertSubmission,
      company: insertSubmission.company || null,
      role: insertSubmission.role || null,
      id, 
      submittedAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async createResourceLead(insertLead: InsertResourceLead): Promise<ResourceLead> {
    const id = randomUUID();
    const lead: ResourceLead = { 
      ...insertLead, 
      id, 
      submittedAt: new Date() 
    };
    this.resourceLeads.set(id, lead);
    return lead;
  }

  async getAllResourceLeads(): Promise<ResourceLead[]> {
    return Array.from(this.resourceLeads.values());
  }

  async createPricebookOptimization(insertOptimization: InsertPricebookOptimization): Promise<PricebookOptimization> {
    const id = randomUUID();
    const optimization: PricebookOptimization = { 
      ...insertOptimization,
      otherCategory: insertOptimization.otherCategory || null,
      id, 
      submittedAt: new Date() 
    };
    this.pricebookOptimizations.set(id, optimization);
    return optimization;
  }

  async getAllPricebookOptimizations(): Promise<PricebookOptimization[]> {
    return Array.from(this.pricebookOptimizations.values());
  }
}

export const storage = new MemStorage();
