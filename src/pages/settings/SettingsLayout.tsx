import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { User, Image, Shield, Lock, AlertTriangle, ArrowLeft, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SettingsLayout: React.FC = () => {
  const { currentUser } = useAuth();

  const navItems = [
    { to: '/settings/profile', label: 'Edit Profile', icon: User },
    { to: '/settings/photos', label: 'Photo Studio', icon: Image },
    { to: '/settings/security', label: 'Account & Security', icon: Shield },
    { to: '/settings/privacy', label: 'Privacy & Visibility', icon: Lock },
    { to: '/settings/danger-zone', label: 'Account Danger Zone', icon: AlertTriangle, danger: true },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <Link to="/profile" className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Profile
            </Link>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-indigo-400" />
              Account Settings & Preferences
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Logged in as <span className="text-white font-medium">@{currentUser?.username}</span> • {currentUser?.email}
            </p>
          </div>
        </div>

        {/* Settings Grid: Navigation Sidebar + Content Outlet */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-slate-900/60 border border-slate-800 rounded-3xl p-3 space-y-1.5 backdrop-blur-xl">
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
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                        : item.danger
                        ? 'text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
          <main className="md:col-span-3 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
