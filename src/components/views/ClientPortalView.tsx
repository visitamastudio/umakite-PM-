import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  Camera,
  FileCheck,
  Phone,
  Mail,
  Download,
  ThumbsUp,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { Project, SitePhoto, ChangeOrder, ViewMode } from '../../types';

interface ClientPortalViewProps {
  project: Project;
  photos: SitePhoto[];
  changeOrders: ChangeOrder[];
  onNavigate: (view: ViewMode) => void;
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  project,
  photos,
  changeOrders,
  onNavigate,
}) => {
  const [approvedCOs, setApprovedCOs] = useState<string[]>([]);

  const handleApproveCO = (id: string) => {
    setApprovedCOs((prev) => [...prev, id]);
    alert('Change Order digitally signed and approved! Contractor notified.');
  };

  const clientPayments = [
    { term: 'Term 1: Down Payment (30%)', amount: 855000000, date: '15 Jan 2025', status: 'Paid' },
    { term: 'Term 2: Foundation & Ground (20%)', amount: 570000000, date: '28 Feb 2025', status: 'Paid' },
    { term: 'Term 3: Structural Framework (25%)', amount: 712500000, date: '15 Apr 2025', status: 'Paid' },
    { term: 'Term 4: MEP & Finishing (20%)', amount: 570000000, date: '15 Jun 2025', status: 'Pending' },
    { term: 'Term 5: Handover Retention (5%)', amount: 142500000, date: '30 Jun 2025', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Client Welcome Banner (matching Image 18) */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
              Client Transparency Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              Welcome back, {project.clientName}!
            </h1>
            <p className="text-sm text-blue-200 mt-1 max-w-xl">
              Live status overview and approvals for <span className="font-semibold text-white">{project.name}</span> in {project.location}.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center space-x-3 text-xs">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-base text-white shrink-0">
              RS
            </div>
            <div>
              <div className="font-semibold text-white">Project Manager</div>
              <div className="text-blue-200">{project.projectManager}</div>
              <div className="flex items-center space-x-2 mt-1">
                <a href="tel:+6281234567890" className="text-white hover:underline flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <span>•</span>
                <a href="mailto:pm@projeezy.com" className="text-white hover:underline flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>Message</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Client KPI Cards (matching Image 18) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Overall Progress
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-1">{project.progress}%</div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1.5">
            Status: {project.status}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Contract Value
          </span>
          <div className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
            Rp {project.contractValue.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-slate-400">Fixed lump-sum agreement</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Milestones Completed
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">5 of 7</div>
          <span className="text-[10px] text-slate-500">Foundation & Structure done</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Target Handover
          </span>
          <div className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{project.endDate}</div>
          <span className="text-[10px] text-blue-600 font-medium">On schedule</span>
        </div>
      </div>

      {/* Two-Column Middle Section: Pending Sign-Off & Site Progress Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scope Sign-Offs / Change Orders (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">Approvals Pending Your Sign-Off</h3>
            </div>
            <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold">
              Action Needed
            </span>
          </div>

          <div className="space-y-3">
            {changeOrders
              .filter((co) => co.status === 'Pending' || approvedCOs.includes(co.id))
              .map((co) => {
                const isSigned = approvedCOs.includes(co.id);
                return (
                  <div
                    key={co.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-blue-600 font-bold">
                          {co.coNumber}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs mt-0.5">{co.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1">{co.description}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        +Rp {co.costImpact.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Schedule adjustment: +{co.scheduleImpactDays} days
                      </span>

                      {isSigned ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-600 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approved & Signed</span>
                        </span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleApproveCO(co.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                          >
                            Approve & Sign
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Column: Latest Verified Site Photos (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Verified Site Photos</h3>
              </div>
              <button
                onClick={() => onNavigate('site-photos')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View Gallery
              </button>
            </div>

            <div className="space-y-3">
              {photos.slice(0, 3).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => onNavigate('site-photos')}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-16 h-14 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 text-xs truncate">{photo.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {photo.phase} • {photo.date}
                    </p>
                    <div className="flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>QC Passed by {photo.uploadedBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            Next on-site inspection scheduled: <span className="font-semibold text-slate-800">25 May 2025</span>
          </div>
        </div>
      </div>

      {/* Payment Milestones & Invoices (matching Image 18) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Payment Schedule & Billing Terms</h3>
          </div>
          <span className="text-xs text-slate-400">Total Contract: Rp {project.contractValue.toLocaleString('id-ID')}</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {clientPayments.map((p, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-bold text-slate-900">{p.term}</div>
                <div className="text-[11px] text-slate-400">Target release: {p.date}</div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-mono font-bold text-slate-800">
                  Rp {p.amount.toLocaleString('id-ID')}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    p.status === 'Paid'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : p.status === 'Pending'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {p.status}
                </span>
                {p.status === 'Paid' && (
                  <button
                    onClick={() => alert(`Downloading official Tax Receipt for ${p.term}`)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Receipt
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
