import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Calendar, Briefcase, Trophy, BookOpen, 
  User, Award, ArrowRight, ShieldCheck, Flame, Coins, Clock 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { useNavigate } from 'react-router-dom';
import { studentPassportDb } from '../../services/db/studentPassportDatabase';
import { unifiedOpportunityDb } from '../../services/db/unifiedOpportunityDatabase';

export const StudentHomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const studentId = user?.id || 'usr_student_dileep';
  const passport = studentPassportDb.getByUserId(studentId);
  const opportunities = unifiedOpportunityDb.getAll();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Personalized Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Good morning, {passport?.fullName || 'Dileep'} 👋
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Student Command Center
            </h1>
            <p className="text-sm text-indigo-200">
              {passport?.program || 'B.Tech in Artificial Intelligence & Machine Learning'} • Class of 2026
            </p>
            <p className="text-xs text-slate-400">
              {passport?.institutionName || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ACEButton variant="primary" onClick={() => navigate('/student/passport')}>
              <ShieldCheck className="w-4 h-4" /> View Verified Passport
            </ACEButton>
            <ACEButton variant="outline" onClick={() => navigate('/feed')}>
              Explore Feed
            </ACEButton>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ACECard className="space-y-1">
            <span className="text-xs text-slate-400">Verified Skills</span>
            <div className="text-2xl font-bold text-white">{passport?.sections.skills.length || 4}</div>
            <span className="text-[11px] text-emerald-400">Level 7 TypeScript Verified</span>
          </ACECard>

          <ACECard className="space-y-1">
            <span className="text-xs text-slate-400">Active Applications</span>
            <div className="text-2xl font-bold text-indigo-400">2</div>
            <span className="text-[11px] text-slate-400">1 Interview Scheduled</span>
          </ACECard>

          <ACECard className="space-y-1">
            <span className="text-xs text-slate-400">Hackathon Rank</span>
            <div className="text-2xl font-bold text-amber-400">#1 Winner</div>
            <span className="text-[11px] text-amber-300">National AI Hackathon</span>
          </ACECard>

          <ACECard className="space-y-1">
            <span className="text-xs text-slate-400">ACE Wallet</span>
            <div className="text-2xl font-bold text-emerald-400">5,000 Coins</div>
            <span className="text-[11px] text-slate-400">≈ ₹50.00 INR Value</span>
          </ACECard>
        </div>

        {/* Priority Action Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                Recommended High-Impact Opportunities
              </h2>
              <button
                onClick={() => navigate('/opportunities')}
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View all ({opportunities.length}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => navigate(`/student/opportunities/${opp.id}`)}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={opp.providerLogoUrl} alt={opp.providerName} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold text-white text-sm">{opp.title}</h3>
                      <p className="text-xs text-indigo-400">{opp.providerName} • {opp.stipendOrPrize}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{opp.eligibility}</p>
                    </div>
                  </div>
                  <ACEBadge variant="success">Trust: {opp.trustScore}%</ACEBadge>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Upcoming Deadlines & Sessions
            </h2>

            <ACECard className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-400">Interview with Google Cloud Labs</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">March 15</span>
                </div>
                <p className="text-xs text-slate-300">AI Fellowship Technical Architecture Panel</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Mentor Lab Hours with Dr. Senthilkumar</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Tuesday 2:00 PM</span>
                </div>
                <p className="text-xs text-slate-300">Distributed AI Multi-Agent Capstone Review</p>
              </div>

              <ACEButton variant="outline" className="w-full text-xs" onClick={() => navigate('/interviews')}>
                Open Interview Center
              </ACEButton>
            </ACECard>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentHomePage;
