import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const { currentUser, verifyEmail, sendVerificationOtp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState(searchParams.get('code') || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');

  const targetEmail = currentUser?.email || searchParams.get('email') || 'your registered email';

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code.trim()) {
      setStatus('error');
      setMessage('Please enter your 6-digit verification code.');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const res = await verifyEmail(code.trim());
      if (res.success) {
        setStatus('success');
        setMessage(res.message);
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        setStatus('error');
        setMessage(res.message || 'Invalid or expired verification code.');
      }
    } catch {
      setStatus('error');
      setMessage('An error occurred during verification.');
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendMsg('');
    const res = await sendVerificationOtp('email');
    setResending(false);
    setResendMsg(res.message);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 text-indigo-400">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Verify Your Email</h2>
          <p className="mt-2 text-sm text-slate-400">
            We sent a verification code to <span className="text-indigo-400 font-medium">{targetEmail}</span>
          </p>
        </div>

        <div className="mt-8 bg-slate-900/80 backdrop-blur-xl border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          {currentUser?.emailVerified || status === 'success' ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Email Successfully Verified!</h3>
              <p className="text-sm text-slate-400">
                Your account now has official email badge verification.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all"
              >
                Go to Profile <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Enter 6-Digit Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={8}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full text-center tracking-[0.4em] font-mono text-xl py-3 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                  <div className="absolute right-3 top-3 text-slate-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500 text-center">
                  Check spam folder if you do not see it in your inbox. Test seed code: <code className="text-indigo-400">123456</code>
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Verifying Code...' : 'Confirm Verification'}
              </button>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                  {resending ? 'Resending...' : 'Resend Code'}
                </button>
                <Link to="/settings/security" className="hover:text-slate-200">
                  Account Security
                </Link>
              </div>

              {resendMsg && (
                <p className="text-xs text-center text-emerald-400 animate-fade-in">{resendMsg}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
