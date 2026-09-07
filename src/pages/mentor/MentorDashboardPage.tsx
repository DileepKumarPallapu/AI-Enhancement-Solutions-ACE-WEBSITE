import React from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Calendar,
  Clock,
  MessageSquare,
  Sparkles,
  Trophy,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  AlertCircle,
  Plus
} from 'lucide-react';

export const MentorDashboardPage: React.FC = () => {
  const { myStudents, mentorRequests, mentorSessions, mentorActionItems, activeMentorProfile, respondToRequest } = useMentor();
  const { currentUser } = useAuth();

  const pendingRequests = mentorRequests.filter(r => r.status === 'PENDING');
  const todaySessions = mentorSessions.filter(s => s.status === 'CONFIRMED');

  const mentorName = activeMentorProfile?.fullName || currentUser?.fullName || 'Dr. Arun Venkatesh';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Faculty & Mentor Command Center
            </div>
            <h1 className="text-3xl font-extrabold text-white">Good Morning, {mentorName}</h1>
            <p className="text-xs text-slate-400 mt-1">Here is your campus student mentorship overview and upcoming schedule.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/mentor/events"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
            >
              Recommend Event
            </Link>
            <Link
              to="/mentor/students"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Users className="w-4 h-4" /> View All Students
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Assigned Students', val: myStudents.length, sub: 'Active guidance tracks', icon: Users, color: 'text-indigo-400' },
            { label: 'Pending Requests', val: pendingRequests.length, sub: 'Requires review', icon: Clock, color: 'text-amber-400' },
            { label: 'Scheduled Sessions', val: todaySessions.length, sub: 'Upcoming confirmed', icon: Calendar, color: 'text-emerald-400' },
            { label: 'Open Follow-ups', val: mentorActionItems.filter(a => a.status !== 'COMPLETED').length, sub: 'Pending action items', icon: BookOpen, color: 'text-purple-400' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black text-white font-mono">{stat.val}</div>
                <p className="text-[11px] text-slate-500">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* 2-Column Layout: Students Roster & Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: My Students Table (2 cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> My Assigned Students
              </h3>
              <Link to="/mentor/students" className="text-xs text-indigo-400 hover:underline">
                Full Directory →
              </Link>
            </div>

            <div className="space-y-3">
              {myStudents.map(student => (
                <div key={student.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={student.studentAvatar} alt={student.studentName} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-xs">{student.studentName}</h4>
                      <p className="text-[11px] text-slate-400">{student.studentDepartment} • {student.studentYear}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-[10px] font-bold font-mono">
                      {student.primaryMentorshipArea}
                    </span>
                    <Link
                      to={`/mentor/students/${student.studentId}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Dossier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Today's Sessions & Pending Requests */}
          <div className="space-y-6">
            
            {/* Today's Sessions */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" /> Upcoming Sessions
              </h3>
              {todaySessions.length === 0 ? (
                <p className="text-xs text-slate-500 py-3">No sessions scheduled for today.</p>
              ) : (
                <div className="space-y-3">
                  {todaySessions.map(sess => (
                    <div key={sess.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white truncate">{sess.topic}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{sess.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">with {sess.studentName}</p>
                      {sess.meetingUrl && (
                        <a
                          href={sess.meetingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block text-xs text-indigo-400 font-bold hover:underline"
                        >
                          Launch Room →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Requests */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" /> Pending Student Requests
              </h3>
              {pendingRequests.length === 0 ? (
                <p className="text-xs text-slate-500 py-3">No pending mentor requests.</p>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.map(req => (
                    <div key={req.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{req.studentName}</span>
                        <span className="text-[10px] text-indigo-400 font-mono">{req.primaryGuidanceArea}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{req.reason}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => respondToRequest(req.id, true)}
                          className="flex-1 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondToRequest(req.id, false, 'Currently at capacity')}
                          className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
