import { platformEventBus } from "../../bus/platformEventBus";
import { studentPassportDb } from "../studentPassportDatabase";
import { recruiterDb } from "../recruiterDatabase";
import { judgeDb } from "../judgeDatabase";
import { trustAndReportsDb } from "../trustAndReportsDatabase";
import { interviewPrepDb } from "../interviewPrepDatabase";
import { globalizationService } from "../../global/globalizationService";

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

export function runAllPhase10XTests(): TestResult[] {
  console.log("====================================================");
  console.log(" ACE 10X — MASSIVE SCALE PLATFORM TEST SUITE");
  console.log("====================================================\n");

  const studentId = "usr_student_dileep";

  // 1. Platform Domain Event Bus
  test("DomainEventBus", "Publishes and synchronously notifies subscribers", () => {
    let received = false;
    const unsub = platformEventBus.subscribe("WalletTransactionCreated", (e) => {
      received = true;
    });
    platformEventBus.publish("WalletTransactionCreated", {
      amountCoins: 500,
      referenceType: "HACKATHON_WIN"
    }, studentId);
    unsub();
    assert(received, "Event subscriber should have executed synchronously");
  });

  // 2. Student Passport & Canonical Identity
  test("StudentPassport", "Retrieves canonical 12-section passport for Vel Tech student", () => {
    const passport = studentPassportDb.getByUserId(studentId);
    assert(!!passport, "Passport must exist");
    assert(passport!.aceId === "ACE-2026-VT9842", "Passport contains correct canonical ACE ID");
    assert(passport!.institutionName.includes("Vel Tech"), "Student belongs to Vel Tech");
    assert(passport!.sections.skills.length >= 2, "Passport contains verified skills matrix");
    assert(passport!.sections.projects.length >= 1, "Passport contains proof-of-work projects");
  });

  test("StudentPassport", "Validates item verification and JSON export", () => {
    const passport = studentPassportDb.getByUserId(studentId);
    assert(!!passport, "Passport exists");
    assert(passport!.totalVerifiedCount >= 10, "Passport contains over 10 verified credentials");
    const jsonStr = studentPassportDb.exportPassportJson(studentId);
    assert(jsonStr.includes("ACE-2026-VT9842"), "Exported JSON must contain canonical ACE ID");
  });

  // 3. Recruiter Hub & Talent Radar
  test("RecruiterTalentRadar", "Filters verified candidates and creates job postings", () => {
    const allCandidates = recruiterDb.searchTalent({});
    assert(allCandidates.length > 0, "Public verified candidates must be returned");
    const filtered = recruiterDb.searchTalent({ skills: ["React & TypeScript"] });
    assert(filtered.length > 0, "Candidate filtering works");

    const newJob = recruiterDb.createJob({
      recruiterId: "usr_recruiter_techcorp",
      companyName: "Google Cloud Labs",
      companyLogoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd",
      title: "AI & Distributed Systems Fellow",
      roleType: "FELLOWSHIP",
      location: "Bengaluru, India / Hybrid",
      isRemote: true,
      salaryOrStipend: "₹1,50,000 / month",
      requiredSkills: ["TypeScript", "Distributed Systems", "AI Agents"],
      minimumTierRequirement: "Level 5 (Project Verified)",
      description: "Research fellowship in multi-agent autonomous engineering.",
      deadline: "2026-06-30T00:00:00Z",
      status: "ACTIVE"
    });
    assert(newJob.title === "AI & Distributed Systems Fellow", "Job posting created successfully");

    const shortlist = recruiterDb.shortlistCandidate("usr_recruiter_techcorp", newJob.id, studentId, "High match score");
    assert(shortlist.candidateUserId === studentId, "Shortlist record must match target student");
  });

  // 4. Judge Evaluation Portal
  test("JudgePortal", "Fetches assigned submissions and scores against multi-criteria rubric", () => {
    const subs = judgeDb.getAssignmentsForJudge("usr_mentor_arun");
    assert(subs.length > 0, "Judge must receive assigned contest submissions");
    const success = judgeDb.submitScore(subs[0].id, [
      { criteriaName: "Technical Architecture & Originality", score: 25, feedback: "Outstanding ROS2 edge SLAM" }
    ]);
    assert(success, "Rubric score submission must succeed");
  });

  // 5. Trust, Moderation & Appeals
  test("TrustAndSafety", "Creates moderation reports and manages resolution status", () => {
    const report = trustAndReportsDb.submitReport({
      reporterUserId: studentId,
      reporterName: "Dileep Kumar",
      targetEntityType: "EVENT",
      targetEntityId: "evt_spam_99",
      targetEntityTitle: "Spam Hackathon",
      category: "EVENT_FRAUD",
      description: "Payment credential phishing.",
      evidenceLinks: ["https://example.com/proof"]
    });
    assert(report.status === "OPEN", "New moderation ticket must be in OPEN status");

    const resolved = trustAndReportsDb.resolveReport(report.id, "RESOLVED", "Event removed", "Suspicious organizer banned");
    assert(resolved?.status === "RESOLVED", "Report status must update to RESOLVED");
  });

  // 6. AI Interview Simulation Lab
  test("AIInterviewLab", "Retrieves questions and evaluates answer with instant rubric scoring", () => {
    const questions = interviewPrepDb.getQuestions();
    assert(questions.length >= 2, "Question bank must contain curated questions");

    const submission = interviewPrepDb.submitMockResponse(
      studentId,
      questions[0].id,
      "Deterministic event-sourcing log with sandbox isolation and idempotency keys."
    );
    assert(submission.aiEvaluation.overallScore >= 70, "AI evaluation score generated");
    assert(submission.aiEvaluation.strengths.length > 0, "AI feedback contains concrete strengths");
  });

  // 7. Multi-Currency Engine
  test("GlobalizationEngine", "Enforces fixed 100 ACE Coins = ₹1 INR rule and formats currencies", () => {
    const inr100Coins = globalizationService.convertCoinsToInr(100);
    assert(inr100Coins === 1.0, "Rule: 100 ACE Coins = ₹1.00 INR");

    const inr10kCoins = globalizationService.convertCoinsToInr(10000);
    assert(inr10kCoins === 100.0, "Rule: 10,000 ACE Coins = ₹100.00 INR");

    globalizationService.setCurrency("INR");
    const formattedINR = globalizationService.formatInr(2500);
    assert(formattedINR.includes("₹"), "INR must contain rupee symbol");

    globalizationService.setCurrency("USD");
    const formattedUSD = globalizationService.formatInr(8650);
    assert(formattedUSD.includes("$"), "USD must contain dollar symbol");
    globalizationService.setCurrency("INR"); // reset
  });

  return results;
}
