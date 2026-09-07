// ACE Phase 3 — Student Command Center & Opportunity Intelligence Test Suite
import { opportunityDb } from '../opportunityDatabase';
import { studentCommandCenterDb } from '../studentCommandCenterDatabase';
import { bookmarkDb } from '../bookmarkDatabase';
import { careerReadinessDb } from '../careerReadinessDatabase';

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function test(suite: string, name: string, fn: () => void) {
  try {
    fn();
    results.push({ suite, name, passed: true });
    console.log(`  ✓ [${suite}] ${name}`);
  } catch (err: any) {
    results.push({ suite, name, passed: false, error: err?.message || String(err) });
    console.error(`  ✗ [${suite}] ${name}: ${err?.message || err}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

export function runAllPhase3Tests(): TestResult[] {
  console.log('====================================================');
  console.log(' ACE PHASE 3 — STUDENT COMMAND CENTER TEST SUITE');
  console.log('====================================================\n');

  const studentUserId = 'usr_student_dileep';

  // 1. OPPORTUNITY INTELLIGENCE & MATCHING
  test('OpportunityIntelligence', 'Calculate deterministic match score and explainable reasons', () => {
    const opp = opportunityDb.getById('opp_hack_001');
    assert(!!opp, 'National AI Hackathon opportunity must exist');

    const match = opportunityDb.calculateMatch(opp!, {
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      skills: ['React & TypeScript', 'Autonomous AI Agents', 'Python'],
      targetCareer: 'AI Systems Engineer',
      interests: ['AI/ML', 'Hackathons']
    });

    assert(match.score >= 80, `Calculated match score must be >= 80 (was ${match.score})`);
    assert(match.reasons.length >= 3, 'Must provide at least 3 explainable proof points');
    assert(match.mentorEndorsed === true, 'Mentor endorsement must be flagged');
    assert(match.missingSkills.includes('ROS2'), 'Missing skill ROS2 must be identified');
  });

  // 2. TODAY PRIORITIES ENGINE
  test('CommandCenterPriorities', 'Evaluate student priorities with non-empty urgencies', () => {
    const prios = studentCommandCenterDb.getTodayPriorities(studentUserId);
    assert(prios.length >= 2, 'Must have at least 2 active priorities');
    assert(prios[0].urgency === 'CRITICAL', 'Top priority must be CRITICAL');
    assert(prios[0].reason.length > 5, 'Priority must have explainable reason');
  });

  // 3. NEXT BEST ACTION ENGINE
  test('NextBestAction', 'Select explainable action and support dismissal', () => {
    const action = studentCommandCenterDb.getNextBestAction(studentUserId);
    assert(!!action, 'Next Best Action must be generated');
    assert(action!.primaryActionLabel.length > 0, 'Primary action label must exist');
    assert(action!.reason.includes('Dr. K. Senthilkumar'), 'Reason must reference mentor recommendation');
  });

  // 4. INTELLIGENT PROFILE COMPLETION
  test('ProfileCompletion', 'Calculate mathematical percentage from authentic user fields', () => {
    const comp1 = studentCommandCenterDb.calculateProfileCompletion({
      fullName: 'Dileep Kumar',
      username: 'dileep',
      college: 'Vel Tech University'
    });
    assert(comp1.percentage < 100, 'Incomplete profile must be < 100%');
    assert(comp1.missingFields.includes('Student Bio & Summary'), 'Missing bio must be identified');

    const comp2 = studentCommandCenterDb.calculateProfileCompletion({
      fullName: 'Dileep Kumar',
      username: 'dileep',
      avatarUrl: 'https://images.unsplash.com/avatar',
      college: 'Vel Tech University',
      bio: 'Full-Stack student builder at Vel Tech',
      email: 'dileep@veltech.edu.in',
      phone: '+91 9876543210'
    });
    assert(comp2.percentage === 100, 'Complete profile must equal 100%');
    assert(comp2.missingFields.length === 0, 'No missing fields for complete profile');
  });

  // 5. STUDENT TIMELINE LEDGER
  test('StudentTimeline', 'Audit trail chronological sorting and event logging', () => {
    const timeline = studentCommandCenterDb.getTimeline(studentUserId);
    assert(timeline.length >= 3, 'Must have seeded student milestones');
    assert(timeline[0].title.length > 0, 'Milestone title must exist');

    studentCommandCenterDb.recordTimelineEvent({
      userId: studentUserId,
      title: 'Published Autonomous SLAM Rescue Project',
      description: 'Submitted open-source monorepo to ACE Project Registry.',
      iconType: 'PROJECT',
      badgeLabel: 'Project Published'
    });

    const updated = studentCommandCenterDb.getTimeline(studentUserId);
    assert(updated[0].title === 'Published Autonomous SLAM Rescue Project', 'Newest event must be first');
  });

  // 6. UNIFIED BOOKMARKS CENTER
  test('UnifiedBookmarks', 'Save, category filter, and toggle bookmarks', () => {
    const all = bookmarkDb.getByUser(studentUserId, 'ALL');
    assert(all.length >= 2, 'Must have saved bookmarks');

    const oppBookmarks = bookmarkDb.getByUser(studentUserId, 'OPPORTUNITY');
    assert(oppBookmarks.every(b => b.type === 'OPPORTUNITY'), 'Category filter must be strict');

    // Toggle off
    const removed = bookmarkDb.toggleBookmark({
      userId: studentUserId,
      entityId: 'opp_hack_001',
      type: 'OPPORTUNITY',
      title: 'National AI Hackathon',
      subtitle: 'IIT Madras',
      targetUrl: '/student/opportunities/opp_hack_001'
    });
    assert(removed === false, 'Toggling existing bookmark must remove it');
    assert(!bookmarkDb.isBookmarked(studentUserId, 'opp_hack_001'), 'Must no longer be bookmarked');

    // Toggle back on
    const added = bookmarkDb.toggleBookmark({
      userId: studentUserId,
      entityId: 'opp_hack_001',
      type: 'OPPORTUNITY',
      title: 'National AI Hackathon',
      subtitle: 'IIT Madras',
      targetUrl: '/student/opportunities/opp_hack_001'
    });
    assert(added === true, 'Toggling new bookmark must add it');
    assert(bookmarkDb.isBookmarked(studentUserId, 'opp_hack_001'), 'Must be bookmarked again');
  });

  // 7. FORMULA-DRIVEN CAREER READINESS
  test('CareerReadiness', 'Calculate weighted multi-pillar scorecard', () => {
    const report = careerReadinessDb.calculateReport(studentUserId, 'AI Systems Engineer');
    assert(report.overallScore >= 80, 'Overall readiness score must reflect student credentials');
    assert(report.categories.length === 5, 'Must contain 5 weighted evidence categories');
    assert(report.topStrengths.length >= 2, 'Must extract top verified strengths');
    assert(report.actionableImprovements.length >= 1, 'Must provide actionable improvement milestones');
  });

  console.log(`\n====================================================`);
  console.log(` SUMMARY: ${results.filter(r => r.passed).length}/${results.length} TESTS PASSED`);
  console.log(`====================================================\n`);

  return results;
}
