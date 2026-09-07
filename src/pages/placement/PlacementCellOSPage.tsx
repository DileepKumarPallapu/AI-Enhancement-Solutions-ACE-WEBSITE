import React, { useState } from 'react';
import { placementOSDatabase, CampusDrive } from '../../services/db/placementOSDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { Briefcase, CheckCircle2, XCircle, Users, ArrowRight } from 'lucide-react';

export function PlacementCellOSPage() {
  const drives = placementOSDatabase.getCampusDrives();
  const [selectedDrive, setSelectedDrive] = useState<CampusDrive>(drives[0]);

  // Test student profile from canonical state
  const studentSample = {
    department: 'Computer Science & Engineering',
    cgpa: 8.9,
    graduationYear: 2027,
    currentBacklogs: 0,
    skills: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
  };

  const eligibility = placementOSDatabase.evaluateStudentEligibility(selectedDrive, studentSample);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title="Placement Cell Operating System"
          description="Campus hiring drives, automated eligibility generation, applicant tracking, and offer validation."
          badge="PLACEMENT CELL"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Drives List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Active Campus Drives</h3>
            <div className="space-y-3">
              {drives.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDrive(d)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedDrive.id === d.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{d.companyName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedDrive.id === d.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {d.driveType}
                    </span>
                  </div>
                  <div className={`text-xs mt-1 font-semibold truncate ${selectedDrive.id === d.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {d.role}
                  </div>
                  <div className={`text-xs mt-2 flex justify-between ${selectedDrive.id === d.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                    <span>{d.ctcOrStipend}</span>
                    <span>Stage: {d.currentStage}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Drive Detail & Eligibility Engine */}
          <div className="lg:col-span-2 space-y-6">
            
            <ACECard title={`${selectedDrive.companyName} — Campus Drive`} badge={selectedDrive.currentStage}>
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{selectedDrive.role}</h4>
                  <p className="text-xs text-slate-500">{selectedDrive.location} • Compensation: {selectedDrive.ctcOrStipend}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="text-xs text-slate-500">Applicants</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{selectedDrive.totalApplicants}</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="text-xs text-slate-500">Shortlisted</div>
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{selectedDrive.shortlistedCount}</div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="text-xs text-slate-500">Offers Extended</div>
                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedDrive.offersIssued}</div>
                  </div>
                </div>
              </div>
            </ACECard>

            {/* Real Eligibility Engine Validation */}
            <ACECard title="Eligibility Engine Check (For Dileep Kumar)">
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  eligibility.isEligible
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                    : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300'
                }`}>
                  <div className="flex items-center gap-2">
                    {eligibility.isEligible ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                    <span className="font-bold text-sm">
                      {eligibility.isEligible ? 'ELIGIBLE TO APPLY' : 'CRITERIA NOT MET'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold">Deterministic Policy v70X</span>
                </div>

                <div className="space-y-2">
                  {eligibility.criteriaChecks.map((check, idx) => (
                    <div key={idx} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {check.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                        <span className="font-bold text-slate-800 dark:text-slate-200">{check.criteria}</span>
                      </div>
                      <span className="text-slate-500">{check.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ACECard>

          </div>

        </div>

      </div>
    </div>
  );
}
