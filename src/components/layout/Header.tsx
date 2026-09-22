import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Plus,
  ChevronDown,
  LogOut,
  User,
  Shield,
  Layers,
  X,
  CheckCircle2,
  AlertTriangle,
  FolderPlus,
  Camera,
  FileSpreadsheet,
} from 'lucide-react';
import { ViewMode, UserRole } from '../../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenQuickAdd: (type: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  userRole,
  onRoleChange,
  onOpenQuickAdd,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAddMenu, setShowQuickAddMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: '1',
      title: 'Site photo uploaded',
      desc: 'Siti uploaded 4 progress photos for Villa Taman Ayu',
      time: '12m ago',
      unread: true,
      type: 'photo',
    },
    {
      id: '2',
      title: 'Change Order Approved',
      desc: 'CO-001 Patio extension approved by Client',
      time: '1h ago',
      unread: true,
      type: 'approval',
    },
    {
      id: '3',
      title: 'Material delivery alert',
      desc: '200 sacks Portland Cement received on site',
      time: '3h ago',
      unread: false,
      type: 'delivery',
    },
  ];

  const roles: UserRole[] = [
    'Project Manager',
    'Admin',
    'Site Engineer',
    'Architect',
    'Procurement',
    'Finance',
    'Client',
  ];

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Search Input */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, tasks, materials, documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2 md:space-x-3 ml-4">
        {/* Google Sheets Direct Link */}
        <button
          onClick={() => onNavigate('settings')}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          title="Buka Pengaturan & Status 4 Google Sheets"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          <span>4 Google Sheets</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* Quick Add Button */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAddMenu(!showQuickAddMenu)}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {showQuickAddMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowQuickAddMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-sm">
                <button
                  onClick={() => {
                    onOpenQuickAdd('project');
                    setShowQuickAddMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2.5 text-slate-700"
                >
                  <FolderPlus className="w-4 h-4 text-blue-600" />
                  <span>New Project</span>
                </button>
                <button
                  onClick={() => {
                    onOpenQuickAdd('task');
                    setShowQuickAddMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2.5 text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>New Task</span>
                </button>
                <button
                  onClick={() => {
                    onOpenQuickAdd('photo');
                    setShowQuickAddMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2.5 text-slate-700"
                >
                  <Camera className="w-4 h-4 text-purple-600" />
                  <span>Upload Site Photo</span>
                </button>
                <button
                  onClick={() => {
                    onOpenQuickAdd('issue');
                    setShowQuickAddMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2.5 text-slate-700"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Report Issue</span>
                </button>
                <button
                  onClick={() => {
                    onOpenQuickAdd('changeOrder');
                    setShowQuickAddMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2.5 text-slate-700"
                >
                  <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                  <span>New Change Order</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 text-sm">Notifications</h4>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                    Mark all as read
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 hover:bg-slate-50 transition-colors flex items-start space-x-3 cursor-pointer ${
                        n.unread ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-600 shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed truncate">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setShowNotifications(false);
                    }}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    View all activity
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Role Switcher */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            <span>{userRole}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowRoleMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch User Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setShowRoleMenu(false);
                      if (r === 'Client') {
                        onNavigate('client-portal');
                      }
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between ${
                      userRole === r ? 'font-semibold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{r}</span>
                    {userRole === r && <CheckCircle2 className="w-3 h-3 text-blue-600" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Robald S. Wuisan"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="hidden lg:block text-left text-xs leading-tight">
              <div className="font-semibold text-slate-800">Robald S. Wuisan</div>
              <div className="text-slate-400">{userRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-sm">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900 text-xs">Robald S. Wuisan</p>
                  <p className="text-[11px] text-slate-400">robald@projeezy.com</p>
                </div>

                <button
                  onClick={() => {
                    onNavigate('client-portal');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2.5 text-slate-700 text-xs"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>Switch to Client Portal</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center space-x-2.5 text-slate-700 text-xs"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Profile & Settings</span>
                </button>

                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-2.5 text-xs font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
