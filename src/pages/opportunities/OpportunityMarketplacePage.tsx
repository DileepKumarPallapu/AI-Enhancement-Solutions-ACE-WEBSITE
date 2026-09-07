import React, { useState } from 'react';
import { 
  Briefcase, Sparkles, Trophy, Calendar, MapPin, 
  CheckCircle2, ArrowRight, ShieldCheck, Filter 
} from 'lucide-react';
import { unifiedOpportunityDb, UnifiedOpportunity, OpportunityCategory } from '../../services/db/unifiedOpportunityDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { useNavigate } from 'react-router-dom';

export const OpportunityMarketplacePage: React.FC = () => {
  const [opportunities] = useState<UnifiedOpportunity[]>(unifiedOpportunityDb.getAll());
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'ALL'>('ALL');
  const navigate = useNavigate();

  const filtered = selectedCategory === 'ALL' 
    ? opportunities 
    : opportunities.filter(o => o.type === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <Briefcase className="w-3.5 h-3.5" /> Opportunity Marketplace
            </span>
            <h1 className="text-3xl font-extrabold text-white">Verified Student Opportunities</h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Apply to fellowships, campus hackathons, research grants, and high-impact internships with verified proof-of-work.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
          {(['ALL', 'FELLOWSHIP', 'HACKATHON', 'JOB', 'INTERNSHIP'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white bg-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((opp) => (
            <div key={opp.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={opp.providerLogoUrl} alt={opp.providerName} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold text-white text-base">{opp.title}</h3>
                      <p className="text-xs text-indigo-400">{opp.providerName}</p>
                    </div>
                  </div>
                  <ACEBadge variant="success">Trust: {opp.trustScore}%</ACEBadge>
                </div>

                <p className="text-sm text-slate-300">{opp.description}</p>

                {opp.matchExplanation && (
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-900/40 text-xs text-indigo-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{opp.matchExplanation}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {opp.location}</span>
                  <span className="font-bold text-emerald-400">{opp.stipendOrPrize}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/student/opportunities/${opp.id}`)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply with ACE Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OpportunityMarketplacePage;
