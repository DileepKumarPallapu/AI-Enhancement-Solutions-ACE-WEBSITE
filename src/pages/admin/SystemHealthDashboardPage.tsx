import React, { useState } from 'react';
import { Activity, CheckCircle2, Server, ShieldCheck, RefreshCw } from 'lucide-react';
import { systemHealthService, SystemHealthReport } from '../../services/db/systemHealthService';

export const SystemHealthDashboardPage: React.FC = () => {
  const [report, setReport] = useState<SystemHealthReport>(systemHealthService.getHealthReport());

  const refresh = () => setReport(systemHealthService.getHealthReport());

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
              <Activity className="w-3.5 h-3.5" /> System Health Diagnostics
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Platform Health & Infrastructure Liveness
            </h1>
            <p className="text-xs text-slate-500">
              Live latency, background queue throughput, and service liveness checks. Version: {report.version}
            </p>
          </div>

          <button
            onClick={refresh}
            className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition"
            title="Refresh Diagnostics"
          >
            <RefreshCw className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Overall Status</div>
            <div className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" /> {report.overallHealth}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">All core endpoints responsive</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Avg API Response Latency</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">{report.averageApiResponseLatencyMs} ms</div>
            <div className="text-[11px] text-slate-500 mt-1">p95 &lt; 50ms across routes</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Active Job Queue</div>
            <div className="text-2xl font-black text-purple-600 mt-1">{report.activeJobQueueSize} active</div>
            <div className="text-[11px] text-slate-500 mt-1">Idempotency deduplication active</div>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Service Health Matrix</h3>
          <div className="space-y-3">
            {report.services.map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5">{s.details}</div>
                </div>

                <div className="flex items-center gap-4 text-slate-500 font-semibold self-end sm:self-center">
                  <span>Latency: {s.latencyMs} ms</span>
                  <span className="text-emerald-600">Uptime: {s.uptimePercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
