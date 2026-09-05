import React, { useState } from 'react';
import { Gift, Award, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';

export const RewardsPage: React.FC = () => {
  const { user } = useApp();
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      setSpinning(false);
      const rewards = ['50 Bonus Points', 'Free Hackathon Delegate Pass', '₹100 Amazon Voucher', 'ACE Developer Mystery Swag'];
      const chosen = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(chosen);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">ACE Rewards Center</h1>
          <p className="text-xs text-slate-500 mt-1">Redeem your earned points for brand vouchers, swag, and spin games.</p>
        </div>
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl flex items-center gap-3">
          <Gift className="w-5 h-5 text-brand-600" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Your Balance</span>
            <p className="text-base font-black text-brand-700">{user.pointsEarned} ACE Points</p>
          </div>
        </div>
      </div>

      {/* Interactive Spin & Win */}
      <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <h3 className="text-xl sm:text-2xl font-black text-white">Daily Spin & Win Wheel</h3>
        <p className="text-xs text-purple-200 max-w-md mx-auto">
          Spin daily to unlock bonus reward points, Amazon gift vouchers, and exclusive symposium tickets!
        </p>

        <div className="py-4">
          <div className={`w-40 h-40 rounded-full border-8 border-brand-400 border-t-amber-400 border-r-emerald-400 mx-auto flex items-center justify-center bg-white/10 backdrop-blur-md shadow-2xl ${spinning ? 'animate-spin' : ''}`}>
            <Sparkles className="w-10 h-10 text-amber-300" />
          </div>
        </div>

        {spinResult && (
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl max-w-sm mx-auto border border-white/30 animate-scaleUp">
            <p className="text-xs text-purple-200">Congratulations! You won:</p>
            <p className="text-lg font-black text-amber-300">{spinResult}</p>
          </div>
        )}

        <Button variant="ai" size="lg" onClick={handleSpin} disabled={spinning}>
          <RotateCw className={`w-4 h-4 mr-2 ${spinning ? 'animate-spin' : ''}`} />
          {spinning ? 'Spinning...' : 'Spin the Wheel (Free)'}
        </Button>
      </div>

      {/* Voucher Catalog */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Redeem Gift Vouchers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: 'Amazon Pay ₹250 Voucher', cost: '250 Points', image: '🎁' },
            { name: 'Swiggy ₹150 Meal Pass', cost: '150 Points', image: '🍔' },
            { name: 'BookMyShow ₹200 Ticket', cost: '200 Points', image: '🎟️' }
          ].map((v, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{v.image}</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{v.name}</h4>
                  <p className="text-xs font-semibold text-brand-600 mt-0.5">{v.cost}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Redeem Voucher
              </Button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
