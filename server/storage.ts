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
  type SmartACDemoSubmission,
  type InsertSmartACDemoSubmission,
  type ContractorCommerceDemoSubmission,
  type InsertContractorCommerceDemoSubmission,
  type LiveswitchDemoSubmission,
  type InsertLiveswitchDemoSubmission,
  type SmartACROISubmission,
  type InsertSmartACROISubmission,
  type WinkROISubmission,
  type InsertWinkROISubmission,
  type HiringROISubmission,
  type InsertHiringROISubmission,
  type PodcastEpisode,
  type PartnerCompany,
  type InsertPartnerCompany,
  type PartnerUser,
  type InsertPartnerUser,
  type PartnerInvite,
  type InsertPartnerInvite,
  type PartnerCampaignMetric,
  type InsertPartnerCampaignMetric,
  type PartnerContentCalendarItem,
  type InsertPartnerContentCalendarItem,
  type PartnerBrandAsset,
  type InsertPartnerBrandAsset,
  pricebookOptimizations,
  winkDemoSubmissions,
  smartACDemoSubmissions,
  contractorCommerceDemoSubmissions,
  liveswitchDemoSubmissions,
  smartacROISubmissions,
  winkROISubmissions,
  hiringROISubmissions,
  podcastEpisodes,
  partnerCompanies,
  partnerUsers,
  partnerInvites,
  partnerCampaignMetrics,
  partnerContentCalendar,
  partnerBrandAssets,
  users
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { sql } from "drizzle-orm";

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
  upsertPricebookOptimization(email: string, optimization: InsertPricebookOptimization): Promise<PricebookOptimization>;
  markPricebookAsComplete(email: string): Promise<void>;
  
  createWinkDemoSubmission(submission: InsertWinkDemoSubmission): Promise<WinkDemoSubmission>;
  getAllWinkDemoSubmissions(): Promise<WinkDemoSubmission[]>;
  upsertWinkDemoSubmission(email: string, submission: InsertWinkDemoSubmission): Promise<WinkDemoSubmission>;
  markWinkDemoAsComplete(email: string): Promise<void>;
  
  createSmartACDemoSubmission(submission: InsertSmartACDemoSubmission): Promise<SmartACDemoSubmission>;
  getAllSmartACDemoSubmissions(): Promise<SmartACDemoSubmission[]>;
  upsertSmartACDemoSubmission(email: string, submission: InsertSmartACDemoSubmission): Promise<SmartACDemoSubmission>;
  markSmartACDemoAsComplete(email: string): Promise<void>;
  
  createContractorCommerceDemoSubmission(submission: InsertContractorCommerceDemoSubmission): Promise<ContractorCommerceDemoSubmission>;
  getAllContractorCommerceDemoSubmissions(): Promise<ContractorCommerceDemoSubmission[]>;
  upsertContractorCommerceDemoSubmission(email: string, submission: InsertContractorCommerceDemoSubmission): Promise<ContractorCommerceDemoSubmission>;
  markContractorCommerceDemoAsComplete(email: string): Promise<void>;
  
  createLiveswitchDemoSubmission(submission: InsertLiveswitchDemoSubmission): Promise<LiveswitchDemoSubmission>;
  getAllLiveswitchDemoSubmissions(): Promise<LiveswitchDemoSubmission[]>;
  upsertLiveswitchDemoSubmission(email: string, submission: InsertLiveswitchDemoSubmission): Promise<LiveswitchDemoSubmission>;
  markLiveswitchDemoAsComplete(email: string): Promise<void>;
  
  createSmartACROISubmission(submission: InsertSmartACROISubmission): Promise<SmartACROISubmission>;
  getAllSmartACROISubmissions(): Promise<SmartACROISubmission[]>;
  
  createWinkROISubmission(submission: InsertWinkROISubmission): Promise<WinkROISubmission>;
  getAllWinkROISubmissions(): Promise<WinkROISubmission[]>;
  
  createHiringROISubmission(submission: InsertHiringROISubmission): Promise<HiringROISubmission>;
  getAllHiringROISubmissions(): Promise<HiringROISubmission[]>;
  
  // Podcast operations
  getPodcastEpisodes(): Promise<PodcastEpisode[]>;
  
  // Partner Portal operations
  // Companies
  createPartnerCompany(company: InsertPartnerCompany): Promise<PartnerCompany>;
  getPartnerCompany(id: string): Promise<PartnerCompany | undefined>;
  getAllPartnerCompanies(): Promise<PartnerCompany[]>;
  updatePartnerCompany(id: string, updates: Partial<InsertPartnerCompany>): Promise<PartnerCompany | undefined>;
  deletePartnerCompany(id: string): Promise<void>;
  
  // Partner Users
  createPartnerUser(partnerUser: InsertPartnerUser): Promise<PartnerUser>;
  getPartnerUser(userId: string): Promise<PartnerUser | undefined>;
  getPartnerUsersByCompany(companyId: string): Promise<Array<PartnerUser & { user: User }>>;
  updatePartnerUserRole(userId: string, role: string): Promise<void>;
  deletePartnerUser(userId: string): Promise<void>;
  getMasterAdmins(): Promise<PartnerUser[]>;
  
  // Partner Invites
  createPartnerInvite(invite: InsertPartnerInvite): Promise<PartnerInvite>;
  getPartnerInviteByToken(token: string): Promise<PartnerInvite | undefined>;
  getPartnerInvitesByCompany(companyId: string): Promise<PartnerInvite[]>;
  acceptPartnerInvite(token: string): Promise<void>;
  deletePartnerInvite(id: string): Promise<void>;
  
  // Campaign Metrics
  createPartnerCampaignMetric(metric: InsertPartnerCampaignMetric): Promise<PartnerCampaignMetric>;
  getPartnerCampaignMetrics(companyId: string): Promise<PartnerCampaignMetric[]>;
  updatePartnerCampaignMetric(id: string, updates: Partial<InsertPartnerCampaignMetric>): Promise<PartnerCampaignMetric | undefined>;
  deletePartnerCampaignMetric(id: string): Promise<void>;
  
  // Content Calendar
  createPartnerContentCalendarItem(item: InsertPartnerContentCalendarItem): Promise<PartnerContentCalendarItem>;
  getPartnerContentCalendar(companyId: string): Promise<PartnerContentCalendarItem[]>;
  updatePartnerContentCalendarItem(id: string, updates: Partial<InsertPartnerContentCalendarItem>): Promise<PartnerContentCalendarItem | undefined>;
  deletePartnerContentCalendarItem(id: string): Promise<void>;
  
  // Brand Assets
  createPartnerBrandAsset(asset: InsertPartnerBrandAsset): Promise<PartnerBrandAsset>;
  getPartnerBrandAssets(companyId: string): Promise<PartnerBrandAsset[]>;
  deletePartnerBrandAsset(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private coursePurchases: Map<string, CoursePurchase>;
  private emailSubscribers: Map<string, EmailSubscriber>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private resourceLeads: Map<string, ResourceLead>;
  private pricebookOptimizations: Map<string, PricebookOptimization>;
  private winkDemoSubmissions: Map<string, WinkDemoSubmission>;
  private smartACDemoSubmissions: Map<string, SmartACDemoSubmission>;

  constructor() {
    this.users = new Map();
    this.coursePurchases = new Map();
    this.emailSubscribers = new Map();
    this.contactSubmissions = new Map();
    this.resourceLeads = new Map();
    this.pricebookOptimizations = new Map();
    this.winkDemoSubmissions = new Map();
    this.smartACDemoSubmissions = new Map();
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
    const [optimization] = await db.insert(pricebookOptimizations)
      .values(insertOptimization)
      .returning();
    return optimization;
  }

  async getAllPricebookOptimizations(): Promise<PricebookOptimization[]> {
    return await db.select().from(pricebookOptimizations);
  }

  async upsertPricebookOptimization(email: string, insertOptimization: InsertPricebookOptimization): Promise<PricebookOptimization> {
    const existing = await db.select().from(pricebookOptimizations)
      .where(sql`${pricebookOptimizations.email} = ${email} AND ${pricebookOptimizations.completed} = false`)
      .limit(1);
    
    if (existing.length > 0) {
      const [updated] = await db.update(pricebookOptimizations)
        .set({
          ...insertOptimization,
          submittedAt: new Date(),
        })
        .where(sql`${pricebookOptimizations.id} = ${existing[0].id}`)
        .returning();
      return updated;
    } else {
      const [optimization] = await db.insert(pricebookOptimizations)
        .values(insertOptimization)
        .returning();
      return optimization;
    }
  }

  async markPricebookAsComplete(email: string): Promise<void> {
    await db.update(pricebookOptimizations)
      .set({ completed: true })
      .where(sql`${pricebookOptimizations.email} = ${email} AND ${pricebookOptimizations.completed} = false`);
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

  async createSmartACDemoSubmission(insertSubmission: InsertSmartACDemoSubmission): Promise<SmartACDemoSubmission> {
    const [submission] = await db.insert(smartACDemoSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllSmartACDemoSubmissions(): Promise<SmartACDemoSubmission[]> {
    return await db.select().from(smartACDemoSubmissions);
  }

  async upsertWinkDemoSubmission(email: string, insertSubmission: InsertWinkDemoSubmission): Promise<WinkDemoSubmission> {
    const existing = await db.select().from(winkDemoSubmissions)
      .where(sql`${winkDemoSubmissions.email} = ${email} AND ${winkDemoSubmissions.completed} = false`)
      .limit(1);
    
    if (existing.length > 0) {
      const [updated] = await db.update(winkDemoSubmissions)
        .set({
          ...insertSubmission,
          submittedAt: new Date(),
        })
        .where(sql`${winkDemoSubmissions.id} = ${existing[0].id}`)
        .returning();
      return updated;
    } else {
      const [submission] = await db.insert(winkDemoSubmissions)
        .values(insertSubmission)
        .returning();
      return submission;
    }
  }

  async markWinkDemoAsComplete(email: string): Promise<void> {
    await db.update(winkDemoSubmissions)
      .set({ completed: true })
      .where(sql`${winkDemoSubmissions.email} = ${email} AND ${winkDemoSubmissions.completed} = false`);
  }

  async upsertSmartACDemoSubmission(email: string, insertSubmission: InsertSmartACDemoSubmission): Promise<SmartACDemoSubmission> {
    const existing = await db.select().from(smartACDemoSubmissions)
      .where(sql`${smartACDemoSubmissions.email} = ${email} AND ${smartACDemoSubmissions.completed} = false`)
      .limit(1);
    
    if (existing.length > 0) {
      const [updated] = await db.update(smartACDemoSubmissions)
        .set({
          ...insertSubmission,
          submittedAt: new Date(),
        })
        .where(sql`${smartACDemoSubmissions.id} = ${existing[0].id}`)
        .returning();
      return updated;
    } else {
      const [submission] = await db.insert(smartACDemoSubmissions)
        .values(insertSubmission)
        .returning();
      return submission;
    }
  }

  async markSmartACDemoAsComplete(email: string): Promise<void> {
    await db.update(smartACDemoSubmissions)
      .set({ completed: true })
      .where(sql`${smartACDemoSubmissions.email} = ${email} AND ${smartACDemoSubmissions.completed} = false`);
  }

  async createContractorCommerceDemoSubmission(insertSubmission: InsertContractorCommerceDemoSubmission): Promise<ContractorCommerceDemoSubmission> {
    const [submission] = await db.insert(contractorCommerceDemoSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllContractorCommerceDemoSubmissions(): Promise<ContractorCommerceDemoSubmission[]> {
    return await db.select().from(contractorCommerceDemoSubmissions);
  }

  async upsertContractorCommerceDemoSubmission(email: string, insertSubmission: InsertContractorCommerceDemoSubmission): Promise<ContractorCommerceDemoSubmission> {
    const existing = await db.select().from(contractorCommerceDemoSubmissions)
      .where(sql`${contractorCommerceDemoSubmissions.email} = ${email} AND ${contractorCommerceDemoSubmissions.completed} = false`)
      .limit(1);
    
    if (existing.length > 0) {
      const [updated] = await db.update(contractorCommerceDemoSubmissions)
        .set({
          ...insertSubmission,
          submittedAt: new Date(),
        })
        .where(sql`${contractorCommerceDemoSubmissions.id} = ${existing[0].id}`)
        .returning();
      return updated;
    } else {
      const [submission] = await db.insert(contractorCommerceDemoSubmissions)
        .values(insertSubmission)
        .returning();
      return submission;
    }
  }

  async markContractorCommerceDemoAsComplete(email: string): Promise<void> {
    await db.update(contractorCommerceDemoSubmissions)
      .set({ completed: true })
      .where(sql`${contractorCommerceDemoSubmissions.email} = ${email} AND ${contractorCommerceDemoSubmissions.completed} = false`);
  }

  async createLiveswitchDemoSubmission(insertSubmission: InsertLiveswitchDemoSubmission): Promise<LiveswitchDemoSubmission> {
    const [submission] = await db.insert(liveswitchDemoSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllLiveswitchDemoSubmissions(): Promise<LiveswitchDemoSubmission[]> {
    return await db.select().from(liveswitchDemoSubmissions);
  }

  async upsertLiveswitchDemoSubmission(email: string, insertSubmission: InsertLiveswitchDemoSubmission): Promise<LiveswitchDemoSubmission> {
    const existing = await db.select().from(liveswitchDemoSubmissions)
      .where(sql`${liveswitchDemoSubmissions.email} = ${email} AND ${liveswitchDemoSubmissions.completed} = false`)
      .limit(1);
    
    if (existing.length > 0) {
      const [updated] = await db.update(liveswitchDemoSubmissions)
        .set({
          ...insertSubmission,
          submittedAt: new Date(),
        })
        .where(sql`${liveswitchDemoSubmissions.id} = ${existing[0].id}`)
        .returning();
      return updated;
    } else {
      const [submission] = await db.insert(liveswitchDemoSubmissions)
        .values(insertSubmission)
        .returning();
      return submission;
    }
  }

  async markLiveswitchDemoAsComplete(email: string): Promise<void> {
    await db.update(liveswitchDemoSubmissions)
      .set({ completed: true })
      .where(sql`${liveswitchDemoSubmissions.email} = ${email} AND ${liveswitchDemoSubmissions.completed} = false`);
  }

  async createSmartACROISubmission(insertSubmission: InsertSmartACROISubmission): Promise<SmartACROISubmission> {
    const [submission] = await db.insert(smartacROISubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllSmartACROISubmissions(): Promise<SmartACROISubmission[]> {
    return await db.select().from(smartacROISubmissions);
  }

  async createWinkROISubmission(insertSubmission: InsertWinkROISubmission): Promise<WinkROISubmission> {
    const [submission] = await db.insert(winkROISubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllWinkROISubmissions(): Promise<WinkROISubmission[]> {
    return await db.select().from(winkROISubmissions);
  }

  async createHiringROISubmission(insertSubmission: InsertHiringROISubmission): Promise<HiringROISubmission> {
    const [submission] = await db.insert(hiringROISubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getAllHiringROISubmissions(): Promise<HiringROISubmission[]> {
    return await db.select().from(hiringROISubmissions);
  }

  async getPodcastEpisodes(): Promise<PodcastEpisode[]> {
    return await db.select().from(podcastEpisodes).orderBy(sql`${podcastEpisodes.pubDate} DESC`);
  }

  // Partner Portal implementations
  async createPartnerCompany(company: InsertPartnerCompany): Promise<PartnerCompany> {
    const [newCompany] = await db.insert(partnerCompanies).values(company).returning();
    return newCompany;
  }

  async getPartnerCompany(id: string): Promise<PartnerCompany | undefined> {
    const [company] = await db.select().from(partnerCompanies).where(sql`${partnerCompanies.id} = ${id}`);
    return company;
  }

  async getAllPartnerCompanies(): Promise<PartnerCompany[]> {
    return await db.select().from(partnerCompanies).orderBy(sql`${partnerCompanies.createdAt} DESC`);
  }

  async updatePartnerCompany(id: string, updates: Partial<InsertPartnerCompany>): Promise<PartnerCompany | undefined> {
    const [updated] = await db.update(partnerCompanies)
      .set({ ...updates, updatedAt: new Date() })
      .where(sql`${partnerCompanies.id} = ${id}`)
      .returning();
    return updated;
  }

  async deletePartnerCompany(id: string): Promise<void> {
    await db.delete(partnerCompanies).where(sql`${partnerCompanies.id} = ${id}`);
  }

  async createPartnerUser(partnerUser: InsertPartnerUser): Promise<PartnerUser> {
    const [newPartnerUser] = await db.insert(partnerUsers).values(partnerUser).returning();
    return newPartnerUser;
  }

  async getPartnerUser(userId: string): Promise<PartnerUser | undefined> {
    const [partnerUser] = await db.select().from(partnerUsers).where(sql`${partnerUsers.userId} = ${userId}`);
    return partnerUser;
  }

  async getPartnerUsersByCompany(companyId: string): Promise<Array<PartnerUser & { user: User }>> {
    const result = await db.select({
      partnerUser: partnerUsers,
      user: users
    })
    .from(partnerUsers)
    .innerJoin(users, sql`${partnerUsers.userId} = ${users.id}`)
    .where(sql`${partnerUsers.companyId} = ${companyId}`);
    
    return result.map(r => ({ ...r.partnerUser, user: r.user }));
  }

  async updatePartnerUserRole(userId: string, role: string): Promise<void> {
    await db.update(partnerUsers)
      .set({ role })
      .where(sql`${partnerUsers.userId} = ${userId}`);
  }

  async deletePartnerUser(userId: string): Promise<void> {
    await db.delete(partnerUsers).where(sql`${partnerUsers.userId} = ${userId}`);
  }

  async getMasterAdmins(): Promise<PartnerUser[]> {
    return await db.select().from(partnerUsers).where(sql`${partnerUsers.role} = 'master_admin'`);
  }

  async createPartnerInvite(invite: InsertPartnerInvite): Promise<PartnerInvite> {
    const [newInvite] = await db.insert(partnerInvites).values(invite).returning();
    return newInvite;
  }

  async getPartnerInviteByToken(token: string): Promise<PartnerInvite | undefined> {
    const [invite] = await db.select().from(partnerInvites).where(sql`${partnerInvites.token} = ${token}`);
    return invite;
  }

  async getPartnerInvitesByCompany(companyId: string): Promise<PartnerInvite[]> {
    return await db.select().from(partnerInvites).where(sql`${partnerInvites.companyId} = ${companyId}`);
  }

  async acceptPartnerInvite(token: string): Promise<void> {
    await db.update(partnerInvites)
      .set({ acceptedAt: new Date() })
      .where(sql`${partnerInvites.token} = ${token}`);
  }

  async deletePartnerInvite(id: string): Promise<void> {
    await db.delete(partnerInvites).where(sql`${partnerInvites.id} = ${id}`);
  }

  async createPartnerCampaignMetric(metric: InsertPartnerCampaignMetric): Promise<PartnerCampaignMetric> {
    const [newMetric] = await db.insert(partnerCampaignMetrics).values(metric).returning();
    return newMetric;
  }

  async getPartnerCampaignMetrics(companyId: string): Promise<PartnerCampaignMetric[]> {
    return await db.select().from(partnerCampaignMetrics)
      .where(sql`${partnerCampaignMetrics.companyId} = ${companyId}`)
      .orderBy(sql`${partnerCampaignMetrics.reportDate} DESC`);
  }

  async updatePartnerCampaignMetric(id: string, updates: Partial<InsertPartnerCampaignMetric>): Promise<PartnerCampaignMetric | undefined> {
    const [updated] = await db.update(partnerCampaignMetrics)
      .set(updates)
      .where(sql`${partnerCampaignMetrics.id} = ${id}`)
      .returning();
    return updated;
  }

  async deletePartnerCampaignMetric(id: string): Promise<void> {
    await db.delete(partnerCampaignMetrics).where(sql`${partnerCampaignMetrics.id} = ${id}`);
  }

  async createPartnerContentCalendarItem(item: InsertPartnerContentCalendarItem): Promise<PartnerContentCalendarItem> {
    const [newItem] = await db.insert(partnerContentCalendar).values(item).returning();
    return newItem;
  }

  async getPartnerContentCalendar(companyId: string): Promise<PartnerContentCalendarItem[]> {
    return await db.select().from(partnerContentCalendar)
      .where(sql`${partnerContentCalendar.companyId} = ${companyId}`)
      .orderBy(sql`${partnerContentCalendar.scheduledDate} ASC`);
  }

  async updatePartnerContentCalendarItem(id: string, updates: Partial<InsertPartnerContentCalendarItem>): Promise<PartnerContentCalendarItem | undefined> {
    const [updated] = await db.update(partnerContentCalendar)
      .set(updates)
      .where(sql`${partnerContentCalendar.id} = ${id}`)
      .returning();
    return updated;
  }

  async deletePartnerContentCalendarItem(id: string): Promise<void> {
    await db.delete(partnerContentCalendar).where(sql`${partnerContentCalendar.id} = ${id}`);
  }

  async createPartnerBrandAsset(asset: InsertPartnerBrandAsset): Promise<PartnerBrandAsset> {
    const [newAsset] = await db.insert(partnerBrandAssets).values(asset).returning();
    return newAsset;
  }

  async getPartnerBrandAssets(companyId: string): Promise<PartnerBrandAsset[]> {
    return await db.select().from(partnerBrandAssets)
      .where(sql`${partnerBrandAssets.companyId} = ${companyId}`)
      .orderBy(sql`${partnerBrandAssets.createdAt} DESC`);
  }

  async deletePartnerBrandAsset(id: string): Promise<void> {
    await db.delete(partnerBrandAssets).where(sql`${partnerBrandAssets.id} = ${id}`);
  }
}

export const storage = new MemStorage();
