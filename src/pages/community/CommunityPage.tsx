import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, PlusCircle, Sparkles, Building2, UserCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const CommunityPage: React.FC = () => {
  const { showToast } = useToast();
  const [likes, setLikes] = useState<Record<number, number>>({ 1: 24, 2: 18 });

  const handleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    showToast('Post upvoted ✓');
  };

  const posts = [
    {
      id: 1,
      author: 'Subhani S (CSE 3rd Year)',
      college: 'Hindustan Institute of Technology',
      time: '2 hours ago',
      title: 'Looking for 1 more teammate for HACKVERSE 2.0 (React/FastAPI)',
      content: 'We have 3 members focusing on autonomous agent pipelines and need a frontend enthusiast familiar with Tailwind & React 19 to join us.'
    },
    {
      id: 2,
      author: 'Geeresh P (IT 4th Year)',
      college: 'Karpagam College of Engineering',
      time: '4 hours ago',
      title: 'NEXORA 2K26 Paper presentation topics published!',
      content: 'The official tracks on Edge Computing and Autonomous Vision systems are now live on ACE with Scopus indexing.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="STUDENT COMMUNITY & HUBS"
        title="College Campus"
        highlight="Network."
        subtitle="Connect with peer student developers, form hackathon teams, discuss symposium tracks, and share coding milestones."
        actions={
          <Button variant="primary" size="md" icon={<PlusCircle className="w-4 h-4" />}>
            + Start Discussion
          </Button>
        }
      />

      <div className="space-y-6">
        {posts.map(p => (
          <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{p.author}</h4>
                <p className="text-xs text-slate-400">{p.college} • {p.time}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-brand-700 text-[10px] font-bold">
                Discussion
              </span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white">{p.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{p.content}</p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs text-slate-500">
              <button onClick={() => handleLike(p.id)} className="flex items-center gap-1.5 hover:text-brand-600 font-semibold">
                <ThumbsUp className="w-3.5 h-3.5" /> {likes[p.id]} Upvotes
              </button>
              <button className="flex items-center gap-1.5 hover:text-brand-600 font-semibold">
                <MessageSquare className="w-3.5 h-3.5" /> Comments
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
