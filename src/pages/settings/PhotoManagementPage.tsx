import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Image, Camera, Check, Sparkles, RefreshCw, Layers } from 'lucide-react';

export const PhotoManagementPage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(currentUser?.coverPhotoUrl || '');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400'
  ];

  const presetCovers = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600'
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({
      avatarUrl,
      coverPhotoUrl
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-400" />
            Avatar & Banner Studio
          </h2>
          <p className="text-xs text-slate-400">Customize your public profile photography and banner visual identity.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Layers className="w-4 h-4" />}
          {saved ? 'Photos Saved!' : saving ? 'Updating...' : 'Save Photos'}
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Photos updated successfully across the entire ACE ecosystem!</span>
        </div>
      )}

      {/* Live Preview Card */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-400 uppercase">Live Combined Preview</label>
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="h-44 w-full bg-slate-900">
            <img src={coverPhotoUrl} alt="Cover Preview" className="w-full h-full object-cover" />
          </div>
          <div className="px-6 pb-6 pt-0 relative flex items-end justify-between -mt-12">
            <div className="flex items-end gap-4">
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-950 shadow-2xl"
              />
              <div className="pb-1">
                <h3 className="text-lg font-bold text-white">{currentUser?.fullName}</h3>
                <p className="text-xs text-indigo-400 font-mono">@{currentUser?.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Photo Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white">1. Profile Avatar Photo</h3>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Direct Image URL</label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <span className="block text-xs text-slate-500 mb-2">Or choose a pre-styled avatar:</span>
          <div className="flex flex-wrap gap-3">
            {presetAvatars.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAvatarUrl(url)}
                className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition ${
                  avatarUrl === url ? 'border-indigo-500 scale-105 shadow-lg shadow-indigo-500/30' : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cover Banner Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white">2. Cover Banner Artwork</h3>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Direct Banner Image URL</label>
          <input
            type="url"
            value={coverPhotoUrl}
            onChange={(e) => setCoverPhotoUrl(e.target.value)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <span className="block text-xs text-slate-500 mb-2">Or select from featured background themes:</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {presetCovers.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCoverPhotoUrl(url)}
                className={`h-20 rounded-2xl overflow-hidden border-2 transition ${
                  coverPhotoUrl === url ? 'border-indigo-500 scale-[1.02] shadow-lg shadow-indigo-500/30' : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <img src={url} alt={`Cover Preset ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

    </form>
  );
};
