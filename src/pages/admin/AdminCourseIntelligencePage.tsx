import React, { useState } from 'react';
import { 
  Sparkles, Layers, Sliders, Database, CheckCircle2, AlertTriangle, 
  Terminal, BarChart2, ShieldCheck, ArrowRight, Play
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { DOMAINS_TAXONOMY, getDomainById, getRoleById } from '../../data/taxonomyData';
import { INTELLIGENCE_COURSES } from '../../data/courseIntelligenceCatalog';
import { courseIntelligence, StudentLearnerProfile } from '../../services/ai/courseIntelligenceEngine';

export const AdminCourseIntelligencePage: React.FC = () => {
  const [debugDomainId, setDebugDomainId] = useState<string>('ai-ml');
  const [debugRoleId, setDebugRoleId] = useState<string>('ml-engineer');
  const [debugLevel, setDebugLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [debugVerifiedSkills, setDebugVerifiedSkills] = useState<string[]>(['Python']);

  const activeDomain = getDomainById(debugDomainId) || DOMAINS_TAXONOMY[0];
  const activeRole = getRoleById(debugRoleId) || activeDomain.roles[0];

  const debugProfile: StudentLearnerProfile = {
    domainId: debugDomainId,
    targetRoleId: debugRoleId,
    currentLevel: debugLevel,
    verifiedSkills: debugVerifiedSkills,
    knownLanguages: ['Python'],
    completedCourseIds: [],
    inProgressCourseIds: []
  };

  const { nextBestCourse, rankedCourses, skillGaps } = courseIntelligence.getPersonalizedRecommendations(debugProfile);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 font-sans">
      
      <PageHeader
        eyebrow="ADMINISTRATION & ENGINE OVERSIGHT"
        title="Course Intelligence &"
        highlight="Recommendation Debugger."
        subtitle="Inspect the live mathematical recommendation scoring matrix, prerequisite graph, and domain-role mappings."
        badge={
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold font-mono">
            Engine Version: 2.4.0 (Deterministic)
          </span>
        }
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-50 text-brand-600">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Recommendation Scoring Sandbox</h3>
              <p className="text-xs text-slate-400">Simulate student profiles to test recommendation rankings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Domain</label>
            <select
              value={debugDomainId}
              onChange={(e) => {
                setDebugDomainId(e.target.value);
                const d = getDomainById(e.target.value);
                if (d && d.roles[0]) setDebugRoleId(d.roles[0].id);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              {DOMAINS_TAXONOMY.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Target Role</label>
            <select
              value={debugRoleId}
              onChange={(e) => setDebugRoleId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              {activeDomain.roles.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Simulated Verified Skills</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {['Python', 'SQL', 'Statistics & Probability', 'Scikit-Learn'].map(s => {
                const isSelected = debugVerifiedSkills.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => {
                      if (isSelected) setDebugVerifiedSkills(prev => prev.filter(x => x !== s));
                      else setDebugVerifiedSkills(prev => [...prev, s]);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {s} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
            SCORING BREAKDOWN MATRIX (TOTAL 100%)
          </span>

          <div className="space-y-3">
            {rankedCourses.map(rec => (
              <div key={rec.course.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white">{rec.course.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-600 text-white font-mono font-bold text-[11px]">
                    {rec.matchScore}% Match
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px] font-mono pt-1">
                  <span className="text-slate-500">Role: <strong className="text-slate-900 dark:text-white">{rec.scoringBreakdown.roleMatchScore}/30</strong></span>
                  <span className="text-slate-500">Skill Gap: <strong className="text-slate-900 dark:text-white">{rec.scoringBreakdown.skillGapScore}/25</strong></span>
                  <span className="text-slate-500">Prereq: <strong className="text-slate-900 dark:text-white">{rec.scoringBreakdown.prerequisiteScore}/15</strong></span>
                  <span className="text-slate-500">Language: <strong className="text-slate-900 dark:text-white">{rec.scoringBreakdown.languageScore}/10</strong></span>
                  <span className="text-slate-500">Level: <strong className="text-slate-900 dark:text-white">{rec.scoringBreakdown.levelScore}/10</strong></span>
                  <span className="text-slate-500">Goal+Hist: <strong className="text-slate-900 dark:text-white">10/10</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
