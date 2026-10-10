import React, { useState } from 'react';
import { X, UploadCloud, ShieldCheck, Link2, CheckCircle2, Scan, Sparkles } from 'lucide-react';

export const NewScreeningModal = ({ onClose, onAddRecord }) => {
  const [docType, setDocType] = useState('Passport');
  const [travelerName, setTravelerName] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [issueCountry, setIssueCountry] = useState('Nepal');
  const [simulatedStatus, setSimulatedStatus] = useState('VERIFIED');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!travelerName || !docNumber) return;

    setIsProcessing(true);

    setTimeout(() => {
      const nextIdNum = Math.floor(Math.random() * 800) + 10;
      const docId = `DOC-${String(nextIdNum).padStart(4, '0')}-${issueCountry === 'India' ? 'IN' : 'NP'}`;
      
      const isVerified = simulatedStatus === 'VERIFIED';
      const isReview = simulatedStatus === 'REVIEW';

      const randomHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      const blockNum = 18492000 + Math.floor(Math.random() * 500);

      const newRecord = {
        id: docId,
        travelerName: travelerName.toUpperCase(),
        docType: docType,
        docNumber: docNumber,
        status: simulatedStatus,
        riskScore: isVerified ? Math.floor(Math.random() * 15) + 5 : isReview ? Math.floor(Math.random() * 30) + 35 : Math.floor(Math.random() * 25) + 75,
        riskLevel: isVerified ? 'LOW' : isReview ? 'MEDIUM' : 'HIGH',
        timestamp: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} IST`,
        dateFormatted: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
        officer: 'Insp. R. K. Thapa (SSB-8841)',
        checkpoint: 'ICP Raxaul — Gate 02',
        issueCountry: issueCountry,
        expiryDate: '12 Dec 2032',
        dobDocument: '15/06/1994',
        dobDatabase: isVerified || isReview ? '15/06/1994' : '15/06/1990',
        dobMatch: isVerified || isReview,
        photoMatchPercent: isVerified ? 95 : isReview ? 72 : 52,
        photoMatchStatus: isVerified ? 'MATCH' : isReview ? 'BORDERLINE' : 'MISMATCH',
        tamperDetected: !isVerified && !isReview,
        tamperDetails: isVerified ? 'All security optical features verified.' : isReview ? 'Lighting anomaly under UV analysis.' : 'Altered birth year and watermark overlay detected.',
        reasons: isVerified ? ['Central Immigration DB parameters match cleanly'] : isReview ? ['Manual inspection requested by officer'] : ['DOB mismatch', 'Suspicious font alignment on document'],
        blockchain: {
          recorded: true,
          statusText: 'VALIDATED',
          blockNumber: blockNum,
          txHash: randomHash,
          smartContract: '0xSSB_Border_Ledger_v4',
          timestampHash: randomHash.substring(0, 20),
          validatorNode: 'NODE-RAXAUL-01'
        }
      };

      onAddRecord(newRecord);
      setIsProcessing(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md font-sans">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden border-t-2 border-t-cyan-500">
        
        {/* Header */}
        <div className="bg-zinc-950 px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase tracking-wider">
            <Scan className="w-4 h-4 text-cyan-400" />
            <span>Document Screening Scan</span>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          
          <div>
            <label className="block text-zinc-300 font-mono font-semibold mb-1">Traveler Name *</label>
            <input
              type="text"
              required
              value={travelerName}
              onChange={(e) => setTravelerName(e.target.value)}
              placeholder="e.g. RAMESH KARKI"
              className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-mono font-semibold mb-1">Document Type</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200 text-xs font-mono focus:outline-none focus:border-zinc-600"
              >
                <option value="Passport">Passport</option>
                <option value="Visa">Visa</option>
                <option value="National ID">National ID</option>
                <option value="Travel Permit">Travel Permit</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-mono font-semibold mb-1">Doc Number *</label>
              <input
                type="text"
                required
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                placeholder="e.g. P-904128"
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-mono font-semibold mb-1">Country of Issue</label>
              <input
                type="text"
                value={issueCountry}
                onChange={(e) => setIssueCountry(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-100 font-mono text-xs focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-mono font-semibold mb-1">Screening Result</label>
              <select
                value={simulatedStatus}
                onChange={(e) => setSimulatedStatus(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-zinc-200 text-xs font-mono focus:outline-none focus:border-zinc-600 font-bold"
              >
                <option value="VERIFIED">VERIFIED (Genuine)</option>
                <option value="REVIEW">REVIEW (Under Investigation)</option>
                <option value="HIGH RISK">HIGH RISK (Forged)</option>
              </select>
            </div>
          </div>

          <div className="bg-zinc-950 p-3 rounded border border-zinc-800 text-zinc-400 font-mono text-[11px] space-y-1">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI OCR + Blockchain Pipeline</span>
            </div>
            <p className="text-zinc-400">
              Extracts MRZ parameters, computes threat score, and appends cryptographic block hash.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-800 font-mono">
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3.5 py-1.5 rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 border border-emerald-700 shadow"
            >
              {isProcessing ? (
                <>
                  <Link2 className="w-3.5 h-3.5 animate-spin text-emerald-200" />
                  <span>Recording Ledger...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Execute & Record</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
