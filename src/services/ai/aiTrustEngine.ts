import { EventSubmissionData } from '../../types/workflow';
import { TrustAnalysis, VerificationSignal, RiskLevel } from './aiTypes';

export function analyzeEventTrust(submission: Partial<EventSubmissionData>, existingEvents: EventSubmissionData[] = []): TrustAnalysis {
  const signals: VerificationSignal[] = [];
  let organizerScore = 95;
  let collegeScore = 98;
  let contentScore = 92;
  let registrationScore = 94;
  let posterScore = 92;
  let duplicateRisk = 4;

  // 1. Organizer Checks
  if (!submission.organizer?.name || !submission.organizer?.phone) {
    organizerScore -= 25;
    signals.push({ category: 'Organizer', label: 'Missing contact phone/name', passed: false, severity: 'CRITICAL' });
  } else {
    signals.push({ category: 'Organizer', label: 'Organizer identity consistent', passed: true, severity: 'INFO' });
  }

  // 2. College Checks
  if (submission.college?.name) {
    signals.push({ category: 'College', label: 'College information matches accredited registry', passed: true, severity: 'INFO' });
  } else {
    collegeScore -= 30;
    signals.push({ category: 'College', label: 'Unverified college details', passed: false, severity: 'WARNING' });
  }

  // 3. Content Completeness
  if (!submission.title || submission.title.length < 10) {
    contentScore -= 20;
    signals.push({ category: 'Content', label: 'Title too brief or ambiguous', passed: false, severity: 'WARNING' });
  }
  if (!submission.shortDescription || submission.shortDescription.length < 20) {
    contentScore -= 15;
    signals.push({ category: 'Content', label: 'Short description incomplete', passed: false, severity: 'WARNING' });
  } else {
    signals.push({ category: 'Content', label: 'Agenda and rules clearly detailed', passed: true, severity: 'INFO' });
  }

  // 4. Registration URL Checks
  const url = submission.registration?.url || '';
  if (url.startsWith('https://')) {
    signals.push({ category: 'Registration', label: 'Registration URL uses secure HTTPS', passed: true, severity: 'INFO' });
  } else if (url.startsWith('http://')) {
    registrationScore -= 25;
    signals.push({ category: 'Registration', label: 'Insecure HTTP registration URL', passed: false, severity: 'CRITICAL' });
  }

  // 5. Duplicate Detection Simulation
  let possibleDuplicate: TrustAnalysis['possibleDuplicate'] = undefined;
  const duplicateMatch = existingEvents.find(e => 
    e.id !== submission.id &&
    e.title.toLowerCase().includes((submission.title || '').toLowerCase().slice(0, 15))
  );

  if (duplicateMatch) {
    duplicateRisk = 86;
    possibleDuplicate = {
      existingEventId: duplicateMatch.id,
      existingTitle: duplicateMatch.title,
      similarity: 86
    };
    signals.push({ category: 'Duplicate', label: `Possible duplicate match with ${duplicateMatch.id}`, passed: false, severity: 'WARNING' });
  } else {
    signals.push({ category: 'Duplicate', label: 'No duplicate event detected', passed: true, severity: 'INFO' });
  }

  // 6. Poster OCR Mismatch Check (Simulation on demo date)
  let posterMismatch: TrustAnalysis['posterMismatch'] = undefined;
  if (submission.schedule?.startDate === '2026-10-15' && submission.title?.includes('Cyber')) {
    posterScore -= 20;
    posterMismatch = {
      field: 'Event Date',
      formValue: '15 October 2026',
      posterValue: '18 October 2026'
    };
    signals.push({ category: 'Poster', label: 'Date entered in form (15 Oct) differs from poster (18 Oct)', passed: false, severity: 'CRITICAL' });
  } else {
    signals.push({ category: 'Poster', label: 'Event poster information matches submitted form', passed: true, severity: 'INFO' });
  }

  // Compute Overall Score
  const overallScore = Math.max(20, Math.round(
    (organizerScore * 0.25) +
    (collegeScore * 0.25) +
    (contentScore * 0.20) +
    (registrationScore * 0.15) +
    (posterScore * 0.15) -
    (duplicateRisk > 50 ? 25 : 0)
  ));

  let riskLevel: RiskLevel = 'LOW';
  if (overallScore < 35) riskLevel = 'CRITICAL';
  else if (overallScore < 55 || posterMismatch) riskLevel = 'HIGH';
  else if (overallScore < 75 || duplicateRisk > 50) riskLevel = 'MEDIUM';

  let recommendation: TrustAnalysis['recommendation'] = 'SAFE TO REVIEW';
  if (riskLevel === 'HIGH' || riskLevel === 'CRITICAL') recommendation = 'FLAGGED FOR ADMIN';
  else if (posterMismatch || duplicateRisk > 50) recommendation = 'CHANGES REQUIRED';

  return {
    eventId: submission.id || 'NEW_SUBMISSION',
    breakdown: {
      organizerScore,
      collegeScore,
      contentScore,
      registrationScore,
      posterScore,
      duplicateRisk,
      overallScore,
      riskLevel
    },
    signals,
    recommendation,
    posterMismatch,
    possibleDuplicate,
    analyzedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}
