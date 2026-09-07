import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  ArrowLeft,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { MentorshipArea, SessionMode } from '../../types/mentorship';

export const MentorSessionsPage: React.FC = () => {
  const { mentorSessions, myStudents, bookSession } = useMentor();

  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('16:00');
  const [duration, setDuration] = useState(30);
  const [area, setArea] = useState<MentorshipArea>('Project Guidance');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !topic) return;
    const mentee = myStudents.find(m => m.studentId === studentId);
    await bookSession({
      mentorId: 'mentor-veltech-1',
      mentorName: 'Faculty Mentor',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      date,
      time,
      durationMinutes: duration,
      topic,
      agenda: 'Faculty scheduled mentorship session',
      mentorshipArea: area,
      mode: 'ONLINE'
    });
    setShowModal(false);
    setTopic('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentor Advisory Sessions</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Host and schedule 1-on-1 and cohort guidance sessions.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Schedule New Session
          </button>
        </div>

        <div className="space-y-4">
          {mentorSessions.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No sessions scheduled.
            </div>
          ) : (
            mentorSessions.map(session => (
              <div
                key={session.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                      {session.status}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{session.topic}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Student: {session.studentName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {session.date} at {session.time}
                    </span>
                    <p className="text-[11px] text-slate-500">{session.durationMinutes} Minutes</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500">{session.meetingLink || 'Online Video Room'}</span>
                  <a
                    href={session.meetingLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" /> Open Meeting Room
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Schedule Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Schedule Mentorship Session</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 text-sm font-bold">✕</button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Select Student</label>
                  <select
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    required
                  >
                    <option value="">Choose mentee...</option>
                    {myStudents.map(m => (
                      <option key={m.studentId} value={m.studentId}>{m.studentName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Architecture review & Code Walkthrough"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={e => setTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 rounded-lg text-xs">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs">Schedule</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
