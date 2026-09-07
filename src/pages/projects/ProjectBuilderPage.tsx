import React, { useState } from 'react';
import { Code2, Github, Link2, Sparkles, CheckCircle2 } from 'lucide-react';
import { projectDb } from '../../services/db/projectDatabase';
import { useAuth } from '../../context/AuthContext';

export const ProjectBuilderPage: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'usr_student_dileep';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    projectDb.saveProject({
      userId: currentUserId,
      authorName: user?.displayName || 'Dileep Kumar',
      authorCollege: user?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      authorAvatar: user?.avatarUrl || '',
      title,
      tagline: problem || description.substring(0, 80),
      description,
      category: 'AI_ML',
      techStack: ['React', 'TypeScript', 'Autonomous AI Agents'],
      githubUrl,
      liveDemoUrl: demoUrl,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
      collaborators: [],
      isPublished: true
    });

    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Project Creation Studio</h1>
          <p className="text-slate-400 text-sm mt-1">Publish verified projects to build your verified skill evidence ledger.</p>
        </div>

        {saved ? (
          <div className="p-8 rounded-3xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-lg font-bold text-white">Project Published Successfully!</h2>
            <p className="text-xs text-emerald-300">Added to your verified portfolio and skill evidence ledger.</p>
            <a href="/portfolio/dileepkumar" className="inline-block mt-2 text-xs text-emerald-400 hover:underline">
              View Public Portfolio →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Autonomous Multimodal Drone SLAM"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Overview & Abstract</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Summary of your architecture and design decisions..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">GitHub Repository</label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Live Production URL</label>
                <input
                  type="text"
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-900/30"
            >
              Publish Project to Ledger
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
