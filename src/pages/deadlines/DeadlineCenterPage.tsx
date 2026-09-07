import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle2, Plus, Calendar, Flag, Sparkles } from 'lucide-react';
import { calendarDb, CalendarEventItem } from '../../services/db/calendarDatabase';
import { useAuth } from '../../context/AuthContext';

export const DeadlineCenterPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const [deadlines, setDeadlines] = useState<CalendarEventItem[]>([]);

  useEffect(() => {
    setDeadlines(calendarDb.getDeadlines(currentUserId));
    const unsub = calendarDb.subscribe(() => {
      setDeadlines(calendarDb.getDeadlines(currentUserId));
    });
    return unsub;
  }, [currentUserId]);

  const calculateDaysLeft = (targetTime: string) => {
    const diff = new Date(targetTime).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" /> High-Priority Tracking
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Academic & Competition Deadline Center</h1>
          <p className="text-slate-400 text-sm mt-1">
            Never miss a hackathon round submission, university capstone deliverable, or project deadline.
          </p>
        </div>

        <div className="space-y-4">
          {deadlines.map(item => {
            const daysLeft = calculateDaysLeft(item.startTime);
            const isUrgent = daysLeft <= 3;

            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-slate-900 border transition ${
                  isUrgent ? 'border-rose-500/40 bg-rose-950/10' : 'border-slate-800'
                } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      isUrgent ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {daysLeft <= 0 ? 'Due Today' : `${daysLeft} Days Remaining`}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(item.startTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  {item.description && <p className="text-xs text-slate-400">{item.description}</p>}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => calendarDb.toggleCompleted(item.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mark Complete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
