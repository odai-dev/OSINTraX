import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Radar, Clock, AlertCircle } from "lucide-react";
import { mockLocations } from "@/lib/mockData";

interface MapComponentProps {
  isScanning?: boolean;
}

export default function MapComponent({ isScanning = false }: MapComponentProps) {

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "residence": return "🏠";
      case "workplace": return "🏢";
      case "recreational": return "🌳";
      default: return "📍";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400";
    if (confidence >= 70) return "text-yellow-400";
    return "text-orange-400";
  };

  if (isScanning) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radar className="w-5 h-5 animate-spin" data-testid="icon-scanning" />
            Scanning Geolocation Data...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Analyzing location patterns...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Map Visualization */}
      <Card className="h-96">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm" data-testid="title-geolocation">
            <MapPin className="w-4 h-4" />
            Geolocation Mapping
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Mock Map Interface */}
          <div className="relative w-full h-64 bg-gray-800 rounded border border-border overflow-hidden">
            {/* Mock map tiles pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="border border-gray-600 bg-gray-700"
                    style={{ 
                      backgroundColor: Math.random() > 0.5 ? '#374151' : '#4b5563' 
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Location pins */}
            {mockLocations.map((location, index) => (
              <div
                key={location.id}
                className="absolute"
                style={{
                  left: `${20 + (index * 25)}%`,
                  top: `${30 + (index * 20)}%`
                }}
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-cyan-400 rounded-full border-2 border-white shadow-lg animate-glow-pulse flex items-center justify-center">
                    <div className="text-xs">{getLocationIcon(location.type)}</div>
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-1 rounded whitespace-nowrap">
                    {location.name}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Map controls */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              <button className="w-6 h-6 bg-black/50 text-white text-xs rounded hover:bg-black/70">+</button>
              <button className="w-6 h-6 bg-black/50 text-white text-xs rounded hover:bg-black/70">-</button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card className="h-96">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm" data-testid="title-location-intel">
            <Clock className="w-4 h-4" />
            Location Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {mockLocations.map((location) => (
              <div 
                key={location.id} 
                className="p-3 bg-muted rounded border hover-elevate cursor-pointer"
                data-testid={`location-${location.id}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getLocationIcon(location.type)}</span>
                    <span className="font-semibold text-sm">{location.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {location.verified && (
                      <Badge variant="secondary" className="text-xs h-5">
                        Verified
                      </Badge>
                    )}
                    <div className={`text-xs font-mono ${getConfidenceColor(location.confidence)}`}>
                      {location.confidence}%
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1 text-xs">
                  <p className="text-muted-foreground">{location.address}</p>
                  <p className="font-mono text-cyan-400">{location.coordinates}</p>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last seen:</span>
                    <span className="text-cyan-400">{location.lastSeen}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}