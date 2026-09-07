import React, { useState } from 'react';
import { interviewAndOfferDatabase, AIEvaluationResult } from '../../services/db/interviewAndOfferDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Zap, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function AIInterviewSimulatorPage() {
  const [mode, setMode] = useState<'TECHNICAL' | 'HR' | 'BEHAVIORAL' | 'SYSTEM_DESIGN'>('TECHNICAL');
  const [question, setQuestion] = useState(
    'Explain how you would design a rate limiter for an API gateway handling 10,000 requests per second.'
  );
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<AIEvaluationResult | null>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    const res = interviewAndOfferDatabase.submitAIEvaluation(question, answer, mode);
    setEvaluation(res);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="AI Interview Simulator"
          description="Practice technical, behavioral, and system design questions with instant rubric scoring and transparent feedback."
          badge="AI SIMULATOR"
        />

        {/* Mode Selector */}
        <div className="flex gap-2">
          {(['TECHNICAL', 'HR', 'BEHAVIORAL', 'SYSTEM_DESIGN'] as const).map(m => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setQuestion(
                  m === 'TECHNICAL'
                    ? 'Explain how you would design a rate limiter for an API gateway handling 10,000 requests per second.'
                    : m === 'HR'
                    ? 'Tell me about a time when you had to resolve a high-stakes disagreement with a teammate.'
                    : m === 'BEHAVIORAL'
                    ? 'Describe a situation where a software release failed in production. How did you diagnose and remediate the issue?'
                    : 'Design a distributed cache system with cache eviction and eventual consistency.'
                );
                setEvaluation(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                mode === m
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Practice Arena */}
        <ACECard title="Interview Prompt">
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm font-semibold text-slate-900 dark:text-white">
              "{question}"
            </div>

            <form onSubmit={handleEvaluate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Your Response (Type your comprehensive answer)
                </label>
                <textarea
                  rows={6}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Outline your approach, architecture, tradeoffs, and key assumptions..."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <ACEButton variant="primary" size="md" className="flex items-center gap-2">
                <Send className="w-4 h-4" /> Submit for AI Rubric Evaluation
              </ACEButton>
            </form>
          </div>
        </ACECard>

        {/* Evaluation Output */}
        {evaluation && (
          <ACECard title="AI Rubric Evaluation" badge={`Score: ${evaluation.scoreOutOf100}/100`}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Strengths
                  </div>
                  <ul className="text-xs text-emerald-700 dark:text-emerald-400 list-disc list-inside">
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Areas for Improvement
                  </div>
                  <ul className="text-xs text-amber-700 dark:text-amber-400 list-disc list-inside">
                    {evaluation.areasForImprovement.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-xs text-slate-500 italic">
                {evaluation.modelAnswerSummary}
              </div>
            </div>
          </ACECard>
        )}

      </div>
    </div>
  );
}
