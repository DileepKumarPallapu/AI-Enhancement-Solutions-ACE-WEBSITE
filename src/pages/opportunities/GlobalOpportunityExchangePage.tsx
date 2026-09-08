import React, { useState, useEffect } from 'react';
import { 
  Globe2, Sparkles, Filter, Search, MapPin, Building2, 
  Clock, ShieldCheck, ArrowRight, Bookmark, Share2, DollarSign,
  Compass, Award, Briefcase, GraduationCap, Users
} from 'lucide-react';
import { globalOpportunityExchangeDatabase, GlobalOpportunity, GlobalOpportunityCategory } from '../../services/db/globalOpportunityExchangeDatabase';
import { globalizationService, CurrencyCode } from '../../services/global/globalizationService';
import { ACEBadge } from '../../components/ui/ace';
import { Link, useNavigate } from 'react-router-dom';

export const GlobalOpportunityExchangePage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<GlobalOpportunity[]>([]);
  const [activeCategory, setActiveCategory] = useState<GlobalOpportunityCategory | 'ALL'>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>(globalizationService.getActiveCurrency().code);
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [savedSearchMsg, setSavedSearchMsg] = useState<string | null>(null);

  useEffect(() => {
    loadOpportunities();
    const unsub = globalOpportunityExchangeDatabase.subscribe(loadOpportunities);
    return () => unsub();
  }, []);

  const loadOpportunities = () => {
    setOpportunities(globalOpportunityExchangeDatabase.getAllOpportunities());
  };

  const handleCurrencyChange = (code: CurrencyCode) => {
    globalizationService.setCurrency(code);
    setActiveCurrency(code);
  };

  const handleSaveSearch = () => {
    globalOpportunityExchangeDatabase.saveSearch('usr_student_dileep', searchQuery || 'Global Exchange Filter', {
      category: activeCategory === 'ALL' ? undefined : activeCategory,
      country: selectedCountry === 'ALL' ? undefined : selectedCountry,
      isRemote: isRemoteOnly || undefined
    });
    setSavedSearchMsg('Search criteria saved with active alerts!');
    setTimeout(() => setSavedSearchMsg(null), 3000);
  };

  const filtered = opportunities.filter(opp => {
    if (activeCategory !== 'ALL' && opp.category !== activeCategory) return false;
    if (selectedCountry !== 'ALL' && opp.location.country.toLowerCase() !== selectedCountry.toLowerCase()) return false;
    if (isRemoteOnly && !opp.isRemote) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = opp.title.toLowerCase().includes(q);
      const matchesProvider = opp.providerName.toLowerCase().includes(q);
      const matchesSkill = opp.requiredSkills.some(s => s.toLowerCase().includes(q));
      if (!matchesTitle && !matchesProvider && !matchesSkill) return false;
    }
    return true;
  });

  const categories: { label: string; value: GlobalOpportunityCategory | 'ALL'; icon: any }[] = [
    { label: 'All Opportunities', value: 'ALL', icon: Compass },
    { label: 'Fellowships', value: 'FELLOWSHIP', icon: Award },
    { label: 'Hackathons', value: 'HACKATHON', icon: Sparkles },
    { label: 'Research Labs', value: 'RESEARCH', icon: GraduationCap },
    { label: 'Scholarships', value: 'SCHOLARSHIP', icon: DollarSign },
    { label: 'Volunteering', value: 'VOLUNTEERING', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 p-6 md:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-blue-400" /> ACE 110X Global Opportunity Exchange
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Multi-Currency & Verified Sources
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Global Opportunity Exchange
              </h1>
              <p className="text-sm md:text-base text-slate-300">
                Discover verified fellowships, research labs, hackathons, and international scholarships. Grounded in your Vel Tech Digital Student Passport with live dual-currency pricing.
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Display Currency:</div>
              <select
                value={activeCurrency}
                onChange={(e) => handleCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {globalizationService.getSupportedCurrencies().map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol}) — {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search global opportunities, skills (e.g. Autonomous AI, ROS2), or institutions..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-3">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Countries / Global</option>
                <option value="India">India (Vel Tech / Domestic)</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany (Indo-German / DAAD)</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
            <div className="md:col-span-3 flex items-center gap-2">
              <button
                onClick={() => setIsRemoteOnly(!isRemoteOnly)}
                className={`flex-1 py-3 px-3 rounded-2xl text-xs font-bold border transition-all ${
                  isRemoteOnly ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                {isRemoteOnly ? '✓ Remote Friendly' : 'All Modes'}
              </button>
              <button
                onClick={handleSaveSearch}
                className="py-3 px-4 rounded-2xl text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all flex items-center gap-1.5"
                title="Save this search and receive alerts"
              >
                <Bookmark className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>

          {savedSearchMsg && (
            <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 font-semibold">
              {savedSearchMsg}
            </div>
          )}
        </div>

        {/* Quick Hub Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <Link to="/opportunities/deadlines" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all text-center space-y-1">
            <Clock className="w-5 h-5 text-amber-400 mx-auto" />
            <div className="text-xs font-bold text-white">Deadlines Center</div>
            <div className="text-[10px] text-slate-400">Time-bucketed urgency</div>
          </Link>
          <Link to="/opportunities/compare" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all text-center space-y-1">
            <Filter className="w-5 h-5 text-indigo-400 mx-auto" />
            <div className="text-xs font-bold text-white">Compare Hub</div>
            <div className="text-[10px] text-slate-400">Side-by-side analysis</div>
          </Link>
          <Link to="/research" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all text-center space-y-1">
            <GraduationCap className="w-5 h-5 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-white">Research Labs</div>
            <div className="text-[10px] text-slate-400">Faculty & R&D grants</div>
          </Link>
          <Link to="/scholarships" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all text-center space-y-1">
            <DollarSign className="w-5 h-5 text-purple-400 mx-auto" />
            <div className="text-xs font-bold text-white">Scholarships</div>
            <div className="text-[10px] text-slate-400">Global merit funding</div>
          </Link>
          <Link to="/partners/marketplace" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all text-center space-y-1">
            <Building2 className="w-5 h-5 text-blue-400 mx-auto" />
            <div className="text-xs font-bold text-white">Partners</div>
            <div className="text-[10px] text-slate-400">Institutional network</div>
          </Link>
          <Link to="/ai/global-opportunities" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all text-center space-y-1">
            <Sparkles className="w-5 h-5 text-yellow-400 mx-auto" />
            <div className="text-xs font-bold text-white">Ask ACE Global</div>
            <div className="text-[10px] text-slate-400">Grounded AI matching</div>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isSelected ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Opportunity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((opp) => {
            const dualPrice = globalizationService.formatDualPrice(opp.stipendOrPrizeINR, activeCurrency);
            return (
              <div
                key={opp.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-5 group shadow-lg"
              >
                <div className="space-y-4">
                  {/* Top Bar: Provider & Trust */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={opp.providerLogoUrl}
                        alt={opp.providerName}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-700/50 p-0.5 bg-slate-800"
                      />
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded-md">
                          {opp.category}
                        </span>
                        <h3 className="font-extrabold text-white text-base leading-snug line-clamp-1 mt-1 group-hover:text-blue-300 transition-colors">
                          {opp.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1">{opp.providerName}</p>
                      </div>
                    </div>
                    <ACEBadge variant="success">Trust {opp.trustScore}%</ACEBadge>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 bg-slate-800/60 p-2 rounded-xl">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{opp.location.city}, {opp.location.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-800/60 p-2 rounded-xl">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Due {new Date(opp.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Pricing / Stipend with Multi-Currency */}
                  <div className="p-3 bg-blue-950/30 border border-blue-900/40 rounded-2xl space-y-1">
                    <div className="text-[11px] text-blue-300 font-semibold flex items-center justify-between">
                      <span>Funding / Stipend:</span>
                      {opp.stipendOrPrizeINR > 0 && (
                        <span className="text-white font-mono font-bold">
                          {dualPrice.formattedOriginal}
                        </span>
                      )}
                    </div>
                    {opp.stipendOrPrizeINR > 0 ? (
                      <div className="text-xs text-slate-300 flex items-center justify-between font-mono">
                        <span className="text-slate-400 text-[10px]">Approx ({activeCurrency}):</span>
                        <span className="font-bold text-emerald-400">{dualPrice.formattedApprox}</span>
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-300 font-semibold">{opp.stipendOrPrizeDisplay}</div>
                    )}
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {opp.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Match Reason Rationale */}
                  {opp.matchReasons && opp.matchReasons.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-[11px] text-indigo-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      <span className="line-clamp-1">{opp.matchReasons[0]}</span>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-medium">Source: {opp.sourceType}</span>
                  <Link
                    to={`/opportunities/compare`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-all shadow-md"
                  >
                    Compare & Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
