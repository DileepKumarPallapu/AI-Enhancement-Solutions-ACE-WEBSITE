/**
 * ACE 50X — Trust, Verification & Organization Evidence Database Service
 * Provides verifiable evidence-based trust profiles for events, colleges, companies, and mentors.
 */

export type TrustVerificationStatus = 'Verified' | 'Pending Verification' | 'Under Review' | 'Unverified' | 'Suspended' | 'Revoked';

export interface TrustEvidence {
  verifiedOrganizer: boolean;
  verifiedInstitution: boolean;
  completeInformation: boolean;
  officialDomainValidated: boolean;
  officialContactVerified: boolean;
  previousEventsCount: number;
  totalAttendeesServed: number;
  certificatesIssuedCount: number;
  reportCount: number;
}

export interface OrganizationTrustProfile {
  id: string;
  orgName: string;
  orgType: 'COLLEGE' | 'TECH_COMPANY' | 'COMMUNITY' | 'ORGANIZER';
  officialWebsite: string;
  domainVerified: boolean;
  status: TrustVerificationStatus;
  verifiedAt?: string;
  evidence: TrustEvidence;
  publishedOpportunitiesCount: number;
  trustScoreEvidenceExplanation: string[];
}

const STORAGE_KEY = 'ace_trust_profiles_v1';

class TrustDatabaseService {
  private profiles: Map<string, OrganizationTrustProfile> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed: OrganizationTrustProfile[] = JSON.parse(data);
          parsed.forEach(p => this.profiles.set(p.id, p));
          return;
        }
      }
    } catch {
      // fallback
    }

    const initial: OrganizationTrustProfile[] = [
      {
        id: 'inst-vel-tech-rangarajan-avadi',
        orgName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        orgType: 'COLLEGE',
        officialWebsite: 'https://www.veltech.edu.in',
        domainVerified: true,
        status: 'Verified',
        verifiedAt: '2025-08-01T10:00:00Z',
        evidence: {
          verifiedOrganizer: true,
          verifiedInstitution: true,
          completeInformation: true,
          officialDomainValidated: true,
          officialContactVerified: true,
          previousEventsCount: 48,
          totalAttendeesServed: 3200,
          certificatesIssuedCount: 1450,
          reportCount: 0
        },
        publishedOpportunitiesCount: 24,
        trustScoreEvidenceExplanation: [
          'Official institutional domain DNS ownership confirmed (.edu.in)',
          'Registered university registrar accreditation and authorized campus coordinator verified',
          'Over 1,450 verified tamper-proof certificates cryptographically issued and verified',
          'Zero resolved trust & safety violation reports on platform'
        ]
      },
      {
        id: 'org-innotech-labs',
        orgName: 'InnoTech Cloud Solutions',
        orgType: 'TECH_COMPANY',
        officialWebsite: 'https://innotech.example.com',
        domainVerified: true,
        status: 'Verified',
        verifiedAt: '2025-11-15T14:30:00Z',
        evidence: {
          verifiedOrganizer: true,
          verifiedInstitution: false,
          completeInformation: true,
          officialDomainValidated: true,
          officialContactVerified: true,
          previousEventsCount: 12,
          totalAttendeesServed: 1800,
          certificatesIssuedCount: 420,
          reportCount: 0
        },
        publishedOpportunitiesCount: 8,
        trustScoreEvidenceExplanation: [
          'Corporate entity registration and verified corporate email domain verified',
          'Active technical internship recruiter verified via Recruiter Radar',
          'Published 12 successful hackathons and technical webinars on ACE'
        ]
      }
    ];

    initial.forEach(p => this.profiles.set(p.id, p));
    this.persist();
  }

  private persist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.profiles.values())));
      }
    } catch {
      // ignore
    }
  }

  public getAllProfiles(): OrganizationTrustProfile[] {
    return Array.from(this.profiles.values());
  }

  public getProfileById(id: string): OrganizationTrustProfile | null {
    return this.profiles.get(id) || null;
  }

  public updateStatus(id: string, status: TrustVerificationStatus): boolean {
    const profile = this.profiles.get(id);
    if (!profile) return false;
    profile.status = status;
    this.profiles.set(id, profile);
    this.persist();
    return true;
  }
}

export const trustDatabase = new TrustDatabaseService();
