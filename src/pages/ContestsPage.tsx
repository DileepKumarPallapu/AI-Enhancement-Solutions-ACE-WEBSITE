import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { fallbackContests } from '../services/api';
import { Button } from '../components/ui/Button';

export const ContestsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          National Contests & Hackathons
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Compete in nationwide engineering challenges, submit projects, and win from ₹15L+ cash pools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fallbackContests.map(c => (
          <div key={c.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full bg-slate-100 relative overflow-hidden">
                <img src={c.bannerImage} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-brand-500 text-white font-bold text-xs px-2.5 py-1 rounded-lg">
                  {c.prizePool} Prize Pool
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <span className="text-[11px] font-bold text-purple-600 uppercase">{c.category}</span>
                <h3 className="font-extrabold text-slate-900 text-lg">{c.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{c.subtitle}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>{c.participantsCount} Registered</span>
                  <span>{c.mode}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button variant="primary" size="md" className="w-full">
                Register for Challenge →
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
