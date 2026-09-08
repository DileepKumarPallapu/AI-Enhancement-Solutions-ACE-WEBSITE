// ACE 90X Social Network, Follows & Student Connections Database
// Canonical student networking bound to institutions with privacy gates and recommendation matching

export type ConnectionStatus = 'NONE' | 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'BLOCKED';

export interface StudentConnection {
  id: string;
  requesterId: string;
  recipientId: string;
  recipientName: string;
  recipientHeadline: string;
  recipientAvatar: string;
  recipientInstitution: string;
  recipientDepartment: string;
  status: ConnectionStatus;
  matchingFactors: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FollowEntity {
  id: string;
  followerId: string;
  targetId: string;
  targetType: 'STUDENT' | 'CLUB' | 'COMMUNITY' | 'COMPANY' | 'ORGANIZER' | 'MENTOR' | 'INSTITUTION' | 'TOPIC' | 'CREATOR';
  targetName: string;
  targetAvatar: string;
  targetBadge?: string;
  createdAt: string;
}

export interface ConnectionRecommendation {
  userId: string;
  fullName: string;
  headline: string;
  avatarUrl: string;
  institutionName: string;
  department: string;
  mutualConnectionsCount: number;
  sharedSkills: string[];
  sharedInterests: string[];
  sharedCompetitions: string[];
  matchScore: number;
}

const CONNECTIONS_STORAGE = 'ace_db_connections_v90';
const FOLLOWS_STORAGE = 'ace_db_follows_v90';

class SocialNetworkDatabase {
  private connections: Map<string, StudentConnection> = new Map();
  private follows: Map<string, FollowEntity> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.connections.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawConn = localStorage.getItem(CONNECTIONS_STORAGE);
        if (rawConn) {
          const items: StudentConnection[] = JSON.parse(rawConn);
          items.forEach(c => this.connections.set(c.id, c));
        }
        const rawFollow = localStorage.getItem(FOLLOWS_STORAGE);
        if (rawFollow) {
          const items: FollowEntity[] = JSON.parse(rawFollow);
          items.forEach(f => this.follows.set(f.id, f));
        }
      }
    } catch (e) {
      console.warn('Failed to load social network storage', e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(CONNECTIONS_STORAGE, JSON.stringify(Array.from(this.connections.values())));
        localStorage.setItem(FOLLOWS_STORAGE, JSON.stringify(Array.from(this.follows.values())));
      }
      this.listeners.forEach(fn => fn());
    } catch (e) {
      console.warn('Failed to save social network storage', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const seedConns: StudentConnection[] = [
      {
        id: 'conn_1',
        requesterId: 'usr_student_priya',
        recipientId: 'usr_student_dileep',
        recipientName: 'Priya Sundaram',
        recipientHeadline: 'AI Research Scholar • Vel Tech CSE',
        recipientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        recipientInstitution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        recipientDepartment: 'Computer Science and Engineering',
        status: 'ACCEPTED',
        matchingFactors: ['Same Institution', 'Same Department', 'AI/ML Skillset'],
        createdAt: '2026-02-15T10:00:00Z',
        updatedAt: '2026-02-15T14:30:00Z'
      },
      {
        id: 'conn_2',
        requesterId: 'usr_student_karthik',
        recipientId: 'usr_student_dileep',
        recipientName: 'Karthik Raja',
        recipientHeadline: 'Cloud & DevOps Engineer • Vel Tech ECE',
        recipientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        recipientInstitution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        recipientDepartment: 'Electronics and Communication Engineering',
        status: 'ACCEPTED',
        matchingFactors: ['Same Institution', 'Smart India Hackathon 2026 Teammate'],
        createdAt: '2026-02-20T09:15:00Z',
        updatedAt: '2026-02-21T11:00:00Z'
      },
      {
        id: 'conn_3',
        requesterId: 'usr_student_ananya',
        recipientId: 'usr_student_dileep',
        recipientName: 'Ananya Sharma',
        recipientHeadline: 'Full Stack React Native Dev • IIT Madras',
        recipientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        recipientInstitution: 'IIT Madras',
        recipientDepartment: 'Computer Science',
        status: 'REQUESTED',
        matchingFactors: ['React/TypeScript Synergy', 'HackIndia 2026 Finalist'],
        createdAt: '2026-03-01T16:45:00Z',
        updatedAt: '2026-03-01T16:45:00Z'
      }
    ];

    seedConns.forEach(c => this.connections.set(c.id, c));

    const seedFollows: FollowEntity[] = [
      {
        id: 'fol_1',
        followerId: 'usr_student_dileep',
        targetId: 'club_veltech_ai',
        targetType: 'CLUB',
        targetName: 'Vel Tech AI & Robotics Club',
        targetAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
        targetBadge: 'Official Student Chapter',
        createdAt: '2026-01-10T12:00:00Z'
      },
      {
        id: 'fol_2',
        followerId: 'usr_student_dileep',
        targetId: 'inst_veltech',
        targetType: 'INSTITUTION',
        targetName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        targetAvatar: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150',
        targetBadge: 'Host Institution',
        createdAt: '2026-01-05T08:00:00Z'
      },
      {
        id: 'fol_3',
        followerId: 'usr_student_dileep',
        targetId: 'mentor_dr_aravind',
        targetType: 'MENTOR',
        targetName: 'Dr. Aravind Swaminathan',
        targetAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        targetBadge: 'Professor & AI Lead',
        createdAt: '2026-01-15T11:20:00Z'
      }
    ];

    seedFollows.forEach(f => this.follows.set(f.id, f));
    this.saveToStorage();
  }

  public getConnectionsForUser(userId: string = 'usr_student_dileep'): StudentConnection[] {
    return Array.from(this.connections.values()).filter(
      c => c.requesterId === userId || c.recipientId === userId
    );
  }

  public getActiveConnections(userId: string = 'usr_student_dileep'): StudentConnection[] {
    return this.getConnectionsForUser(userId).filter(c => c.status === 'ACCEPTED');
  }

  public getPendingRequests(userId: string = 'usr_student_dileep'): StudentConnection[] {
    return Array.from(this.connections.values()).filter(
      c => c.recipientId === userId && c.status === 'REQUESTED'
    );
  }

  public sendConnectionRequest(recipientId: string, recipientName: string, recipientHeadline: string, recipientAvatar: string, recipientInstitution: string, recipientDepartment: string, matchingFactors: string[] = []): StudentConnection {
    const existing = Array.from(this.connections.values()).find(
      c => (c.requesterId === 'usr_student_dileep' && c.recipientId === recipientId) ||
           (c.requesterId === recipientId && c.recipientId === 'usr_student_dileep')
    );

    if (existing) {
      return existing;
    }

    const newConn: StudentConnection = {
      id: `conn_${Date.now()}`,
      requesterId: 'usr_student_dileep',
      recipientId,
      recipientName,
      recipientHeadline,
      recipientAvatar,
      recipientInstitution,
      recipientDepartment,
      status: 'REQUESTED',
      matchingFactors,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.connections.set(newConn.id, newConn);
    this.saveToStorage();
    return newConn;
  }

  public acceptConnectionRequest(connectionId: string): boolean {
    const conn = this.connections.get(connectionId);
    if (!conn) return false;
    conn.status = 'ACCEPTED';
    conn.updatedAt = new Date().toISOString();
    this.connections.set(conn.id, conn);
    this.saveToStorage();
    return true;
  }

  public declineConnectionRequest(connectionId: string): boolean {
    const conn = this.connections.get(connectionId);
    if (!conn) return false;
    conn.status = 'DECLINED';
    conn.updatedAt = new Date().toISOString();
    this.connections.set(conn.id, conn);
    this.saveToStorage();
    return true;
  }

  public getFollows(followerId: string = 'usr_student_dileep'): FollowEntity[] {
    return Array.from(this.follows.values()).filter(f => f.followerId === followerId);
  }

  public isFollowing(targetId: string, followerId: string = 'usr_student_dileep'): boolean {
    return Array.from(this.follows.values()).some(f => f.followerId === followerId && f.targetId === targetId);
  }

  public toggleFollow(targetId: string, targetType: FollowEntity['targetType'], targetName: string, targetAvatar: string, targetBadge?: string): boolean {
    const existing = Array.from(this.follows.values()).find(f => f.followerId === 'usr_student_dileep' && f.targetId === targetId);
    if (existing) {
      this.follows.delete(existing.id);
      this.saveToStorage();
      return false; // Now unfollowed
    } else {
      const newFollow: FollowEntity = {
        id: `fol_${Date.now()}`,
        followerId: 'usr_student_dileep',
        targetId,
        targetType,
        targetName,
        targetAvatar,
        targetBadge,
        createdAt: new Date().toISOString()
      };
      this.follows.set(newFollow.id, newFollow);
      this.saveToStorage();
      return true; // Now followed
    }
  }

  public getSuggestedConnections(): ConnectionRecommendation[] {
    return [
      {
        userId: 'usr_rec_1',
        fullName: 'Rohit Balaji',
        headline: 'AI Systems Engineer • Vel Tech CSE 3rd Year',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science and Engineering',
        mutualConnectionsCount: 4,
        sharedSkills: ['PyTorch', 'FastAPI', 'Vector Databases'],
        sharedInterests: ['Autonomous AI Agents', 'Kaggle Competitions'],
        sharedCompetitions: ['Smart India Hackathon 2026'],
        matchScore: 96
      },
      {
        userId: 'usr_rec_2',
        fullName: 'Divya Nambiar',
        headline: 'Lead Product Designer & Frontend Dev • Vel Tech IT',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Information Technology',
        mutualConnectionsCount: 3,
        sharedSkills: ['React 19', 'Tailwind CSS', 'Figma UI/UX'],
        sharedInterests: ['Design Systems', 'Web Accessibility'],
        sharedCompetitions: ['ACE Global Hackathon 2026'],
        matchScore: 92
      },
      {
        userId: 'usr_rec_3',
        fullName: 'Sameer Khan',
        headline: 'Blockchain & Distributed Systems Researcher • Vel Tech CSE',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science and Engineering',
        mutualConnectionsCount: 2,
        sharedSkills: ['Solidity', 'Rust', 'Cryptography'],
        sharedInterests: ['Zero Knowledge Proofs', 'Smart Contracts'],
        sharedCompetitions: ['Web3 India Track'],
        matchScore: 88
      }
    ];
  }
}

export const socialNetworkDatabase = new SocialNetworkDatabase();
