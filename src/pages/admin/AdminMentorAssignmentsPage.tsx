import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  Users,
  ArrowLeft
} from 'lucide-react';

export const AdminMentorAssignmentsPage: React.FC = () => {
  const { assignedMentors } = useMentor();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/admin/mentors" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Mentors
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Active Mentorship Assignments</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official bindings connecting students with verified campus mentors.
          </p>
        </div>

        <div className="space-y-4">
          {assignedMentors.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No active assignments recorded.
            </div>
          ) : (
            assignedMentors.map(a => (
              <div key={a.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{a.studentName}</h3>
                  <p className="text-[11px] text-slate-500">{a.studentDepartment} • Type: {a.assignmentType}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {a.status}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
