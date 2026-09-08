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
  Building2,
  Zap,
  Layers,
  Users,
  Award,
  ShieldCheck,
  TrendingUp,
  Brain,
  BarChart3
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
    }, 500);
  };

  const handleQuickTagClick = (tag: string) => {
    navigate(`/events?q=${encodeURIComponent(tag)}`);
  };

  const recommendedEvents = rankEventsForProfile(events, user);
  const virtualEvents = events.filter(e => e.mode === 'ONLINE' || e.mode === 'HYBRID');

  const topColleges = [
    { name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute", city: "Chennai", eventsCount: 24, logo: "🎓" },
    { name: "Indian Institute of Technology (IIT) Madras", city: "Chennai", eventsCount: 19, logo: "🏛️" },
    { name: "Anna University CEG Campus", city: "Chennai", eventsCount: 16, logo: "🏫" },
    { name: "SSN College of Engineering", city: "Chennai", eventsCount: 14, logo: "🏛️" },
    { name: "National Institute of Technology (NIT) Trichy", city: "Tiruchirappalli", eventsCount: 15, logo: "🏫" },
    { name: "Hindustan Institute of Technology and Science", city: "Chennai", eventsCount: 10, logo: "🏛️" },
    { name: "SRM Institute of Science and Technology", city: "Kattankulathur", eventsCount: 12, logo: "🎓" },
    { name: "Kumaraguru College of Technology", city: "Coimbatore", eventsCount: 11, logo: "🏫" }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-purple-50/60 via-white to-[#FAF8FF] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-500/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-purple-200/80 dark:border-slate-700 shadow-xs text-xs font-bold text-purple-700 dark:text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            <span>AI-POWERED STUDENT OPPORTUNITY ECOSYSTEM</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Discover. Learn.{' '}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Connect. Grow.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            ACE — The AI-powered student opportunity ecosystem. Connect your campus, skills, mentors, projects, and career opportunities in one unified operating system.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/events"
              className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-purple-600/25 transition transform hover:scale-105 flex items-center gap-2"
            >
              <span>EXPLORE ACE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/demo"
              className="px-6 py-3.5 bg-purple-100 dark:bg-purple-950/80 hover:bg-purple-200 dark:hover:bg-purple-900 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-black text-sm rounded-2xl transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>START HACKATHON DEMO</span>
            </Link>

            <Link
              to="/workspaces"
              className="px-5 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-sm rounded-2xl transition"
            >
              💼 WORKSPACES
            </Link>
          </div>

          {/* Large AI Search Box ("Ask ACE anything...") */}
          <div className="max-w-3xl mx-auto pt-4">
            <form onSubmit={handleAiSearchSubmit} className="relative group">
              <div className="flex items-center bg-white dark:bg-slate-800 rounded-3xl p-2.5 sm:p-3 shadow-xl border border-slate-200 dark:border-slate-700 group-hover:border-purple-400 transition-all">
                <div className="pl-3 pr-2 text-slate-400">
                  <Search className="w-5 h-5 text-purple-600" />
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

            {/* Suggested Searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Try searching:</span>
              {suggestedSearches.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-600 text-slate-600 dark:text-slate-300 font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. SPOTLIGHT CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCarousel events={events} />
      </section>

      {/* 3. 12 PRODUCT ECOSYSTEM PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            The Complete Student Operating System
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Every aspect of your college journey connected in one ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/events" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🎪</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Discover Opportunities</h3>
            <p className="text-xs text-slate-500 mt-1">Hackathons, symposiums, and internships.</p>
          </Link>

          <Link to="/ai" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">✨</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">AI Personalization</h3>
            <p className="text-xs text-slate-500 mt-1">Recommendations with explainable match scores.</p>
          </Link>

          <Link to="/learn-play" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🎮</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Learn & Play</h3>
            <p className="text-xs text-slate-500 mt-1">Daily missions, streaks, XP, and coin rewards.</p>
          </Link>

          <Link to="/mentorship" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">👨‍🏫</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Faculty Mentorship</h3>
            <p className="text-xs text-slate-500 mt-1">1-on-1 sprint reviews and skill endorsements.</p>
          </Link>

          <Link to="/career" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🎯</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Universal Career OS</h3>
            <p className="text-xs text-slate-500 mt-1">Role simulators and mathematical skill gaps.</p>
          </Link>

          <Link to="/projects/lab" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🧪</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Student Project Lab</h3>
            <p className="text-xs text-slate-500 mt-1">Code repositories and milestone sign-offs.</p>
          </Link>

          <Link to="/campus" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🏫</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Campus Network</h3>
            <p className="text-xs text-slate-500 mt-1">Collegiate tech clubs, chapters, and feeds.</p>
          </Link>

          <Link to="/competitions" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🏆</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Competitions</h3>
            <p className="text-xs text-slate-500 mt-1">Online rooms, live timers, and judging arenas.</p>
          </Link>

          <Link to="/recruiter/dashboard" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">💼</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Recruitment Radar</h3>
            <p className="text-xs text-slate-500 mt-1">Talent filtered by verified code proof.</p>
          </Link>

          <Link to="/college/dashboard" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🏛️</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">College Ecosystem</h3>
            <p className="text-xs text-slate-500 mt-1">Institutional accreditation & mentor governance.</p>
          </Link>

          <Link to="/ai" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">🤖</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Universal Ask ACE</h3>
            <p className="text-xs text-slate-500 mt-1">Context-grounded assistant for all tasks.</p>
          </Link>

          <Link to="/student/dashboard" className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition shadow-2xs group">
            <span className="text-3xl">📊</span>
            <h3 className="font-black text-sm text-slate-900 dark:text-white mt-3 group-hover:text-purple-600">Operational Analytics</h3>
            <p className="text-xs text-slate-500 mt-1">Telemetry across learning, applications, and goals.</p>
          </Link>
        </div>
      </section>

      {/* 4. RECOMMENDED OPPORTUNITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Recommended For You</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Matched against your verified competencies</p>
          </div>
          <Link to="/events" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
            View All ({events.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.slice(0, 6).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 5. TOP COLLEGES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Participating Collegiate Network
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Leading universities and institutes hosting on ACE</p>
          </div>
          <Link to="/colleges" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
            Browse All Colleges →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topColleges.map((col, idx) => (
            <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 text-center">
              <span className="text-2xl">{col.logo}</span>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate pt-1">{col.name}</h4>
              <p className="text-[10px] text-slate-400">{col.city} • {col.eventsCount} Events</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
