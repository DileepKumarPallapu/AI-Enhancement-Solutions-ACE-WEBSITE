import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, Key, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/db/authService';
import { useToast } from '../../context/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await authService.forgotPassword(email);
    setSubmitted(true);
    if (res.resetToken) {
      setResetToken(res.resetToken);
    }
    showToast(res.message, 'info');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6 pb-24 font-sans">
      
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mb-1 shadow-xs">
          <Key className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Forgot Password</h1>
        <p className="text-xs text-slate-500">
          Enter your registered email address and we will send you secure password reset instructions.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-xs">
        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              If an account is associated with <strong>{email}</strong>, a password reset link has been dispatched.
            </p>
            {resetToken && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 font-mono">
                <p className="font-bold mb-1">Local Testing Direct Link:</p>
                <Link to={`/reset-password?token=${resetToken}`} className="underline break-all">
                  /reset-password?token={resetToken}
                </Link>
              </div>
            )}
            <div className="pt-2">
              <Link to="/login" className="text-xs text-brand-600 font-bold hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                Account Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@college.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-bold shadow-xs">
              Send Reset Link <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        )}
      </div>

    </div>
  );
};
