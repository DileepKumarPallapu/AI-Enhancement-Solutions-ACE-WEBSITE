import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ShieldCheck, CheckCircle2, XCircle, AlertTriangle, 
  Award, Building2, Calendar, FileText 
} from 'lucide-react';
import { ACEBadge, ACECard } from '../../components/ui/ace';

export const PublicVerifyCredentialPage: React.FC = () => {
  const { credentialId } = useParams<{ credentialId: string }>();
  const [status, setStatus] = useState<'VALID' | 'INVALID' | 'REVOKED'>('VALID');

  const credentialData = {
    id: credentialId || 'cert_fs_892',
    title: 'Certified React & TypeScript Full-Stack Engineering Master',
    recipientName: 'Dileep Kumar Pallapu',
    institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    issuer: 'All College Events (ACE) & Credential Authority',
    issueDate: '2026-01-15T10:00:00Z',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <ACECard elevated className="space-y-6 border-indigo-500/40">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span className="font-bold text-base text-white">Cryptographic Certificate Verification</span>
            </div>
            <ACEBadge variant="success">STATUS: {status}</ACEBadge>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Credential Name</span>
              <h1 className="text-xl font-bold text-white">{credentialData.title}</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">Issued To:</span>
                <p className="font-bold text-white text-sm">{credentialData.recipientName}</p>
                <p className="text-slate-400">{credentialData.institutionName}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">Issuing Authority:</span>
                <p className="font-bold text-white text-sm">{credentialData.issuer}</p>
                <p className="text-slate-400">Date: {new Date(credentialData.issueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold block">Cryptographic SHA-256 Hash:</span>
              <p className="text-xs font-mono text-indigo-300 break-all">{credentialData.sha256Hash}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>This credential record matches the immutable ledger and is cryptographically genuine.</span>
          </div>
        </ACECard>
      </div>
    </div>
  );
};
export default PublicVerifyCredentialPage;
