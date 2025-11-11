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
