import React, { useState } from 'react';
import { useMentor } from '../../context/MentorContext';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  School
} from 'lucide-react';
import { CANONICAL_VEL_TECH_NAME } from '../../services/db/mentorshipDatabase';

export const AdminMentorsPage: React.FC = () => {
  const { collegeMentors, refreshMentorshipData } = useMentor();
  const [search, setSearch] = useState('');

  const filtered = collegeMentors.filter(m =>
    m.fullName.toLowerCase().includes(search.toLowerCase()) ||
    m.institutionName.toLowerCase().includes(search.toLowerCase()) ||
    m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Platform & Campus Governance
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Mentor Management & Verification</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Verify faculty credentials, audit capacity constraints, and manage domain leads across institutions.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-2.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search faculty mentors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Mentors Table */}
        <div className="overflow-x-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Faculty Mentor</th>
                <th className="p-4">Institution & School</th>
                <th className="p-4">Department</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(mentor => (
                <tr key={mentor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={mentor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                        alt={mentor.fullName}
                        className="w-9 h-9 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{mentor.fullName}</p>
                        <p className="text-[11px] text-slate-500">{mentor.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-900 dark:text-white truncate max-w-[200px]">{mentor.institutionName}</p>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400">{mentor.academicSchool}</p>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{mentor.department}</td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {mentor.currentStudentCount} / {mentor.maxStudents}
                    </span>
                  </td>
                  <td className="p-4">
                    {mentor.verificationStatus === 'VERIFIED' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
