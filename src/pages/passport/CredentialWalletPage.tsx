import React from 'react';
import { credentialsDatabase } from '../../services/db/credentialsDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShieldCheck, Award, ExternalLink, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CredentialWalletPage() {
  const credentials = credentialsDatabase.getAllCredentials();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Digital Credential Wallet"
          description="Tamper-proof academic awards, competition certificates, and verified skill attestations signed with Ed25519 cryptography."
          badge="CREDENTIAL WALLET"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {credentials.map((cred) => (
            <div key={cred.credentialId} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <ACEBadge variant="success">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {cred.status}
                  </ACEBadge>
                  <ACEBadge variant="neutral">{cred.credentialType.replace(/_/g, ' ')}</ACEBadge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cred.title}</h3>
                <div className="text-xs text-slate-500">
                  Issued to: <strong>{cred.recipientName}</strong> ({cred.recipientRollNumber})
                </div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Issuer: {cred.issuerName}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg">
                  "{cred.evidenceSummary}"
                </p>
                <div className="font-mono text-[10px] text-slate-400 truncate">
                  Sig: {cred.cryptographicSignature}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">Issued: {new Date(cred.issuedAt).toLocaleDateString()}</span>
                <Link to={`/credentials/${cred.credentialId}`}>
                  <ACEButton variant="outline" size="sm" className="flex items-center gap-1">
                    Public Verification <ExternalLink className="w-3.5 h-3.5" />
                  </ACEButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
