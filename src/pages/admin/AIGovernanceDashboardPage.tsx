import React from 'react';
import { ShieldCheck, Server, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';
import { aiAuditLogDatabase } from '../../services/db/aiAuditLogDatabase';
import { aiProviderAdapter } from '../../services/db/aiProviderAdapter';

export const AIGovernanceDashboardPage: React.FC = () => {
  const logs = aiAuditLogDatabase.getLogs(20);
  const providerStatus = aiProviderAdapter.getProviderStatus();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform AI Governance
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            AI Safety, Tool Permissions & Audit Trail
          </h1>
          <p className="text-xs text-slate-500">
            Inspect live inference latency, rate limit status, and cryptographic audit log entries for all AI actions.
          </p>
        </div>

        {/* Provider Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Active Engine</div>
            <div className="text-base font-bold text-slate-900 dark:text-white mt-1">{providerStatus.providerName}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Status: Operational ✓</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Rate Limit Utilization</div>
            <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {providerStatus.currentMinuteCalls} / {providerStatus.rateLimitPerMinute} rpm
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Requests in past 60s</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Safety Guardrails</div>
            <div className="text-base font-bold text-emerald-600 mt-1">Strict RBAC Enforced</div>
            <div className="text-[11px] text-slate-500 mt-1">Restricted DB Mutate Blocked</div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" /> Recent AI Action Audit Trail ({logs.length})
          </h3>
          <div className="space-y-2">
            {logs.map(l => (
              <div key={l.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{l.toolName}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                      {l.roleContext}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{l.resultStatus}</span>
                  </div>
                  <div className="text-slate-500 mt-0.5">{l.actionSummary}</div>
                </div>
                <div className="text-[10px] text-slate-400 self-end sm:self-center">
                  {new Date(l.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
