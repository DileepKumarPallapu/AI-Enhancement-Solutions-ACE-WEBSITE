import { Mentor, MentorshipArea, MentorType } from '../../types/mentorship';
import { mentorshipDb, CANONICAL_VEL_TECH_ID } from '../db/mentorshipDatabase';

export interface MentorMatchProfile {
  studyMajor: string;
  yearOfStudy: string;
  interests: string[];
  skillsLearning: string[];
  targetCareer: string;
  preferredAreas?: MentorshipArea[];
  preferredDays?: string[];
}

export interface MentorMatchResult {
  mentor: Mentor;
  matchScore: number;
  matchTier: 'BEST FIT' | 'HIGH MATCH' | 'STRONG FIT' | 'MODERATE FIT';
  reasons: string[];
  matchReasons: string[];
}

export class MentorMatchingService {
  matchMentors(
    student: { id: string; institutionId?: string },
    mentors: Mentor[],
    profile: MentorMatchProfile
  ): MentorMatchResult[] {
    const institutionId = student.institutionId || CANONICAL_VEL_TECH_ID;
    const eligibleMentors = mentors.filter(
      m => m.institutionId === institutionId && m.status === 'ACTIVE' && m.currentStudentCount < m.maxStudents
    );

    const results: MentorMatchResult[] = [];

    for (const mentor of eligibleMentors) {
      let score = 50; // base score
      const reasons: string[] = [];

      // Academic Department match
      if (
        profile.studyMajor.toLowerCase().includes(mentor.department.toLowerCase()) ||
        mentor.department.toLowerCase().includes(profile.studyMajor.toLowerCase())
      ) {
        score += 25;
        reasons.push(`Direct alignment with ${mentor.department}`);
      }

      // Expertise skills match
      const matchingSkills = mentor.expertiseSkills.filter(s =>
        profile.skillsLearning.some(ps => ps.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ps.toLowerCase())) ||
        profile.interests.some(pi => pi.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(pi.toLowerCase()))
      );
      if (matchingSkills.length > 0) {
        score += Math.min(matchingSkills.length * 10, 20);
        reasons.push(`Shared expertise in ${matchingSkills.slice(0, 3).join(', ')}`);
      }

      // Career target overlap
      if (mentor.specialization.toLowerCase().includes(profile.targetCareer.toLowerCase()) || profile.targetCareer.toLowerCase().includes(mentor.specialization.toLowerCase())) {
        score += 15;
        reasons.push(`Specialized mentorship for ${mentor.specialization}`);
      }

      // High rating boost
      if (mentor.rating >= 4.8) {
        score += 5;
        reasons.push(`Top-rated faculty lead (${mentor.rating.toFixed(1)}/5.0)`);
      }

      const finalScore = Math.min(Math.round(score), 99);
      let matchTier: 'BEST FIT' | 'HIGH MATCH' | 'STRONG FIT' | 'MODERATE FIT' = 'MODERATE FIT';
      if (finalScore >= 90) matchTier = 'BEST FIT';
      else if (finalScore >= 80) matchTier = 'HIGH MATCH';
      else if (finalScore >= 70) matchTier = 'STRONG FIT';

      results.push({
        mentor,
        matchScore: finalScore,
        matchTier,
        reasons: reasons.slice(0, 5),
        matchReasons: reasons.slice(0, 5)
      });
    }

    return results.sort((a, b) => b.matchScore - a.matchScore);
  }

  matchMentorsForStudent(
    student: { id: string; institutionId?: string },
    mentors: Mentor[],
    profile: MentorMatchProfile
  ): MentorMatchResult[] {
    return this.matchMentors(student, mentors, profile);
  }
}

export const mentorMatcher = new MentorMatchingService();
export const mentorMatchingService = mentorMatcher;
