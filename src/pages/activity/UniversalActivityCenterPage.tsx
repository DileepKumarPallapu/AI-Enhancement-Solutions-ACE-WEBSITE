import React from 'react';
import { Clock, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { aceSuperPlatformDatabase } from '../../services/db/aceSuperPlatformDatabase';

export const UniversalActivityCenterPage: React.FC = () => {
  const activities = aceSuperPlatformDatabase.getAllActivities();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <h1 className="text-2xl font-black text-white">Universal Activity Stream & Audit</h1>
          <p className="text-xs text-slate-400">Immutable chronological audit log of all your actions across the ACE ecosystem.</p>
        </div>

        <div className="space-y-3">
          {activities.map(act => (
            <div key={act.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{act.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">[{new Date(act.timestamp).toLocaleTimeString()}]</span>
                </div>
                <p className="text-xs text-slate-400">{act.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
