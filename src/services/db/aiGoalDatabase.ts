/**
 * ACE 30X — AI Goal Engine Database Service
 * Manages persistent student goals, milestone roadmaps, and adaptive step progression.
 */

export interface GoalMilestone {
  id: string;
  title: string;
  description: string;
  order: number;
  completed: boolean;
  targetDate?: string;
  completedAt?: string;
  category: 'LEARNING' | 'PROJECT' | 'COMPETITION' | 'CAREER' | 'MENTORSHIP' | 'PORTFOLIO';
}

export interface StudentGoal {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'CAREER' | 'LEARNING' | 'PROJECT' | 'COMPETITION' | 'PLACEMENT' | 'GENERAL';
  targetDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'Not Started' | 'Active' | 'Paused' | 'Completed' | 'Cancelled';
  milestones: GoalMilestone[];
  progress: number; // 0 - 100 calculated from milestones
  createdAt: string;
  updatedAt: string;
  aiSuggested?: boolean;
}

const STORAGE_KEY = 'ace_ai_student_goals_v1';

class AIGoalDatabaseService {
  private goals: Map<string, StudentGoal> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed: StudentGoal[] = JSON.parse(data);
          parsed.forEach(g => this.goals.set(g.id, g));
          return;
        }
      }
    } catch {
      // fallback to seed data
    }
    this.seedInitialGoals();
  }

  private seedInitialGoals() {
    const seed: StudentGoal[] = [
      {
        id: 'goal-1',
        userId: 'usr-student-001',
        title: 'Secure a Full-Stack / AI Software Internship',
        description: 'Prepare portfolio, master React/TypeScript, and apply to top tier tech organizations for Summer 2026.',
        category: 'CAREER',
        targetDate: '2026-06-30',
        priority: 'HIGH',
        status: 'Active',
        progress: 60,
        createdAt: '2026-01-15T09:00:00Z',
        updatedAt: '2026-03-01T12:00:00Z',
        milestones: [
          {
            id: 'ms-1',
            title: 'Complete TypeScript & React Advanced Mastery',
            description: 'Finish all advanced interactive modules in ACE Learning Lab',
            order: 1,
            completed: true,
            completedAt: '2026-02-10T15:30:00Z',
            category: 'LEARNING',
          },
          {
            id: 'ms-2',
            title: 'Deploy 2 Full-Stack Showcase Projects to Project Lab',
            description: 'Publish AI Study Assistant and Campus Event Hub with public repositories',
            order: 2,
            completed: true,
            completedAt: '2026-02-28T18:00:00Z',
            category: 'PROJECT',
          },
          {
            id: 'ms-3',
            title: 'Complete Verified Student Passport & Resume Audit',
            description: 'Verify 5 top technical skills and sync live projects to public portfolio',
            order: 3,
            completed: true,
            completedAt: '2026-03-05T10:00:00Z',
            category: 'PORTFOLIO',
          },
          {
            id: 'ms-4',
            title: 'Submit 5 Verified Internship Applications',
            description: 'Apply via ACE Recruiter Radar to top tech organizations',
            order: 4,
            completed: false,
            targetDate: '2026-04-15',
            category: 'CAREER',
          },
          {
            id: 'ms-5',
            title: 'Participate in 3 Mock Technical Interviews',
            description: 'Schedule sessions with Campus Mentors and AI Interview Lab',
            order: 5,
            completed: false,
            targetDate: '2026-04-30',
            category: 'MENTORSHIP',
          }
        ]
      },
      {
        id: 'goal-2',
        userId: 'usr-student-001',
        title: 'Win an Inter-College AI/ML Hackathon',
        description: 'Assemble a cross-disciplinary team and compete in a national-level AI challenge.',
        category: 'COMPETITION',
        targetDate: '2026-05-20',
        priority: 'MEDIUM',
        status: 'Active',
        progress: 33,
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-03-02T14:00:00Z',
        milestones: [
          {
            id: 'ms-201',
            title: 'Form a 4-member squad in Team Workspace',
            description: 'Recruit frontend developer and ML researcher from Vel Tech',
            order: 1,
            completed: true,
            completedAt: '2026-02-18T11:00:00Z',
            category: 'PROJECT',
          },
          {
            id: 'ms-202',
            title: 'Practice with 5 Arena Anti-Cheat Coding Challenges',
            description: 'Solve competitive algorithm problems under timed conditions',
            order: 2,
            completed: false,
            targetDate: '2026-04-10',
            category: 'COMPETITION',
          },
          {
            id: 'ms-203',
            title: 'Submit Working Prototype to Hackathon Finals',
            description: 'Deliver project repo, live demo URL, and architecture deck',
            order: 3,
            completed: false,
            targetDate: '2026-05-20',
            category: 'COMPETITION',
          }
        ]
      }
    ];

    seed.forEach(g => this.goals.set(g.id, g));
    this.persist();
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.goals.values())));
      }
    } catch {
      // ignore
    }
  }

  public getGoals(userId: string = 'usr-student-001'): StudentGoal[] {
    return Array.from(this.goals.values())
      .filter(g => g.userId === userId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public getGoalById(id: string): StudentGoal | null {
    return this.goals.get(id) || null;
  }

  public createGoal(goal: Omit<StudentGoal, 'id' | 'createdAt' | 'updatedAt' | 'progress'>): StudentGoal {
    const id = `goal-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();
    
    // Calculate progress
    const total = goal.milestones.length;
    const completed = goal.milestones.filter(m => m.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    const newGoal: StudentGoal = {
      ...goal,
      id,
      progress,
      createdAt: now,
      updatedAt: now,
    };

    this.goals.set(id, newGoal);
    this.persist();
    return newGoal;
  }

  public updateGoalStatus(id: string, status: StudentGoal['status']): StudentGoal | null {
    const goal = this.goals.get(id);
    if (!goal) return null;

    goal.status = status;
    goal.updatedAt = new Date().toISOString();
    this.goals.set(id, goal);
    this.persist();
    return goal;
  }

  public toggleMilestone(goalId: string, milestoneId: string): StudentGoal | null {
    const goal = this.goals.get(goalId);
    if (!goal) return null;

    const ms = goal.milestones.find(m => m.id === milestoneId);
    if (!ms) return null;

    ms.completed = !ms.completed;
    ms.completedAt = ms.completed ? new Date().toISOString() : undefined;

    const total = goal.milestones.length;
    const completed = goal.milestones.filter(m => m.completed).length;
    goal.progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (goal.progress === 100 && goal.status === 'Active') {
      goal.status = 'Completed';
    }

    goal.updatedAt = new Date().toISOString();
    this.goals.set(goalId, goal);
    this.persist();
    return goal;
  }

  public generateRoadmapForGoal(title: string, category: StudentGoal['category']): GoalMilestone[] {
    // Deterministic template milestones based on goal category
    const now = new Date();
    const addDays = (d: number) => {
      const dt = new Date(now);
      dt.setDate(dt.getDate() + d);
      return dt.toISOString().split('T')[0];
    };

    if (category === 'CAREER' || category === 'PLACEMENT') {
      return [
        { id: `ms-${Date.now()}-1`, title: 'Audit Core Skill Strengths & Gaps', description: 'Run skill gap analysis for target position', order: 1, completed: false, targetDate: addDays(7), category: 'LEARNING' },
        { id: `ms-${Date.now()}-2`, title: 'Complete 2 Specialized Learning Modules', description: 'Complete practical challenges and earn verification evidence', order: 2, completed: false, targetDate: addDays(21), category: 'LEARNING' },
        { id: `ms-${Date.now()}-3`, title: 'Ship Portfolio Project with Live Demo', description: 'Host code repository on GitHub and link to ACE profile', order: 3, completed: false, targetDate: addDays(40), category: 'PROJECT' },
        { id: `ms-${Date.now()}-4`, title: 'Resume & Portfolio AI Inspection', description: 'Optimize resume bullet points with quantifiable impact', order: 4, completed: false, targetDate: addDays(45), category: 'PORTFOLIO' },
        { id: `ms-${Date.now()}-5`, title: 'Apply to 5 Curated Opportunities', description: 'Submit verified applications through Recruiter Radar', order: 5, completed: false, targetDate: addDays(60), category: 'CAREER' }
      ];
    }

    return [
      { id: `ms-${Date.now()}-1`, title: 'Define Problem Statement & Requirements', description: 'Outline project scope, deliverables, and team responsibilities', order: 1, completed: false, targetDate: addDays(5), category: 'PROJECT' },
      { id: `ms-${Date.now()}-2`, title: 'Build Functional MVP Prototype', description: 'Implement core user flow and test with sample data', order: 2, completed: false, targetDate: addDays(20), category: 'PROJECT' },
      { id: `ms-${Date.now()}-3`, title: 'Conduct Peer Review & Mentor Check-in', description: 'Review architecture and gather feedback from campus mentor', order: 3, completed: false, targetDate: addDays(30), category: 'MENTORSHIP' },
      { id: `ms-${Date.now()}-4`, title: 'Publish Showcase & Submit Entry', description: 'Publish final build, documentation, and live showcase', order: 4, completed: false, targetDate: addDays(45), category: 'COMPETITION' }
    ];
  }

  public deleteGoal(id: string): boolean {
    const res = this.goals.delete(id);
    if (res) this.persist();
    return res;
  }
}

export const aiGoalDatabase = new AIGoalDatabaseService();
