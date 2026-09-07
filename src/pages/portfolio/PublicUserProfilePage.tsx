import React from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, Award, Briefcase, Cpu, Globe } from 'lucide-react';
import { studentPassportDb } from '../../services/db/studentPassportDatabase';
import { ACECard, ACEBadge } from '../../components/ui/ace';

export const PublicUserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const passport = studentPassportDb.getByUserId('usr_student_dileep');

  if (!passport) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <ACECard elevated className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
            alt={passport.fullName}
            className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500"
          />
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              {passport.fullName} <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </h1>
            <p className="text-sm text-indigo-400">{passport.program}</p>
            <p className="text-xs text-slate-400">{passport.institutionName}</p>
          </div>
        </ACECard>
      </div>
    </div>
  );
};
export default PublicUserProfilePage;
