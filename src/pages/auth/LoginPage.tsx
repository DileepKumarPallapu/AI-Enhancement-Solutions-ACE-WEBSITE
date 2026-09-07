import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { AccountRole } from '../../types/account';
import {
  Key, Mail, Lock, ArrowRight, Sparkles, CheckCircle2,
  Shield, User, School, AlertCircle, RefreshCw
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectUrl = (location.state as any)?.from || '/profile';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success && res.user) {
        showToast(`Welcome back, ${res.user.displayName}! ✓`, 'success');
        if (res.user.role === 'COLLEGE_AMBASSADOR') navigate('/ambassador');
        else if (res.user.role === 'ORGANIZER') navigate('/organizer');
        else if (res.user.role === 'ADMIN') navigate('/admin');
        else if (res.user.role === 'COLLEGE') navigate('/college');
        else if (res.user.role === 'MENTOR') navigate('/mentor/dashboard');
        else navigate(redirectUrl);
      } else {
        setError(res.error || 'Authentication failed. Please check credentials.');
        showToast(res.error || 'Invalid credentials', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (userHandle: string, pass: string, targetPath: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await login(userHandle, pass);
      if (res.success && res.user) {
        showToast(`Signed in as ${res.user.displayName} ✓`, 'success');
        navigate(targetPath);
      } else {
        setError(res.error || 'Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 pb-24 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-1 shadow-xs border border-indigo-200 dark:border-indigo-800">
          <Key className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Sign In to ACE
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Access your verified portfolio, campus mentorship, coding arcade, and event command center.
        </p>
      </div>

      {/* Quick Verified Account Sign-In Bar */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider font-mono">
            ⚡ Quick Account Sign-In
          </span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">Select Account</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => handleQuickLogin('dileepkumar', 'dileep_pass_123', '/student/dashboard')}
            className="p-2 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 font-bold text-center transition-all text-slate-800 dark:text-slate-200"
          >
            🎓 Dileep (Student)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('priya_ambassador', 'priya_pass_123', '/ambassador/dashboard')}
            className="p-2 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 font-bold text-center transition-all text-slate-800 dark:text-slate-200"
          >
            🤝 Priya (Ambassador)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('dr_arun_mentor', 'arun_pass_123', '/mentor/dashboard')}
            className="p-2 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 font-bold text-center transition-all text-slate-800 dark:text-slate-200"
          >
            💡 Dr. Arun (Mentor)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('techfest_organizer', 'organizer_pass_123', '/organizer/dashboard')}
            className="p-2 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 font-bold text-center transition-all text-slate-800 dark:text-slate-200"
          >
            🏛️ Shaastra (Organizer)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('psg_institution', 'psg_pass_123', '/college/dashboard')}
            className="p-2 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 font-bold text-center transition-all text-slate-800 dark:text-slate-200"
          >
            🏫 PSG Tech (College)
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin('ace_admin', 'admin_pass_123', '/admin/dashboard')}
            className="p-2 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 font-bold text-center transition-all text-slate-800 dark:text-slate-200"
          >
            🛡️ Admin
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-center gap-3 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              Username or Registered Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="dileepkumar or dileep.kumar@psgtech.edu"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          New to AllCollegeEvent?{' '}
          <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
