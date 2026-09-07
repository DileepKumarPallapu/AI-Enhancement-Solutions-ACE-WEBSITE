import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlatformRole, TaskRecord, ReportRecord, AuditLogEntry, SupportTicket } from '../types/management';
import { useAuth } from './AuthContext';

interface ManagementContextType {
  activeRole: PlatformRole;
  setActiveRole: (role: PlatformRole) => void;
  activePersona: { name: string; email: string; college: string };
  switchPersona: (role: PlatformRole) => void;
  tasks: TaskRecord[];
  updateTaskStatus: (taskId: string, status: TaskRecord['status']) => void;
  createTask: (task: Omit<TaskRecord, 'id' | 'createdAt'>) => void;
  reports: ReportRecord[];
  updateReportStatus: (reportId: string, status: ReportRecord['status'], note?: string) => void;
  createReport: (report: Omit<ReportRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  auditLogs: AuditLogEntry[];
  logAuditAction: (action: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => void;
}

const defaultTasks: TaskRecord[] = [
  {
    id: 'TSK-101',
    title: 'Review HACKVERSE 2.0 Submissions',
    description: 'Verify registration domain and poster dates for CSE hackathon.',
    assignedTo: 'Campus Ambassador Lead',
    assignedRole: 'CAMPUS_AMBASSADOR',
    createdBy: 'ACE Admin Lead',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: '2026-10-10',
    targetId: 'ACE-EVT-2026-000184',
    targetType: 'EVENT',
    createdAt: '2026-09-02'
  },
  {
    id: 'TSK-102',
    title: 'Verify College Department Accreditation',
    description: 'Check AI & Data Science department registry details.',
    assignedTo: 'Campus Ambassador Lead',
    assignedRole: 'CAMPUS_AMBASSADOR',
    createdBy: 'ACE Admin Lead',
    priority: 'MEDIUM',
    status: 'TODO',
    dueDate: '2026-10-15',
    targetType: 'COLLEGE',
    createdAt: '2026-09-02'
  }
];

const defaultReports: ReportRecord[] = [
  {
    id: 'REP-401',
    reporterId: 'stu-992',
    reporterName: 'Kavitha R',
    targetType: 'EVENT',
    targetId: 'ACE-EVT-2026-000182',
    targetTitle: 'National Cybersecurity Summit',
    reason: 'WRONG_INFO',
    evidence: 'The date on the flyer says 18 Oct but the registration form stated 15 Oct.',
    status: 'INVESTIGATING',
    assignedAdmin: 'ACE Security Admin',
    createdAt: '2026-09-02',
    updatedAt: '2026-09-02'
  }
];

const defaultAuditLogs: AuditLogEntry[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-09-02 21:30:00',
    actorId: 'usr-admin-1',
    actorName: 'Super Admin',
    actorRole: 'SUPER_ADMIN',
    action: 'ADMIN_OVERRIDE',
    targetType: 'EVENT',
    targetId: 'ACE-EVT-2026-000184',
    details: 'Approved HACKVERSE 2.0 after manual phone verification with college dean.',
    previousValue: 'PENDING_ACE_ADMIN',
    newValue: 'PUBLISHED'
  }
];

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, activeRole: authRole, switchWorkspace } = useAuth();
  
  const activeRole = (authRole as PlatformRole) || 'STUDENT';
  const setActiveRole = (role: PlatformRole) => {
    switchWorkspace(role as any);
  };

  const activePersona = {
    name: currentUser?.fullName || currentUser?.displayName || 'Dileep Kumar',
    email: currentUser?.email || 'dileep.kumar@psgtech.edu',
    college: currentUser?.college || 'PSG College of Technology'
  };

  const [tasks, setTasks] = useState<TaskRecord[]>(() => {
    const saved = localStorage.getItem('ace_tasks');
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  const [reports, setReports] = useState<ReportRecord[]>(() => {
    const saved = localStorage.getItem('ace_reports');
    return saved ? JSON.parse(saved) : defaultReports;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('ace_audit_logs');
    return saved ? JSON.parse(saved) : defaultAuditLogs;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    localStorage.setItem('ace_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ace_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('ace_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const switchPersona = (role: PlatformRole) => {
    switchWorkspace(role as any);
  };

  const updateTaskStatus = (taskId: string, status: TaskRecord['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const createTask = (task: Omit<TaskRecord, 'id' | 'createdAt'>) => {
    const newTask: TaskRecord = {
      ...task,
      id: `TSK-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateReportStatus = (reportId: string, status: ReportRecord['status'], note?: string) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status,
          assignedAdmin: note ? `${r.assignedAdmin || 'Admin'} - Note: ${note}` : r.assignedAdmin,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return r;
    }));
  };

  const createReport = (report: Omit<ReportRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newReport: ReportRecord = {
      ...report,
      id: `REP-${Date.now().toString().slice(-4)}`,
      status: 'INVESTIGATING',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setReports(prev => [newReport, ...prev]);
  };

  const logAuditAction = (action: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditLogEntry = {
      ...action,
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const createSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `TCK-${Date.now().toString().slice(-4)}`,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  };

  return (
    <ManagementContext.Provider
      value={{
        activeRole,
        setActiveRole,
        activePersona,
        switchPersona,
        tasks,
        updateTaskStatus,
        createTask,
        reports,
        updateReportStatus,
        createReport,
        auditLogs,
        logAuditAction,
        supportTickets,
        createSupportTicket
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export const useManagement = () => {
  const context = useContext(ManagementContext);
  if (!context) throw new Error('useManagement must be used within ManagementProvider');
  return context;
};
