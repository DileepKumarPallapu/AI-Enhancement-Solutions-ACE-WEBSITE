import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, PlusCircle, Sparkles, Building2, UserCheck, X, Send } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { communityDb, CommunityPost } from '../../services/db/communityDatabase';
import { useAuth } from '../../context/AuthContext';

export const CommunityPage: React.FC = () => {
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [posts, setPosts] = useState<CommunityPost[]>(() => communityDb.getPosts());
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Post Creation State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('DISCUSSION');
  const [newTags, setNewTags] = useState('');

  // Comment State per post
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const refreshPosts = () => {
    setPosts(communityDb.getPosts());
  };

  const handleLike = (postId: string) => {
    const res = communityDb.toggleUpvote(postId, userId);
    refreshPosts();
    showToast(res.upvoted ? 'Post upvoted ✓' : 'Upvote removed');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Please fill in title and content');
      return;
    }

    const tagsArray = newTags.split(',').map(t => t.trim()).filter(Boolean);

    communityDb.createPost({
      authorId: userId,
      authorName: currentUser?.fullName || 'Dileep Kumar',
      authorRole: currentUser?.role || 'STUDENT',
      authorCollege: currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      authorAvatar: currentUser?.avatarUrl,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: tagsArray.length > 0 ? tagsArray : ['Community', 'Campus']
    });

    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setShowCreateModal(false);
    refreshPosts();
    showToast('Discussion posted successfully to campus network! 🎉');
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    communityDb.addComment(postId, {
      authorId: userId,
      authorName: currentUser?.fullName || 'Dileep Kumar',
      authorRole: currentUser?.role || 'STUDENT',
      authorCollege: currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      content: commentText.trim()
    });

    setCommentText('');
    refreshPosts();
    showToast('Comment posted ✓');
  };

  const filteredPosts = filterCategory === 'ALL'
    ? posts
    : posts.filter(p => p.category === filterCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="STUDENT COMMUNITY & HUBS"
        title="College Campus"
        highlight="Network."
        subtitle="Connect with peer student developers, form hackathon teams, discuss symposium tracks, and share coding milestones."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setShowCreateModal(true)}
          >
            + Start Discussion
          </Button>
        }
      />

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-semibold">
        {[
          { id: 'ALL', label: 'All Discussions' },
          { id: 'TEAMMATE_SEARCH', label: '👥 Team Match' },
          { id: 'DISCUSSION', label: '💬 General' },
          { id: 'ANNOUNCEMENT', label: '📢 Announcements' },
          { id: 'QUESTION', label: '❓ Q&A' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition ${
              filterCategory === cat.id
                ? 'bg-brand-600 text-white font-bold'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map(p => {
          const isLiked = p.upvotes.includes(userId);
          const isCommentOpen = activeCommentPostId === p.id;

          return (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{p.authorName}</h4>
                  <p className="text-xs text-slate-400">{p.authorCollege} • {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-brand-700 dark:text-brand-300 text-[10px] font-bold">
                  {p.category.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white">{p.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{p.content}</p>

              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs text-slate-500">
                <button
                  onClick={() => handleLike(p.id)}
                  className={`flex items-center gap-1.5 font-semibold transition ${
                    isLiked ? 'text-brand-600 font-bold' : 'hover:text-brand-600'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} /> {p.upvotes.length} Upvotes
                </button>
                <button
                  onClick={() => setActiveCommentPostId(isCommentOpen ? null : p.id)}
                  className="flex items-center gap-1.5 hover:text-brand-600 font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> {p.comments.length} Comments
                </button>
              </div>

              {/* Comments Section */}
              {isCommentOpen && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="space-y-2">
                    {p.comments.map(c => (
                      <div key={c.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                          <span>{c.authorName}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{c.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a constructive reply..."
                      className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(p.id);
                      }}
                    />
                    <Button variant="primary" size="sm" onClick={() => handleAddComment(p.id)}>
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Create Discussion Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Start New Campus Discussion</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none"
                >
                  <option value="DISCUSSION">General Discussion</option>
                  <option value="TEAMMATE_SEARCH">Hackathon Teammate Search</option>
                  <option value="QUESTION">Technical Q&A</option>
                  <option value="ANNOUNCEMENT">Symposium Announcement</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Looking for 1 frontend developer for HackVerse 2.0"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Details</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your question, project idea, or teammate requirements..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. React, Hackathon, AI"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Publish Discussion
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
