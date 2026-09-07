// =========================================================================
// ACE PLATFORM — COMPLETE MENTORSHIP ECOSYSTEM TYPES
// =========================================================================

export type MentorType = 
  | 'ACADEMIC'
  | 'TECHNICAL'
  | 'CAREER'
  | 'EVENTS_OPPORTUNITIES'
  | 'HIGHER_STUDIES'
  | 'RESEARCH'
  | 'ENTREPRENEURSHIP'
  | 'GENERAL';

export type MentorshipArea = 
  | 'Academic Guidance'
  | 'Career Guidance'
  | 'Technical Guidance'
  | 'Project Guidance'
  | 'Hackathon Guidance'
  | 'Competition Guidance'
  | 'Event Guidance'
  | 'Higher Studies'
  | 'Internships'
  | 'Placements'
  | 'Resume Guidance'
  | 'Interview Preparation'
  | 'Coding Practice'
  | 'AI/ML'
  | 'Research'
  | 'Leadership';

export type MentorVerificationStatus = 
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECTED'
  | 'SUSPENDED';

export type MentorVerificationBadge = 
  | 'College Verified'
  | 'Faculty Verified'
  | 'Industry Verified'
  | 'ACE Verified';

export type MentorStatus = 
  | 'ACTIVE'
  | 'UNAVAILABLE'
  | 'SUSPENDED'
  | 'ARCHIVED';

export type SessionMode = 'ONLINE' | 'OFFLINE' | 'PHONE' | 'CHAT';

export type SessionStatus = 
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export type MentorshipRequestStatus = 
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'EXPIRED';

export type GoalStatus = 
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'ON_TRACK'
  | 'AT_RISK'
  | 'COMPLETED'
  | 'PAUSED';

export type GoalCategory = 
  | 'CAREER'
  | 'ACADEMIC'
  | 'TECHNICAL'
  | 'EVENT'
  | 'COMPETITION'
  | 'PROJECT'
  | 'RESEARCH'
  | 'HIGHER_STUDIES'
  | 'STARTUP';

export type ActionPlanPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type ActionTaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';

export type NoteType = 'PRIVATE_MENTOR_NOTE' | 'STUDENT_VISIBLE_NOTE';

export type ResourceType = 
  | 'COURSE'
  | 'ARTICLE'
  | 'VIDEO'
  | 'PROJECT'
  | 'BOOK'
  | 'EVENT'
  | 'COMPETITION'
  | 'LEARNING_PATH';

// Academic Structure
export interface AcademicSchool {
  id: string;
  name: string;
  code: string;
  departments: AcademicDepartment[];
}

export interface AcademicDepartment {
  id: string;
  name: string;
  code: string;
  schoolId: string;
  programs: AcademicProgram[];
}

export interface AcademicProgram {
  id: string;
  name: string;
  degree: 'B.Tech' | 'M.Tech' | 'MBA' | 'BBA' | 'Ph.D.' | 'B.Sc' | 'M.Sc' | 'LL.B' | 'B.Com';
  departmentId: string;
  durationYears: number;
}

// Time Slot & Availability
export interface MentorTimeSlot {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  mode: SessionMode;
  locationOrRoom?: string;
  isBooked?: boolean;
}

export interface MentorAvailabilityConfig {
  availableDays: string[];
  slots: MentorTimeSlot[];
  sessionDurationMinutes: number;
  breakTimeMinutes: number;
  maxSessionsPerDay: number;
  modesAllowed: SessionMode[];
  autoAcceptSessions: boolean;
}

// Core Mentor Model
export interface Mentor {
  id: string;
  userId: string;
  institutionId: string;
  institutionName: string;
  schoolId?: string;
  schoolName?: string;
  departmentId?: string;
  departmentName?: string;
  name: string;
  fullName: string;
  username: string;
  avatar: string;
  avatarUrl: string;
  coverImage?: string;
  coverPhotoUrl?: string;
  bio: string;
  designation: string;
  school?: string;
  academicSchool?: string;
  collegeName?: string;
  professionalBio?: string;
  department: string;
  specialization: string;
  expertise: string[];
  expertiseSkills: string[];
  mentorType: MentorType;
  specialties: string[];
  mentorshipAreas: MentorshipArea[];
  experienceYears: number;
  yearsOfExperience: number;
  languages: string[];
  education: string;
  certifications: string[];
  guidancePhilosophy?: string;
  preferredCommunication?: string;
  availability: MentorAvailabilityConfig;
  maxStudents: number;
  maxStudentsCapacity: number;
  currentStudentCount: number;
  currentStudentsCount: number;
  verificationStatus: MentorVerificationStatus;
  isVerifiedMentor: boolean;
  verificationBadges: MentorVerificationBadge[];
  verifiedBadgeDate?: string;
  status: MentorStatus;
  rating: number;
  ratingAverage: number;
  ratingCount: number;
  totalSessions: number;
  sessionsCompletedCount: number;
  eventsSupportedCount: number;
  contactEmail?: string;
  contactPhone?: string;
  officeLocation?: string;
  createdAt: string;
  updatedAt: string;
}

// Mentorship Assignment
export interface MentorshipAssignment {
  id: string;
  studentId: string;
  studentUsername: string;
  studentName: string;
  studentAvatar: string;
  studentInstitutionId: string;
  studentCollege: string;
  studentSchool?: string;
  studentDepartment: string;
  studentYear: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorDesignation: string;
  mentorDepartment: string;
  assignmentType: 'PRIMARY' | 'SECONDARY';
  specializationFocus?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'TERMINATED';
  assignedDate: string;
  assignedBy?: string;
  activeGoalsCount: number;
  completedGoalsCount: number;
  sessionsCount: number;
  lastSessionDate?: string;
  nextSessionDate?: string;
  updatedAt: string;
}

// Mentorship Request
export interface MentorshipRequest {
  id: string;
  studentId: string;
  studentUsername: string;
  studentName: string;
  studentAvatar: string;
  studentInstitutionId: string;
  studentCollege: string;
  studentSchool?: string;
  studentDepartment: string;
  studentYear: string;
  mentorId: string;
  mentorName: string;
  goalCategory: GoalCategory;
  primaryGoal: string;
  targetGoal?: string;
  message: string;
  preferredDays: string[];
  preferredTime: string;
  preferredCommunication: string;
  assignmentType: 'PRIMARY' | 'SECONDARY';
  status: MentorshipRequestStatus;
  declineReason?: string;
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Milestone & Goal
export interface GoalMilestone {
  id: string;
  monthIndex: number;
  title: string;
  description: string;
  targetDate?: string;
  completed: boolean;
  completedAt?: string;
}

export interface MentorshipGoal {
  id: string;
  studentId: string;
  mentorId?: string;
  mentorName?: string;
  institutionId: string;
  title: string;
  description: string;
  category: GoalCategory;
  targetCategory?: string;
  targetDate: string;
  status: GoalStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  progressPercentage: number;
  progress?: number;
  milestones: GoalMilestone[];
  mentorReviewNotes?: string;
  lastReviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Action Plan & Tasks
export interface ActionPlanTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: ActionPlanPriority;
  assignedTo: string;
  status: ActionTaskStatus;
  isCompleted?: boolean;
  completedAt?: string;
  completionComment?: string;
  studentComment?: string;
  studentCompletionNotes?: string;
}

export interface ActionPlan {
  id: string;
  studentId: string;
  studentName: string;
  mentorId: string;
  mentorName: string;
  institutionId: string;
  title: string;
  description?: string;
  dueDate?: string;
  goalReference?: string;
  tasks: ActionPlanTask[];
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

// Session & Meeting
export interface MentorshipSession {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentUsername: string;
  institutionId: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  date: string;
  time: string;
  durationMinutes: number;
  topic: string;
  agenda?: string;
  studentAgenda?: string;
  mentorshipArea: MentorshipArea;
  mode: SessionMode;
  meetingMode?: string;
  status: SessionStatus;
  meetingLink?: string;
  meetingUrl?: string;
  locationOrUrl?: string;
  meetingLocation?: string;
  summaryNotes?: string;
  mentorSummary?: string;
  actionItems?: string[];
  actionItemsCreated?: string[];
  studentFeedbackRating?: number;
  studentFeedbackComment?: string;
  studentRatingDetails?: any;
  createdAt: string;
  updatedAt: string;
}

// Feedback
export interface MentorshipFeedback {
  id: string;
  sessionId: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  studentCollege: string;
  ratingAverage: number;
  ratings: {
    communication: number;
    helpfulness: number;
    knowledge: number;
    guidance: number;
  };
  comment: string;
  isPublicOnProfile: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Note
export interface MentorshipNote {
  id: string;
  mentorId: string;
  studentId: string;
  institutionId: string;
  type: NoteType;
  topic: string;
  discussionSummary: string;
  studentConcern?: string;
  mentorRecommendation: string;
  actionItemsText?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  privacyLevel?: string;
  isPrivateToMentor?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Direct Message
export interface MentorshipMessage {
  id: string;
  conversationId?: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'STUDENT' | 'MENTOR' | 'ADMIN';
  receiverId: string;
  content: string;
  embeddedEventSlug?: string;
  embeddedEventTitle?: string;
  isRead?: boolean;
  read?: boolean;
  createdAt: string;
  sentAt?: string;
  updatedAt?: string;
}

// Resource
export interface MentorResource {
  id: string;
  mentorId: string;
  mentorName: string;
  institutionId: string;
  targetStudentId?: string;
  type: ResourceType;
  title: string;
  description: string;
  url: string;
  categoryTag: string;
  recommendationReason: string;
  linkedEventSlug?: string;
  linkedEventTitle?: string;
  createdAt: string;
  updatedAt?: string;
}

// Audit Log
export interface MentorshipAuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  details: string;
  institutionId: string;
  resourceType?: string;
  resourceId?: string;
}

// Meeting Brief
export interface MentorMeetingBrief {
  studentName: string;
  collegeName: string;
  department: string;
  year: string;
  preparedAt: string;
  completedActivities: string[];
  activeGoals: { title: string; progress: number; category: string }[];
  pendingTasks: { title: string; priority: string; dueDate: string }[];
  strugglesAndBlockers: string[];
  suggestedQuestionsToAsk: string[];
  recommendedDiscussionTopics: string[];
  suggestedNextActions: string[];
}
