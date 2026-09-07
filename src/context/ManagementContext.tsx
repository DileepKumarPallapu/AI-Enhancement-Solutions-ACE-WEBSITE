import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlatformRole, TaskRecord, ReportRecord, AuditLogEntry, SupportTicket } from '../types/management';
import { useAuth } from './AuthContext';
import { accountDb } from '../services/db/accountDatabase';
import { chatDb } from '../services/db/chatDatabase';

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
    reporterId: 'usr_student_dileep',
    reporterName: 'Dileep Kumar',
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
    actorId: 'usr_admin',
    actorName: 'Super Admin',
    actorRole: 'SUPER_ADMIN',
    action: 'ADMIN_OVERRIDE',
    targetType: 'EVENT',
    targetId: 'ACE-EVT-2026-000184',
    details: 'Approved HACKVERSE 2.0 after manual phone verification with college dean.',
    previousValue: 'PENDING_REVIEW',
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
    email: currentUser?.email || 'dileep.kumar@veltech.edu.in',
    college: currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'
  };

  const [tasks, setTasks] = useState<TaskRecord[]>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('ace_mgmt_tasks') : null;
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  const [reports, setReports] = useState<ReportRecord[]>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('ace_mgmt_reports') : null;
    return saved ? JSON.parse(saved) : defaultReports;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    return defaultAuditLogs;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const dbTickets = chatDb.getAllTickets();
    return dbTickets.map(t => ({
      id: t.id,
      requesterId: t.userId,
      requesterName: t.userName,
      requesterRole: 'STUDENT' as PlatformRole,
      category: 'TECHNICAL' as any,
      subject: t.subject,
      message: t.messages[0]?.text || '',
      status: 'OPEN',
      createdAt: t.createdAt
    }));
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ace_mgmt_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ace_mgmt_reports', JSON.stringify(reports));
    }
  }, [reports]);

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
    setReports(prev => prev.map(r => r.id === reportId ? {
      ...r,
      status,
      resolutionNote: note || r.resolutionNote,
      updatedAt: new Date().toISOString().split('T')[0]
    } : r));
  };

  const createReport = (report: Omit<ReportRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newReport: ReportRecord = {
      ...report,
      id: `REP-${Date.now().toString().slice(-4)}`,
      status: 'INVESTIGATING',
      createdAt: now,
      updatedAt: now
    };
    setReports(prev => [newReport, ...prev]);
  };

  const logAuditAction = (action: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newLog: AuditLogEntry = {
      ...action,
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const createSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    chatDb.createTicket({
      userId: currentUser?.id || 'usr_student_dileep',
      userName: currentUser?.fullName || 'Dileep Kumar',
      userEmail: currentUser?.email || 'dileep.kumar@veltech.edu.in',
      userCollege: currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      subject: ticket.subject,
      category: 'OTHER',
      priority: 'MEDIUM',
      messages: [{ sender: currentUser?.fullName || 'Student', text: ticket.message, timestamp: new Date().toISOString() }]
    });

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
        switchPersona: setActiveRole,
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
