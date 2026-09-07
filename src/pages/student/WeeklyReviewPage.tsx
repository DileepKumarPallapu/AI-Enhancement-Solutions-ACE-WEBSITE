import React from 'react';
import { Calendar, Award, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WeeklyReviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" /> AI Weekly Review
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Weekly Progress & Outcome Summary
          </h1>
          <p className="text-xs text-slate-500">
            Audit of your verified activities, completed milestones, and recommendations for next week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Completed Milestones</div>
            <div className="text-3xl font-black text-emerald-600 mt-1">4</div>
            <div className="text-[11px] text-slate-500 mt-1">Across 2 active goals</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Learning Practice</div>
            <div className="text-3xl font-black text-indigo-600 mt-1">8.5 hrs</div>
            <div className="text-[11px] text-slate-500 mt-1">Interactive code execution</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">New Skills Verified</div>
            <div className="text-3xl font-black text-purple-600 mt-1">1</div>
            <div className="text-[11px] text-slate-500 mt-1">React 19 Components</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Next Week Focus Recommendations</h3>
          <div className="space-y-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-xs">
              <span className="font-bold text-slate-900 dark:text-white">1. Complete Mock Technical Interview:</span> Practice system design questions in AI Interview Lab.
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-xs">
              <span className="font-bold text-slate-900 dark:text-white">2. Polish Project Lab Readme:</span> Add live deployment link and architectural overview.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
