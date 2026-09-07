// ACE 20X Dynamic Career Roadmap & Role Paths Database
// 18+ Technical Roles with Prerequisites, Skill Milestones, Projects, and Opportunities

export interface CareerRoleRoadmap {
  roleId: string;
  roleTitle: string;
  category: string;
  avgStartingPackage: string;
  demandLevel: 'VERY_HIGH' | 'HIGH' | 'STABLE';
  milestones: {
    level: number;
    title: string;
    skills: string[];
    recommendedCourses: string[];
    suggestedProjects: string[];
    assessments: string[];
  }[];
}

class CareerRoadmapDatabase {
  private roadmaps: Map<string, CareerRoleRoadmap> = new Map([
    [
      'ai-engineer',
      {
        roleId: 'ai-engineer',
        roleTitle: 'AI & Machine Learning Engineer',
        category: 'Artificial Intelligence',
        avgStartingPackage: '₹14,50,000 - ₹28,00,000 / annum',
        demandLevel: 'VERY_HIGH',
        milestones: [
          {
            level: 1,
            title: 'Mathematical Foundations & Python Mastery',
            skills: ['Linear Algebra', 'Multivariate Calculus', 'NumPy & Pandas', 'Python 3.12'],
            recommendedCourses: ['Machine Learning Specialization', 'Applied Linear Algebra'],
            suggestedProjects: ['Statistical Data Pipeline', 'Feature Engineering Framework'],
            assessments: ['Python Data Structures Exam', 'Statistical Inference Benchmark']
          },
          {
            level: 2,
            title: 'Deep Learning & Neural Architectures',
            skills: ['PyTorch', 'Transformers', 'Convolutional Networks', 'Model Quantization'],
            recommendedCourses: ['Deep Learning with PyTorch', 'Hugging Face NLP Mastery'],
            suggestedProjects: ['Autonomous Multi-Agent Orchestrator', 'Edge SLAM Jetson Nano Perception'],
            assessments: ['PyTorch Model Training Hackathon', 'Transformer Attention Assessment']
          },
          {
            level: 3,
            title: 'Production LLM Systems & Deployment',
            skills: ['vLLM', 'FastAPI', 'Vector Databases', 'Docker & Kubernetes', 'AST Anti-Cheat Analysis'],
            recommendedCourses: ['Production AI Systems Architecture', 'Cloud ML Inference'],
            suggestedProjects: ['High-Throughput Evaluation Harness', 'Real-Time Telemetry Stream'],
            assessments: ['End-to-End AI System Deployment Evaluation']
          }
        ]
      }
    ],
    [
      'fullstack-engineer',
      {
        roleId: 'fullstack-engineer',
        roleTitle: 'Full-Stack Software Engineer',
        category: 'Software Engineering',
        avgStartingPackage: '₹10,00,000 - ₹22,00,000 / annum',
        demandLevel: 'VERY_HIGH',
        milestones: [
          {
            level: 1,
            title: 'Modern Frontend & Reactive State',
            skills: ['React 18', 'TypeScript', 'Tailwind CSS', 'State Machines'],
            recommendedCourses: ['Advanced React Patterns', 'TypeScript Fundamentals'],
            suggestedProjects: ['Student Opportunity Radar UI', 'Real-Time Kanban Sprint Board'],
            assessments: ['React Component Benchmark', 'TypeScript Strict Mode Quiz']
          },
          {
            level: 2,
            title: 'Distributed Backends & Relational Stores',
            skills: ['Node.js', 'PostgreSQL', 'Redis Caching', 'REST & GraphQL'],
            recommendedCourses: ['High-Concurrency Backend Design', 'Database Indexing & Sharding'],
            suggestedProjects: ['Idempotent Wallet Ledger', 'Event Bus Ingestion Pipeline'],
            assessments: ['Database Query Optimization Lab']
          }
        ]
      }
    ]
  ]);

  public getRoadmap(roleId: string): CareerRoleRoadmap | null {
    return this.roadmaps.get(roleId) || this.roadmaps.get('ai-engineer') || null;
  }

  public getAllRoles(): { id: string; title: string; category: string }[] {
    return Array.from(this.roadmaps.values()).map(r => ({ id: r.roleId, title: r.roleTitle, category: r.category }));
  }
}

export const careerRoadmapDb = new CareerRoadmapDatabase();
