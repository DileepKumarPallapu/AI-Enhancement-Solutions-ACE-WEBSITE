import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, ShieldCheck, CheckCircle2, TrendingUp, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { COINS_PER_INR, INR_PER_COIN, COIN_CONVERSION_SCALE, formatCoinsToRupees, inrToCoins } from '../../config/coinConfig';
import { REWARD_PRODUCTS_CATALOG } from '../../data/rewardProducts';

export const AdminCoinEconomyPage: React.FC = () => {
  const [testInr, setTestInr] = useState<number>(499);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/admin" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">ACE ADMIN GOVERNANCE</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Central Coin Economy & Price Standard</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="CENTRAL CONVERSION RULE"
        title="ACE Official Coin"
        highlight="Economy Standard."
        subtitle="Enforces the single source of truth across all student rewards, competition prizes, and wallet accounting."
        badge={
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
            Official Standard: 100 Coins = ₹1.00 INR
          </span>
        }
      />

      {/* Main Conversion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400">Coins Per Rupee</span>
          <p className="text-3xl font-black text-brand-600 font-mono">100 Coins = ₹1.00</p>
          <span className="text-xs text-slate-500">Formula: <code>INR = Coins / 100</code></span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400">Rupee Per Coin</span>
          <p className="text-3xl font-black text-emerald-600 font-mono">1 Coin = ₹0.01</p>
          <span className="text-xs text-slate-500">Formula: <code>Coins = INR * 100</code></span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400">Active Verified Rewards</span>
          <p className="text-3xl font-black text-purple-600 font-mono">{REWARD_PRODUCTS_CATALOG.length} Items</p>
          <span className="text-xs text-slate-500">All prices calculated automatically</span>
        </div>
      </div>

      {/* Automatic Price Calculation Sandbox */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-brand-600" /> Automatic Price Calculator (No Manual Typing Errors)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Enter Reference INR Price (₹)</label>
            <input
              type="number"
              value={testInr}
              onChange={(e) => setTestInr(Number(e.target.value))}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-lg outline-none"
            />
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/60 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs space-y-1">
            <span className="text-slate-500 font-bold block">Calculated Coin Cost:</span>
            <p className="text-2xl font-black text-brand-600 font-mono">🪙 {inrToCoins(testInr).toLocaleString()} Coins</p>
            <span className="text-[11px] text-purple-700 dark:text-purple-300">Exact formula: <code>₹{testInr} × 100 = {inrToCoins(testInr).toLocaleString()} Coins</code></span>
          </div>
        </div>
      </div>

      {/* Conversion Verification Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Official Conversion Matrix</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-center text-xs">
          {COIN_CONVERSION_SCALE.map(s => (
            <div key={s.coins} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono space-y-1">
              <span className="text-xs text-amber-600 font-bold block">🪙 {s.coins.toLocaleString()}</span>
              <span className="font-black text-slate-900 dark:text-white text-sm block">{s.formatted}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
