import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  Trophy, 
  Award, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Globe, 
  Building2, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles,
  Code2,
  Users
} from 'lucide-react';
import { digitalIdDb } from '../../services/db/digitalIdDatabase';
import { skillEvidenceDb } from '../../services/db/skillEvidenceDatabase';
import { achievementDb } from '../../services/db/achievementDatabase';

export const StudentPortfolioPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const card = digitalIdDb.getByUserId('usr_student_dileep');
  const skills = skillEvidenceDb.getByUser('usr_student_dileep');
  const achievements = achievementDb.getUnlocked();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Hero Profile Header */}
        <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <img
              src={card?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
              alt={card?.fullName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-emerald-400 shadow-xl"
            />
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Student ID ({card?.aceId})
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                  Campus Ambassador
                </span>
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight">{card?.fullName || 'Dileep Kumar Pallapu'}</h1>
              <p className="text-sm text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                {card?.institutionName || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'}
              </p>
              <p className="text-xs text-slate-400">
                {card?.program} • Batch {card?.batchYear} • Avadi, Chennai, Tamil Nadu
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/career/resume"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-lg shadow-emerald-900/30"
              >
                View Verified Resume
              </a>
            </div>
          </div>
        </div>

        {/* Verified Skill Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" /> Multi-Tier Verified Skills & Evidence
            </h2>
            <span className="text-xs text-slate-400">7-State Cryptographic Proof</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map(s => (
              <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{s.category}</span>
                    <h3 className="text-base font-bold text-white">{s.skillName}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    {s.currentTier.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Confidence & Evidence Score</span>
                    <span className="font-bold text-white">{s.confidenceScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.confidenceScore}%` }} />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Evidence Chain:</span>
                  {s.evidenceChain.map(ev => (
                    <div key={ev.id} className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="truncate mr-2">
                        <span className="font-medium text-slate-200 block truncate">{ev.title}</span>
                        <span className="text-[10px] text-slate-400">{ev.scoreOrMetric || ev.type}</span>
                      </div>
                      {ev.url && (
                        <a href={ev.url} target="_blank" rel="noreferrer" className="text-emerald-400 shrink-0">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Achievements */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Platform Badges & Accreditations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {achievements.map(ach => (
              <div key={ach.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
                    {ach.tier} • {ach.points} PTS
                  </span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                <p className="text-xs text-slate-400">{ach.description}</p>
                {ach.evidenceSummary && (
                  <p className="text-[11px] text-emerald-400 pt-1 font-medium">{ach.evidenceSummary}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
