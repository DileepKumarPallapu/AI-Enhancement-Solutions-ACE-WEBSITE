import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Play, CheckCircle2, ArrowLeft, Coins } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useCompetition } from '../../context/CompetitionContext';

export const StudentCompetitionsPage: React.FC = () => {
  const { registrations, competitions } = useCompetition();

  const myRegisteredList = competitions.filter(c => registrations.some(r => r.competitionId === c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/student" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">MY CONTESTS</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Registered Competitions</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="STUDENT COMPETITION ARENA"
        title="Your Registered"
        highlight="Contests."
        subtitle="Manage your contest entries, check round timers, and enter live competition rooms."
      />

      <div className="space-y-4">
        {myRegisteredList.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-2">
            <p>You haven't registered for any competitions yet.</p>
            <Link to="/competitions">
              <Button variant="primary" size="sm">
                Browse Competitions Directory
              </Button>
            </Link>
          </div>
        ) : (
          myRegisteredList.map(comp => (
            <div key={comp.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  CONFIRMED ENTRY
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{comp.title}</h3>
                <p className="text-slate-400">{comp.mode} · 📅 {comp.startDate} · Prize: 🪙 5,000 Coins (₹50)</p>
              </div>

              <div className="flex items-center gap-2">
                <Link to={`/competitions/${comp.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Link to={`/competitions/${comp.id}/room`}>
                  <Button variant="ai" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
                    Enter Contest Room
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
