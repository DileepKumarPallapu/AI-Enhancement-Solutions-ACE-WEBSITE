import React from 'react';
import { Shield, GitBranch, Cpu, AlertCircle, ArrowRight } from 'lucide-react';
import { workflowEngineDatabase } from '../../services/db/workflowEngineDatabase';
import { aiWorkflowAgentDatabase } from '../../services/db/aiWorkflowAgentDatabase';
import { Link } from 'react-router-dom';

export const AdminWorkflowOperationsPage: React.FC = () => {
  const agents = aiWorkflowAgentDatabase.getAgents();
  const tools = aiWorkflowAgentDatabase.getTools();
  const failures = workflowEngineDatabase.getAllFailures();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black text-white">Admin Workflow Operations & Telemetry</h1>
            <Link to="/admin/workflows/failures" className="px-4 py-2 bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold rounded-xl flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Failures ({failures.length})
            </Link>
          </div>
          <p className="text-xs text-slate-400">Monitor autonomous AI agents, token consumption quotas, and registered tools.</p>
        </div>

        {/* AI Agents Quotas */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Active Autonomous Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map(a => (
              <div key={a.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">{a.name}</h3>
                  <span className="text-xs text-emerald-400 font-mono font-bold">Active</span>
                </div>
                <p className="text-xs text-slate-400">{a.description}</p>
                <div className="p-3 bg-slate-950 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Token Consumption:</span>
                    <span className="font-mono text-white">{a.tokensConsumedThisMonth.toLocaleString()} / {a.monthlyTokenQuota.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Est. Cost:</span>
                    <span className="font-mono text-emerald-400">${a.estimatedCostUSD.toFixed(4)} USD</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registered Tools Inventory */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Tool Permission Inventory ({tools.length} Tools)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map(t => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-purple-400">{t.name}</div>
                <div className="text-[11px] text-slate-400">{t.description}</div>
                <div className="text-[10px] font-bold text-amber-400">
                  {t.requiresHumanApproval ? '⚠️ Requires Human Sign-off' : '✓ Autonomous Execution'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
