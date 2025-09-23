import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Network, Users, Link, Activity, Filter } from "lucide-react";
import { mockNetworkNodes, mockNetworkConnections, riskDistribution, connectionTypes, DEMO_CONSTANTS } from "@/lib/mockData";

interface NetworkGraphProps {
  isScanning?: boolean;
}

export default function NetworkGraph({ isScanning = false }: NetworkGraphProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  const getNodeColor = (type: string, risk: string) => {
    if (risk === "high") return "#ef4444";
    if (risk === "medium") return "#f59e0b"; 
    if (risk === "low") return "#10b981";
    
    switch (type) {
      case "primary": return "#22d3ee";
      case "work": return "#8b5cf6";
      case "social": return "#06b6d4";
      case "family": return "#10b981";
      case "friend": return "#f59e0b";
      case "location": return "#ef4444";
      case "digital": return "#6366f1";
      default: return "#64748b";
    }
  };

  const getConnectionColor = (strength: string) => {
    switch (strength) {
      case "strong": return "#22d3ee";
      case "medium": return "#64748b";
      case "weak": return "#374151";
      default: return "#374151";
    }
  };

  if (isScanning) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5 animate-spin" />
            Building Network Graph...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Analyzing network connections...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Network Visualization */}
      <Card className="lg:col-span-2 h-96">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Network className="w-4 h-4" />
              Network Relationship Graph
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                className="text-xs h-7"
                data-testid="button-filter-all"
              >
                All
              </Button>
              <Button 
                size="sm" 
                variant={filterType === "high-risk" ? "default" : "outline"}
                onClick={() => setFilterType("high-risk")}
                className="text-xs h-7"
                data-testid="button-filter-high-risk"
              >
                High Risk
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-64 bg-gray-900/50 rounded border border-border overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
              {/* Render connections */}
              {mockNetworkConnections.map((conn, index) => {
                const fromNode = mockNetworkNodes.find(n => n.id === conn.from);
                const toNode = mockNetworkNodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                
                return (
                  <line
                    key={index}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={getConnectionColor(conn.strength)}
                    strokeWidth={conn.strength === "strong" ? 2 : 1}
                    strokeDasharray={conn.strength === "weak" ? "3,3" : "none"}
                    opacity={0.7}
                  />
                );
              })}
            </svg>
            
            {/* Render nodes */}
            {mockNetworkNodes.map((node) => (
              <div
                key={node.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                data-testid={`network-node-${node.id}`}
              >
                <div 
                  className="w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all group-hover:scale-125"
                  style={{ backgroundColor: getNodeColor(node.type, node.risk) }}
                />
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {node.label}
                  <br />
                  {node.connections} connections
                </div>
                {selectedNode === node.id && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-cyan-900/90 text-cyan-100 text-xs p-2 rounded whitespace-nowrap z-20">
                    <div className="font-semibold">{node.label}</div>
                    <div>Type: {node.type}</div>
                    <div>Connections: {node.connections}</div>
                    <div>Risk: {node.risk}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Details */}
      <Card className="h-96">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            Network Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Network Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-muted rounded text-center">
                <div className="text-lg font-bold text-cyan-400">{DEMO_CONSTANTS.TOTAL_NODES}</div>
                <div className="text-muted-foreground">Total Nodes</div>
              </div>
              <div className="p-2 bg-muted rounded text-center">
                <div className="text-lg font-bold text-cyan-400">{DEMO_CONSTANTS.TOTAL_CONNECTIONS}</div>
                <div className="text-muted-foreground">Connections</div>
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Risk Distribution</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    High Risk
                  </span>
                  <span>{riskDistribution.high}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    Medium Risk
                  </span>
                  <span>{riskDistribution.medium}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Low Risk
                  </span>
                  <span>{riskDistribution.low}</span>
                </div>
              </div>
            </div>

            {/* Connection Types */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Connection Types</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Professional</span>
                  <Badge variant="outline" className="text-xs h-4">{connectionTypes.professional}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Social Media</span>
                  <Badge variant="outline" className="text-xs h-4">{connectionTypes.socialMedia}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Personal</span>
                  <Badge variant="outline" className="text-xs h-4">{connectionTypes.personal}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Geographical</span>
                  <Badge variant="outline" className="text-xs h-4">{connectionTypes.geographical}</Badge>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Key Insights
              </h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>• Highly connected professional network</p>
                <p>• Strong digital footprint across platforms</p>
                <p>• Geographic clustering in Sana'a region</p>
                <p>• Multiple potential social engineering vectors</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}