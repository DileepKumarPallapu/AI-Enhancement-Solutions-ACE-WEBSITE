export interface EntityCoverageItem {
  id: string;
  entityName: string;
  category: 'CORE_IDENTITY' | 'ACADEMIC_COLLEGE' | 'CAREER_PLACEMENT' | 'COMPETITIONS_EVENTS' | 'LEARNING_SKILLS' | 'FINANCIAL_WALLET' | 'DEVELOPER_API' | 'SECURITY_TRUST';
  databaseService: string;
  primaryApiRoute: string;
  frontendRoute: string;
  frontendComponent: string;
  allowedRoles: string[];
  capabilities: {
    create: boolean;
    read: boolean;
    update: boolean;
    deleteOrArchive: boolean;
    export: boolean;
  };
  coverageStatus: 'FULL_COVERAGE' | 'PARTIAL_COVERAGE' | 'RESTRICTED';
}

export const ENTITY_COVERAGE_INVENTORY: EntityCoverageItem[] = [
  {
    id: 'cov-user-identity',
    entityName: 'User Account & Canonical Identity',
    category: 'CORE_IDENTITY',
    databaseService: 'accountDatabase.ts / canonicalDataArchitecture.ts',
    primaryApiRoute: '/api/v1/users/me',
    frontendRoute: '/profile',
    frontendComponent: 'PublicProfilePage.tsx / EditProfilePage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-digital-id',
    entityName: 'Digital Student ID & Campus QR',
    category: 'CORE_IDENTITY',
    databaseService: 'digitalIdDatabase.ts',
    primaryApiRoute: '/api/v1/students/id',
    frontendRoute: '/student/id',
    frontendComponent: 'DigitalStudentIDPage.tsx',
    allowedRoles: ['STUDENT', 'ADMIN'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-student-os',
    entityName: 'Student Operating System & Priorities',
    category: 'CORE_IDENTITY',
    databaseService: 'studentOSDatabase.ts / nextBestActionEngine.ts',
    primaryApiRoute: '/api/v1/student/os',
    frontendRoute: '/student/os',
    frontendComponent: 'StudentOSPage.tsx',
    allowedRoles: ['STUDENT'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: false },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-college-os',
    entityName: 'College OS & Department Hierarchy',
    category: 'ACADEMIC_COLLEGE',
    databaseService: 'collegeOSDatabase.ts / departmentHubDatabase.ts',
    primaryApiRoute: '/api/v1/colleges/:id',
    frontendRoute: '/college',
    frontendComponent: 'CollegeOSPage.tsx / DepartmentHubPage.tsx',
    allowedRoles: ['COLLEGE', 'ADMIN'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-placement-cell',
    entityName: 'Placement Cell OS & Eligibility Engine',
    category: 'CAREER_PLACEMENT',
    databaseService: 'placementOSDatabase.ts',
    primaryApiRoute: '/api/v1/placement/drives',
    frontendRoute: '/placement',
    frontendComponent: 'PlacementCellOSPage.tsx',
    allowedRoles: ['COLLEGE', 'STUDENT', 'ADMIN'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-recruiter-portal',
    entityName: 'Recruiter Candidate Pipeline & Talent Radar',
    category: 'CAREER_PLACEMENT',
    databaseService: 'recruiterOSDatabase.ts / recruiterDatabase.ts',
    primaryApiRoute: '/api/v1/recruiter/candidates',
    frontendRoute: '/recruiter/dashboard',
    frontendComponent: 'RecruiterOSDashboardPage.tsx',
    allowedRoles: ['RECRUITER', 'ADMIN'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-career-profile',
    entityName: 'Student Career Profile & Readiness Scorecard',
    category: 'CAREER_PLACEMENT',
    databaseService: 'studentCareerProfileDatabase.ts',
    primaryApiRoute: '/api/v1/career/profile',
    frontendRoute: '/career/profile',
    frontendComponent: 'StudentCareerProfilePage.tsx',
    allowedRoles: ['STUDENT'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-interview-prep',
    entityName: 'Interview Prep Center & AI Simulator',
    category: 'CAREER_PLACEMENT',
    databaseService: 'interviewAndOfferDatabase.ts',
    primaryApiRoute: '/api/v1/interviews/prep',
    frontendRoute: '/career/interview-prep',
    frontendComponent: 'InterviewPrepCenterPage.tsx / AIInterviewSimulatorPage.tsx',
    allowedRoles: ['STUDENT'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: false },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-offers-timeline',
    entityName: 'Offer Tracker & Career Milestone Timeline',
    category: 'CAREER_PLACEMENT',
    databaseService: 'interviewAndOfferDatabase.ts',
    primaryApiRoute: '/api/v1/career/offers',
    frontendRoute: '/career/offers',
    frontendComponent: 'OfferTrackerPage.tsx / CareerMilestoneTimelinePage.tsx',
    allowedRoles: ['STUDENT'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-events-system',
    entityName: 'Events Explorer, Registration & Attendance QR',
    category: 'COMPETITIONS_EVENTS',
    databaseService: 'eventPersistenceDatabase.ts / attendanceDatabase.ts',
    primaryApiRoute: '/api/v1/events',
    frontendRoute: '/events',
    frontendComponent: 'EventsExplorerPage.tsx / EventDetailPage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-competitions-arena',
    entityName: 'Competition Execution Arena & Judging',
    category: 'COMPETITIONS_EVENTS',
    databaseService: 'competitionExecutionDatabase.ts / judgeDatabase.ts',
    primaryApiRoute: '/api/v1/competitions',
    frontendRoute: '/competitions',
    frontendComponent: 'CompetitionsHubPage.tsx / CompetitionArenaPage.tsx / JudgePortalPage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-learning-skills',
    entityName: 'Learning Hub, Skill Tree & Coding Practice',
    category: 'LEARNING_SKILLS',
    databaseService: 'learningPersistenceDatabase.ts / skillEvidenceDatabase.ts',
    primaryApiRoute: '/api/v1/learn',
    frontendRoute: '/learn',
    frontendComponent: 'LearningHubPage.tsx / CodingProblemPage.tsx / SkillTreePage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: false },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-training-provider',
    entityName: 'Training Provider Academy & Cohorts',
    category: 'LEARNING_SKILLS',
    databaseService: 'trainingProviderDatabase.ts',
    primaryApiRoute: '/api/v1/providers/courses',
    frontendRoute: '/provider',
    frontendComponent: 'TrainingProviderPortalPage.tsx',
    allowedRoles: ['ADMIN', 'STUDENT'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-wallet-rewards',
    entityName: 'ACE Wallet (100 Coins = ₹1) & Rewards Ledger',
    category: 'FINANCIAL_WALLET',
    databaseService: 'walletPersistenceDatabase.ts',
    primaryApiRoute: '/api/v1/wallet/ledger',
    frontendRoute: '/student/wallet',
    frontendComponent: 'StudentWalletPage.tsx / RewardsPage.tsx',
    allowedRoles: ['STUDENT', 'ADMIN'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-marketplace-billing',
    entityName: 'Marketplace Services & Subscription Quotas',
    category: 'FINANCIAL_WALLET',
    databaseService: 'marketplaceBillingDatabase.ts',
    primaryApiRoute: '/api/v1/marketplace',
    frontendRoute: '/marketplace',
    frontendComponent: 'MarketplaceHubPage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-developer-webhooks',
    entityName: 'Developer API Keys & HMAC Webhooks Engine',
    category: 'DEVELOPER_API',
    databaseService: 'developerApiDatabase.ts',
    primaryApiRoute: '/api/v1/developers/keys',
    frontendRoute: '/developers',
    frontendComponent: 'DeveloperPortalPage.tsx',
    allowedRoles: ['ADMIN', 'COLLEGE', 'RECRUITER'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-partner-sponsorships',
    entityName: 'Partner Alliances & Sponsorship Engine',
    category: 'DEVELOPER_API',
    databaseService: 'partnerSponsorshipDatabase.ts',
    primaryApiRoute: '/api/v1/partners',
    frontendRoute: '/partners',
    frontendComponent: 'PartnerNetworkPage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-creator-ecosystem',
    entityName: 'Student Creator Publishing & Rewards',
    category: 'DEVELOPER_API',
    databaseService: 'creatorEcosystemDatabase.ts',
    primaryApiRoute: '/api/v1/creators',
    frontendRoute: '/creators',
    frontendComponent: 'CreatorEcosystemPage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-trust-moderation',
    entityName: 'Trust Center, Moderation Queue & System Health',
    category: 'SECURITY_TRUST',
    databaseService: 'trustDatabase.ts / moderationDatabase.ts / systemHealthService.ts',
    primaryApiRoute: '/api/v1/trust / /api/v1/admin/moderation',
    frontendRoute: '/trust',
    frontendComponent: 'TrustCenterPage.tsx / AdminModerationQueuePage.tsx / SystemHealthDashboardPage.tsx',
    allowedRoles: ['ADMIN', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-campus-feed-90x',
    entityName: 'Campus Scoped Feed & Announcements',
    category: 'ACADEMIC_COLLEGE',
    databaseService: 'campusFeedDatabase.ts',
    primaryApiRoute: '/api/v1/campus/feed',
    frontendRoute: '/campus',
    frontendComponent: 'CampusFeedPage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-student-network-90x',
    entityName: 'Student Networking, Connections & Recommendations',
    category: 'CORE_IDENTITY',
    databaseService: 'socialNetworkDatabase.ts',
    primaryApiRoute: '/api/v1/network/connections',
    frontendRoute: '/connections',
    frontendComponent: 'StudentConnectionsPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-direct-messaging-90x',
    entityName: 'Direct, Mentor & Team Channels Messaging 2.0',
    category: 'CORE_IDENTITY',
    databaseService: 'directMessagingDatabase.ts',
    primaryApiRoute: '/api/v1/messages',
    frontendRoute: '/messages',
    frontendComponent: 'DirectMessagesPage.tsx',
    allowedRoles: ['STUDENT', 'MENTOR', 'ORGANIZER', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-student-safety-90x',
    entityName: 'Student Safety Center, Blocked Accounts & GDPR Export',
    category: 'SECURITY_TRUST',
    databaseService: 'studentSafetyDatabase.ts',
    primaryApiRoute: '/api/v1/safety / /api/v1/reports',
    frontendRoute: '/safety',
    frontendComponent: 'StudentSafetyCenterPage.tsx / ModerationReportCenterPage.tsx',
    allowedRoles: ['ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-campus-deadlines-90x',
    entityName: 'Unified Campus Deadlines & Milestones Tracker',
    category: 'COMPETITIONS_EVENTS',
    databaseService: 'campusDeadlinesDatabase.ts',
    primaryApiRoute: '/api/v1/deadlines',
    frontendRoute: '/deadlines',
    frontendComponent: 'CampusDeadlineCenterPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-ai-command-center-100x',
    entityName: 'AI Student Success Engine & Grounded Command Center',
    category: 'CORE_IDENTITY',
    databaseService: 'aiCommandCenterDatabase.ts',
    primaryApiRoute: '/api/v1/ai/command',
    frontendRoute: '/ai',
    frontendComponent: 'AICommandCenterHubPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-ai-memory-100x',
    entityName: 'AI Consented Memory & Personalization Settings',
    category: 'CORE_IDENTITY',
    databaseService: 'aiMemoryDatabase.ts',
    primaryApiRoute: '/api/v1/ai/memory',
    frontendRoute: '/ai/memory',
    frontendComponent: 'AIMemoryCenterPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-ai-study-coach-100x',
    entityName: 'AI Adaptive Study Coach & Validated Quizzes',
    category: 'LEARNING_SKILLS',
    databaseService: 'aiStudyCoachDatabase.ts',
    primaryApiRoute: '/api/v1/ai/study',
    frontendRoute: '/ai/study-coach',
    frontendComponent: 'AIStudyCoachPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-ai-project-mentor-100x',
    entityName: 'AI Project Architecture Mentor & Blueprint Generator',
    category: 'LEARNING_SKILLS',
    databaseService: 'aiProjectMentorDatabase.ts',
    primaryApiRoute: '/api/v1/ai/project',
    frontendRoute: '/ai/project-mentor',
    frontendComponent: 'AIProjectMentorPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-ai-interview-coach-100x',
    entityName: 'AI Technical Mock Interview Simulator & Rubrics',
    category: 'CAREER_PLACEMENT',
    databaseService: 'aiInterviewCoachDatabase.ts',
    primaryApiRoute: '/api/v1/interview/ai-coach',
    frontendRoute: '/interview/ai-coach',
    frontendComponent: 'AIInterviewCoachPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-global-opp-exchange-110x',
    entityName: 'Global Opportunity Exchange & Multi-Currency Engine',
    category: 'COMPETITIONS_EVENTS',
    databaseService: 'globalOpportunityExchangeDatabase.ts',
    primaryApiRoute: '/api/v1/opportunities',
    frontendRoute: '/opportunities',
    frontendComponent: 'GlobalOpportunityExchangePage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: true, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-global-deadlines-110x',
    entityName: 'Global Opportunities Deadline Center & Urgency Buckets',
    category: 'COMPETITIONS_EVENTS',
    databaseService: 'globalOpportunityExchangeDatabase.ts',
    primaryApiRoute: '/api/v1/opportunities/deadlines',
    frontendRoute: '/opportunities/deadlines',
    frontendComponent: 'GlobalOpportunityDeadlinesPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: false, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-opportunity-compare-110x',
    entityName: 'Side-by-Side Opportunity Analyzer & Comparison Hub',
    category: 'COMPETITIONS_EVENTS',
    databaseService: 'globalOpportunityExchangeDatabase.ts',
    primaryApiRoute: '/api/v1/opportunities/compare',
    frontendRoute: '/opportunities/compare',
    frontendComponent: 'OpportunityComparisonPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: false, read: true, update: false, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-marketplace-billing-110x',
    entityName: 'Marketplace Billing, Invoices & Auditable Refunds',
    category: 'FINANCIAL_WALLET',
    databaseService: 'marketplaceBillingDatabase.ts',
    primaryApiRoute: '/api/v1/billing',
    frontendRoute: '/billing',
    frontendComponent: 'GlobalMarketplaceBillingPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: true, deleteOrArchive: false, export: true },
    coverageStatus: 'FULL_COVERAGE'
  },
  {
    id: 'cov-ai-global-opportunities-110x',
    entityName: 'Ask ACE Global Opportunity Assistant & Eligibility Reviewer',
    category: 'CAREER_PLACEMENT',
    databaseService: 'aiGlobalOpportunityAssistantDatabase.ts',
    primaryApiRoute: '/api/v1/ai/global-opportunities',
    frontendRoute: '/ai/global-opportunities',
    frontendComponent: 'AIGlobalOpportunityAssistantPage.tsx',
    allowedRoles: ['STUDENT', 'ALL'],
    capabilities: { create: true, read: true, update: false, deleteOrArchive: false, export: false },
    coverageStatus: 'FULL_COVERAGE'
  }
];

export const frontendCoverageDatabase = {
  getInventory(): EntityCoverageItem[] {
    return ENTITY_COVERAGE_INVENTORY;
  },

  getCoverageSummary(): {
    totalEntities: number;
    fullyCoveredCount: number;
    coveragePercentage: number;
    categories: { category: string; count: number }[];
  } {
    const total = ENTITY_COVERAGE_INVENTORY.length;
    const full = ENTITY_COVERAGE_INVENTORY.filter(i => i.coverageStatus === 'FULL_COVERAGE').length;
    const catMap: Record<string, number> = {};

    ENTITY_COVERAGE_INVENTORY.forEach(i => {
      catMap[i.category] = (catMap[i.category] || 0) + 1;
    });

    return {
      totalEntities: total,
      fullyCoveredCount: full,
      coveragePercentage: Math.round((full / total) * 100),
      categories: Object.entries(catMap).map(([category, count]) => ({ category, count }))
    };
  }
};
