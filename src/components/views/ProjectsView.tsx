import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Project, ViewMode } from '../../types';

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenNewProjectModal: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject,
  onNavigate,
  onOpenNewProjectModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [sortBy, setSortBy] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || p.status === statusFilter;
    const matchesType = typeFilter === 'All Types' || p.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Progress') return b.progress - a.progress;
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    return 0; // Default latest
  });

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'On Track':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'At Risk':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Delayed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Controls (matching Image 3) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer"
          >
            <option value="All Status">All Status</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Delayed">Delayed</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer"
          >
            <option value="All Types">All Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Education">Education</option>
            <option value="Industrial">Industrial</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Hospitality">Hospitality</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer"
          >
            <option value="Latest">Sort by: Latest</option>
            <option value="Progress">Sort by: Progress</option>
            <option value="Name">Sort by: Name</option>
          </select>

          {/* New Project CTA */}
          <button
            onClick={onOpenNewProjectModal}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Project Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 w-44">Progress</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Start Date</th>
                <th className="py-3.5 px-4">End Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No projects found matching the selected filters.
                  </td>
                </tr>
              ) : (
                sorted.map((proj, idx) => (
                  <tr
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj.id);
                      onNavigate('project-detail');
                    }}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 text-center font-medium text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={proj.coverImage}
                          alt={proj.name}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {proj.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{proj.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{proj.type}</td>
                    <td className="py-3 px-4 text-slate-500">{proj.location}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              proj.progress >= 70
                                ? 'bg-blue-600'
                                : proj.progress >= 40
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700 w-8 text-right text-[11px]">
                          {proj.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          proj.status
                        )}`}
                      >
                        {proj.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{proj.startDate}</td>
                    <td className="py-3 px-4 text-slate-600">{proj.endDate}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(proj.id);
                          onNavigate('project-detail');
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination (matching Image 3) */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">1-{sorted.length}</span> of{' '}
            <span className="font-semibold text-slate-700">27</span> projects
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              disabled
              className="p-1.5 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-semibold">1</button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600">2</button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600">3</button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
