import React, { useState } from 'react';
import { Zap, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiSkillGapDatabase } from '../../services/db/aiSkillGapDatabase';

export const SkillGapAnalyzerPage: React.FC = () => {
  const roles = aiSkillGapDatabase.getAllRoles();
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0].roleId);

  // Authenticated student verified skills from Vel Tech records
  const studentSkills = [
    { name: 'JavaScript', proficiency: 'INTERMEDIATE', verified: true },
    { name: 'React', proficiency: 'INTERMEDIATE', verified: true },
    { name: 'TypeScript', proficiency: 'BEGINNER', verified: true },
    { name: 'Git & Version Control', proficiency: 'INTERMEDIATE', verified: true }
  ];

  const analysis = aiSkillGapDatabase.analyzeGap(selectedRoleId, studentSkills);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5" /> AI Skill Gap Analyzer
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Target Role Skill Benchmarking
          </h1>
          <p className="text-xs text-slate-500">
            Compare your verified competencies against industry-standard benchmarks and get direct learning pathways.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex flex-wrap gap-2">
          {roles.map(r => (
            <button
              key={r.roleId}
              onClick={() => setSelectedRoleId(r.roleId)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
                selectedRoleId === r.roleId
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {r.roleTitle}
            </button>
          ))}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Match Percentage</div>
            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              {analysis.matchPercentage}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {analysis.matchedSkills.length} of {analysis.role.requiredSkills.length} required skills verified
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Missing Key Skills</div>
            <div className="text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
              {analysis.missingSkills.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Priority gaps to bridge for role qualification
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Estimated Workload</div>
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
              ~{analysis.learningWorkloadHours} hrs
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Based on defined structured interactive modules
            </div>
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Matched Skills */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Competencies ({analysis.matchedSkills.length})
            </h3>
            <div className="space-y-2">
              {analysis.matchedSkills.map((s, i) => (
                <div key={i} className="p-3 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-semibold text-[10px]">
                    Verified ✓
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" /> Missing Required Skills ({analysis.missingSkills.length})
            </h3>
            <div className="space-y-2">
              {analysis.missingSkills.map((s, i) => (
                <div key={i} className="p-3 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-semibold text-[10px]">
                    {s.importance}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Actionable Recommendations */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recommended Bridge Actions in ACE Catalog
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysis.recommendedActions.map((rec, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                    {rec.type}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Target: {rec.skill}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rec.title}</h4>
                <p className="text-[11px] text-slate-500">{rec.reason}</p>
                <Link
                  to={rec.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline pt-1"
                >
                  <span>Start Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
