import React, { useState } from 'react';
import { useMentor } from '../../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { GoalCategory } from '../../../types/mentorship';

export const StudentMentorGoalsPage: React.FC = () => {
  const { studentGoals, toggleMilestone, createStudentGoal } = useMentor();

  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState<GoalCategory>('CAREER');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('2026-12-15');
  const [m1Title, setM1Title] = useState('');
  const [m1Desc, setM1Desc] = useState('');
  const [m2Title, setM2Title] = useState('');
  const [m2Desc, setM2Desc] = useState('');
  const [m3Title, setM3Title] = useState('');
  const [m3Desc, setM3Desc] = useState('');

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const milestones = [
      { id: `ms-1-${Date.now()}`, monthIndex: 1, title: m1Title || 'Month 1 Checkpoint', description: m1Desc || 'Initial deliverable', completed: false },
      { id: `ms-2-${Date.now()}`, monthIndex: 2, title: m2Title || 'Month 2 Checkpoint', description: m2Desc || 'Core development and benchmark', completed: false },
      { id: `ms-3-${Date.now()}`, monthIndex: 3, title: m3Title || 'Month 3 Checkpoint', description: m3Desc || 'Final review & deployment', completed: false }
    ];

    await createStudentGoal({
      title,
      description,
      category,
      targetDate,
      priority: 'HIGH',
      milestones
    });
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/student/mentorship" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentorship Hub
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Success Plans & Milestones</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Structured 3-month milestone roadmaps tracked dynamically with your college domain mentors.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" /> Add New Goal Roadmap
          </button>
        </div>

        <div className="space-y-6">
          {studentGoals.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No active goals or milestone plans created yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Define milestone goals with your mentor to track placements, research, or projects.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Create Goal Roadmap
              </button>
            </div>
          ) : (
            studentGoals.map(goal => {
              const completedCount = goal.milestones.filter(m => m.completed).length;
              const totalCount = goal.milestones.length;
              return (
                <div key={goal.id} className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm dark:shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                          {goal.category}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {goal.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{goal.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{goal.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{goal.progressPercentage}%</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Target: {goal.targetDate}</p>
                    </div>
                  </div>

                  {/* Dynamic Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${goal.progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{completedCount} of {totalCount} Milestones Completed</span>
                      <span>{goal.progressPercentage === 100 ? '🎉 Goal Achieved!' : 'In Progress'}</span>
                    </div>
                  </div>

                  {/* Milestones List */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">3-Month Milestone Roadmap</h4>
                    {goal.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        onClick={() => toggleMilestone(goal.id, milestone.id)}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-600 transition"
                      >
                        {milestone.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-0.5 flex-1">
                          <p className={`text-xs font-semibold ${milestone.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                            Month {milestone.monthIndex}: {milestone.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{milestone.description}</p>
                          {milestone.completedAt && (
                            <span className="inline-block text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                              Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {goal.mentorReviewNotes && (
                    <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-xs">
                      <span className="font-bold text-indigo-700 dark:text-indigo-300">Mentor Guidance Feedback:</span>
                      <p className="text-slate-700 dark:text-slate-300 mt-1 italic leading-relaxed">"{goal.mentorReviewNotes}"</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Add Goal Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl my-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create 3-Month Goal Roadmap</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Set milestones and track progress with your mentor</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-200 text-sm font-bold">✕</button>
              </div>

              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as GoalCategory)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="CAREER">Career & Placements</option>
                      <option value="PROJECT">Technical Project</option>
                      <option value="COMPETITION">Hackathons & Competitions</option>
                      <option value="ACADEMIC">Academic Excellence</option>
                      <option value="RESEARCH">Higher Studies & Research</option>
                      <option value="STARTUP">Startup & Innovation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Completion Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={e => setTargetDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Goal Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Master Full-Stack Architecture & Publish Research Paper"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description & Expected Outcomes</label>
                  <textarea
                    rows={2}
                    placeholder="Outline your goal specifics and what you aim to achieve..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    required
                  />
                </div>

                {/* 3 Milestones */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">3-Month Milestones Breakdown</h4>
                  
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Month 1 Milestone</span>
                    <input
                      type="text"
                      placeholder="Title: e.g. Literature Survey & System Architecture Proposal"
                      value={m1Title}
                      onChange={e => setM1Title(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description: Deliverable details..."
                      value={m1Desc}
                      onChange={e => setM1Desc(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Month 2 Milestone</span>
                    <input
                      type="text"
                      placeholder="Title: e.g. Core Pipeline Implementation & Benchmarking"
                      value={m2Title}
                      onChange={e => setM2Title(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description: Deliverable details..."
                      value={m2Desc}
                      onChange={e => setM2Desc(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Month 3 Milestone</span>
                    <input
                      type="text"
                      placeholder="Title: e.g. Deployment, Final Paper Submission & Mock Interviews"
                      value={m3Title}
                      onChange={e => setM3Title(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description: Deliverable details..."
                      value={m3Desc}
                      onChange={e => setM3Desc(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                  >
                    Save Goal & Milestones
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
