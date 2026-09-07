import React from 'react';
import { 
  Cpu, CheckCircle2, Award, BookOpen, 
  ArrowRight, ShieldCheck, Zap 
} from 'lucide-react';
import { ACEBadge, ACECard } from '../../components/ui/ace';

export const SkillGraphPage: React.FC = () => {
  const skills = [
    {
      name: 'React & TypeScript Full-Stack',
      confidence: 96,
      tier: 'Level 7 Mastery',
      evidence: ['Level 7 Merkle Certificate', '4 GitHub Monorepos', 'ACE Verification Test (Score 98%)'],
      relatedRoles: ['Full-Stack Engineer', 'Frontend Architect']
    },
    {
      name: 'Autonomous AI Agents & Multi-Agent Runtimes',
      confidence: 92,
      tier: 'Level 6 Advanced',
      evidence: ['National AI Hackathon Rank #1 Winner', 'Faculty Mentor Endorsement (Dr. Senthilkumar)'],
      relatedRoles: ['AI Systems Engineer', 'Research Fellow']
    },
    {
      name: 'ROS2 & Edge Robot Perception',
      confidence: 88,
      tier: 'Level 5 Proficient',
      evidence: ['Autonomous Ground Drone SLAM Deployment', 'Jetson Nano Edge Inference Lab'],
      relatedRoles: ['Robotics Engineer', 'Embedded Systems Lead']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <Cpu className="w-3.5 h-3.5" /> Evidence-Based Skill Graph
            </span>
            <h1 className="text-3xl font-extrabold text-white">Verified Technical Competency Matrix</h1>
            <p className="text-xs text-slate-400">Confidence scores are computed strictly from real code executions, hackathon wins, and faculty reviews.</p>
          </div>
        </div>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {skill.name}
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono">{skill.tier}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-400">{skill.confidence}%</span>
                  <span className="text-[11px] text-slate-400 block">Evidence Confidence</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-400">Backing Proof-of-Work:</span>
                <ul className="space-y-1">
                  {skill.evidence.map((ev, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SkillGraphPage;
