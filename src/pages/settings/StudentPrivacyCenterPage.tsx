import React, { useState } from 'react';
import { studentPrivacyDatabase, StudentPrivacySettings } from '../../services/db/studentPrivacyDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Lock, Shield, CheckCircle2, Save } from 'lucide-react';

export function StudentPrivacyCenterPage() {
  const [settings, setSettings] = useState<StudentPrivacySettings>(studentPrivacyDatabase.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggle = (key: keyof StudentPrivacySettings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings({ ...settings, [key]: !settings[key] });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    studentPrivacyDatabase.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Student Privacy & Discoverability Center"
          description="Fine-grained controls regulating what recruiters, college administrators, and peers can view across your Digital Student Passport."
          badge="PRIVACY CONTROLS"
        />

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Privacy preferences saved persistently.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <ACECard title="Discoverability & Visibility Toggles">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">Public Profile Discoverability</div>
                  <div className="text-xs text-slate-500">Allow your public profile /u/username to appear in search indexes.</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.isPublicProfileDiscoverable}
                  onChange={() => toggle('isPublicProfileDiscoverable')}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">Recruiter Talent Radar Visibility</div>
                  <div className="text-xs text-slate-500">Allow verified enterprise recruiters to discover your verified skill competencies.</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.recruiterRadarVisible}
                  onChange={() => toggle('recruiterRadarVisible')}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">Show CGPA on Public Resumes</div>
                  <div className="text-xs text-slate-500">Include your official cumulative grade point average on shared resume links.</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showGpaOnPublicResume}
                  onChange={() => toggle('showGpaOnPublicResume')}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

            </div>
          </ACECard>

          <div className="flex justify-end">
            <ACEButton variant="primary" size="md" className="flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Privacy Preferences
            </ACEButton>
          </div>
        </form>

      </div>
    </div>
  );
}
