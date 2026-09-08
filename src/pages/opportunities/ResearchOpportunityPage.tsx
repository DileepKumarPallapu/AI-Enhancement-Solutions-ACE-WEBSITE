import React, { useState } from 'react';
import { GraduationCap, Sparkles, Building2, MapPin, ArrowRight, ShieldCheck, FlaskConical } from 'lucide-react';
import { globalOpportunityExchangeDatabase } from '../../services/db/globalOpportunityExchangeDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const ResearchOpportunityPage: React.FC = () => {
  const researchOpps = globalOpportunityExchangeDatabase.getAllOpportunities().filter(o => o.category === 'RESEARCH');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5 w-fit">
            <FlaskConical className="w-3.5 h-3.5 text-teal-400" /> Research & Innovation Exchange
          </span>
          <h1 className="text-3xl font-extrabold text-white">University & Corporate Research Labs</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Collaborate on cutting-edge neural architectures, robotics SLAM, and distributed systems. Verified research credentials bind directly to your Digital Student Passport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchOpps.map(opp => (
            <div key={opp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{opp.title}</h3>
                  <p className="text-xs text-teal-400">{opp.providerName}</p>
                </div>
                <ACEBadge variant="success">Trust {opp.trustScore}%</ACEBadge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{opp.eligibility}</p>

              <div className="p-3 bg-slate-800/50 rounded-2xl text-xs space-y-1">
                <div className="text-slate-400">Grant / Funding:</div>
                <div className="text-teal-300 font-bold font-mono">{opp.stipendOrPrizeDisplay}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Location: {opp.location.city}, {opp.location.country}</span>
                <Link to="/opportunities/compare" className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-1.5">
                  View Lab Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
