import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Calendar,
  Filter,
  Eye,
  X,
  MapPin,
  User,
  Sliders,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';
import { SitePhoto, Project, ViewMode } from '../../types';

interface SitePhotosViewProps {
  photos: SitePhoto[];
  projects: Project[];
  selectedProjectId: string;
  onOpenUploadPhotoModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const SitePhotosView: React.FC<SitePhotosViewProps> = ({
  photos,
  projects,
  selectedProjectId,
  onOpenUploadPhotoModal,
  onNavigate,
}) => {
  const [phaseFilter, setPhaseFilter] = useState('All Phases');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [activePhoto, setActivePhoto] = useState<SitePhoto | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showCompareMode, setShowCompareMode] = useState(false);

  const filteredPhotos = photos.filter((p) => {
    const matchesPhase = phaseFilter === 'All Phases' || p.phase === phaseFilter;
    return matchesPhase;
  });

  return (
    <div className="space-y-6">
      {/* Header (matching Image 12) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Site Photos</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Project visual documentation, progress inspections, and before/after verification
          </p>
        </div>

        <button
          onClick={onOpenUploadPhotoModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Photo</span>
        </button>
      </div>

      {/* Filter Toolbar (matching Image 12) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            defaultValue={selectedProjectId}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Phases">All Phases</option>
            <option value="Foundation">Foundation</option>
            <option value="Structure">Structure</option>
            <option value="Architecture">Architecture</option>
            <option value="MEP">MEP</option>
            <option value="Finishing">Finishing</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Dates">All Dates</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="Older">Older</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {filteredPhotos.length} documentation photos
        </div>
      </div>

      {/* Photo Grid (6 cards matching Image 12) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                {photo.phase}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{photo.description}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{photo.uploadedBy}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{activePhoto.title}</h3>
                <p className="text-xs text-slate-500">
                  {activePhoto.projectName} • {activePhoto.phase} • {activePhoto.date}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCompareMode(!showCompareMode)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    showCompareMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{showCompareMode ? 'Exit Comparison' : 'Before / After Mode'}</span>
                </button>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Body */}
            <div className="relative flex-1 min-h-[360px] max-h-[520px] bg-slate-950 flex items-center justify-center overflow-hidden select-none">
              {!showCompareMode ? (
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                /* Interactive Before/After Split Slider */
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80"
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={activePhoto.url}
                      alt="After"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ width: '100vw', maxWidth: 'none' }}
                    />
                    <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded font-bold">
                      Current Site State
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded font-bold">
                    Initial Site Preparation
                  </div>

                  {/* Slider handle */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-slate-800 text-xs font-bold">
                      ↔
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Photographer: {activePhoto.uploadedBy}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>GPS: 8.5833° S, 116.1167° E (Lombok)</span>
                </span>
              </div>

              <button
                onClick={() => alert('Downloading original high-resolution site photo...')}
                className="flex items-center space-x-1.5 text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
