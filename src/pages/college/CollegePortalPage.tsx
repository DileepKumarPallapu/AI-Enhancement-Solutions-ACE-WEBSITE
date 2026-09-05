import React, { useState } from 'react';
import { Building2, Users, Award, ShieldCheck, PlusCircle, Megaphone, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useManagement } from '../../context/ManagementContext';
import { useToast } from '../../context/ToastContext';

export const CollegePortalPage: React.FC = () => {
  const { activePersona } = useManagement();
  const { showToast } = useToast();

  const [departments] = useState([
    { name: 'Computer Science and Engineering', students: 480, hod: 'Dr. S. K. Narayanan', verified: true },
    { name: 'Artificial Intelligence & Data Science', students: 240, hod: 'Dr. M. Deepa', verified: true },
    { name: 'Information Technology', students: 320, hod: 'Dr. R. Rajesh', verified: true },
    { name: 'Electronics & Communication', students: 360, hod: 'Dr. P. Venkatesh', verified: true }
  ]);

  const [collegeEvents] = useState([
    { id: 'EVT-101', title: 'HACKVERSE 2.0 – National Hackathon', date: 'Oct 15, 2026', status: 'PUBLISHED', attendees: 320 },
    { id: 'EVT-102', title: 'NEXORA 2K26 – National Technical Symposium', date: 'Oct 24, 2026', status: 'PUBLISHED', attendees: 450 }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="INSTITUTIONAL ADMINISTRATION"
        title="College & Department"
        highlight="Portal."
        subtitle={`Official institutional dashboard for ${activePersona.college}.`}
        badge={
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NAAC A++ Accredited • Official ACE Partner
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Button variant="primary" size="md" onClick={() => showToast('Department verification request dispatched ✓')} icon={<PlusCircle className="w-4 h-4" />}>
              + Add Department
            </Button>
          </div>
        }
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Total Enrolled Students</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">1,400</p>
          <span className="text-[11px] text-emerald-600 font-bold">4 Active Departments</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Official Campus Events</span>
          <p className="text-2xl font-black text-brand-600">6</p>
          <span className="text-[11px] text-brand-600 font-bold">2 Live on Catalog</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Campus Ambassadors</span>
          <p className="text-2xl font-black text-purple-600">2</p>
          <span className="text-[11px] text-purple-600 font-bold">Subhani S (Lead)</span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400">Issued Certificates</span>
          <p className="text-2xl font-black text-amber-600">840</p>
          <span className="text-[11px] text-amber-600 font-bold">100% Cryptographic QR</span>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-600" /> Accredited Departments
            </h3>
            <p className="text-xs text-slate-500">Departments authorized to host symposiums and issue verified delegate certificates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((d, i) => (
            <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{d.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                    <ShieldCheck className="w-3 hand-3" /> Verified
                  </span>
                </div>
                <p className="text-xs text-slate-400">HOD: {d.hod} • {d.students} Active Students</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => showToast(`Viewing ${d.name} roster`)}>
                View Roster
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* College Events Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" /> Published Collegiate Events
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Event Title & ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Registered Attendees</th>
                <th className="p-4">Catalog Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {collegeEvents.map(e => (
                <tr key={e.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors font-medium">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{e.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{e.id}</span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{e.date}</td>
                  <td className="p-4 font-bold text-brand-600">{e.attendees} Registered</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm" onClick={() => showToast(`Viewing analytics for ${e.id}`)}>
                      View Analytics
                    </Button>
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
