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
  const collegeName = currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active Mentorship Track • {collegeName}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">My Campus Mentor Workspace</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your 1-on-1 guidance plans, upcoming session links, and event recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/mentors"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white text-xs font-semibold transition shadow-sm"
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
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
                  Primary Mentor
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Assigned: {primaryMentor.assignedDate}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {primaryMentor.mentorName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{primaryMentor.mentorName}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Focus: {primaryMentor.primaryMentorshipArea}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{primaryMentor.studentCollege}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/student/mentor/sessions"
                  className="py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
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
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No primary mentor assigned yet</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Connect with an official verified faculty mentor from {collegeName} to guide your academic roadmap.
              </p>
              <Link to="/student/mentors" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition">
                Find Faculty Mentor
              </Link>
            </div>
          )}

          {secondaryMentor ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider">
                  Secondary Mentor
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Assigned: {secondaryMentor.assignedDate}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-xl font-bold text-purple-600 dark:text-purple-400">
                  {secondaryMentor.mentorName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{secondaryMentor.mentorName}</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Focus: {secondaryMentor.primaryMentorshipArea}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{secondaryMentor.studentCollege}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/student/mentor/sessions"
                  className="py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
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
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Secondary Mentor Track</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Optionally pair with a secondary faculty specialist for Hackathons, Coding, or Career Guidance.
              </p>
              <Link to="/student/mentors" className="inline-block px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition">
                Select Secondary Mentor
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Sessions & Event Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Upcoming Sessions (Col 1) */}
          <div className="lg:col-span-1 p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" /> Upcoming Sessions
              </h3>
              <Link to="/student/mentor/sessions" className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">
                View All →
              </Link>
            </div>

            {upcomingSessions.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
                <p>No upcoming sessions confirmed.</p>
                <Link to="/student/mentor/sessions" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline block text-[11px]">
                  + Schedule a Session
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.map(sess => (
                  <div key={sess.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">{sess.topic}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                        {sess.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">with {sess.mentorName}</p>
                    {sess.meetingUrl && (
                      <a
                        href={sess.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline pt-1"
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
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Student Success Goals & Roadmap
              </h3>
              <Link to="/student/mentor/goals" className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">
                Manage Roadmap →
              </Link>
            </div>

            {studentGoals.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
                <p>No active roadmap goals yet.</p>
                <Link to="/student/mentor/goals" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline block text-[11px]">
                  Explore Milestone Roadmaps →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {studentGoals.map(g => (
                  <div key={g.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{g.title}</span>
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{g.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: `${g.progressPercentage}%` }} />
                    </div>
                    {g.mentorReviewNotes && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">Mentor Note: "{g.mentorReviewNotes}"</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Action Items & Mentor Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Action Items */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> Mentor Action Items & Follow-ups
            </h3>
            {studentActionItems.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-4 text-center">No action items assigned right now.</p>
            ) : (
              <div className="space-y-2.5">
                {studentActionItems.map(item => (
                  <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className={`text-xs font-semibold ${item.status === 'COMPLETED' ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.description}</p>
                      <span className="text-[10px] text-rose-500 dark:text-rose-400 font-mono">Deadline: {item.deadline}</span>
                    </div>
                    <button
                      onClick={() => toggleActionItem(item.id, item.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        item.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                      }`}
                    >
                      {item.status === 'COMPLETED' ? 'Done' : 'Mark Done'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Event & Learning Recommendations */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-500" /> Recommended by Your Mentor
            </h3>
            {studentRecommendations.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-4 text-center">Your mentor will share curated events and learning tracks here.</p>
            ) : (
              <div className="space-y-3">
                {studentRecommendations.map(rec => (
                  <div key={rec.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{rec.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-300 uppercase font-mono font-bold">
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{rec.reason}</p>
                    <Link
                      to={rec.actionUrl}
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline pt-1"
                    >
                      Explore Opportunity →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
