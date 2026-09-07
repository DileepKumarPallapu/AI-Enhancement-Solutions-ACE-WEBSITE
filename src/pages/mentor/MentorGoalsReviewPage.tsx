import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  Trophy,
  ArrowLeft,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

export const MentorGoalsReviewPage: React.FC = () => {
  const { studentGoals } = useMentor();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Goal & Milestone Reviews</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track and review 3-month milestone roadmaps of your student cohort.
          </p>
        </div>

        <div className="space-y-6">
          {studentGoals.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No active student goals to review.
            </div>
          ) : (
            studentGoals.map(goal => (
              <div key={goal.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                      {goal.category.replace(/_/g, ' ')}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{goal.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{goal.description}</p>
                  </div>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{goal.progressPercentage}%</span>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Milestones Checklist</h4>
                  {goal.milestones.map(m => (
                    <div key={m.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
                      {m.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-slate-400" />}
                      <span className={m.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'}>
                        Month {m.monthIndex}: {m.title}
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
