// ACE 120X Autonomous Workflow OS, AI Agent Permissions & HITL Security Tests

import { workflowEngineDatabase } from '../workflowEngineDatabase';
import { aiWorkflowAgentDatabase } from '../aiWorkflowAgentDatabase';

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

export function runPhase120XTests(): TestResult[] {
  console.log("====================================================");
  console.log(" ACE 120X — AUTONOMOUS WORKFLOW OS TEST SUITE");
  console.log("====================================================");

  // 1. Workflow Definition & Template Registry
  test("WorkflowDefinitions", "Retrieves active templates and creates validated custom workflow definition", () => {
    const defs = workflowEngineDatabase.getAllDefinitions();
    assert(defs.length >= 2, "Must contain default seeded workflow templates");

    const created = workflowEngineDatabase.createDefinition({
      title: 'Higher Studies SOP & Recommendation Letter Flow',
      slug: 'higher-studies-sop-flow',
      description: 'Collects faculty attestations and compiles research portfolio.',
      category: 'CAREER',
      targetRole: 'STUDENT',
      version: 1,
      status: 'ACTIVE',
      steps: [
        {
          id: 'step_test_1',
          stepNumber: 1,
          type: 'TRIGGER',
          title: 'Initiate SOP Draft',
          description: 'Triggered from student portal',
          assignedActor: 'STUDENT',
          status: 'PENDING'
        }
      ],
      createdBy: 'usr_student_dileep'
    });

    assert(created.id.startsWith('wf_def_'), "Must generate standard definition ID");
  });

  // 2. Idempotency & Duplicate Execution Protection
  test("WorkflowIdempotency", "Enforces idempotency keys preventing duplicate workflow executions", () => {
    const idempotencyKey = 'idemp_test_unique_key_120x';

    const run1 = workflowEngineDatabase.startWorkflow({
      workflowId: 'wf_def_internship_prep',
      userId: 'usr_student_dileep',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      idempotencyKey
    });

    assert(run1.isExisting === false, "First run must create fresh instance");

    // Second run with identical idempotency key
    const run2 = workflowEngineDatabase.startWorkflow({
      workflowId: 'wf_def_internship_prep',
      userId: 'usr_student_dileep',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      idempotencyKey
    });

    assert(run2.isExisting === true, "Second run with same key must return existing instance");
    assert(run2.instance.id === run1.instance.id, "Instance ID must match exactly");
  });

  // 3. Dry-Run Non-Mutating Simulation
  test("DryRunSimulation", "Executes dry-run simulation without committing state mutations", () => {
    const instancesBefore = workflowEngineDatabase.getAllInstances().length;

    const dryRun = workflowEngineDatabase.startWorkflow({
      workflowId: 'wf_def_internship_prep',
      userId: 'usr_student_dileep',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      idempotencyKey: `dry_run_test_${Date.now()}`,
      isDryRun: true
    });

    assert(dryRun.instance.isDryRun === true, "Must flag dry run");
    assert(dryRun.instance.status === 'COMPLETED', "Dry run finishes evaluation immediately");

    const instancesAfter = workflowEngineDatabase.getAllInstances().length;
    assert(instancesAfter === instancesBefore, "Dry run must NOT persist new instance to live database");
  });

  // 4. Pause, Resume & Compensation Rollback
  test("WorkflowLifecycleControls", "Supports pause, resume, and compensation rollback transitions", () => {
    const instances = workflowEngineDatabase.getAllInstances();
    const inst = instances[0];
    assert(Boolean(inst), "Must have an active instance for lifecycle testing");

    const paused = workflowEngineDatabase.pauseWorkflow(inst.id);
    assert(paused === true, "Must pause running workflow");
    assert(inst.status === 'PAUSED', "Status must transition to PAUSED");

    const resumed = workflowEngineDatabase.resumeWorkflow(inst.id);
    assert(resumed === true, "Must resume paused workflow");
    assert(inst.status === 'RUNNING', "Status must transition to RUNNING");

    const compensated = workflowEngineDatabase.rollbackCompensation(inst.id);
    assert(compensated === true, "Must trigger compensation rollback");
    assert(inst.status === 'CANCELLED', "Compensated instance must be CANCELLED");
  });

  // 5. Universal Task Management & Snooze
  test("UniversalTaskCenter", "Manages task status progression and deadline snoozing", () => {
    const tasks = workflowEngineDatabase.getAllTasks('usr_student_dileep');
    assert(tasks.length > 0, "Must retrieve student tasks");

    const task = tasks[0];
    const initialDue = new Date(task.dueDate).getTime();

    workflowEngineDatabase.snoozeTask(task.id, 2);
    const updatedDue = new Date(task.dueDate).getTime();
    assert(updatedDue > initialDue, "Snoozing must extend due date");
    assert(task.status === 'SNOOZED', "Status must update to SNOOZED");

    workflowEngineDatabase.completeTask(task.id);
    assert(task.status === 'COMPLETED', "Status must update to COMPLETED");
  });

  // 6. Human-In-The-Loop Approval Gates
  test("ApprovalGates", "Enforces multi-risk approval gates and advances workflow upon sign-off", () => {
    const approvals = workflowEngineDatabase.getAllApprovals();
    const pending = approvals.find(a => a.status === 'PENDING');
    assert(Boolean(pending), "Must have a pending approval ticket");

    const processed = workflowEngineDatabase.processApproval(
      pending!.id,
      'APPROVE',
      'Faculty mentor endorsement validated',
      'usr_mentor_aravind'
    );
    assert(processed === true, "Must process approval");
    assert(pending!.status === 'APPROVED', "Status must transition to APPROVED");
  });

  // 7. Event-Driven Automation Rules
  test("AutomationsEngine", "Toggles automation rules and tracks execution counts", () => {
    const rules = workflowEngineDatabase.getAllAutomations();
    assert(rules.length >= 2, "Must have default automation rules");

    const rule = rules[0];
    const initial = rule.isEnabled;
    const toggled = workflowEngineDatabase.toggleAutomation(rule.id);
    assert(toggled !== initial, "Toggle must invert enabled state");
  });

  // 8. Workflow Failure Triage & Retries
  test("FailureCenter", "Triages execution failures and increments retry attempt count", () => {
    const failures = workflowEngineDatabase.getAllFailures();
    assert(failures.length > 0, "Must have failure ticket record");

    const fail = failures[0];
    const prevCount = fail.retryCount;
    workflowEngineDatabase.retryFailure(fail.id);
    assert(fail.retryCount === prevCount + 1, "Retry must increment retry count");
  });

  // 9. AI Agent Tool Permission Security Barrier
  test("AIToolPermissions", "Permits read-only tools while blocking high-risk tools without approval", () => {
    // Read-only tool should execute immediately
    const readExec = aiWorkflowAgentDatabase.executeTool(
      'agent_student_success',
      'tool_read_profile',
      { userId: 'usr_student_dileep' }
    );
    assert(readExec.success === true, "Read-only tool should succeed");
    assert(readExec.requiresApproval === false, "Read-only tool does NOT require human approval");

    // High-risk tool should be intercepted and routed to Approval Center
    const highRiskExec = aiWorkflowAgentDatabase.executeTool(
      'agent_application_copilot',
      'tool_submit_application',
      { opportunityId: 'opp_glob_fellow_01' }
    );
    assert(highRiskExec.success === true, "Proposal creation must succeed");
    assert(highRiskExec.requiresApproval === true, "High-risk tool MUST require human approval");
    assert(Boolean(highRiskExec.proposalId), "Must generate approval proposal ID");
  });

  // 10. AI Tool Proposal Decision Lifecycle
  test("AIProposalDecisions", "Records human approval decisions on AI tool proposals", () => {
    const proposals = aiWorkflowAgentDatabase.getProposals();
    assert(proposals.length > 0, "Must contain AI proposals");

    const p = proposals[0];
    aiWorkflowAgentDatabase.approveProposal(p.id, 'usr_student_dileep');
    assert(p.status === 'APPROVED', "Proposal must transition to APPROVED");
    assert(p.humanApprover === 'usr_student_dileep', "Must record human approver ID");
  });

  return results;
}
