import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Megaphone, CheckSquare, Trophy, Award, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useManagement } from '../../context/ManagementContext';

export const AmbassadorDashboardPage: React.FC = () => {
  const { activePersona } = useManagement();

  const kpis = [
    { title: 'Students Reached', value: '1,248', change: '+14% this month', icon: Users, color: 'text-brand-600' },
    { title: 'Active Campaigns', value: '4', change: '2 ending this week', icon: Megaphone, color: 'text-purple-600' },
    { title: 'Pending Reviews', value: '3', change: 'Action Required', icon: ShieldCheck, color: 'text-amber-600' },
    { title: 'Referral Signups', value: '18', change: '+180 ACE Points', icon: Trophy, color: 'text-emerald-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="CAMPUS COMMAND CENTER"
        title="College Ambassador"
        highlight="Portal."
        subtitle={`Managing collegiate campaigns & event quality for ${activePersona.college}.`}
        badge={
          <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-brand-600" /> Rank #3 in Tamil Nadu • Level 4 Ambassador
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Link to="/ambassador/event-approvals">
              <Button variant="primary" size="md" icon={<ShieldCheck className="w-4 h-4" />}>
                Review Events (3)
              </Button>
            </Link>
            <Link to="/ambassador/campaigns">
              <Button variant="secondary" size="md" icon={<Megaphone className="w-4 h-4" />}>
                Manage Campaigns
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{kpi.title}</span>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{kpi.value}</p>
              <span className="text-[11px] font-semibold text-emerald-600 block">{kpi.change}</span>
            </div>
          );
        })}
      </div>

      {/* Action Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quick Links */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-brand-600" /> Ambassador Modules
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Link to="/ambassador/event-approvals" className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-100 dark:border-purple-900 hover:border-brand-500 transition-all font-bold text-slate-800 dark:text-slate-200 block">
              🛡️ Event Approvals & Trust
            </Link>
            <Link to="/ambassador/campaigns" className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all font-bold text-slate-800 dark:text-slate-200 block">
              📢 Campus Campaigns
            </Link>
            <Link to="/ambassador/tasks" className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all font-bold text-slate-800 dark:text-slate-200 block">
              ✅ Task Manager
            </Link>
            <Link to="/ambassador/students" className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all font-bold text-slate-800 dark:text-slate-200 block">
              👥 College Students Hub
            </Link>
          </div>
        </div>

        {/* Unique Referral & Link */}
        <div className="p-6 bg-gradient-to-br from-purple-900 to-slate-950 text-white rounded-3xl border border-purple-800/40 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Campus Partner Key</span>
            <h3 className="text-lg font-black text-white">Your Ambassador Referral Link</h3>
            <p className="text-xs text-purple-200">Share with students at your college. Earn +10 ACE points per verified registration.</p>
            <div className="p-3 bg-white/10 rounded-2xl font-mono text-xs text-amber-300 select-all">
              https://allcollegeevent.com/join?ref=ACE-AMB-05648B
            </div>
          </div>
          <Link to="/referral">
            <Button variant="ai" size="sm" className="w-full">
              View Referral Leaderboard →
            </Button>
          </Link>
        </div>

      </div>

    </div>
  );
};
