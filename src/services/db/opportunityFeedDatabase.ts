// ACE 25X Interactive Opportunity Feed & Recommendation Database
// Engagement loop tracking: views, clicks, saves, registrations, applications, and feedback

export interface FeedPostItem {
  id: string;
  type: 'OPPORTUNITY' | 'CAMPUS_EVENT' | 'HACKATHON_WIN' | 'COMMUNITY_UPDATE' | 'MENTOR_OFFICE_HOURS';
  authorName: string;
  authorAvatarUrl: string;
  authorRole: string;
  content: string;
  mediaUrl?: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isSaved: boolean;
  opportunityLink?: string;
  createdAt: string;
}

class OpportunityFeedDatabase {
  private posts: Map<string, FeedPostItem> = new Map();
  private userFeedback: Map<string, string> = new Map();

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const initial: FeedPostItem[] = [
      {
        id: 'feed_01',
        type: 'OPPORTUNITY',
        authorName: 'Google Cloud Labs',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
        authorRole: 'Enterprise Opportunity Provider',
        content: '🚀 Applications are open for the 2026 Autonomous AI Agents Research Fellowship! Open to engineering undergraduates with verified Level 5+ GitHub project repos. Selected fellows receive ₹1,50,000/month stipend and work directly with AI research leads.',
        tags: ['Fellowship', 'AI/ML', 'Vel Tech Eligible', 'Stipend'],
        likesCount: 142,
        commentsCount: 28,
        sharesCount: 35,
        isSaved: true,
        opportunityLink: '/student/opportunities/opp_ai_fellow_2026',
        createdAt: '2026-03-06T10:00:00Z'
      },
      {
        id: 'feed_02',
        type: 'HACKATHON_WIN',
        authorName: 'Dr. K. Senthilkumar',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        authorRole: 'Head of Computer Science • Vel Tech University',
        content: 'Proud to announce that Team Neural Titans from Vel Tech CSE has secured Rank #1 in the National Autonomous Robotics Hackathon 2026 with their edge Jetson Nano SLAM perception rescue drone! Excellent proof-of-work engineering.',
        tags: ['National Hackathon', 'Vel Tech CSE', 'Robotics', 'Rank 1'],
        likesCount: 389,
        commentsCount: 64,
        sharesCount: 92,
        isSaved: false,
        createdAt: '2026-03-05T14:30:00Z'
      },
      {
        id: 'feed_03',
        type: 'MENTOR_OFFICE_HOURS',
        authorName: 'Dr. S. Radhika',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        authorRole: 'Faculty Mentor • AI & Data Science',
        content: 'Weekly campus lab office hours are scheduled for Tuesday and Thursday (10:00 AM - 11:30 AM) in Academic Block 2, Room 304. Open for architecture reviews on cloud deployments and final-year capstone design.',
        tags: ['Office Hours', 'Mentorship', 'Vel Tech Lab'],
        likesCount: 94,
        commentsCount: 12,
        sharesCount: 15,
        isSaved: false,
        opportunityLink: '/student/mentorship',
        createdAt: '2026-03-04T09:00:00Z'
      }
    ];

    initial.forEach(p => this.posts.set(p.id, p));
  }

  public getFeed(): FeedPostItem[] {
    return Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public toggleSave(postId: string): boolean {
    const post = this.posts.get(postId);
    if (!post) return false;
    post.isSaved = !post.isSaved;
    this.posts.set(postId, post);
    return post.isSaved;
  }

  public recordFeedback(postId: string, feedback: 'USEFUL' | 'NOT_INTERESTED' | 'ALREADY_COMPLETED'): void {
    this.userFeedback.set(postId, feedback);
  }
}

export const opportunityFeedDb = new OpportunityFeedDatabase();
