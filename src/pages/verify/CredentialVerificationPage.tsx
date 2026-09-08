import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { credentialsDatabase } from '../../services/db/credentialsDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShieldCheck, XCircle, CheckCircle2, QrCode } from 'lucide-react';

export function CredentialVerificationPage() {
  const { credentialId } = useParams<{ credentialId: string }>();
  const cred = credentialsDatabase.getCredentialById(credentialId || '');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-2">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ACE Official Credential Verification</h1>
          <p className="text-xs text-slate-500">Cryptographically verifiable credential attestation record.</p>
        </div>

        {cred ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credential Status</span>
              <ACEBadge variant={cred.status === 'ACTIVE' ? 'success' : 'danger'}>
                {cred.status}
              </ACEBadge>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credential Title</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{cred.title}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recipient</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{cred.recipientName}</div>
                  <div className="text-xs text-slate-500">{cred.recipientRollNumber}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Issuer</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{cred.issuerName}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Evidence Summary</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg">
                  {cred.evidenceSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Cryptographic Signature</div>
                <div className="font-mono text-[10px] text-slate-400 break-all bg-slate-50 dark:bg-slate-800/40 p-2 rounded">
                  {cred.cryptographicSignature}
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Cryptographically Verified Record on ACE Ledger
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Credential Not Found</h3>
            <p className="text-xs text-slate-500">The provided credential identifier is invalid or has been expired.</p>
          </div>
        )}

      </div>
    </div>
  );
}
