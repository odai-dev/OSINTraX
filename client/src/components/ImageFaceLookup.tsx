import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import InteractiveDemo from "@/components/InteractiveDemo";
import { 
  Upload, 
  Image as ImageIcon, 
  Scan, 
  MapPin, 
  User, 
  Calendar, 
  Camera, 
  Instagram, 
  Linkedin, 
  Twitter,
  Hash,
  Search,
  AlertCircle,
  Target,
  PlayCircle
} from "lucide-react";

interface ImageFaceLookupProps {
  isScanning: boolean;
}

export default function ImageFaceLookup({ isScanning }: ImageFaceLookupProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setShowResults(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setShowResults(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setShowResults(false);
    
    const steps = [
      "Analyzing image...",
      "Detecting faces...",
      "Cross-referencing Yemen telecom data...",
      "Extracting metadata...",
      "Mapping regional social profiles...",
      "Generating intelligence report..."
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex]);
        setAnalysisProgress((stepIndex + 1) * (100 / steps.length));
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setShowResults(true);
      }
    }, 1500);
  };

  const fakeMatches = [
    { id: 1, name: "Ahmed Al-Yamani", platform: "Instagram", similarity: 87, avatar: "/api/placeholder/40/40", verified: true },
    { id: 2, name: "Fatima Al-Hadhrami", platform: "LinkedIn", similarity: 72, avatar: "/api/placeholder/40/40", verified: false },
    { id: 3, name: "Omar Al-Salihi", platform: "Twitter", similarity: 65, avatar: "/api/placeholder/40/40", verified: true },
    { id: 4, name: "Maryam Al-Hashemi", platform: "Facebook", similarity: 58, avatar: "/api/placeholder/40/40", verified: false }
  ];

  const fakeMetadata = {
    camera: "Canon EOS R5",
    lens: "RF 24-70mm f/2.8L IS USM",
    timestamp: "2024-09-20 14:32:18",
    gps: { lat: 15.369445, lng: 44.191007, location: "Sana'a, Yemen" },
    fileSize: "2.4 MB",
    dimensions: "6000 x 4000",
    iso: "ISO 400",
    aperture: "f/2.8",
    shutter: "1/250s"
  };

  const fakeSocialContext = {
    hashtags: ["#Yemen", "#Sana'a", "#اليمن", "#photography", "#culture"],
    linkedPlatforms: ["Instagram", "LinkedIn", "Twitter"],
    commonUsernames: ["ahmed_yamani_2024", "fatima_hdhrmi", "omar_salihi99"]
  };

  // Demo steps configuration
  const demoSteps = [
    {
      id: "welcome",
      title: "Welcome to Image & Face Analysis",
      description: "This powerful OSINT module analyzes uploaded images to find matches across social platforms and extract metadata.",
      target: "[data-testid='image-upload-area']",
      position: "bottom" as const,
      action: "none" as const
    },
    {
      id: "upload",
      title: "Upload an Image",
      description: "Click here or drag and drop an image file. The system supports JPG, PNG, and WebP formats up to 10MB.",
      target: "[data-testid='image-upload-area']",
      position: "bottom" as const,
      action: "click" as const
    },
    {
      id: "start-analysis",
      title: "Start the Analysis",
      description: "Once you've uploaded an image, click this button to begin the facial recognition and metadata extraction process.",
      target: "[data-testid='button-start-scan']",
      position: "top" as const,
      action: "click" as const
    },
    {
      id: "scanning",
      title: "Analysis in Progress",
      description: "Watch as the system processes the image through multiple databases and cross-references Yemen telecom data.",
      target: "[data-testid='analysis-progress']",
      position: "right" as const,
      action: "wait" as const,
      autoAdvance: true,
      duration: 3000
    },
    {
      id: "face-matches",
      title: "Face Match Results",
      description: "View potential matches found across social media platforms with similarity percentages and verification status.",
      target: "[data-testid='face-match-1']",
      position: "right" as const,
      action: "none" as const
    },
    {
      id: "metadata",
      title: "Metadata Extraction",
      description: "Technical details from the image including camera information, GPS coordinates, and file properties.",
      target: "[data-testid='metadata-info']",
      position: "left" as const,
      action: "none" as const
    },
    {
      id: "social-context",
      title: "Social Context Analysis",
      description: "Discover hashtags, usernames, and social patterns associated with the detected individuals.",
      target: "[data-testid='hashtags-section']",
      position: "left" as const,
      action: "none" as const
    },
    {
      id: "location",
      title: "Geographic Intelligence",
      description: "Location data extracted from GPS metadata, providing regional context for intelligence operations.",
      target: "[data-testid='map-preview']",
      position: "left" as const,
      action: "none" as const
    }
  ];

  const startDemoAnalysis = () => {
    // Set demo image
    setUploadedImage("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNhYWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EZW1vIEltYWdlPC90ZXh0Pjwvc3ZnPg==");
    
    // Start analysis
    setTimeout(() => {
      startAnalysis();
    }, 1000);
    
    // Show results after analysis
    setTimeout(() => {
      setShowResults(true);
    }, 10000);
  };

  const handleDemoStart = () => {
    // Reset states
    setUploadedImage(null);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  const handleDemoComplete = () => {
    setDemoCompleted(true);
    setShowDemo(false);
  };

  return (
    <>
      {/* Interactive Demo */}
      <InteractiveDemo
        isActive={showDemo}
        onStart={handleDemoStart}
        onComplete={handleDemoComplete}
        onClose={() => setShowDemo(false)}
        steps={demoSteps}
        title="Image & Face Lookup Demo"
        description="Learn how to use OSINTraX's powerful image analysis capabilities with this interactive walkthrough."
      />

      <div className="space-y-6">
      {/* Image Upload Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-cyan-400" />
              Image & Face Analysis
            </div>
            {!demoCompleted && (
              <Button
                onClick={() => setShowDemo(true)}
                variant="outline"
                size="sm"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
                data-testid="button-start-demo"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Demo
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadedImage ? (
            <div
              className="border-2 border-dashed border-border hover:border-cyan-400/50 rounded-lg p-8 text-center cursor-pointer transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              data-testid="image-upload-area"
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-mono text-foreground mb-2">Drop image here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP (Max 10MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                data-testid="file-input"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center bg-background rounded-lg p-4 border border-border">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-w-full max-h-64 rounded-lg shadow-lg"
                  data-testid="uploaded-image-preview"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/20"
                  data-testid="button-start-scan"
                >
                  {isAnalyzing ? (
                    <>
                      <Scan className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Start Analysis
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setUploadedImage(null);
                    setShowResults(false);
                    setIsAnalyzing(false);
                  }}
                  variant="outline"
                  data-testid="button-clear-image"
                >
                  Clear Image
                </Button>
              </div>
            </div>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="space-y-3 animate-fade-in" data-testid="analysis-progress">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-sm font-mono text-cyan-400">{currentStep}</span>
              </div>
              <Progress 
                value={analysisProgress} 
                className="h-2" 
                data-testid="progress-bar"
              />
              <p className="text-xs text-muted-foreground font-mono text-center">
                {Math.round(analysisProgress)}% Complete
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Face Matches */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="w-5 h-5 text-orange-400" />
                Face Matches
                <Badge variant="secondary" className="ml-auto">
                  {fakeMatches.length} Found
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fakeMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                    data-testid={`face-match-${match.id}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-foreground">{match.name}</span>
                        {match.verified && <Badge className="bg-cyan-500/20 text-cyan-400 text-xs">Verified</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {match.platform === 'Instagram' && <Instagram className="w-3 h-3" />}
                        {match.platform === 'LinkedIn' && <Linkedin className="w-3 h-3" />}
                        {match.platform === 'Twitter' && <Twitter className="w-3 h-3" />}
                        <span>{match.platform}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-lg text-cyan-400">
                        {match.similarity}%
                      </div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metadata Extraction */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Camera className="w-5 h-5 text-green-400" />
                Metadata Extraction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-mono text-sm">
                <div className="grid grid-cols-2 gap-2" data-testid="metadata-info">
                  <div className="text-muted-foreground">Camera:</div>
                  <div className="text-foreground">{fakeMetadata.camera}</div>
                  
                  <div className="text-muted-foreground">Lens:</div>
                  <div className="text-foreground">{fakeMetadata.lens}</div>
                  
                  <div className="text-muted-foreground">Timestamp:</div>
                  <div className="text-foreground">{fakeMetadata.timestamp}</div>
                  
                  <div className="text-muted-foreground">File Size:</div>
                  <div className="text-foreground">{fakeMetadata.fileSize}</div>
                  
                  <div className="text-muted-foreground">Dimensions:</div>
                  <div className="text-foreground">{fakeMetadata.dimensions}</div>
                  
                  <div className="text-muted-foreground">ISO:</div>
                  <div className="text-foreground">{fakeMetadata.iso}</div>
                </div>
                
                <div className="mt-4 p-3 bg-background/50 rounded-lg" data-testid="gps-coordinates">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-foreground font-semibold">GPS Coordinates</span>
                  </div>
                  <div className="text-muted-foreground">
                    Lat: {fakeMetadata.gps.lat}<br />
                    Lng: {fakeMetadata.gps.lng}<br />
                    Location: {fakeMetadata.gps.location}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Context */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Hash className="w-5 h-5 text-purple-400" />
                Social Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div data-testid="hashtags-section">
                <h4 className="font-mono font-semibold text-sm text-muted-foreground mb-2">Popular Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {fakeSocialContext.hashtags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-500/10 text-purple-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div data-testid="usernames-section">
                <h4 className="font-mono font-semibold text-sm text-muted-foreground mb-2">Common Usernames</h4>
                <div className="space-y-1">
                  {fakeSocialContext.commonUsernames.map((username, index) => (
                    <div key={index} className="font-mono text-sm text-foreground bg-background/30 px-2 py-1 rounded">
                      @{username}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Clues */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-red-400" />
                Location Clues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-32 bg-background/50 rounded-lg flex items-center justify-center border border-border" data-testid="map-preview">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-red-400 mx-auto mb-2 animate-glow-pulse" />
                    <div className="font-mono text-sm text-foreground">
                      {fakeMetadata.gps.location}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {fakeMetadata.gps.lat}, {fakeMetadata.gps.lng}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <div className="text-muted-foreground">Timezone:</div>
                    <div className="text-foreground">AST (UTC+3)</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Radius:</div>
                    <div className="text-foreground">±500m</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-orange-400 font-mono">
                    High confidence location match
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      </div>
    </>
  );
}