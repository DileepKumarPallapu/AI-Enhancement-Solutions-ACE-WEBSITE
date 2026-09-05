import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Flame, Calendar, MapPin, Users, Coins, ArrowRight, 
  Sparkles, CheckCircle2, Search, Filter, ShieldCheck, Play
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useCompetition } from '../../context/CompetitionContext';
import { formatCoinsToRupees } from '../../config/coinConfig';

export const CompetitionsHubPage: React.FC = () => {
  const { competitions, isRegistered } = useCompetition();
  const [filterMode, setFilterMode] = useState<string>('ALL');
  const [filterCat, setFilterCat] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const filtered = competitions.filter(c => {
    const matchesMode = filterMode === 'ALL' || c.mode === filterMode;
    const matchesCat = filterCat === 'ALL' || c.category === filterCat;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.college.toLowerCase().includes(search.toLowerCase());
    return matchesMode && matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="NATIONAL & COLLEGIATE CONTESTS"
        title="Compete. Learn."
        highlight="Win Coins."
        subtitle="Join live coding competitions, online hackathons, and relational database challenges with verified coin prize pools."
        badge={
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
            🥇 1st Place: 5,000 Coins (≈ ₹50.00)
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Link to="/student/competitions">
              <Button variant="outline" size="md" icon={<Trophy className="w-4 h-4 text-brand-600" />}>
                My Registered Contests
              </Button>
            </Link>
            <Link to="/student/wins">
              <Button variant="primary" size="md" icon={<Coins className="w-4 h-4" />}>
                My Wins & Prizes
              </Button>
            </Link>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'ONLINE', 'HYBRID', 'OFFLINE'].map(m => (
            <button
              key={m}
              onClick={() => setFilterMode(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterMode === m ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m === 'ALL' ? 'All Modes' : m}
            </button>
          ))}
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
          {['ALL', 'Coding', 'Data', 'Hackathon'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterCat === cat ? 'bg-purple-100 text-brand-800 dark:bg-purple-950 dark:text-purple-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search competitions or colleges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-slate-800 dark:text-slate-200 w-48"
          />
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(comp => {
          const registered = isRegistered(comp.id);
          return (
            <div
              key={comp.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {comp.mode} · {comp.category}
                  </span>
                  <span className="text-xs font-bold text-amber-600 font-mono">
                    🥇 5,000 Coins (₹50)
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white line-clamp-2">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{comp.college}</p>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {comp.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>📅 {comp.startDate}</span>
                  <span>👥 {comp.participantsCount} Registered</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Link to={`/competitions/${comp.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
                {registered ? (
                  <Link to={`/competitions/${comp.id}/room`} className="flex-1">
                    <Button variant="ai" size="sm" className="w-full" icon={<Play className="w-3.5 h-3.5" />}>
                      Enter Room
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/competitions/${comp.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Register Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
