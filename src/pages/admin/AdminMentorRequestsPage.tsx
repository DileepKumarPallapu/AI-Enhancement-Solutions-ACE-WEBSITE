import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const AdminMentorRequestsPage: React.FC = () => {
  const { mentorRequests } = useMentor();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/admin/mentors" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Mentors
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Platform Mentorship Requests</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global view of all student mentorship applications and resolution statuses.
          </p>
        </div>

        <div className="space-y-4">
          {mentorRequests.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No mentorship requests recorded.
            </div>
          ) : (
            mentorRequests.map(req => (
              <div key={req.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{req.studentName}</span>
                    <span className="text-[10px] text-slate-500">→ {req.primaryGoal}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic">"{req.message}"</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
