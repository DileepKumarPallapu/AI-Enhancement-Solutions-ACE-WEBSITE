import React from 'react';
import { Target, ShieldCheck, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { careerReadinessDb } from '../../services/db/careerReadinessDatabase';
import { useAuth } from '../../context/AuthContext';

export const CareerReadinessPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  const report = careerReadinessDb.calculateReport(currentUserId, 'AI Systems Engineer');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400">Formula-Driven Scorecard</span>
              <h1 className="text-2xl font-bold text-white mt-1">Career Readiness: {report.targetRole}</h1>
              <p className="text-xs text-slate-400">Calculated from 6 verified evidence pillars</p>
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
              <span className="text-3xl font-extrabold text-emerald-400">{report.overallScore}%</span>
              <span className="block text-[10px] font-bold text-slate-300 uppercase">{report.ratingTier}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.categories.map(cat => (
            <div key={cat.category} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">{cat.name}</h3>
                <span className="text-xs font-bold text-emerald-400">{cat.currentScore}%</span>
              </div>

              <div className="space-y-2">
                {cat.factors.map(f => (
                  <div key={f.name} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-slate-200 font-medium block">{f.name}</span>
                      <span className="text-[10px] text-slate-400">{f.proof}</span>
                    </div>
                    {f.met ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">In Progress</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
