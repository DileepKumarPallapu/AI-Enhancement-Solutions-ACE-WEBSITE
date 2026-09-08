import React, { useState } from 'react';
import { Compass, CheckCircle2, Clock, Award, BookOpen, Users, Sparkles, ArrowRight } from 'lucide-react';
import { aceSuperPlatformDatabase } from '../../services/db/aceSuperPlatformDatabase';
import { Link } from 'react-router-dom';

export const UniversalCommandCenterPage: React.FC = () => {
  const data = aceSuperPlatformDatabase.getUniversalHomeData();
  const sim = aceSuperPlatformDatabase.getCareerSimulatorMatrix();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 w-fit">
            <Compass className="w-3.5 h-3.5 text-blue-400" /> Master Operating Matrix
          </span>
          <h1 className="text-3xl font-extrabold text-white">ACE Command Center</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Single unified command hub synchronizing your daily commitments, upcoming deadlines, career readiness gaps, active courses, and mentor guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today & This Week */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Today's Focus
            </h3>
            <div className="space-y-2">
              {data.todayPriorities.slice(0, 2).map(p => (
                <div key={p.id} className="p-3 bg-slate-950 rounded-2xl text-xs space-y-1">
                  <div className="text-indigo-400 font-bold">{p.category}</div>
                  <div className="text-white font-medium">{p.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Deadlines */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Upcoming Deadlines
            </h3>
            <div className="space-y-2">
              {data.urgentDeadlines.map(d => (
                <div key={d.id} className="p-3 bg-slate-950 rounded-2xl text-xs space-y-1">
                  <div className="text-white font-medium truncate">{d.title}</div>
                  <div className="text-amber-400 font-semibold">{new Date(d.dueDate).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Readiness */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" /> Career Readiness
            </h3>
            <div className="p-3 bg-slate-950 rounded-2xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Role:</span>
                <span className="text-white font-bold">{sim.targetRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Readiness Score:</span>
                <span className="text-emerald-400 font-mono font-bold">{sim.currentScore} / {sim.targetBenchmarkScore}</span>
              </div>
              <Link to="/career" className="text-xs text-purple-400 font-bold hover:underline block pt-1">
                Open Career Simulator →
              </Link>
            </div>
          </div>

          {/* Mentor Guidance */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-400" /> Faculty Mentor
            </h3>
            <div className="p-3 bg-slate-950 rounded-2xl text-xs space-y-1">
              <div className="text-white font-bold">{data.assignedMentor.name}</div>
              <div className="text-slate-400">{data.assignedMentor.department}</div>
              <div className="text-emerald-400 font-semibold pt-1">{data.assignedMentor.status}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
