import React, { useState } from 'react';
import { Filter, Check, X, ShieldCheck, ArrowRight, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { globalOpportunityExchangeDatabase, GlobalOpportunity } from '../../services/db/globalOpportunityExchangeDatabase';
import { Link } from 'react-router-dom';

export const OpportunityComparisonPage: React.FC = () => {
  const allOpps = globalOpportunityExchangeDatabase.getAllOpportunities();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    allOpps[0]?.id || '',
    allOpps[2]?.id || '',
    allOpps[3]?.id || ''
  ].filter(Boolean));

  const compared = globalOpportunityExchangeDatabase.compareOpportunities(selectedIds);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 4) setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 border border-indigo-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Side-by-Side Opportunity Analyzer
          </span>
          <h1 className="text-3xl font-extrabold text-white">Compare International Opportunities</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Evaluate stipend conversions, location requirements, eligibility criteria, and required skills side-by-side to make data-backed career decisions.
          </p>
        </div>

        {/* Opportunity Selector Chips */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400">Select up to 4 opportunities to compare:</div>
          <div className="flex flex-wrap gap-2">
            {allOpps.map(o => {
              const isSelected = selectedIds.includes(o.id);
              return (
                <button
                  key={o.id}
                  onClick={() => toggleSelection(o.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {isSelected && '✓ '} {o.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60">
                <th className="p-4 w-48 text-slate-400 font-bold">Metric / Criterion</th>
                {compared.map(c => (
                  <th key={c.id} className="p-4 min-w-[240px] text-white font-extrabold">
                    <div className="space-y-1">
                      <span className="text-[10px] text-indigo-400 uppercase font-bold">{c.category}</span>
                      <div className="text-sm leading-snug">{c.title}</div>
                      <div className="text-xs font-normal text-slate-400">{c.providerName}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-4 font-bold text-slate-400">Location & Mode</td>
                {compared.map(c => (
                  <td key={c.id} className="p-4 text-slate-200">
                    <div className="font-semibold">{c.location.city}, {c.location.country}</div>
                    <div className="text-[10px] text-indigo-300 font-medium">{c.isRemote ? 'Remote Friendly' : 'On-Site Only'}</div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Funding / Stipend</td>
                {compared.map(c => (
                  <td key={c.id} className="p-4 text-emerald-400 font-bold font-mono">
                    {c.stipendOrPrizeDisplay}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Trust Score</td>
                {compared.map(c => (
                  <td key={c.id} className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      {c.trustScore}% ({c.verificationStatus})
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Required Skills</td>
                {compared.map(c => (
                  <td key={c.id} className="p-4 space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {c.requiredSkills.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Eligibility & Department</td>
                {compared.map(c => (
                  <td key={c.id} className="p-4 text-slate-300 text-[11px] leading-relaxed">
                    {c.eligibility}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">Deadline</td>
                {compared.map(c => (
                  <td key={c.id} className="p-4 text-amber-300 font-semibold">
                    {new Date(c.deadline).toLocaleDateString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
