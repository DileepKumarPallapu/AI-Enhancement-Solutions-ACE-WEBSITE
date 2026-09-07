// ACE 25X Global Follow & Topic Network Database
// Follow Colleges, Companies, Organizers, Mentors, Clubs, Topics, and Skills

export type FollowTargetType = 
  | 'COLLEGE'
  | 'COMPANY'
  | 'ORGANIZER'
  | 'MENTOR'
  | 'CLUB'
  | 'COMMUNITY'
  | 'TOPIC'
  | 'SKILL';

export interface FollowRecord {
  id: string;
  userId: string;
  targetType: FollowTargetType;
  targetId: string;
  targetName: string;
  targetAvatarUrl?: string;
  targetSubtitle?: string;
  followedAt: string;
}

class NetworkFollowDatabase {
  private follows: Map<string, FollowRecord> = new Map();

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const initial: FollowRecord[] = [
      {
        id: 'fol_01',
        userId: 'usr_student_dileep',
        targetType: 'COLLEGE',
        targetId: 'inst-vel-tech-rangarajan-avadi',
        targetName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        targetAvatarUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
        targetSubtitle: 'Avadi, Chennai • Deemed University',
        followedAt: '2026-01-01T00:00:00Z'
      },
      {
        id: 'fol_02',
        userId: 'usr_student_dileep',
        targetType: 'MENTOR',
        targetId: 'men_veltech_senthil',
        targetName: 'Dr. K. Senthilkumar, Ph.D.',
        targetAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        targetSubtitle: 'Head of Computer Science • Vel Tech University',
        followedAt: '2026-01-10T00:00:00Z'
      },
      {
        id: 'fol_03',
        userId: 'usr_student_dileep',
        targetType: 'TOPIC',
        targetId: 'topic_ai_agents',
        targetName: 'Autonomous AI Agents & Multi-Agent Runtimes',
        targetSubtitle: '1,420 Builders Following',
        followedAt: '2026-02-01T00:00:00Z'
      },
      {
        id: 'fol_04',
        userId: 'usr_student_dileep',
        targetType: 'COMPANY',
        targetId: 'comp_google_cloud',
        targetName: 'Google Cloud Labs',
        targetAvatarUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
        targetSubtitle: 'Enterprise & AI Research Fellowship Provider',
        followedAt: '2026-02-15T00:00:00Z'
      }
    ];

    initial.forEach(f => this.follows.set(f.id, f));
  }

  public getFollows(userId: string): FollowRecord[] {
    return Array.from(this.follows.values()).filter(f => f.userId === userId);
  }

  public isFollowing(userId: string, targetType: FollowTargetType, targetId: string): boolean {
    return Array.from(this.follows.values()).some(
      f => f.userId === userId && f.targetType === targetType && f.targetId === targetId
    );
  }

  public toggleFollow(userId: string, targetType: FollowTargetType, targetId: string, targetName: string, targetSubtitle?: string): boolean {
    const existing = Array.from(this.follows.values()).find(
      f => f.userId === userId && f.targetType === targetType && f.targetId === targetId
    );

    if (existing) {
      this.follows.delete(existing.id);
      return false; // Unfollowed
    } else {
      const id = `fol_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      this.follows.set(id, {
        id,
        userId,
        targetType,
        targetId,
        targetName,
        targetSubtitle,
        followedAt: new Date().toISOString()
      });
      return true; // Followed
    }
  }
}

export const networkFollowDb = new NetworkFollowDatabase();
