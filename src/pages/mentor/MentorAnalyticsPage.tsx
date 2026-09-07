import React from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { BarChart3, Star, Users, Trophy, CheckCircle2, ArrowLeft } from 'lucide-react';

export const MentorAnalyticsPage: React.FC = () => {
  const { mentorAnalytics } = useMentor();

  if (!mentorAnalytics) {
    return <div className="p-8 text-center text-slate-400">No analytics data available yet.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link to="/mentor/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Command Center
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Mentorship Performance & Impact Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">Real platform engagement metrics based on actual sessions, milestones, and student feedback.</p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Assigned Students</span>
            <p className="text-2xl font-black text-white font-mono">{mentorAnalytics.studentsAssigned}</p>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Sessions Completed</span>
            <p className="text-2xl font-black text-emerald-400 font-mono">{mentorAnalytics.sessionsCompleted}</p>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Event Engagement Rate</span>
            <p className="text-2xl font-black text-purple-400 font-mono">{mentorAnalytics.eventEngagementRate}%</p>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Average Student Rating</span>
            <p className="text-2xl font-black text-amber-400 font-mono">{mentorAnalytics.averageRating} ★</p>
          </div>
        </div>
      </div>
    </div>
  );
};
