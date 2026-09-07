import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  Code2, 
  Briefcase, 
  Bookmark, 
  TrendingUp, 
  Award, 
  Building2,
  ChevronRight,
  Target,
  Users,
  Compass
} from 'lucide-react';
import { studentCommandCenterDb, StudentPriorityItem, NextBestAction, DailyBriefing } from '../../services/db/studentCommandCenterDatabase';
import { digitalIdDb } from '../../services/db/digitalIdDatabase';
import { calendarDb } from '../../services/db/calendarDatabase';
import { opportunityDb } from '../../services/db/opportunityDatabase';
import { skillEvidenceDb } from '../../services/db/skillEvidenceDatabase';
import { useAuth } from '../../context/AuthContext';

export const StudentCommandCenterPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const firstName = user?.displayName?.split(' ')[0] || 'Dileep';

  const [priorities, setPriorities] = useState<StudentPriorityItem[]>([]);
  const [nextAction, setNextAction] = useState<NextBestAction | null>(null);
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null);
  const [profileComp, setProfileComp] = useState({ percentage: 92, missingFields: ['Contact Phone'] });
  const [upcomingEvents, setUpcomingEvents] = useState(calendarDb.getUpcoming(currentUserId, 3));
  const card = digitalIdDb.getByUserId(currentUserId);
  const skills = skillEvidenceDb.getByUser(currentUserId).slice(0, 3);

  useEffect(() => {
    setPriorities(studentCommandCenterDb.getTodayPriorities(currentUserId));
    setNextAction(studentCommandCenterDb.getNextBestAction(currentUserId));
    setBriefing(studentCommandCenterDb.getDailyBriefing(currentUserId, firstName));
    setProfileComp(studentCommandCenterDb.calculateProfileCompletion(user || {}));
    setUpcomingEvents(calendarDb.getUpcoming(currentUserId, 3));

    const unsub = studentCommandCenterDb.subscribe(() => {
      setNextAction(studentCommandCenterDb.getNextBestAction(currentUserId));
    });
    return unsub;
  }, [currentUserId, firstName, user]);

  const handleDismissAction = (actionId: string) => {
    studentCommandCenterDb.dismissAction(actionId);
    setNextAction(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Daily Intelligence Greeting */}
        <div className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Canonical Academic Command Center
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {briefing?.greeting || `Good morning, ${firstName}`} 👋
              </h1>
              <p className="text-sm text-slate-400">
                Here is your intelligent operational summary for <span className="text-slate-200 font-medium">{briefing?.dateStr}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/student/opportunities"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-lg shadow-emerald-900/30 flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" /> Explore Opportunities
              </Link>
              <Link
                to="/student/weekly-review"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Weekly Review
              </Link>
            </div>
          </div>

          {/* Quick Academic Identity Pill */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-300 font-medium">{card?.institutionName || 'Vel Tech University'}</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-emerald-400">{card?.aceId || 'ACE-2026-VT9842'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span>Profile Completeness:</span>
              <span className="font-bold text-white">{profileComp.percentage}%</span>
              <div className="w-20 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${profileComp.percentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Next Best Action Hero Card */}
        {nextAction && (
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Next Best Action
              </span>
              {nextAction.dismissible && (
                <button
                  onClick={() => handleDismissAction(nextAction.id)}
                  className="text-xs text-slate-500 hover:text-slate-300 transition"
                >
                  Dismiss
                </button>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">{nextAction.title}</h2>
              <p className="text-xs text-emerald-300/80 leading-relaxed">{nextAction.reason}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={nextAction.primaryActionUrl}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/40 flex items-center gap-1.5"
              >
                {nextAction.primaryActionLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={nextAction.secondaryActionUrl}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
              >
                {nextAction.secondaryActionLabel}
              </Link>
            </div>
          </div>
        )}

        {/* Primary Command Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Priorities Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Today's Priorities */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> Today's Intelligent Priorities
                </h3>
                <span className="text-xs text-slate-400">{priorities.length} Active Items</span>
              </div>

              {priorities.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  You're all caught up 🎉
                </div>
              ) : (
                <div className="space-y-3">
                  {priorities.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                            item.urgency === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {item.urgency}
                          </span>
                          <span className="text-xs font-bold text-white">{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-400">{item.description}</p>
                        <p className="text-[10px] text-emerald-400 pt-0.5 font-medium">Why: {item.reason}</p>
                      </div>

                      <Link
                        to={item.actionUrl}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition shrink-0 text-center"
                      >
                        {item.actionLabel} →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Deadlines & Calendar Sync */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-400" /> Upcoming Scheduled Items
                </h3>
                <Link to="/calendar" className="text-xs text-emerald-400 hover:underline">
                  View Full Calendar →
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map(ev => (
                  <div key={ev.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-white">{ev.title}</h4>
                      <p className="text-slate-400">{new Date(ev.startTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300">
                      {ev.type.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions Panel */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white">Universal Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link to="/student/opportunities" className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500/40 text-slate-300 font-medium flex flex-col items-center gap-1.5 transition">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Opportunities</span>
                </Link>
                <Link to="/projects/new" className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500/40 text-slate-300 font-medium flex flex-col items-center gap-1.5 transition">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>New Project</span>
                </Link>
                <Link to="/teams" className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500/40 text-slate-300 font-medium flex flex-col items-center gap-1.5 transition">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Squad Finder</span>
                </Link>
                <Link to="/career/readiness" className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500/40 text-slate-300 font-medium flex flex-col items-center gap-1.5 transition">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>Career Readiness</span>
                </Link>
              </div>
            </div>

            {/* Verified Skills Snapshot */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Verified Skill Ledger</h3>
                <Link to="/portfolio/dileepkumar" className="text-xs text-emerald-400 hover:underline">Portfolio</Link>
              </div>
              <div className="space-y-2.5">
                {skills.map(s => (
                  <div key={s.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">{s.skillName}</span>
                      <span className="text-emerald-400">{s.confidenceScore}%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">{s.currentTier.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Shortcut */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs flex items-center justify-between">
              <span className="text-slate-300">View Verified Timeline</span>
              <Link to="/student/timeline" className="text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                Open Ledger <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
