import React, { useState } from 'react';
import {
  FileEdit,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  DollarSign,
  Calendar,
  MoreVertical,
} from 'lucide-react';
import { ChangeOrder, Project, ViewMode } from '../../types';

interface ChangeOrdersViewProps {
  changeOrders: ChangeOrder[];
  projects: Project[];
  onOpenNewChangeOrderModal: () => void;
  onApproveChangeOrder: (id: string) => void;
  onRejectChangeOrder: (id: string) => void;
  onNavigate: (view: ViewMode) => void;
}

export const ChangeOrdersView: React.FC<ChangeOrdersViewProps> = ({
  changeOrders,
  projects,
  onOpenNewChangeOrderModal,
  onApproveChangeOrder,
  onRejectChangeOrder,
  onNavigate,
}) => {
  const [tabFilter, setTabFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const approved = changeOrders.filter((c) => c.status === 'Approved');
  const pending = changeOrders.filter((c) => c.status === 'Pending');
  const rejected = changeOrders.filter((c) => c.status === 'Rejected');

  const filtered = changeOrders.filter((co) => {
    const matchesTab = tabFilter === 'All' || co.status === tabFilter;
    const matchesSearch =
      co.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      co.coNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      co.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: ChangeOrder['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (matching Image 14) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Change Orders</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage scope modifications, cost adjustments, schedule impacts, and client approval chains
          </p>
        </div>

        <button
          onClick={onOpenNewChangeOrderModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Change Order</span>
        </button>
      </div>

      {/* 4 KPI Cards (matching Image 14) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Orders
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">7</div>
          <span className="text-[10px] text-slate-400">All submitted scopes</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Approved
          </span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">4</div>
          <span className="text-[10px] text-emerald-600 font-semibold">+Rp 84.500.000 approved</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Pending Review
          </span>
          <div className="text-2xl font-bold text-amber-600 mt-1">2</div>
          <span className="text-[10px] text-amber-600 font-semibold">+Rp 32.000.000 pending</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Rejected
          </span>
          <div className="text-2xl font-bold text-slate-400 mt-1">1</div>
          <span className="text-[10px] text-slate-400">Rp 15.000.000 declined</span>
        </div>
      </div>

      {/* Filter Toolbar (matching Image 14) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTabFilter(t)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                tabFilter === t ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              {t === 'All' ? 'All Orders' : t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search change orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Change Orders Table (matching Image 14) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">CO #</th>
                <th className="py-3.5 px-4">Title & Scope Modification</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4 text-right">Cost Impact</th>
                <th className="py-3.5 px-4 text-center">Schedule</th>
                <th className="py-3.5 px-4">Requested By</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((co) => (
                <tr key={co.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{co.coNumber}</td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-slate-900 leading-snug">{co.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{co.description}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{co.projectName}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                    +Rp {co.costImpact.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {co.scheduleImpactDays > 0 ? `+${co.scheduleImpactDays}d` : '0d'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{co.requestedBy}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{co.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(co.status)}`}>
                      {co.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {co.status === 'Pending' ? (
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => onApproveChangeOrder(co.id)}
                          className="px-2 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onRejectChangeOrder(co.id)}
                          className="px-2 py-1 text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-md border border-red-200 transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded-md">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
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
