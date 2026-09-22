import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  User,
} from 'lucide-react';
import { Issue, Project, ViewMode } from '../../types';

interface IssuesViewProps {
  issues: Issue[];
  projects: Project[];
  onOpenReportIssueModal: () => void;
  onUpdateIssueStatus: (issueId: string, status: Issue['status']) => void;
  onNavigate: (view: ViewMode) => void;
}

export const IssuesView: React.FC<IssuesViewProps> = ({
  issues,
  projects,
  onOpenReportIssueModal,
  onUpdateIssueStatus,
  onNavigate,
}) => {
  const [tabFilter, setTabFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [searchQuery, setSearchQuery] = useState('');

  const openCount = issues.filter((i) => i.status === 'Open').length;
  const inProgressCount = issues.filter((i) => i.status === 'In Progress').length;
  const resolvedCount = issues.filter((i) => i.status === 'Resolved').length;

  const filtered = issues.filter((issue) => {
    const matchesTab = tabFilter === 'All' || issue.status === tabFilter;
    const matchesPriority = priorityFilter === 'All Priorities' || issue.priority === priorityFilter;
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesPriority && matchesSearch;
  });

  const getPriorityBadge = (priority: Issue['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low':
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: Issue['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Closed':
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (matching Image 13) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Issues & Defects</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track, assign and resolve site defects, safety infractions, and design discrepancies
          </p>
        </div>

        <button
          onClick={onOpenReportIssueModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* 4 KPI Cards (matching Image 13) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Issues
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">18</div>
          <span className="text-[10px] text-slate-400">All registered project logs</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Open
          </span>
          <div className="text-2xl font-bold text-red-600 mt-1">{openCount}</div>
          <span className="text-[10px] text-red-500 font-medium">Requires immediate response</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            In Progress
          </span>
          <div className="text-2xl font-bold text-blue-600 mt-1">{inProgressCount}</div>
          <span className="text-[10px] text-blue-600 font-medium">Under rectification</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Resolved
          </span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{resolvedCount}</div>
          <span className="text-[10px] text-emerald-600 font-medium">Verified by QA/QC</span>
        </div>
      </div>

      {/* Filter Toolbar (matching Image 13) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
            {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTabFilter(t)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  tabFilter === t ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {t === 'All' ? 'All Issues' : t}
              </button>
            ))}
          </div>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Priorities">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Issues Table (matching Image 13) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-3 w-10 text-center">#</th>
                <th className="py-3.5 px-4">Issue & Description</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assignee</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((issue, idx) => (
                <tr key={issue.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="font-bold text-slate-900 leading-snug">{issue.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {issue.description}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{issue.projectName}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={issue.assignee.avatar}
                        alt={issue.assignee.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-slate-700">{issue.assignee.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{issue.dueDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    {issue.status !== 'Resolved' && (
                      <button
                        onClick={() => onUpdateIssueStatus(issue.id, 'Resolved')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors mr-2 cursor-pointer"
                      >
                        Resolve
                      </button>
                    )}
                    <button className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
