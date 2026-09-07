import React from 'react';
import { 
  Compass, GitBranch, Cpu, Briefcase, 
  Award, Bot, ArrowRight, UserCheck 
} from 'lucide-react';
import { ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { useNavigate } from 'react-router-dom';

export const CareerCenterPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'AI Career Copilot',
      desc: 'Get grounded guidance on role paths, resume improvements, and fellowships.',
      icon: Bot,
      url: '/career/copilot',
      tag: 'AI Intelligence'
    },
    {
      title: 'Dynamic Career Roadmaps',
      desc: 'Explore 18+ technical role roadmaps with verified proof-of-work milestones.',
      icon: GitBranch,
      url: '/career/roadmap',
      tag: '18+ Roles'
    },
    {
      title: 'Evidence-Based Skill Graph',
      desc: 'Inspect your mathematical competency matrix backed by real code repositories.',
      icon: Cpu,
      url: '/career/skills',
      tag: 'Evidence Graph'
    },
    {
      title: 'Interview Preparation Lab',
      desc: 'Practice technical and system design questions with instant AI rubrics.',
      icon: Briefcase,
      url: '/career/interview',
      tag: 'Mock Simulator'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
            <Compass className="w-3.5 h-3.5" /> ACE Career Launchpad
          </span>
          <h1 className="text-3xl font-extrabold text-white">Career Intelligence & Opportunity Readiness</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            From technical skill graphs to AI interview coaching and recruiter shortlists, navigate your path to high-impact engineering careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <ACECard
                key={sec.title}
                hoverable
                onClick={() => navigate(sec.url)}
                className="cursor-pointer space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ACEBadge variant="primary">{sec.tag}</ACEBadge>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base">{sec.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-indigo-400 font-semibold pt-2 border-t border-slate-800">
                  <span>Open Module</span> <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </ACECard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CareerCenterPage;
