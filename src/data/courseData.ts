export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  category: 'Web Development' | 'Data Science & AI' | 'Programming' | 'Computer Science' | 'Cloud & DevOps' | 'Career Skills';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  estimatedHours: number;
  rating: number;
  instructor: string;
  institution: string;
  description: string;
  skillsCovered: string[];
  prerequisites: string[];
  careerTargets: string[];
  modulesCount: number;
  enrolledCount: number;
  image?: string;
  roadmapSteps: string[];
  matchReasons?: string[];
}

export const COURSES_CATALOG: CourseItem[] = [
  {
    id: 'course-react-fullstack',
    slug: 'modern-react-fullstack-mastery',
    title: 'Modern React & Full Stack Architecture',
    category: 'Web Development',
    level: 'Intermediate',
    durationWeeks: 8,
    estimatedHours: 45,
    rating: 4.9,
    instructor: 'Dr. A. Ramanathan',
    institution: 'ACE Center for Advanced Web Technologies',
    description: 'Master component architecture, hooks, state management, RESTful APIs, and full stack deployment with Node.js and PostgreSQL.',
    skillsCovered: ['React.js', 'JavaScript ES6+', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL'],
    prerequisites: ['JavaScript Fundamentals', 'HTML & CSS'],
    careerTargets: ['Full Stack Developer', 'Frontend Engineer', 'Web Application Architect'],
    modulesCount: 12,
    enrolledCount: 1420,
    roadmapSteps: [
      'ES6+ Features & Async JS',
      'React Components & JSX Architecture',
      'Hooks (useState, useEffect, useMemo)',
      'State Management & Context API',
      'Routing & Authentication',
      'Connecting REST APIs & Databases',
      'End-to-End Capstone Project'
    ],
    matchReasons: [
      'Builds on your completed JavaScript foundation',
      'Core prerequisite for Full Stack Developer careers',
      'Fills a high-priority frontend component skill gap',
      'Includes practical capstone projects for placement portfolios'
    ]
  },
  {
    id: 'course-python-ai',
    slug: 'python-data-science-ai-essentials',
    title: 'Python for AI, Machine Learning & Data Science',
    category: 'Data Science & AI',
    level: 'Beginner',
    durationWeeks: 10,
    estimatedHours: 55,
    rating: 4.8,
    instructor: 'Prof. Sneha Verma',
    institution: 'ACE AI Research Initiative',
    description: 'From Python syntax and data wrangling with Pandas/NumPy to building predictive machine learning models and neural networks.',
    skillsCovered: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'Machine Learning', 'Data Visualization'],
    prerequisites: ['Basic High School Math'],
    careerTargets: ['AI/ML Engineer', 'Data Scientist', 'Data Analyst'],
    modulesCount: 14,
    enrolledCount: 2100,
    roadmapSteps: [
      'Python Data Types & Control Flow',
      'Data Manipulation with NumPy & Pandas',
      'Exploratory Data Analysis & Matplotlib',
      'Supervised Learning (Regression & Classification)',
      'Unsupervised Learning (Clustering)',
      'Model Evaluation & Hyperparameter Tuning',
      'Deploying AI Models with Streamlit'
    ],
    matchReasons: [
      'Best entry path into Artificial Intelligence and Data Science',
      'High industry demand across analytics and AI careers',
      'Hands-on Jupyter notebook coding assessments'
    ]
  },
  {
    id: 'course-dsa-interviews',
    slug: 'mastering-data-structures-algorithms-dsa',
    title: 'Data Structures & Algorithms (Interview Prep)',
    category: 'Computer Science',
    level: 'Intermediate',
    durationWeeks: 12,
    estimatedHours: 70,
    rating: 4.95,
    instructor: 'K. Venkatesh (Ex-FAANG Lead)',
    institution: 'ACE Competitive Programming Chapter',
    description: 'In-depth problem-solving across Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and System Design patterns.',
    skillsCovered: ['DSA', 'Algorithms', 'Time Complexity', 'Recursion', 'Dynamic Programming', 'Trees & Graphs'],
    prerequisites: ['Any 1 Language (Python, Java, C++, or JS)'],
    careerTargets: ['Software Development Engineer (SDE-1)', 'Systems Engineer', 'Product Engineer'],
    modulesCount: 16,
    enrolledCount: 3400,
    roadmapSteps: [
      'Asymptotic Analysis (Big-O, Big-Theta)',
      'Arrays, Two-Pointers & Sliding Window',
      'Linked Lists, Stacks & Queues',
      'Binary Trees & Binary Search Trees',
      'Heaps & Priority Queues',
      'Graph Traversals (BFS, DFS, Dijkstra)',
      'Dynamic Programming & Memoization'
    ],
    matchReasons: [
      'Mandatory foundation for technical placement coding rounds',
      'Directly boosts your score in ACE Coding Arcade & Competitions',
      'Covers 150+ standard interview problem patterns'
    ]
  },
  {
    id: 'course-sql-database',
    slug: 'relational-database-design-sql-mastery',
    title: 'Relational Database Design & Advanced SQL',
    category: 'Computer Science',
    level: 'Beginner',
    durationWeeks: 6,
    estimatedHours: 30,
    rating: 4.75,
    instructor: 'M. Sundar',
    institution: 'ACE Database Engineering Lab',
    description: 'Learn SQL querying, multi-table joins, subqueries, indexing, transactions, and normalization from scratch.',
    skillsCovered: ['SQL', 'PostgreSQL', 'Database Design', 'Indexing', 'Transactions (ACID)', 'Query Optimization'],
    prerequisites: ['None'],
    careerTargets: ['Backend Developer', 'Database Administrator', 'Data Analyst'],
    modulesCount: 8,
    enrolledCount: 1150,
    roadmapSteps: [
      'Relational Database Concepts & Relational Algebra',
      'Basic Queries (SELECT, WHERE, ORDER BY, LIMIT)',
      'Multi-Table Joins (INNER, LEFT, RIGHT, FULL)',
      'Aggregate Functions & GROUP BY / HAVING',
      'Subqueries & Common Table Expressions (CTEs)',
      'Schema Normalization (1NF to 3NF)',
      'Indexing & Query Execution Plans'
    ],
    matchReasons: [
      'Fills the #1 most common backend skill gap',
      'Practical schema playground with real SQL queries',
      'Essential for both software development and data careers'
    ]
  }
];
