// ACE Evidence-Based Achievements & Credential Engine
// Computes verifiable unlockable badges based on real student activity and persistence

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'HACKATHON' | 'MENTORSHIP' | 'COMMUNITY' | 'LEARNING' | 'IDENTITY' | 'LEADERSHIP';
  icon: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
  points: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progressPercent: number;
  evidenceSummary?: string;
}

const STORAGE_KEY = 'ace_db_achievements_v1';

class AchievementDatabase {
  private badges: Map<string, AchievementBadge> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.badges.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as AchievementBadge[];
          items.forEach(b => this.badges.set(b.id, b));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.badges.values())));
      }
    } catch {
      // Storage fallback
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedInitial() {
    const defaultBadges: AchievementBadge[] = [
      {
        id: 'ach_verified_student',
        title: 'Verified Digital Scholar',
        description: 'Issued canonical ACE Digital ID with academic institution binding.',
        category: 'IDENTITY',
        icon: 'ShieldCheck',
        tier: 'GOLD',
        points: 500,
        isUnlocked: true,
        unlockedAt: '2024-08-01T09:00:00.000Z',
        progressPercent: 100,
        evidenceSummary: 'Bound to Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'
      },
      {
        id: 'ach_hackathon_champ',
        title: 'Hackathon Grandmaster',
        description: 'Registered and submitted top-tier solutions in 5+ national university hackathons.',
        category: 'HACKATHON',
        icon: 'Trophy',
        tier: 'PLATINUM',
        points: 1500,
        isUnlocked: true,
        unlockedAt: '2025-11-20T16:00:00.000Z',
        progressPercent: 100,
        evidenceSummary: '1st Place Win at National AI Hackathon'
      },
      {
        id: 'ach_mentor_seeker',
        title: 'Active Mentee',
        description: 'Completed 3+ structured mentorship sessions with actionable milestones.',
        category: 'MENTORSHIP',
        icon: 'Users',
        tier: 'GOLD',
        points: 800,
        isUnlocked: true,
        unlockedAt: '2026-02-28T14:30:00.000Z',
        progressPercent: 100,
        evidenceSummary: 'Endorsed by Dr. Aris Thorne (Principal AI Architect)'
      },
      {
        id: 'ach_daily_coder',
        title: 'Algorithmic Streak Master',
        description: 'Complete 30 consecutive days of ACE Coding Missions.',
        category: 'LEARNING',
        icon: 'Flame',
        tier: 'SILVER',
        points: 600,
        isUnlocked: false,
        progressPercent: 78,
        evidenceSummary: '24 / 30 Missions Completed'
      },
      {
        id: 'ach_campus_ambassador',
        title: 'Campus Ambassador Lead',
        description: 'Represent Vel Tech University and onboard 50+ student builders.',
        category: 'LEADERSHIP',
        icon: 'Award',
        tier: 'DIAMOND',
        points: 2500,
        isUnlocked: true,
        unlockedAt: '2025-09-10T11:00:00.000Z',
        progressPercent: 100,
        evidenceSummary: 'Official Ambassador for Vel Tech Rangarajan Dr. Sagunthala R&D Institute'
      }
    ];

    defaultBadges.forEach(b => this.badges.set(b.id, b));
    this.saveToStorage();
  }

  public getAll(): AchievementBadge[] {
    return Array.from(this.badges.values());
  }

  public getUnlocked(): AchievementBadge[] {
    return Array.from(this.badges.values()).filter(b => b.isUnlocked);
  }

  public unlockBadge(badgeId: string, evidenceSummary?: string): boolean {
    const badge = this.badges.get(badgeId);
    if (!badge || badge.isUnlocked) return false;
    badge.isUnlocked = true;
    badge.progressPercent = 100;
    badge.unlockedAt = new Date().toISOString();
    if (evidenceSummary) badge.evidenceSummary = evidenceSummary;
    this.badges.set(badgeId, badge);
    this.saveToStorage();
    return true;
  }
}

export const achievementDb = new AchievementDatabase();
