import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Trophy, 
  Gift, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  UserCheck, 
  Bookmark, 
  CheckCircle2, 
  Layers, 
  Moon, 
  Sun,
  ShieldCheck,
  PlusCircle,
  Grid,
  Coins,
  Clock,
  ListFilter,
  MoreHorizontal,
  User,
  Settings,
  Image as ImageIcon,
  LogOut,
  LogIn,
  Edit3,
  UserPlus,
  RefreshCw,
  Award,
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { BRAND } from '../../config/brand';
import { CommandPalette } from '../common/CommandPalette';
import { AccountRole } from '../../types/account';

export const Navbar: React.FC<{ onOpenAiChat: () => void }> = ({ onOpenAiChat }) => {
  const { unreadNotificationCount, notifications, theme, toggleTheme } = useApp();
  const { currentUser, activeRole, availableWorkspaces, switchWorkspace, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showWorkspaceSwitcher, setShowWorkspaceSwitcher] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAll = () => {
    setShowNotifications(false);
    setShowProfileMenu(false);
    setShowMoreMenu(false);
    setShowWorkspaceSwitcher(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAll();
    navigate('/login');
  };

  const navItemClass = (path: string) => `
    flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all whitespace-nowrap
    ${location.pathname === path 
      ? 'text-brand-600 bg-brand-50/80 dark:bg-purple-950/50 font-bold' 
      : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800'}
  `;

  // Find active workspace object
  const currentWorkspace = availableWorkspaces.find(w => w.role === activeRole) || availableWorkspaces[0];

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            
            {/* Left: Brand Logo & Desktop Nav Links */}
            <div className="flex items-center gap-3 lg:gap-6">
              <Link to="/" onClick={closeAll} className="flex items-center gap-2 group flex-shrink-0">
                <img 
                  src={BRAND.logo} 
                  alt="AllCollegeEvent Logo" 
                  className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                <Link to="/events" className={navItemClass('/events')}>
                  Discover
                </Link>
                <Link to="/campus" className={navItemClass('/campus')}>
                  🏫 Campus
                </Link>
                <Link to="/hackathons" className={navItemClass('/hackathons')}>
                  Hackathons
                </Link>
                <Link to="/competitions" className={navItemClass('/competitions')}>
                  Competitions
                </Link>
                <Link to="/coding" className={navItemClass('/coding')}>
                  Coding
                </Link>
                <Link to="/student/mentorship" className={navItemClass('/student/mentorship')}>
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> Mentorship
                </Link>
                <Link to="/learn-play" className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-bold rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> Learn & Play
                </Link>

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showMoreMenu && (
                    <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-scaleUp max-h-96 overflow-y-auto">
                      <Link to="/ai" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-950/30 hover:bg-purple-100 rounded-xl">
                        <span>✨ AI Student Success Engine (100X)</span>
                      </Link>
                      <Link to="/ai/study-coach" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>📖 AI Study Coach</span>
                      </Link>
                      <Link to="/ai/project-mentor" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🎯 AI Project Mentor</span>
                      </Link>
                      <Link to="/interview/ai-coach" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>💼 AI Interview Simulator</span>
                      </Link>
                      <Link to="/opportunities" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🌐 Global Opportunity Exchange (110X)</span>
                      </Link>
                      <Link to="/opportunities/deadlines" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>⏰ Global Deadlines Tracker</span>
                      </Link>
                      <Link to="/opportunities/compare" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>⚖️ Opportunity Comparison Hub</span>
                      </Link>
                      <Link to="/scholarships" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🎓 Scholarships & Grants</span>
                      </Link>
                      <Link to="/research" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🔬 Research & Innovation Labs</span>
                      </Link>
                      <Link to="/partners/marketplace" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🤝 Global Partner Marketplace</span>
                      </Link>
                      <Link to="/billing" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🧾 Billing & Invoices</span>
                      </Link>
                      <Link to="/subscriptions" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>✨ Subscriptions Ecosystem</span>
                      </Link>
                      <Link to="/ai/global-opportunities" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-yellow-600 dark:text-yellow-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🤖 Ask ACE Global Assistant</span>
                      </Link>
                      <Link to="/campus" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🏫 Campus Feed & Announcements</span>
                      </Link>
                      <Link to="/connections" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>👥 Student Network & Connections</span>
                      </Link>
                      <Link to="/messages" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>💬 Direct & Channel Messaging 2.0</span>
                      </Link>
                      <Link to="/deadlines" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>⏰ Unified Campus Deadlines</span>
                      </Link>
                      <Link to="/safety" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🛡️ Student Safety & Trust Center</span>
                      </Link>
                      <Link to="/student" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🚀 Student Home</span>
                      </Link>
                      <Link to="/student/ai" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🤖 Personal AI Command Center</span>
                      </Link>
                      <Link to="/student/goals" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🎯 AI Goals & Action Plans</span>
                      </Link>
                      <Link to="/student/today" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>⚡ Today's Actions & Priorities</span>
                      </Link>
                      <Link to="/feed" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>📰 Opportunity Feed</span>
                      </Link>
                      <Link to="/following" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>👥 Following Network</span>
                      </Link>
                      <Link to="/career" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🧭 Career Launchpad</span>
                      </Link>
                      <Link to="/interviews" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>📅 Interview Schedule</span>
                      </Link>
                      <Link to="/student/passport" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🛡️ Digital Student Passport (80X)</span>
                      </Link>
                      <Link to="/student/credentials" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🪪 Credential Wallet</span>
                      </Link>
                      <Link to="/student/resume" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>📄 ATS Resume Builder</span>
                      </Link>
                      <Link to="/student/portfolio" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🌐 Portfolio Studio</span>
                      </Link>
                      <Link to="/student/privacy" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🔒 Student Privacy Center</span>
                      </Link>
                      <Link to="/recruiter" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>💼 Recruiter Hub & Talent Radar</span>
                      </Link>
                      <Link to="/career/interview" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🤖 AI Interview Lab</span>
                      </Link>
                      <Link to="/project-lab" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🔬 Project Lab & Incubator</span>
                      </Link>
                      <Link to="/judge" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>⚖️ Judge Evaluation Portal</span>
                      </Link>
                      <Link to="/trust" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🛡️ Verified Trust Center</span>
                      </Link>
                      <Link to="/reports" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🚨 Trust, Safety & Reports</span>
                      </Link>
                      <Link to="/colleges" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🏫 Colleges Directory</span>
                      </Link>
                      <Link to="/community" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>💬 Community Feed</span>
                      </Link>
                      <Link to="/rewards" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🎁 Rewards & Vouchers</span>
                      </Link>
                      <Link to="/certificates" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>📜 Verify Certificate</span>
                      </Link>
                      <Link to="/explore" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-brand-600 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl border-t border-slate-100 dark:border-slate-800 mt-1">
                        <span>🧭 All 50+ Modules</span>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right: Actions, Search, Workspace Switcher & User Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Authenticated Workspace Switcher (Strictly for Current User's Enrolled Workspaces) */}
              {currentUser && (
                <div className="relative hidden md:block">
                  {availableWorkspaces.length > 1 ? (
                    <button
                      onClick={() => setShowWorkspaceSwitcher(!showWorkspaceSwitcher)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 transition shadow-2xs"
                      title="Switch Workspace Role"
                    >
                      <span>{currentWorkspace?.icon || '🎓'}</span>
                      <span className="truncate max-w-[130px] font-semibold">{currentWorkspace?.label || 'Workspace'}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${showWorkspaceSwitcher ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={currentWorkspace?.path || '/student/dashboard'}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      title="Active Workspace"
                    >
                      <span>{currentWorkspace?.icon || '🎓'}</span>
                      <span className="truncate max-w-[130px] font-semibold">{currentWorkspace?.label || 'Student'}</span>
                    </Link>
                  )}

                  {/* Dropdown for multi-role enrolled users */}
                  {showWorkspaceSwitcher && availableWorkspaces.length > 1 && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-scaleUp">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          My Active Workspaces
                        </div>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate mt-0.5">
                          {currentUser.fullName} (@{currentUser.username})
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {availableWorkspaces.map((ws) => (
                          <button
                            key={ws.role}
                            onClick={() => {
                              switchWorkspace(ws.role);
                              setShowWorkspaceSwitcher(false);
                              navigate(ws.path);
                            }}
                            className={`w-full text-left p-2.5 rounded-2xl text-xs transition flex items-center justify-between gap-3 ${
                              activeRole === ws.role
                                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <span className="text-lg">{ws.icon}</span>
                              <div className="overflow-hidden">
                                <div className="font-bold truncate">{ws.label}</div>
                                <div className={`text-[11px] truncate ${activeRole === ws.role ? 'text-indigo-100' : 'text-slate-400'}`}>
                                  {ws.desc}
                                </div>
                              </div>
                            </div>
                            {activeRole === ws.role && <Check className="w-4 h-4 flex-shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Search Trigger */}
              <button
                onClick={() => setIsCommandOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Search (Ctrl + K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">Ctrl K</kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>

              {/* AI Assistant Quick Pill */}
              <button
                onClick={onOpenAiChat}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all hover:scale-102"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask ACE</span>
              </button>

              {/* User Profile Pill */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2 py-1 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all shadow-2xs group"
                    aria-label="User Profile Menu"
                  >
                    <div className="relative">
                      <img 
                        src={currentUser.avatarUrl} 
                        alt={currentUser.fullName} 
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition-all" 
                      />
                      {currentUser.isVerified && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-indigo-500 border border-white dark:border-slate-900 rounded-full" />
                      )}
                    </div>
                    
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-tight flex items-center gap-0.5">
                        {currentUser.fullName.split(' ')[0]}
                        {currentUser.isVerified && <CheckCircle2 className="w-2.5 h-2.5 text-indigo-500" />}
                      </span>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono leading-none">
                        @{currentUser.username}
                      </span>
                    </div>

                    <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-brand-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 z-50 animate-scaleUp">
                      
                      {/* User Summary Card */}
                      <div className="p-3 bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-slate-50 dark:from-slate-800 dark:to-slate-800/60 rounded-2xl mb-2.5 flex items-center gap-3 border border-indigo-100/80 dark:border-slate-700">
                        <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30 shadow-xs" />
                        <div className="overflow-hidden flex-1">
                          <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{currentUser.fullName}</p>
                          <p className="text-[10px] text-indigo-500 font-mono truncate">@{currentUser.username}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{currentUser.college}</p>
                        </div>
                      </div>

                      {/* Mentorship & Workspace Quick Links */}
                      <div className="space-y-1 text-xs">
                        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                          My Workspaces & Tools
                        </div>

                        {/* Phase 3 Command Center & Opportunity Radar */}
                        <Link to="/student/os" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/60 rounded-xl font-extrabold transition-colors border border-emerald-500/20">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          <span>Student Command Center</span>
                        </Link>

                        <Link to="/student/opportunities" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Compass className="w-4 h-4 text-emerald-400" />
                          <span>Opportunity Intelligence</span>
                        </Link>

                        <Link to="/saved" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Bookmark className="w-4 h-4 text-amber-400" />
                          <span>Saved Bookmarks</span>
                        </Link>

                        {/* Phase 2 Quick Tools */}
                        <Link to="/student/passport" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl font-bold transition-colors">
                          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>Digital Student Passport (80X)</span>
                        </Link>

                        <Link to="/student/credentials" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Award className="w-4 h-4 text-emerald-500" />
                          <span>Verified Credential Wallet</span>
                        </Link>

                        <Link to="/student/privacy" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <ShieldCheck className="w-4 h-4 text-purple-500" />
                          <span>Student Privacy Center</span>
                        </Link>

                        <Link to="/student/ace-id" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl font-bold transition-colors">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Digital Student ID & Pass</span>
                        </Link>

                        <Link to="/calendar" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>Smart ACE Calendar & Deadlines</span>
                        </Link>

                        <Link to="/career" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Briefcase className="w-4 h-4 text-amber-500" />
                          <span>Career Hub & Resume</span>
                        </Link>

                        <Link to="/teams" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Users className="w-4 h-4 text-purple-500" />
                          <span>Hackathon Teams & Workspace</span>
                        </Link>

                        <Link to="/clubs" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Building2 className="w-4 h-4 text-cyan-500" />
                          <span>Campus Tech Clubs</span>
                        </Link>

                        <Link to="/student/mentor" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl font-bold transition-colors">
                          <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span>Campus Mentorship Hub</span>
                        </Link>

                        <Link to="/student/mentors" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Search className="w-4 h-4 text-purple-500" />
                          <span>Browse Faculty Mentors</span>
                        </Link>

                        {/* Account & Profile */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
                          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            Account & Profile
                          </div>

                          <Link to={`/profile/@${currentUser.username}`} onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                            <User className="w-4 h-4 text-indigo-500" />
                            <span>View Public Profile</span>
                          </Link>

                          <Link to="/profile/edit" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                            <Edit3 className="w-4 h-4 text-emerald-500" />
                            <span>Edit Profile Studio</span>
                          </Link>

                          <Link to="/settings/profile" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                            <Settings className="w-4 h-4 text-purple-500" />
                            <span>Settings & Preferences</span>
                          </Link>
                        </div>

                        {/* Opportunities / Apply for New Roles */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
                          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            Role Opportunities
                          </div>

                          {!currentUser.roles?.includes('COLLEGE_AMBASSADOR') && (
                            <Link to="/ambassador" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 text-xs">
                              <Award className="w-3.5 h-3.5 text-amber-500" /> Apply as Campus Ambassador
                            </Link>
                          )}
                          {!currentUser.roles?.includes('MENTOR') && (
                            <Link to="/become-mentor" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 text-xs">
                              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> Apply as Faculty Mentor
                            </Link>
                          )}
                        </div>

                        {(currentUser.role === 'ADMIN' || currentUser.roles?.includes('ADMIN')) && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
                            <div className="px-3 py-1 text-[10px] font-bold text-amber-500 uppercase tracking-wider font-mono">
                              Admin Control
                            </div>
                            <Link to="/admin/institutions" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl text-xs font-semibold">
                              <Building2 className="w-3.5 h-3.5" /> Institution Directory Admin
                            </Link>
                          </div>
                        )}

                        {/* Logout */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl font-semibold transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out of Account</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open Mobile Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
            {currentUser && availableWorkspaces.length > 1 && (
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-1.5">
                  My Active Workspace
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableWorkspaces.map(ws => (
                    <button
                      key={ws.role}
                      onClick={() => {
                        switchWorkspace(ws.role);
                        closeAll();
                        navigate(ws.path);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                        activeRole === ws.role
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{ws.icon}</span>
                      <span>{ws.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link to="/events" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200">
                Discover Events
              </Link>
              <Link to="/hackathons" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200">
                Hackathons
              </Link>
              <Link to="/competitions" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200">
                Competitions
              </Link>
              <Link to="/coding" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200">
                Coding Practice
              </Link>
              <Link to="/mentors" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Campus Mentors
              </Link>
              <Link to="/learn-play" onClick={closeAll} className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-xs font-semibold text-purple-600">
                Learn & Play
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
