// ACE Session Security & Active Device Management Service

import { UserSession } from '../db/canonicalDataArchitecture';

const STORAGE_KEY_SESSIONS = 'ace_active_sessions_v2';

const SEED_SESSIONS: UserSession[] = [
  {
    sessionId: 'sess_curr_101',
    userId: 'usr_student_dileep',
    device: 'Windows 11 PC (Chrome 128)',
    browser: 'Chrome 128.0',
    os: 'Windows 11',
    ipAddress: '157.48.21.90 (Chennai, TN)',
    location: 'Chennai, Tamil Nadu, India',
    isCurrent: true,
    createdAt: '2026-09-07T08:00:00Z',
    lastActiveAt: new Date().toISOString(),
    expiresAt: '2026-09-21T08:00:00Z'
  },
  {
    sessionId: 'sess_mob_102',
    userId: 'usr_student_dileep',
    device: 'OnePlus 11 (ACE Mobile App)',
    browser: 'ACE Mobile App 2.4',
    os: 'Android 14',
    ipAddress: '106.198.54.12 (Chennai, TN)',
    location: 'Chennai, Tamil Nadu, India',
    isCurrent: false,
    createdAt: '2026-09-05T14:30:00Z',
    lastActiveAt: '2026-09-07T12:00:00Z',
    expiresAt: '2026-09-19T14:30:00Z'
  }
];

class SessionSecurityService {
  private sessions: UserSession[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
      this.sessions = raw ? JSON.parse(raw) : SEED_SESSIONS;
    } catch (e) {
      this.sessions = SEED_SESSIONS;
    }
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(this.sessions));
    }
  }

  public getActiveSessions(userId: string): UserSession[] {
    return this.sessions.filter(s => s.userId === userId && !s.revokedAt);
  }

  public revokeSession(userId: string, sessionId: string): boolean {
    const sess = this.sessions.find(s => s.userId === userId && s.sessionId === sessionId);
    if (!sess) return false;
    sess.revokedAt = new Date().toISOString();
    this.persist();
    return true;
  }

  public revokeAllOtherSessions(userId: string): number {
    let count = 0;
    this.sessions.forEach(s => {
      if (s.userId === userId && !s.isCurrent && !s.revokedAt) {
        s.revokedAt = new Date().toISOString();
        count++;
      }
    });
    this.persist();
    return count;
  }
}

export const sessionSecurityService = new SessionSecurityService();
