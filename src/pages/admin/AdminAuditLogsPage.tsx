import React, { useState } from 'react';
import { History, ShieldCheck, Search, Filter, Calendar, UserCheck, AlertCircle } from 'lucide-react';
import { useManagement } from '../../context/ManagementContext';
import { PageHeader } from '../../components/common/PageHeader';

export const AdminAuditLogsPage: React.FC = () => {
  const { auditLogs } = useManagement();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = auditLogs.filter(l => 
    l.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.targetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      <PageHeader
        eyebrow="PLATFORM GOVERNANCE"
        title="Immutable System"
        highlight="Audit Trail."
        subtitle="Chronological record of every moderation action, permission change, event publication, and admin override."
      />

      {/* Search Filter */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter by actor, event ID, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs bg-transparent outline-none text-slate-800 dark:text-slate-200"
        />
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Actor & Role</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target ID</th>
                <th className="p-4">Details & Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors font-medium">
                  <td className="p-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{log.actorName}</span>
                    <span className="text-[10px] text-purple-600 font-mono font-bold">{log.actorRole}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-brand-700 dark:text-brand-300 font-mono text-[10px] font-black">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-600 dark:text-slate-300">{log.targetId}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
