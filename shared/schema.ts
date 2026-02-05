import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, index, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - updated for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course purchases table to track who has access to which courses
export const coursePurchases = pgTable("course_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: varchar("course_id").notNull(), // e.g., "dashboard-course"
  amount: integer("amount").notNull(), // Amount paid in cents
  stripePaymentIntentId: varchar("stripe_payment_intent_id").unique(),
  purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
});

export const emailSubscribers = pgTable("email_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  role: text("role"),
  message: text("message").notNull(),
  consent: text("consent").notNull().default("true"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const resourceLeads = pgTable("resource_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  resourceName: text("resource_name").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const pricebookOptimizations = pgTable("pricebook_optimizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  otherCategory: text("other_category"),
  currentDescription: text("current_description").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  completed: boolean("completed").notNull().default(false),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const winkDemoSubmissions = pgTable("wink_demo_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  completed: boolean("completed").notNull().default(false),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const smartACDemoSubmissions = pgTable("smartac_demo_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  companyName: text("company_name"),
  websiteUrl: text("website_url"),
  zipCode: text("zip_code"),
  role: text("role"),
  isLicensedContractor: text("is_licensed_contractor"),
  readyToGrow: text("ready_to_grow"),
  membershipAgreements: text("membership_agreements"),
  annualRevenue: text("annual_revenue"),
  serviceTrucks: text("service_trucks"),
  completed: boolean("completed").notNull().default(false),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const contractorCommerceDemoSubmissions = pgTable("contractor_commerce_demo_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name"),
  lastName: text("last_name"),
  companyName: text("company_name"),
  numberOfTechs: text("number_of_techs"),
  email: text("email").notNull(),
  websiteUrl: text("website_url"),
  cellPhone: text("cell_phone"),
  completed: boolean("completed").notNull().default(false),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const liveswitchDemoSubmissions = pgTable("liveswitch_demo_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull(),
  completed: boolean("completed").notNull().default(false),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const podcastEpisodes = pgTable("podcast_episodes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guid: text("guid").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  pubDate: timestamp("pub_date").notNull(),
  audioUrl: text("audio_url").notNull(),
  duration: text("duration"),
  imageUrl: text("image_url"),
  link: text("link"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const smartacROISubmissions = pgTable("smartac_roi_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  activeMembers: integer("active_members").notNull(),
  retentionRate: integer("retention_rate").notNull(),
  newVisitsPerYear: integer("new_visits_per_year").notNull(),
  closeRate: integer("close_rate").notNull(),
  revenuePerMember: integer("revenue_per_member").notNull(),
  roiResults: text("roi_results").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const winkROISubmissions = pgTable("wink_roi_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  invoicesPerMonth: integer("invoices_per_month").notNull(),
  minutesPerInvoice: integer("minutes_per_invoice").notNull(),
  workerHourlyPay: integer("worker_hourly_pay").notNull(),
  mistakeRate: integer("mistake_rate").notNull(),
  costPerMistake: integer("cost_per_mistake").notNull(),
  winkMonthlyCost: integer("wink_monthly_cost").notNull(),
  setupCost: integer("setup_cost").notNull(),
  setupCostSpread: integer("setup_cost_spread").notNull(),
  roiResults: text("roi_results").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const hiringROISubmissions = pgTable("hiring_roi_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  companyName: text("company_name").notNull(),
  trade: text("trade").notNull(),
  serviceTitanUser: text("servicetitan_user").notNull(),
  companySize: text("company_size").notNull(),
  calculatorInputs: text("calculator_inputs").notNull(),
  calculatorResults: text("calculator_results").notNull(),
  leadAlreadyCaptured: boolean("lead_already_captured").default(false),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const phoneTapWaitlist = pgTable("phonetap_waitlist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  companyName: text("company_name").notNull(),
  companySize: text("company_size").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const replayAccess = pgTable("replay_access", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  webinarSlug: text("webinar_slug").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const insertReplayAccessSchema = createInsertSchema(replayAccess).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  webinarSlug: z.string().min(1, "Webinar slug is required"),
});

export type InsertReplayAccess = z.infer<typeof insertReplayAccessSchema>;
export type ReplayAccess = typeof replayAccess.$inferSelect;

// User upsert schema for Replit Auth
export const upsertUserSchema = createInsertSchema(users).omit({
  isAdmin: true,
  createdAt: true,
  updatedAt: true,
}).required({
  id: true,
});

// Course purchase schema
export const insertCoursePurchaseSchema = createInsertSchema(coursePurchases).omit({
  id: true,
  purchasedAt: true,
});

export const insertEmailSubscriberSchema = createInsertSchema(emailSubscribers).omit({
  id: true,
  subscribedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  consent: z.string(),
});

export const insertResourceLeadSchema = createInsertSchema(resourceLeads).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export const insertPricebookOptimizationSchema = createInsertSchema(pricebookOptimizations).omit({
  id: true,
  submittedAt: true,
  completed: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  currentDescription: z.string().min(10, "Please provide more details in your description"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const insertWinkDemoSubmissionSchema = createInsertSchema(winkDemoSubmissions).omit({
  id: true,
  submittedAt: true,
  completed: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const insertSmartACDemoSubmissionSchema = createInsertSchema(smartACDemoSubmissions).omit({
  id: true,
  submittedAt: true,
  completed: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  websiteUrl: z.string().optional(),
  zipCode: z.string().optional(),
  role: z.string().optional(),
  isLicensedContractor: z.string().optional(),
  readyToGrow: z.string().optional(),
  membershipAgreements: z.string().optional(),
  annualRevenue: z.string().optional(),
  serviceTrucks: z.string().optional(),
});

export const insertContractorCommerceDemoSubmissionSchema = createInsertSchema(contractorCommerceDemoSubmissions).omit({
  id: true,
  submittedAt: true,
  completed: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  numberOfTechs: z.string().optional(),
  websiteUrl: z.string().optional(),
  cellPhone: z.string().optional(),
});

export const insertLiveswitchDemoSubmissionSchema = createInsertSchema(liveswitchDemoSubmissions).omit({
  id: true,
  submittedAt: true,
  completed: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const insertSmartACROISubmissionSchema = createInsertSchema(smartacROISubmissions).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
});

export const insertWinkROISubmissionSchema = createInsertSchema(winkROISubmissions).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
});

export const insertHiringROISubmissionSchema = createInsertSchema(hiringROISubmissions).omit({
  id: true,
  submittedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  companyName: z.string().min(1, "Company name is required"),
  trade: z.string().min(1, "Trade is required"),
  serviceTitanUser: z.string().min(1, "Please select an option"),
  companySize: z.string().min(1, "Company size is required"),
});

export const insertPhoneTapWaitlistSchema = createInsertSchema(phoneTapWaitlist).omit({
  id: true,
  submittedAt: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  companyName: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Company size is required"),
});

export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type CoursePurchase = typeof coursePurchases.$inferSelect;
export type InsertCoursePurchase = z.infer<typeof insertCoursePurchaseSchema>;
export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = z.infer<typeof insertEmailSubscriberSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ResourceLead = typeof resourceLeads.$inferSelect;
export type InsertResourceLead = z.infer<typeof insertResourceLeadSchema>;
export type PricebookOptimization = typeof pricebookOptimizations.$inferSelect;
export type InsertPricebookOptimization = z.infer<typeof insertPricebookOptimizationSchema>;
export type WinkDemoSubmission = typeof winkDemoSubmissions.$inferSelect;
export type InsertWinkDemoSubmission = z.infer<typeof insertWinkDemoSubmissionSchema>;
export type SmartACDemoSubmission = typeof smartACDemoSubmissions.$inferSelect;
export type InsertSmartACDemoSubmission = z.infer<typeof insertSmartACDemoSubmissionSchema>;
export type ContractorCommerceDemoSubmission = typeof contractorCommerceDemoSubmissions.$inferSelect;
export type InsertContractorCommerceDemoSubmission = z.infer<typeof insertContractorCommerceDemoSubmissionSchema>;
export type LiveswitchDemoSubmission = typeof liveswitchDemoSubmissions.$inferSelect;
export type InsertLiveswitchDemoSubmission = z.infer<typeof insertLiveswitchDemoSubmissionSchema>;
export type SmartACROISubmission = typeof smartacROISubmissions.$inferSelect;
export type InsertSmartACROISubmission = z.infer<typeof insertSmartACROISubmissionSchema>;
export type WinkROISubmission = typeof winkROISubmissions.$inferSelect;
export type InsertWinkROISubmission = z.infer<typeof insertWinkROISubmissionSchema>;
export type HiringROISubmission = typeof hiringROISubmissions.$inferSelect;
export type InsertHiringROISubmission = z.infer<typeof insertHiringROISubmissionSchema>;
export type PhoneTapWaitlistEntry = typeof phoneTapWaitlist.$inferSelect;
export type InsertPhoneTapWaitlist = z.infer<typeof insertPhoneTapWaitlistSchema>;
export type PodcastEpisode = typeof podcastEpisodes.$inferSelect;
export type InsertPodcastEpisode = typeof podcastEpisodes.$inferInsert;

// ============================================
// PARTNER PORTAL TABLES
// ============================================

// Partner Companies - the main organization entity
export const partnerCompanies = pgTable("partner_companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").default("#ED254E"),
  subscriptionTier: text("subscription_tier"), // e.g., "Diamond", "Elite", "Featured"
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  deliverables: text("deliverables"), // JSON string of deliverables
  termsAccepted: boolean("terms_accepted").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Partner Users - links users to companies with roles
export const partnerUsers = pgTable("partner_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  companyId: varchar("company_id").references(() => partnerCompanies.id),
  role: text("role").notNull().default("user"), // "master_admin", "account_admin", "user"
  createdAt: timestamp("created_at").defaultNow(),
});

// Partner Invites - pending invites
export const partnerInvites = pgTable("partner_invites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  companyId: varchar("company_id").references(() => partnerCompanies.id),
  role: text("role").notNull().default("user"), // "account_admin" or "user"
  invitedBy: varchar("invited_by").references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  acceptedAt: timestamp("accepted_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Partner Campaign Metrics - performance data
export const partnerCampaignMetrics = pgTable("partner_campaign_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").notNull().references(() => partnerCompanies.id),
  reportDate: timestamp("report_date").notNull(),
  reportPeriod: text("report_period"), // e.g., "August 2025"
  
  // Email metrics
  emailRecipients: integer("email_recipients"),
  emailOpenRate: text("email_open_rate"),
  emailClickRate: text("email_click_rate"),
  emailTotalClicks: integer("email_total_clicks"),
  emailTopLink: text("email_top_link"),
  emailNotes: text("email_notes"),
  
  // Facebook metrics
  fbPostReach: integer("fb_post_reach"),
  fbPostEngagement: integer("fb_post_engagement"),
  fbVideoViews: integer("fb_video_views"),
  fbNotes: text("fb_notes"),
  
  // YouTube metrics
  ytViews: integer("yt_views"),
  ytAvgDuration: text("yt_avg_duration"),
  ytRetention: text("yt_retention"),
  ytSubscribers: integer("yt_subscribers"),
  ytNotes: text("yt_notes"),
  
  // Facebook Ads metrics
  fbAdReach: integer("fb_ad_reach"),
  fbAdImpressions: integer("fb_ad_impressions"),
  fbAdClicks: integer("fb_ad_clicks"),
  fbAdCtr: text("fb_ad_ctr"),
  fbAdCpc: text("fb_ad_cpc"),
  fbAdSpend: text("fb_ad_spend"),
  fbAdNotes: text("fb_ad_notes"),
  
  // Funnel metrics
  funnelGroupMembers: integer("funnel_group_members"),
  funnelPosts: integer("funnel_posts"),
  funnelComments: integer("funnel_comments"),
  funnelReactions: integer("funnel_reactions"),
  funnelActiveMembers: integer("funnel_active_members"),
  funnelLandingPageVisits: integer("funnel_landing_page_visits"),
  funnelUniqueUsers: integer("funnel_unique_users"),
  funnelNotes: text("funnel_notes"),
  
  // Link engagement
  linkTotalClicks: integer("link_total_clicks"),
  linkUniqueUsers: integer("link_unique_users"),
  linkReferrers: integer("link_referrers"),
  linkNotes: text("link_notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// Partner Content Calendar - scheduled content
export const partnerContentCalendar = pgTable("partner_content_calendar", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").notNull().references(() => partnerCompanies.id),
  scheduledDate: timestamp("scheduled_date").notNull(),
  contentType: text("content_type").notNull(), // "email", "social", "podcast", "video", "ad"
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("scheduled"), // "scheduled", "published", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
});

// Partner Brand Assets - uploaded brand files
export const partnerBrandAssets = pgTable("partner_brand_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").notNull().references(() => partnerCompanies.id),
  assetType: text("asset_type").notNull(), // "logo", "icon", "banner", "color_palette", "font", "other"
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertPartnerCompanySchema = createInsertSchema(partnerCompanies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPartnerUserSchema = createInsertSchema(partnerUsers).omit({
  id: true,
  createdAt: true,
});

export const insertPartnerInviteSchema = createInsertSchema(partnerInvites).omit({
  id: true,
  createdAt: true,
  acceptedAt: true,
});

export const insertPartnerCampaignMetricSchema = createInsertSchema(partnerCampaignMetrics).omit({
  id: true,
  createdAt: true,
});

export const insertPartnerContentCalendarSchema = createInsertSchema(partnerContentCalendar).omit({
  id: true,
  createdAt: true,
});

export const insertPartnerBrandAssetSchema = createInsertSchema(partnerBrandAssets).omit({
  id: true,
  createdAt: true,
});

// Types
export type PartnerCompany = typeof partnerCompanies.$inferSelect;
export type InsertPartnerCompany = z.infer<typeof insertPartnerCompanySchema>;
export type PartnerUser = typeof partnerUsers.$inferSelect;
export type InsertPartnerUser = z.infer<typeof insertPartnerUserSchema>;
export type PartnerInvite = typeof partnerInvites.$inferSelect;
export type InsertPartnerInvite = z.infer<typeof insertPartnerInviteSchema>;
export type PartnerCampaignMetric = typeof partnerCampaignMetrics.$inferSelect;
export type InsertPartnerCampaignMetric = z.infer<typeof insertPartnerCampaignMetricSchema>;
export type PartnerContentCalendarItem = typeof partnerContentCalendar.$inferSelect;
export type InsertPartnerContentCalendarItem = z.infer<typeof insertPartnerContentCalendarSchema>;
export type PartnerBrandAsset = typeof partnerBrandAssets.$inferSelect;
export type InsertPartnerBrandAsset = z.infer<typeof insertPartnerBrandAssetSchema>;
