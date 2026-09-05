import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Building2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useManagement } from '../../context/ManagementContext';
import { useToast } from '../../context/ToastContext';
import { PlatformRole } from '../../types/management';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchPersona, activeRole } = useManagement();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('dileepkumarpallapu28@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState<PlatformRole>('STUDENT');

  const handleDemoLogin = (targetRole: PlatformRole, targetPath: string) => {
    switchPersona(targetRole);
    showToast(`Logged in as ${targetRole} ✓`, 'success');
    navigate(targetPath);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchPersona(role);
    showToast(`Successfully authenticated as ${role} ✓`, 'success');
    if (role === 'STUDENT') navigate('/student');
    else if (role === 'ORGANIZER') navigate('/organizer');
    else if (role === 'CAMPUS_AMBASSADOR') navigate('/ambassador');
    else if (role === 'ACE_ADMIN' || role === 'SUPER_ADMIN') navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 pb-24">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          {mode === 'LOGIN' ? 'Welcome to ACE Portal' : 'Create Student / AMB Account'}
        </h1>
        <p className="text-xs text-slate-500">
          Sign in to access your opportunity dashboard, coding arcade, and ambassador tools.
        </p>
      </div>

      {/* 1-Click Instant Persona Login Bar */}
      <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-3xl border border-purple-200 dark:border-purple-800 space-y-3">
        <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider block">
          ⚡ 1-Click Demo Persona Access
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => handleDemoLogin('STUDENT', '/student')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-left"
          >
            🎓 Student
          </button>
          <button
            onClick={() => handleDemoLogin('CAMPUS_AMBASSADOR', '/ambassador')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-left"
          >
            🤝 Ambassador
          </button>
          <button
            onClick={() => handleDemoLogin('ORGANIZER', '/organizer')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-left"
          >
            🏛️ Organization
          </button>
          <button
            onClick={() => handleDemoLogin('ACE_ADMIN', '/admin/ai-risk')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-left"
          >
            🛡️ ACE Admin
          </button>
        </div>
      </div>

      {/* Standard Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              required
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
            >
              <option value="STUDENT">Student</option>
              <option value="CAMPUS_AMBASSADOR">Campus Ambassador (AMB)</option>
              <option value="ORGANIZER">Event Organizer / Organization</option>
              <option value="ACE_ADMIN">ACE Admin</option>
            </select>
          </div>

          <Button variant="primary" size="lg" className="w-full" type="submit">
            {mode === 'LOGIN' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </div>

    </div>
  );
};
