// ACE Student Project Showcase Database Layer

export interface PersistentProject {
  id: string;
  userId: string;
  authorName: string;
  authorCollege: string;
  authorAvatar?: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI_ML' | 'WEB_MOBILE' | 'BLOCKCHAIN' | 'IOT_HARDWARE' | 'CYBERSECURITY' | 'OPEN_SOURCE';
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  videoUrl?: string;
  coverImage: string;
  upvotes: string[]; // userIds
  collaborators: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  PROJECTS: 'ace_persistent_projects_v2',
  DRAFTS: 'ace_project_drafts_v2'
};

const SEED_PROJECTS: PersistentProject[] = [
  {
    id: 'proj-1',
    userId: 'usr_student_dileep',
    authorName: 'Dileep Kumar',
    authorCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    title: 'Autonomous Multi-Agent Task Orchestrator',
    tagline: 'High-throughput LLM runtime for coordinating developer workflows with local tools',
    description: 'An open-source multi-agent coordinator implementing react loop heuristics, automatic error backoff, and distributed subagent execution pipelines.',
    category: 'AI_ML',
    techStack: ['TypeScript', 'FastAPI', 'React 19', 'TailwindCSS', 'IndexedDB'],
    githubUrl: 'https://github.com/dileep/agent-orchestrator',
    liveDemoUrl: 'https://orchestrator-demo.allcollegeevent.com',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    upvotes: ['usr_mentor_arun', 'usr_student_subhani'],
    collaborators: ['Subhani S'],
    isPublished: true,
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-09-02T12:00:00Z'
  },
  {
    id: 'proj-2',
    userId: 'usr_student_dileep',
    authorName: 'Dileep Kumar',
    authorCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    title: 'Campus Event Ledger & Smart Ticket Pass',
    tagline: 'Cryptographic offline verification for college symposium tickets and attendance',
    description: 'Enables event organizers to scan tickets without active internet connectivity using QR payload signing.',
    category: 'CYBERSECURITY',
    techStack: ['React', 'WebCrypto', 'TailwindCSS'],
    githubUrl: 'https://github.com/dileep/ticket-pass',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    upvotes: ['usr_mentor_arun'],
    collaborators: [],
    isPublished: true,
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-25T11:00:00Z'
  }
];

class ProjectDatabase {
  private projects: PersistentProject[] = [];
  private drafts: Record<string, Partial<PersistentProject>> = {};

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      this.projects = raw ? JSON.parse(raw) : SEED_PROJECTS;

      const rawDrafts = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      this.drafts = rawDrafts ? JSON.parse(rawDrafts) : {};
    } catch (e) {
      console.error('[ProjectDatabase] Hydration error:', e);
      this.projects = SEED_PROJECTS;
    }
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(this.projects));
    }
  }

  private persistDrafts() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(this.drafts));
    }
  }

  public getProjects(): PersistentProject[] {
    return this.projects.filter(p => p.isPublished);
  }

  public getAllProjects(): PersistentProject[] {
    return [...this.projects];
  }

  public getUserProjects(userId: string): PersistentProject[] {
    return this.projects.filter(p => p.userId === userId);
  }

  public getProjectById(id: string): PersistentProject | undefined {
    return this.projects.find(p => p.id === id);
  }

  public saveProject(project: Omit<PersistentProject, 'id' | 'upvotes' | 'createdAt' | 'updatedAt'> & { id?: string }): PersistentProject {
    const now = new Date().toISOString();
    if (project.id) {
      const idx = this.projects.findIndex(p => p.id === project.id);
      if (idx >= 0) {
        const updated: PersistentProject = {
          ...this.projects[idx],
          ...project,
          updatedAt: now
        };
        this.projects[idx] = updated;
        this.persist();
        return updated;
      }
    }

    const newId = project.id || `proj-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newProject: PersistentProject = {
      ...project,
      id: newId,
      upvotes: [],
      createdAt: now,
      updatedAt: now
    };
    this.projects.unshift(newProject);
    this.persist();
    return newProject;
  }

  public deleteProject(id: string, userId: string): boolean {
    const initialLen = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id || (p.userId !== userId && userId !== 'usr_admin'));
    if (this.projects.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  public toggleUpvote(projectId: string, userId: string): { upvoted: boolean; count: number } {
    const proj = this.projects.find(p => p.id === projectId);
    if (!proj) return { upvoted: false, count: 0 };

    let upvoted = false;
    if (proj.upvotes.includes(userId)) {
      proj.upvotes = proj.upvotes.filter(id => id !== userId);
      upvoted = false;
    } else {
      proj.upvotes.push(userId);
      upvoted = true;
    }
    this.persist();
    return { upvoted, count: proj.upvotes.length };
  }

  public saveDraft(userId: string, data: Partial<PersistentProject>): void {
    this.drafts[userId] = { ...data, updatedAt: new Date().toISOString() };
    this.persistDrafts();
  }

  public getDraft(userId: string): Partial<PersistentProject> | null {
    return this.drafts[userId] || null;
  }

  public clearDraft(userId: string): void {
    delete this.drafts[userId];
    this.persistDrafts();
  }
}

export const projectDb = new ProjectDatabase();
