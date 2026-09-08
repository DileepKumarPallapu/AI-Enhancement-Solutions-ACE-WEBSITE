import React from 'react';
import { Award, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { globalOpportunityExchangeDatabase } from '../../services/db/globalOpportunityExchangeDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const FellowshipOpportunityPage: React.FC = () => {
  const fellowships = globalOpportunityExchangeDatabase.getAllOpportunities().filter(o => o.category === 'FELLOWSHIP');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 w-fit">
            <Award className="w-3.5 h-3.5 text-blue-400" /> Technology & Leadership Fellowships
          </span>
          <h1 className="text-3xl font-extrabold text-white">Global Industry Fellowships</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Immersive 6-to-12 month fellowship cohorts with principal research mentors and leading AI engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fellowships.map(opp => (
            <div key={opp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{opp.title}</h3>
                  <p className="text-xs text-blue-400">{opp.providerName}</p>
                </div>
                <ACEBadge variant="success">Trust {opp.trustScore}%</ACEBadge>
              </div>

              <p className="text-xs text-slate-300">{opp.eligibility}</p>

              <div className="p-3 bg-blue-950/30 border border-blue-900/40 rounded-2xl text-xs space-y-1">
                <div className="text-blue-300 font-semibold">Stipend:</div>
                <div className="text-white font-bold font-mono text-sm">{opp.stipendOrPrizeDisplay}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                <Link to="/opportunities/compare" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5">
                  Fellowship Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
