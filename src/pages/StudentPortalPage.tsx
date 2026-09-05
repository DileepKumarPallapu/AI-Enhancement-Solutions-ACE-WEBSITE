import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Bookmark, Award, Calendar, Flame, Compass, ArrowRight, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { EventCard } from '../components/events/EventCard';
import { Button } from '../components/ui/Button';

export const StudentPortalPage: React.FC<{ onOpenAiChat: () => void }> = ({ onOpenAiChat }) => {
  const { user, events, registeredEvents, savedEvents } = useApp();

  const registeredList = events.filter(e => registeredEvents.includes(e.slug));
  const savedList = events.filter(e => savedEvents.includes(e.slug));
  const recommendedList = events.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Student Portal Header */}
      <PageHeader
        eyebrow="STUDENT OPPORTUNITY HUB"
        title="Welcome back,"
        highlight={user.name.split(' ')[0]}
        subtitle={`Personalized intelligence stream mapped to ${user.department} at ${user.college}.`}
        badge={
          <span className="px-3 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" /> Verified Student • {user.pointsEarned} ACE Pts
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Button variant="ai" size="md" onClick={onOpenAiChat} icon={<Sparkles className="w-4 h-4" />}>
              Ask ACE AI
            </Button>
            <Link to="/events">
              <Button variant="primary" size="md" icon={<Compass className="w-4 h-4" />}>
                Explore All Events
              </Button>
            </Link>
          </div>
        }
      />

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Registered Passes</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{registeredList.length}</p>
          <span className="text-[11px] text-emerald-600 font-bold">QR Passes Active</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Saved Events</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{savedList.length}</p>
          <span className="text-[11px] text-brand-600 font-bold">Watchlist</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Verified Certificates</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">2</p>
          <span className="text-[11px] text-purple-600 font-bold">Issued by Hosts</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">ACE Reward Points</span>
          <p className="text-2xl font-black text-brand-600 mt-1">{user.pointsEarned}</p>
          <span className="text-[11px] text-amber-600 font-bold">Redeem Vouchers</span>
        </div>
      </div>

      {/* Recommended For You */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" /> Recommended For You
            </h2>
            <p className="text-xs text-slate-500">Based on your CSE department and coding interests</p>
          </div>
          <Link to="/for-you" className="text-xs font-bold text-brand-600 hover:underline">
            View Full Stream →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendedList.map(e => (
            <EventCard key={e.identity} event={e} showAiMatch={true} />
          ))}
        </div>
      </section>

    </div>
  );
};
