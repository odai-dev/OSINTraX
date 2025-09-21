import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Radar, 
  Satellite, 
  Target, 
  Shield, 
  AlertTriangle, 
  Lock,
  Eye,
  Zap,
  Settings
} from "lucide-react";
import satelliteImg from "@assets/generated_images/Satellite_surveillance_imagery_6e83a1d0.png";
import equipmentImg from "@assets/generated_images/Military_equipment_surveillance_8608c55b.png";
import networkImg from "@assets/generated_images/Network_analysis_visualization_9956df31.png";

interface DataHawkModuleProps {
  isScanning?: boolean;
}

export default function DataHawkModule({ isScanning = false }: DataHawkModuleProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLevel, setAuthLevel] = useState(0);

  // TODO: Remove mock military data
  const mockEquipment = [
    { id: "T-012", type: "T-55 Main Battle Tank", status: "Active", location: "Grid 15.2°N, 44.1°E", threat: "High" },
    { id: "H-003", type: "Mi-24 Attack Helicopter", status: "Standby", location: "Grid 15.3°N, 44.2°E", threat: "Critical" },
    { id: "R-087", type: "S-75 SAM System", status: "Operational", location: "Grid 15.1°N, 44.0°E", threat: "Medium" },
    { id: "C-045", type: "Command Bunker", status: "Active", location: "Grid 15.2°N, 44.1°E", threat: "High" }
  ];

  const mockNetworkNodes = [
    { id: "NODE_001", type: "Sana'a Telecom Hub", connections: 67, risk: "High" },
    { id: "NODE_002", type: "Military Command Center", connections: 34, risk: "Critical" },
    { id: "NODE_003", type: "Satellite Ground Station", connections: 19, risk: "Medium" },
    { id: "NODE_004", type: "Border Communications", connections: 45, risk: "Critical" }
  ];

  const handleAuthentication = () => {
    // Mock authentication process
    setAuthLevel(prev => prev + 1);
    if (authLevel >= 2) {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Lock className="w-5 h-5" />
            DataHawk - Restricted Access
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <Shield className="w-16 h-16 text-red-400 mx-auto" />
            <h3 className="text-lg font-semibold">CLASSIFIED MODULE</h3>
            <p className="text-sm text-muted-foreground">
              Military-grade OSINT requires clearance level 3 or higher
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs font-mono text-red-400">
              Authentication Level: {authLevel}/3
            </div>
            <Button 
              onClick={handleAuthentication}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              data-testid="button-authenticate"
            >
              <Eye className="w-4 h-4 mr-2" />
              Request Access Authorization
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>⚠️ This module contains sensitive military intelligence</p>
            <p>🔒 Requires multi-factor authentication</p>
            <p>📊 Access logged and monitored</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isScanning) {
    return (
      <div className="space-y-4">
        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Radar className="w-5 h-5 animate-spin" />
              DataHawk Scanning...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded"></div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Module Header */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Radar className="w-5 h-5" />
              DataHawk - Military Intelligence
            </CardTitle>
            <Badge variant="destructive" className="bg-red-600 text-white">
              CLASSIFIED
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Advanced Military OSINT • Access Level: RESTRICTED • Session ID: DH-7749-ALPHA
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Satellite Intelligence */}
        <Card className="hover-elevate border-purple-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Satellite className="w-4 h-4" />
              Satellite Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <img 
                src={satelliteImg} 
                alt="Satellite surveillance" 
                className="w-full h-32 object-cover rounded border border-border"
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                LIVE FEED
              </div>
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded animate-scan-pulse">
                REC
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Coordinates:</span>
                <p className="font-mono text-cyan-400">34.5°N, 69.2°E</p>
              </div>
              <div>
                <span className="text-muted-foreground">Resolution:</span>
                <p className="font-mono text-cyan-400">0.5m/pixel</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Update:</span>
                <p className="font-mono text-cyan-400">2 min ago</p>
              </div>
              <div>
                <span className="text-muted-foreground">Threat Level:</span>
                <Badge variant="destructive" className="text-xs h-5">High</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Tracking */}
        <Card className="hover-elevate border-purple-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4" />
              Equipment Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="relative mb-3">
              <img 
                src={equipmentImg} 
                alt="Military equipment" 
                className="w-full h-24 object-cover rounded border border-border"
              />
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                {mockEquipment.length} Assets Tracked
              </div>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {mockEquipment.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center p-1.5 bg-muted rounded text-xs"
                  data-testid={`equipment-${item.id}`}
                >
                  <div>
                    <span className="font-mono text-cyan-400">{item.id}</span>
                    <span className="ml-2 text-muted-foreground">{item.type}</span>
                  </div>
                  <Badge 
                    variant={item.threat === 'Critical' ? 'destructive' : 
                           item.threat === 'High' ? 'default' : 'secondary'}
                    className="text-xs h-4"
                  >
                    {item.threat}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Network Analysis */}
        <Card className="hover-elevate border-purple-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              Network Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <img 
                src={networkImg} 
                alt="Network visualization" 
                className="w-full h-32 object-cover rounded border border-border"
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                REAL-TIME
              </div>
            </div>
            <div className="space-y-1">
              {mockNetworkNodes.map((node) => (
                <div 
                  key={node.id} 
                  className="flex justify-between items-center p-1.5 bg-muted rounded text-xs"
                >
                  <div>
                    <span className="font-mono text-cyan-400">{node.id}</span>
                    <span className="ml-2 text-muted-foreground">
                      {node.connections} connections
                    </span>
                  </div>
                  <Badge 
                    variant={node.risk === 'Critical' ? 'destructive' : 
                           node.risk === 'High' ? 'default' : 'secondary'}
                    className="text-xs h-4"
                  >
                    {node.risk}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Threat Assessment */}
        <Card className="hover-elevate border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-red-400">
              <AlertTriangle className="w-4 h-4" />
              Threat Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-red-500/10 rounded">
                <div className="text-red-400 font-semibold">Critical Threats</div>
                <div className="text-lg font-bold text-red-400">7</div>
              </div>
              <div className="p-2 bg-orange-500/10 rounded">
                <div className="text-orange-400 font-semibold">High Priority</div>
                <div className="text-lg font-bold text-orange-400">23</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Network Vulnerabilities:</span>
                <span className="text-red-400">15 Found</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Asset Exposure:</span>
                <span className="text-orange-400">High</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Communication Security:</span>
                <span className="text-red-400">Compromised</span>
              </div>
            </div>

            <Button 
              size="sm" 
              variant="destructive" 
              className="w-full text-xs h-8"
              data-testid="button-generate-report"
            >
              <Settings className="w-3 h-3 mr-1" />
              Generate Threat Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}