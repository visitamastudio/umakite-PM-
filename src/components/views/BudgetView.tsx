import React, { useState } from 'react';
import {
  DollarSign,
  Download,
  Plus,
  TrendingUp,
  PieChart as PieIcon,
  FileSpreadsheet,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { RABItem } from '../../types';

interface BudgetViewProps {
  rabItems: RABItem[];
  onOpenAddRABModal?: () => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  rabItems,
  onOpenAddRABModal,
}) => {
  const [subTab, setSubTab] = useState<'RAB' | 'BudgetVsActual' | 'CostBreakdown'>('RAB');

  const totalEst = rabItems.reduce((acc, curr) => acc + curr.estimatedCost, 0);
  const totalActual = rabItems.reduce((acc, curr) => acc + curr.actualCost, 0);
  const totalVariance = totalEst - totalActual;
  const overallProgress = 78;

  const costCategories = [
    { name: 'Struktur', percent: 38, color: '#3b82f6', amount: 720000000 },
    { name: 'MEP', percent: 27, color: '#10b981', amount: 232500000 },
    { name: 'Arsitektur / Finishing', percent: 18, color: '#f59e0b', amount: 540000000 },
    { name: 'Persiapan', percent: 8, color: '#8b5cf6', amount: 120000000 },
    { name: 'Lain-lain', percent: 9, color: '#ec4899', amount: 280000000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tabs (matching Image 7) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Villa Taman Ayu - Budget & RAB / BOQ
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Rencana Anggaran Biaya (RAB), Bill of Quantities, and real-time expense variance tracking
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert('Exporting RAB to Excel / PDF format...')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
          {onOpenAddRABModal && (
            <button
              onClick={onOpenAddRABModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Work Item</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex items-center bg-slate-100 p-1 rounded-xl w-fit text-xs font-semibold text-slate-600">
        <button
          onClick={() => setSubTab('RAB')}
          className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
            subTab === 'RAB' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          RAB / BOQ
        </button>
        <button
          onClick={() => setSubTab('BudgetVsActual')}
          className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
            subTab === 'BudgetVsActual' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          Budget vs Actual
        </button>
        <button
          onClick={() => setSubTab('CostBreakdown')}
          className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
            subTab === 'CostBreakdown' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          Cost Breakdown
        </button>
      </div>

      {/* 4 KPI Cards (matching Image 7) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total RAB
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Rp {totalEst.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-slate-400">Approved contract scope</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Actual Cost
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
            Rp {totalActual.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-blue-600 font-semibold">66.4% of total budget</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Variance (Remaining)
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
            Rp {totalVariance.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Favorable balance</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Progress
          </span>
          <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">
            {overallProgress}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Grid: RAB Table (7 cols) + Cost by Category Chart (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: RAB / BOQ Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">RAB / BOQ Summary</h3>
            <span className="text-xs text-slate-400">All prices in IDR (Rupiah)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-3 w-10 text-center">No</th>
                  <th className="py-3 px-4">Work Item</th>
                  <th className="py-3 px-4 text-right">Est (Rp)</th>
                  <th className="py-3 px-4 text-right">Actual (Rp)</th>
                  <th className="py-3 px-4 text-right">Variance (Rp)</th>
                  <th className="py-3 px-4 w-28 text-right">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rabItems.map((item) => (
                  <tr key={item.no} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 text-center text-slate-400 font-medium">{item.no}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{item.workItem}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-700">
                      {item.estimatedCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-700">
                      {item.actualCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-600 font-semibold">
                      {item.variance.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                        {item.progress}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/90 font-bold border-t-2 border-slate-200 text-slate-900">
                  <td colSpan={2} className="py-3.5 px-4">
                    Total
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    Rp {totalEst.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    Rp {totalActual.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-600">
                    Rp {totalVariance.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right">78%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right: Cost by Category (matching Image 7) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Cost by Category</h3>
              <span className="text-[11px] text-slate-400">Actual Spent</span>
            </div>

            {/* Donut graphic */}
            <div className="relative w-40 h-40 mx-auto my-3 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="91 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="64 238" strokeDashoffset="-91" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="43 238" strokeDashoffset="-155" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="19 238" strokeDashoffset="-198" />
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#ec4899" strokeWidth="12" strokeDasharray="21 238" strokeDashoffset="-217" />
              </svg>
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-base font-black text-slate-900 leading-tight">Rp 1.892M</span>
                <span className="text-[9px] text-slate-400">Total Actual</span>
              </div>
            </div>

            {/* Legend list */}
            <div className="space-y-2 mt-4 text-xs">
              {costCategories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-slate-600">{cat.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="text-slate-400 text-[10px]">
                      Rp {(cat.amount / 1000000).toFixed(0)}M
                    </span>
                    <span className="font-bold text-slate-800">{cat.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Variance remaining: 33.6%</span>
            <span className="text-emerald-600 font-semibold">Healthy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
