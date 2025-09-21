import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { useLiveTerminalOutput } from "@/contexts/RealTimeDataContext";

interface LiveTerminalProps {
  className?: string;
}

export default function LiveTerminal({ className = "" }: LiveTerminalProps) {
  const terminalLines = useLiveTerminalOutput();
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new lines appear
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-cyan-400';
      case 'success': return 'text-green-400';
      case 'warn': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <Card className={`bg-black/90 border-cyan-500/30 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-cyan-400">
          <Terminal className="w-4 h-4" />
          Live OSINT Terminal
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">ACTIVE</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={terminalRef}
          className="bg-black/50 rounded-md p-3 h-48 overflow-y-auto font-mono text-xs border border-cyan-500/20"
          data-testid="terminal-output"
        >
          {terminalLines.length === 0 ? (
            <div className="text-muted-foreground animate-pulse">
              <span className="text-cyan-400">root@osintrax:~$</span> Initializing live data feed...
            </div>
          ) : (
            terminalLines.map((line) => (
              <div key={line.id} className="mb-1 animate-fade-in">
                <span className="text-muted-foreground text-xs">
                  [{formatTimestamp(line.timestamp)}]
                </span>
                <span className={`ml-2 ${getLineColor(line.type)}`}>
                  {line.text}
                </span>
              </div>
            ))
          )}
          <div className="flex items-center">
            <span className="text-cyan-400">root@osintrax:~$</span>
            <div className="w-2 h-4 bg-cyan-400 ml-1 animate-blink"></div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between text-xs text-muted-foreground font-mono">
          <span>Lines: {terminalLines.length}/8</span>
          <span>Yemen Regional OSINT Feed</span>
        </div>
      </CardContent>
    </Card>
  );
}