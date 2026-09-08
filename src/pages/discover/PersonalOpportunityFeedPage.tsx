import React, { useState } from 'react';
import { Sparkles, Filter, Bookmark, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { globalOpportunityExchangeDatabase, GlobalOpportunity } from '../../services/db/globalOpportunityExchangeDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const PersonalOpportunityFeedPage: React.FC = () => {
  const [filter, setFilter] = useState<'FOR_YOU' | 'CLOSING_SOON' | 'FELLOWSHIP' | 'RESEARCH'>('FOR_YOU');
  const allOpps = globalOpportunityExchangeDatabase.getAllOpportunities();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-yellow-950 via-slate-900 to-indigo-950 border border-yellow-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Personal Opportunity Feed
          </span>
          <h1 className="text-3xl font-extrabold text-white">Curated Opportunity Discover Stream</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Ranked specifically for your verified skills, current 9.4 CGPA at Vel Tech, and active target career goals.
          </p>
        </div>

        <div className="space-y-4">
          {allOpps.map(opp => (
            <div key={opp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-yellow-500/40 transition-all space-y-3 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-yellow-400 uppercase bg-yellow-500/10 px-2 py-0.5 rounded">
                      {opp.category}
                    </span>
                    <span className="text-xs text-slate-400">• {opp.providerName}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{opp.title}</h3>
                </div>
                <ACEBadge variant="success">Trust {opp.trustScore}%</ACEBadge>
              </div>

              {/* Explainable Why Badge */}
              <div className="p-3 rounded-2xl bg-yellow-950/30 border border-yellow-800/40 text-xs text-yellow-300 font-medium">
                🎯 Why Recommended: {opp.matchReasons ? opp.matchReasons.join(' • ') : 'Matches verified Level 7 skills on your Digital Student Passport'}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-400">Funding: {opp.stipendOrPrizeDisplay} • Due {new Date(opp.deadline).toLocaleDateString()}</span>
                <Link to="/opportunities" className="px-4 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-slate-950 font-bold flex items-center gap-1.5">
                  View in Exchange <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
