// ACE 120X AI Agent System, Tool Permissions & Execution Security
// Gated Tool Execution, Cost Accounting & Human-in-the-Loop Security Barriers

export type AIToolRiskLevel = 'READ_ONLY' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AIAgentRole = 
  | 'STUDENT_SUCCESS_AGENT'
  | 'CAREER_AGENT'
  | 'LEARNING_AGENT'
  | 'APPLICATION_AGENT'
  | 'MENTOR_AGENT'
  | 'RECRUITER_AGENT'
  | 'COLLEGE_OPERATIONS_AGENT'
  | 'MODERATION_AGENT';

export interface AITool {
  id: string;
  name: string;
  description: string;
  riskLevel: AIToolRiskLevel;
  requiresHumanApproval: boolean;
  allowedRoles: AIAgentRole[];
}

export interface AIAgent {
  id: string;
  name: string;
  role: AIAgentRole;
  description: string;
  allowedToolIds: string[];
  forbiddenToolIds: string[];
  monthlyTokenQuota: number;
  tokensConsumedThisMonth: number;
  estimatedCostUSD: number;
  isActive: boolean;
}

export interface AIActionProposal {
  id: string;
  agentId: string;
  agentName: string;
  requestedTool: string;
  riskLevel: AIToolRiskLevel;
  reason: string;
  affectedDataDescription: string;
  parameters: Record<string, any>;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'EXECUTED' | 'FAILED';
  humanApprover?: string;
  createdAt: string;
  executedAt?: string;
}

const TOOLS_INVENTORY: AITool[] = [
  {
    id: 'tool_read_profile',
    name: 'READ_PROFILE',
    description: 'Read authenticated student profile, department, and CGPA.',
    riskLevel: 'READ_ONLY',
    requiresHumanApproval: false,
    allowedRoles: ['STUDENT_SUCCESS_AGENT', 'CAREER_AGENT', 'APPLICATION_AGENT', 'MENTOR_AGENT']
  },
  {
    id: 'tool_read_passport_skills',
    name: 'READ_PASSPORT_SKILLS',
    description: 'Read verified skills and digital student passport evidence.',
    riskLevel: 'READ_ONLY',
    requiresHumanApproval: false,
    allowedRoles: ['STUDENT_SUCCESS_AGENT', 'CAREER_AGENT', 'APPLICATION_AGENT']
  },
  {
    id: 'tool_create_task',
    name: 'CREATE_TASK',
    description: 'Create a personal study or preparation task on user task board.',
    riskLevel: 'LOW',
    requiresHumanApproval: false,
    allowedRoles: ['STUDENT_SUCCESS_AGENT', 'LEARNING_AGENT', 'MENTOR_AGENT']
  },
  {
    id: 'tool_generate_resume_draft',
    name: 'GENERATE_RESUME_DRAFT',
    description: 'Synthesize standard ATS markdown draft based on verified credentials.',
    riskLevel: 'MEDIUM',
    requiresHumanApproval: false,
    allowedRoles: ['APPLICATION_AGENT', 'CAREER_AGENT']
  },
  // High / Critical Risk Tools (STRICTLY REQUIRE APPROVAL)
  {
    id: 'tool_submit_application',
    name: 'SUBMIT_APPLICATION',
    description: 'Transmit student application to external recruiter ATS.',
    riskLevel: 'HIGH',
    requiresHumanApproval: true,
    allowedRoles: ['APPLICATION_AGENT']
  },
  {
    id: 'tool_award_coins',
    name: 'AWARD_COINS',
    description: 'Credit ACE Coins to student wallet balance.',
    riskLevel: 'CRITICAL',
    requiresHumanApproval: true,
    allowedRoles: ['COLLEGE_OPERATIONS_AGENT']
  },
  {
    id: 'tool_issue_certificate',
    name: 'ISSUE_CERTIFICATE',
    description: 'Issue cryptographically signed verifiable digital certificate.',
    riskLevel: 'CRITICAL',
    requiresHumanApproval: true,
    allowedRoles: ['COLLEGE_OPERATIONS_AGENT']
  },
  {
    id: 'tool_publish_event',
    name: 'PUBLISH_EVENT',
    description: 'Promote event status from DRAFT to PUBLISHED on campus feed.',
    riskLevel: 'HIGH',
    requiresHumanApproval: true,
    allowedRoles: ['COLLEGE_OPERATIONS_AGENT']
  }
];

class AIWorkflowAgentDatabase {
  private agents: Map<string, AIAgent> = new Map();
  private proposals: Map<string, AIActionProposal> = new Map();
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
    const agents: AIAgent[] = [
      {
        id: 'agent_student_success',
        name: 'Student Success Autonomous Orchestrator',
        role: 'STUDENT_SUCCESS_AGENT',
        description: 'Analyzes student journey milestones, detects skill gaps, and recommends next best actions.',
        allowedToolIds: ['tool_read_profile', 'tool_read_passport_skills', 'tool_create_task'],
        forbiddenToolIds: ['tool_award_coins', 'tool_issue_certificate', 'tool_publish_event'],
        monthlyTokenQuota: 500000,
        tokensConsumedThisMonth: 124500,
        estimatedCostUSD: 0.24,
        isActive: true
      },
      {
        id: 'agent_application_copilot',
        name: 'Application & Portfolio Co-Pilot',
        role: 'APPLICATION_AGENT',
        description: 'Synthesizes verified ATS-ready resumes and stages application submissions for student sign-off.',
        allowedToolIds: ['tool_read_profile', 'tool_read_passport_skills', 'tool_generate_resume_draft', 'tool_submit_application'],
        forbiddenToolIds: ['tool_award_coins', 'tool_issue_certificate'],
        monthlyTokenQuota: 800000,
        tokensConsumedThisMonth: 312000,
        estimatedCostUSD: 0.62,
        isActive: true
      }
    ];

    agents.forEach(a => this.agents.set(a.id, a));

    // Seed initial proposals
    const proposals: AIActionProposal[] = [
      {
        id: 'prop_001',
        agentId: 'agent_application_copilot',
        agentName: 'Application & Portfolio Co-Pilot',
        requestedTool: 'SUBMIT_APPLICATION',
        riskLevel: 'HIGH',
        reason: 'Candidate completed all prerequisites for Google Cloud Autonomous AI Agents Fellowship.',
        affectedDataDescription: 'Creates official application record #APP-2026-0419 and shares verified passport links with Google Cloud recruiter.',
        parameters: {
          opportunityId: 'opp_glob_fellow_01',
          applicantId: 'usr_student_dileep',
          institutionId: 'inst-vel-tech-rangarajan-avadi'
        },
        status: 'PENDING_APPROVAL',
        createdAt: '2026-03-08T09:03:00Z'
      }
    ];

    proposals.forEach(p => this.proposals.set(p.id, p));
  }

  public getTools(): AITool[] {
    return TOOLS_INVENTORY;
  }

  public getAgents(): AIAgent[] {
    return Array.from(this.agents.values());
  }

  public getProposals(): AIActionProposal[] {
    return Array.from(this.proposals.values());
  }

  public executeTool(agentId: string, toolId: string, params: Record<string, any>): {
    success: boolean;
    requiresApproval: boolean;
    proposalId?: string;
    output?: any;
    error?: string;
  } {
    const agent = this.agents.get(agentId);
    if (!agent) return { success: false, requiresApproval: false, error: `Agent "${agentId}" not found.` };

    const tool = TOOLS_INVENTORY.find(t => t.id === toolId);
    if (!tool) return { success: false, requiresApproval: false, error: `Tool "${toolId}" not found.` };

    // Security Gate 1: Check Forbidden Tools
    if (agent.forbiddenToolIds.includes(toolId)) {
      return { success: false, requiresApproval: false, error: `Permission Denied: Tool "${tool.name}" is strictly forbidden for agent "${agent.name}".` };
    }

    // Security Gate 2: Check Human Approval Barrier
    if (tool.requiresHumanApproval) {
      const proposal: AIActionProposal = {
        id: `prop_${Date.now()}`,
        agentId: agent.id,
        agentName: agent.name,
        requestedTool: tool.name,
        riskLevel: tool.riskLevel,
        reason: params.reason || 'AI agent requested high-risk operation execution.',
        affectedDataDescription: params.affectedDataDescription || 'Mutates authorized institutional/student records.',
        parameters: params,
        status: 'PENDING_APPROVAL',
        createdAt: new Date().toISOString()
      };
      this.proposals.set(proposal.id, proposal);
      this.notify();
      return {
        success: true,
        requiresApproval: true,
        proposalId: proposal.id,
        output: 'Proposal created and routed to Human-In-The-Loop Approval Center.'
      };
    }

    // Read-only or safe draft tool
    agent.tokensConsumedThisMonth += 450;
    agent.estimatedCostUSD += 0.0009;
    this.notify();

    return {
      success: true,
      requiresApproval: false,
      output: { status: 'EXECUTED_SUCCESSFULLY', tool: tool.name, resultData: params }
    };
  }

  public approveProposal(proposalId: string, approverUserId: string = 'usr_student_dileep'): boolean {
    const prop = this.proposals.get(proposalId);
    if (!prop) return false;
    prop.status = 'APPROVED';
    prop.humanApprover = approverUserId;
    prop.executedAt = new Date().toISOString();
    this.notify();
    return true;
  }

  public rejectProposal(proposalId: string): boolean {
    const prop = this.proposals.get(proposalId);
    if (!prop) return false;
    prop.status = 'REJECTED';
    this.notify();
    return true;
  }
}

export const aiWorkflowAgentDatabase = new AIWorkflowAgentDatabase();
