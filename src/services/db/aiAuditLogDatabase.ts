/**
 * ACE 30X — AI Audit Log Database Service
 * Provides verifiable audit trail of AI agent actions, tool permissions, and confirmation records.
 */

export interface AIAuditLogEntry {
  id: string;
  agentName: string;
  userId: string;
  roleContext: 'STUDENT' | 'MENTOR' | 'ORGANIZER' | 'RECRUITER' | 'JUDGE' | 'COLLEGE' | 'ADMIN';
  toolName: string;
  actionSummary: string;
  authorized: boolean;
  confirmationRequired: boolean;
  confirmedByUser?: boolean;
  timestamp: string;
  resultStatus: 'SUCCESS' | 'BLOCKED' | 'FAILED' | 'AWAITING_CONFIRMATION';
  metadata?: Record<string, any>;
}

const STORAGE_KEY = 'ace_ai_audit_logs_v1';

class AIAuditLogDatabaseService {
  private logs: AIAuditLogEntry[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          this.logs = JSON.parse(data);
          return;
        }
      }
    } catch {
      // fallback
    }

    this.logs = [
      {
        id: 'audit-001',
        agentName: 'StudentSuccessCopilot',
        userId: 'usr-student-001',
        roleContext: 'STUDENT',
        toolName: 'READ_SKILLS',
        actionSummary: 'Retrieved verified skills for skill gap analysis',
        authorized: true,
        confirmationRequired: false,
        timestamp: '2026-03-08T00:10:00Z',
        resultStatus: 'SUCCESS'
      },
      {
        id: 'audit-002',
        agentName: 'StudentSuccessCopilot',
        userId: 'usr-student-001',
        roleContext: 'STUDENT',
        toolName: 'CREATE_RECOMMENDATION',
        actionSummary: 'Generated prioritized learning roadmap for Full-Stack role',
        authorized: true,
        confirmationRequired: false,
        timestamp: '2026-03-08T00:10:02Z',
        resultStatus: 'SUCCESS'
      }
    ];
    this.persist();
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs));
      }
    } catch {
      // ignore
    }
  }

  public getLogs(limit: number = 50): AIAuditLogEntry[] {
    return [...this.logs].reverse().slice(0, limit);
  }

  public logAction(entry: Omit<AIAuditLogEntry, 'id' | 'timestamp'>): AIAuditLogEntry {
    const log: AIAuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString()
    };

    this.logs.push(log);
    if (this.logs.length > 200) {
      this.logs = this.logs.slice(-200);
    }
    this.persist();
    return log;
  }
}

export const aiAuditLogDatabase = new AIAuditLogDatabaseService();
