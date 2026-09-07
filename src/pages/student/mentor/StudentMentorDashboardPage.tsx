import React, { useState } from 'react';
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
  AlertCircle,
  FileText,
  Video,
  Star,
  ExternalLink,
  Bot
} from 'lucide-react';

export const StudentMentorDashboardPage: React.FC = () => {
  const {
    primaryMentor,
    secondaryMentor,
    studentSessions,
    studentGoals,
    studentActionPlans,
    studentResources,
    generateMeetingBrief,
    toggleMilestone
  } = useMentor();

  const { currentUser } = useAuth();
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [brief, setBrief] = useState<any | null>(null);

  const upcomingSessions = studentSessions.filter(s => s.status === 'CONFIRMED');
  const collegeName = currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';

  const handleOpenBrief = () => {
    const data = generateMeetingBrief();
    setBrief(data);
    setBriefModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Institutional Mentorship Hub • {collegeName}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Your Mentorship Hub</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Personalized 1-on-1 guidance for your academic, coding, hackathon, and placement journey.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenBrief}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <Bot className="w-4 h-4" /> Prepare Meeting Brief
            </button>
            <Link
              to="/student/mentorship/find"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white text-xs font-semibold transition shadow-sm"
            >
              Find a Mentor
            </Link>
            <Link
              to="/student/mentorship/messages"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <MessageSquare className="w-4 h-4" /> Messages
            </Link>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Assigned Mentors</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {(primaryMentor ? 1 : 0) + (secondaryMentor ? 1 : 0)} / 2
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
              {primaryMentor ? 'Primary Lead Assigned' : 'No Primary Assigned'}
            </p>
          </div>
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Upcoming Sessions</span>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {upcomingSessions.length}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Next 14 Days</p>
          </div>
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Active Goals</span>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {studentGoals.filter(g => g.status !== 'COMPLETED').length}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Roadmap Progress Tracks</p>
          </div>
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Pending Action Items</span>
            <p className="text-2xl font-black text-amber-500 dark:text-amber-400 font-mono">
              {studentActionPlans.reduce((acc, p) => acc + p.tasks.filter(t => t.status !== 'COMPLETED').length, 0)}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Assigned by Mentor</p>
          </div>
        </div>

        {/* Primary & Secondary Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Primary Mentor Card */}
          {primaryMentor ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
                  Primary Mentor
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Assigned: {primaryMentor.assignedDate}</span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={primaryMentor.mentorAvatar}
                  alt={primaryMentor.mentorName}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{primaryMentor.mentorName}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{primaryMentor.mentorDesignation}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{primaryMentor.mentorDepartment}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <Link
                  to="/student/mentorship/sessions"
                  className="py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  Book Session
                </Link>
                <Link
                  to="/student/mentorship/messages"
                  className="py-2 text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow"
                >
                  Open Chat
                </Link>
                <Link
                  to="/student/mentorship/find"
                  className="py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  Change
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
                Connect with an official verified faculty mentor from {collegeName} to guide your academic and technical roadmap.
              </p>
              <Link to="/student/mentorship/find" className="inline-block px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition">
                Find a Mentor
              </Link>
            </div>
          )}

          {/* Secondary Mentor Card */}
          {secondaryMentor ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider">
                  Secondary Mentor
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Assigned: {secondaryMentor.assignedDate}</span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={secondaryMentor.mentorAvatar}
                  alt={secondaryMentor.mentorName}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{secondaryMentor.mentorName}</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{secondaryMentor.mentorDesignation}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{secondaryMentor.mentorDepartment}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/student/mentorship/sessions"
                  className="py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  Book Session
                </Link>
                <Link
                  to="/student/mentorship/messages"
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
                Add a secondary mentor for specialized guidance in Hackathons, Research, or Tier-1 Placements.
              </p>
              <Link to="/student/mentorship/find" className="inline-block px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition">
                Find Specialist
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Sessions & My Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Upcoming Sessions (Col 1) */}
          <div className="lg:col-span-1 p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" /> Upcoming Sessions
              </h3>
              <Link to="/student/mentorship/sessions" className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">
                View All →
              </Link>
            </div>

            {upcomingSessions.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
                <p>No upcoming mentorship sessions.</p>
                <Link to="/student/mentorship/sessions" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline block text-[11px]">
                  + Book a Session
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
                        <Video className="w-3.5 h-3.5" /> Join Session →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Goals Roadmap (Col 2 & 3) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> My Mentorship Goals & Milestones
              </h3>
              <Link to="/student/mentorship/goals" className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">
                Manage Goals →
              </Link>
            </div>

            {studentGoals.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 space-y-2">
                <p>Create your first mentorship goal.</p>
                <Link to="/student/mentorship/goals" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline block text-[11px]">
                  + Set Up Goal Roadmap
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
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">Mentor Feedback: "{g.mentorReviewNotes}"</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Action Plans & Recommended Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Action Plans */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> Mentor Action Plans
              </h3>
              <Link to="/student/mentorship/action-plans" className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">
                View All Plans →
              </Link>
            </div>

            {studentActionPlans.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-4 text-center">Your mentor action plans will appear here.</p>
            ) : (
              <div className="space-y-3">
                {studentActionPlans.flatMap(p => p.tasks).slice(0, 3).map(task => (
                  <div key={task.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className={`text-xs font-semibold ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {task.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{task.description}</p>
                      <span className="text-[10px] text-rose-500 font-mono">Due: {task.dueDate}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      task.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources & Recommended Events */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-500" /> Recommended by Your Mentor
            </h3>
            {studentResources.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-4 text-center">Your mentor has not recommended any resources yet.</p>
            ) : (
              <div className="space-y-3">
                {studentResources.map(rec => (
                  <div key={rec.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{rec.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-600 uppercase font-mono font-bold">
                        {rec.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{rec.recommendationReason}</p>
                    <a
                      href={rec.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline pt-1"
                    >
                      Open Resource <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Prepare Meeting Brief Modal */}
      {briefModalOpen && brief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                  ACE AI Synthesizer
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">Mentor Meeting Brief</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Generated from your verified activity and goals at {brief.collegeName}.</p>
              </div>
              <button
                onClick={() => setBriefModalOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            {/* Section 1: Completed */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What I Completed This Period
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                {brief.completedActivities.map((act: string, idx: number) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>

            {/* Section 2: Questions to Ask */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Recommended Questions to Ask Mentor
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                {brief.suggestedQuestionsToAsk.map((q: string, idx: number) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Section 3: Suggested Next Actions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" /> Suggested Discussion Topics
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                {brief.recommendedDiscussionTopics.map((topic: string, idx: number) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
