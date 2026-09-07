import React, { useState } from 'react';
import { useMentor } from '../../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  AlertCircle,
  Plus,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { MentorshipArea, SessionMode } from '../../../types/mentorship';

export const StudentMentorSessionsPage: React.FC = () => {
  const { studentSessions, collegeMentors, assignedMentors, bookSession } = useMentor();

  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState(collegeMentors[0]?.id || '');
  const [topic, setTopic] = useState('');
  const [mentorshipArea, setMentorshipArea] = useState<MentorshipArea>('Career Guidance');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('16:00');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [mode, setMode] = useState<SessionMode>('ONLINE');
  const [agenda, setAgenda] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const selectedMentor = collegeMentors.find(m => m.id === selectedMentorId) || collegeMentors[0];

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');
    if (!selectedMentor) return;

    try {
      await bookSession({
        mentorId: selectedMentor.id,
        mentorName: selectedMentor.fullName,
        mentorAvatar: selectedMentor.avatarUrl,
        date,
        time,
        durationMinutes,
        topic,
        agenda,
        mentorshipArea,
        mode
      });
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setShowBookModal(false);
        setTopic('');
        setAgenda('');
      }, 1500);
    } catch (err: any) {
      setBookingError(err?.message || 'Failed to book session. Please check slot availability.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/student/mentorship" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentorship Hub
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentorship Sessions</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Book and join 1-on-1 advisory meetings with your verified campus mentors.
            </p>
          </div>

          <button
            onClick={() => {
              setBookingError('');
              setShowBookModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> Book New Session
          </button>
        </div>

        <div className="space-y-4">
          {studentSessions.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
              <Calendar className="w-8 h-8 mx-auto text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No scheduled sessions yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Schedule your first 1-on-1 session to get tailored guidance on your projects or career.</p>
              <button
                onClick={() => setShowBookModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                Book Session Now
              </button>
            </div>
          ) : (
            studentSessions.map(session => (
              <div
                key={session.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                        session.status === 'CONFIRMED' || session.status === 'REQUESTED'
                          ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                          : session.status === 'COMPLETED'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {session.status}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {session.mode}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{session.topic}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Mentor: {session.mentorName}</p>
                  </div>

                  <div className="text-right sm:text-right flex flex-col sm:items-end">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {session.date} at {session.time}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{session.durationMinutes} Minutes</span>
                  </div>
                </div>

                {session.agenda && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Session Agenda:</span>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{session.agenda}</p>
                  </div>
                )}

                {session.summaryNotes && (
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-xs">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300">Mentor Summary Recap:</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{session.summaryNotes}</p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {session.meetingLink ? `Room: ${session.meetingLink}` : 'Meeting link generated upon confirmation'}
                  </div>

                  {(session.status === 'CONFIRMED' || session.status === 'REQUESTED') && (
                    <a
                      href={session.meetingLink?.startsWith('http') ? session.meetingLink : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Meeting Room
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Book Session Modal */}
        {showBookModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Book 1-on-1 Mentorship</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Strict calendar conflict validation ensures zero double-booking.</p>
                </div>
                <button onClick={() => setShowBookModal(false)} className="text-slate-400 hover:text-slate-200 text-sm font-bold">✕</button>
              </div>

              {bookingSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Session Confirmed!</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Meeting link and calendar invite generated.</p>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-4">
                  {bookingError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" /> {bookingError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Mentor</label>
                    <select
                      value={selectedMentorId}
                      onChange={e => setSelectedMentorId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      {collegeMentors.map(m => (
                        <option key={m.id} value={m.id}>{m.fullName} — {m.department}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Topic / Discussion Theme</label>
                    <input
                      type="text"
                      placeholder="e.g., Code Review for Smart India Hackathon & Resume Review"
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                      <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Discussion Agenda & Questions</label>
                    <textarea
                      rows={3}
                      placeholder="List 2-3 specific questions you want to discuss with your mentor..."
                      value={agenda}
                      onChange={e => setAgenda(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowBookModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
