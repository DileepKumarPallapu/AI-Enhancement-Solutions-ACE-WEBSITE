import React from 'react';
import { CheckSquare, Clock, AlertCircle, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useManagement } from '../../context/ManagementContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AmbassadorTasksPage: React.FC = () => {
  const { tasks, updateTaskStatus } = useManagement();
  const { showToast } = useToast();

  const handleToggle = (id: string, current: string) => {
    const next = current === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    updateTaskStatus(id, next as any);
    showToast(`Task status updated to ${next} ✓`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="CAMPUS AMBASSADOR OPERATIONS"
        title="College Task &"
        highlight="Action Tracker."
        subtitle="Manage assigned event verification tasks, campus promotion campaigns, and college department verifications."
      />

      <div className="space-y-4">
        {tasks.map(t => (
          <div key={t.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <button
                onClick={() => handleToggle(t.id, t.status)}
                className={`mt-1 p-2 rounded-xl border transition-colors ${
                  t.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700 text-transparent hover:border-brand-500'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-50 text-brand-700">
                    {t.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    t.priority === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {t.priority}
                  </span>
                </div>
                <h3 className={`font-bold text-sm text-slate-900 dark:text-white ${t.status === 'COMPLETED' ? 'line-through text-slate-400' : ''}`}>
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500">{t.description}</p>
                <span className="text-[10px] text-slate-400 block pt-1">Due Date: {t.dueDate} • Assigned by: {t.createdBy}</span>
              </div>
            </div>

            <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
              t.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
