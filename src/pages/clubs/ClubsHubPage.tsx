import React, { useState } from 'react';
import { Users, Building2, ShieldCheck, ExternalLink, Plus, Sparkles } from 'lucide-react';
import { clubDb, StudentClub } from '../../services/db/clubDatabase';
import { useAuth } from '../../context/AuthContext';

export const ClubsHubPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  
  const clubs = clubDb.getAll();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-400" /> Student Chapters & Tech Societies
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Join active developer circles, robotics labs, and AI chapters directly bound to verified university campuses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map(club => (
            <div key={club.id} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between">
              <img src={club.bannerUrl} alt={club.name} className="w-full h-36 object-cover" />
              
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">{club.category}</span>
                    <span className="text-xs text-slate-400">{club.memberCount} Members</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{club.name}</h3>
                  <p className="text-xs text-slate-400">{club.tagline}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 truncate max-w-[140px]">{club.institutionName.split(' ')[0]}</span>
                  <a
                    href={`/clubs/${club.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
                  >
                    View Chapter →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
