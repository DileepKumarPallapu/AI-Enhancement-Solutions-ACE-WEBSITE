export type WorkflowStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'PENDING_COLLEGE_AMBASSADOR'
  | 'COLLEGE_AMBASSADOR_APPROVED'
  | 'PENDING_ACE_ADMIN'
  | 'ACE_ADMIN_APPROVED'
  | 'PENDING_ORGANIZER_CONFIRMATION'
  | 'ORGANIZER_CONFIRMED'
  | 'FINAL_APPROVED'
  | 'PUBLISHED'
  | 'CHANGES_REQUESTED_BY_AMBASSADOR'
  | 'CHANGES_REQUESTED_BY_ADMIN'
  | 'CHANGES_REQUESTED_BY_ORGANIZER'
  | 'REJECTED'
  | 'CANCELLED';

export interface EventRevision {
  version: number;
  author: string;
  role: string;
  timestamp: string;
  summary: string;
  changedFields?: string[];
  statusAfter: WorkflowStatus;
}

export interface ApprovalComment {
  id: string;
  author: string;
  role: string;
  avatarUrl?: string;
  timestamp: string;
  comment: string;
  stage: string;
}

export interface RequestedChangesInfo {
  requestedBy: string;
  role: 'COLLEGE_AMBASSADOR' | 'ACE_ADMIN' | 'ORGANIZER';
  fields: string[];
  comments: string;
  timestamp: string;
}

export interface EventSubmissionData {
  id: string; // e.g. ACE-EVT-2026-000184
  slug: string;
  title: string;
  eventType: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  
  college: {
    name: string;
    department: string;
    city: string;
    state: string;
    website?: string;
  };

  organizer: {
    name: string;
    email: string;
    phone: string;
    type: 'Student' | 'Faculty' | 'Club' | 'Department' | 'College' | 'Company' | 'External Organization';
    isSubmittingOnBehalf: boolean;
  };

  schedule: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    regStart?: string;
    regDeadline: string;
    timezone: string;
  };

  location: {
    mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
    venue?: string;
    building?: string;
    room?: string;
    city?: string;
    address?: string;
    mapsUrl?: string;
    meetingPlatform?: string;
    meetingUrl?: string;
    instructions?: string;
  };

  registration: {
    type: 'FREE' | 'PAID' | 'EXTERNAL' | 'ACE';
    url?: string;
    fee?: number;
    maxParticipants?: number;
    teamSize?: string;
    eligibility?: string;
    requiredSkills?: string[];
  };

  prizes: {
    prizePool?: string;
    firstPrize?: string;
    secondPrize?: string;
    thirdPrize?: string;
    otherRewards?: string;
    certificate: boolean;
    certificateType?: 'Participation' | 'Completion' | 'Winner' | 'Merit';
    accommodation: boolean;
    food: boolean;
  };

  media: {
    posterUrl: string;
    bannerUrl?: string;
    logoUrl?: string;
    sponsorLogos?: string[];
  };

  additional: {
    rules?: string;
    faqs: { question: string; answer: string }[];
    contactPerson?: string;
    socialLinks: {
      website?: string;
      github?: string;
      linkedin?: string;
      instagram?: string;
    };
  };

  aiQuality: {
    score: number;
    issues: string[];
    checks: { label: string; passed: boolean }[];
  };

  status: WorkflowStatus;
  currentStage: string;
  submittedBy: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  submittedAt: string;
  lastUpdatedAt: string;
  requestedChanges: RequestedChangesInfo | null;
  revisions: EventRevision[];
  comments: ApprovalComment[];
}
