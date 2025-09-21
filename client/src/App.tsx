import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// Import OSINT Dashboard components
import OSINTSidebar from "@/components/OSINTSidebar";
import ScanInterface from "@/components/ScanInterface";
import DataCards from "@/components/DataCards";
import MapComponent from "@/components/MapComponent";
import ChartsSection from "@/components/ChartsSection";
import DataHawkModule from "@/components/DataHawkModule";
import NetworkGraph from "@/components/NetworkGraph";
import ScanningAnimation from "@/components/ScanningAnimation";
import ThemeToggle from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";

function OSINTDashboard() {
  const [activeModule, setActiveModule] = useState("profile");
  const [isScanning, setIsScanning] = useState(false);
  const [scanTarget, setScanTarget] = useState("");

  const handleScan = (query: string) => {
    setScanTarget(query);
    setIsScanning(true);
    
    // Stop scanning after demonstration
    setTimeout(() => {
      setIsScanning(false);
    }, 15000);
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "profile":
      case "personal":
        return <DataCards isScanning={isScanning} />;
      case "geolocation":
        return <MapComponent isScanning={isScanning} />;
      case "footprint":
      case "interests":
        return <ChartsSection isScanning={isScanning} />;
      case "datahawk":
        return <DataHawkModule isScanning={isScanning} />;
      case "network":
        return <NetworkGraph isScanning={isScanning} />;
      case "hashtag":
        return <ChartsSection isScanning={isScanning} />;
      case "alerts":
        return (
          <div className="space-y-4">
            <DataCards isScanning={isScanning} />
            <ChartsSection isScanning={isScanning} />
          </div>
        );
      default:
        return <DataCards isScanning={isScanning} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <OSINTSidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div>
              <h1 className="text-lg font-bold text-foreground">
                OSINTraX Intelligence Platform
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Module: {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} • 
                Status: {isScanning ? 'SCANNING' : 'READY'} • 
                Sources: 847 Active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground font-mono">
              {new Date().toLocaleTimeString()} UTC
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Scan Interface */}
            <ScanInterface onScan={handleScan} />
            
            {/* Scanning Animation */}
            {isScanning && (
              <ScanningAnimation 
                isActive={isScanning} 
                scanTarget={scanTarget} 
              />
            )}
            
            {/* Module Content */}
            <div data-testid={`module-content-${activeModule}`}>
              {renderModuleContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={OSINTDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Custom sidebar width for OSINT application
  const style = {
    "--sidebar-width": "20rem",       // 320px for better content
    "--sidebar-width-icon": "4rem",   // default icon width
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <Router />
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
