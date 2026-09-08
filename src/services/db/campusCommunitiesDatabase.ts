// ACE 90X Campus Communities 2.0 & Club Management Database
// Supports multi-type communities (College, Dept, Club, Skill, Career, Tech), Posts, Polls, and Moderation

export type CommunityPrivacy = 'PUBLIC' | 'INSTITUTION_ONLY' | 'PRIVATE';

export interface CommunityPollOption {
  id: string;
  text: string;
  voteCount: number;
  voterIds: string[];
}

export interface CommunityPoll {
  id: string;
  question: string;
  options: CommunityPollOption[];
  totalVotes: number;
  expiresAt: string;
  hasVoted?: boolean;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  content: string;
  upvotes: number;
  upvoterIds: string[];
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  communityName: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRoleBadge?: string;
  category: 'ANNOUNCEMENT' | 'DISCUSSION' | 'EVENT' | 'PROJECT_SHOWCASE' | 'POLL' | 'ACHIEVEMENT';
  title: string;
  content: string;
  tags: string[];
  poll?: CommunityPoll;
  upvotes: number;
  upvoterIds: string[];
  commentCount: number;
  comments: CommunityComment[];
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
}

export interface CampusCommunity {
  id: string;
  slug: string;
  name: string;
  category: 'COLLEGE' | 'DEPARTMENT' | 'CLUB' | 'SKILL' | 'CAREER' | 'COMPETITION' | 'TECHNOLOGY' | 'INTEREST';
  institutionId: string;
  institutionName: string;
  description: string;
  iconUrl: string;
  bannerUrl: string;
  privacy: CommunityPrivacy;
  rules: string[];
  moderatorIds: string[];
  memberCount: number;
  isMember: boolean;
  postCount: number;
  createdAt: string;
}

const COMMUNITIES_STORAGE = 'ace_db_campus_communities_v90';
const POSTS_STORAGE = 'ace_db_community_posts_v90';

class CampusCommunitiesDatabase {
  private communities: Map<string, CampusCommunity> = new Map();
  private posts: Map<string, CommunityPost[]> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
    if (this.communities.size === 0) {
      this.seedInitial();
    }
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawComm = localStorage.getItem(COMMUNITIES_STORAGE);
        if (rawComm) {
          const comms: CampusCommunity[] = JSON.parse(rawComm);
          comms.forEach(c => this.communities.set(c.id, c));
        }
        const rawPosts = localStorage.getItem(POSTS_STORAGE);
        if (rawPosts) {
          const mapData: Record<string, CommunityPost[]> = JSON.parse(rawPosts);
          Object.entries(mapData).forEach(([k, v]) => this.posts.set(k, v));
        }
      }
    } catch (e) {
      console.warn('Failed to load communities storage', e);
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(COMMUNITIES_STORAGE, JSON.stringify(Array.from(this.communities.values())));
        const mapObj: Record<string, CommunityPost[]> = {};
        this.posts.forEach((pList, commId) => {
          mapObj[commId] = pList;
        });
        localStorage.setItem(POSTS_STORAGE, JSON.stringify(mapObj));
      }
      this.listeners.forEach(fn => fn());
    } catch (e) {
      console.warn('Failed to save communities storage', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private seedInitial() {
    const seedComms: CampusCommunity[] = [
      {
        id: 'comm_veltech_cse',
        slug: 'veltech-cse-hub',
        name: 'Vel Tech Computer Science & Engineering',
        category: 'DEPARTMENT',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        description: 'Official department forum for CSE students, research symposiums, coding challenges & placement prep.',
        iconUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150',
        bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000',
        privacy: 'INSTITUTION_ONLY',
        rules: ['Be respectful and academic', 'No plagiarism or leaked question papers', 'Share authentic project code'],
        moderatorIds: ['mentor_dr_aravind', 'usr_student_dileep'],
        memberCount: 840,
        isMember: true,
        postCount: 124,
        createdAt: '2026-01-01T00:00:00Z'
      },
      {
        id: 'comm_ai_research_lab',
        slug: 'ai-autonomous-agents',
        name: 'Autonomous AI Agents & ML Lab',
        category: 'TECHNOLOGY',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        description: 'Collaborative development space for LLM agent frameworks, MCP tools, and multi-agent coordination.',
        iconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
        bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000',
        privacy: 'PUBLIC',
        rules: ['Open Source first', 'Cite research papers', 'Benchmark with realistic datasets'],
        moderatorIds: ['usr_student_dileep'],
        memberCount: 420,
        isMember: true,
        postCount: 68,
        createdAt: '2026-01-15T00:00:00Z'
      },
      {
        id: 'comm_sih_hackathons',
        slug: 'sih-hackathon-champions',
        name: 'Smart India Hackathon & Competitions Chapter',
        category: 'COMPETITION',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        description: 'Team formation, problem statement ideation, and faculty mentoring for national collegiate hackathons.',
        iconUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
        bannerUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000',
        privacy: 'INSTITUTION_ONLY',
        rules: ['Strictly authentic submissions', 'Respect teammate commitments'],
        moderatorIds: ['usr_student_priya', 'usr_student_dileep'],
        memberCount: 510,
        isMember: true,
        postCount: 92,
        createdAt: '2026-01-20T00:00:00Z'
      }
    ];

    seedComms.forEach(c => this.communities.set(c.id, c));

    const seedPosts: CommunityPost[] = [
      {
        id: 'post_1',
        communityId: 'comm_veltech_cse',
        communityName: 'Vel Tech Computer Science & Engineering',
        authorId: 'mentor_dr_aravind',
        authorName: 'Dr. Aravind Swaminathan',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        authorRoleBadge: 'Faculty Lead',
        category: 'ANNOUNCEMENT',
        title: '📢 Vel Tech CSE Annual Innovation Day 2026 Registration Open',
        content: 'All 3rd and final year CSE students must submit their capstone prototypes by March 25. Top 3 projects will receive direct incubation support and cash prize grants of ₹50,000.',
        tags: ['InnovationDay', 'Capstone', 'Incubation'],
        upvotes: 48,
        upvoterIds: ['usr_student_dileep', 'usr_student_priya', 'usr_student_karthik'],
        commentCount: 2,
        comments: [
          {
            id: 'cmt_1',
            postId: 'post_1',
            authorId: 'usr_student_dileep',
            authorName: 'Dileep Kumar',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            authorBadge: 'CSE Student',
            content: 'Our team NeuralCore is submitting our Autonomous Verification Engine. Looking forward to the symposium!',
            upvotes: 6,
            upvoterIds: ['mentor_dr_aravind'],
            createdAt: '2026-03-02T11:00:00Z'
          }
        ],
        isPinned: true,
        isLocked: false,
        createdAt: '2026-03-02T09:00:00Z'
      },
      {
        id: 'post_2',
        communityId: 'comm_ai_research_lab',
        communityName: 'Autonomous AI Agents & ML Lab',
        authorId: 'usr_student_dileep',
        authorName: 'Dileep Kumar',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        authorRoleBadge: 'Community Lead',
        category: 'POLL',
        title: '📊 Poll: Preferred LLM Orchestration Framework for Campus Hackathon',
        content: 'We are organizing a 48-hour hands-on agent building workshop. Vote for the framework you want featured in the deep dive.',
        tags: ['AIAgents', 'Frameworks', 'Workshop'],
        poll: {
          id: 'poll_1',
          question: 'Which framework should we prioritize for the live demo?',
          options: [
            { id: 'opt_1', text: 'LangGraph & LangChain', voteCount: 64, voterIds: ['usr_student_priya'] },
            { id: 'opt_2', text: 'AutoGen / Semantic Kernel', voteCount: 42, voterIds: [] },
            { id: 'opt_3', text: 'Custom FastMCP & Deepmind SDK', voteCount: 88, voterIds: ['usr_student_karthik'] }
          ],
          totalVotes: 194,
          expiresAt: '2026-03-20T18:00:00Z',
          hasVoted: false
        },
        upvotes: 35,
        upvoterIds: ['usr_student_priya'],
        commentCount: 4,
        comments: [],
        isPinned: false,
        isLocked: false,
        createdAt: '2026-03-04T14:20:00Z'
      }
    ];

    this.posts.set('comm_veltech_cse', [seedPosts[0]]);
    this.posts.set('comm_ai_research_lab', [seedPosts[1]]);
    this.posts.set('comm_sih_hackathons', []);
    this.saveToStorage();
  }

  public getAllCommunities(): CampusCommunity[] {
    return Array.from(this.communities.values());
  }

  public getCommunityById(id: string): CampusCommunity | undefined {
    return this.communities.get(id);
  }

  public getPostsByCommunity(communityId: string): CommunityPost[] {
    return this.posts.get(communityId) || [];
  }

  public getAllPosts(): CommunityPost[] {
    const list: CommunityPost[] = [];
    this.posts.forEach(p => list.push(...p));
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public createPost(communityId: string, title: string, content: string, category: CommunityPost['category'], tags: string[] = []): CommunityPost {
    const comm = this.communities.get(communityId);
    if (!comm) throw new Error('Community not found');

    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      communityId,
      communityName: comm.name,
      authorId: 'usr_student_dileep',
      authorName: 'Dileep Kumar',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      authorRoleBadge: 'Student Member',
      category,
      title,
      content,
      tags,
      upvotes: 1,
      upvoterIds: ['usr_student_dileep'],
      commentCount: 0,
      comments: [],
      isPinned: false,
      isLocked: false,
      createdAt: new Date().toISOString()
    };

    const current = this.posts.get(communityId) || [];
    current.unshift(newPost);
    this.posts.set(communityId, current);

    comm.postCount += 1;
    this.communities.set(comm.id, comm);

    this.saveToStorage();
    return newPost;
  }

  public votePoll(communityId: string, postId: string, optionId: string, voterId: string = 'usr_student_dileep'): boolean {
    const list = this.posts.get(communityId) || [];
    const post = list.find(p => p.id === postId);
    if (!post || !post.poll) return false;

    // Check duplicate vote
    const alreadyVoted = post.poll.options.some(opt => opt.voterIds.includes(voterId));
    if (alreadyVoted) return false;

    const opt = post.poll.options.find(o => o.id === optionId);
    if (!opt) return false;

    opt.voteCount += 1;
    opt.voterIds.push(voterId);
    post.poll.totalVotes += 1;
    if (voterId === 'usr_student_dileep') {
      post.poll.hasVoted = true;
    }

    this.saveToStorage();
    return true;
  }

  public addComment(communityId: string, postId: string, content: string): CommunityComment {
    const list = this.posts.get(communityId) || [];
    const post = list.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');

    const newComment: CommunityComment = {
      id: `cmt_${Date.now()}`,
      postId,
      authorId: 'usr_student_dileep',
      authorName: 'Dileep Kumar',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      authorBadge: 'Vel Tech Student',
      content,
      upvotes: 0,
      upvoterIds: [],
      createdAt: new Date().toISOString()
    };

    post.comments.push(newComment);
    post.commentCount += 1;

    this.saveToStorage();
    return newComment;
  }

  public toggleCommunityMembership(communityId: string): boolean {
    const comm = this.communities.get(communityId);
    if (!comm) return false;
    comm.isMember = !comm.isMember;
    comm.memberCount += comm.isMember ? 1 : -1;
    this.communities.set(comm.id, comm);
    this.saveToStorage();
    return comm.isMember;
  }
}

export const campusCommunitiesDatabase = new CampusCommunitiesDatabase();
