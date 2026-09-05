import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, XCircle, Search, Filter, Eye } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { analyzeEventTrust } from '../services/ai/aiTrustEngine';
import { Modal } from '../components/ui/Modal';
import { EventSubmissionData } from '../types/workflow';

export const AdminAiRiskCenterPage: React.FC = () => {
  const { submissions, adminApprove, adminReject } = useWorkflow();
  const [selectedSub, setSelectedSub] = useState<EventSubmissionData | null>(null);

  const analyzed = submissions.map(s => ({
    submission: s,
    analysis: analyzeEventTrust(s, submissions)
  }));

  const highRisk = analyzed.filter(a => a.analysis.breakdown.riskLevel === 'HIGH' || a.analysis.breakdown.riskLevel === 'MEDIUM');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="ACE SECURITY & COMPLIANCE"
        title="AI Risk Center &"
        highlight="Anomaly Radar."
        subtitle="Automated heuristic scanner detecting fake listings, poster date mismatches, suspicious payment URLs, and duplicate events."
        badge={
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> {highRisk.length} Flagged by AI Scanner
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highRisk.map(({ submission, analysis }) => (
          <div key={submission.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-lg">
                  {submission.id}
                </span>

                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  analysis.breakdown.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  Risk Level: {analysis.breakdown.riskLevel} (Score: {analysis.breakdown.overallScore}/100)
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{submission.title}</h3>
                <p className="text-xs text-slate-500">{submission.college.name}</p>
              </div>

              {/* Signals */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5 text-xs">
                {analysis.signals.filter(s => !s.passed).map((s, i) => (
                  <p key={i} className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {s.label}
                  </p>
                ))}
              </div>

              {/* Poster Mismatch Box */}
              {analysis.posterMismatch && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold">⚠ Poster vs Form Mismatch:</span>
                  <p className="text-[11px] mt-0.5">Form Date: {analysis.posterMismatch.formValue} | Poster Date: {analysis.posterMismatch.posterValue}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setSelectedSub(submission)} icon={<Eye className="w-3.5 h-3.5" />}>
                Inspect Details
              </Button>
              <div className="flex gap-2">
                <button
                  onClick={() => adminReject(submission.id, 'Rejected due to AI risk verification flags.')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  Reject
                </button>
                <Button variant="primary" size="sm" onClick={() => adminApprove(submission.id, 'Approved after manual admin verification.')} icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Override & Approve
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
