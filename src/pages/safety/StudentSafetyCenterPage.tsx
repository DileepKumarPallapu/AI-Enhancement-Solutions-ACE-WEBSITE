import React, { useState } from 'react';
import { studentSafetyDatabase, SafetyReport, BlockedUser, ReportCategory } from '../../services/db/studentSafetyDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Shield, Lock, UserX, AlertTriangle, Download, CheckCircle2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StudentSafetyCenterPage() {
  const [reports, setReports] = useState<SafetyReport[]>(studentSafetyDatabase.getReportsForUser());
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(studentSafetyDatabase.getBlockedUsers());
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  // New report form state
  const [showReportModal, setShowReportModal] = useState(false);
  const [category, setCategory] = useState<ReportCategory>('SPAM');
  const [targetTitle, setTargetTitle] = useState('');
  const [reason, setReason] = useState('');

  const handleUnblock = (id: string) => {
    studentSafetyDatabase.unblockUser(id);
    setBlockedUsers(studentSafetyDatabase.getBlockedUsers());
  };

  const handleExportData = () => {
    const exp = studentSafetyDatabase.requestDataExport();
    setExportSuccess(exp.downloadUrl || 'Export generated');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetTitle || !reason) return;
    studentSafetyDatabase.submitReport(`target_${Date.now()}`, 'POST', targetTitle, category, reason);
    setReports(studentSafetyDatabase.getReportsForUser());
    setShowReportModal(false);
    setTargetTitle('');
    setReason('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Student Safety & Trust Center"
          description="Manage blocked accounts, review submitted moderation reports, access DPDP/GDPR data export, and community safety controls."
          badge="TRUST & PRIVACY GUARANTEE"
          actions={
            <div className="flex gap-2">
              <button
                onClick={() => setShowReportModal(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-rose-700 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Submit Safety Report
              </button>
              <Link to="/reports">
                <ACEButton variant="outline" size="sm">
                  Moderator Queue
                </ACEButton>
              </Link>
            </div>
          }
        />

        {/* Data Export Banner */}
        <ACECard className="p-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-slate-900/10 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-indigo-500" /> Complete Student Data Portability
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Download your complete verified academic records, certificates, project contributions, and activity logs in JSON format.
            </p>
          </div>
          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition flex-shrink-0"
          >
            Export My Data
          </button>
        </ACECard>

        {exportSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Export ready: <a href={exportSuccess} className="underline">{exportSuccess}</a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Blocked Accounts */}
          <ACECard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserX className="w-4 h-4 text-rose-500" /> Blocked Accounts ({blockedUsers.length})
            </h3>
            <p className="text-xs text-slate-500">
              Blocked accounts cannot message you, view your student passport, or send collaboration invites.
            </p>

            <div className="space-y-2">
              {blockedUsers.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No blocked users.</p>
              ) : (
                blockedUsers.map(b => (
                  <div key={b.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <img src={b.blockedUserAvatar} alt={b.blockedUserName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.blockedUserName}</h4>
                        <p className="text-[10px] text-slate-400 font-mono">Blocked on {new Date(b.blockedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnblock(b.blockedUserId)}
                      className="text-xs text-indigo-500 font-bold hover:underline"
                    >
                      Unblock
                    </button>
                  </div>
                ))
              )}
            </div>
          </ACECard>

          {/* My Submitted Reports */}
          <ACECard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" /> My Reports & Appeals ({reports.length})
            </h3>
            <p className="text-xs text-slate-500">
              Status of issues reported to college moderators and ACE Trust & Safety.
            </p>

            <div className="space-y-3">
              {reports.map(r => (
                <div key={r.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{r.targetTitle}</h4>
                    <ACEBadge variant={r.status === 'ACTIONED' ? 'success' : r.status === 'INVESTIGATING' ? 'warning' : 'neutral'} size="sm">
                      {r.status}
                    </ACEBadge>
                  </div>
                  <p className="text-[11px] text-slate-500">{r.reason}</p>
                  {r.moderatorNotes && (
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                      Moderator: {r.moderatorNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ACECard>
        </div>

        {/* Submit Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <ACECard className="max-w-md w-full p-6 space-y-4 animate-scaleUp">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" /> Submit Moderation Report
              </h3>
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                  >
                    <option value="SPAM">Spam / Excessive Promotion</option>
                    <option value="HARASSMENT">Harassment or Abuse</option>
                    <option value="SCAM">Scam / Phishing Links</option>
                    <option value="FAKE_ACCOUNT">Impersonation / Fake Student</option>
                    <option value="INAPPROPRIATE_CONTENT">Inappropriate Content</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Subject / Target</label>
                  <input
                    type="text"
                    value={targetTitle}
                    onChange={e => setTargetTitle(e.target.value)}
                    placeholder="e.g. Inappropriate comment on CSE Forum"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Detailed Reason</label>
                  <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Provide context for the moderation team..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </ACECard>
          </div>
        )}
      </div>
    </div>
  );
}
