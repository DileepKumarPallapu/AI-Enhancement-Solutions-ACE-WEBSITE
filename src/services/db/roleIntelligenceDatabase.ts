export interface RoleProfile {
  id: string;
  title: string;
  category: 'ENGINEERING' | 'DATA_AI' | 'CLOUD_DEVOPS' | 'PRODUCT_DESIGN' | 'BUSINESS';
  overview: string;
  requiredSkills: string[];
  recommendedTechnologies: string[];
  averageSalaryIndia: string;
  learningPaths: { step: number; title: string; duration: string }[];
  suggestedProjects: string[];
  activeOpportunitiesCount: number;
}

export const ROLE_PROFILES: RoleProfile[] = [
  {
    id: 'role-swe',
    title: 'Software Engineer',
    category: 'ENGINEERING',
    overview: 'Designs, builds, and maintains robust, scalable software applications and services.',
    requiredSkills: ['Data Structures & Algorithms', 'System Design', 'Git', 'Clean Architecture', 'Unit Testing'],
    recommendedTechnologies: ['TypeScript', 'Python', 'Java', 'PostgreSQL', 'Docker'],
    averageSalaryIndia: '₹8.5L - ₹22L / annum',
    learningPaths: [
      { step: 1, title: 'Core Computer Science & Algorithmic Complexity', duration: '4 weeks' },
      { step: 2, title: 'Object-Oriented & Functional Software Design', duration: '3 weeks' },
      { step: 3, title: 'Distributed Systems & Database Internals', duration: '5 weeks' }
    ],
    suggestedProjects: ['High-throughput Distributed Task Queue', 'Real-time Event Streaming Pipeline'],
    activeOpportunitiesCount: 42
  },
  {
    id: 'role-fullstack',
    title: 'Full Stack Developer',
    category: 'ENGINEERING',
    overview: 'Engineers end-to-end web applications covering responsive client interfaces and high-performance server APIs.',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'REST & GraphQL', 'SQL / NoSQL', 'CI/CD'],
    recommendedTechnologies: ['Next.js', 'Express', 'Prisma', 'Tailwind CSS', 'Redis'],
    averageSalaryIndia: '₹7.5L - ₹18L / annum',
    learningPaths: [
      { step: 1, title: 'Advanced Frontend Architecture with React & TypeScript', duration: '3 weeks' },
      { step: 2, title: 'Microservices & Enterprise Backend with Node.js', duration: '4 weeks' },
      { step: 3, title: 'Full-Stack Deployment & Cloud Orchestration', duration: '3 weeks' }
    ],
    suggestedProjects: ['Multi-tenant SaaS Workspace with Stripe & RBAC', 'Collaborative Whiteboard Canvas'],
    activeOpportunitiesCount: 38
  },
  {
    id: 'role-ai-engineer',
    title: 'AI / ML Engineer',
    category: 'DATA_AI',
    overview: 'Develops, tunes, and deploys machine learning models and large language model autonomous systems.',
    requiredSkills: ['Python', 'PyTorch / TensorFlow', 'Vector Databases', 'Prompt Engineering', 'MLOps', 'Transformers'],
    recommendedTechnologies: ['LangChain', 'ChromaDB', 'Hugging Face', 'FastAPI', 'MLflow'],
    averageSalaryIndia: '₹10L - ₹28L / annum',
    learningPaths: [
      { step: 1, title: 'Linear Algebra, Probability & Applied Neural Networks', duration: '4 weeks' },
      { step: 2, title: 'LLM Fine-tuning & RAG Architectures', duration: '4 weeks' },
      { step: 3, title: 'Model Deployment, Quantization & Latency Optimization', duration: '3 weeks' }
    ],
    suggestedProjects: ['Multi-agent Autonomous Code Auditor', 'Semantic Search & Graph RAG Knowledge Engine'],
    activeOpportunitiesCount: 29
  },
  {
    id: 'role-cloud-devops',
    title: 'Cloud & DevOps Engineer',
    category: 'CLOUD_DEVOPS',
    overview: 'Builds automated infrastructure, deployment pipelines, container orchestration, and multi-region resilience.',
    requiredSkills: ['Linux Internals', 'Kubernetes', 'Docker', 'Terraform', 'AWS / GCP / Azure', 'Observability (Prometheus/Grafana)'],
    recommendedTechnologies: ['GitHub Actions', 'ArgoCD', 'Helm', 'Terraform', 'OpenTelemetry'],
    averageSalaryIndia: '₹9L - ₹24L / annum',
    learningPaths: [
      { step: 1, title: 'Cloud Networking, IAM & Zero-Trust Security', duration: '3 weeks' },
      { step: 2, title: 'Kubernetes Production Cluster Management', duration: '4 weeks' },
      { step: 3, title: 'GitOps Continuous Delivery & SRE Practices', duration: '3 weeks' }
    ],
    suggestedProjects: ['Multi-cluster Zero-Downtime Blue-Green Pipeline', 'Self-Healing Kubernetes Operator'],
    activeOpportunitiesCount: 24
  },
  {
    id: 'role-data-analyst',
    title: 'Data Analyst',
    category: 'DATA_AI',
    overview: 'Transforms raw organizational data into actionable executive insights, dashboards, and predictive forecasting.',
    requiredSkills: ['SQL', 'Power BI / Tableau', 'Python / R', 'Data Cleaning', 'Statistical Modeling'],
    recommendedTechnologies: ['Pandas', 'PostgreSQL', 'Snowflake', 'dbt', 'Excel Advanced'],
    averageSalaryIndia: '₹6L - ₹14L / annum',
    learningPaths: [
      { step: 1, title: 'Advanced SQL Query Optimization & Window Functions', duration: '3 weeks' },
      { step: 2, title: 'Exploratory Data Analysis with Pandas & Seaborn', duration: '3 weeks' },
      { step: 3, title: 'Executive BI Dashboards & Storytelling', duration: '2 weeks' }
    ],
    suggestedProjects: ['E-Commerce Cohort Retention & Churn Predictor', 'Institutional Placement Analytics Hub'],
    activeOpportunitiesCount: 31
  },
  {
    id: 'role-cybersecurity',
    title: 'Cybersecurity Engineer',
    category: 'ENGINEERING',
    overview: 'Protects enterprise systems, networks, and applications against vulnerabilities, malware, and intrusions.',
    requiredSkills: ['Penetration Testing', 'Network Security', 'OWASP Top 10', 'Cryptography', 'SIEM & SOC Operations'],
    recommendedTechnologies: ['Wireshark', 'Burp Suite', 'Metasploit', 'Kali Linux', 'Snort'],
    averageSalaryIndia: '₹8L - ₹20L / annum',
    learningPaths: [
      { step: 1, title: 'Network Protocols & Threat Modeling', duration: '3 weeks' },
      { step: 2, title: 'Application Security & Web Exploits', duration: '4 weeks' },
      { step: 3, title: 'Incident Response & Defensive Hardening', duration: '3 weeks' }
    ],
    suggestedProjects: ['Automated Vulnerability Scanner & Alert Bot', 'Zero-Knowledge Cryptographic Vault'],
    activeOpportunitiesCount: 18
  },
  {
    id: 'role-uiux-designer',
    title: 'UI/UX Designer & Product Designer',
    category: 'PRODUCT_DESIGN',
    overview: 'Researches, prototypes, and designs intuitive, accessible user interfaces and modern design systems.',
    requiredSkills: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Accessibility (WCAG)', 'Micro-interactions'],
    recommendedTechnologies: ['Figma', 'Framer', 'FigJam', 'Tokens Studio', 'Storybook'],
    averageSalaryIndia: '₹6.5L - ₹16L / annum',
    learningPaths: [
      { step: 1, title: 'Visual Hierarchy, Typography & Design Tokens', duration: '2 weeks' },
      { step: 2, title: 'User Journey Mapping & Usability Testing', duration: '3 weeks' },
      { step: 3, title: 'Design System Engineering for Web & Mobile', duration: '3 weeks' }
    ],
    suggestedProjects: ['Global Fintech Mobile Design System', 'Campus Opportunity Finder UI/UX Case Study'],
    activeOpportunitiesCount: 22
  },
  {
    id: 'role-product-manager',
    title: 'Associate Product Manager',
    category: 'PRODUCT_DESIGN',
    overview: 'Defines product roadmaps, prioritizes feature backlogs, conducts market discovery, and aligns engineering with business.',
    requiredSkills: ['Product Strategy', 'Roadmapping', 'Agile / Scrum', 'User Interviews', 'Data-Driven Decision Making'],
    recommendedTechnologies: ['Jira', 'Notion', 'Mixpanel', 'Linear', 'Amplitude'],
    averageSalaryIndia: '₹9L - ₹22L / annum',
    learningPaths: [
      { step: 1, title: 'Product Discovery & Opportunity Solution Trees', duration: '3 weeks' },
      { step: 2, title: 'Metrics, OKRs & Product Analytics', duration: '3 weeks' },
      { step: 3, title: 'Go-To-Market & Stakeholder Alignment', duration: '2 weeks' }
    ],
    suggestedProjects: ['0-to-1 Campus Mentorship App PRD & Launch Plan', 'Feature Adoption Retention Experiment'],
    activeOpportunitiesCount: 15
  }
];

export const roleIntelligenceDatabase = {
  getAllRoles(): RoleProfile[] {
    return ROLE_PROFILES;
  },

  getRoleById(id: string): RoleProfile | undefined {
    return ROLE_PROFILES.find(r => r.id === id || r.id === `role-${id}`);
  }
};
