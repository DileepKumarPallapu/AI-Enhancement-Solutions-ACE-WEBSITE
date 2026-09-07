import React, { useState } from 'react';
import { 
  Activity, 
  Calendar, 
  Award, 
  Coins, 
  MessageSquare, 
  UserCheck, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  ArrowUpRight,
  ExternalLink,
  Shield
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';
import { activityLogDb } from '../services/db/activityLogDatabase';
import { ActivityLog } from '../services/db/canonicalDataArchitecture';
import { Link } from 'react-router-dom';

export const ActivityCenterPage: React.FC = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [filterType, setFilterType] = useState<string>('ALL');
  const activities = activityLogDb.getActivitiesByUser(userId);

  const filtered = filterType === 'ALL'
    ? activities
    : activities.filter(a => a.entityType === filterType);

  const getActivityIcon = (type: ActivityLog['type'], entityType: ActivityLog['entityType']) => {
    switch (entityType) {
      case 'EVENT':
      case 'COMPETITION':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'CERTIFICATE':
        return <Award className="w-4 h-4 text-emerald-600" />;
      case 'WALLET':
        return <Coins className="w-4 h-4 text-amber-600" />;
      case 'POST':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'MENTOR':
      case 'GOAL':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  const getActivityBadgeColor = (entityType: ActivityLog['entityType']) => {
    switch (entityType) {
      case 'EVENT': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-300';
      case 'CERTIFICATE': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300';
      case 'WALLET': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300';
      case 'POST': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="YOUR LIVE AUDIT TRAIL"
        title="Universal"
        highlight="Activity Center."
        subtitle="Chronological audit history of all your authenticated registrations, certificates, submissions, discussions, and wallet milestones."
      />

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-semibold">
        {[
          { id: 'ALL', label: 'All Activities' },
          { id: 'EVENT', label: '📅 Events & Contests' },
          { id: 'CERTIFICATE', label: '🏆 Certificates' },
          { id: 'WALLET', label: '🪙 Coins & Rewards' },
          { id: 'POST', label: '💬 Community' },
          { id: 'PROFILE', label: '👤 Profile & Security' }
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setFilterType(chip.id)}
            className={`px-3.5 py-2 rounded-full whitespace-nowrap transition border ${
              filterType === chip.id
                ? 'bg-brand-600 text-white border-brand-600 font-bold shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Timeline Feed */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
            No activity found for this category filter.
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex items-start gap-4 transition hover:border-brand-300"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                {getActivityIcon(item.type, item.entityType)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getActivityBadgeColor(item.entityType)}`}>
                      {item.entityType}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(item.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
