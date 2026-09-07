import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Plus, Trash2, ArrowLeft, Eye, Heart, Sparkles } from 'lucide-react';

export const ProfileGalleryPage: React.FC = () => {
  const { currentUser, deleteGalleryImage, addGalleryImage } = useAuth();
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newAlbum, setNewAlbum] = useState('Events');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
        <p className="text-slate-400 mb-4">Please log in to manage your gallery.</p>
        <Link to="/login" className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium">Log In</Link>
      </div>
    );
  }

  const gallery = currentUser.gallery || [];
  const filtered = selectedAlbum === 'all'
    ? gallery
    : gallery.filter((img) => (img.albumId || 'Events').toLowerCase() === selectedAlbum.toLowerCase());

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    addGalleryImage({
      url: newUrl.trim(),
      caption: newCaption.trim() || 'ACE Photo',
      albumId: newAlbum,
      visibility: 'PUBLIC'
    });
    setNewUrl('');
    setNewCaption('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/profile" className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <ImageIcon className="w-8 h-8 text-indigo-400" />
              Photo Studio & Gallery
            </h1>
            <p className="text-slate-400 text-sm">
              Showcase your event memories, hackathons, campus presentations, and certifications.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition"
          >
            <Plus className="w-5 h-5" /> Add New Photo
          </button>
        </div>

        {/* Album Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {['all', 'Events', 'Hackathons', 'Campus', 'Projects', 'Awards'].map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                selectedAlbum === album
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No photos in this album</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Upload photos from your recent workshops, project demos, or campus gatherings.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium"
            >
              Upload Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => deleteGalleryImage(item.id)}
                      className="p-1.5 rounded-lg bg-slate-900/80 text-rose-400 hover:bg-rose-500 hover:text-white backdrop-blur-md transition shadow"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <p className="text-sm font-medium text-white truncate">{item.caption}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-indigo-400">{item.albumId}</span>
                    <span>{item.visibility}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Add Photo to Gallery</h3>
            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Caption / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Winner at Hackathon 2026"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Album</label>
                <select
                  value={newAlbum}
                  onChange={(e) => setNewAlbum(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Events">Events</option>
                  <option value="Hackathons">Hackathons</option>
                  <option value="Campus">Campus</option>
                  <option value="Projects">Projects</option>
                  <option value="Awards">Awards</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
