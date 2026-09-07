import React, { useState } from 'react';
import { ShieldCheck, Smartphone, Laptop, LogOut, CheckCircle2, Lock, Key } from 'lucide-react';
import { sessionSecurityDatabase, ActiveUserSession } from '../../services/db/sessionSecurityDatabase';

export const SecurityCenterPage: React.FC = () => {
  const [sessions, setSessions] = useState<ActiveUserSession[]>(sessionSecurityDatabase.getSessions('usr_student_dileep'));
  const [revokedMsg, setRevokedMsg] = useState(false);

  const refresh = () => setSessions(sessionSecurityDatabase.getSessions('usr_student_dileep'));

  const handleRevoke = (id: string) => {
    sessionSecurityDatabase.revokeSession(id);
    refresh();
  };

  const handleRevokeAllOther = () => {
    sessionSecurityDatabase.revokeAllOtherSessions('usr_student_dileep');
    setRevokedMsg(true);
    refresh();
    setTimeout(() => setRevokedMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Account Security & Sessions
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Security Center & Devices
            </h1>
            <p className="text-xs text-slate-500">
              Manage active login sessions, rotate session credentials, and protect your student profile.
            </p>
          </div>

          {revokedMsg && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 text-xs font-bold animate-fadeIn">
              All other sessions revoked ✓
            </span>
          )}
        </div>

        {/* Security Posture Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" /> Password Authentication
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">Protected ✓</span>
            </div>
            <p className="text-xs text-slate-500">Strong bcrypt hashing with salted authentication tokens.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-600" /> 2FA & Passkeys
              </span>
              <span className="text-[10px] text-indigo-600 font-bold">Enabled</span>
            </div>
            <p className="text-xs text-slate-500">Cryptographic multi-factor verification active for withdrawals and credential changes.</p>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Devices ({sessions.length})</h3>
            {sessions.length > 1 && (
              <button
                onClick={handleRevokeAllOther}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out all other devices
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {s.deviceType === 'MOBILE' ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{s.browser} on {s.operatingSystem}</span>
                      {s.isCurrentSession && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Current Device</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {s.approxLocation} • IP: {s.ipAddress}
                    </div>
                  </div>
                </div>

                {!s.isCurrentSession && (
                  <button
                    onClick={() => handleRevoke(s.id)}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
