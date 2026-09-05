import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, Calendar, Users, ShieldCheck, ArrowLeft, Play, Coins, 
  CheckCircle2, Clock, FileText, AlertCircle, Share2
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useCompetition } from '../../context/CompetitionContext';
import { useToast } from '../../context/ToastContext';
import { formatCoinsToRupees } from '../../config/coinConfig';

export const CompetitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCompetitionById, registerForCompetition, isRegistered } = useCompetition();
  const { showToast } = useToast();

  const comp = getCompetitionById(id || 'comp-python-2026');
  const registered = comp ? isRegistered(comp.id) : false;

  const [teamName, setTeamName] = useState('');

  if (!comp) {
    return (
      <div className="p-12 text-center text-xs text-slate-500">
        Competition not found. <Link to="/competitions" className="text-brand-600 underline">Return to directory</Link>
      </div>
    );
  }

  const handleRegister = () => {
    const res = registerForCompetition(comp, teamName || undefined);
    if (res.success) {
      showToast(res.message, 'success');
      navigate(`/competitions/${comp.id}/room`);
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center justify-between">
        <Link to="/competitions" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600">
          <ArrowLeft className="w-4 h-4" /> Back to Competitions Directory
        </Link>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-800 text-xs font-bold font-mono">
          {comp.mode} · {comp.category}
        </span>
      </div>

      <PageHeader
        eyebrow="OFFICIAL COMPETITION"
        title={comp.title}
        highlight=""
        subtitle={`Hosted by ${comp.organizer} · ${comp.college}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Competition Overview & Rules */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">About the Competition</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {comp.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span className="text-slate-400 block text-[10px] font-bold">START DATE</span>
                <span className="font-bold text-slate-900 dark:text-white">{comp.startDate}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span className="text-slate-400 block text-[10px] font-bold">DURATION</span>
                <span className="font-bold text-slate-900 dark:text-white">{comp.durationMinutes} Minutes</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span className="text-slate-400 block text-[10px] font-bold">PARTICIPANTS</span>
                <span className="font-bold text-slate-900 dark:text-white">{comp.participantsCount} Registered</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <span className="text-slate-400 block text-[10px] font-bold">DEADLINE</span>
                <span className="font-bold text-brand-600">{comp.registrationDeadline}</span>
              </div>
            </div>
          </div>

          {/* Official Contest Rules */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" /> Competition Rules & Anti-Cheat Standards
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {comp.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Prize Podium & Registration Box */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Winner Prize Cards */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-[10px] font-black uppercase tracking-wider font-mono bg-white/20 px-3 py-1 rounded-full text-white">
              VERIFIED WINNER PRIZES
            </span>

            <div className="space-y-2">
              {comp.prizes.map(p => (
                <div key={p.position} className="p-3 bg-white/10 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block">{p.title}</span>
                    <span className="text-[10px] text-amber-100">{p.additionalReward || 'Verified Badge'}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-black text-sm block">🪙 {p.coins.toLocaleString()}</span>
                    <span className="text-[10px] text-amber-100">({p.cashEquivalent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-xs">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Contest Entry</h4>
            
            {registered ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> You are registered!
                </div>
                <Link to={`/competitions/${comp.id}/room`}>
                  <Button variant="ai" size="lg" className="w-full" icon={<Play className="w-4 h-4" />}>
                    Enter Contest Room →
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {comp.isTeamAllowed && (
                  <input
                    type="text"
                    placeholder="Enter Team Name (Optional)"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs outline-none"
                  />
                )}
                <Button variant="primary" size="lg" className="w-full" onClick={handleRegister}>
                  Confirm Free Registration
                </Button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
