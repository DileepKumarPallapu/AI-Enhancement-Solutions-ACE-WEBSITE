import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Eye, Lock, Globe, Check, Users } from 'lucide-react';
import { accountDb } from '../../services/db/accountDatabase';
import { VisibilityLevel } from '../../types/account';

export const PrivacySettingsPage: React.FC = () => {
  const { currentUser, updateProfile, refreshUser } = useAuth();

  const [profileVisibility, setProfileVisibility] = useState<VisibilityLevel>(
    (currentUser?.privacyPreferences?.profileVisibility as VisibilityLevel) || 'PUBLIC'
  );
  const [showEmail, setShowEmail] = useState(currentUser?.privacyPreferences?.showEmail || false);
  const [showPhone, setShowPhone] = useState(currentUser?.privacyPreferences?.showPhone || false);
  const [showCollege, setShowCollege] = useState(currentUser?.privacyPreferences?.showCollege !== false);
  const [showSkills, setShowSkills] = useState(currentUser?.privacyPreferences?.showSkills !== false);
  const [showProjects, setShowProjects] = useState(currentUser?.privacyPreferences?.showProjects !== false);
  const [allowFollowers, setAllowFollowers] = useState(currentUser?.privacyPreferences?.allowFollowers !== false);

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);

    await updateProfile({
      privacyPreferences: {
        profileVisibility,
        showEmail,
        showPhone,
        showCollege,
        showLocation: true,
        showSkills,
        showProjects,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers
      }
    });
    refreshUser();

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Privacy & Visibility Preferences</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose what details are visible to campus peers and external recruiters.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Shield className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Privacy'}
        </button>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          Profile Visibility Scope
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'PUBLIC', label: 'Public (Everyone)', desc: 'Visible to all students, mentors & recruiters' },
            { id: 'COLLEGE_ONLY', label: 'Campus Only', desc: 'Only members of your college institution' },
            { id: 'PRIVATE', label: 'Private (Invite Only)', desc: 'Only users you explicitly approve' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setProfileVisibility(item.id as VisibilityLevel)}
              className={`p-3 rounded-2xl border text-left transition ${
                profileVisibility === item.id
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
          Detail Visibility Toggles
        </label>

        {[
          { label: 'Display College and Department on Public Profile', value: showCollege, setter: setShowCollege },
          { label: 'Display Verified Skills & Tech Stack', value: showSkills, setter: setShowSkills },
          { label: 'Display Featured Projects & Portfolios', value: showProjects, setter: setShowProjects },
          { label: 'Allow Peer Students to Follow Me', value: allowFollowers, setter: setAllowFollowers },
          { label: 'Display Email Address on Profile', value: showEmail, setter: setShowEmail },
          { label: 'Display Phone Number on Profile', value: showPhone, setter: setShowPhone },
        ].map((t, i) => (
          <label
            key={i}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{t.label}</span>
            <input
              type="checkbox"
              checked={t.value}
              onChange={e => t.setter(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
            />
          </label>
        ))}
      </div>
    </form>
  );
};
