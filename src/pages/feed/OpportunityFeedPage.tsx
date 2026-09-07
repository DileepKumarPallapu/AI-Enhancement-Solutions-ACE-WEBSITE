import React, { useState } from 'react';
import { 
  Sparkles, Bookmark, Share2, MessageSquare, ThumbsUp, 
  ExternalLink, ShieldCheck, Filter, UserCheck, Flag 
} from 'lucide-react';
import { opportunityFeedDb, FeedPostItem } from '../../services/db/opportunityFeedDatabase';
import { ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const OpportunityFeedPage: React.FC = () => {
  const [posts, setPosts] = useState<FeedPostItem[]>(opportunityFeedDb.getFeed());
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleToggleSave = (id: string) => {
    const isSaved = opportunityFeedDb.toggleSave(id);
    setPosts(prev => prev.map(p => p.id === id ? { ...p, isSaved } : p));
    showToast(isSaved ? 'Post saved to bookmarks!' : 'Post removed from bookmarks', 'success');
  };

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Feed link copied to clipboard!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Live Opportunity Feed
            </span>
            <h1 className="text-2xl font-bold text-white">Campus & Industry Stream</h1>
          </div>
        </div>

        {/* Posts Stream */}
        <div className="space-y-4">
          {posts.map((post) => (
            <ACECard key={post.id} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.authorAvatarUrl} alt={post.authorName} className="w-10 h-10 rounded-xl object-cover ring-1 ring-indigo-500" />
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                      {post.authorName}
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-indigo-400">{post.authorRole}</p>
                    <p className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <ACEBadge variant="primary">{post.type}</ACEBadge>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">{post.content}</p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
                    <ThumbsUp className="w-4 h-4" /> {post.likesCount}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" /> {post.commentsCount}
                  </button>
                  <button onClick={() => handleShare(post.content)} className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleSave(post.id)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      post.isSaved ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  {post.opportunityLink && (
                    <ACEButton size="sm" variant="primary" onClick={() => navigate(post.opportunityLink!)}>
                      View Opportunity
                    </ACEButton>
                  )}
                </div>
              </div>
            </ACECard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OpportunityFeedPage;
