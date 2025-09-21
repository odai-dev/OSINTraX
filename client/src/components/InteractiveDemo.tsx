import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Lightbulb,
  Target,
  Eye
} from "lucide-react";

interface DemoStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector for the element to highlight
  position: "top" | "bottom" | "left" | "right";
  action?: "click" | "upload" | "wait" | "none";
  autoAdvance?: boolean;
  duration?: number;
}

interface InteractiveDemoProps {
  isActive: boolean;
  onStart: () => void;
  onComplete: () => void;
  onClose: () => void;
  steps: DemoStep[];
  title: string;
  description: string;
}

export default function InteractiveDemo({
  isActive,
  onStart,
  onComplete,
  onClose,
  steps,
  title,
  description
}: InteractiveDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && isRunning && steps[currentStep]) {
      const step = steps[currentStep];
      const element = document.querySelector(step.target) as HTMLElement;
      
      if (element) {
        setHighlightedElement(element);
        
        // Calculate tooltip position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        let x = rect.left + scrollLeft;
        let y = rect.top + scrollTop;
        
        switch (step.position) {
          case "top":
            x += rect.width / 2;
            y -= 10;
            break;
          case "bottom":
            x += rect.width / 2;
            y += rect.height + 10;
            break;
          case "left":
            x -= 10;
            y += rect.height / 2;
            break;
          case "right":
            x += rect.width + 10;
            y += rect.height / 2;
            break;
        }
        
        setTooltipPosition({ x, y });
        
        // Auto-advance for certain steps
        if (step.autoAdvance && step.duration) {
          setTimeout(() => {
            nextStep();
          }, step.duration);
        }
      }
    }
  }, [currentStep, isRunning, isActive]);

  const startDemo = () => {
    setIsRunning(true);
    setCurrentStep(0);
    onStart();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeDemo();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeDemo = () => {
    setIsRunning(false);
    setHighlightedElement(null);
    onComplete();
  };

  const closeDemo = () => {
    setIsRunning(false);
    setHighlightedElement(null);
    onClose();
  };

  const currentStepData = steps[currentStep];

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50" ref={overlayRef}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Highlight for current element */}
      {isRunning && highlightedElement && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: highlightedElement.getBoundingClientRect().left + window.pageXOffset - 4,
            top: highlightedElement.getBoundingClientRect().top + window.pageYOffset - 4,
            width: highlightedElement.getBoundingClientRect().width + 8,
            height: highlightedElement.getBoundingClientRect().height + 8,
            border: "2px solid #06b6d4",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 20px rgba(6, 182, 212, 0.1)",
            animation: "pulse 2s ease-in-out infinite"
          }}
        />
      )}

      {/* Welcome Card */}
      {!isRunning && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-card/95 backdrop-blur-sm border-cyan-400/50 shadow-2xl shadow-cyan-500/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-cyan-500/20 rounded-full mb-4">
                <Eye className="w-8 h-8 text-cyan-400" />
              </div>
              
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
              
              <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-500/10 p-3 rounded-lg">
                <Lightbulb className="w-4 h-4" />
                <span>Interactive demo • {steps.length} steps • ~2 minutes</span>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button onClick={closeDemo} variant="outline" className="flex-1">
                  Skip Demo
                </Button>
                <Button 
                  onClick={startDemo} 
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tooltip */}
      {isRunning && currentStepData && (
        <div
          className="absolute z-10 animate-fade-in"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: `translate(${
              currentStepData.position === "left" ? "-100%" : 
              currentStepData.position === "right" ? "0%" : "-50%"
            }, ${
              currentStepData.position === "top" ? "-100%" : 
              currentStepData.position === "bottom" ? "0%" : "-50%"
            })`
          }}
        >
          <Card className="max-w-sm bg-card/95 backdrop-blur-sm border-cyan-400/50 shadow-xl shadow-cyan-500/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {currentStep + 1}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{currentStepData.title}</h3>
                </div>
                <Button onClick={closeDemo} variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{currentStepData.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={prevStep} 
                    disabled={currentStep === 0}
                    variant="outline" 
                    size="sm"
                    className="h-8"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    size="sm"
                    className="h-8 bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Arrow pointing to highlighted element */}
          <div
            className={`absolute w-0 h-0 ${
              currentStepData.position === "top" ? 
                "top-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-card" :
              currentStepData.position === "bottom" ? 
                "bottom-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-transparent border-b-card" :
              currentStepData.position === "left" ? 
                "left-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-transparent border-l-card" :
                "right-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-card"
            }`}
          />
        </div>
      )}
      
      {/* Progress bar */}
      {isRunning && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}