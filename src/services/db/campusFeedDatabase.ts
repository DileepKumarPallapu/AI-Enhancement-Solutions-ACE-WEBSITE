// ACE 90X Scoped Campus & Global Feed Intelligence Database
// Strictly scopes Vel Tech campus announcements, peer achievements, competition registrations, and multi-factor ranking

export interface CampusFeedItem {
  id: string;
  type: 'EVENT' | 'ANNOUNCEMENT' | 'COMPETITION' | 'CLUB_ACTIVITY' | 'PROJECT_LAUNCH' | 'ACHIEVEMENT' | 'WORKSHOP';
  scope: 'CAMPUS_ONLY' | 'GLOBAL';
  institutionId: string;
  institutionName: string;
  departmentScope?: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  title: string;
  summary: string;
  content: string;
  mediaUrl?: string;
  actionUrl: string;
  actionLabel: string;
  tags: string[];
  relevanceScore: number;
  reactionsCount: {
    like: number;
    celebrate: number;
    useful: number;
  };
  userReaction?: 'LIKE' | 'CELEBRATE' | 'USEFUL';
  isBookmarked: boolean;
  createdAt: string;
}

const FEED_STORAGE = 'ace_db_campus_feed_v90';

class CampusFeedDatabase {
  private feedItems: Map<string, CampusFeedItem> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.feedItems.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(FEED_STORAGE);
        if (raw) {
          const items: CampusFeedItem[] = JSON.parse(raw);
          items.forEach(i => this.feedItems.set(i.id, i));
        }
      }
    } catch (e) {
      console.warn('Failed to load campus feed storage', e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(FEED_STORAGE, JSON.stringify(Array.from(this.feedItems.values())));
      }
      this.listeners.forEach(fn => fn());
    } catch (e) {
      console.warn('Failed to save campus feed storage', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const seedItems: CampusFeedItem[] = [
      {
        id: 'feed_1',
        type: 'ANNOUNCEMENT',
        scope: 'CAMPUS_ONLY',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        departmentScope: 'Computer Science and Engineering',
        authorId: 'mentor_dr_aravind',
        authorName: 'Dr. Aravind Swaminathan',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        authorBadge: 'Head of AI Research • Vel Tech',
        title: '🏆 Vel Tech R&D Grant Announcement: Smart Campus Projects 2026',
        summary: 'Vel Tech R&D department approves ₹2,00,000 in student project prototyping grants.',
        content: 'Final and pre-final year engineering students can submit applications for IoT and AI lab equipment funding. Selection will be based on verifiable code repository quality and faculty mentor endorsement.',
        mediaUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        actionUrl: '/student/opportunities/opp_veltech_grant',
        actionLabel: 'Apply for Grant',
        tags: ['VelTech', 'Research', 'Grants', 'CSE'],
        relevanceScore: 98,
        reactionsCount: { like: 42, celebrate: 28, useful: 65 },
        userReaction: 'LIKE',
        isBookmarked: true,
        createdAt: '2026-03-05T08:30:00Z'
      },
      {
        id: 'feed_2',
        type: 'COMPETITION',
        scope: 'GLOBAL',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        authorId: 'usr_student_priya',
        authorName: 'Priya Sundaram',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        authorBadge: 'Vel Tech AI Club President',
        title: '⚡ SIH 2026 Internal Hackathon Final Round Registrations',
        summary: 'Top 10 shortlisted squads will represent Vel Tech at the National SIH 2026 Grand Finale.',
        content: 'Prepare your live architecture demos and Dockerized microservices for the faculty review panel on March 18th in Lab 402.',
        mediaUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        actionUrl: '/competitions/comp_sih_2026',
        actionLabel: 'View Hackathon',
        tags: ['SIH2026', 'Hackathon', 'VelTechSquads'],
        relevanceScore: 95,
        reactionsCount: { like: 56, celebrate: 34, useful: 40 },
        isBookmarked: false,
        createdAt: '2026-03-04T12:00:00Z'
      },
      {
        id: 'feed_3',
        type: 'PROJECT_LAUNCH',
        scope: 'CAMPUS_ONLY',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        authorId: 'usr_student_dileep',
        authorName: 'Dileep Kumar',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        authorBadge: 'Full Stack Engineer',
        title: '🚀 NeuralCore Autonomous Student Verification Engine Released',
        summary: 'Verifies collegiate credentials using Ed25519 cryptographic signatures and tamper-proof hashes.',
        content: 'Check out our project repository and verifiable passport credentials on ACE 80X.',
        actionUrl: '/student/passport',
        actionLabel: 'Inspect Passport',
        tags: ['OpenSource', 'Ed25519', 'DigitalPassport'],
        relevanceScore: 90,
        reactionsCount: { like: 39, celebrate: 45, useful: 22 },
        isBookmarked: true,
        createdAt: '2026-03-03T16:00:00Z'
      }
    ];

    seedItems.forEach(i => this.feedItems.set(i.id, i));
    this.saveToStorage();
  }

  public getCampusFeed(institutionId: string = 'inst-vel-tech-rangarajan-avadi', filterType?: string): CampusFeedItem[] {
    let items = Array.from(this.feedItems.values()).filter(
      i => i.institutionId === institutionId || i.scope === 'GLOBAL'
    );

    if (filterType && filterType !== 'ALL') {
      items = items.filter(i => i.type === filterType);
    }

    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getGlobalFeed(): CampusFeedItem[] {
    return Array.from(this.feedItems.values()).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  public toggleReaction(itemId: string, reactionType: 'LIKE' | 'CELEBRATE' | 'USEFUL'): boolean {
    const item = this.feedItems.get(itemId);
    if (!item) return false;

    if (item.userReaction === reactionType) {
      // remove
      if (reactionType === 'LIKE') item.reactionsCount.like -= 1;
      if (reactionType === 'CELEBRATE') item.reactionsCount.celebrate -= 1;
      if (reactionType === 'USEFUL') item.reactionsCount.useful -= 1;
      item.userReaction = undefined;
    } else {
      // switch
      if (item.userReaction === 'LIKE') item.reactionsCount.like -= 1;
      if (item.userReaction === 'CELEBRATE') item.reactionsCount.celebrate -= 1;
      if (item.userReaction === 'USEFUL') item.reactionsCount.useful -= 1;

      item.userReaction = reactionType;
      if (reactionType === 'LIKE') item.reactionsCount.like += 1;
      if (reactionType === 'CELEBRATE') item.reactionsCount.celebrate += 1;
      if (reactionType === 'USEFUL') item.reactionsCount.useful += 1;
    }

    this.saveToStorage();
    return true;
  }

  public toggleBookmark(itemId: string): boolean {
    const item = this.feedItems.get(itemId);
    if (!item) return false;
    item.isBookmarked = !item.isBookmarked;
    this.saveToStorage();
    return item.isBookmarked;
  }
}

export const campusFeedDatabase = new CampusFeedDatabase();
