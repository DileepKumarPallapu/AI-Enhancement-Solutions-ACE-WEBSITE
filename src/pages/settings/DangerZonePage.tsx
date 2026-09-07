import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Trash2, ShieldAlert } from 'lucide-react';
import { accountDb } from '../../services/db/accountDatabase';

export const DangerZonePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAccount = () => {
    if (confirmText !== currentUser?.username) return;
    if (currentUser) {
      accountDb.deleteAccount(currentUser.id);
      logout();
      navigate('/');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Account Danger Zone
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Irreversible actions related to your account profile, certifications, and data deletion.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Delete ACE Account</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Once you delete your account, all your event registrations, hackathon submissions, verified certificates, and ACE reputation points will be permanently erased.
            </p>
          </div>
        </div>

        {!showConfirm ? (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md transition"
          >
            I understand, delete my account
          </button>
        ) : (
          <div className="pt-4 border-t border-rose-200 dark:border-rose-900/40 space-y-3">
            <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
              Type your username <strong>{currentUser?.username}</strong> to confirm deletion:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
                placeholder={currentUser?.username}
              />
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={confirmText !== currentUser?.username}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-semibold text-xs transition"
              >
                Permanently Delete
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
