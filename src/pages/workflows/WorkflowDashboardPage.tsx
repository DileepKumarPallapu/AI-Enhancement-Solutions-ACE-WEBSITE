import React, { useState, useEffect } from 'react';
import { 
  GitBranch, Play, CheckCircle2, Clock, AlertTriangle, 
  Sparkles, Plus, ArrowRight, ShieldCheck, PauseCircle, RefreshCw 
} from 'lucide-react';
import { workflowEngineDatabase, WorkflowDefinition, WorkflowInstance } from '../../services/db/workflowEngineDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link, useNavigate } from 'react-router-dom';

export const WorkflowDashboardPage: React.FC = () => {
  const [definitions, setDefinitions] = useState<WorkflowDefinition[]>([]);
  const [instances, setInstances] = useState<WorkflowInstance[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
    const unsub = workflowEngineDatabase.subscribe(loadData);
    return () => unsub();
  }, []);

  const loadData = () => {
    setDefinitions(workflowEngineDatabase.getAllDefinitions());
    setInstances(workflowEngineDatabase.getAllInstances());
  };

  const handleStartWorkflow = (defId: string) => {
    const res = workflowEngineDatabase.startWorkflow({
      workflowId: defId,
      userId: 'usr_student_dileep',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      idempotencyKey: `idemp_${defId}_${Date.now()}`
    });
    navigate(`/workflows/${res.instance.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="p-6 md:p-10 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 w-fit">
              <GitBranch className="w-3.5 h-3.5 text-purple-400" /> ACE 120X Workflow OS
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white">Your Work, Orchestrated.</h1>
            <p className="text-sm md:text-base text-slate-300">
              Define, automate, monitor, and execute multi-step academic, career, and competition workflows with strict Human-In-The-Loop approval gates.
            </p>
          </div>

          <Link
            to="/workflows/new"
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Workflow
          </Link>
        </div>

        {/* Quick Hub Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/tasks" className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Universal Tasks</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{workflowEngineDatabase.getAllTasks().filter(t => t.status !== 'COMPLETED').length}</div>
            <div className="text-[11px] text-slate-500">Pending student actions</div>
          </Link>

          <Link to="/approvals" className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Approval Center</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{workflowEngineDatabase.getAllApprovals().filter(a => a.status === 'PENDING').length}</div>
            <div className="text-[11px] text-slate-500">Human gate decisions</div>
          </Link>

          <Link to="/automations" className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Automations</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{workflowEngineDatabase.getAllAutomations().filter(a => a.isEnabled).length}</div>
            <div className="text-[11px] text-slate-500">Event-driven rules</div>
          </Link>

          <Link to="/ai/actions" className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">AI Action Hub</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">1</div>
            <div className="text-[11px] text-slate-500">Gated AI tool proposals</div>
          </Link>
        </div>

        {/* Active Running Instances */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> Active Executions
            </h2>
            <span className="text-xs text-slate-400">{instances.length} active instances</span>
          </div>

          <div className="space-y-3">
            {instances.map(inst => (
              <div
                key={inst.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-400">{inst.workflowId}</span>
                    <ACEBadge variant={inst.status === 'WAITING_FOR_APPROVAL' ? 'warning' : 'primary'}>
                      {inst.status}
                    </ACEBadge>
                    <span className="text-xs text-slate-400">• Step {inst.currentStepIndex + 1} of {inst.steps.length}</span>
                  </div>
                  <h3 className="font-extrabold text-white text-base">{inst.workflowTitle}</h3>
                  <div className="text-xs text-slate-400">
                    Target: {inst.contextData?.targetOpportunity || 'Student Journey'} • Started: {new Date(inst.startedAt).toLocaleTimeString()}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link
                    to={`/workflows/${inst.id}`}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    Open Live Tracker <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Template Gallery */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-400" /> Ready-to-Use Workflow Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {definitions.map(def => (
              <div key={def.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded-md">
                      {def.category}
                    </span>
                    <ACEBadge variant="neutral">v{def.version}</ACEBadge>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{def.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{def.description}</p>
                  <div className="text-xs text-slate-500">{def.steps.length} Orchestrated Steps (Includes AI & Mentor Gates)</div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <Link to={`/workflows/${def.id}/edit`} className="text-xs text-slate-400 hover:text-white">
                    Edit Steps
                  </Link>
                  <button
                    onClick={() => handleStartWorkflow(def.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" /> Start Workflow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
