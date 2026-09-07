import React from 'react';
import { useParams } from 'react-router-dom';
import { Award, ShieldCheck, CheckCircle2, Calendar, Building2, UserCheck, ExternalLink, Download } from 'lucide-react';

export const PublicVerifyCertificatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const cert = {
    id: id || 'cert_fs_892',
    title: 'Advanced Full-Stack Engineering Masterclass & Hackathon Excellence',
    recipientName: 'Dileep Kumar Pallapu',
    institution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    issuedDate: '2026-01-15',
    issuerName: 'ACE Academic Credential Authority & Industry Council',
    gradeOrMetric: 'Top 2% (Score 98/100) - Honors with Distinction',
    verificationHash: '0x8f29c4ba7710a992bcde44810a01fa22',
    skills: ['React & TypeScript', 'Full-Stack Distributed Systems', 'Autonomous AI Agents', 'Cloud Native']
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Verified Credential Proof</span>
              <h1 className="text-xl font-bold text-white">ACE Official Certificate</h1>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" /> Cryptographically Verified
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-5">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">Credential Title</span>
            <h2 className="text-xl font-bold text-white">{cert.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Awarded To</span>
              <span className="text-sm font-bold text-white">{cert.recipientName}</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Institution Affiliation</span>
              <span className="text-sm font-bold text-emerald-400 truncate block">{cert.institution}</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Issue Date</span>
              <span className="text-sm font-bold text-white">{new Date(cert.issuedDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Performance Tier</span>
              <span className="text-sm font-bold text-amber-400">{cert.gradeOrMetric}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400 uppercase font-semibold">Validated Competencies</span>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Certificate ID:</span>
              <span className="text-slate-200">{cert.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Merkle Proof Hash:</span>
              <span className="text-emerald-400 truncate max-w-[280px]">{cert.verificationHash}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <a
            href="/portfolio/dileepkumar"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
          >
            View dileepkumar's verified portfolio <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>

      </div>
    </div>
  );
};
