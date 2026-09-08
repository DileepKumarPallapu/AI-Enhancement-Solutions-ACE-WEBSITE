import { aiCommandCenterDatabase } from '../aiCommandCenterDatabase';
import { aiMemoryDatabase } from '../aiMemoryDatabase';
import { aiStudyCoachDatabase } from '../aiStudyCoachDatabase';
import { aiProjectMentorDatabase } from '../aiProjectMentorDatabase';
import { aiInterviewCoachDatabase } from '../aiInterviewCoachDatabase';

export async function runPhase100XTests(): Promise<{ name: string; passed: boolean; error?: string }[]> {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  function test(name: string, fn: () => void) {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err?.message || String(err) });
    }
  }

  // 1. AI Grounded Context & Next Best Action Engine
  test('[AICommandCenter] Compiles deterministic student context bound to Vel Tech', () => {
    const ctx = aiCommandCenterDatabase.getCompiledStudentContext();
    if (!ctx.student.institution.name.includes('Vel Tech')) throw new Error('Must ground to Vel Tech student');
    if (ctx.completenessPercentage <= 0 || ctx.completenessPercentage > 100) throw new Error('Invalid completeness calculation');
    if (ctx.verifiedSkills.length === 0) throw new Error('Must retrieve verified skills');
  });

  test('[AICommandCenter] Generates explainable Next Best Actions with priority ranking', () => {
    const actions = aiCommandCenterDatabase.getNextBestActions();
    if (actions.length < 3) throw new Error('Expected at least 3 prioritized actions');
    const first = actions[0];
    if (!first.whyThisAction || !first.actionUrl) throw new Error('Every action must contain whyThisAction explanation and link');
  });

  test('[AICommandCenter] Answers grounded deadline query with factual citations', () => {
    const resp = aiCommandCenterDatabase.answerGroundedQuery('What are my deadlines?');
    if (!resp.answer.includes('upcoming deadlines') && !resp.answer.includes('deadline')) {
      throw new Error('Grounded response must answer deadline query');
    }
    if (resp.sources.length === 0 || resp.confidence < 0.9) {
      throw new Error('Response must include source citations and high confidence');
    }
  });

  test('[AICommandCenter] Answers mentor guidance query from real mentor record', () => {
    const resp = aiCommandCenterDatabase.answerGroundedQuery('Who is my mentor?');
    if (!resp.answer.includes('Dr. Aravind Swaminathan')) {
      throw new Error('Must return assigned faculty mentor Dr. Aravind');
    }
  });

  // 2. Transparent AI Memory Center
  test('[AIMemory] Retrieves consented preferences and persists new memory item', () => {
    const mems = aiMemoryDatabase.getAllMemories();
    if (mems.length < 2) throw new Error('Expected seed memory items');

    const added = aiMemoryDatabase.addMemory(
      'CAREER_GOAL',
      'Target Role: Distributed Systems Lead',
      'Specializing in Raft consensus and high-throughput microservices.',
      'Refines job matching criteria'
    );
    if (!added.id || added.category !== 'CAREER_GOAL') throw new Error('Failed to create memory preference');

    const updated = aiMemoryDatabase.updateMemory(added.id, 'Target Role: Distributed Systems Principal', 'Updated content');
    if (!updated) throw new Error('Failed to update memory preference');

    const deleted = aiMemoryDatabase.deleteMemory(added.id);
    if (!deleted) throw new Error('Failed to delete memory item');
  });

  // 3. AI Adaptive Study Coach & Deterministic Quiz Evaluator
  test('[AIStudyCoach] Retrieves theory modules and evaluates quizzes against answer keys', () => {
    const mods = aiStudyCoachDatabase.getAllModules();
    if (mods.length < 2) throw new Error('Expected at least 2 study modules');

    const raftMod = mods[0];
    const correctAnswers = raftMod.practiceQuestions.map(q => q.correctOptionIndex);
    const passResult = aiStudyCoachDatabase.evaluateQuiz(raftMod.id, correctAnswers);
    if (!passResult.isPassed || passResult.percentage !== 100) {
      throw new Error('Correct answers must yield 100% pass');
    }

    const wrongAnswers = raftMod.practiceQuestions.map(() => 0); // deliberately wrong
    const failResult = aiStudyCoachDatabase.evaluateQuiz(raftMod.id, wrongAnswers);
    if (failResult.score === raftMod.practiceQuestions.length) {
      throw new Error('Deterministic grading invariant violated: wrong answers evaluated as correct');
    }
  });

  // 4. AI Project Mentor & Architecture Generator
  test('[AIProjectMentor] Generates structured system architecture plan and README snippet', () => {
    const plan = aiProjectMentorDatabase.generateArchitecturePlan(
      'NeuralCore Autonomous Verification Engine',
      'Distributed AI & Cryptographic Credentials'
    );
    if (plan.systemComponents.length < 3) throw new Error('Expected multi-tier system components');
    if (plan.milestones.length < 3) throw new Error('Expected multi-phase task milestones');
    if (!plan.generatedReadmeSnippet.includes('NeuralCore')) throw new Error('Generated README must include project title');
  });

  // 5. AI Interview Coach & Simulator
  test('[AIInterviewCoach] Retrieves role questions and produces multi-criteria rubric evaluation', () => {
    const questions = aiInterviewCoachDatabase.getQuestionsForRole('Autonomous AI Systems Engineer');
    if (questions.length < 2) throw new Error('Expected role-specific questions');

    const session = aiInterviewCoachDatabase.evaluateAnswer(
      'Autonomous AI Systems Engineer',
      questions[0],
      'In our distributed system, we implement optimistic locking with version checks, utilize FastMCP tools to prevent infinite tool-call recursion, and configure HNSW vector indexing parameters efSearch and M to guarantee sub-50ms latency.'
    );

    if (!session.evaluation || session.evaluation.technicalDepth < 7) {
      throw new Error('Expected detailed rubric evaluation');
    }

    const history = aiInterviewCoachDatabase.getSessionHistory();
    if (history.length === 0) throw new Error('Session must be persisted in interview history');
  });

  return results;
}
