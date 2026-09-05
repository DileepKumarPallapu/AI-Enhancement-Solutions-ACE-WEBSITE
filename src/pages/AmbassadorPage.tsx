import React from 'react';
import { Award, Users, Trophy, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AmbassadorPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-800 via-brand-700 to-indigo-900 text-white p-8 sm:p-12 shadow-2xl text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase backdrop-blur-md">
          Campus Ambassador Program 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Lead the Tech Movement in Your College</h1>
        <p className="text-xs sm:text-sm text-purple-100 max-w-xl mx-auto leading-relaxed">
          Represent AllCollegeEvent, organize local campus fests, refer students, and earn verified leadership certificates, stipend incentives, and VIP perks.
        </p>
        <div className="pt-2">
          <Button variant="secondary" size="lg">
            Apply as Campus Ambassador
          </Button>
        </div>
      </div>

      {/* Leaderboard */}
      <div id="leaderboard" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> National Ambassador Leaderboard
        </h3>
        <div className="divide-y divide-slate-100 text-xs">
          {[
            { rank: '1', name: 'Arun Kumar', college: 'PSG College of Technology', points: '1,420 XP', referrals: '48 Students' },
            { rank: '2', name: 'Pallapu Dileep Kumar', college: 'Hindustan Institute of Technology', points: '980 XP', referrals: '15 Students' },
            { rank: '3', name: 'Sneha R', college: 'SSN College of Engineering', points: '860 XP', referrals: '22 Students' }
          ].map(amb => (
            <div key={amb.rank} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-xs">
                  {amb.rank}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{amb.name}</h4>
                  <p className="text-[11px] text-slate-400">{amb.college}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-brand-600 text-sm block">{amb.points}</span>
                <span className="text-[10px] text-slate-400">{amb.referrals}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
