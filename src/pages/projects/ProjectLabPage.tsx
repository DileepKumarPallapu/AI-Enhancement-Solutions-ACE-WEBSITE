import React, { useState } from "react";
import { 
  Cpu, Users, GitBranch, CheckSquare, Plus, ExternalLink, 
  MessageSquare, Star, Sparkles, FolderGit2, ShieldCheck, Flame
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

interface ProjectSquad {
  id: string;
  title: string;
  category: string;
  status: "Recruiting" | "In Sprint" | "Demo Ready" | "Evaluated";
  membersCount: number;
  maxMembers: number;
  mentorScore: number;
  sprintProgress: number;
  techStack: string[];
}

export const ProjectLabPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [squads, setSquads] = useState<ProjectSquad[]>([
    {
      id: "squad_1",
      title: "Decentralized Credential Verification Protocol",
      category: "Web3 & Distributed Systems",
      status: "In Sprint",
      membersCount: 4,
      maxMembers: 4,
      mentorScore: 92,
      sprintProgress: 75,
      techStack: ["TypeScript", "Solidity", "Node.js", "IPFS"]
    },
    {
      id: "squad_2",
      title: "Campus AI Opportunity Matching Engine",
      category: "AI & Data Science",
      status: "In Sprint",
      membersCount: 3,
      maxMembers: 4,
      mentorScore: 88,
      sprintProgress: 60,
      techStack: ["Python", "FastAPI", "React", "Pinecone"]
    },
    {
      id: "squad_3",
      title: "Real-Time Collaborative Code Playground",
      category: "Full-Stack Web",
      status: "Demo Ready",
      membersCount: 4,
      maxMembers: 4,
      mentorScore: 96,
      sprintProgress: 100,
      techStack: ["Next.js", "WebSockets", "Docker", "Redis"]
    }
  ]);

  const handleJoinSquad = (title: string) => {
    showToast(`Application sent to join squad "${title}"!`, "success");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
              <Cpu className="w-3.5 h-3.5" /> Innovation Incubator
            </span>
            <h1 className="text-3xl font-extrabold text-white">ACE Project Lab & Innovation Incubator</h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Form cross-functional engineering squads, execute real 2-week sprints, link GitHub repositories, and get faculty mentor endorsements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {squads.map((squad) => (
            <div key={squad.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800">
                    {squad.category}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded font-semibold ${
                    squad.status === "Demo Ready" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" :
                    "bg-amber-950 text-amber-300 border border-amber-800"
                  }`}>
                    {squad.status}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug">{squad.title}</h3>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sprint Milestone</span>
                    <span className="font-mono font-semibold text-white">{squad.sprintProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${squad.sprintProgress}%` }} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {squad.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Users className="w-4 h-4 text-slate-500" />
                  {squad.membersCount}/{squad.maxMembers} Members
                </span>
                <button
                  onClick={() => handleJoinSquad(squad.title)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all cursor-pointer"
                >
                  Join Squad
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectLabPage;
