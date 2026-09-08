import React from 'react';
import { DollarSign, Award, GraduationCap, ShieldCheck, ArrowRight, Globe2 } from 'lucide-react';
import { globalOpportunityExchangeDatabase } from '../../services/db/globalOpportunityExchangeDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const ScholarshipOpportunityPage: React.FC = () => {
  const scholarships = globalOpportunityExchangeDatabase.getAllOpportunities().filter(o => o.category === 'SCHOLARSHIP');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 w-fit">
            <DollarSign className="w-3.5 h-3.5 text-purple-400" /> Global Scholarship Gateway
          </span>
          <h1 className="text-3xl font-extrabold text-white">International & Merit-Based Scholarships</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Verified domestic and global funding grants for STEM undergraduates. Pre-matched with your Vel Tech academic score and digital passport credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map(opp => (
            <div key={opp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{opp.title}</h3>
                  <p className="text-xs text-purple-400">{opp.providerName}</p>
                </div>
                <ACEBadge variant="success">Trust {opp.trustScore}%</ACEBadge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{opp.eligibility}</p>

              <div className="p-3 bg-purple-950/30 border border-purple-900/40 rounded-2xl text-xs space-y-1">
                <div className="text-purple-300 font-semibold">Scholarship Grant Amount:</div>
                <div className="text-white font-bold font-mono text-sm">{opp.stipendOrPrizeDisplay}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                <Link to="/opportunities/compare" className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5">
                  Apply for Grant <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
