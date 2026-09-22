import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import { Project, ViewMode } from '../../types';

interface ReportsViewProps {
  projects: Project[];
  onNavigate: (view: ViewMode) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  projects,
  onNavigate,
}) => {
  const [selectedRange, setSelectedRange] = useState('Jan 01 - Jun 30, 2025');

  const sCurveData = [
    { month: 'Jan', planned: 10, actual: 12 },
    { month: 'Feb', planned: 25, actual: 28 },
    { month: 'Mar', planned: 45, actual: 44 },
    { month: 'Apr', planned: 65, actual: 68 },
    { month: 'May', planned: 82, actual: 78 },
    { month: 'Jun', planned: 100, actual: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header (matching Image 17) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            S-Curve progress analytics, Earned Value Analysis (SPI / CPI), financial health, and executive reporting
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedRange}</span>
          </div>

          <button
            onClick={() => alert('Generating formal PDF Executive Report with S-Curve & EVM charts...')}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* 4 Top KPI Cards (matching Image 17) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Revenue
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Rp 5.250.000.000
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">+12% vs prior quarter</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Profit Margin
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">18.4%</div>
          <span className="text-[10px] text-emerald-600 font-medium">Above 15% threshold target</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            On-Time Delivery
          </span>
          <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">91.2%</div>
          <span className="text-[10px] text-slate-400">SPI average: 1.04</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            HSE Safety Record
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">100%</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Zero lost-time injuries</span>
        </div>
      </div>

      {/* Progress S-Curve Visual Widget (matching Image 17) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Progress S-Curve (Kurva S)</h3>
            <p className="text-xs text-slate-400">Cumulative Planned vs. Actual Physical Progress (%)</p>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-1 bg-slate-300 rounded-sm"></div>
              <span className="text-slate-500">Planned Progress</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-1 bg-blue-600 rounded-sm"></div>
              <span className="font-semibold text-blue-600">Actual Progress</span>
            </div>
          </div>
        </div>

        {/* Custom SVG S-Curve Chart */}
        <div className="relative h-64 w-full">
          <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
            {/* Grid horizontal lines */}
            <line x1="40" y1="20" x2="680" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="40" y1="70" x2="680" y2="70" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="40" y1="120" x2="680" y2="120" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="40" y1="170" x2="680" y2="170" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="40" y1="210" x2="680" y2="210" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Y axis labels */}
            <text x="10" y="25" fill="#94a3b8" fontSize="10">100%</text>
            <text x="15" y="75" fill="#94a3b8" fontSize="10">75%</text>
            <text x="15" y="125" fill="#94a3b8" fontSize="10">50%</text>
            <text x="15" y="175" fill="#94a3b8" fontSize="10">25%</text>
            <text x="20" y="215" fill="#94a3b8" fontSize="10">0%</text>

            {/* Planned S-Curve Path (dashed) */}
            <path
              d="M 60 210 Q 200 180 300 120 T 540 50 T 660 20"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Actual S-Curve Path (Solid Blue) */}
            <path
              d="M 60 210 Q 190 170 300 115 T 540 60"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3.5"
            />

            {/* Milestone Points */}
            <circle cx="60" cy="210" r="4" fill="#2563eb" />
            <circle cx="180" cy="180" r="4" fill="#2563eb" />
            <circle cx="300" cy="115" r="4" fill="#2563eb" />
            <circle cx="420" cy="85" r="4" fill="#2563eb" />
            <circle cx="540" cy="60" r="5" fill="#2563eb" className="animate-pulse" />
          </svg>

          {/* Month labels along X axis */}
          <div className="flex justify-between pl-10 pr-6 text-xs text-slate-500 font-medium mt-1">
            <span>Jan 2025</span>
            <span>Feb 2025</span>
            <span>Mar 2025</span>
            <span>Apr 2025</span>
            <span>May 2025 (Current)</span>
            <span>Jun 2025</span>
          </div>
        </div>
      </div>

      {/* Earned Value & Project Health Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Portfolio EVM Performance Indicators</h3>
          <span className="text-xs text-slate-400">SPI &gt; 1.0 = Ahead of schedule | CPI &gt; 1.0 = Under budget</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4 text-right">Contract Value</th>
                <th className="py-3.5 px-4 text-right">Actual Cost</th>
                <th className="py-3.5 px-4 text-center">SPI</th>
                <th className="py-3.5 px-4 text-center">CPI</th>
                <th className="py-3.5 px-4">Schedule Status</th>
                <th className="py-3.5 px-4 text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-700">
                    Rp {p.contractValue.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-700">
                    Rp {p.actualCost.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-600">
                    {p.status === 'On Track' ? '1.05' : p.status === 'At Risk' ? '0.94' : '0.82'}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-600">
                    {p.status === 'On Track' ? '1.02' : '0.96'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'On Track'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.status === 'At Risk'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Exporting comprehensive progress report for ${p.name}`)}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Export PDF
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
