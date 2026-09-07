/**
 * ACE 30X — AI Skill Gap Analyzer Service
 * Compares authenticated student verified skills against industry role benchmarks
 * and maps missing skills to authentic ACE catalog items.
 */

export interface RoleSkillBenchmark {
  roleId: string;
  roleTitle: string;
  category: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior';
  description: string;
  requiredSkills: Array<{
    name: string;
    importance: 'CRITICAL' | 'IMPORTANT' | 'BONUS';
    minProficiency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    prerequisites?: string[];
  }>;
  suggestedModules: Array<{
    moduleId: string;
    title: string;
    skill: string;
    type: 'COURSE' | 'PROJECT' | 'COMPETITION';
    duration: string;
  }>;
}

export interface SkillGapAnalysisResult {
  role: RoleSkillBenchmark;
  matchedSkills: Array<{ name: string; proficiency: string; verified: boolean }>;
  missingSkills: Array<{ name: string; importance: 'CRITICAL' | 'IMPORTANT' | 'BONUS'; prerequisites?: string[] }>;
  matchPercentage: number;
  learningWorkloadHours: number;
  recommendedActions: Array<{
    type: 'COURSE' | 'PROJECT' | 'COMPETITION' | 'MENTOR';
    title: string;
    skill: string;
    link: string;
    reason: string;
  }>;
  evaluatedAt: string;
}

class AISkillGapDatabaseService {
  private benchmarks: RoleSkillBenchmark[] = [
    {
      roleId: 'role-fsd',
      roleTitle: 'Full-Stack Developer (React / Node / TypeScript)',
      category: 'Software Engineering',
      experienceLevel: 'Entry-Level',
      description: 'Builds end-to-end web applications with modern frontend frameworks, RESTful backend microservices, and relational databases.',
      requiredSkills: [
        { name: 'JavaScript', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'TypeScript', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'React', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'Node.js', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'REST APIs', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'SQL / Databases', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'Git & Version Control', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'Docker / Cloud Basics', importance: 'BONUS', minProficiency: 'BEGINNER' }
      ],
      suggestedModules: [
        { moduleId: 'mod-ts-adv', title: 'Full-Stack TypeScript & Express Architecture', skill: 'TypeScript', type: 'COURSE', duration: '12 hrs' },
        { moduleId: 'proj-campus-hub', title: 'Multi-Tenant Campus Event Platform', skill: 'React', type: 'PROJECT', duration: '20 hrs' },
        { moduleId: 'comp-hack-2026', title: 'National Web3 & Full Stack Hackathon', skill: 'REST APIs', type: 'COMPETITION', duration: '48 hrs' }
      ]
    },
    {
      roleId: 'role-ai-ml',
      roleTitle: 'AI & Machine Learning Engineer',
      category: 'Data & Artificial Intelligence',
      experienceLevel: 'Entry-Level',
      description: 'Designs, trains, and evaluates machine learning models, fine-tunes LLMs, and deploys intelligent inference pipelines.',
      requiredSkills: [
        { name: 'Python', importance: 'CRITICAL', minProficiency: 'ADVANCED' },
        { name: 'Machine Learning', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'PyTorch / TensorFlow', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'Data Structures & Algorithms', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'Vector Databases / RAG', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'SQL & Data Wrangling', importance: 'IMPORTANT', minProficiency: 'INTERMEDIATE' },
        { name: 'FastAPI / API Deployment', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'Model Evaluation & Safety', importance: 'BONUS', minProficiency: 'BEGINNER' }
      ],
      suggestedModules: [
        { moduleId: 'mod-py-ml', title: 'Applied Deep Learning & PyTorch in Practice', skill: 'PyTorch / TensorFlow', type: 'COURSE', duration: '18 hrs' },
        { moduleId: 'proj-rag-ai', title: 'Enterprise Document RAG Assistant with LangChain', skill: 'Vector Databases / RAG', type: 'PROJECT', duration: '25 hrs' },
        { moduleId: 'comp-ml-arena', title: 'Predictive Modeling & NLP AI Challenge', skill: 'Machine Learning', type: 'COMPETITION', duration: '36 hrs' }
      ]
    },
    {
      roleId: 'role-cloud-devops',
      roleTitle: 'Cloud & DevOps Platform Engineer',
      category: 'Cloud Infrastructure',
      experienceLevel: 'Entry-Level',
      description: 'Automates CI/CD deployment pipelines, manages containerized Kubernetes clusters, and guarantees high-availability cloud infrastructure.',
      requiredSkills: [
        { name: 'Linux & Shell Scripting', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'Docker & Containers', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'Kubernetes', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'CI/CD Pipelines (GitHub Actions)', importance: 'CRITICAL', minProficiency: 'INTERMEDIATE' },
        { name: 'AWS / GCP Basics', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'Terraform / IaC', importance: 'IMPORTANT', minProficiency: 'BEGINNER' },
        { name: 'Monitoring & Observability', importance: 'BONUS', minProficiency: 'BEGINNER' }
      ],
      suggestedModules: [
        { moduleId: 'mod-k8s', title: 'Zero-to-Hero Kubernetes & Helm Microservices', skill: 'Kubernetes', type: 'COURSE', duration: '15 hrs' },
        { moduleId: 'proj-cicd-iac', title: 'Automated Multi-Stage CI/CD with Terraform', skill: 'CI/CD Pipelines (GitHub Actions)', type: 'PROJECT', duration: '16 hrs' }
      ]
    }
  ];

  public getAllRoles(): RoleSkillBenchmark[] {
    return this.benchmarks;
  }

  public getRoleById(roleId: string): RoleSkillBenchmark | undefined {
    return this.benchmarks.find(r => r.roleId === roleId);
  }

  public analyzeGap(
    roleId: string,
    studentVerifiedSkills: Array<{ name: string; proficiency: string; verified: boolean }>
  ): SkillGapAnalysisResult {
    const role = this.getRoleById(roleId) || this.benchmarks[0];

    const studentSkillNames = new Set(studentVerifiedSkills.map(s => s.name.toLowerCase()));
    const matchedSkills: SkillGapAnalysisResult['matchedSkills'] = [];
    const missingSkills: SkillGapAnalysisResult['missingSkills'] = [];

    role.requiredSkills.forEach(req => {
      if (studentSkillNames.has(req.name.toLowerCase())) {
        const found = studentVerifiedSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
        matchedSkills.push({
          name: req.name,
          proficiency: found?.proficiency || 'INTERMEDIATE',
          verified: found?.verified || true
        });
      } else {
        missingSkills.push({
          name: req.name,
          importance: req.importance,
          prerequisites: req.prerequisites
        });
      }
    });

    const totalRequired = role.requiredSkills.length;
    const matchPercentage = totalRequired > 0 ? Math.round((matchedSkills.length / totalRequired) * 100) : 0;
    const learningWorkloadHours = missingSkills.length * 8; // Estimated 8 hrs structured practice per gap

    const recommendedActions: SkillGapAnalysisResult['recommendedActions'] = [];

    // Map missing skills to authentic catalog recommendations
    missingSkills.forEach(gap => {
      const mod = role.suggestedModules.find(m => m.skill.toLowerCase().includes(gap.name.toLowerCase()) || gap.name.toLowerCase().includes(m.skill.toLowerCase()));
      if (mod) {
        recommendedActions.push({
          type: mod.type,
          title: mod.title,
          skill: gap.name,
          link: mod.type === 'COURSE' ? '/learning' : mod.type === 'PROJECT' ? '/project-lab' : '/competitions',
          reason: `Required to bridge critical gap in ${gap.name} for ${role.roleTitle}.`
        });
      } else {
        recommendedActions.push({
          type: 'COURSE',
          title: `Master ${gap.name} Interactive Lab`,
          skill: gap.name,
          link: '/learning',
          reason: `Curated learning module to achieve verified status in ${gap.name}.`
        });
      }
    });

    return {
      role,
      matchedSkills,
      missingSkills,
      matchPercentage,
      learningWorkloadHours,
      recommendedActions,
      evaluatedAt: new Date().toISOString()
    };
  }
}

export const aiSkillGapDatabase = new AISkillGapDatabaseService();
