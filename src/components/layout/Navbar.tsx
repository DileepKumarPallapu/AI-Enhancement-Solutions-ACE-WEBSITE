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
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BRAND } from '../../config/brand';
import { CommandPalette } from '../common/CommandPalette';

export const Navbar: React.FC<{ onOpenAiChat: () => void }> = ({ onOpenAiChat }) => {
  const { user, unreadNotificationCount, notifications, theme, toggleTheme } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
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
    setMobileMenuOpen(false);
  };

  const navItemClass = (path: string) => `
    flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all whitespace-nowrap
    ${location.pathname === path 
      ? 'text-brand-600 bg-brand-50/80 dark:bg-purple-950/50 font-bold' 
      : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800'}
  `;

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
                <Link to="/student/career" className={navItemClass('/student/career')}>
                  Career
                </Link>

                {/* More Dropdown for Secondary Links */}
                <div className="relative">
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs lg:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showMoreMenu && (
                    <div className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-scaleUp">
                      <Link to="/learn" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <Compass className="w-4 h-4 text-brand-600" /> Learn Hub
                      </Link>
                      <Link to="/community" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <UserCheck className="w-4 h-4 text-indigo-500" /> Community
                      </Link>
                      <Link to="/student/wallet" onClick={closeAll} className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <span className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-amber-500" /> Student Wallet
                        </span>
                        <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded">
                          ₹24.50
                        </span>
                      </Link>
                      <Link to="/explore" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <Grid className="w-4 h-4 text-brand-600" /> Explore All Features
                      </Link>
                      <Link to="/project-showcase" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl">
                        <Sparkles className="w-4 h-4 text-purple-600" /> Project Showcase
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right: Actions, AI, Add Event & User Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              
              {/* Command Palette Trigger (Ctrl + K) */}
              <button
                onClick={() => setIsCommandOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
                title="Search (Ctrl + K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">Ctrl K</kbd>
              </button>

              {/* Theme Toggle Button */}
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

              {/* User Profile Pill & Dropdown (Top Right) */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2 py-1 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-all shadow-2xs group"
                  aria-label="User Profile Menu"
                >
                  <div className="relative">
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name} 
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-brand-500/30 group-hover:ring-brand-500 transition-all" 
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white dark:border-slate-900 rounded-full" />
                  </div>
                  
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-tight flex items-center gap-0.5">
                      {user.name.split(' ')[0]}
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                    </span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono leading-none">
                      🪙 2,450
                    </span>
                  </div>

                  <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-brand-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 z-50 animate-scaleUp">
                    
                    {/* User Profile Card */}
                    <div className="p-3 bg-gradient-to-br from-brand-50/70 via-purple-50/50 to-indigo-50/40 dark:from-slate-800 dark:to-slate-800/60 rounded-2xl mb-2.5 flex items-center gap-3 border border-purple-100/80 dark:border-slate-700">
                      <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-brand-500/30 shadow-xs" />
                      <div className="overflow-hidden flex-1">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.college || 'PSG College of Technology'}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                            ✓ Verified
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono">
                            🪙 2,450
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="space-y-1 text-xs">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        My Student Space
                      </div>

                      <Link to="/dashboard/profile" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                        <UserCheck className="w-4 h-4 text-brand-600" />
                        <span>View Profile & Skills</span>
                      </Link>

                      <Link to="/student" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                        <Compass className="w-4 h-4 text-purple-600" />
                        <span>Student Dashboard</span>
                      </Link>

                      <Link to="/student/wallet" onClick={closeAll} className="flex items-center justify-between px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                        <span className="flex items-center gap-2.5">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span>Wallet & Rewards</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded">
                          ₹24.50
                        </span>
                      </Link>

                      <Link to="/ai/recommendations" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span>AI Learning Paths & Roadmaps</span>
                      </Link>

                      <Link to="/student/competitions" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                        <Trophy className="w-4 h-4 text-amber-600" />
                        <span>My Competitions & Wins</span>
                      </Link>

                      <Link to="/my-submissions" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>My Event Submissions</span>
                      </Link>

                      {/* Role Switching */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
                        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                          Switch Workspace
                        </div>

                        <Link to="/organizer" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium">
                          <span>🏛️ Organizer Portal</span>
                        </Link>
                        <Link to="/ambassador/event-approvals" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium">
                          <span>🤝 Ambassador Portal</span>
                        </Link>
                        <Link to="/admin/ai-risk" onClick={closeAll} className="flex items-center gap-2.5 px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl font-medium">
                          <span>🛡️ Admin Center</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <Link to="/submit-event" onClick={closeAll} className="block px-3 py-2 text-sm font-bold text-white bg-brand-500 text-center rounded-xl shadow-md">
              + Add College Event
            </Link>
            <Link to="/my-submissions" onClick={closeAll} className="block px-3 py-2 text-sm font-bold text-brand-600 bg-purple-50 rounded-lg">
              📋 My Event Submissions
            </Link>
            <Link to="/events" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Discover Events
            </Link>
            <Link to="/hackathons" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Hackathons
            </Link>
            <Link to="/competitions" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Competitions
            </Link>
            <Link to="/coding" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Coding Hub
            </Link>
            <Link to="/learn-play" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Learn & Play
            </Link>
            <Link to="/student/career" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Career & Jobs
            </Link>
            <Link to="/student/wallet" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Wallet & Rewards
            </Link>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
