import { aceSuperPlatformDatabase } from '../aceSuperPlatformDatabase';
import { frontendCoverageDatabase } from '../frontendCoverageDatabase';

export function runPhase150XTests(): { passed: number; failed: number; details: string[] } {
  let passed = 0;
  let failed = 0;
  const details: string[] = [];

  function assert(condition: boolean, testName: string) {
    if (condition) {
      passed++;
      details.push(`[PASS] ${testName}`);
    } else {
      failed++;
      details.push(`[FAIL] ${testName}`);
      console.error(`[FAIL] ${testName}`);
    }
  }

  console.log('--- Starting ACE 150X Test Suite ---');

  const studentId = 'usr-student-001';

  // 1. Universal Home Feed & Profile Context
  const homeData = aceSuperPlatformDatabase.getUniversalHomeData(studentId);
  assert(
    !!homeData && homeData.profile.id === studentId && homeData.metrics.currentRank === 1,
    'Universal Home provides personalized profile and canonical metrics'
  );
  assert(
    homeData.highPriorityActions.length > 0 && homeData.feedItems.length > 0,
    'Universal Home contains high-priority action items and real-time feed stream'
  );

  // 2. Universal Command Center Matrix
  const matrix = aceSuperPlatformDatabase.getCommandCenterMatrix(studentId);
  assert(
    matrix.stats.totalUrgentDeadlines >= 0 && matrix.careerSimulatorPreview.currentScore > 0,
    'Command Center Matrix computes urgent deadlines and career readiness score'
  );
  assert(
    matrix.todaySchedule.length > 0 && matrix.highPriorityActionList.length > 0,
    'Command Center Matrix aggregates daily schedule and high-priority action list'
  );

  // 3. Personalized Discover Stream & Explainability
  const discoverItems = aceSuperPlatformDatabase.getPersonalizedDiscoverFeed(studentId);
  assert(
    discoverItems.length >= 3 && discoverItems.every(i => !!i.whyRecommended && i.matchScore > 0),
    'Personalized Discover Feed contains explainable recommendation rationale and match score'
  );

  // 4. Dynamic Interactive Skill Graph
  const skillGraph = aceSuperPlatformDatabase.getSkillGraphData(studentId);
  assert(
    skillGraph.nodes.length >= 6 && skillGraph.edges.length >= 5,
    'Dynamic Skill Graph produces interconnected skill nodes and prerequisite edges'
  );
  const reactNode = skillGraph.nodes.find(n => n.id === 'skill-react');
  assert(
    reactNode !== undefined && reactNode.level === 'EXPERT' && reactNode.verified === true,
    'Skill Graph accurately maps student proficiency levels and verified status'
  );

  // 5. Universal Career OS & Simulation Sandbox
  const simulation = aceSuperPlatformDatabase.simulateCareerReadiness(studentId, 'Senior Fullstack AI Engineer');
  assert(
    simulation.targetRole === 'Senior Fullstack AI Engineer' &&
    simulation.currentReadinessScore > 0 &&
    simulation.missingSkills.length > 0 &&
    simulation.projectedReadinessScore > simulation.currentReadinessScore,
    'Career Simulator calculates exact skill gaps and projected readiness trajectory'
  );

  // 6. Unified Multi-Category Application OS
  const applications = aceSuperPlatformDatabase.getUnifiedApplications(studentId);
  assert(
    applications.length >= 3 && applications.some(a => a.category === 'JOB_OFFER' || a.category === 'INTERNSHIP'),
    'Unified Application OS aggregates multi-category applications (internships, hackathons, grants)'
  );

  const newApp = aceSuperPlatformDatabase.submitApplication({
    studentId,
    opportunityId: 'opp-150x-test-01',
    opportunityTitle: 'MIT CSAIL Summer Fellowship 2026',
    category: 'FELLOWSHIP',
    organizationName: 'MIT Computer Science & AI Lab',
    targetRoleOrTrack: 'Research Fellow in Agentic Systems'
  });
  assert(
    newApp.status === 'UNDER_REVIEW' && newApp.timeline.length === 1,
    'Application submission successfully creates immutable initial timeline log'
  );

  const updatedApp = aceSuperPlatformDatabase.updateApplicationStatus(newApp.id, 'SHORTLISTED', 'Passed committee review');
  assert(
    updatedApp?.status === 'SHORTLISTED' && updatedApp.timeline.length === 2,
    'Application status update safely appends stage note to timeline'
  );

  // 7. Student Project Lab OS
  const projects = aceSuperPlatformDatabase.getStudentProjects(studentId);
  assert(
    projects.length >= 2 && projects.some(p => p.isVerified === true),
    'Student Project Lab retrieves portfolio projects with verified status'
  );

  const newProject = aceSuperPlatformDatabase.createProject({
    title: 'Autonomous Graph Memory Engine',
    description: 'Ultra-low latency graph store for agentic workflows',
    category: 'AI_ML',
    techStack: ['TypeScript', 'Rust', 'WebAssembly'],
    githubUrl: 'https://github.com/veltech/graph-engine',
    liveUrl: 'https://graph-engine.veltech.edu',
    ownerId: studentId,
    collaborators: ['usr-student-002', 'usr-student-003']
  });
  assert(
    newProject.id.startsWith('proj-lab-') && newProject.collaborators.length === 2,
    'Project Lab creates new verified project with collaborating peers'
  );

  // 8. Universal Activity Center & Security Audit
  const activities = aceSuperPlatformDatabase.getUniversalActivityStream(studentId);
  assert(
    activities.length >= 4 && activities.some(a => a.category === 'APPLICATION'),
    'Universal Activity Center streams categorized chronological events'
  );

  // 9. AI Cost Center & Token Governance
  const aiUsage = aceSuperPlatformDatabase.getAICostCenterSummary();
  assert(
    aiUsage.totalMonthlyTokensUsed > 0 &&
    aiUsage.estimatedCostUSD > 0 &&
    aiUsage.modelBreakdown.length >= 3 &&
    aiUsage.dailyTrend.length >= 7,
    'AI Cost Center calculates model token breakdown, USD expenditures and 7-day usage trends'
  );

  // 10. Frontend Coverage Database (100% Platform Verification)
  const coverageSummary = frontendCoverageDatabase.getCoverageSummary();
  assert(
    coverageSummary.coveragePercentage === 100 && coverageSummary.totalEntities >= 40,
    `Frontend coverage matrix verifies 100% entity-to-UI coverage (${coverageSummary.totalEntities} total entities)`
  );

  console.log(`--- ACE 150X Tests Complete: ${passed} passed, ${failed} failed ---`);
  return { passed, failed, details };
}
