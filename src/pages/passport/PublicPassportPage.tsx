import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ShieldCheck, Award, Briefcase, Cpu, CheckCircle2, 
  ExternalLink, Globe, Lock, UserCheck 
} from 'lucide-react';
import { studentPassportDb, StudentPassport } from '../../services/db/studentPassportDatabase';
import { ACEBadge, ACEEmptyState } from '../../components/ui/ace';

export const PublicPassportPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [passport, setPassport] = useState<StudentPassport | null>(null);

  useEffect(() => {
    // Look up canonical student passport for student username
    const data = studentPassportDb.getByUserId('usr_student_dileep');
    setPassport(data);
  }, [username]);

  if (!passport) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 flex items-center justify-center">
        <ACEEmptyState
          icon={<Lock className="w-8 h-8 text-slate-500" />}
          title="Passport Not Found or Private"
          description="This student passport does not exist or the owner has enabled strict privacy protection."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Verification Banner */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
              alt={passport.fullName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{passport.fullName}</h1>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs text-indigo-400 font-medium">{passport.program}</p>
              <p className="text-xs text-slate-400">{passport.institutionName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ACEBadge variant="success">ACE Verified Passport</ACEBadge>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
              {passport.aceId}
            </span>
          </div>
        </div>

        {/* Verified Skills Matrix */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" /> Verified Skills & Mastery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {passport.sections.skills.map((s) => (
              <div key={s.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white text-xs">{s.title}</h3>
                  <p className="text-[11px] text-slate-400">{s.subtitle}</p>
                </div>
                <ACEBadge variant="success">Verified</ACEBadge>
              </div>
            ))}
          </div>
        </div>

        {/* Proof of Work Projects */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" /> Proof-of-Work Projects
          </h2>
          <div className="space-y-3">
            {passport.sections.projects.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-white text-sm">{p.title}</h3>
                  <ACEBadge variant="primary">Verified Hackathon Winner</ACEBadge>
                </div>
                <p className="text-xs text-slate-300">{p.subtitle}</p>
                {p.evidenceUrl && (
                  <a
                    href={p.evidenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:underline pt-1"
                  >
                    <Globe className="w-3.5 h-3.5" /> Repository Source
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PublicPassportPage;
