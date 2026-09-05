import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Gamepad2, Flame, Trophy, Award, Sparkles, BookOpen, Code, CheckCircle2, 
  ArrowRight, Compass, Zap, Target, Layers, Play, Clock, Coins, ShieldCheck
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { useApp } from '../../context/AppContext';
import { formatCoinsToRupees } from '../../config/coinConfig';

export const LearnPlayDashboardPage: React.FC = () => {
  const { 
    coins, 
    xp, 
    level, 
    levelTitle, 
    dailyStreak, 
    completedTaskIds, 
    getSkillProgress, 
    isTaskCompleted 
  } = useLearnPlay();

  const { user } = useApp();
  const userName = user?.name ? user.name.split(' ')[0] : '';

  const isTodayMissionDone = isTaskCompleted('daily-day-7');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Dynamic User Welcome Header */}
      <PageHeader
        eyebrow="ACE LEARN & PLAY"
        title="Good morning,"
        highlight={userName || 'Student'}
        subtitle="Learn by doing through verified 5-15 minute challenges, coding games, and practical missions."
        badge={
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1 font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-600" /> {dailyStreak} Day Streak 🔥
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Link to="/learn-play/daily">
              <Button variant="ai" size="md" icon={<Play className="w-4 h-4" />}>
                Start Today's Challenge
              </Button>
            </Link>
            <Link to="/student/wallet">
              <Button variant="outline" size="md" icon={<Coins className="w-4 h-4 text-amber-600" />}>
                View Coin Wallet
              </Button>
            </Link>
          </div>
        }
      />

      {/* Prominent Real Coin Balance Hero Bar */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider font-mono bg-white/20 px-3 py-1 rounded-full text-white">
            YOUR REAL COIN BALANCE
          </span>
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-3xl sm:text-4xl font-black font-mono">🪙 {coins.toLocaleString()} Coins</span>
            <span className="text-lg sm:text-xl font-black text-amber-100">≈ {formatCoinsToRupees(coins)}</span>
          </div>
          <p className="text-xs text-amber-100">Formula: 1,000 Coins = ₹10.00 (100 Coins = ₹1.00)</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/student/wallet">
            <button className="px-5 py-2.5 rounded-2xl bg-white text-amber-900 font-extrabold text-xs shadow-md hover:bg-amber-50 transition-all flex items-center gap-1.5">
              <Coins className="w-4 h-4" /> Open Wallet →
            </button>
          </Link>
          <Link to="/student/play-earn">
            <button className="px-5 py-2.5 rounded-2xl bg-black/20 text-white font-extrabold text-xs hover:bg-black/30 transition-all">
              Play & Earn
            </button>
          </Link>
        </div>
      </div>

      {/* Dynamically Calculated Real Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Current Level</span>
          <p className="text-2xl font-black text-brand-600">Level {level}</p>
          <span className="text-[11px] text-purple-600 font-bold">{levelTitle}</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Total XP Earned</span>
          <p className="text-2xl font-black text-purple-600 font-mono">{xp} XP</p>
          <span className="text-[11px] text-slate-400">Progression Points</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Completed Missions</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">{completedTaskIds.length}</p>
          <span className="text-[11px] text-emerald-600 font-bold">Verified Completions: {completedTaskIds.length}</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Skill Tree Progress</span>
          <p className="text-2xl font-black text-emerald-600 font-mono">{getSkillProgress()}%</p>
          <span className="text-[11px] text-slate-400 font-medium">Programming Mastery</span>
        </div>
      </div>

      {/* Real Today's Mission Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-wider text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-400" /> Daily Mission · Day 7
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">Debug The Reverse String Function</h3>
          <p className="text-xs text-purple-200 leading-relaxed font-medium">
            Fix array mutations and character splitting to make all 3 verified test cases pass.
          </p>
          <div className="flex items-center gap-4 text-xs text-purple-300 pt-1">
            <span>Reward: <strong className="text-amber-300">🪙 +50 Coins</strong> & <strong className="text-purple-300">+25 XP</strong></span>
            <span>Status: <strong className={isTodayMissionDone ? "text-emerald-400" : "text-amber-300"}>{isTodayMissionDone ? "✓ Completed" : "Not Started"}</strong></span>
          </div>
        </div>

        <Link to="/learn-play/daily" className="flex-shrink-0">
          <Button variant="ai" size="lg" icon={<Zap className="w-5 h-5" />}>
            {isTodayMissionDone ? "Review Solution →" : "Start Mission Now →"}
          </Button>
        </Link>
      </div>

      {/* Micro-Task Arena Shortcuts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-600" /> Micro-Task & Coding Practice
            </h2>
            <p className="text-xs text-slate-500">Pick a 5-15 minute task to level up your technical skills and earn real coins</p>
          </div>
          <Link to="/learn-play/tasks" className="text-xs font-bold text-brand-600 hover:underline">
            View All Tasks →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'Coding & Logic', count: '🪙 +50 Coins', icon: '💻', path: '/learn-play/tasks' },
            { title: 'SQL & Data', count: '🪙 +50 Coins', icon: '🗄️', path: '/learn-play/tasks' },
            { title: 'Cybersecurity', count: '🪙 +30 Coins', icon: '🛡️', path: '/learn-play/tasks' },
            { title: 'Resume Metric', count: '🪙 +40 Coins', icon: '💼', path: '/learn-play/tasks' }
          ].map((c, i) => (
            <Link
              key={i}
              to={c.path}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-400 transition-all space-y-1 block"
            >
              <div className="text-2xl">{c.icon}</div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{c.title}</h4>
              <p className="text-[11px] text-amber-600 font-bold font-mono">{c.count}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};
