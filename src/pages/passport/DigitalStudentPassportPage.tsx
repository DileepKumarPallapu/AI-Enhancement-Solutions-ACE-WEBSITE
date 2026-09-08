import React, { useState } from 'react';
import { digitalPassportDatabase, DigitalStudentPassport } from '../../services/db/digitalPassportDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { ShieldCheck, Award, BookOpen, Terminal, Trophy, UserCheck, QrCode, ArrowRight, CheckCircle2, Lock, Share2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DigitalStudentPassportPage() {
  const passport = digitalPassportDatabase.getPassport();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SKILLS' | 'PROJECTS' | 'ACHIEVEMENTS' | 'TIMELINE' | 'VERIFICATION'>('OVERVIEW');

  const { student, completenessPercentage, reputationSignals, skills, projects, achievements, timeline } = passport;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Passport Header */}
        <ACEPageHeader
          title={`Digital Student Passport — ${student.profile.firstName} ${student.profile.lastName}`}
          description={`Canonical Student Identity • ${student.institution.name} • Dept: ${student.profile.department}`}
          badge="VERIFIED PASSPORT v80X"
          actions={
            <div className="flex gap-3">
              <Link to="/student/resume">
                <ACEButton variant="outline" size="sm" className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> ATS Resume
                </ACEButton>
              </Link>
              <Link to="/student/portfolio">
                <ACEButton variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Portfolio
                </ACEButton>
              </Link>
              <Link to="/student/id">
                <ACEButton variant="primary" size="sm" className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" /> Digital ID
                </ACEButton>
              </Link>
            </div>
          }
        />

        {/* Reputation & Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completeness</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{completenessPercentage}%</div>
            <div className="text-[11px] text-slate-500 mt-1">Calculated score</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Skills</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{reputationSignals.verifiedSkillsCount}</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">100% Proven</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{reputationSignals.verifiedProjectsCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Mentor verified</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hackathons</div>
            <div className="text-2xl font-bold text-amber-500 mt-1">{reputationSignals.competitionWinsCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">1st Place wins</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Endorsements</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{reputationSignals.mentorEndorsementsCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">Faculty & Lab</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attestation</div>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Vel Tech
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Enrolled 2026</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 overflow-x-auto">
          {(['OVERVIEW', 'SKILLS', 'PROJECTS', 'ACHIEVEMENTS', 'TIMELINE'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-medium text-sm border-b-2 transition-colors shrink-0 ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              <ACECard title="Canonical Student Profile">
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</div>
                      <div className="font-bold text-slate-900 dark:text-white mt-0.5">{student.profile.firstName} {student.profile.lastName}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Institutional Roll</div>
                      <div className="font-mono text-slate-900 dark:text-white mt-0.5">VTU-2023-CSE-042</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Program & Department</div>
                      <div className="text-slate-800 dark:text-slate-200 mt-0.5">{student.profile.program} • {student.profile.department}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Standing</div>
                      <div className="text-slate-800 dark:text-slate-200 mt-0.5">{student.profile.year} (Graduation 2027)</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bio & Engineering Vision</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{student.profile.bio}</p>
                  </div>
                </div>
              </ACECard>

              <ACECard title="Verified Competency Matrix">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.slice(0, 4).map((s) => (
                    <div key={s.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</span>
                        <ACEBadge variant="success">{s.status}</ACEBadge>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{s.evidenceSource}</div>
                    </div>
                  ))}
                </div>
              </ACECard>

            </div>

            {/* Right Rail: Credentials & Security */}
            <div className="space-y-6">
              <ACECard title="Cryptographic Credentials">
                <p className="text-xs text-slate-500 mb-3">
                  Digitally signed credentials issued by Vel Tech and institutional partners.
                </p>
                <div className="space-y-2">
                  <Link to="/student/credentials">
                    <ACEButton variant="outline" size="sm" className="w-full justify-center">
                      Open Credential Wallet
                    </ACEButton>
                  </Link>
                  <Link to="/student/privacy">
                    <ACEButton variant="outline" size="sm" className="w-full justify-center">
                      Manage Passport Privacy
                    </ACEButton>
                  </Link>
                </div>
              </ACECard>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'SKILLS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{s.name}</h4>
                    <ACEBadge variant={s.status === 'VERIFIED' ? 'success' : s.status === 'ASSESSED' ? 'primary' : 'neutral'}>
                      {s.status}
                    </ACEBadge>
                  </div>
                  <div className="text-xs text-slate-500">Target Role: <strong>{s.relatedRole}</strong> • Level: <strong>{s.level}</strong></div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Evidence Trail:</div>
                    <div className="text-slate-600 dark:text-slate-400">{s.evidenceSource}</div>
                    {s.verifiedBy && (
                      <div className="text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                        ✓ Verified by: {s.verifiedBy}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'PROJECTS' && (
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <ACEBadge variant="primary">{p.status.replace(/_/g, ' ')}</ACEBadge>
                  <ACEBadge variant="success">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {p.verificationSource.replace(/_/g, ' ')}
                  </ACEBadge>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Role: {p.role} • Verified by: {p.verifiedBy || 'Institution Council'}</p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    View GitHub Repository →
                  </a>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                      Live Production Site →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'ACHIEVEMENTS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach) => (
              <div key={ach.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <ACEBadge variant="primary">{ach.category}</ACEBadge>
                  <span className="text-xs text-slate-500">{ach.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{ach.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{ach.description}</p>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Issuer: {ach.issuer}</div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'TIMELINE' && (
          <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900 ml-4 space-y-6 py-4">
            {timeline.map((item) => (
              <div key={item.id} className="relative pl-6">
                <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <ACEBadge variant="primary">{item.category}</ACEBadge>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
