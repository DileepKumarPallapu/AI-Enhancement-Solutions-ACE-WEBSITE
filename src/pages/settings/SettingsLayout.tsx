import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { User, Image, Shield, Lock, AlertTriangle, ArrowLeft, Settings, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SettingsLayout: React.FC = () => {
  const { currentUser } = useAuth();

  const navItems = [
    { to: '/settings/profile', label: 'Basic Profile', icon: User },
    { to: '/profile/edit', label: 'Full Profile Editor', icon: Edit3 },
    { to: '/settings/photos', label: 'Photo Studio', icon: Image },
    { to: '/settings/security', label: 'Account & Security', icon: Shield },
    { to: '/settings/privacy', label: 'Privacy & Visibility', icon: Lock },
    { to: '/settings/danger-zone', label: 'Account Danger Zone', icon: AlertTriangle, danger: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link
              to={currentUser ? `/profile/@${currentUser.username}` : '/profile'}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Profile
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              Account Settings & Preferences
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Logged in as <span className="font-semibold text-slate-900 dark:text-white">@{currentUser?.username}</span> • {currentUser?.email}
            </p>
          </div>

          <Link
            to="/profile/edit"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5" /> Open Full Profile Studio
          </Link>
        </div>

        {/* Settings Grid: Navigation Sidebar + Content Outlet */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 space-y-1.5 shadow-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition ${
                      isActive
                        ? item.danger
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                          : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                        : item.danger
                        ? 'text-rose-600/80 dark:text-rose-400/80 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </aside>

          {/* Main Outlet */}
          <main className="md:col-span-3 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
