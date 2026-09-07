import React, { useState } from 'react';
import { collegeOSDatabase } from '../../services/db/collegeOSDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { School, Users, Briefcase, Calendar, ShieldCheck, Award, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CollegeOSPage() {
  const data = collegeOSDatabase.getCollegeData();
  const [activeTab, setActiveTab] = useState<'DEPARTMENTS' | 'STUDENTS' | 'METRICS'>('DEPARTMENTS');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title={`College Operating System — ${data.institution.shortName}`}
          description={`${data.institution.name} • AISHE Code: ${data.institution.aisheCode} • ${data.institution.city}`}
          badge="INSTITUTION OS"
          actions={
            <div className="flex gap-3">
              <Link to="/placement">
                <ACEButton variant="primary" size="sm">Placement Cell OS</ACEButton>
              </Link>
            </div>
          }
        />

        {/* Institutional Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Enrolled</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.metrics.totalEnrolledStudents}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Departments</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{data.metrics.activeDepartmentsCount}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Faculty</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.metrics.facultyMentorsCount}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Campus Drives</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{data.metrics.activeCampusDrives}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Clubs</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.metrics.activeClubsCount}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Registrations</div>
            <div className="text-2xl font-bold text-amber-500 mt-1">{data.metrics.totalEventRegistrations}</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('DEPARTMENTS')}
            className={`pb-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'DEPARTMENTS'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Academic Departments ({data.departments.length})
          </button>
          <button
            onClick={() => setActiveTab('STUDENTS')}
            className={`pb-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'STUDENTS'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Student Roster ({data.students.length})
          </button>
        </div>

        {/* Departments View */}
        {activeTab === 'DEPARTMENTS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.departments.map((dept) => (
              <div key={dept.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <ACEBadge variant="primary">{dept.code}</ACEBadge>
                  <span className="text-xs text-slate-500">{dept.totalStudents} Students</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{dept.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">HOD: {dept.hodName}</p>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Degree Programs:</div>
                  <ul className="list-disc list-inside">
                    {dept.programs.map((prog, pIdx) => (
                      <li key={pIdx}>{prog}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-500">{dept.totalFaculty} Faculty Members</span>
                  <Link to={`/college/departments/${dept.code.toLowerCase()}`}>
                    <ACEButton variant="outline" size="sm">Open Hub</ACEButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Student Roster View */}
        {activeTab === 'STUDENTS' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Roll Number</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Year</th>
                    <th className="p-3.5">CGPA</th>
                    <th className="p-3.5">Verified Skills</th>
                    <th className="p-3.5">Placement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {data.students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{st.name}</td>
                      <td className="p-3.5 font-mono">{st.rollNumber}</td>
                      <td className="p-3.5">{st.department}</td>
                      <td className="p-3.5">{st.year}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">{st.cgpa}</td>
                      <td className="p-3.5 text-indigo-600 dark:text-indigo-400 font-semibold">{st.verifiedSkillsCount} verified</td>
                      <td className="p-3.5">
                        <ACEBadge variant="success">{st.placementStatus}</ACEBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
