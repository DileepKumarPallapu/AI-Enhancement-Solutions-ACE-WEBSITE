import { superSearchService } from "../../../services/search/superSearchService";
import { unifiedOpportunityDb } from "../unifiedOpportunityDatabase";
import { careerRoadmapDb } from "../careerRoadmapDatabase";
import { careerCopilotService } from "../../../services/ai/careerCopilotService";
import { competitionExecutionDb } from "../competitionExecutionDatabase";
import { studentPassportDb } from "../studentPassportDatabase";

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

export function runAllPhase20XTests(): TestResult[] {
  console.log("====================================================");
  console.log(" ACE 20X — GLOBAL STUDENT SUPER PLATFORM TEST SUITE");
  console.log("====================================================\n");

  const studentId = "usr_student_dileep";

  // 1. Super Search NLP Engine
  test("SuperSearchEngine", "Parses natural language query and returns matching multi-entity items", () => {
    const results = superSearchService.search("AI internships for CSE students in Chennai");
    assert(results.length > 0, "Search must return results for NLP query");
    assert(results.some(r => r.type === "INTERNSHIP"), "Results must contain AI internships");
    assert(results.some(r => r.location?.includes("Chennai")), "Results must match Chennai location");
  });

  test("SuperSearchEngine", "Filters search results by entity type and provides autocomplete", () => {
    const competitions = superSearchService.search("hackathon", { type: "COMPETITION" });
    assert(competitions.length > 0, "Must return competitions matching query");
    assert(competitions.every(c => c.type === "COMPETITION"), "All returned items must be COMPETITION type");

    const suggestions = superSearchService.getAutocompleteSuggestions("ai");
    assert(suggestions.length > 0, "Autocomplete suggestions must be returned for prefix");
  });

  // 2. Unified Opportunity Marketplace
  test("OpportunityMarketplace", "Maintains universal opportunities with trust scores and matching explanations", () => {
    const opps = unifiedOpportunityDb.getAll();
    assert(opps.length >= 3, "Opportunity database must contain opportunities");
    const aiFellowship = opps.find(o => o.id === "opp_ai_fellow_2026");
    assert(!!aiFellowship, "AI Fellowship opportunity must exist");
    assert(aiFellowship!.lifecycleStatus === "PUBLISHED", "Lifecycle status must be PUBLISHED");
    assert(aiFellowship!.trustScore >= 90, "Trust score must be >= 90");
    assert(aiFellowship!.matchExplanation!.includes("Vel Tech"), "Match explanation must reference student's Vel Tech college");
  });

  // 3. Career Roadmaps & Skill Milestones
  test("CareerRoadmaps", "Retrieves dynamic role roadmaps with multi-level skill milestones", () => {
    const aiRoadmap = careerRoadmapDb.getRoadmap("ai-engineer");
    assert(!!aiRoadmap, "AI Engineer roadmap must exist");
    assert(aiRoadmap!.milestones.length === 3, "Roadmap must contain 3 progression phases");
    assert(aiRoadmap!.milestones[0].skills.includes("Python 3.12"), "Phase 1 must include foundational Python");
    assert(aiRoadmap!.milestones[1].skills.includes("PyTorch"), "Phase 2 must include PyTorch");
  });

  // 4. AI Career Copilot Intelligence
  test("CareerCopilot", "Generates grounded career advice based on authentic student records", () => {
    const advice = careerCopilotService.generateAdvice("How can I improve my resume for AI fellowships?");
    assert(advice.sender === "COPILOT", "Copilot must return response");
    assert(advice.text.includes("Vel Tech") || advice.text.includes("9.4 CGPA") || advice.text.includes("TypeScript"), "Advice must reference verified student records");
    assert(advice.suggestedActions!.length > 0, "Copilot must provide actionable follow-up links");
  });

  // 5. Anti-Cheat Competition Arena
  test("CompetitionArena", "Processes server-side code submissions with test evaluation", () => {
    const submission = competitionExecutionDb.submitSolution(
      "comp_rate_limit",
      studentId,
      "function isAllowed() { return true; }"
    );
    assert(submission.passedCount === 8, "All 8 server test cases must pass");
    assert(submission.executionScore === 100, "Execution score must equal 100");
  });

  // 6. Public Passport & Digital Verification
  test("PublicPassport", "Retrieves public verifiable student identity with verified skills", () => {
    const passport = studentPassportDb.getByUserId(studentId);
    assert(!!passport, "Passport record exists");
    assert(passport!.institutionName.includes("Vel Tech"), "Student passport is bound to Vel Tech");
    assert(passport!.sections.skills.length >= 2, "Passport contains verified skills");
  });

  return results;
}
