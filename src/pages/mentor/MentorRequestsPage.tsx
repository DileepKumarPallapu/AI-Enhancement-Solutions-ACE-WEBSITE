import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const MentorRequestsPage: React.FC = () => {
  const { mentorRequests, respondToRequest } = useMentor();
  const [feedbackNotes, setFeedbackNotes] = useState<{ [key: string]: string }>({});
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleAction = async (requestId: string, accept: boolean) => {
    setProcessingId(requestId);
    const note = feedbackNotes[requestId] || (accept ? 'Mentorship approved.' : 'Capacity limit reached.');
    try {
      await respondToRequest(requestId, accept, note);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentorship Requests</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review student mentorship applications and onboard mentees into your advisory cohort.
          </p>
        </div>

        <div className="space-y-4">
          {mentorRequests.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No mentorship requests found.
            </div>
          ) : (
            mentorRequests.map(req => (
              <div
                key={req.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                        req.status === 'PENDING'
                          ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : req.status === 'ACCEPTED'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {req.status}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {req.goalCategory}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{req.studentName}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{req.studentDepartment} • Year {req.studentYear}</p>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    Requested on {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Goal / Objective:</span>
                  <p className="text-slate-600 dark:text-slate-400">{req.primaryGoal}</p>
                  <span className="font-bold text-slate-700 dark:text-slate-300 pt-1 block">Message:</span>
                  <p className="text-slate-600 dark:text-slate-400 italic">"{req.message}"</p>
                </div>

                {req.status === 'PENDING' && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                    <input
                      type="text"
                      placeholder="Optional feedback note to student..."
                      value={feedbackNotes[req.id] || ''}
                      onChange={e => setFeedbackNotes({ ...feedbackNotes, [req.id]: e.target.value })}
                      className="w-full sm:w-80 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />

                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <button
                        disabled={processingId === req.id}
                        onClick={() => handleAction(req.id, false)}
                        className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        Decline
                      </button>
                      <button
                        disabled={processingId === req.id}
                        onClick={() => handleAction(req.id, true)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
                      >
                        Accept Mentee
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
