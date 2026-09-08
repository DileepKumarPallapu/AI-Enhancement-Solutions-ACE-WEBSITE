import React, { useState, useEffect, useRef } from 'react';
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
  Check,
  MessageSquare,
  HelpCircle,
  Activity,
  Code2,
  FileText,
  Calendar,
  Zap,
  Globe,
  DollarSign,
  ChevronRight,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { BRAND } from '../../config/brand';
import { CommandPalette } from '../common/CommandPalette';
import { demoModeDatabase } from '../../services/db/demoModeDatabase';
import { AccountRole } from '../../types/account';

export const Navbar: React.FC<{ onOpenAiChat: () => void }> = ({ onOpenAiChat }) => {
  const { unreadNotificationCount, notifications, theme, toggleTheme } = useApp();
  const { currentUser, activeRole, availableWorkspaces, switchWorkspace, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showWorkspaceSwitcher, setShowWorkspaceSwitcher] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const workspaceSwitcherRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setShowMoreMenu(false);
      }
      if (workspaceSwitcherRef.current && !workspaceSwitcherRef.current.contains(target)) {
        setShowWorkspaceSwitcher(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAll = () => {
    setShowProfileMenu(false);
    setShowMoreMenu(false);
    setShowWorkspaceSwitcher(false);
    setMobileMenuOpen(false);
    setMobileProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAll();
    navigate('/login');
  };

  const navItemClass = (path: string) => `
    flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap
    ${location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
      ? 'text-purple-600 dark:text-purple-400 bg-purple-50/90 dark:bg-purple-950/60 font-bold shadow-2xs' 
      : 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'}
  `;

  // 13 canonical workspaces list
  const all13Workspaces = [
    { role: 'STUDENT' as AccountRole, label: 'Student', path: '/student/dashboard', icon: '🎓', desc: 'Opportunity & Career OS' },
    { role: 'COLLEGE_AMBASSADOR' as AccountRole, label: 'Campus Ambassador', path: '/ambassador/dashboard', icon: '📣', desc: 'Outreach & Event Approvals' },
    { role: 'MENTOR' as AccountRole, label: 'Faculty Mentor', path: '/mentor/dashboard', icon: '👨‍🏫', desc: 'Sprint Reviews & Guidance' },
    { role: 'MENTOR' as AccountRole, label: 'Mentor', path: '/mentor/dashboard', icon: '🧭', desc: 'Industry Mentorship' },
    { role: 'ORGANIZER' as AccountRole, label: 'Organizer', path: '/organizer/dashboard', icon: '🎫', desc: 'Event Command & Check-in' },
    { role: 'COLLEGE' as AccountRole, label: 'College Directorate', path: '/college/dashboard', icon: '🏫', desc: 'Department Governance' },
    { role: 'RECRUITER' as AccountRole, label: 'Recruiter Hub', path: '/recruiter/dashboard', icon: '💼', desc: 'Verified Talent Radar' },
    { role: 'JUDGE' as AccountRole, label: 'Judge Arena', path: '/judge/dashboard', icon: '⚖️', desc: 'Evaluation & Rubrics' },
    { role: 'STUDENT' as AccountRole, label: 'Placement Cell', path: '/placement', icon: '📊', desc: 'Hiring Drives & Stats' },
    { role: 'STUDENT' as AccountRole, label: 'Club / Chapter', path: '/college/clubs', icon: '👥', desc: 'Student Chapters' },
    { role: 'STUDENT' as AccountRole, label: 'Training Provider', path: '/provider', icon: '📚', desc: 'Courses & Cohorts' },
    { role: 'STUDENT' as AccountRole, label: 'Partner Network', path: '/partners', icon: '🤝', desc: 'Sponsorships & Grants' },
    { role: 'ADMIN' as AccountRole, label: 'Platform Superadmin', path: '/admin/dashboard', icon: '🛡️', desc: 'Security & Operations' }
  ];

  const currentWorkspaceItem = all13Workspaces.find(w => w.role === activeRole) || all13Workspaces[0];
  const isDemo = demoModeDatabase.isDemoMode();

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs border-slate-200/90 dark:border-slate-800' 
          : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16 gap-2">
            
            {/* LEFT GROUP: Brand Logo + Main Navigation */}
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <Link to="/" onClick={closeAll} className="flex items-center gap-2 group mr-2 lg:mr-3">
                <img 
                  src={BRAND.logo} 
                  alt="AllCollegeEvent Logo" 
                  className="h-8 sm:h-9.5 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link to="/events" className={navItemClass('/events')}>
                  Discover
                </Link>
                <Link to="/workspaces" className={navItemClass('/workspaces')}>
                  💼 Workspaces
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
                  Mentorship
                </Link>
                <Link to="/learn-play" className="flex items-center gap-1 px-2 py-1.5 text-xs font-bold rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> Learn & Play
                </Link>

                {/* More Dropdown Menu */}
                <div className="relative" ref={moreMenuRef}>
                  <button
                    onClick={() => {
                      setShowMoreMenu(!showMoreMenu);
                      setShowProfileMenu(false);
                      setShowWorkspaceSwitcher(false);
                    }}
                    className={`flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      showMoreMenu
                        ? 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showMoreMenu && (
                    <div className="absolute left-0 top-full mt-2 w-[520px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-scaleUp grid grid-cols-2 gap-4 max-h-[82vh] overflow-y-auto">
                      
                      {/* Section 1: OPPORTUNITIES */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 px-2 py-1 font-mono">
                          OPPORTUNITIES
                        </div>
                        <Link to="/events" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🎪 Events Directory</span>
                        </Link>
                        <Link to="/opportunities" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🌐 Global Opportunity Exchange</span>
                        </Link>
                        <Link to="/scholarships" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🎓 Scholarships & Grants</span>
                        </Link>
                        <Link to="/hackathons" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>⚡ Hackathons Arena</span>
                        </Link>
                        <Link to="/competitions" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🏆 Contests & Competitions</span>
                        </Link>
                      </div>

                      {/* Section 2: LEARNING */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-2 py-1 font-mono">
                          LEARNING
                        </div>
                        <Link to="/learn" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>📚 Courses & Roadmaps</span>
                        </Link>
                        <Link to="/skills" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🧠 Interactive Skill Graph</span>
                        </Link>
                        <Link to="/coding" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>💻 Code Practice & Arena</span>
                        </Link>
                        <Link to="/projects/lab" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🧪 Student Project Lab</span>
                        </Link>
                        <Link to="/certificates" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>📜 Verified Certificates</span>
                        </Link>
                      </div>

                      {/* Section 3: CAREER */}
                      <div className="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                        <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 py-1 font-mono">
                          CAREER & APPLICATIONS
                        </div>
                        <Link to="/career" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🎯 Universal Career OS</span>
                        </Link>
                        <Link to="/applications" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>💼 Unified Application OS</span>
                        </Link>
                        <Link to="/career/interview" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🤖 AI Interview Lab</span>
                        </Link>
                        <Link to="/student/resume" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>📄 ATS Resume Builder</span>
                        </Link>
                        <Link to="/student/passport" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🛡️ Digital Student Passport</span>
                        </Link>
                      </div>

                      {/* Section 4: COMMUNITY, PRODUCTIVITY & AI */}
                      <div className="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                        <div className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 px-2 py-1 font-mono">
                          COMMUNITY & WORKFLOWS
                        </div>
                        <Link to="/campus" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>🏫 Campus Network</span>
                        </Link>
                        <Link to="/messages" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>💬 Messages & Channels</span>
                        </Link>
                        <Link to="/tasks" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>✅ Tasks & Deadlines</span>
                        </Link>
                        <Link to="/workflows" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>⚡ Autonomous Workflows</span>
                        </Link>
                        <Link to="/ai" onClick={closeAll} className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <span>✨ AI Student Success Center</span>
                        </Link>
                      </div>

                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* RIGHT CONTROLS: margin-left: auto */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              
              {/* Workspace Switcher Button */}
              <div className="relative" ref={workspaceSwitcherRef}>
                <button
                  onClick={() => {
                    setShowWorkspaceSwitcher(!showWorkspaceSwitcher);
                    setShowProfileMenu(false);
                    setShowMoreMenu(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-2xs"
                  title="Switch Workspace Dashboard"
                >
                  <span className="text-sm">{currentWorkspaceItem.icon}</span>
                  <span className="hidden sm:inline font-semibold truncate max-w-[120px]">{currentWorkspaceItem.label}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showWorkspaceSwitcher ? 'rotate-180' : ''}`} />
                </button>

                {/* Workspace Switcher Dropdown (13 Dashboards) */}
                {showWorkspaceSwitcher && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-scaleUp">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-2 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">
                          MY WORKSPACES
                        </div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate mt-0.5">
                          {currentUser?.fullName || 'ACE Demo Account'}
                        </div>
                      </div>
                      {isDemo && (
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-md text-[9px] font-black uppercase tracking-wider border border-purple-300/40">
                          Demo
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                      {all13Workspaces.map((ws, idx) => {
                        const isActive = activeRole === ws.role && (ws.path === location.pathname || idx === 0);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              switchWorkspace(ws.role);
                              closeAll();
                              navigate(ws.path);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition flex items-center justify-between gap-2.5 ${
                              isActive
                                ? 'bg-purple-600 text-white font-bold shadow-xs'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <span className="text-base">{ws.icon}</span>
                              <div className="truncate">
                                <div className="font-bold truncate">{ws.label}</div>
                                <div className={`text-[10px] truncate ${isActive ? 'text-purple-100' : 'text-slate-400'}`}>
                                  {ws.desc}
                                </div>
                              </div>
                            </div>
                            {isActive && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        to="/workspaces"
                        onClick={closeAll}
                        className="flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-600 dark:text-purple-400 font-bold text-xs rounded-xl transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Open Workspaces Hub →</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Trigger */}
              <button
                onClick={() => setIsCommandOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Search (Ctrl + K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden lg:inline text-[9px] font-mono px-1 py-0.2 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">Ctrl K</kbd>
              </button>

              {/* Ask ACE */}
              <button
                onClick={onOpenAiChat}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-2xs hover:opacity-95 transition-all"
                title="Ask ACE AI Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Ask ACE</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
                title="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>

              {/* Notifications Link */}
              <Link
                to="/notifications"
                onClick={closeAll}
                className="relative p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </Link>

              {/* CORE PROFILE BUTTON & DROPDOWN */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowMoreMenu(false);
                    setShowWorkspaceSwitcher(false);
                  }}
                  className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-purple-500 transition-all shadow-2xs group"
                  aria-label="User Profile Menu"
                  title="My Profile Menu"
                >
                  <div className="relative">
                    <img 
                      src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'} 
                      alt={currentUser?.fullName || 'User Profile'} 
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full object-cover ring-2 ring-purple-500/30 group-hover:ring-purple-500 transition-all" 
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white dark:border-slate-900 rounded-full" />
                  </div>
                  
                  <span className="hidden xl:inline text-xs font-bold text-slate-800 dark:text-slate-200">
                    Profile
                  </span>

                  <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-purple-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3.5 z-50 animate-scaleUp">
                    
                    {/* Identity Header Card */}
                    <div className="p-3 bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-slate-50 dark:from-slate-800 dark:to-slate-800/60 rounded-2xl mb-2.5 border border-purple-100 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <img 
                          src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'} 
                          alt={currentUser?.fullName || 'User'} 
                          className="w-11 h-11 rounded-2xl object-cover ring-2 ring-purple-500/40 shadow-2xs" 
                        />
                        <div className="overflow-hidden flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                              {currentUser?.fullName || 'Demo Account'}
                            </p>
                            {isDemo && (
                              <span className="px-1.5 py-0.2 bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-[9px] font-black">
                                DEMO
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-purple-600 dark:text-purple-400 font-mono truncate">
                            @{currentUser?.username || 'ace_demo'}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Primary Links */}
                    <div className="space-y-1 text-xs">
                      <Link 
                        to="/profile/me" 
                        onClick={closeAll} 
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl font-bold transition-colors"
                      >
                        <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>My Profile</span>
                      </Link>

                      <Link 
                        to="/profile/edit" 
                        onClick={closeAll} 
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-emerald-500" />
                        <span>Edit Profile</span>
                      </Link>

                      <Link 
                        to="/workspaces" 
                        onClick={closeAll} 
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors"
                      >
                        <Layers className="w-4 h-4 text-indigo-500" />
                        <span>My Workspaces</span>
                      </Link>

                      <Link 
                        to="/notifications" 
                        onClick={closeAll} 
                        className="flex items-center justify-between px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Bell className="w-4 h-4 text-amber-500" />
                          <span>Notifications</span>
                        </div>
                        {unreadNotificationCount > 0 && (
                          <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                            {unreadNotificationCount}
                          </span>
                        )}
                      </Link>

                      <Link 
                        to="/messages" 
                        onClick={closeAll} 
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        <span>Messages</span>
                      </Link>

                      <Link 
                        to="/settings" 
                        onClick={closeAll} 
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    {/* Footer Support & Sign Out */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
                      <Link 
                        to="/support" 
                        onClick={closeAll} 
                        className="flex items-center gap-2.5 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-medium"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Help & Support</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-bold transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setShowProfileMenu(false);
                  setShowMoreMenu(false);
                  setShowWorkspaceSwitcher(false);
                }}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Open Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* MOBILE SLIDE-DOWN NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
            
            {/* Mobile Workspace Quick Switcher */}
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800/60">
              <div className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono mb-2">
                ACTIVE WORKSPACE: {currentWorkspaceItem.label}
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
                {all13Workspaces.map((ws, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      switchWorkspace(ws.role);
                      closeAll();
                      navigate(ws.path);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      activeRole === ws.role
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{ws.icon}</span>
                    <span className="truncate">{ws.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Primary Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link to="/events" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200">
                Discover Events
              </Link>
              <Link to="/workspaces" onClick={closeAll} className="p-2.5 bg-purple-50 dark:bg-purple-950/50 text-purple-600 rounded-xl">
                💼 Workspaces Hub
              </Link>
              <Link to="/campus" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200">
                🏫 Campus Network
              </Link>
              <Link to="/hackathons" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200">
                ⚡ Hackathons
              </Link>
              <Link to="/competitions" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200">
                🏆 Competitions
              </Link>
              <Link to="/coding" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200">
                💻 Coding Practice
              </Link>
              <Link to="/student/mentorship" onClick={closeAll} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-indigo-600 dark:text-indigo-400">
                🎓 Mentorship
              </Link>
              <Link to="/learn-play" onClick={closeAll} className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-purple-600">
                ✨ Learn & Play
              </Link>
            </div>

            {/* Mobile Profile & Account Shortcuts */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <Link to="/profile/me" onClick={closeAll} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-purple-600" />
                <span>My Profile</span>
              </Link>
              <Link to="/profile/edit" onClick={closeAll} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Edit Profile</span>
              </Link>
              <Link to="/notifications" onClick={closeAll} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>Notifications</span>
              </Link>
              <Link to="/settings" onClick={closeAll} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>Settings</span>
              </Link>
            </div>

          </div>
        )}
      </header>

      {/* Universal Search Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
