import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  ShieldCheck,
  Plus,
  ArrowRight,
  School,
  CheckCircle2,
  Calendar,
  Clock,
  Award
} from 'lucide-react';

export const CollegeMentorsPage: React.FC = () => {
  const { collegeMentors } = useMentor();
  const { currentUser } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const collegeName = currentUser?.college || 'PSG College of Technology';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <School className="w-3.5 h-3.5" /> Institutional Administration
            </div>
            <h1 className="text-3xl font-extrabold text-white">{collegeName} — Mentor Team</h1>
            <p className="text-xs text-slate-400 mt-1">Configure your official 4–5 verified college domain leads, capacity, and student allocations.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4" /> Add / Invite Faculty Mentor
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Verified Mentors</span>
            <p className="text-2xl font-black text-white font-mono">{collegeMentors.length} / 5</p>
            <p className="text-[11px] text-emerald-400">All 5 Core Pillars Covered</p>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Students Guided</span>
            <p className="text-2xl font-black text-indigo-400 font-mono">
              {collegeMentors.reduce((acc, m) => acc + m.currentStudentsCount, 0)}
            </p>
            <p className="text-[11px] text-slate-400">Across B.Tech / M.Tech</p>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Completed Sessions</span>
            <p className="text-2xl font-black text-emerald-400 font-mono">
              {collegeMentors.reduce((acc, m) => acc + m.sessionsCompletedCount, 0)}
            </p>
            <p className="text-[11px] text-slate-400">This Academic Term</p>
          </div>
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Average Student Rating</span>
            <p className="text-2xl font-black text-amber-400 font-mono">4.94 ★</p>
            <p className="text-[11px] text-slate-400">High Student Satisfaction</p>
          </div>
        </div>

        {/* Mentors Management Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-base text-white">Active College Mentor Roster</h3>
            <span className="text-xs text-indigo-400 font-mono">College ID: col_psg</span>
          </div>

          <div className="divide-y divide-slate-800 overflow-x-auto">
            {collegeMentors.map(m => (
              <div key={m.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-850 transition">
                <div className="flex items-center gap-3.5">
                  <img src={m.avatarUrl} alt={m.fullName} className="w-12 h-12 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {m.fullName}
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    </h4>
                    <p className="text-xs text-indigo-400 font-mono">@{m.username} • {m.department}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{m.designation}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Specialization</span>
                    <span className="font-bold text-white">{m.mentorshipAreas[0]}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Students</span>
                    <span className="font-mono text-emerald-400 font-bold">{m.currentStudentsCount} / {m.maxStudentsCapacity}</span>
                  </div>
                  <Link
                    to={`/mentor/${m.username}`}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <h3 className="text-lg font-bold text-white">Invite / Add Faculty Mentor</h3>
            <p className="text-xs text-slate-400">
              Invite a department faculty member or certified industry coach to join your institutional mentor panel.
            </p>
            <input
              type="email"
              placeholder="faculty.member@college.edu"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
            />
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => { alert('Invitation email dispatched to faculty member.'); setShowAddModal(false); }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
