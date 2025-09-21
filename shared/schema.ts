import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, json, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  role: text("role").notNull().default("analyst"), // analyst, admin, restricted
  createdAt: timestamp("created_at").defaultNow(),
});

// OSINT Profiles - Target individuals being investigated
export const profiles = pgTable("profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  occupation: text("occupation"),
  company: text("company"),
  biography: text("biography"),
  profilePhoto: text("profile_photo"),
  digitalFootprintScore: integer("digital_footprint_score"),
  riskLevel: text("risk_level"), // LOW, MODERATE, HIGH, CRITICAL
  interests: text("interests").array(),
  metadata: json("metadata"), // Additional flexible data
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// OSINT Scan Sessions
export const scans = pgTable("scans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").references(() => profiles.id),
  userId: varchar("user_id").references(() => users.id),
  query: text("query").notNull(), // The search query used
  scanType: text("scan_type").notNull(), // profile, geolocation, image, etc.
  status: text("status").notNull().default("pending"), // pending, running, completed, failed
  progress: integer("progress").default(0), // 0-100
  dataPointsProcessed: integer("data_points_processed").default(0),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  metadata: json("metadata"), // Scan configuration and results summary
});

// Social Media Accounts found during OSINT
export const socialAccounts = pgTable("social_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").references(() => profiles.id),
  platform: text("platform").notNull(), // linkedin, twitter, github, instagram
  username: text("username").notNull(),
  displayName: text("display_name"),
  profileUrl: text("profile_url"),
  isVerified: boolean("is_verified").default(false),
  followerCount: integer("follower_count"),
  accountCreatedAt: timestamp("account_created_at"),
  lastActivityAt: timestamp("last_activity_at"),
  metadata: json("metadata"), // Platform-specific data
  discoveredAt: timestamp("discovered_at").defaultNow(),
});

// Threat Assessments
export const threats = pgTable("threats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  profileId: varchar("profile_id").references(() => profiles.id),
  threatLevel: text("threat_level").notNull(), // LOW, MODERATE, HIGH, CRITICAL
  threatType: text("threat_type").notNull(), // insider, external, social_engineering, etc.
  description: text("description"),
  indicators: text("indicators").array(), // Array of threat indicators
  confidence: real("confidence"), // 0.0 to 1.0 confidence score
  source: text("source"), // Source of threat intelligence
  isActive: boolean("is_active").default(true),
  detectedAt: timestamp("detected_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  metadata: json("metadata"),
});

// Alert System
export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  profileId: varchar("profile_id").references(() => profiles.id),
  threatId: varchar("threat_id").references(() => threats.id),
  alertType: text("alert_type").notNull(), // threat_detected, scan_completed, new_intel
  severity: text("severity").notNull(), // info, warning, critical
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  isArchived: boolean("is_archived").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  metadata: json("metadata"),
});

// Scan Results - Detailed results from each scan
export const scanResults = pgTable("scan_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scanId: varchar("scan_id").references(() => scans.id),
  profileId: varchar("profile_id").references(() => profiles.id),
  dataType: text("data_type").notNull(), // personal_info, location, social_media, etc.
  source: text("source").notNull(), // The data source (linkedin, twitter, public_records)
  data: json("data").notNull(), // The actual discovered data
  confidence: real("confidence"), // Confidence in the data accuracy
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: json("metadata"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
  scans: many(scans),
  alerts: many(alerts),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  creator: one(users, {
    fields: [profiles.createdBy],
    references: [users.id],
  }),
  scans: many(scans),
  socialAccounts: many(socialAccounts),
  threats: many(threats),
  alerts: many(alerts),
  scanResults: many(scanResults),
}));

export const scansRelations = relations(scans, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [scans.profileId],
    references: [profiles.id],
  }),
  user: one(users, {
    fields: [scans.userId],
    references: [users.id],
  }),
  results: many(scanResults),
}));

export const socialAccountsRelations = relations(socialAccounts, ({ one }) => ({
  profile: one(profiles, {
    fields: [socialAccounts.profileId],
    references: [profiles.id],
  }),
}));

export const threatsRelations = relations(threats, ({ one }) => ({
  profile: one(profiles, {
    fields: [threats.profileId],
    references: [profiles.id],
  }),
}));

export const alertsRelations = relations(alerts, ({ one }) => ({
  user: one(users, {
    fields: [alerts.userId],
    references: [users.id],
  }),
  profile: one(profiles, {
    fields: [alerts.profileId],
    references: [profiles.id],
  }),
  threat: one(threats, {
    fields: [alerts.threatId],
    references: [threats.id],
  }),
}));

export const scanResultsRelations = relations(scanResults, ({ one }) => ({
  scan: one(scans, {
    fields: [scanResults.scanId],
    references: [scans.id],
  }),
  profile: one(profiles, {
    fields: [scanResults.profileId],
    references: [profiles.id],
  }),
}));

// Zod Schemas and Types
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertScanSchema = createInsertSchema(scans).omit({
  id: true,
  startedAt: true,
  completedAt: true,
});

export const insertSocialAccountSchema = createInsertSchema(socialAccounts).omit({
  id: true,
  discoveredAt: true,
});

export const insertThreatSchema = createInsertSchema(threats).omit({
  id: true,
  detectedAt: true,
  resolvedAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export const insertScanResultSchema = createInsertSchema(scanResults).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;
export type InsertSocialAccount = z.infer<typeof insertSocialAccountSchema>;
export type SocialAccount = typeof socialAccounts.$inferSelect;
export type InsertThreat = z.infer<typeof insertThreatSchema>;
export type Threat = typeof threats.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertScanResult = z.infer<typeof insertScanResultSchema>;
export type ScanResult = typeof scanResults.$inferSelect;
