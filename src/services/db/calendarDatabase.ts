// ACE Smart Calendar & Deadline Center Database
// Aggregates registered events, saved events, mentorship sessions, goal milestones, and exam dates

export type CalendarItemType = 
  | 'REGISTERED_EVENT'
  | 'SAVED_EVENT'
  | 'MENTOR_SESSION'
  | 'ACADEMIC_DEADLINE'
  | 'SKILL_MILESTONE'
  | 'COMPETITION_ROUND';

export type CalendarItemPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface CalendarEventItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: CalendarItemType;
  priority: CalendarItemPriority;
  startTime: string;
  endTime: string;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  referenceId?: string; // Event ID, Mentor Request ID, Goal ID
  institutionName?: string;
  reminderMinutesBefore: number[];
  isCompleted: boolean;
  colorHex: string;
  tags: string[];
}

const STORAGE_KEY = 'ace_db_calendar_events_v1';

class CalendarDatabase {
  private events: Map<string, CalendarEventItem> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.events.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as CalendarEventItem[];
          items.forEach(e => this.events.set(e.id, e));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.events.values())));
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
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const sampleItems: CalendarEventItem[] = [
      {
        id: 'cal_001',
        userId: 'usr_student_dileep',
        title: 'National AI & Robotics Hackathon 2026 - Opening Ceremony',
        description: 'Keynote opening, problem statements reveal, and team briefing.',
        type: 'REGISTERED_EVENT',
        priority: 'CRITICAL',
        startTime: `${todayStr}T09:30:00.000Z`,
        endTime: `${todayStr}T11:30:00.000Z`,
        location: 'Main Auditorium, IIT Madras Research Park',
        isOnline: false,
        referenceId: 'evt_nat_hackathon_2026',
        institutionName: 'IIT Madras',
        reminderMinutesBefore: [1440, 60, 15],
        isCompleted: false,
        colorHex: '#3b82f6',
        tags: ['Hackathon', 'AI', 'National']
      },
      {
        id: 'cal_002',
        userId: 'usr_student_dileep',
        title: 'Mentorship 1-on-1: Full-Stack Architecture Review',
        description: 'Code review of agentic workflow engine with Senior Architect.',
        type: 'MENTOR_SESSION',
        priority: 'HIGH',
        startTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        endTime: new Date(Date.now() + 86400000 * 2 + 3600000).toISOString(),
        location: 'Google Meet',
        isOnline: true,
        meetingLink: 'https://meet.google.com/ace-mntr-arch',
        referenceId: 'req_001',
        reminderMinutesBefore: [120, 15],
        isCompleted: false,
        colorHex: '#10b981',
        tags: ['Mentorship', 'Architecture', 'Career']
      },
      {
        id: 'cal_003',
        userId: 'usr_student_dileep',
        title: 'Vel Tech Semester Project Submission Deadline',
        description: 'Submission of Final Milestone for Autonomous Navigation capstone.',
        type: 'ACADEMIC_DEADLINE',
        priority: 'CRITICAL',
        startTime: new Date(Date.now() + 86400000 * 5).toISOString(),
        endTime: new Date(Date.now() + 86400000 * 5 + 3600000 * 2).toISOString(),
        location: 'Vel Tech Dept. of CSE',
        isOnline: false,
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        reminderMinutesBefore: [2880, 1440, 60],
        isCompleted: false,
        colorHex: '#ef4444',
        tags: ['Academic', 'Vel Tech', 'Capstone']
      },
      {
        id: 'cal_004',
        userId: 'usr_student_dileep',
        title: 'Smart India Hackathon 2026 Internal Shortlist Announcement',
        description: 'College internal evaluation results and mentor team pairing.',
        type: 'COMPETITION_ROUND',
        priority: 'HIGH',
        startTime: new Date(Date.now() + 86400000 * 7).toISOString(),
        endTime: new Date(Date.now() + 86400000 * 7 + 3600000).toISOString(),
        location: 'Vel Tech Innovation Hub',
        isOnline: false,
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        reminderMinutesBefore: [1440, 120],
        isCompleted: false,
        colorHex: '#8b5cf6',
        tags: ['SIH', 'Competition', 'Internal']
      }
    ];

    sampleItems.forEach(item => this.events.set(item.id, item));
    this.saveToStorage();
  }

  public getByUser(userId: string): CalendarEventItem[] {
    return Array.from(this.events.values())
      .filter(e => e.userId === userId)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }

  public getUpcoming(userId: string, limit: number = 10): CalendarEventItem[] {
    const now = new Date().toISOString();
    return this.getByUser(userId)
      .filter(e => e.endTime >= now)
      .slice(0, limit);
  }

  public getDeadlines(userId: string): CalendarEventItem[] {
    return this.getByUser(userId)
      .filter(e => e.type === 'ACADEMIC_DEADLINE' || e.type === 'COMPETITION_ROUND' || e.priority === 'CRITICAL')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }

  public addEvent(item: Omit<CalendarEventItem, 'id'>): CalendarEventItem {
    const id = `cal_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newEvent: CalendarEventItem = { ...item, id };
    this.events.set(id, newEvent);
    this.saveToStorage();
    return newEvent;
  }

  public updateEvent(id: string, updates: Partial<CalendarEventItem>): CalendarEventItem | null {
    const existing = this.events.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    this.events.set(id, updated);
    this.saveToStorage();
    return updated;
  }

  public deleteEvent(id: string): boolean {
    const res = this.events.delete(id);
    if (res) this.saveToStorage();
    return res;
  }

  public toggleCompleted(id: string): boolean {
    const ev = this.events.get(id);
    if (!ev) return false;
    ev.isCompleted = !ev.isCompleted;
    this.events.set(id, ev);
    this.saveToStorage();
    return true;
  }
}

export const calendarDb = new CalendarDatabase();
