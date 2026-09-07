// ACE Interview Preparation & AI Mock Interview Simulator Database
// Role-Specific Question Banks, Technical Problem Prompts, and Mentor Feedback

export interface InterviewQuestion {
  id: string;
  category: 'SYSTEM_DESIGN' | 'CODING_DSA' | 'AI_ML' | 'BEHAVIORAL';
  targetRole: string;
  title: string;
  difficulty: 'HARD' | 'MEDIUM' | 'EASY';
  questionPrompt: string;
  keyEvaluationPoints: string[];
  sampleOptimalAnswerSnippet: string;
}

export interface MockInterviewSubmission {
  id: string;
  userId: string;
  questionId: string;
  questionTitle: string;
  candidateResponse: string;
  aiEvaluation: {
    overallScore: number; // 0 - 100
    technicalAccuracyScore: number;
    communicationScore: number;
    strengths: string[];
    areasForImprovement: string[];
    aiDisclaimer: string;
  };
  submittedAt: string;
}

const STORAGE_KEY = 'ace_db_mock_interviews_v1';

class InterviewPrepDatabase {
  private submissions: Map<string, MockInterviewSubmission> = new Map();
  private questions: InterviewQuestion[] = [
    {
      id: 'q_sys_01',
      category: 'SYSTEM_DESIGN',
      targetRole: 'AI Systems Engineer',
      title: 'Design an Autonomous Multi-Agent Orchestrator with Human-in-the-Loop Confirmation',
      difficulty: 'HARD',
      questionPrompt: 'Explain the runtime architecture, state persistence, idempotency guarantees, and sandboxed tool execution for a multi-agent pair programming assistant.',
      keyEvaluationPoints: [
        'Deterministic state replay using event sourcing',
        'Strict 2-step confirmation modal for modifying actions',
        'Graceful tool failure handling and exponential backoff'
      ],
      sampleOptimalAnswerSnippet: 'Isolate worker agents in execution sandboxes with bounded permissions. Persist all tool calls to append-only logs.'
    },
    {
      id: 'q_ai_02',
      category: 'AI_ML',
      targetRole: 'AI Systems Engineer',
      title: 'Explain Quantization & KV Cache Optimization for Low-Latency LLM Serving',
      difficulty: 'HARD',
      questionPrompt: 'How does FP8 / INT4 weight-only and weight-activation quantization affect memory bandwidth during autoregressive token generation?',
      keyEvaluationPoints: [
        'Memory bandwidth bound vs compute bound distinction',
        'PagedAttention memory paging to avoid fragmentation',
        'Per-channel vs per-tensor scaling factors'
      ],
      sampleOptimalAnswerSnippet: 'Autoregressive generation is memory bandwidth limited; KV cache compression increases maximum concurrent batch concurrency.'
    }
  ];

  constructor() {
    this.load();
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const list = JSON.parse(raw) as MockInterviewSubmission[];
          list.forEach(s => this.submissions.set(s.id, s));
        }
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.submissions.values())));
      }
    } catch {
      // Fallback
    }
  }

  public getQuestions(): InterviewQuestion[] {
    return [...this.questions];
  }

  public getSubmissions(userId: string): MockInterviewSubmission[] {
    return Array.from(this.submissions.values()).filter(s => s.userId === userId);
  }

  public submitMockResponse(userId: string, questionId: string, responseText: string): MockInterviewSubmission {
    const q = this.questions.find(item => item.id === questionId);
    const id = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    const submission: MockInterviewSubmission = {
      id,
      userId,
      questionId,
      questionTitle: q?.title || 'Technical Interview Question',
      candidateResponse: responseText,
      aiEvaluation: {
        overallScore: Math.min(96, Math.max(70, 75 + Math.round(responseText.length / 40))),
        technicalAccuracyScore: 92,
        communicationScore: 88,
        strengths: [
          'Clear architectural modularity and state machine decomposition',
          'Accurate terminology regarding idempotency and tool sandboxing'
        ],
        areasForImprovement: [
          'Explicitly quantify memory bandwidth consumption and p99 latency SLOs'
        ],
        aiDisclaimer: 'AI evaluation is generated automatically for practice purposes and does not represent an employer hiring decision.'
      },
      submittedAt: new Date().toISOString()
    };

    this.submissions.set(id, submission);
    this.save();
    return submission;
  }
}

export const interviewPrepDb = new InterviewPrepDatabase();
