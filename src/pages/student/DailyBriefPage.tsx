import React from 'react';
import { Sun, Sparkles, CheckCircle2, Calendar, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DailyBriefPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-gradient-to-r from-amber-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            <Sun className="w-3.5 h-3.5 text-amber-200" /> Morning Briefing — 8 March 2026
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Good Morning, Dileep 👋
          </h1>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Here is your daily synthesized briefing across your Vel Tech coursework, active goals, and urgent deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Focus</h3>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Complete REST API & SQL Lab for Full-Stack Goal
            </div>
            <p className="text-xs text-slate-500">
              Your mentor suggested focusing on database indexing to prepare for upcoming tech screenings.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgent Deadline</h3>
            <div className="text-sm font-bold text-rose-600">
              Summer 2026 AI Internship — Due in 12h
            </div>
            <p className="text-xs text-slate-500">
              Verified resume & portfolio attached. Review final submission checklist.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recommended Actions for Today</h3>
          <div className="space-y-2">
            <Link to="/learning" className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 transition">
              <span>📚 Continue Interactive TypeScript Module (+50 XP)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link to="/student/mentorship" className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-300 transition">
              <span>🎓 Confirm 3:30 PM Mentor Session at Vel Tech</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
