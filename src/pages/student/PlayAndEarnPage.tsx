import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Coins, Trophy, Sparkles, ArrowRight, Code, ShieldCheck, Briefcase } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { formatCoinsToRupees } from '../../config/coinConfig';

export const PlayAndEarnPage: React.FC = () => {
  const { coins } = useLearnPlay();

  const earnActivities = [
    { title: 'Debug The Code', category: 'Coding', coins: 50, xp: 25, time: '8 mins', path: '/coding/games', icon: '🕵️' },
    { title: 'Output Oracle', category: 'Coding', coins: 20, xp: 15, time: '4 mins', path: '/coding/games', icon: '🔮' },
    { title: 'SQL Challenge', category: 'Data', coins: 50, xp: 25, time: '6 mins', path: '/coding/games', icon: '🗄️' },
    { title: 'Spot Phishing Signals', category: 'Security', coins: 30, xp: 15, time: '3 mins', path: '/learn-play/tasks', icon: '🛡️' },
    { title: 'Resume Metric Enhancer', category: 'Career', coins: 40, xp: 20, time: '5 mins', path: '/learn-play/tasks', icon: '💼' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="PLAY → LEARN → EARN"
        title="Play, Learn &"
        highlight="Earn Coins."
        subtitle="Complete verified challenges and earn ACE Coins. 1,000 Coins = ₹10.00."
        badge={
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
            Wallet Balance: 🪙 {coins} ({formatCoinsToRupees(coins)})
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {earnActivities.map((act, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{act.icon}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 text-[10px] font-bold">
                  {act.category}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{act.title}</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-600 font-bold font-mono">🪙 +{act.coins} Coins</span>
                <span className="text-purple-600 font-bold font-mono">+{act.xp} XP</span>
              </div>
            </div>

            <Link to={act.path}>
              <Button variant="primary" size="sm" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                Play Challenge ({act.time})
              </Button>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};
