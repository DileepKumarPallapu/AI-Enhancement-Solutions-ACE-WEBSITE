import React from 'react';
import { GraduationCap, Github, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { aceSuperPlatformDatabase } from '../../services/db/aceSuperPlatformDatabase';
import { ACEBadge } from '../../components/ui/ace';

export const StudentProjectLabPage: React.FC = () => {
  const projects = aceSuperPlatformDatabase.getAllProjectLabItems();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-800/40 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5 w-fit">
            <GraduationCap className="w-3.5 h-3.5 text-teal-400" /> Student Project Lab & Incubator
          </span>
          <h1 className="text-3xl font-extrabold text-white">Innovation Project Incubator</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Develop capstone architectures, track milestone completion, and receive accredited reviews from Vel Tech faculty mentors.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map(proj => (
            <div key={proj.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{proj.tagline}</p>
                </div>
                <ACEBadge variant="primary">{proj.status}</ACEBadge>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {/* Milestones */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400">Milestone Progress:</div>
                <div className="space-y-1.5 text-xs">
                  {proj.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <span className={m.isDone ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {m.isDone ? '✓' : '○'}
                      </span>
                      <span>{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Feedback */}
              {proj.mentorFeedback && (
                <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-800/40 text-xs text-teal-300">
                  <span className="font-bold">Faculty Feedback ({proj.assignedMentor}): </span>
                  {proj.mentorFeedback}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
