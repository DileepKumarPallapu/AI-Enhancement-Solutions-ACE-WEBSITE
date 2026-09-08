import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, X, ArrowRight, AlertTriangle, UserCheck } from 'lucide-react';
import { workflowEngineDatabase, WorkflowApproval } from '../../services/db/workflowEngineDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const WorkflowApprovalCenterPage: React.FC = () => {
  const [approvals, setApprovals] = useState<WorkflowApproval[]>([]);
  const [activeDecisionMsg, setActiveDecisionMsg] = useState<string | null>(null);

  useEffect(() => {
    loadApprovals();
    const unsub = workflowEngineDatabase.subscribe(loadApprovals);
    return () => unsub();
  }, []);

  const loadApprovals = () => {
    setApprovals(workflowEngineDatabase.getAllApprovals());
  };

  const handleDecision = (id: string, decision: 'APPROVE' | 'REJECT') => {
    workflowEngineDatabase.processApproval(id, decision, 'Decision recorded via Approval Center');
    setActiveDecisionMsg(`Approval #${id} marked as ${decision}.`);
    setTimeout(() => setActiveDecisionMsg(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Human-In-The-Loop Security Barrier
          </span>
          <h1 className="text-3xl font-extrabold text-white">Workflow Approvals Center</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Critical decision gates requiring human verification. AI agents propose actions, but authority remains strictly with faculty mentors, administrators, and students.
          </p>
        </div>

        {activeDecisionMsg && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-800/60 rounded-2xl text-xs text-emerald-300 font-semibold">
            {activeDecisionMsg}
          </div>
        )}

        <div className="space-y-4">
          {approvals.map(appr => (
            <div key={appr.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">Approval Ticket #{appr.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {appr.riskLevel} RISK
                    </span>
                    <ACEBadge variant={appr.status === 'APPROVED' ? 'success' : appr.status === 'REJECTED' ? 'danger' : 'warning'}>
                      {appr.status}
                    </ACEBadge>
                  </div>
                  <h3 className="text-lg font-bold text-white">{appr.requestedAction}</h3>
                  <p className="text-xs text-slate-400">Requester: {appr.requesterName} ({appr.requesterType}) • Target: {appr.targetRecord}</p>
                </div>

                <div className="text-right text-xs text-slate-500">
                  {new Date(appr.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400">Proposed State Changes Preview:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  {Object.entries(appr.changePreview).map(([key, diff]) => (
                    <div key={key} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400">{key}: </span>
                      <span className="text-rose-400 line-through">{String(diff.before)}</span>
                      <span className="text-slate-500"> → </span>
                      <span className="text-emerald-400 font-bold">{String(diff.after)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {appr.status === 'PENDING' && (
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => handleDecision(appr.id, 'REJECT')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => handleDecision(appr.id, 'APPROVE')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow transition-all"
                  >
                    <Check className="w-3.5 h-3.5" /> Authorize & Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
