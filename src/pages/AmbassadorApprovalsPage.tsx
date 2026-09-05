import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Eye, Building2, MapPin, Calendar, Award } from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EventSubmissionData } from '../types/workflow';

export const AmbassadorApprovalsPage: React.FC = () => {
  const { submissions, ambassadorApprove, ambassadorRequestChanges, ambassadorReject } = useWorkflow();
  const [reviewingSub, setReviewingSub] = useState<EventSubmissionData | null>(null);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [comments, setComments] = useState('');

  const pendingSubmissions = submissions.filter(s => s.status === 'PENDING_COLLEGE_AMBASSADOR');

  const handleApprove = (id: string) => {
    ambassadorApprove(id);
    setReviewingSub(null);
  };

  const handleSendChangeRequest = () => {
    if (!reviewingSub || !comments.trim()) return;
    ambassadorRequestChanges(reviewingSub.id, selectedFields, comments);
    setIsChangeModalOpen(false);
    setReviewingSub(null);
    setSelectedFields([]);
    setComments('');
  };

  const handleReject = (id: string) => {
    ambassadorReject(id, 'Event does not meet campus verified guidelines.');
    setReviewingSub(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="CAMPUS AMBASSADOR CONSOLE"
        title="College Event"
        highlight="Approvals."
        subtitle="Review, request updates, or approve incoming event submissions for your college before escalating to ACE Super Admin."
        badge={
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            {pendingSubmissions.length} Pending Review
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingSubmissions.map(sub => (
          <div key={sub.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-lg">
                  {sub.id}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  AI Quality: {sub.aiQuality.score}/100
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">{sub.title}</h3>
                <p className="text-xs text-slate-500">{sub.college.name} • {sub.college.department}</p>
                <p className="text-xs text-slate-400 mt-1">Submitted by: {sub.submittedBy.name} ({sub.submittedBy.email})</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" onClick={() => setReviewingSub(sub)} icon={<Eye className="w-3.5 h-3.5" />}>
                Review Submission
              </Button>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={() => handleApprove(sub.id)} icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                  Approve
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {reviewingSub && (
        <Modal isOpen={Boolean(reviewingSub)} onClose={() => setReviewingSub(null)} title={`Ambassador Review: ${reviewingSub.title}`}>
          <div className="space-y-6">
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Description:</strong> {reviewingSub.shortDescription}</p>
              <p><strong>Venue:</strong> {reviewingSub.location.venue || 'TBD'}</p>
              <p><strong>Registration URL:</strong> <a href={reviewingSub.registration.url} target="_blank" className="text-brand-600 underline">{reviewingSub.registration.url}</a></p>
              <p><strong>Organizer:</strong> {reviewingSub.organizer.name} ({reviewingSub.organizer.phone})</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleReject(reviewingSub.id)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                ✕ Reject
              </button>
              <div className="flex gap-2">
                <Button variant="outline" size="md" onClick={() => setIsChangeModalOpen(true)} icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}>
                  Request Changes
                </Button>
                <Button variant="primary" size="md" onClick={() => handleApprove(reviewingSub.id)} icon={<CheckCircle2 className="w-4 h-4" />}>
                  Approve & Forward to Admin
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Request Changes Modal */}
      {isChangeModalOpen && reviewingSub && (
        <Modal isOpen={isChangeModalOpen} onClose={() => setIsChangeModalOpen(false)} title="Select Fields Requiring Modification">
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Select which fields the submitter must correct in the form:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['title', 'venue', 'registrationUrl', 'date', 'organizer', 'poster'].map(field => (
                <label key={field} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedFields(prev => [...prev, field]);
                      else setSelectedFields(prev => prev.filter(f => f !== field));
                    }}
                    className="w-4 h-4 text-brand-600 rounded"
                  />
                  <span className="font-semibold capitalize">{field}</span>
                </label>
              ))}
            </div>

            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Explain specifically what needs to be changed..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none"
            />

            <Button variant="primary" size="md" onClick={handleSendChangeRequest} className="w-full">
              Send Update Request to Submitter
            </Button>
          </div>
        </Modal>
      )}

    </div>
  );
};
