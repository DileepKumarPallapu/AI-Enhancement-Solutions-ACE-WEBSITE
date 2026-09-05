import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Coins, Award, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useCompetition } from '../../context/CompetitionContext';
import { useToast } from '../../context/ToastContext';
import { formatCoinsToRupees } from '../../config/coinConfig';

export const CompetitionResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCompetitionById, myWins, claimWinnerPrize } = useCompetition();
  const { showToast } = useToast();

  const comp = getCompetitionById(id || 'comp-python-2026');
  const myWin = myWins.find(w => w.competitionId === comp?.id);

  const leaderboard = [
    { rank: 1, name: 'Pallapu Dileep Kumar', college: 'Hindustan Institute of Technology', score: 300, time: '24m 12s', prize: '🪙 5,000 Coins (₹50)' },
    { rank: 2, name: 'Sanjay S', college: 'PSG Tech, Coimbatore', score: 280, time: '31m 05s', prize: '🪙 2,000 Coins (₹20)' },
    { rank: 3, name: 'Kavitha R', college: 'Anna University, Chennai', score: 250, time: '38m 40s', prize: '🪙 1,000 Coins (₹10)' }
  ];

  const handleClaim = () => {
    if (!myWin) return;
    const res = claimWinnerPrize(myWin);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/competitions" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">CONTEST LEADERBOARD</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Official Results & Winners</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="VERIFIED FINAL LEADERBOARD"
        title="Contest Results &"
        highlight="Winners Podium."
        subtitle={`Official results for ${comp?.title || 'ACE Python Championship'}`}
      />

      {/* Winner Podium Banner */}
      {myWin && (
        <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono bg-white/20 px-3 py-1 rounded-full text-white">
              CONGRATULATIONS 🎉
            </span>
            <h3 className="text-2xl font-black">You Placed 1st in this Championship!</h3>
            <p className="text-xs text-amber-100">Winner Prize: 🪙 {myWin.coinsWon.toLocaleString()} Coins ({myWin.cashEquivalent})</p>
          </div>

          <div>
            {myWin.claimed ? (
              <span className="px-4 py-2 rounded-2xl bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Prize Claimed & In Wallet
              </span>
            ) : (
              <Button variant="ai" size="md" onClick={handleClaim} icon={<Coins className="w-4 h-4" />}>
                Claim 5,000 Coins Prize
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Final Ranked Leaderboard
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Student & College</th>
                <th className="p-4">Score</th>
                <th className="p-4">Time Taken</th>
                <th className="p-4">Winner Coin Prize</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {leaderboard.map(r => (
                <tr key={r.rank} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 font-medium">
                  <td className="p-4 font-black font-mono text-sm text-brand-600">
                    {r.rank === 1 ? '🥇 #1' : r.rank === 2 ? '🥈 #2' : '🥉 #3'}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{r.name}</span>
                    <span className="text-[11px] text-slate-400">{r.college}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{r.score} pts</td>
                  <td className="p-4 text-slate-500 font-mono">{r.time}</td>
                  <td className="p-4 font-bold text-amber-600 font-mono">{r.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
