import React, { useState } from 'react';
import { Bot, ShieldCheck, Check, X, AlertTriangle } from 'lucide-react';
import { aiWorkflowAgentDatabase, AIActionProposal } from '../../services/db/aiWorkflowAgentDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const AIActionCenterPage: React.FC = () => {
  const [proposals, setProposals] = useState<AIActionProposal[]>(aiWorkflowAgentDatabase.getProposals());

  const handleApprove = (id: string) => {
    aiWorkflowAgentDatabase.approveProposal(id);
    setProposals(aiWorkflowAgentDatabase.getProposals());
  };

  const handleReject = (id: string) => {
    aiWorkflowAgentDatabase.rejectProposal(id);
    setProposals(aiWorkflowAgentDatabase.getProposals());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 w-fit">
            <Bot className="w-3.5 h-3.5 text-blue-400" /> Autonomous AI Action Center
          </span>
          <h1 className="text-3xl font-extrabold text-white">Gated AI Tool Proposals</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Review and authorize autonomous AI agent tool execution requests. High-risk operations (wallet mutations, certificates, recruiter transmissions) are blocked until approved.
          </p>
        </div>

        <div className="space-y-4">
          {proposals.map(p => (
            <div key={p.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{p.agentName}</span>
                    <ACEBadge variant="warning">{p.riskLevel} RISK</ACEBadge>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">Requested Tool: {p.requestedTool}</h3>
                </div>
                <ACEBadge variant={p.status === 'APPROVED' ? 'success' : 'warning'}>{p.status}</ACEBadge>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-xs space-y-2">
                <div><span className="text-slate-400">Rationale:</span> <span className="text-slate-200">{p.reason}</span></div>
                <div><span className="text-slate-400">Impact:</span> <span className="text-amber-300">{p.affectedDataDescription}</span></div>
              </div>

              {p.status === 'PENDING_APPROVAL' && (
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleReject(p.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer shadow"
                  >
                    Approve Tool Call
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
