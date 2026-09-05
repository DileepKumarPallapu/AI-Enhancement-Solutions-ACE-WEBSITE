import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { parseNaturalLanguageQuery } from '../services/aiService';
import { Button } from '../components/ui/Button';

export const SearchPage: React.FC = () => {
  const { events } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const parsed = parseNaturalLanguageQuery(query);

  const filtered = events.filter(e => {
    if (!query.trim()) return true;
    const s = query.toLowerCase();
    const text = `${e.title} ${e.description} ${e.location?.city} ${e.categoryName} ${e.tags?.join(' ')}`.toLowerCase();
    return text.includes(s);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">AI Semantic Search</h1>
        <div className="flex items-center bg-slate-50 rounded-2xl p-3 border border-slate-200">
          <Search className="w-5 h-5 text-brand-600 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchParams(e.target.value ? { q: e.target.value } : {});
            }}
            placeholder="Try: 'Free hackathons in Chennai', 'AI workshops under 500'..."
            className="flex-1 bg-transparent outline-none text-sm text-slate-900"
          />
          {query && <button onClick={() => { setQuery(''); setSearchParams({}); }}><X className="w-4 h-4 text-slate-400" /></button>}
        </div>

        {query && (
          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-2 text-xs text-purple-900">
            <Sparkles className="w-4 h-4 text-brand-600 flex-shrink-0" />
            <span className="font-semibold">Detected Filters:</span>
            <span>{parsed.explanation}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(e => (
          <EventCard key={e.identity} event={e} showAiMatch={true} />
        ))}
      </div>
    </div>
  );
};
