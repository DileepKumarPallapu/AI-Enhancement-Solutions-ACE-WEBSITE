import React, { useState } from 'react';
import { recruiterOSDatabase, CandidateApplication } from '../../services/db/recruiterOSDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Search, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

export function RecruiterOSDashboardPage() {
  const [candidates, setCandidates] = useState<CandidateApplication[]>(recruiterOSDatabase.getCandidates());

  const handleStatus = (id: string, status: CandidateApplication['status']) => {
    recruiterOSDatabase.updateCandidateStatus(id, status);
    setCandidates(recruiterOSDatabase.getCandidates());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Recruiter Command Center"
          description="Evidence-backed talent discovery, verified skill verification, and campus drive applicant triage."
          badge="RECRUITER OS"
        />

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Candidate Pipeline ({candidates.length})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidates.map((cand) => (
              <div key={cand.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <ACEBadge variant={cand.status === 'SHORTLISTED' ? 'success' : 'primary'}>
                    {cand.status}
                  </ACEBadge>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {cand.matchScore}% Role Match
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{cand.studentName}</h4>
                  <p className="text-xs text-slate-500">{cand.department} • CGPA: {cand.cgpa}</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium truncate mt-0.5">{cand.institutionName}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verified Skills & Projects</div>
                  <div className="flex flex-wrap gap-1">
                    {cand.verifiedSkills.map((s, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500">
                    {cand.verifiedProjectsCount} Verified Production Projects in Lab
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Applied: {new Date(cand.appliedDate).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <ACEButton
                      variant={cand.status === 'SHORTLISTED' ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => handleStatus(cand.id, cand.status === 'SHORTLISTED' ? 'APPLIED' : 'SHORTLISTED')}
                    >
                      {cand.status === 'SHORTLISTED' ? 'Undo Shortlist' : 'Shortlist'}
                    </ACEButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
