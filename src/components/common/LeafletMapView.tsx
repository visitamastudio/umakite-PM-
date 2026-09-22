import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SiteLocation } from '../../types';
import { Layers, Maximize2, LocateFixed, Eye } from 'lucide-react';

interface LeafletMapViewProps {
  locations: SiteLocation[];
  selectedLocation: SiteLocation;
  onSelectLocation: (location: SiteLocation) => void;
  mapLayer: 'osm' | 'satellite' | 'topo';
  onChangeLayer: (layer: 'osm' | 'satellite' | 'topo') => void;
}

export const LeafletMapView: React.FC<LeafletMapViewProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  mapLayer,
  onChangeLayer,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  // Define Tile Layer URLs
  const getTileLayerConfig = (layer: 'osm' | 'satellite' | 'topo') => {
    switch (layer) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19,
        };
      case 'topo':
        return {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          maxZoom: 17,
        };
      case 'osm':
      default:
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        };
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-8.55, 116.3], // Regional view of Bali, Lombok & Sumbawa
        zoom: 9,
        zoomControl: false, // We'll customize zoom or let user zoom smoothly
        attributionControl: true,
      });

      // Add Zoom control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Tile layer
      const config = getTileLayerConfig(mapLayer);
      const tiles = L.tileLayer(config.url, {
        attribution: config.attribution,
        maxZoom: config.maxZoom,
      }).addTo(map);

      tileLayerRef.current = tiles;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when layer switch changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = getTileLayerConfig(mapLayer);
    const newTiles = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(map);

    tileLayerRef.current = newTiles;
  }, [mapLayer]);

  // Create custom marker icons
  const createCustomMarkerIcon = (loc: SiteLocation, isSelected: boolean) => {
    const isDelayed = loc.status === 'Delayed';
    const isCompleted = loc.status === 'Completed';

    let pinColor = '#10b981'; // emerald
    let badgeBg = '#059669';
    if (isDelayed) {
      pinColor = '#ef4444'; // red
      badgeBg = '#dc2626';
    } else if (isCompleted) {
      pinColor = '#3b82f6'; // blue
      badgeBg = '#2563eb';
    }

    const borderRing = isSelected ? 'border: 3px solid #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.4), 0 10px 15px -3px rgba(0,0,0,0.3);' : 'border: 2px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);';

    const html = `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <!-- Floating Label Tag -->
        <div style="
          background: #ffffff; 
          color: #0f172a; 
          padding: 3px 8px; 
          border-radius: 8px; 
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px; 
          font-weight: 700; 
          display: flex; 
          align-items: center; 
          gap: 5px; 
          white-space: nowrap; 
          margin-bottom: 4px; 
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        ">
          <span style="width: 7px; height: 7px; border-radius: 50%; background: ${pinColor}; display: inline-block;"></span>
          <span>${loc.name}</span>
          <span style="color: #64748b; font-size: 9px; font-weight: 600;">(${loc.progress}%)</span>
        </div>

        <!-- Pin Head Marker -->
        <div style="
          width: ${isSelected ? '28px' : '22px'}; 
          height: ${isSelected ? '28px' : '22px'}; 
          background: ${pinColor}; 
          border-radius: 50% 50% 50% 0; 
          transform: rotate(-45deg); 
          ${borderRing}
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 6px; height: 6px; background: #ffffff; border-radius: 50%;"></div>
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-osm-marker',
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -45],
    });
  };

  // Render & Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    locations.forEach((loc) => {
      const isSelected = loc.id === selectedLocation.id;
      const icon = createCustomMarkerIcon(loc, isSelected);

      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

      // Popup content
      const popupContent = `
        <div style="padding: 4px; font-family: 'Plus Jakarta Sans', sans-serif; min-width: 170px;">
          <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${loc.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${loc.city} • ${loc.type}</div>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
            <span style="color: #475569;">Progress:</span>
            <strong style="color: #2563eb;">${loc.progress}%</strong>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
            <span style="color: #475569;">Pekerja:</span>
            <span style="font-weight: 600; color: #0f172a;">${loc.activeWorkers} Orang</span>
          </div>
          <div style="background: #f1f5f9; padding: 4px 6px; border-radius: 6px; font-size: 10px; color: #334155;">
            PM: <strong>${loc.projectManager}</strong>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectLocation(loc);
      });

      markersRef.current[loc.id] = marker;
    });
  }, [locations, selectedLocation]);

  // Center on Selected Location
  const handleFocusSelected = () => {
    if (mapInstanceRef.current && selectedLocation) {
      mapInstanceRef.current.flyTo([selectedLocation.lat, selectedLocation.lng], 13, {
        duration: 1.2,
      });
      const marker = markersRef.current[selectedLocation.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  // Fit all markers
  const handleFitBounds = () => {
    if (!mapInstanceRef.current || locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
  };

  return (
    <div className="relative w-full h-[460px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-3 left-3 z-20 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs">
        <div className="flex items-center space-x-1.5 font-bold text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>OpenStreetMap (OSM) + Leaflet</span>
        </div>
      </div>

      {/* Top Right: Layer Switcher */}
      <div className="absolute top-3 right-3 z-20 flex items-center bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200 text-xs font-semibold text-slate-700">
        <button
          onClick={() => onChangeLayer('osm')}
          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mapLayer === 'osm'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          OSM Standard
        </button>
        <button
          onClick={() => onChangeLayer('satellite')}
          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mapLayer === 'satellite'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Satelit
        </button>
        <button
          onClick={() => onChangeLayer('topo')}
          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mapLayer === 'topo'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          Topografi
        </button>
      </div>

      {/* Bottom Left Quick Action Buttons */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2">
        <button
          onClick={handleFocusSelected}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-slate-800 rounded-xl shadow-md border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
          title="Fokus ke Proyek yang Sedang Dipilih"
        >
          <LocateFixed className="w-3.5 h-3.5 text-blue-600" />
          <span>Fokus Proyek</span>
        </button>

        <button
          onClick={handleFitBounds}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-slate-800 rounded-xl shadow-md border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
          title="Tampilkan Semua Lokasi Proyek"
        >
          <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
          <span>Lihat Semua ({locations.length})</span>
        </button>
      </div>
    </div>
  );
};
