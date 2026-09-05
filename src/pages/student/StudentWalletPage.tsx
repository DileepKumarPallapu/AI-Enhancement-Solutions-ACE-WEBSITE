import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Coins, ArrowRight, History, Gift, ShieldCheck, Flame, TrendingUp, 
  HelpCircle, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { formatCoinsToRupees, COINS_PER_RUPEE, MINIMUM_REDEMPTION_COINS } from '../../config/coinConfig';

export const StudentWalletPage: React.FC = () => {
  const { 
    coins, 
    wallet, 
    coinTransactions, 
    getDailyEarnings, 
    getWeeklyEarnings, 
    getMonthlyEarnings 
  } = useLearnPlay();

  const dailyEarned = getDailyEarnings();
  const weeklyEarned = getWeeklyEarnings();
  const monthlyEarned = getMonthlyEarnings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="STUDENT REWARDS & WALLET"
        title="ACE Coin"
        highlight="Wallet."
        subtitle="Earn real coins by solving verified coding challenges, micro-tasks, and daily missions."
        badge={
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
            1,000 Coins = ₹10.00
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Link to="/student/rewards">
              <Button variant="primary" size="md" icon={<Gift className="w-4 h-4" />}>
                Redeem Rewards
              </Button>
            </Link>
            <Link to="/student/wallet/history">
              <Button variant="outline" size="md" icon={<History className="w-4 h-4" />}>
                Transaction Ledger
              </Button>
            </Link>
          </div>
        }
      />

      {/* Main Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Available Balance Hero Card */}
        <div className="md:col-span-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider font-mono bg-white/20 px-3 py-1 rounded-full text-white">
              AVAILABLE BALANCE
            </span>
            <span className="text-xs font-bold text-amber-100 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 100% Cryptographic Ledger
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black font-mono">🪙 {coins.toLocaleString()}</span>
              <span className="text-xl sm:text-2xl font-black text-amber-100">≈ {formatCoinsToRupees(coins)}</span>
            </div>
            <p className="text-xs text-amber-100">Calculated strictly as 100 Coins = ₹1.00</p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/student/rewards">
              <button className="px-5 py-2.5 rounded-2xl bg-white text-amber-900 font-extrabold text-xs shadow-md hover:bg-amber-50 transition-all flex items-center gap-1.5">
                <Gift className="w-4 h-4" /> Redeem Voucher →
              </button>
            </Link>
            <Link to="/learn-play">
              <button className="px-5 py-2.5 rounded-2xl bg-black/20 text-white font-extrabold text-xs hover:bg-black/30 transition-all">
                + Earn More Coins
              </button>
            </Link>
          </div>
        </div>

        {/* Lifetime Earnings Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-600" /> Lifetime Activity
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 font-medium">Lifetime Earned:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">🪙 {wallet.lifetimeEarnedCoins} ({formatCoinsToRupees(wallet.lifetimeEarnedCoins)})</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 font-medium">Lifetime Redeemed:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">🪙 {wallet.lifetimeRedeemedCoins} ({formatCoinsToRupees(wallet.lifetimeRedeemedCoins)})</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <span className="text-slate-500 font-medium">Pending Held:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">🪙 {wallet.pendingCoins}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Period Earnings Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400">Today's Earnings</span>
          <p className="text-xl font-black text-amber-600 font-mono">🪙 +{dailyEarned}</p>
          <span className="text-[11px] text-slate-500">≈ {formatCoinsToRupees(dailyEarned)}</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400">This Week</span>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">🪙 +{weeklyEarned}</p>
          <span className="text-[11px] text-slate-500">≈ {formatCoinsToRupees(weeklyEarned)}</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400">This Month</span>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">🪙 +{monthlyEarned}</p>
          <span className="text-[11px] text-slate-500">≈ {formatCoinsToRupees(monthlyEarned)}</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400">Minimum Redemption</span>
          <p className="text-xl font-black text-emerald-600 font-mono">1,000 Coins</p>
          <span className="text-[11px] text-emerald-600 font-bold">₹10.00 Minimum</span>
        </div>
      </div>

      {/* Recent Coin Transactions */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-brand-600" /> Recent Coin Transactions
          </h3>
          <Link to="/student/wallet/history" className="text-xs font-bold text-brand-600 hover:underline">
            View Full Ledger ({coinTransactions.length}) →
          </Link>
        </div>

        {coinTransactions.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 space-y-2">
            <p>You haven't earned any coins yet.</p>
            <Link to="/learn-play">
              <Button variant="primary" size="sm">
                Start Your First Challenge
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {coinTransactions.slice(0, 5).map(t => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{t.description}</h4>
                  <span className="text-[11px] text-slate-400">{new Date(t.createdAt).toLocaleString()} · Balance after: 🪙 {t.balanceAfter}</span>
                </div>
                <span className={`font-mono font-black text-sm ${t.coins > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.coins > 0 ? `+${t.coins}` : t.coins} 🪙
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
