import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle2, ChevronRight, AlertCircle, Building2 } from 'lucide-react';
import { careerDb, UserApplication, OpportunityStatus } from '../../services/db/careerDatabase';
import { useAuth } from '../../context/AuthContext';

export const OpportunityTrackerPage: React.FC = () => {
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

  const columns: { status: OpportunityStatus; title: string; color: string }[] = [
    { status: 'APPLIED', title: 'Applied', color: 'border-blue-500/30' },
    { status: 'OA_SCHEDULED', title: 'Online Assessment', color: 'border-purple-500/30' },
    { status: 'INTERVIEWING', title: 'Interviewing', color: 'border-amber-500/30' },
    { status: 'OFFER_RECEIVED', title: 'Offer Received', color: 'border-emerald-500/30' }
  ];

  const handleMoveStatus = (appId: string, newStatus: OpportunityStatus) => {
    careerDb.updateApplicationStatus(appId, newStatus);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Application Tracker (Kanban)</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your real interview cycles, coding assessments, and job offers in one unified pipeline.
            </p>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          {columns.map(col => {
            const colApps = apps.filter(a => a.status === col.status);
            return (
              <div key={col.status} className={`bg-slate-900 border ${col.color} rounded-2xl p-4 space-y-3 min-h-[400px]`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</h3>
                  <span className="px-2 py-0.5 bg-slate-950 rounded-full text-[10px] font-bold text-slate-400">
                    {colApps.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colApps.map(app => (
                    <div key={app.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 shadow-md">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">{app.companyName}</span>
                        <h4 className="text-sm font-bold text-white leading-snug">{app.opportunityTitle}</h4>
                      </div>

                      {app.notes && (
                        <p className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
                          {app.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                        <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
                        {col.status === 'APPLIED' && (
                          <button
                            onClick={() => handleMoveStatus(app.id, 'OA_SCHEDULED')}
                            className="text-emerald-400 hover:underline font-semibold"
                          >
                            Advance →
                          </button>
                        )}
                        {col.status === 'OA_SCHEDULED' && (
                          <button
                            onClick={() => handleMoveStatus(app.id, 'INTERVIEWING')}
                            className="text-emerald-400 hover:underline font-semibold"
                          >
                            Advance →
                          </button>
                        )}
                        {col.status === 'INTERVIEWING' && (
                          <button
                            onClick={() => handleMoveStatus(app.id, 'OFFER_RECEIVED')}
                            className="text-emerald-400 hover:underline font-semibold"
                          >
                            Advance →
                          </button>
                        )}
                      </div>
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
