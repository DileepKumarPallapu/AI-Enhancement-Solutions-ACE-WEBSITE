import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Coins, CheckCircle2, ArrowLeft, Award } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useCompetition } from '../../context/CompetitionContext';
import { useToast } from '../../context/ToastContext';

export const StudentWinsPage: React.FC = () => {
  const { myWins, claimWinnerPrize } = useCompetition();
  const { showToast } = useToast();

  const handleClaim = (win: any) => {
    const res = claimWinnerPrize(win);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/student" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">TROPHY CABINET</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">My Competition Wins & Coin Prizes</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="VERIFIED ACHIEVEMENTS"
        title="Your Competition"
        highlight="Wins."
        subtitle="Claim your earned winner coin prizes and view official championship certificates."
      />

      <div className="space-y-4">
        {myWins.map((w, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-amber-500 font-bold text-sm">🥇 1st Place Champion</span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{w.competitionTitle}</h3>
              <p className="text-slate-400">Awarded on {w.wonAt} · Prize: 🪙 {w.coinsWon.toLocaleString()} Coins ({w.cashEquivalent})</p>
            </div>

            <div>
              {w.claimed ? (
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Prize In Wallet
                </span>
              ) : (
                <Button variant="ai" size="md" onClick={() => handleClaim(w)} icon={<Coins className="w-4 h-4" />}>
                  Claim 🪙 {w.coinsWon} Coins
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
