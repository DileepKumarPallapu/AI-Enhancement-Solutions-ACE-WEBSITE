import { aiGoalDatabase } from "../aiGoalDatabase";
import { aiSkillGapDatabase } from "../aiSkillGapDatabase";
import { aiStudentJourneyDatabase } from "../aiStudentJourneyDatabase";
import { aiPrivacySettingsDatabase } from "../aiPrivacySettingsDatabase";
import { aiAuditLogDatabase } from "../aiAuditLogDatabase";
import { aiAgentOrchestrator } from "../aiOrchestratorService";

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

export function runAllPhase30XTests(): TestResult[] {
  console.log("====================================================");
  console.log(" ACE 30X — AI AUTONOMOUS STUDENT SUCCESS ENGINE TEST SUITE");
  console.log("====================================================\n");

  const studentId = "usr-student-001";

  // 1. Goal Engine
  test("GoalEngine", "Creates goal, generates roadmaps & computes mathematical progress", () => {
    const initialGoals = aiGoalDatabase.getGoals(studentId);
    assert(initialGoals.length >= 1, "Expected initial seeded student goals");

    const created = aiGoalDatabase.createGoal({
      userId: studentId,
      title: "Deploy Production Cloud Infrastructure with Terraform",
      description: "Build automated CI/CD pipeline",
      category: "PROJECT",
      priority: "HIGH",
      targetDate: "2026-07-15",
      status: "Active",
      milestones: [
        { id: "ms-test-1", title: "Write Terraform Scripts", description: "Infra as code", order: 1, completed: false, category: "PROJECT" },
        { id: "ms-test-2", title: "Set up GitHub Actions Workflow", description: "Automated CI/CD", order: 2, completed: false, category: "PROJECT" }
      ]
    });

    assert(created.progress === 0 && created.status === "Active", "Initial progress must be 0% and status Active");
    const updated = aiGoalDatabase.toggleMilestone(created.id, "ms-test-1");
    assert(updated?.progress === 50, `Expected 50% progress, got ${updated?.progress}%`);
    aiGoalDatabase.deleteGoal(created.id);
  });

  // 2. Skill Gap Analyzer
  test("SkillGapAnalyzer", "Evaluates verified competencies against role benchmarks & maps catalog actions", () => {
    const fsdGap = aiSkillGapDatabase.analyzeGap("role-fsd", [
      { name: "JavaScript", proficiency: "INTERMEDIATE", verified: true },
      { name: "React", proficiency: "INTERMEDIATE", verified: true },
      { name: "TypeScript", proficiency: "BEGINNER", verified: true }
    ]);
    assert(fsdGap.matchPercentage > 0, "Match percentage must be calculated");
    assert(fsdGap.missingSkills.length > 0, "Missing skills must be identified");
    assert(fsdGap.recommendedActions.length > 0, "Recommended actions must be mapped to catalog");
  });

  // 3. Student Journey Telemetry
  test("StudentJourneyTelemetry", "Tracks authentic 8-stage lifecycle telemetry & audit trail", () => {
    const journey = aiStudentJourneyDatabase.getJourneyMetrics(studentId);
    assert(journey.eventsDiscovered > 0, "Discovered events metric must be non-zero");
    assert(journey.milestones.length > 0, "Milestones must be recorded");
    const logged = aiStudentJourneyDatabase.logJourneyMilestone({
      stage: "ACHIEVE",
      title: "Completed AI System Design Sprint",
      description: "Validated by mentor feedback",
      category: "ACHIEVEMENT"
    });
    assert(logged.id.startsWith("jm-"), "Milestone ID must be generated");
  });

  // 4. AI Tool Permissions
  test("AIToolPermissions", "Enforces strict role-based tool boundary gates", () => {
    const studentHasWalletRead = aiAgentOrchestrator.checkToolPermission("STUDENT", "READ_WALLET");
    const judgeHasWalletRead = aiAgentOrchestrator.checkToolPermission("JUDGE", "READ_WALLET");
    assert(studentHasWalletRead, "Student must have permission to READ_WALLET");
    assert(!judgeHasWalletRead, "Judge must NOT have permission to READ_WALLET");
  });

  // 5. AI Privacy Controls
  test("AIPrivacyControls", "Persists granular student privacy preferences & data toggles", () => {
    const initial = aiPrivacySettingsDatabase.getSettings(studentId);
    const toggled = aiPrivacySettingsDatabase.updateSettings(studentId, {
      useAIMemory: !initial.useAIMemory
    });
    assert(toggled.useAIMemory !== initial.useAIMemory, "Privacy toggle must persist");
    aiPrivacySettingsDatabase.updateSettings(studentId, { useAIMemory: initial.useAIMemory });
  });

  return results;
}
