import React from 'react';
import { creatorEcosystemDatabase } from '../../services/db/creatorEcosystemDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { BookOpen, Eye, Heart, Award } from 'lucide-react';

export function CreatorEcosystemPage() {
  const posts = creatorEcosystemDatabase.getCreatorPosts();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Student Creator Ecosystem"
          description="Publish technical guides, engineering project walkthroughs, and earn verified coin rewards for peer learning."
          badge="CREATOR HUB"
          actions={
            <ACEButton variant="primary" size="sm">Write Article</ACEButton>
          }
        />

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <ACEBadge variant="primary">{post.topic}</ACEBadge>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                  +{post.rewardEarnedCoins} ACE Coins Earned
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">{post.title}</h3>
              <div className="text-xs text-slate-500">By {post.authorName} • {post.authorInstitution}</div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.viewsCount} views</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500" /> {post.likesCount} likes</span>
                </div>
                <span>Published: {post.publishedDate}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
