import React from 'react';
import { Layers, Lock, CheckCircle2, Sparkles, ArrowDown } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useLearnPlay } from '../../context/LearnPlayContext';

export const SkillTreePage: React.FC = () => {
  const { skillNodes } = useLearnPlay();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="MASTERY ROADMAP"
        title="Programming Visual"
        highlight="Skill Tree."
        subtitle="Unlock progressive computer science milestones by solving validated micro-tasks and coding challenges."
      />

      <div className="space-y-6">
        {skillNodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div className={`p-6 rounded-3xl border transition-all flex items-center justify-between ${
              node.completed 
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                : node.unlocked 
                  ? 'bg-white dark:bg-slate-900 border-brand-400 shadow-md' 
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{node.icon}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-brand-700">
                      Tier {node.level}
                    </span>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">{node.name}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{node.description}</p>
                </div>
              </div>

              <div>
                {node.completed ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
                  </span>
                ) : node.unlocked ? (
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-800 text-xs font-bold">
                    In Progress
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                )}
              </div>
            </div>

            {i < skillNodes.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-slate-300" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};
