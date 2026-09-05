import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Coins, ShieldCheck, ArrowLeft, CheckCircle2, Search, Filter, Calculator } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useLearnPlay } from '../../context/LearnPlayContext';
import { useToast } from '../../context/ToastContext';
import { formatCoinsToRupees, coinsToINR, inrToCoins, COIN_CONVERSION_SCALE } from '../../config/coinConfig';
import { REWARD_PRODUCTS_CATALOG, RewardProduct } from '../../data/rewardProducts';

export const StudentRewardsPage: React.FC = () => {
  const { coins, redeemReward } = useLearnPlay();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  const filteredProducts = REWARD_PRODUCTS_CATALOG.filter(p => {
    const matchesCat = activeCategory === 'ALL' || p.category === activeCategory;
    const matchesSearch = p.productName.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRedeem = (product: RewardProduct) => {
    if (coins < product.coinPrice) {
      showToast(`Insufficient coins. You need ${(product.coinPrice - coins).toLocaleString()} more Coins (${formatCoinsToRupees(product.coinPrice - coins)}).`, 'error');
      return;
    }

    const res = redeemReward({
      id: product.id,
      title: product.productName,
      coinsRequired: product.coinPrice,
      rupeeValue: product.referenceINRPrice,
      category: 'MERCH',
      description: product.description,
      inStock: product.stock > 0
    });

    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/student/wallet" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">EDUCATIONAL REWARD STORE</span>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">ACE Student Rewards</h1>
          </div>
        </div>

        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 text-xs font-bold border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
        >
          <Calculator className="w-4 h-4 text-amber-600" />
          <span>Coin Calculator (100 Coins = ₹1)</span>
        </button>
      </div>

      <PageHeader
        eyebrow="VERIFIED STUDENT ESSENTIALS"
        title="Turn Learning Achievements into"
        highlight="Useful Student Essentials."
        subtitle="Exchange your earned competition and learning coins for physical books, study stationery, and programming accessories. Strictly 100 Coins = ₹1.00."
        badge={
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
            Available: 🪙 {coins.toLocaleString()} Coins (≈ {formatCoinsToRupees(coins)} equivalent)
          </span>
        }
      />

      {/* Coin Conversion Rate Banner */}
      {showCalculator && (
        <div className="p-6 bg-amber-50/80 dark:bg-amber-950/40 rounded-3xl border border-amber-200 dark:border-amber-800/80 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-600" /> Official ACE Coin Conversion Standard (100 Coins = ₹1.00)
            </h3>
            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 font-bold">1 Coin = ₹0.01 INR</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-center text-xs">
            {COIN_CONVERSION_SCALE.slice(3).map(scale => (
              <div key={scale.coins} className="p-2.5 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200/60 dark:border-amber-900/60 shadow-2xs font-mono">
                <span className="text-[10px] text-slate-400 block">{scale.coins.toLocaleString()} Coins</span>
                <span className="font-bold text-slate-900 dark:text-white">{scale.formatted}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'Stationery', 'Books', 'Technology', 'Study'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === cat 
                  ? 'bg-brand-600 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Products' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search books, pens, mice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-slate-800 dark:text-slate-200 w-52"
          />
        </div>
      </div>

      {/* Reward Products Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => {
          const hasEnough = coins >= p.coinPrice;
          const remainingCoins = p.coinPrice - coins;

          return (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{p.icon}</span>
                  <div className="text-right">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 block">
                      {p.stock} Available
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Verified: {p.lastVerifiedAt}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{p.productName}</h3>
                  <p className="text-xs text-brand-600 font-medium mt-0.5">{p.useCase}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{p.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold block">Reference Price:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">₹{p.referenceINRPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-bold block">Reward Cost:</span>
                    <span className="font-mono font-black text-base text-amber-600">🪙 {p.coinPrice.toLocaleString()} Coins</span>
                    <span className="text-[10px] text-slate-400 block">(≈ ₹{p.referenceINRPrice} equivalent)</span>
                  </div>
                </div>

                <Button
                  variant={hasEnough ? "primary" : "outline"}
                  size="md"
                  className="w-full"
                  disabled={!hasEnough || p.stock === 0}
                  onClick={() => handleRedeem(p)}
                  icon={<Gift className="w-4 h-4" />}
                >
                  {p.stock === 0 ? 'Out of Stock' : hasEnough ? 'Redeem Educational Reward' : `Need ${remainingCoins.toLocaleString()} More Coins (≈ ${formatCoinsToRupees(remainingCoins)})`}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
