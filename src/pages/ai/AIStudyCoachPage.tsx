import React, { useState } from 'react';
import { aiStudyCoachDatabase, StudyModule, QuizResult } from '../../services/db/aiStudyCoachDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { BookOpen, CheckCircle2, XCircle, Award, HelpCircle } from 'lucide-react';

export function AIStudyCoachPage() {
  const modules = aiStudyCoachDatabase.getAllModules();
  const [selectedModule, setSelectedModule] = useState<StudyModule>(modules[0]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    const updated = [...userAnswers];
    updated[qIndex] = optIndex;
    setUserAnswers(updated);
  };

  const handleGradeQuiz = () => {
    const result = aiStudyCoachDatabase.evaluateQuiz(selectedModule.id, userAnswers);
    setQuizResult(result);
  };

  const handleSwitchModule = (mod: StudyModule) => {
    setSelectedModule(mod);
    setUserAnswers([]);
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="AI Adaptive Study Coach"
          description="Grounded concept deep-dives and deterministic quiz validation. Never guesses correct answers."
          badge="VALIDATED EVALUATION KEY"
        />

        {/* Module Picker */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {modules.map(m => (
            <button
              key={m.id}
              onClick={() => handleSwitchModule(m)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedModule.id === m.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {m.topic}
            </button>
          ))}
        </div>

        {/* Concept Deep Dive */}
        <ACECard className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 font-mono">{selectedModule.domain}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{selectedModule.topic}</h3>
            </div>
            <ACEBadge variant="primary" size="sm">Core Theory</ACEBadge>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
            {selectedModule.conceptSummary}
          </p>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">Key Axioms & Formulations</h4>
            <div className="space-y-1.5">
              {selectedModule.keyFormulasAndConcepts.map((k, i) => (
                <div key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>{k}</span>
                </div>
              ))}
            </div>
          </div>
        </ACECard>

        {/* Practice Quiz */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-500" /> Concept Mastery Quiz
          </h3>

          <div className="space-y-4">
            {selectedModule.practiceQuestions.map((q, qIdx) => (
              <ACECard key={q.id} className="p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {qIdx + 1}. {q.question}
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(qIdx, optIdx)}
                      className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                        userAnswers[qIdx] === optIdx
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </button>
                  ))}
                </div>

                {quizResult && (
                  <div className={`p-3 rounded-xl text-xs space-y-1 ${
                    userAnswers[qIdx] === q.correctOptionIndex
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      {userAnswers[qIdx] === q.correctOptionIndex ? (
                        <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Correct!</>
                      ) : (
                        <><XCircle className="w-4 h-4 text-rose-500" /> Incorrect. Correct option: {String.fromCharCode(65 + q.correctOptionIndex)}</>
                      )}
                    </div>
                    <p className="text-[11px] mt-0.5">{q.explanation}</p>
                  </div>
                )}
              </ACECard>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleGradeQuiz}
              disabled={userAnswers.length < selectedModule.practiceQuestions.length}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 transition shadow-xs"
            >
              Grade My Answers
            </button>

            {quizResult && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Score:</span>
                <ACEBadge variant={quizResult.isPassed ? 'success' : 'danger'} size="sm">
                  {quizResult.score} / {quizResult.totalQuestions} ({quizResult.percentage}%)
                </ACEBadge>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
