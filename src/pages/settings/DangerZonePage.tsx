import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Trash2, PowerOff, ShieldAlert } from 'lucide-react';

export const DangerZonePage: React.FC = () => {
  const { currentUser, deactivateAccount, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [confirmUsername, setConfirmUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeactivate = async () => {
    if (window.confirm('Are you sure you want to deactivate your account? You can reactivate anytime by logging in.')) {
      setLoading(true);
      await deactivateAccount();
      navigate('/login');
    }
  };

  const handleDelete = async () => {
    if (confirmUsername.toLowerCase() !== currentUser?.username.toLowerCase()) {
      alert('Username confirmation does not match.');
      return;
    }
    setLoading(true);
    await deleteAccount();
    navigate('/login');
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-rose-900/40">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Danger Zone
        </h2>
        <p className="text-xs text-slate-400">Irreversible account operations and data removal.</p>
      </div>

      {/* Deactivate Account */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PowerOff className="w-4 h-4 text-amber-400" />
            Deactivate ACE Account
          </h3>
          <p className="text-xs text-slate-400 max-w-md mt-1">
            Temporarily disable your profile, hidden from search and campus event listings.
          </p>
        </div>
        <button
          onClick={handleDeactivate}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition flex-shrink-0"
        >
          Deactivate Account
        </button>
      </div>

      {/* Delete Account */}
      <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Permanently Delete Account
          </h3>
          <p className="text-xs text-slate-400 max-w-md mt-1">
            Permanently erase all profile credentials, registered event history, certificates, and photo galleries. This action cannot be undone.
          </p>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition flex-shrink-0 shadow-lg shadow-rose-600/30"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Confirm Account Deletion</h3>
              <p className="text-xs text-slate-400">
                Type your username <span className="text-white font-mono font-bold">@{currentUser?.username}</span> below to confirm.
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder={currentUser?.username}
                value={confirmUsername}
                onChange={(e) => setConfirmUsername(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading || confirmUsername.toLowerCase() !== currentUser?.username.toLowerCase()}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition disabled:opacity-50"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
