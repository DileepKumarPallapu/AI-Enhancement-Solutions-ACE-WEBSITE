import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, ShieldCheck, Flame, Sparkles } from 'lucide-react';
import { EventItem } from '../../types';
import { Button } from '../ui/Button';

export const SpotlightCarousel: React.FC<{ events: EventItem[] }> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const spotlightEvents = events.slice(0, 4);

  useEffect(() => {
    if (spotlightEvents.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % spotlightEvents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [spotlightEvents.length]);

  if (spotlightEvents.length === 0) return null;

  const current = spotlightEvents[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 shadow-2xl border border-purple-500/20">
      
      {/* Glowing background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand-500/30 border border-brand-400/40 text-brand-300 font-bold text-xs">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> TOP SPOTLIGHT 2026
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">Handpicked National Flagship Opportunities</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((currentIndex - 1 + spotlightEvents.length) % spotlightEvents.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentIndex((currentIndex + 1) % spotlightEvents.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Poster Image */}
        <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 group">
          <img
            src={current.bannerImages?.[0]}
            alt={current.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-white uppercase">
              {current.mode}
            </span>
          </div>
        </div>

        {/* Right Info & Live Countdown */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold">
            <span>{current.org?.organizationName || 'Premier University Host'}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight line-clamp-2">
            {current.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {current.description.replace(/<[^>]*>?/gm, '')}
          </p>

          {/* Live circular countdown counters */}
          <div className="py-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Event Starts In:
            </span>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm">
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-lg sm:text-2xl font-black text-brand-300">14</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase">Days</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-lg sm:text-2xl font-black text-emerald-300">08</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase">Hours</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-lg sm:text-2xl font-black text-amber-300">42</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase">Mins</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-lg sm:text-2xl font-black text-blue-300">19</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase">Secs</span>
              </div>
            </div>
          </div>

          {/* Location & Time Pills */}
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5 text-brand-300" />
              <span>{current.calendars?.[0]?.startDate || 'Sep 16, 2026'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 text-pink-300" />
              <span>{current.location?.venue || current.location?.city || 'Coimbatore, TN'}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-3">
            <Link to={`/events/${current.slug}`}>
              <Button variant="ai" size="md">
                Get Tickets / Register Now →
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="md" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                View All Spotlight
              </Button>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
