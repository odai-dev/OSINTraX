import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { scanningStatuses, imageScanStatuses, DEMO_CONSTANTS } from '@/lib/mockData';

interface DemoState {
  // Scanning state
  isScanning: boolean;
  scanProgress: number;
  scanStatus: string;
  scanTarget: string;
  scanType: 'profile' | 'image' | 'geolocation' | 'network' | 'datahawk' | null;
  
  // Demo control
  activeModule: string;
  
  // Scanning results
  lastScanCompleted: Date | null;
  totalScansRun: number;
}

interface DemoContextType extends DemoState {
  // Actions
  startScan: (query: string, type: DemoState['scanType']) => void;
  stopScan: () => void;
  setActiveModule: (module: string) => void;
  
  // Computed values
  isScanComplete: boolean;
  canStartScan: boolean;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function useDemoState() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemoState must be used within a DemoProvider');
  }
  return context;
}

interface DemoProviderProps {
  children: ReactNode;
}

export function DemoProvider({ children }: DemoProviderProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState("");
  const [scanTarget, setScanTarget] = useState("");
  const [scanType, setScanType] = useState<DemoState['scanType']>(null);
  const [activeModule, setActiveModule] = useState("profile");
  const [lastScanCompleted, setLastScanCompleted] = useState<Date | null>(null);
  const [totalScansRun, setTotalScansRun] = useState(0);
  
  // Refs for timer cleanup
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoStopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startScan = useCallback((query: string, type: DemoState['scanType']) => {
    if (!query.trim() || isScanning) return;
    
    // Clear any existing timers
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);
    
    setScanTarget(query);
    setScanType(type);
    setIsScanning(true);
    setScanProgress(0);
    
    // Choose appropriate status messages based on scan type
    const statuses = type === 'image' ? imageScanStatuses : scanningStatuses;
    setScanStatus(statuses[0]); // Set initial status immediately
    
    let currentStatusIndex = 0;
    progressIntervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        const progressIncrement = 100 / statuses.length;
        const newProgress = prev + progressIncrement;
        
        if (newProgress >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setIsScanning(false);
          setScanStatus(`Scan complete - ${DEMO_CONSTANTS.DATA_SOURCES_ACTIVE} data points analyzed`);
          setLastScanCompleted(new Date());
          setTotalScansRun(prev => prev + 1);
          return 100;
        }
        
        // Update status based on progress
        currentStatusIndex += 1;
        if (currentStatusIndex < statuses.length) {
          setScanStatus(statuses[currentStatusIndex]);
        }
        
        return newProgress;
      });
    }, DEMO_CONSTANTS.SCAN_PROGRESS_INTERVAL);
    
    // Auto-stop after demo duration
    autoStopTimeoutRef.current = setTimeout(() => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setIsScanning(false);
      setScanProgress(100);
      setScanStatus(`Scan complete - ${DEMO_CONSTANTS.DATA_SOURCES_ACTIVE} data points analyzed`);
      setLastScanCompleted(new Date());
      setTotalScansRun(prev => prev + 1);
    }, DEMO_CONSTANTS.SCAN_DURATION);
    
  }, [isScanning]);

  const stopScan = useCallback(() => {
    // Clear all timers
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }
    
    setIsScanning(false);
    setScanProgress(0);
    setScanStatus("");
    setScanType(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current);
    };
  }, []);
  
  // Computed values
  const isScanComplete = scanProgress === 100 && !isScanning;
  const canStartScan = !isScanning;

  const value: DemoContextType = {
    // State
    isScanning,
    scanProgress,
    scanStatus,
    scanTarget,
    scanType,
    activeModule,
    lastScanCompleted,
    totalScansRun,
    
    // Actions
    startScan,
    stopScan,
    setActiveModule,
    
    // Computed
    isScanComplete,
    canStartScan
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}