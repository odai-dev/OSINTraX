import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Mail, 
  Phone, 
  Globe,
  Shield,
  AlertTriangle
} from "lucide-react";
import profilePhoto from "@assets/generated_images/OSINT_profile_photo_60520324.png";

interface DataCardsProps {
  isScanning?: boolean;
}

export default function DataCards({ isScanning = false }: DataCardsProps) {
  // TODO: Remove mock data
  const mockPersonalData = {
    name: "Alex Richardson",
    age: 32,
    location: "San Francisco, CA",
    occupation: "Software Engineer",
    company: "TechCorp Inc.",
    email: "a.richardson@techcorp.com",
    phone: "+1 (555) 123-4567",
    socialMedia: [
      { platform: "LinkedIn", username: "@alex-richardson", verified: true },
      { platform: "Twitter", username: "@alexr_dev", verified: false },
      { platform: "GitHub", username: "alexrichardson", verified: true },
      { platform: "Instagram", username: "@alex.codes", verified: false }
    ],
    digitalFootprint: {
      score: 87,
      risk: "Medium",
      lastActivity: "2 hours ago"
    },
    education: "Stanford University - Computer Science",
    interests: ["Machine Learning", "Cybersecurity", "Photography", "Rock Climbing"]
  };

  if (isScanning) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Personal Information */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-cyan-400/20">
              <AvatarImage src={profilePhoto} alt="Profile" />
              <AvatarFallback className="bg-muted">AR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold" data-testid="text-name">{mockPersonalData.name}</p>
              <p className="text-sm text-muted-foreground">Age: {mockPersonalData.age}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span data-testid="text-location">{mockPersonalData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3 h-3 text-muted-foreground" />
              <span>{mockPersonalData.occupation} at {mockPersonalData.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-muted-foreground" />
              <span className="font-mono text-xs">{mockPersonalData.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Profiles */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4" />
            Social Media Presence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockPersonalData.socialMedia.map((social, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="font-semibold text-sm">{social.platform}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">{social.username}</span>
                {social.verified && (
                  <Badge variant="secondary" className="px-1.5 py-0.5 text-xs h-5">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Digital Footprint */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            Digital Footprint Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400" data-testid="text-footprint-score">
              {mockPersonalData.digitalFootprint.score}
            </div>
            <p className="text-sm text-muted-foreground">Exposure Score</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Risk Level:</span>
              <Badge 
                variant={mockPersonalData.digitalFootprint.risk === 'Medium' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {mockPersonalData.digitalFootprint.risk}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Last Activity:</span>
              <span className="text-cyan-400 font-mono">{mockPersonalData.digitalFootprint.lastActivity}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education & Background */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            Background Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-semibold mb-1">Education</p>
            <p className="text-sm text-muted-foreground">{mockPersonalData.education}</p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Interests & Hobbies</p>
            <div className="flex flex-wrap gap-1">
              {mockPersonalData.interests.map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Channels */}
      <Card className="hover-elevate">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            Communication Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-2 bg-muted rounded">
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Primary Phone</span>
              <Badge variant="secondary" className="text-xs h-5">Active</Badge>
            </div>
            <p className="font-mono text-sm text-cyan-400">{mockPersonalData.phone}</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Work Email</span>
              <Badge variant="secondary" className="text-xs h-5">Verified</Badge>
            </div>
            <p className="font-mono text-xs text-cyan-400">{mockPersonalData.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card className="hover-elevate border-orange-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm text-orange-400">
            <AlertTriangle className="w-4 h-4" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Public Exposure:</span>
              <span className="text-orange-400">High</span>
            </div>
            <div className="flex justify-between">
              <span>Data Leaks:</span>
              <span className="text-red-400">2 Found</span>
            </div>
            <div className="flex justify-between">
              <span>Social Engineering Risk:</span>
              <span className="text-orange-400">Medium</span>
            </div>
            <div className="flex justify-between">
              <span>Privacy Score:</span>
              <span className="text-yellow-400">6.2/10</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}