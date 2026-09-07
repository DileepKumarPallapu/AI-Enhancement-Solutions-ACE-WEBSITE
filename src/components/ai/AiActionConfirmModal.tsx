import React from 'react';
import { AlertCircle, ShieldCheck, Sparkles, Check, X } from 'lucide-react';

export interface AiActionParams {
  actionType: 'REGISTER_EVENT' | 'BOOK_MENTOR' | 'APPLY_JOB' | 'REDEEM_COINS';
  title: string;
  description: string;
  details: { label: string; value: string }[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const AiActionConfirmModal: React.FC<AiActionParams | null> = (props) => {
  if (!props) return null;
  const { title, description, details, onConfirm, onCancel } = props;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400">AI Assistant Action Request</span>
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{description}</p>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
          {details.map(d => (
            <div key={d.label} className="flex justify-between">
              <span className="text-slate-400">{d.label}:</span>
              <span className="font-semibold text-white truncate max-w-[200px]">{d.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
          >
            Reject
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition"
          >
            Confirm & Execute
          </button>
        </div>
      </div>
    </div>
  );
};
