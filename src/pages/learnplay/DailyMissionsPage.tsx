import React, { useState } from 'react';
import { Flame, CheckCircle2, XCircle, Sparkles, Play, RotateCcw, HelpCircle, ArrowLeft, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { useToast } from '../../context/ToastContext';
import { evaluateJavaScriptCode } from '../../services/coding/codeJudgeService';
import { MicroTask } from '../../types/learnPlay';

const sampleDailyTask: MicroTask = {
  id: 'daily-day-7',
  title: 'Day 7: Fix the Reverse String Function',
  category: 'Coding',
  type: 'DEBUGGING',
  description: 'The function below should take a string and return its characters in reverse order. Currently it fails because it uses standard subtraction on string arrays. Fix the implementation to pass all test cases.',
  difficulty: 'Easy',
  estimatedTime: '8 mins',
  xpReward: 25,
  initialCode: `// Fix the reverseString function
function reverseString(str) {
  // BUG: Array split and reverse
  return str.split('').reverse().join('');
}`,
  correctAnswer: '',
  explanation: 'In JavaScript, strings are immutable. You must split the string into an array of characters, reverse the array, and join it back into a string.',
  hints: [
    'Hint 1: Remember to use str.split("") with an empty string delimiter to split every character.',
    'Hint 2: Call .reverse() on the array, then .join("") to return the reversed string.'
  ],
  testCases: [
    { input: JSON.stringify('hello'), expectedOutput: 'olleh' },
    { input: JSON.stringify('AllCollegeEvent'), expectedOutput: 'tnevEegelloClA' },
    { input: JSON.stringify('12345'), expectedOutput: '54321' }
  ]
};

export const DailyMissionsPage: React.FC = () => {
  const { completeTask, isTaskCompleted, dailyStreak } = useLearnPlay();
  const { showToast } = useToast();

  const [code, setCode] = useState(sampleDailyTask.initialCode || '');
  const [output, setOutput] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const isCompleted = isTaskCompleted(sampleDailyTask.id);

  const handleRunAndSubmit = () => {
    setIsEvaluating(true);
    setOutput(null);

    setTimeout(() => {
      const result = evaluateJavaScriptCode(code, sampleDailyTask.testCases || []);
      setIsEvaluating(false);

      if (result.status === 'ACCEPTED') {
        setOutput(`🎉 ACCEPTED! All ${result.passedCount}/${result.totalCount} test cases passed.\nExecution Time: ${result.executionTimeMs}ms\nReward: +${sampleDailyTask.xpReward} XP awarded!`);
        completeTask(sampleDailyTask);
        showToast(`Daily Challenge Solved! +${sampleDailyTask.xpReward} XP Earned ✓`, 'success');
      } else {
        setOutput(`❌ ${result.status}: ${result.output}\n${result.failedCase ? `Input: ${result.failedCase.input}\nExpected: ${result.failedCase.expected}\nReceived: ${result.failedCase.received}` : ''}`);
        showToast('Test cases failed. Review feedback and try again.', 'error');
      }
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/learn-play" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">DAILY MISSION</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">{sampleDailyTask.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Task Description & Hints */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Difficulty: {sampleDailyTask.difficulty}
            </span>
            <span className="text-xs font-bold text-amber-600">+{sampleDailyTask.xpReward} XP</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {sampleDailyTask.description}
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">Sample Test Cases:</h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-[11px] space-y-1">
              <p>input: <code>"hello"</code> → output: <code>"olleh"</code></p>
              <p>input: <code>"AllCollegeEvent"</code> → output: <code>"tnevEegelloClA"</code></p>
            </div>
          </div>

          {/* Socratic Hint */}
          <div className="pt-2">
            {hintIndex < sampleDailyTask.hints.length ? (
              <Button variant="outline" size="sm" onClick={() => setHintIndex(prev => prev + 1)} icon={<HelpCircle className="w-3.5 h-3.5" />}>
                Show Hint ({hintIndex + 1}/{sampleDailyTask.hints.length})
              </Button>
            ) : (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                {sampleDailyTask.hints.map((h, i) => (
                  <p key={i}>💡 {h}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Code Editor & Console */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <span>solution.js</span>
              <span className="text-emerald-400">● JavaScript Judge</span>
            </div>
            <textarea
              rows={10}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950 text-purple-200 p-4 font-mono text-xs outline-none leading-relaxed resize-none"
              spellCheck={false}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="md" onClick={() => setCode(sampleDailyTask.initialCode || '')} icon={<RotateCcw className="w-4 h-4" />}>
              Reset
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleRunAndSubmit}
              disabled={isEvaluating}
              icon={<Play className="w-4 h-4" />}
            >
              {isEvaluating ? 'Executing Tests...' : isCompleted ? 'Re-run Solution' : 'Submit & Check Solution'}
            </Button>
          </div>

          {output && (
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs whitespace-pre-wrap border border-slate-800 animate-fadeIn">
              <div className="flex items-center gap-2 pb-2 text-[10px] text-slate-400 border-b border-slate-800 mb-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Judge Console Output
              </div>
              {output}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
