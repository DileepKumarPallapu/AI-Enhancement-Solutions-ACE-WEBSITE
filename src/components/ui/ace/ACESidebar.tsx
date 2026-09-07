import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Compass, BookOpen, Trophy, Briefcase, FolderGit2, 
  GraduationCap, MessageSquare, Award, Wallet, Gift, Settings, 
  ShieldCheck, School, Users, Activity
} from 'lucide-react';

export interface ACESidebarProps {
  role?: 'STUDENT' | 'MENTOR' | 'ORGANIZER' | 'AMBASSADOR' | 'COLLEGE' | 'RECRUITER' | 'JUDGE' | 'ADMIN';
  collapsed?: boolean;
}

export const ACESidebar: React.FC<ACESidebarProps> = ({ role = 'STUDENT', collapsed = false }) => {
  const getNavItems = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { to: '/admin', icon: Home, label: 'Overview' },
          { to: '/admin/ai', icon: ShieldCheck, label: 'AI Governance' },
          { to: '/reports', icon: Activity, label: 'Reports & Trust' },
          { to: '/settings/ai', icon: Settings, label: 'System Settings' }
        ];
      case 'COLLEGE':
        return [
          { to: '/college/vel-tech', icon: School, label: 'Institution Hub' },
          { to: '/college/clubs', icon: Users, label: 'Campus Clubs' },
          { to: '/college/ai', icon: Activity, label: 'College AI' }
        ];
      case 'MENTOR':
        return [
          { to: '/mentor/ai', icon: GraduationCap, label: 'Mentor Workspace' },
          { to: '/student/mentorship', icon: Users, label: 'Mentees' }
        ];
      default: // STUDENT
        return [
          { to: '/student', icon: Home, label: 'Student Home' },
          { to: '/events', icon: Compass, label: 'Discover Events' },
          { to: '/learning', icon: BookOpen, label: 'Learning Lab' },
          { to: '/competitions', icon: Trophy, label: 'Competitions' },
          { to: '/career', icon: Briefcase, label: 'Career Launchpad' },
          { to: '/project-lab', icon: FolderGit2, label: 'Project Lab' },
          { to: '/student/mentorship', icon: GraduationCap, label: 'Mentorship' },
          { to: '/community', icon: MessageSquare, label: 'Community' },
          { to: '/certificates', icon: Award, label: 'Certificates' },
          { to: '/student/wallet', icon: Wallet, label: 'Wallet & Coins' },
          { to: '/rewards', icon: Gift, label: 'Rewards Store' },
          { to: '/settings/ai', icon: Settings, label: 'AI Privacy' }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-3 flex flex-col justify-between transition-all ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};
