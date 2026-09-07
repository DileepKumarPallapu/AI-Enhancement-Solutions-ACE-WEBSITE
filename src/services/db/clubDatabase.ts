// ACE Clubs & Student Chapters Database
// Binds student clubs and tech chapters to real institutions with roles, member registries, and event hosting

export interface ClubMember {
  userId: string;
  fullName: string;
  displayName: string;
  avatarUrl: string;
  role: 'PRESIDENT' | 'VICE_PRESIDENT' | 'TECH_LEAD' | 'EVENT_COORDINATOR' | 'CORE_MEMBER' | 'GENERAL_MEMBER';
  joinedAt: string;
}

export interface StudentClub {
  id: string;
  slug: string;
  name: string;
  institutionId: string;
  institutionName: string;
  category: 'AI & Robotics' | 'Coding & Open Source' | 'Cybersecurity' | 'Entrepreneurship' | 'Cultural & Arts' | 'Design & Media';
  tagline: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  isVerifiedChapter: boolean;
  memberCount: number;
  members: ClubMember[];
  hostedEventsCount: number;
  upcomingEventIds: string[];
  contactEmail: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    discord?: string;
    instagram?: string;
  };
  createdAt: string;
}

const STORAGE_KEY = 'ace_db_student_clubs_v1';

class ClubDatabase {
  private clubs: Map<string, StudentClub> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.clubs.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const items = JSON.parse(raw) as StudentClub[];
          items.forEach(c => this.clubs.set(c.id, c));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.clubs.values())));
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
    const sampleClubs: StudentClub[] = [
      {
        id: 'club_veltech_ai',
        slug: 'veltech-artificial-intelligence-club',
        name: 'Vel Tech AI & Robotics Society (V-AIRS)',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        category: 'AI & Robotics',
        tagline: 'Empowering student builders in generative models, agentic workflows, and drone SLAM.',
        description: 'The official AI & Autonomous Robotics chapter at Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology. We host weekly paper discussions, hackathons, and industry mentorship sessions.',
        logoUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200',
        bannerUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
        isVerifiedChapter: true,
        memberCount: 340,
        hostedEventsCount: 18,
        upcomingEventIds: ['evt_nat_hackathon_2026'],
        contactEmail: 'vairs@veltech.edu.in',
        socialLinks: {
          github: 'https://github.com/vairs-veltech',
          linkedin: 'https://linkedin.com/company/vairs-veltech',
          discord: 'https://discord.gg/vairs'
        },
        createdAt: '2024-06-01T00:00:00.000Z',
        members: [
          {
            userId: 'usr_student_dileep',
            fullName: 'Dileep Kumar Pallapu',
            displayName: 'Dileep Kumar',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
            role: 'TECH_LEAD',
            joinedAt: '2024-08-01T00:00:00.000Z'
          }
        ]
      },
      {
        id: 'club_veltech_coding',
        slug: 'veltech-competitive-programming-club',
        name: 'Vel Tech Coders & Open Source Guild',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        category: 'Coding & Open Source',
        tagline: 'Daily algorithms, ICPC training, and global open source contributions.',
        description: 'Vel Tech developer community driving top algorithmic rankings on Codeforces, LeetCode, and major hackathons across Tamil Nadu and India.',
        logoUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=200',
        bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
        isVerifiedChapter: true,
        memberCount: 520,
        hostedEventsCount: 26,
        upcomingEventIds: [],
        contactEmail: 'coders@veltech.edu.in',
        socialLinks: {
          github: 'https://github.com/veltech-coders',
          discord: 'https://discord.gg/veltech-code'
        },
        createdAt: '2024-03-10T00:00:00.000Z',
        members: [
          {
            userId: 'usr_student_dileep',
            fullName: 'Dileep Kumar Pallapu',
            displayName: 'Dileep Kumar',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
            role: 'CORE_MEMBER',
            joinedAt: '2024-07-15T00:00:00.000Z'
          }
        ]
      },
      {
        id: 'club_iitm_robotics',
        slug: 'iitm-robotics-club',
        name: 'IIT Madras Center for Innovation - Robotics Club',
        institutionId: 'inst-iit-madras-chennai',
        institutionName: 'IIT Madras (Indian Institute of Technology)',
        category: 'AI & Robotics',
        tagline: 'India leading university robotics innovation hub.',
        description: 'Student-led research and development teams competing in international autonomous vehicle competitions.',
        logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200',
        bannerUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
        isVerifiedChapter: true,
        memberCount: 890,
        hostedEventsCount: 42,
        upcomingEventIds: ['evt_nat_hackathon_2026'],
        contactEmail: 'cfi@iitm.ac.in',
        socialLinks: {
          github: 'https://github.com/cfi-iitm'
        },
        createdAt: '2023-01-01T00:00:00.000Z',
        members: []
      }
    ];

    sampleClubs.forEach(c => this.clubs.set(c.id, c));
    this.saveToStorage();
  }

  public getAll(): StudentClub[] {
    return Array.from(this.clubs.values());
  }

  public getById(id: string): StudentClub | null {
    return this.clubs.get(id) || null;
  }

  public getBySlug(slug: string): StudentClub | null {
    for (const c of this.clubs.values()) {
      if (c.slug === slug) return c;
    }
    return null;
  }

  public getByInstitution(institutionId: string): StudentClub[] {
    return Array.from(this.clubs.values()).filter(c => c.institutionId === institutionId);
  }

  public joinClub(clubId: string, user: { userId: string; fullName: string; displayName: string; avatarUrl: string }): boolean {
    const club = this.clubs.get(clubId);
    if (!club) return false;

    if (club.members.some(m => m.userId === user.userId)) {
      return true; // Already a member
    }

    club.members.push({
      userId: user.userId,
      fullName: user.fullName,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      role: 'GENERAL_MEMBER',
      joinedAt: new Date().toISOString()
    });
    club.memberCount += 1;
    this.clubs.set(clubId, club);
    this.saveToStorage();
    return true;
  }

  public leaveClub(clubId: string, userId: string): boolean {
    const club = this.clubs.get(clubId);
    if (!club) return false;
    club.members = club.members.filter(m => m.userId !== userId);
    club.memberCount = Math.max(0, club.memberCount - 1);
    this.clubs.set(clubId, club);
    this.saveToStorage();
    return true;
  }
}

export const clubDb = new ClubDatabase();
