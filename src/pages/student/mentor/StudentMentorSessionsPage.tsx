import React, { useState } from 'react';
import { useMentor } from '../../../context/MentorContext';
import { useAuth } from '../../../context/AuthContext';
import { Calendar, Clock, Video, Star, CheckCircle2, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentMentorSessionsPage: React.FC = () => {
  const { studentSessions, assignedMentors, bookSession, submitFeedback } = useMentor();
  const [feedbackSessionId, setFeedbackSessionId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const primaryMentor = assignedMentors[0];

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackSessionId) return;
    await submitFeedback(feedbackSessionId, rating, comment);
    setFeedbackSessionId(null);
    setComment('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <Link to="/student/mentor" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentorship Sessions & History</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track scheduled calls, review summaries, and submit guidance feedback.</p>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {studentSessions.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
              <Calendar className="w-8 h-8 mx-auto text-indigo-400" />
              <p className="text-xs text-slate-500 dark:text-slate-400">No mentorship sessions recorded yet.</p>
              <Link to="/student/mentors" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs">
                Schedule First Session
              </Link>
            </div>
          ) : (
            studentSessions.map(sess => (
              <div key={sess.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                      {sess.mentorshipArea}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{sess.topic}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">with {sess.mentorName}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    sess.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {sess.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <span>📅 {sess.date} at {sess.time}</span>
                  <span>⏱️ {sess.durationMinutes} mins</span>
                  <span>📍 {sess.mode}</span>
                </div>

                {sess.mentorSummary && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <span className="font-bold text-indigo-600 dark:text-indigo-300">Mentor Summary:</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{sess.mentorSummary}</p>
                  </div>
                )}

                {sess.status === 'CONFIRMED' && sess.meetingUrl && (
                  <div className="pt-2">
                    <a
                      href={sess.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-2"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Live Video Room
                    </a>
                  </div>
                )}

                {sess.status === 'COMPLETED' && !sess.studentFeedbackRating && (
                  <button
                    onClick={() => setFeedbackSessionId(sess.id)}
                    className="text-xs text-amber-500 dark:text-amber-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> Rate & Review Session
                  </button>
                )}

                {sess.studentFeedbackRating && (
                  <div className="text-xs text-amber-500 dark:text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Your Rating: {sess.studentFeedbackRating} / 5</span>
                    {sess.studentFeedbackComment && <span className="text-slate-500 dark:text-slate-400 italic">("{sess.studentFeedbackComment}")</span>}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>

      {/* Feedback Modal */}
      {feedbackSessionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rate Mentorship Session</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Overall Guidance Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`w-10 h-10 rounded-xl font-bold transition ${
                        rating >= num ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {num}★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Constructive Feedback (Private)</label>
                <textarea
                  rows={3}
                  placeholder="What was most helpful? Any topics for next time..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFeedbackSessionId(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
