import React, { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { careerDb, UserApplication, OpportunityStatus } from '../../services/db/careerDatabase';
import { useAuth } from '../../context/AuthContext';

export const StudentApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const [apps, setApps] = useState<UserApplication[]>([]);

  useEffect(() => {
    setApps(careerDb.getApplications(currentUserId));
    const unsub = careerDb.subscribe(() => {
      setApps(careerDb.getApplications(currentUserId));
    });
    return unsub;
  }, [currentUserId]);

  const stages: OpportunityStatus[] = ['APPLIED', 'OA_SCHEDULED', 'INTERVIEWING', 'OFFER_RECEIVED'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Student Application Ledger</h1>
          <p className="text-slate-400 text-sm mt-1">
            Track active interview cycles, fellowships, and competition submissions in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map(stage => {
            const stageApps = apps.filter(a => a.status === stage);
            return (
              <div key={stage} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 min-h-[350px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300 uppercase">{stage.replace('_', ' ')}</span>
                  <span className="px-2 py-0.5 bg-slate-950 rounded-full text-[10px] font-bold text-slate-400">{stageApps.length}</span>
                </div>

                <div className="space-y-3">
                  {stageApps.map(a => (
                    <div key={a.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">{a.companyName}</span>
                      <h4 className="text-xs font-bold text-white">{a.opportunityTitle}</h4>
                      {a.notes && <p className="text-[10px] text-slate-400">{a.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
