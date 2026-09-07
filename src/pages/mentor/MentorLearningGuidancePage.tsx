import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

export const MentorLearningGuidancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link to="/mentor/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
            ← Back to Command Center
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Learning & Career Guidance Paths</h1>
          <p className="text-xs text-slate-400 mt-1">Design curated learning roadmaps and connect them with ACE coding modules.</p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">Curated Engineering Roadmaps</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Guide your students through Python, Distributed Systems, Cloud Architecture, and Competitive Coding.
          </p>
        </div>
      </div>
    </div>
  );
};
