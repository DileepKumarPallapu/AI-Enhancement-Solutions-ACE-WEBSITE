import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Code, 
  Trophy, 
  Wrench, 
  FileText, 
  Palette, 
  Gamepad2, 
  Briefcase, 
  CheckCircle2, 
  ThumbsUp, 
  ThumbsDown, 
  Calendar, 
  MapPin, 
  Flame,
  Globe,
  Compass,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SpotlightCarousel } from '../components/events/SpotlightCarousel';
import { EventCard } from '../components/events/EventCard';
import { Button } from '../components/ui/Button';
import { rankEventsForProfile } from '../services/aiService';

export const HomePage: React.FC<{ onOpenAiAssistant: () => void }> = ({ onOpenAiAssistant }) => {
  const { events, user, giveFeedFeedback } = useApp();
  const navigate = useNavigate();

  const [aiSearchInput, setAiSearchInput] = useState('');
  const [isDetectingIntent, setIsDetectingIntent] = useState(false);
  const [detectedIntent, setDetectedIntent] = useState<string | null>(null);

  const suggestedSearches = [
    "Free AI hackathons near Chennai",
    "Show internships for CSE students",
    "Events with certificates this weekend",
    "Online cybersecurity workshops"
  ];

  const handleAiSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSearchInput.trim()) return;

    setIsDetectingIntent(true);
    setTimeout(() => {
      setIsDetectingIntent(false);
      navigate(`/events?q=${encodeURIComponent(aiSearchInput.trim())}`);
    }, 600);
  };

  const handleQuickTagClick = (tag: string) => {
    navigate(`/events?q=${encodeURIComponent(tag)}`);
  };

  const recommendedEvents = rankEventsForProfile(events, user);
  const virtualEvents = events.filter(e => e.mode === 'ONLINE' || e.mode === 'HYBRID');

  const topColleges = [
    { name: "Hindustan Institute of Technology", city: "Coimbatore", eventsCount: 8, logo: "🏛️" },
    { name: "Karpagam College of Engineering", city: "Coimbatore", eventsCount: 12, logo: "🎓" },
    { name: "KPR Institute of Engineering and Technology", city: "Coimbatore", eventsCount: 15, logo: "🏫" },
    { name: "SNS College of Technology", city: "Coimbatore", eventsCount: 9, logo: "🏛️" },
    { name: "Tamil Nadu Agricultural University", city: "Coimbatore", eventsCount: 6, logo: "🌿" },
    { name: "PSG College of Technology", city: "Coimbatore", eventsCount: 18, logo: "🎓" },
    { name: "SSN College of Engineering", city: "Chennai", eventsCount: 14, logo: "🏛️" },
    { name: "Kumaraguru College of Technology", city: "Coimbatore", eventsCount: 11, logo: "🏫" }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. NEW IMPRESSIVE HERO */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-purple-50/60 via-white to-[#FAF8FF] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-500/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-brand-200/80 dark:border-slate-700 shadow-xs text-xs font-bold text-brand-700 dark:text-brand-300">
            <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
            <span>AI-POWERED OPPORTUNITY DISCOVERY</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Find the opportunities that{' '}
            <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              actually matter to you.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover hackathons, internships, workshops, conferences, competitions and career opportunities personalized around your interests.
          </p>

          {/* Large AI Search Box ("Ask ACE anything...") */}
          <div className="max-w-3xl mx-auto pt-2">
            <form onSubmit={handleAiSearchSubmit} className="relative group">
              <div className="flex items-center bg-white dark:bg-slate-800 rounded-3xl p-2.5 sm:p-3 shadow-xl border border-slate-200 dark:border-slate-700 group-hover:border-brand-400 transition-all">
                <div className="pl-3 pr-2 text-slate-400">
                  <Search className="w-5 h-5 text-brand-600" />
                </div>
                <input
                  type="text"
                  value={aiSearchInput}
                  onChange={(e) => setAiSearchInput(e.target.value)}
                  placeholder="Ask ACE anything... (e.g. Free hackathons in Chennai, Python workshops for beginners)"
                  className="flex-1 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 bg-transparent outline-none pr-2 font-medium"
                />
                <Button type="submit" variant="ai" size="md" disabled={isDetectingIntent}>
                  {isDetectingIntent ? 'Understanding...' : 'Ask ACE'}
                </Button>
              </div>
            </form>

            {/* Animated Suggestion Chips */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-400 mr-1">Suggested:</span>
              {suggestedSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickTagClick(s)}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all text-[11px] font-medium"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Hero Buttons: [Explore Events] & [Personalize My Feed] */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link to="/events">
              <Button variant="primary" size="lg" icon={<Compass className="w-5 h-5" />}>
                Explore Events
              </Button>
            </Link>
            <Link to="/dashboard/profile">
              <Button variant="secondary" size="lg" icon={<Sparkles className="w-5 h-5" />}>
                Personalize My Feed
              </Button>
            </Link>
          </div>

          {/* Social Proof Trust Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs">
            <div>
              <p className="text-lg font-black text-slate-900 dark:text-white">10,000+</p>
              <p className="text-[11px] text-slate-500">Verified Students</p>
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 dark:text-white">186+</p>
              <p className="text-[11px] text-slate-500">Live Campus Events</p>
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 dark:text-white">80+</p>
              <p className="text-[11px] text-slate-500">Colleges & Universities</p>
            </div>
            <div>
              <p className="text-lg font-black text-slate-900 dark:text-white">₹15L+</p>
              <p className="text-[11px] text-slate-500">Prizes & Grants</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TOP SPOTLIGHT CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCarousel events={events} />
      </section>

      {/* 3. PERSONALIZED AI RECOMMENDATIONS FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[11px] font-bold mb-1">
              <Sparkles className="w-3 h-3 text-brand-600" /> For You • {user.name.split(' ')[0]}
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Recommended For You
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized based on your Computer Science department, coding skills, and Chennai region.
            </p>
          </div>

          <Link to="/events" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            Explore All 186+ Events <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.slice(0, 3).map(event => (
            <div key={event.identity} className="flex flex-col space-y-2">
              <EventCard event={event} showAiMatch={true} />
              
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-500 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Feed feedback:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => giveFeedFeedback(event.slug, true)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 dark:border-slate-600 text-[11px] font-semibold transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3 text-emerald-600" /> Relevant
                  </button>
                  <button
                    onClick={() => giveFeedFeedback(event.slug, false)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-slate-700 hover:bg-rose-50 hover:text-rose-700 border border-slate-200 dark:border-slate-600 text-[11px] font-semibold transition-colors"
                  >
                    <ThumbsDown className="w-3 h-3 text-rose-500" /> Not interested
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPLORE EVENT TYPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Explore Event Types</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Discover handpicked opportunities across domains</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'Hackathons', icon: Code, count: '48 Active', color: 'from-purple-500 to-indigo-600', query: 'Hackathon' },
            { name: 'Symposiums', icon: GraduationCap, count: '62 Active', color: 'from-blue-500 to-cyan-600', query: 'Symposium' },
            { name: 'Workshops', icon: Wrench, count: '35 Active', color: 'from-emerald-500 to-teal-600', query: 'Workshop' },
            { name: 'Conferences', icon: FileText, count: '18 Active', color: 'from-amber-500 to-orange-600', query: 'Conference' },
            { name: 'Contests & Fests', icon: Trophy, count: '29 Active', color: 'from-pink-500 to-rose-600', query: 'Contest' },
            { name: 'Cultural & Arts', icon: Palette, count: '21 Active', color: 'from-violet-500 to-purple-600', query: 'Cultural' },
            { name: 'Gaming & Esports', icon: Gamepad2, count: '14 Active', color: 'from-red-500 to-pink-600', query: 'Gaming' },
            { name: 'Internships', icon: Briefcase, count: '40+ Open', color: 'from-teal-500 to-emerald-600', query: 'Internship' }
          ].map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/events?category=${encodeURIComponent(cat.name)}`)}
                className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:shadow-xl hover:border-brand-400 cursor-pointer transition-all duration-300 flex items-center gap-3.5"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">{cat.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. TRENDING EVENTS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 mb-1">
              <Flame className="w-4 h-4 text-amber-500" /> Hot & Trending This Week
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Trending Events</h2>
          </div>
          <Link to="/events" className="text-xs font-bold text-brand-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.slice(0, 4).map(e => (
            <EventCard key={e.identity} event={e} showAiMatch={false} />
          ))}
        </div>
      </section>

      {/* 6. VIRTUAL / ONLINE EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 mb-1">
              <Globe className="w-4 h-4 text-emerald-500" /> Join from Anywhere
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Virtual Events & Online Hackathons</h2>
          </div>
          <Link to="/events?mode=ONLINE" className="text-xs font-bold text-brand-600 hover:underline">
            View All Virtual →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {virtualEvents.slice(0, 3).map(e => (
            <EventCard key={e.identity} event={e} showAiMatch={false} />
          ))}
        </div>
      </section>

      {/* 7. PARTNER COLLEGES & UNIVERSITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Partner Colleges & Universities</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Discover events directly organized by accredited engineering & arts colleges</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topColleges.map((col, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/events?q=${encodeURIComponent(col.name)}`)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-brand-400 hover:shadow-lg transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{col.logo}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-brand-700 dark:text-brand-300">
                  {col.eventsCount} Events
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{col.name}</h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {col.city}, Tamil Nadu
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
