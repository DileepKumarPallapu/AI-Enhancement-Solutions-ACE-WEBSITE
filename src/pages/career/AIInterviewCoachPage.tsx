import React, { useState } from 'react';
import { aiInterviewCoachDatabase, MockInterviewSession, InterviewRubricScore } from '../../services/db/aiInterviewCoachDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Briefcase, Send, CheckCircle2, Award, History, Sparkles } from 'lucide-react';

export function AIInterviewCoachPage() {
  const [role, setRole] = useState('Autonomous AI Systems Engineer');
  const questions = aiInterviewCoachDatabase.getQuestionsForRole(role);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [activeSession, setActiveSession] = useState<MockInterviewSession | null>(null);
  const [history, setHistory] = useState<MockInterviewSession[]>(aiInterviewCoachDatabase.getSessionHistory());

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    const sess = aiInterviewCoachDatabase.evaluateAnswer(role, questions[currentQIndex], answerText.trim());
    setActiveSession(sess);
    setHistory(aiInterviewCoachDatabase.getSessionHistory());
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setCurrentQIndex(0);
    }
    setAnswerText('');
    setActiveSession(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="AI Technical & Behavioral Mock Interview Simulator"
          description="Role-specific mock interview simulations evaluated against structured criteria. Human reviewers remain authoritative for hiring."
          badge="GROUNDED RUBRIC EVALUATION"
        />

        {/* Role Selector */}
        <div className="flex gap-2">
          {['Autonomous AI Systems Engineer', 'Full Stack SWE', 'Distributed Backend Engineer'].map(r => (
            <button
              key={r}
              onClick={() => { setRole(r); setCurrentQIndex(0); setAnswerText(''); setActiveSession(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                role === r
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <ACECard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-500 font-bold uppercase">Question {currentQIndex + 1} of {questions.length}</span>
            <ACEBadge variant="primary" size="sm">{role}</ACEBadge>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
            {questions[currentQIndex]}
          </h3>

          <form onSubmit={handleEvaluate} className="space-y-3">
            <textarea
              value={answerText}
              onChange={e => setAnswerText(e.target.value)}
              placeholder="Structure your answer with architectural rationale, trade-offs, and concrete examples..."
              rows={5}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 leading-relaxed outline-hidden focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-mono">{answerText.trim() ? answerText.trim().split(/\s+/).length : 0} Words</span>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
              >
                Submit Answer for AI Rubric Evaluation
              </button>
            </div>
          </form>
        </ACECard>

        {/* Evaluation Output */}
        {activeSession && activeSession.evaluation && (
          <ACECard className="p-6 space-y-6 animate-scaleUp">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" /> Evaluation Summary
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeSession.evaluation.feedback}</p>
              </div>
              <ACEBadge variant={activeSession.evaluation.overallRating === 'STRONG_HIRE' ? 'success' : 'primary'} size="sm">
                {activeSession.evaluation.overallRating.replace('_', ' ')}
              </ACEBadge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Technical Depth</div>
                <div className="text-lg font-bold text-indigo-600 mt-1">{activeSession.evaluation.technicalDepth} / 10</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Communication</div>
                <div className="text-lg font-bold text-emerald-600 mt-1">{activeSession.evaluation.clarityAndCommunication} / 10</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Problem Solving</div>
                <div className="text-lg font-bold text-purple-600 mt-1">{activeSession.evaluation.problemSolving} / 10</div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
              >
                Proceed to Next Question →
              </button>
            </div>
          </ACECard>
        )}

      </div>
    </div>
  );
}
