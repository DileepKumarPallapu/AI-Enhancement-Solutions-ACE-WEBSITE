import { EventItem, StudentProfile } from '../../types';
import { EventSubmissionData } from '../../types/workflow';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TrustScoreBreakdown {
  organizerScore: number;
  collegeScore: number;
  contentScore: number;
  registrationScore: number;
  posterScore: number;
  duplicateRisk: number;
  overallScore: number;
  riskLevel: RiskLevel;
}

export interface VerificationSignal {
  category: string;
  label: string;
  passed: boolean;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  detail?: string;
}

export interface TrustAnalysis {
  eventId: string;
  breakdown: TrustScoreBreakdown;
  signals: VerificationSignal[];
  recommendation: 'SAFE TO REVIEW' | 'FLAGGED FOR ADMIN' | 'CHANGES REQUIRED' | 'CRITICAL RISK';
  posterMismatch?: {
    field: string;
    formValue: string;
    posterValue: string;
  };
  possibleDuplicate?: {
    existingEventId: string;
    existingTitle: string;
    similarity: number;
  };
  analyzedAt: string;
}

export interface GroundedChatResponse {
  answer: string;
  sourceType: 'EVENT_DETAILS' | 'ORGANIZER_INFO' | 'PLATFORM_POLICY' | 'FAQ' | 'UNKNOWN';
  sourceCitation?: string;
  matchedEvents?: EventItem[];
  confidence: number;
}
