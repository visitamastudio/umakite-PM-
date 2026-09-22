import React, { useState } from 'react';
import {
  Radio,
  MapPin,
  Calendar,
  Plus,
  Sun,
  Users,
  AlertTriangle,
  Camera,
  Layers,
  ChevronRight,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { SiteLocation, SiteUpdate, ViewMode } from '../../types';
import { LeafletMapView } from '../common/LeafletMapView';

interface SiteMonitoringViewProps {
  locations: SiteLocation[];
  siteUpdates: SiteUpdate[];
  onOpenAddUpdateModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const SiteMonitoringView: React.FC<SiteMonitoringViewProps> = ({
  locations,
  siteUpdates,
  onOpenAddUpdateModal,
  onNavigate,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<SiteLocation>(locations[0]);
  const [mapLayer, setMapLayer] = useState<'osm' | 'satellite' | 'topo'>('osm');

  return (
    <div className="space-y-6">
      {/* Header & Controls (matching Image 11) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Site Monitoring</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time site progress, geospatial location tracking, and daily site supervisor logs
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>May 20, 2025</span>
          </div>

          <button
            onClick={onOpenAddUpdateModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Site Update</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards (matching Image 11) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Sites
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">5</div>
          <span className="text-[10px] text-slate-400">Active regional construction</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            On Progress
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">4</div>
          <span className="text-[10px] text-blue-600 font-medium">Under daily supervision</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Delayed
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-red-600 mt-1">1</div>
          <span className="text-[10px] text-red-500 font-medium">Warehouse Sumbawa</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Completed
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">0</div>
          <span className="text-[10px] text-slate-400">Current Q2 pipeline</span>
        </div>
      </div>

      {/* Main Two-Column Grid: Map View (7 cols) + Recent Site Updates (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Project Locations Map with OpenStreetMap + Leaflet.js */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Geospatial Project Locations</h3>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="flex items-center space-x-1 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
                <Navigation className="w-3 h-3 text-blue-600" />
                <span>OpenStreetMap Engine</span>
              </span>
            </div>
          </div>

          {/* Leaflet OSM Map */}
          <div className="p-3">
            <LeafletMapView
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              mapLayer={mapLayer}
              onChangeLayer={setMapLayer}
            />
          </div>

          {/* Selected Site Details Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center space-x-2">
                <div className="font-bold text-slate-900 text-sm">{selectedLocation.name}</div>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </span>
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                {selectedLocation.city} • {selectedLocation.type} • PM: {selectedLocation.projectManager}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-slate-600 font-medium">
                {selectedLocation.activeWorkers} Workers on Site
              </span>
              <button
                onClick={() => onNavigate('project-detail')}
                className="text-blue-600 font-bold hover:underline"
              >
                Open Project Details →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Site Updates (matching Image 11) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Recent Site Updates</h3>
              <button
                onClick={() => onNavigate('site-photos')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {siteUpdates.map((update) => (
                <div
                  key={update.id}
                  onClick={() => onNavigate('site-photos')}
                  className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all cursor-pointer flex items-start space-x-3 group"
                >
                  <img
                    src={update.thumbnail}
                    alt={update.projectName}
                    className="w-14 h-14 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-blue-600">
                        {update.projectName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">{update.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-snug">
                      {update.progressDesc}
                    </p>
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-2">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{update.workers} workers</span>
                      </span>
                      <span>•</span>
                      <span>{update.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Daily supervisor reports synced</span>
            <button
              onClick={() => onNavigate('reports')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Export Daily Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
