import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Search, 
  Database, 
  Shield, 
  Zap, 
  AlertCircle 
} from "lucide-react";

interface ScanningAnimationProps {
  isActive: boolean;
  scanTarget: string;
}

export default function ScanningAnimation({ isActive, scanTarget }: ScanningAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dataPoints, setDataPoints] = useState(0);

  // TODO: Remove mock scanning steps
  const scanningSteps = [
    { icon: Search, label: "Initializing OSINT modules", duration: 2000 },
    { icon: Database, label: "Scanning regional social networks", duration: 3000 },
    { icon: Shield, label: "Cross-referencing Yemen telecom data", duration: 2500 },
    { icon: Activity, label: "Analyzing digital footprints", duration: 3500 },
    { icon: Zap, label: "Calculating regional risk factors", duration: 2000 },
    { icon: AlertCircle, label: "Generating intelligence report", duration: 1500 }
  ];

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setProgress(0);
      setDataPoints(0);
      return;
    }

    let stepIndex = 0;
    let progressValue = 0;
    let dataCount = 0;

    const runStep = () => {
      if (stepIndex >= scanningSteps.length) {
        setProgress(100);
        return;
      }

      setCurrentStep(stepIndex);
      const step = scanningSteps[stepIndex];
      
      const stepProgress = (stepIndex + 1) / scanningSteps.length * 100;
      const duration = step.duration;
      const interval = 100;
      const incrementAmount = stepProgress / (duration / interval);
      
      const progressInterval = setInterval(() => {
        progressValue += incrementAmount;
        dataCount += Math.floor(Math.random() * 15) + 5;
        
        setProgress(Math.min(progressValue, stepProgress));
        setDataPoints(dataCount);
        
        if (progressValue >= stepProgress) {
          clearInterval(progressInterval);
          stepIndex++;
          setTimeout(runStep, 200);
        }
      }, interval);
    };

    runStep();
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  const CurrentIcon = scanningSteps[currentStep]?.icon || Search;
  const currentLabel = scanningSteps[currentStep]?.label || "Initializing...";

  return (
    <Card className="border-cyan-500/20 bg-cyan-500/5">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CurrentIcon className="w-5 h-5 text-cyan-400 animate-scan-pulse" />
              <span className="font-semibold text-cyan-400">Live OSINT Scan</span>
            </div>
            <Badge variant="default" className="bg-cyan-600 text-white animate-glow-pulse">
              ACTIVE
            </Badge>
          </div>

          {/* Target Info */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target:</span>
              <span className="font-mono text-cyan-400">{scanTarget}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Data Points Found:</span>
              <span className="font-mono text-cyan-400 tabular-nums">{dataPoints.toLocaleString()}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{currentLabel}</span>
              <span className="font-mono text-cyan-400">{Math.round(progress)}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-muted" 
              data-testid="scanning-progress"
            />
          </div>

          {/* Scanning Steps */}
          <div className="grid grid-cols-3 gap-2">
            {scanningSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              
              return (
                <div 
                  key={index}
                  className={`
                    flex flex-col items-center p-2 rounded text-xs transition-all
                    ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 
                      isComplete ? 'bg-green-500/20 text-green-400' : 
                      'bg-muted text-muted-foreground'}
                  `}
                >
                  <StepIcon className={`w-4 h-4 mb-1 ${isActive ? 'animate-scan-pulse' : ''}`} />
                  <span className="text-center leading-tight">
                    {step.label.split(' ').slice(0, 2).join(' ')}
                  </span>
                  {isComplete && (
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Live Data Stream */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Live Data Stream:</div>
            <div className="bg-black/50 rounded p-2 font-mono text-xs space-y-1 max-h-20 overflow-y-auto">
              <div className="text-green-400 animate-scan-pulse">
                [INFO] Connecting to Yemen telecom infrastructure...
              </div>
              <div className="text-cyan-400">
                [DATA] Found 34 regional social media profiles
              </div>
              <div className="text-yellow-400">
                [WARN] High activity detected on Islamic forums
              </div>
              <div className="text-cyan-400 animate-data-stream">
                [DATA] Processing Sana'a location metadata...
              </div>
              {progress > 50 && (
                <div className="text-red-400">
                  [ALERT] Cross-border communication detected
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}