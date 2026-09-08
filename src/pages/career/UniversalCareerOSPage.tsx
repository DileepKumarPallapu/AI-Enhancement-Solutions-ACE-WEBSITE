import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Target } from 'lucide-react';
import { aceSuperPlatformDatabase } from '../../services/db/aceSuperPlatformDatabase';

export const UniversalCareerOSPage: React.FC = () => {
  const [role, setRole] = useState('AI Systems Engineer');
  const sim = aceSuperPlatformDatabase.getCareerSimulatorMatrix(role);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 w-fit">
            <Target className="w-3.5 h-3.5 text-purple-400" /> Career Operating System
          </span>
          <h1 className="text-3xl font-extrabold text-white">Career Simulator & Readiness Matrix</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Mathematically evaluates your verified skills against industry role benchmarks without fabricated percentages.
          </p>
        </div>

        {/* Role Selector & Benchmark */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-bold">Selected Target Pathway:</div>
              <h2 className="text-xl font-bold text-white mt-1">{sim.targetRole}</h2>
              <p className="text-xs text-purple-400">{sim.targetIndustry} • {sim.targetLocation}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Readiness Score</div>
              <div className="text-2xl font-black font-mono text-emerald-400">{sim.currentScore} / {sim.targetBenchmarkScore}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 space-y-2">
              <div className="font-bold text-emerald-400">Verified Competencies:</div>
              <div className="flex flex-wrap gap-1.5">
                {sim.verifiedSkills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 space-y-2">
              <div className="font-bold text-amber-400">Identified Competency Gaps:</div>
              <div className="flex flex-wrap gap-1.5">
                {sim.missingSkills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    ⚠ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Actionable Roadmap to Bridge Gap</h3>
          <div className="space-y-3">
            {sim.actionPlan.map(a => (
              <div key={a.step} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0">
                  {a.step}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{a.action}</span>
                    <span className="text-[10px] font-bold text-purple-400 bg-slate-800 px-2 py-0.5 rounded">{a.timeframe}</span>
                  </div>
                  <p className="text-xs text-slate-400">{a.sourceReason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
