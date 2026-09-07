import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Calendar, 
  Award, 
  Coins, 
  User, 
  Settings, 
  MessageSquare, 
  School, 
  ArrowRight,
  Clock,
  X
} from 'lucide-react';
import { universalSearchService, SearchResultItem } from '../../services/search/universalSearchService';
import { useAuth } from '../../context/AuthContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setRecentSearches(universalSearchService.getRecentSearches(userId));
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen, userId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const searchRes = universalSearchService.search({ query: query.trim(), limit: 8 });
    setResults(searchRes.results);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectResult = (item: SearchResultItem) => {
    universalSearchService.saveRecentSearch(userId, query || item.title);
    onClose();
    navigate(item.url);
  };

  const quickNavLinks = [
    { label: 'Explore Events', icon: Calendar, url: '/events' },
    { label: 'Verified Mentors', icon: Sparkles, url: '/mentors' },
    { label: 'Activity Center', icon: Clock, url: '/activity' },
    { label: 'Notification Center', icon: Award, url: '/notifications' },
    { label: 'Rewards & Wallet', icon: Coins, url: '/rewards' },
    { label: 'Profile Settings', icon: Settings, url: '/settings/profile' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full shadow-2xl overflow-hidden animate-scaleUp">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, mentors, colleges, projects, or jump to..."
            className="flex-1 text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          
          {/* Dynamic Search Results */}
          {results.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block px-2">
                Matching Opportunities & Records ({results.length})
              </span>
              {results.map(r => (
                <div
                  key={r.id}
                  onClick={() => handleSelectResult(r)}
                  className="p-3 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-950/40 cursor-pointer flex items-center justify-between transition group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-brand-600">
                        {r.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                        {r.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{r.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          )}

          {/* Quick Navigation Commands */}
          {!query && (
            <div className="space-y-3">
              {recentSearches.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block px-2">
                    Recent Searches
                  </span>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {recentSearches.map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1.5 pt-2">
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block px-2">
                  Quick Navigation Shortcuts
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {quickNavLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <div
                        key={link.url}
                        onClick={() => {
                          onClose();
                          navigate(link.url);
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 cursor-pointer flex items-center gap-2.5 transition"
                      >
                        <Icon className="w-4 h-4 text-brand-600" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{link.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
