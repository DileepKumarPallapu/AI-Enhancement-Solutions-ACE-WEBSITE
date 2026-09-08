// ACE 120X Autonomous Workflow Engine Database
// State Machine, Idempotency, Dry Run Simulation, Approvals, Tasks, Automations & Compensation

export type WorkflowLifecycleStatus = 
  | 'DRAFT'
  | 'READY'
  | 'RUNNING'
  | 'WAITING_FOR_APPROVAL'
  | 'WAITING_FOR_USER'
  | 'WAITING_FOR_EXTERNAL_SYSTEM'
  | 'PAUSED'
  | 'RETRYING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'BLOCKED';

export type WorkflowStepType = 
  | 'TRIGGER'
  | 'CHECK'
  | 'AI_ACTION'
  | 'HUMAN_APPROVAL'
  | 'USER_TASK'
  | 'ACTION'
  | 'DELAY'
  | 'WEBHOOK'
  | 'COMPENSATION'
  | 'END';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'WAITING' | 'COMPLETED' | 'SNOOZED' | 'REJECTED';
export type ApprovalRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | 'CHANGES_REQUESTED';

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  type: WorkflowStepType;
  title: string;
  description: string;
  assignedActor: 'STUDENT' | 'MENTOR' | 'COLLEGE_ADMIN' | 'ORGANIZER' | 'RECRUITER' | 'JUDGE' | 'AI_AGENT' | 'SYSTEM';
  status: 'PENDING' | 'RUNNING' | 'WAITING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  inputParameters?: Record<string, any>;
  outputResult?: Record<string, any>;
  requiresApproval?: boolean;
  approvalRiskLevel?: ApprovalRiskLevel;
  compensationAction?: string;
  completedAt?: string;
}

export interface WorkflowDefinition {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'CAREER' | 'LEARNING' | 'EVENTS' | 'MENTORSHIP' | 'CAMPUS' | 'RECRUITMENT' | 'ADMIN';
  targetRole: 'STUDENT' | 'MENTOR' | 'COLLEGE' | 'ORGANIZER' | 'RECRUITER' | 'JUDGE' | 'ADMIN';
  version: number;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  steps: WorkflowStep[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  workflowTitle: string;
  version: number;
  userId: string;
  institutionId: string;
  idempotencyKey: string;
  status: WorkflowLifecycleStatus;
  currentStepIndex: number;
  steps: WorkflowStep[];
  isDryRun: boolean;
  executionLogs: { timestamp: string; stepId: string; message: string; actor: string }[];
  contextData: Record<string, any>;
  startedAt: string;
  completedAt?: string;
}

export interface WorkflowTask {
  id: string;
  workflowInstanceId?: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  source: string;
  assignedUserId: string;
  assignedRole: string;
  dueDate: string;
  actionUrl?: string;
  createdAt: string;
  completedAt?: string;
}

export interface WorkflowApproval {
  id: string;
  workflowInstanceId: string;
  stepId: string;
  requestedAction: string;
  requesterType: 'AI_AGENT' | 'SYSTEM' | 'STUDENT' | 'ORGANIZER';
  requesterName: string;
  targetRecord: string;
  reason: string;
  riskLevel: ApprovalRiskLevel;
  changePreview: Record<string, { before: any; after: any }>;
  status: ApprovalStatus;
  approverUserId?: string;
  approverRole: string;
  decisionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface WorkflowAutomationRule {
  id: string;
  name: string;
  triggerEvent: string;
  conditionDescription: string;
  actionDescription: string;
  isEnabled: boolean;
  executionCount: number;
  lastTriggeredAt?: string;
  createdAt: string;
}

export interface WorkflowFailureRecord {
  id: string;
  workflowInstanceId: string;
  workflowTitle: string;
  stepTitle: string;
  errorMessage: string;
  retryCount: number;
  maxRetries: number;
  severity: 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'UNRESOLVED' | 'RESOLVED' | 'DEAD_LETTER';
  failedAt: string;
}

class WorkflowEngineDatabase {
  private definitions: Map<string, WorkflowDefinition> = new Map();
  private instances: Map<string, WorkflowInstance> = new Map();
  private tasks: Map<string, WorkflowTask> = new Map();
  private approvals: Map<string, WorkflowApproval> = new Map();
  private automations: Map<string, WorkflowAutomationRule> = new Map();
  private failures: Map<string, WorkflowFailureRecord> = new Map();
  private idempotencyRegistry: Map<string, string> = new Map(); // key -> instanceId
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.seedInitial();
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    // 1. Seed Workflow Definitions
    const defs: WorkflowDefinition[] = [
      {
        id: 'wf_def_internship_prep',
        title: 'Prepare Internship Application with Faculty Mentor Review',
        slug: 'prepare-internship-application',
        description: 'Multi-step agentic preparation: analyzes skill gaps against job benchmarks, compiles ATS resume draft, requests faculty mentor sign-off, and submits with student confirmation.',
        category: 'CAREER',
        targetRole: 'STUDENT',
        version: 1,
        status: 'ACTIVE',
        createdBy: 'system_admin',
        steps: [
          {
            id: 'step_1_trigger',
            stepNumber: 1,
            type: 'TRIGGER',
            title: 'Trigger: Select Target Internship',
            description: 'Student initiates workflow from Opportunity Exchange item.',
            assignedActor: 'STUDENT',
            status: 'COMPLETED',
            completedAt: '2026-03-08T09:00:00Z'
          },
          {
            id: 'step_2_skill_check',
            stepNumber: 2,
            type: 'AI_ACTION',
            title: 'AI: Analyze Passport Skill Gaps',
            description: 'Career Agent cross-references student Digital Passport against job role prerequisites.',
            assignedActor: 'AI_AGENT',
            status: 'COMPLETED',
            outputResult: { missingSkillsFound: 1, recommendation: 'Complete Docker/K8s assessment' },
            completedAt: '2026-03-08T09:01:00Z'
          },
          {
            id: 'step_3_resume_draft',
            stepNumber: 3,
            type: 'ACTION',
            title: 'Action: Generate ATS-Formatted Markdown Resume',
            description: 'Compiles verified skills, Vel Tech credentials, and peer endorsements into standard resume schema.',
            assignedActor: 'SYSTEM',
            status: 'COMPLETED',
            completedAt: '2026-03-08T09:02:00Z'
          },
          {
            id: 'step_4_mentor_approval',
            stepNumber: 4,
            type: 'HUMAN_APPROVAL',
            title: 'Human Review: Faculty Mentor Endorsement',
            description: 'Dr. Aravind Swaminathan reviews the synthesized portfolio draft before company submission.',
            assignedActor: 'MENTOR',
            status: 'WAITING',
            requiresApproval: true,
            approvalRiskLevel: 'MEDIUM'
          },
          {
            id: 'step_5_student_confirm',
            stepNumber: 5,
            type: 'HUMAN_APPROVAL',
            title: 'Human Gate: Final Student Confirmation & Submission',
            description: 'Explicit student authorization required before transmitting application packet to recruiter.',
            assignedActor: 'STUDENT',
            status: 'PENDING',
            requiresApproval: true,
            approvalRiskLevel: 'HIGH',
            compensationAction: 'Cancel recruiter transmission ticket and revert to draft state'
          },
          {
            id: 'step_6_end',
            stepNumber: 6,
            type: 'END',
            title: 'Workflow Completed',
            description: 'Application logged with immutable correlationId and telemetry dispatched to Vel Tech Placement Cell.',
            assignedActor: 'SYSTEM',
            status: 'PENDING'
          }
        ],
        createdAt: '2026-03-01T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      },
      {
        id: 'wf_def_hackathon_dispatch',
        title: 'Campus Hackathon Squad Registration & Project Lab Allocation',
        slug: 'hackathon-squad-registration',
        description: 'Orchestrates team formation, faculty lab workstation reservation, and server-side arena submission validation.',
        category: 'EVENTS',
        targetRole: 'STUDENT',
        version: 1,
        status: 'ACTIVE',
        createdBy: 'system_admin',
        steps: [
          {
            id: 'step_h1',
            stepNumber: 1,
            type: 'TRIGGER',
            title: 'Select National AI & Robotics Hackathon 2026',
            description: 'Initiate squad verification.',
            assignedActor: 'STUDENT',
            status: 'COMPLETED',
            completedAt: '2026-03-07T10:00:00Z'
          },
          {
            id: 'step_h2',
            stepNumber: 2,
            type: 'AI_ACTION',
            title: 'Verify Teammate Synergies & Roster',
            description: 'Checks that all 3 squad members have active Vel Tech digital student cards.',
            assignedActor: 'AI_AGENT',
            status: 'COMPLETED',
            completedAt: '2026-03-07T10:01:00Z'
          },
          {
            id: 'step_h3',
            stepNumber: 3,
            type: 'HUMAN_APPROVAL',
            title: 'Faculty Lab In-Charge Workstation Clearance',
            description: 'Approves hardware lab edge drone access for the hackathon duration.',
            assignedActor: 'COLLEGE_ADMIN',
            status: 'COMPLETED',
            requiresApproval: true,
            approvalRiskLevel: 'LOW',
            completedAt: '2026-03-07T11:00:00Z'
          },
          {
            id: 'step_h4',
            stepNumber: 4,
            type: 'ACTION',
            title: 'Issue Official Competition Entry Pass',
            description: 'Generates tamper-proof QR badge and sends notifications.',
            assignedActor: 'SYSTEM',
            status: 'COMPLETED',
            completedAt: '2026-03-07T11:02:00Z'
          }
        ],
        createdAt: '2026-03-02T00:00:00Z',
        updatedAt: '2026-03-08T00:00:00Z'
      }
    ];

    defs.forEach(d => this.definitions.set(d.id, d));

    // 2. Seed Workflow Instances
    const instances: WorkflowInstance[] = [
      {
        id: 'wfi_inst_001',
        workflowId: 'wf_def_internship_prep',
        workflowTitle: 'Prepare Internship Application with Faculty Mentor Review',
        version: 1,
        userId: 'usr_student_dileep',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        idempotencyKey: 'idemp_app_google_cloud_fellow_2026',
        status: 'WAITING_FOR_APPROVAL',
        currentStepIndex: 3,
        steps: defs[0].steps,
        isDryRun: false,
        executionLogs: [
          { timestamp: '2026-03-08T09:00:00Z', stepId: 'step_1_trigger', message: 'Workflow initiated by Dileep Kumar', actor: 'Dileep Kumar' },
          { timestamp: '2026-03-08T09:01:00Z', stepId: 'step_2_skill_check', message: 'AI Success Agent evaluated passport competencies: 92% match', actor: 'AI Success Agent' },
          { timestamp: '2026-03-08T09:02:00Z', stepId: 'step_3_resume_draft', message: 'Compiled ATS resume artifact #RES-2026-09', actor: 'Workflow Engine' },
          { timestamp: '2026-03-08T09:02:30Z', stepId: 'step_4_mentor_approval', message: 'Dispatched approval ticket #APPR-2026-881 to Dr. Aravind Swaminathan', actor: 'Approval Gate' }
        ],
        contextData: {
          targetOpportunity: 'Autonomous AI Agents Research Fellow',
          company: 'Google Cloud Labs',
          stipend: '₹1,50,000 / month'
        },
        startedAt: '2026-03-08T09:00:00Z'
      }
    ];

    instances.forEach(i => {
      this.instances.set(i.id, i);
      this.idempotencyRegistry.set(i.idempotencyKey, i.id);
    });

    // 3. Seed Tasks
    const tasks: WorkflowTask[] = [
      {
        id: 'task_001',
        workflowInstanceId: 'wfi_inst_001',
        title: 'Review and Confirm Google Cloud Research Fellow Application Draft',
        description: 'Verify generated technical project summary and GitHub repository links before final submission.',
        priority: 'HIGH',
        status: 'WAITING',
        source: 'Prepare Internship Application Workflow',
        assignedUserId: 'usr_student_dileep',
        assignedRole: 'STUDENT',
        dueDate: '2026-03-10T18:00:00Z',
        actionUrl: '/workflows/wf_def_internship_prep',
        createdAt: '2026-03-08T09:02:30Z'
      },
      {
        id: 'task_002',
        title: 'Upload Docker Deployment Benchmark for NeuralCore Project',
        description: 'Add execution metrics to Digital Passport to clear Innovation Day milestone check.',
        priority: 'MEDIUM',
        status: 'TODO',
        source: 'Vel Tech Project Mentor',
        assignedUserId: 'usr_student_dileep',
        assignedRole: 'STUDENT',
        dueDate: '2026-03-12T23:59:59Z',
        actionUrl: '/ai/project-mentor',
        createdAt: '2026-03-07T14:00:00Z'
      },
      {
        id: 'task_003',
        title: 'Complete 15-Min AI Mock Technical Interview',
        description: 'Practice Distributed Vector Databases questions before faculty review session.',
        priority: 'LOW',
        status: 'COMPLETED',
        source: 'AI Career Coach',
        assignedUserId: 'usr_student_dileep',
        assignedRole: 'STUDENT',
        dueDate: '2026-03-08T12:00:00Z',
        actionUrl: '/interview/ai-coach',
        createdAt: '2026-03-06T10:00:00Z',
        completedAt: '2026-03-08T08:30:00Z'
      }
    ];

    tasks.forEach(t => this.tasks.set(t.id, t));

    // 4. Seed Approvals
    const approvals: WorkflowApproval[] = [
      {
        id: 'appr_881',
        workflowInstanceId: 'wfi_inst_001',
        stepId: 'step_4_mentor_approval',
        requestedAction: 'Endorse Student Research Application to Google Cloud Labs',
        requesterType: 'AI_AGENT',
        requesterName: 'Student Success Agent',
        targetRecord: 'Student Profile (Dileep Kumar Pallapu - 3rd Year CSE)',
        reason: 'Candidate completed verified skill benchmarks and maintains 9.4 CGPA at Vel Tech.',
        riskLevel: 'MEDIUM',
        changePreview: {
          applicationStatus: { before: 'DRAFT', after: 'MENTOR_ENDORSED' },
          mentorAttestation: { before: false, after: true }
        },
        status: 'PENDING',
        approverRole: 'FACULTY_MENTOR',
        createdAt: '2026-03-08T09:02:30Z'
      },
      {
        id: 'appr_882',
        workflowInstanceId: 'wfi_inst_001',
        stepId: 'step_5_student_confirm',
        requestedAction: 'Transmit Official Internship Application to Google Cloud Recruiter Radar',
        requesterType: 'SYSTEM',
        requesterName: 'ACE Workflow Dispatcher',
        targetRecord: 'Application #APP-2026-0419',
        reason: 'Final transmission gate to external employer recruiter system.',
        riskLevel: 'HIGH',
        changePreview: {
          submissionState: { before: 'STAGED', after: 'SUBMITTED' },
          recruiterAccess: { before: 'RESTRICTED', after: 'GRANTED' }
        },
        status: 'PENDING',
        approverRole: 'STUDENT',
        createdAt: '2026-03-08T09:03:00Z'
      }
    ];

    approvals.forEach(a => this.approvals.set(a.id, a));

    // 5. Seed Automations
    const automations: WorkflowAutomationRule[] = [
      {
        id: 'auto_01',
        name: 'Auto-Trigger Attendance Task on Event Close',
        triggerEvent: 'EVENT_REGISTRATION_CLOSED',
        conditionDescription: 'When registered attendees count > 0 for Vel Tech hosted event',
        actionDescription: 'Generate attendance roster and dispatch QR check-in terminal pass',
        isEnabled: true,
        executionCount: 14,
        lastTriggeredAt: '2026-03-07T18:00:00Z',
        createdAt: '2026-02-20T00:00:00Z'
      },
      {
        id: 'auto_02',
        name: 'Deadline Alert & Review Dispatcher',
        triggerEvent: 'APPLICATION_DEADLINE_APPROACHING',
        conditionDescription: 'When remaining time < 48 hours and application is in DRAFT',
        actionDescription: 'Create high-priority reminder task and push notification',
        isEnabled: true,
        executionCount: 28,
        lastTriggeredAt: '2026-03-08T06:00:00Z',
        createdAt: '2026-02-22T00:00:00Z'
      }
    ];

    automations.forEach(r => this.automations.set(r.id, r));

    // 6. Seed Failures
    const failures: WorkflowFailureRecord[] = [
      {
        id: 'fail_001',
        workflowInstanceId: 'wfi_inst_001',
        workflowTitle: 'Prepare Internship Application',
        stepTitle: 'External GitHub API Rate Limit Check',
        errorMessage: 'HTTP 429 Too Many Requests: Rate limit exceeded on repository commit audit.',
        retryCount: 2,
        maxRetries: 3,
        severity: 'MEDIUM',
        status: 'RESOLVED',
        failedAt: '2026-03-07T22:15:00Z'
      }
    ];

    failures.forEach(f => this.failures.set(f.id, f));
  }

  // --- Definitions ---
  public getAllDefinitions(): WorkflowDefinition[] {
    return Array.from(this.definitions.values());
  }

  public getDefinitionById(id: string): WorkflowDefinition | null {
    return this.definitions.get(id) || null;
  }

  public createDefinition(def: Omit<WorkflowDefinition, 'id' | 'createdAt' | 'updatedAt'>): WorkflowDefinition {
    const id = `wf_def_${Date.now()}`;
    const newDef: WorkflowDefinition = {
      ...def,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.definitions.set(id, newDef);
    this.notify();
    return newDef;
  }

  // --- Execution & Idempotency ---
  public startWorkflow(params: {
    workflowId: string;
    userId: string;
    institutionId: string;
    idempotencyKey: string;
    isDryRun?: boolean;
    contextData?: Record<string, any>;
  }): { instance: WorkflowInstance; isExisting: boolean } {
    // Idempotency check
    if (this.idempotencyRegistry.has(params.idempotencyKey)) {
      const existingId = this.idempotencyRegistry.get(params.idempotencyKey)!;
      const existingInstance = this.instances.get(existingId);
      if (existingInstance) {
        return { instance: existingInstance, isExisting: true };
      }
    }

    const def = this.definitions.get(params.workflowId);
    if (!def) throw new Error(`Workflow definition "${params.workflowId}" not found.`);

    const id = `wfi_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const clonedSteps: WorkflowStep[] = JSON.parse(JSON.stringify(def.steps));

    const instance: WorkflowInstance = {
      id,
      workflowId: def.id,
      workflowTitle: def.title,
      version: def.version,
      userId: params.userId,
      institutionId: params.institutionId,
      idempotencyKey: params.idempotencyKey,
      status: params.isDryRun ? 'COMPLETED' : 'RUNNING',
      currentStepIndex: 0,
      steps: clonedSteps,
      isDryRun: Boolean(params.isDryRun),
      executionLogs: [
        {
          timestamp: new Date().toISOString(),
          stepId: clonedSteps[0]?.id || 'init',
          message: params.isDryRun ? 'Executed Dry-Run Simulation: 0 state mutations committed' : 'Workflow started',
          actor: params.userId
        }
      ],
      contextData: params.contextData || {},
      startedAt: new Date().toISOString()
    };

    if (!params.isDryRun) {
      this.instances.set(id, instance);
      this.idempotencyRegistry.set(params.idempotencyKey, id);
    }
    this.notify();
    return { instance, isExisting: false };
  }

  public getAllInstances(userId: string = 'usr_student_dileep'): WorkflowInstance[] {
    return Array.from(this.instances.values()).filter(i => i.userId === userId);
  }

  public getInstanceById(id: string): WorkflowInstance | null {
    return this.instances.get(id) || null;
  }

  public pauseWorkflow(instanceId: string): boolean {
    const inst = this.instances.get(instanceId);
    if (!inst) return false;
    inst.status = 'PAUSED';
    inst.executionLogs.push({
      timestamp: new Date().toISOString(),
      stepId: inst.steps[inst.currentStepIndex]?.id || 'pause',
      message: 'Workflow execution paused by user',
      actor: inst.userId
    });
    this.notify();
    return true;
  }

  public resumeWorkflow(instanceId: string): boolean {
    const inst = this.instances.get(instanceId);
    if (!inst) return false;
    inst.status = 'RUNNING';
    inst.executionLogs.push({
      timestamp: new Date().toISOString(),
      stepId: inst.steps[inst.currentStepIndex]?.id || 'resume',
      message: 'Workflow execution resumed',
      actor: inst.userId
    });
    this.notify();
    return true;
  }

  public rollbackCompensation(instanceId: string): boolean {
    const inst = this.instances.get(instanceId);
    if (!inst) return false;
    inst.status = 'CANCELLED';
    inst.executionLogs.push({
      timestamp: new Date().toISOString(),
      stepId: 'compensation',
      message: 'Triggered compensation rollback on all completed steps',
      actor: 'Compensation Engine'
    });
    this.notify();
    return true;
  }

  // --- Tasks ---
  public getAllTasks(userId: string = 'usr_student_dileep'): WorkflowTask[] {
    return Array.from(this.tasks.values()).filter(t => t.assignedUserId === userId);
  }

  public completeTask(taskId: string): boolean {
    const t = this.tasks.get(taskId);
    if (!t) return false;
    t.status = 'COMPLETED';
    t.completedAt = new Date().toISOString();
    this.notify();
    return true;
  }

  public snoozeTask(taskId: string, extraDays: number = 2): boolean {
    const t = this.tasks.get(taskId);
    if (!t) return false;
    t.status = 'SNOOZED';
    const current = new Date(t.dueDate);
    current.setDate(current.getDate() + extraDays);
    t.dueDate = current.toISOString();
    this.notify();
    return true;
  }

  // --- Approvals ---
  public getAllApprovals(role: string = 'FACULTY_MENTOR'): WorkflowApproval[] {
    return Array.from(this.approvals.values());
  }

  public processApproval(approvalId: string, decision: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES', notes: string = '', approverUserId: string = 'usr_mentor_aravind'): boolean {
    const appr = this.approvals.get(approvalId);
    if (!appr) return false;

    appr.status = decision === 'APPROVE' ? 'APPROVED' : decision === 'REJECT' ? 'REJECTED' : 'CHANGES_REQUESTED';
    appr.approverUserId = approverUserId;
    appr.decisionNotes = notes;
    appr.resolvedAt = new Date().toISOString();

    // Advance workflow if approved
    const inst = this.instances.get(appr.workflowInstanceId);
    if (inst) {
      inst.executionLogs.push({
        timestamp: new Date().toISOString(),
        stepId: appr.stepId,
        message: `Approval Decision [${decision}] recorded: ${notes || 'No notes provided'}`,
        actor: approverUserId
      });
      if (decision === 'APPROVE' && inst.currentStepIndex < inst.steps.length - 1) {
        inst.steps[inst.currentStepIndex].status = 'COMPLETED';
        inst.currentStepIndex += 1;
        inst.status = inst.currentStepIndex >= inst.steps.length - 1 ? 'COMPLETED' : 'RUNNING';
      } else if (decision === 'REJECT') {
        inst.status = 'BLOCKED';
      }
    }

    this.notify();
    return true;
  }

  // --- Automations & Failures ---
  public getAllAutomations(): WorkflowAutomationRule[] {
    return Array.from(this.automations.values());
  }

  public toggleAutomation(id: string): boolean {
    const r = this.automations.get(id);
    if (!r) return false;
    r.isEnabled = !r.isEnabled;
    this.notify();
    return r.isEnabled;
  }

  public getAllFailures(): WorkflowFailureRecord[] {
    return Array.from(this.failures.values());
  }

  public retryFailure(id: string): boolean {
    const f = this.failures.get(id);
    if (!f) return false;
    f.retryCount += 1;
    if (f.retryCount >= f.maxRetries) {
      f.status = 'DEAD_LETTER';
    } else {
      f.status = 'RESOLVED';
    }
    this.notify();
    return true;
  }
}

export const workflowEngineDatabase = new WorkflowEngineDatabase();
