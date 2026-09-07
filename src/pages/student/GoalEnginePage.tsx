import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Circle, Clock, Trash2, Sparkles } from 'lucide-react';
import { aiGoalDatabase, StudentGoal } from '../../services/db/aiGoalDatabase';

export const GoalEnginePage: React.FC = () => {
  const [goals, setGoals] = useState<StudentGoal[]>(aiGoalDatabase.getGoals('usr-student-001'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<StudentGoal['category']>('CAREER');
  const [priority, setPriority] = useState<StudentGoal['priority']>('HIGH');
  const [targetDate, setTargetDate] = useState('2026-06-30');
  const [showCreate, setShowCreate] = useState(false);

  const refresh = () => setGoals(aiGoalDatabase.getGoals('usr-student-001'));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const milestones = aiGoalDatabase.generateRoadmapForGoal(title, category);
    aiGoalDatabase.createGoal({
      userId: 'usr-student-001',
      title,
      description,
      category,
      priority,
      targetDate,
      status: 'Active',
      milestones,
      aiSuggested: false
    });

    setTitle('');
    setDescription('');
    setShowCreate(false);
    refresh();
  };

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    aiGoalDatabase.toggleMilestone(goalId, milestoneId);
    refresh();
  };

  const handleDelete = (goalId: string) => {
    aiGoalDatabase.deleteGoal(goalId);
    refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
              <Target className="w-3.5 h-3.5" /> AI Goal Engine
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              My Goals & Action Roadmaps
            </h1>
            <p className="text-xs text-slate-500">
              Set goals, generate actionable milestone roadmaps, and track execution across your ACE journey.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition flex items-center gap-2 shadow-md shadow-indigo-600/20 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> {showCreate ? 'Cancel' : 'Create New Goal'}
          </button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 shadow-lg space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Define New Goal & Auto-Generate Roadmap
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Goal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Backend Engineering with Node & PostgreSQL"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="CAREER">Career & Placements</option>
                  <option value="LEARNING">Skill Mastery & Courses</option>
                  <option value="PROJECT">Showcase Project Lab</option>
                  <option value="COMPETITION">Hackathons & Arena</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="HIGH">High Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="LOW">Low Priority</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Description (Optional)</label>
              <textarea
                rows={2}
                placeholder="Key outcomes, expected achievements, or notes..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow"
            >
              Save Goal & Generate Action Plan
            </button>
          </form>
        )}

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map(goal => (
            <div key={goal.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase">
                      {goal.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      goal.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      goal.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {goal.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{goal.title}</h2>
                  {goal.description && <p className="text-xs text-slate-500 mt-0.5">{goal.description}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{goal.progress}% Complete</div>
                    <div className="text-[10px] text-slate-400">Target: {goal.targetDate}</div>
                  </div>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    title="Delete Goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${goal.progress}%` }} />
              </div>

              {/* Milestones Action Roadmap */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Action Plan Milestones:</div>
                <div className="space-y-1.5">
                  {goal.milestones.map(m => (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMilestone(goal.id, m.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                        m.completed 
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 text-slate-500 line-through'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300'
                      }`}
                    >
                      {m.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{m.title}</div>
                        <div className="text-[11px] text-slate-500">{m.description}</div>
                      </div>
                      {m.targetDate && (
                        <span className="text-[10px] font-semibold text-slate-400 flex-shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {m.targetDate}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
