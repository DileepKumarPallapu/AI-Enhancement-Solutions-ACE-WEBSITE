// ACE Career Readiness Formula Analyzer Database
// Analyzes Skills, Projects, Experience, Portfolio, Communication, and Career Prep into a verifiable formula scorecard

export interface ReadinessCategoryScore {
  category: 'Skills' | 'Projects' | 'Experience' | 'Portfolio' | 'Communication' | 'CareerPrep';
  name: string;
  weight: number; // Percentage
  currentScore: number; // 0 - 100
  factors: { name: string; met: boolean; points: number; maxPoints: number; proof: string }[];
}

export interface CareerReadinessReport {
  userId: string;
  targetRole: string;
  overallScore: number; // 0 - 100
  ratingTier: 'EXCELLENT' | 'HIGH_COMPETENCY' | 'PROGRESSING' | 'DEVELOPING';
  categories: ReadinessCategoryScore[];
  topStrengths: string[];
  actionableImprovements: string[];
  lastCalculatedAt: string;
}

class CareerReadinessDatabase {
  public calculateReport(userId: string, targetRole: string = 'AI Systems Engineer'): CareerReadinessReport {
    const categories: ReadinessCategoryScore[] = [
      {
        category: 'Skills',
        name: 'Verified Technical Competencies',
        weight: 30,
        currentScore: 92,
        factors: [
          { name: 'Core Languages (TypeScript, Python)', met: true, points: 25, maxPoints: 25, proof: 'Level 7 Certificate Verified' },
          { name: 'AI & Autonomous Agent Orchestration', met: true, points: 25, maxPoints: 25, proof: 'Production Repo & Mentor Review' },
          { name: 'Distributed Systems & Cloud Docker', met: true, points: 22, maxPoints: 25, proof: 'Assessed (Score 84/100)' },
          { name: 'Kubernetes Production Clusters', met: false, points: 20, maxPoints: 25, proof: 'Lab Modules In-Progress' }
        ]
      },
      {
        category: 'Projects',
        name: 'Real-World Production Artifacts',
        weight: 25,
        currentScore: 88,
        factors: [
          { name: 'Published Open-Source Framework', met: true, points: 30, maxPoints: 30, proof: 'Neural Titans Monorepo' },
          { name: 'Live Deployed Web Application', met: true, points: 30, maxPoints: 30, proof: 'Live Vercel Production URL' },
          { name: 'Architecture Documentation & Unit Tests', met: true, points: 28, maxPoints: 40, proof: 'README & 47 Passing Unit Tests' }
        ]
      },
      {
        category: 'Experience',
        name: 'Competitions & Hackathon Wins',
        weight: 20,
        currentScore: 95,
        factors: [
          { name: 'National Hackathon Championship', met: true, points: 50, maxPoints: 50, proof: '1st Place Gold Trophy Winner' },
          { name: 'Cross-University Squad Leadership', met: true, points: 45, maxPoints: 50, proof: 'Team Leader of 4 Builders' }
        ]
      },
      {
        category: 'Portfolio',
        name: 'Public Verification & Resume Quality',
        weight: 15,
        currentScore: 90,
        factors: [
          { name: 'Cryptographic ACE Digital Student ID', met: true, points: 50, maxPoints: 50, proof: 'ACE-2026-VT9842 Verified' },
          { name: 'Live Verifiable Resume Portal', met: true, points: 40, maxPoints: 50, proof: 'Public URL with Merkle Hashes' }
        ]
      },
      {
        category: 'Communication',
        name: 'Mentorship & Collaborative Feedback',
        weight: 10,
        currentScore: 86,
        factors: [
          { name: 'Faculty Mentor Reviews & Ratings', met: true, points: 50, maxPoints: 50, proof: '5.0/5.0 Star Rating by Dr. K. Senthilkumar' },
          { name: 'Active Campus Ambassador Lead', met: true, points: 36, maxPoints: 50, proof: 'Vel Tech Ambassador Badge' }
        ]
      }
    ];

    // Compute weighted average
    let totalWeightedScore = 0;
    categories.forEach(c => {
      totalWeightedScore += (c.currentScore * (c.weight / 100));
    });

    const overallScore = Math.round(totalWeightedScore);

    let ratingTier: CareerReadinessReport['ratingTier'] = 'DEVELOPING';
    if (overallScore >= 90) ratingTier = 'EXCELLENT';
    else if (overallScore >= 80) ratingTier = 'HIGH_COMPETENCY';
    else if (overallScore >= 65) ratingTier = 'PROGRESSING';

    return {
      userId,
      targetRole,
      overallScore,
      ratingTier,
      categories,
      topStrengths: [
        'Top 1st Place National Hackathon track record with proven robotics leadership',
        'Cryptographically verified TypeScript & Autonomous Agent skill evidence',
        'Official faculty mentorship endorsement from Vel Tech University'
      ],
      actionableImprovements: [
        'Complete Kubernetes Distributed Lab Module to raise Skills pillar to 98%',
        'Publish video demo walkthrough of Autonomous SLAM Ground Rescue project'
      ],
      lastCalculatedAt: new Date().toISOString()
    };
  }
}

export const careerReadinessDb = new CareerReadinessDatabase();
