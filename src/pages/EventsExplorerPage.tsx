import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  MapPin, 
  Grid, 
  List, 
  Info,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { FilterPanel } from '../components/events/FilterPanel';
import { parseNaturalLanguageQuery } from '../services/aiService';
import { Button } from '../components/ui/Button';

export const EventsExplorerPage: React.FC = () => {
  const { events, isLoadingEvents } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'ALL';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedMode, setSelectedMode] = useState('ALL');
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Parse natural language search
  const aiSearchInsights = parseNaturalLanguageQuery(searchQuery);

  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
  }, [queryParam]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedCity('ALL');
    setSelectedMode('ALL');
    setIsFreeOnly(false);
    setSortBy('recommended');
    setSearchParams({});
  };

  // Filter application
  let filtered = events.filter(e => {
    // 1. Search text query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${e.title} ${e.description} ${e.tags?.join(' ')} ${e.org?.organizationName} ${e.location?.venue}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    // 2. Category
    if (selectedCategory !== 'ALL' && e.categoryName !== selectedCategory) {
      return false;
    }

    // 3. City
    if (selectedCity !== 'ALL') {
      const eventCity = e.location?.city || '';
      if (!eventCity.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    }

    // 4. Mode
    if (selectedMode !== 'ALL' && e.mode !== selectedMode) {
      return false;
    }

    // 5. Free only
    if (isFreeOnly && e.isPaid && e.tickets?.[0]?.price !== 0) {
      return false;
    }

    return true;
  });

  // Sorting
  if (sortBy === 'trending') {
    filtered.sort((a, b) => b.viewCount - a.viewCount);
  } else if (sortBy === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'price_low') {
    filtered.sort((a, b) => (a.tickets?.[0]?.price || 0) - (b.tickets?.[0]?.price || 0));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search & Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore All College Opportunities
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Find symposiums, hackathons, workshops, conferences, and internships.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="w-full md:w-96">
            <div className="flex items-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, colleges, topics..."
                className="w-full text-xs bg-transparent outline-none text-slate-900"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-0.5 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI Query Insights Bar */}
        {searchQuery.trim() && (
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-center gap-2 text-xs text-purple-900">
            <Sparkles className="w-4 h-4 text-brand-600 flex-shrink-0" />
            <span className="font-semibold">AI Search Interpretation:</span>
            <span>{aiSearchInsights.explanation}</span>
          </div>
        )}

        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Active:</span>
          {selectedCategory !== 'ALL' && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 font-semibold border border-brand-200">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('ALL')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCity !== 'ALL' && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              {selectedCity}
              <button onClick={() => setSelectedCity('ALL')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedMode !== 'ALL' && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              {selectedMode}
              <button onClick={() => setSelectedMode('ALL')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {isFreeOnly && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
              Free Events Only
              <button onClick={() => setIsFreeOnly(false)}><X className="w-3 h-3" /></button>
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">{filtered.length} Opportunities Found</span>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>
          </div>
        </div>

      </div>

      {/* 3-PANE DISCOVERY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Pane: Sticky Filters (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            isFreeOnly={isFreeOnly}
            setIsFreeOnly={setIsFreeOnly}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={handleResetFilters}
          />
        </div>

        {/* Center Pane: Results Grid */}
        <div className="lg:col-span-6 space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <p className="text-base font-bold text-slate-800">No events matched your exact criteria</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try removing a filter or searching for another college, city, or event category.
              </p>
              <Button variant="primary" size="sm" onClick={handleResetFilters}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filtered.map(event => (
                <EventCard key={event.identity} event={event} showAiMatch={true} />
              ))}
            </div>
          )}
        </div>

        {/* Right Pane: AI Insights & Quick Regional Discovery */}
        <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
          
          <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white p-5 rounded-2xl shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-purple-200">AI Event Matching</h4>
            </div>
            <p className="text-xs text-purple-100 leading-relaxed">
              ACE AI evaluates event schedules, department eligibility, and certification authenticity in real time to guarantee verified quality listings.
            </p>
            <div className="pt-2 border-t border-purple-800/80 text-[11px] text-purple-300">
              100% Genuine College Listings
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Top Event Hubs</h4>
            <div className="space-y-2 text-xs">
              <button onClick={() => setSelectedCity('Chennai')} className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between">
                <span>Chennai</span>
                <span className="text-[11px] text-brand-600 font-semibold">42 Events</span>
              </button>
              <button onClick={() => setSelectedCity('Coimbatore')} className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between">
                <span>Coimbatore</span>
                <span className="text-[11px] text-brand-600 font-semibold">38 Events</span>
              </button>
              <button onClick={() => setSelectedCity('Bengaluru')} className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between">
                <span>Bengaluru</span>
                <span className="text-[11px] text-brand-600 font-semibold">29 Events</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Filters Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden flex flex-col justify-end animate-fadeIn">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              isFreeOnly={isFreeOnly}
              setIsFreeOnly={setIsFreeOnly}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
            />
            <Button variant="primary" size="lg" className="w-full" onClick={() => setMobileFilterOpen(false)}>
              Apply Filters ({filtered.length} Results)
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
