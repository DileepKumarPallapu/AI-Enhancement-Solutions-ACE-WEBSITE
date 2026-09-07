import React from 'react';
import { trainingProviderDatabase } from '../../services/db/trainingProviderDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { BookOpen, Award, Users, CheckCircle2 } from 'lucide-react';

export function TrainingProviderPortalPage() {
  const courses = trainingProviderDatabase.getCourses();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Training Provider & Academy Portal"
          description="Accredited vocational certification programs, cohort progress management, and verified badge issuance."
          badge="TRAINING PROVIDER"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <ACEBadge variant="primary">{c.category}</ACEBadge>
                <span className="text-xs text-slate-500">{c.durationWeeks} Weeks</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{c.title}</h4>
                <p className="text-xs text-slate-500 mt-1">Provider: {c.providerName}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="text-slate-500">Enrolled Students</div>
                  <div className="font-bold text-slate-900 dark:text-white text-base">{c.totalEnrolled}</div>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="text-slate-500">Completion Rate</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base">{c.completionRate}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
