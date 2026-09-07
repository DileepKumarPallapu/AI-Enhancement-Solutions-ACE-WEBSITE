// ACE Platform Trust & Fraud Abuse Reporting Database
// Moderation ticketing, verification disputes, and transparent resolution lifecycle

export type ReportCategory = 'EVENT_FRAUD' | 'ORGANIZER_MISCONDUCT' | 'PLAGIARISM' | 'SPAM' | 'HARASSMENT' | 'VERIFICATION_DISPUTE';
export type ReportStatus = 'OPEN' | 'UNDER_REVIEW' | 'ACTION_REQUIRED' | 'RESOLVED' | 'DISMISSED' | 'APPEALED';

export interface AbuseReportTicket {
  id: string;
  reporterUserId: string;
  reporterName: string;
  targetEntityType: 'EVENT' | 'USER' | 'PROJECT' | 'ORGANIZER' | 'CERTIFICATE';
  targetEntityId: string;
  targetEntityTitle: string;
  category: ReportCategory;
  description: string;
  evidenceLinks: string[];
  status: ReportStatus;
  adminNotes?: string;
  resolutionSummary?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'ace_db_abuse_reports_v1';

class TrustAndReportsDatabase {
  private reports: Map<string, AbuseReportTicket> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
    if (this.reports.size === 0) {
      this.seedInitial();
    }
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const list = JSON.parse(raw) as AbuseReportTicket[];
          list.forEach(r => this.reports.set(r.id, r));
        }
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.reports.values())));
      }
    } catch {
      // Fallback
    }
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedInitial() {
    const sampleReport: AbuseReportTicket = {
      id: 'rep_001',
      reporterUserId: 'usr_student_dileep',
      reporterName: 'Dileep Kumar',
      targetEntityType: 'EVENT',
      targetEntityId: 'evt_suspicious_01',
      targetEntityTitle: 'Unverified Commercial Hackathon',
      category: 'EVENT_FRAUD',
      description: 'Organizer requesting upfront registration fees without clear rules or prize escrow.',
      evidenceLinks: ['https://example.com/suspicious-form'],
      status: 'RESOLVED',
      adminNotes: 'Investigated by Trust & Safety. Event delisted and organizer suspended.',
      resolutionSummary: 'Event suspended from public listing.',
      createdAt: '2026-02-15T10:00:00Z',
      updatedAt: '2026-02-16T14:00:00Z'
    };

    this.reports.set(sampleReport.id, sampleReport);
    this.save();
  }

  public getAllReports(): AbuseReportTicket[] {
    return Array.from(this.reports.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  
  public resolveReport(reportId: string, status: ReportStatus, resolutionSummary: string, adminNotes?: string): AbuseReportTicket | null {
    const report = this.reports.get(reportId);
    if (!report) return null;
    report.status = status;
    report.resolutionSummary = resolutionSummary;
    if (adminNotes) report.adminNotes = adminNotes;
    report.updatedAt = new Date().toISOString();
    this.reports.set(reportId, report);
    this.save();
    return report;
  }

  public submitReport(report: Omit<AbuseReportTicket, 'id' | 'status' | 'createdAt' | 'updatedAt'>): AbuseReportTicket {
    const id = `rep_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newReport: AbuseReportTicket = {
      ...report,
      id,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.reports.set(id, newReport);
    this.save();
    return newReport;
  }
}

export const trustAndReportsDb = new TrustAndReportsDatabase();
