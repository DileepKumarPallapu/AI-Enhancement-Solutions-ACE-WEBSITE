import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';

export const AdminModerationPage: React.FC = () => {
  const { events } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">AI Moderation Control Center</h1>
        <p className="text-xs text-slate-500 mt-1">Review incoming organizer submissions, authenticity flags, and quality metrics.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-sm text-slate-900">Active Moderation Queue</h3>
        <div className="divide-y divide-slate-100 text-xs">
          {events.slice(0, 4).map(e => (
            <div key={e.identity} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{e.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    Quality Score: {e.aiQualityScore || 96}/100
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{e.org?.organizationName} • {e.location?.city}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                </Button>
                <Button variant="outline" size="sm">
                  Request Edits
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
