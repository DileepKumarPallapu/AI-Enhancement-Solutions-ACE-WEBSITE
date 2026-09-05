import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Flame, Trophy, Play, CheckCircle2, Sparkles, Brain, ArrowRight, Gamepad2, BookOpen, Layers } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';

export const CodingHomePage: React.FC<{ onOpenAiChat: () => void }> = ({ onOpenAiChat }) => {
  const navigate = useNavigate();

  const categories = [
    { title: 'Python', count: '45 Problems', icon: '🐍', color: 'from-amber-500 to-yellow-600', query: 'Python' },
    { title: 'Data Structures', count: '60 Problems', icon: '🌲', color: 'from-blue-500 to-indigo-600', query: 'DSA' },
    { title: 'Algorithms', count: '52 Problems', icon: '⚡', color: 'from-purple-500 to-pink-600', query: 'Algorithms' },
    { title: 'Java', count: '38 Problems', icon: '☕', color: 'from-rose-500 to-red-600', query: 'Java' },
    { title: 'C++ & Systems', count: '35 Problems', icon: '⚙️', color: 'from-cyan-500 to-blue-600', query: 'C++' },
    { title: 'SQL & Database', count: '28 Problems', icon: '🗄️', color: 'from-emerald-500 to-teal-600', query: 'SQL' },
    { title: 'React & Frontend', count: '30 Problems', icon: '⚛️', color: 'from-sky-500 to-blue-600', query: 'React' },
    { title: 'AI / ML Math', count: '24 Problems', icon: '🧠', color: 'from-violet-500 to-purple-600', query: 'AI' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="ACE CODING & SKILL PLATFORM"
        title="Learn. Code."
        highlight="Compete."
        subtitle="Practice algorithmic problems, play browser coding games, participate in weekly collegiate contests, and level up your engineering skills."
        badge={
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-600" /> 12 Day Streak 🔥 (+50 XP Today)
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Link to="/coding/games">
              <Button variant="outline" size="md" icon={<Gamepad2 className="w-4 h-4 text-brand-600" />}>
                Play Coding Games
              </Button>
            </Link>
            <Link to="/coding/practice">
              <Button variant="primary" size="md" icon={<Code className="w-4 h-4" />}>
                Practice Problems
              </Button>
            </Link>
          </div>
        }
      />

      {/* Daily Challenge Card */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-wider text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-400" /> Daily Challenge • Day 12
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">Two Sum & Hash Map Lookup</h3>
          <p className="text-xs text-purple-200 leading-relaxed font-medium">
            Given an array of integers <code className="text-amber-300 bg-white/10 px-1 py-0.5 rounded">nums</code> and an integer <code className="text-amber-300 bg-white/10 px-1 py-0.5 rounded">target</code>, return indices of the two numbers such that they add up to target.
          </p>
          <div className="flex items-center gap-4 text-xs text-purple-300 pt-1">
            <span>Difficulty: <strong className="text-emerald-400">Easy</strong></span>
            <span>Reward: <strong className="text-amber-300">+20 XP + 5 Pts</strong></span>
          </div>
        </div>

        <Link to="/coding/practice/two-sum" className="flex-shrink-0">
          <Button variant="ai" size="lg" icon={<Play className="w-5 h-5" />}>
            Solve Challenge Now →
          </Button>
        </Link>
      </div>

      {/* Practice Domains Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Practice by Topic</h2>
            <p className="text-xs text-slate-500">Master fundamental computer science and modern frameworks</p>
          </div>
          <Link to="/coding/practice" className="text-xs font-bold text-brand-600 hover:underline">
            View All 300+ Problems →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/coding/practice?topic=${encodeURIComponent(cat.title)}`)}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-400 hover:shadow-lg transition-all cursor-pointer space-y-2 group"
            >
              <div className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                {cat.title}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browser Coding Games Highlight */}
      <section className="bg-purple-50 dark:bg-purple-950/40 rounded-3xl p-6 sm:p-8 border border-purple-200 dark:border-purple-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider">Gamified Learning</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">8 Browser Coding Mini-Games</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Code Builder, Debug The Code, Output Guess, Algorithm Race, and SQL Challenge.</p>
          </div>
          <Link to="/coding/games">
            <Button variant="primary" size="md" icon={<Gamepad2 className="w-4 h-4" />}>
              Launch Games Arcade →
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
