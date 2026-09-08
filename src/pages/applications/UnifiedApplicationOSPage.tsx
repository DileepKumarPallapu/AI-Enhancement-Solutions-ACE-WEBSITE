import React, { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, Clock, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { aceSuperPlatformDatabase, UnifiedApplication } from '../../services/db/aceSuperPlatformDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const UnifiedApplicationOSPage: React.FC = () => {
  const [apps, setApps] = useState<UnifiedApplication[]>(aceSuperPlatformDatabase.getAllApplications());

  useEffect(() => {
    const unsub = aceSuperPlatformDatabase.subscribe(() => {
      setApps(aceSuperPlatformDatabase.getAllApplications());
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 w-fit">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" /> Unified Application OS
          </span>
          <h1 className="text-3xl font-extrabold text-white">Application Command & Co-Pilot</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Track all fellowship, internship, job, and scholarship submissions with document version binding and AI co-pilot checklist validation.
          </p>
        </div>

        <div className="space-y-4">
          {apps.map(app => (
            <div key={app.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{app.id}</span>
                    <ACEBadge variant={app.status === 'UNDER_REVIEW' ? 'warning' : 'primary'}>{app.status}</ACEBadge>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{app.opportunityTitle}</h3>
                  <p className="text-xs text-slate-400">{app.providerName} • Attached: {app.resumeVersion}</p>
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold">{app.stipendOrPrizeDisplay}</div>
              </div>

              {/* Co-pilot checklist */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Application Co-Pilot Checklist:
                </div>
                <div className="space-y-1.5 text-xs">
                  {app.copilotChecklist.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <span className={c.completed ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {c.completed ? '✓' : '○'}
                      </span>
                      <span>{c.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
