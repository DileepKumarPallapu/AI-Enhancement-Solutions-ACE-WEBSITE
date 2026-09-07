import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera, Image as ImageIcon, Check, RefreshCw, Sparkles } from 'lucide-react';
import { accountDb } from '../../services/db/accountDatabase';

export const PhotoManagementPage: React.FC = () => {
  const { currentUser, updateProfile, refreshUser } = useAuth();
  
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(currentUser?.coverPhotoUrl || '');
  const [coverTheme, setCoverTheme] = useState(currentUser?.coverTheme || 'cosmic_indigo');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  ];

  const COVER_PRESETS = [
    { id: 'cosmic_indigo', name: 'Cosmic Indigo', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600' },
    { id: 'midnight_cyber', name: 'Midnight Cyber', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600' },
    { id: 'emerald_aurora', name: 'Emerald Aurora', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600' },
    { id: 'sunset_blaze', name: 'Sunset Blaze', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600' }
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);

    await updateProfile({
      avatarUrl,
      coverPhotoUrl,
      coverTheme
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Photo Studio & Branding</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Customize your public avatar and dynamic cover banner.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Sparkles className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Apply Photo Changes'}
        </button>
      </div>

      {/* Avatar Section */}
      <div className="space-y-4">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          Profile Avatar
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500 shadow-md bg-white dark:bg-slate-800"
          />
          <div className="flex-1 space-y-3 w-full">
            <input
              type="text"
              value={avatarUrl}
              onChange={e => setAvatarUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
              placeholder="Avatar image URL..."
            />
            <div className="flex gap-2">
              {AVATAR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatarUrl(preset)}
                  className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition ${
                    avatarUrl === preset ? 'border-indigo-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Banner */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          Cover Banner
        </label>
        <div className="h-32 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <img src={coverPhotoUrl} alt="Cover" className="w-full h-full object-cover" />
        </div>
        <input
          type="text"
          value={coverPhotoUrl}
          onChange={e => setCoverPhotoUrl(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
          placeholder="Cover image URL..."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COVER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setCoverPhotoUrl(preset.url);
                setCoverTheme(preset.id);
              }}
              className={`p-2 rounded-xl border text-left transition ${
                coverPhotoUrl === preset.url
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="h-12 rounded-lg overflow-hidden mb-1">
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};
