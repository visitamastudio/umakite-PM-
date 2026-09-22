import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
} from 'lucide-react';
import { PaymentRecord, ViewMode } from '../../types';

interface PaymentsViewProps {
  payments: PaymentRecord[];
  onOpenNewInvoiceModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  payments,
  onOpenNewInvoiceModal,
  onNavigate,
}) => {
  const [tabFilter, setTabFilter] = useState<'All' | 'Client' | 'Vendor'>('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const totalBilled = 2150000000;
  const totalReceived = 1850000000;
  const totalPending = 300000000;
  const totalOverdue = 0;

  const filtered = payments.filter((p) => {
    const matchesTab = tabFilter === 'All' || p.type === tabFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesSearch =
      p.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.party.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: PaymentRecord['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Overdue':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (matching Image 15) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Payments & Invoices</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor billing milestones, term payments, subcontractor payouts, and cash liquidity
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenNewInvoiceModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards (matching Image 15) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Billed
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Rp {totalBilled.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-slate-400">All milestone invoices issued</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Received
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
            Rp {totalReceived.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">86% collected</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Pending Collection
          </span>
          <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
            Rp {totalPending.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-amber-600 font-medium">Due in next 14 days</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Overdue
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-700 mt-1">
            Rp {totalOverdue.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Clean credit status</span>
        </div>
      </div>

      {/* Filter Toolbar (matching Image 15) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
            {(['All', 'Client', 'Vendor'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTabFilter(t)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  tabFilter === t ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {t === 'All' ? 'All Invoices' : t === 'Client' ? 'Client Invoices' : 'Vendor Payouts'}
              </button>
            ))}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Payments Table (matching Image 15) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Project & Term Description</th>
                <th className="py-3.5 px-4">Party</th>
                <th className="py-3.5 px-4 text-right">Amount (Rp)</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Paid Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Receipt / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                    {item.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.projectName}</div>
                    <div className="text-[11px] text-slate-500">{item.termDescription}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{item.party}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    Rp {item.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{item.dueDate}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{item.paidDate || '—'}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading official Tax Invoice & Receipt for ${item.invoiceNumber}`)}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
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
