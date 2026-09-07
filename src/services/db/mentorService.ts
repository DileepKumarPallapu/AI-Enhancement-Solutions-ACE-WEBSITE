import { mentorDb } from './mentorDatabase';
import { MentorProfile, MentorSpecialty, MentorshipArea } from '../../types/mentor';
import { Account } from '../../types/account';

export interface AiMentorMatchCriteria {
  studyMajor: string;
  yearOfStudy: string;
  interests: string[];
  skillsLearning: string[];
  targetCareer: string;
  guidanceType: MentorshipArea[];
  preferredCommunication: string;
  preferredDays: string[];
}

export interface MentorMatchResult {
  mentor: MentorProfile;
  matchTier: 'Strong match' | 'Good match' | 'Potential match';
  matchScore: number;
  reasons: string[];
}

export class MentorService {
  /**
   * Evaluates mentors for a student based on verifiable factors without fake random scores.
   */
  public matchMentorsForStudent(student: Account, criteria: AiMentorMatchCriteria): MentorMatchResult[] {
    const studentCollege = student.college;
    const availableMentors = mentorDb.getMentorsByCollege(studentCollege);

    const results: MentorMatchResult[] = availableMentors.map(mentor => {
      let score = 50; // base verified college affinity
      const reasons: string[] = [];

      // 1. Department match
      if (mentor.department.toLowerCase().includes(criteria.studyMajor.toLowerCase()) ||
          criteria.studyMajor.toLowerCase().includes(mentor.department.toLowerCase())) {
        score += 15;
        reasons.push(`Same department expertise (${mentor.department})`);
      }

      // 2. Target Career alignment
      const careerText = (criteria.targetCareer || '').toLowerCase();
      const hasCareerMatch = mentor.expertiseSkills.some(s => careerText.includes(s.toLowerCase())) ||
        mentor.mentorshipAreas.some(a => a.toLowerCase().includes('career') || a.toLowerCase().includes('placement'));
      if (hasCareerMatch) {
        score += 15;
        reasons.push(`Target career alignment for ${criteria.targetCareer}`);
      }

      // 3. Guidance type match
      const matchingAreas = mentor.mentorshipAreas.filter(area => criteria.guidanceType.includes(area));
      if (matchingAreas.length > 0) {
        score += 10;
        reasons.push(`Offers specialized guidance in ${matchingAreas.slice(0, 2).join(', ')}`);
      }

      // 4. Skills overlap
      const skillMatches = mentor.expertiseSkills.filter(sk => 
        criteria.skillsLearning.some(sl => sl.toLowerCase().includes(sk.toLowerCase()) || sk.toLowerCase().includes(sl.toLowerCase()))
      );
      if (skillMatches.length > 0) {
        score += 10;
        reasons.push(`Mentors skills you are learning (${skillMatches.slice(0, 2).join(', ')})`);
      }

      // Capacity penalty if almost full
      if (mentor.currentStudentsCount >= mentor.maxStudentsCapacity) {
        score -= 10;
      }

      const finalScore = Math.min(98, Math.max(60, score));
      let matchTier: 'Strong match' | 'Good match' | 'Potential match' = 'Potential match';
      if (finalScore >= 85) matchTier = 'Strong match';
      else if (finalScore >= 75) matchTier = 'Good match';

      return {
        mentor,
        matchTier,
        matchScore: finalScore,
        reasons
      };
    });

    return results.sort((a, b) => b.matchScore - a.matchScore);
  }
}

export const mentorService = new MentorService();
