import React from 'react';
import { useMentor } from '../../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  ListChecks,
  CheckCircle2,
  Circle,
  ArrowLeft
} from 'lucide-react';

export const StudentMentorActionPlansPage: React.FC = () => {
  const { studentActionPlans, toggleTaskStatus } = useMentor();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/student/mentorship" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentorship Hub
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentor Action Plans</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Curated action steps, tasks, and deliverables assigned by your mentor.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {studentActionPlans.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
              <ListChecks className="w-8 h-8 mx-auto text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No active action plans assigned yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">After meeting with your mentor, customized action tasks will be assigned here.</p>
            </div>
          ) : (
            studentActionPlans.map(plan => {
              const completedTasks = plan.tasks.filter(t => t.status === 'COMPLETED').length;
              const totalTasks = plan.tasks.length;
              const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

              return (
                <div key={plan.id} className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                          plan.status === 'ACTIVE'
                            ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                            : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {plan.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{plan.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Assigned by: {plan.mentorName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{percent}%</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{completedTasks} / {totalTasks} Tasks</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Action Items Checklist</h4>
                    {plan.tasks.map(task => {
                      const isDone = task.status === 'COMPLETED';
                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTaskStatus(plan.id, task.id, !isDone, 'Marked by student')}
                          className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-600 transition"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="space-y-0.5 flex-1">
                            <p className={`text-xs font-semibold ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                              {task.title}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{task.description}</p>
                            {task.completedAt && (
                              <span className="inline-block text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                                Completed: {new Date(task.completedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
