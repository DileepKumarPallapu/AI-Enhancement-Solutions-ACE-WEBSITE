import React from 'react';
import { Briefcase, MapPin, Building2, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';

export const StudentCareerPage: React.FC = () => {
  const jobs = [
    {
      id: 'job-1',
      title: 'Full Stack Engineering Intern',
      company: 'ThoughtWorks',
      stipend: '₹35,000 / month',
      location: 'Coimbatore & Chennai (Hybrid)',
      type: 'Internship',
      deadline: 'Oct 15, 2026',
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: 'job-2',
      title: 'AI / LLM Research Fellow',
      company: 'Indian Institute of Technology (IITM Research Park)',
      stipend: '₹40,000 / month',
      location: 'Chennai, Tamil Nadu',
      type: 'Fellowship',
      deadline: 'Oct 20, 2026',
      skills: ['Python', 'PyTorch', 'RAG Pipelines']
    },
    {
      id: 'job-3',
      title: 'Junior Cloud DevOps Engineer',
      company: 'Zoho Corporation',
      stipend: '₹6.5 - 8.0 LPA',
      location: 'Chennai / Tenkasi',
      type: 'Full-Time Fresher',
      deadline: 'Nov 01, 2026',
      skills: ['Linux', 'Docker', 'AWS', 'Go']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="CAREER & INTERNSHIPS"
        title="Student Career"
        highlight="Opportunities."
        subtitle="Discover verified summer internships, research fellowships, and entry-level engineering roles matching your degree."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map(j => (
          <div key={j.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {j.type}
                </span>
                <span className="text-xs font-black text-brand-600">{j.stipend}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{j.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5" /> {j.company}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {j.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {j.skills.map((s, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Deadline: {j.deadline}</span>
              <Button variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
