import React, { useState, useEffect } from 'react';
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { bookmarkDb, SavedBookmark, BookmarkType } from '../../services/db/bookmarkDatabase';
import { useAuth } from '../../context/AuthContext';

export const SavedBookmarksPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const [activeTab, setActiveTab] = useState<BookmarkType>('ALL');
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([]);

  useEffect(() => {
    setBookmarks(bookmarkDb.getByUser(currentUserId, activeTab));
    const unsub = bookmarkDb.subscribe(() => {
      setBookmarks(bookmarkDb.getByUser(currentUserId, activeTab));
    });
    return unsub;
  }, [currentUserId, activeTab]);

  const tabs: { type: BookmarkType; label: string }[] = [
    { type: 'ALL', label: 'All Saved' },
    { type: 'OPPORTUNITY', label: 'Opportunities' },
    { type: 'COURSE', label: 'Learning' },
    { type: 'MENTOR', label: 'Faculty Mentors' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Bookmark className="w-8 h-8 text-emerald-400" /> Unified Bookmarks Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Access your saved hackathons, courses, opportunities, and faculty profiles.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          {tabs.map(t => (
            <button
              key={t.type}
              onClick={() => setActiveTab(t.type)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === t.type
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
              No saved items in this category.
            </div>
          ) : (
            bookmarks.map(bm => (
              <div key={bm.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">{bm.type}</span>
                  <h3 className="text-sm font-bold text-white">{bm.title}</h3>
                  <p className="text-slate-400">{bm.subtitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={bm.targetUrl}
                    className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium inline-flex items-center gap-1"
                  >
                    Open <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
