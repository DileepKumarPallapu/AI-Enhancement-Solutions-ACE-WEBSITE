import React, { useState } from 'react';
import { aiCommandCenterDatabase, NextBestAction, TodayAiBrief, GroundedAiResponse } from '../../services/db/aiCommandCenterDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Sparkles, Send, Brain, Target, BookOpen, Briefcase, Trophy, UserCheck, ShieldCheck, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AICommandCenterHubPage() {
  const brief = aiCommandCenterDatabase.getTodayBrief();
  const context = aiCommandCenterDatabase.getCompiledStudentContext();
  
  const [query, setQuery] = useState('');
  const [chatResponse, setChatResponse] = useState<GroundedAiResponse | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAsking(true);
    setTimeout(() => {
      const res = aiCommandCenterDatabase.answerGroundedQuery(query);
      setChatResponse(res);
      setIsAsking(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="ACE AI Student Success Engine"
          description="Autonomous opportunity intelligence, grounded career planning, and real-time next best action guidance."
          badge="AI 100X AUTONOMOUS OS"
          actions={
            <div className="flex gap-2">
              <Link to="/ai/memory">
                <ACEButton variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span>AI Memory</span>
                </ACEButton>
              </Link>
              <Link to="/ai/study-coach">
                <ACEButton variant="primary" size="sm" className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Study Coach</span>
                </ACEButton>
              </Link>
            </div>
          }
        />

        {/* Top Intelligence Brief Banner */}
        <ACECard className="p-6 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border-indigo-200 dark:border-indigo-900/60 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> {brief.greeting}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">{brief.summary}</p>
            </div>
            <ACEBadge variant="success" size="sm">Grounding: 100% Deterministic</ACEBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {brief.keySignals.map((sig, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="truncate">{sig}</span>
              </div>
            ))}
          </div>
        </ACECard>

        {/* Ask ACE Grounded Conversational Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-500" /> Ask ACE Grounded Assistant
          </h3>

          <form onSubmit={handleAsk} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask anything: 'What are my deadlines?', 'Who is my mentor?', 'What skills am I missing for AI Engineer?'"
              className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden shadow-xs"
            />
            <button
              type="submit"
              disabled={isAsking}
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>{isAsking ? 'Grounding...' : 'Ask ACE'}</span>
            </button>
          </form>

          {chatResponse && (
            <ACECard className="p-6 space-y-4 animate-scaleUp">
              <div className="flex items-start justify-between">
                <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Grounded ACE Intelligence
                </h4>
                <span className="text-[10px] font-mono text-emerald-500 font-bold">Confidence {(chatResponse.confidence * 100).toFixed(0)}%</span>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {chatResponse.answer}
              </p>

              {chatResponse.groundedFacts.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] space-y-1 font-mono text-slate-600 dark:text-slate-400">
                  <p className="font-bold text-[10px] uppercase tracking-wider text-slate-400">Verified Platform Facts:</p>
                  {chatResponse.groundedFacts.map((fact, idx) => (
                    <div key={idx}>{fact}</div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {chatResponse.suggestedActions.map((act, i) => (
                  <Link key={i} to={act.url}>
                    <ACEButton variant="outline" size="sm" className="flex items-center gap-1">
                      <span>{act.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </ACEButton>
                  </Link>
                ))}
              </div>
            </ACECard>
          )}
        </div>

        {/* Next Best Actions Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-500" /> Next Best Actions
            </h3>
            <span className="text-xs text-slate-400">Ranked by Urgency & Opportunity Impact</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brief.recommendedActions.map(action => (
              <ACECard key={action.id} className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{action.title}</h4>
                    <ACEBadge variant={action.priority === 'HIGH_PRIORITY' ? 'danger' : action.priority === 'RECOMMENDED' ? 'primary' : 'neutral'} size="sm">
                      {action.priority.replace('_', ' ')}
                    </ACEBadge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{action.description}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                  <span className="font-bold">Why: </span>{action.whyThisAction}
                </div>

                <Link to={action.actionUrl}>
                  <ACEButton variant="primary" size="sm" className="w-full flex items-center justify-center gap-1.5">
                    <span>{action.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </ACEButton>
                </Link>
              </ACECard>
            ))}
          </div>
        </div>

        {/* Specialized Coaches Hub */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-500" /> Autonomous Intelligence Modules
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ACECard className="p-5 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Study Coach</h4>
              <p className="text-xs text-slate-500">Practice quizzes with deterministic answer verification and concept deep dives.</p>
              <Link to="/ai/study-coach" className="block pt-2">
                <ACEButton variant="outline" size="sm" className="w-full">Open Study Coach</ACEButton>
              </Link>
            </ACECard>

            <ACECard className="p-5 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Project Mentor</h4>
              <p className="text-xs text-slate-500">Generate system architecture diagrams, task milestones, and testing strategies.</p>
              <Link to="/ai/project-mentor" className="block pt-2">
                <ACEButton variant="outline" size="sm" className="w-full">Open Project Mentor</ACEButton>
              </Link>
            </ACECard>

            <ACECard className="p-5 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Interview Coach</h4>
              <p className="text-xs text-slate-500">Simulate technical and role-specific mock interviews with rubric evaluations.</p>
              <Link to="/interview/ai-coach" className="block pt-2">
                <ACEButton variant="outline" size="sm" className="w-full">Open Interview Coach</ACEButton>
              </Link>
            </ACECard>
          </div>
        </div>

      </div>
    </div>
  );
}
