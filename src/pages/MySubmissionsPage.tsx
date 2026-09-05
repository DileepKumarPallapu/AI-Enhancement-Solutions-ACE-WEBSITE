import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Clock, AlertTriangle, CheckCircle2, XCircle, Globe, ChevronRight, Eye, Edit3 } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { EventApprovalTimeline } from '../components/workflow/EventApprovalTimeline';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EventSubmissionData } from '../types/workflow';

export const MySubmissionsPage: React.FC = () => {
  const { user } = useApp();
  const { getUserSubmissions } = useWorkflow();
  const navigate = useNavigate();

  const [selectedSub, setSelectedSub] = useState<EventSubmissionData | null>(null);
  const submissions = getUserSubmissions(user.email);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="SUBMITTER DASHBOARD"
        title="My Event"
        highlight="Submissions."
        subtitle="Track verification status, reviewer change requests, and live publication stages for your submitted college opportunities."
        actions={
          <Link to="/submit-event">
            <Button variant="primary" size="md" icon={<PlusCircle className="w-4 h-4" />}>
              + Submit Another Event
            </Button>
          </Link>
        }
      />

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {submissions.map(sub => (
          <div key={sub.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-lg">
                  {sub.id}
                </span>

                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  sub.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                  sub.status.includes('CHANGES_REQUESTED') ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 animate-pulse' :
                  sub.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                  'bg-purple-100 text-brand-700 dark:bg-purple-950 dark:text-purple-300'
                }`}>
                  {sub.status === 'PUBLISHED' && <Globe className="w-3.5 h-3.5" />}
                  {sub.status.includes('CHANGES_REQUESTED') && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                  {sub.status.includes('PENDING') && <Clock className="w-3.5 h-3.5" />}
                  <span>{sub.currentStage}</span>
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg line-clamp-1">{sub.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub.college.name} • {sub.college.department}</p>
              </div>

              {/* Warning box if changes requested */}
              {sub.requestedChanges && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold block">Reviewer Note:</span>
                  <p className="text-[11px] mt-0.5 leading-relaxed font-medium">"{sub.requestedChanges.comments}"</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedSub(sub)} icon={<Eye className="w-3.5 h-3.5" />}>
                Track Timeline
              </Button>

              {sub.status.includes('CHANGES_REQUESTED') ? (
                <Link to={`/submit-event/${sub.id}`}>
                  <Button variant="ai" size="sm" icon={<Edit3 className="w-3.5 h-3.5" />}>
                    Update Event (Same Form) →
                  </Button>
                </Link>
              ) : sub.status === 'PUBLISHED' ? (
                <Link to={`/events/${sub.slug}`}>
                  <Button variant="primary" size="sm" icon={<Globe className="w-3.5 h-3.5" />}>
                    View Live Event →
                  </Button>
                </Link>
              ) : (
                <span className="text-xs text-slate-400 font-medium">In Review</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Timeline Modal */}
      {selectedSub && (
        <Modal isOpen={Boolean(selectedSub)} onClose={() => setSelectedSub(null)} title={`Timeline for ${selectedSub.title}`}>
          <div className="space-y-6">
            <EventApprovalTimeline submission={selectedSub} />
          </div>
        </Modal>
      )}

    </div>
  );
};
