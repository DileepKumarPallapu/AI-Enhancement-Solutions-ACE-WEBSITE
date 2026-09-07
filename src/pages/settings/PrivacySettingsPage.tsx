import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Eye, Lock, Globe, Check, Users } from 'lucide-react';
import { VisibilityLevel } from '../../types/account';
import { useAutoSave } from '../../hooks/useAutoSave';
import { SaveStatus } from '../../components/common/SaveStatus';

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

  const autoSave = useAutoSave({
    value: {
      profileVisibility,
      showEmail,
      showPhone,
      showCollege,
      showSkills,
      showProjects,
      allowFollowers
    },
    debounceMs: 600,
    onSave: async (prefs) => {
      if (!currentUser) return;
      await updateProfile({
        privacyPreferences: {
          profileVisibility: prefs.profileVisibility,
          showEmail: prefs.showEmail,
          showPhone: prefs.showPhone,
          showCollege: prefs.showCollege,
          showLocation: true,
          showSkills: prefs.showSkills,
          showProjects: prefs.showProjects,
          showGallery: 'PUBLIC',
          showAchievements: true,
          showSocialLinks: true,
          allowFollowers: prefs.allowFollowers
        }
      });
      refreshUser();
    }
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Privacy & Visibility Preferences</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose what details are visible to campus peers and external recruiters. Edits autosave seamlessly.
          </p>
        </div>
        <SaveStatus status={autoSave.status} lastSavedAt={autoSave.lastSavedAt} />
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
          { label: 'Display Email Address Publicly', checked: showEmail, toggle: () => setShowEmail(!showEmail) },
          { label: 'Display Mobile Phone Number', checked: showPhone, toggle: () => setShowPhone(!showPhone) },
          { label: 'Display College & Academic Department', checked: showCollege, toggle: () => setShowCollege(!showCollege) },
          { label: 'Display Verified Skill Badges', checked: showSkills, toggle: () => setShowSkills(!showSkills) },
          { label: 'Display Student Project Showcase', checked: showProjects, toggle: () => setShowProjects(!showProjects) },
          { label: 'Allow Peer Students to Follow Profile', checked: allowFollowers, toggle: () => setAllowFollowers(!allowFollowers) }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{item.label}</span>
            <button
              type="button"
              onClick={item.toggle}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                item.checked ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  item.checked ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
