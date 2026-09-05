import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Globe, Eye, Filter } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EventSubmissionData } from '../types/workflow';

export const AdminEventApprovalsPage: React.FC = () => {
  const { submissions, adminApprove, adminRequestChanges, adminReject } = useWorkflow();
  const [selectedSub, setSelectedSub] = useState<EventSubmissionData | null>(null);

  const pendingAdmin = submissions.filter(s => s.status === 'PENDING_ACE_ADMIN');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="ACE SUPER ADMIN"
        title="Event Moderation &"
        highlight="Publication Gate."
        subtitle="Final verification layer guaranteeing 100% legitimate college opportunities before public publication across India."
        badge={
          <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-700 font-bold text-xs flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {pendingAdmin.length} Awaiting Admin Approval
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingAdmin.map(sub => (
          <div key={sub.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-lg">
                  {sub.id}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Ambassador Verified ✓
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">{sub.title}</h3>
                <p className="text-xs text-slate-500">{sub.college.name} • {sub.college.department}</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
                <p><strong>AI Score:</strong> {sub.aiQuality.score}/100</p>
                <p><strong>Requires Org Confirm:</strong> {sub.organizer.isSubmittingOnBehalf ? 'Yes' : 'No (Direct)'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setSelectedSub(sub)}>
                View Details
              </Button>
              <Button variant="primary" size="sm" onClick={() => adminApprove(sub.id)} icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                Final Approve & Publish
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
