import React, { useState } from 'react';
import { Briefcase, TrendingUp, Sparkles, ExternalLink, Bookmark, CheckCircle2, ChevronRight, Building2, MapPin } from 'lucide-react';
import { careerDb, OpportunityItem } from '../../services/db/careerDatabase';
import { useAuth } from '../../context/AuthContext';

export const CareerHubPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  
  const opportunities = careerDb.getOpportunities();
  const roleAnalysis = careerDb.getTargetRoleAnalysis('AI Systems Engineer');
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  const handleApply = (opp: OpportunityItem) => {
    careerDb.applyToOpportunity({
      userId: currentUserId,
      opportunityId: opp.id,
      targetRole: opp.title
    });
    setAppliedIds(prev => new Set(prev).add(opp.id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-emerald-400" /> ACE Career & Opportunity Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Exclusive campus hiring pipelines, research fellowships, and real skill-gap readiness mapping.
            </p>
          </div>
          <a
            href="/career/applications"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white text-xs font-semibold transition"
          >
            My Application Pipeline (Kanban)
          </a>
        </div>

        {/* Skill Gap Analysis Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Live Skill Gap Radar</span>
              <h2 className="text-xl font-bold text-white mt-1">Target Role: {roleAnalysis.roleTitle}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{roleAnalysis.industry} • {roleAnalysis.averageSalary}</p>
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
              <span className="text-2xl font-bold text-emerald-400">{roleAnalysis.readinessScore}%</span>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Match Readiness</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {roleAnalysis.requiredSkills.map(s => (
              <div key={s.name} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{s.name}</span>
                  <span className="text-[10px] text-slate-400">{s.currentLevel}</span>
                </div>
                {s.met ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">Gap</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Curated Campus & Industry Openings</h2>

          <div className="space-y-4">
            {opportunities.map(opp => {
              const isApplied = appliedIds.has(opp.id);
              return (
                <div key={opp.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 transition hover:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={opp.companyLogoUrl} alt={opp.companyName} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{opp.title}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                            {opp.matchScorePercentage}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 flex items-center gap-2 mt-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" /> {opp.companyName} • 
                          <MapPin className="w-3.5 h-3.5 text-slate-400 ml-1" /> {opp.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-400">{opp.stipendOrSalary}</span>
                      <button
                        onClick={() => handleApply(opp)}
                        disabled={isApplied}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                          isApplied
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        }`}
                      >
                        {isApplied ? 'Application Submitted ✓' : 'Quick Apply with ACE ID'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{opp.description}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Required Skills:</span>
                    {opp.requiredSkills.map(req => (
                      <span key={req} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
