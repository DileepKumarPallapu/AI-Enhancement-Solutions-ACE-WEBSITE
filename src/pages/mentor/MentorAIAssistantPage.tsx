import React from 'react';
import { Bot, Users, Calendar, Target, CheckCircle2 } from 'lucide-react';

export const MentorAIAssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5" /> AI Mentor Assistant
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Authorized Mentee Insights & Session Prep
          </h1>
          <p className="text-xs text-slate-500">
            Synthesized summaries of assigned student milestones, missed goals, and recommended discussion topics.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Assigned Mentee: Dileep Kumar (Vel Tech)</h3>
            <span className="text-xs font-semibold text-emerald-600">Active Mentorship</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white">Key Discussion Points for Today's 3:30 PM Session:</div>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc pl-4">
              <li>Review Full-Stack Project Lab repository structure and test coverage.</li>
              <li>Discuss preparation for upcoming InnoTech Labs technical interview.</li>
              <li>Recommend next steps for SQL indexing & REST API optimization.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
