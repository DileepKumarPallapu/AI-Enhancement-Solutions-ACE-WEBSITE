import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, Trash2, PowerOff, ShieldCheck, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';

export const DangerZonePage: React.FC = () => {
  const { currentUser, deactivateAccount, deleteAccount, logout } = useAuth();
  const { showToast } = useToast();

  const [confirmDeactivate, setConfirmDeactivate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const handleDeactivate = async () => {
    await deactivateAccount();
    showToast('Account deactivated successfully. You can reactivate anytime.');
    logout();
  };

  const handleDelete = async () => {
    if (deleteConfirmationText.trim().toLowerCase() !== 'delete my account') {
      showToast('Please type the exact confirmation phrase');
      return;
    }
    await deleteAccount();
    showToast('Account marked for deletion. Immutable audit logs retained.');
    logout();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      <div>
        <h2 className="text-xl font-bold text-rose-600">Account Lifecycle & Deactivation</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Temporarily pause your campus profile or request permanent soft-deletion with data preservation safeguards.
        </p>
      </div>

      {/* Deactivate Account */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <PowerOff className="w-4 h-4 text-amber-600" /> Deactivate Account
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              Hides your public profile, event registrations, and campus discussions. You can reactivate your account anytime by logging in with your registered credentials.
            </p>
          </div>
        </div>

        {!confirmDeactivate ? (
          <Button variant="outline" size="sm" onClick={() => setConfirmDeactivate(true)}>
            Deactivate My Account
          </Button>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
            <p className="text-xs text-amber-800 dark:text-amber-200 font-semibold">
              Are you sure you want to deactivate your profile?
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDeactivate}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm"
              >
                Confirm Deactivation
              </button>
              <button
                type="button"
                onClick={() => setConfirmDeactivate(false)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Account */}
      <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-4">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" /> Permanent Account Deletion
          </h4>
          <p className="text-xs text-rose-600/80 dark:text-rose-400/80 leading-relaxed max-w-xl">
            Schedules permanent deletion of all personal credentials. In compliance with security and legal requirements, immutable financial records and security audit logs are retained under pseudonymous IDs.
          </p>
        </div>

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
          >
            Request Permanent Deletion
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 space-y-3">
            <p className="text-xs text-rose-700 dark:text-rose-300 font-semibold">
              Type <strong className="font-mono text-rose-900 dark:text-white">DELETE MY ACCOUNT</strong> to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder="DELETE MY ACCOUNT"
              className="w-full p-2.5 rounded-xl border border-rose-300 dark:border-rose-800 dark:bg-slate-800 dark:text-white text-xs outline-none focus:border-rose-600 font-mono"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
              >
                Permanently Delete Account
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700"
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
