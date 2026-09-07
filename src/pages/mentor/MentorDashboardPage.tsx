import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  School,
  FileText,
  MessageSquare,
  Award,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const MentorDashboardPage: React.FC = () => {
  const {
    activeMentorProfile,
    myStudents,
    mentorRequests,
    mentorSessions,
    respondToRequest
  } = useMentor();
  const { currentUser } = useAuth();

  const pendingRequests = mentorRequests.filter(r => r.status === 'PENDING');
  const upcomingSessions = mentorSessions.filter(s => s.status === 'CONFIRMED' || s.status === 'REQUESTED');

  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleRespond = async (requestId: string, accept: boolean) => {
    setProcessingId(requestId);
    try {
      await respondToRequest(requestId, accept, accept ? 'Welcome to my mentee group!' : 'Capacity constraint for this cohort.');
    } finally {
      setProcessingId(null);
    }
  };

  const mentorName = activeMentorProfile?.fullName || 'Faculty Mentor';
  const collegeName = activeMentorProfile?.institutionName || currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-xl border border-indigo-800/40">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <School className="w-3.5 h-3.5" /> {collegeName}
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Welcome, {mentorName}</h1>
                <p className="text-indigo-200 text-xs mt-1">
                  {activeMentorProfile?.designation} • {activeMentorProfile?.academicSchool} ({activeMentorProfile?.department})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/mentor/sessions"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 border border-white/10"
                >
                  <Calendar className="w-4 h-4" /> Schedule Session
                </Link>
                <Link
                  to="/mentor/students"
                  className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-500/30"
                >
                  <Users className="w-4 h-4" /> View Mentees
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Mentees</span>
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {activeMentorProfile?.currentStudentCount || myStudents.length} / {activeMentorProfile?.maxStudents || 25}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Capacity allocated</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Requests</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {pendingRequests.length}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Awaiting your approval</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Upcoming Sessions</span>
              <Calendar className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {upcomingSessions.length}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Scheduled 1-on-1s</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Rating & Feedback</span>
              <Award className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {activeMentorProfile?.rating.toFixed(1) || '5.0'} / 5.0
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">From student evaluations</p>
          </div>
        </div>

        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-500/20 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Pending Mentorship Applications ({pendingRequests.length})
              </h2>
              <Link to="/mentor/requests" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                View All Requests →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.slice(0, 2).map(req => (
                <div key={req.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{req.studentName}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{req.studentDepartment} • Year {req.studentYear}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {req.goalCategory}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    "{req.message}"
                  </p>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      disabled={processingId === req.id}
                      onClick={() => handleRespond(req.id, false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Decline
                    </button>
                    <button
                      disabled={processingId === req.id}
                      onClick={() => handleRespond(req.id, true)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm"
                    >
                      Accept Mentee
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-Column Section: Active Mentees & Upcoming Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Active Mentees List */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" /> Assigned Student Roster
              </h2>
              <Link to="/mentor/students" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                View Dossiers →
              </Link>
            </div>

            {myStudents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                No students currently assigned. Mentees will appear once requests are accepted.
              </div>
            ) : (
              <div className="space-y-3">
                {myStudents.map(assignment => (
                  <div
                    key={assignment.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                        {assignment.studentName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{assignment.studentName}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{assignment.studentDepartment}</p>
                      </div>
                    </div>

                    <Link
                      to={`/mentor/students/${assignment.studentId}`}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500"
                    >
                      Dossier
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Sessions */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" /> Upcoming Advisory Sessions
              </h2>
              <Link to="/mentor/sessions" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                Manage Calendar →
              </Link>
            </div>

            {upcomingSessions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                No upcoming sessions scheduled.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.slice(0, 4).map(session => (
                  <div
                    key={session.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{session.topic}</h4>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {session.date} at {session.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      With {session.studentName} • {session.durationMinutes} mins
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Quick Links Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link to="/mentor/action-plans" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center hover:border-indigo-500 transition">
            <FileText className="w-5 h-5 mx-auto text-indigo-500 mb-1" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Action Plans</span>
          </Link>
          <Link to="/mentor/goals" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center hover:border-indigo-500 transition">
            <CheckCircle2 className="w-5 h-5 mx-auto text-purple-500 mb-1" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Goal Reviews</span>
          </Link>
          <Link to="/mentor/messages" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center hover:border-indigo-500 transition">
            <MessageSquare className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Messages</span>
          </Link>
          <Link to="/mentor/analytics" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center hover:border-indigo-500 transition">
            <TrendingUp className="w-5 h-5 mx-auto text-amber-500 mb-1" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Cohort Analytics</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
