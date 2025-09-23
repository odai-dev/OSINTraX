// Shared TypeScript types for the mock OSINT demo

export interface PersonalData {
  name: string;
  age: number;
  location: string;
  occupation: string;
  company: string;
  email: string;
  phone: string;
  education: string;
  interests: string[];
  digitalFootprint: {
    score: number;
    risk: 'Low' | 'Medium' | 'High' | 'Critical';
    lastActivity: string;
  };
}

export interface SocialMediaProfile {
  platform: string;
  username: string;
  verified: boolean;
  followerCount?: number;
  lastActivity?: string;
}

export interface LocationData {
  id: number;
  name: string;
  address: string;
  coordinates: string;
  confidence: number;
  lastSeen: string;
  type: 'residence' | 'workplace' | 'recreational' | 'commercial';
  verified: boolean;
}

export interface NetworkNode {
  id: string;
  x: number;
  y: number;
  type: 'primary' | 'work' | 'social' | 'family' | 'friend' | 'location' | 'digital';
  label: string;
  connections: number;
  risk: 'low' | 'medium' | 'high';
}

export interface NetworkConnection {
  from: string;
  to: string;
  strength: 'weak' | 'medium' | 'strong';
  type: 'professional' | 'social' | 'personal' | 'geographical' | 'digital' | 'cross-platform';
}

export interface ThreatAssessment {
  category: string;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  indicators: string[];
  confidence: number;
}

export interface TerminalMessage {
  id: string;
  text: string;
  type: 'info' | 'warn' | 'error' | 'success';
  timestamp: Date;
}

export interface ScanStep {
  label: string;
  duration: number;
  icon: any; // Lucide icon component
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface RiskMetric {
  category: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}