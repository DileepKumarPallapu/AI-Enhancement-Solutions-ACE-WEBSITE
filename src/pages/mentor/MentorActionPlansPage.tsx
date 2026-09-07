import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const MentorActionPlansPage: React.FC = () => {
  const { studentActionPlans } = useMentor();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Assigned Action Plans</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deliverables and weekly targets assigned to your student mentees.
          </p>
        </div>

        <div className="space-y-6">
          {studentActionPlans.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No action plans assigned yet.
            </div>
          ) : (
            studentActionPlans.map(plan => (
              <div key={plan.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{plan.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Due: {plan.dueDate}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {plan.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">{plan.description}</p>

                <div className="space-y-1.5 pt-1">
                  {plan.tasks.map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-xs">
                      {t.isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-400" />}
                      <span className={t.isCompleted ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}>
                        {t.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
