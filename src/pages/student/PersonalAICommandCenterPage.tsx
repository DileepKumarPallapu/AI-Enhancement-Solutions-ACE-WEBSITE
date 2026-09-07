import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Sparkles, Target, Compass, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, Zap, BookOpen, AlertCircle, RefreshCw
} from 'lucide-react';
import { aiGoalDatabase } from '../../services/db/aiGoalDatabase';
import { aiSkillGapDatabase } from '../../services/db/aiSkillGapDatabase';
import { aiAgentOrchestrator } from '../../services/db/aiOrchestratorService';

export const PersonalAICommandCenterPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [groundedFacts, setGroundedFacts] = useState<string[]>([]);

  const goals = aiGoalDatabase.getGoals('usr-student-001');
  const activeGoals = goals.filter(g => g.status === 'Active');
  const skillGap = aiSkillGapDatabase.analyzeGap('role-fsd', [
    { name: 'JavaScript', proficiency: 'INTERMEDIATE', verified: true },
    { name: 'React', proficiency: 'INTERMEDIATE', verified: true },
    { name: 'TypeScript', proficiency: 'BEGINNER', verified: true }
  ]);

  const handleAskACE = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await aiAgentOrchestrator.processNaturalCommand(query, 'STUDENT', 'usr-student-001');
      setAiResponse(res.response);
      setGroundedFacts(res.groundedFacts);
    } catch {
      setAiResponse('AI assistance is temporarily unavailable. Core platform data remains accessible.');
      setGroundedFacts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ACE 30X Autonomous Student Operating System</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Personal AI Command Center
              </h1>
              <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
                Grounded in your verified academic records, coursework at Vel Tech, active goals, and skill verifications. 
                <span className="text-amber-300 font-semibold block mt-1">Database = Authority. AI = Assistant.</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/student/goals"
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg flex items-center gap-2"
              >
                <Target className="w-4 h-4" /> My Goals
              </Link>
              <Link
                to="/student/today"
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/10 flex items-center gap-2"
              >
                <Clock className="w-4 h-4" /> Today's Actions
              </Link>
              <Link
                to="/settings/ai"
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/10 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> AI Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Ask ACE Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-600" /> Ask ACE Copilot
            </h2>
            <span className="text-xs text-slate-500">Natural command & data grounding</span>
          </div>

          <form onSubmit={handleAskACE} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. 'Show my upcoming deadlines', 'What is my wallet balance?', 'Analyze my full-stack skill gap'..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-2xl transition disabled:opacity-50 flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Ask</span>
            </button>
          </form>

          {aiResponse && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3 animate-fadeIn">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                AI Response (Authoritatively Grounded)
              </div>
              <div className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {aiResponse}
              </div>
              {groundedFacts.length > 0 && (
                <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">Grounded Database Citations:</div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                    {groundedFacts.map((fact, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Active Goals */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" /> Active Goals ({activeGoals.length})
              </h3>
              <Link to="/student/goals" className="text-xs font-semibold text-indigo-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {activeGoals.map(goal => (
                <div key={goal.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{goal.title}</span>
                    <span className="text-[11px] font-bold text-indigo-600">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${goal.progress}%` }} />
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} milestones</span>
                    <span>Target: {goal.targetDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Analysis */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Full-Stack Skill Gap
              </h3>
              <Link to="/student/skill-gap" className="text-xs font-semibold text-indigo-600 hover:underline">
                Analyze
              </Link>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Role Benchmark Match</span>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400">{skillGap.matchPercentage}%</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Verified: <span className="font-semibold text-emerald-600">{skillGap.matchedSkills.map(s => s.name).join(', ')}</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Recommended to learn: <span className="font-semibold text-rose-600">{skillGap.missingSkills.slice(0, 3).map(s => s.name).join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-600" /> AI Ecosystem Modules
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/student/brief" className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 transition">
                <span>☀️ Daily Morning Brief</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link to="/student/weekly-review" className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 transition">
                <span>📊 Weekly Progress Review</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link to="/student/career-simulator" className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 transition">
                <span>🚀 AI Career Trajectory Simulator</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link to="/student/analytics" className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 transition">
                <span>📈 Student Journey Analytics</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link to="/student/ai/memory" className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 transition">
                <span>🧠 AI Memory Manager</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
