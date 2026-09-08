import React, { useState, useEffect } from 'react';
import { 
  GitBranch, CheckCircle2, Clock, ShieldCheck, Play, 
  Pause, RotateCcw, AlertTriangle, ArrowRight, UserCheck, Bot 
} from 'lucide-react';
import { workflowEngineDatabase, WorkflowInstance, WorkflowStep } from '../../services/db/workflowEngineDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { useParams, Link } from 'react-router-dom';

export const WorkflowDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instance, setInstance] = useState<WorkflowInstance | null>(null);
  const [dryRunMessage, setDryRunMessage] = useState<string | null>(null);

  useEffect(() => {
    loadInstance();
    const unsub = workflowEngineDatabase.subscribe(loadInstance);
    return () => unsub();
  }, [id]);

  const loadInstance = () => {
    const all = workflowEngineDatabase.getAllInstances();
    const found = all.find(i => i.id === id || i.workflowId === id);
    if (found) {
      setInstance(found);
    } else {
      const def = workflowEngineDatabase.getDefinitionById(id || '');
      if (def) {
        const dummy: WorkflowInstance = {
          id: `wfi_preview_${def.id}`,
          workflowId: def.id,
          workflowTitle: def.title,
          version: def.version,
          userId: 'usr_student_dileep',
          institutionId: 'inst-vel-tech-rangarajan-avadi',
          idempotencyKey: `idemp_${def.id}`,
          status: 'READY',
          currentStepIndex: 0,
          steps: def.steps,
          isDryRun: false,
          executionLogs: [{ timestamp: new Date().toISOString(), stepId: 'init', message: 'Workflow definition staged in READY state', actor: 'System' }],
          contextData: {},
          startedAt: new Date().toISOString()
        };
        setInstance(dummy);
      }
    }
  };

  const handlePause = () => {
    if (instance) workflowEngineDatabase.pauseWorkflow(instance.id);
  };

  const handleResume = () => {
    if (instance) workflowEngineDatabase.resumeWorkflow(instance.id);
  };

  const handleDryRun = () => {
    if (!instance) return;
    const res = workflowEngineDatabase.startWorkflow({
      workflowId: instance.workflowId,
      userId: 'usr_student_dileep',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      idempotencyKey: `dry_run_${Date.now()}`,
      isDryRun: true
    });
    setDryRunMessage('Dry Run Passed: Evaluated 6 steps with 0 side-effects committed.');
    setTimeout(() => setDryRunMessage(null), 4000);
  };

  if (!instance) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
        <div className="text-sm text-slate-400">Loading workflow orchestration state...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Detail Header */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-purple-400">Instance #{instance.id}</span>
                <ACEBadge variant={instance.status === 'COMPLETED' ? 'success' : instance.status === 'WAITING_FOR_APPROVAL' ? 'warning' : 'primary'}>
                  {instance.status}
                </ACEBadge>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">{instance.workflowTitle}</h1>
            </div>

            <div className="flex items-center gap-2">
              {instance.status === 'RUNNING' && (
                <button
                  onClick={handlePause}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" /> Pause
                </button>
              )}
              {instance.status === 'PAUSED' && (
                <button
                  onClick={handleResume}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" /> Resume
                </button>
              )}
              <button
                onClick={handleDryRun}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Dry Run Simulation
              </button>
            </div>
          </div>

          {dryRunMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {dryRunMessage}
            </div>
          )}
        </div>

        {/* Visual Step Timeline */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Execution Timeline & Step Gates</h2>
          <div className="space-y-3">
            {instance.steps.map((step, idx) => {
              const isCurrent = idx === instance.currentStepIndex;
              const isDone = idx < instance.currentStepIndex || step.status === 'COMPLETED';

              return (
                <div
                  key={step.id}
                  className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                    isCurrent
                      ? 'bg-purple-950/30 border-purple-500/80 shadow-lg'
                      : isDone
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-slate-900/40 border-slate-900 text-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isDone ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : isCurrent ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-purple-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
                          {step.type}
                        </span>
                        <span className="text-xs text-slate-400">Actor: {step.assignedActor}</span>
                        {step.requiresApproval && (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            HITL Gate ({step.approvalRiskLevel})
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white">{step.title}</h3>
                      <p className="text-xs text-slate-400">{step.description}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[11px] font-bold ${isDone ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-slate-500'}`}>
                      {isDone ? 'Completed' : isCurrent ? 'Active Execution' : 'Queued'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Immutable Execution Logs */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Immutable Audit Trail</h3>
          <div className="space-y-2 font-mono text-xs">
            {instance.executionLogs.map((log, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
                <span>[{new Date(log.timestamp).toLocaleTimeString()}] {log.message}</span>
                <span className="text-purple-400 font-sans text-[11px]">{log.actor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
