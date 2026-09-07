import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  Lock, Mail, User, ShieldCheck, Sparkles, CheckCircle2, 
  ArrowRight, Key, AlertCircle, Eye, EyeOff, Building2, UserCheck
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { AccountRole } from '../../types/account';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, switchPersona } = useAuth();
  const { showToast } = useToast();

  const [identifier, setIdentifier] = useState('dileepkumar');
  const [password, setPassword] = useState('dileep123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectUrl = searchParams.get('redirect') || '/student';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await login(identifier, password);
      if (res.success && res.user) {
        showToast(`Welcome back, ${res.user.displayName}! ✓`, 'success');
        if (res.user.role === 'COLLEGE_AMBASSADOR') navigate('/ambassador');
        else if (res.user.role === 'ORGANIZER') navigate('/organizer');
        else if (res.user.role === 'ADMIN') navigate('/admin');
        else if (res.user.role === 'COLLEGE') navigate('/college');
        else navigate(redirectUrl);
      } else {
        setError(res.error || 'Authentication failed. Please check credentials.');
        showToast(res.error || 'Invalid credentials', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSwitch = (role: AccountRole, targetPath: string) => {
    switchPersona(role);
    showToast(`Switched active session to ${role} ✓`, 'success');
    navigate(targetPath);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 pb-24 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-brand-600 mb-1 shadow-xs">
          <Key className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Sign In to ACE
        </h1>
        <p className="text-xs text-slate-500">
          Access your personalized opportunity dashboard, verified portfolio, and coding arcade.
        </p>
      </div>

      {/* 1-Click Instant Persona Quick Switcher */}
      <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-3xl border border-purple-200 dark:border-purple-800 space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider font-mono">
            ⚡ 1-Click Role Sandbox Access
          </span>
          <span className="text-[10px] text-brand-600 font-mono">Instant Sign In</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          <button
            onClick={() => handleDemoSwitch('STUDENT', '/student')}
            className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center transition-all hover:scale-102"
          >
            🎓 Student
          </button>
          <button
            onClick={() => handleDemoSwitch('COLLEGE_AMBASSADOR', '/ambassador')}
            className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center transition-all hover:scale-102"
          >
            🤝 Ambassador
          </button>
          <button
            onClick={() => handleDemoSwitch('ORGANIZER', '/organizer')}
            className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center transition-all hover:scale-102"
          >
            🏛️ Organizer
          </button>
          <button
            onClick={() => handleDemoSwitch('MENTOR', '/profile')}
            className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center transition-all hover:scale-102"
          >
            💡 Mentor
          </button>
          <button
            onClick={() => handleDemoSwitch('COLLEGE', '/college')}
            className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center transition-all hover:scale-102"
          >
            🏫 College
          </button>
          <button
            onClick={() => handleDemoSwitch('ADMIN', '/admin/ai-risk')}
            className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center transition-all hover:scale-102"
          >
            🛡️ Admin
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-xs">
        
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Email Address or Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="dileepkumar or student@college.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium outline-none focus:border-brand-500 transition-colors"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-brand-600 hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium outline-none focus:border-brand-500 transition-colors"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span className="text-slate-600 dark:text-slate-400 font-medium">Remember this device</span>
            </label>
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-full font-bold shadow-md"
            disabled={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {loading ? 'Authenticating...' : 'Sign In to Account'}
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          <span>Don't have an ACE account yet? </span>
          <Link to="/register" className="text-brand-600 font-bold hover:underline">
            Register New Account
          </Link>
        </div>

      </div>

    </div>
  );
};
