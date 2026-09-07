import React from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ArrowLeft
} from 'lucide-react';

export const MentorAnalyticsPage: React.FC = () => {
  const { activeMentorProfile, myStudents, mentorSessions, studentGoals } = useMentor();

  const totalGoals = studentGoals.length;
  const avgGoalProgress = totalGoals > 0
    ? Math.round(studentGoals.reduce((acc, g) => acc + g.progressPercentage, 0) / totalGoals)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Cohort Performance & Analytics</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real metrics evaluating milestone completion, session cadence, and mentee growth.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Average Progress</span>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{avgGoalProgress}%</div>
            <p className="text-[11px] text-slate-500">Across all 3-month goals</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Sessions</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{mentorSessions.length}</div>
            <p className="text-[11px] text-slate-500">Mentorship meetings</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Cohort Size</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{myStudents.length}</div>
            <p className="text-[11px] text-slate-500">Active mentees</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Mentor Rating</span>
            <div className="text-2xl font-black text-amber-500 font-mono">{activeMentorProfile?.rating.toFixed(1) || '5.0'} / 5.0</div>
            <p className="text-[11px] text-slate-500">Student satisfaction</p>
          </div>
        </div>

      </div>
    </div>
  );
};
