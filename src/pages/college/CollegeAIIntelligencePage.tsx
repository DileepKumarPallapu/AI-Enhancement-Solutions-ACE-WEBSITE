import React from 'react';
import { School, TrendingUp, Users, Award, BookOpen } from 'lucide-react';

export const CollegeAIIntelligencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <School className="w-3.5 h-3.5" /> AI College Intelligence
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Institutional Engagement & Department Trends
          </h1>
          <p className="text-xs text-slate-500">
            Aggregated institutional analytics for Vel Tech Rangarajan Dr. Sagunthala R&D Institute. Privacy-preserving aggregate metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Verified Students</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">1,248</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Active Hackathons</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">14</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Mentor Sessions Held</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">320</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400 font-semibold">Placement Radar Matches</div>
            <div className="text-2xl font-black text-purple-600 mt-1">86</div>
          </div>
        </div>

      </div>
    </div>
  );
};
