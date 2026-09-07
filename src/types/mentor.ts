export type MentorSpecialty = 
  | 'ACADEMIC_CSE'
  | 'CAREER_PLACEMENTS'
  | 'EVENTS_COMPETITIONS'
  | 'PROJECTS_TECHNICAL'
  | 'HIGHER_STUDIES_RESEARCH'
  | 'INTERNSHIPS_RESUME'
  | 'CODING_AI_ML'
  | 'DATA_SCIENCE'
  | 'CYBERSECURITY'
  | 'WEB_DEVELOPMENT'
  | 'UI_UX_DESIGN';

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

export type SessionMode = 'ONLINE' | 'OFFLINE' | 'PHONE' | 'CHAT';

export type SessionStatus = 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'WAITLISTED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export type ActionItemStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';

export type ActionItemPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type RecommendationType = 'EVENT' | 'HACKATHON' | 'COMPETITION' | 'COURSE' | 'PROJECT' | 'CERTIFICATE' | 'CODING_PROBLEM';

export type RecommendationStatus = 'RECOMMENDED' | 'VIEWED' | 'REGISTERED' | 'ATTENDED' | 'COMPLETED';

export type NotePrivacyLevel = 'PRIVATE_MENTOR_NOTE' | 'SHARED_WITH_STUDENT';

export interface MentorTimeSlot {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g. "16:00"
  endTime: string;   // e.g. "18:00"
  mode: SessionMode;
  locationOrLink?: string;
  isBooked?: boolean;
}

export interface MentorAvailabilityConfig {
  availableDays: string[];
  slots: MentorTimeSlot[];
  sessionDurationMinutes: number; // 30, 45, 60
  breakTimeMinutes: number;
  maxSessionsPerDay: number;
  modesAllowed: SessionMode[];
  autoAcceptSessions: boolean;
}

export interface MentorProfile {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  coverPhotoUrl: string;
  collegeId: string;
  collegeName: string;
  department: string;
  designation: string;
  yearsOfExperience: number;
  isVerifiedMentor: boolean;
  verifiedBadgeDate?: string;
  mentorSince: string;
  specialties: MentorSpecialty[];
  mentorshipAreas: MentorshipArea[];
  expertiseSkills: string[];
  languages: string[];
  education: string;
  certifications: string[];
  professionalBio: string;
  guidancePhilosophy: string;
  preferredCommunication: string;
  maxStudentsCapacity: number;
  currentStudentsCount: number;
  ratingAverage: number;
  ratingCount: number;
  sessionsCompletedCount: number;
  eventsSupportedCount: number;
  availability: MentorAvailabilityConfig;
  status: 'ACTIVE' | 'UNAVAILABLE' | 'SUSPENDED' | 'ARCHIVED';
  createdAt: string;
}

export interface MentorStudentAssignment {
  id: string;
  studentId: string;
  studentUsername: string;
  studentName: string;
  studentAvatar: string;
  studentCollege: string;
  studentDepartment: string;
  studentYear: string;
  mentorId: string;
  mentorName: string;
  assignmentType: 'PRIMARY' | 'SECONDARY';
  primaryMentorshipArea: MentorshipArea;
  status: 'ACTIVE' | 'COMPLETED' | 'CHANGED';
  assignedDate: string;
  lastSessionDate?: string;
  nextFollowUpDate?: string;
  notesCount?: number;
  activeGoalsCount?: number;
}

export interface MentorRequest {
  id: string;
  studentId: string;
  studentUsername: string;
  studentName: string;
  studentAvatar: string;
  studentCollege: string;
  studentDepartment: string;
  studentYear: string;
  mentorId: string;
  mentorName: string;
  reason: string;
  primaryGuidanceArea: MentorshipArea;
  currentGoal: string;
  helpNeededDescription: string;
  preferredCommunication: string;
  preferredDays: string[];
  preferredTime: string;
  optionalMessage?: string;
  status: RequestStatus;
  declineReason?: string;
  createdAt: string;
  respondedAt?: string;
}

export interface MentorSession {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentUsername: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  date: string; // "2026-09-15"
  time: string; // "16:30"
  durationMinutes: number;
  topic: string;
  mentorshipArea: MentorshipArea;
  mode: SessionMode;
  meetingUrl?: string;
  location?: string;
  status: SessionStatus;
  mentorSummary?: string;
  actionItemsCreated?: string[];
  studentFeedbackRating?: number; // 1 to 5
  studentFeedbackComment?: string;
  studentFeedbackSubmittedAt?: string;
  createdAt: string;
}

export interface MentorNote {
  id: string;
  studentId: string;
  mentorId: string;
  sessionDate: string;
  topic: string;
  discussionSummary: string;
  studentConcern?: string;
  mentorRecommendation: string;
  actionItemsText?: string;
  nextFollowUpDate?: string;
  priority: ActionItemPriority;
  privacyLevel: NotePrivacyLevel;
  createdAt: string;
  updatedAt: string;
}

export interface MilestoneRoadmapItem {
  id: string;
  monthIndex: number; // 1, 2, 3
  title: string;
  description: string;
  completed: boolean;
  linkedOpportunity?: string;
}

export interface MentorGoal {
  id: string;
  studentId: string;
  mentorId: string;
  title: string;
  targetCategory: 'CAREER' | 'ACADEMIC' | 'TECHNICAL' | 'EVENT' | 'COMPETITION' | 'PROJECT';
  targetDate: string;
  progressPercentage: number;
  milestones: MilestoneRoadmapItem[];
  mentorReviewNotes?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  createdAt: string;
  updatedAt: string;
}

export interface MentorActionItem {
  id: string;
  studentId: string;
  mentorId: string;
  mentorName: string;
  title: string;
  description: string;
  priority: ActionItemPriority;
  deadline: string;
  status: ActionItemStatus;
  completedAt?: string;
  studentComment?: string;
  linkedResourceUrl?: string;
  createdAt: string;
}

export interface MentorRecommendation {
  id: string;
  studentId: string;
  mentorId: string;
  mentorName: string;
  type: RecommendationType;
  targetId: string; // e.g. event slug, course id, problem id
  title: string;
  description: string;
  reason: string;
  categoryTag: string;
  actionUrl: string;
  status: RecommendationStatus;
  createdAt: string;
}

export interface MentorMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'STUDENT' | 'MENTOR';
  receiverId: string;
  content: string;
  attachmentUrl?: string;
  embeddedEventSlug?: string;
  embeddedEventTitle?: string;
  read: boolean;
  createdAt: string;
}

export interface MentorApplication {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  collegeName: string;
  collegeId: string;
  department: string;
  designation: string;
  yearsOfExperience: number;
  education: string;
  specialties: MentorSpecialty[];
  mentorshipAreas: MentorshipArea[];
  expertiseSkills: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  bio: string;
  guidancePhilosophy: string;
  preferredStudentGroups: string[];
  motivationStatement: string;
  resumeFileName?: string;
  certificatesFileName?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'NEEDS_UPDATE';
  reviewedBy?: string;
  reviewNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface MentorStudentInsight {
  id: string;
  studentId: string;
  studentName: string;
  observation: string;
  evidence: string;
  suggestedAction: string;
  severity: 'INFO' | 'OPPORTUNITY' | 'ATTENTION';
  detectedAt: string;
}

export interface MentorAnalyticsData {
  mentorId: string;
  studentsAssigned: number;
  activeStudents: number;
  sessionsCompleted: number;
  sessionsPending: number;
  eventRecommendationsCount: number;
  eventRegistrationsInfluenced: number;
  learningRecommendationsCount: number;
  goalsCompletedCount: number;
  actionItemsCompletedCount: number;
  averageRating: number;
  feedbackEntriesCount: number;
  monthlySessionTrends: { month: string; count: number }[];
  eventEngagementRate: number;
}

export type MentorSpecialization = MentorSpecialty;
export type MentorGuidanceArea = MentorshipArea;

export interface MentorFilterOptions {
  collegeId?: string;
  collegeName?: string;
  department?: string;
  specialty?: MentorSpecialty;
  mentorshipArea?: MentorshipArea;
  searchQuery?: string;
  isVerifiedOnly?: boolean;
}
