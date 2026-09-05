import { DOMAINS_TAXONOMY, RoleDefinition, getDomainById, getRoleById } from '../../data/taxonomyData';
import { INTELLIGENCE_COURSES, IntelligenceCourse } from '../../data/courseIntelligenceCatalog';

export interface StudentLearnerProfile {
  domainId: string;
  targetRoleId: string;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  verifiedSkills: string[];
  knownLanguages: string[];
  completedCourseIds: string[];
  inProgressCourseIds: string[];
}

export interface CourseRecommendationResult {
  course: IntelligenceCourse;
  matchScore: number; // 0 - 100
  confidence: 'High' | 'Medium' | 'Low';
  isPrerequisiteSatisfied: boolean;
  missingPrerequisites: string[];
  whyRecommended: string[];
  whyNotRecommended?: string;
  scoringBreakdown: {
    roleMatchScore: number;       // Max 30
    skillGapScore: number;        // Max 25
    prerequisiteScore: number;    // Max 15
    languageScore: number;        // Max 10
    levelScore: number;           // Max 10
    goalScore: number;            // Max 5
    historyScore: number;         // Max 5
  };
}

export interface SkillGapItem {
  skillName: string;
  currentMastery: number; // 0 - 100
  targetBenchmark: number; // e.g. 90
  status: 'Mastered' | 'In Progress' | 'High Gap' | 'Not Started';
  priority: 'High' | 'Medium' | 'Low';
}

export class CourseIntelligenceEngine {
  /**
   * Main Recommendation Algorithm: Ranks and computes mathematically explainable recommendations.
   */
  public getPersonalizedRecommendations(profile: StudentLearnerProfile): {
    nextBestCourse?: CourseRecommendationResult;
    rankedCourses: CourseRecommendationResult[];
    skillGaps: SkillGapItem[];
    roadmapSteps: Array<{
      stepNumber: number;
      title: string;
      status: 'Completed' | 'In Progress' | 'Next Recommended' | 'Upcoming' | 'Locked';
      tag: string;
      courseMatch?: IntelligenceCourse;
    }>;
  } {
    const role = getRoleById(profile.targetRoleId);
    if (!role) {
      return { rankedCourses: [], skillGaps: [], roadmapSteps: [] };
    }

    // 1. Calculate Skill Gaps
    const skillGaps = this.calculateSkillGaps(profile, role);

    // 2. Score Every Course in Catalog
    const evaluatedCourses: CourseRecommendationResult[] = [];

    for (const course of INTELLIGENCE_COURSES) {
      if (!course.isPublished) continue;

      // Duplicate check: Skip already completed courses in primary recommendations
      if (profile.completedCourseIds.includes(course.id)) continue;

      const scored = this.scoreCourse(course, profile, role);

      // STRICT VALIDATION: Filter out completely unrelated domain courses
      if (course.domainId !== profile.domainId && !course.targetRoleIds.includes(profile.targetRoleId)) {
        continue;
      }

      evaluatedCourses.push(scored);
    }

    // Sort by Match Score descending
    evaluatedCourses.sort((a, b) => b.matchScore - a.matchScore);

    // Find the Next Best Course: Highest scored course whose prerequisites are 100% satisfied
    const nextBestCourse = evaluatedCourses.find(c => c.isPrerequisiteSatisfied);

    // 3. Generate Step-by-Step Learning Roadmap
    const roadmapSteps = this.generateRoadmap(profile, role);

    return {
      nextBestCourse,
      rankedCourses: evaluatedCourses,
      skillGaps,
      roadmapSteps
    };
  }

  /**
   * Evaluates and scores an individual course against student profile and target role.
   */
  public scoreCourse(
    course: IntelligenceCourse,
    profile: StudentLearnerProfile,
    role: RoleDefinition
  ): CourseRecommendationResult {
    let roleMatchScore = 0;
    let skillGapScore = 0;
    let prerequisiteScore = 0;
    let languageScore = 0;
    let levelScore = 0;
    let goalScore = 5;
    let historyScore = 5;
    const whyRecommended: string[] = [];
    const missingPrerequisites: string[] = [];

    // A. Role Match (Max 30)
    if (course.targetRoleIds.includes(role.id)) {
      roleMatchScore = 30;
      whyRecommended.push(`Directly aligned with your target ${role.title} role`);
    } else if (course.domainId === profile.domainId) {
      roleMatchScore = 15;
      whyRecommended.push(`Relevant core skill in the ${profile.domainId} domain`);
    }

    // B. Prerequisite Validation (Max 15)
    let isPrerequisiteSatisfied = true;
    if (course.prerequisiteSkillIds.length > 0) {
      const unsatisfied = course.prerequisiteSkillIds.filter(
        req => !profile.verifiedSkills.some(v => v.toLowerCase().includes(req.toLowerCase()))
      );

      if (unsatisfied.length === 0) {
        prerequisiteScore = 15;
        whyRecommended.push(`Prerequisites satisfied (${course.prerequisiteSkillIds.join(', ')})`);
      } else {
        isPrerequisiteSatisfied = false;
        prerequisiteScore = 0;
        missingPrerequisites.push(...unsatisfied);
      }
    } else {
      prerequisiteScore = 15;
      whyRecommended.push('No prerequisites required — open for direct enrollment');
    }

    // C. Skill Gap Match (Max 25)
    const matchedGapSkills = course.skillsCovered.filter(
      s => !profile.verifiedSkills.some(v => v.toLowerCase().includes(s.toLowerCase()))
    );

    if (matchedGapSkills.length > 0) {
      const gapRatio = Math.min(1, matchedGapSkills.length / Math.max(1, course.skillsCovered.length));
      skillGapScore = Math.round(gapRatio * 25);
      whyRecommended.push(`Builds critical skill gaps: ${matchedGapSkills.slice(0, 2).join(', ')}`);
    } else {
      skillGapScore = 8;
    }

    // D. Language Match (Max 10)
    if (course.languageIds.length === 0) {
      languageScore = 10;
    } else {
      const matchesRoleLanguage = course.languageIds.some(l => role.requiredLanguages.includes(l));
      const matchesKnownLanguage = course.languageIds.some(l => profile.knownLanguages.includes(l));

      if (matchesRoleLanguage) {
        languageScore = 10;
        whyRecommended.push(`Covers standard required language: ${course.languageIds.join(', ')}`);
      } else if (matchesKnownLanguage) {
        languageScore = 7;
      }
    }

    // E. Current Level Match (Max 10)
    if (course.level === profile.currentLevel) {
      levelScore = 10;
      whyRecommended.push(`Optimized for your current ${profile.currentLevel} proficiency level`);
    } else if (profile.currentLevel === 'Beginner' && course.level === 'Intermediate' && isPrerequisiteSatisfied) {
      levelScore = 8;
    } else if (profile.currentLevel === 'Advanced' && course.level === 'Advanced') {
      levelScore = 10;
    } else {
      levelScore = 4;
    }

    // Adjust if prerequisites not met: Penalty on final score
    let finalScore = roleMatchScore + skillGapScore + prerequisiteScore + languageScore + levelScore + goalScore + historyScore;
    if (!isPrerequisiteSatisfied) {
      finalScore = Math.max(10, finalScore - 30);
    }

    const confidence: 'High' | 'Medium' | 'Low' = finalScore >= 80 ? 'High' : finalScore >= 55 ? 'Medium' : 'Low';

    let whyNotRecommended: string | undefined;
    if (!isPrerequisiteSatisfied) {
      whyNotRecommended = `Missing foundational prerequisites: ${missingPrerequisites.join(', ')}. Complete foundational courses first.`;
    }

    return {
      course,
      matchScore: Math.min(99, Math.max(10, finalScore)),
      confidence,
      isPrerequisiteSatisfied,
      missingPrerequisites,
      whyRecommended,
      whyNotRecommended,
      scoringBreakdown: {
        roleMatchScore,
        skillGapScore,
        prerequisiteScore,
        languageScore,
        levelScore,
        goalScore,
        historyScore
      }
    };
  }

  /**
   * Compares verified student skills against target role required skills.
   */
  public calculateSkillGaps(profile: StudentLearnerProfile, role: RoleDefinition): SkillGapItem[] {
    const gaps: SkillGapItem[] = [];

    for (const skill of role.coreSkills) {
      const isVerified = profile.verifiedSkills.some(v => v.toLowerCase().includes(skill.toLowerCase()));
      const isKnown = profile.knownLanguages.some(k => skill.toLowerCase().includes(k.toLowerCase()));

      let currentMastery = 0;
      let status: SkillGapItem['status'] = 'Not Started';
      let priority: SkillGapItem['priority'] = 'High';

      if (isVerified) {
        currentMastery = 85;
        status = 'Mastered';
        priority = 'Low';
      } else if (isKnown) {
        currentMastery = 40;
        status = 'In Progress';
        priority = 'Medium';
      } else {
        currentMastery = 10;
        status = 'High Gap';
        priority = 'High';
      }

      gaps.push({
        skillName: skill,
        currentMastery,
        targetBenchmark: 90,
        status,
        priority
      });
    }

    return gaps;
  }

  /**
   * Generates sequential milestones with status indicators.
   */
  public generateRoadmap(profile: StudentLearnerProfile, role: RoleDefinition) {
    return role.roadmapSequence.map((step, idx) => {
      let status: 'Completed' | 'In Progress' | 'Next Recommended' | 'Upcoming' | 'Locked' = 'Upcoming';

      // Find matching course for this step if any
      const matchingCourse = INTELLIGENCE_COURSES.find(
        c => c.targetRoleIds.includes(role.id) && c.skillsCovered.some(s => step.toLowerCase().includes(s.toLowerCase()))
      );

      if (idx === 0 && profile.verifiedSkills.length > 0) {
        status = 'Completed';
      } else if (idx === 1 && profile.verifiedSkills.length > 0) {
        status = 'In Progress';
      } else if (idx === 2) {
        status = 'Next Recommended';
      } else if (idx > 3) {
        status = 'Locked';
      }

      return {
        stepNumber: idx + 1,
        title: step,
        status,
        tag: idx === 0 ? 'Foundation' : idx < 4 ? 'Core' : 'Advanced & Capstone',
        courseMatch: matchingCourse
      };
    });
  }
}

export const courseIntelligence = new CourseIntelligenceEngine();
