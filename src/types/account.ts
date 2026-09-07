export type AccountRole = 
  | 'STUDENT'
  | 'COLLEGE_AMBASSADOR'
  | 'ORGANIZER'
  | 'ADMIN'
  | 'COLLEGE'
  | 'MENTOR';

export type AccountStatus = 
  | 'ACTIVE'
  | 'PENDING_VERIFICATION'
  | 'SUSPENDED'
  | 'DEACTIVATED';

export type VisibilityLevel = 
  | 'PUBLIC'
  | 'REGISTERED'
  | 'COLLEGE_ONLY'
  | 'FOLLOWERS'
  | 'PRIVATE';

export type EnrollmentStatus = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED' | 'EXPIRED';

export interface UserRoleEnrollment {
  id: string;
  userId: string;
  role: AccountRole;
  collegeId?: string;
  collegeName?: string;
  department?: string;
  status: EnrollmentStatus;
  appliedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  notes?: string;
  metadata?: Record<string, any>;
}

export interface PrivacyPreferences {
  profileVisibility: VisibilityLevel;
  showEmail: boolean;
  showPhone: boolean;
  showCollege: boolean;
  showLocation: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showEducation?: boolean;
  allowDirectMessages?: boolean;
  showActivityOnFeed?: boolean;
  showGallery: VisibilityLevel;
  showAchievements: boolean;
  showSocialLinks: boolean;
  allowFollowers: boolean;
}

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  isCurrent: boolean;
  lastActive: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  targetId: string;
  action: string;
  details: string;
  ip?: string;
  timestamp: string;
}

export interface EducationRecord {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string | number;
  endYear: string | number;
  current?: boolean;
  isCurrent?: boolean;
  grade?: string;
  description?: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  name?: string;
  description: string;
  domain?: string;
  technologies: string[];
  role?: string;
  teamSize?: number;
  startDate?: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  visibility?: 'PUBLIC' | 'PRIVATE';
}

export interface CertificateRecord {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  isAceVerified?: boolean;
  skills?: string[];
  badgeIcon?: string;
}

export interface AchievementRecord {
  id: string;
  title: string;
  category?: 'COMPETITION' | 'HACKATHON' | 'CODING' | 'AMBASSADOR' | 'COMMUNITY' | 'LEARNING';
  description: string;
  rank?: string;
  date: string;
  icon?: string;
  verified?: boolean;
}

export interface StudentProfileData {
  college: string;
  degree: string;
  major?: string;
  department: string;
  year: string;
  graduationYear?: string;
  semester?: string;
  studentIdNumber?: string;
  cgpa?: string;
  careerGoal?: string;
  interestedDomains?: string[];
  preferredLanguages?: string[];
  verifiedSkills?: { name: string; level: string; verifiedSource: string }[];
  interestedSkills?: string[];
  learningLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  educationHistory?: EducationRecord[];
  projects?: ProjectRecord[];
  certificates?: CertificateRecord[];
  achievements?: AchievementRecord[];
  resumeFileName?: string;
}

export interface AmbassadorProfileData {
  campusName?: string;
  college: string;
  department: string;
  year: string;
  studentId?: string;
  applicationStatus?: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  interests?: string[];
  referralCount?: number;
  eventsPromoted?: number;
  eventsPromotedCount?: number;
  studentsReached?: number;
  registrationsReferred?: number;
  campaignsCount?: number;
  ambassadorSince?: string;
  verifiedBadges?: string[];
}

export interface OrganizerProfileData {
  organizationName: string;
  organizerType?: string;
  organizationType?: 'STARTUP' | 'COMPANY' | 'COLLEGE' | 'UNIVERSITY' | 'STUDENT_CLUB' | 'NGO' | 'COMMUNITY' | 'TRAINING' | 'OTHER';
  logo?: string;
  coverImage?: string;
  website?: string;
  description?: string;
  verificationStatus?: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'SUSPENDED';
  eventsCount?: number;
  participantsCount?: number;
  verifiedAt?: string;
}

export interface MentorProfileData {
  expertise?: string[];
  domainExpertise?: string[];
  yearsOfExperience: number;
  organization?: string;
  education?: string;
  skills?: string[];
  coursesCount?: number;
  sessionsConducted?: number;
  studentsMentored?: number;
  verifiedStatus?: 'PENDING' | 'VERIFIED';
}

export interface CollegeProfileData {
  officialName: string;
  shortName?: string;
  collegeLogo?: string;
  coverImage?: string;
  address?: string;
  pincode?: string;
  establishedYear?: number;
  accreditation?: string;
  departments?: string[];
  courses?: string[];
  verifiedStatus?: 'PENDING' | 'VERIFIED';
  studentsCount?: number;
  ambassadorsCount?: number;
}

export interface GalleryAlbum {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImage?: string;
  visibility: VisibilityLevel;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  userId: string;
  albumId?: string;
  url: string;
  thumbnailUrl?: string;
  caption: string;
  altText?: string;
  category?: string;
  visibility: VisibilityLevel;
  likesCount?: number;
  createdAt: string;
}

export interface Account {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  phone?: string;
  passwordHash: string;
  role: AccountRole;
  roles?: AccountRole[];
  activeWorkspace?: AccountRole;
  enrollments?: UserRoleEnrollment[];
  permissions?: string[];
  collegeId?: string;
  status: AccountStatus;
  
  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  isVerified?: boolean;
  emailVerificationToken?: string;
  pendingEmail?: string;
  phoneOtp?: { code: string; expiresAt: number };
  passwordResetToken?: { token: string; expiresAt: number };

  // Names & Identity
  firstName: string;
  lastName: string;
  displayName: string;
  fullName: string;
  avatarUrl: string;
  coverPhotoUrl: string;
  coverTheme?: string;
  bio?: string;
  tagline?: string;

  // College & Location
  college: string;
  location: string;
  country: string;
  state: string;
  city: string;
  timezone?: string;
  pincode?: string;

  // Social & Web Links
  website?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
    youtube?: string;
  };

  // Personal Info
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY';
  preferredLanguage?: string;

  // Profile Specific Payloads
  roleProfileData?: StudentProfileData | AmbassadorProfileData | OrganizerProfileData | MentorProfileData | CollegeProfileData;
  studentData?: StudentProfileData;
  ambassadorData?: AmbassadorProfileData;
  organizerData?: OrganizerProfileData;
  mentorData?: MentorProfileData;
  collegeData?: CollegeProfileData;

  // Consolidated collections
  skills: {
    verified: string[];
    interested: string[];
  };
  education: EducationRecord[];
  projects: ProjectRecord[];
  certificates: CertificateRecord[];
  achievements: AchievementRecord[];
  gallery?: GalleryImage[];

  // Security & Settings
  privacyPreferences: PrivacyPreferences;
  privacy: PrivacyPreferences;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  sessions: UserSession[];
  
  // Social Counts & Stats
  stats: {
    eventsAttended: number;
    followersCount: number;
    reputationScore: number;
    projectsCount?: number;
    coinsBalance?: number;
  };
  followers: string[];
  following: string[];
  followersCount: number;
  followingCount: number;
  pointsEarned: number;
  profileStrength: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface CollegeSearchItem {
  id: string;
  name: string;
  city: string;
  state: string;
  isVerified: boolean;
}
