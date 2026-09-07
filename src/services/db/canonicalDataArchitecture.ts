// ACE Unified Canonical Data Architecture
// Defines single-source-of-truth core schema entities across the platform

export type EntityId = string;
export type Timestamp = string;

// ============================================================================
// 1. IDENTITY, ACCOUNT & INSTITUTION ENTITIES
// ============================================================================

export type AccountRoleType = 
  | 'STUDENT'
  | 'COLLEGE_AMBASSADOR'
  | 'ORGANIZER'
  | 'MENTOR'
  | 'COLLEGE'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export interface User {
  id: EntityId;
  email: string;
  phone?: string;
  fullName: string;
  displayName: string;
  username: string;
  avatarUrl?: string;
  role: AccountRoleType;
  roles: AccountRoleType[];
  activeWorkspace: AccountRoleType;
  institutionId: EntityId;
  college: string;
  isVerified: boolean;
  status: 'ACTIVE' | 'DEACTIVATED' | 'SUSPENDED' | 'DELETION_PENDING';
  version: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deactivatedAt?: Timestamp;
  deletedAt?: Timestamp;
}

export interface UserSettings {
  userId: EntityId;
  theme: 'light' | 'dark';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  eventAlerts: boolean;
  mentorshipAlerts: boolean;
  twoFactorEnabled: boolean;
  autoSaveDrafts: boolean;
  profileVisibility: 'PUBLIC' | 'COLLEGE_ONLY' | 'PRIVATE';
  updatedAt: Timestamp;
}

export interface UserSession {
  sessionId: EntityId;
  userId: EntityId;
  device: string;
  browser: string;
  os: string;
  ipAddress?: string;
  location?: string;
  isCurrent: boolean;
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  expiresAt: Timestamp;
  revokedAt?: Timestamp;
}

export interface Institution {
  id: EntityId;
  name: string;
  shortName?: string;
  aisheCode?: string;
  state: string;
  district: string;
  city: string;
  institutionType: 'CENTRAL_UNIVERSITY' | 'STATE_UNIVERSITY' | 'DEEMED_UNIVERSITY' | 'AUTONOMOUS_COLLEGE' | 'AFFILIATED_COLLEGE' | 'IIT' | 'NIT' | 'IIIT' | 'IIM' | 'OTHER';
  nirfRank?: number;
  website?: string;
  logoUrl?: string;
  isVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface School {
  id: EntityId;
  institutionId: EntityId;
  name: string;
}

export interface Department {
  id: EntityId;
  institutionId: EntityId;
  schoolId?: EntityId;
  name: string;
  code?: string;
}

export interface Program {
  id: EntityId;
  institutionId: EntityId;
  departmentId: EntityId;
  name: string; // e.g. B.Tech Computer Science & Engineering
  degree: 'B.Tech' | 'B.E' | 'M.Tech' | 'B.Sc' | 'B.Com' | 'BBA' | 'MBA' | 'MCA' | 'Ph.D' | 'Other';
  durationYears: number;
}

// ============================================================================
// 2. STUDENT & MENTORSHIP ENTITIES
// ============================================================================

export interface StudentProfile {
  id: EntityId;
  userId: EntityId;
  institutionId: EntityId;
  collegeName: string;
  departmentName: string;
  degree: string;
  yearOfStudy: string;
  graduationYear: string;
  studentIdNumber: string;
  cgpa?: string;
  bio?: string;
  tagline?: string;
  verifiedSkills: string[];
  interestedSkills: string[];
  interestedDomains: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  pointsEarned: number;
  reputationScore: number;
  version: number;
  updatedAt: Timestamp;
}

export interface Mentor {
  id: EntityId;
  userId: EntityId;
  institutionId: EntityId;
  fullName: string;
  avatarUrl?: string;
  designation: string;
  department: string;
  collegeName: string;
  expertiseAreas: string[];
  maxStudents: number;
  currentStudentCount: number;
  bio: string;
  isAvailableForNewMentees: boolean;
  isVerified: boolean;
}

export interface MentorAssignment {
  id: EntityId;
  mentorId: EntityId;
  studentId: EntityId;
  institutionId: EntityId;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'TERMINATED';
  assignedAt: Timestamp;
  updatedAt: Timestamp;
}

export interface MentorRequest {
  id: EntityId;
  studentId: EntityId;
  mentorId: EntityId;
  institutionId: EntityId;
  goalCategory: string;
  primaryGoal: string;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  createdAt: Timestamp;
  respondedAt?: Timestamp;
}

export interface MentorshipSession {
  id: EntityId;
  mentorId: EntityId;
  studentId: EntityId;
  institutionId: EntityId;
  title: string;
  date: string;
  time: string;
  durationMinutes: number;
  mode: 'ONLINE' | 'OFFLINE';
  meetingUrl?: string;
  locationVenue?: string;
  agenda: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  feedbackRating?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface MentorshipGoal {
  id: EntityId;
  studentId: EntityId;
  mentorId: EntityId;
  institutionId: EntityId;
  title: string;
  description: string;
  targetDate: string;
  progressPercentage: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ActionPlan {
  id: EntityId;
  studentId: EntityId;
  mentorId: EntityId;
  institutionId: EntityId;
  goalId?: EntityId;
  title: string;
  steps: Array<{ id: string; text: string; isCompleted: boolean; dueDate?: string }>;
  status: 'ACTIVE' | 'COMPLETED';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// 3. EVENTS & COMPETITION ENTITIES
// ============================================================================

export interface Event {
  id: EntityId;
  slug: string;
  title: string;
  eventType: 'Hackathon' | 'Symposium' | 'Workshop' | 'Conference' | 'Contest' | 'Webinar' | 'Cultural' | 'Sports';
  category: string;
  venue: string;
  city: string;
  state: string;
  audience: string;
  mode: 'OFFLINE' | 'ONLINE' | 'HYBRID';
  startDate: string;
  endDate?: string;
  ticketPrice: number;
  currency: string;
  description: string;
  shortDescription: string;
  perks: string;
  bannerImage?: string;
  organizerId: EntityId;
  organizerName: string;
  institutionId: EntityId;
  college: string;
  qualityScore: number;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
  tags: string[];
  registeredCount: number;
  likeCount: number;
  saveCount: number;
  version: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface EventRegistration {
  id: EntityId;
  eventId: EntityId;
  eventSlug: string;
  eventTitle: string;
  userId: EntityId;
  userName: string;
  userEmail: string;
  userCollege: string;
  ticketType: string;
  ticketPrice: number;
  teamName?: string;
  status: 'CONFIRMED' | 'ATTENDED' | 'CANCELLED';
  qrCodeUrl: string;
  registeredAt: Timestamp;
}

export interface EventApproval {
  id: EntityId;
  eventId: EntityId;
  reviewerId: EntityId;
  reviewerName: string;
  decision: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
  notes: string;
  reviewedAt: Timestamp;
}

export interface EventVersion {
  id: EntityId;
  eventId: EntityId;
  version: number;
  snapshot: Partial<Event>;
  modifiedBy: EntityId;
  modifiedAt: Timestamp;
}

export interface Organizer {
  id: EntityId;
  userId: EntityId;
  institutionId: EntityId;
  organizationName: string;
  college: string;
  isVerified: boolean;
}

export interface Competition {
  id: EntityId;
  title: string;
  slug: string;
  category: string;
  institutionId: EntityId;
  college: string;
  startDate: string;
  endDate: string;
  prizePoolCoins: number;
  prizePoolInr: number;
  rules: string;
  status: 'UPCOMING' | 'LIVE' | 'JUDGING' | 'COMPLETED';
}

export interface CompetitionRegistration {
  id: EntityId;
  competitionId: EntityId;
  userId: EntityId;
  userName: string;
  college: string;
  teamName?: string;
  registeredAt: Timestamp;
  status: 'CONFIRMED' | 'DISQUALIFIED';
}

export interface CompetitionRound {
  id: EntityId;
  competitionId: EntityId;
  roundNumber: number;
  title: string;
  instructions: string;
  startTime: Timestamp;
  endTime: Timestamp;
}

export interface Submission {
  id: EntityId;
  competitionId: EntityId;
  roundId?: EntityId;
  userId: EntityId;
  codeOrUrl: string;
  score?: number;
  status: 'SUBMITTED' | 'EVALUATING' | 'ACCEPTED' | 'REJECTED';
  submittedAt: Timestamp;
}

export interface Leaderboard {
  competitionId: EntityId;
  rankings: Array<{ rank: number; userId: EntityId; userName: string; college: string; score: number }>;
  updatedAt: Timestamp;
}

// ============================================================================
// 4. LEARNING, SKILLS, PROJECTS & CERTIFICATES
// ============================================================================

export interface Course {
  id: EntityId;
  title: string;
  slug: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  lessonsCount: number;
  xpReward: number;
  coinReward: number;
}

export interface LearningProgress {
  userId: EntityId;
  courseId: EntityId;
  completedLessonIds: string[];
  progressPercentage: number;
  isCompleted: boolean;
  completedAt?: Timestamp;
  updatedAt: Timestamp;
}

export interface Skill {
  id: EntityId;
  name: string;
  category: string;
}

export interface SkillEvidence {
  id: EntityId;
  userId: EntityId;
  skillName: string;
  sourceType: 'CHALLENGE' | 'CERTIFICATE' | 'PROJECT' | 'ASSESSMENT';
  sourceId: EntityId;
  verifiedAt: Timestamp;
}

export interface Certificate {
  id: EntityId;
  certificateNumber: string;
  title: string;
  eventName: string;
  issuer: string;
  issuerId?: EntityId;
  issuedDate: string;
  recipientId: EntityId;
  recipientName: string;
  recipientCollege: string;
  skills: string[];
  type: 'EVENT_PARTICIPATION' | 'EVENT_WINNER' | 'WORKSHOP_COMPLETION' | 'EXTERNAL_UPLOAD' | 'MENTORSHIP_COMPLETION';
  verificationHash: string;
  qrVerificationUrl: string;
  status: 'VERIFIED' | 'PENDING_AUDIT' | 'REVOKED';
  createdAt: Timestamp;
}

export interface Project {
  id: EntityId;
  userId: EntityId;
  authorName: string;
  authorCollege: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI_ML' | 'WEB_MOBILE' | 'BLOCKCHAIN' | 'IOT_HARDWARE' | 'CYBERSECURITY' | 'OPEN_SOURCE';
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  coverImage: string;
  upvotes: EntityId[];
  collaborators: string[];
  isPublished: boolean;
  version: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectMember {
  projectId: EntityId;
  userId: EntityId;
  role: 'CREATOR' | 'COLLABORATOR' | 'CONTRIBUTOR';
  joinedAt: Timestamp;
}

// ============================================================================
// 5. COMMUNITY, NOTIFICATIONS & MESSAGING
// ============================================================================

export interface CommunityPost {
  id: EntityId;
  authorId: EntityId;
  authorName: string;
  authorRole: string;
  authorCollege: string;
  authorAvatar?: string;
  category: 'DISCUSSION' | 'TEAMMATE_SEARCH' | 'PROJECT_FEEDBACK' | 'ANNOUNCEMENT' | 'QUESTION';
  title: string;
  content: string;
  tags: string[];
  upvotes: EntityId[];
  commentCount: number;
  isPinned?: boolean;
  version: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Comment {
  id: EntityId;
  postId: EntityId;
  authorId: EntityId;
  authorName: string;
  authorCollege: string;
  content: string;
  upvotes: EntityId[];
  createdAt: Timestamp;
}

export interface Reaction {
  id: EntityId;
  targetType: 'POST' | 'COMMENT' | 'PROJECT';
  targetId: EntityId;
  userId: EntityId;
  reactionType: 'UPVOTE' | 'LIKE' | 'CLAP' | 'HEART';
  createdAt: Timestamp;
}

export interface Notification {
  id: EntityId;
  userId: EntityId;
  title: string;
  message: string;
  type: 'DEADLINE' | 'RECOMMENDATION' | 'REWARD' | 'MENTORSHIP' | 'COMMUNITY' | 'EVENT' | 'COMPETITION' | 'SYSTEM';
  link?: string;
  isRead: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: Timestamp;
}

export interface Conversation {
  id: EntityId;
  participantIds: EntityId[];
  lastMessageText: string;
  lastMessageAt: Timestamp;
}

export interface Message {
  id: EntityId;
  conversationId: EntityId;
  senderId: EntityId;
  senderName: string;
  recipientId: EntityId;
  text: string;
  isRead: boolean;
  timestamp: Timestamp;
}

// ============================================================================
// 6. WALLET, ECONOMY & REWARDS
// ============================================================================

export interface Wallet {
  userId: EntityId;
  balanceCoins: number;
  lifetimeEarnedCoins: number;
  lifetimeRedeemedCoins: number;
  lockedCoins: number;
  updatedAt: Timestamp;
}

export interface WalletTransaction {
  id: EntityId;
  userId: EntityId;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  category: 'CHALLENGE_REWARD' | 'DAILY_LOGIN' | 'REFERRAL_BONUS' | 'HACKATHON_WIN' | 'REWARD_REDEMPTION' | 'ADMIN_ADJUSTMENT';
  description: string;
  idempotencyKey?: string;
  balanceAfter: number;
  timestamp: Timestamp;
}

export interface Reward {
  id: EntityId;
  title: string;
  description: string;
  coinsCost: number;
  inrValue: number;
  category: 'UPI_CASH' | 'AMAZON_GIFT_CARD' | 'TECH_BOOK' | 'SWAG_PACK' | 'EVENT_PASS';
  inStock: boolean;
}

export interface RewardRedemption {
  id: EntityId;
  userId: EntityId;
  userName: string;
  userEmail: string;
  rewardId: EntityId;
  rewardTitle: string;
  coinsCost: number;
  inrValue: number;
  payoutDetails: string;
  status: 'PENDING_APPROVAL' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  adminNotes?: string;
  requestedAt: Timestamp;
  completedAt?: Timestamp;
}

// ============================================================================
// 7. REFERRAL, ACHIEVEMENTS, ACTIVITY & AUDIT
// ============================================================================

export interface Referral {
  id: EntityId;
  referrerUserId: EntityId;
  referredEmail: string;
  status: 'PENDING' | 'REGISTERED' | 'REWARDED';
  pointsAwarded: number;
  createdAt: Timestamp;
}

export interface Achievement {
  id: EntityId;
  userId: EntityId;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Timestamp;
}

export interface ActivityLog {
  id: EntityId;
  userId: EntityId;
  type: 
    | 'PROFILE_UPDATED'
    | 'EVENT_REGISTERED'
    | 'EVENT_CREATED'
    | 'EVENT_SAVED'
    | 'COMPETITION_JOINED'
    | 'MENTOR_REQUESTED'
    | 'MENTOR_ASSIGNED'
    | 'GOAL_CREATED'
    | 'GOAL_COMPLETED'
    | 'ACTION_PLAN_CREATED'
    | 'PROJECT_PUBLISHED'
    | 'CERTIFICATE_EARNED'
    | 'COURSE_COMPLETED'
    | 'COINS_EARNED'
    | 'REWARD_REDEEMED'
    | 'POST_CREATED'
    | 'COMMENT_POSTED'
    | 'SETTINGS_CHANGED';
  title: string;
  description: string;
  entityType: 'EVENT' | 'COMPETITION' | 'MENTOR' | 'GOAL' | 'PROJECT' | 'CERTIFICATE' | 'WALLET' | 'POST' | 'PROFILE';
  entityId: EntityId;
  metadata?: Record<string, any>;
  timestamp: Timestamp;
}

export interface AuditLog {
  id: EntityId;
  actorId: EntityId;
  actorName: string;
  actorRole: string;
  action: string;
  resource: string;
  resourceId: EntityId;
  institutionId?: EntityId;
  details: string;
  result: 'SUCCESS' | 'DENIED' | 'FAILED';
  metadata?: Record<string, any>;
  timestamp: Timestamp;
}

export function getCanonicalStudent() {
  return {
    id: 'usr-student-dileep-veltech',
    email: 'dileep.kumar@veltech.edu.in',
    username: 'dileep-kumar',
    role: 'STUDENT',
    institution: {
      id: 'inst-vel-tech-rangarajan-avadi',
      name: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      shortName: 'Vel Tech',
      city: 'Avadi, Chennai',
      state: 'Tamil Nadu'
    },
    profile: {
      firstName: 'Dileep',
      lastName: 'Kumar',
      department: 'Computer Science & Engineering',
      program: 'B.Tech',
      year: '4th Year',
      bio: 'Full-Stack & Cloud Engineer passionate about building scalable, high-impact systems.'
    }
  };
}

