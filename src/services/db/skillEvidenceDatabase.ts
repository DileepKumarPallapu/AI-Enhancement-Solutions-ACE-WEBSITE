// ACE Skill Evidence & Multi-Tier Verification Database
// Handles 7-tier skill progression: SELF_DECLARED -> LEARNING -> ASSESSED -> PROJECT_VERIFIED -> COMPETITION_VERIFIED -> MENTOR_ENDORSED -> CERTIFICATE_VERIFIED

export type SkillVerificationTier = 
  | 'SELF_DECLARED'
  | 'LEARNING'
  | 'ASSESSED'
  | 'PROJECT_VERIFIED'
  | 'COMPETITION_VERIFIED'
  | 'MENTOR_ENDORSED'
  | 'CERTIFICATE_VERIFIED';

export interface EvidenceItem {
  id: string;
  type: 'CODE_CHALLENGE' | 'PROJECT_REPO' | 'COMPETITION_WIN' | 'MENTOR_REVIEW' | 'CERTIFICATE';
  title: string;
  url?: string;
  dateAdded: string;
  scoreOrMetric?: string;
  verifierName?: string;
  verifierRole?: string;
}

export interface UserSkillEvidence {
  id: string;
  userId: string;
  skillName: string;
  category: 'Full-Stack' | 'AI & ML' | 'Cloud & DevOps' | 'Cybersecurity' | 'Mobile' | 'Data Science' | 'Leadership';
  currentTier: SkillVerificationTier;
  confidenceScore: number; // 0 - 100
  evidenceChain: EvidenceItem[];
  mentorEndorsementsCount: number;
  challengesCompleted: number;
  verifiedProjectsCount: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'ace_db_skill_evidence_v1';

class SkillEvidenceDatabase {
  private skills: Map<string, UserSkillEvidence> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.skills.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as UserSkillEvidence[];
          items.forEach(s => this.skills.set(s.id, s));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.skills.values())));
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
    const sampleSkills: UserSkillEvidence[] = [
      {
        id: 'sk_ev_001',
        userId: 'usr_student_dileep',
        skillName: 'React & TypeScript',
        category: 'Full-Stack',
        currentTier: 'CERTIFICATE_VERIFIED',
        confidenceScore: 96,
        mentorEndorsementsCount: 3,
        challengesCompleted: 14,
        verifiedProjectsCount: 4,
        lastUpdated: new Date().toISOString(),
        evidenceChain: [
          {
            id: 'ev_01',
            type: 'CERTIFICATE',
            title: 'Advanced Full-Stack Engineering Masterclass',
            url: 'https://allcollegeevent.com/verify/certificate/cert_fs_892',
            dateAdded: '2026-01-15T10:00:00.000Z',
            scoreOrMetric: 'Top 2% (Score 98/100)',
            verifierName: 'ACE Credential Authority',
            verifierRole: 'Official Certifier'
          },
          {
            id: 'ev_02',
            type: 'COMPETITION_WIN',
            title: '1st Place - National Hackathon Web Track',
            dateAdded: '2025-11-20T16:00:00.000Z',
            scoreOrMetric: 'Gold Trophy Winner'
          }
        ]
      },
      {
        id: 'sk_ev_002',
        userId: 'usr_student_dileep',
        skillName: 'Autonomous AI Agents',
        category: 'AI & ML',
        currentTier: 'PROJECT_VERIFIED',
        confidenceScore: 92,
        mentorEndorsementsCount: 2,
        challengesCompleted: 8,
        verifiedProjectsCount: 3,
        lastUpdated: new Date().toISOString(),
        evidenceChain: [
          {
            id: 'ev_03',
            type: 'PROJECT_REPO',
            title: 'Multi-Agent Autonomous Coding Pair Engine',
            url: 'https://github.com/dileepkumar/agentic-flow',
            dateAdded: '2026-02-10T12:00:00.000Z',
            scoreOrMetric: 'Production Deployed'
          },
          {
            id: 'ev_04',
            type: 'MENTOR_REVIEW',
            title: 'Architecture Approval by Google DeepMind Fellow',
            dateAdded: '2026-02-28T14:30:00.000Z',
            verifierName: 'Dr. Aris Thorne',
            verifierRole: 'Principal AI Architect'
          }
        ]
      },
      {
        id: 'sk_ev_003',
        userId: 'usr_student_dileep',
        skillName: 'Cloud Native & Docker',
        category: 'Cloud & DevOps',
        currentTier: 'ASSESSED',
        confidenceScore: 84,
        mentorEndorsementsCount: 1,
        challengesCompleted: 6,
        verifiedProjectsCount: 2,
        lastUpdated: new Date().toISOString(),
        evidenceChain: [
          {
            id: 'ev_05',
            type: 'CODE_CHALLENGE',
            title: 'High-Throughput Kubernetes Microservice Deployment',
            dateAdded: '2026-02-18T09:00:00.000Z',
            scoreOrMetric: '100% Test Coverage'
          }
        ]
      },
      {
        id: 'sk_ev_004',
        userId: 'usr_student_dileep',
        skillName: 'Algorithms & Data Structures',
        category: 'Full-Stack',
        currentTier: 'COMPETITION_VERIFIED',
        confidenceScore: 94,
        mentorEndorsementsCount: 2,
        challengesCompleted: 45,
        verifiedProjectsCount: 1,
        lastUpdated: new Date().toISOString(),
        evidenceChain: [
          {
            id: 'ev_06',
            type: 'CODE_CHALLENGE',
            title: '45 ACE Daily Coding Missions Cleared',
            dateAdded: '2026-03-01T18:00:00.000Z',
            scoreOrMetric: 'Rank #4 Overall'
          }
        ]
      }
    ];

    sampleSkills.forEach(s => this.skills.set(s.id, s));
    this.saveToStorage();
  }

  public getByUser(userId: string): UserSkillEvidence[] {
    return Array.from(this.skills.values())
      .filter(s => s.userId === userId)
      .sort((a, b) => b.confidenceScore - a.confidenceScore);
  }

  public addSkill(skill: Omit<UserSkillEvidence, 'id' | 'lastUpdated'>): UserSkillEvidence {
    const id = `sk_ev_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newSkill: UserSkillEvidence = {
      ...skill,
      id,
      lastUpdated: new Date().toISOString()
    };
    this.skills.set(id, newSkill);
    this.saveToStorage();
    return newSkill;
  }

  public addEvidence(skillId: string, evidence: Omit<EvidenceItem, 'id' | 'dateAdded'>): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;

    const newEvidence: EvidenceItem = {
      ...evidence,
      id: `ev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      dateAdded: new Date().toISOString()
    };

    skill.evidenceChain.unshift(newEvidence);
    skill.lastUpdated = new Date().toISOString();
    
    // Auto upgrade tier based on evidence type
    if (evidence.type === 'CERTIFICATE' && skill.currentTier !== 'CERTIFICATE_VERIFIED') {
      skill.currentTier = 'CERTIFICATE_VERIFIED';
      skill.confidenceScore = Math.min(100, skill.confidenceScore + 10);
    } else if (evidence.type === 'COMPETITION_WIN' && skill.currentTier !== 'CERTIFICATE_VERIFIED') {
      skill.currentTier = 'COMPETITION_VERIFIED';
      skill.confidenceScore = Math.min(100, skill.confidenceScore + 8);
    } else if (evidence.type === 'MENTOR_REVIEW') {
      skill.mentorEndorsementsCount += 1;
    }

    this.skills.set(skillId, skill);
    this.saveToStorage();
    return true;
  }
}

export const skillEvidenceDb = new SkillEvidenceDatabase();
