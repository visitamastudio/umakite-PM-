import React, { useState } from 'react';
import {
  Building2,
  Shield,
  Bell,
  Sliders,
  DollarSign,
  Save,
  Check,
  Globe,
  Key,
  FileSpreadsheet,
} from 'lucide-react';
import { NumberInput } from '../common/NumberInput';
import { GoogleSheetsIntegration } from './GoogleSheetsIntegration';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'roles' | 'notifications' | 'finance' | 'sheets'>('sheets');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Organization & Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure enterprise company profile, regional currencies, team roles, and safety alerts
        </p>
      </div>

      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('company')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'company'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Company Profile
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'finance'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Finance & Currency
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'roles'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Roles & Permissions
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'notifications'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('sheets')}
          className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'sheets'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Integrasi 4 Google Sheets</span>
          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
            Baru
          </span>
        </button>
      </div>

      {activeTab === 'sheets' && <GoogleSheetsIntegration />}

      {activeTab === 'company' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company / Entity Name</label>
              <input
                type="text"
                defaultValue="PT. Bangun Nusa Mandiri (Projeezy Construction)"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contractor License (SBU / SIUJK)</label>
              <input
                type="text"
                defaultValue="01-5271-09-0021-992 (Kualifikasi Besar)"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Head Office Address</label>
              <input
                type="text"
                defaultValue="Jl. Pejanggik No. 88, Mataram, Nusa Tenggara Barat"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tax ID (NPWP)</label>
              <input
                type="text"
                defaultValue="01.234.567.8-901.000"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-slate-400">All changes propagate to generated invoices & reports</span>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Saved Successfully' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Default Base Currency</label>
              <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900">
                <option value="IDR">IDR (Indonesian Rupiah - Rp)</option>
                <option value="USD">USD (United States Dollar - $)</option>
                <option value="AUD">AUD (Australian Dollar - A$)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Value Added Tax (PPN %)</label>
              <NumberInput
                defaultValue={11}
                allowDecimal
                suffix={<span className="text-slate-400 font-semibold">%</span>}
                className="font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Standard Retention Rate (%)</label>
              <NumberInput
                defaultValue={5}
                allowDecimal
                suffix={<span className="text-slate-400 font-semibold">%</span>}
                className="font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Default Payment Terms</label>
              <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900">
                <option>Net 14 Days</option>
                <option>Net 30 Days</option>
                <option>Immediate / Cash on Delivery</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Financial Settings</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Role-Based Access Control (RBAC)</h3>
          <div className="space-y-3">
            {[
              { role: 'Project Manager (PM)', desc: 'Full authority on schedule, budgets, task assignments, contractor reviews' },
              { role: 'Site Engineer (Pelaksana)', desc: 'Site monitoring, daily progress logs, photos upload, defect tagging' },
              { role: 'Quantity Surveyor (QS)', desc: 'RAB / BOQ modification, material take-off, cost variance approvals' },
              { role: 'Client (Owner)', desc: 'Read-only progress S-curve, billing invoice inspection, change order approvals' },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{r.role}</div>
                  <div className="text-slate-500 text-[11px]">{r.desc}</div>
                </div>
                <span className="text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full text-[10px]">
                  Configured
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Automated Event Alerts</h3>
          <div className="space-y-3">
            {[
              { title: 'Material Low-Stock Warning', desc: 'Notify warehouse manager when inventory dips below 15% threshold' },
              { title: 'Critical Site Defect Reported', desc: 'Immediate notification to Site Engineer and Project Manager' },
              { title: 'Change Order Approval Request', desc: 'Email and portal prompt to Client for scope adjustments' },
              { title: 'Milestone Inspection Ready', desc: 'Trigger QC sign-off checklist when phase hits 100%' },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900">{n.title}</div>
                  <div className="text-slate-500 text-[11px]">{n.desc}</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
