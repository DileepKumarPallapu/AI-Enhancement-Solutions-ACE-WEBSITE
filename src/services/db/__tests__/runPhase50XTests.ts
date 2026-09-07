import { trustDatabase } from "../trustDatabase";
import { moderationDatabase } from "../moderationDatabase";
import { sessionSecurityDatabase } from "../sessionSecurityDatabase";
import { backgroundJobEngine } from "../backgroundJobEngine";
import { authorizationSecurityService } from "../authorizationSecurityService";
import { systemHealthService } from "../systemHealthService";

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

export function runAllPhase50XTests(): TestResult[] {
  console.log("====================================================");
  console.log(" ACE 50X — TRUST, RELIABILITY & SCALE TEST SUITE");
  console.log("====================================================\n");

  // 1. Trust Center Profiles
  test("TrustCenter", "Maintains evidence-based organization trust records", () => {
    const profiles = trustDatabase.getAllProfiles();
    assert(profiles.length >= 2, "Expected initial verified trust profiles");
    const velTechProfile = profiles.find(p => p.id.includes("vel-tech"));
    assert(!!velTechProfile, "Vel Tech canonical organization trust record must exist");
    assert(velTechProfile?.status === "Verified", "Vel Tech must have Verified status");
    assert(velTechProfile?.evidence.officialDomainValidated === true, "Domain validation must be confirmed");
  });

  // 2. Moderation Workflow
  test("ModerationWorkflow", "Handles report creation, triage, and resolution lifecycle", () => {
    const report = moderationDatabase.submitReport({
      reporterId: "usr_student_dileep",
      resourceType: "EVENT",
      resourceId: "evt-test-99",
      category: "INCORRECT_INFO",
      reason: "Date listed as past date",
      severity: "LOW"
    });
    assert(report.status === "REPORTED", "Initial status must be REPORTED");
    const updated = moderationDatabase.updateReportStatus(report.id, "RESOLVED", "Fixed by admin");
    assert(updated?.status === "RESOLVED", "Status must update to RESOLVED");
  });

  // 3. Session Security
  test("SessionSecurity", "Tracks active device sessions and performs revocation", () => {
    const sessions = sessionSecurityDatabase.getSessions("usr_student_dileep");
    assert(sessions.length >= 1, "Active sessions must exist");
    const current = sessions.find(s => s.isCurrentSession);
    assert(!!current, "Current session must be marked");
  });

  // 4. Background Jobs & Idempotency
  test("BackgroundJobs", "Enqueues background jobs and prevents duplicate idempotency keys", () => {
    const jobKey = `test-idem-${Date.now()}`;
    const first = backgroundJobEngine.enqueueJob({
      jobType: "SEARCH_INDEX_UPDATE",
      payload: { test: true },
      idempotencyKey: jobKey
    });
    assert(!first.isDuplicate && first.job.status === "COMPLETED", "First job should process");
    const duplicate = backgroundJobEngine.enqueueJob({
      jobType: "SEARCH_INDEX_UPDATE",
      payload: { test: true },
      idempotencyKey: jobKey
    });
    assert(duplicate.isDuplicate, "Second job with same idempotency key must be detected as duplicate");
  });

  // 5. Object-Level Authorization (IDOR / BOLA Prevention)
  test("ObjectLevelAuthorization", "Prevents unauthorized cross-user and cross-college access", () => {
    // Cross-user wallet read check
    const student1Ctx = { userId: "usr-student-001", role: "STUDENT" as const };
    const walletCheck = authorizationSecurityService.verifyObjectAccess(student1Ctx, {
      resourceType: "WALLET",
      resourceOwnerId: "usr-student-999" // different user
    });
    assert(!walletCheck.allowed, "Student 1 must NOT access Student 999 wallet");

    // Cross-college admin check
    const college1Ctx = { userId: "admin-vel-tech", role: "COLLEGE" as const, institutionId: "inst-vel-tech" };
    const collegeCheck = authorizationSecurityService.verifyObjectAccess(college1Ctx, {
      resourceType: "COLLEGE_ADMIN",
      resourceInstitutionId: "inst-psg-tech" // different college
    });
    assert(!collegeCheck.allowed, "College 1 admin must NOT access College 2 admin functions");
  });

  // 6. System Health Report
  test("SystemHealthDiagnostics", "Produces comprehensive service uptime and latency report", () => {
    const report = systemHealthService.getHealthReport();
    assert(report.overallHealth === "HEALTHY", "Health report must be operational");
    assert(report.services.length >= 5, "Service matrix must report all core subsystems");
  });

  return results;
}
