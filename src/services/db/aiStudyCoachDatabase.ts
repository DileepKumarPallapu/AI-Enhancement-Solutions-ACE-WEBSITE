// ACE 100X AI Study Coach & Deterministic Quiz Evaluation Database
// Provides concept deep dives, hint generators, and mathematically verified quizzes

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface StudyModule {
  id: string;
  topic: string;
  domain: string;
  conceptSummary: string;
  keyFormulasAndConcepts: string[];
  practiceQuestions: QuizQuestion[];
}

export interface QuizResult {
  moduleId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  userAnswers: number[];
  isPassed: boolean;
  reviewedAt: string;
}

class AiStudyCoachDatabase {
  private modules: Map<string, StudyModule> = new Map();

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const mods: StudyModule[] = [
      {
        id: 'mod_distributed_consensus',
        topic: 'Distributed Consensus & Raft Protocol',
        domain: 'Distributed Systems',
        conceptSummary: 'Raft divides time into terms of arbitrary length. Terms are numbered with consecutive integers. Each term begins with an election, in which one or more candidates attempt to become leader.',
        keyFormulasAndConcepts: [
          'Quorum condition: Majority quorum requires floor(N/2) + 1 active nodes.',
          'Leader Election: Randomized timer between 150ms and 300ms prevents split-vote stagnation.',
          'Log Matching Invariant: If two entries in different logs have the same index and term, they store the same command.'
        ],
        practiceQuestions: [
          {
            id: 'q1',
            question: 'In a 5-node Raft cluster, what is the minimum number of nodes required to form a valid quorum for commit?',
            options: ['2 nodes', '3 nodes', '4 nodes', '5 nodes'],
            correctOptionIndex: 1, // 3 nodes
            explanation: 'In an N-node system, quorum is floor(N/2) + 1. For N=5, floor(5/2) + 1 = 2 + 1 = 3 nodes.'
          },
          {
            id: 'q2',
            question: 'What technique does Raft use to avoid split-vote split-brain scenarios during leader elections?',
            options: ['Proof of Work', 'Randomized election timeouts', 'Fixed static leader priority', 'Round-robin round assignment'],
            correctOptionIndex: 1, // Randomized election timeouts
            explanation: 'Randomized election timeouts (e.g. 150-300ms) ensure one candidate times out and requests votes before others.'
          }
        ]
      },
      {
        id: 'mod_vector_databases',
        topic: 'Vector Indexing & HNSW Graph Search',
        domain: 'AI & Information Retrieval',
        conceptSummary: 'Hierarchical Navigable Small World (HNSW) graphs build multi-layer proximity graphs allowing logarithmic time complexity O(log N) approximate nearest neighbor (ANN) search for high-dimensional embeddings.',
        keyFormulasAndConcepts: [
          'Cosine Similarity: (A • B) / (||A|| * ||B||)',
          'HNSW Layering: Top layers have long-range skip edges; bottom layer contains all dense vectors.',
          'Recall vs Latency trade-off governed by efSearch and M parameters.'
        ],
        practiceQuestions: [
          {
            id: 'q3',
            question: 'What is the average query time complexity for approximate nearest neighbor search in an HNSW index?',
            options: ['O(N)', 'O(N^2)', 'O(log N)', 'O(1)'],
            correctOptionIndex: 2, // O(log N)
            explanation: 'HNSW provides logarithmic O(log N) search scaling across multi-layered navigable graphs.'
          }
        ]
      }
    ];

    mods.forEach(m => this.modules.set(m.id, m));
  }

  public getAllModules(): StudyModule[] {
    return Array.from(this.modules.values());
  }

  public getModuleById(id: string): StudyModule | undefined {
    return this.modules.get(id);
  }

  public evaluateQuiz(moduleId: string, userAnswers: number[]): QuizResult {
    const mod = this.modules.get(moduleId);
    if (!mod) throw new Error('Module not found');

    let score = 0;
    mod.practiceQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOptionIndex) {
        score++;
      }
    });

    const total = mod.practiceQuestions.length;
    const percentage = Math.round((score / total) * 100);

    return {
      moduleId,
      score,
      totalQuestions: total,
      percentage,
      userAnswers,
      isPassed: percentage >= 70,
      reviewedAt: new Date().toISOString()
    };
  }
}

export const aiStudyCoachDatabase = new AiStudyCoachDatabase();
