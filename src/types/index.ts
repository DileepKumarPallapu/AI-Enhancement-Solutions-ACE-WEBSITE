export interface EventItem {
  identity: string;
  id: number;
  orgIdentity: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  status: 'APPROVED' | 'PENDING' | 'NEEDS_ATTENTION' | 'REJECTED';
  bannerImages: string[];
  categoryIdentity?: string;
  categoryName?: string;
  eventTypeIdentity?: string;
  eventTypeName?: string;
  eligibleDeptIdentities?: string[];
  eventLink?: string | null;
  paymentLink?: string | null;
  socialLinks?: {
    linkedin?: string;
    whatsapp?: string;
    instagram?: string;
    youtube?: string;
  };
  tags?: string[];
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  certIdentity?: string | null;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  isPaid: boolean;
  paymentSuccess?: boolean;
  org?: Organizer;
  location?: EventLocation;
  calendars?: EventCalendar[];
  tickets?: EventTicket[];
  eventPerks?: string[];
  eventAccommodations?: string[];
  Collaborator?: Collaborator[];
  category?: EventCategory;
  eventContacts?: EventContact[];
  aiQualityScore?: number;
  aiSuitabilityScore?: number;
  aiSuitabilityReason?: string;
}

export interface Organizer {
  identity: string;
  id: number;
  organizationName: string;
  domainEmail?: string;
  profileImage?: string;
  city?: string;
  state?: string;
  country?: string;
  isVerified?: boolean;
  eventCount?: number;
  website?: string | null;
  slug?: string;
  followingCount?: number;
}

export interface EventLocation {
  identity?: string;
  venue?: string;
  city?: string;
  state?: string;
  country?: string;
  mapLink?: string;
  onlineMeetLink?: string | null;
}

export interface EventCalendar {
  identity?: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  timeZone?: string;
}

export interface EventTicket {
  identity?: string;
  id?: number;
  name: string;
  description?: string;
  sellingFrom?: string;
  sellingTo?: string;
  isPaid: boolean;
  price: number;
  currency: string;
  totalQuantity?: number;
  availableQuantity?: number;
}

export interface Collaborator {
  identity: string;
  member?: {
    organizationName?: string;
    location?: string;
    orgDept?: string;
  };
}

export interface EventContact {
  identity?: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface EventCategory {
  identity: string;
  id?: number;
  categoryName: string;
  icon?: string;
  color?: string;
  imageUrl?: string;
}

export interface MasterEventType {
  identity: string;
  name: string;
  categoryIdentity?: string;
  color?: string;
  imageUrl?: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  avatarUrl: string;
  role: 'USER' | 'ORGANIZER' | 'AMBASSADOR' | 'ADMIN';
  isVerified: boolean;
  college: string;
  department: string;
  year: string;
  city: string;
  state: string;
  country: string;
  dob: string;
  joiningDate: string;
  skills: string[];
  interests: string[];
  preferredModes: string[];
  profileCompletionPercentage: number;
  referralCode: string;
  pointsEarned: number;
  followingCount: number;
}

export interface ReferralInvitation {
  id: number;
  invitedBy: string;
  recipientEmail: string;
  invitationDate: string;
  emailStatus: 'SENT' | 'FAILED' | 'PENDING';
  deliveryStatus: 'DELIVERED' | 'BOUNCED' | 'PENDING';
  status: 'ACCEPTED' | 'PENDING' | 'EXPIRED';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'REGISTRATION' | 'DEADLINE' | 'RECOMMENDATION' | 'EVENT_UPDATE' | 'SYSTEM' | 'REWARD';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface ContestItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  prizePool: string;
  deadline: string;
  mode: string;
  eligibility: string;
  category: string;
  bannerImage: string;
  organizer: string;
  participantsCount: number;
  rounds: { title: string; date: string; description: string }[];
  prizes: { rank: string; amount: string; perks: string }[];
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
}
