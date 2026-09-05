import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, Flame, Trophy, Award, Sparkles, CheckCircle2, XCircle, 
  ArrowLeft, ArrowRight, RotateCcw, HelpCircle, Terminal, Play, 
  History, CheckSquare, Layers, Eye, RefreshCw
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useArcade } from '../../context/ArcadeContext';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { useToast } from '../../context/ToastContext';
import { evaluateJavaScriptCode } from '../../services/coding/codeJudgeService';
import { ArcadeGameMode } from '../../types/arcade';
import { ARCADE_QUESTIONS } from '../../data/arcadeQuestions';

export const CodingGamesPage: React.FC = () => {
  const { 
    activeMode, 
    setActiveMode, 
    currentRound, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    activeQuestion, 
    totalQuestions,
    userAnswers,
    saveAnswerState,
    goToNextQuestion,
    goToPreviousQuestion,
    jumpToQuestion,
    isRoundComplete,
    sessionSummary,
    addHistoryRecord,
    restartGame
  } = useArcade();

  const { completeTask, dailyStreak, xp } = useLearnPlay();
  const { showToast } = useToast();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [editorCode, setEditorCode] = useState<string>('');
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>([]);
  const [sqlInput, setSqlInput] = useState<string>('');
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  // Restore question state when question index changes
  useEffect(() => {
    const state = userAnswers[activeQuestion.id];
    setShowExplanation(false);
    setAiExplanation(null);
    setExecutionOutput(state?.userOutput || null);

    if (activeMode === 'output-guess' || activeMode === 'code-quiz') {
      setSelectedOption(state?.selectedOptionIndex ?? null);
    } else if (activeMode === 'debug' || activeMode === 'algorithm-race' || activeMode === 'fix-bug') {
      setEditorCode(state?.enteredCode ?? (activeQuestion.initialCode || ''));
    } else if (activeMode === 'code-builder') {
      if (state?.selectedBlocks && state.selectedBlocks.length > 0) {
        setSelectedBlocks(state.selectedBlocks);
        setAvailableBlocks(activeQuestion.blocks ? activeQuestion.blocks.filter(b => !state.selectedBlocks?.includes(b)) : []);
      } else {
        setSelectedBlocks([]);
        setAvailableBlocks(activeQuestion.blocks || []);
      }
    } else if (activeMode === 'sql') {
      setSqlInput(state?.enteredCode ?? '');
    }
  }, [activeQuestion.id, activeMode]);

  const currentState = userAnswers[activeQuestion.id];
  const isAnswered = currentState?.isSubmitted;

  // 1. Submit Code Builder Answer
  const handleCheckCodeBuilder = () => {
    if (selectedBlocks.length === 0) {
      showToast('Please assemble blocks before checking.', 'error');
      return;
    }

    const isCorrect = JSON.stringify(selectedBlocks) === JSON.stringify(activeQuestion.correctBlockOrder);
    const earnedXp = isCorrect ? activeQuestion.xpReward : 0;

    saveAnswerState(activeQuestion.id, {
      selectedBlocks,
      isSubmitted: true,
      isCorrect,
      earnedXp
    });

    addHistoryRecord({
      gameMode: activeMode,
      gameTitle: 'Code Builder',
      round: currentRound,
      questionNumber: currentQuestionIndex + 1,
      questionTitle: activeQuestion.title,
      selectedAnswer: selectedBlocks.join(' '),
      correctAnswer: activeQuestion.correctBlockOrder?.join(' ') || '',
      result: isCorrect ? 'CORRECT' : 'WRONG',
      score: earnedXp,
      earnedXp,
      explanation: activeQuestion.explanation
    });

    if (isCorrect) {
      showToast(`Code Assembled Correctly! +${earnedXp} XP ✓`, 'success');
    } else {
      showToast('Block ordering syntax error. Review explanation.', 'error');
    }
  };

  // 2. Submit Live Code Execution (Debug / Algorithm Race / Fix The Bug)
  const handleRunCode = () => {
    if (!editorCode.trim()) {
      showToast('Code cannot be empty.', 'error');
      return;
    }

    const res = evaluateJavaScriptCode(editorCode, activeQuestion.testCases || []);
    const isCorrect = res.status === 'ACCEPTED';
    const earnedXp = isCorrect ? activeQuestion.xpReward : 0;

    const outText = isCorrect 
      ? `✓ ACCEPTED! All ${res.passedCount}/${res.totalCount} tests passed.\nLatency: ${res.executionTimeMs}ms`
      : `✗ ${res.status}: ${res.output}\n${res.failedCase ? `Input: ${res.failedCase.input}\nExpected: ${res.failedCase.expected}\nReceived: ${res.failedCase.received}` : ''}`;

    setExecutionOutput(outText);

    saveAnswerState(activeQuestion.id, {
      enteredCode: editorCode,
      userOutput: outText,
      isSubmitted: true,
      isCorrect,
      earnedXp
    });

    addHistoryRecord({
      gameMode: activeMode,
      gameTitle: activeMode === 'debug' ? 'Debug The Code' : activeMode === 'algorithm-race' ? 'Algorithm Race' : 'Fix The Bug',
      round: currentRound,
      questionNumber: currentQuestionIndex + 1,
      questionTitle: activeQuestion.title,
      selectedAnswer: editorCode,
      correctAnswer: 'Verified Official Test Case Implementation',
      result: isCorrect ? 'CORRECT' : 'WRONG',
      score: earnedXp,
      earnedXp,
      explanation: activeQuestion.explanation
    });

    if (isCorrect) {
      showToast(`Challenge Solved! +${earnedXp} XP ✓`, 'success');
    } else {
      showToast('Test cases failed. Check output console.', 'error');
    }
  };

  // 3. Submit 4-Option Quiz / Output Guess
  const handleSubmitOption = () => {
    if (selectedOption === null) {
      showToast('Please select an answer first.', 'error');
      return;
    }

    const isCorrect = selectedOption === activeQuestion.correctOptionIndex;
    const earnedXp = isCorrect ? activeQuestion.xpReward : 0;
    const chosenText = activeQuestion.options ? activeQuestion.options[selectedOption] : '';
    const correctText = activeQuestion.options && activeQuestion.correctOptionIndex !== undefined ? activeQuestion.options[activeQuestion.correctOptionIndex] : '';

    saveAnswerState(activeQuestion.id, {
      selectedOptionIndex: selectedOption,
      isSubmitted: true,
      isCorrect,
      earnedXp
    });

    addHistoryRecord({
      gameMode: activeMode,
      gameTitle: activeMode === 'output-guess' ? 'Output Guess' : 'Code Quiz',
      round: currentRound,
      questionNumber: currentQuestionIndex + 1,
      questionTitle: activeQuestion.title,
      selectedAnswer: chosenText,
      correctAnswer: correctText,
      result: isCorrect ? 'CORRECT' : 'WRONG',
      score: earnedXp,
      earnedXp,
      explanation: activeQuestion.explanation
    });

    if (isCorrect) {
      showToast(`Correct Choice! +${earnedXp} XP ✓`, 'success');
    } else {
      showToast('Incorrect choice. Read explanation to learn why.', 'error');
    }
  };

  // 4. Submit SQL Query
  const handleCheckSql = () => {
    if (!sqlInput.trim()) {
      showToast('Please enter an SQL query.', 'error');
      return;
    }

    const clean = sqlInput.trim().toUpperCase().replace(/\s+/g, ' ');
    const pattern = new RegExp(activeQuestion.sqlExpectedPattern || 'SELECT', 'i');
    const isCorrect = pattern.test(clean);
    const earnedXp = isCorrect ? activeQuestion.xpReward : 0;

    saveAnswerState(activeQuestion.id, {
      enteredCode: sqlInput,
      isSubmitted: true,
      isCorrect,
      earnedXp
    });

    addHistoryRecord({
      gameMode: 'sql',
      gameTitle: 'SQL Challenge',
      round: currentRound,
      questionNumber: currentQuestionIndex + 1,
      questionTitle: activeQuestion.title,
      selectedAnswer: sqlInput,
      correctAnswer: activeQuestion.sqlExpectedPattern || '',
      result: isCorrect ? 'CORRECT' : 'WRONG',
      score: earnedXp,
      earnedXp,
      explanation: activeQuestion.explanation
    });

    if (isCorrect) {
      showToast(`Query Accepted! +${earnedXp} XP ✓`, 'success');
    } else {
      showToast('SQL syntax or query mismatch. Review explanation.', 'error');
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (!isAnswered && !isReviewMode) {
      showToast('Please answer this challenge before continuing.', 'error');
      return;
    }
    goToNextQuestion();
  };

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  // AI Socratic Explanation Trigger
  const handleExplainWithAi = () => {
    setAiExplanation(
      `🤖 Socratic Tutor: Look closely at ${activeQuestion.title}. The underlying concept is ${activeQuestion.explanation.slice(0, 80)}... Focus on understanding the evaluation order without guessing.`
    );
  };

  const gameButtons: { id: ArcadeGameMode; label: string; icon: string }[] = [
    { id: 'code-builder', label: '1 Code Builder', icon: '🧱' },
    { id: 'debug', label: '2 Debug The Code', icon: '🕵️' },
    { id: 'output-guess', label: '3 Output Guess', icon: '🔮' },
    { id: 'code-quiz', label: '4 Code Quiz', icon: '📝' },
    { id: 'algorithm-race', label: '5 Algorithm Race', icon: '⚡' },
    { id: 'sql', label: '6 SQL Challenge', icon: '🗄️' },
    { id: 'fix-bug', label: '7 Fix The Bug', icon: '🐛' },
    { id: 'memory-match', label: '8 Memory Match', icon: '🃏' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Header & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">ACE CODING ARCADE</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-brand-600" /> Learn Coding By Playing.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/coding/history">
            <Button variant="outline" size="sm" icon={<History className="w-3.5 h-3.5" />}>
              View History
            </Button>
          </Link>
          <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-600" /> {dailyStreak} Day Streak 🔥
          </span>
          <span className="px-3 py-1.5 rounded-full bg-purple-100 text-brand-800 text-xs font-bold font-mono">
            {xp} XP
          </span>
        </div>
      </div>

      {/* 8 Game Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {gameButtons.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setActiveMode(g.id);
              setIsReviewMode(false);
            }}
            className={`p-3 rounded-2xl text-xs font-extrabold flex flex-col items-center gap-1.5 transition-all ${
              activeMode === g.id 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25 scale-102' 
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <span className="text-lg">{g.icon}</span>
            <span className="truncate w-full text-center">{g.label}</span>
          </button>
        ))}
      </div>

      {/* Round & Progress Navigator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-brand-700 font-mono">
              ROUND {currentRound} · Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-600 font-mono">Score: {sessionSummary.totalScore} pts</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Accuracy: <strong className="text-slate-900 dark:text-white">{sessionSummary.accuracy}%</strong> ({sessionSummary.correctCount} Correct, {sessionSummary.wrongCount} Wrong)
          </div>
        </div>

        {/* Question Number Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: totalQuestions }).map((_, i) => {
            const q = ARCADE_QUESTIONS[activeMode]?.[i];
            const state = q ? userAnswers[q.id] : undefined;
            const isCurrent = i === currentQuestionIndex;
            return (
              <button
                key={i}
                onClick={() => jumpToQuestion(i)}
                className={`w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                  isCurrent 
                    ? 'ring-2 ring-brand-500 bg-purple-50 dark:bg-purple-950 text-brand-700 font-mono' 
                    : state?.isCorrect 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : state?.isSubmitted 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {state?.isCorrect ? '✓' : state?.isSubmitted ? '✗' : i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Challenge Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Problem Prompt & Explanation */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
              Difficulty: {activeQuestion.difficulty}
            </span>
            <span className="text-xs font-bold text-amber-600">+{activeQuestion.xpReward} XP</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">{activeQuestion.title}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {activeQuestion.prompt}
            </p>
          </div>

          {activeQuestion.snippet && (
            <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-purple-200 border border-slate-800 overflow-x-auto whitespace-pre">
              {activeQuestion.snippet}
            </div>
          )}

          {/* Submission Result Banner */}
          {currentState?.isSubmitted && (
            <div className={`p-4 rounded-2xl text-xs space-y-2 animate-fadeIn ${
              currentState.isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {currentState.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                {currentState.isCorrect ? 'Correct! Round point awarded.' : 'Incorrect answer.'}
              </div>

              <div className="text-[11px] pt-1 border-t border-slate-200/60 leading-relaxed">
                <strong>Explanation:</strong> {activeQuestion.explanation}
              </div>
            </div>
          )}

          {/* AI Explanation / Socratic Hint */}
          {aiExplanation && (
            <div className="p-4 bg-purple-50 dark:bg-purple-950/60 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 animate-fadeIn">
              {aiExplanation}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={handleExplainWithAi} icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}>
              Explain With AI
            </Button>
            {activeQuestion.hints.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => showToast(`💡 ${activeQuestion.hints[0]}`)} icon={<HelpCircle className="w-3.5 h-3.5" />}>
                Hint
              </Button>
            )}
          </div>
        </div>

        {/* Right: Interactive Game Editor / Selector Area */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Game 1: Code Builder Blocks Area */}
          {activeMode === 'code-builder' && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block">Assembled Code Statement:</span>
              <div className="min-h-24 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center">
                {selectedBlocks.length === 0 ? (
                  <span className="text-xs text-slate-400">Click blocks below to arrange them here...</span>
                ) : (
                  selectedBlocks.map((b, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedBlocks(prev => prev.filter((_, idx) => idx !== i));
                        setAvailableBlocks(prev => [...prev, b]);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-mono font-bold shadow-xs hover:bg-rose-600 transition-colors"
                    >
                      {b} ✕
                    </button>
                  ))
                )}
              </div>

              <span className="text-xs font-bold text-slate-500 block">Available Syntax Blocks:</span>
              <div className="flex flex-wrap gap-2">
                {availableBlocks.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedBlocks(prev => [...prev, b]);
                      setAvailableBlocks(prev => prev.filter((_, idx) => idx !== i));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold hover:bg-purple-100 hover:text-brand-700 transition-colors"
                  >
                    + {b}
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedBlocks([]);
                  setAvailableBlocks(activeQuestion.blocks || []);
                }} icon={<RotateCcw className="w-4 h-4" />}>
                  Reset Blocks
                </Button>
                <Button variant="primary" size="md" onClick={handleCheckCodeBuilder} icon={<Play className="w-4 h-4" />}>
                  Check Assembly
                </Button>
              </div>
            </div>
          )}

          {/* Game 2, 5, 7: Live Code Editor (Debug, Algorithm Race, Fix Bug) */}
          {(activeMode === 'debug' || activeMode === 'algorithm-race' || activeMode === 'fix-bug') && (
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                  <span>solution.js</span>
                  <span className="text-emerald-400">● Live Sandbox Judge</span>
                </div>
                <textarea
                  rows={9}
                  value={editorCode}
                  onChange={(e) => setEditorCode(e.target.value)}
                  className="w-full bg-slate-950 text-purple-200 p-4 font-mono text-xs outline-none leading-relaxed resize-none"
                  spellCheck={false}
                />
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => setEditorCode(activeQuestion.initialCode || '')} icon={<RotateCcw className="w-4 h-4" />}>
                  Reset Code
                </Button>
                <Button variant="primary" size="md" onClick={handleRunCode} icon={<Play className="w-4 h-4" />}>
                  Run & Validate Code
                </Button>
              </div>

              {executionOutput && (
                <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs whitespace-pre-wrap border border-slate-800">
                  <div className="flex items-center gap-2 pb-2 text-[10px] text-slate-400 border-b border-slate-800 mb-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Test Output Console
                  </div>
                  {executionOutput}
                </div>
              )}
            </div>
          )}

          {/* Game 3 & 4: 4-Option Quiz / Output Guess */}
          {(activeMode === 'output-guess' || activeMode === 'code-quiz') && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Select the correct option:</h3>
              <div className="space-y-2">
                {activeQuestion.options?.map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`p-4 rounded-2xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                      selectedOption === i 
                        ? 'bg-purple-50 dark:bg-purple-950 border-brand-500 text-brand-800 dark:text-brand-200 shadow-xs' 
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span><span className="font-mono text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}</span>
                    {selectedOption === i && <span className="text-[10px] font-mono text-brand-600">Selected</span>}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="primary" size="md" onClick={handleSubmitOption} disabled={selectedOption === null} icon={<Play className="w-4 h-4" />}>
                  Submit Answer
                </Button>
              </div>
            </div>
          )}

          {/* Game 6: SQL Challenge */}
          {activeMode === 'sql' && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Write ANSI SQL Query:</h3>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-500 font-mono">
                Schema: <code>students (id, name, score, department, college_name)</code>
              </div>
              <textarea
                rows={4}
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                placeholder="SELECT * FROM students WHERE..."
                className="w-full bg-slate-950 text-emerald-300 p-4 font-mono text-xs rounded-2xl outline-none"
                spellCheck={false}
              />
              <div className="flex justify-end">
                <Button variant="primary" size="md" onClick={handleCheckSql} icon={<Play className="w-4 h-4" />}>
                  Execute SQL Query
                </Button>
              </div>
            </div>
          )}

          {/* Game 8: Memory Match */}
          {activeMode === 'memory-match' && (
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Match Definitions to Concepts:</h3>
              <div className="grid grid-cols-2 gap-3">
                {activeQuestion.blocks?.map((blk, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-purple-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center text-center">
                    {blk}
                  </div>
                ))}
              </div>
              <div className="pt-2 flex justify-end">
                <Button variant="primary" size="md" onClick={() => showToast('Memory pairs verified! +20 XP ✓', 'success')} icon={<Play className="w-4 h-4" />}>
                  Check Match Complete
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Footer: Previous / Next / Finish */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
            <Button
              variant="outline"
              size="md"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            <span className="text-xs font-mono font-bold text-slate-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Next →
              </Button>
            ) : (
              <Button
                variant="ai"
                size="md"
                onClick={() => {
                  setIsReviewMode(true);
                  showToast('🎉 Round Complete! Great job.', 'success');
                }}
                icon={<Trophy className="w-4 h-4" />}
              >
                Finish Round
              </Button>
            )}
          </div>

        </div>

      </div>

      {/* End of Round Review Modal / Banner */}
      {isReviewMode && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 shadow-2xl border border-purple-800/40 space-y-6 animate-scaleUp">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold font-mono text-amber-300 uppercase tracking-wider">ROUND COMPLETE 🎉</span>
              <h2 className="text-2xl font-black text-white">Session Results & Mastery Breakdown</h2>
            </div>
            <Link to="/coding/history">
              <Button variant="outline" size="sm" icon={<History className="w-3.5 h-3.5" />}>
                Open Full History
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] text-purple-200">Total Score</span>
              <p className="text-2xl font-black text-amber-400">{sessionSummary.totalScore} pts</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] text-purple-200">Accuracy</span>
              <p className="text-2xl font-black text-emerald-400">{sessionSummary.accuracy}%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] text-purple-200">Correct Answers</span>
              <p className="text-2xl font-black text-emerald-400">{sessionSummary.correctCount} / {totalQuestions}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] text-purple-200">XP Earned</span>
              <p className="text-2xl font-black text-amber-300">+{sessionSummary.earnedXp} XP</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="ai" size="md" onClick={() => {
              restartGame();
              setIsReviewMode(false);
            }} icon={<RefreshCw className="w-4 h-4" />}>
              Play Again
            </Button>
            <Button variant="outline" size="md" onClick={() => setIsReviewMode(false)} icon={<Eye className="w-4 h-4" />}>
              Review Questions
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
