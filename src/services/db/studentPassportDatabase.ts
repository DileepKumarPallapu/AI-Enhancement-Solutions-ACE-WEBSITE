// ACE Student Achievement Passport Database
// 12-Section Verifiable Digital Credential Passport with Multi-Tier Evidence States

export type VerificationState = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export interface PassportSectionItem {
  id: string;
  title: string;
  subtitle: string;
  verificationState: VerificationState;
  verifiedBy?: string;
  verifiedAt?: string;
  evidenceUrl?: string;
  details?: Record<string, any>;
}

export interface StudentPassport {
  userId: string;
  aceId: string;
  fullName: string;
  institutionName: string;
  department: string;
  program: string;
  sections: {
    identity: PassportSectionItem[];
    education: PassportSectionItem[];
    skills: PassportSectionItem[];
    projects: PassportSectionItem[];
    competitions: PassportSectionItem[];
    hackathons: PassportSectionItem[];
    certificates: PassportSectionItem[];
    achievements: PassportSectionItem[];
    leadership: PassportSectionItem[];
    mentorship: PassportSectionItem[];
    community: PassportSectionItem[];
    experience: PassportSectionItem[];
  };
  totalVerifiedCount: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'ace_db_student_passports_v1';

class StudentPassportDatabase {
  private passports: Map<string, StudentPassport> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
    if (this.passports.size === 0) {
      this.seedInitial();
    }
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const list = JSON.parse(raw) as StudentPassport[];
          list.forEach(p => this.passports.set(p.userId, p));
        }
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.passports.values())));
      }
    } catch {
      // Fallback
    }
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedInitial() {
    const defaultPassport: StudentPassport = {
      userId: 'usr_student_dileep',
      aceId: 'ACE-2026-VT9842',
      fullName: 'Dileep Kumar Pallapu',
      institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      department: 'Computer Science & Engineering',
      program: 'B.Tech - Artificial Intelligence & Machine Learning',
      totalVerifiedCount: 14,
      lastUpdated: new Date().toISOString(),
      sections: {
        identity: [
          {
            id: 'pass_id_01',
            title: 'Vel Tech Institutional Identity Verification',
            subtitle: 'Roll No: VTU2023CSE0412 • Verified by Academic Registrar',
            verificationState: 'VERIFIED',
            verifiedBy: 'Vel Tech Registrar Office',
            verifiedAt: '2024-08-01T09:00:00Z',
            evidenceUrl: '/verify/token'
          }
        ],
        education: [
          {
            id: 'pass_edu_01',
            title: 'B.Tech in Artificial Intelligence & Machine Learning',
            subtitle: 'CGPA: 9.4 / 10.0 • Current Semester 6',
            verificationState: 'VERIFIED',
            verifiedBy: 'Vel Tech Department of CSE',
            verifiedAt: '2024-08-01T09:00:00Z'
          }
        ],
        skills: [
          {
            id: 'pass_sk_01',
            title: 'React & TypeScript Full-Stack Engineering',
            subtitle: 'Level 7 Mastery • Merkle Verified Certificate',
            verificationState: 'VERIFIED',
            verifiedBy: 'ACE Credential Authority',
            verifiedAt: '2026-01-15T10:00:00Z',
            evidenceUrl: '/verify/certificate/cert_fs_892'
          },
          {
            id: 'pass_sk_02',
            title: 'Autonomous AI Agents & Multi-Agent Runtimes',
            subtitle: 'Production Verified • GitHub Monorepo Evidence',
            verificationState: 'VERIFIED',
            verifiedBy: 'Dr. K. Senthilkumar (Faculty Mentor)',
            verifiedAt: '2026-02-28T14:30:00Z'
          }
        ],
        projects: [
          {
            id: 'pass_prj_01',
            title: 'Neural Titans: Autonomous Ground Drone SLAM',
            subtitle: 'Multi-agent perception engine deployed on Edge Jetson Nano',
            verificationState: 'VERIFIED',
            verifiedBy: 'National AI Hackathon Jury Panel',
            verifiedAt: '2025-11-20T16:00:00Z',
            evidenceUrl: 'https://github.com/neural-titans/ground-rescue-slam'
          }
        ],
        competitions: [
          {
            id: 'pass_comp_01',
            title: '1st Place Gold Trophy — National AI Hackathon Web & Robotics',
            subtitle: 'National Collegiate Innovation Championship 2025',
            verificationState: 'VERIFIED',
            verifiedBy: 'IIT Madras Organizing Committee',
            verifiedAt: '2025-11-20T16:00:00Z'
          }
        ],
        hackathons: [
          {
            id: 'pass_hack_01',
            title: 'National AI & Autonomous Robotics Hackathon 2026 Finalist',
            subtitle: 'Vel Tech Primary Team Representative',
            verificationState: 'VERIFIED',
            verifiedBy: 'IIT Madras Center for Innovation',
            verifiedAt: '2026-03-01T00:00:00Z'
          }
        ],
        certificates: [
          {
            id: 'pass_cert_01',
            title: 'Advanced Full-Stack Engineering Masterclass & Hackathon Honors',
            subtitle: 'Certificate ID: cert_fs_892 • Top 2% in Class',
            verificationState: 'VERIFIED',
            verifiedBy: 'ACE Academic Credential Authority',
            verifiedAt: '2026-01-15T10:00:00Z',
            evidenceUrl: '/verify/certificate/cert_fs_892'
          }
        ],
        achievements: [
          {
            id: 'pass_ach_01',
            title: 'Verified Digital Scholar & Campus Ambassador Lead',
            subtitle: 'Issued by All College Events',
            verificationState: 'VERIFIED',
            verifiedBy: 'ACE Student Council',
            verifiedAt: '2025-09-10T11:00:00Z'
          }
        ],
        leadership: [
          {
            id: 'pass_lead_01',
            title: 'Tech Lead — Vel Tech AI & Robotics Society (V-AIRS)',
            subtitle: 'Leading 340+ student builders across 18 campus hackathons',
            verificationState: 'VERIFIED',
            verifiedBy: 'Vel Tech Student Affairs',
            verifiedAt: '2024-08-01T00:00:00Z'
          }
        ],
        mentorship: [
          {
            id: 'pass_mnt_01',
            title: 'Faculty Mentorship Endorsement by Dr. K. Senthilkumar',
            subtitle: 'Distinction in Distributed Systems & AI Pipeline Design',
            verificationState: 'VERIFIED',
            verifiedBy: 'Dr. K. Senthilkumar (Vel Tech University)',
            verifiedAt: '2026-02-28T14:30:00Z'
          }
        ],
        community: [
          {
            id: 'pass_com_01',
            title: 'Vel Tech Coders & Open Source Guild Core Member',
            subtitle: '45 Consecutive Daily Coding Missions Cleared',
            verificationState: 'VERIFIED',
            verifiedBy: 'ACE Open Source Guild',
            verifiedAt: '2026-03-01T00:00:00Z'
          }
        ],
        experience: [
          {
            id: 'pass_exp_01',
            title: 'Autonomous Robotics Research Fellow Candidate',
            subtitle: 'IIT Madras Research Park • Advanced Swarm Perception Lab',
            verificationState: 'PENDING',
            verifiedBy: 'IITM CFI Lab Admin'
          }
        ]
      }
    };

    this.passports.set(defaultPassport.userId, defaultPassport);
    this.save();
  }

  public getByUserId(userId: string): StudentPassport | null {
    return this.passports.get(userId) || null;
  }
  public exportPassportJson(userId: string): string {
    const p = this.getByUserId(userId);
    return JSON.stringify(p || {}, null, 2);
  }

  public verifySectionItem(userId: string, sectionKey: keyof StudentPassport['sections'], itemId: string, verifiedBy: string): boolean {
    const p = this.getByUserId(userId);
    if (!p || !p.sections[sectionKey]) return false;
    const item = p.sections[sectionKey].find(i => i.id === itemId);
    if (!item) return false;
    item.verificationState = 'VERIFIED';
    item.verifiedBy = verifiedBy;
    item.verifiedAt = new Date().toISOString();
    p.totalVerifiedCount = Object.values(p.sections).reduce((acc, sec) => acc + sec.filter(i => i.verificationState === 'VERIFIED').length, 0);
    p.lastUpdated = new Date().toISOString();
    this.passports.set(userId, p);
    this.save();
    return true;
  }
}

export const studentPassportDb = new StudentPassportDatabase();
