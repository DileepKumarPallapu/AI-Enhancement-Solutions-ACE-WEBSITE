import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, BookOpen, Briefcase, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const items = [
    { to: '/student', icon: Home, label: 'Home' },
    { to: '/events', icon: Compass, label: 'Discover' },
    { to: '/learning', icon: BookOpen, label: 'Learn' },
    { to: '/career', icon: Briefcase, label: 'Career' },
    { to: '/profile/me', icon: User, label: 'Profile' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg">
      {items.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-bold transition ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
