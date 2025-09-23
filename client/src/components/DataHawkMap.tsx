import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Ship, 
  Plane, 
  AlertTriangle, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Search,
  Filter,
  Eye,
  Target
} from "lucide-react";
import L from "leaflet";
import "leaflet.heat";
import mockDataHawk from "@/data/mock_datahawk.json";
import type { 
  VesselBlip, 
  AirTrack, 
  MapLayerState, 
  BaseLayer, 
  RegionPreset,
  AuditLogEntry 
} from "@/types";

// DEMO ONLY — SYNTHETIC DATA — DO NOT USE FOR REAL OPERATIONS
interface DataHawkMapProps {
  isScanning?: boolean;
}

export default function DataHawkMap({ isScanning = false }: DataHawkMapProps) {
  const [activeBaseLayer, setActiveBaseLayer] = useState<BaseLayer>("tactical");
  const [selectedRegion, setSelectedRegion] = useState<RegionPreset>("red_sea");
  const [layerState, setLayerState] = useState<MapLayerState>({
    ships: true,
    aircraft: true,
    hotspots: false,
    heatmap: false,
    anomalyClusters: true
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [anomalyAlert, setAnomalyAlert] = useState<string | null>(null);

  // DEMO ONLY — SYNTHETIC DATA — DO NOT USE FOR REAL OPERATIONS
  const vesselBlips: VesselBlip[] = mockDataHawk.vessel_blips as VesselBlip[];
  const airTracks: AirTrack[] = mockDataHawk.air_tracks as AirTrack[];

  // Filter data based on search and layer state
  const filteredVessels = useMemo(() => {
    return vesselBlips.filter(vessel => {
      const matchesSearch = !searchQuery || 
        vessel.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vessel.label.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [vesselBlips, searchQuery]);

  const filteredAircraft = useMemo(() => {
    return airTracks.filter(aircraft => {
      const matchesSearch = !searchQuery || 
        aircraft.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aircraft.label.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [airTracks, searchQuery]);

  // Heatmap data
  const heatmapData = useMemo(() => {
    const allBlips = [...filteredVessels, ...filteredAircraft];
    return allBlips.map(blip => [blip.lat, blip.lon, 0.5]);
  }, [filteredVessels, filteredAircraft]);

  // Demo anomaly detection simulation
  useEffect(() => {
    const anomalyInterval = setInterval(() => {
      const anomalyVessels = vesselBlips.filter(v => v.status === "anomaly");
      if (anomalyVessels.length > 0) {
        setAnomalyAlert(`Unusual concentration of simulated activity detected in Sector 7 (demo). Confidence: 68% (demo)`);
        setTimeout(() => setAnomalyAlert(null), 8000);
      }
    }, 15000);

    return () => clearInterval(anomalyInterval);
  }, [vesselBlips]);

  // Audit logging for demo
  const addAuditEntry = (action: string, targetId: string) => {
    const entry: AuditLogEntry = {
      user: "analyst_demo",
      action,
      target_id: targetId,
      timestamp: new Date().toISOString(),
      note: "DEMO view"
    };
    setAuditLog(prev => [entry, ...prev.slice(0, 9)]);
  };

  // Custom vessel icon
  const vesselIcon = (status: string) => {
    const color = status === "anomaly" ? "#ef4444" : 
                  status === "clustered" ? "#f97316" : "#06b6d4";
    return L.divIcon({
      html: `<div style="color: ${color}; font-size: 16px;">▲</div>`,
      iconSize: [20, 20],
      className: "vessel-marker"
    });
  };

  // Custom aircraft icon
  const aircraftIcon = (status: string) => {
    const color = status === "anomaly" ? "#ef4444" : 
                  status === "clustered" ? "#f97316" : "#22d3ee";
    return L.divIcon({
      html: `<div style="color: ${color}; font-size: 14px;">✈</div>`,
      iconSize: [20, 20],
      className: "aircraft-marker"
    });
  };

  const regionCoordinates = {
    red_sea: { center: [15.5, 42.5], zoom: 8 },
    arabian_sea: { center: [14.0, 58.0], zoom: 6 },
    gulf: { center: [26.0, 51.0], zoom: 7 },
    global: { center: [20.0, 50.0], zoom: 4 }
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* DEMO MODE BANNER - PROMINENTLY DISPLAYED */}
      <div className="bg-red-600 text-white px-4 py-2 text-center font-bold text-sm">
        🚨 DEMO MODE — SYNTHETIC DATA ONLY — NOT FOR OPERATIONAL USE 🚨
      </div>

      {/* Anomaly Alert Banner */}
      {anomalyAlert && (
        <div className="bg-red-500/20 border-l-4 border-red-500 p-3 text-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
            <strong className="text-red-400">ALERT — ANOMALY DETECTED (DEMO)</strong>
          </div>
          <p className="text-red-300 mt-1">{anomalyAlert}</p>
          <p className="text-xs text-red-400 mt-1">
            This dataset is synthetic for presentation only.
          </p>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left Filter Panel */}
        <Card className="w-80 border-r border-border rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" />
              Tracking Controls (Demo)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Base Layers */}
            <div>
              <h4 className="text-xs font-semibold mb-2">Base Layers</h4>
              <div className="space-y-2">
                {(["satellite", "tactical", "topographic"] as BaseLayer[]).map((layer) => (
                  <Button
                    key={layer}
                    variant={activeBaseLayer === layer ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => setActiveBaseLayer(layer)}
                    data-testid={`button-layer-${layer}`}
                  >
                    {layer.charAt(0).toUpperCase() + layer.slice(1)} (demo)
                  </Button>
                ))}
              </div>
            </div>

            {/* Layer Toggles */}
            <div>
              <h4 className="text-xs font-semibold mb-2">Layer Filters</h4>
              <div className="space-y-2">
                {Object.entries(layerState).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setLayerState(prev => ({ ...prev, [key]: checked }))
                      }
                      data-testid={`switch-${key}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Region Presets */}
            <div>
              <h4 className="text-xs font-semibold mb-2">Region Presets</h4>
              <div className="grid grid-cols-2 gap-2">
                {(["red_sea", "arabian_sea", "gulf", "global"] as RegionPreset[]).map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setSelectedRegion(region)}
                    data-testid={`button-region-${region}`}
                  >
                    {region.replace("_", " ").toUpperCase()} (demo)
                  </Button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <h4 className="text-xs font-semibold mb-2">Search Demo Targets</h4>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Find demo target (id/name)"
                  className="w-full pl-7 pr-3 py-1.5 text-xs bg-background border border-border rounded"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
            </div>

            {/* Playback Controls */}
            <div>
              <h4 className="text-xs font-semibold mb-2">Playback (Demo)</h4>
              <div className="flex items-center gap-1 mb-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs p-1"
                  onClick={() => setIsPlaying(!isPlaying)}
                  data-testid="button-playback-toggle"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
                <Button size="sm" variant="outline" className="text-xs p-1" data-testid="button-step-back">
                  <SkipBack className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="text-xs p-1" data-testid="button-step-forward">
                  <SkipForward className="w-3 h-3" />
                </Button>
                <select 
                  className="text-xs bg-background border border-border rounded px-1 py-0.5"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  data-testid="select-speed"
                >
                  <option value={1}>x1</option>
                  <option value={2}>x2</option>
                  <option value={4}>x4</option>
                </select>
              </div>
              <div className="text-xs text-muted-foreground">
                Speed: x{playbackSpeed} (demo playback)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          {/* Top-right demo badge */}
          <div className="absolute top-4 right-4 z-[1000]">
            <Badge variant="destructive" className="bg-red-600 text-white text-xs">
              DEMO MODE — SYNTHETIC DATA ONLY
            </Badge>
          </div>

          {/* Map Container */}
          <MapContainer
            center={regionCoordinates[selectedRegion].center as [number, number]}
            zoom={regionCoordinates[selectedRegion].zoom}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors (DEMO TILES)'
            />

            {/* Vessel Markers */}
            {layerState.ships && vesselBlips.map((vessel) => (
              <Marker
                key={vessel.id}
                position={[vessel.lat, vessel.lon]}
                icon={vesselIcon(vessel.status)}
                eventHandlers={{
                  click: () => addAuditEntry("view_marker", vessel.id)
                }}
              >
                <Popup>
                  <div className="text-xs space-y-1">
                    <div className="font-semibold border-b pb-1">
                      Vessel — {vessel.label}
                    </div>
                    <div><strong>ID:</strong> {vessel.id} (demo)</div>
                    <div><strong>Type:</strong> {vessel.vessel_type} (demo)</div>
                    <div><strong>Last seen (demo):</strong> {vessel.last_seen_demo}</div>
                    <div><strong>Lat/Lon:</strong> {vessel.lat.toFixed(4)}, {vessel.lon.toFixed(4)} (demo)</div>
                    <div><strong>Speed (kn):</strong> {vessel.speed_kn} (demo)</div>
                    <div className="mt-2 space-x-1">
                      <Button size="sm" variant="outline" className="text-xs h-6">View playback (demo)</Button>
                      <Button size="sm" variant="outline" className="text-xs h-6">Flag as anomaly (demo)</Button>
                    </div>
                    <div className="text-red-500 font-semibold text-xs mt-2 pt-1 border-t">
                      SIMULATED DATA — FOR DEMO ONLY
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Aircraft Markers */}
            {layerState.aircraft && airTracks.map((aircraft) => (
              <Marker
                key={aircraft.id}
                position={[aircraft.lat, aircraft.lon]}
                icon={aircraftIcon(aircraft.status)}
                eventHandlers={{
                  click: () => addAuditEntry("view_marker", aircraft.id)
                }}
              >
                <Popup>
                  <div className="text-xs space-y-1">
                    <div className="font-semibold border-b pb-1">
                      Aircraft — {aircraft.label}
                    </div>
                    <div><strong>ID:</strong> {aircraft.id} (demo)</div>
                    <div><strong>Type:</strong> {aircraft.aircraft_type}</div>
                    <div><strong>Flight:</strong> {aircraft.flight_label}</div>
                    <div><strong>Alt:</strong> {aircraft.altitude_ft} ft (demo)</div>
                    <div><strong>Speed:</strong> {aircraft.speed_kt} kt (demo)</div>
                    <div><strong>Last seen (demo):</strong> {aircraft.last_seen_demo}</div>
                    <div><strong>Lat/Lon:</strong> {aircraft.lat.toFixed(4)}, {aircraft.lon.toFixed(4)} (demo)</div>
                    <div className="mt-2 space-x-1">
                      <Button size="sm" variant="outline" className="text-xs h-6">View playback (demo)</Button>
                      <Button size="sm" variant="outline" className="text-xs h-6">Flag as anomaly (demo)</Button>
                    </div>
                    <div className="text-red-500 font-semibold text-xs mt-2 pt-1 border-t">
                      SIMULATED DATA — FOR DEMO ONLY
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Bottom Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-red-900/20 border-t border-red-500/30 px-4 py-2 z-[1000]">
            <div className="text-xs text-red-300 text-center font-mono">
              NOT FOR OPERATIONAL USE • ALL DATA SYNTHETIC • DEMO PRESENTATION ONLY
            </div>
          </div>
        </div>

        {/* Right Panel - Active Blips List */}
        <Card className="w-80 border-l border-border rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4" />
              Active Blips (Demo)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs text-muted-foreground mb-3">
              {vesselBlips.length + airTracks.length} synthetic targets tracked
            </div>
            
            {/* Vessels List */}
            <div className="space-y-1">
              <h5 className="text-xs font-semibold flex items-center gap-1">
                <Ship className="w-3 h-3" />
                Vessels ({vesselBlips.length})
              </h5>
              {vesselBlips.map((vessel) => (
                <div 
                  key={vessel.id}
                  className="p-2 bg-muted rounded text-xs space-y-1"
                  data-testid={`vessel-blip-${vessel.id}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-cyan-400">{vessel.id}</span>
                    <Badge 
                      variant={vessel.status === "anomaly" ? "destructive" : "default"}
                      className="text-xs h-4"
                    >
                      {vessel.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">{vessel.label}</div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="text-xs h-5 px-2" data-testid={`button-view-${vessel.id}`}>
                      <Eye className="w-2 h-2 mr-1" />View
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-5 px-2" data-testid={`button-track-${vessel.id}`}>
                      <Play className="w-2 h-2 mr-1" />Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Aircraft List */}
            <div className="space-y-1">
              <h5 className="text-xs font-semibold flex items-center gap-1">
                <Plane className="w-3 h-3" />
                Aircraft ({airTracks.length})
              </h5>
              {airTracks.map((aircraft) => (
                <div 
                  key={aircraft.id}
                  className="p-2 bg-muted rounded text-xs space-y-1"
                  data-testid={`aircraft-blip-${aircraft.id}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-cyan-400">{aircraft.id}</span>
                    <Badge 
                      variant={aircraft.status === "anomaly" ? "destructive" : "default"}
                      className="text-xs h-4"
                    >
                      {aircraft.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">{aircraft.label}</div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="text-xs h-5 px-2" data-testid={`button-view-${aircraft.id}`}>
                      <Eye className="w-2 h-2 mr-1" />View
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-5 px-2" data-testid={`button-track-${aircraft.id}`}>
                      <Play className="w-2 h-2 mr-1" />Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Audit Log */}
            <div className="mt-4 pt-4 border-t">
              <h5 className="text-xs font-semibold mb-2">Audit Trail (Demo)</h5>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {auditLog.slice(0, 5).map((entry, idx) => (
                  <div key={idx} className="text-xs p-1 bg-muted/50 rounded">
                    <div className="font-mono text-cyan-400">{entry.user}</div>
                    <div className="text-muted-foreground">{entry.action}: {entry.target_id}</div>
                    <div className="text-xs text-muted-foreground">{entry.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}