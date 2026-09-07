import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Clock, ShieldCheck, Filter } from 'lucide-react';
import { moderationDatabase, UserReport } from '../../services/db/moderationDatabase';
import { ACEBadge } from '../../components/ui/ace/ACEBadge';

export const AdminModerationQueuePage: React.FC = () => {
  const [reports, setReports] = useState<UserReport[]>(moderationDatabase.getReports());

  const refresh = () => setReports(moderationDatabase.getReports());

  const handleResolve = (id: string, action: 'RESOLVED' | 'DISMISSED') => {
    moderationDatabase.updateReportStatus(id, action, `Actioned by Trust & Safety admin on ${new Date().toLocaleDateString()}`);
    refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold mb-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Trust & Safety Moderation
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Platform Moderation & Abuse Queue
            </h1>
            <p className="text-xs text-slate-500">
              Review flagged content, incorrect information reports, and user appeals with strict audit logging.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{reports.length} Total Reports</span>
          </div>
        </div>

        <div className="space-y-3">
          {reports.map(rep => (
            <div key={rep.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    rep.severity === 'HIGH' || rep.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {rep.severity}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{rep.category}</span>
                  <span className="text-xs text-slate-400">Target: {rep.resourceType} ({rep.resourceId})</span>
                </div>

                <ACEBadge variant={rep.status === 'RESOLVED' ? 'success' : rep.status === 'DISMISSED' ? 'neutral' : 'warning'} size="sm">
                  {rep.status}
                </ACEBadge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Reason:</span> {rep.reason}
              </p>

              {rep.adminNotes && (
                <div className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Admin Audit Note:</span> {rep.adminNotes}
                </div>
              )}

              {rep.status !== 'RESOLVED' && rep.status !== 'DISMISSED' && (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 justify-end">
                  <button
                    onClick={() => handleResolve(rep.id, 'DISMISSED')}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleResolve(rep.id, 'RESOLVED')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                  >
                    Resolve & Take Action
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
