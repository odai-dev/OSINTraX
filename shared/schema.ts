// Simple presentation types for OSINTraX demo
// No database complexity needed for presentation

export interface Profile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  occupation?: string;
  company?: string;
  biography?: string;
  profilePhoto?: string;
  digitalFootprintScore?: number;
  riskLevel?: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  interests?: string[];
  socialAccounts?: SocialAccount[];
}

export interface SocialAccount {
  platform: string;
  username: string;
  displayName?: string;
  profileUrl?: string;
  isVerified?: boolean;
  followerCount?: number;
  lastActivity?: string;
}

export interface ScanResult {
  query: string;
  scanType: 'profile' | 'geolocation' | 'image' | 'footprint' | 'network' | 'hashtag' | 'datahawk';
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  results?: Profile;
  timestamp?: string;
}

export interface ThreatIndicator {
  level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  type: string;
  description: string;
  confidence: number;
  source: string;
}

export interface GeolocationData {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
  timestamp?: string;
  source?: string;
}

export interface NetworkConnection {
  id: string;
  name: string;
  relationship: string;
  strength: number;
  platform?: string;
}

// Scan module types
export type ScanModule = 
  | 'profile'
  | 'personal'
  | 'geolocation'
  | 'image'
  | 'footprint'
  | 'interests'
  | 'network'
  | 'hashtag'
  | 'datahawk'
  | 'alerts';

// Demo state interface
export interface DemoState {
  activeModule: ScanModule;
  isScanning: boolean;
  scanTarget: string;
  scanProgress: number;
  lastScanResult?: ScanResult;
}