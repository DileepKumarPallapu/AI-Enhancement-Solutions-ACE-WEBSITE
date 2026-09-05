export interface DomainTaxonomy {
  id: string;
  name: string;
  icon: string;
  description: string;
  roles: RoleDefinition[];
}

export interface RoleDefinition {
  id: string;
  domainId: string;
  title: string;
  category: string;
  description: string;
  requiredLanguages: string[];
  alternativeLanguages?: string[];
  coreSkills: string[];
  advancedSkills: string[];
  prerequisites: string[];
  roadmapSequence: string[];
  projectIdeas: string[];
}

export const DOMAINS_TAXONOMY: DomainTaxonomy[] = [
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Machine Learning',
    icon: 'Brain',
    description: 'Statistical modeling, predictive algorithms, neural architectures, deep learning, and generative systems.',
    roles: [
      {
        id: 'ml-engineer',
        domainId: 'ai-ml',
        title: 'Machine Learning Engineer',
        category: 'AI / ML',
        description: 'Designs, develops, and deploys predictive mathematical models and scalable ML pipelines into production.',
        requiredLanguages: ['Python'],
        alternativeLanguages: ['C++', 'R'],
        coreSkills: ['Python', 'Linear Algebra & Calculus', 'Statistics & Probability', 'NumPy & Pandas', 'Data Preprocessing', 'Scikit-Learn', 'Model Evaluation & Tuning', 'Deep Learning Basics'],
        advancedSkills: ['PyTorch / TensorFlow', 'MLOps & CI/CD for ML', 'Docker & Kubernetes', 'Feature Store', 'Model Deployment (FastAPI/Triton)', 'Distributed Training'],
        prerequisites: ['Python Fundamentals', 'Basic High School Mathematics'],
        roadmapSequence: [
          'Python Programming Foundations',
          'Mathematics & Statistics for Machine Learning',
          'Data Wrangling with NumPy & Pandas',
          'Exploratory Data Analysis & Feature Engineering',
          'Supervised & Unsupervised Machine Learning',
          'Model Evaluation, Cross-Validation & Metrics',
          'Deep Learning with PyTorch',
          'MLOps, Model Packaging & Cloud Deployment',
          'Production End-to-End ML Capstone Project'
        ],
        projectIdeas: [
          'Student Academic Performance & Dropout Prediction System',
          'Real-Time Customer Churn Prediction Microservice with FastAPI',
          'Distributed Image Classification Model with PyTorch'
        ]
      },
      {
        id: 'data-scientist',
        domainId: 'ai-ml',
        title: 'Data Scientist',
        category: 'AI / ML',
        description: 'Transforms complex raw datasets into actionable predictive business intelligence through statistical modeling and machine learning.',
        requiredLanguages: ['Python', 'SQL'],
        alternativeLanguages: ['R'],
        coreSkills: ['Python', 'SQL Querying', 'Statistics & Hypothesis Testing', 'Pandas & NumPy', 'Data Visualization (Matplotlib/Seaborn)', 'Exploratory Data Analysis (EDA)', 'Machine Learning Algorithms', 'Business Storytelling'],
        advancedSkills: ['Time Series Forecasting', 'A/B Testing Frameworks', 'NLP Fundamentals', 'Big Data (PySpark)', 'Model Interpretability (SHAP/LIME)'],
        prerequisites: ['Python Fundamentals', 'SQL Basics'],
        roadmapSequence: [
          'Python for Data Science',
          'Relational Database Querying & SQL Joins',
          'Applied Statistics & Probability Distributions',
          'Data Cleaning & Wrangling with Pandas',
          'Data Storytelling with Seaborn & PowerBI',
          'Predictive Modeling with Scikit-Learn',
          'A/B Testing & Business Experimentation',
          'End-to-End Data Science Portfolio Project'
        ],
        projectIdeas: [
          'Collegiate Placement Salary & Placement Probability Predictor',
          'E-Commerce Customer Lifetime Value (CLV) & Churn Analysis',
          'A/B Testing Experiment Analysis for Web Event Conversions'
        ]
      },
      {
        id: 'genai-engineer',
        domainId: 'ai-ml',
        title: 'Generative AI & LLM Engineer',
        category: 'AI / ML',
        description: 'Builds intelligent agentic workflows, Retrieval-Augmented Generation (RAG) pipelines, and fine-tuned LLM applications.',
        requiredLanguages: ['Python'],
        coreSkills: ['Python', 'REST APIs', 'Prompt Engineering', 'Embeddings & Similarity Search', 'Vector Databases (Chroma/Pinecone)', 'LangChain / LlamaIndex', 'RAG Architecture'],
        advancedSkills: ['Fine-Tuning (LoRA/QLoRA)', 'Autonomous Agent Systems', 'LLM Evaluation & Guardrails', 'Token Optimization', 'Streaming APIs'],
        prerequisites: ['Python Foundations', 'Basic Machine Learning Concepts'],
        roadmapSequence: [
          'Python Foundations & Async APIs',
          'Transformer Architecture & LLM Fundamentals',
          'Prompt Engineering & Structured Outputs',
          'Embeddings & Vector Database Indexing',
          'Retrieval-Augmented Generation (RAG) Pipelines',
          'Multi-Agent Coordination Frameworks',
          'Evaluation, Guardrails & Production Deployment'
        ],
        projectIdeas: [
          'Autonomous Campus Knowledge Base RAG Assistant',
          'Multi-Agent Technical Code Review & Vulnerability Fixer',
          'Domain-Specific Legal & Academic Contract QA Engine'
        ]
      }
    ]
  },
  {
    id: 'web-dev',
    name: 'Web Development & Full Stack',
    icon: 'Globe',
    description: 'Modern client-side interfaces, server-side backends, relational databases, and cloud web architectures.',
    roles: [
      {
        id: 'frontend-developer',
        domainId: 'web-dev',
        title: 'Frontend Developer',
        category: 'Web',
        description: 'Engineers responsive, accessible, high-performance web applications using modern UI component frameworks.',
        requiredLanguages: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
        coreSkills: ['HTML5 & CSS3', 'JavaScript ES6+', 'DOM Manipulation', 'Git & GitHub', 'React.js Component Architecture', 'Tailwind CSS', 'State Management (Context/Zustand)', 'REST API Integration'],
        advancedSkills: ['Next.js / SSR', 'Performance Optimization (Lighthouse)', 'Web Accessibility (WCAG)', 'End-to-End Testing (Playwright)', 'Microfrontends'],
        prerequisites: ['Basic Computer Literacy'],
        roadmapSequence: [
          'HTML5 Semantic Markup & CSS3 Flexbox/Grid',
          'Modern JavaScript (ES6+, Async/Await, Fetch)',
          'Git Version Control & Collaboration',
          'React.js Components, Hooks & State Management',
          'TypeScript for Strict Component Typing',
          'Styling with Tailwind CSS & Design Systems',
          'API Data Fetching & Optimistic UI',
          'Production Web App Deployment'
        ],
        projectIdeas: [
          'Interactive College Event Registration Portal with Real-Time Filters',
          'Collaborative Task Kanban Board with Drag-and-Drop',
          'Developer Portfolio & Blog Platform with Markdown CMS'
        ]
      },
      {
        id: 'backend-developer',
        domainId: 'web-dev',
        title: 'Backend Developer',
        category: 'Web',
        description: 'Designs reliable REST/GraphQL APIs, manages database schemas, handles authentication, and ensures scalable server infrastructure.',
        requiredLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'],
        alternativeLanguages: ['C#', 'Rust'],
        coreSkills: ['Server Runtime (Node.js / Python / Java)', 'RESTful API Architecture', 'SQL & Relational Databases (PostgreSQL)', 'Authentication (JWT & OAuth2)', 'CRUD Business Logic', 'Git'],
        advancedSkills: ['Redis Caching', 'Message Brokers (RabbitMQ/Kafka)', 'Microservices Architecture', 'Database Indexing & Query Optimization', 'Docker Containerization'],
        prerequisites: ['Any 1 Programming Language'],
        roadmapSequence: [
          'Core Language Proficiency (Node.js/Python/Java)',
          'HTTP Protocol, Status Codes & REST API Design',
          'Relational Database Schema Design & SQL Queries',
          'Authentication, JWT Tokens & Role-Based Access Control',
          'Middleware, Error Handling & Request Validation',
          'Redis Caching & Background Task Queues',
          'Dockerizing Backend Services & Cloud Deployment'
        ],
        projectIdeas: [
          'High-Throughput Ticket Booking & Payment Processing API',
          'Real-Time Chat & Notification Server with WebSockets',
          'Multi-Tenant Role-Based Management System'
        ]
      },
      {
        id: 'fullstack-developer',
        domainId: 'web-dev',
        title: 'Full Stack Developer',
        category: 'Web',
        description: 'Builds complete end-to-end web applications bridging modern responsive client interfaces with robust backend database systems.',
        requiredLanguages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
        coreSkills: ['HTML5 & CSS3', 'JavaScript / TypeScript', 'React.js', 'Node.js / Express', 'SQL / PostgreSQL', 'REST APIs', 'Git', 'Authentication', 'Deployment'],
        advancedSkills: ['Next.js Full Stack Architecture', 'Docker', 'System Design Patterns', 'CI/CD Pipelines', 'Cloud Hosting (AWS/Vercel)'],
        prerequisites: ['Basic Computer Literacy'],
        roadmapSequence: [
          'HTML5 Semantic Layouts & CSS Responsive Design',
          'Modern JavaScript & TypeScript Fundamentals',
          'React.js Frontend Components & State Management',
          'Node.js & Express RESTful API Engineering',
          'Relational Database Schema Design with PostgreSQL',
          'Authentication, Security & Session Management',
          'End-to-End Capstone Full Stack Web Platform'
        ],
        projectIdeas: [
          'Complete Collegiate Ambassador & Event Ecosystem Platform',
          'E-Commerce Marketplace with Cart, Payments & Order Tracking',
          'Online Code Sandbox with Live Evaluation'
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Information Security',
    icon: 'ShieldCheck',
    description: 'Network defense, vulnerability assessments, security operations, log analysis, and ethical hacking.',
    roles: [
      {
        id: 'soc-analyst',
        domainId: 'cybersecurity',
        title: 'SOC & Security Analyst',
        category: 'Cybersecurity',
        description: 'Monitors enterprise security operations, investigates suspicious telemetry, analyzes attack logs, and mitigates security incidents.',
        requiredLanguages: ['Python', 'Bash'],
        coreSkills: ['Computer Networking (TCP/IP, DNS, OSI Model)', 'Linux OS Administration', 'Security Fundamentals & Threat Vectors', 'Log Analysis (Syslog/Auth logs)', 'SIEM Tools (Splunk/ELK/Wazuh)', 'Incident Response Lifecycle'],
        advancedSkills: ['Packet Inspection (Wireshark)', 'MITRE ATT&CK Mapping', 'Malware Analysis Basics', 'Cloud Security Monitoring', 'Threat Hunting'],
        prerequisites: ['Basic Computer Networking Knowledge'],
        roadmapSequence: [
          'Networking Fundamentals (TCP/IP, Routing, Subnets)',
          'Linux Command Line Administration & Permissions',
          'Information Security Fundamentals & OWASP Top 10',
          'Python & Bash Scripting for Security Automation',
          'Security Information & Event Management (SIEM) Operations',
          'Incident Triage, Root-Cause Analysis & Containment',
          'Hands-On SOC Blue Team Lab Investigation'
        ],
        projectIdeas: [
          'Automated SSH Brute Force Detection & Firewall Blocking Script',
          'Centralized Log Analysis & Alerting Dashboard with Wazuh/ELK',
          'Phishing Email Header Analysis & IoC Extraction Tool'
        ]
      }
    ]
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics & Business Intelligence',
    icon: 'TrendingUp',
    description: 'Data aggregation, cleaning, business metrics modeling, dashboard storytelling, and SQL reporting.',
    roles: [
      {
        id: 'data-analyst',
        domainId: 'data-analytics',
        title: 'Data Analyst',
        category: 'Data',
        description: 'Collects, cleans, and analyzes structured datasets to generate actionable commercial insights and executive KPI dashboards.',
        requiredLanguages: ['SQL', 'Python'],
        coreSkills: ['Excel / Advanced Spreadsheets', 'SQL Querying (Joins, Aggregations, Window Functions)', 'Data Cleaning & Wrangling', 'Python (Pandas & Matplotlib)', 'Power BI / Tableau Dashboarding', 'Business Metrics & KPI Modeling'],
        advancedSkills: ['Statistical Testing', 'Automated ETL Pipelines', 'Data Warehousing Basics', 'Stakeholder Presentations'],
        prerequisites: ['Basic Analytical & Numerical Aptitude'],
        roadmapSequence: [
          'Advanced Excel (Pivot Tables, XLOOKUP, Modeling)',
          'SQL Mastery (Multi-Table Joins, CTEs, Window Functions)',
          'Python for Data Cleaning & Pandas Analysis',
          'Business Intelligence Dashboarding with Power BI',
          'Exploratory Data Analysis on Real-World Datasets',
          'Executive KPI Presentation & Reporting Capstone'
        ],
        projectIdeas: [
          'Collegiate Event Attendance & Ticket Sales Executive Dashboard',
          'Retail Store Inventory Optimization & Sales Analysis',
          'Student Placement Success Factors Correlation Report'
        ]
      }
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud Computing & DevOps',
    icon: 'Cloud',
    description: 'Infrastructure automation, continuous integration/deployment, containerization, and cloud reliability.',
    roles: [
      {
        id: 'devops-engineer',
        domainId: 'cloud-devops',
        title: 'DevOps & Cloud Engineer',
        category: 'Cloud & Infrastructure',
        description: 'Automates deployment lifecycles, builds resilient CI/CD pipelines, manages Kubernetes clusters, and orchestrates cloud infrastructure.',
        requiredLanguages: ['Bash', 'Python', 'YAML'],
        coreSkills: ['Linux System Administration', 'Git Version Control', 'Docker Containerization', 'CI/CD Pipelines (GitHub Actions)', 'Cloud Fundamentals (AWS/GCP)', 'Infrastructure as Code (Terraform)'],
        advancedSkills: ['Kubernetes Orchestration', 'Prometheus & Grafana Monitoring', 'Service Mesh', 'Site Reliability Engineering (SRE)', 'Security in DevOps (DevSecOps)'],
        prerequisites: ['Linux Basics & Any 1 Programming Language'],
        roadmapSequence: [
          'Linux Administration, Shell Scripting & Networking',
          'Git Branching Strategies & Repository Automation',
          'Docker Container Architecture & Multi-Stage Builds',
          'Continuous Integration & Deployment with GitHub Actions',
          'AWS Cloud Core Services (EC2, S3, VPC, IAM)',
          'Infrastructure as Code using Terraform',
          'Kubernetes Cluster Deployment & Monitoring Setup'
        ],
        projectIdeas: [
          'Automated Multi-Environment CI/CD Deployment Pipeline for Web Apps',
          'Zero-Downtime Kubernetes Cluster Deployment with Monitoring',
          'Terraform Automated Cloud VPC & Secure Infrastructure Blueprint'
        ]
      }
    ]
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX & Product Design',
    icon: 'Layout',
    description: 'User research, wireframing, high-fidelity UI design, prototyping, design systems, and usability evaluation.',
    roles: [
      {
        id: 'product-designer',
        domainId: 'ui-ux-design',
        title: 'UI/UX & Product Designer',
        category: 'Design',
        description: 'Conducts user research, crafts intuitive interactive interfaces, develops scalable design systems, and tests usability.',
        requiredLanguages: [],
        coreSkills: ['Design Fundamentals (Color, Typography, Grids)', 'UX Research & User Personas', 'Information Architecture & User Flows', 'Wireframing & Lo-Fi Prototyping', 'Figma Mastery (Components, Auto Layout, Variants)', 'Interactive High-Fidelity Prototyping', 'Usability Testing'],
        advancedSkills: ['Design Systems Engineering', 'Micro-Interactions & Animation', 'Accessibility (WCAG)', 'Design-to-Code Handoff'],
        prerequisites: ['Creative & Empathetic Thinking'],
        roadmapSequence: [
          'Design Principles: Visual Hierarchy, Typography & Colors',
          'UX Research Methodologies, Interviews & User Personas',
          'Information Architecture & Low-Fidelity Wireframing',
          'Figma Deep Dive: Auto Layout, Components & Variants',
          'Interactive High-Fidelity Prototyping & Motion',
          'Usability Testing, Heuristic Evaluation & Iteration',
          'Design System Construction & Case Study Portfolio'
        ],
        projectIdeas: [
          'Complete Redesign of a College Campus Event & Ambassador App',
          'Fintech Student Savings & Micro-Investment Mobile App UI/UX',
          'Design System with 50+ Reusable Components & Guidelines'
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing & Growth',
    icon: 'Megaphone',
    description: 'Search engine optimization, performance advertising, content marketing, web analytics, and growth experimentation.',
    roles: [
      {
        id: 'seo-growth-specialist',
        domainId: 'digital-marketing',
        title: 'SEO & Growth Marketing Specialist',
        category: 'Marketing',
        description: 'Drives organic and paid traffic acquisition, optimizes search visibility, manages digital ad campaigns, and evaluates analytics.',
        requiredLanguages: ['HTML Basics'],
        coreSkills: ['Marketing Fundamentals & Funnel Strategy', 'Search Engine Optimization (SEO)', 'Keyword Research & Competitor Analysis', 'Content Marketing & Copywriting', 'Google Analytics 4 & Search Console', 'Social Media Campaign Management'],
        advancedSkills: ['Performance Ads (Meta/Google Ads)', 'A/B Conversion Rate Optimization (CRO)', 'Email Marketing Automation', 'Growth Hacking Loops'],
        prerequisites: ['Strong Written Communication'],
        roadmapSequence: [
          'Digital Marketing Fundamentals & Customer Journey Mapping',
          'On-Page & Technical SEO Optimization',
          'Keyword Research, Competitor Analysis & Content Strategy',
          'Web Analytics & Traffic Tracking with GA4',
          'Paid Advertising Campaigns & Ad Budget Optimization',
          'Conversion Rate Optimization (CRO) & A/B Testing',
          'Comprehensive Multi-Channel Growth Marketing Campaign'
        ],
        projectIdeas: [
          'Collegiate Hackathon Viral Marketing & 5,000-Registration Acquisition Campaign',
          'Complete Technical & Content SEO Audit for an E-Commerce Brand',
          'A/B Testing Landing Page Experiment Resulting in +35% Conversions'
        ]
      }
    ]
  }
];

export function getDomainById(domainId: string): DomainTaxonomy | undefined {
  return DOMAINS_TAXONOMY.find(d => d.id === domainId);
}

export function getRoleById(roleId: string): RoleDefinition | undefined {
  for (const d of DOMAINS_TAXONOMY) {
    const r = d.roles.find(r => r.id === roleId);
    if (r) return r;
  }
  return undefined;
}
