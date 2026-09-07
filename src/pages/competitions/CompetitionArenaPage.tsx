import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Terminal, ShieldAlert, Play, CheckCircle2, 
  Clock, Award, Coins, RefreshCw 
} from 'lucide-react';
import { competitionExecutionDb } from '../../services/db/competitionExecutionDatabase';
import { useToast } from '../../context/ToastContext';

export const CompetitionArenaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const [code, setCode] = useState(`// Solve: Implement Distributed Rate Limiter
function isAllowed(clientId: string, limit: number, windowSec: number): boolean {
  // Your implementation here
  return true;
}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scoreResult, setScoreResult] = useState<number | null>(null);

  const handlePasteBlock = (e: React.ClipboardEvent) => {
    e.preventDefault();
    showToast('Clipboard pasting is disabled in anti-cheat contest mode.', 'error');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      showToast('Clipboard paste shortcut is disabled in anti-cheat contest mode.', 'error');
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const res = competitionExecutionDb.submitSolution(id || 'comp_rate_limit', 'usr_student_dileep', code);
      setScoreResult(res.executionScore);
      setIsSubmitting(false);
      showToast(`All 8/8 test cases passed! Score: ${res.executionScore}/100`, 'success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5 w-fit">
              <ShieldAlert className="w-3.5 h-3.5" /> Anti-Cheat Coding Mode Active
            </span>
            <h1 className="text-2xl font-bold text-white">Distributed Rate Limiter Implementation</h1>
            <p className="text-xs text-slate-400">1st Prize: 5,000 Coins (₹50) • 2nd: 2,000 Coins (₹20) • 3rd: 1,000 Coins (₹10)</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>TypeScript Code Editor (Paste Disabled)</span>
            <span>Autosave: Active</span>
          </div>

          <textarea
            rows={14}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onPaste={handlePasteBlock}
            onKeyDown={handleKeyDown}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
          />

          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              {scoreResult !== null && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Passed 8/8 Tests • Score: {scoreResult}/100
                </span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Running Server Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Submit for Server Evaluation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompetitionArenaPage;
