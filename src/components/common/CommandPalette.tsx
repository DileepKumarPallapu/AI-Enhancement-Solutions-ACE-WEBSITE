import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Compass, Trophy, Briefcase, Code, BookOpen, Users, Award, 
  Sparkles, FileText, CheckSquare, ShieldCheck, History, AlertTriangle, 
  Building2, ArrowRight, Grid, Home, LayoutDashboard
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  path: string;
  icon: any;
  shortcut?: string;
}

const commands: CommandItem[] = [
  // Opportunities
  { id: '1', title: 'Events Explorer', category: 'Opportunities', path: '/events', icon: Compass },
  { id: '2', title: 'Hackathons Hub', category: 'Opportunities', path: '/hackathons', icon: Trophy },
  { id: '3', title: 'Personalized "For You" Feed', category: 'Opportunities', path: '/for-you', icon: Sparkles },
  { id: '4', title: 'Smart Search & Filters', category: 'Opportunities', path: '/search', icon: Search },
  { id: '5', title: 'Colleges & Locations', category: 'Opportunities', path: '/colleges', icon: Building2 },

  // Coding & Learning
  { id: '6', title: 'Coding Hub & Daily Challenge', category: 'Coding & Learn', path: '/coding', icon: Code },
  { id: '7', title: 'Interactive Problem Solver (Two Sum)', category: 'Coding & Learn', path: '/coding/practice/two-sum', icon: Code },
  { id: '8', title: '8 Browser Coding Mini-Games', category: 'Coding & Learn', path: '/coding/games', icon: Trophy },
  { id: '9', title: 'Learning Academy Roadmaps', category: 'Coding & Learn', path: '/learn', icon: BookOpen },
  { id: '10', title: 'Student Contests & Quizzes', category: 'Coding & Learn', path: '/contests', icon: Award },

  // Career & Portfolio
  { id: '11', title: 'Internships & Fresher Jobs', category: 'Career & Profile', path: '/student/career', icon: Briefcase },
  { id: '12', title: 'Automated ATS Resume Builder', category: 'Career & Profile', path: '/student/resume', icon: FileText },
  { id: '13', title: 'Applications Tracker', category: 'Career & Profile', path: '/student/applications', icon: CheckSquare },
  { id: '14', title: 'Digital Certificate Wallet', category: 'Career & Profile', path: '/certificates', icon: Award },
  { id: '15', title: 'Student Profile & Skills', category: 'Career & Profile', path: '/dashboard/profile', icon: Users },

  // Community & Referrals
  { id: '16', title: 'College Campus Community', category: 'Community', path: '/community', icon: Users },
  { id: '17', title: 'Refer & Earn Rewards', category: 'Community', path: '/referral', icon: Trophy },

  // Workspaces
  { id: '18', title: 'Student Portal Dashboard', category: 'Workspaces', path: '/student', icon: LayoutDashboard },
  { id: '19', title: 'Campus Ambassador Command Center', category: 'Workspaces', path: '/ambassador', icon: ShieldCheck },
  { id: '20', title: 'Ambassador Tasks Tracker', category: 'Workspaces', path: '/ambassador/tasks', icon: CheckSquare },
  { id: '21', title: 'Ambassador Outreach Campaigns', category: 'Workspaces', path: '/ambassador/campaigns', icon: Trophy },
  { id: '22', title: 'Ambassador Student Directory', category: 'Workspaces', path: '/ambassador/students', icon: Users },
  { id: '23', title: 'Organizer Center & Check-in Scanner', category: 'Workspaces', path: '/organizer', icon: Building2 },
  { id: '24', title: 'Organizer AI Copywriter Studio', category: 'Workspaces', path: '/organizer/ai-tools', icon: Sparkles },
  { id: '25', title: 'Institutional College Workspace', category: 'Workspaces', path: '/college', icon: Building2 },
  { id: '26', title: 'ACE Admin AI Risk Center', category: 'Workspaces', path: '/admin/ai-risk', icon: AlertTriangle },
  { id: '27', title: 'Immutable System Audit Logs', category: 'Workspaces', path: '/admin/audit-logs', icon: History },
  { id: '28', title: 'Student Reports Resolution Queue', category: 'Workspaces', path: '/admin/reports', icon: AlertTriangle },
  { id: '29', title: 'Support & Help Desk Tickets', category: 'Workspaces', path: '/support', icon: Sparkles },
  { id: '30', title: 'Explore All ACE Features Directory', category: 'Ecosystem Hub', path: '/explore', icon: Grid }
];

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        navigate(filtered[selectedIndex].path);
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-brand-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search all ACE features (Ctrl+K)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 font-medium"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 rounded text-slate-500">ESC to exit</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching features found. Try "Hackathon", "Coding", "Resume", or "Admin".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-purple-50 dark:bg-purple-950/70 text-brand-700 dark:text-brand-300 font-bold' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs block font-bold">{item.title}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    {item.path} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigation: ↑ ↓ Enter</span>
          <span className="font-bold text-brand-600">AllCollegeEvent v2.0 Global Index</span>
        </div>
      </div>
    </div>
  );
};
