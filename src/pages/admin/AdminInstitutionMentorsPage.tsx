import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import {
  School,
  ArrowLeft,
  Users,
  ShieldCheck
} from 'lucide-react';
import { CANONICAL_VEL_TECH_NAME } from '../../services/db/mentorshipDatabase';

export const AdminInstitutionMentorsPage: React.FC = () => {
  const { institutionId } = useParams<{ institutionId: string }>();
  const { collegeMentors } = useMentor();

  const mentors = collegeMentors.filter(m => m.institutionId === institutionId || !institutionId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/admin/institutions" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline mb-2 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Institutions
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Institution Mentors — {CANONICAL_VEL_TECH_NAME}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Faculty leads assigned strictly to this institution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(m => (
            <div key={m.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.fullName}</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400">{m.designation}</p>
              <p className="text-xs text-slate-500">{m.department} • {m.academicSchool}</p>
              <div className="pt-2 flex justify-between text-xs text-slate-500">
                <span>Capacity:</span>
                <span className="font-bold text-slate-900 dark:text-white">{m.currentStudentCount} / {m.maxStudents}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
