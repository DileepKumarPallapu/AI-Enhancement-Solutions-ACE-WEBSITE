import React, { useState } from 'react';
import { GitBranch, Clock, ArrowRight } from 'lucide-react';
import { workflowEngineDatabase } from '../../services/db/workflowEngineDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const WorkflowRunsPage: React.FC = () => {
  const instances = workflowEngineDatabase.getAllInstances();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <h1 className="text-2xl font-black text-white">Workflow Execution Runs</h1>
          <p className="text-xs text-slate-400">Chronological history of active and completed autonomous workflow runs.</p>
        </div>

        <div className="space-y-3">
          {instances.map(inst => (
            <div key={inst.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-purple-400">{inst.id}</span>
                <h3 className="font-bold text-white text-base">{inst.workflowTitle}</h3>
                <div className="text-xs text-slate-400">Started: {new Date(inst.startedAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <ACEBadge variant="primary">{inst.status}</ACEBadge>
                <Link to={`/workflows/${inst.id}`} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold">
                  View Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
