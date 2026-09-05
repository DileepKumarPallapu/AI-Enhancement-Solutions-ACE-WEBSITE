import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Trophy, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useLearnPlay } from '../../context/LearnPlayContext';

export const StudentAchievementsPage: React.FC = () => {
  const { badges, completedTaskIds } = useLearnPlay();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/learn-play" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">ACHIEVEMENT BADGES</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Verified Student Achievements</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="MILESTONES & HONORS"
        title="Student Badges &"
        highlight="Honors."
        subtitle="Earned by completing qualifying daily missions, coding streaks, and verified assessments."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {badges.map(b => {
          const isUnlocked = completedTaskIds.length > 0;
          return (
            <div
              key={b.id}
              className={`p-6 sm:p-8 rounded-3xl border space-y-4 shadow-xs flex flex-col justify-between ${
                isUnlocked 
                  ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800' 
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="text-4xl">{b.icon}</div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{b.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                {isUnlocked ? (
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked & Verified
                  </span>
                ) : (
                  <span className="text-slate-400 font-bold text-xs flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Locked Milestone
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
