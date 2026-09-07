import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Building2, User, Code2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const IntelligentOnboardingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        
        <div className="space-y-1 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">ACE 2.0 Guided Setup</span>
          <h2 className="text-2xl font-bold text-white">Welcome, {user?.displayName || 'Student'}!</h2>
          <p className="text-xs text-slate-400">Step {step} of 3: Configure your authenticated academic profile</p>
        </div>

        {step === 1 && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" /> Academic Affiliation
            </h4>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Registered Institution</span>
              <p className="text-white font-semibold">Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology</p>
              <p className="text-slate-400 text-[11px]">Avadi, Chennai, Tamil Nadu</p>
            </div>
            <p className="text-slate-400">Your student record is verified under the canonical institution database.</p>
          </div>
        )}

        {step === 2 && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Digital Student Card & QR
            </h4>
            <p className="text-slate-300">
              Your unique ACE Student ID (<span className="font-mono text-emerald-400 font-bold">ACE-2026-VT9842</span>) is ready with offline QR verification and event check-in passes.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" /> Multi-Tier Skill Ledger
            </h4>
            <p className="text-slate-300">
              4 skill domains pre-seeded and linked to real coding challenges, certificates, and mentor endorsements.
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
            >
              Launch ACE Workspace <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
