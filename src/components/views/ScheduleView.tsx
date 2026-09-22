import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { GanttPhase, Project } from '../../types';

interface ScheduleViewProps {
  phases: GanttPhase[];
  projects: Project[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onOpenNewTaskModal?: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  phases,
  projects,
  selectedProjectId,
  onSelectProject,
  onOpenNewTaskModal,
}) => {
  const [timeScale, setTimeScale] = useState<'Day' | 'Week' | 'Month'>('Month');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-1': true,
    'phase-2': true,
    'phase-3': true,
    'phase-4': true,
  });

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const months = ['Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025'];

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="space-y-5">
      {/* Top Controls Bar (matching Image 5) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedProject.id}
                onChange={(e) => onSelectProject(e.target.value)}
                className="text-base font-bold text-slate-900 bg-transparent border-none focus:ring-0 cursor-pointer pr-8 py-0"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-slate-500">
              Target completion: {selectedProject.endDate} (Progress: {selectedProject.progress}%)
            </p>
          </div>
        </div>

        {/* View Switcher: Today, Day, Week, Month */}
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
            Today
          </button>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
            {(['Day', 'Week', 'Month'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTimeScale(mode)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  timeScale === mode
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {onOpenNewTaskModal && (
            <button
              onClick={onOpenNewTaskModal}
              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Task</span>
            </button>
          )}
        </div>
      </div>

      {/* Gantt Chart Container (matching Image 5) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[840px]">
            {/* Table Header: Task Column & Month Timeline */}
            <div className="grid grid-cols-12 bg-slate-50/90 border-b border-slate-200 text-xs font-semibold text-slate-600">
              <div className="col-span-4 p-3.5 border-r border-slate-200 flex items-center justify-between">
                <span>Tasks & WBS Breakdown</span>
                <span className="text-[10px] text-slate-400 font-mono">Status / Assignee</span>
              </div>
              <div className="col-span-8 grid grid-cols-6 text-center text-[11px] font-bold py-3.5">
                {months.map((m) => (
                  <div key={m} className="border-r border-slate-200/60 last:border-r-0">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Gantt Body with Phases */}
            <div className="divide-y divide-slate-100 text-xs">
              {phases.map((phase) => {
                const isExpanded = expandedPhases[phase.id];
                return (
                  <div key={phase.id} className="group">
                    {/* Phase Header Row */}
                    <div className="grid grid-cols-12 bg-slate-50/50 hover:bg-slate-100/60 transition-colors border-y border-slate-200/40">
                      <div
                        onClick={() => togglePhase(phase.id)}
                        className="col-span-4 p-2.5 px-4 font-bold text-slate-900 border-r border-slate-200 flex items-center space-x-2 cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            isExpanded ? '' : '-rotate-90'
                          }`}
                        />
                        <span>{phase.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({phase.tasks.length} tasks)
                        </span>
                      </div>
                      <div className="col-span-8 grid grid-cols-6 relative">
                        {months.map((m) => (
                          <div key={m} className="border-r border-slate-100 last:border-r-0 h-full" />
                        ))}
                      </div>
                    </div>

                    {/* Sub-tasks Rows */}
                    {isExpanded &&
                      phase.tasks.map((task) => {
                        // Calculate Gantt bar left and width percentages
                        // 6 months total = 100% (each month ~16.66%)
                        const leftPercent = (task.startMonth / 6) * 100;
                        const widthPercent = Math.max((task.durationMonths / 6) * 100, 4);

                        return (
                          <div
                            key={task.id}
                            className="grid grid-cols-12 hover:bg-blue-50/30 transition-colors border-b border-slate-100 last:border-b-0"
                          >
                            {/* Task name & assignee */}
                            <div className="col-span-4 py-2.5 px-4 pl-10 border-r border-slate-200 flex items-center justify-between">
                              <div className="truncate pr-2">
                                <span className="font-medium text-slate-800">{task.name}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                                {task.assignee}
                              </span>
                            </div>

                            {/* Timeline Bar Row */}
                            <div className="col-span-8 grid grid-cols-6 relative py-2 items-center">
                              {/* Background column guides */}
                              {months.map((m) => (
                                <div
                                  key={m}
                                  className="border-r border-slate-100 last:border-r-0 h-full absolute top-0 bottom-0"
                                  style={{
                                    left: `${(months.indexOf(m) / 6) * 100}%`,
                                    width: `${100 / 6}%`,
                                  }}
                                />
                              ))}

                              {/* Interactive Progress Bar */}
                              <div
                                className="relative z-10 h-6 rounded-md text-[10px] font-bold text-white flex items-center px-2 shadow-xs transition-all hover:brightness-110 cursor-pointer overflow-hidden group/bar"
                                style={{
                                  left: `${leftPercent}%`,
                                  width: `${widthPercent}%`,
                                  backgroundColor: task.color,
                                }}
                                title={`${task.name}: ${task.progress}% (${task.status})`}
                              >
                                {/* Progress fill inside bar */}
                                <div
                                  className="absolute left-0 top-0 bottom-0 bg-black/15"
                                  style={{ width: `${task.progress}%` }}
                                />
                                <span className="relative z-10 truncate">{task.progress}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-slate-700">Legend:</span>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#3b82f6]"></span>
              <span>Preparation</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#10b981]"></span>
              <span>Foundation</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#f59e0b]"></span>
              <span>Structure</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#8b5cf6]"></span>
              <span>Finishing</span>
            </div>
          </div>

          <div>Milestone marker: ♦ Complete before next critical dependency</div>
        </div>
      </div>
    </div>
  );
};
