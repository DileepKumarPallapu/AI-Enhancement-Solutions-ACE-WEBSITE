import React from 'react';
import { Clock, AlertTriangle, Calendar, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TodaysActionsPage: React.FC = () => {
  const actions = [
    {
      id: 'act-1',
      title: 'Submit Summer 2026 AI Internship Application',
      category: 'CAREER',
      deadline: 'Today, 11:59 PM',
      priority: 'URGENT',
      reason: 'Recruiter Radar application window closes for InnoTech Labs',
      link: '/opportunities'
    },
    {
      id: 'act-2',
      title: 'Vel Tech Campus Mentorship Review Session',
      category: 'MENTORSHIP',
      deadline: 'Today, 3:30 PM',
      priority: 'TODAY',
      reason: 'Scheduled check-in on Full-Stack project milestones with Campus Mentor',
      link: '/student/mentorship'
    },
    {
      id: 'act-3',
      title: 'Complete TypeScript REST API Challenge in Learning Lab',
      category: 'LEARNING',
      deadline: 'Today',
      priority: 'UPCOMING',
      reason: 'Required milestone for Full-Stack Developer Goal roadmap',
      link: '/learning'
    },
    {
      id: 'act-4',
      title: 'Anti-Cheat Arena Timed Algorithm Practice',
      category: 'COMPETITION',
      deadline: 'Tomorrow, 5:00 PM',
      priority: 'UPCOMING',
      reason: 'Warm-up challenge for Inter-College Hackathon squad',
      link: '/competitions'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
            <Clock className="w-3.5 h-3.5" /> Priority Execution Feed
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Today's Urgent Actions & Deadlines
          </h1>
          <p className="text-xs text-slate-500">
            Real prioritized tasks filtered by urgent deadlines, verified mentor appointments, and active goal roadmaps.
          </p>
        </div>

        <div className="space-y-3">
          {actions.map(act => (
            <div key={act.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    act.priority === 'URGENT' ? 'bg-rose-100 text-rose-800' :
                    act.priority === 'TODAY' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {act.priority}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{act.category}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{act.title}</h3>
                <p className="text-xs text-slate-500">{act.reason}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{act.deadline}</span>
                <Link
                  to={act.link}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Execute</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
