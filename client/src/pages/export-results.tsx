import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  Shield, 
  ArrowLeft,
  CheckCircle,
  Clock
} from "lucide-react";

export default function ExportResults() {
  const [, setLocation] = useLocation();
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);
  const [exportedFormats, setExportedFormats] = useState<Set<string>>(new Set());

  const handleExport = async (format: string) => {
    setExportingFormat(format);
    
    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setExportingFormat(null);
    setExportedFormats(prev => new Set(Array.from(prev).concat(format)));
  };

  const exportFormats = [
    {
      id: "pdf",
      name: "Intelligence Report",
      description: "Comprehensive PDF report with all findings",
      icon: FileText,
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: "excel",
      name: "Data Analysis",
      description: "Structured data in Excel format for analysis",
      icon: FileSpreadsheet,
      size: "1.8 MB",
      format: "XLSX"
    },
    {
      id: "images",
      name: "Visual Evidence",
      description: "High-resolution images and screenshots",
      icon: FileImage,
      size: "5.2 MB",
      format: "ZIP"
    }
  ];

  const scanSummary = {
    target: "Ahmed Hassan",
    scanDate: new Date().toLocaleDateString(),
    dataPoints: 247,
    socialAccounts: 8,
    locations: 12,
    riskLevel: "MODERATE"
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/dashboard")}
            className="text-slate-400 hover:text-white"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white" data-testid="text-export-title">
            Export Intelligence Report
          </h1>
          <p className="text-slate-400">
            Download your OSINT analysis results in multiple formats
          </p>
        </div>

        {/* Scan Summary */}
        <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyan-400" />
              Scan Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400" data-testid="text-data-points">
                  {scanSummary.dataPoints}
                </p>
                <p className="text-sm text-slate-400">Data Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400" data-testid="text-social-accounts">
                  {scanSummary.socialAccounts}
                </p>
                <p className="text-sm text-slate-400">Social Accounts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400" data-testid="text-locations">
                  {scanSummary.locations}
                </p>
                <p className="text-sm text-slate-400">Locations</p>
              </div>
              <div className="text-center">
                <Badge 
                  variant="secondary" 
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  data-testid="badge-risk-level"
                >
                  {scanSummary.riskLevel}
                </Badge>
                <p className="text-sm text-slate-400 mt-1">Risk Level</p>
              </div>
            </div>
            
            <Separator className="bg-slate-700" />
            
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Target:</span>
              <span className="text-white font-mono" data-testid="text-target">
                {scanSummary.target}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Scan Date:</span>
              <span className="text-white font-mono" data-testid="text-scan-date">
                {scanSummary.scanDate}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Available Export Formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              const isExporting = exportingFormat === format.id;
              const isExported = exportedFormats.has(format.id);
              
              return (
                <div
                  key={format.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-700/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white" data-testid={`text-format-${format.id}`}>
                        {format.name}
                      </h3>
                      <p className="text-sm text-slate-400">{format.description}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {format.format}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {format.size}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleExport(format.id)}
                    disabled={isExporting}
                    className={`
                      ${isExported 
                        ? 'bg-green-600 hover:bg-green-500' 
                        : 'bg-cyan-600 hover:bg-cyan-500'
                      } text-white
                    `}
                    data-testid={`button-export-${format.id}`}
                  >
                    {isExporting ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 animate-spin" />
                        Exporting...
                      </div>
                    ) : isExported ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Downloaded
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </div>
                    )}
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-red-900/20 border-red-800/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-300 mb-2">Security Notice</h3>
                <p className="text-sm text-red-200/80">
                  All exported files contain sensitive intelligence data. Ensure proper handling 
                  according to your organization's data security protocols. Files are encrypted 
                  and include digital signatures for verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}