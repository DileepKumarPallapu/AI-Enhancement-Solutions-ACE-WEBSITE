import React, { useState, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, Clock, ShieldCheck, ArrowRight, 
  Coins, GraduationCap, Compass, Briefcase, Award, Users, BookOpen
} from 'lucide-react';
import { aceSuperPlatformDatabase, UniversalHomeData } from '../../services/db/aceSuperPlatformDatabase';
import { ACEBadge } from '../../components/ui/ace';
import { Link } from 'react-router-dom';

export const UniversalHomePage: React.FC = () => {
  const [data, setData] = useState<UniversalHomeData>(aceSuperPlatformDatabase.getUniversalHomeData());

  useEffect(() => {
    const unsub = aceSuperPlatformDatabase.subscribe(() => {
      setData(aceSuperPlatformDatabase.getUniversalHomeData());
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Personalized Welcome */}
        <div className="p-6 md:p-10 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> ACE 150X Universal Super Platform
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {data.student.institution}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white">
              Good morning, {data.student.name.split(' ')[0]}!
            </h1>
            <p className="text-sm md:text-base text-slate-300">
              {data.student.department} • CGPA {data.student.cgpa} • Profile Completion: <span className="text-emerald-400 font-bold">{data.completenessPercentage}%</span>
            </p>
          </div>

          {/* Wallet Balance Widget */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shrink-0">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" /> ACE Coin Wallet
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {data.walletBalanceCoins.toLocaleString()} <span className="text-xs text-amber-400 font-normal">Coins</span>
            </div>
            <div className="text-xs text-emerald-400 font-mono font-semibold">
              ≈ ₹{data.walletBalanceINR.toFixed(2)} INR (Fixed 100 Coins = ₹1)
            </div>
          </div>
        </div>

        {/* Quick Nav Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link to="/command-center" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-center space-y-1">
            <Compass className="w-5 h-5 text-indigo-400 mx-auto" />
            <div className="text-xs font-bold text-white">Command Center</div>
            <div className="text-[10px] text-slate-400">Daily orchestration</div>
          </Link>
          <Link to="/discover" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-center space-y-1">
            <Sparkles className="w-5 h-5 text-yellow-400 mx-auto" />
            <div className="text-xs font-bold text-white">Discover Feed</div>
            <div className="text-[10px] text-slate-400">Explainable AI match</div>
          </Link>
          <Link to="/applications" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-center space-y-1">
            <Briefcase className="w-5 h-5 text-blue-400 mx-auto" />
            <div className="text-xs font-bold text-white">Application OS</div>
            <div className="text-[10px] text-slate-400">{data.activeApplicationsCount} Active pipelines</div>
          </Link>
          <Link to="/career" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-center space-y-1">
            <Award className="w-5 h-5 text-purple-400 mx-auto" />
            <div className="text-xs font-bold text-white">Career OS</div>
            <div className="text-[10px] text-slate-400">Simulator & gaps</div>
          </Link>
          <Link to="/skills" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-center space-y-1">
            <BookOpen className="w-5 h-5 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-white">Skill Graph</div>
            <div className="text-[10px] text-slate-400">{data.verifiedSkillsCount} Verified skills</div>
          </Link>
          <Link to="/projects/lab" className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-center space-y-1">
            <GraduationCap className="w-5 h-5 text-teal-400 mx-auto" />
            <div className="text-xs font-bold text-white">Project Lab</div>
            <div className="text-[10px] text-slate-400">{data.activeProjectsCount} Active repos</div>
          </Link>
        </div>

        {/* Priority Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Priorities */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Today's Action Priorities
              </h2>
              <Link to="/tasks" className="text-xs text-indigo-400 hover:underline">View All Tasks</Link>
            </div>

            <div className="space-y-3">
              {data.todayPriorities.map(p => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">{p.category}</span>
                      {p.isUrgent && <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">URGENT</span>}
                    </div>
                    <h3 className="font-bold text-white text-sm mt-0.5">{p.title}</h3>
                  </div>
                  <Link to={p.actionUrl} className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold">
                    Action →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Mentor Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" /> Faculty Mentor (Vel Tech)
            </h2>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-sm">{data.assignedMentor.name}</h3>
              <p className="text-xs text-purple-400">{data.assignedMentor.designation}</p>
              <p className="text-xs text-slate-400">{data.assignedMentor.department}</p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                <span className="text-emerald-400 font-semibold">{data.assignedMentor.status}</span>
                <Link to="/messages" className="text-indigo-400 font-bold hover:underline">Send Message</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Opportunities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" /> Recommended For You (Explainable AI Match)
            </h2>
            <Link to="/discover" className="text-xs text-indigo-400 hover:underline">Explore All Feed</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.recommendedOpportunities.map(opp => (
              <div key={opp.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{opp.provider}</span>
                    <ACEBadge variant="success">Trust {opp.trustScore}%</ACEBadge>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{opp.title}</h3>
                  <div className="p-2.5 rounded-xl bg-slate-950 text-xs text-indigo-300 font-medium">
                    💡 {opp.matchReason}
                  </div>
                </div>
                <Link to={opp.actionUrl} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold text-center">
                  Review & Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
