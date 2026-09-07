// ACE Career Hub & Opportunity Tracker Database
// Manages Target Roles, Real Skill Gap Analysis, Application Kanban Pipeline, and Verified Resumes

export type OpportunityStatus = 
  | 'DISCOVERED'
  | 'BOOKMARKED'
  | 'APPLIED'
  | 'OA_SCHEDULED'
  | 'INTERVIEWING'
  | 'OFFER_RECEIVED'
  | 'REJECTED'
  | 'ACCEPTED';

export type OpportunityType = 'INTERNSHIP' | 'FULL_TIME' | 'HACKATHON_INCUBATION' | 'RESEARCH_FELLOWSHIP';

export interface OpportunityItem {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  location: string;
  type: OpportunityType;
  stipendOrSalary: string;
  deadline: string;
  requiredSkills: string[];
  matchScorePercentage: number;
  description: string;
  applyUrl?: string;
  isVerifiedCompany: boolean;
  postedDate: string;
}

export interface UserApplication {
  id: string;
  userId: string;
  opportunityId: string;
  opportunityTitle: string;
  companyName: string;
  status: OpportunityStatus;
  appliedDate: string;
  lastUpdated: string;
  targetRole: string;
  salaryOrStipend: string;
  notes?: string;
  resumeVersionUsed?: string;
  nextInterviewDate?: string;
}

export interface TargetCareerRole {
  roleTitle: string;
  industry: string;
  averageSalary: string;
  readinessScore: number; // 0 - 100
  requiredSkills: { name: string; requiredLevel: string; currentLevel: string; met: boolean }[];
  missingSkills: string[];
  recommendedEventsAndCourses: { id: string; title: string; type: string }[];
}

export interface VerifiedResumeProfile {
  userId: string;
  headline: string;
  summary: string;
  sectionsVisibility: {
    aceIdBadge: boolean;
    institutionDetails: boolean;
    skillEvidence: boolean;
    hackathonWins: boolean;
    mentorEndorsements: boolean;
    certificates: boolean;
    contactDetails: boolean;
  };
  customSections: { title: string; content: string }[];
  lastExportedAt?: string;
}

const STORAGE_KEYS = {
  OPPORTUNITIES: 'ace_db_career_opportunities_v1',
  APPLICATIONS: 'ace_db_career_applications_v1',
  RESUME_PROFILES: 'ace_db_career_resume_profiles_v1'
};

class CareerDatabase {
  private opportunities: Map<string, OpportunityItem> = new Map();
  private applications: Map<string, UserApplication> = new Map();
  private resumeProfiles: Map<string, VerifiedResumeProfile> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.opportunities.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawOpp = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
        if (rawOpp) {
          const items = JSON.parse(rawOpp) as OpportunityItem[];
          items.forEach(o => this.opportunities.set(o.id, o));
        }
        const rawApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
        if (rawApps) {
          const apps = JSON.parse(rawApps) as UserApplication[];
          apps.forEach(a => this.applications.set(a.id, a));
        }
        const rawRes = localStorage.getItem(STORAGE_KEYS.RESUME_PROFILES);
        if (rawRes) {
          const profiles = JSON.parse(rawRes) as VerifiedResumeProfile[];
          profiles.forEach(p => this.resumeProfiles.set(p.userId, p));
        }
      }
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(Array.from(this.opportunities.values())));
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(Array.from(this.applications.values())));
        localStorage.setItem(STORAGE_KEYS.RESUME_PROFILES, JSON.stringify(Array.from(this.resumeProfiles.values())));
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
    const sampleOpportunities: OpportunityItem[] = [
      {
        id: 'opp_001',
        title: 'AI Systems Software Engineer Intern',
        companyName: 'Anthropic Labs / Scale AI Partner',
        companyLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
        location: 'Bengaluru / Hybrid',
        type: 'INTERNSHIP',
        stipendOrSalary: '₹75,000 / month',
        deadline: new Date(Date.now() + 86400000 * 14).toISOString(),
        requiredSkills: ['React & TypeScript', 'Autonomous AI Agents', 'Python', 'Docker'],
        matchScorePercentage: 94,
        description: 'Design and deploy state-of-the-art agentic evaluation harness and realtime browser assistants.',
        isVerifiedCompany: true,
        postedDate: '2026-03-01T10:00:00.000Z'
      },
      {
        id: 'opp_002',
        title: 'Full-Stack Distributed Systems Engineer',
        companyName: 'Razorpay Innovation Labs',
        companyLogoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120',
        location: 'Chennai / Remote',
        type: 'FULL_TIME',
        stipendOrSalary: '₹22 - 28 LPA',
        deadline: new Date(Date.now() + 86400000 * 21).toISOString(),
        requiredSkills: ['React & TypeScript', 'Algorithms & Data Structures', 'Cloud Native & Docker', 'PostgreSQL'],
        matchScorePercentage: 88,
        description: 'Build high-volume payment processing settlement pipelines and developer dashboard SDKs.',
        isVerifiedCompany: true,
        postedDate: '2026-02-25T11:00:00.000Z'
      },
      {
        id: 'opp_003',
        title: 'Autonomous Robotics Research Fellow',
        companyName: 'IIT Madras Center for Innovation',
        companyLogoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=120',
        location: 'Chennai (IITM Research Park)',
        type: 'RESEARCH_FELLOWSHIP',
        stipendOrSalary: '₹50,000 / month',
        deadline: new Date(Date.now() + 86400000 * 30).toISOString(),
        requiredSkills: ['Autonomous AI Agents', 'ROS2', 'C++', 'Computer Vision'],
        matchScorePercentage: 82,
        description: 'Conduct funded research in collaborative swarm autonomy and edge robot perception.',
        isVerifiedCompany: true,
        postedDate: '2026-03-03T14:00:00.000Z'
      }
    ];

    const sampleApplications: UserApplication[] = [
      {
        id: 'app_001',
        userId: 'usr_student_dileep',
        opportunityId: 'opp_001',
        opportunityTitle: 'AI Systems Software Engineer Intern',
        companyName: 'Anthropic Labs / Scale AI Partner',
        status: 'INTERVIEWING',
        appliedDate: '2026-03-02T10:00:00.000Z',
        lastUpdated: new Date().toISOString(),
        targetRole: 'AI Software Engineer',
        salaryOrStipend: '₹75,000 / month',
        notes: 'Passed Technical Round 1. Next is System Design with Engineering Lead.',
        resumeVersionUsed: 'ACE_Verified_Resume_v2026',
        nextInterviewDate: new Date(Date.now() + 86400000 * 3).toISOString()
      },
      {
        id: 'app_002',
        userId: 'usr_student_dileep',
        opportunityId: 'opp_002',
        opportunityTitle: 'Full-Stack Distributed Systems Engineer',
        companyName: 'Razorpay Innovation Labs',
        status: 'OA_SCHEDULED',
        appliedDate: '2026-03-04T12:00:00.000Z',
        lastUpdated: new Date().toISOString(),
        targetRole: 'Full-Stack Engineer',
        salaryOrStipend: '₹22 - 28 LPA',
        notes: 'Online Coding Assessment link received. Due within 48 hours.'
      }
    ];

    const sampleResume: VerifiedResumeProfile = {
      userId: 'usr_student_dileep',
      headline: 'Full-Stack & Autonomous AI Systems Engineer | Vel Tech University',
      summary: 'B.Tech CSE student at Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology. Experienced in high-performance web applications, multi-agent AI frameworks, and competitive hackathon leadership with 14+ verified credentials on ACE.',
      sectionsVisibility: {
        aceIdBadge: true,
        institutionDetails: true,
        skillEvidence: true,
        hackathonWins: true,
        mentorEndorsements: true,
        certificates: true,
        contactDetails: true
      },
      customSections: [
        {
          title: 'Key Open-Source Initiatives',
          content: 'Creator of Agentic Flow Hub; Contributor to React ecosystem and distributed indexing tools.'
        }
      ],
      lastExportedAt: new Date(Date.now() - 86400000).toISOString()
    };

    sampleOpportunities.forEach(o => this.opportunities.set(o.id, o));
    sampleApplications.forEach(a => this.applications.set(a.id, a));
    this.resumeProfiles.set(sampleResume.userId, sampleResume);
    this.saveToStorage();
  }

  public getOpportunities(): OpportunityItem[] {
    return Array.from(this.opportunities.values());
  }

  public getApplications(userId: string): UserApplication[] {
    return Array.from(this.applications.values())
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }

  public getResumeProfile(userId: string): VerifiedResumeProfile {
    const existing = this.resumeProfiles.get(userId);
    if (existing) return existing;

    const defaultProfile: VerifiedResumeProfile = {
      userId,
      headline: 'Verified ACE Student & Technology Builder',
      summary: 'Student at Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology.',
      sectionsVisibility: {
        aceIdBadge: true,
        institutionDetails: true,
        skillEvidence: true,
        hackathonWins: true,
        mentorEndorsements: true,
        certificates: true,
        contactDetails: true
      },
      customSections: []
    };
    this.resumeProfiles.set(userId, defaultProfile);
    this.saveToStorage();
    return defaultProfile;
  }

  public updateResumeProfile(userId: string, updates: Partial<VerifiedResumeProfile>): VerifiedResumeProfile {
    const curr = this.getResumeProfile(userId);
    const updated = { ...curr, ...updates, userId };
    this.resumeProfiles.set(userId, updated);
    this.saveToStorage();
    return updated;
  }

  public updateApplicationStatus(appId: string, status: OpportunityStatus, notes?: string): boolean {
    const app = this.applications.get(appId);
    if (!app) return false;
    app.status = status;
    if (notes) app.notes = notes;
    app.lastUpdated = new Date().toISOString();
    this.applications.set(appId, app);
    this.saveToStorage();
    return true;
  }

  public applyToOpportunity(params: {
    userId: string;
    opportunityId: string;
    targetRole?: string;
  }): UserApplication {
    const opp = this.opportunities.get(params.opportunityId);
    const id = `app_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newApp: UserApplication = {
      id,
      userId: params.userId,
      opportunityId: params.opportunityId,
      opportunityTitle: opp?.title || 'Opportunity Application',
      companyName: opp?.companyName || 'Verified Partner',
      status: 'APPLIED',
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      targetRole: params.targetRole || opp?.title || 'Software Engineer',
      salaryOrStipend: opp?.stipendOrSalary || 'Competitive'
    };

    this.applications.set(id, newApp);
    this.saveToStorage();
    return newApp;
  }

  public getTargetRoleAnalysis(targetRole: string = 'AI Systems Engineer'): TargetCareerRole {
    return {
      roleTitle: targetRole,
      industry: 'Artificial Intelligence & High Performance Software',
      averageSalary: '₹18,00,000 - ₹32,00,000 / year',
      readinessScore: 89,
      requiredSkills: [
        { name: 'React & TypeScript', requiredLevel: 'Advanced', currentLevel: 'Mastery (Level 7)', met: true },
        { name: 'Autonomous AI Agents', requiredLevel: 'Advanced', currentLevel: 'Production Verified (Level 5)', met: true },
        { name: 'Cloud Native & Docker', requiredLevel: 'Intermediate', currentLevel: 'Assessed (Level 3)', met: true },
        { name: 'Kubernetes Distributed Clusters', requiredLevel: 'Intermediate', currentLevel: 'Learning (Level 2)', met: false },
        { name: 'High-Throughput Vector DBs', requiredLevel: 'Intermediate', currentLevel: 'None', met: false }
      ],
      missingSkills: ['Kubernetes Distributed Clusters', 'High-Throughput Vector DBs'],
      recommendedEventsAndCourses: [
        { id: 'evt_nat_hackathon_2026', title: 'National AI Hackathon 2026', type: 'Hackathon' },
        { id: 'crs_k8s_prod', title: 'Zero to Production Distributed Kubernetes', type: 'Masterclass Course' }
      ]
    };
  }
}

export const careerDb = new CareerDatabase();
