import React from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { Calendar, Clock, Video, ArrowLeft } from 'lucide-react';

export const MentorCalendarPage: React.FC = () => {
  const { mentorSessions } = useMentor();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link to="/mentor/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Command Center
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Mentor Schedule & Calendar</h1>
          <p className="text-xs text-slate-400 mt-1">Live synchronized view of student bookings, office hours, and milestones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day, idx) => (
            <div key={day} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 min-h-[220px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-xs text-indigo-400">{day}</span>
                <span className="text-[10px] text-slate-500">Sep {15 + idx}</span>
              </div>
              {idx === 0 || idx === 2 ? (
                <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-[11px] space-y-1">
                  <p className="font-bold text-white">SIH Review</p>
                  <p className="text-indigo-300 font-mono text-[10px]">17:00 • Dileep K</p>
                </div>
              ) : (
                <p className="text-[10px] text-slate-600 text-center pt-8">No bookings</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
