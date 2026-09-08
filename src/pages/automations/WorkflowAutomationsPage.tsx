import React, { useState } from 'react';
import { Sparkles, ToggleLeft, ToggleRight, Plus, ArrowRight } from 'lucide-react';
import { workflowEngineDatabase, WorkflowAutomationRule } from '../../services/db/workflowEngineDatabase';

export const WorkflowAutomationsPage: React.FC = () => {
  const [rules, setRules] = useState<WorkflowAutomationRule[]>(workflowEngineDatabase.getAllAutomations());

  const handleToggle = (id: string) => {
    workflowEngineDatabase.toggleAutomation(id);
    setRules(workflowEngineDatabase.getAllAutomations());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Event-Driven Rules Engine
          </span>
          <h1 className="text-3xl font-extrabold text-white">Platform Automations</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Configure reactive triggers (e.g. deadline approaches, event closes, milestone achieved) to spawn automated tasks and notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.map(rule => (
            <div key={rule.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{rule.name}</h3>
                  <span className="text-[10px] font-mono text-purple-400">Trigger: {rule.triggerEvent}</span>
                </div>
                <button onClick={() => handleToggle(rule.id)} className="cursor-pointer">
                  {rule.isEnabled ? (
                    <ToggleRight className="w-7 h-7 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-slate-600" />
                  )}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 text-xs space-y-1">
                <div className="text-slate-400">WHEN: {rule.conditionDescription}</div>
                <div className="text-purple-300 font-semibold">THEN: {rule.actionDescription}</div>
              </div>

              <div className="text-xs text-slate-500">Executions Triggered: {rule.executionCount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
