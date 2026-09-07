/**
 * ACE 50X — Session Security & Device Management Database Service
 * Provides active session tracking, multi-device listing, remote session revocation, and security posture auditing.
 */

export interface ActiveUserSession {
  id: string;
  userId: string;
  deviceType: 'DESKTOP' | 'MOBILE' | 'TABLET';
  browser: string;
  operatingSystem: string;
  ipAddress: string;
  approxLocation: string;
  isCurrentSession: boolean;
  createdAt: string;
  lastActiveAt: string;
  status: 'ACTIVE' | 'REVOKED';
}

const STORAGE_KEY = 'ace_user_sessions_v1';

class SessionSecurityDatabaseService {
  private sessions: Map<string, ActiveUserSession> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed: ActiveUserSession[] = JSON.parse(data);
          parsed.forEach(s => this.sessions.set(s.id, s));
          return;
        }
      }
    } catch {
      // fallback
    }

    const seed: ActiveUserSession[] = [
      {
        id: 'sess-curr-01',
        userId: 'usr_student_dileep',
        deviceType: 'DESKTOP',
        browser: 'Chrome 122.0',
        operatingSystem: 'Windows 11',
        ipAddress: '103.21.144.18',
        approxLocation: 'Chennai, Tamil Nadu, IN',
        isCurrentSession: true,
        createdAt: '2026-03-08T00:00:00Z',
        lastActiveAt: '2026-03-08T00:30:00Z',
        status: 'ACTIVE'
      },
      {
        id: 'sess-mob-02',
        userId: 'usr_student_dileep',
        deviceType: 'MOBILE',
        browser: 'Mobile Safari 17.2',
        operatingSystem: 'iOS 17.4',
        ipAddress: '103.21.144.92',
        approxLocation: 'Avadi, Chennai, IN',
        isCurrentSession: false,
        createdAt: '2026-03-06T18:00:00Z',
        lastActiveAt: '2026-03-07T21:15:00Z',
        status: 'ACTIVE'
      }
    ];

    seed.forEach(s => this.sessions.set(s.id, s));
    this.persist();
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.sessions.values())));
      }
    } catch {
      // ignore
    }
  }

  public getSessions(userId: string = 'usr_student_dileep'): ActiveUserSession[] {
    return Array.from(this.sessions.values()).filter(s => s.userId === userId && s.status === 'ACTIVE');
  }

  public revokeSession(sessionId: string): boolean {
    const s = this.sessions.get(sessionId);
    if (!s) return false;
    s.status = 'REVOKED';
    this.sessions.set(sessionId, s);
    this.persist();
    return true;
  }

  public revokeAllOtherSessions(userId: string = 'usr_student_dileep'): number {
    let count = 0;
    this.sessions.forEach(s => {
      if (s.userId === userId && !s.isCurrentSession && s.status === 'ACTIVE') {
        s.status = 'REVOKED';
        count++;
      }
    });
    this.persist();
    return count;
  }
}

export const sessionSecurityDatabase = new SessionSecurityDatabaseService();
