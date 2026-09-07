// ACE Persistent Learning, Skill Progression, and Arcade Challenge Database Layer

export interface SkillNodeProgress {
  nodeId: string;
  userId: string;
  unlocked: boolean;
  completed: boolean;
  completedAt?: string;
  score?: number;
}

export interface TaskCompletionRecord {
  taskId: string;
  userId: string;
  earnedXp: number;
  earnedCoins: number;
  completedAt: string;
}

export interface CodingSubmissionRecord {
  id: string;
  challengeId: string;
  userId: string;
  code: string;
  language: string;
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR';
  passedTests: number;
  totalTests: number;
  runtimeMs: number;
  earnedXp: number;
  earnedCoins: number;
  submittedAt: string;
}

export interface UserStreakRecord {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  freezeCount: number;
}

export interface XpTransactionRecord {
  id: string;
  userId: string;
  amount: number;
  source: string;
  description: string;
  timestamp: string;
}

const STORAGE_KEYS = {
  SKILLS: 'ace_persistent_skills_v2',
  TASKS: 'ace_persistent_tasks_v2',
  SUBMISSIONS: 'ace_persistent_coding_submissions_v2',
  DRAFTS: 'ace_persistent_code_drafts_v2',
  STREAKS: 'ace_persistent_streaks_v2',
  XP: 'ace_persistent_xp_txs_v2'
};

class LearningPersistenceDatabase {
  private skillsByUser: Record<string, SkillNodeProgress[]> = {};
  private tasksByUser: Record<string, TaskCompletionRecord[]> = {};
  private submissions: CodingSubmissionRecord[] = [];
  private codeDraftsByUserAndProblem: Record<string, { code: string; language: string; updatedAt: string }> = {};
  private streaksByUser: Record<string, UserStreakRecord> = {};
  private xpTxsByUser: Record<string, XpTransactionRecord[]> = {};

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;

      const rawSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      this.skillsByUser = rawSkills ? JSON.parse(rawSkills) : {};

      const rawTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      this.tasksByUser = rawTasks ? JSON.parse(rawTasks) : {
        'usr_student_dileep': [
          { taskId: 'task-intro-1', userId: 'usr_student_dileep', earnedXp: 50, earnedCoins: 10, completedAt: '2026-09-02T10:00:00Z' }
        ]
      };

      const rawSubs = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      this.submissions = rawSubs ? JSON.parse(rawSubs) : [];

      const rawDrafts = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      this.codeDraftsByUserAndProblem = rawDrafts ? JSON.parse(rawDrafts) : {};

      const rawStreaks = localStorage.getItem(STORAGE_KEYS.STREAKS);
      this.streaksByUser = rawStreaks ? JSON.parse(rawStreaks) : {
        'usr_student_dileep': {
          userId: 'usr_student_dileep',
          currentStreak: 5,
          longestStreak: 12,
          lastActiveDate: new Date().toISOString().split('T')[0],
          freezeCount: 2
        }
      };

      const rawXp = localStorage.getItem(STORAGE_KEYS.XP);
      this.xpTxsByUser = rawXp ? JSON.parse(rawXp) : {
        'usr_student_dileep': [
          { id: 'xp-1', userId: 'usr_student_dileep', amount: 50, source: 'ONBOARDING', description: 'Account setup & verified skills', timestamp: '2026-09-01T09:00:00Z' },
          { id: 'xp-2', userId: 'usr_student_dileep', amount: 150, source: 'CODING_CHALLENGE', description: 'Solved Two Sum with O(n) Hash Map', timestamp: '2026-09-02T14:30:00Z' }
        ]
      };
    } catch (e) {
      console.error('[LearningPersistenceDatabase] Hydration error:', e);
    }
  }

  private persist(key: string, data: any) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  // --- XP API ---
  public getXpTotal(userId: string): number {
    const list = this.xpTxsByUser[userId] || [];
    return list.reduce((sum, tx) => sum + tx.amount, 0);
  }

  public getXpHistory(userId: string): XpTransactionRecord[] {
    return this.xpTxsByUser[userId] || [];
  }

  public awardXp(userId: string, amount: number, source: string, description: string): XpTransactionRecord {
    const tx: XpTransactionRecord = {
      id: `xp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      amount,
      source,
      description,
      timestamp: new Date().toISOString()
    };
    if (!this.xpTxsByUser[userId]) this.xpTxsByUser[userId] = [];
    this.xpTxsByUser[userId].unshift(tx);
    this.persist(STORAGE_KEYS.XP, this.xpTxsByUser);
    return tx;
  }

  // --- Streak API ---
  public getStreak(userId: string): UserStreakRecord {
    if (!this.streaksByUser[userId]) {
      this.streaksByUser[userId] = {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        freezeCount: 1
      };
      this.persist(STORAGE_KEYS.STREAKS, this.streaksByUser);
    }
    return this.streaksByUser[userId];
  }

  public touchStreak(userId: string): UserStreakRecord {
    const record = this.getStreak(userId);
    const today = new Date().toISOString().split('T')[0];
    if (record.lastActiveDate === today) {
      return record;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (record.lastActiveDate === yesterday) {
      record.currentStreak += 1;
      if (record.currentStreak > record.longestStreak) {
        record.longestStreak = record.currentStreak;
      }
    } else {
      record.currentStreak = 1;
    }
    record.lastActiveDate = today;
    this.persist(STORAGE_KEYS.STREAKS, this.streaksByUser);
    return record;
  }

  // --- Task Completion API ---
  public completeTask(userId: string, taskId: string, earnedXp: number, earnedCoins: number): boolean {
    if (!this.tasksByUser[userId]) this.tasksByUser[userId] = [];
    if (this.tasksByUser[userId].some(t => t.taskId === taskId)) {
      return false;
    }

    this.tasksByUser[userId].push({
      taskId,
      userId,
      earnedXp,
      earnedCoins,
      completedAt: new Date().toISOString()
    });
    this.persist(STORAGE_KEYS.TASKS, this.tasksByUser);
    if (earnedXp > 0) {
      this.awardXp(userId, earnedXp, 'MICRO_TASK', `Completed micro-task: ${taskId}`);
    }
    this.touchStreak(userId);
    return true;
  }

  public isTaskCompleted(userId: string, taskId: string): boolean {
    const list = this.tasksByUser[userId] || [];
    return list.some(t => t.taskId === taskId);
  }

  public getCompletedTaskIds(userId: string): string[] {
    return (this.tasksByUser[userId] || []).map(t => t.taskId);
  }

  // --- Code Submissions & Drafts ---
  public saveCodeDraft(userId: string, challengeId: string, code: string, language: string): void {
    const key = `${userId}_${challengeId}`;
    this.codeDraftsByUserAndProblem[key] = {
      code,
      language,
      updatedAt: new Date().toISOString()
    };
    this.persist(STORAGE_KEYS.DRAFTS, this.codeDraftsByUserAndProblem);
  }

  public getCodeDraft(userId: string, challengeId: string): { code: string; language: string } | null {
    const key = `${userId}_${challengeId}`;
    return this.codeDraftsByUserAndProblem[key] || null;
  }

  public recordCodingSubmission(sub: Omit<CodingSubmissionRecord, 'id' | 'submittedAt'>): CodingSubmissionRecord {
    const newSub: CodingSubmissionRecord = {
      ...sub,
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      submittedAt: new Date().toISOString()
    };
    this.submissions.unshift(newSub);
    this.persist(STORAGE_KEYS.SUBMISSIONS, this.submissions);

    if (sub.status === 'ACCEPTED' && sub.earnedXp > 0) {
      this.awardXp(sub.userId, sub.earnedXp, 'CODING_SUBMISSION', `Accepted submission for challenge ${sub.challengeId}`);
      this.touchStreak(sub.userId);
    }
    return newSub;
  }

  public getUserSubmissions(userId: string): CodingSubmissionRecord[] {
    return this.submissions.filter(s => s.userId === userId);
  }
}

export const learningPersistenceDb = new LearningPersistenceDatabase();
