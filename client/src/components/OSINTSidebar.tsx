import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { 
  User, 
  Eye, 
  Database, 
  MapPin, 
  Target, 
  Shield, 
  AlertTriangle, 
  Zap, 
  Network, 
  Hash,
  Radar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRealTimeData } from "@/contexts/RealTimeDataContext";

interface OSINTSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const modules = [
  { id: "profile", title: "Profile Finder", icon: User, status: "active" },
  { id: "image", title: "Image & Face Lookup", icon: Eye, status: "scanning" },
  { id: "personal", title: "Personal Data", icon: Database, status: "complete" },
  { id: "geolocation", title: "Geolocation Mapper", icon: MapPin, status: "active" },
  { id: "interests", title: "Interests & Hobby Analyzer", icon: Target, status: "complete" },
  { id: "footprint", title: "Digital Footprint Score", icon: Shield, status: "warning" },
  { id: "alerts", title: "Alerts", icon: AlertTriangle, status: "critical", count: 3 },
  { id: "datahawk", title: "Advanced (DataHawk)", icon: Radar, status: "restricted" },
  { id: "network", title: "Network Graphing", icon: Network, status: "active" },
  { id: "hashtag", title: "Hashtag & Trend Tracker", icon: Hash, status: "complete" }
];

export default function OSINTSidebar({ activeModule, onModuleChange }: OSINTSidebarProps) {
  const { connectionCount, activeScans, threatLevel, getRelativeTime, lastUpdate } = useRealTimeData();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-cyan-500/20 text-cyan-400";
      case "scanning": return "bg-yellow-500/20 text-yellow-400 animate-scan-pulse";
      case "complete": return "bg-green-500/20 text-green-400";
      case "warning": return "bg-orange-500/20 text-orange-400";
      case "critical": return "bg-red-500/20 text-red-400 animate-glow-pulse";
      case "restricted": return "bg-purple-500/20 text-purple-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            <span className="font-mono text-lg font-bold text-cyan-400">OSINTraX</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">OSINT Intelligence Platform v4.2.1-ME</p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Intelligence Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <SidebarMenuItem key={module.id}>
                    <SidebarMenuButton 
                      asChild
                      className={`
                        group cursor-pointer transition-all duration-200 
                        ${activeModule === module.id ? 'bg-sidebar-accent border-l-2 border-cyan-400' : ''}
                        hover:bg-sidebar-accent hover:border-l-2 hover:border-cyan-400/50
                      `}
                    >
                      <div 
                        onClick={() => onModuleChange(module.id)}
                        data-testid={`sidebar-module-${module.id}`}
                        className="flex items-center gap-3 w-full"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onModuleChange(module.id)}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1 font-mono text-sm">{module.title}</span>
                        <div className="flex items-center gap-1">
                          {module.count && (
                            <Badge variant="destructive" className="px-1.5 py-0.5 text-xs h-5">
                              {module.count}
                            </Badge>
                          )}
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(module.status)}`} />
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Status */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">System Status</span>
              <span className="text-green-400">OPERATIONAL</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Active Scans</span>
              <span className="text-cyan-400">{activeScans}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Data Sources</span>
              <span className="text-cyan-400">{connectionCount}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Threat Level</span>
              <span className={`${threatLevel === 'CRITICAL' ? 'text-red-400' : threatLevel === 'HIGH' ? 'text-orange-400' : threatLevel === 'MODERATE' ? 'text-yellow-400' : 'text-green-400'}`}>
                {threatLevel}
              </span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Last Update</span>
              <span className="text-muted-foreground">{getRelativeTime(lastUpdate)}</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}