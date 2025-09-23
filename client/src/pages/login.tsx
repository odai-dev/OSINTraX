import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, Eye, Lock, User } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);
    
    // Simulate authentication delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Always "succeed" for demo purposes
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md relative z-10 bg-slate-800/80 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Shield className="h-12 w-12 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">OSINTraX</CardTitle>
            <p className="text-slate-400 text-sm mt-2">Intelligence Platform</p>
            <p className="text-cyan-400 text-xs font-mono mt-1">v2.1.4 - Secure Access Portal</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300 text-sm">
                Agent Identifier
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter agent ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400"
                  data-testid="input-username"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-sm">
                Security Key
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter security key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400"
                  data-testid="input-password"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5"
              disabled={isLogging || !username || !password}
              data-testid="button-login"
            >
              {isLogging ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Access System
                </div>
              )}
            </Button>
          </form>
          
          <div className="text-center space-y-2">
            <p className="text-xs text-slate-500">
              Authorized Personnel Only
            </p>
            <p className="text-xs text-slate-600 font-mono">
              Session will be logged and monitored
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Bottom corner info */}
      <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono">
        <p>Build 2024.1.4 | Node: SECURED</p>
      </div>
    </div>
  );
}