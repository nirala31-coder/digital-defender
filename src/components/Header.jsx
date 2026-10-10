import React, { useState, useEffect } from 'react';
import { Shield, Radio, Lock, Activity, Server } from 'lucide-react';

export const Header = ({ totalRecords, recordedCount, onLoadDemo, onClearAll }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 text-zinc-100 px-4 sm:px-6 py-3 font-sans sticky top-0 z-30 shadow-2xl">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Left Security Agency Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-900 border border-emerald-500/40 rounded-lg flex items-center justify-center text-emerald-400 shadow-inner">
            <Shield className="w-6 h-6 text-emerald-400 fill-emerald-500/10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase font-sans">
                SSB Border Identity & Screening Terminal
              </h1>
              <span className="bg-zinc-800/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                SECURE OPERATIONAL
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono flex items-center gap-2 mt-0.5">
              <span className="text-zinc-300">Sashastra Seema Bal • Ministry of Home Affairs</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">Terminal: <strong className="text-zinc-200">TRM-RAXAUL-04</strong></span>
            </p>
          </div>
        </div>

        {/* Right System Telemetry */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Real-time Clock */}
          <div className="bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-md flex items-center gap-2 font-mono text-zinc-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-zinc-400">SYS TIME:</span>
            <span className="text-white font-bold">{time} IST</span>
          </div>

          {/* Node Connection Status */}
          <div className="bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-md flex items-center gap-2 font-mono">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-zinc-400">LEDGER SYNC:</span>
            <span className="text-cyan-400 font-bold">{recordedCount}/{totalRecords}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

        </div>

      </div>
    </header>
  );
};
