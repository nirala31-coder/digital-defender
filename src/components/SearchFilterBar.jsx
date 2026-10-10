import React from 'react';
import { Search, Filter, Plus, RefreshCw, X } from 'lucide-react';

export const SearchFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  selectedRisk,
  setSelectedRisk,
  onResetFilters,
  onOpenNewModal
}) => {
  const hasActiveFilters = searchQuery || selectedStatus !== 'ALL' || selectedType !== 'ALL' || selectedRisk !== 'ALL';

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl shadow-lg mb-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Tactical Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Document ID, Traveler Name, Passport No..."
            className="w-full pl-9 pr-8 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
            aria-label="Search verification history"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters & Control Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Segmented Buttons */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 text-[11px] font-mono">
            {['ALL', 'VERIFIED', 'REVIEW', 'HIGH RISK'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1.5 rounded-md font-semibold transition-all ${
                  selectedStatus === status
                    ? status === 'VERIFIED'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : status === 'REVIEW'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : status === 'HIGH RISK'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {status === 'ALL' ? 'ALL STATUS' : status}
              </button>
            ))}
          </div>

          {/* Doc Type Selector */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] font-mono text-zinc-300 px-3 py-1.5 focus:outline-none focus:border-zinc-700"
            aria-label="Filter by Document Type"
          >
            <option value="ALL">ALL DOC TYPES</option>
            <option value="Passport">PASSPORT</option>
            <option value="Visa">VISA</option>
            <option value="National ID">NATIONAL ID</option>
            <option value="Travel Permit">TRAVEL PERMIT</option>
          </select>

          {/* Risk Selector */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] font-mono text-zinc-300 px-3 py-1.5 focus:outline-none focus:border-zinc-700"
            aria-label="Filter by Risk Level"
          >
            <option value="ALL">ALL RISK LEVELS</option>
            <option value="LOW">LOW RISK (&lt;30)</option>
            <option value="MEDIUM">MEDIUM RISK (30-70)</option>
            <option value="HIGH">HIGH RISK (&gt;70)</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-[11px] text-zinc-400 hover:text-rose-400 flex items-center gap-1 px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800 font-mono transition-colors"
              title="Reset all filters"
            >
              <RefreshCw className="w-3 h-3" />
              RESET
            </button>
          )}

          {/* Add New Screening Button */}
          <button
            onClick={onOpenNewModal}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow border border-emerald-600 transition-colors ml-auto lg:ml-0 font-sans uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>New Screening</span>
          </button>

        </div>

      </div>
    </div>
  );
};
