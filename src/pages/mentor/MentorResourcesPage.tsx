import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowLeft,
  BookOpen,
  FileText,
  ExternalLink,
  Plus
} from 'lucide-react';

export const MentorResourcesPage: React.FC = () => {
  const sampleResources = [
    { id: '1', title: 'Smart India Hackathon System Design Blueprint', category: 'Hackathons', school: 'School of Computing', link: '#' },
    { id: '2', title: 'IEEE Research Paper LaTeX Structure & Review Rubric', category: 'Research', school: 'School of Computing', link: '#' },
    { id: '3', title: 'FAANG DSA & Low-Level Design Curated Roadmap', category: 'Placements', school: 'School of Computing', link: '#' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/mentor/dashboard" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentor Workspace
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Curated Learning Resources</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Share learning materials, sample architectures, and contest guides with your mentees.
            </p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-2">
            <Plus className="w-4 h-4" /> Share New Resource
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleResources.map(r => (
            <div key={r.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                {r.category}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{r.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{r.school}</p>
              <a href={r.link} className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2">
                Open Resource <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
