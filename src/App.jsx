import React, { useState, useMemo } from 'react';
import { mockScreeningRecords } from './data/mockData';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { SearchFilterBar } from './components/SearchFilterBar';
import { VerificationHistoryTable } from './components/VerificationHistoryTable';
import { VerificationDetailsModal } from './components/VerificationDetailsModal';
import { NewScreeningModal } from './components/NewScreeningModal';
import { Shield, Lock, FileCheck, Server, AlertCircle } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState(mockScreeningRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Filter records dynamically
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.travelerName.toLowerCase().includes(q) ||
        r.docNumber.toLowerCase().includes(q) ||
        r.officer.toLowerCase().includes(q) ||
        r.checkpoint.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === 'ALL' || r.status === selectedStatus;

      const matchesType =
        selectedType === 'ALL' || r.docType === selectedType;

      const matchesRisk =
        selectedRisk === 'ALL' || r.riskLevel === selectedRisk;

      return matchesSearch && matchesStatus && matchesType && matchesRisk;
    });
  }, [records, searchQuery, selectedStatus, selectedType, selectedRisk]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('ALL');
    setSelectedType('ALL');
    setSelectedRisk('ALL');
  };

  const handleAddRecord = (newRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Header */}
      <Header
        totalRecords={records.length}
        recordedCount={records.filter(r => r.blockchain?.recorded).length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5">
        
        {/* Tactical Sub-Header Information Banner */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-emerald-400">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-100 flex items-center gap-2">
                SSB Operational Screening Terminal — Tamper-Proof Ledger
              </h2>
              <p className="text-[11px] font-sans text-zinc-400 mt-0.5">
                All document scans undergo optical AI feature analysis and are committed directly to the Sashastra Seema Bal cryptographic node ledger.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {records.length === 0 ? (
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Session History Clean (0 Records)
              </span>
            ) : (
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                {records.length} Audit Entries Sync'd
              </span>
            )}
          </div>
        </div>

        {/* Dashboard Statistics KPI Cards */}
        <StatsOverview records={records} />

        {/* Search & Filter Toolbar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedRisk={selectedRisk}
          setSelectedRisk={setSelectedRisk}
          onResetFilters={handleResetFilters}
          onOpenNewModal={() => setIsNewModalOpen(true)}
        />

        {/* Verification History Logs Table */}
        <VerificationHistoryTable
          records={filteredRecords}
          onSelectRecord={(record) => setSelectedRecord(record)}
        />

      </main>

      {/* Verification Details Modal Drawer */}
      {selectedRecord && (
        <VerificationDetailsModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

      {/* New Screening Modal Form */}
      {isNewModalOpen && (
        <NewScreeningModal
          onClose={() => setIsNewModalOpen(false)}
          onAddRecord={handleAddRecord}
        />
      )}

      {/* Security Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 py-4 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Sashastra Seema Bal (SSB) • AI Border Screening System</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> SHA-256 Cryptographic Audit</span>
            <span className="flex items-center gap-1"><FileCheck className="w-3 h-3 text-cyan-400" /> Ministry of Home Affairs</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
