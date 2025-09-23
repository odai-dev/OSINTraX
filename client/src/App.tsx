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
import LiveTerminal from "@/components/LiveTerminal";
import ThemeToggle from "@/components/ThemeToggle";
import ImageFaceLookup from "@/components/ImageFaceLookup";
import { Link } from "wouter";
import { Download } from "lucide-react";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import ExportResults from "@/pages/export-results";
import { RealTimeDataProvider, useRealTimeData } from "@/contexts/RealTimeDataContext";
import { DemoProvider, useDemoState } from "@/contexts/DemoContext";

function OSINTDashboard() {
  const { connectionCount, currentUTC } = useRealTimeData();
  const { 
    activeModule, 
    setActiveModule, 
    isScanning, 
    scanTarget,
    startScan 
  } = useDemoState();

  // ScanInterface will handle scanning directly through DemoContext
  // No need for handleScan prop callback

  const renderModuleContent = () => {
    switch (activeModule) {
      case "profile":
      case "personal":
        return <DataCards isScanning={isScanning} />;
      case "image":
        return <ImageFaceLookup isScanning={isScanning} />;
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
              <h1 className="text-lg font-bold text-foreground" data-testid="text-app-title">
                OSINTraX Intelligence Platform
              </h1>
              <p className="text-xs text-muted-foreground font-mono" data-testid="text-app-status">
                Module: {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} • 
                Status: {isScanning ? 'SCANNING' : 'READY'} • 
                Sources: {connectionCount} Active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground font-mono" data-testid="text-utc-time">
              {currentUTC.toLocaleTimeString('en-US', { 
                timeZone: 'UTC', 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })} UTC
            </div>
            <Link href="/export">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-md transition-colors" data-testid="button-export">
                <Download className="h-3 w-3" />
                Export
              </button>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Scan Interface */}
            <ScanInterface />
            
            {/* Scanning Animation */}
            {isScanning && (
              <ScanningAnimation 
                isActive={isScanning} 
                scanTarget={scanTarget} 
              />
            )}
            
            {/* Live Terminal and Module Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Module Content */}
              <div className="lg:col-span-2" data-testid={`module-content-${activeModule}`}>
                {renderModuleContent()}
              </div>
              
              {/* Live Terminal */}
              <div className="lg:col-span-1">
                <LiveTerminal />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RealTimeDataProvider>
      <DemoProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/export" component={ExportResults} />
          <Route path="/" component={OSINTDashboard} />
          <Route path="/dashboard" component={OSINTDashboard} />
          <Route component={NotFound} />
        </Switch>
      </DemoProvider>
    </RealTimeDataProvider>
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
