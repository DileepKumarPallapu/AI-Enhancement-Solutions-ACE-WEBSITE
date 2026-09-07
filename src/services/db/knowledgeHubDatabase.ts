export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: 'GUIDE' | 'FAQ' | 'CAREER' | 'LEARNING' | 'OPPORTUNITY';
  author: string;
  source: string;
  publishedDate: string;
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'k-1',
    title: 'How to Build an ATS-Optimized Technical Resume with ACE',
    slug: 'build-ats-technical-resume',
    category: 'CAREER',
    author: 'ACE Career Advisory Board',
    source: 'Official ACE Career Guide',
    publishedDate: '2026-09-01',
    readTime: '6 min read',
    summary: 'A step-by-step framework to format skills, verified projects, and competition credentials for automated recruiter scoring.',
    content: 'Modern engineering recruitment utilizes applicant tracking systems (ATS) that parse standard section headings...',
    tags: ['Resume', 'Career', 'ATS', 'Placements']
  },
  {
    id: 'k-2',
    title: 'ACE Digital Student ID & Campus QR Verification Guide',
    slug: 'digital-student-id-guide',
    category: 'GUIDE',
    author: 'Vel Tech Registrar Office & ACE Systems',
    source: 'Institutional Governance',
    publishedDate: '2026-08-15',
    readTime: '4 min read',
    summary: 'How cryptographic QR tokens protect student identity, event ticketing, and laboratory attendance.',
    content: 'Your ACE Digital ID contains a time-limited dynamic signature that prevents screenshot forgery...',
    tags: ['DigitalID', 'Security', 'Campus', 'VelTech']
  },
  {
    id: 'k-3',
    title: 'Understanding the 100 ACE Coins = ₹1 INR Economy',
    slug: 'ace-coins-economy-guide',
    category: 'FAQ',
    author: 'ACE Treasury & Rewards Team',
    source: 'Platform Policy',
    publishedDate: '2026-08-20',
    readTime: '3 min read',
    summary: 'Official rules regarding coin accrual from learning streaks, hackathon wins, and verified voucher redemption.',
    content: 'ACE maintains a fixed mathematical conversion rate: exactly 100 ACE Coins equals ₹1 INR...',
    tags: ['Wallet', 'Rewards', 'Economy', 'Policy']
  },
  {
    id: 'k-4',
    title: 'From Student Projects to High-Impact Industry Capstones',
    slug: 'student-projects-to-industry-capstones',
    category: 'LEARNING',
    author: 'Dr. S. Ramanathan, Vel Tech',
    source: 'Faculty Insights',
    publishedDate: '2026-09-03',
    readTime: '8 min read',
    summary: 'How to transition from tutorial clones to building production-ready distributed systems and open-source contributions.',
    content: 'Recruiters evaluate projects based on problem complexity, database indexing, automated unit tests, and live observability...',
    tags: ['Projects', 'Architecture', 'OpenSource', 'Engineering']
  }
];

export const knowledgeHubDatabase = {
  getAllArticles(): KnowledgeArticle[] {
    return KNOWLEDGE_ARTICLES;
  },

  getArticleBySlug(slug: string): KnowledgeArticle | undefined {
    return KNOWLEDGE_ARTICLES.find(a => a.slug === slug || a.id === slug);
  },

  searchArticles(query: string, category?: string): KnowledgeArticle[] {
    const q = query.toLowerCase().trim();
    return KNOWLEDGE_ARTICLES.filter(a => {
      const matchCat = !category || category === 'ALL' || a.category === category;
      const matchQuery = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }
};
