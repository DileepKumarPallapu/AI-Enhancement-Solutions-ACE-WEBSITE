// ACE 150X Universal Super Platform Database
// Interconnects Identity, Passport, Opportunity Graph, Skill Graph, Career OS, Application OS & Workflow Engine

import { digitalPassportDatabase } from './digitalPassportDatabase';
import { globalOpportunityExchangeDatabase, GlobalOpportunity } from './globalOpportunityExchangeDatabase';
import { workflowEngineDatabase, WorkflowTask } from './workflowEngineDatabase';
import { campusDeadlinesDatabase } from './campusDeadlinesDatabase';
import { credentialsDatabase } from './credentialsDatabase';
import { socialNetworkDatabase } from './socialNetworkDatabase';

export interface UniversalHomeData {
  student: {
    name: string;
    enrollmentNo: string;
    department: string;
    institution: string;
    cgpa: number;
    avatarUrl: string;
  };
  profile: {
    id: string;
    name: string;
    email: string;
    college: string;
    department: string;
  };
  metrics: {
    currentRank: number;
    totalPoints: number;
    verifiedSkillsCount: number;
    activeApplicationsCount: number;
    activeProjectsCount: number;
  };
  completenessPercentage: number;
  walletBalanceCoins: number;
  walletBalanceINR: number;
  highPriorityActions: { id: string; title: string; category: string; actionUrl: string; isUrgent: boolean }[];
  todayPriorities: { id: string; title: string; category: string; actionUrl: string; isUrgent: boolean }[];
  urgentDeadlines: { id: string; title: string; dueDate: string; category: string }[];
  recommendedOpportunities: { id: string; title: string; provider: string; matchReason: string; trustScore: number; actionUrl: string }[];
  feedItems: { id: string; title: string; category: string; timestamp: string }[];
  verifiedSkillsCount: number;
  activeProjectsCount: number;
  activeApplicationsCount: number;
  assignedMentor: { name: string; designation: string; department: string; status: string };
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'CORE_CS' | 'AI_ML' | 'SYSTEMS' | 'FRONTEND' | 'CLOUD';
  level: number | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'; // 1-10 or string level
  status: 'CLAIMED' | 'EVALUATED' | 'VERIFIED';
  verified?: boolean;
  prerequisites: string[];
  targetRoles: string[];
  verifiedEvidenceUrl?: string;
}

export interface CareerSimulatorResult {
  targetRole: string;
  targetIndustry: string;
  targetLocation: string;
  currentScore: number; // 0-100
  currentReadinessScore: number;
  targetBenchmarkScore: number;
  projectedReadinessScore: number;
  verifiedSkills: string[];
  missingSkills: string[];
  recommendedProjects: string[];
  recommendedCertifications: string[];
  actionPlan: { step: number; action: string; timeframe: string; sourceReason: string }[];
}

export interface UnifiedApplication {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  providerName: string;
  category: 'INTERNSHIP' | 'JOB' | 'JOB_OFFER' | 'FELLOWSHIP' | 'SCHOLARSHIP' | 'COMPETITION' | 'RESEARCH';
  type: 'INTERNSHIP' | 'JOB' | 'FELLOWSHIP' | 'SCHOLARSHIP' | 'COMPETITION';
  status: 'DISCOVERED' | 'SAVED' | 'PLANNING' | 'DRAFT' | 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';
  resumeVersion: string;
  appliedDate?: string;
  deadline: string;
  notes: string;
  copilotChecklist: { task: string; completed: boolean }[];
  stipendOrPrizeDisplay: string;
  timeline: { stage: string; timestamp: string; note?: string }[];
}

export interface StudentProjectLabItem {
  id: string;
  title: string;
  tagline: string;
  description?: string;
  category?: string;
  techStack: string[];
  repositoryUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  ownerId?: string;
  collaborators: string[];
  isVerified?: boolean;
  status: 'PLANNING' | 'IN_PROGRESS' | 'REVIEW_REQUESTED' | 'MENTOR_APPROVED' | 'DEPLOYED';
  milestones: { title: string; isDone: boolean }[];
  assignedMentor: string;
  mentorFeedback?: string;
  createdAt: string;
}

export interface UserActivityItem {
  id: string;
  type: 'LOGIN' | 'SKILL_VERIFIED' | 'WORKFLOW_STARTED' | 'APPLICATION_SUBMITTED' | 'MENTOR_SESSION' | 'CREDENTIAL_ISSUED';
  category: 'SECURITY' | 'SKILL' | 'WORKFLOW' | 'APPLICATION' | 'MENTORSHIP' | 'CREDENTIAL';
  title: string;
  description: string;
  timestamp: string;
}

export interface AICostCenterSummary {
  totalMonthlyTokensUsed: number;
  estimatedCostUSD: number;
  costCapUSD: number;
  modelBreakdown: { modelName: string; tokensUsed: number; costUSD: number; requestCount: number }[];
  dailyTrend: { date: string; tokens: number; costUSD: number }[];
}

class ACESuperPlatformDatabase {
  private applications: Map<string, UnifiedApplication> = new Map();
  private projects: Map<string, StudentProjectLabItem> = new Map();
  private activities: UserActivityItem[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.seedInitial();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    // 1. Applications
    const apps: UnifiedApplication[] = [
      {
        id: 'app_150x_01',
        opportunityId: 'opp_glob_fellow_01',
        opportunityTitle: 'Autonomous AI Agents Research Fellow',
        providerName: 'Google Cloud Labs',
        category: 'FELLOWSHIP',
        type: 'FELLOWSHIP',
        status: 'UNDER_REVIEW',
        resumeVersion: 'ATS_Resume_v3_Systems.pdf',
        appliedDate: '2026-03-08T09:05:00Z',
        deadline: '2026-04-30T23:59:59Z',
        notes: 'Endorsed by Dr. Aravind Swaminathan; verified Level 7 TypeScript & Autonomous AI Agents repos included.',
        copilotChecklist: [
          { task: 'Verify GitHub repository Docker benchmarks', completed: true },
          { task: 'Attach Vel Tech faculty mentor attestation', completed: true },
          { task: 'Review mock technical interview questions', completed: false }
        ],
        stipendOrPrizeDisplay: '₹1,50,000 / month',
        timeline: [
          { stage: 'APPLIED', timestamp: '2026-03-08T09:05:00Z', note: 'Application submitted with passport attestation' },
          { stage: 'UNDER_REVIEW', timestamp: '2026-03-08T10:00:00Z', note: 'Under technical screening review' }
        ]
      },
      {
        id: 'app_150x_02',
        opportunityId: 'opp_glob_research_03',
        opportunityTitle: 'Distributed Neural Acceleration Lab Visiting Scholar',
        providerName: 'Vector Institute & University of Toronto',
        category: 'RESEARCH',
        type: 'FELLOWSHIP',
        status: 'DRAFT',
        resumeVersion: 'ATS_Resume_v2_Research.pdf',
        deadline: '2026-05-10T23:59:59Z',
        notes: 'Drafting statement of purpose focusing on distributed vector indexing.',
        copilotChecklist: [
          { task: 'Complete CUDA & Distributed Systems code sample', completed: false },
          { task: 'Upload CGPA 9.4 academic transcript', completed: true }
        ],
        stipendOrPrizeDisplay: '$3,500 CAD / month (≈ ₹2,20,000)',
        timeline: [
          { stage: 'DRAFT', timestamp: '2026-03-07T14:30:00Z', note: 'Application draft created' }
        ]
      },
      {
        id: 'app_150x_03',
        opportunityId: 'opp_job_01',
        opportunityTitle: 'Senior Cloud Systems Architect Intern',
        providerName: 'Microsoft Azure Core Systems',
        category: 'INTERNSHIP',
        type: 'INTERNSHIP',
        status: 'SHORTLISTED',
        resumeVersion: 'ATS_Resume_v3_Systems.pdf',
        appliedDate: '2026-03-01T10:00:00Z',
        deadline: '2026-04-15T23:59:59Z',
        notes: 'Shortlisted for Round 2 System Design Interview.',
        copilotChecklist: [
          { task: 'Schedule technical mock interview with mentor', completed: true },
          { task: 'Review distributed consensus algorithms', completed: true }
        ],
        stipendOrPrizeDisplay: '₹1,25,000 / month',
        timeline: [
          { stage: 'APPLIED', timestamp: '2026-03-01T10:00:00Z', note: 'Submitted application' },
          { stage: 'SHORTLISTED', timestamp: '2026-03-06T15:00:00Z', note: 'Selected for technical interview stage' }
        ]
      }
    ];

    apps.forEach(a => this.applications.set(a.id, a));

    // 2. Project Lab Items
    const projs: StudentProjectLabItem[] = [
      {
        id: 'proj_lab_01',
        title: 'NeuralCore: Autonomous Multi-Agent Orchestrator',
        tagline: 'High-concurrency agent orchestration runtime with verifiable audit logging.',
        description: 'High-concurrency agent orchestration runtime with verifiable audit logging.',
        category: 'AI_ML',
        techStack: ['TypeScript', 'React', 'Node.js', 'Vector DB', 'Docker'],
        repositoryUrl: 'https://github.com/dileepkumar/neuralcore-orchestrator',
        githubUrl: 'https://github.com/dileepkumar/neuralcore-orchestrator',
        liveUrl: 'https://neuralcore.veltech.edu',
        ownerId: 'usr-student-001',
        collaborators: ['usr_peer_02', 'usr_peer_03'],
        isVerified: true,
        status: 'REVIEW_REQUESTED',
        milestones: [
          { title: 'Core Agent Dispatch Loop', isDone: true },
          { title: 'Deterministic Tool Barrier Interceptor', isDone: true },
          { title: 'Vel Tech Innovation Day Demo Deployment', isDone: false }
        ],
        assignedMentor: 'Dr. Aravind Swaminathan (Vel Tech CSE)',
        mentorFeedback: 'Architecture blueprint is solid. Finalize Docker container test scripts before Innovation Day.',
        createdAt: '2026-02-15T00:00:00Z'
      },
      {
        id: 'proj_lab_02',
        title: 'EdgeSLAM: Autonomous Drone Vision & Mapping',
        tagline: 'Edge computing SLAM pipeline for micro-aerial vehicles using ROS2.',
        description: 'Edge computing SLAM pipeline for micro-aerial vehicles using ROS2.',
        category: 'ROBOTICS',
        techStack: ['C++', 'Python', 'ROS2', 'OpenCV'],
        repositoryUrl: 'https://github.com/dileepkumar/edgeslam-drone',
        githubUrl: 'https://github.com/dileepkumar/edgeslam-drone',
        liveUrl: 'https://edgeslam.veltech.edu',
        ownerId: 'usr-student-001',
        collaborators: ['usr_peer_04'],
        isVerified: true,
        status: 'DEPLOYED',
        milestones: [
          { title: 'Camera Calibration & Depth Map', isDone: true },
          { title: 'Occupancy Grid Mapping', isDone: true }
        ],
        assignedMentor: 'Dr. S. Ramanathan',
        createdAt: '2026-01-10T00:00:00Z'
      }
    ];

    projs.forEach(p => this.projects.set(p.id, p));

    // 3. User Activities
    this.activities = [
      { id: 'act_01', type: 'WORKFLOW_STARTED', category: 'WORKFLOW', title: 'Started Prepare Internship Application Workflow', description: 'Triggered from Google Cloud Fellowship item', timestamp: '2026-03-08T09:00:00Z' },
      { id: 'act_02', type: 'SKILL_VERIFIED', category: 'SKILL', title: 'Promoted Autonomous AI Agents to VERIFIED (Level 7)', description: 'Proof validated via NeuralCore repository', timestamp: '2026-03-08T08:45:00Z' },
      { id: 'act_03', type: 'MENTOR_SESSION', category: 'MENTORSHIP', title: 'Completed Weekly Sprint Review with Dr. Aravind Swaminathan', description: 'Faculty mentor signed off on project architecture', timestamp: '2026-03-07T16:00:00Z' },
      { id: 'act_04', type: 'CREDENTIAL_ISSUED', category: 'CREDENTIAL', title: 'Issued Verifiable Digital Passport Badge', description: 'Vel Tech R&D Institute official academic attestation', timestamp: '2026-03-05T11:00:00Z' },
      { id: 'act_05', type: 'APPLICATION_SUBMITTED', category: 'APPLICATION', title: 'Applied to Google Cloud Fellowship 2026', description: 'Multi-agent systems research track', timestamp: '2026-03-08T09:05:00Z' }
    ];
  }

  public getUniversalHomeData(userId: string = 'usr-student-001'): UniversalHomeData {
    const passport = digitalPassportDatabase.getPassport();
    const allOpps = globalOpportunityExchangeDatabase.getAllOpportunities();
    const deadlines = campusDeadlinesDatabase.getAllDeadlines().filter(d => !d.isCompleted);
    const tasks = workflowEngineDatabase.getAllTasks(userId).filter(t => t.status !== 'COMPLETED');

    const priorities = tasks.map(t => ({
      id: t.id,
      title: t.title,
      category: t.source,
      actionUrl: t.actionUrl || '/tasks',
      isUrgent: t.priority === 'HIGH' || t.priority === 'URGENT'
    }));

    return {
      student: {
        name: `${passport.student?.profile?.firstName || 'Dileep'} ${passport.student?.profile?.lastName || 'Kumar'}`,
        enrollmentNo: 'VTU-2022-CSE-0489',
        department: passport.student?.profile?.department || 'Computer Science & Engineering',
        institution: passport.student?.institution?.name || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        cgpa: 9.18,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      },
      profile: {
        id: userId,
        name: 'Dileep Kumar',
        email: 'dileep.kumar@veltech.edu.in',
        college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science & Engineering'
      },
      metrics: {
        currentRank: 1,
        totalPoints: 24500,
        verifiedSkillsCount: passport.skills.filter(s => s.status === 'VERIFIED').length,
        activeApplicationsCount: this.applications.size,
        activeProjectsCount: this.projects.size
      },
      completenessPercentage: passport.completenessPercentage || 96,
      walletBalanceCoins: 48500, // Canonical: 48,500 coins = ₹485.00
      walletBalanceINR: 485.00,
      highPriorityActions: priorities.length > 0 ? priorities : [
        { id: 'pri-01', title: 'Complete Google Cloud Fellowship Application Draft', category: 'OPPORTUNITY', actionUrl: '/applications', isUrgent: true },
        { id: 'pri-02', title: 'Verify Docker Benchmark Telemetry for NeuralCore', category: 'PROJECT_LAB', actionUrl: '/projects/lab', isUrgent: true }
      ],
      todayPriorities: priorities,
      urgentDeadlines: deadlines.slice(0, 3).map(d => ({
        id: d.id,
        title: d.title,
        dueDate: d.dueDate,
        category: d.category
      })),
      recommendedOpportunities: allOpps.slice(0, 3).map(o => ({
        id: o.id,
        title: o.title,
        provider: o.providerName,
        matchReason: o.matchReasons ? o.matchReasons[0] : 'Matches your verified skill profile',
        trustScore: o.trustScore,
        actionUrl: `/opportunities`
      })),
      feedItems: [
        { id: 'feed-1', title: 'Dr. Aravind Swaminathan posted research sprint notes', category: 'MENTORSHIP', timestamp: '10 mins ago' },
        { id: 'feed-2', title: 'Google Cloud Fellowship deadline extended to April 30', category: 'OPPORTUNITY', timestamp: '1 hour ago' },
        { id: 'feed-3', title: 'Vel Tech Innovation Day 2026 registration opened', category: 'CAMPUS', timestamp: '3 hours ago' }
      ],
      verifiedSkillsCount: passport.skills.filter(s => s.status === 'VERIFIED').length,
      activeProjectsCount: this.projects.size,
      activeApplicationsCount: this.applications.size,
      assignedMentor: {
        name: 'Dr. Aravind Swaminathan',
        designation: 'Associate Professor & R&D Lead',
        department: 'Computer Science and Engineering (Vel Tech)',
        status: 'Active & Assigned'
      }
    };
  }

  public getCommandCenterMatrix(userId: string = 'usr-student-001') {
    const homeData = this.getUniversalHomeData(userId);
    return {
      stats: {
        totalUrgentDeadlines: homeData.urgentDeadlines.length,
        pendingApprovalsCount: 2,
        activeWorkflowsCount: 3,
        systemHealth: '100% HEALTHY'
      },
      careerSimulatorPreview: {
        targetRole: 'Senior Fullstack AI Engineer',
        currentScore: 88,
        benchmarkScore: 92
      },
      todaySchedule: [
        { time: '10:00 AM', title: 'AI Systems Sprint Sync', location: 'Lab 402 / Zoom' },
        { time: '02:00 PM', title: 'Placement Cell Mock Technical Review', location: 'CSE Seminar Hall' }
      ],
      highPriorityActionList: homeData.highPriorityActions
    };
  }

  public getPersonalizedDiscoverFeed(userId: string = 'usr-student-001') {
    const allOpps = globalOpportunityExchangeDatabase.getAllOpportunities();
    return allOpps.map(opp => ({
      ...opp,
      matchScore: 95,
      whyRecommended: `Matches your verified Level 7 skill profile in ${(opp.requiredSkills || ['Computer Science & Engineering']).join(', ')} and Vel Tech honors track.`
    }));
  }

  public getUnifiedSkillGraph(): SkillNode[] {
    return [
      {
        id: 'skill-react',
        name: 'React & TypeScript',
        category: 'FRONTEND',
        level: 'EXPERT',
        status: 'VERIFIED',
        verified: true,
        prerequisites: ['JavaScript ES6', 'HTML5/CSS3'],
        targetRoles: ['Frontend Systems Engineer', 'Full-Stack Developer'],
        verifiedEvidenceUrl: 'https://github.com/dileepkumar/neuralcore-orchestrator'
      },
      {
        id: 'skill-agents',
        name: 'Autonomous AI Agents',
        category: 'AI_ML',
        level: 'ADVANCED',
        status: 'VERIFIED',
        verified: true,
        prerequisites: ['Python', 'LLM Prompt Architecture'],
        targetRoles: ['AI Systems Engineer', 'AI Research Fellow'],
        verifiedEvidenceUrl: 'https://github.com/dileepkumar/neuralcore-orchestrator'
      },
      {
        id: 'skill-dist',
        name: 'Distributed Systems & Vector DBs',
        category: 'SYSTEMS',
        level: 'ADVANCED',
        status: 'EVALUATED',
        verified: false,
        prerequisites: ['Data Structures & Algorithms', 'OS Concepts'],
        targetRoles: ['Backend Infrastructure Engineer', 'Systems Architect']
      },
      {
        id: 'skill-ros2',
        name: 'ROS2 & Edge Perception',
        category: 'SYSTEMS',
        level: 'INTERMEDIATE',
        status: 'CLAIMED',
        verified: false,
        prerequisites: ['C++', 'Linux Fundamentals'],
        targetRoles: ['Robotics Engineer', 'Autonomous Drone Specialist']
      },
      {
        id: 'skill-cloud',
        name: 'Kubernetes & Cloud Infrastructure',
        category: 'CLOUD',
        level: 'INTERMEDIATE',
        status: 'EVALUATED',
        verified: false,
        prerequisites: ['Docker', 'Networking'],
        targetRoles: ['DevOps Engineer', 'Cloud Architect']
      },
      {
        id: 'skill-python',
        name: 'Python & PyTorch',
        category: 'AI_ML',
        level: 'EXPERT',
        status: 'VERIFIED',
        verified: true,
        prerequisites: ['Linear Algebra', 'Algorithms'],
        targetRoles: ['Machine Learning Engineer', 'Data Scientist']
      }
    ];
  }

  public getSkillGraphData(userId: string = 'usr-student-001') {
    const nodes = this.getUnifiedSkillGraph();
    const edges = [
      { source: 'skill-react', target: 'skill-dist', relation: 'fullstack_integration' },
      { source: 'skill-python', target: 'skill-agents', relation: 'prerequisite' },
      { source: 'skill-agents', target: 'skill-dist', relation: 'agent_memory' },
      { source: 'skill-cloud', target: 'skill-dist', relation: 'cluster_deployment' },
      { source: 'skill-python', target: 'skill-ros2', relation: 'perception_pipeline' }
    ];
    return { nodes, edges };
  }

  public getCareerSimulatorMatrix(targetRole: string = 'AI Systems Engineer', userId: string = 'usr-student-001'): CareerSimulatorResult {
    const passport = digitalPassportDatabase.getPassport();
    const verifiedSkills = passport.skills.filter(s => s.status === 'VERIFIED').map(s => s.name);

    return {
      targetRole,
      targetIndustry: 'Autonomous Systems & Deep Learning',
      targetLocation: 'Bengaluru / Toronto / Remote',
      currentScore: 88,
      currentReadinessScore: 88,
      targetBenchmarkScore: 92,
      projectedReadinessScore: 96,
      verifiedSkills: verifiedSkills.length > 0 ? verifiedSkills : ['TypeScript', 'React & Next.js', 'Autonomous Agents'],
      missingSkills: ['CUDA GPU Optimization', 'Kubernetes Orchestration'],
      recommendedProjects: ['NeuralCore: Multi-Agent Orchestrator', 'Edge Drone SLAM Perception Engine'],
      recommendedCertifications: ['Google Cloud Professional ML Engineer Voucher', 'NVIDIA Deep Learning Institute CUDA Pass'],
      actionPlan: [
        {
          step: 1,
          action: 'Complete 15-minute AI Mock Interview on Vector DBs',
          timeframe: 'Today',
          sourceReason: 'Prepares for upcoming mock review with Dr. Aravind Swaminathan'
        },
        {
          step: 2,
          action: 'Upload Docker benchmark telemetry for NeuralCore project',
          timeframe: 'This Week',
          sourceReason: 'Required to clear Vel Tech Innovation Day project review gate'
        },
        {
          step: 3,
          action: 'Submit Google Cloud Autonomous AI Agents Fellowship Application',
          timeframe: 'Before April 30',
          sourceReason: 'Matches verified Level 7 TypeScript & Autonomous AI Agents skills'
        }
      ]
    };
  }

  public simulateCareerReadiness(userId: string, targetRole: string): CareerSimulatorResult {
    return this.getCareerSimulatorMatrix(targetRole, userId);
  }

  public getAllApplications(): UnifiedApplication[] {
    return Array.from(this.applications.values());
  }

  public getUnifiedApplications(userId: string = 'usr-student-001'): UnifiedApplication[] {
    return this.getAllApplications();
  }

  public getApplicationById(id: string): UnifiedApplication | null {
    return this.applications.get(id) || null;
  }

  public submitApplication(input: {
    studentId: string;
    opportunityId: string;
    opportunityTitle: string;
    category: UnifiedApplication['category'];
    organizationName: string;
    targetRoleOrTrack?: string;
  }): UnifiedApplication {
    const newApp: UnifiedApplication = {
      id: `app_${Date.now()}`,
      opportunityId: input.opportunityId,
      opportunityTitle: input.opportunityTitle,
      providerName: input.organizationName,
      category: input.category,
      type: 'FELLOWSHIP',
      status: 'UNDER_REVIEW',
      resumeVersion: 'ATS_Resume_v3_Systems.pdf',
      appliedDate: new Date().toISOString(),
      deadline: new Date(Date.now() + 30 * 86400000).toISOString(),
      notes: input.targetRoleOrTrack || 'Application registered in Unified OS',
      copilotChecklist: [{ task: 'Complete application checklist', completed: true }],
      stipendOrPrizeDisplay: 'Standard Institutional Grant',
      timeline: [
        { stage: 'APPLIED', timestamp: new Date().toISOString(), note: 'Submitted via Unified Application OS' }
      ]
    };
    this.applications.set(newApp.id, newApp);
    this.notify();
    return newApp;
  }

  public updateApplicationStatus(id: string, status: UnifiedApplication['status'], note?: string): UnifiedApplication | null {
    const a = this.applications.get(id);
    if (!a) return null;
    a.status = status;
    if (!a.timeline) a.timeline = [];
    a.timeline.push({
      stage: status,
      timestamp: new Date().toISOString(),
      note: note || `Status updated to ${status}`
    });
    this.notify();
    return a;
  }

  public getAllProjectLabItems(): StudentProjectLabItem[] {
    return Array.from(this.projects.values());
  }

  public getStudentProjects(userId: string = 'usr-student-001'): StudentProjectLabItem[] {
    return this.getAllProjectLabItems();
  }

  public createProject(input: {
    title: string;
    description: string;
    category: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    ownerId: string;
    collaborators: string[];
  }): StudentProjectLabItem {
    const newProject: StudentProjectLabItem = {
      id: `proj-lab-${Date.now()}`,
      title: input.title,
      tagline: input.description,
      description: input.description,
      category: input.category,
      techStack: input.techStack,
      repositoryUrl: input.githubUrl || '',
      githubUrl: input.githubUrl,
      liveUrl: input.liveUrl,
      ownerId: input.ownerId,
      collaborators: input.collaborators,
      isVerified: true,
      status: 'IN_PROGRESS',
      milestones: [
        { title: 'Project Initialization', isDone: true },
        { title: 'Architecture Blueprint Signed', isDone: true },
        { title: 'MVP Demo Deployment', isDone: false }
      ],
      assignedMentor: 'Dr. Aravind Swaminathan',
      createdAt: new Date().toISOString()
    };
    this.projects.set(newProject.id, newProject);
    this.notify();
    return newProject;
  }

  public getAllActivities(): UserActivityItem[] {
    return this.activities;
  }

  public getUniversalActivityStream(userId: string = 'usr-student-001'): UserActivityItem[] {
    return this.getAllActivities();
  }

  public getAICostCenterSummary(): AICostCenterSummary {
    return {
      totalMonthlyTokensUsed: 1425890,
      estimatedCostUSD: 28.52,
      costCapUSD: 100.00,
      modelBreakdown: [
        { modelName: 'gemini-1.5-pro', tokensUsed: 890400, costUSD: 19.58, requestCount: 340 },
        { modelName: 'gemini-1.5-flash', tokensUsed: 425490, costUSD: 6.38, requestCount: 1250 },
        { modelName: 'text-embedding-004', tokensUsed: 110000, costUSD: 2.56, requestCount: 890 }
      ],
      dailyTrend: [
        { date: '2026-03-02', tokens: 180000, costUSD: 3.60 },
        { date: '2026-03-03', tokens: 210000, costUSD: 4.20 },
        { date: '2026-03-04', tokens: 195000, costUSD: 3.90 },
        { date: '2026-03-05', tokens: 230000, costUSD: 4.60 },
        { date: '2026-03-06', tokens: 175000, costUSD: 3.50 },
        { date: '2026-03-07', tokens: 205000, costUSD: 4.10 },
        { date: '2026-03-08', tokens: 230890, costUSD: 4.62 }
      ]
    };
  }
}

export const aceSuperPlatformDatabase = new ACESuperPlatformDatabase();
