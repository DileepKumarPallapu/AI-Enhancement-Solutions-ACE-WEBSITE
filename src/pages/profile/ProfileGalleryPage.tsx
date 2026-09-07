import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useParams } from 'react-router-dom';
import { accountDb } from '../../services/db/accountDatabase';
import { GalleryImage } from '../../types/account';
import {
  Image as ImageIcon, Plus, Trash2, ArrowLeft, Sparkles, X,
  ChevronLeft, ChevronRight, Download, UserCheck, ShieldCheck, Check
} from 'lucide-react';

export const ProfileGalleryPage: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  const { currentUser, deleteGalleryImage, addGalleryImage, updateProfile, refreshUser } = useAuth();
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newAlbum, setNewAlbum] = useState('Events');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // Target user gallery
  const targetUser = username
    ? accountDb.getAccountByUsername(username.replace('@', '')) || currentUser
    : currentUser;

  const isOwner = currentUser && targetUser && currentUser.id === targetUser.id;
  const gallery = targetUser ? accountDb.getGalleryImages(targetUser.id) : [];

  const filtered = selectedAlbum === 'all'
    ? gallery
    : gallery.filter((img) => (img.albumId || 'Events').toLowerCase() === selectedAlbum.toLowerCase());

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !currentUser) return;
    addGalleryImage({
      url: newUrl.trim(),
      caption: newCaption.trim() || 'ACE Event Photo',
      albumId: newAlbum,
      visibility: 'PUBLIC'
    });
    setNewUrl('');
    setNewCaption('');
    setShowAddModal(false);
    setToastMsg('Photo added to your gallery!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSetAsAvatar = async (url: string) => {
    if (!currentUser) return;
    await updateProfile({ avatarUrl: url });
    refreshUser();
    setToastMsg('Profile avatar updated!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSetAsCover = async (url: string) => {
    if (!currentUser) return;
    await updateProfile({ coverPhotoUrl: url });
    refreshUser();
    setToastMsg('Cover photo updated!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const activeImage = lightboxIndex !== null && filtered[lightboxIndex] ? filtered[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Toast Notification */}
        {toastMsg && (
          <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
            <Check className="w-4 h-4" /> {toastMsg}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link
              to={targetUser ? `/profile/@${targetUser.username}` : '/profile'}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to @{targetUser?.username || 'Profile'}
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <ImageIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              Photo Studio & Gallery
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Showcasing campus presentations, hackathon wins, team collaborations, and event highlights.
            </p>
          </div>

          {isOwner && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition"
            >
              <Plus className="w-4 h-4" /> Add New Photo
            </button>
          )}
        </div>

        {/* Album Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
          {['all', 'Events', 'Hackathons', 'Campus', 'Projects', 'Awards'].map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                selectedAlbum === album
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No photos in this album</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {isOwner
                ? 'Upload photos from your recent workshops, project demos, or campus gatherings.'
                : 'This user has not uploaded any photos in this category yet.'}
            </p>
            {isOwner && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition"
              >
                Upload Photo
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div
                  onClick={() => setLightboxIndex(idx)}
                  className="relative h-48 w-full cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
                >
                  <img
                    src={img.thumbnailUrl || img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                    <p className="text-xs text-white font-medium line-clamp-2">{img.caption}</p>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {img.albumId || 'Events'}
                  </span>

                  {isOwner && (
                    <button
                      onClick={() => deleteGalleryImage(img.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {activeImage && lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10 hidden sm:block"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {lightboxIndex < filtered.length - 1 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10 hidden sm:block"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
              <img
                src={activeImage.url}
                alt={activeImage.caption}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl mb-4"
              />

              <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 w-full text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm">{activeImage.caption}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">Album: {activeImage.albumId || 'Events'}</div>
                </div>

                {isOwner && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSetAsAvatar(activeImage.url)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Set as Avatar
                    </button>
                    <button
                      onClick={() => handleSetAsCover(activeImage.url)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-semibold text-white transition flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> Set as Cover
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Photo Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Photo to Gallery</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Image Direct URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Caption / Description
                  </label>
                  <input
                    type="text"
                    required
                    value={newCaption}
                    onChange={e => setNewCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                    placeholder="e.g., Presenting our AI platform at Hackfest 2026"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Album Category
                  </label>
                  <select
                    value={newAlbum}
                    onChange={e => setNewAlbum(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="Events">Events</option>
                    <option value="Hackathons">Hackathons</option>
                    <option value="Campus">Campus</option>
                    <option value="Projects">Projects</option>
                    <option value="Awards">Awards</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
