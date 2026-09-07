import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { roleIntelligenceDatabase, RoleProfile } from '../../services/db/roleIntelligenceDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Briefcase, Compass, CheckCircle2, ArrowRight, BookOpen, Layers, Terminal } from 'lucide-react';

export function RoleIntelligencePage() {
  const roles = roleIntelligenceDatabase.getAllRoles();
  const [selectedRole, setSelectedRole] = useState<RoleProfile>(roles[0]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Role Intelligence & Career Benchmarks"
          description="Explore required skill matrices, salary benchmarks, and curated learning roadmaps across high-growth engineering and product careers."
          badge="ROLE INTELLIGENCE"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Roles Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Target Engineering Roles</h3>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedRole.id === role.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{role.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedRole.id === role.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {role.activeOpportunitiesCount} open
                    </span>
                  </div>
                  <div className={`text-xs mt-1 truncate ${selectedRole.id === role.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {role.category} • {role.averageSalaryIndia}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Role Deep-Dive */}
          <div className="lg:col-span-2 space-y-6">
            
            <ACECard title={selectedRole.title} badge={selectedRole.category}>
              <div className="space-y-5">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedRole.overview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Required Core Competencies</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRole.requiredSkills.map((s, idx) => (
                        <ACEBadge key={idx} variant="primary">{s}</ACEBadge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recommended Tech Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRole.recommendedTechnologies.map((t, idx) => (
                        <ACEBadge key={idx} variant="neutral">{t}</ACEBadge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 dark:text-emerald-300">Market Compensation Benchmark (India):</span>
                    <div className="text-emerald-700 dark:text-emerald-400 font-semibold text-sm mt-0.5">{selectedRole.averageSalaryIndia}</div>
                  </div>
                  <Link to="/career/profile">
                    <ACEButton variant="outline" size="sm">Set as Career Goal</ACEButton>
                  </Link>
                </div>
              </div>
            </ACECard>

            {/* Recommended Learning Roadmap */}
            <ACECard title="Curated Learning Roadmap">
              <div className="space-y-4">
                {selectedRole.learningPaths.map((lp) => (
                  <div key={lp.step} className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                    <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {lp.step}
                    </span>
                    <div className="flex-1">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm">{lp.title}</h5>
                      <span className="text-xs text-slate-500">{lp.duration} estimated duration</span>
                    </div>
                    <Link to="/learn">
                      <ACEButton variant="outline" size="sm">Start</ACEButton>
                    </Link>
                  </div>
                ))}
              </div>
            </ACECard>

            {/* Suggested Capstone Projects */}
            <ACECard title="Recommended Portfolio Capstones">
              <div className="space-y-3">
                {selectedRole.suggestedProjects.map((p, idx) => (
                  <div key={idx} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{p}</span>
                    </div>
                    <Link to="/project-lab">
                      <ACEButton variant="outline" size="sm">Build in Lab</ACEButton>
                    </Link>
                  </div>
                ))}
              </div>
            </ACECard>

          </div>

        </div>

      </div>
    </div>
  );
}
