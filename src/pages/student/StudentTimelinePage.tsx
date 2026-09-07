import React from 'react';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, Clock } from 'lucide-react';
import { studentCommandCenterDb } from '../../services/db/studentCommandCenterDatabase';
import { useAuth } from '../../context/AuthContext';

export const StudentTimelinePage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const events = studentCommandCenterDb.getTimeline(currentUserId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Student Milestone Timeline</h1>
          <p className="text-slate-400 text-sm mt-1">
            Verified chronological audit trail of your academic journey, hackathons, and certifications.
          </p>
        </div>

        <div className="space-y-6 relative pl-6 border-l-2 border-slate-800">
          {events.map(ev => (
            <div key={ev.id} className="relative space-y-2">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-950" />
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">{new Date(ev.timestamp).toLocaleDateString()}</span>
                  {ev.badgeLabel && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                      {ev.badgeLabel}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white">{ev.title}</h3>
                <p className="text-xs text-slate-300">{ev.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
