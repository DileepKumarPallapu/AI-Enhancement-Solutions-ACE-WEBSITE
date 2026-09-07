// ACE Company & Recruiter Portal Database
// Privacy-First Talent Discovery, Job Postings, Shortlists, and Candidate Pipelines

export interface RecruiterJobPosting {
  id: string;
  recruiterId: string;
  companyName: string;
  companyLogoUrl: string;
  title: string;
  roleType: 'INTERNSHIP' | 'FULL_TIME' | 'CONTRACT' | 'FELLOWSHIP';
  location: string;
  isRemote: boolean;
  salaryOrStipend: string;
  requiredSkills: string[];
  minimumTierRequirement: string;
  description: string;
  deadline: string;
  applicantsCount: number;
  shortlistedCount: number;
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
  createdAt: string;
}

export interface CandidateTalentProfile {
  userId: string;
  aceId: string;
  fullName: string;
  institutionName: string;
  department: string;
  year: string;
  avatarUrl: string;
  verifiedSkills: { name: string; tier: string; confidence: number }[];
  verifiedProjectsCount: number;
  hackathonWinsCount: number;
  certificatesCount: number;
  isAvailableForHire: boolean;
  isProfilePublicToRecruiters: boolean;
  matchScore?: number;
}

export interface CandidateShortlistEntry {
  id: string;
  recruiterId: string;
  jobId: string;
  candidateUserId: string;
  candidateName: string;
  candidateCollege: string;
  status: 'REVIEW' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'OFFER_EXTENDED' | 'REJECTED';
  notes?: string;
  addedAt: string;
  scheduledInterviewDate?: string;
}

const STORAGE_KEYS = {
  JOBS: 'ace_db_recruiter_jobs_v1',
  SHORTLISTS: 'ace_db_recruiter_shortlists_v1'
};

class RecruiterDatabase {
  private jobs: Map<string, RecruiterJobPosting> = new Map();
  private shortlists: Map<string, CandidateShortlistEntry> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
    if (this.jobs.size === 0) {
      this.seedInitial();
    }
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawJ = localStorage.getItem(STORAGE_KEYS.JOBS);
        if (rawJ) {
          const list = JSON.parse(rawJ) as RecruiterJobPosting[];
          list.forEach(j => this.jobs.set(j.id, j));
        }
        const rawS = localStorage.getItem(STORAGE_KEYS.SHORTLISTS);
        if (rawS) {
          const list = JSON.parse(rawS) as CandidateShortlistEntry[];
          list.forEach(s => this.shortlists.set(s.id, s));
        }
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(Array.from(this.jobs.values())));
        localStorage.setItem(STORAGE_KEYS.SHORTLISTS, JSON.stringify(Array.from(this.shortlists.values())));
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
    const sampleJob: RecruiterJobPosting = {
      id: 'job_rec_001',
      recruiterId: 'usr_rec_anthropic',
      companyName: 'Anthropic Labs / Scale AI Partner Network',
      companyLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
      title: 'AI Systems Software Engineer Intern',
      roleType: 'INTERNSHIP',
      location: 'Bengaluru / Hybrid',
      isRemote: true,
      salaryOrStipend: '₹75,000 / month',
      requiredSkills: ['React & TypeScript', 'Autonomous AI Agents', 'Python'],
      minimumTierRequirement: 'Level 5 (Project Verified)',
      description: 'Build high-throughput evaluation harnesses and autonomous agents.',
      deadline: '2026-04-15T23:59:59Z',
      applicantsCount: 48,
      shortlistedCount: 4,
      status: 'ACTIVE',
      createdAt: '2026-03-01T00:00:00Z'
    };

    const sampleShortlist: CandidateShortlistEntry = {
      id: 'sh_01',
      recruiterId: 'usr_rec_anthropic',
      jobId: 'job_rec_001',
      candidateUserId: 'usr_student_dileep',
      candidateName: 'Dileep Kumar Pallapu',
      candidateCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      status: 'INTERVIEW_SCHEDULED',
      notes: 'Rank #1 in National Hackathon with Level 7 verified TypeScript and Autonomous Agent repos.',
      addedAt: '2026-03-02T10:00:00Z',
      scheduledInterviewDate: '2026-03-12T14:00:00Z'
    };

    this.jobs.set(sampleJob.id, sampleJob);
    this.shortlists.set(sampleShortlist.id, sampleShortlist);
    this.save();
  }

  public getJobs(): RecruiterJobPosting[] {
    return Array.from(this.jobs.values());
  }

  public getShortlists(recruiterId: string): CandidateShortlistEntry[] {
    return Array.from(this.shortlists.values()).filter(s => s.recruiterId === recruiterId);
  }

  public searchTalent(query: { skills?: string[]; institution?: string }): CandidateTalentProfile[] {
    // Privacy-governed talent index
    const candidates: CandidateTalentProfile[] = [
      {
        userId: 'usr_student_dileep',
        aceId: 'ACE-2026-VT9842',
        fullName: 'Dileep Kumar Pallapu',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science & Engineering',
        year: '3rd Year',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        verifiedSkills: [
          { name: 'React & TypeScript', tier: 'CERTIFICATE_VERIFIED', confidence: 96 },
          { name: 'Autonomous AI Agents', tier: 'PROJECT_VERIFIED', confidence: 92 },
          { name: 'Cloud Native & Docker', tier: 'ASSESSED', confidence: 84 }
        ],
        verifiedProjectsCount: 4,
        hackathonWinsCount: 2,
        certificatesCount: 3,
        isAvailableForHire: true,
        isProfilePublicToRecruiters: true,
        matchScore: 95
      }
    ];

    return candidates.filter(c => c.isProfilePublicToRecruiters);
  }

  
  public createJob(job: Omit<RecruiterJobPosting, 'id' | 'createdAt' | 'applicantsCount' | 'shortlistedCount'>): RecruiterJobPosting {
    const id = `job_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newJob: RecruiterJobPosting = {
      ...job,
      id,
      applicantsCount: 0,
      shortlistedCount: 0,
      createdAt: new Date().toISOString()
    };
    this.jobs.set(id, newJob);
    this.save();
    return newJob;
  }

  public shortlistCandidate(recruiterId: string, jobId: string, candidateUserId: string, notes?: string): CandidateShortlistEntry {
    const id = `sh_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const entry: CandidateShortlistEntry = {
      id,
      recruiterId,
      jobId,
      candidateUserId,
      candidateName: 'Dileep Kumar Pallapu',
      candidateCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      status: 'SHORTLISTED',
      notes,
      addedAt: new Date().toISOString()
    };
    this.shortlists.set(id, entry);
    this.save();
    return entry;
  }

  public updateShortlistStatus(shortlistId: string, status: CandidateShortlistEntry['status'], notes?: string): boolean {
    const entry = this.shortlists.get(shortlistId);
    if (!entry) return false;
    entry.status = status;
    if (notes) entry.notes = notes;
    this.shortlists.set(shortlistId, entry);
    this.save();
    return true;
  }
}

export const recruiterDb = new RecruiterDatabase();
