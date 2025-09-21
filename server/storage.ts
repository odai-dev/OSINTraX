import { 
  type User, type InsertUser,
  type Profile, type InsertProfile,
  type Scan, type InsertScan,
  type SocialAccount, type InsertSocialAccount,
  type Threat, type InsertThreat,
  type Alert, type InsertAlert,
  type ScanResult, type InsertScanResult,
  users, profiles, scans, socialAccounts, threats, alerts, scanResults
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, like, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profile operations
  getProfile(id: string): Promise<Profile | undefined>;
  getProfilesForUser(userId: string): Promise<Profile[]>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, profile: Partial<Profile>): Promise<Profile | undefined>;
  searchProfiles(query: string): Promise<Profile[]>;
  
  // Scan operations
  getScan(id: string): Promise<Scan | undefined>;
  getScansForProfile(profileId: string): Promise<Scan[]>;
  getScansForUser(userId: string): Promise<Scan[]>;
  createScan(scan: InsertScan): Promise<Scan>;
  updateScan(id: string, scan: Partial<Scan>): Promise<Scan | undefined>;
  
  // Social Account operations
  getSocialAccountsForProfile(profileId: string): Promise<SocialAccount[]>;
  createSocialAccount(account: InsertSocialAccount): Promise<SocialAccount>;
  
  // Threat operations
  getThreatsForProfile(profileId: string): Promise<Threat[]>;
  getActiveThreats(): Promise<Threat[]>;
  createThreat(threat: InsertThreat): Promise<Threat>;
  updateThreat(id: string, threat: Partial<Threat>): Promise<Threat | undefined>;
  
  // Alert operations
  getAlertsForUser(userId: string): Promise<Alert[]>;
  getUnreadAlertsForUser(userId: string): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertRead(id: string): Promise<void>;
  
  // Scan Result operations
  getScanResults(scanId: string): Promise<ScanResult[]>;
  createScanResult(result: InsertScanResult): Promise<ScanResult>;
  
  // Dashboard statistics
  getDashboardStats(userId: string): Promise<{
    totalProfiles: number;
    activeScans: number;
    unreadAlerts: number;
    criticalThreats: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Profile operations
  async getProfile(id: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.id, id));
    return profile || undefined;
  }

  async getProfilesForUser(userId: string): Promise<Profile[]> {
    return await db.select().from(profiles)
      .where(eq(profiles.createdBy, userId))
      .orderBy(desc(profiles.createdAt));
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [profile] = await db
      .insert(profiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async updateProfile(id: string, profileUpdate: Partial<Profile>): Promise<Profile | undefined> {
    const [profile] = await db
      .update(profiles)
      .set({ ...profileUpdate, updatedAt: new Date() })
      .where(eq(profiles.id, id))
      .returning();
    return profile || undefined;
  }

  async searchProfiles(query: string): Promise<Profile[]> {
    return await db.select().from(profiles)
      .where(
        or(
          like(profiles.name, `%${query}%`),
          like(profiles.email, `%${query}%`),
          like(profiles.company, `%${query}%`)
        )
      )
      .orderBy(desc(profiles.updatedAt));
  }

  // Scan operations
  async getScan(id: string): Promise<Scan | undefined> {
    const [scan] = await db.select().from(scans).where(eq(scans.id, id));
    return scan || undefined;
  }

  async getScansForProfile(profileId: string): Promise<Scan[]> {
    return await db.select().from(scans)
      .where(eq(scans.profileId, profileId))
      .orderBy(desc(scans.startedAt));
  }

  async getScansForUser(userId: string): Promise<Scan[]> {
    return await db.select().from(scans)
      .where(eq(scans.userId, userId))
      .orderBy(desc(scans.startedAt));
  }

  async createScan(insertScan: InsertScan): Promise<Scan> {
    const [scan] = await db
      .insert(scans)
      .values(insertScan)
      .returning();
    return scan;
  }

  async updateScan(id: string, scanUpdate: Partial<Scan>): Promise<Scan | undefined> {
    const [scan] = await db
      .update(scans)
      .set(scanUpdate)
      .where(eq(scans.id, id))
      .returning();
    return scan || undefined;
  }

  // Social Account operations
  async getSocialAccountsForProfile(profileId: string): Promise<SocialAccount[]> {
    return await db.select().from(socialAccounts)
      .where(eq(socialAccounts.profileId, profileId))
      .orderBy(desc(socialAccounts.discoveredAt));
  }

  async createSocialAccount(insertAccount: InsertSocialAccount): Promise<SocialAccount> {
    const [account] = await db
      .insert(socialAccounts)
      .values(insertAccount)
      .returning();
    return account;
  }

  // Threat operations
  async getThreatsForProfile(profileId: string): Promise<Threat[]> {
    return await db.select().from(threats)
      .where(eq(threats.profileId, profileId))
      .orderBy(desc(threats.detectedAt));
  }

  async getActiveThreats(): Promise<Threat[]> {
    return await db.select().from(threats)
      .where(eq(threats.isActive, true))
      .orderBy(desc(threats.detectedAt));
  }

  async createThreat(insertThreat: InsertThreat): Promise<Threat> {
    const [threat] = await db
      .insert(threats)
      .values(insertThreat)
      .returning();
    return threat;
  }

  async updateThreat(id: string, threatUpdate: Partial<Threat>): Promise<Threat | undefined> {
    const [threat] = await db
      .update(threats)
      .set(threatUpdate)
      .where(eq(threats.id, id))
      .returning();
    return threat || undefined;
  }

  // Alert operations
  async getAlertsForUser(userId: string): Promise<Alert[]> {
    return await db.select().from(alerts)
      .where(and(eq(alerts.userId, userId), eq(alerts.isArchived, false)))
      .orderBy(desc(alerts.createdAt));
  }

  async getUnreadAlertsForUser(userId: string): Promise<Alert[]> {
    return await db.select().from(alerts)
      .where(
        and(
          eq(alerts.userId, userId),
          eq(alerts.isRead, false),
          eq(alerts.isArchived, false)
        )
      )
      .orderBy(desc(alerts.createdAt));
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const [alert] = await db
      .insert(alerts)
      .values(insertAlert)
      .returning();
    return alert;
  }

  async markAlertRead(id: string): Promise<void> {
    await db
      .update(alerts)
      .set({ isRead: true })
      .where(eq(alerts.id, id));
  }

  // Scan Result operations
  async getScanResults(scanId: string): Promise<ScanResult[]> {
    return await db.select().from(scanResults)
      .where(eq(scanResults.scanId, scanId))
      .orderBy(desc(scanResults.timestamp));
  }

  async createScanResult(insertResult: InsertScanResult): Promise<ScanResult> {
    const [result] = await db
      .insert(scanResults)
      .values(insertResult)
      .returning();
    return result;
  }

  // Dashboard statistics
  async getDashboardStats(userId: string): Promise<{
    totalProfiles: number;
    activeScans: number;
    unreadAlerts: number;
    criticalThreats: number;
  }> {
    const [totalProfiles] = await db
      .select({ count: sql<number>`count(*)` })
      .from(profiles)
      .where(eq(profiles.createdBy, userId));

    const [activeScans] = await db
      .select({ count: sql<number>`count(*)` })
      .from(scans)
      .where(
        and(
          eq(scans.userId, userId),
          or(
            eq(scans.status, 'running'),
            eq(scans.status, 'pending')
          )
        )
      );

    const [unreadAlerts] = await db
      .select({ count: sql<number>`count(*)` })
      .from(alerts)
      .where(
        and(
          eq(alerts.userId, userId),
          eq(alerts.isRead, false),
          eq(alerts.isArchived, false)
        )
      );

    const [criticalThreats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(threats)
      .innerJoin(profiles, eq(threats.profileId, profiles.id))
      .where(
        and(
          eq(profiles.createdBy, userId),
          eq(threats.isActive, true),
          eq(threats.threatLevel, 'CRITICAL')
        )
      );

    return {
      totalProfiles: totalProfiles?.count || 0,
      activeScans: activeScans?.count || 0,
      unreadAlerts: unreadAlerts?.count || 0,
      criticalThreats: criticalThreats?.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();
