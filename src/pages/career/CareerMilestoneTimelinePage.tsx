import React from 'react';
import { interviewAndOfferDatabase } from '../../services/db/interviewAndOfferDatabase';
import { ACEPageHeader, ACECard, ACEBadge } from '../../components/ui/ace';
import { CheckCircle2, Award, Calendar } from 'lucide-react';

export function CareerMilestoneTimelinePage() {
  const milestones = interviewAndOfferDatabase.getMilestones();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Career Milestone Timeline"
          description="Chronological journey from admission to verified learning, competitions, projects, and career placements."
          badge="STUDENT TIMELINE"
        />

        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 space-y-8 py-4">
          {milestones.map((m) => (
            <div key={m.id} className="relative pl-6">
              <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                ✓
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <ACEBadge variant="primary">{m.category}</ACEBadge>
                  <span className="text-xs text-slate-500">{m.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{m.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{m.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
