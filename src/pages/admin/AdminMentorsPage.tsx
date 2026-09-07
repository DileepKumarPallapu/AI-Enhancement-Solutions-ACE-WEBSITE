import React from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { ShieldCheck, CheckCircle2, Award, Clock, ArrowLeft, Users } from 'lucide-react';

export const AdminMentorsPage: React.FC = () => {
  const { collegeMentors } = useMentor();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div>
          <Link to="/admin" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Admin Security Center
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Platform-Wide Mentor Governance & Verification</h1>
          <p className="text-xs text-slate-400 mt-1">Review pending mentor applications, audit verified badges, and inspect capacity limits.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-white">All Verified Mentors Across Colleges</h3>
          
          <div className="space-y-3">
            {collegeMentors.map(m => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={m.avatarUrl} alt={m.fullName} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-white">{m.fullName}</h4>
                    <p className="text-[11px] text-slate-400">{m.collegeName} • {m.department}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
