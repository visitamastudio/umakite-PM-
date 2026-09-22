import React, { useState } from 'react';
import { Layers, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { ViewMode } from '../../types';

interface ScreenJumpBarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const ScreenJumpBar: React.FC<ScreenJumpBarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ViewMode; number: number; title: string; sheet: 'Sheet 1 (1-9)' | 'Sheet 2 (10-18)' }[] = [
    { id: 'login', number: 1, title: 'Login / Authentication', sheet: 'Sheet 1 (1-9)' },
    { id: 'dashboard', number: 2, title: 'Dashboard', sheet: 'Sheet 1 (1-9)' },
    { id: 'projects', number: 3, title: 'Projects List', sheet: 'Sheet 1 (1-9)' },
    { id: 'project-detail', number: 4, title: 'Project Detail / Overview', sheet: 'Sheet 1 (1-9)' },
    { id: 'schedule', number: 5, title: 'Schedule / Gantt', sheet: 'Sheet 1 (1-9)' },
    { id: 'tasks', number: 6, title: 'Tasks / Kanban', sheet: 'Sheet 1 (1-9)' },
    { id: 'budget', number: 7, title: 'Budget & RAB / BOQ', sheet: 'Sheet 1 (1-9)' },
    { id: 'materials', number: 8, title: 'Materials', sheet: 'Sheet 1 (1-9)' },
    { id: 'suppliers', number: 9, title: 'Suppliers', sheet: 'Sheet 1 (1-9)' },
    { id: 'team', number: 10, title: 'Team Directory', sheet: 'Sheet 2 (10-18)' },
    { id: 'site-monitoring', number: 11, title: 'Site Monitoring & Map', sheet: 'Sheet 2 (10-18)' },
    { id: 'site-photos', number: 12, title: 'Site Photos Gallery', sheet: 'Sheet 2 (10-18)' },
    { id: 'issues', number: 13, title: 'Issues Tracking', sheet: 'Sheet 2 (10-18)' },
    { id: 'change-orders', number: 14, title: 'Change Orders', sheet: 'Sheet 2 (10-18)' },
    { id: 'payments', number: 15, title: 'Payments / Finance', sheet: 'Sheet 2 (10-18)' },
    { id: 'documents', number: 16, title: 'Documents Management', sheet: 'Sheet 2 (10-18)' },
    { id: 'reports', number: 17, title: 'Reports & Analytics', sheet: 'Sheet 2 (10-18)' },
    { id: 'client-portal', number: 18, title: 'Client Portal', sheet: 'Sheet 2 (10-18)' },
  ];

  const currentScreen = screens.find((s) => s.id === currentView);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-slate-900 text-white hover:bg-slate-800 px-3.5 py-2 rounded-full shadow-xl border border-slate-700 text-xs font-medium cursor-pointer transition-all hover:scale-105"
        >
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>
            {currentScreen ? `Screen ${currentScreen.number}: ${currentScreen.title}` : 'All 18 Screens'}
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 opacity-70" /> : <ChevronUp className="w-3.5 h-3.5 opacity-70" />}
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 bottom-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 text-xs max-h-[75vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">18 Reference Screens</h4>
                  <p className="text-[11px] text-slate-500">Jump to any view from the uploaded specifications</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  18 / 18
                </span>
              </div>

              <div className="space-y-1">
                {screens.map((screen) => {
                  const isActive = currentView === screen.id;
                  return (
                    <button
                      key={screen.id}
                      onClick={() => {
                        onNavigate(screen.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {screen.number}
                        </span>
                        <span>{screen.title}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] text-slate-400 font-mono">{screen.sheet.split(' ')[0]}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
