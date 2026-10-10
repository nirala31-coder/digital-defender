import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ChevronRight, Shield, Check, Hash, Database } from 'lucide-react';

export const VerificationHistoryTable = ({ records, onSelectRecord }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            VERIFIED
          </span>
        );
      case 'REVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-800/80">
            <Clock className="w-3 h-3 text-amber-400" />
            REVIEW
          </span>
        );
      case 'HIGH RISK':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-950/80 text-rose-400 border border-rose-800/80">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            HIGH RISK
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
            {status}
          </span>
        );
    }
  };

  const getRiskMeter = (score) => {
    let colorClass = 'bg-emerald-500';
    let textClass = 'text-emerald-400';
    if (score > 70) {
      colorClass = 'bg-rose-500';
      textClass = 'text-rose-400';
    } else if (score > 30) {
      colorClass = 'bg-amber-500';
      textClass = 'text-amber-400';
    }

    return (
      <div className="flex items-center gap-2 font-mono text-xs">
        <div className="w-16 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div className={`${colorClass} h-full rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
        <span className={`font-bold ${textClass}`}>{score}/100</span>
      </div>
    );
  };

  if (records.length === 0) {
    return (
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-12 text-center my-6 shadow-xl">
        <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-500">
          <Shield className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-zinc-200 uppercase tracking-wide font-mono">Verification History Empty</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1 font-sans">
          No document screening logs present. Click "+ NEW SCREENING" to perform a scan and record ledger entry.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mb-8">
      
      {/* Section Header */}
      <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
            Border Screening & Audit Records Log
          </h2>
          <span className="bg-zinc-800 text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
            {records.length} ENTRIES
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
          Sashastra Seema Bal Audit Ledger
        </span>
      </div>

      {/* High Density Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/90 border-b border-zinc-800 text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
              <th className="py-3 px-4">Document ID</th>
              <th className="py-3 px-4">Traveler Identity</th>
              <th className="py-3 px-4">Type / Doc No.</th>
              <th className="py-3 px-4">Screening Status</th>
              <th className="py-3 px-4">Risk Metric</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Blockchain Audit</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 text-xs">
            {records.map((record) => (
              <tr
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="hover:bg-zinc-800/50 transition-colors cursor-pointer group"
              >
                {/* Document ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 group-hover:text-cyan-300">
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-cyan-500 opacity-80" />
                    <span>{record.id}</span>
                  </div>
                </td>

                {/* Traveler Name */}
                <td className="py-3.5 px-4 font-medium text-zinc-100">
                  <div className="font-semibold text-white">{record.travelerName}</div>
                  <div className="text-[11px] font-mono text-zinc-400">{record.issueCountry || 'Border Traveler'}</div>
                </td>

                {/* Doc Type & Number */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-zinc-200">{record.docType}</div>
                  <div className="text-[11px] font-mono text-zinc-400">{record.docNumber}</div>
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-4">
                  {getStatusBadge(record.status)}
                </td>

                {/* Risk Metric */}
                <td className="py-3.5 px-4">
                  {getRiskMeter(record.riskScore)}
                </td>

                {/* Timestamp */}
                <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-300 whitespace-nowrap">
                  <div>{record.dateFormatted}</div>
                  <div className="text-zinc-400">{record.timestamp.split(', ')[1] || record.timestamp}</div>
                </td>

                {/* Blockchain Badge */}
                <td className="py-3.5 px-4">
                  {record.blockchain?.recorded ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      <Check className="w-3 h-3 text-emerald-400" /> RECORDED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                      SYNCING
                    </span>
                  )}
                </td>

                {/* Action Button */}
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRecord(record);
                    }}
                    className="text-[11px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 border border-zinc-700"
                  >
                    <span>INSPECT</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
