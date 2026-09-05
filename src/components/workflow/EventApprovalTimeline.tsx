import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck, Sparkles, Building2, UserCheck, Globe } from 'lucide-react';
import { WorkflowStatus, EventSubmissionData } from '../../types/workflow';

interface EventApprovalTimelineProps {
  submission: EventSubmissionData;
}

export const EventApprovalTimeline: React.FC<EventApprovalTimelineProps> = ({ submission }) => {
  const { status, requestedChanges, revisions } = submission;

  const steps = [
    {
      id: 'submitted',
      title: 'Event Submitted',
      subtitle: submission.submittedAt,
      icon: Building2,
      isDone: true,
      isCurrent: false,
      isWarning: false
    },
    {
      id: 'ambassador',
      title: 'College Ambassador Review',
      subtitle: status === 'PENDING_COLLEGE_AMBASSADOR' ? 'Awaiting Ambassador verification' :
                status === 'CHANGES_REQUESTED_BY_AMBASSADOR' ? 'Changes requested by Ambassador' :
                status === 'REJECTED' ? 'Rejected' : 'Verified & Approved',
      icon: UserCheck,
      isDone: ['COLLEGE_AMBASSADOR_APPROVED', 'PENDING_ACE_ADMIN', 'ACE_ADMIN_APPROVED', 'PENDING_ORGANIZER_CONFIRMATION', 'ORGANIZER_CONFIRMED', 'FINAL_APPROVED', 'PUBLISHED'].includes(status),
      isCurrent: status === 'PENDING_COLLEGE_AMBASSADOR',
      isWarning: status === 'CHANGES_REQUESTED_BY_AMBASSADOR'
    },
    {
      id: 'admin',
      title: 'ACE Admin Review',
      subtitle: status === 'PENDING_ACE_ADMIN' ? 'Awaiting Super Admin moderation' :
                status === 'CHANGES_REQUESTED_BY_ADMIN' ? 'Changes requested by ACE Admin' :
                ['ACE_ADMIN_APPROVED', 'PENDING_ORGANIZER_CONFIRMATION', 'ORGANIZER_CONFIRMED', 'FINAL_APPROVED', 'PUBLISHED'].includes(status) ? 'Approved by ACE Admin' : 'Pending',
      icon: ShieldCheck,
      isDone: ['ACE_ADMIN_APPROVED', 'PENDING_ORGANIZER_CONFIRMATION', 'ORGANIZER_CONFIRMED', 'FINAL_APPROVED', 'PUBLISHED'].includes(status),
      isCurrent: status === 'PENDING_ACE_ADMIN',
      isWarning: status === 'CHANGES_REQUESTED_BY_ADMIN'
    },
    {
      id: 'organizer',
      title: 'Organizer Confirmation',
      subtitle: !submission.organizer.isSubmittingOnBehalf ? 'Direct submission (Skipped)' :
                status === 'PENDING_ORGANIZER_CONFIRMATION' ? 'Awaiting organizer confirmation' :
                status === 'CHANGES_REQUESTED_BY_ORGANIZER' ? 'Changes requested by Organizer' :
                ['ORGANIZER_CONFIRMED', 'FINAL_APPROVED', 'PUBLISHED'].includes(status) ? 'Confirmed by Organizer' : 'Pending',
      icon: Sparkles,
      isDone: !submission.organizer.isSubmittingOnBehalf || ['ORGANIZER_CONFIRMED', 'FINAL_APPROVED', 'PUBLISHED'].includes(status),
      isCurrent: status === 'PENDING_ORGANIZER_CONFIRMATION',
      isWarning: status === 'CHANGES_REQUESTED_BY_ORGANIZER'
    },
    {
      id: 'published',
      title: 'Final Approval & Live',
      subtitle: status === 'PUBLISHED' ? 'Published live on AllCollegeEvent' : 'Pending all prior approvals',
      icon: Globe,
      isDone: status === 'PUBLISHED',
      isCurrent: status === 'FINAL_APPROVED',
      isWarning: false
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Alert banner if changes are requested */}
      {requestedChanges && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Updates Required by {requestedChanges.requestedBy} ({requestedChanges.timestamp})</span>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 pl-6 leading-relaxed">
            "{requestedChanges.comments}"
          </p>
          <div className="pl-6 flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">Fields to update:</span>
            {requestedChanges.fields.map((f, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold">
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal / Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div key={step.id} className="relative group flex items-start gap-4">
              
              {/* Timeline marker */}
              <div className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900 transition-all ${
                step.isDone ? 'bg-emerald-500 text-white' :
                step.isWarning ? 'bg-amber-500 text-white animate-bounce' :
                step.isCurrent ? 'bg-brand-500 text-white animate-pulse' :
                'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                {step.isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                 step.isWarning ? <AlertTriangle className="w-3.5 h-3.5" /> :
                 step.isCurrent ? <Clock className="w-3.5 h-3.5" /> :
                 <span className="text-[10px]">{idx + 1}</span>}
              </div>

              {/* Step info */}
              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-bold text-xs ${step.isDone ? 'text-slate-900 dark:text-white' : step.isWarning ? 'text-amber-600 dark:text-amber-400' : step.isCurrent ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`}>
                    {step.title}
                  </h4>
                  {step.isDone && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Completed ✓</span>}
                  {step.isCurrent && <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 animate-pulse">In Progress ●</span>}
                  {step.isWarning && <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">Action Required ⚠</span>}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{step.subtitle}</p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
