import { 
  type User, 
  type UpsertUser,
  type EmailSubscriber, 
  type InsertEmailSubscriber,
  type ContactSubmission,
  type InsertContactSubmission,
  type ResourceLead,
  type InsertResourceLead,
  type PricebookOptimization,
  type InsertPricebookOptimization,
  type CoursePurchase,
  type InsertCoursePurchase,
  type WinkDemoSubmission,
  type InsertWinkDemoSubmission,
  winkDemoSubmissions
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Admin operations
  getAllUsersWithPurchases(): Promise<Array<User & { purchases: CoursePurchase[] }>>;
  updateUserAdminStatus(userId: string, isAdmin: boolean): Promise<void>;
  
  // Course purchase operations
  createCoursePurchase(purchase: InsertCoursePurchase): Promise<CoursePurchase>;
  getUserCoursePurchases(userId: string): Promise<CoursePurchase[]>;
  hasUserPurchasedCourse(userId: string, courseId: string): Promise<boolean>;
  
  createEmailSubscriber(subscriber: InsertEmailSubscriber): Promise<EmailSubscriber>;
  getEmailSubscriberByEmail(email: string): Promise<EmailSubscriber | undefined>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  createResourceLead(lead: InsertResourceLead): Promise<ResourceLead>;
  getAllResourceLeads(): Promise<ResourceLead[]>;
  
  createPricebookOptimization(optimization: InsertPricebookOptimization): Promise<PricebookOptimization>;
  getAllPricebookOptimizations(): Promise<PricebookOptimization[]>;
  
  createWinkDemoSubmission(submission: InsertWinkDemoSubmission): Promise<WinkDemoSubmission>;
  getAllWinkDemoSubmissions(): Promise<WinkDemoSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private coursePurchases: Map<string, CoursePurchase>;
  private emailSubscribers: Map<string, EmailSubscriber>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private resourceLeads: Map<string, ResourceLead>;
  private pricebookOptimizations: Map<string, PricebookOptimization>;
  private winkDemoSubmissions: Map<string, WinkDemoSubmission>;

  constructor() {
    this.users = new Map();
    this.coursePurchases = new Map();
    this.emailSubscribers = new Map();
    this.contactSubmissions = new Map();
    this.resourceLeads = new Map();
    this.pricebookOptimizations = new Map();
    this.winkDemoSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id);
    const user: User = {
      id: userData.id,
      email: userData.email ?? null,
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      profileImageUrl: userData.profileImageUrl ?? null,
      isAdmin: existingUser?.isAdmin ?? false,
      createdAt: existingUser?.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
    this.users.set(userData.id, user);
    return user;
  }

  async getAllUsersWithPurchases(): Promise<Array<User & { purchases: CoursePurchase[] }>> {
    const allUsers = Array.from(this.users.values());
    return allUsers.map(user => ({
      ...user,
      purchases: Array.from(this.coursePurchases.values()).filter(
        purchase => purchase.userId === user.id
      )
    }));
  }

  async updateUserAdminStatus(userId: string, isAdmin: boolean): Promise<void> {
    const user = this.users.get(userId);
    if (user) {
      const updatedUser: User = {
        ...user,
        isAdmin,
        updatedAt: new Date(),
      };
      this.users.set(userId, updatedUser);
    }
  }

  async createCoursePurchase(insertPurchase: InsertCoursePurchase): Promise<CoursePurchase> {
    const id = randomUUID();
    const purchase: CoursePurchase = {
      id,
      userId: insertPurchase.userId,
      courseId: insertPurchase.courseId,
      amount: insertPurchase.amount,
      stripePaymentIntentId: insertPurchase.stripePaymentIntentId ?? null,
      purchasedAt: new Date(),
    };
    this.coursePurchases.set(id, purchase);
    return purchase;
  }

  async getUserCoursePurchases(userId: string): Promise<CoursePurchase[]> {
    return Array.from(this.coursePurchases.values()).filter(
      (purchase) => purchase.userId === userId
    );
  }

  async hasUserPurchasedCourse(userId: string, courseId: string): Promise<boolean> {
    return Array.from(this.coursePurchases.values()).some(
      (purchase) => purchase.userId === userId && purchase.courseId === courseId
    );
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

  async createWinkDemoSubmission(insertSubmission: InsertWinkDemoSubmission): Promise<WinkDemoSubmission> {
    const [submission] = await db.insert(winkDemoSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllWinkDemoSubmissions(): Promise<WinkDemoSubmission[]> {
    return await db.select().from(winkDemoSubmissions);
  }
}

export const storage = new MemStorage();
