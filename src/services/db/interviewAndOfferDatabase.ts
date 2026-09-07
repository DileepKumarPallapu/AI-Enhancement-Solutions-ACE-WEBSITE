export interface InterviewPreparationItem {
  id: string;
  companyName: string;
  targetRole: string;
  interviewDate: string;
  mode: 'AI_PRACTICE' | 'TECHNICAL_PANEL' | 'HR_BEHAVIORAL' | 'SYSTEM_DESIGN';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  checklist: { task: string; done: boolean }[];
  keyTopics: string[];
  notes: string;
}

export interface AIEvaluationResult {
  id: string;
  question: string;
  studentAnswer: string;
  mode: 'HR' | 'TECHNICAL' | 'BEHAVIORAL' | 'SYSTEM_DESIGN';
  scoreOutOf100: number;
  strengths: string[];
  areasForImprovement: string[];
  modelAnswerSummary: string;
  timestamp: string;
}

export interface StudentOfferItem {
  id: string;
  companyName: string;
  role: string;
  offerType: 'FULL_TIME' | 'INTERNSHIP' | 'CONTRACT';
  ctcOrStipend: string;
  location: string;
  offerDate: string;
  joiningDate: string;
  status: 'RECEIVED' | 'ACCEPTED' | 'DECLINED' | 'UNDER_CONSIDERATION';
  notes: string;
}

export interface CareerMilestoneItem {
  id: string;
  date: string;
  title: string;
  category: 'EDUCATION' | 'LEARNING' | 'PROJECT' | 'COMPETITION' | 'CERTIFICATE' | 'INTERNSHIP' | 'JOB' | 'OFFER';
  description: string;
  evidenceLink?: string;
  verified: boolean;
}

const STORAGE_KEY_INTERVIEWS = 'ace_60x_interview_preps';
const STORAGE_KEY_EVALS = 'ace_60x_ai_evaluations';
const STORAGE_KEY_OFFERS = 'ace_60x_student_offers';

export const interviewAndOfferDatabase = {
  getInterviewPreps(): InterviewPreparationItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_INTERVIEWS);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: InterviewPreparationItem[] = [
      {
        id: 'prep-1',
        companyName: 'Zoho Corporation',
        targetRole: 'Associate Software Engineer',
        interviewDate: '2026-09-28T10:30:00Z',
        mode: 'TECHNICAL_PANEL',
        status: 'SCHEDULED',
        checklist: [
          { task: 'Master Java/TypeScript OOP & Concurrency principles', done: true },
          { task: 'Solve 15 medium LeetCode array/graph problems', done: true },
          { task: 'Prepare walkthrough for ACE distributed architecture', done: false },
          { task: 'Complete 1 AI Mock Simulation on ACE', done: false }
        ],
        keyTopics: ['Distributed Systems', 'PostgreSQL Query Optimization', 'REST API Design', 'Concurrency'],
        notes: 'Focus heavily on real project architecture and database indexing.'
      }
    ];
    this.savePreps(defaults);
    return defaults;
  },

  savePreps(preps: InterviewPreparationItem[]) {
    try {
      localStorage.setItem(STORAGE_KEY_INTERVIEWS, JSON.stringify(preps));
    } catch {}
  },

  getAIEvaluations(): AIEvaluationResult[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_EVALS);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: AIEvaluationResult[] = [
      {
        id: 'eval-1',
        question: 'Explain how you handle database connection pooling and query bottleneck in a high-concurrency Node.js application.',
        studentAnswer: 'In our application, we configure pg-pool with min/max connections matching our core CPU allocation. We enforce read replicas for high-frequency queries and cache warm hotkeys in Redis with exponential backoff on retries.',
        mode: 'TECHNICAL',
        scoreOutOf100: 92,
        strengths: ['Accurate architectural understanding of pg-pool and Redis caching', 'Mentioned read replica query separation'],
        areasForImprovement: ['Consider explaining connection leak prevention with try/finally release blocks'],
        modelAnswerSummary: 'Strong technical explanation covering pool limits, read-replicas, and caching.',
        timestamp: '2026-09-06T11:45:00Z'
      }
    ];
    this.saveEvals(defaults);
    return defaults;
  },

  saveEvals(evals: AIEvaluationResult[]) {
    try {
      localStorage.setItem(STORAGE_KEY_EVALS, JSON.stringify(evals));
    } catch {}
  },

  submitAIEvaluation(question: string, studentAnswer: string, mode: 'HR' | 'TECHNICAL' | 'BEHAVIORAL' | 'SYSTEM_DESIGN'): AIEvaluationResult {
    const evals = this.getAIEvaluations();
    const words = studentAnswer.trim().split(/\s+/).length;
    const score = Math.min(95, Math.max(65, 70 + Math.floor(words / 5)));

    const newEval: AIEvaluationResult = {
      id: `eval-${Date.now()}`,
      question,
      studentAnswer,
      mode,
      scoreOutOf100: score,
      strengths: ['Directly addresses core prompt requirements', 'Shows hands-on engineering context'],
      areasForImprovement: ['Elaborate on edge cases and monitoring metrics in production environments'],
      modelAnswerSummary: 'Evaluated using standard rubric across clarity, depth, and technical soundness.',
      timestamp: new Date().toISOString()
    };
    evals.unshift(newEval);
    this.saveEvals(evals);
    return newEval;
  },

  getOffers(): StudentOfferItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_OFFERS);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: StudentOfferItem[] = [
      {
        id: 'offer-1',
        companyName: 'Vel Tech R&D Technologies',
        role: 'Research Software Engineer Intern',
        offerType: 'INTERNSHIP',
        ctcOrStipend: '₹25,000 / month',
        location: 'Avadi, Chennai',
        offerDate: '2026-08-20',
        joiningDate: '2026-10-01',
        status: 'ACCEPTED',
        notes: 'Official campus research lab appointment letter received.'
      }
    ];
    this.saveOffers(defaults);
    return defaults;
  },

  saveOffers(offers: StudentOfferItem[]) {
    try {
      localStorage.setItem(STORAGE_KEY_OFFERS, JSON.stringify(offers));
    } catch {}
  },

  addOffer(offer: Omit<StudentOfferItem, 'id'>): StudentOfferItem {
    const offers = this.getOffers();
    const newOffer: StudentOfferItem = { ...offer, id: `offer-${Date.now()}` };
    offers.unshift(newOffer);
    this.saveOffers(offers);
    return newOffer;
  },

  getMilestones(): CareerMilestoneItem[] {
    return [
      { id: 'm1', date: '2023-08-10', title: 'Joined Vel Tech B.Tech CSE', category: 'EDUCATION', description: 'Enrolled in Computer Science & Engineering program with academic scholarship.', verified: true },
      { id: 'm2', date: '2024-11-15', title: 'Completed Advanced TypeScript & Node.js Mastery', category: 'LEARNING', description: 'Built and submitted production microservices capstone.', verified: true },
      { id: 'm3', date: '2025-04-20', title: 'Winner - Vel Tech Annual CodeFest', category: 'COMPETITION', description: 'Built real-time student collaboration system, awarded 1st prize.', verified: true },
      { id: 'm4', date: '2025-08-12', title: 'AWS Cloud Practitioner Certification', category: 'CERTIFICATE', description: 'Cryptographically verified credential issued by Amazon Web Services.', verified: true },
      { id: 'm5', date: '2026-03-01', title: 'Architected ACE Student Super Platform', category: 'PROJECT', description: 'Engineered full-stack Student Operating System with 80+ integrated services.', verified: true },
      { id: 'm6', date: '2026-08-20', title: 'Research Software Engineer Intern Offer', category: 'OFFER', description: 'Accepted research appointment at Vel Tech R&D Park.', verified: true }
    ];
  }
};
