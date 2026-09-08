// ACE Hackathon Demo Mode Database Service
// Provides isolated demo dataset, all 13 workspace routes, 15-step guided tour, and reset controllers

import { AccountRole } from '../../types/account';

export interface DemoWorkspaceItem {
  id: string;
  role: AccountRole | 'PLACEMENT_OFFICER' | 'CLUB_ADMIN' | 'TRAINING_PROVIDER' | 'PARTNER';
  title: string;
  name: string;
  description: string;
  icon: string;
  category: 'PERSONAL' | 'CAMPUS' | 'ORGANIZATION' | 'PROFESSIONAL' | 'ADMINISTRATION';
  route: string;
  badge: string;
  keyFeatures: string[];
  metrics: { label: string; value: string | number }[];
}

export interface DemoTourStep {
  step: number;
  title: string;
  roleName: string;
  icon: string;
  route: string;
  description: string;
  keyHighlights: string[];
}

export interface DemoStudentProfile {
  name: string;
  headline: string;
  email: string;
  institution: string;
  department: string;
  degree: string;
  year: string;
  cgpa: number;
  walletBalanceCoins: number;
  walletBalanceINR: number;
  skills: { name: string; level: string; verified: boolean }[];
  projects: { title: string; tech: string[]; status: string }[];
  certificates: { title: string; issuer: string; date: string }[];
}

class DemoModeDatabase {
  private isDemoActive: boolean = true; // Enabled by default for hackathon presentation
  private listeners: Set<() => void> = new Set();

  private demoStudent: DemoStudentProfile = {
    name: 'ACE Hackathon Demo Account',
    headline: 'Autonomous Systems & Fullstack AI Developer | Collegiate Tech Lead',
    email: 'demo.student@veltech.edu.in',
    institution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech CSE (Honors in AI/ML)',
    year: '4th Year (Class of 2026)',
    cgpa: 9.24,
    walletBalanceCoins: 48500,
    walletBalanceINR: 485.00,
    skills: [
      { name: 'TypeScript & React', level: 'EXPERT', verified: true },
      { name: 'Autonomous AI Agents', level: 'ADVANCED', verified: true },
      { name: 'Distributed Systems & Vector DBs', level: 'ADVANCED', verified: true },
      { name: 'ROS2 & Robotics SLAM', level: 'INTERMEDIATE', verified: true },
      { name: 'Kubernetes & Cloud Native', level: 'INTERMEDIATE', verified: false }
    ],
    projects: [
      { title: 'NeuralCore: Autonomous Multi-Agent Orchestrator', tech: ['TypeScript', 'Node.js', 'Vector DB'], status: 'MENTOR_APPROVED' },
      { title: 'EdgeSLAM: Autonomous Drone Vision Pipeline', tech: ['C++', 'Python', 'ROS2'], status: 'DEPLOYED' }
    ],
    certificates: [
      { title: 'Google Cloud Professional ML Engineer', issuer: 'Google Cloud', date: 'Feb 2026' },
      { title: 'National Smart India Hackathon Grand Finalist', issuer: 'MoE Innovation Cell', date: 'Jan 2026' }
    ]
  };

  private demoWorkspaces: DemoWorkspaceItem[] = [
    {
      id: 'demo-ws-student',
      role: 'STUDENT',
      title: 'STUDENT',
      name: 'Student Dashboard',
      description: 'Explore personalized opportunity discovery, learn & play arcade, skill graph, career simulator, project lab, and digital passport.',
      icon: '🎓',
      category: 'PERSONAL',
      route: '/student/dashboard',
      badge: 'Core OS',
      keyFeatures: ['Personal Opportunity Feed', 'Career Simulator', 'Dynamic Skill Graph', 'Student Project Lab', 'Digital ID & Passport'],
      metrics: [{ label: 'Readiness Score', value: '88%' }, { label: 'Active Apps', value: 4 }, { label: 'Coins', value: '48,500' }]
    },
    {
      id: 'demo-ws-ambassador',
      role: 'COLLEGE_AMBASSADOR',
      title: 'CAMPUS AMBASSADOR',
      name: 'Campus Ambassador Dashboard',
      description: 'Review campus event proposals, track student referral campaigns, manage departmental outreach, and coordinate college initiatives.',
      icon: '📣',
      category: 'CAMPUS',
      route: '/ambassador/dashboard',
      badge: 'Campus Lead',
      keyFeatures: ['Event Approvals Pipeline', 'Promotional Campaigns', 'Student Referrals', 'Department Outreach'],
      metrics: [{ label: 'Pending Approvals', value: 3 }, { label: 'Campus Reach', value: '2,450' }, { label: 'Active Drives', value: 6 }]
    },
    {
      id: 'demo-ws-faculty-mentor',
      role: 'MENTOR',
      title: 'FACULTY MENTOR',
      name: 'Faculty Mentor Dashboard',
      description: 'Conduct 1-on-1 sprint reviews, verify project lab milestones, endorse competencies, schedule guidance sessions, and track research.',
      icon: '👨‍🏫',
      category: 'CAMPUS',
      route: '/mentor/dashboard',
      badge: 'Faculty Lead',
      keyFeatures: ['Mentee Progress Radar', 'Sprint Review Queue', 'Skill Endorsements', 'Session Scheduler'],
      metrics: [{ label: 'Assigned Mentees', value: 12 }, { label: 'Reviews Due', value: 2 }, { label: 'Projects Signed', value: 5 }]
    },
    {
      id: 'demo-ws-mentor',
      role: 'MENTOR',
      title: 'MENTOR',
      name: 'Mentor Dashboard',
      description: 'Industry technical mentorship, career guidance sessions, office hours scheduling, and mentee dossier reviews.',
      icon: '🧭',
      category: 'CAMPUS',
      route: '/mentor/dashboard',
      badge: 'Industry Mentor',
      keyFeatures: ['Office Hours Booking', 'Career Advice Plans', 'Skill Review Matrix', 'Direct Messaging'],
      metrics: [{ label: 'Active Mentees', value: 8 }, { label: 'Office Hours', value: '4/wk' }, { label: 'Rating', value: '4.9 ★' }]
    },
    {
      id: 'demo-ws-organizer',
      role: 'ORGANIZER',
      title: 'ORGANIZER',
      name: 'Event Organizer Dashboard',
      description: 'Launch collegiate hackathons, manage multi-track registrations, attendance QR check-ins, automate certificates, and run workflows.',
      icon: '🎫',
      category: 'ORGANIZATION',
      route: '/organizer/dashboard',
      badge: 'Organizer',
      keyFeatures: ['Event Creation Studio', 'Live QR Check-in', 'Certificate Engine', 'Workflow Automations'],
      metrics: [{ label: 'Registrations', value: '620' }, { label: 'Attendance', value: '94%' }, { label: 'Issued Badges', value: 450 }]
    },
    {
      id: 'demo-ws-college',
      role: 'COLLEGE',
      title: 'COLLEGE',
      name: 'College Dashboard',
      description: 'Comprehensive college governance: department hierarchy, faculty mentor allocations, institutional accreditation telemetry, and drives.',
      icon: '🏫',
      category: 'ORGANIZATION',
      route: '/college/dashboard',
      badge: 'Directorate',
      keyFeatures: ['Department Hubs', 'Accreditation Reports (NBA/NAAC)', 'Campus Network', 'Placement Governance'],
      metrics: [{ label: 'Departments', value: 8 }, { label: 'Faculty Mentors', value: 64 }, { label: 'Verified Students', value: '4,850' }]
    },
    {
      id: 'demo-ws-recruiter',
      role: 'RECRUITER',
      title: 'RECRUITER',
      name: 'Recruiter Dashboard',
      description: 'Filter verified candidate profiles by verified skill evidence, post high-impact fellowships, schedule interviews, and issue offers.',
      icon: '💼',
      category: 'PROFESSIONAL',
      route: '/recruiter/dashboard',
      badge: 'Talent Scout',
      keyFeatures: ['Verified Talent Radar', 'Interview Center', 'Offer Tracker', 'Internship Postings'],
      metrics: [{ label: 'Shortlisted', value: 18 }, { label: 'Interviews Today', value: 4 }, { label: 'Active Openings', value: 3 }]
    },
    {
      id: 'demo-ws-judge',
      role: 'JUDGE',
      title: 'JUDGE',
      name: 'Judge Dashboard',
      description: 'Score assigned hackathon submissions against multi-criteria rubrics, provide feedback, flag violations, and update leaderboards.',
      icon: '⚖️',
      category: 'PROFESSIONAL',
      route: '/judge/dashboard',
      badge: 'Evaluator',
      keyFeatures: ['Submissions Grading Queue', 'Multi-Criterion Rubric', 'Live Leaderboard', 'Evaluation Feedback'],
      metrics: [{ label: 'Assigned Teams', value: 8 }, { label: 'Scored', value: 6 }, { label: 'Pending', value: 2 }]
    },
    {
      id: 'demo-ws-placement',
      role: 'STUDENT',
      title: 'PLACEMENT',
      name: 'Placement Dashboard',
      description: 'Campus hiring drive manager, eligibility validation engine, shortlists, company coordination, and institutional statistics.',
      icon: '📊',
      category: 'PROFESSIONAL',
      route: '/placement',
      badge: 'Placement Cell',
      keyFeatures: ['Hiring Drive Schedules', 'Eligibility Validator', 'Company Pipeline', 'Placement Analytics'],
      metrics: [{ label: 'Participating Companies', value: 42 }, { label: 'Drives Live', value: 5 }, { label: 'Offers Released', value: 120 }]
    },
    {
      id: 'demo-ws-club',
      role: 'STUDENT',
      title: 'CLUB',
      name: 'Club Dashboard',
      description: 'Manage collegiate technical chapters, student memberships, internal hack nights, budget requests, and community milestones.',
      icon: '👥',
      category: 'ORGANIZATION',
      route: '/college/clubs',
      badge: 'Chapter Lead',
      keyFeatures: ['Member Roster', 'Club Events', 'Budget Allocations', 'Activity Feed'],
      metrics: [{ label: 'Active Members', value: 145 }, { label: 'Upcoming Events', value: 2 }, { label: 'Budget Spent', value: '₹34,000' }]
    },
    {
      id: 'demo-ws-provider',
      role: 'STUDENT',
      title: 'TRAINING PROVIDER',
      name: 'Training Provider Dashboard',
      description: 'Publish certified micro-courses, manage student cohorts, track completion milestones, and issue verifiable digital credentials.',
      icon: '📚',
      category: 'PROFESSIONAL',
      route: '/provider',
      badge: 'Provider',
      keyFeatures: ['Course Catalog', 'Cohort Analytics', 'Credential Issuance', 'Payouts & Billing'],
      metrics: [{ label: 'Enrolled Students', value: '1,200' }, { label: 'Courses Active', value: 6 }, { label: 'Completion Rate', value: '88%' }]
    },
    {
      id: 'demo-ws-partner',
      role: 'STUDENT',
      title: 'PARTNER',
      name: 'Partner Dashboard',
      description: 'Coordinate global sponsorship campaigns, research lab grants, and international opportunity exchange programs.',
      icon: '🤝',
      category: 'ORGANIZATION',
      route: '/partners',
      badge: 'Partner',
      keyFeatures: ['Opportunity Exchange', 'Sponsorship Payouts', 'Research Fellowships', 'Marketplace Billing'],
      metrics: [{ label: 'Active Campaigns', value: 4 }, { label: 'Funded Grants', value: '₹12.5L' }, { label: 'Reach', value: '15,000+' }]
    },
    {
      id: 'demo-ws-admin',
      role: 'ADMIN',
      title: 'ADMIN',
      name: 'Admin Dashboard',
      description: 'Master platform operations: multi-role governance, AI token usage cost center, workflow failure queues, and system health telemetry.',
      icon: '🛡️',
      category: 'ADMINISTRATION',
      route: '/admin/dashboard',
      badge: 'Superadmin',
      keyFeatures: ['Workspace Governance', 'AI Token Cost Center', 'Security Audit Logs', 'System Diagnostics'],
      metrics: [{ label: 'Platform Health', value: '100%' }, { label: 'Active Workspaces', value: 13 }, { label: 'AI Cost/Mo', value: '$28.52' }]
    }
  ];

  // 15-Step Complete Judge Tour
  private tourSteps: DemoTourStep[] = [
    {
      step: 1,
      title: 'Student Operating System & Unified Hub',
      roleName: 'Student OS',
      icon: '🎓',
      route: '/student/dashboard',
      description: 'The unified student command center connecting personalized priorities, 48,500 coin wallet balance, urgent deadlines, and daily action roadmap.',
      keyHighlights: ['Personalized Priorities', '48,500 ACE Coins Wallet', 'High Priority Action Radar']
    },
    {
      step: 2,
      title: 'Personalized Opportunity Discover Feed',
      roleName: 'Opportunities',
      icon: '🔍',
      route: '/discover',
      description: 'AI-grounded matching engine recommending international fellowships, competitions, and internships with explicit explainability rationale.',
      keyHighlights: ['Explainable "Why Recommended"', '95%+ Competency Match', 'Global Deadlines Tracker']
    },
    {
      step: 3,
      title: 'Interactive Learning Hub & Pathways',
      roleName: 'Learning',
      icon: '📚',
      route: '/learning',
      description: 'Interactive curricula, coding practice, micro-tasks, and skill progression paths mapped directly to industry roles.',
      keyHighlights: ['Structured Learning Pathways', 'Coding Challenges', 'XP & Coins Rewards']
    },
    {
      step: 4,
      title: 'Dynamic Skill Graph & Competencies',
      roleName: 'Skills',
      icon: '🧠',
      route: '/skills',
      description: 'Visual node-and-edge competency graph showing verified skills, prerequisite pathways, and target industry role readiness.',
      keyHighlights: ['Verified Level 7 Competencies', 'Prerequisite Edge Visualizer', 'Repository Evidence Links']
    },
    {
      step: 5,
      title: 'Campus & Faculty Mentorship Hub',
      roleName: 'Mentorship',
      icon: '👨‍🏫',
      route: '/mentorship',
      description: 'Campus mentorship portal connecting students with faculty mentors for 1-on-1 sprint reviews, research guidance, and goals.',
      keyHighlights: ['Mentee Progress Tracking', 'Sprint Sign-Offs', 'Office Hours Calendar']
    },
    {
      step: 6,
      title: 'Student Project Lab & Incubation',
      roleName: 'Projects',
      icon: '🧪',
      route: '/projects',
      description: 'Collaborative code repository hub tracking sprint milestones, peer collaborations, and faculty mentor endorsements.',
      keyHighlights: ['Faculty Mentor Sign-Off', 'Peer Collaborator Roster', 'Verified Portfolio Badges']
    },
    {
      step: 7,
      title: 'Universal Career OS & Simulator',
      roleName: 'Career',
      icon: '🎯',
      route: '/career',
      description: 'Simulates readiness against target industry benchmarks (Senior Fullstack AI Engineer) and computes exact skill gaps.',
      keyHighlights: ['Benchmark Radar', 'Mathematical Gap Evaluation', 'Curated Next Best Action Plan']
    },
    {
      step: 8,
      title: 'Unified Application OS',
      roleName: 'Applications',
      icon: '💼',
      route: '/applications',
      description: 'Multi-category tracking system managing fellowships, internships, research, and hackathons with stage-by-stage timeline audit logs.',
      keyHighlights: ['Multi-Category Pipeline', 'Stage Audit Logs', 'Copilot Application Checklist']
    },
    {
      step: 9,
      title: 'Collegiate Campus Network & Clubs',
      roleName: 'Campus',
      icon: '🏫',
      route: '/campus',
      description: 'Institution community connecting departments, student chapters, announcements, and campus hack nights.',
      keyHighlights: ['Department Announcements', 'Tech Clubs Roster', 'Collegiate Community']
    },
    {
      step: 10,
      title: 'Recruiter Hub & Talent Radar',
      roleName: 'Recruiter',
      icon: '💼',
      route: '/recruiter/dashboard',
      description: 'Talent discovery radar searching verified student credentials, managing interview schedules, and issuing corporate job offers.',
      keyHighlights: ['Verified Evidence Filter', 'Interview Scheduler', 'Offer Management Pipeline']
    },
    {
      step: 11,
      title: 'Competition Judge Arena',
      roleName: 'Judge',
      icon: '⚖️',
      route: '/judge/dashboard',
      description: 'Dedicated evaluation arena for scoring hackathon and competition submissions against multi-criteria weighted rubrics.',
      keyHighlights: ['Multi-Criterion Grading Rubric', 'Live Leaderboard Sync', 'Evaluator Feedback Notes']
    },
    {
      step: 12,
      title: 'Platform Governance & Superadmin',
      roleName: 'Admin',
      icon: '🛡️',
      route: '/admin/dashboard',
      description: 'Central platform directorate monitoring multi-role workspace governance, AI token cost center, workflow failure queues, and uptime.',
      keyHighlights: ['Workspace Governance Console', 'AI Token Cost Breakdown', '100% Platform Health Audit']
    },
    {
      step: 13,
      title: 'Autonomous AI Student Success Engine',
      roleName: 'AI Engine',
      icon: '✨',
      route: '/ai',
      description: 'AI Command Center with memory, study coach, project mentor, interview simulator, and grounded recommendations.',
      keyHighlights: ['Grounded Explainability', 'Interview Simulation Lab', 'Student Persistent Memory']
    },
    {
      step: 14,
      title: 'Autonomous Workflow OS & Gated Approvals',
      roleName: 'Workflows',
      icon: '⚡',
      route: '/workflows',
      description: 'Multi-step autonomous workflow execution engine with human-in-the-loop approval gates and task telemetry.',
      keyHighlights: ['Multi-Step Visual Execution', 'Human Approval Gates', 'Audit Telemetry']
    },
    {
      step: 15,
      title: 'Unified Operational Analytics',
      roleName: 'Analytics',
      icon: '📊',
      route: '/student/dashboard',
      description: 'Comprehensive operational telemetry across student readiness, collegiate engagement, recruiter pipeline, and system health.',
      keyHighlights: ['Readiness Progression', 'Placement Telemetry', 'Platform Health 100%']
    }
  ];

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public isDemoMode(): boolean {
    return this.isDemoActive;
  }

  public setDemoMode(active: boolean) {
    this.isDemoActive = active;
    this.notify();
  }

  public getDemoStudent(): DemoStudentProfile {
    return this.demoStudent;
  }

  public getAllDemoWorkspaces(): DemoWorkspaceItem[] {
    return this.demoWorkspaces;
  }

  public getTourSteps(): DemoTourStep[] {
    return this.tourSteps;
  }

  public resetDemoData(): boolean {
    this.demoStudent.walletBalanceCoins = 48500;
    this.demoStudent.walletBalanceINR = 485.00;
    this.notify();
    return true;
  }
}

export const demoModeDatabase = new DemoModeDatabase();
