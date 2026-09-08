// ACE 100X Transparent AI Memory & Personalization Settings Database
// Stores user-consented preferences with full CRUD control and zero hidden tracking

export type MemoryCategory = 'CAREER_GOAL' | 'TECH_PREFERENCE' | 'LOCATION_PREFERENCE' | 'LEARNING_STYLE' | 'STUDY_HABIT';

export interface AiMemoryItem {
  id: string;
  userId: string;
  category: MemoryCategory;
  title: string;
  content: string;
  whyUseful: string;
  createdAt: string;
  updatedAt: string;
}

const MEMORY_STORAGE = 'ace_db_ai_memory_v100';

class AiMemoryDatabase {
  private memories: Map<string, AiMemoryItem> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.memories.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(MEMORY_STORAGE);
        if (raw) {
          const items: AiMemoryItem[] = JSON.parse(raw);
          items.forEach(m => this.memories.set(m.id, m));
        }
      }
    } catch (e) {
      console.warn('Failed to load AI memory storage', e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(MEMORY_STORAGE, JSON.stringify(Array.from(this.memories.values())));
      }
      this.listeners.forEach(fn => fn());
    } catch (e) {
      console.warn('Failed to save AI memory storage', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const seed: AiMemoryItem[] = [
      {
        id: 'mem_1',
        userId: 'usr_student_dileep',
        category: 'CAREER_GOAL',
        title: 'Target Role: Autonomous AI Systems Engineer',
        content: 'Aiming for full-time Senior AI Engineer / Distributed Systems role at top research labs or Tier-1 tech firms.',
        whyUseful: 'Used to filter high-relevance hackathons, internship recommendations, and ATS resume benchmarks.',
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-02-01T10:00:00Z'
      },
      {
        id: 'mem_2',
        userId: 'usr_student_dileep',
        category: 'TECH_PREFERENCE',
        title: 'Preferred Stacks: TypeScript, Python, PyTorch, FastMCP',
        content: 'Prefers deep dive technical challenges in LLM agent orchestration, FastMCP tools, vector indexing, and React 19.',
        whyUseful: 'Customizes Coding Arcade problem recommendations and Hackathon teammate matching signals.',
        createdAt: '2026-02-10T12:00:00Z',
        updatedAt: '2026-02-10T12:00:00Z'
      },
      {
        id: 'mem_3',
        userId: 'usr_student_dileep',
        category: 'LOCATION_PREFERENCE',
        title: 'Placement Locations: Chennai, Bengaluru, Hyderabad, Remote',
        content: 'Open to onsite roles in South India tech hubs or global remote opportunities.',
        whyUseful: 'Filters Placement Cell campus drives and Recruiter Radar job matches.',
        createdAt: '2026-02-15T15:30:00Z',
        updatedAt: '2026-02-15T15:30:00Z'
      }
    ];

    seed.forEach(m => this.memories.set(m.id, m));
    this.saveToStorage();
  }

  public getAllMemories(userId: string = 'usr_student_dileep'): AiMemoryItem[] {
    return Array.from(this.memories.values()).filter(m => m.userId === userId);
  }

  public addMemory(category: MemoryCategory, title: string, content: string, whyUseful: string): AiMemoryItem {
    const item: AiMemoryItem = {
      id: `mem_${Date.now()}`,
      userId: 'usr_student_dileep',
      category,
      title,
      content,
      whyUseful,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.memories.set(item.id, item);
    this.saveToStorage();
    return item;
  }

  public updateMemory(id: string, title: string, content: string): boolean {
    const item = this.memories.get(id);
    if (!item) return false;
    item.title = title;
    item.content = content;
    item.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return true;
  }

  public deleteMemory(id: string): boolean {
    const res = this.memories.delete(id);
    if (res) this.saveToStorage();
    return res;
  }

  public clearAllMemories(userId: string = 'usr_student_dileep') {
    const items = this.getAllMemories(userId);
    items.forEach(i => this.memories.delete(i.id));
    this.saveToStorage();
  }
}

export const aiMemoryDatabase = new AiMemoryDatabase();
