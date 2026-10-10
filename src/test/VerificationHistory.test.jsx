import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { VerificationHistoryTable } from '../components/VerificationHistoryTable';
import { VerificationDetailsModal } from '../components/VerificationDetailsModal';

const sampleRecords = [
  {
    id: "DOC001",
    travelerName: "Sunil Verma",
    docType: "Passport",
    docNumber: "P8923014",
    status: "VERIFIED",
    riskScore: 12,
    riskLevel: "LOW",
    timestamp: "07 Sep 2026, 14:32 IST",
    dateFormatted: "07 Sep 2026",
    officer: "Insp. R. K. Thapa",
    checkpoint: "SSB Post 04 - Raxaul Border",
    issueCountry: "Nepal",
    expiryDate: "15 Oct 2030",
    dobDocument: "14/08/1991",
    dobDatabase: "14/08/1991",
    dobMatch: true,
    photoMatchPercent: 96,
    photoMatchStatus: "MATCH",
    tamperDetected: false,
    tamperDetails: "No font or watermark alteration detected.",
    reasons: ["All parameters verified with Central Immigration DB"],
    blockchain: {
      recorded: true,
      statusText: "✓ Recorded",
      blockNumber: 18492041,
      txHash: "0x7f9a8b3c2e1d0549281a742c98d61e3f8901abc4",
      smartContract: "0xSSB_Border_Audit_v2.0",
      timestampHash: "b5a932c81ef40726d3a87f12e98c",
      validatorNode: "SSB-Raxaul-Node-01"
    }
  },
  {
    id: "DOC003",
    travelerName: "Vikram Gurung",
    docType: "Passport",
    docNumber: "P4482019",
    status: "HIGH RISK",
    riskScore: 82,
    riskLevel: "HIGH",
    timestamp: "06 Sep 2026, 18:45 IST",
    dateFormatted: "06 Sep 2026",
    officer: "Constable M. Yadav",
    checkpoint: "SSB Post 02 - Sonauli Border",
    issueCountry: "Nepal",
    expiryDate: "10 Jan 2028",
    dobDocument: "12/05/2002",
    dobDatabase: "12/05/1998",
    dobMatch: false,
    photoMatchPercent: 54,
    photoMatchStatus: "MISMATCH",
    tamperDetected: true,
    tamperDetails: "Digital overlay detected on Date of Birth field and visa stamp area.",
    reasons: ["DOB mismatch", "Altered photograph detected"],
    blockchain: {
      recorded: true,
      statusText: "✓ Recorded",
      blockNumber: 18490812,
      txHash: "0x82f1b4c90a12e3456789abcdef01234567892182",
      smartContract: "0xSSB_Border_Audit_v2.0",
      timestampHash: "d3a87f12e98cb5a932c81ef40726",
      validatorNode: "SSB-Sonauli-Node-01"
    }
  }
];

describe('Verification History & Blockchain Audit Module', () => {
  
  it('renders initial empty state notice when no records are present', () => {
    render(<App />);
    expect(screen.getByText(/No Screening Records Found/i)).toBeInTheDocument();
  });

  it('renders history table with records passed to VerificationHistoryTable', () => {
    render(<VerificationHistoryTable records={sampleRecords} onSelectRecord={() => {}} />);

    expect(screen.getByText('DOC001')).toBeInTheDocument();
    expect(screen.getByText('DOC003')).toBeInTheDocument();
    expect(screen.getByText('Sunil Verma')).toBeInTheDocument();
    expect(screen.getByText('Vikram Gurung')).toBeInTheDocument();
  });

  it('opens Verification Details modal and displays Blockchain transaction hash', () => {
    const handleClose = vi.fn();
    const testRecord = sampleRecords[0]; // DOC001

    render(<VerificationDetailsModal record={testRecord} onClose={handleClose} />);

    // Check document details
    expect(screen.getByText(/Document ID: DOC001/i)).toBeInTheDocument();
    expect(screen.getByText('Sunil Verma')).toBeInTheDocument();

    // Check Blockchain Status & Hash
    expect(screen.getByText(/Blockchain Immutable Ledger Audit/i)).toBeInTheDocument();
    expect(screen.getByText(/0x7f9a8b3c2e1d0549281a742c98d61e3f8901abc4/i)).toBeInTheDocument();
    expect(screen.getByText('#18492041')).toBeInTheDocument();
  });

  it('executes immutability hash verification on details modal', async () => {
    const testRecord = sampleRecords[0];
    render(<VerificationDetailsModal record={testRecord} onClose={() => {}} />);

    const verifyBtn = screen.getByRole('button', { name: /Verify Ledger Immutability/i });
    fireEvent.click(verifyBtn);

    expect(screen.getByText(/Computing SHA-256 Hash.../i)).toBeInTheDocument();

    // Wait for mock computation
    const successMsg = await screen.findByText(/Cryptographic Hash Validated!/i, {}, { timeout: 3000 });
    expect(successMsg).toBeInTheDocument();
  });

});
