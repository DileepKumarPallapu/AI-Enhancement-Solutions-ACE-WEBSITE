import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Trophy, Calendar, MapPin, Sparkles, Filter, Users, ShieldCheck, Flame, ArrowRight, Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';

export const HackathonsPage: React.FC = () => {
  const { events, savedEvents, toggleSaveEvent } = useApp();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedTheme, setSelectedTheme] = useState('ALL');
  const [selectedMode, setSelectedMode] = useState('ALL');

  const themes = ['ALL', 'Artificial Intelligence', 'Web3 & Blockchain', 'Cybersecurity', 'Cloud & DevOps', 'FinTech', 'Sustainability'];

  const hackathons = [
    {
      id: 'hackverse-2-0',
      title: 'HACKVERSE 2.0 – 24 Hour National Hackathon',
      slug: 'hackverse-2-0-20260901-051234',
      organizer: 'Karpagam College of Engineering',
      prizePool: '₹1,00,000',
      deadline: 'Sep 20, 2026',
      date: 'Sep 25-26, 2026',
      teamSize: '2-4 Members',
      mode: 'OFFLINE',
      city: 'Coimbatore',
      themes: ['AI/ML', 'Web3', 'Smart Cities'],
      banner: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/b9228fbd-8694-44c7-94f7-d1b80968788c-Screenshot-2026-08-31-at-3.00.07-PM.webp',
      matchScore: 98,
      isBeginnerFriendly: true
    },
    {
      id: 'hacknima-2026',
      title: 'Hacknima 2026 – AI Agentic Innovation Challenge',
      slug: 'hacknima2026s',
      organizer: 'ECLearnix & AllCollegeEvent',
      prizePool: '₹1,50,000',
      deadline: 'Sep 30, 2026',
      date: 'Sep 10 - 30, 2026',
      teamSize: '1-4 Members',
      mode: 'ONLINE',
      city: 'Virtual',
      themes: ['Agentic AI', 'RAG', 'Autonomous Systems'],
      banner: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/dc2fbcf2-dd8e-42ac-aa31-ce823bc52ea9-ECLearnix---Hero-Section-Banners-%282%29.png',
      matchScore: 95,
      isBeginnerFriendly: true
    },
    {
      id: 'hackiton-26',
      title: "HackITon'26 – 36 Hour State Level Hackathon",
      slug: 'hackiton-26-kpr',
      organizer: 'KPR Institute of Engineering and Technology',
      prizePool: '₹75,000',
      deadline: 'Oct 01, 2026',
      date: 'Oct 08-09, 2026',
      teamSize: '3-4 Members',
      mode: 'OFFLINE',
      city: 'Coimbatore',
      themes: ['FinTech', 'Cybersecurity', 'ClimateTech'],
      banner: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/03da95b0-bc50-4c73-85d0-64580105e0e9-Screenshot-2026-08-31-at-2.37.32-PM.webp',
      matchScore: 92,
      isBeginnerFriendly: false
    }
  ];

  const handleToggleSave = (slug: string) => {
    toggleSaveEvent(slug);
    showToast(savedEvents.includes(slug) ? 'Hackathon removed from saved' : 'Hackathon saved to your list ✓');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Top Heading */}
      <PageHeader
        eyebrow="HACKATHONS"
        title="Build. Compete."
        highlight="Win."
        subtitle="Discover national 24h/36h hackathons, form dream student teams, and compete for ₹15L+ in prize pools and fast-track internships."
        badge={
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> 18 Active Challenges
          </span>
        }
        actions={
          <Link to="/organizer/create">
            <Button variant="primary" size="md">
              + Host a Hackathon
            </Button>
          </Link>
        }
      />

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {themes.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTheme(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTheme === t ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'ONLINE', 'OFFLINE'].map(m => (
            <button
              key={m}
              onClick={() => setSelectedMode(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                selectedMode === m ? 'bg-purple-100 dark:bg-purple-950 text-brand-700 dark:text-brand-300 font-bold' : 'text-slate-500'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hackathons.map(h => (
          <div key={h.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Poster Banner */}
              <div className="aspect-[16/9] w-full bg-slate-100 relative overflow-hidden">
                <img src={h.banner} alt={h.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white font-bold text-xs">
                    {h.mode}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-black text-xs shadow-sm">
                    {h.prizePool}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleSave(h.slug)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
                >
                  <Bookmark className={`w-4 h-4 ${savedEvents.includes(h.slug) ? 'fill-current text-brand-400' : ''}`} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{h.organizer}</span>
                  <span className="text-brand-600 dark:text-brand-400 font-bold">{h.matchScore}% Match</span>
                </div>

                <Link to={`/events/${h.slug}`} className="block group-hover:text-brand-600 transition-colors">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base line-clamp-2">{h.title}</h3>
                </Link>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {h.themes.map((th, i) => (
                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {th}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="text-[10px] block text-slate-400">Deadline</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{h.deadline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] block text-slate-400">Team Size</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{h.teamSize}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-2">
              <Link to={`/events/${h.slug}`} className="flex-1">
                <Button variant="primary" size="sm" className="w-full">
                  View Details & Team →
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
