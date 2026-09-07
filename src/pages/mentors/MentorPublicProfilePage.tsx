import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMentor } from '../../context/MentorContext';
import {
  Star,
  School,
  Award,
  ArrowLeft,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const MentorPublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { collegeMentors } = useMentor();

  const mentor = collegeMentors.find(m => m.id === username || m.fullName.toLowerCase().replace(/\s+/g, '-') === username) || collegeMentors[0];

  if (!mentor) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-10 text-center text-slate-500">
        Mentor profile not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link to="/student/mentorship/find" className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Mentors Directory
        </Link>

        {/* Profile Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={mentor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={mentor.fullName}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-indigo-500/30 shadow-md"
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">{mentor.fullName}</h1>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> {mentor.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">{mentor.designation}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{mentor.department} • {mentor.academicSchool}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <School className="w-3.5 h-3.5" /> {mentor.institutionName}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Biography & Background</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{mentor.bio}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Core Skills & Domain Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.expertiseSkills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Link
              to="/student/mentorship/find"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
            >
              Request Mentorship
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
