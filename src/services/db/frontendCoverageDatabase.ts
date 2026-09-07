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
