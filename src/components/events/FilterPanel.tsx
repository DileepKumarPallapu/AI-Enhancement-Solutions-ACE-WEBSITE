import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface FilterPanelProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
  isFreeOnly: boolean;
  setIsFreeOnly: (free: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  selectedMode,
  setSelectedMode,
  isFreeOnly,
  setIsFreeOnly,
  sortBy,
  setSortBy,
  onReset
}) => {
  const categories = [
    'ALL',
    'Technical & Coding',
    'Academic & Professional',
    'Workshops & Training',
    'Conferences & Research',
    'Cultural & Arts',
    'Gaming & Esports'
  ];

  const cities = ['ALL', 'Chennai', 'Coimbatore', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Madurai'];
  const modes = ['ALL', 'OFFLINE', 'ONLINE', 'HYBRID'];
  const sortOptions = [
    { value: 'recommended', label: 'AI Recommended' },
    { value: 'trending', label: 'Most Trending' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" /> Filter Opportunities
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Mode Filters */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Event Mode
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {modes.map(m => (
            <button
              key={m}
              onClick={() => setSelectedMode(m)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center ${selectedMode === m ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              {m === 'ALL' ? 'All Modes' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Free Ticket Toggle */}
      <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-brand-900 block">Free Events Only</span>
          <span className="text-[11px] text-brand-600">Zero entry ticket fees</span>
        </div>
        <input
          type="checkbox"
          checked={isFreeOnly}
          onChange={(e) => setIsFreeOnly(e.target.checked)}
          className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 accent-brand-600 cursor-pointer"
        />
      </div>

      {/* Category Selection */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Category
        </label>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${selectedCategory === cat ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span>{cat === 'ALL' ? 'All Categories' : cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-brand-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* City Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          City / Region
        </label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none bg-slate-50 text-slate-700 font-medium"
        >
          {cities.map(c => (
            <option key={c} value={c}>
              {c === 'ALL' ? 'All Cities across India' : c}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none bg-slate-50 text-slate-700 font-medium"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};
