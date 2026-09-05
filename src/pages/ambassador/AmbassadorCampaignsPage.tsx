import React, { useState } from 'react';
import { Megaphone, PlusCircle, Users, Calendar, CheckCircle2, Trophy } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AmbassadorCampaignsPage: React.FC = () => {
  const { showToast } = useToast();
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CMP-101',
      title: 'HACKVERSE 2.0 CSE Department Outreach',
      target: 200,
      current: 164,
      endDate: 'Oct 12, 2026',
      reward: '+250 XP',
      status: 'ACTIVE'
    },
    {
      id: 'CMP-102',
      title: 'NEXORA 2K26 Technical Paper Call',
      target: 100,
      current: 82,
      endDate: 'Oct 20, 2026',
      reward: '+150 XP',
      status: 'ACTIVE'
    },
    {
      id: 'CMP-103',
      title: 'First-Year Python Practice Drive',
      target: 300,
      current: 300,
      endDate: 'Sep 28, 2026',
      reward: '+400 XP',
      status: 'COMPLETED'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="AMBASSADOR CAMPAIGNS"
        title="Campus Promotion"
        highlight="Campaigns."
        subtitle="Organize targeted student awareness drives, track live registration progress, and unlock ambassador rewards."
        actions={
          <Button variant="primary" size="md" onClick={() => showToast('Campaign creation wizard opened')} icon={<PlusCircle className="w-4 h-4" />}>
            + Create New Campaign
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(c => {
          const progress = Math.min(100, Math.round((c.current / c.target) * 100));
          return (
            <div key={c.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-lg">
                    {c.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    c.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-brand-800'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{c.title}</h3>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{c.current} / {c.target} Students</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-400 space-y-1">
                  <p>Deadline: <strong className="text-slate-700 dark:text-slate-300">{c.endDate}</strong></p>
                  <p>Campaign Reward: <strong className="text-amber-600">{c.reward}</strong></p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline" size="sm" className="w-full" onClick={() => showToast(`Campaign report for ${c.id} exported ✓`)}>
                  Export Student Roster
                </Button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
