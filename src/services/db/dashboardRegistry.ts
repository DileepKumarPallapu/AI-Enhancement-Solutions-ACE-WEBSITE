// ACE Centralized Dashboard Registry & Universal Workspace Service
// Authoritative definitions for all 13 ACE Workspaces, route resolution, live metrics, and real-time state synchronization

import { AccountRole } from '../../types/account';
import { accountDb } from './accountDatabase';
import { mentorshipDb } from './mentorshipDatabase';
import { judgeDb } from './judgeDatabase';
import { eventPersistenceDb } from './eventPersistenceDatabase';
import { workflowEngineDatabase } from './workflowEngineDatabase';

export type WorkspaceCategory = 'CORE' | 'CAMPUS' | 'PROFESSIONAL' | 'ADMINISTRATION';

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export interface WorkspaceDefinition {
  id: string;
  role: AccountRole | 'PLACEMENT_OFFICER' | 'CLUB_ADMIN' | 'TRAINING_PROVIDER' | 'PARTNER';
  title: string;
  name: string;
  description: string;
  icon: string;
  category: WorkspaceCategory;
  route: string;
  aliases: string[];
  badge: string;
  status: 'Active Core' | 'Authorized' | 'Directorate' | 'Superadmin' | 'Unlocked';
  keyFeatures: string[];
  metricsSummary: string;
  fetchMetrics: () => DashboardMetric[];
}

class DashboardRegistry {
  private workspaces: Map<string, WorkspaceDefinition> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.registerWorkspaces();
    this.setupGlobalSync();
  }

  private registerWorkspaces() {
    const definitions: WorkspaceDefinition[] = [
      {
        id: 'ws-student',
        role: 'STUDENT',
        title: 'STUDENT',
        name: 'Student Dashboard',
        description: 'Personalized opportunity discovery feed, interactive skill graph, wallet rewards, student project lab, and career simulator.',
        icon: '🎓',
        category: 'CORE',
        route: '/student/dashboard',
        aliases: ['/student', '/dashboard', '/student/os'],
        badge: 'Core OS',
        status: 'Active Core',
        keyFeatures: [
          'Personal Opportunity Feed',
          'Interactive Skill Graph',
          'Student Project Lab',
          'Career Readiness Simulator',
          'Digital Student ID & Passport'
        ],
        metricsSummary: '48,500 🪙 • 8 Verified Badges',
        fetchMetrics: () => {
          const user = accountDb.getCurrentUser();
          return [
            { label: 'Readiness Score', value: '88%', change: '+4% this month', isPositive: true },
            { label: 'Wallet Balance', value: user?.stats?.coinsBalance ? `${user.stats.coinsBalance.toLocaleString()} 🪙` : '48,500 🪙' },
            { label: 'Events Attended', value: user?.stats?.eventsAttended || 14 },
            { label: 'Verified Skills', value: user?.skills?.verified?.length || 8 }
          ];
        }
      },
      {
        id: 'ws-ambassador',
        role: 'COLLEGE_AMBASSADOR',
        title: 'CAMPUS AMBASSADOR',
        name: 'Campus Ambassador Dashboard',
        description: 'Review and approve collegiate event proposals, coordinate student referral trees, and lead departmental outreach.',
        icon: '📣',
        category: 'CAMPUS',
        route: '/ambassador/dashboard',
        aliases: ['/ambassador', '/campus-ambassador'],
        badge: 'Campus Lead',
        status: 'Authorized',
        keyFeatures: [
          'Campus Event Approvals',
          'Student Referral Tracking',
          'Department Outreach Campaigns',
          'Institutional Leaderboard',
          'Referral Points Redemptions'
        ],
        metricsSummary: '3 Approvals • 2,450 Reach',
        fetchMetrics: () => [
          { label: 'Students Reached', value: '2,450', change: '+18% this month', isPositive: true },
          { label: 'Pending Approvals', value: '3', change: 'Requires Action' },
          { label: 'Active Campaigns', value: '4' },
          { label: 'Campus Rank', value: '#3 in Tamil Nadu' }
        ]
      },
      {
        id: 'ws-faculty-mentor',
        role: 'MENTOR',
        title: 'FACULTY MENTOR',
        name: 'Faculty Mentor Dashboard',
        description: 'Conduct 1-on-1 sprint reviews, sign off student project lab milestones, endorse competencies, and guide research.',
        icon: '👨‍🏫',
        category: 'CAMPUS',
        route: '/mentor/dashboard',
        aliases: ['/mentor', '/faculty/dashboard'],
        badge: 'Faculty Lead',
        status: 'Authorized',
        keyFeatures: [
          'Sprint Reviews & Sign-offs',
          'Student Project Lab Mentoring',
          'Research Paper Guidance',
          'Academic Milestone Endorsements',
          'Office Hours Scheduler'
        ],
        metricsSummary: '12 Mentees • 2 Reviews Due',
        fetchMetrics: () => {
          const mentors = mentorshipDb.getAllMentors();
          const mentor = mentors[0];
          return [
            { label: 'Active Mentees', value: mentor?.currentStudentCount || 12 },
            { label: 'Reviews Due', value: '2', change: 'Action Required' },
            { label: 'Sessions Completed', value: '38' },
            { label: 'Mentee Rating', value: '4.9 / 5.0' }
          ];
        }
      },
      {
        id: 'ws-mentor',
        role: 'MENTOR',
        title: 'MENTOR',
        name: 'Mentor Dashboard',
        description: 'Industry technical mentorship, career guidance sessions, office hours scheduling, and mentee dossier reviews.',
        icon: '🧭',
        category: 'CAMPUS',
        route: '/mentor/dashboard',
        aliases: ['/mentor'],
        badge: 'Industry Mentor',
        status: 'Authorized',
        keyFeatures: [
          'Technical Dossier Reviews',
          'Mock Interview Prep',
          'Career Direction Roadmaps',
          'Action Plan Task Tracking',
          'Direct Mentee Chat'
        ],
        metricsSummary: '8 Active Mentees • 4 Sessions',
        fetchMetrics: () => [
          { label: 'Active Mentees', value: '8' },
          { label: 'Upcoming Sessions', value: '4' },
          { label: 'Action Items Open', value: '6' },
          { label: 'Guidance Hours', value: '24 hrs' }
        ]
      },
      {
        id: 'ws-organizer',
        role: 'ORGANIZER',
        title: 'ORGANIZER',
        name: 'Organizer Dashboard',
        description: 'End-to-end collegiate hackathon command: multi-track registrations, live QR attendance check-in, and automated certificates.',
        icon: '🎫',
        category: 'CORE',
        route: '/organizer/dashboard',
        aliases: ['/organizer', '/submit-event', '/create-event'],
        badge: 'Organizer Command',
        status: 'Authorized',
        keyFeatures: [
          'Multi-Track Registrations',
          'Live QR Attendance Scanner',
          'Prize Pool & Sponsor Matrix',
          'Jury Scoring Dispatch',
          'Verifiable Certificate Issuance'
        ],
        metricsSummary: '620 Registrations • 94% Check-in',
        fetchMetrics: () => {
          const events = eventPersistenceDb.getAllEvents();
          return [
            { label: 'Live Events', value: events.length || 6 },
            { label: 'Total Registrations', value: '620', change: '+94 this week', isPositive: true },
            { label: 'Check-in Rate', value: '94.2%' },
            { label: 'Certificates Dispatched', value: '480' }
          ];
        }
      },
      {
        id: 'ws-college',
        role: 'COLLEGE',
        title: 'COLLEGE',
        name: 'College Dashboard',
        description: 'Institution governance: department hierarchy, faculty mentor allocations, institutional NBA/NAAC accreditation stats.',
        icon: '🏫',
        category: 'CAMPUS',
        route: '/college/dashboard',
        aliases: ['/college', '/college/os'],
        badge: 'Directorate',
        status: 'Directorate',
        keyFeatures: [
          'Institutional Department Hierarchy',
          'Faculty Mentor Allocations',
          'NBA / NAAC Evidence Reports',
          'Campus Hackathon Sanctions',
          'Student Achievement Metrics'
        ],
        metricsSummary: '8 Departments • 64 Mentors',
        fetchMetrics: () => [
          { label: 'Departments', value: '8 Active' },
          { label: 'Faculty Mentors', value: '64 Assigned' },
          { label: 'Students Enrolled', value: '4,280' },
          { label: 'Accreditation Readiness', value: '96%' }
        ]
      },
      {
        id: 'ws-recruiter',
        role: 'RECRUITER',
        title: 'RECRUITER',
        name: 'Recruiter Dashboard',
        description: 'Verified student talent radar filter by proven code evidence, technical interview schedules, and direct job offers pipeline.',
        icon: '💼',
        category: 'PROFESSIONAL',
        route: '/recruiter/dashboard',
        aliases: ['/recruiter'],
        badge: 'Talent Radar',
        status: 'Authorized',
        keyFeatures: [
          'Code-Evidence Talent Search',
          'Skill Graph Verification',
          '1-Click Interview Scheduling',
          'Offer Letter Tracking',
          'Campus Placement Coordination'
        ],
        metricsSummary: '18 Shortlisted • 3 Offers Sent',
        fetchMetrics: () => [
          { label: 'Candidate Matches', value: '142' },
          { label: 'Shortlisted', value: '18' },
          { label: 'Interviews Scheduled', value: '5' },
          { label: 'Offers Extended', value: '3' }
        ]
      },
      {
        id: 'ws-judge',
        role: 'JUDGE',
        title: 'JUDGE',
        name: 'Judge Dashboard',
        description: 'Score assigned hackathon and competition submissions against multi-criteria weighted rubrics with real-time leaderboards.',
        icon: '⚖️',
        category: 'PROFESSIONAL',
        route: '/judge/dashboard',
        aliases: ['/judge'],
        badge: 'Jury Terminal',
        status: 'Authorized',
        keyFeatures: [
          'Multi-Criteria Rubric Scoring',
          'Blind Project Code Evaluation',
          'Conflict of Interest Shield',
          'Real-time Leaderboard Commit',
          'Live Demo Video Reviews'
        ],
        metricsSummary: '8 Teams • 6 Scored',
        fetchMetrics: () => {
          const user = accountDb.getCurrentUser();
          const asgs = judgeDb.getAssignmentsForJudge(user?.id || 'usr_mentor_arun');
          const scored = asgs.filter(a => a.isSubmitted).length;
          return [
            { label: 'Assigned Teams', value: asgs.length || 8 },
            { label: 'Evaluations Completed', value: scored || 6 },
            { label: 'Pending Scoring', value: Math.max(0, (asgs.length || 8) - (scored || 6)) },
            { label: 'Rubric Consensus', value: '98.5%' }
          ];
        }
      },
      {
        id: 'ws-placement',
        role: 'STUDENT',
        title: 'PLACEMENT',
        name: 'Placement Dashboard',
        description: 'Campus placement drive manager, automated student eligibility validation engine, corporate coordination, and offer logs.',
        icon: '📊',
        category: 'PROFESSIONAL',
        route: '/placement',
        aliases: ['/placement/dashboard', '/college/placement'],
        badge: 'Placement OS',
        status: 'Unlocked',
        keyFeatures: [
          'Automated Eligibility Filter',
          'Corporate Drive Calendar',
          'Department-wise Offer Logs',
          'Tier 1/2 CTC Analytics',
          'Student Application Status'
        ],
        metricsSummary: '42 Companies • 5 Live Drives',
        fetchMetrics: () => [
          { label: 'Partner Companies', value: '42' },
          { label: 'Active Drives', value: '5 Live' },
          { label: 'Highest CTC', value: '₹44 LPA' },
          { label: 'Average CTC', value: '₹9.2 LPA' }
        ]
      },
      {
        id: 'ws-club',
        role: 'STUDENT',
        title: 'CLUB',
        name: 'Club Dashboard',
        description: 'Manage collegiate technical chapters, student memberships, internal hack nights, budget allocations, and club events.',
        icon: '👥',
        category: 'CAMPUS',
        route: '/college/clubs',
        aliases: ['/club/dashboard', '/clubs'],
        badge: 'Student Chapter',
        status: 'Unlocked',
        keyFeatures: [
          'Student Membership Roster',
          'Internal Hack Nights',
          'Budget & Equipment Tracking',
          'Event Promotion Engine',
          'Club Achievement Badges'
        ],
        metricsSummary: '145 Members • 2 Events',
        fetchMetrics: () => [
          { label: 'Club Members', value: '145' },
          { label: 'Upcoming Events', value: '2' },
          { label: 'Projects Incubated', value: '7' },
          { label: 'Budget Utilized', value: '62%' }
        ]
      },
      {
        id: 'ws-provider',
        role: 'STUDENT',
        title: 'TRAINING PROVIDER',
        name: 'Training Provider Dashboard',
        description: 'Publish certified micro-courses, track student cohort milestones, and issue tamper-proof verifiable digital credentials.',
        icon: '📚',
        category: 'PROFESSIONAL',
        route: '/provider',
        aliases: ['/provider/dashboard'],
        badge: 'Academy Portal',
        status: 'Unlocked',
        keyFeatures: [
          'Micro-Course Publishing',
          'Cohort Progress Analytics',
          'Verifiable Certificate Issuance',
          'Live Q&A Sessions',
          'Curriculum Skill Mapping'
        ],
        metricsSummary: '1,200 Enrolled • 6 Courses',
        fetchMetrics: () => [
          { label: 'Total Enrolled', value: '1,200' },
          { label: 'Active Courses', value: '6' },
          { label: 'Completion Rate', value: '91.4%' },
          { label: 'Certificates Issued', value: '1,096' }
        ]
      },
      {
        id: 'ws-partner',
        role: 'STUDENT',
        title: 'PARTNER',
        name: 'Partner Dashboard',
        description: 'Coordinate global sponsorship campaigns, research lab grants, and international opportunity exchange programs.',
        icon: '🤝',
        category: 'PROFESSIONAL',
        route: '/partners',
        aliases: ['/partner/dashboard', '/partners/marketplace'],
        badge: 'Global Network',
        status: 'Unlocked',
        keyFeatures: [
          'Sponsorship Campaign Manager',
          'Research Lab Grants',
          'International Exchange Programs',
          'Hackathon Bounty Distribution',
          'ROI & Reach Analytics'
        ],
        metricsSummary: '4 Campaigns • ₹12.5L Grants',
        fetchMetrics: () => [
          { label: 'Active Grants', value: '₹12.5L' },
          { label: 'Sponsored Events', value: '4' },
          { label: 'Student Direct Reach', value: '18,500+' },
          { label: 'Partner Tier', value: 'Diamond' }
        ]
      },
      {
        id: 'ws-admin',
        role: 'ADMIN',
        title: 'ADMIN',
        name: 'Admin Dashboard',
        description: 'Master platform operations: multi-role governance, AI token usage cost center, workflow failure queues, and system telemetry.',
        icon: '🛡️',
        category: 'ADMINISTRATION',
        route: '/admin/dashboard',
        aliases: ['/admin', '/admin/workspaces', '/admin/workflows'],
        badge: 'Superadmin Directorate',
        status: 'Superadmin',
        keyFeatures: [
          'Platform Governance & RBAC',
          'AI Token Cost Center',
          'Workflow Dead Letter Queues',
          'Audit Log Ingestion',
          'Multi-Tenant Institution Config'
        ],
        metricsSummary: '100% Health • 13 Workspaces',
        fetchMetrics: () => {
          const workflows = workflowEngineDatabase.getAllDefinitions();
          return [
            { label: 'System Health', value: '100% Operational', isPositive: true },
            { label: 'Active Workflows', value: workflows.length || 18 },
            { label: 'Institutions Online', value: '12 Verified' },
            { label: 'Audit Events Ingested', value: '4,890' }
          ];
        }
      }
    ];

    definitions.forEach(def => this.workspaces.set(def.id, def));
  }

  private setupGlobalSync() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key && e.key.startsWith('ace_db_')) {
          this.notifySubscribers();
        }
      });
    }
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public notifySubscribers() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error('DashboardRegistry notify error:', err); }
    });
  }

  public getAllWorkspaces(): WorkspaceDefinition[] {
    return Array.from(this.workspaces.values());
  }

  public getWorkspaceById(id: string): WorkspaceDefinition | undefined {
    return this.workspaces.get(id);
  }

  public getWorkspacesByCategory(category: WorkspaceCategory): WorkspaceDefinition[] {
    return Array.from(this.workspaces.values()).filter(w => w.category === category);
  }

  public resolveWorkspaceRoute(roleOrIdentifier: string): string {
    const clean = roleOrIdentifier.trim().toLowerCase();
    
    // Check direct ID match
    for (const ws of this.workspaces.values()) {
      if (ws.id.toLowerCase() === clean) return ws.route;
      if (ws.role.toLowerCase() === clean) return ws.route;
      if (ws.title.toLowerCase() === clean) return ws.route;
      if (ws.name.toLowerCase() === clean) return ws.route;
    }

    // Role specific fallback maps
    const roleMap: Record<string, string> = {
      student: '/student/dashboard',
      college_ambassador: '/ambassador/dashboard',
      ambassador: '/ambassador/dashboard',
      campus_ambassador: '/ambassador/dashboard',
      mentor: '/mentor/dashboard',
      faculty_mentor: '/mentor/dashboard',
      organizer: '/organizer/dashboard',
      college: '/college/dashboard',
      recruiter: '/recruiter/dashboard',
      judge: '/judge/dashboard',
      placement: '/placement',
      placement_officer: '/placement',
      club: '/college/clubs',
      club_admin: '/college/clubs',
      provider: '/provider',
      training_provider: '/provider',
      partner: '/partners',
      admin: '/admin/dashboard',
      super_admin: '/admin/dashboard'
    };

    return roleMap[clean] || '/student/dashboard';
  }
}

export const dashboardRegistry = new DashboardRegistry();
