import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Package,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  Truck,
} from 'lucide-react';
import { Material, ViewMode } from '../../types';

interface MaterialsViewProps {
  materials: Material[];
  onOpenNewMaterialModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  materials,
  onOpenNewMaterialModal,
  onNavigate,
}) => {
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = materials.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || m.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Status' || m.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: Material['status']) => {
    switch (status) {
      case 'Available':
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Low Stock':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Out of Stock':
        return 'bg-red-50 text-red-700 border border-red-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* Header (matching Image 8) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Villa Taman Ayu - Materials
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Material inventory, site deliveries, consumption and stock thresholds
          </p>
        </div>

        <button
          onClick={onOpenNewMaterialModal}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Material</span>
        </button>
      </div>

      {/* Filter Toolbar (matching Image 8) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Categories">All Categories</option>
            <option value="Steel">Steel</option>
            <option value="Building Material">Building Material</option>
            <option value="Cement">Cement</option>
            <option value="Sand">Sand</option>
            <option value="Aggregate">Aggregate</option>
            <option value="Wood">Wood</option>
            <option value="Board">Board</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Status">All Status</option>
            <option value="Available">Available</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Materials Table (matching Image 8) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-3 w-10 text-center">#</th>
                <th className="py-3.5 px-4">Material</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Quantity</th>
                <th className="py-3.5 px-4">Unit</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3 px-4 text-slate-500">{item.category}</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800">
                    {item.quantity.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{item.unit}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onNavigate('suppliers')}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.supplier}
                    </button>
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
