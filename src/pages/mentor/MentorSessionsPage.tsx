import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { Calendar, Clock, Video, Check, Plus, Star } from 'lucide-react';

export const MentorSessionsPage: React.FC = () => {
  const { mentorSessions, completeSession } = useMentor();
  const [completeModalId, setCompleteModalId] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState('');

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completeModalId) return;
    await completeSession(completeModalId, summaryText);
    setCompleteModalId(null);
    setSummaryText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <Link to="/mentor/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Command Center
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Mentorship Sessions Schedule</h1>
          <p className="text-xs text-slate-400 mt-1">Manage scheduled student bookings and document post-session conclusions.</p>
        </div>

        <div className="space-y-4">
          {mentorSessions.map(sess => (
            <div key={sess.id} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 uppercase font-mono">
                    {sess.mentorshipArea}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{sess.topic}</h3>
                  <p className="text-xs text-slate-400">Student: {sess.studentName}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  sess.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {sess.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-300 font-mono">
                <span>📅 {sess.date} at {sess.time}</span>
                <span>⏱️ {sess.durationMinutes} mins</span>
                <span>📍 {sess.mode}</span>
              </div>

              {sess.status === 'CONFIRMED' && (
                <div className="flex items-center gap-3 pt-2">
                  {sess.meetingUrl && (
                    <a
                      href={sess.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" /> Start Call
                    </a>
                  )}
                  <button
                    onClick={() => setCompleteModalId(sess.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
                  >
                    Mark as Completed
                  </button>
                </div>
              )}

              {sess.mentorSummary && (
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-indigo-300">Session Summary:</span>
                  <p className="text-slate-300">{sess.mentorSummary}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Completion Modal */}
      {completeModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Complete Mentorship Session</h3>
            <form onSubmit={handleComplete} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Discussion Points & Summary</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Document key advice provided and next milestone targets..."
                  value={summaryText}
                  onChange={e => setSummaryText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCompleteModalId(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Save Summary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
