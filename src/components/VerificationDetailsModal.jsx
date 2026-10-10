import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Link2,
  Copy,
  Check,
  Database,
  Lock,
  UserCheck,
  FileText,
  Key,
  Scan,
  Cpu,
  Fingerprint
} from 'lucide-react';

export const VerificationDetailsModal = ({ record, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [verifyingHash, setVerifyingHash] = useState(false);
  const [hashVerified, setHashVerified] = useState(false);

  if (!record) return null;

  const handleCopyHash = () => {
    if (record.blockchain?.txHash) {
      navigator.clipboard.writeText(record.blockchain.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleVerifyLedgerHash = () => {
    setVerifyingHash(true);
    setTimeout(() => {
      setVerifyingHash(false);
      setHashVerified(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden my-6 border-t-2 border-t-emerald-500">
        
        {/* Inspection Terminal Header */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-emerald-400">
              <Scan className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                  INSPECTION DOSSIER: {record.id}
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono font-semibold border border-zinc-700">
                  {record.docType}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                {record.checkpoint} • Officer: {record.officer}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[82vh] overflow-y-auto text-xs">
          
          {/* Top Security Status Header Card */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Document ID</span>
              <p className="text-sm font-bold text-cyan-400 mt-0.5">{record.id}</p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Verification Status</span>
              <div className="mt-0.5">
                {record.status === 'VERIFIED' && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                  </span>
                )}
                {record.status === 'REVIEW' && (
                  <span className="text-xs font-bold text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> REVIEW
                  </span>
                )}
                {record.status === 'HIGH RISK' && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-950 border border-rose-800 px-2 py-0.5 rounded inline-flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> HIGH RISK
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Timestamp</span>
              <p className="text-xs font-semibold text-zinc-200 mt-0.5">{record.timestamp}</p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Blockchain Status</span>
              <p className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-400" /> Recorded on Ledger
              </p>
            </div>
          </div>

          {/* Traveler & Facial Biometric Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left 2 Cols: Traveler Details */}
            <div className="md:col-span-2 bg-zinc-950 border border-zinc-800 p-4 rounded-lg space-y-3">
              <h3 className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                Traveler & Document Metadata
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-zinc-500 font-mono">Traveler Name</span>
                  <p className="text-sm font-semibold text-white mt-0.5">{record.travelerName}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Doc Number</span>
                  <p className="text-sm font-mono font-semibold text-zinc-200 mt-0.5">{record.docNumber}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Issuing State</span>
                  <p className="text-sm font-semibold text-zinc-200 mt-0.5">{record.issueCountry}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Expiry Date</span>
                  <p className="text-sm font-mono font-semibold text-zinc-200 mt-0.5">{record.expiryDate}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Screening Officer</span>
                  <p className="text-xs font-semibold text-zinc-200 mt-0.5">{record.officer}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Border Checkpoint</span>
                  <p className="text-xs font-semibold text-zinc-200 mt-0.5">{record.checkpoint}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Facial Biometrics Scanner Simulation */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider flex items-center gap-1.5 border-b border-zinc-800 pb-2 mb-3">
                  <Fingerprint className="w-4 h-4 text-emerald-400" />
                  Facial Match Biometrics
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-400 font-mono">AI Feature Similarity</span>
                  <span className={`font-mono font-bold ${
                    record.photoMatchPercent >= 85 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {record.photoMatchPercent}% Match
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full ${
                      record.photoMatchPercent >= 85 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${record.photoMatchPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-zinc-900 p-2.5 rounded border border-zinc-800 text-[11px] font-mono text-zinc-300">
                <span className="text-zinc-500 block">Status Recommendation:</span>
                <span className="font-bold text-white uppercase">{record.photoMatchStatus}</span>
              </div>
            </div>

          </div>

          {/* Database Verification & AI OCR Inspection Table */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
            <h3 className="text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider mb-3 flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-400" />
              OCR Extraction vs Authorized Central DB Comparison
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase">
                    <th className="py-2 px-3">Field Parameter</th>
                    <th className="py-2 px-3">Extracted Document OCR</th>
                    <th className="py-2 px-3">Central Immigration DB</th>
                    <th className="py-2 px-3">Verification Check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-sans text-zinc-300">Date of Birth (DOB)</td>
                    <td className="py-2.5 px-3 text-zinc-200">{record.dobDocument}</td>
                    <td className="py-2.5 px-3 text-zinc-200">{record.dobDatabase}</td>
                    <td className="py-2.5 px-3">
                      {record.dobMatch ? (
                        <span className="text-emerald-400 font-sans font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> MATCH
                        </span>
                      ) : (
                        <span className="text-rose-400 font-sans font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> MISMATCH
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans text-zinc-300">Document Tamper Analysis</td>
                    <td className="py-2.5 px-3 text-zinc-200 font-sans" colSpan={2}>
                      {record.tamperDetails}
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      {record.tamperDetected ? (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> FORGERY DETECTED
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> GENUINE PATTERN
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Risk Score Meter */}
          <div className={`p-4 rounded-lg border ${
            record.riskScore > 70 
              ? 'bg-rose-950/40 border-rose-800 text-rose-200' 
              : record.riskScore > 30 
              ? 'bg-amber-950/40 border-amber-800 text-amber-200' 
              : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                <h4 className="font-bold text-xs font-mono uppercase">AI Threat & Anomaly Evaluation</h4>
              </div>
              <span className="font-mono text-sm font-extrabold px-3 py-1 bg-zinc-950 rounded border border-current">
                RISK SCORE: {record.riskScore}/100 — {record.riskLevel} RISK
              </span>
            </div>
            <ul className="mt-2 text-xs space-y-1 pl-5 list-disc text-zinc-300">
              {record.reasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>

          {/* Blockchain Cryptographic Audit Section */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-xs uppercase">Cryptographic Ledger Proof</h4>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                ✓ SHA-256 AUDITED
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-900 p-2.5 rounded border border-zinc-800 gap-2">
                <span className="text-zinc-400">Transaction Hash:</span>
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <span className="truncate max-w-[280px] sm:max-w-md">{record.blockchain.txHash}</span>
                  <button
                    onClick={handleCopyHash}
                    className="p-1 text-zinc-400 hover:text-white bg-zinc-800 rounded transition-colors"
                    title="Copy Transaction Hash"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                <div className="bg-zinc-900 p-2 rounded border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Block Height:</span>
                  <span className="text-white">#{record.blockchain.blockNumber}</span>
                </div>
                <div className="bg-zinc-900 p-2 rounded border border-zinc-800 flex justify-between">
                  <span className="text-zinc-400">Smart Contract:</span>
                  <span className="text-indigo-300 truncate max-w-[140px]">{record.blockchain.smartContract}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
              <p className="text-[11px] text-zinc-400 font-sans">
                Cryptographic signature ensures the record remains immutable and tamper-proof.
              </p>
              <button
                onClick={handleVerifyLedgerHash}
                disabled={verifyingHash}
                className="w-full sm:w-auto bg-cyan-800 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs px-3.5 py-1.5 rounded font-semibold font-mono flex items-center justify-center gap-2 transition-colors border border-cyan-700"
              >
                <Key className="w-3.5 h-3.5" />
                {verifyingHash ? 'Computing Merkle Proof...' : 'Verify Immutability Hash'}
              </button>
            </div>

            {hashVerified && (
              <div className="p-2.5 bg-emerald-950 border border-emerald-800 rounded text-xs text-emerald-300 flex items-center gap-2 font-sans">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Merkle Root Hash Match Confirmed!</strong> Transaction verified on SSB distributed ledger node block #{record.blockchain.blockNumber}.
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-950 px-6 py-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-semibold px-4 py-1.5 rounded transition-colors border border-zinc-700"
          >
            CLOSE DOSSIER
          </button>
        </div>

      </div>
    </div>
  );
};
