import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  PlusCircle, 
  Search, 
  Activity, 
  FileText,
  UserCheck,
  Calendar,
  Lock,
  Unlock
} from 'lucide-react';
import { universalWorkspaceDatabase, RoleAccessRequest, WorkspaceAuditLog, UserRoleEnrollmentItem } from '../../services/db/universalWorkspaceDatabase';
import { AccountRole } from '../../types/account';

export const AdminWorkspaceManagementPage: React.FC = () => {
  const [requests, setRequests] = useState<RoleAccessRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<WorkspaceAuditLog[]>([]);
  const [analytics, setAnalytics] = useState(universalWorkspaceDatabase.getAdminWorkspaceAnalytics());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleToAssign, setSelectedRoleToAssign] = useState<AccountRole>('RECRUITER');
  const [targetUserId, setTargetUserId] = useState('usr-student-001');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    setRequests(universalWorkspaceDatabase.getAllRoleRequests());
    setAuditLogs(universalWorkspaceDatabase.getWorkspaceAuditLogs());
    setAnalytics(universalWorkspaceDatabase.getAdminWorkspaceAnalytics());
  };

  useEffect(() => {
    loadData();
    const unsub = universalWorkspaceDatabase.subscribe(loadData);
    return () => { unsub(); };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApproveRequest = (id: string) => {
    universalWorkspaceDatabase.reviewRoleAccessRequest(id, 'APPROVED', 'admin-super-01', 'Approved by System Superadmin');
    loadData();
    showToast('Role access request approved & workspace provisioned.');
  };

  const handleRejectRequest = (id: string) => {
    universalWorkspaceDatabase.reviewRoleAccessRequest(id, 'REJECTED', 'admin-super-01', 'Insufficient institutional evidence provided.');
    loadData();
    showToast('Role access request rejected.');
  };

  const handleAssignRole = (e: React.FormEvent) => {
    e.preventDefault();
    universalWorkspaceDatabase.assignUserRole(targetUserId, selectedRoleToAssign);
    loadData();
    showToast(`Role ${selectedRoleToAssign} assigned to ${targetUserId}.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <Link to="/admin/dashboard" className="hover:text-purple-600">Admin Dashboard</Link>
              <span>/</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">Workspace Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-purple-600" />
              <span>Workspace Administration & Role Governance</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Audit multi-role enrollments, approve workspace access requests, and enforce institutional security boundaries.
            </p>
          </div>

          <Link
            to="/workspaces"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            ← Open Workspace Hub
          </Link>
        </div>

        {/* Analytics KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Active Workspaces</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analytics.totalActiveWorkspaces}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Verified Enrollments</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Pending Requests</span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {analytics.pendingRequestsCount}
            </div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1">Requires Administrator Review</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Role Distribution</span>
              <Building2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              {analytics.roleDistribution.length} Distinct
            </div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1">Student, Ambassador, Mentor, Admin</div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Audit Log Trails</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {analytics.auditLogCount}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Immutable Security Records</div>
          </div>
        </div>

        {/* Pending Requests Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-600" />
              <span>Pending Role Access Requests</span>
            </h2>
            <span className="text-xs text-slate-500">{requests.filter(r => r.status === 'PENDING' || r.status === 'UNDER_REVIEW').length} pending review</span>
          </div>

          {requests.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No role requests in queue.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-black tracking-wider">
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Requested Role</th>
                    <th className="py-3 px-4">Institution Context</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {requests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {req.userName}
                        <div className="text-[10px] text-slate-400 font-normal">{req.userId}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-lg font-extrabold text-[11px]">
                          {req.requestedRole}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {req.institutionName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 max-w-xs">
                        {req.reason}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          req.status === 'REJECTED' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {req.status === 'PENDING' || req.status === 'UNDER_REVIEW' ? (
                          <>
                            <button
                              onClick={() => handleApproveRequest(req.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectRequest(req.id)}
                              className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-bold transition-all"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-slate-400 text-xs">Reviewed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Fast Role Provisioning Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-purple-600" />
            <span>Direct Role Provisioning</span>
          </h2>
          <form onSubmit={handleAssignRole} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target User ID</label>
              <input
                type="text"
                value={targetUserId}
                onChange={e => setTargetUserId(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Authorize Role</label>
              <select
                value={selectedRoleToAssign}
                onChange={e => setSelectedRoleToAssign(e.target.value as AccountRole)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-purple-500"
              >
                <option value="RECRUITER">RECRUITER</option>
                <option value="JUDGE">JUDGE</option>
                <option value="COLLEGE">COLLEGE</option>
                <option value="ORGANIZER">ORGANIZER</option>
                <option value="MENTOR">MENTOR</option>
                <option value="COLLEGE_AMBASSADOR">COLLEGE_AMBASSADOR</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Provision Role Access
            </button>
          </form>
        </div>

        {/* Audit Log Stream */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Workspace Audit Trail</span>
            </h2>
            <span className="text-xs text-slate-500">{auditLogs.length} events logged</span>
          </div>

          <div className="space-y-2">
            {auditLogs.slice(-6).reverse().map(log => (
              <div
                key={log.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-md font-bold text-[10px]">
                    {log.action}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{log.details}</span>
                </div>
                <div className="text-slate-400 font-medium text-[11px]">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
