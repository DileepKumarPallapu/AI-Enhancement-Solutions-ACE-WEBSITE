import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Bookmark, Sparkles, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { ACEBadge } from './ACEBadge';
import { ACEButton } from './ACEButton';

export interface ACEEventCardProps {
  id: string;
  slug?: string;
  title: string;
  category: string;
  imageUrl?: string;
  provider: string;
  location?: string;
  mode?: 'ONLINE' | 'IN_PERSON' | 'HYBRID';
  date: string;
  deadline?: string;
  price?: string | number;
  verified?: boolean;
  featured?: boolean;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  variant?: 'standard' | 'compact' | 'horizontal' | 'featured';
}

export const ACEEventCard: React.FC<ACEEventCardProps> = ({
  id,
  slug,
  title,
  category,
  imageUrl = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  provider,
  location = 'Vel Tech Campus / Online',
  mode = 'HYBRID',
  date,
  deadline,
  price = 'Free',
  verified = true,
  featured = false,
  isSaved = false,
  onToggleSave,
  variant = 'standard'
}) => {
  const targetUrl = `/events/${slug || id}`;

  if (variant === 'horizontal') {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden relative flex-shrink-0 bg-slate-100 dark:bg-slate-800">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2">
            <ACEBadge variant="primary" size="sm">{category}</ACEBadge>
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{provider}</span>
            {verified && <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white truncate hover:text-indigo-600">
            <Link to={targetUrl}>{title}</Link>
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {date}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {location}</span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 w-full sm:w-auto">
          <div className="text-right sm:text-center">
            <span className="text-xs font-bold text-emerald-600">{price === 0 || price === 'Free' ? 'FREE' : price}</span>
          </div>
          <Link to={targetUrl} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-xs">
            View Event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-3xl border ${featured ? 'border-indigo-400 dark:border-indigo-600 shadow-md ring-1 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 shadow-sm'} overflow-hidden hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition flex flex-col group`}>
      {/* 16:9 Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <ACEBadge variant="primary" size="sm">{category}</ACEBadge>
          {featured && (
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(id)}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition ${
              isSaved
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900/60 text-white hover:bg-slate-900/90'
            }`}
            title={isSaved ? 'Saved to Bookmarks' : 'Save Event'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        )}

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white/90">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date}</span>
          <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs font-bold">{mode}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{provider}</span>
            {verified && <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors">
            <Link to={targetUrl}>{title}</Link>
          </h3>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Entry</div>
            <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              {price === 0 || price === 'Free' ? 'FREE' : price}
            </div>
          </div>

          <Link
            to={targetUrl}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
