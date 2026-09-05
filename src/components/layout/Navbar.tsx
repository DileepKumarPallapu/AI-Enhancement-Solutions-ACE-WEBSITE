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
  ListFilter
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
    setMobileMenuOpen(false);
  };

  const navItemClass = (path: string) => `
    flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all
    ${location.pathname === path 
      ? 'text-brand-600 bg-brand-50/80 dark:bg-purple-950/50 font-bold' 
      : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800'}
  `;

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo with exact uploaded asset */}
            <div className="flex items-center gap-6">
              <Link to="/" onClick={closeAll} className="flex items-center gap-2 group">
                <img
                  src={BRAND.logo}
                  alt={BRAND.brandName}
                  className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden lg:flex items-center gap-1">
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
                <Link to="/learn-play" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Learn & Play
                </Link>
                <Link to="/learn" className={navItemClass('/learn')}>
                  Learn
                </Link>
                <Link to="/student/career" className={navItemClass('/student/career')}>
                  Career
                </Link>
                <Link to="/community" className={navItemClass('/community')}>
                  Community
                </Link>
                <Link to="/student/wallet" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-all font-mono">
                  <Coins className="w-3.5 h-3.5 text-amber-600" /> Wallet
                </Link>
                <Link to="/explore" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-purple-50 dark:bg-purple-950/70 text-brand-700 dark:text-brand-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-all shadow-2xs">
                  <Grid className="w-3.5 h-3.5 text-brand-600" /> Explore All
                </Link>
                <Link to="/project-showcase" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-purple-50 dark:bg-purple-950/70 text-brand-700 dark:text-brand-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-all shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Showcase
                </Link>
              </nav>
            </div>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2.5">
              
              {/* Command Palette Trigger (Ctrl + K) */}
              <button
                onClick={() => setIsCommandOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">Ctrl K</kbd>
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white text-xs font-bold shadow-md shadow-purple-500/20 hover:opacity-95 transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask ACE</span>
              </button>

              {/* Prominent + ADD COLLEGE EVENT Button */}
              <Link to="/submit-event" className="hidden sm:inline-flex">
                <button className="px-3.5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Add College Event</span>
                </button>
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
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

              {/* User Profile Avatar & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-0.5 rounded-full ring-2 ring-brand-500/20 hover:ring-brand-500 transition-all"
                >
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-3 z-50 animate-scaleUp">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl mb-2 flex items-center gap-3">
                      <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified Student
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Experience
                      </div>
                      <Link to="/student" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg font-semibold">
                        🎓 Student Experience
                      </Link>
                      <Link to="/organizer" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg font-semibold">
                        🏛️ Organizer Center
                      </Link>
                      <Link to="/ambassador/event-approvals" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg font-semibold">
                        🤝 Ambassador Portal
                      </Link>
                      <Link to="/admin/ai-risk" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-lg font-semibold">
                        🛡️ Admin AI Risk Center
                      </Link>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <Link to="/my-submissions" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-brand-600 bg-purple-50 dark:bg-purple-950 font-bold rounded-lg">
                          <Clock className="w-4 h-4" /> My Event Submissions
                        </Link>
                        <Link to="/dashboard/profile" onClick={closeAll} className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                          <UserCheck className="w-4 h-4" /> Profile & Skills
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
            <Link to="/for-you" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              For You Feed
            </Link>
            <Link to="/ambassador/event-approvals" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Ambassador Approvals
            </Link>
            <Link to="/admin/event-approvals" onClick={closeAll} className="block px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-800">
              Admin Moderation
            </Link>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
