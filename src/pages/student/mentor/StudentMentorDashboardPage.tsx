import React from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../../context/MentorContext';
import { useAuth } from '../../../context/AuthContext';
import {
  GraduationCap,
  Calendar,
  MessageSquare,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  BookOpen,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const StudentMentorDashboardPage: React.FC = () => {
  const { assignedMentors, studentSessions, studentGoals, studentActionItems, studentRecommendations, toggleActionItem } = useMentor();
  const { currentUser } = useAuth();

  const primaryMentor = assignedMentors.find(a => a.assignmentType === 'PRIMARY') || assignedMentors[0];
  const secondaryMentor = assignedMentors.find(a => a.assignmentType === 'SECONDARY');

  const upcomingSessions = studentSessions.filter(s => s.status === 'CONFIRMED');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active Mentorship Track
            </div>
            <h1 className="text-3xl font-extrabold text-white">My Campus Mentor Workspace</h1>
            <p className="text-xs text-slate-400 mt-1">
              Your 1-on-1 guidance plans, upcoming session links, and event recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/mentors"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
            >
              Browse Mentors
            </Link>
            <Link
              to="/student/mentor/messages"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <MessageSquare className="w-4 h-4" /> Message Mentor
            </Link>
          </div>
        </div>

        {/* Assigned Mentors Cards Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryMentor ? (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
                  Primary Mentor
                </span>
                <span className="text-xs text-slate-400">Assigned: {primaryMentor.assignedDate}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl font-bold text-indigo-400">
                  {primaryMentor.mentorName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{primaryMentor.mentorName}</h3>
                  <p className="text-xs text-indigo-400 font-medium">Focus: {primaryMentor.primaryMentorshipArea}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{primaryMentor.studentCollege}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/student/mentor/sessions"
                  className="py-2 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                >
                  Book Session
                </Link>
                <Link
                  to="/student/mentor/messages"
                  className="py-2 text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow"
                >
                  Open Chat
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <p className="text-xs text-slate-400">No primary mentor selected yet.</p>
              <Link to="/student/mentors" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
                Find Primary Mentor
              </Link>
            </div>
          )}

          {secondaryMentor ? (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider">
                  Secondary Mentor
                </span>
                <span className="text-xs text-slate-400">Assigned: {secondaryMentor.assignedDate}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-xl font-bold text-purple-400">
                  {secondaryMentor.mentorName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">{secondaryMentor.mentorName}</h3>
                  <p className="text-xs text-purple-400 font-medium">Focus: {secondaryMentor.primaryMentorshipArea}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{secondaryMentor.studentCollege}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/student/mentor/sessions"
                  className="py-2 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                >
                  Book Session
                </Link>
                <Link
                  to="/student/mentor/messages"
                  className="py-2 text-center rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white shadow"
                >
                  Open Chat
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <p className="text-xs text-slate-400">Optional: Add a Secondary Career / Hackathon Mentor.</p>
              <Link to="/student/mentors" className="inline-block px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold">
                Select Secondary Mentor
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Sessions & Event Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Upcoming Sessions (Col 1) */}
          <div className="lg:col-span-1 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" /> Upcoming Sessions
              </h3>
              <Link to="/student/mentor/sessions" className="text-[11px] text-indigo-400 hover:underline">
                View All →
              </Link>
            </div>

            {upcomingSessions.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">No upcoming sessions confirmed.</p>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.map(sess => (
                  <div key={sess.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{sess.topic}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                        {sess.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">with {sess.mentorName}</p>
                    {sess.meetingUrl && (
                      <a
                        href={sess.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-bold hover:underline pt-1"
                      >
                        Join ACE Room →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Student Success Plan / Goals (Col 2 & 3) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Student Success Goals & Roadmap
              </h3>
              <Link to="/student/mentor/goals" className="text-[11px] text-indigo-400 hover:underline">
                Manage Roadmap →
              </Link>
            </div>

            <div className="space-y-4">
              {studentGoals.map(g => (
                <div key={g.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{g.title}</span>
                    <span className="text-xs font-mono font-bold text-indigo-400">{g.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: `${g.progressPercentage}%` }} />
                  </div>
                  {g.mentorReviewNotes && (
                    <p className="text-[11px] text-slate-400 italic">Mentor Note: "{g.mentorReviewNotes}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Items & Mentor Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Action Items */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Mentor Action Items & Follow-ups
            </h3>
            <div className="space-y-2.5">
              {studentActionItems.map(item => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className={`text-xs font-semibold ${item.status === 'COMPLETED' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400">{item.description}</p>
                    <span className="text-[10px] text-rose-400 font-mono">Deadline: {item.deadline}</span>
                  </div>
                  <button
                    onClick={() => toggleActionItem(item.id, item.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      item.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.status === 'COMPLETED' ? 'Done' : 'Mark Done'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Event & Learning Recommendations */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-400" /> Recommended by Your Mentor
            </h3>
            <div className="space-y-3">
              {studentRecommendations.map(rec => (
                <div key={rec.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{rec.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 uppercase font-mono font-bold">
                      {rec.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{rec.reason}</p>
                  <Link
                    to={rec.actionUrl}
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 font-bold hover:underline pt-1"
                  >
                    Explore Opportunity →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
