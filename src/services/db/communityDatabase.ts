// ACE Community Discussions & Networking Database Layer

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorCollege: string;
  authorAvatar?: string;
  content: string;
  upvotes: string[]; // user IDs who upvoted
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorCollege: string;
  authorAvatar?: string;
  category: 'DISCUSSION' | 'TEAMMATE_SEARCH' | 'PROJECT_FEEDBACK' | 'ANNOUNCEMENT' | 'QUESTION';
  title: string;
  content: string;
  tags: string[];
  upvotes: string[]; // user IDs
  comments: CommunityComment[];
  isPinned?: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  POSTS: 'ace_community_posts_v2'
};

const SEED_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'usr_student_subhani',
    authorName: 'Subhani S (CSE 3rd Year)',
    authorRole: 'Student Developer',
    authorCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    category: 'TEAMMATE_SEARCH',
    title: 'Looking for 1 more teammate for HACKVERSE 2.0 (React/FastAPI)',
    content: 'We have 3 members focusing on autonomous agent pipelines and need a frontend enthusiast familiar with Tailwind & React 19 to join our team for the 36-hour sprint!',
    tags: ['Hackathon', 'React', 'FastAPI', 'TeamFormation'],
    upvotes: ['usr_student_dileep', 'usr_mentor_arun', 'usr-std-3'],
    comments: [
      {
        id: 'comm-1-1',
        postId: 'post-1',
        authorId: 'usr_student_dileep',
        authorName: 'Dileep Kumar',
        authorRole: 'Student',
        authorCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        content: 'Hey Subhani! Count me in. I specialize in React UI design and agentic hooks.',
        upvotes: ['usr_student_subhani'],
        createdAt: '2026-09-02T10:15:00Z'
      }
    ],
    isPinned: true,
    createdAt: '2026-09-02T08:30:00Z',
    updatedAt: '2026-09-02T10:15:00Z'
  },
  {
    id: 'post-2',
    authorId: 'usr_student_geeresh',
    authorName: 'Geeresh P (IT 4th Year)',
    authorRole: 'Campus Ambassador',
    authorCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    category: 'ANNOUNCEMENT',
    title: 'NEXORA 2K26 Paper presentation tracks & guidelines published!',
    content: 'The official tracks on Edge Computing and Autonomous Vision systems are now live on ACE with Scopus indexing. Make sure to submit abstracts before Oct 5th.',
    tags: ['Symposium', 'Research', 'Scopus', 'PaperPresentation'],
    upvotes: ['usr_student_dileep', 'usr_mentor_arun'],
    comments: [],
    createdAt: '2026-09-02T04:20:00Z',
    updatedAt: '2026-09-02T04:20:00Z'
  }
];

class CommunityDatabase {
  private posts: CommunityPost[] = [];

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEYS.POSTS);
      this.posts = raw ? JSON.parse(raw) : SEED_POSTS;
    } catch (e) {
      console.error('[CommunityDatabase] Hydration error:', e);
      this.posts = SEED_POSTS;
    }
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(this.posts));
    }
  }

  public getPosts(): CommunityPost[] {
    return [...this.posts].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  public getPostById(id: string): CommunityPost | undefined {
    return this.posts.find(p => p.id === id);
  }

  public createPost(post: Omit<CommunityPost, 'id' | 'upvotes' | 'comments' | 'createdAt' | 'updatedAt'>): CommunityPost {
    const now = new Date().toISOString();
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      upvotes: [],
      comments: [],
      createdAt: now,
      updatedAt: now
    };
    this.posts.unshift(newPost);
    this.persist();
    return newPost;
  }

  public deletePost(id: string, userId: string): boolean {
    const post = this.posts.find(p => p.id === id);
    if (!post) return false;
    if (post.authorId !== userId && userId !== 'usr_admin') {
      return false;
    }
    this.posts = this.posts.filter(p => p.id !== id);
    this.persist();
    return true;
  }

  public toggleUpvote(postId: string, userId: string): { upvoted: boolean; count: number } {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return { upvoted: false, count: 0 };

    let upvoted = false;
    if (post.upvotes.includes(userId)) {
      post.upvotes = post.upvotes.filter(id => id !== userId);
      upvoted = false;
    } else {
      post.upvotes.push(userId);
      upvoted = true;
    }
    this.persist();
    return { upvoted, count: post.upvotes.length };
  }

  public addComment(postId: string, comment: Omit<CommunityComment, 'id' | 'postId' | 'upvotes' | 'createdAt'>): CommunityComment | null {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const now = new Date().toISOString();
    const newComment: CommunityComment = {
      ...comment,
      id: `comm-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      postId,
      upvotes: [],
      createdAt: now
    };

    post.comments.push(newComment);
    post.updatedAt = now;
    this.persist();
    return newComment;
  }

  public toggleCommentUpvote(postId: string, commentId: string, userId: string): boolean {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return false;
    const comment = post.comments.find(c => c.id === commentId);
    if (!comment) return false;

    let upvoted = false;
    if (comment.upvotes.includes(userId)) {
      comment.upvotes = comment.upvotes.filter(id => id !== userId);
      upvoted = false;
    } else {
      comment.upvotes.push(userId);
      upvoted = true;
    }
    this.persist();
    return upvoted;
  }
}

export const communityDb = new CommunityDatabase();
