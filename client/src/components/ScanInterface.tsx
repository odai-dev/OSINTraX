import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Play, Pause, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useDemoState } from "@/contexts/DemoContext";
import { DEMO_CONSTANTS } from "@/lib/mockData";

interface ScanInterfaceProps {
  // No props needed - scanning handled internally via DemoContext
}

export default function ScanInterface({}: ScanInterfaceProps) {
  const [query, setQuery] = useState("");
  const { 
    isScanning, 
    scanProgress, 
    scanStatus, 
    startScan, 
    stopScan,
    activeModule 
  } = useDemoState();

  const handleScan = () => {
    if (!query.trim()) return;
    
    // Determine scan type based on active module
    const scanType = activeModule === 'image' ? 'image' : 
                    activeModule === 'geolocation' ? 'geolocation' :
                    activeModule === 'network' ? 'network' :
                    activeModule === 'datahawk' ? 'datahawk' : 'profile';
    
    startScan(query, scanType);
  };

  const toggleScan = () => {
    if (isScanning) {
      stopScan();
    } else {
      handleScan();
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Main Search Interface */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter target identifier (name, email, username, phone...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 font-mono bg-muted border-border focus:border-cyan-400 focus:ring-cyan-400/20"
              data-testid="input-scan-query"
              onKeyDown={(e) => e.key === 'Enter' && !isScanning && handleScan()}
            />
          </div>
          <Button 
            onClick={toggleScan}
            disabled={!query.trim() && !isScanning}
            className="h-12 px-8 bg-cyan-600 hover:bg-cyan-700 border border-cyan-500"
            data-testid="button-scan-start"
          >
            {isScanning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop Scan
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Scan
              </>
            )}
          </Button>
        </div>

        {/* Scanning Progress */}
        {(isScanning || scanProgress > 0) && (
          <div className="space-y-2" aria-live="polite" data-testid="scan-progress-container">
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono text-muted-foreground" data-testid="text-scan-status">
                {scanStatus}
              </span>
              <span className="text-sm font-mono text-cyan-400" data-testid="text-scan-progress">
                {Math.round(scanProgress)}%
              </span>
            </div>
            <Progress 
              value={scanProgress} 
              className="h-2 bg-muted"
              data-testid="progress-scan"
            />
          </div>
        )}

        {/* Scan Options */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-scan-pulse" />
            <span className="font-mono text-muted-foreground">Deep Scan: Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="font-mono text-muted-foreground">Sources: {DEMO_CONSTANTS.DATA_SOURCES_ACTIVE} Active</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-orange-400" />
            <span className="font-mono text-muted-foreground">Privacy: Stealth Mode</span>
          </div>
        </div>
      </div>
    </Card>
  );
}