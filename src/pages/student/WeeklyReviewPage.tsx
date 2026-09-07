import React from 'react';
import { TrendingUp, CheckCircle2, Target, Sparkles, BookOpen } from 'lucide-react';
import { studentCommandCenterDb } from '../../services/db/studentCommandCenterDatabase';
import { useAuth } from '../../context/AuthContext';

export const WeeklyReviewPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const review = studentCommandCenterDb.getWeeklyReview(currentUserId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6 space-y-1">
          <span className="text-xs uppercase font-bold text-emerald-400">AI Retrospective Summary</span>
          <h1 className="text-3xl font-bold text-white tracking-tight">{review.weekLabel}</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <span className="text-2xl font-bold text-emerald-400">{review.completedTasksCount}</span>
            <span className="block text-slate-400 text-[10px] uppercase mt-1">Tasks Completed</span>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <span className="text-2xl font-bold text-blue-400">{review.sessionsHeldCount}</span>
            <span className="block text-slate-400 text-[10px] uppercase mt-1">Mentor Sessions</span>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <span className="text-2xl font-bold text-amber-400">{review.challengesClearedCount}</span>
            <span className="block text-slate-400 text-[10px] uppercase mt-1">Coding Missions</span>
          </div>
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <span className="text-2xl font-bold text-purple-400">{review.activeApplicationsCount}</span>
            <span className="block text-slate-400 text-[10px] uppercase mt-1">Active Pipelines</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Milestones Achieved
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {review.keyAchievements.map((ach, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" /> What to Focus on Next Week
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {review.focusForNextWeek.map((foc, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>{foc}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
