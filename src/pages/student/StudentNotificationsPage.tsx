import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, Coins, Trophy, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useLearnPlay } from '../../context/LearnPlayContext';

export const StudentNotificationsPage: React.FC = () => {
  const { coinTransactions } = useLearnPlay();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <div className="flex items-center gap-3">
        <Link to="/student" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider font-mono">NOTIFICATION CENTER</span>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Student Notifications</h1>
        </div>
      </div>

      <PageHeader
        eyebrow="COMMUNICATION & ALERTS"
        title="Your Verified"
        highlight="Activity Alerts."
        subtitle="Recent coin rewards, submission evaluations, and collegiate event updates."
      />

      <div className="space-y-3">
        {coinTransactions.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            No notifications yet.
          </div>
        ) : (
          coinTransactions.map(t => (
            <div key={t.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 font-bold">
                  🪙
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{t.description}</h4>
                  <span className="text-[11px] text-slate-400">{new Date(t.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <span className="font-mono font-black text-emerald-600 text-sm">+{t.coins} Coins</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
