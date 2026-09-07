import React, { useState, useEffect } from 'react';
import { interviewAndOfferDatabase, InterviewPreparationItem } from '../../services/db/interviewAndOfferDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Briefcase, CheckSquare, Square, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InterviewPrepCenterPage() {
  const [preps, setPreps] = useState<InterviewPreparationItem[]>([]);

  useEffect(() => {
    setPreps(interviewAndOfferDatabase.getInterviewPreps());
  }, []);

  const toggleTask = (prepId: string, taskIdx: number) => {
    const updated = preps.map(p => {
      if (p.id === prepId) {
        const nextChecklist = [...p.checklist];
        nextChecklist[taskIdx].done = !nextChecklist[taskIdx].done;
        return { ...p, checklist: nextChecklist };
      }
      return p;
    });
    setPreps(updated);
    interviewAndOfferDatabase.savePreps(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Interview Preparation Center"
          description="Track scheduled company interview panels, technical checklists, revision topics, and launch AI mock simulations."
          badge="INTERVIEW PREP"
          actions={
            <Link to="/career/interview-ai">
              <ACEButton variant="primary" size="sm" className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> AI Interview Simulator
              </ACEButton>
            </Link>
          }
        />

        <div className="space-y-6">
          {preps.map((prep) => (
            <ACECard key={prep.id} title={`${prep.companyName} — ${prep.targetRole}`} badge={prep.mode}>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span>Interview Date: <strong>{new Date(prep.interviewDate).toLocaleString()}</strong></span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{prep.status}</span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preparation Checklist</div>
                  <div className="space-y-2">
                    {prep.checklist.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleTask(prep.id, idx)}
                        className="w-full text-left flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
                      >
                        {c.done ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                        <span className={c.done ? 'line-through text-slate-400' : ''}>{c.task}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Focus Topics</div>
                  <div className="flex flex-wrap gap-1.5">
                    {prep.keyTopics.map((t, idx) => (
                      <ACEBadge key={idx} variant="neutral">{t}</ACEBadge>
                    ))}
                  </div>
                </div>
              </div>
            </ACECard>
          ))}
        </div>

      </div>
    </div>
  );
}
