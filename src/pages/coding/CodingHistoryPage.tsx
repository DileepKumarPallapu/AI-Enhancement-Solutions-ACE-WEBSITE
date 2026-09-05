import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, Trophy, CheckCircle2, XCircle, Search, Filter, ArrowLeft, 
  Sparkles, RotateCcw, Award, Code, BookOpen
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useArcade } from '../../context/ArcadeContext';

export const CodingHistoryPage: React.FC = () => {
  const { historyRecords } = useArcade();

  const [filter, setFilter] = useState<'ALL' | 'CORRECT' | 'WRONG'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = historyRecords.filter(r => {
    const matchesFilter = filter === 'ALL' || (filter === 'CORRECT' ? r.result === 'CORRECT' : r.result !== 'CORRECT');
    const matchesSearch = r.questionTitle.toLowerCase().includes(search.toLowerCase()) || 
                          r.gameTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/coding/games" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">STUDENT LOGS</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Coding Arcade Attempt History</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="AUDITABLE LEARNING LOGS"
        title="Your Verified"
        highlight="Answer History."
        subtitle="Review your submitted code, chosen options, exact results, and in-depth explanations for every round."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          {(['ALL', 'CORRECT', 'WRONG'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filter === f 
                  ? 'bg-brand-600 text-white shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {f === 'ALL' ? 'All Attempts' : f === 'CORRECT' ? '✓ Correct Only' : '✗ Wrong Only'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions or games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-slate-800 dark:text-slate-200 w-48"
          />
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <History className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">No attempts found for this filter</h3>
            <p className="text-xs text-slate-500">Play a game in the Arcade to see your real submitted code and evaluations here.</p>
            <Link to="/coding/games">
              <Button variant="primary" size="md">
                Open Coding Arcade
              </Button>
            </Link>
          </div>
        ) : (
          filtered.map(rec => (
            <div
              key={rec.id}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-brand-700">
                    {rec.gameTitle}
                  </span>
                  <span className="text-xs text-slate-400">· Round {rec.round} · Q{rec.questionNumber}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{rec.questionTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                    rec.result === 'CORRECT' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {rec.result === 'CORRECT' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {rec.result === 'CORRECT' ? 'Correct (+15 XP)' : 'Wrong (+0 XP)'}
                  </span>
                  <span className="text-[11px] text-slate-400">{rec.timestamp}</span>
                </div>
              </div>

              {/* Submitted vs Correct Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-slate-400 font-bold block text-[11px]">Your Selected / Entered Answer:</span>
                  <p className="font-mono text-slate-900 dark:text-white whitespace-pre-wrap">{rec.selectedAnswer}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold block text-[11px]">Correct Verified Answer:</span>
                  <p className="font-mono text-emerald-900 dark:text-emerald-200 whitespace-pre-wrap">{rec.correctAnswer}</p>
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white">Why: </strong> {rec.explanation}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
