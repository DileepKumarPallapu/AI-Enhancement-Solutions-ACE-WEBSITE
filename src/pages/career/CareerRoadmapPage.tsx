import React, { useState } from 'react';
import { 
  GitBranch, CheckCircle2, ChevronRight, BookOpen, 
  Trophy, Award, Sparkles, Star, Cpu 
} from 'lucide-react';
import { careerRoadmapDb, CareerRoleRoadmap } from '../../services/db/careerRoadmapDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const CareerRoadmapPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('ai-engineer');
  const roadmap = careerRoadmapDb.getRoadmap(selectedRole);

  if (!roadmap) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <GitBranch className="w-3.5 h-3.5" /> Dynamic Career Roadmap
            </span>
            <h1 className="text-3xl font-extrabold text-white">{roadmap.roleTitle}</h1>
            <p className="text-sm text-slate-400">
              Industry demand: <strong className="text-emerald-400">{roadmap.demandLevel}</strong> • Avg Package: <strong className="text-white">{roadmap.avgStartingPackage}</strong>
            </p>
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
          >
            <option value="ai-engineer">AI & Machine Learning Engineer</option>
            <option value="fullstack-engineer">Full-Stack Software Engineer</option>
          </select>
        </div>

        <div className="space-y-6">
          {roadmap.milestones.map((milestone) => (
            <div key={milestone.level} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                    {milestone.level}
                  </div>
                  <h3 className="font-bold text-white text-base">{milestone.title}</h3>
                </div>
                <ACEBadge variant="primary">Phase {milestone.level}</ACEBadge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-semibold text-indigo-400 block">Core Skills to Master:</span>
                  <div className="flex flex-wrap gap-1">
                    {milestone.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-semibold text-emerald-400 block">Suggested Proof-of-Work:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {milestone.suggestedProjects.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-semibold text-amber-400 block">Verification Benchmark:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {milestone.assessments.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CareerRoadmapPage;
