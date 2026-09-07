import React from 'react';
import { useParams } from 'react-router-dom';
import { departmentHubDatabase } from '../../services/db/departmentHubDatabase';
import { ACEPageHeader, ACECard, ACEBadge, ACEButton } from '../../components/ui/ace';
import { School, Users, Award, BookOpen, Terminal, Calendar } from 'lucide-react';

export function DepartmentHubPage() {
  const { id } = useParams<{ id: string }>();
  const dept = departmentHubDatabase.getDepartmentById(id || 'cse');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <ACEPageHeader
          title={dept.name}
          description={`${dept.institutionName} • Head of Department: ${dept.hodName}`}
          badge={dept.shortCode}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Enrolled Students</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{dept.totalStudents}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Faculty Mentors</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{dept.totalFaculty}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Active Research Labs</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">4</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 uppercase">Symposiums</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">2 Planned</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Faculty Roster */}
          <ACECard title="Faculty Roster & Mentors">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {dept.facultyRoster.map((f, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{f.name}</div>
                    <div className="text-xs text-slate-500">{f.designation} • {f.specialization}</div>
                  </div>
                  <ACEButton variant="outline" size="sm">Connect</ACEButton>
                </div>
              ))}
            </div>
          </ACECard>

          {/* Departmental Projects */}
          <ACECard title="Active Departmental Research & Projects">
            <div className="space-y-3">
              {dept.activeProjects.map((p, idx) => (
                <div key={idx} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{p.title}</span>
                    <ACEBadge variant="primary">{p.status}</ACEBadge>
                  </div>
                  <div className="text-xs text-slate-500">Lead: {p.lead} • Domain: {p.domain}</div>
                </div>
              ))}
            </div>
          </ACECard>
        </div>

      </div>
    </div>
  );
}
