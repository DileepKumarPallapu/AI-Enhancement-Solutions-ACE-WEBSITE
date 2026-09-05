import React, { useState } from 'react';
import { FileText, Download, Sparkles, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const ResumeBuilderPage: React.FC = () => {
  const { showToast } = useToast();
  const [headline, setHeadline] = useState('Computer Science Student & Full Stack AI Developer');

  const handleExport = () => {
    showToast('Resume PDF compiled and downloaded ✓', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="CAREER ACCELERATOR"
        title="Automated Resume"
        highlight="Builder."
        subtitle="1-Click compile your verified hackathons, coding streak, and certificates into an ATS-friendly engineering resume."
        actions={
          <Button variant="primary" size="md" onClick={handleExport} icon={<Download className="w-4 h-4" />}>
            Download ATS Resume PDF
          </Button>
        }
      />

      {/* Resume Preview Sheet */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 space-y-6 shadow-xl max-w-3xl mx-auto font-sans text-xs">
        
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 space-y-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Pallapu Dileep Kumar</h2>
          <p className="text-xs text-brand-600 font-bold">{headline}</p>
          <p className="text-[11px] text-slate-500">dileepkumarpallapu28@gmail.com • Coimbatore, India • github.com/dileep-kumar</p>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <h3 className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-brand-600" /> Education
          </h3>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
            <div className="flex justify-between font-bold text-slate-900 dark:text-white">
              <span>Hindustan Institute of Technology, Coimbatore</span>
              <span>2023 - 2027</span>
            </div>
            <p className="text-slate-500 text-[11px]">B.E. in Computer Science & Engineering • CGPA: 8.9 / 10.0</p>
          </div>
        </div>

        {/* Verified Hackathons & Competitions */}
        <div className="space-y-2">
          <h3 className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> Verified Hackathons & Achievements (ACE Certified)
          </h3>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
            <p className="font-bold text-slate-900 dark:text-white">Winner (1st Place) - HACKVERSE 2.0 National Hackathon</p>
            <p className="text-slate-500 text-[11px]">Built an autonomous multi-agent code refactoring assistant using FastAPI and React 19.</p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <h3 className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider">
            Technical Skills
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
            <strong>Languages:</strong> Python, TypeScript, Java, C++, SQL<br />
            <strong>Frameworks:</strong> React 19, Node.js, Tailwind CSS, PyTorch, LangChain<br />
            <strong>Tools & Platforms:</strong> Docker, Git, Linux, Supabase, Vercel
          </p>
        </div>

      </div>

    </div>
  );
};
