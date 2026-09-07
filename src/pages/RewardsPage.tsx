import React, { useState } from 'react';
import { Gift, Award, Sparkles, CheckCircle2, RotateCw, History, ArrowUpRight, ShieldCheck, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearnPlay } from '../context/LearnPlayContext';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { walletPersistenceDb, PersistentRedemptionOrder } from '../services/db/walletPersistenceDatabase';
import { useAuth } from '../context/AuthContext';

export const RewardsPage: React.FC = () => {
  const { coins, awardCoinsForChallenge } = useLearnPlay();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'REWARDS' | 'ORDERS'>('REWARDS');
  const [orders, setOrders] = useState<PersistentRedemptionOrder[]>(() => {
    return walletPersistenceDb.getRedemptionOrders(userId);
  });

  const refreshOrders = () => {
    setOrders(walletPersistenceDb.getRedemptionOrders(userId));
  };

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      setSpinning(false);
      const possibleWins = [
        { title: '50 Bonus Coins', coins: 50 },
        { title: '100 Bonus Coins', coins: 100 },
        { title: '₹100 Amazon Voucher (10,000 Coins Value)', coins: 250 },
        { title: 'Symposium VIP Pass Bonus (150 Coins)', coins: 150 }
      ];
      const chosen = possibleWins[Math.floor(Math.random() * possibleWins.length)];
      setSpinResult(chosen.title);

      // Award to persistent database
      awardCoinsForChallenge(`spin-${Date.now()}`, `Daily Spin: ${chosen.title}`, chosen.coins, 25);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      showToast(`+${chosen.coins} Coins credited to wallet! 🎉`);
    }, 1800);
  };

  const catalog = [
    {
      id: 'rew-upi-50',
      title: '₹50 Instant UPI Cash Transfer',
      desc: 'Direct transfer to your PhonePe / GPay / Paytm UPI ID within 24 hours.',
      coinCost: 5000,
      inrValue: 50,
      badge: 'POPULAR'
    },
    {
      id: 'rew-amz-100',
      title: '₹100 Amazon Pay E-Gift Card',
      desc: 'Digital claim code delivered instantly to your registered university email.',
      coinCost: 10000,
      inrValue: 100,
      badge: 'BEST VALUE'
    },
    {
      id: 'rew-swag-pack',
      title: 'ACE Official Developer Swag Kit',
      desc: 'ACE Hoodie + Dev Laptop Vinyl Stickers + Metal Member Pin delivered to your campus.',
      coinCost: 25000,
      inrValue: 250,
      badge: 'CAMPUS EXCLUSIVE'
    }
  ];

  const handleRedeem = (item: typeof catalog[0]) => {
    if (coins < item.coinCost) {
      showToast(`Insufficient balance. You need ${item.coinCost - coins} more coins.`);
      return;
    }

    const res = walletPersistenceDb.requestRedemption({
      userId,
      userName: currentUser?.fullName || 'Dileep Kumar',
      userEmail: currentUser?.email || 'dileep.kumar@veltech.edu.in',
      userCollege: currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      rewardId: item.id,
      rewardTitle: item.title,
      rewardType: item.id.includes('upi') ? 'UPI_CASH' : item.id.includes('amz') ? 'AMAZON_GIFT_CARD' : 'SWAG_PACK',
      coinsCost: item.coinCost,
      inrValue: item.inrValue,
      payoutDetails: currentUser?.email || 'Registered account details'
    });

    if (res.success) {
      refreshOrders();
      confetti({ particleCount: 70, spread: 50 });
      showToast(`Redemption submitted for ${item.title}! Order #${res.order?.id} 🎉`);
    } else {
      showToast(res.error || 'Failed to submit redemption');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">ACE Rewards & Economy</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Redeem your verified earned coins for UPI transfers, vouchers, and swag.</p>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-2xl flex items-center gap-3">
          <Gift className="w-5 h-5 text-brand-600" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Persistent Balance</span>
            <p className="text-base font-black text-brand-700 dark:text-brand-300">{coins} ACE Coins (₹{(coins / 100).toFixed(2)})</p>
          </div>
        </div>
      </div>

      {/* Daily Spin & Win */}
      <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <h3 className="text-xl sm:text-2xl font-black text-white">Daily Spin & Win Wheel</h3>
        <p className="text-xs text-purple-200 max-w-md mx-auto">
          Spin daily to win persistent bonus coins and vouchers credited instantly to your account ledger.
        </p>

        <div className="py-4">
          <div className={`w-36 h-36 rounded-full border-8 border-brand-400 border-t-amber-400 border-r-emerald-400 mx-auto flex items-center justify-center bg-white/10 backdrop-blur-md shadow-2xl ${spinning ? 'animate-spin' : ''}`}>
            <Sparkles className="w-10 h-10 text-amber-300" />
          </div>
        </div>

        {spinResult && (
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl max-w-sm mx-auto border border-white/30 animate-scaleUp">
            <p className="text-xs text-purple-200">Congratulations! You won:</p>
            <p className="text-lg font-black text-amber-300">{spinResult}</p>
          </div>
        )}

        <div>
          <Button
            variant="ai"
            size="lg"
            onClick={handleSpin}
            disabled={spinning}
          >
            {spinning ? 'Spinning the Wheel...' : '🎰 Spin Free Daily Wheel'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('REWARDS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'REWARDS'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🎁 Reward Catalog
        </button>
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'ORDERS'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📋 Redemption History ({orders.length})
        </button>
      </div>

      {activeTab === 'REWARDS' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalog.map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-brand-700 dark:text-purple-300 text-[10px] font-bold">
                  {item.badge}
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Cost:</span>
                  <span className="text-brand-600 dark:text-brand-400">{item.coinCost} Coins (₹{item.inrValue})</span>
                </div>
              </div>

              <Button
                variant={coins >= item.coinCost ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleRedeem(item)}
                disabled={coins < item.coinCost}
                className="w-full"
              >
                {coins >= item.coinCost ? `Redeem for ${item.coinCost} Coins` : `Need ${item.coinCost - coins} More Coins`}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              No redemptions requested yet. Earn coins and redeem above!
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{order.rewardTitle}</h4>
                    <span className="text-[10px] font-mono text-slate-400">#{order.id}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Requested on {new Date(order.requestedAt).toLocaleDateString()} • {order.coinsCost} Coins</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                  order.status === 'REJECTED' ? 'bg-rose-50 text-rose-700' :
                  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
