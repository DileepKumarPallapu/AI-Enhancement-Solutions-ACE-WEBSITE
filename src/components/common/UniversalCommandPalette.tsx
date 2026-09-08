import React, { useState, useEffect } from 'react';
import { Search, GitBranch, CheckCircle2, ShieldCheck, Sparkles, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UniversalCommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { label: 'Workflows Hub', url: '/workflows', icon: GitBranch, category: 'Workflows' },
    { label: 'Create New Workflow', url: '/workflows/new', icon: GitBranch, category: 'Workflows' },
    { label: 'Universal Tasks', url: '/tasks', icon: CheckCircle2, category: 'Tasks' },
    { label: 'Approval Center', url: '/approvals', icon: ShieldCheck, category: 'Approvals' },
    { label: 'Platform Automations', url: '/automations', icon: Sparkles, category: 'Automations' },
    { label: 'AI Action Proposals', url: '/ai/actions', icon: Sparkles, category: 'AI Intelligence' },
    { label: 'Global Opportunities', url: '/opportunities', icon: ArrowRight, category: 'Opportunities' },
    { label: 'Deadlines Center', url: '/opportunities/deadlines', icon: ArrowRight, category: 'Opportunities' }
  ];

  const filtered = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in duration-150">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, workflow, or search hub... (Esc to close)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map(cmd => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.url}
                onClick={() => handleSelect(cmd.url)}
                className="w-full p-3 rounded-2xl hover:bg-purple-600/20 hover:border-purple-500/30 border border-transparent flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                  <div>
                    <div className="text-xs font-bold text-white">{cmd.label}</div>
                    <div className="text-[10px] text-slate-400">{cmd.category}</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Jump →</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
