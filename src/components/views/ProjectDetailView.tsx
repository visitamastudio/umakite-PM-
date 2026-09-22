import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit2,
  MoreHorizontal,
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  FileText,
  Camera,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Project, ViewMode, ActivityItem } from '../../types';

interface ProjectDetailViewProps {
  project: Project;
  activities: ActivityItem[];
  onBack: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  activities,
  onBack,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'budget' | 'tasks' | 'materials' | 'team' | 'documents' | 'activity'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schedule', label: 'Schedule', targetView: 'schedule' as ViewMode },
    { id: 'budget', label: 'Budget', targetView: 'budget' as ViewMode },
    { id: 'tasks', label: 'Tasks', targetView: 'tasks' as ViewMode },
    { id: 'materials', label: 'Materials', targetView: 'materials' as ViewMode },
    { id: 'team', label: 'Team', targetView: 'team' as ViewMode },
    { id: 'documents', label: 'Documents', targetView: 'documents' as ViewMode },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar Header (matching Image 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Projects</span>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{project.name}</h1>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {project.status}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.location}</span>
            </span>
            <span>•</span>
            <span>{project.type}</span>
            <span>•</span>
            <span className="font-mono text-slate-400">Project ID: {project.code}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Project</span>
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Row (matching Image 4) */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto text-xs font-medium scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.targetView && tab.id !== 'overview' && tab.id !== 'activity') {
                    onNavigate(tab.targetView);
                  } else {
                    setActiveTab(tab.id as any);
                  }
                }}
                className={`py-3 px-1 border-b-2 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Hero Image, Key Metrics & Phase Breakdown */}
          <div className="lg:col-span-8 space-y-6">
            {/* Architectural Hero Image Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-72 sm:h-80 group">
              <img
                src={project.coverImage}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Site Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">{project.name}</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* 4 Circular Key Metrics (matching Image 4: Progress 78%, Budget 72%, Materials 65%, Issues 3) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {/* Progress */}
                <div
                  onClick={() => onNavigate('schedule')}
                  className="p-3 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-600"
                        strokeDasharray="78, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-bold text-slate-900 text-sm">78%</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-800">Progress</div>
                  <div className="text-[10px] text-slate-400">Schedule on track</div>
                </div>

                {/* Budget */}
                <div
                  onClick={() => onNavigate('budget')}
                  className="p-3 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-500"
                        strokeDasharray="72, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-bold text-slate-900 text-sm">72%</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-800">Budget</div>
                  <div className="text-[10px] text-slate-400">Within threshold</div>
                </div>

                {/* Materials */}
                <div
                  onClick={() => onNavigate('materials')}
                  className="p-3 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-amber-500"
                        strokeDasharray="65, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-bold text-slate-900 text-sm">65%</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-800">Materials</div>
                  <div className="text-[10px] text-slate-400">Delivered to site</div>
                </div>

                {/* Issues */}
                <div
                  onClick={() => onNavigate('issues')}
                  className="p-3 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-extrabold text-xl">
                      3
                    </div>
                  </div>
                  <div className="font-semibold text-xs text-slate-800">Open Issues</div>
                  <div className="text-[10px] text-red-500 font-medium">Needs action</div>
                </div>
              </div>
            </div>

            {/* Work Breakdown Structure / Phase Progress (matching spec section 8) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Progress Breakdown by Phase</h3>
                <span className="text-xs text-blue-600 hover:underline cursor-pointer font-medium" onClick={() => onNavigate('schedule')}>
                  Open Gantt View →
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                {project.phases.map((phase) => (
                  <div key={phase.name} className="space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-700">{phase.name}</span>
                      <span className="text-slate-900">{phase.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          phase.progress === 100
                            ? 'bg-emerald-500'
                            : phase.progress >= 50
                            ? 'bg-blue-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Summary & Latest Activity (matching Image 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Project Summary</h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Start Date</span>
                  <span className="font-semibold text-slate-800">{project.startDate}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">End Date</span>
                  <span className="font-semibold text-slate-800">{project.endDate}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-semibold text-slate-800">{project.durationDays} days</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Client</span>
                  <span className="font-semibold text-blue-600">{project.clientName}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Project Manager</span>
                  <span className="font-semibold text-slate-800">{project.projectManager}</span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">Overall Progress</span>
                    <span className="text-blue-600 font-bold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Contract Value:</span>
                    <span className="font-bold text-slate-900">
                      Rp {project.contractValue.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Actual Cost:</span>
                    <span className="font-bold text-slate-700">
                      Rp {project.actualCost.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200">
                    <span className="text-emerald-700 font-semibold">Remaining Budget:</span>
                    <span className="font-bold text-emerald-600">
                      Rp {(project.contractValue - project.actualCost).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* OpenStreetMap Geo Location Mini Card */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-800 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>OpenStreetMap Location</span>
                    </span>
                    <button
                      onClick={() => onNavigate('site-monitoring')}
                      className="text-[11px] text-blue-600 hover:underline font-semibold"
                    >
                      Buka Peta Besar →
                    </button>
                  </div>
                  <div 
                    onClick={() => onNavigate('site-monitoring')}
                    className="relative h-28 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group shadow-2xs"
                  >
                    <img
                      src="https://tile.openstreetmap.org/13/7646/4243.png"
                      alt="OpenStreetMap"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <div className="px-3 py-1 bg-white/95 backdrop-blur-xs rounded-lg text-[10px] font-bold text-slate-800 shadow-md border border-slate-200 flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{project.location} (OSM)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Activity Widget (matching Image 4) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">Latest Activity</h3>
                <button
                  onClick={() => setActiveTab('activity')}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  View all
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 leading-snug">{act.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{act.timeAgo} • by {act.user}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('site-photos')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>View Project Photos</span>
                </button>
                <button
                  onClick={() => onNavigate('client-portal')}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Client Portal View →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Activity Feed */}
      {activeTab === 'activity' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-3xl">
          <h3 className="text-base font-bold text-slate-900 mb-4">Project Activity Timeline</h3>
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {activities.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white"></div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800">{item.title}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Logged by <span className="font-medium text-slate-700">{item.user}</span> on {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
