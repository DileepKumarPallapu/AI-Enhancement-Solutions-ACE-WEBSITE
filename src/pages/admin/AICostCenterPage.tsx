import React from 'react';
import { Cpu, DollarSign, Activity, ShieldCheck } from 'lucide-react';
import { aiWorkflowAgentDatabase } from '../../services/db/aiWorkflowAgentDatabase';

export const AICostCenterPage: React.FC = () => {
  const agents = aiWorkflowAgentDatabase.getAgents();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-2">
          <h1 className="text-2xl font-black text-white">AI Cost Center & Token Telemetry</h1>
          <p className="text-xs text-slate-400">Monitor token consumption, latency, and estimated cloud model costs in real time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map(agent => (
            <div key={agent.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{agent.name}</h3>
                  <p className="text-xs text-slate-400">{agent.role}</p>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-bold">Active</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-xs space-y-2 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Tokens Consumed:</span>
                  <span className="text-white font-bold">{agent.tokensConsumedThisMonth.toLocaleString()} / {agent.monthlyTokenQuota.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Cost:</span>
                  <span className="text-emerald-400 font-bold">${agent.estimatedCostUSD.toFixed(4)} USD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
