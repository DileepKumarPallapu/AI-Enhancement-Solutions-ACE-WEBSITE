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
  UserPlus,
  RefreshCw,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { BRAND } from '../../config/brand';
import { CommandPalette } from '../common/CommandPalette';
import { AccountRole } from '../../types/account';

export const Navbar: React.FC<{ onOpenAiChat: () => void }> = ({ onOpenAiChat }) => {
  const { unreadNotificationCount, notifications, theme, toggleTheme } = useApp();
  const { currentUser, activeRole, logout, switchRolePersona } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
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
    setShowRoleSwitcher(false);
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

  const availablePersonas: { role: AccountRole; label: string; icon: string; desc: string }[] = [
    { role: 'STUDENT', label: 'Dileep Kumar (Student)', icon: '🎓', desc: 'B.Tech CSE @ PSG Tech' },
    { role: 'COLLEGE_AMBASSADOR', label: 'Priya Sharma (Ambassador)', icon: '🤝', desc: 'Anna University Campus Lead' },
    { role: 'ORGANIZER', label: 'TechFest Club (Organizer)', icon: '🏛️', desc: 'Shaastra IIT Madras' },
    { role: 'MENTOR', label: 'Dr. Arun V (Mentor)', icon: '💡', desc: 'AI Scientist & Judge' },
    { role: 'COLLEGE', label: 'PSG Tech (Institution)', icon: '🏫', desc: 'Verified University Admin' },
    { role: 'ADMIN', label: 'ACE Admin (Superadmin)', icon: '🛡️', desc: 'System Security Control' }
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
      }`}>
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* Left: Brand Logo & Primary Navigation */}
            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <Link to="/" onClick={closeAll} className="flex items-center gap-2 group flex-shrink-0">
                <img
                  src={BRAND.logo}
                  alt={BRAND.brandName}
                  className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                <Link to="/events" className={navItemClass('/events')}>
                  Discover
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
                <Link to="/learn-play" className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-bold rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> Learn & Play
                </Link>
                <Link to="/colleges" className={navItemClass('/colleges')}>
                  Colleges
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
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-scaleUp">
                      <Link to="/community" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>💬 Community Feed</span>
                      </Link>
                      <Link to="/rewards" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>🎁 Rewards & Vouchers</span>
                      </Link>
                      <Link to="/certificates" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>📜 Verify Certificate</span>
                      </Link>
                      <Link to="/project-showcase" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>💡 Project Showcase</span>
                      </Link>
                      <Link to="/blog" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span>📰 ACE Tech Blog</span>
                      </Link>
                      <Link to="/explore" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-brand-600 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl border-t border-slate-100 dark:border-slate-800 mt-1">
                        <span>🧭 All 50+ Modules</span>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right: Actions, Search, Persona Switcher & User Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Quick Persona Switcher Button */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 transition"
                  title="Switch Role Persona"
                >
                  <RefreshCw className="w-3 h-3 text-indigo-500" />
                  <span className="truncate max-w-[110px] capitalize">{activeRole.toLowerCase().replace('_', ' ')}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showRoleSwitcher ? 'rotate-180' : ''}`} />
                </button>

                {showRoleSwitcher && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      Switch Active Persona
                    </div>
                    <div className="space-y-1 mt-1">
                      {availablePersonas.map((p) => (
                        <button
                          key={p.role}
                          onClick={() => {
                            switchRolePersona(p.role);
                            setShowRoleSwitcher(false);
                          }}
                          className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center gap-2.5 ${
                            activeRole === p.role
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="text-base">{p.icon}</span>
                          <div className="overflow-hidden">
                            <div className="font-semibold truncate">{p.label}</div>
                            <div className={`text-[10px] truncate ${activeRole === p.role ? 'text-indigo-100' : 'text-slate-400'}`}>
                              {p.desc}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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

              {/* + ADD EVENT Button */}
              <Link to="/submit-event" className="hidden sm:inline-flex">
                <button className="px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1 whitespace-nowrap">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">+ Add Event</span>
                  <span className="md:hidden">+ Event</span>
                </button>
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4 z-50 animate-scaleUp">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h4>
                      <span className="text-xs text-brand-600 font-semibold">{unreadNotificationCount} New</span>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800 max-h-64 overflow-y-auto mt-2">
                      {notifications.map(n => (
                        <div key={n.id} className="py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-lg transition-colors">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Real Live Reactive User Profile Pill */}
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
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono">
                              {currentUser.role}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                              Strength: {currentUser.profileStrength}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Menu */}
                      <div className="space-y-1 text-xs">
                        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                          Account & Profile
                        </div>

                        <Link to={`/profile/${currentUser.username}`} onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <User className="w-4 h-4 text-indigo-500" />
                          <span>View Public Profile</span>
                        </Link>

                        <Link to="/settings/profile" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Settings className="w-4 h-4 text-purple-500" />
                          <span>Edit Profile Information</span>
                        </Link>

                        <Link to="/settings/photos" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <ImageIcon className="w-4 h-4 text-blue-500" />
                          <span>Photo Studio & Banners</span>
                        </Link>

                        <Link to="/profile/gallery" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>Event Visual Gallery</span>
                        </Link>

                        {/* Workspace Dashboards */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
                          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            Workspaces
                          </div>

                          <Link to="/student" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium">
                            <span>🎓 Student Dashboard</span>
                          </Link>
                          <Link to="/organizer" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium">
                            <span>🏛️ Organizer Portal</span>
                          </Link>
                          <Link to="/ambassador" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium">
                            <span>🤝 Ambassador Portal</span>
                          </Link>
                          <Link to="/admin" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium">
                            <span>🛡️ Admin Command Center</span>
                          </Link>
                        </div>

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
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
            <nav className="flex flex-col gap-1">
              <Link to="/events" onClick={closeAll} className="px-3 py-2 text-sm font-semibold rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Discover Events
              </Link>
              <Link to="/hackathons" onClick={closeAll} className="px-3 py-2 text-sm font-semibold rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Hackathons
              </Link>
              <Link to="/competitions" onClick={closeAll} className="px-3 py-2 text-sm font-semibold rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Competitions
              </Link>
              <Link to="/coding" onClick={closeAll} className="px-3 py-2 text-sm font-semibold rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Coding
              </Link>
              <Link to="/learn-play" onClick={closeAll} className="px-3 py-2 text-sm font-bold text-purple-600 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-800">
                Learn & Play
              </Link>
              <Link to="/profile" onClick={closeAll} className="px-3 py-2 text-sm font-bold text-indigo-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800">
                My Profile & Settings
              </Link>
              <Link to="/submit-event" onClick={closeAll} className="px-3 py-2 text-sm font-semibold text-brand-600 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-800">
                + Submit Event
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
