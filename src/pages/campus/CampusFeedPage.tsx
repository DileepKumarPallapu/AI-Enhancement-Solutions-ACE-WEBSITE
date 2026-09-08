import React, { useState } from 'react';
import { campusFeedDatabase, CampusFeedItem } from '../../services/db/campusFeedDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Bell, Heart, Trophy, Rocket, Sparkles, Bookmark, Share2, Filter, ExternalLink, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CampusFeedPage() {
  const [filter, setFilter] = useState<string>('ALL');
  const [feedItems, setFeedItems] = useState<CampusFeedItem[]>(campusFeedDatabase.getCampusFeed('inst-vel-tech-rangarajan-avadi', filter));

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);
    setFeedItems(campusFeedDatabase.getCampusFeed('inst-vel-tech-rangarajan-avadi', newFilter));
  };

  const handleReaction = (id: string, type: 'LIKE' | 'CELEBRATE' | 'USEFUL') => {
    campusFeedDatabase.toggleReaction(id, type);
    setFeedItems(campusFeedDatabase.getCampusFeed('inst-vel-tech-rangarajan-avadi', filter));
  };

  const handleBookmark = (id: string) => {
    campusFeedDatabase.toggleBookmark(id);
    setFeedItems(campusFeedDatabase.getCampusFeed('inst-vel-tech-rangarajan-avadi', filter));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="Campus Feed — Vel Tech R&D Institute"
          description="Live verified announcements, faculty research updates, hackathons, and student project launches."
          badge="CAMPUS OPERATING SYSTEM"
          actions={
            <div className="flex gap-2">
              <Link to="/community">
                <ACEButton variant="outline" size="sm">
                  Communities
                </ACEButton>
              </Link>
              <Link to="/deadlines">
                <ACEButton variant="primary" size="sm">
                  Deadlines
                </ACEButton>
              </Link>
            </div>
          }
        />

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['ALL', 'ANNOUNCEMENT', 'COMPETITION', 'PROJECT_LAUNCH'].map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {cat === 'ALL' ? '🌟 All Updates' : cat === 'ANNOUNCEMENT' ? '📢 Announcements' : cat === 'COMPETITION' ? '⚡ Competitions' : '🚀 Projects'}
            </button>
          ))}
        </div>

        {/* Feed Stream */}
        <div className="space-y-4">
          {feedItems.map(item => (
            <ACECard key={item.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={item.authorAvatar} alt={item.authorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.authorName}</h4>
                      {item.authorBadge && (
                        <ACEBadge variant="neutral" size="sm">{item.authorBadge}</ACEBadge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{item.institutionName} • {new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <ACEBadge variant={item.type === 'ANNOUNCEMENT' ? 'warning' : item.type === 'COMPETITION' ? 'primary' : 'success'} size="sm">
                  {item.type}
                </ACEBadge>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.content}</p>
              </div>

              {item.mediaUrl && (
                <div className="rounded-2xl overflow-hidden max-h-72">
                  <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action and Engagement Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReaction(item.id, 'LIKE')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      item.userReaction === 'LIKE'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>{item.reactionsCount.like}</span>
                  </button>
                  <button
                    onClick={() => handleReaction(item.id, 'CELEBRATE')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      item.userReaction === 'CELEBRATE'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>🎉</span>
                    <span>{item.reactionsCount.celebrate}</span>
                  </button>
                  <button
                    onClick={() => handleReaction(item.id, 'USEFUL')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      item.userReaction === 'USEFUL'
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.reactionsCount.useful}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBookmark(item.id)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      item.isBookmarked
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 text-indigo-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <Link to={item.actionUrl}>
                    <ACEButton variant="primary" size="sm" className="flex items-center gap-1.5">
                      <span>{item.actionLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </ACEButton>
                  </Link>
                </div>
              </div>
            </ACECard>
          ))}
        </div>
      </div>
    </div>
  );
}
