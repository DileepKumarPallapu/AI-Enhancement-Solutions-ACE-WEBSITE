import React, { useState } from 'react';
import { aiProjectMentorDatabase, ProjectArchitecturePlan } from '../../services/db/aiProjectMentorDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Target, Terminal, CheckCircle2, Copy, FileText, Layers, Share2 } from 'lucide-react';

export function AIProjectMentorPage() {
  const [projectTitle, setProjectTitle] = useState('NeuralCore Autonomous Verification Engine');
  const [domain, setDomain] = useState('Distributed AI & Cryptographic Credentials');
  const [plan, setPlan] = useState<ProjectArchitecturePlan>(
    aiProjectMentorDatabase.generateArchitecturePlan(projectTitle, domain)
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = aiProjectMentorDatabase.generateArchitecturePlan(projectTitle, domain);
    setPlan(newPlan);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="AI Project Architecture & Engineering Mentor"
          description="Generates production-grade system designs, milestone breakdowns, and README blueprints tied to authentic ACE projects."
          badge="SYSTEM ARCHITECTURE OS"
        />

        {/* Input Configuration */}
        <ACECard className="p-6 space-y-4">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Project Name</label>
              <input
                type="text"
                value={projectTitle}
                onChange={e => setProjectTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Technical Domain</label>
              <input
                type="text"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
            >
              Regenerate Blueprint
            </button>
          </form>
        </ACECard>

        {/* Components Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" /> System Architecture Components
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.systemComponents.map((comp, idx) => (
              <ACECard key={idx} className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{comp.name}</h4>
                  <ACEBadge variant="primary" size="sm">{comp.tech}</ACEBadge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{comp.role}</p>
              </ACECard>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-500" /> Milestone Task Breakdown
          </h3>
          <div className="space-y-3">
            {plan.milestones.map((m, idx) => (
              <ACECard key={idx} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{m.phase}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Est: {m.estimatedDays} Days</span>
                </div>
                <div className="space-y-1">
                  {m.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </ACECard>
            ))}
          </div>
        </div>

        {/* Generated README snippet */}
        <ACECard className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Generated README Blueprint</h3>
            <button
              onClick={() => navigator.clipboard.writeText(plan.generatedReadmeSnippet)}
              className="text-xs text-indigo-500 font-bold flex items-center gap-1 hover:underline"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Markdown
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto">
            {plan.generatedReadmeSnippet}
          </pre>
        </ACECard>

      </div>
    </div>
  );
}
