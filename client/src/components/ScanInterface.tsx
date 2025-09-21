import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Play, Pause, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ScanInterfaceProps {
  onScan: (query: string) => void;
}

export default function ScanInterface({ onScan }: ScanInterfaceProps) {
  const [query, setQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState("");

  // TODO: Remove mock scanning functionality
  const handleScan = () => {
    if (!query.trim()) return;
    
    setIsScanning(true);
    setScanProgress(0);
    onScan(query);
    
    // Mock scanning progress
    const statuses = [
      "Initializing OSINT modules...",
      "Scanning social media platforms...",
      "Analyzing digital footprints...",
      "Cross-referencing databases...",
      "Calculating risk profiles...",
      "Generating intelligence report..."
    ];
    
    let currentStatus = 0;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 16.67;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanStatus("Scan complete - 847 data points analyzed");
          return 100;
        }
        setScanStatus(statuses[Math.floor(newProgress / 16.67)] || statuses[currentStatus]);
        currentStatus = Math.min(currentStatus + 1, statuses.length - 1);
        return newProgress;
      });
    }, 1000);
  };

  const toggleScan = () => {
    if (isScanning) {
      setIsScanning(false);
      setScanProgress(0);
      setScanStatus("");
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
            disabled={!query.trim()}
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
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono text-muted-foreground">
                {scanStatus}
              </span>
              <span className="text-sm font-mono text-cyan-400">
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
            <span className="font-mono text-muted-foreground">Sources: 847 Active</span>
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