import React, { useState } from 'react';
import { useMentor } from '../../../context/MentorContext';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Circle, ArrowLeft, Trophy, Calendar } from 'lucide-react';

export const StudentMentorGoalsPage: React.FC = () => {
  const { studentGoals, updateGoalProgress } = useMentor();

  const handleToggleMilestone = async (goalId: string, milestoneIndex: number, currentStatus: boolean) => {
    const goal = studentGoals.find(g => g.id === goalId);
    if (!goal) return;

    goal.milestones[milestoneIndex].completed = !currentStatus;
    const completedCount = goal.milestones.filter(m => m.completed).length;
    const newPercentage = Math.round((completedCount / goal.milestones.length) * 100);

    await updateGoalProgress(goalId, newPercentage);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <Link to="/student/mentor" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Student Success Plan & Roadmap</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Structured 3-month milestone goals verified and monitored with your college mentors.
          </p>
        </div>

        <div className="space-y-6">
          {studentGoals.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-indigo-400" />
              <p className="text-xs text-slate-500 dark:text-slate-400">No active goals or milestone plans created yet.</p>
              <Link to="/student/mentors" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
                Request Roadmap from Mentor
              </Link>
            </div>
          ) : (
            studentGoals.map(goal => (
              <div key={goal.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm dark:shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                      {goal.targetCategory} GOAL
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{goal.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{goal.progressPercentage}%</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Target: {goal.targetDate}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${goal.progressPercentage}%` }}
                  />
                </div>

                {/* Milestones List */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">3-Month Milestone Roadmap</h4>
                  {goal.milestones.map((milestone, idx) => (
                    <div
                      key={milestone.id}
                      onClick={() => handleToggleMilestone(goal.id, idx, milestone.completed)}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition"
                    >
                      {milestone.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5">
                        <p className={`text-xs font-semibold ${milestone.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                          Month {milestone.monthIndex}: {milestone.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {goal.mentorReviewNotes && (
                  <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-xs">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300">Mentor Guidance Feedback:</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-1 italic">"{goal.mentorReviewNotes}"</p>
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
