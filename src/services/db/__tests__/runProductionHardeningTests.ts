// ACE Production Hardening & Security Test Suite
import { activityLogDb } from '../activityLogDatabase';
import { universalSearchService } from '../../search/universalSearchService';
import { permissionEngine } from '../../security/permissionEngine';
import { sessionSecurityService } from '../../security/sessionSecurityService';
import { backgroundJobQueue } from '../../jobs/backgroundJobQueue';
import { conflictDetectionService } from '../../concurrency/optimisticLocking';
import { realTimeSyncService } from '../../sync/realTimeSyncService';
import { User } from '../canonicalDataArchitecture';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function test(suite: string, name: string, fn: () => void | Promise<void>) {
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

export function runAllProductionTests(): TestResult[] {
  console.log('====================================================');
  console.log(' ACE PRODUCTION HARDENING & SECURITY TEST SUITE');
  console.log('====================================================\n');

  const testStudentUser: User = {
    id: 'usr_student_dileep',
    email: 'dileep.kumar@veltech.edu.in',
    fullName: 'Pallapu Dileep Kumar',
    displayName: 'Dileep Kumar',
    username: 'dileep',
    role: 'STUDENT',
    roles: ['STUDENT'],
    activeWorkspace: 'STUDENT',
    institutionId: 'inst-vel-tech-rangarajan-avadi',
    college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    isVerified: true,
    status: 'ACTIVE',
    version: 1,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-09-02T00:00:00Z'
  };

  // 1. UNIVERSAL ACTIVITY LOGGING
  test('ActivityLogging', 'Record real activity and chronological retrieval', () => {
    const act = activityLogDb.recordActivity({
      userId: testStudentUser.id,
      type: 'EVENT_REGISTERED',
      title: 'Joined Autonomous Hackathon',
      description: 'Signed up for 36-hour sprint at Vel Tech Incubation center',
      entityType: 'EVENT',
      entityId: 'evt-hackverse-2-0'
    });
    assert(act.id.startsWith('act_'), 'Activity ID generated');

    const history = activityLogDb.getActivitiesByUser(testStudentUser.id);
    assert(history.some(a => a.id === act.id), 'Recorded activity present in user activity history');
  });

  // 2. UNIVERSAL MULTI-ENTITY SEARCH
  test('UniversalSearch', 'Multi-entity server-side search and recent search persistence', () => {
    const searchRes = universalSearchService.search({ query: 'Vel Tech', limit: 10 });
    assert(searchRes.results.length > 0, 'Search returned matching results for Vel Tech');

    universalSearchService.saveRecentSearch(testStudentUser.id, 'Autonomous Agents');
    const recents = universalSearchService.getRecentSearches(testStudentUser.id);
    assert(recents.includes('Autonomous Agents'), 'Recent search saved and retrieved');
  });

  // 3. SESSION SECURITY & ACTIVE DEVICES
  test('SessionSecurity', 'List active sessions and session revocation', () => {
    const sessions = sessionSecurityService.getActiveSessions(testStudentUser.id);
    assert(sessions.length >= 1, 'Active sessions list returned');
    assert(sessions.some(s => s.isCurrent), 'Current session is marked');

    const revokedCount = sessionSecurityService.revokeAllOtherSessions(testStudentUser.id);
    assert(typeof revokedCount === 'number', 'Revoked other sessions returned count');
  });

  // 4. BACKGROUND JOB QUEUE & IDEMPOTENCY
  test('BackgroundJobs', 'Enqueue async data export job with idempotency key', () => {
    const idemKey = `export-${testStudentUser.id}-20260902`;
    const job1 = backgroundJobQueue.enqueueJob({
      type: 'DATA_EXPORT',
      userId: testStudentUser.id,
      payload: { scope: 'ALL' },
      idempotencyKey: idemKey
    });
    assert(job1.id.startsWith('job_'), 'Job ID created');

    const job2 = backgroundJobQueue.enqueueJob({
      type: 'DATA_EXPORT',
      userId: testStudentUser.id,
      payload: { scope: 'ALL' },
      idempotencyKey: idemKey
    });
    assert(job1.id === job2.id, 'Idempotency key prevents duplicate background job creation');
  });

  // 5. PERMISSION ENGINE & ANTI-IDOR
  test('PermissionEngine', 'Authorization boundaries & cross-user / cross-institution protection', () => {
    // Student can edit own profile
    const canEditSelf = permissionEngine.can(testStudentUser, 'EDIT', 'PROFILE', {
      resourceOwnerId: testStudentUser.id
    });
    assert(canEditSelf.allowed === true, 'Student can edit own profile');

    // Student cannot edit other student profile (Anti-IDOR)
    const canEditOther = permissionEngine.can(testStudentUser, 'EDIT', 'PROFILE', {
      resourceOwnerId: 'usr_other_student'
    });
    assert(canEditOther.allowed === false, 'Student prohibited from editing another profile');

    // Cross-institution mentorship blocked
    const canRequestCrossInst = permissionEngine.can(testStudentUser, 'CREATE', 'MENTORSHIP_REQUEST', {
      resourceInstitutionId: 'inst-other-college-id'
    });
    assert(canRequestCrossInst.allowed === false, 'Cross-institution mentor request prohibited');
  });

  // 6. OPTIMISTIC CONCURRENCY & CONFLICT DETECTION
  test('OptimisticLocking', 'Detect stale update conflict based on version', () => {
    const currentEntity = { id: 'evt-1', version: 3, updatedAt: '2026-09-02T12:00:00Z' };
    const staleUpdate = { title: 'Old Title Edit', version: 2 };
    const freshUpdate = { title: 'Fresh Title Edit', version: 3 };

    const conflictRes = conflictDetectionService.checkConflict(currentEntity, staleUpdate);
    assert(conflictRes.isConflict === true, 'Stale version detected as conflict');

    const noConflictRes = conflictDetectionService.checkConflict(currentEntity, freshUpdate);
    assert(noConflictRes.isConflict === false, 'Matching version update allowed');
  });

  // 7. REAL-TIME SYNC & EVENTS
  test('RealTimeSync', 'Pub/sub event emission and subscriber handling', () => {
    let receivedPayload: any = null;
    const unsubscribe = realTimeSyncService.subscribe('NOTIFICATION_RECEIVED', (data) => {
      receivedPayload = data;
    });

    realTimeSyncService.emit('NOTIFICATION_RECEIVED', { title: 'Live Update Test' });
    assert(receivedPayload !== null && receivedPayload.title === 'Live Update Test', 'Subscriber received real-time event');
    unsubscribe();
  });

  console.log('\n====================================================');
  console.log(' PRODUCTION HARDENING TEST SUMMARY');
  console.log('====================================================');
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log(`Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
  console.log('====================================================\n');

  return results;
}
