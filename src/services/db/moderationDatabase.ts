/**
 * ACE 50X — Moderation, Reporting & Appeals Workflow Database Service
 * Full lifecycle: Reported -> Triage -> Investigation -> Action -> Resolved -> Appeal
 */

export type ReportCategory =
  | 'SCAM_OR_FRAUD'
  | 'FAKE_EVENT'
  | 'INCORRECT_INFO'
  | 'SPAM'
  | 'COPYRIGHT'
  | 'HARASSMENT'
  | 'SUSPICIOUS_ACCOUNT'
  | 'OTHER';

export type ModerationStatus = 'REPORTED' | 'TRIAGE' | 'INVESTIGATION' | 'ACTION_TAKEN' | 'RESOLVED' | 'DISMISSED';

export interface UserReport {
  id: string;
  reporterId: string;
  resourceType: 'EVENT' | 'USER' | 'ORGANIZATION' | 'OPPORTUNITY' | 'CERTIFICATE' | 'POST';
  resourceId: string;
  category: ReportCategory;
  reason: string;
  evidenceUrl?: string;
  status: ModerationStatus;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  appeal?: {
    id: string;
    appealReason: string;
    submittedAt: string;
    reviewerNotes?: string;
    decision: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    decidedAt?: string;
  };
}

const STORAGE_KEY = 'ace_moderation_reports_v1';

class ModerationDatabaseService {
  private reports: Map<string, UserReport> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed: UserReport[] = JSON.parse(data);
          parsed.forEach(r => this.reports.set(r.id, r));
          return;
        }
      }
    } catch {
      // fallback
    }

    const seed: UserReport[] = [
      {
        id: 'rep-101',
        reporterId: 'usr_student_dileep',
        resourceType: 'OPPORTUNITY',
        resourceId: 'opp-unverified-09',
        category: 'INCORRECT_INFO',
        reason: 'Eligibility mentions 2025 batch but event title states 2026 batch.',
        status: 'RESOLVED',
        severity: 'LOW',
        adminNotes: 'Organizer updated eligibility criteria to reflect 2026 batch.',
        createdAt: '2026-03-01T10:00:00Z',
        updatedAt: '2026-03-02T12:00:00Z'
      },
      {
        id: 'rep-102',
        reporterId: 'usr-student-001',
        resourceType: 'EVENT',
        resourceId: 'evt-suspicious-88',
        category: 'SPAM',
        reason: 'Duplicate event posting with broken external links.',
        status: 'TRIAGE',
        severity: 'MEDIUM',
        adminNotes: 'Assigned to Trust & Safety reviewer.',
        createdAt: '2026-03-07T14:20:00Z',
        updatedAt: '2026-03-07T14:20:00Z'
      }
    ];

    seed.forEach(r => this.reports.set(r.id, r));
    this.persist();
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.reports.values())));
      }
    } catch {
      // ignore
    }
  }

  public getReports(): UserReport[] {
    return Array.from(this.reports.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public submitReport(params: Omit<UserReport, 'id' | 'status' | 'createdAt' | 'updatedAt'>): UserReport {
    const id = `rep-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const now = new Date().toISOString();
    const report: UserReport = {
      ...params,
      id,
      status: 'REPORTED',
      createdAt: now,
      updatedAt: now
    };
    this.reports.set(id, report);
    this.persist();
    return report;
  }

  public updateReportStatus(id: string, status: ModerationStatus, adminNotes?: string): UserReport | null {
    const rep = this.reports.get(id);
    if (!rep) return null;
    rep.status = status;
    if (adminNotes) rep.adminNotes = adminNotes;
    rep.updatedAt = new Date().toISOString();
    this.reports.set(id, rep);
    this.persist();
    return rep;
  }

  public submitAppeal(reportId: string, appealReason: string): boolean {
    const rep = this.reports.get(reportId);
    if (!rep) return false;
    rep.appeal = {
      id: `app-${Date.now()}`,
      appealReason,
      submittedAt: new Date().toISOString(),
      decision: 'PENDING'
    };
    rep.updatedAt = new Date().toISOString();
    this.reports.set(reportId, rep);
    this.persist();
    return true;
  }
}

export const moderationDatabase = new ModerationDatabaseService();
