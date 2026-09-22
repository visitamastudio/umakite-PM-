import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Folder,
  Download,
  Eye,
  Search,
  Layers,
  FileCheck,
  FileCode,
} from 'lucide-react';
import { ProjectDocument, Project, ViewMode } from '../../types';

interface DocumentsViewProps {
  documents: ProjectDocument[];
  projects: Project[];
  onOpenUploadModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  projects,
  onOpenUploadModal,
  onNavigate,
}) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = documents.filter((doc) => {
    const matchesCategory =
      categoryFilter === 'All' || doc.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'dwg':
        return <FileCode className="w-5 h-5 text-indigo-600" />;
      case 'xlsx':
        return <FileCheck className="w-5 h-5 text-emerald-600" />;
      default:
        return <FileText className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (matching Image 16) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Project Documents</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Architectural drawings (DWG/BIM), contract agreements, building permits (PBG/IMB), and specifications
          </p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* 4 Category Quick Folders (matching Image 16) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setCategoryFilter('Drawing')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-105 transition-transform">
            <Folder className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Drawings & Blueprints</h4>
          <p className="text-xs text-slate-400 mt-0.5">24 CAD & BIM files</p>
        </div>

        <div
          onClick={() => setCategoryFilter('Contract')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-400 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Contracts & Legal</h4>
          <p className="text-xs text-slate-400 mt-0.5">8 legal PDFs</p>
        </div>

        <div
          onClick={() => setCategoryFilter('RAB')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-105 transition-transform">
            <FileCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">RAB & BOQ Costing</h4>
          <p className="text-xs text-slate-400 mt-0.5">6 budget spreadsheets</p>
        </div>

        <div
          onClick={() => setCategoryFilter('Report')}
          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-3 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Site Reports & Specs</h4>
          <p className="text-xs text-slate-400 mt-0.5">15 weekly QA reports</p>
        </div>
      </div>

      {/* Filter Toolbar (matching Image 16) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
          {(['All', 'Drawing', 'Contract', 'RAB', 'Report'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                categoryFilter === cat ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All Documents' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Documents Table (matching Image 16) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Document Name</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Version</th>
                <th className="py-3.5 px-4">Size</th>
                <th className="py-3.5 px-4">Modified By</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                        {getFileIcon(doc.fileType)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer">
                          {doc.name}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">
                          {doc.fileType} format
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{doc.project}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{doc.version}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{doc.size}</td>
                  <td className="py-3.5 px-4 text-slate-700">{doc.modifiedBy}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{doc.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => alert(`Opening preview for ${doc.name}`)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Downloading ${doc.name}`)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-100"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
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
