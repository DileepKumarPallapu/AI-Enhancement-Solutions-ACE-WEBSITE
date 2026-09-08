// ACE 160X Universal Workspace Database Service
// Centralized multi-workspace architecture, role enrollments, permissions, and audit logs

import { AccountRole } from '../../types/account';
import { accountDb } from './accountDatabase';
import { workflowEngineDatabase } from './workflowEngineDatabase';
import { campusDeadlinesDatabase } from './campusDeadlinesDatabase';

export type WorkspaceType = 
  | 'STUDENT'
  | 'CAMPUS_AMBASSADOR'
  | 'FACULTY_MENTOR'
  | 'ORGANIZER'
  | 'COLLEGE'
  | 'RECRUITER'
  | 'JUDGE'
  | 'ADMIN'
  | 'PLACEMENT'
  | 'CLUB'
  | 'TRAINING_PROVIDER'
  | 'PARTNER';

export type WorkspaceCategory = 'PERSONAL' | 'CAMPUS' | 'ORGANIZATION' | 'PROFESSIONAL' | 'ADMINISTRATION';

export interface UserRoleEnrollmentItem {
  id: string;
  userId: string;
  role: AccountRole;
  institutionId: string;
  institutionName: string;
  organizationId?: string;
  departmentId?: string;
  departmentName?: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'EXPIRED' | 'REVOKED';
  verificationStatus: 'VERIFIED' | 'UNDER_REVIEW' | 'REJECTED';
  permissions: string[];
  assignedAt: string;
  approvedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceItem {
  id: string;
  type: WorkspaceType;
  role: AccountRole;
  category: WorkspaceCategory;
  name: string;
  label: string;
  description: string;
  icon: string;
  route: string;
  userId: string;
  institutionId: string;
  institutionName: string;
  departmentName?: string;
  status: 'ACTIVE' | 'PENDING' | 'LOCKED';
  permissions: string[];
  isFavorite: boolean;
  isDefault: boolean;
  pendingTasksCount: number;
  notificationsCount: number;
  urgentDeadlinesCount: number;
  lastAccessedAt: string;
  quickActions: { label: string; route: string; icon?: string }[];
}

export interface RoleAccessRequest {
  id: string;
  userId: string;
  userName: string;
  requestedRole: AccountRole;
  institutionId: string;
  institutionName: string;
  reason: string;
  documents?: string[];
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  reviewerId?: string;
  reviewerNotes?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceAuditLog {
  id: string;
  userId: string;
  workspaceId: string;
  action: 'WORKSPACE_OPENED' | 'WORKSPACE_SWITCHED' | 'ROLE_REQUESTED' | 'ROLE_APPROVED' | 'ROLE_REVOKED' | 'DEFAULT_SET' | 'FAVORITE_TOGGLED';
  role: AccountRole;
  details: string;
  timestamp: string;
}

class UniversalWorkspaceDatabase {
  private enrollments: Map<string, UserRoleEnrollmentItem[]> = new Map();
  private roleRequests: Map<string, RoleAccessRequest> = new Map();
  private auditLogs: WorkspaceAuditLog[] = [];
  private favorites: Map<string, Set<string>> = new Map();
  private defaultWorkspaces: Map<string, string> = new Map();
  private lastAccessed: Map<string, Map<string, string>> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.seedInitialData();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitialData() {
    const defaultUserId = 'usr-student-001';
    const institutionId = 'inst-vel-tech-rangarajan-avadi';
    const institutionName = 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';

    // Enrollments for the authenticated student
    const defaultEnrollments: UserRoleEnrollmentItem[] = [
      {
        id: 'enr-student-01',
        userId: defaultUserId,
        role: 'STUDENT',
        institutionId,
        institutionName,
        departmentId: 'dept-cse',
        departmentName: 'Computer Science & Engineering',
        status: 'ACTIVE',
        verificationStatus: 'VERIFIED',
        permissions: ['dashboard.view', 'student.view', 'event.view', 'learning.access', 'career.simulate', 'application.manage'],
        assignedAt: '2022-08-01T00:00:00Z',
        approvedAt: '2022-08-01T00:00:00Z',
        createdAt: '2022-08-01T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'enr-ambassador-01',
        userId: defaultUserId,
        role: 'COLLEGE_AMBASSADOR',
        institutionId,
        institutionName,
        departmentId: 'dept-cse',
        departmentName: 'Computer Science & Engineering',
        status: 'ACTIVE',
        verificationStatus: 'VERIFIED',
        permissions: ['dashboard.view', 'ambassador.events', 'ambassador.campaigns', 'ambassador.approvals', 'referral.track'],
        assignedAt: '2025-06-15T00:00:00Z',
        approvedAt: '2025-06-15T00:00:00Z',
        createdAt: '2025-06-15T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'enr-mentor-01',
        userId: defaultUserId,
        role: 'MENTOR',
        institutionId,
        institutionName,
        departmentId: 'dept-cse',
        departmentName: 'Computer Science & Engineering',
        status: 'ACTIVE',
        verificationStatus: 'VERIFIED',
        permissions: ['dashboard.view', 'mentor.view', 'student.guidance', 'session.schedule', 'endorsement.issue'],
        assignedAt: '2025-09-01T00:00:00Z',
        approvedAt: '2025-09-01T00:00:00Z',
        createdAt: '2025-09-01T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'enr-organizer-01',
        userId: defaultUserId,
        role: 'ORGANIZER',
        institutionId,
        institutionName,
        organizationId: 'org-veltech-techfest',
        departmentId: 'dept-cse',
        departmentName: 'Vel Tech TechFest Core Committee',
        status: 'ACTIVE',
        verificationStatus: 'VERIFIED',
        permissions: ['dashboard.view', 'event.create', 'event.manage', 'participant.view', 'certificates.issue'],
        assignedAt: '2025-11-10T00:00:00Z',
        approvedAt: '2025-11-10T00:00:00Z',
        createdAt: '2025-11-10T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      }
    ];

    this.enrollments.set(defaultUserId, defaultEnrollments);

    // Initial favorites & default workspace
    this.favorites.set(defaultUserId, new Set(['STUDENT', 'COLLEGE_AMBASSADOR']));
    this.defaultWorkspaces.set(defaultUserId, 'STUDENT');

    // Role Requests
    const initialRequests: RoleAccessRequest[] = [
      {
        id: 'req-recruiter-01',
        userId: defaultUserId,
        userName: 'Pallapu Dileep Kumar',
        requestedRole: 'RECRUITER',
        institutionId,
        institutionName,
        reason: 'Seeking access to manage campus recruitment drives for collegiate open-source contributors.',
        status: 'PENDING',
        createdAt: '2026-03-05T14:30:00Z',
        updatedAt: '2026-03-05T14:30:00Z'
      },
      {
        id: 'req-judge-01',
        userId: defaultUserId,
        userName: 'Pallapu Dileep Kumar',
        requestedRole: 'JUDGE',
        institutionId,
        institutionName,
        reason: 'Invited as external AI/ML evaluation judge for Vel Tech National Hackathon 2026.',
        status: 'UNDER_REVIEW',
        createdAt: '2026-03-06T10:00:00Z',
        updatedAt: '2026-03-07T09:00:00Z'
      }
    ];

    initialRequests.forEach(r => this.roleRequests.set(r.id, r));

    // Audit logs
    this.auditLogs.push({
      id: 'audit-01',
      userId: defaultUserId,
      workspaceId: 'STUDENT',
      action: 'WORKSPACE_OPENED',
      role: 'STUDENT',
      details: 'Opened Student Workspace from Universal Dashboard Hub',
      timestamp: '2026-03-08T08:30:00Z'
    });
  }

  public getAuthorizedWorkspaces(userId: string = 'usr-student-001'): WorkspaceItem[] {
    const userEnrollments = this.enrollments.get(userId) || [];
    const activeEnrollments = userEnrollments.filter(e => e.status === 'ACTIVE');
    const userFavorites = this.favorites.get(userId) || new Set<string>();
    const defaultWs = this.defaultWorkspaces.get(userId) || 'STUDENT';
    const userLastAccessed = this.lastAccessed.get(userId) || new Map<string, string>();

    const tasks = workflowEngineDatabase.getAllTasks(userId).filter(t => t.status !== 'COMPLETED');
    const deadlines = campusDeadlinesDatabase.getAllDeadlines().filter(d => !d.isCompleted);

    const workspaceRegistry: Record<AccountRole, Omit<WorkspaceItem, 'id' | 'userId' | 'institutionId' | 'institutionName' | 'status' | 'permissions' | 'isFavorite' | 'isDefault' | 'pendingTasksCount' | 'notificationsCount' | 'urgentDeadlinesCount' | 'lastAccessedAt'>> = {
      STUDENT: {
        type: 'STUDENT',
        role: 'STUDENT',
        category: 'PERSONAL',
        name: 'Student Operating System',
        label: 'Student Workspace',
        description: 'B.Tech CSE @ Vel Tech R&D Institute. Access learning paths, career simulator, hackathons, and credentials.',
        icon: '🎓',
        route: '/student/dashboard',
        quickActions: [
          { label: 'Career OS', route: '/career' },
          { label: 'Applications', route: '/applications' },
          { label: 'Skill Graph', route: '/skills' }
        ]
      },
      COLLEGE_AMBASSADOR: {
        type: 'CAMPUS_AMBASSADOR',
        role: 'COLLEGE_AMBASSADOR',
        category: 'CAMPUS',
        name: 'Campus Ambassador Directorate',
        label: 'Campus Ambassador Workspace',
        description: 'Lead Vel Tech campus initiatives, review event proposals, monitor referrals, and launch campaigns.',
        icon: '📣',
        route: '/ambassador/dashboard',
        quickActions: [
          { label: 'Event Approvals', route: '/ambassador/event-approvals' },
          { label: 'Campaigns', route: '/ambassador/campaigns' },
          { label: 'Tasks', route: '/ambassador/tasks' }
        ]
      },
      MENTOR: {
        type: 'FACULTY_MENTOR',
        role: 'MENTOR',
        category: 'CAMPUS',
        name: 'Faculty Mentorship Hub',
        label: 'Faculty Mentor Workspace',
        description: 'Provide research guidance, approve project lab milestones, conduct 1-on-1 sprint reviews, and endorse skills.',
        icon: '👨‍🏫',
        route: '/mentor/dashboard',
        quickActions: [
          { label: 'Student Progress', route: '/mentor/dashboard' },
          { label: 'Session Calendar', route: '/calendar' },
          { label: 'Approvals', route: '/approvals' }
        ]
      },
      ORGANIZER: {
        type: 'ORGANIZER',
        role: 'ORGANIZER',
        category: 'ORGANIZATION',
        name: 'Event Organizer Command',
        label: 'Event Organizer Workspace',
        description: 'Coordinate collegiate hackathons, manage registrations, attendance QR check-ins, and automate certificates.',
        icon: '🎫',
        route: '/organizer/dashboard',
        quickActions: [
          { label: 'Manage Events', route: '/organizer/dashboard' },
          { label: 'Workflows', route: '/workflows' },
          { label: 'Scan Check-In', route: '/student/id' }
        ]
      },
      COLLEGE: {
        type: 'COLLEGE',
        role: 'COLLEGE',
        category: 'ORGANIZATION',
        name: 'Institution Directorate OS',
        label: 'College Dashboard',
        description: 'Department hierarchy, faculty allocation, institutional accreditation metrics, and placement governance.',
        icon: '🏫',
        route: '/college/dashboard',
        quickActions: [
          { label: 'Placement Cell', route: '/placement' },
          { label: 'Departments', route: '/college' },
          { label: 'Reports', route: '/reports' }
        ]
      },
      RECRUITER: {
        type: 'RECRUITER',
        role: 'RECRUITER',
        category: 'PROFESSIONAL',
        name: 'Recruiter & Talent Radar',
        label: 'Recruiter Dashboard',
        description: 'Filter verified candidate profiles, post internships & fellowships, schedule interviews, and issue offers.',
        icon: '💼',
        route: '/recruiter/dashboard',
        quickActions: [
          { label: 'Talent Radar', route: '/recruiter/dashboard' },
          { label: 'Interviews', route: '/interviews' },
          { label: 'Offers', route: '/career/offers' }
        ]
      },
      JUDGE: {
        type: 'JUDGE',
        role: 'JUDGE',
        category: 'PROFESSIONAL',
        name: 'Judge & Competition Arena',
        label: 'Judge Dashboard',
        description: 'Evaluate assigned hackathon submissions, grade rubric criteria, submit feedback, and view leaderboards.',
        icon: '⚖️',
        route: '/judge/dashboard',
        quickActions: [
          { label: 'Assigned Submissions', route: '/judge/dashboard' },
          { label: 'Competitions', route: '/competitions' },
          { label: 'Leaderboard', route: '/competitions' }
        ]
      },
      ADMIN: {
        type: 'ADMIN',
        role: 'ADMIN',
        category: 'ADMINISTRATION',
        name: 'Platform Security & Governance',
        label: 'Superadmin Dashboard',
        description: 'Global user management, role enrollments, workflow failure queues, AI token cost center, and system health.',
        icon: '🛡️',
        route: '/admin/dashboard',
        quickActions: [
          { label: 'Workspaces Admin', route: '/admin/workspaces' },
          { label: 'AI Cost Center', route: '/admin/ai/usage' },
          { label: 'Coverage Audit', route: '/admin/frontend-coverage' }
        ]
      },
      SUPER_ADMIN: {
        type: 'ADMIN',
        role: 'SUPER_ADMIN',
        category: 'ADMINISTRATION',
        name: 'Platform Security Directorate',
        label: 'Superadmin Dashboard',
        description: 'Master platform controls, system health, and cross-organization governance.',
        icon: '🛡️',
        route: '/admin/dashboard',
        quickActions: [
          { label: 'Workspaces Admin', route: '/admin/workspaces' },
          { label: 'System Health', route: '/admin/system' }
        ]
      }
    };

    return activeEnrollments.map(enr => {
      const reg = workspaceRegistry[enr.role] || workspaceRegistry.STUDENT;
      const isFav = userFavorites.has(enr.role);
      const isDef = defaultWs === enr.role;
      const lastAcc = userLastAccessed.get(enr.role) || 'Recently';

      return {
        id: `ws-${enr.role.toLowerCase()}-${userId}`,
        type: reg.type,
        role: enr.role,
        category: reg.category,
        name: reg.name,
        label: reg.label,
        description: reg.description,
        icon: reg.icon,
        route: reg.route,
        userId,
        institutionId: enr.institutionId,
        institutionName: enr.institutionName,
        departmentName: enr.departmentName,
        status: 'ACTIVE',
        permissions: enr.permissions,
        isFavorite: isFav,
        isDefault: isDef,
        pendingTasksCount: enr.role === 'STUDENT' ? tasks.length : Math.max(1, Math.floor(tasks.length / 2)),
        notificationsCount: enr.role === 'STUDENT' ? 3 : 2,
        urgentDeadlinesCount: enr.role === 'STUDENT' ? deadlines.length : 1,
        lastAccessedAt: lastAcc,
        quickActions: reg.quickActions
      };
    });
  }

  public switchActiveWorkspace(userId: string = 'usr-student-001', role: AccountRole): { success: boolean; targetRoute: string; error?: string } {
    const enrollments = this.enrollments.get(userId) || [];
    const valid = enrollments.find(e => e.role === role && e.status === 'ACTIVE');
    if (!valid) {
      return { success: false, targetRoute: '/workspaces', error: `Unauthorized: User has no active role enrollment for ${role}` };
    }

    // Update last accessed
    if (!this.lastAccessed.has(userId)) {
      this.lastAccessed.set(userId, new Map());
    }
    this.lastAccessed.get(userId)!.set(role, new Date().toISOString());

    // Record audit log
    this.auditLogs.push({
      id: `audit-${Date.now()}`,
      userId,
      workspaceId: `ws-${role.toLowerCase()}-${userId}`,
      action: 'WORKSPACE_SWITCHED',
      role,
      details: `Switched active workspace to ${role}`,
      timestamp: new Date().toISOString()
    });

    this.notify();

    const routeMap: Record<AccountRole, string> = {
      STUDENT: '/student/dashboard',
      COLLEGE_AMBASSADOR: '/ambassador/dashboard',
      MENTOR: '/mentor/dashboard',
      ORGANIZER: '/organizer/dashboard',
      COLLEGE: '/college/dashboard',
      RECRUITER: '/recruiter/dashboard',
      JUDGE: '/judge/dashboard',
      ADMIN: '/admin/dashboard',
      SUPER_ADMIN: '/admin/dashboard'
    };

    return { success: true, targetRoute: routeMap[role] || '/student/dashboard' };
  }

  public toggleFavoriteWorkspace(userId: string = 'usr-student-001', role: string): boolean {
    if (!this.favorites.has(userId)) {
      this.favorites.set(userId, new Set());
    }
    const favs = this.favorites.get(userId)!;
    if (favs.has(role)) {
      favs.delete(role);
    } else {
      favs.add(role);
    }

    this.auditLogs.push({
      id: `audit-${Date.now()}`,
      userId,
      workspaceId: `ws-${role.toLowerCase()}-${userId}`,
      action: 'FAVORITE_TOGGLED',
      role: role as AccountRole,
      details: `Toggled favorite status for ${role}`,
      timestamp: new Date().toISOString()
    });

    this.notify();
    return favs.has(role);
  }

  public setDefaultWorkspace(userId: string = 'usr-student-001', role: string): boolean {
    this.defaultWorkspaces.set(userId, role);
    this.auditLogs.push({
      id: `audit-${Date.now()}`,
      userId,
      workspaceId: `ws-${role.toLowerCase()}-${userId}`,
      action: 'DEFAULT_SET',
      role: role as AccountRole,
      details: `Set default login workspace to ${role}`,
      timestamp: new Date().toISOString()
    });
    this.notify();
    return true;
  }

  public getDefaultWorkspace(userId: string = 'usr-student-001'): string {
    return this.defaultWorkspaces.get(userId) || 'STUDENT';
  }

  public submitRoleAccessRequest(input: {
    userId: string;
    userName: string;
    requestedRole: AccountRole;
    reason: string;
    institutionId?: string;
    institutionName?: string;
  }): RoleAccessRequest {
    const newReq: RoleAccessRequest = {
      id: `req-${input.requestedRole.toLowerCase()}-${Date.now()}`,
      userId: input.userId,
      userName: input.userName,
      requestedRole: input.requestedRole,
      institutionId: input.institutionId || 'inst-vel-tech-rangarajan-avadi',
      institutionName: input.institutionName || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      reason: input.reason,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.roleRequests.set(newReq.id, newReq);

    this.auditLogs.push({
      id: `audit-${Date.now()}`,
      userId: input.userId,
      workspaceId: `ws-${input.requestedRole.toLowerCase()}-${input.userId}`,
      action: 'ROLE_REQUESTED',
      role: input.requestedRole,
      details: `Submitted access request for ${input.requestedRole}`,
      timestamp: new Date().toISOString()
    });

    this.notify();
    return newReq;
  }

  public getAllRoleRequests(): RoleAccessRequest[] {
    return Array.from(this.roleRequests.values());
  }

  public reviewRoleAccessRequest(requestId: string, status: 'APPROVED' | 'REJECTED', reviewerId: string = 'admin-001', reviewerNotes?: string): boolean {
    const req = this.roleRequests.get(requestId);
    if (!req) return false;

    req.status = status;
    req.reviewerId = reviewerId;
    req.reviewerNotes = reviewerNotes || `Request ${status.toLowerCase()} by platform administrator.`;
    req.reviewedAt = new Date().toISOString();
    req.updatedAt = new Date().toISOString();

    if (status === 'APPROVED') {
      // Add enrollment
      const userEnrs = this.enrollments.get(req.userId) || [];
      const newEnr: UserRoleEnrollmentItem = {
        id: `enr-${req.requestedRole.toLowerCase()}-${Date.now()}`,
        userId: req.userId,
        role: req.requestedRole,
        institutionId: req.institutionId,
        institutionName: req.institutionName,
        status: 'ACTIVE',
        verificationStatus: 'VERIFIED',
        permissions: ['dashboard.view', `${req.requestedRole.toLowerCase()}.access`],
        assignedAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      userEnrs.push(newEnr);
      this.enrollments.set(req.userId, userEnrs);

      this.auditLogs.push({
        id: `audit-${Date.now()}`,
        userId: req.userId,
        workspaceId: `ws-${req.requestedRole.toLowerCase()}-${req.userId}`,
        action: 'ROLE_APPROVED',
        role: req.requestedRole,
        details: `Role request ${req.id} approved by ${reviewerId}`,
        timestamp: new Date().toISOString()
      });
    }

    this.notify();
    return true;
  }

  public assignUserRole(userId: string, role: AccountRole, institutionName: string = 'Vel Tech R&D Institute'): UserRoleEnrollmentItem {
    const userEnrs = this.enrollments.get(userId) || [];
    const newEnr: UserRoleEnrollmentItem = {
      id: `enr-${role.toLowerCase()}-${Date.now()}`,
      userId,
      role,
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      institutionName,
      status: 'ACTIVE',
      verificationStatus: 'VERIFIED',
      permissions: ['dashboard.view', `${role.toLowerCase()}.manage`],
      assignedAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    userEnrs.push(newEnr);
    this.enrollments.set(userId, userEnrs);
    this.notify();
    return newEnr;
  }

  public revokeUserRole(userId: string, role: AccountRole): boolean {
    const userEnrs = this.enrollments.get(userId) || [];
    const updated = userEnrs.filter(e => e.role !== role);
    this.enrollments.set(userId, updated);

    this.auditLogs.push({
      id: `audit-${Date.now()}`,
      userId,
      workspaceId: `ws-${role.toLowerCase()}-${userId}`,
      action: 'ROLE_REVOKED',
      role,
      details: `Revoked role ${role} from user`,
      timestamp: new Date().toISOString()
    });

    this.notify();
    return true;
  }

  public getWorkspaceAuditLogs(userId?: string): WorkspaceAuditLog[] {
    if (userId) {
      return this.auditLogs.filter(a => a.userId === userId);
    }
    return this.auditLogs;
  }

  public getAdminWorkspaceAnalytics() {
    let totalActiveWorkspaces = 0;
    const roleCounts: Record<string, number> = {};

    this.enrollments.forEach(enrs => {
      enrs.filter(e => e.status === 'ACTIVE').forEach(e => {
        totalActiveWorkspaces++;
        roleCounts[e.role] = (roleCounts[e.role] || 0) + 1;
      });
    });

    return {
      totalActiveWorkspaces,
      pendingRequestsCount: Array.from(this.roleRequests.values()).filter(r => r.status === 'PENDING').length,
      roleDistribution: Object.entries(roleCounts).map(([role, count]) => ({ role, count })),
      auditLogCount: this.auditLogs.length
    };
  }
}

export const universalWorkspaceDatabase = new UniversalWorkspaceDatabase();
