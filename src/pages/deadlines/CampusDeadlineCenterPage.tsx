import React, { useState } from 'react';
import { campusDeadlinesDatabase, SmartDeadlineItem, DeadlineTimeBucket } from '../../services/db/campusDeadlinesDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Clock, Calendar, CheckCircle2, AlertCircle, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CampusDeadlineCenterPage() {
  const [selectedBucket, setSelectedBucket] = useState<DeadlineTimeBucket | 'ALL'>('ALL');
  const [deadlines, setDeadlines] = useState<SmartDeadlineItem[]>(campusDeadlinesDatabase.getAllDeadlines());

  const handleToggle = (id: string) => {
    campusDeadlinesDatabase.toggleCompletion(id);
    setDeadlines(campusDeadlinesDatabase.getAllDeadlines());
  };

  const filteredItems = selectedBucket === 'ALL'
    ? deadlines
    : deadlines.filter(d => d.timeBucket === selectedBucket);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="Smart Campus Deadline Center"
          description="Unified tracking across hackathon problem submissions, faculty mentor sessions, job applications, and capstone milestones."
          badge="PROACTIVE STUDENT OS"
          actions={
            <Link to="/calendar">
              <ACEButton variant="outline" size="sm" className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Calendar View</span>
              </ACEButton>
            </Link>
          }
        />

        {/* Bucket Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'ALL', label: 'All Upcoming' },
            { id: 'TODAY', label: '⚡ Due Today' },
            { id: 'TOMORROW', label: '📅 Tomorrow' },
            { id: 'THIS_WEEK', label: '🗓️ This Week' },
            { id: 'LATER', label: '⏳ Later' }
          ].map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBucket(b.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedBucket === b.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Deadline Items */}
        <div className="space-y-3">
          {filteredItems.map(d => (
            <ACECard
              key={d.id}
              className={`p-4 flex items-center justify-between gap-4 transition-all ${
                d.isCompleted ? 'opacity-60 bg-slate-50/50 dark:bg-slate-900/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggle(d.id)}
                  className={`w-5 h-5 mt-0.5 rounded-lg border flex items-center justify-center transition-all ${
                    d.isCompleted
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500'
                  }`}
                >
                  {d.isCompleted && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold ${d.isCompleted ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {d.title}
                    </h4>
                    <ACEBadge variant={d.priority === 'CRITICAL' ? 'danger' : d.priority === 'HIGH' ? 'warning' : 'neutral'} size="sm">
                      {d.priority}
                    </ACEBadge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {d.relatedEntityTitle} • Due: <span className="font-mono text-indigo-500">{new Date(d.dueDate).toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <Link to={d.actionUrl}>
                <ACEButton variant="ghost" size="sm" className="flex items-center gap-1">
                  <span>Open</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </ACEButton>
              </Link>
            </ACECard>
          ))}
        </div>
      </div>
    </div>
  );
}
