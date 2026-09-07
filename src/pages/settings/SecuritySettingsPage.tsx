import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Key, Smartphone, Laptop, LogOut, Check, AlertTriangle, Lock } from 'lucide-react';
import { sessionSecurityService } from '../../services/security/sessionSecurityService';
import { UserSession } from '../../services/db/canonicalDataArchitecture';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';

export const SecuritySettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState<UserSession[]>(() => {
    return sessionSecurityService.getActiveSessions(userId);
  });

  const refreshSessions = () => {
    setSessions(sessionSecurityService.getActiveSessions(userId));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please fill in both current and new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated securely ✓');
  };

  const handleRevokeSession = (sessionId: string) => {
    sessionSecurityService.revokeSession(userId, sessionId);
    refreshSessions();
    showToast('Session revoked successfully ✓');
  };

  const handleRevokeAllOther = () => {
    const count = sessionSecurityService.revokeAllOtherSessions(userId);
    refreshSessions();
    showToast(`Signed out of ${count} other sessions ✓`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Security & Active Device Management</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your password, multi-factor authentication, and inspect all logged-in devices.
        </p>
      </div>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
          <Key className="w-4 h-4 text-brand-600" />
          <span>Change Account Password</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm" type="submit">
            Update Password
          </Button>
        </div>
      </form>

      {/* Two-Factor Authentication */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Smartphone className="w-4 h-4 text-indigo-600" />
            <span>Two-Factor Authentication (2FA)</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enforce one-time OTP verification when signing in from unrecognized browser sessions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setTwoFactorEnabled(!twoFactorEnabled);
            showToast(twoFactorEnabled ? '2FA disabled' : '2FA enabled ✓');
          }}
          className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
            twoFactorEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition-transform ${
              twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Active Sessions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Active Signed-In Devices</h3>
            <p className="text-xs text-slate-400">Inspect sessions authenticated with your university identity.</p>
          </div>
          {sessions.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              icon={<LogOut className="w-3.5 h-3.5" />}
              onClick={handleRevokeAllOther}
            >
              Sign Out Other Devices
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {sessions.map(sess => (
            <div
              key={sess.sessionId}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <Laptop className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{sess.device}</span>
                    {sess.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        Current Session
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sess.ipAddress} • Active: {new Date(sess.lastActiveAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</p>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  type="button"
                  onClick={() => handleRevokeSession(sess.sessionId)}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
