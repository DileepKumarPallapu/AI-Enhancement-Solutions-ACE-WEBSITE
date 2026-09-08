import React from 'react';
import { BookOpen, ShieldCheck, ArrowRight, GitCommit } from 'lucide-react';
import { aceSuperPlatformDatabase } from '../../services/db/aceSuperPlatformDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const InteractiveSkillGraphPage: React.FC = () => {
  const skills = aceSuperPlatformDatabase.getUnifiedSkillGraph();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Dynamic Skill Graph
          </span>
          <h1 className="text-3xl font-extrabold text-white">Evidence-Backed Competency Matrix</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Interactive skill dependency tree connecting verified code evidence, university credentials, and target engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map(skill => (
            <div key={skill.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                    {skill.category} • Level {skill.level}/10
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{skill.name}</h3>
                </div>
                <ACEBadge variant={skill.status === 'VERIFIED' ? 'success' : 'neutral'}>{skill.status}</ACEBadge>
              </div>

              <div className="text-xs space-y-1.5">
                <div className="text-slate-400">Prerequisites: {skill.prerequisites.join(' → ')}</div>
                <div className="text-slate-400">Target Roles: {skill.targetRoles.join(', ')}</div>
              </div>

              {skill.verifiedEvidenceUrl && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-400 truncate">Evidence: {skill.verifiedEvidenceUrl}</span>
                  <span className="text-emerald-400 font-bold shrink-0">Verified ✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
