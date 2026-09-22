import React, { useState } from 'react';
import {
  Search,
  Plus,
  Star,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Truck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Supplier, ViewMode } from '../../types';

interface SuppliersViewProps {
  suppliers: Supplier[];
  onOpenNewSupplierModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const SuppliersView: React.FC<SuppliersViewProps> = ({
  suppliers,
  onOpenNewSupplierModal,
  onNavigate,
}) => {
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = suppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery);
    const matchesCategory = categoryFilter === 'All Categories' || s.category.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5">
      {/* Header (matching Image 9) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Suppliers Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified material vendors, subcontractors, payment terms, and performance ratings
          </p>
        </div>

        <button
          onClick={onOpenNewSupplierModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </button>
      </div>

      {/* Filter Toolbar (matching Image 9) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Categories">All Categories</option>
            <option value="Steel">Steel</option>
            <option value="Cement">Cement</option>
            <option value="Building Material">Building Material</option>
            <option value="Sand">Sand & Aggregate</option>
            <option value="Board">Board & Ceiling</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Wood">Wood</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Suppliers Table (matching Image 9) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-3 w-10 text-center">#</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sup, idx) => (
                <tr key={sup.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{sup.name}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{sup.category}</td>
                  <td className="py-3 px-4 text-slate-700">{sup.contactPerson}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{sup.phone}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-800 text-[11px]">{sup.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {sup.status}
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

        {/* Footer Pagination (matching Image 9) */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">1-{filtered.length}</span> of{' '}
            <span className="font-semibold text-slate-700">12</span> suppliers
          </div>

          <div className="flex items-center space-x-1.5">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-300 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-semibold">1</button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-600">2</button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
