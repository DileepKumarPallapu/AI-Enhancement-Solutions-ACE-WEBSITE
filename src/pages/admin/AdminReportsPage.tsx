import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, Search, Filter, Eye } from 'lucide-react';
import { useManagement } from '../../context/ManagementContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AdminReportsPage: React.FC = () => {
  const { reports, updateReportStatus } = useManagement();
  const { showToast } = useToast();

  const handleResolve = (id: string) => {
    updateReportStatus(id, 'RESOLVED', 'Verified with host organizer and resolved.');
    showToast('Report marked as Resolved ✓', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="COMMUNITY INTEGRITY & SAFETY"
        title="Student Reports &"
        highlight="Resolution Queue."
        subtitle="Review complaints from students regarding fake listings, broken registration links, or mismatched information."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map(rep => (
          <div key={rep.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  {rep.id} • {rep.reason}
                </span>

                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  rep.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {rep.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{rep.targetTitle}</h3>
                <p className="text-xs text-slate-400">Target ID: {rep.targetId} • Reporter: {rep.reporterName}</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Submitted Evidence:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{rep.evidence}</p>
              </div>

              {rep.resolutionNote && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200">
                  <span className="font-bold">Resolution Note:</span>
                  <p className="text-[11px] mt-0.5">{rep.resolutionNote}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Logged: {rep.createdAt}</span>
              {rep.status !== 'RESOLVED' && (
                <Button variant="primary" size="sm" onClick={() => handleResolve(rep.id)} icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                  Mark Resolved
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
