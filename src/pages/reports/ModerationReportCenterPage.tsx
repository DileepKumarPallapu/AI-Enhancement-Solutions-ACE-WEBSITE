import React, { useState } from 'react';
import { studentSafetyDatabase, SafetyReport, ReportStatus } from '../../services/db/studentSafetyDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShieldAlert, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

export function ModerationReportCenterPage() {
  const [reports, setReports] = useState<SafetyReport[]>(studentSafetyDatabase.getAllModeratorReports());
  const [selectedReport, setSelectedReport] = useState<SafetyReport | null>(reports[0] || null);
  const [notes, setNotes] = useState('');

  const handleTriage = (status: ReportStatus, action: string) => {
    if (!selectedReport) return;
    studentSafetyDatabase.triageReport(selectedReport.id, status, notes || 'Triaged by authorized college moderator', action);
    setReports(studentSafetyDatabase.getAllModeratorReports());
    setSelectedReport(null);
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <ACEPageHeader
          title="Moderation & Safety Triage Queue"
          description="Investigate student reports, enforce college conduct guidelines, and manage content appeal workflows."
          badge="FACULTY & MODERATOR CONSOLE"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Report Queue List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Incident Queue</h3>
            {reports.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedReport(r)}
                className={`w-full p-4 rounded-2xl text-left border transition-all ${
                  selectedReport?.id === r.id
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-600 font-mono">{r.category}</span>
                  <ACEBadge variant={r.status === 'ACTIONED' ? 'success' : r.status === 'INVESTIGATING' ? 'warning' : 'neutral'} size="sm">
                    {r.status}
                  </ACEBadge>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{r.targetTitle}</h4>
                <p className="text-[10px] text-slate-400 mt-1">Reported by {r.reporterName} • {new Date(r.createdAt).toLocaleDateString()}</p>
              </button>
            ))}
          </div>

          {/* Details & Actions */}
          <div className="col-span-2">
            {selectedReport ? (
              <ACECard className="p-6 space-y-6">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedReport.targetTitle}</h3>
                    <p className="text-xs text-slate-400">Target Type: {selectedReport.targetType} • ID: {selectedReport.targetId}</p>
                  </div>
                  <ACEBadge variant="warning" size="sm">{selectedReport.category}</ACEBadge>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">Student Violation Description</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                    {selectedReport.reason}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500">Moderator Resolution Notes</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Document action taken or reason for dismissal..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleTriage('DISMISSED', 'NO_VIOLATION')}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 transition"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => handleTriage('INVESTIGATING', 'UNDER_REVIEW')}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition"
                  >
                    Mark Investigating
                  </button>
                  <button
                    onClick={() => handleTriage('ACTIONED', 'CONTENT_REMOVED_AND_FLAGGED')}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
                  >
                    Enforce & Remove Content
                  </button>
                </div>
              </ACECard>
            ) : (
              <ACECard className="p-12 text-center text-slate-400 text-xs font-bold">
                Select a report from the queue to investigate.
              </ACECard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
