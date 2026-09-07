import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, AlertTriangle, Building2, UserCheck, Calendar, GraduationCap, ExternalLink } from 'lucide-react';
import { digitalIdDb, DigitalStudentId } from '../../services/db/digitalIdDatabase';

export const PublicVerifyIdPage: React.FC = () => {
  const { token: routeToken } = useParams<{ token?: string }>();
  const [searchParams] = useSearchParams();
  const token = routeToken || searchParams.get('t') || '';

  const [card, setCard] = useState<DigitalStudentId | null>(null);
  const [verifiedAt, setVerifiedAt] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const res = digitalIdDb.recordScan(token);
      if (res.success && res.card) {
        setCard(res.card);
        setVerifiedAt(new Date().toISOString());
      }
    } else {
      const defaultCard = digitalIdDb.getByUserId('usr_student_dileep');
      if (defaultCard) {
        setCard(defaultCard);
        setVerifiedAt(new Date().toISOString());
      }
    }
    setLoading(false);
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white">ACE Verified Student Record</h1>
          <p className="text-xs text-slate-400">Official Authenticated Credential Verification</p>
        </div>

        {card ? (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-emerald-200">Active & Verified Identity</h4>
                <p className="text-xs text-emerald-400/80">Issued by verified academic institution</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center gap-4">
                <img 
                  src={card.avatarUrl} 
                  alt={card.fullName} 
                  className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/40"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{card.fullName}</h3>
                  <p className="text-slate-400">{card.program}</p>
                  <span className="inline-block mt-1 font-mono text-[11px] text-emerald-400 font-semibold">{card.aceId}</span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Institution:</span>
                  <span className="text-right font-medium text-white max-w-[200px] truncate">{card.institutionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Campus Location:</span>
                  <span className="text-right text-slate-300">{card.campusAddress.split(',')[0]}, Chennai</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch Year:</span>
                  <span className="text-right text-slate-300">{card.batchYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verification Status:</span>
                  <span className="text-right text-emerald-400 font-semibold">{card.verificationBadge.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified Timestamp:</span>
                  <span className="text-right font-mono text-slate-400">{new Date(verifiedAt || card.issuedAt).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/portfolio/dileepkumar"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
              >
                View Public Portfolio & Project Evidence <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-center space-y-3">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-sm font-bold text-rose-200">Invalid or Expired QR Token</h3>
            <p className="text-xs text-rose-300/80">
              The requested student identification token could not be verified in the canonical ACE registry.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Powered by ACE Canonical Academic Identity Network • All College Events
        </div>
      </div>
    </div>
  );
};
