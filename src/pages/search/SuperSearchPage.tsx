import React, { useState, useEffect } from 'react';
import { 
  Search, Sparkles, MapPin, Building2, 
  Briefcase, Trophy, BookOpen, User, Award, ArrowRight 
} from 'lucide-react';
import { superSearchService, SearchResultItem, SearchEntityType } from '../../services/search/superSearchService';
import { ACEBadge, ACEEmptyState } from '../../components/ui/ace';
import { useNavigate } from 'react-router-dom';

export const SuperSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<SearchEntityType | 'ALL'>('ALL');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const res = superSearchService.search(query, { type: activeType });
    setResults(res);
  }, [query, activeType]);

  const quickPills = [
    'AI internships in Chennai',
    'Coding competitions',
    'Dr. Senthilkumar mentor',
    'Vel Tech University',
    'Autonomous AI Agents'
  ];

  const typeTabs: { id: SearchEntityType | 'ALL'; label: string; icon: any }[] = [
    { id: 'ALL', label: 'All Results', icon: Sparkles },
    { id: 'INTERNSHIP', label: 'Internships & Jobs', icon: Briefcase },
    { id: 'COMPETITION', label: 'Competitions', icon: Trophy },
    { id: 'MENTOR', label: 'Faculty Mentors', icon: User },
    { id: 'COLLEGE', label: 'Colleges', icon: Building2 },
    { id: 'COURSE', label: 'Courses', icon: BookOpen },
    { id: 'PROJECT', label: 'Projects', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            ACE Super Search Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Discover Global Opportunities
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Search events, internships, competitions, faculty mentors, verified projects, and colleges using natural language.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g. AI internships for CSE students in Chennai, coding hackathons..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-base shadow-xl"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-slate-500 whitespace-nowrap">Suggested:</span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500 whitespace-nowrap cursor-pointer transition-all"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
          {typeTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing {results.length} verified results</span>
            <span>Sorted by relevance</span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(item.url)}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <ACEBadge variant="primary">{item.category}</ACEBadge>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        {item.relevanceScore}% Match
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300">{item.subtitle}</p>

                    {item.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {item.location}
                      </div>
                    )}

                    {item.skills && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ACEEmptyState
              title="No matching opportunities found"
              description="Try adjusting your keywords or selecting 'All Results' to see global opportunities."
              actionText="Clear Search"
              onAction={() => { setQuery(''); setActiveType('ALL'); }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default SuperSearchPage;
