// Centralized mock data for the OSINTraX demo
// All data is Yemen-focused for authentic regional demonstration

import type { 
  PersonalData, 
  SocialMediaProfile, 
  LocationData, 
  NetworkNode, 
  NetworkConnection,
  ThreatAssessment,
  ChartData,
  RiskMetric 
} from '@/types';

// Main profile data for Ahmed Mohammed Al-Hamdani
export const mockPersonalData: PersonalData = {
  name: "Ahmed Mohammed Al-Hamdani",
  age: 28,
  location: "Sana'a, Yemen",
  occupation: "Network Administrator",
  company: "Yemen Telecommunications Corp",
  email: "a.alhamdani@yementelecom.ye",
  phone: "+967 1 234-567",
  education: "Sana'a University - Information Technology",
  interests: ["Network Security", "Islamic Studies", "Football", "Traditional Yemeni Music"],
  digitalFootprint: {
    score: 73,
    risk: "High",
    lastActivity: "47m ago" // This will be updated dynamically
  }
};

export const mockSocialMediaProfiles: SocialMediaProfile[] = [
  { platform: "LinkedIn", username: "@ahmed-alhamdani-yemen", verified: true },
  { platform: "Twitter", username: "@ahmed_sanaa", verified: false },
  { platform: "GitHub", username: "ahmed-alhamdani", verified: true },
  { platform: "Instagram", username: "@ahmed.yemen", verified: false },
  { platform: "Facebook", username: "ahmed.mohammed.sanaa", verified: false },
  { platform: "Telegram", username: "@ahmed_tech_yemen", verified: false }
];

export const mockLocations: LocationData[] = [
  {
    id: 1,
    name: "Home Address",
    address: "Al-Sabeen District, Hadda Street, Sana'a, Yemen",
    coordinates: "15.3694° N, 44.1910° E",
    confidence: 91,
    lastSeen: "47 minutes ago",
    type: "residence",
    verified: true
  },
  {
    id: 2,
    name: "Workplace",
    address: "Yemen Telecom HQ, Al-Zubairy Street, Sana'a, Yemen",
    coordinates: "15.3547° N, 44.2066° E",
    confidence: 88,
    lastSeen: "9 hours ago",
    type: "workplace",
    verified: true
  },
  {
    id: 3,
    name: "Frequent Location",
    address: "Al-Saleh Mosque, Old City, Sana'a, Yemen",
    coordinates: "15.3533° N, 44.2053° E",
    confidence: 76,
    lastSeen: "2 days ago",
    type: "recreational",
    verified: true
  },
  {
    id: 4,
    name: "University Campus", 
    address: "Sana'a University, IT Faculty, Sana'a, Yemen",
    coordinates: "15.3445° N, 44.2234° E",
    confidence: 82,
    lastSeen: "1 week ago",
    type: "recreational",
    verified: true
  }
];

export const mockNetworkNodes: NetworkNode[] = [
  { id: "central", x: 50, y: 50, type: "primary", label: "Ahmed Al-Hamdani", connections: 12, risk: "high" },
  { id: "work1", x: 30, y: 30, type: "work", label: "Yemen Telecom Corp", connections: 7, risk: "medium" },
  { id: "social1", x: 70, y: 30, type: "social", label: "Sana'a Tech Community", connections: 34, risk: "medium" },
  { id: "family1", x: 20, y: 70, type: "family", label: "Mohammed Al-Hamdani", connections: 4, risk: "low" },
  { id: "friend1", x: 80, y: 70, type: "friend", label: "University Alumni", connections: 18, risk: "low" },
  { id: "location1", x: 40, y: 80, type: "location", label: "Al-Sabeen District", connections: 23, risk: "high" },
  { id: "digital1", x: 60, y: 20, type: "digital", label: "Islamic Forums", connections: 56, risk: "medium" },
  { id: "work2", x: 15, y: 40, type: "work", label: "IT Department Yemen", connections: 12, risk: "medium" },
  { id: "social2", x: 85, y: 50, type: "social", label: "Football Club Sana'a", connections: 28, risk: "low" }
];

export const mockNetworkConnections: NetworkConnection[] = [
  { from: "central", to: "work1", strength: "strong", type: "professional" },
  { from: "central", to: "social1", strength: "medium", type: "social" },
  { from: "central", to: "family1", strength: "strong", type: "personal" },
  { from: "central", to: "friend1", strength: "medium", type: "social" },
  { from: "central", to: "location1", strength: "weak", type: "geographical" },
  { from: "central", to: "digital1", strength: "strong", type: "digital" },
  { from: "work1", to: "location1", strength: "medium", type: "geographical" },
  { from: "social1", to: "digital1", strength: "strong", type: "cross-platform" },
  { from: "central", to: "work2", strength: "strong", type: "professional" },
  { from: "central", to: "social2", strength: "medium", type: "social" }
];

export const mockThreatAssessments: ThreatAssessment[] = [
  {
    category: "Public Exposure",
    level: "High",
    description: "Extensive digital footprint across multiple platforms",
    indicators: ["Multiple social media accounts", "Professional information leaked", "Location data exposed"],
    confidence: 87
  },
  {
    category: "Data Breaches",
    level: "Critical",
    description: "Personal information found in 2 known data breaches",
    indicators: ["Email in breach database", "Phone number compromised", "Password hash exposed"],
    confidence: 94
  },
  {
    category: "Social Engineering Risk",
    level: "Medium",
    description: "Sufficient public information for targeted attacks",
    indicators: ["Family connections visible", "Work details public", "Interests documented"],
    confidence: 71
  },
  {
    category: "Physical Security",
    level: "High", 
    description: "Location patterns and frequent places identified",
    indicators: ["Home address triangulated", "Work location confirmed", "Daily routine predictable"],
    confidence: 89
  }
];

// Yemen-specific OSINT terminal messages
export const yemenOSINTCommands = [
  { text: "[INFO] Scanning Yemen telecom infrastructure...", type: 'info' as const },
  { text: "[DATA] Found new social media profile: @ahmed_sanaa_tech", type: 'success' as const },
  { text: "[WARN] High encryption detected on target communications", type: 'warn' as const },
  { text: "[INFO] Cross-referencing with Sana'a University database", type: 'info' as const },
  { text: "[DATA] Geographic correlation: Al-Sabeen District", type: 'success' as const },
  { text: "[WARN] Suspicious VPN activity detected (+967 numbers)", type: 'warn' as const },
  { text: "[INFO] Analyzing Arabic text patterns in communications", type: 'info' as const },
  { text: "[DATA] Phone number verification complete: +967-1-234-567", type: 'success' as const },
  { text: "[ERROR] Connection timeout to regional data source", type: 'error' as const },
  { text: "[INFO] Islamic forum activity correlation in progress", type: 'info' as const },
  { text: "[DATA] Location metadata extracted from photo: Sana'a", type: 'success' as const },
  { text: "[WARN] Cross-border communication pattern detected", type: 'warn' as const },
  { text: "[INFO] Yemen regional social network scan initiated", type: 'info' as const },
  { text: "[DATA] Professional network mapping: Yemen Telecom", type: 'success' as const },
  { text: "[WARN] Potential government surveillance detected", type: 'warn' as const },
  { text: "[INFO] Correlating tribal affiliation data", type: 'info' as const }
];

// Scanning step sequences
export const scanningStatuses = [
  "Initializing OSINT modules...",
  "Scanning regional social networks...", 
  "Cross-referencing Yemen telecom data...",
  "Analyzing digital footprints...",
  "Calculating regional risk factors...",
  "Generating intelligence report..."
];

export const imageScanStatuses = [
  "Processing image metadata...",
  "Running facial recognition...",
  "Cross-referencing Yemen telecom data...",
  "Extracting metadata...",
  "Mapping regional social profiles...",
  "Generating intelligence report..."
];

// Chart data for analytics
export const digitalFootprintData: ChartData[] = [
  { name: "Social Media", value: 35, color: "#22d3ee" },
  { name: "Professional", value: 25, color: "#8b5cf6" },
  { name: "Public Records", value: 20, color: "#f59e0b" },
  { name: "Academic", value: 12, color: "#10b981" },
  { name: "Other", value: 8, color: "#64748b" }
];

export const riskMetrics: RiskMetric[] = [
  { category: "Privacy Score", score: 6.2, trend: "down", change: -0.4 },
  { category: "Exposure Level", score: 8.7, trend: "up", change: 1.2 },
  { category: "Social Vulnerability", score: 7.1, trend: "stable", change: 0.1 },
  { category: "Data Breach Risk", score: 9.2, trend: "up", change: 2.1 }
];

export const activityData: ChartData[] = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 8 },
  { name: "Thu", value: 23 },
  { name: "Fri", value: 15 },
  { name: "Sat", value: 7 },
  { name: "Sun", value: 4 }
];

// Risk assessment data
export const riskDistribution = {
  high: 23,
  medium: 45, 
  low: 21
};

export const connectionTypes = {
  professional: 67,
  socialMedia: 89,
  personal: 23,
  geographical: 34
};

// Additional data for DataHawk module
export const mockMilitaryEquipment = [
  { id: "T-012", type: "T-55 Main Battle Tank", status: "Active", location: "Grid 15.2°N, 44.1°E", threat: "High" },
  { id: "H-003", type: "Mi-24 Attack Helicopter", status: "Standby", location: "Grid 15.3°N, 44.2°E", threat: "Critical" },
  { id: "R-087", type: "S-75 SAM System", status: "Operational", location: "Grid 15.1°N, 44.0°E", threat: "Medium" },
  { id: "C-045", type: "Command Bunker", status: "Active", location: "Grid 15.2°N, 44.1°E", threat: "High" }
];

export const mockMilitaryNetworkNodes = [
  { id: "NODE_001", type: "Sana'a Telecom Hub", connections: 67, risk: "High" },
  { id: "NODE_002", type: "Military Command Center", connections: 34, risk: "Critical" },
  { id: "NODE_003", type: "Satellite Ground Station", connections: 19, risk: "Medium" },
  { id: "NODE_004", type: "Border Communications", connections: 45, risk: "Critical" }
];

// Additional chart data for Charts Section
export const socialMediaEngagementData = [
  { platform: "LinkedIn", posts: 34, engagement: 68 },
  { platform: "Twitter", posts: 127, engagement: 89 },
  { platform: "GitHub", posts: 23, engagement: 76 },
  { platform: "Instagram", posts: 45, engagement: 92 }
];

export const riskDistributionChart = [
  { name: "Low Risk", value: 45, color: "#10b981" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 15, color: "#ef4444" },
  { name: "Critical", value: 5, color: "#dc2626" }
];

export const activityTrendData = [
  { month: "Aug", activity: 78 },
  { month: "Sep", activity: 92 },
  { month: "Oct", activity: 67 },
  { month: "Nov", activity: 83 },
  { month: "Dec", activity: 95 },
  { month: "Jan", activity: 89 }
];

// Constants for the demo
export const DEMO_CONSTANTS = {
  TOTAL_NODES: 89,
  TOTAL_CONNECTIONS: 156,
  DATA_SOURCES_ACTIVE: 847,
  SCAN_DURATION: 15000, // 15 seconds
  TERMINAL_BUFFER_SIZE: 8,
  SCAN_PROGRESS_INTERVAL: 1000, // 1 second
  TERMINAL_UPDATE_INTERVAL: 3000, // 3-7 seconds random
  CONNECTION_COUNT_RANGE: [220, 250],
  ACTIVE_SCANS_RANGE: [5, 12]
};