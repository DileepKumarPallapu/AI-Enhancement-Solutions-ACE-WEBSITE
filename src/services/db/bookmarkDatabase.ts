// ACE Unified Multi-Entity Bookmark Database
// Saves Events, Competitions, Courses, Projects, Mentors, Opportunities, and Articles

export type BookmarkType = 'ALL' | 'EVENT' | 'COMPETITION' | 'COURSE' | 'PROJECT' | 'MENTOR' | 'OPPORTUNITY' | 'ARTICLE';

export interface SavedBookmark {
  id: string;
  userId: string;
  entityId: string;
  type: BookmarkType;
  title: string;
  subtitle: string;
  imageUrl?: string;
  targetUrl: string;
  savedAt: string;
  tags?: string[];
}

const STORAGE_KEY = 'ace_db_unified_bookmarks_v1';

class BookmarkDatabase {
  private bookmarks: Map<string, SavedBookmark> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
    if (this.bookmarks.size === 0) {
      this.seedInitial();
    }
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as SavedBookmark[];
          items.forEach(b => this.bookmarks.set(b.id, b));
        }
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.bookmarks.values())));
      }
    } catch {
      // Fallback
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
    const sampleBookmarks: SavedBookmark[] = [
      {
        id: 'bm_01',
        userId: 'usr_student_dileep',
        entityId: 'opp_hack_001',
        type: 'OPPORTUNITY',
        title: 'National AI & Autonomous Robotics Hackathon 2026',
        subtitle: 'IIT Madras Center for Innovation • ₹5,00,000 Prize Pool',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=120',
        targetUrl: '/student/opportunities/opp_hack_001',
        savedAt: new Date().toISOString(),
        tags: ['Hackathon', 'AI']
      },
      {
        id: 'bm_02',
        userId: 'usr_student_dileep',
        entityId: 'men_veltech_senthil',
        type: 'MENTOR',
        title: 'Dr. K. Senthilkumar',
        subtitle: 'Head of AI & Robotics • Vel Tech University',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        targetUrl: '/student/mentors',
        savedAt: new Date(Date.now() - 86400000).toISOString(),
        tags: ['Faculty', 'AI']
      },
      {
        id: 'bm_03',
        userId: 'usr_student_dileep',
        entityId: 'opp_crs_004',
        type: 'COURSE',
        title: 'Zero to Production Distributed Kubernetes Masterclass',
        subtitle: 'ACE Academy • Verified Certification',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120',
        targetUrl: '/student/opportunities/opp_crs_004',
        savedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        tags: ['DevOps', 'Cloud']
      }
    ];

    sampleBookmarks.forEach(b => this.bookmarks.set(b.id, b));
    this.save();
  }

  public getByUser(userId: string, category: BookmarkType = 'ALL'): SavedBookmark[] {
    const list = Array.from(this.bookmarks.values()).filter(b => b.userId === userId);
    if (category === 'ALL') {
      return list.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    }
    return list.filter(b => b.type === category).sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }

  public isBookmarked(userId: string, entityId: string): boolean {
    return Array.from(this.bookmarks.values()).some(b => b.userId === userId && b.entityId === entityId);
  }

  public toggleBookmark(params: Omit<SavedBookmark, 'id' | 'savedAt'>): boolean {
    const existing = Array.from(this.bookmarks.values()).find(
      b => b.userId === params.userId && b.entityId === params.entityId
    );

    if (existing) {
      this.bookmarks.delete(existing.id);
      this.save();
      return false; // Removed
    }

    const id = `bm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newBm: SavedBookmark = {
      ...params,
      id,
      savedAt: new Date().toISOString()
    };
    this.bookmarks.set(id, newBm);
    this.save();
    return true; // Added
  }
}

export const bookmarkDb = new BookmarkDatabase();
