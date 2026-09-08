import React, { useState } from 'react';
import { AlertCircle, RotateCcw, CheckCircle2 } from 'lucide-react';
import { workflowEngineDatabase, WorkflowFailureRecord } from '../../services/db/workflowEngineDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const WorkflowFailureCenterPage: React.FC = () => {
  const [failures, setFailures] = useState<WorkflowFailureRecord[]>(workflowEngineDatabase.getAllFailures());
  const [retryMsg, setRetryMsg] = useState<string | null>(null);

  const handleRetry = (id: string) => {
    workflowEngineDatabase.retryFailure(id);
    setFailures(workflowEngineDatabase.getAllFailures());
    setRetryMsg(`Dispatched retry for failure ticket #${id}.`);
    setTimeout(() => setRetryMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-800/40 space-y-2">
          <h1 className="text-2xl font-black text-white">Workflow Failure & Dead-Letter Center</h1>
          <p className="text-xs text-slate-300">Triage caught execution exceptions, rate-limit bottlenecks, and dispatch automated retries.</p>
        </div>

        {retryMsg && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-800/60 rounded-2xl text-xs text-emerald-300 font-semibold">
            {retryMsg}
          </div>
        )}

        <div className="space-y-4">
          {failures.map(f => (
            <div key={f.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-rose-400">Ticket #{f.id}</span>
                  <h3 className="font-bold text-white text-base mt-1">{f.workflowTitle}: {f.stepTitle}</h3>
                </div>
                <ACEBadge variant={f.status === 'RESOLVED' ? 'success' : 'danger'}>{f.status}</ACEBadge>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 font-mono text-xs text-rose-300">
                {f.errorMessage}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-500">Retry Count: {f.retryCount} / {f.maxRetries}</span>
                {f.status !== 'RESOLVED' && (
                  <button
                    onClick={() => handleRetry(f.id)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Dispatch Retry
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
