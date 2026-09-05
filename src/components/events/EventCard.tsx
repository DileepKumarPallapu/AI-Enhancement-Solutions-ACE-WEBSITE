import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Bookmark, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Award, 
  Flame, 
  Users, 
  Sparkles,
  Ticket
} from 'lucide-react';
import { EventItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';

interface EventCardProps {
  event: EventItem;
  showAiMatch?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, showAiMatch = true }) => {
  const { savedEvents, likedEvents, toggleSaveEvent, toggleLikeEvent } = useApp();
  
  const isSaved = savedEvents.includes(event.slug);
  const isLiked = likedEvents.includes(event.slug);

  const priceText = !event.isPaid || (event.tickets && event.tickets[0]?.price === 0) 
    ? 'FREE' 
    : `₹${event.tickets?.[0]?.price || 200}`;

  const bannerImg = event.bannerImages?.[0] || 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/55392a78-124c-4139-982b-2f3fcfdb6252-WhatsApp-Image-2026-08-31-at-9.37.06-PM.webp';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Card Poster Area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={bannerImg}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <Badge variant="purple" size="sm" className="backdrop-blur-md bg-white/90 font-bold">
            {event.mode}
          </Badge>
          {event.eventTypeName && (
            <Badge variant="neutral" size="sm" className="backdrop-blur-md bg-white/90">
              {event.eventTypeName}
            </Badge>
          )}
        </div>

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleLikeEvent(event.slug);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${isLiked ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
            aria-label="Like Event"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSaveEvent(event.slug);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${isSaved ? 'bg-brand-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
            aria-label="Save Event"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price & Date Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-extrabold text-sm px-2.5 py-1 rounded-lg bg-brand-500/90 backdrop-blur-md shadow-sm">
            {priceText}
          </span>
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[11px]">
            <Calendar className="w-3 h-3 text-brand-300" />
            {event.calendars?.[0]?.startDate?.split(',')[0] || 'Upcoming'}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Organizer & College info */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-slate-700 truncate">{event.org?.organizationName || 'Verified College Organizers'}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          </div>

          {/* Event Title */}
          <Link to={`/events/${event.slug}`} className="block group-hover:text-brand-600 transition-colors">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 leading-snug">
              {event.title}
            </h3>
          </Link>
        </div>

        {/* Venue / City */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{event.location?.venue || event.location?.city || 'Virtual Meet'}</span>
        </div>

        {/* AI Suitability Callout */}
        {showAiMatch && event.aiSuitabilityReason && (
          <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100/80 flex items-start gap-1.5 text-[11px] text-purple-900 leading-tight">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{event.aiSuitabilityReason}</span>
          </div>
        )}

        {/* Footer info & CTA button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
            <Users className="w-3.5 h-3.5" />
            <span>{event.viewCount || 240} views</span>
          </div>
          <Link
            to={`/events/${event.slug}`}
            className="font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group/btn"
          >
            Details <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
