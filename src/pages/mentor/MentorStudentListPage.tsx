import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { Users, Search, Filter, ArrowRight, ShieldCheck, Calendar, BookOpen } from 'lucide-react';

export const MentorStudentListPage: React.FC = () => {
  const { myStudents } = useMentor();
  const [search, setSearch] = useState('');
  const [filterArea, setFilterArea] = useState('all');

  const filtered = myStudents.filter(s => {
    const matchesSearch = s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentDepartment.toLowerCase().includes(search.toLowerCase());
    const matchesArea = filterArea === 'all' || s.primaryMentorshipArea === filterArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div>
          <Link to="/mentor/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Command Center
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Assigned Student Mentorship Roster</h1>
          <p className="text-xs text-slate-400 mt-1">Track student progress plans, milestone completion, and private faculty notes.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search student name or department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            {['all', 'AI/ML', 'Career Guidance', 'Technical Guidance'].map(area => (
              <button
                key={area}
                onClick={() => setFilterArea(area)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filterArea === area ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Students Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(student => (
            <div key={student.id} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={student.studentAvatar} alt={student.studentName} className="w-12 h-12 rounded-2xl object-cover" />
                  <div>
                    <h3 className="font-bold text-sm text-white">{student.studentName}</h3>
                    <p className="text-xs text-indigo-400 font-mono">@{student.studentUsername}</p>
                    <p className="text-[11px] text-slate-400">{student.studentDepartment} • {student.studentYear}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Mentorship Track:</span>
                    <span className="font-bold text-indigo-300">{student.primaryMentorshipArea}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Last Session:</span>
                    <span className="font-mono text-slate-300">{student.lastSessionDate || 'None yet'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <Link
                  to={`/mentor/students/${student.studentId}`}
                  className="w-full py-2.5 text-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-1.5"
                >
                  Open Student Dossier <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
