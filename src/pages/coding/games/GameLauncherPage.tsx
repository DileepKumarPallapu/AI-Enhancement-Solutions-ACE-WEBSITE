import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Gamepad2, Trophy, ArrowLeft, Play, CheckCircle2, RotateCcw, HelpCircle, Terminal } from 'lucide-react';
import { PageHeader } from '../../../components/common/PageHeader';
import { Button } from '../../../components/ui/Button';
import { useLearnPlay } from '../../../context/LearnPlayContext';
import { useToast } from '../../../context/ToastContext';

export const GameLauncherPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { completeTask } = useLearnPlay();
  const { showToast } = useToast();

  const [score, setScore] = useState(0);
  const [selectedBugLine, setSelectedBugLine] = useState<number | null>(null);
  const [oracleAnswer, setOracleAnswer] = useState<string | null>(null);

  const gameTitles: Record<string, string> = {
    'debug-detective': 'Debug Detective: Spot & Fix The Error',
    'output-oracle': 'Output Oracle: JavaScript Runtime Prediction',
    'code-builder': 'Code Builder: Block Syntax Assembly',
    'bug-hunter': 'Bug Hunter: Find Off-by-One Loops',
    'syntax-sprint': 'Syntax Sprint: Rapid Language Syntax',
    'logic-lab': 'Logic Lab: Algorithmic Branching',
    'algorithm-race': 'Algorithm Race: Big-O Speed Run',
    'sql-quest': 'SQL Quest: Relational Database Challenges',
    'html-hero': 'HTML Hero: Semantic DOM Builder',
    'css-battle': 'CSS Battle: Target Layout Alignment',
    'javascript-journey': 'JavaScript Journey: Promises & Closures',
    'python-missions': 'Python Missions: Dictionaries & Sets'
  };

  const currentTitle = gameId ? (gameTitles[gameId] || 'Coding Mini-Game') : 'Coding Mini-Game';

  const handleBugCheck = (line: number) => {
    setSelectedBugLine(line);
    if (line === 2) {
      setScore(prev => prev + 15);
      showToast('Bug Identified! +15 XP Awarded ✓', 'success');
    } else {
      showToast('Incorrect line. Check variable initialization.', 'error');
    }
  };

  const handleOracleCheck = (val: string) => {
    setOracleAnswer(val);
    if (val === 'false') {
      setScore(prev => prev + 15);
      showToast('Correct Output! +15 XP Awarded ✓', 'success');
    } else {
      showToast('Incorrect evaluation.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center justify-between">
        <Link to="/coding/games" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" /> Back to Games Arcade
        </Link>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold font-mono">
          Game XP: +{score}
        </span>
      </div>

      <PageHeader
        eyebrow="ACE CODING ARCADE"
        title={currentTitle.split(':')[0]}
        highlight="Challenge."
        subtitle="Solve this mini-challenge using your real language intuition."
      />

      {/* Game 1 / Bug Hunter Interactive Container */}
      {(gameId === 'debug-detective' || gameId === 'bug-hunter' || !gameId) && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Click the line containing the runtime exception bug:</h3>
          <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-slate-200 space-y-1">
            {[
              "function calculateAverage(numbers) {",
              "  let total = 0;",
              "  for (let i = 0; i <= numbers.length; i++) { // Check bound",
              "    total += numbers[i];",
              "  }",
              "  return total / numbers.length;",
              "}"
            ].map((codeLine, idx) => (
              <div
                key={idx}
                onClick={() => handleBugCheck(idx)}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedBugLine === idx 
                    ? idx === 2 ? 'bg-emerald-950 text-emerald-200 border border-emerald-500' : 'bg-rose-950 text-rose-200 border border-rose-500'
                    : 'hover:bg-slate-800'
                }`}
              >
                <span className="text-slate-500 mr-3">{idx + 1}</span> {codeLine}
              </div>
            ))}
          </div>

          {selectedBugLine === 2 && (
            <p className="text-xs text-emerald-600 font-bold animate-fadeIn">
              ✓ Correct! In zero-indexed arrays, <code className="bg-emerald-50 px-1 py-0.5 rounded">i &lt;= numbers.length</code> causes an undefined element addition, returning <code className="bg-emerald-50 px-1 py-0.5 rounded">NaN</code>.
            </p>
          )}
        </div>
      )}

      {/* Game 2 / Output Oracle */}
      {gameId === 'output-oracle' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Predict the console output of this JavaScript comparison:</h3>
          <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-purple-300">
            <p>console.log([] == ![]);</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {['true', 'false', 'TypeError', 'undefined'].map(opt => (
              <button
                key={opt}
                onClick={() => handleOracleCheck(opt)}
                className={`p-3 rounded-2xl border font-bold transition-all ${
                  oracleAnswer === opt 
                    ? opt === 'true' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
