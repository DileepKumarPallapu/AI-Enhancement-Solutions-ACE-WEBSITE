export type PlatformRole = 
  | 'PUBLIC_USER'
  | 'STUDENT'
  | 'ORGANIZER'
  | 'COLLEGE_REPRESENTATIVE'
  | 'CAMPUS_AMBASSADOR'
  | 'AMBASSADOR_LEAD'
  | 'ACE_MODERATOR'
  | 'ACE_ADMIN'
  | 'SUPER_ADMIN';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedRole: PlatformRole;
  createdBy: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  targetId?: string;
  targetType?: 'EVENT' | 'COLLEGE' | 'ORGANIZER' | 'COMMUNITY';
  createdAt: string;
}

export type ReportType = 'FAKE_EVENT' | 'SCAM' | 'WRONG_INFO' | 'SPAM' | 'HARASSMENT' | 'BROKEN_REGISTRATION' | 'OTHER';
export type ReportStatus = 'NEW' | 'ASSIGNED' | 'INVESTIGATING' | 'ACTION_REQUIRED' | 'RESOLVED' | 'CLOSED';

export interface ReportRecord {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'EVENT' | 'USER' | 'POST' | 'ORGANIZER';
  targetId: string;
  targetTitle: string;
  reason: ReportType;
  evidence: string;
  status: ReportStatus;
  assignedAdmin?: string;
  resolutionNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: PlatformRole;
  action: 
    | 'CREATE'
    | 'UPDATE'
    | 'DELETE'
    | 'APPROVE'
    | 'REJECT'
    | 'REQUEST_CHANGE'
    | 'RESUBMIT'
    | 'PUBLISH'
    | 'SUSPEND'
    | 'RESTORE'
    | 'ROLE_CHANGE'
    | 'CERTIFICATE_ISSUE'
    | 'ADMIN_OVERRIDE'
    | 'REPORT_RESOLVED';
  targetType: string;
  targetId: string;
  details: string;
  previousValue?: string;
  newValue?: string;
}

export interface SupportTicket {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterRole: PlatformRole;
  subject: string;
  category: 'REGISTRATION' | 'CERTIFICATE' | 'ORGANIZER_VERIFICATION' | 'PAYMENT' | 'TECHNICAL';
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}
