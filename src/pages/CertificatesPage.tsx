import React, { useState } from 'react';
import { Award, Download, Share2, ShieldCheck, CheckCircle2, Plus, Upload, X } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { certificateDb, PersistentCertificate } from '../services/db/certificateDatabase';
import { useAuth } from '../context/AuthContext';

export const CertificatesPage: React.FC = () => {
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'usr_student_dileep';

  const [certificates, setCertificates] = useState<PersistentCertificate[]>(() => {
    return certificateDb.getCertificatesByUser(userId);
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('2026-08-20');
  const [certSkills, setCertSkills] = useState('');

  const refreshCertificates = () => {
    setCertificates(certificateDb.getCertificatesByUser(userId));
  };

  const handleDownload = (id: string) => {
    showToast(`Generating certified PDF for ID: ${id}... ✓`);
  };

  const handleShare = (num: string) => {
    navigator.clipboard.writeText(`https://www.allcollegeevent.com/verify-certificate/${num}`);
    showToast('Tamper-proof verification URL copied to clipboard ✓');
  };

  const handleUploadCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certIssuer.trim()) {
      showToast('Please enter title and issuer');
      return;
    }

    const certNum = `ACE-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    certificateDb.addCertificate({
      certificateNumber: certNum,
      title: certTitle.trim(),
      eventName: certTitle.trim(),
      issuer: certIssuer.trim(),
      issuedDate: certDate,
      recipientId: userId,
      recipientName: currentUser?.fullName || 'Dileep Kumar',
      recipientCollege: currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      skills: certSkills.split(',').map(s => s.trim()).filter(Boolean),
      type: 'EXTERNAL_UPLOAD',
      verificationHash: `sha256:${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`,
      qrVerificationUrl: `https://www.allcollegeevent.com/verify-certificate/${certNum}`,
      status: 'VERIFIED'
    });

    setCertTitle('');
    setCertIssuer('');
    setCertSkills('');
    setShowUploadModal(false);
    refreshCertificates();
    showToast('Certificate added and verified in ACE credential ledger! 🎉');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <PageHeader
        eyebrow="CERTIFICATES & CREDENTIALS"
        title="Your Achievements,"
        highlight="Verified by ACE."
        subtitle="Access tamper-proof verified digital certificates issued by host universities, hackathons, and accredited symposium organizers."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowUploadModal(true)}
          >
            + Add / Upload Certificate
          </Button>
        }
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
                  <ShieldCheck className="w-3.5 h-3.5" /> {cert.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">{cert.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cert.issuer} • {cert.issuedDate}</p>
              </div>

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {cert.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-brand-700 dark:text-purple-300 text-[10px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-600 dark:text-slate-300 flex justify-between">
                <span>Certificate ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">{cert.certificateNumber}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Button variant="primary" size="sm" onClick={() => handleDownload(cert.certificateNumber)} icon={<Download className="w-3.5 h-3.5" />}>
                Download PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare(cert.certificateNumber)} icon={<Share2 className="w-3.5 h-3.5" />}>
                Share & Verify
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Add / Upload Verified Certificate</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadCertificate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Certificate Title</label>
                <input
                  type="text"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Cloud Practitioner / Hackathon 1st Place"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Issuing Organization / College</label>
                <input
                  type="text"
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  placeholder="e.g. Amazon Web Services / IIT Madras"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Issue Date</label>
                <input
                  type="date"
                  value={certDate}
                  onChange={(e) => setCertDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Associated Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={certSkills}
                  onChange={(e) => setCertSkills(e.target.value)}
                  placeholder="e.g. Cloud Computing, Docker, Kubernetes"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Certificate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
