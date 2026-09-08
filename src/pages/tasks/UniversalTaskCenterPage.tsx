import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Sparkles, Filter, Check, Calendar, ArrowRight } from 'lucide-react';
import { workflowEngineDatabase, WorkflowTask, TaskPriority } from '../../services/db/workflowEngineDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const UniversalTaskCenterPage: React.FC = () => {
  const [tasks, setTasks] = useState<WorkflowTask[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'TODO' | 'WAITING' | 'COMPLETED'>('ALL');

  useEffect(() => {
    loadTasks();
    const unsub = workflowEngineDatabase.subscribe(loadTasks);
    return () => unsub();
  }, []);

  const loadTasks = () => {
    setTasks(workflowEngineDatabase.getAllTasks());
  };

  const handleComplete = (id: string) => {
    workflowEngineDatabase.completeTask(id);
  };

  const handleSnooze = (id: string) => {
    workflowEngineDatabase.snoozeTask(id, 2);
  };

  const filtered = tasks.filter(t => filter === 'ALL' || t.status === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Universal Task Command Center
          </span>
          <h1 className="text-3xl font-extrabold text-white">Actionable Student Tasks</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Centralized task pipeline unifying workflow actions, faculty mentor recommendations, and autonomous AI suggestions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {(['ALL', 'TODO', 'WAITING', 'COMPLETED'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === f ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        <div className="space-y-3">
          {filtered.map(task => (
            <div
              key={task.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                    {task.priority} PRIORITY
                  </span>
                  <ACEBadge variant={task.status === 'COMPLETED' ? 'success' : 'warning'}>{task.status}</ACEBadge>
                  <span className="text-xs text-slate-500">• {task.source}</span>
                </div>
                <h3 className={`font-bold text-base ${task.status === 'COMPLETED' ? 'line-through text-slate-500' : 'text-white'}`}>
                  {task.title}
                </h3>
                <p className="text-xs text-slate-400">{task.description}</p>
                <div className="text-xs text-slate-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                {task.status !== 'COMPLETED' && (
                  <>
                    <button
                      onClick={() => handleSnooze(task.id)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold cursor-pointer"
                    >
                      Snooze (+2d)
                    </button>
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Done
                    </button>
                  </>
                )}
                {task.actionUrl && (
                  <Link
                    to={task.actionUrl}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 font-bold"
                  >
                    Open Action <ArrowRight className="w-3.5 h-3.5 inline" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
