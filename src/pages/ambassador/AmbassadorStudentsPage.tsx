import React, { useState } from 'react';
import { Users, Search, Filter, Mail, Send, Award, UserCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AmbassadorStudentsPage: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 'STU-1', name: 'Pallapu Dileep Kumar', dept: 'CSE (3rd Year)', eventsAttended: 3, points: 120, status: 'Active' },
    { id: 'STU-2', name: 'Kavitha R', dept: 'AI & Data Science (2nd Year)', eventsAttended: 2, points: 90, status: 'Active' },
    { id: 'STU-3', name: 'Subhani S', dept: 'CSE (4th Year)', eventsAttended: 5, points: 210, status: 'Lead Contributor' },
    { id: 'STU-4', name: 'Manoj K', dept: 'Information Technology (3rd Year)', eventsAttended: 1, points: 40, status: 'Active' }
  ];

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="CAMPUS STUDENT COMMUNITY"
        title="College Students"
        highlight="Directory."
        subtitle="Manage student participants from your college, review engagement stats, and broadcast official announcements."
        actions={
          <Button variant="primary" size="md" onClick={() => showToast('Announcement broadcast modal opened')} icon={<Mail className="w-4 h-4" />}>
            Broadcast Announcement
          </Button>
        }
      />

      {/* Search Filter */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by student name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs bg-transparent outline-none text-slate-800 dark:text-slate-200"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Student ID & Name</th>
                <th className="p-4">Department</th>
                <th className="p-4">Events Registered</th>
                <th className="p-4">ACE Reward Points</th>
                <th className="p-4">Engagement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors font-medium">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{s.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{s.id}</span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{s.dept}</td>
                  <td className="p-4 font-bold text-brand-600">{s.eventsAttended} Events</td>
                  <td className="p-4 font-black text-amber-600">{s.points} Pts</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      {s.status}
                    </span>
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
