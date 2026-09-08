import { getCanonicalStudent } from './canonicalDataArchitecture';

export interface SkillPassportItem {
  id: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  status: 'CLAIMED' | 'EVIDENCED' | 'ASSESSED' | 'VERIFIED';
  evidenceSource: string;
  evidenceLink: string;
  lastUpdated: string;
  relatedRole: string;
  verifiedBy?: string;
}

export interface ProjectPassportItem {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  skills: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PRODUCTION_ACTIVE';
  verificationSource: 'SELF_SUBMITTED' | 'MENTOR_VERIFIED' | 'INSTITUTION_VERIFIED' | 'COMPETITION_VERIFIED';
  verifiedBy?: string;
  startDate: string;
  endDate?: string;
}

export interface AchievementPassportItem {
  id: string;
  title: string;
  category: 'ACADEMIC' | 'TECHNICAL' | 'COMPETITION' | 'LEADERSHIP' | 'CREATOR' | 'COMMUNITY';
  issuer: string;
  date: string;
  description: string;
  badgeIcon?: string;
  verified: boolean;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  category: 'EDUCATION' | 'LEARNING' | 'PROJECT' | 'COMPETITION' | 'EVENT' | 'CERTIFICATE' | 'INTERNSHIP' | 'CAREER';
  description: string;
  verified: boolean;
  evidenceUrl?: string;
}

export interface VerificationRequest {
  id: string;
  type: 'INSTITUTION_ENROLLMENT' | 'SKILL_EVIDENCE' | 'PROJECT_VERIFICATION' | 'CREDENTIAL_ATTESTATION';
  targetItem: string;
  submittedEvidence: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  decisionDate?: string;
  reviewerNotes?: string;
}

export interface DigitalStudentPassport {
  student: ReturnType<typeof getCanonicalStudent>;
  completenessPercentage: number;
  missingFields: string[];
  reputationSignals: {
    verifiedSkillsCount: number;
    verifiedProjectsCount: number;
    competitionWinsCount: number;
    certificatesCount: number;
    mentorEndorsementsCount: number;
    institutionAttestation: boolean;
  };
  skills: SkillPassportItem[];
  projects: ProjectPassportItem[];
  achievements: AchievementPassportItem[];
  timeline: TimelineEntry[];
  verificationRequests: VerificationRequest[];
}

const STORAGE_KEY_PASSPORT = 'ace_80x_student_passport';

export const digitalPassportDatabase = {
  getPassport(userId?: string): DigitalStudentPassport {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PASSPORT);
      if (raw) return JSON.parse(raw);
    } catch {}

    const student = getCanonicalStudent();
    const skills: SkillPassportItem[] = [
      {
        id: 'sk-ts',
        name: 'TypeScript',
        level: 'ADVANCED',
        status: 'VERIFIED',
        evidenceSource: 'Production Capstone Lab & NPTEL Assessment',
        evidenceLink: '/project-lab',
        lastUpdated: '2026-08-20',
        relatedRole: 'Full Stack Developer',
        verifiedBy: 'Dr. S. Ramanathan (Faculty Mentor)'
      },
      {
        id: 'sk-react',
        name: 'React & Next.js',
        level: 'ADVANCED',
        status: 'VERIFIED',
        evidenceSource: 'ACE Super Platform Core UI Repository',
        evidenceLink: 'https://github.com/DileepKumarPallapu/AI-Enhancement-Solutions-ACE-WEBSITE',
        lastUpdated: '2026-09-01',
        relatedRole: 'Frontend & Full Stack Engineer',
        verifiedBy: 'Dean of Computing, Vel Tech'
      },
      {
        id: 'sk-node',
        name: 'Node.js & Microservices',
        level: 'ADVANCED',
        status: 'VERIFIED',
        evidenceSource: 'High-Concurrency Event Streaming Engine',
        evidenceLink: '/project-lab',
        lastUpdated: '2026-08-15',
        relatedRole: 'Backend Engineer',
        verifiedBy: 'Dr. P. Chandrasekar (HOD CSE)'
      },
      {
        id: 'sk-python',
        name: 'Python & AI Engineering',
        level: 'INTERMEDIATE',
        status: 'ASSESSED',
        evidenceSource: 'Smart Mobility AI Hackathon Round 1 Evaluation',
        evidenceLink: '/competitions',
        lastUpdated: '2026-09-02',
        relatedRole: 'AI / ML Engineer'
      },
      {
        id: 'sk-k8s',
        name: 'Kubernetes & Docker',
        level: 'INTERMEDIATE',
        status: 'EVIDENCED',
        evidenceSource: 'Multi-Cluster Deployment Script',
        evidenceLink: '/project-lab',
        lastUpdated: '2026-09-05',
        relatedRole: 'Cloud & DevOps Engineer'
      }
    ];

    const projects: ProjectPassportItem[] = [
      {
        id: 'proj-ace-os',
        title: 'All College Events (ACE) Super Platform',
        description: 'Architected and built full-stack student opportunity ecosystem with 20+ specialized operating systems and cryptographic verification.',
        role: 'Lead Full-Stack Architect',
        technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
        skills: ['TypeScript', 'React', 'Node.js', 'System Design'],
        githubUrl: 'https://github.com/DileepKumarPallapu/AI-Enhancement-Solutions-ACE-WEBSITE',
        liveUrl: 'https://allcollegeevent.com',
        status: 'PRODUCTION_ACTIVE',
        verificationSource: 'INSTITUTION_VERIFIED',
        verifiedBy: 'Vel Tech R&D Innovation Council',
        startDate: '2026-01-10'
      },
      {
        id: 'proj-dist-queue',
        title: 'High-Throughput Distributed Task Queue in Go',
        description: 'Built distributed message queue supporting persistent write-ahead logs and leader election using Raft consensus.',
        role: 'Systems Engineer',
        technologies: ['Go', 'gRPC', 'Protocol Buffers', 'Docker'],
        skills: ['Distributed Systems', 'Go', 'Docker'],
        githubUrl: 'https://github.com/dileepkumar/distributed-queue-go',
        status: 'COMPLETED',
        verificationSource: 'MENTOR_VERIFIED',
        verifiedBy: 'Dr. S. Ramanathan',
        startDate: '2025-09-01',
        endDate: '2025-12-15'
      }
    ];

    const achievements: AchievementPassportItem[] = [
      {
        id: 'ach-1',
        title: 'Winner - Vel Tech National CodeFest 2026',
        category: 'COMPETITION',
        issuer: 'Institution Innovation Council (IIC)',
        date: '2026-04-20',
        description: '1st place out of 140 teams building real-time student collaboration software.',
        verified: true
      },
      {
        id: 'ach-2',
        title: 'AWS Certified Cloud Practitioner',
        category: 'TECHNICAL',
        issuer: 'Amazon Web Services (AWS)',
        date: '2025-08-12',
        description: 'Passed official certification exam validating fundamental cloud security and architecture.',
        verified: true
      },
      {
        id: 'ach-3',
        title: 'Lead Campus Ambassador',
        category: 'LEADERSHIP',
        issuer: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute',
        date: '2025-06-01',
        description: 'Elected to represent the Department of CSE for student technical symposiums.',
        verified: true
      }
    ];

    const timeline: TimelineEntry[] = [
      { id: 'tl-1', date: '2023-08-10', title: 'Admitted to Vel Tech B.Tech CSE', category: 'EDUCATION', description: 'Enrolled in 4-year Computer Science & Engineering program with academic merit scholarship.', verified: true },
      { id: 'tl-2', date: '2024-11-15', title: 'Completed Advanced TypeScript & Microservices Capstone', category: 'LEARNING', description: 'Engineered high-performance backend microservice architecture.', verified: true },
      { id: 'tl-3', date: '2025-04-20', title: '1st Prize - Vel Tech National CodeFest', category: 'COMPETITION', description: 'Awarded first place and cash prize for campus collaboration platform.', verified: true },
      { id: 'tl-4', date: '2025-08-12', title: 'Earned AWS Certified Cloud Practitioner', category: 'CERTIFICATE', description: 'Cryptographic cloud credential issued by Amazon Web Services.', verified: true },
      { id: 'tl-5', date: '2026-03-01', title: 'Architected ACE Student Super Platform', category: 'PROJECT', description: 'Published production Student Operating System with 90+ verified services.', verified: true },
      { id: 'tl-6', date: '2026-08-20', title: 'Research Software Engineer Intern Offer', category: 'CAREER', description: 'Appointed to Vel Tech R&D Tech Park research fellowship.', verified: true }
    ];

    const verificationRequests: VerificationRequest[] = [
      {
        id: 'vreq-1',
        type: 'INSTITUTION_ENROLLMENT',
        targetItem: 'Vel Tech B.Tech CSE Enrollment',
        submittedEvidence: 'Official Student Roll: VTU-2023-CSE-042',
        status: 'APPROVED',
        submittedAt: '2026-08-01T10:00:00Z',
        decisionDate: '2026-08-02T14:00:00Z',
        reviewerNotes: 'Verified with Vel Tech Registrar Office'
      }
    ];

    // Compute deterministic completeness
    const requiredSections = [
      student.profile.firstName,
      student.institution.name,
      student.profile.department,
      skills.length > 0,
      projects.length > 0,
      achievements.length > 0,
      timeline.length > 0
    ];
    const completedCount = requiredSections.filter(Boolean).length;
    const completenessPercentage = Math.round((completedCount / requiredSections.length) * 100);

    const passport: DigitalStudentPassport = {
      student,
      completenessPercentage,
      missingFields: [],
      reputationSignals: {
        verifiedSkillsCount: skills.filter(s => s.status === 'VERIFIED').length,
        verifiedProjectsCount: projects.filter(p => p.verificationSource !== 'SELF_SUBMITTED').length,
        competitionWinsCount: achievements.filter(a => a.category === 'COMPETITION').length,
        certificatesCount: 2,
        mentorEndorsementsCount: 3,
        institutionAttestation: true
      },
      skills,
      projects,
      achievements,
      timeline,
      verificationRequests
    };

    this.savePassport(passport);
    return passport;
  },

  savePassport(passport: DigitalStudentPassport) {
    try {
      localStorage.setItem(STORAGE_KEY_PASSPORT, JSON.stringify(passport));
    } catch {}
  },

  addSkill(skill: Omit<SkillPassportItem, 'id' | 'lastUpdated'>): SkillPassportItem {
    const passport = this.getPassport();
    const newSkill: SkillPassportItem = {
      ...skill,
      id: `sk-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    passport.skills.unshift(newSkill);
    this.savePassport(passport);
    return newSkill;
  },

  addProject(project: Omit<ProjectPassportItem, 'id'>): ProjectPassportItem {
    const passport = this.getPassport();
    const newProject: ProjectPassportItem = {
      ...project,
      id: `proj-${Date.now()}`
    };
    passport.projects.unshift(newProject);
    this.savePassport(passport);
    return newProject;
  },

  requestVerification(type: VerificationRequest['type'], targetItem: string, submittedEvidence: string): VerificationRequest {
    const passport = this.getPassport();
    const req: VerificationRequest = {
      id: `vreq-${Date.now()}`,
      type,
      targetItem,
      submittedEvidence,
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    };
    passport.verificationRequests.unshift(req);
    this.savePassport(passport);
    return req;
  }
};
