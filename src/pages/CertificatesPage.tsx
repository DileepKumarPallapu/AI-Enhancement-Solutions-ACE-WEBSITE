import React from 'react';
import { Award, Download, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const CertificatesPage: React.FC = () => {
  const { showToast } = useToast();

  const certificates = [
    {
      id: 'ACE-CERT-884920',
      title: 'HACKVERSE 2.0 National Hackathon Finalist',
      issuer: 'Karpagam College of Engineering & ACE',
      issuedDate: 'August 28, 2026',
      recipient: 'Pallapu Dileep Kumar',
      skills: ['Generative AI', 'React', 'Team Leadership']
    },
    {
      id: 'ACE-CERT-773192',
      title: 'Hands-on Plant Tissue Culture Workshop',
      issuer: 'Tamil Nadu Agricultural University (TNAU)',
      issuedDate: 'July 15, 2026',
      recipient: 'Pallapu Dileep Kumar',
      skills: ['Laboratory Protocol', 'Biotechnology']
    }
  ];

  const handleDownload = (id: string) => {
    showToast(`Certificate ${id} downloaded successfully ✓`);
  };

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`https://www.allcollegeevent.com/verify-certificate/${id}`);
    showToast('Verification URL copied to clipboard ✓');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <PageHeader
        eyebrow="CERTIFICATES"
        title="Your Achievements,"
        highlight="Verified by ACE."
        subtitle="Access tamper-proof verified digital certificates issued by host universities and accredited symposium organizers."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">{cert.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cert.issuer}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-600 dark:text-slate-300 flex justify-between">
                <span>Certificate ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">{cert.id}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Button variant="primary" size="sm" onClick={() => handleDownload(cert.id)} icon={<Download className="w-3.5 h-3.5" />}>
                Download PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare(cert.id)} icon={<Share2 className="w-3.5 h-3.5" />}>
                Share & Verify
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
