import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const MentorStudentListPage: React.FC = () => {
  const { myStudents, activeMentorProfile } = useMentor();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = myStudents.filter(m =>
    m.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.studentDepartment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Assigned Student Roster</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Active student cohort for {activeMentorProfile?.institutionName || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'}.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search mentees..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
              No students found.
            </div>
          ) : (
            filtered.map(assignment => (
              <div
                key={assignment.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {assignment.studentName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{assignment.studentName}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {assignment.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{assignment.studentDepartment} • Year {assignment.studentYear}</p>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Assignment: {assignment.assignmentType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/mentor/students/${assignment.studentId}`}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    View Comprehensive Dossier <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
