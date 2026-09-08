import React, { useState } from 'react';
import { Clock, Calendar, AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { globalOpportunityExchangeDatabase, GlobalOpportunity, DeadlineTimeBucket } from '../../services/db/globalOpportunityExchangeDatabase';
import { Link } from 'react-router-dom';

export const GlobalOpportunityDeadlinesPage: React.FC = () => {
  const buckets = globalOpportunityExchangeDatabase.getDeadlinesByBucket();
  const [activeBucket, setActiveBucket] = useState<DeadlineTimeBucket>('TODAY');

  const bucketKeys: { key: DeadlineTimeBucket; label: string; badgeColor: string }[] = [
    { key: 'TODAY', label: 'Due Today', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { key: 'TOMORROW', label: 'Due Tomorrow', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { key: 'THIS_WEEK', label: 'This Week', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { key: 'NEXT_WEEK', label: 'Next Week', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { key: 'LATER', label: 'Later', badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30' }
  ];

  const currentItems = buckets[activeBucket] || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 w-fit">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Global Deadline Intelligence
          </span>
          <h1 className="text-3xl font-extrabold text-white">Global Opportunities Deadlines Center</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Time-bucketed urgency tracker converting all international deadlines into your configured timezone (Asia/Kolkata). Never miss high-impact fellowship or research application cutoffs.
          </p>
        </div>

        {/* Bucket Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {bucketKeys.map(b => (
            <button
              key={b.key}
              onClick={() => setActiveBucket(b.key)}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer ${
                activeBucket === b.key ? 'bg-slate-900 border-amber-500/80 shadow-lg' : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{b.label}</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
                  {buckets[b.key]?.length || 0}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {currentItems.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white">No pending deadlines in this time bucket</h3>
              <p className="text-xs text-slate-400">All submissions for {activeBucket.toLowerCase()} are in order.</p>
            </div>
          ) : (
            currentItems.map(item => (
              <div key={item.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">• {item.providerName}</span>
                  </div>
                  <h3 className="font-bold text-white text-base">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {item.location.city}, {item.location.country}
                    </span>
                    <span className="flex items-center gap-1 text-amber-300 font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Deadline: {new Date(item.deadline).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link
                    to="/opportunities/compare"
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    Review Requirements <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
