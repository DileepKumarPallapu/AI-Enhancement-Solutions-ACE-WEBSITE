import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  Layers, 
  Star, 
  FileText, 
  ShieldCheck, 
  Copy, 
  Edit3, 
  Share2, 
  ExternalLink,
  QrCode,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { demoModeDatabase } from '../../services/db/demoModeDatabase';

export const MyProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const demoStudent = demoModeDatabase.getDemoStudent();
  const demoWorkspaces = demoModeDatabase.getAllDemoWorkspaces();
  const [copied, setCopied] = useState(false);

  const studentName = currentUser?.fullName || demoStudent.name;
  const institution = currentUser?.college || demoStudent.institution;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Hero Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-4xl text-white shadow-lg flex-shrink-0">
                🎓
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {studentName}
                  </h1>
                  <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-black border border-emerald-500/20">
                    ✓ Verified Account
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>{institution}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>{demoStudent.department}</span>
                  <span>•</span>
                  <span>{demoStudent.degree}</span>
                  <span>•</span>
                  <span>CGPA: <strong className="text-slate-800 dark:text-slate-200">{demoStudent.cgpa}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
              <Link
                to="/student/passport"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Digital Passport</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Launchpad to All Workspaces */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <span>My Authorized Workspaces & Roles</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Switch operational context instantly with zero logout</p>
            </div>
            <Link
              to="/workspaces"
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
            >
              Open Full Workspace Hub →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {demoWorkspaces.slice(0, 8).map(ws => (
              <Link
                key={ws.id}
                to={ws.route}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-purple-500 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-xl">{ws.icon}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-purple-600">
                      {ws.name.replace(/^[\S\s]+\s/, '')}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{ws.badge}</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Skills & Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Verified Competencies</span>
            </h3>
            <div className="space-y-2.5">
              {demoStudent.skills.map((s, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{s.name}</div>
                    <div className="text-[10px] text-slate-400">{s.level}</div>
                  </div>
                  {s.verified && (
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-md font-bold text-[10px]">
                      ✓ Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Certificates & Honors</span>
            </h3>
            <div className="space-y-2.5">
              {demoStudent.certificates.map((c, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{c.title}</div>
                    <div className="text-[10px] text-slate-400">{c.issuer}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
