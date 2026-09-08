// ACE 90X Student Safety, Block/Mute & Moderation Report Database
// Handles user blocking, content reporting lifecycle (NEW -> INVESTIGATING -> ACTIONED -> DISMISSED -> APPEALED), and GDPR/DPDP data exports

export type ReportCategory = 'SPAM' | 'HARASSMENT' | 'SCAM' | 'FAKE_ACCOUNT' | 'INAPPROPRIATE_CONTENT' | 'OTHER';
export type ReportStatus = 'NEW' | 'INVESTIGATING' | 'ACTIONED' | 'DISMISSED' | 'APPEALED';

export interface SafetyReport {
  id: string;
  reporterId: string;
  reporterName: string;
  targetId: string;
  targetType: 'USER' | 'POST' | 'MESSAGE' | 'COMMUNITY' | 'EVENT';
  targetTitle: string;
  category: ReportCategory;
  reason: string;
  evidenceUrls: string[];
  status: ReportStatus;
  moderatorNotes?: string;
  actionTaken?: string;
  appealReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlockedUser {
  id: string;
  blockedUserId: string;
  blockedUserName: string;
  blockedUserAvatar: string;
  reason?: string;
  blockedAt: string;
}

export interface DataExportRequest {
  id: string;
  userId: string;
  status: 'PENDING' | 'GENERATED' | 'DOWNLOADED';
  downloadUrl?: string;
  requestedAt: string;
  completedAt?: string;
}

const REPORTS_STORAGE = 'ace_db_safety_reports_v90';
const BLOCKED_STORAGE = 'ace_db_blocked_users_v90';

class StudentSafetyDatabase {
  private reports: Map<string, SafetyReport> = new Map();
  private blockedUsers: Map<string, BlockedUser> = new Map();
  private exportRequests: DataExportRequest[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.reports.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawReports = localStorage.getItem(REPORTS_STORAGE);
        if (rawReports) {
          const items: SafetyReport[] = JSON.parse(rawReports);
          items.forEach(r => this.reports.set(r.id, r));
        }
        const rawBlocked = localStorage.getItem(BLOCKED_STORAGE);
        if (rawBlocked) {
          const items: BlockedUser[] = JSON.parse(rawBlocked);
          items.forEach(b => this.blockedUsers.set(b.id, b));
        }
      }
    } catch (e) {
      console.warn('Failed to load safety storage', e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(REPORTS_STORAGE, JSON.stringify(Array.from(this.reports.values())));
        localStorage.setItem(BLOCKED_STORAGE, JSON.stringify(Array.from(this.blockedUsers.values())));
      }
      this.listeners.forEach(fn => fn());
    } catch (e) {
      console.warn('Failed to save safety storage', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const seedReports: SafetyReport[] = [
      {
        id: 'rep_1',
        reporterId: 'usr_student_dileep',
        reporterName: 'Dileep Kumar',
        targetId: 'post_fake_crypto',
        targetType: 'POST',
        targetTitle: 'Promotional crypto mining scheme in college forum',
        category: 'SCAM',
        reason: 'Suspicious external link requesting college credentials.',
        evidenceUrls: ['https://ace.edu/evidence/sample1.png'],
        status: 'ACTIONED',
        moderatorNotes: 'Confirmed phishing URL. Post permanently removed and user flagged.',
        actionTaken: 'CONTENT_REMOVED',
        createdAt: '2026-02-28T10:00:00Z',
        updatedAt: '2026-02-28T14:00:00Z'
      }
    ];

    seedReports.forEach(r => this.reports.set(r.id, r));
    this.saveToStorage();
  }

  public getReportsForUser(userId: string = 'usr_student_dileep'): SafetyReport[] {
    return Array.from(this.reports.values()).filter(r => r.reporterId === userId);
  }

  public getAllModeratorReports(): SafetyReport[] {
    return Array.from(this.reports.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public submitReport(targetId: string, targetType: SafetyReport['targetType'], targetTitle: string, category: ReportCategory, reason: string, evidenceUrls: string[] = []): SafetyReport {
    const newReport: SafetyReport = {
      id: `rep_${Date.now()}`,
      reporterId: 'usr_student_dileep',
      reporterName: 'Dileep Kumar',
      targetId,
      targetType,
      targetTitle,
      category,
      reason,
      evidenceUrls,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.reports.set(newReport.id, newReport);
    this.saveToStorage();
    return newReport;
  }

  public triageReport(reportId: string, status: ReportStatus, moderatorNotes?: string, actionTaken?: string): boolean {
    const rep = this.reports.get(reportId);
    if (!rep) return false;
    rep.status = status;
    if (moderatorNotes) rep.moderatorNotes = moderatorNotes;
    if (actionTaken) rep.actionTaken = actionTaken;
    rep.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return true;
  }

  public appealReport(reportId: string, appealReason: string): boolean {
    const rep = this.reports.get(reportId);
    if (!rep) return false;
    rep.status = 'APPEALED';
    rep.appealReason = appealReason;
    rep.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return true;
  }

  public getBlockedUsers(): BlockedUser[] {
    return Array.from(this.blockedUsers.values());
  }

  public blockUser(blockedUserId: string, blockedUserName: string, blockedUserAvatar: string, reason?: string): BlockedUser {
    const id = `block_${blockedUserId}`;
    const blocked: BlockedUser = {
      id,
      blockedUserId,
      blockedUserName,
      blockedUserAvatar,
      reason,
      blockedAt: new Date().toISOString()
    };
    this.blockedUsers.set(id, blocked);
    this.saveToStorage();
    return blocked;
  }

  public unblockUser(blockedUserId: string): boolean {
    const id = `block_${blockedUserId}`;
    const deleted = this.blockedUsers.delete(id);
    if (deleted) this.saveToStorage();
    return deleted;
  }

  public requestDataExport(): DataExportRequest {
    const req: DataExportRequest = {
      id: `exp_${Date.now()}`,
      userId: 'usr_student_dileep',
      status: 'GENERATED',
      downloadUrl: 'https://ace.edu/api/v1/export/student_dileep_gdpr.json',
      requestedAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };
    this.exportRequests.push(req);
    return req;
  }
}

export const studentSafetyDatabase = new StudentSafetyDatabase();
