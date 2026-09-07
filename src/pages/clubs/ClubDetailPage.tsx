import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, Building2, ShieldCheck, ExternalLink, Github, Mail, Globe } from 'lucide-react';
import { clubDb } from '../../services/db/clubDatabase';
import { useAuth } from '../../context/AuthContext';

export const ClubDetailPage: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';

  const club = clubDb.getById(clubId || 'club_veltech_ai');
  if (!club) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          <img src={club.bannerUrl} alt={club.name} className="w-full h-56 object-cover" />
          <div className="p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase">
                  {club.category}
                </span>
                <h1 className="text-2xl font-bold text-white mt-2">{club.name}</h1>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <Building2 className="w-3.5 h-3.5" /> {club.institutionName}
                </p>
              </div>

              <button className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-lg shadow-emerald-900/30">
                Member Joined ✓
              </button>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed pt-2">{club.description}</p>
          </div>
        </div>

        {/* Leadership & Core Members */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white">Chapter Leaders & Core Builders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {club.members.map(m => (
              <div key={m.userId} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <img src={m.avatarUrl} alt={m.fullName} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="text-xs font-bold text-white">{m.displayName}</h3>
                  <span className="text-[10px] text-emerald-400 font-semibold">{m.role.replace('_', ' ')}</span>
                  <span className="block text-[9px] text-slate-500 mt-0.5">Joined {new Date(m.joinedAt).getFullYear()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
