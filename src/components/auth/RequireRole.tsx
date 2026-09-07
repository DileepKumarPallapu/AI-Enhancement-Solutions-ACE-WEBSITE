import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AccountRole } from '../../types/account';
import { ShieldAlert, ArrowLeft, Award, GraduationCap, Building2 } from 'lucide-react';

interface RequireRoleProps {
  allowedRoles: AccountRole[];
  children: React.ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, children }) => {
  const { currentUser, hasRoleAccess } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if current user possesses any of the allowed roles (or is Admin)
  const isAuthorized = allowedRoles.some(r => hasRoleAccess(r)) || currentUser.role === 'ADMIN' || (currentUser.roles && currentUser.roles.includes('ADMIN'));

  if (!isAuthorized) {
    const roleLabels: Record<string, string> = {
      MENTOR: 'Faculty Mentor',
      COLLEGE_AMBASSADOR: 'Campus Ambassador',
      ORGANIZER: 'Event Organizer',
      COLLEGE: 'College Administrator',
      ADMIN: 'Superadmin'
    };

    const targetRoleName = allowedRoles.map(r => roleLabels[r] || r).join(' / ');

    return (
      <div className="min-h-[70vh] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center p-6 transition-colors">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {targetRoleName} Workspace Required
        </h2>

        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6 text-sm">
          Your account (<strong>{currentUser.fullName}</strong>) is currently signed in as a student at <strong>{currentUser.college}</strong>, but does not have an active <strong>{targetRoleName}</strong> enrollment.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {allowedRoles.includes('MENTOR') && (
            <Link
              to="/become-mentor"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center gap-2 shadow-md"
            >
              <GraduationCap className="w-4 h-4" /> Apply as Faculty Mentor
            </Link>
          )}

          {allowedRoles.includes('COLLEGE_AMBASSADOR') && (
            <Link
              to="/ambassador"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition flex items-center gap-2 shadow-md"
            >
              <Award className="w-4 h-4" /> Apply as Campus Ambassador
            </Link>
          )}

          <Link
            to="/student/dashboard"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Student Workspace
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
