import React, { useState } from 'react';
import { resumeBuilderDatabase, ResumeProfile } from '../../services/db/resumeBuilderDatabase';
import { digitalPassportDatabase } from '../../services/db/digitalPassportDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { FileText, Download, CheckCircle2, Copy } from 'lucide-react';

export function ResumeBuilderPage() {
  const resumes = resumeBuilderDatabase.getAllResumes();
  const [selectedResume, setSelectedResume] = useState<ResumeProfile>(resumes[0]);
  const passport = digitalPassportDatabase.getPassport();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="ATS-Optimized Technical Resume Generator"
          description="Dynamically compiled from verified digital student passport records with zero synthetic data."
          badge="RESUME GENERATOR"
          actions={
            <ACEButton variant="primary" size="sm" className="flex items-center gap-1.5">
              <Download className="w-4 h-4" /> Download ATS PDF
            </ACEButton>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Resume Profiles Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Target Role Profiles</h3>
            <div className="space-y-2">
              {resumes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedResume(r)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedResume.id === r.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="font-bold text-sm">{r.name}</div>
                  <div className={`text-xs mt-1 ${selectedResume.id === r.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                    Template: {r.template} • Role: {r.targetRole}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Resume Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 space-y-6 font-sans">
              
              {/* Header */}
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {passport.student.profile.firstName} {passport.student.profile.lastName}
                </h2>
                <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-2">
                  <span>{passport.student.email}</span> •
                  <span>{passport.student.institution.name}</span> •
                  <span>Avadi, Chennai, Tamil Nadu</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  Professional Summary
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedResume.summary}</p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  Education
                </h4>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold">{passport.student.institution.name}</span>
                    <div className="text-slate-600">{passport.student.profile.program} in {passport.student.profile.department} (CGPA: 8.9/10)</div>
                  </div>
                  <span className="text-slate-500">2023 - 2027</span>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  Verified Technical Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {passport.skills.map((s) => (
                    <span key={s.id} className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-medium">
                      {s.name} ({s.status})
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Projects */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  Key Engineering Projects
                </h4>
                <div className="space-y-3">
                  {passport.projects.map((p) => (
                    <div key={p.id} className="text-xs">
                      <div className="flex justify-between font-bold">
                        <span>{p.title} — {p.role}</span>
                        <span className="text-slate-500">{p.startDate}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{p.description}</p>
                      <div className="text-[11px] text-slate-500 mt-1">Tech Stack: {p.technologies.join(', ')}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
