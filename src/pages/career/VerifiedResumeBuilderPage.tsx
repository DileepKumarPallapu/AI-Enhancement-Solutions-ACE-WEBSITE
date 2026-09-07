import React, { useState, useEffect } from 'react';
import { Download, Eye, ShieldCheck, CheckCircle2, Building2, Sparkles, Code2, Award, Briefcase } from 'lucide-react';
import { careerDb, VerifiedResumeProfile } from '../../services/db/careerDatabase';
import { digitalIdDb } from '../../services/db/digitalIdDatabase';
import { skillEvidenceDb } from '../../services/db/skillEvidenceDatabase';
import { useAuth } from '../../context/AuthContext';

export const VerifiedResumeBuilderPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';
  
  const [profile, setProfile] = useState<VerifiedResumeProfile>(careerDb.getResumeProfile(currentUserId));
  const card = digitalIdDb.getByUserId(currentUserId);
  const skills = skillEvidenceDb.getByUser(currentUserId);

  useEffect(() => {
    const unsub = careerDb.subscribe(() => {
      setProfile(careerDb.getResumeProfile(currentUserId));
    });
    return unsub;
  }, [currentUserId]);

  const handleToggleSection = (section: keyof VerifiedResumeProfile['sectionsVisibility']) => {
    careerDb.updateResumeProfile(currentUserId, {
      sectionsVisibility: {
        ...profile.sectionsVisibility,
        [section]: !profile.sectionsVisibility[section]
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Cryptographic Career Proof
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Verified Resume Builder</h1>
            <p className="text-slate-400 text-sm mt-1">
              Generate tamper-proof resumes with authenticated student identity and multi-tier skill evidence.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition shadow-lg shadow-emerald-900/30"
          >
            <Download className="w-4 h-4" /> Export Verified PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white">Section Visibility Controls</h3>
              <div className="space-y-2">
                {[
                  { key: 'aceIdBadge', label: 'ACE Verified Student ID' },
                  { key: 'institutionDetails', label: 'Vel Tech Academic Details' },
                  { key: 'skillEvidence', label: 'Multi-Tier Skill Evidence' },
                  { key: 'hackathonWins', label: 'Hackathon Track Records' },
                  { key: 'mentorEndorsements', label: 'Mentor Endorsements' },
                  { key: 'certificates', label: 'Verified Certificates' },
                  { key: 'contactDetails', label: 'Contact & Portfolio Links' }
                ].map(item => (
                  <label key={item.key} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium cursor-pointer">
                    <span className="text-slate-300">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={profile.sectionsVisibility[item.key as keyof typeof profile.sectionsVisibility]}
                      onChange={() => handleToggleSection(item.key as any)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Live Verified Resume Sheet */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl relative">
              
              {/* Top Banner */}
              <div className="border-b border-slate-800 pb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{card?.fullName || 'Dileep Kumar Pallapu'}</h2>
                  {profile.sectionsVisibility.aceIdBadge && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                      {card?.aceId || 'ACE-2026-VT9842'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-emerald-400 font-medium">{profile.headline}</p>
                <p className="text-xs text-slate-400">{profile.summary}</p>
              </div>

              {/* Institution */}
              {profile.sectionsVisibility.institutionDetails && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Education</h3>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white">{card?.institutionName}</h4>
                      <span className="text-xs text-slate-400">{card?.batchYear}</span>
                    </div>
                    <p className="text-xs text-emerald-400">{card?.program}</p>
                    <p className="text-xs text-slate-400">Current Semester: {card?.currentSemester} • Roll: {card?.rollNumber}</p>
                  </div>
                </div>
              )}

              {/* Skills */}
              {profile.sectionsVisibility.skillEvidence && (
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Verified Skill Evidence Chain</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skills.map(s => (
                      <div key={s.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white">{s.skillName}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">{s.currentTier.replace('_', ' ')}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {s.evidenceChain[0]?.title || 'Multi-round verified'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Footer */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Live Verifiable URL:
                </span>
                <span className="font-mono text-[11px] text-slate-400">{card?.verificationUrl}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
