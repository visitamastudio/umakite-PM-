import React, { useState } from 'react';
import {
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  CheckSquare,
  ArrowRight,
  MoveHorizontal,
} from 'lucide-react';
import { Task, ViewMode } from '../../types';

interface TasksViewProps {
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  onOpenNewTaskModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onUpdateTaskStatus,
  onOpenNewTaskModal,
  onNavigate,
}) => {
  const [filterMode, setFilterMode] = useState<'All' | 'My' | 'Overdue'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const todoTasks = tasks.filter((t) => t.status === 'To Do');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const doneTasks = tasks.filter((t) => t.status === 'Done');

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const renderTaskCard = (task: Task) => {
    return (
      <div
        key={task.id}
        className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all space-y-3 group"
      >
        <div className="flex items-start justify-between">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
              task.priority
            )}`}
          >
            {task.priority}
          </span>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {task.status !== 'To Do' && (
              <button
                onClick={() => onUpdateTaskStatus(task.id, task.status === 'Done' ? 'In Progress' : 'To Do')}
                title="Move left"
                className="p-1 hover:bg-slate-100 rounded text-slate-500 text-[10px] cursor-pointer"
              >
                ←
              </button>
            )}
            {task.status !== 'Done' && (
              <button
                onClick={() => onUpdateTaskStatus(task.id, task.status === 'To Do' ? 'In Progress' : 'Done')}
                title="Move right"
                className="p-1 hover:bg-slate-100 rounded text-slate-500 text-[10px] cursor-pointer"
              >
                →
              </button>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-xs leading-snug">{task.title}</h4>
          {task.description && (
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        {/* Checklist count if exists */}
        {task.checklist && task.checklist.length > 0 && (
          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-medium">
            <CheckSquare className="w-3 h-3 text-slate-400" />
            <span>
              {task.checklist.filter((c) => c.completed).length}/{task.checklist.length} checklist
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{task.dueDate}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              title={`${task.assignee.name} (${task.assignee.role})`}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Header & Sub-Navigation Tabs (matching Image 6) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Villa Taman Ayu - Tasks</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kanban workflow boards with priority, checklist, and assignee tracking
          </p>
        </div>

        {/* Filter Pills & CTA Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
            {(['All', 'My', 'Overdue'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === mode
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                {mode === 'All' ? 'All Tasks' : mode === 'My' ? 'My Tasks' : 'Overdue'}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenNewTaskModal}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns (matching Image 6: To Do, In Progress, Done) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: To Do */}
        <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/80 flex flex-col min-h-[520px]">
          <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">To Do</h3>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {todoTasks.length}
              </span>
            </div>
            <button
              onClick={onOpenNewTaskModal}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {todoTasks.map((t) => renderTaskCard(t))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100 flex flex-col min-h-[520px]">
          <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
              <h3 className="font-bold text-blue-900 text-xs uppercase tracking-wider">In Progress</h3>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {inProgressTasks.length}
              </span>
            </div>
            <button
              onClick={onOpenNewTaskModal}
              className="p-1 text-blue-400 hover:text-blue-700 rounded-md"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {inProgressTasks.map((t) => renderTaskCard(t))}
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100 flex flex-col min-h-[520px]">
          <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-emerald-100">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <h3 className="font-bold text-emerald-900 text-xs uppercase tracking-wider">Done</h3>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {doneTasks.length}
              </span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {doneTasks.map((t) => renderTaskCard(t))}
          </div>
        </div>
      </div>
    </div>
  );
};
