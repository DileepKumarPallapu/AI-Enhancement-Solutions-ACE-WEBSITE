import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Coins, Trophy, Award, Flame, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { useArcade } from '../../context/ArcadeContext';
import { formatCoinsToRupees } from '../../config/coinConfig';

export const StudentAnalyticsPage: React.FC = () => {
  const { coins, xp, dailyStreak, completedTaskIds } = useLearnPlay();
  const { historyRecords } = useArcade();

  const totalEvaluations = historyRecords.length;
  const correctCount = historyRecords.filter(r => r.result === 'CORRECT').length;
  const accuracy = totalEvaluations > 0 ? Math.round((correctCount / totalEvaluations) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/learn-play" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">LEARNING METRICS</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Student Analytics & Performance</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="AUDITABLE METRICS"
        title="Your Verified"
        highlight="Learning Stats."
        subtitle="Transparent learning analytics calculated directly from your submitted test results."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Total Coins Earned</span>
          <p className="text-2xl font-black text-amber-600 font-mono">🪙 {coins}</p>
          <span className="text-[11px] text-slate-500">≈ {formatCoinsToRupees(coins)}</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Evaluation Accuracy</span>
          <p className="text-2xl font-black text-emerald-600 font-mono">{accuracy}%</p>
          <span className="text-[11px] text-emerald-600 font-bold">{correctCount}/{totalEvaluations} Passed</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Active Streak</span>
          <p className="text-2xl font-black text-amber-600 font-mono">{dailyStreak} Days 🔥</p>
          <span className="text-[11px] text-slate-500">Daily Continuity</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Verified Missions</span>
          <p className="text-2xl font-black text-purple-600 font-mono">{completedTaskIds.length}</p>
          <span className="text-[11px] text-purple-600 font-bold">100% Validated</span>
        </div>
      </div>

    </div>
  );
};
