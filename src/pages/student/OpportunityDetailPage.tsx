import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Bookmark, 
  ArrowLeft 
} from 'lucide-react';
import { opportunityDb } from '../../services/db/opportunityDatabase';
import { careerDb } from '../../services/db/careerDatabase';
import { calendarDb } from '../../services/db/calendarDatabase';
import { useAuth } from '../../context/AuthContext';

export const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';

  const opp = opportunityDb.getById(id || 'opp_hack_001');
  const [registered, setRegistered] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!opp) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
        <p>Opportunity not found.</p>
      </div>
    );
  }

  const handleRegister = () => {
    careerDb.applyToOpportunity({
      userId: currentUserId,
      opportunityId: opp.id,
      targetRole: opp.title
    });

    calendarDb.addEvent({
      userId: currentUserId,
      title: `${opp.title} Kickoff`,
      type: 'REGISTERED_EVENT',
      priority: 'CRITICAL',
      startTime: opp.startDate,
      endTime: new Date(new Date(opp.startDate).getTime() + 7200000).toISOString(),
      location: opp.location,
      isOnline: opp.mode === 'ONLINE',
      reminderMinutesBefore: [1440, 60],
      isCompleted: false,
      colorHex: '#3b82f6',
      tags: [opp.category]
    });

    setRegistered(true);
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link to="/student/opportunities" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Opportunity Intelligence Radar
        </Link>

        {/* Hero Card */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={opp.organizerLogoUrl} alt={opp.organizerName} className="w-16 h-16 rounded-2xl object-cover border border-slate-800" />
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">
                  {opp.category}
                </span>
                <h1 className="text-2xl font-bold text-white mt-1">{opp.title}</h1>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5" /> {opp.organizerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={registered}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
                  registered
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                }`}
              >
                {registered ? 'Registered ✓ (Pass Generated)' : 'Register with 1-Click ACE ID'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Mode</span>
              <span className="font-semibold text-white">{opp.mode}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Location</span>
              <span className="font-semibold text-white truncate block">{opp.location}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Deadline</span>
              <span className="font-semibold text-white">{new Date(opp.deadline).toLocaleDateString()}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Prize Pool / Fee</span>
              <span className="font-semibold text-emerald-400">{opp.prizePool || opp.feeAmount || 'Free Registration'}</span>
            </div>
          </div>
        </div>

        {/* Overview & Rules */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white">Full Briefing & Guidelines</h2>
          <p className="text-xs text-slate-300 leading-relaxed">{opp.fullDescription}</p>

          {opp.rules && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs uppercase font-bold text-slate-400">Rules & Compliance</h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {opp.rules.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-400">1-Click Fast Registration</span>
              <h3 className="text-lg font-bold text-white">{opp.title}</h3>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Verified Name:</span>
                <span className="text-white font-medium">{user?.displayName || 'Dileep Kumar'}</span>
              </div>
              <div className="flex justify-between">
                <span>Institution:</span>
                <span className="text-white font-medium">Vel Tech University</span>
              </div>
              <div className="flex justify-between">
                <span>ACE Digital ID:</span>
                <span className="font-mono text-emerald-400 font-bold">ACE-2026-VT9842</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
