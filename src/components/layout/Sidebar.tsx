import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Calendar,
  CheckSquare,
  DollarSign,
  Package,
  Truck,
  Users,
  Radio,
  Image,
  AlertCircle,
  FileEdit,
  CreditCard,
  FileText,
  BarChart3,
  UserCheck,
  Settings,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ViewMode } from '../../types';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, screenNum: 2 },
    { id: 'projects', label: 'Projects', icon: FolderKanban, screenNum: 3 },
    { id: 'schedule', label: 'Schedule', icon: Calendar, screenNum: 5 },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, screenNum: 6 },
    { id: 'budget', label: 'Budget & RAB', icon: DollarSign, screenNum: 7 },
    { id: 'materials', label: 'Materials', icon: Package, screenNum: 8 },
    { id: 'suppliers', label: 'Suppliers', icon: Truck, screenNum: 9 },
    { id: 'team', label: 'Team', icon: Users, screenNum: 10 },
    { id: 'site-monitoring', label: 'Site Monitoring', icon: Radio, screenNum: 11 },
    { id: 'site-photos', label: 'Site Photos', icon: Image, screenNum: 12 },
    { id: 'issues', label: 'Issues', icon: AlertCircle, badge: '12', screenNum: 13 },
    { id: 'change-orders', label: 'Change Orders', icon: FileEdit, badge: '8', screenNum: 14 },
    { id: 'payments', label: 'Payments', icon: CreditCard, screenNum: 15 },
    { id: 'documents', label: 'Documents', icon: FileText, screenNum: 16 },
    { id: 'reports', label: 'Reports', icon: BarChart3, screenNum: 17 },
    { id: 'client-portal', label: 'Client Portal', icon: UserCheck, screenNum: 18 },
    { id: 'settings', label: 'Settings', icon: Settings, screenNum: 0 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0e1726] text-slate-300 flex flex-col transition-transform duration-200 ease-in-out border-r border-slate-800 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80 shrink-0">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <span className="text-lg tracking-tighter">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-white tracking-tight">Projeezy</span>
              <span className="text-[9px] uppercase tracking-wider text-blue-400 font-semibold">
                Build & Manage
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'projects' && currentView === 'project-detail');

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as ViewMode);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer group ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-blue-800 text-white'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.screenNum > 0 && (
                    <span className="text-[9px] opacity-40 font-mono">#{item.screenNum}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Project Quick Info Footer */}
        <div className="p-3 border-t border-slate-800/80 shrink-0 bg-slate-900/40">
          <div
            onClick={() => onNavigate('project-detail')}
            className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Current Project
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                On Track
              </span>
            </div>
            <div className="font-semibold text-white text-xs mt-1 truncate">Villa Taman Ayu</div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between mt-1">
              <span>Progress: 78%</span>
              <span>167 days</span>
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
