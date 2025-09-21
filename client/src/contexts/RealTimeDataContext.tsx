import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RealTimeData {
  connectionCount: number;
  activeScans: number;
  dataPointsProcessed: number;
  lastUpdate: Date;
  lastActivity: Date;
  networkActivity: number;
  threatLevel: string;
  currentUTC: Date;
}

interface RealTimeDataContextType extends RealTimeData {
  getRelativeTime: (baseTime?: Date) => string;
}

const RealTimeDataContext = createContext<RealTimeDataContextType | undefined>(undefined);

// Live terminal output hook
export function useLiveTerminalOutput() {
  const [terminalLines, setTerminalLines] = useState<Array<{id: string, text: string, type: 'info' | 'warn' | 'error' | 'success', timestamp: Date}>>([]);

  const yemenOSINTCommands = [
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
    { text: "[WARN] Cross-border communication pattern detected", type: 'warn' as const }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCommand = yemenOSINTCommands[Math.floor(Math.random() * yemenOSINTCommands.length)];
      const newLine = {
        id: Date.now().toString(),
        text: randomCommand.text,
        type: randomCommand.type,
        timestamp: new Date()
      };

      setTerminalLines(prev => {
        const updated = [...prev, newLine];
        // Keep only last 8 lines
        return updated.slice(-8);
      });
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  return terminalLines;
}

export function useRealTimeData() {
  const context = useContext(RealTimeDataContext);
  if (context === undefined) {
    throw new Error('useRealTimeData must be used within a RealTimeDataProvider');
  }
  return context;
}

interface RealTimeDataProviderProps {
  children: ReactNode;
}

export function RealTimeDataProvider({ children }: RealTimeDataProviderProps) {
  const [connectionCount, setConnectionCount] = useState(234);
  const [activeScans, setActiveScans] = useState(7);
  const [dataPointsProcessed, setDataPointsProcessed] = useState(15847);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [lastActivity, setLastActivity] = useState(() => {
    // Initialize lastActivity to a realistic past time (47 minutes ago)
    const now = new Date();
    return new Date(now.getTime() - (47 * 60 * 1000));
  });
  const [networkActivity, setNetworkActivity] = useState(67);
  const [threatLevel, setThreatLevel] = useState('MODERATE');
  const [currentUTC, setCurrentUTC] = useState(new Date());

  // Main heartbeat timer - updates most real-time data every 3-5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      // Update connection count with realistic fluctuations
      setConnectionCount(prev => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(220, Math.min(250, prev + change));
      });

      // Update active scans occasionally
      if (Math.random() > 0.7) {
        setActiveScans(prev => {
          const change = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          return Math.max(5, Math.min(12, prev + change));
        });
      }

      // Update data points processed
      setDataPointsProcessed(prev => prev + Math.floor(Math.random() * 5));
      
      // Update network activity
      setNetworkActivity(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(30, Math.min(95, prev + change));
      });

      // Update threat level occasionally (rare)
      if (Math.random() > 0.95) {
        const levels = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'];
        const weights = [0.3, 0.4, 0.25, 0.05]; // Weighted probability
        const rand = Math.random();
        let sum = 0;
        for (let i = 0; i < weights.length; i++) {
          sum += weights[i];
          if (rand <= sum) {
            setThreatLevel(levels[i]);
            break;
          }
        }
      }

      setLastUpdate(now);
    }, 3000 + Math.random() * 2000); // 3-5 second intervals

    return () => clearInterval(interval);
  }, []);

  // Separate timer for lastActivity - updates realistically every 2-15 minutes
  useEffect(() => {
    const activityInterval = setInterval(() => {
      // Only occasionally update lastActivity to be more realistic
      if (Math.random() > 0.85) {
        setLastActivity(new Date());
      }
    }, (2 + Math.random() * 13) * 60 * 1000); // 2-15 minutes

    return () => clearInterval(activityInterval);
  }, []);

  // UTC clock timer - updates every second for header display
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentUTC(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const getRelativeTime = (baseTime: Date = lastActivity): string => {
    const now = new Date();
    const diffMs = now.getTime() - baseTime.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const value: RealTimeDataContextType = {
    connectionCount,
    activeScans,
    dataPointsProcessed,
    lastUpdate,
    lastActivity,
    networkActivity,
    threatLevel,
    currentUTC,
    getRelativeTime
  };

  return (
    <RealTimeDataContext.Provider value={value}>
      {children}
    </RealTimeDataContext.Provider>
  );
}