// ACE 90X Smart Unified Calendar & Deadline Center Database
// Categorizes upcoming milestones across Events, Competitions, Mentor Sessions, Interviews, Application Deadlines, Club Events & Team Tasks

export type DeadlineTimeBucket = 'TODAY' | 'TOMORROW' | 'THIS_WEEK' | 'LATER' | 'OVERDUE';
export type DeadlineCategory = 'EVENT' | 'COMPETITION' | 'APPLICATION' | 'MENTOR_SESSION' | 'INTERVIEW' | 'TEAM_TASK' | 'LEARNING';

export interface SmartDeadlineItem {
  id: string;
  title: string;
  category: DeadlineCategory;
  dueDate: string;
  timeBucket: DeadlineTimeBucket;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  relatedEntityTitle: string;
  actionUrl: string;
  isCompleted: boolean;
  completedAt?: string;
}

const DEADLINES_STORAGE = 'ace_db_smart_deadlines_v90';

class CampusDeadlinesDatabase {
  private deadlines: Map<string, SmartDeadlineItem> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.deadlines.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(DEADLINES_STORAGE);
        if (raw) {
          const items: SmartDeadlineItem[] = JSON.parse(raw);
          items.forEach(d => this.deadlines.set(d.id, d));
        }
      }
    } catch (e) {
      console.warn('Failed to load deadlines storage', e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DEADLINES_STORAGE, JSON.stringify(Array.from(this.deadlines.values())));
      }
      this.listeners.forEach(fn => fn());
    } catch (e) {
      console.warn('Failed to save deadlines storage', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const seedDeadlines: SmartDeadlineItem[] = [
      {
        id: 'dl_1',
        title: 'Submit SIH 2026 Problem Statement Architecture Paper',
        category: 'COMPETITION',
        dueDate: '2026-03-08T18:00:00Z',
        timeBucket: 'TODAY',
        priority: 'CRITICAL',
        relatedEntityTitle: 'Smart India Hackathon 2026',
        actionUrl: '/competitions/comp_sih_2026',
        isCompleted: false
      },
      {
        id: 'dl_2',
        title: 'Mock Technical Interview with Dr. Aravind',
        category: 'MENTOR_SESSION',
        dueDate: '2026-03-09T14:30:00Z',
        timeBucket: 'TOMORROW',
        priority: 'HIGH',
        relatedEntityTitle: 'Faculty AI Guidance Session',
        actionUrl: '/student/mentorship/sessions',
        isCompleted: false
      },
      {
        id: 'dl_3',
        title: 'Google Summer of Code Internship Application Window Close',
        category: 'APPLICATION',
        dueDate: '2026-03-12T23:59:00Z',
        timeBucket: 'THIS_WEEK',
        priority: 'CRITICAL',
        relatedEntityTitle: 'Google Open Source Internship',
        actionUrl: '/student/career',
        isCompleted: false
      },
      {
        id: 'dl_4',
        title: 'Deploy Docker Microservices for Team NeuralCore',
        category: 'TEAM_TASK',
        dueDate: '2026-03-14T17:00:00Z',
        timeBucket: 'THIS_WEEK',
        priority: 'HIGH',
        relatedEntityTitle: 'NeuralCore Workspace',
        actionUrl: '/teams/team_neural_core',
        isCompleted: false
      },
      {
        id: 'dl_5',
        title: 'Vel Tech CSE Capstone Proposal Submission',
        category: 'EVENT',
        dueDate: '2026-03-25T17:00:00Z',
        timeBucket: 'LATER',
        priority: 'MEDIUM',
        relatedEntityTitle: 'CSE Annual Innovation Day',
        actionUrl: '/events/veltech_innovation_day',
        isCompleted: false
      }
    ];

    seedDeadlines.forEach(d => this.deadlines.set(d.id, d));
    this.saveToStorage();
  }

  public getAllDeadlines(): SmartDeadlineItem[] {
    return Array.from(this.deadlines.values()).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  public getDeadlinesByBucket(bucket: DeadlineTimeBucket): SmartDeadlineItem[] {
    return this.getAllDeadlines().filter(d => d.timeBucket === bucket && !d.isCompleted);
  }

  public toggleCompletion(deadlineId: string): boolean {
    const item = this.deadlines.get(deadlineId);
    if (!item) return false;
    item.isCompleted = !item.isCompleted;
    if (item.isCompleted) {
      item.completedAt = new Date().toISOString();
    } else {
      item.completedAt = undefined;
    }
    this.saveToStorage();
    return item.isCompleted;
  }
}

export const campusDeadlinesDatabase = new CampusDeadlinesDatabase();
