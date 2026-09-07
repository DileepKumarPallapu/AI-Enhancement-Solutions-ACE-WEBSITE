import React from 'react';
import { TrendingUp, CheckCircle2, Award, Calendar, BookOpen, Layers } from 'lucide-react';
import { aiStudentJourneyDatabase } from '../../services/db/aiStudentJourneyDatabase';

export const StudentJourneyAnalyticsPage: React.FC = () => {
  const metrics = aiStudentJourneyDatabase.getJourneyMetrics('usr-student-001');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Student Journey Analytics
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            8-Stage Opportunity Lifecycle Telemetry
          </h1>
          <p className="text-xs text-slate-500">
            Discover → Register → Attend → Learn → Build → Compete → Apply → Achieve. Real verified events only.
          </p>
        </div>

        {/* 8 Stage Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">1. Discover</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{metrics.eventsDiscovered}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">2. Register</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">{metrics.eventsRegistered}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">3. Attend</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{metrics.eventsAttended}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">4. Learn</div>
            <div className="text-2xl font-black text-purple-600 mt-1">{metrics.coursesCompleted}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">5. Build</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{metrics.projectsBuilt}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">6. Compete</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{metrics.competitionsJoined}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">7. Apply</div>
            <div className="text-2xl font-black text-cyan-600 mt-1">{metrics.applicationsSubmitted}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-xs font-semibold text-slate-400">8. Achieve</div>
            <div className="text-2xl font-black text-rose-600 mt-1">{metrics.verifiedCertificates}</div>
          </div>
        </div>

        {/* Milestone Audit Trail */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Chronological Journey Milestones
          </h3>
          <div className="space-y-3">
            {metrics.milestones.map(m => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold mt-0.5">
                  {m.stage}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{m.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.description}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{new Date(m.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
