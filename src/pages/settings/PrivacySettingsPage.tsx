import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, ShieldCheck, Check } from 'lucide-react';
import { PrivacyPreferences } from '../../types/account';

export const PrivacySettingsPage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  
  const defaultPrivacy: PrivacyPreferences = {
    profileVisibility: 'PUBLIC',
    showEmail: false,
    showPhone: false,
    showCollege: true,
    showLocation: true,
    showSkills: true,
    showProjects: true,
    showEducation: true,
    allowDirectMessages: true,
    showActivityOnFeed: true,
    showGallery: 'PUBLIC',
    showAchievements: true,
    showSocialLinks: true,
    allowFollowers: true,
  };

  const [privacy, setPrivacy] = useState<PrivacyPreferences>(
    currentUser?.privacy || currentUser?.privacyPreferences || defaultPrivacy
  );

  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ privacy, privacyPreferences: privacy });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            Privacy & Visibility Preferences
          </h2>
          <p className="text-xs text-slate-400">Control who can discover and view your academic & event profile details.</p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow-lg shadow-indigo-600/30"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4" />}
          {saved ? 'Saved Preferences!' : 'Save Privacy'}
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Privacy preferences updated successfully.</span>
        </div>
      )}

      {/* Profile Visibility Level */}
      <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
        <label className="block text-sm font-bold text-white">Global Profile Visibility</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { level: 'PUBLIC', title: 'Public (Recommended)', desc: 'Visible to everyone on the ACE network.' },
            { level: 'COLLEGE_ONLY', title: 'College Network Only', desc: 'Visible only to students and verified faculty from your college.' },
            { level: 'PRIVATE', title: 'Private', desc: 'Hidden from search directories. Only followers can view.' }
          ].map((opt) => (
            <button
              key={opt.level}
              type="button"
              onClick={() => setPrivacy({ ...privacy, profileVisibility: opt.level as any })}
              className={`p-4 rounded-2xl border text-left transition ${
                privacy.profileVisibility === opt.level
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-xs text-white mb-1">{opt.title}</div>
              <div className="text-[11px] text-slate-400 leading-relaxed">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Field Level Toggles */}
      <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Data Field Visibility</h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-white block">Display Email on Public Profile</span>
              <span className="text-[11px] text-slate-400">Show {currentUser?.email} to campus organizers</span>
            </div>
            <input
              type="checkbox"
              checked={privacy.showEmail}
              onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-white block">Display Phone Number</span>
              <span className="text-[11px] text-slate-400">Show verified mobile number on resume download</span>
            </div>
            <input
              type="checkbox"
              checked={privacy.showPhone}
              onChange={(e) => setPrivacy({ ...privacy, showPhone: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-white block">Display Education Details</span>
              <span className="text-[11px] text-slate-400">Include institution, degree, and GPA</span>
            </div>
            <input
              type="checkbox"
              checked={privacy.showEducation}
              onChange={(e) => setPrivacy({ ...privacy, showEducation: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-white block">Allow Direct In-App Messages</span>
              <span className="text-[11px] text-slate-400">Let event organizers and peer students message you</span>
            </div>
            <input
              type="checkbox"
              checked={privacy.allowDirectMessages}
              onChange={(e) => setPrivacy({ ...privacy, allowDirectMessages: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
            />
          </label>
        </div>
      </div>

    </form>
  );
};
