import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Heart, 
  Calendar, 
  Trophy, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Gift, 
  UserCheck,
  Clock,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { Button } from '../components/ui/Button';

export const StudentDashboardPage: React.FC = () => {
  const { user, events, savedEvents, likedEvents, registeredEvents } = useApp();
  const [activeTab, setActiveTab] = useState<'registered' | 'saved' | 'liked' | 'certificates'>('registered');

  const registeredItems = events.filter(e => registeredEvents.includes(e.slug));
  const savedItems = events.filter(e => savedEvents.includes(e.slug));
  const likedItems = events.filter(e => likedEvents.includes(e.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-purple-700 to-indigo-800 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{user.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-bold text-[10px]">VERIFIED</span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">{user.department} • {user.college}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard/profile">
            <Button variant="secondary" size="sm">
              Edit Preferences
            </Button>
          </Link>
          <Link to="/events">
            <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20">
              Discover More
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-brand-600 mb-2">
            <span className="text-xs font-bold text-slate-500">Registered</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900">{registeredEvents.length}</p>
          <span className="text-[11px] text-slate-400">Active passes</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <span className="text-xs font-bold text-slate-500">Saved Events</span>
            <Bookmark className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900">{savedEvents.length}</p>
          <span className="text-[11px] text-slate-400">Bookmarked</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-bold text-slate-500">Reward Points</span>
            <Gift className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900">{user.pointsEarned}</p>
          <span className="text-[11px] text-slate-400">Redeemable in perks</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-bold text-slate-500">Certificates</span>
            <Award className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900">2</p>
          <span className="text-[11px] text-slate-400">Verified digital certs</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('registered')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'registered' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Registered Passes ({registeredItems.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'saved' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Saved Bookmarks ({savedItems.length})
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'liked' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Liked Events ({likedItems.length})
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'certificates' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Earned Certificates
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'registered' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredItems.length === 0 ? (
            <p className="text-xs text-slate-500 col-span-3 py-8 text-center">No registered events yet. Explore events to grab a pass!</p>
          ) : (
            registeredItems.map(event => (
              <EventCard key={event.identity} event={event} showAiMatch={false} />
            ))
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.length === 0 ? (
            <p className="text-xs text-slate-500 col-span-3 py-8 text-center">No saved events.</p>
          ) : (
            savedItems.map(event => (
              <EventCard key={event.identity} event={event} showAiMatch={false} />
            ))
          )}
        </div>
      )}

      {activeTab === 'liked' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedItems.length === 0 ? (
            <p className="text-xs text-slate-500 col-span-3 py-8 text-center">No liked events.</p>
          ) : (
            likedItems.map(event => (
              <EventCard key={event.identity} event={event} showAiMatch={false} />
            ))
          )}
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">National AI Hackathon Certificate</h4>
              <p className="text-xs text-slate-500">Issued by Karpagam College of Engineering</p>
              <span className="text-[10px] font-mono text-slate-400 block mt-1">ID: ACE-CERT-884920</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
