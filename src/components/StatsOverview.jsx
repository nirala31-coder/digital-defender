import React from 'react';
import { ShieldCheck, ShieldAlert, Clock, Database, FileCheck } from 'lucide-react';

export const StatsOverview = ({ records }) => {
  const total = records.length;
  const verified = records.filter(r => r.status === 'VERIFIED').length;
  const review = records.filter(r => r.status === 'REVIEW').length;
  const highRisk = records.filter(r => r.status === 'HIGH RISK').length;
  const blockchainRecorded = records.filter(r => r.blockchain?.recorded).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
      
      {/* Total Screenings */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Total Screenings
          </span>
          <FileCheck className="w-4 h-4 text-blue-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-white tracking-tight">{total}</span>
          <span className="text-[11px] font-mono text-zinc-500">Screening Log</span>
        </div>
        <div className="w-full bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${total > 0 ? 100 : 0}%` }}></div>
        </div>
      </div>

      {/* Verified Genuine */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Verified Genuine
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-emerald-400 tracking-tight">{verified}</span>
          <span className="text-[11px] font-mono text-emerald-500 font-semibold">
            {total > 0 ? Math.round((verified / total) * 100) : 0}% Clear
          </span>
        </div>
        <div className="w-full bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${total > 0 ? (verified / total) * 100 : 0}%` }}></div>
        </div>
      </div>

      {/* Under Review */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Under Investigation
          </span>
          <Clock className="w-4 h-4 text-amber-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-amber-400 tracking-tight">{review}</span>
          <span className="text-[11px] font-mono text-amber-500 font-semibold">Pending Officer</span>
        </div>
        <div className="w-full bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${total > 0 ? (review / total) * 100 : 0}%` }}></div>
        </div>
      </div>

      {/* High Risk / Flagged */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            High Risk / Flagged
          </span>
          <ShieldAlert className="w-4 h-4 text-rose-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-rose-400 tracking-tight">{highRisk}</span>
          <span className="text-[11px] font-mono text-rose-500 font-semibold">Forged / Tampered</span>
        </div>
        <div className="w-full bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
          <div className="bg-rose-500 h-full rounded-full" style={{ width: `${total > 0 ? (highRisk / total) * 100 : 0}%` }}></div>
        </div>
      </div>

      {/* Blockchain Ledger Audit */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-lg relative overflow-hidden group hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Blockchain Audit
          </span>
          <Database className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono text-cyan-300 tracking-tight">{blockchainRecorded}</span>
          <span className="text-[11px] font-mono text-cyan-500 font-semibold">✓ SHA-256 Validated</span>
        </div>
        <div className="w-full bg-zinc-800 h-1 rounded-full mt-3 overflow-hidden">
          <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${total > 0 ? (blockchainRecorded / total) * 100 : 0}%` }}></div>
        </div>
      </div>

    </div>
  );
};
