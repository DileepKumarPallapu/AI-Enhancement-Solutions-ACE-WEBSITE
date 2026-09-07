import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Eye } from 'lucide-react';
import { aiPrivacySettingsDatabase, AIPrivacySettings } from '../../services/db/aiPrivacySettingsDatabase';

export const AIPrivacySettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AIPrivacySettings>(aiPrivacySettingsDatabase.getSettings('usr-student-001'));
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof Omit<AIPrivacySettings, 'userId' | 'updatedAt'>) => {
    const updated = aiPrivacySettingsDatabase.updateSettings('usr-student-001', {
      [key]: !settings[key]
    });
    setSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> AI Privacy & Data Governance
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Student AI Privacy Controls
            </h1>
            <p className="text-xs text-slate-500">
              Control which aspects of your academic and extracurricular profile ACE AI is permitted to analyze.
            </p>
          </div>

          {saved && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 text-xs font-bold animate-fadeIn flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-3">
            
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Use Profile for Personalized Recommendations</div>
                <div className="text-[11px] text-slate-500">Allow AI to match verified department and degree data with opportunities.</div>
              </div>
              <input
                type="checkbox"
                checked={settings.useProfileForRecommendations}
                onChange={() => toggle('useProfileForRecommendations')}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Use Learning & Challenge Activity</div>
                <div className="text-[11px] text-slate-500">Allow AI to adapt difficulty and suggest next learning modules.</div>
              </div>
              <input
                type="checkbox"
                checked={settings.useLearningActivity}
                onChange={() => toggle('useLearningActivity')}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Use Persistent AI Memory</div>
                <div className="text-[11px] text-slate-500">Store and inspect career goals across sessions (full edit/delete available).</div>
              </div>
              <input
                type="checkbox"
                checked={settings.useAIMemory}
                onChange={() => toggle('useAIMemory')}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Allow Recruiter Smart Matching</div>
                <div className="text-[11px] text-slate-500">Surface verified profile to vetted recruiters on Recruiter Radar.</div>
              </div>
              <input
                type="checkbox"
                checked={settings.allowRecruiterSmartMatching}
                onChange={() => toggle('allowRecruiterSmartMatching')}
                className="w-4 h-4 text-indigo-600 rounded"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
