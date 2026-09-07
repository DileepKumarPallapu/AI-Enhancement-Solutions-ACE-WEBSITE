export interface GraphNode {
  id: string;
  label: string;
  type: 'STUDENT' | 'SKILL' | 'ROLE' | 'COURSE' | 'PROJECT' | 'COMPETITION' | 'INTERNSHIP' | 'JOB';
  data?: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'POSSESSES' | 'REQUIRES' | 'RECOMMENDS' | 'UNLOCKS' | 'LEADS_TO' | 'VERIFIES';
  weight: number;
}

export interface OpportunitySkillAnalysis {
  opportunityId: string;
  opportunityTitle: string;
  opportunityType: string;
  matchingSkills: string[];
  skillsToDevelop: string[];
  matchScore: number;
  recommendedCourses: { id: string; title: string; link: string; provider: string }[];
}

export const opportunityGraphDatabase = {
  getGraphForStudent(studentSkills: string[] = ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL']): { nodes: GraphNode[]; edges: GraphEdge[] } {
    const nodes: GraphNode[] = [
      { id: 'node-student', label: 'Dileep Kumar (Vel Tech)', type: 'STUDENT' },
      // Skills
      { id: 'skill-python', label: 'Python', type: 'SKILL' },
      { id: 'skill-ts', label: 'TypeScript', type: 'SKILL' },
      { id: 'skill-react', label: 'React', type: 'SKILL' },
      { id: 'skill-k8s', label: 'Kubernetes', type: 'SKILL' },
      { id: 'skill-docker', label: 'Docker', type: 'SKILL' },
      { id: 'skill-sql', label: 'PostgreSQL', type: 'SKILL' },
      // Roles
      { id: 'role-fullstack', label: 'Full Stack Engineer', type: 'ROLE' },
      { id: 'role-ai-eng', label: 'AI Platform Engineer', type: 'ROLE' },
      { id: 'role-cloud', label: 'Cloud Solutions Architect', type: 'ROLE' },
      // Courses
      { id: 'course-cloud-arch', label: 'Distributed Systems & Cloud Architecture', type: 'COURSE' },
      { id: 'course-ai-ops', label: 'Production MLOps & LLM Orchestration', type: 'COURSE' },
      // Projects
      { id: 'proj-ace-os', label: 'ACE Student Operating System Core', type: 'PROJECT' },
      // Competitions
      { id: 'comp-smart-india', label: 'National Smart Campus Hackathon', type: 'COMPETITION' },
      // Opportunities
      { id: 'opp-intern-cloud', label: 'Cloud Infrastructure Intern @ Vel Tech Labs', type: 'INTERNSHIP' },
      { id: 'opp-job-swe', label: 'Associate Software Engineer @ Zoho Chennai', type: 'JOB' }
    ];

    const edges: GraphEdge[] = [
      { id: 'e1', source: 'node-student', target: 'skill-python', relationship: 'POSSESSES', weight: 0.9 },
      { id: 'e2', source: 'node-student', target: 'skill-ts', relationship: 'POSSESSES', weight: 0.95 },
      { id: 'e3', source: 'node-student', target: 'skill-react', relationship: 'POSSESSES', weight: 0.9 },
      { id: 'e4', source: 'skill-ts', target: 'role-fullstack', relationship: 'REQUIRES', weight: 0.85 },
      { id: 'e5', source: 'skill-k8s', target: 'role-cloud', relationship: 'REQUIRES', weight: 0.9 },
      { id: 'e6', source: 'course-cloud-arch', target: 'skill-k8s', relationship: 'UNLOCKS', weight: 0.95 },
      { id: 'e7', source: 'role-fullstack', target: 'opp-intern-cloud', relationship: 'LEADS_TO', weight: 0.8 },
      { id: 'e8', source: 'proj-ace-os', target: 'skill-ts', relationship: 'VERIFIES', weight: 1.0 },
      { id: 'e9', source: 'comp-smart-india', target: 'role-ai-eng', relationship: 'LEADS_TO', weight: 0.75 }
    ];

    return { nodes, edges };
  },

  analyzeOpportunitySkills(
    opportunityId: string,
    opportunityTitle: string,
    opportunityType: string,
    requiredSkills: string[],
    studentSkills: string[]
  ): OpportunitySkillAnalysis {
    const studentSet = new Set(studentSkills.map(s => s.toLowerCase()));
    const matching: string[] = [];
    const missing: string[] = [];

    requiredSkills.forEach(req => {
      if (studentSet.has(req.toLowerCase())) {
        matching.push(req);
      } else {
        missing.push(req);
      }
    });

    const matchScore = requiredSkills.length > 0 ? Math.round((matching.length / requiredSkills.length) * 100) : 100;

    const recommendedCourses = missing.map((skill, idx) => ({
      id: `crs-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: `Mastering ${skill}: Production Hands-On Guide`,
      link: '/learn',
      provider: 'ACE Learning Hub & NPTEL'
    }));

    return {
      opportunityId,
      opportunityTitle,
      opportunityType,
      matchingSkills: matching,
      skillsToDevelop: missing,
      matchScore,
      recommendedCourses
    };
  }
};
