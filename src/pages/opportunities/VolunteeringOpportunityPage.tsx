import React from 'react';
import { Users, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { globalOpportunityExchangeDatabase } from '../../services/db/globalOpportunityExchangeDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const VolunteeringOpportunityPage: React.FC = () => {
  const volunteerOpps = globalOpportunityExchangeDatabase.getAllOpportunities().filter(o => o.category === 'VOLUNTEERING');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
            <Heart className="w-3.5 h-3.5 text-emerald-400" /> Community & Social Impact
          </span>
          <h1 className="text-3xl font-extrabold text-white">Social Impact & Volunteering Hub</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Contribute technical skills to rural literacy, open-source education, and environmental NGOs. All verified hours automatically append to your Digital Student Passport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteerOpps.map(opp => (
            <div key={opp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{opp.title}</h3>
                  <p className="text-xs text-emerald-400">{opp.providerName}</p>
                </div>
                <ACEBadge variant="success">Trust {opp.trustScore}%</ACEBadge>
              </div>

              <p className="text-xs text-slate-300">{opp.eligibility}</p>

              <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-2xl text-xs space-y-1">
                <div className="text-emerald-300 font-semibold">Impact Recognition:</div>
                <div className="text-slate-200 font-medium text-xs">{opp.stipendOrPrizeDisplay}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                <Link to="/opportunities/compare" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5">
                  Join Campaign <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
