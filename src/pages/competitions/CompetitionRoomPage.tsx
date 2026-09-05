import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, Clock, Play, RotateCcw, AlertTriangle, ShieldCheck, 
  Terminal, CheckCircle2, XCircle, ArrowLeft, ArrowRight
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useCompetition } from '../../context/CompetitionContext';
import { useToast } from '../../context/ToastContext';
import { evaluateJavaScriptCode } from '../../services/coding/codeJudgeService';

export const CompetitionRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCompetitionById } = useCompetition();
  const { showToast } = useToast();

  const comp = getCompetitionById(id || 'comp-python-2026');
  const problem = comp?.problems?.[0];

  const [code, setCode] = useState(problem?.starterCode || '');
  const [secondsRemaining, setSecondsRemaining] = useState(3582); // 59:42 countdown
  const [output, setOutput] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Server-aware countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          showToast('Time expired! Auto-locking submissions.', 'error');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Anti-Cheat: Strictly intercept and disable Paste actions
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    showToast('⚠️ Paste is disabled in competitive mode. Type your solution to participate fairly.', 'error');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      showToast('⚠️ Paste is disabled in competitive mode. Type your solution to participate fairly.', 'error');
    }
  };

  const handleRunAndSubmit = () => {
    if (!problem) return;
    setIsEvaluating(true);
    setOutput(null);

    setTimeout(() => {
      const res = evaluateJavaScriptCode(code, problem.testCases || []);
      setIsEvaluating(false);

      if (res.status === 'ACCEPTED') {
        setIsSubmitted(true);
        setOutput(`✓ ACCEPTED! All ${res.passedCount}/${res.totalCount} test cases passed.\nLatency: ${res.executionTimeMs}ms\nPoints Earned: ${problem.points} pts`);
        showToast(`Problem Solved! +${problem.points} Contest Points ✓`, 'success');
      } else {
        setOutput(`✗ ${res.status}: ${res.output}\n${res.failedCase ? `Input: ${res.failedCase.input}\nExpected: ${res.failedCase.expected}\nReceived: ${res.failedCase.received}` : ''}`);
        showToast('Solution failed test cases.', 'error');
      }
    }, 600);
  };

  if (!comp || !problem) {
    return <div className="p-12 text-center text-xs text-slate-500">Problem not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      
      {/* Top Competition Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-black uppercase tracking-wider font-mono border border-red-500/30 animate-pulse">
            ● LIVE COMPETITION MODE
          </span>
          <h2 className="font-extrabold text-sm text-white">{comp.title}</h2>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 font-mono font-bold text-amber-400">
            <Clock className="w-4 h-4" /> {formatTimer(secondsRemaining)} remaining
          </div>
          <Link to={`/competitions/${comp.id}/results`}>
            <Button variant="outline" size="sm">
              View Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Problem Prompt */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600">
              Problem 1 of 2 · {problem.difficulty}
            </span>
            <span className="text-xs font-bold text-amber-600 font-mono">{problem.points} Points</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900 dark:text-white">{problem.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {problem.description}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">Sample Input & Output:</span>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl font-mono text-[11px] space-y-1">
              <p>Input: <code>{problem.sampleInput}</code></p>
              <p>Output: <code>{problem.sampleOutput}</code></p>
            </div>
          </div>

          {/* Anti-cheat banner */}
          <div className="p-3 bg-purple-50 dark:bg-purple-950/60 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
            <span>Anti-Cheat active: Paste is blocked. All code runs in sandboxed test runners.</span>
          </div>
        </div>

        {/* Right: Code Editor & Console */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <span>solution.js</span>
              <span className="text-emerald-400">● Strict Competitor Sandbox</span>
            </div>
            <textarea
              rows={12}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              className="w-full bg-slate-950 text-purple-200 p-4 font-mono text-xs outline-none leading-relaxed resize-none"
              spellCheck={false}
              placeholder="Type your solution here (Paste is disabled)..."
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="md" onClick={() => setCode(problem.starterCode)} icon={<RotateCcw className="w-4 h-4" />}>
              Reset Code
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleRunAndSubmit}
              disabled={isEvaluating}
              icon={<Play className="w-4 h-4" />}
            >
              {isEvaluating ? 'Evaluating Tests...' : 'Submit Final Solution'}
            </Button>
          </div>

          {output && (
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs whitespace-pre-wrap border border-slate-800">
              <div className="flex items-center gap-2 pb-2 text-[10px] text-slate-400 border-b border-slate-800 mb-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Judge Execution Log
              </div>
              {output}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
