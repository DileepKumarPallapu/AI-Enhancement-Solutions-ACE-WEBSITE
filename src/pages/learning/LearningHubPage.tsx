import React from 'react';
import { BookOpen, CheckCircle2, Play, Award, Sparkles, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';

export const LearningHubPage: React.FC = () => {
  const paths = [
    {
      id: 'python-beginner',
      title: 'Python for Beginners & Data Science',
      modules: 7,
      completed: 4,
      level: 'Beginner',
      xp: '350 XP',
      topics: ['Variables & Types', 'Control Flow', 'Functions', 'OOP Concepts', 'Pandas & NumPy']
    },
    {
      id: 'dsa-mastery',
      title: 'Data Structures & Algorithms in C++/Java',
      modules: 12,
      completed: 3,
      level: 'Intermediate',
      xp: '800 XP',
      topics: ['Arrays & Strings', 'Linked Lists', 'Trees & BST', 'Dynamic Programming', 'Graph Algorithms']
    },
    {
      id: 'fullstack-web',
      title: 'Full-Stack Modern Web (React & Node.js)',
      modules: 9,
      completed: 6,
      level: 'All Levels',
      xp: '600 XP',
      topics: ['React 19 & Tailwind', 'REST APIs', 'PostgreSQL & Prisma', 'Authentication', 'Deployment']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="ACE LEARNING ACADEMY"
        title="Structured Learning"
        highlight="Paths & Roadmaps."
        subtitle="Follow curated curriculum paths designed by engineers from top tech colleges and earn verified skill badges."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map(p => {
          const progress = Math.round((p.completed / p.modules) * 100);
          return (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-brand-700 dark:text-brand-300 font-bold text-xs">
                    {p.level}
                  </span>
                  <span className="text-xs font-bold text-amber-600">{p.xp}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{p.title}</h3>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{p.completed} of {p.modules} Modules</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="pt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  {p.topics.slice(0, 3).map((t, i) => (
                    <p key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {t}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button variant="primary" size="sm" className="w-full" icon={<Play className="w-3.5 h-3.5" />}>
                  Continue Path ({progress}%) →
                </Button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
