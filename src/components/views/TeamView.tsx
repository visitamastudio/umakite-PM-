import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  HardHat,
  Briefcase,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import { TeamMember, ViewMode } from '../../types';

interface TeamViewProps {
  teamMembers: TeamMember[];
  onOpenAddMemberModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  teamMembers,
  onOpenAddMemberModal,
  onNavigate,
}) => {
  const [tabMode, setTabMode] = useState<'All' | 'Internal' | 'External'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = teamMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = tabMode === 'All' || m.type === tabMode;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Title & Add Member CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Team Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your team members, roles, contact information, and workload allocation
          </p>
        </div>

        <button
          onClick={onOpenAddMemberModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* 5 KPI Cards (matching Image 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Total Members</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">24</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs">
            <Briefcase className="w-4 h-4 text-purple-600" />
            <span className="font-semibold">Project Managers</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">3</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs">
            <HardHat className="w-4 h-4 text-amber-600" />
            <span className="font-semibold">Site Engineers</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">5</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Workers</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">12</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold">Subcontractors</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">4</div>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
          {(['All', 'Internal', 'External'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTabMode(t)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                tabMode === t ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              {t === 'All' ? 'All Members' : t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Team Table (matching Image 10) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Workload Capacity</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{member.name}</div>
                        <div className="text-[10px] text-slate-400">{member.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{member.role}</td>
                  <td className="py-3 px-4 text-slate-600">{member.project}</td>
                  <td className="py-3 px-4 w-44">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Allocation</span>
                        <span
                          className={`font-bold ${
                            member.workloadPercentage > 90
                              ? 'text-red-600'
                              : member.workloadPercentage > 75
                              ? 'text-amber-600'
                              : 'text-slate-700'
                          }`}
                        >
                          {member.workloadPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            member.workloadPercentage > 90
                              ? 'bg-red-500'
                              : member.workloadPercentage > 75
                              ? 'bg-amber-500'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${member.workloadPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{member.phone}</td>
                  <td className="py-3 px-4 text-blue-600 hover:underline">{member.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
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
