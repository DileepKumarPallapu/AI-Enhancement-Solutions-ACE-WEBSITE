import React, { useState, useEffect } from 'react';
import { studentCareerProfileDatabase, StudentCareerProfile } from '../../services/db/studentCareerProfileDatabase';
import { ACEPageHeader, ACECard, ACEButton, ACEInput, ACEBadge } from '../../components/ui/ace';
import { Save, CheckCircle2, Target, MapPin, DollarSign, Briefcase } from 'lucide-react';

export function StudentCareerProfilePage() {
  const [profile, setProfile] = useState<StudentCareerProfile | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProfile(studentCareerProfileDatabase.getProfile());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    studentCareerProfileDatabase.saveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Student Career Preferences & Goal"
          description="Configure your target roles, location preferences, salary expectations, and availability for intelligent opportunity matching."
          badge="CAREER PROFILE"
        />

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Career preferences saved persistently to your canonical ACE profile.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <ACECard title="Career Vision & Target Roles">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Long-term Career Objective
                </label>
                <textarea
                  rows={3}
                  value={profile.careerGoal}
                  onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Roles (comma separated)
                </label>
                <input
                  type="text"
                  value={profile.targetRoles.join(', ')}
                  onChange={(e) => setProfile({ ...profile, targetRoles: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </ACECard>

          <ACECard title="Work Preferences & Compensation">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Preferred Locations
                </label>
                <input
                  type="text"
                  value={profile.preferredLocations.join(', ')}
                  onChange={(e) => setProfile({ ...profile, preferredLocations: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Salary Expectation (INR)
                </label>
                <input
                  type="text"
                  value={profile.salaryExpectationsINR}
                  onChange={(e) => setProfile({ ...profile, salaryExpectationsINR: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Remote Preference
                </label>
                <select
                  value={profile.remotePreference}
                  onChange={(e: any) => setProfile({ ...profile, remotePreference: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="FLEXIBLE">Flexible / Any</option>
                  <option value="HYBRID">Hybrid (Office + Remote)</option>
                  <option value="REMOTE_ONLY">Remote Only</option>
                  <option value="ONSITE">Onsite Office</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Availability for Joining
                </label>
                <select
                  value={profile.availability}
                  onChange={(e: any) => setProfile({ ...profile, availability: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="IMMEDIATE">Immediate Joining</option>
                  <option value="WITHIN_1_MONTH">Within 1 Month</option>
                  <option value="WITHIN_3_MONTHS">Within 3 Months</option>
                  <option value="GRADUATION_2027">Upon 2027 Graduation</option>
                </select>
              </div>
            </div>
          </ACECard>

          <div className="flex justify-end">
            <ACEButton variant="primary" size="md" className="flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Career Profile
            </ACEButton>
          </div>
        </form>

      </div>
    </div>
  );
}
