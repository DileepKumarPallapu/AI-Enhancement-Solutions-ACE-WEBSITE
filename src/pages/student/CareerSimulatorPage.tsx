import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { aiSkillGapDatabase } from '../../services/db/aiSkillGapDatabase';

export const CareerSimulatorPage: React.FC = () => {
  const roles = aiSkillGapDatabase.getAllRoles();
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0].roleId);

  const studentSkills = [
    { name: 'JavaScript', proficiency: 'INTERMEDIATE', verified: true },
    { name: 'React', proficiency: 'INTERMEDIATE', verified: true },
    { name: 'TypeScript', proficiency: 'BEGINNER', verified: true }
  ];

  const analysis = aiSkillGapDatabase.analyzeGap(selectedRoleId, studentSkills);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" /> AI Career Simulator
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Role Trajectory & Milestones Simulator
          </h1>
          <p className="text-xs text-slate-500">
            Simulate career transitions, estimate workload durations based on explicit curriculum hours, and plan your path.
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
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {r.roleTitle}
            </button>
          ))}
        </div>

        {/* Trajectory Stepper */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Projected Trajectory: Vel Tech Student → {analysis.role.roleTitle}
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Current Verified Baseline</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified in JavaScript, React, and Git with 4 completed courses and 3 published projects.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Target Skill Acquisition</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete {analysis.missingSkills.length} missing competencies (~{analysis.learningWorkloadHours} estimated curriculum hours).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Recruiter Radar Matching & Placements</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reach 90%+ qualification threshold for direct recruiter invitations on ACE Recruiter Radar.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Estimates are strictly calculated from active course module durations. No fabricated hiring guarantees.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
