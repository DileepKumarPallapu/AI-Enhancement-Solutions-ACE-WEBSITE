import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { History, Coins, ArrowLeft, Search, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { formatCoinsToRupees } from '../../config/coinConfig';

export const StudentWalletHistoryPage: React.FC = () => {
  const { coinTransactions } = useLearnPlay();
  const [filter, setFilter] = useState<'ALL' | 'EARN' | 'REDEEM'>('ALL');

  const filtered = coinTransactions.filter(t => filter === 'ALL' || t.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/student/wallet" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">FINANCIAL AUDIT LOG</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Immutable Coin Ledger</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="TRANSACTION HISTORY"
        title="Coin Ledger &"
        highlight="Audit Trail."
        subtitle="Every earned coin, reward redemption, and balance transition is chronologically logged."
      />

      <div className="flex items-center gap-2">
        {(['ALL', 'EARN', 'REDEEM'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === f ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'ALL' ? 'All Transactions' : f === 'EARN' ? '🪙 Earned' : '🎁 Redeemed'}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No transactions found for this filter.
          </div>
        ) : (
          filtered.map(t => (
            <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                    t.type === 'EARN' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {t.type}
                  </span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">{t.description}</h4>
                </div>
                <p className="text-[11px] text-slate-400">
                  {new Date(t.createdAt).toLocaleString()} · Ref: <code className="font-mono">{t.referenceId}</code> · Balance: 🪙 {t.balanceBefore} → 🪙 {t.balanceAfter}
                </p>
              </div>

              <div className="text-right">
                <span className={`font-mono font-black text-sm block ${t.coins > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.coins > 0 ? `+${t.coins}` : t.coins} 🪙
                </span>
                <span className="text-[10px] text-slate-400 font-mono">({formatCoinsToRupees(Math.abs(t.coins))})</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
