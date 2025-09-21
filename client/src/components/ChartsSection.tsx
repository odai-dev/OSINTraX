import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, Activity, Shield, Hash } from "lucide-react";

interface ChartsSectionProps {
  isScanning?: boolean;
}

export default function ChartsSection({ isScanning = false }: ChartsSectionProps) {
  // TODO: Remove mock chart data
  const socialMediaData = [
    { platform: "LinkedIn", posts: 34, engagement: 68 },
    { platform: "Twitter", posts: 127, engagement: 89 },
    { platform: "GitHub", posts: 23, engagement: 76 },
    { platform: "Instagram", posts: 45, engagement: 92 }
  ];

  const riskDistribution = [
    { name: "Low Risk", value: 45, color: "#10b981" },
    { name: "Medium Risk", value: 35, color: "#f59e0b" },
    { name: "High Risk", value: 15, color: "#ef4444" },
    { name: "Critical", value: 5, color: "#dc2626" }
  ];

  const activityTrend = [
    { month: "Aug", activity: 78 },
    { month: "Sep", activity: 92 },
    { month: "Oct", activity: 67 },
    { month: "Nov", activity: 83 },
    { month: "Dec", activity: 95 },
    { month: "Jan", activity: 89 }
  ];

  if (isScanning) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-64 animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Digital Footprint Gauge */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            Digital Footprint Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Gauge visualization */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-muted stroke-current"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400 stroke-current"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="87, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400" data-testid="gauge-score">87</div>
                  <div className="text-xs text-muted-foreground">Risk Score</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Exposure Level:</span>
              <Badge variant="default" className="bg-orange-500/20 text-orange-400">
                High
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Privacy</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Analysis */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart className="w-4 h-4" />
            Social Media Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={socialMediaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="platform" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#f9fafb'
                }}
              />
              <Bar dataKey="engagement" fill="#22d3ee" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4" />
            Risk Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={150}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: '#f9fafb'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs">{item.name}</span>
                  </div>
                  <span className="text-xs font-mono">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Trend */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" />
            Activity Trend (6 months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={activityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#f9fafb'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="activity" 
                stroke="#22d3ee" 
                strokeWidth={2}
                dot={{ fill: '#22d3ee', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}