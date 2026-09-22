import React from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  PauseCircle,
  AlertTriangle,
  Calendar,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { Project, ViewMode } from '../../types';

interface DashboardViewProps {
  projects: Project[];
  onNavigate: (view: ViewMode) => void;
  onSelectProject: (projectId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onNavigate,
  onSelectProject,
}) => {
  const totalProjects = 27;
  const onProgressCount = 18;
  const completedCount = 6;
  const onHoldCount = 3;

  const milestones = [
    { title: 'Office Building - Phase 2', date: 'Apr 25, 2025', project: 'Office Building' },
    { title: 'Villa Project - Final Inspection', date: 'Apr 28, 2025', project: 'Villa Taman Ayu' },
    { title: 'School Renovation - Handover', date: 'May 3, 2025', project: 'School Renovation' },
    { title: 'Warehouse - Structure Erection', date: 'May 8, 2025', project: 'Warehouse Logistics' },
  ];

  const alerts = [
    {
      id: 'a1',
      title: '3 issues require attention',
      desc: 'Quality defects & rain leakage reported',
      type: 'warning',
      view: 'issues' as ViewMode,
    },
    {
      id: 'a2',
      title: 'Budget variance warning on Villa Taman Ayu',
      desc: 'Material price escalation on rebar batch',
      type: 'danger',
      view: 'budget' as ViewMode,
    },
    {
      id: 'a3',
      title: 'Delayed delivery from Supplier CV. Maju Jaya',
      desc: 'Piping shipment estimated 2 days late',
      type: 'info',
      view: 'materials' as ViewMode,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Good morning, Robald!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Here's what's happening with your projects today across Lombok, Bali, and Sumbawa.
        </p>
      </div>

      {/* 4 KPI Cards (matching Image 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div
          onClick={() => onNavigate('projects')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Projects</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{totalProjects}</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              +2 this month
            </span>
          </div>
        </div>

        {/* On Progress */}
        <div
          onClick={() => onNavigate('projects')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">On Progress</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{onProgressCount}</span>
            <span className="text-[11px] font-medium text-slate-500">66%</span>
          </div>
        </div>

        {/* Completed */}
        <div
          onClick={() => onNavigate('projects')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Completed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{completedCount}</span>
            <span className="text-[11px] font-medium text-slate-500">22%</span>
          </div>
        </div>

        {/* On Hold */}
        <div
          onClick={() => onNavigate('projects')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-red-400 transition-all cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">On Hold</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <PauseCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{onHoldCount}</span>
            <span className="text-[11px] font-medium text-slate-500">11%</span>
          </div>
        </div>
      </div>

      {/* 2-Column Middle Grid: Project Progress & Upcoming Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Project Progress Gauge Widget (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm">Project Progress</h3>
            <span className="text-xs text-slate-400">Current Q2 Portfolio</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            {/* Donut Chart visual */}
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="10"
                />
                {/* Completed (22%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - 0.22)}
                />
                {/* On Progress (66%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - 0.66)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900">66%</span>
                <span className="text-[10px] text-slate-400 font-medium">Overall Progress</span>
              </div>
            </div>

            {/* Legend & Breakdown */}
            <div className="space-y-3 w-full max-w-xs text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-slate-600">Completed</span>
                </div>
                <span className="font-bold text-slate-800">6</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-slate-600">On Progress</span>
                </div>
                <span className="font-bold text-slate-800">18</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <span className="text-slate-600">Not Started / On Hold</span>
                </div>
                <span className="font-bold text-slate-800">3</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-bold text-slate-900">
                <span>Total</span>
                <span>27</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Milestones Widget (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Upcoming Milestones</h3>
              <button
                onClick={() => onNavigate('schedule')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('schedule')}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-800 truncate">{m.title}</p>
                      <p className="text-[10px] text-slate-400">{m.project}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    {m.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Next milestone in 7 days</span>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-blue-600 flex items-center space-x-1 font-medium hover:underline"
            >
              <span>Schedule timeline</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 2-Column Grid: Recent Projects & Alerts / Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Projects Widget (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm">Recent Projects</h3>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  onSelectProject(proj.id);
                  onNavigate('project-detail');
                }}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={proj.coverImage}
                    alt={proj.name}
                    className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{proj.name}</h4>
                    <p className="text-xs text-slate-500">{proj.type} • {proj.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0 sm:w-56">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-slate-800 font-bold">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          proj.progress >= 70
                            ? 'bg-emerald-500'
                            : proj.progress >= 40
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      proj.status === 'On Track'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : proj.status === 'At Risk'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {proj.status}
                  </span>

                  <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Issues Widget (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm">Alerts & Issues</h3>
            <button
              onClick={() => onNavigate('issues')}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onNavigate(alert.view)}
                className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex items-start space-x-3"
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    alert.type === 'danger'
                      ? 'bg-red-50 text-red-600'
                      : alert.type === 'warning'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900">{alert.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{alert.desc}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 self-center" />
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-blue-900 font-medium">5 active sites currently monitored</span>
            </div>
            <button
              onClick={() => onNavigate('site-monitoring')}
              className="text-blue-700 font-bold hover:underline"
            >
              Map View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
