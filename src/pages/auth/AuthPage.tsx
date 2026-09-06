import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, Mail, User, Building2, ShieldCheck, Sparkles, CheckCircle2, 
  Phone, GraduationCap, MapPin, ArrowRight, UserPlus, Gift, Star
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useManagement } from '../../context/ManagementContext';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { PlatformRole } from '../../types/management';
import confetti from 'canvas-confetti';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
];

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchPersona } = useManagement();
  const { updateUserProfile } = useApp();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('REGISTER');
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('dileepkumarpallapu28@gmail.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  
  // Registration Form State
  const [regName, setRegName] = useState('Dileep Kumar Pallapu');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('+91 98765 43210');
  const [regPassword, setRegPassword] = useState('');
  const [regCollege, setRegCollege] = useState('PSG College of Technology');
  const [regDepartment, setRegDepartment] = useState('Computer Science & Engineering');
  const [regYear, setRegYear] = useState('3rd Year');
  const [regRole, setRegRole] = useState<PlatformRole>('STUDENT');
  const [regAvatar, setRegAvatar] = useState(AVATAR_PRESETS[0]);
  const [regInterests, setRegInterests] = useState<string[]>(['Hackathons', 'Coding Arcade', 'AI & Machine Learning']);

  const handleDemoLogin = (targetRole: PlatformRole, targetPath: string) => {
    switchPersona(targetRole);
    showToast('Logged in as ' + targetRole + ' ✓', 'success');
    navigate(targetPath);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchPersona('STUDENT');
    showToast('Welcome back, Dileep! ✓', 'success');
    navigate('/student');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Initialize profile
    updateUserProfile({
      name: regName,
      email: regEmail || 'student@allcollegeevent.com',
      phone: regPhone,
      college: regCollege,
      department: regDepartment,
      year: regYear,
      avatarUrl: regAvatar,
      interests: regInterests,
      role: regRole === 'CAMPUS_AMBASSADOR' ? 'AMBASSADOR' : regRole === 'ORGANIZER' ? 'ORGANIZER' : 'USER',
      pointsEarned: 500, // Welcome Gift!
      profileCompletionPercentage: 90
    });

    switchPersona(regRole);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showToast('Welcome to ACE, ' + regName + '! +500 Welcome Coins added to your wallet 🪙', 'success');

    if (regRole === 'CAMPUS_AMBASSADOR') navigate('/ambassador');
    else if (regRole === 'ORGANIZER') navigate('/organizer');
    else navigate('/student');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6 pb-24 font-sans">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {mode === 'REGISTER' ? 'Create Your ACE Account' : 'Welcome Back to ACE Portal'}
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {mode === 'REGISTER'
            ? 'Join over 45,000+ collegiate students, ambassadors, and event organizers across India.'
            : 'Sign in to access your opportunity dashboard, coding arcade, and ambassador tools.'}
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setMode('REGISTER')}
            className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
              mode === 'REGISTER'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ✨ Register (New Account)
          </button>
          <button
            onClick={() => setMode('LOGIN')}
            className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
              mode === 'LOGIN'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            🔑 Sign In
          </button>
        </div>
      </div>

      {/* 1-Click Instant Persona Login Bar */}
      <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-3xl border border-purple-200 dark:border-purple-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider font-mono">
            ⚡ 1-Click Instant Demo Access
          </span>
          <span className="text-[10px] text-brand-600 font-mono">No Password Needed</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            onClick={() => handleDemoLogin('STUDENT', '/student')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center"
          >
            🎓 Student
          </button>
          <button
            onClick={() => handleDemoLogin('CAMPUS_AMBASSADOR', '/ambassador')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center"
          >
            🤝 Ambassador
          </button>
          <button
            onClick={() => handleDemoLogin('ORGANIZER', '/organizer')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center"
          >
            🏛️ Organizer
          </button>
          <button
            onClick={() => handleDemoLogin('ACE_ADMIN', '/admin/ai-risk')}
            className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 font-bold text-center"
          >
            🛡️ Admin
          </button>
        </div>
      </div>

      {/* REGISTRATION FORM */}
      {mode === 'REGISTER' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xs">
          
          {/* Welcome Coin Incentive */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200 font-medium">
            <Gift className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Register now and receive <strong>🪙 500 Bonus ACE Coins</strong> in your student wallet!</span>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            
            {/* Account Role */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 font-mono uppercase text-[10px]">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'STUDENT', label: '🎓 Student' },
                  { id: 'CAMPUS_AMBASSADOR', label: '🤝 Ambassador' },
                  { id: 'ORGANIZER', label: '🏛️ Organizer' }
                ].map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegRole(r.id as any)}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                      regRole === r.id
                        ? 'border-brand-600 bg-brand-50 dark:bg-purple-950 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 font-mono uppercase text-[10px]">
                Choose Profile Avatar
              </label>
              <div className="flex items-center gap-3">
                {AVATAR_PRESETS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRegAvatar(avatar)}
                    className={`rounded-2xl overflow-hidden ring-2 transition-all ${
                      regAvatar === avatar ? 'ring-brand-600 scale-105 shadow-md' : 'ring-transparent hover:ring-slate-300'
                    }`}
                  >
                    <img src={avatar} alt="avatar" className="w-12 h-12 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Dileep Kumar"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="dileep@college.edu"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">College / University Name</label>
                <input
                  type="text"
                  value={regCollege}
                  onChange={(e) => setRegCollege(e.target.value)}
                  placeholder="e.g. PSG College of Technology, Anna University, IIT..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Degree & Branch</label>
                <input
                  type="text"
                  value={regDepartment}
                  onChange={(e) => setRegDepartment(e.target.value)}
                  placeholder="B.Tech Computer Science"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Year of Study</label>
                <select
                  value={regYear}
                  onChange={(e) => setRegYear(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            <Button variant="primary" size="lg" type="submit" className="w-full mt-2 font-bold" icon={<UserPlus className="w-4 h-4" />}>
              Complete Registration & Claim 500 Coins
            </Button>
          </form>

        </div>
      )}

      {/* LOGIN FORM */}
      {mode === 'LOGIN' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
                required
              />
            </div>

            <Button variant="primary" size="lg" type="submit" className="w-full font-bold" icon={<ArrowRight className="w-4 h-4" />}>
              Sign In to Account
            </Button>
          </form>
        </div>
      )}

    </div>
  );
};
