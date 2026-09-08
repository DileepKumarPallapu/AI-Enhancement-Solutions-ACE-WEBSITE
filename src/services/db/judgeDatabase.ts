// ACE Competition & Hackathon Judge Portal Database
// Restricted scoring rubrics, conflict of interest declarations, and anonymous jury rankers

export interface JudgeAssignment {
  id: string;
  judgeUserId: string;
  judgeName: string;
  eventId: string;
  eventName: string;
  teamId: string;
  teamName: string;
  projectTitle: string;
  projectRepoUrl: string;
  liveDemoUrl?: string;
  rubrics: {
    criteriaName: string;
    maxScore: number;
    awardedScore: number;
    feedback: string;
  }[];
  totalScore: number;
  conflictOfInterestDeclared: boolean;
  isSubmitted: boolean;
  submittedAt?: string;
}

const STORAGE_KEY = 'ace_db_judge_assignments_v1';

class JudgeDatabase {
  private assignments: Map<string, JudgeAssignment> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
    if (this.assignments.size === 0) {
      this.seedInitial();
    }
  }

  private load() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const list = JSON.parse(raw) as JudgeAssignment[];
          list.forEach(a => this.assignments.set(a.id, a));
        }
      }
    } catch {
      // Fallback
    }
  }

  private save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.assignments.values())));
      }
    } catch {
      // Fallback
    }
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error(err); }
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public seedInitial() {
    const sampleAssignment: JudgeAssignment = {
      id: 'asg_judge_001',
      judgeUserId: 'usr_mentor_arun',
      judgeName: 'Dr. Arun Kumar',
      eventId: 'evt_nat_hackathon_2026',
      eventName: 'National AI & Autonomous Robotics Hackathon 2026',
      teamId: 'team_veltech_neural_01',
      teamName: 'Neural Titans - Vel Tech',
      projectTitle: 'Autonomous Multimodal Ground Rescue Drone with Edge SLAM',
      projectRepoUrl: 'https://github.com/neural-titans/ground-rescue-slam',
      liveDemoUrl: 'https://neural-titans-rescue.vercel.app',
      rubrics: [
        { criteriaName: 'Technical Architecture & Originality', maxScore: 25, awardedScore: 24, feedback: 'Clean ROS2 and edge inference architecture.' },
        { criteriaName: 'Real-World Problem Impact', maxScore: 25, awardedScore: 23, feedback: 'Strong practical application in disaster search and rescue.' },
        { criteriaName: 'Execution Quality & Demo', maxScore: 25, awardedScore: 25, feedback: 'Flawless live telemetry pipeline with zero latency drops.' },
        { criteriaName: 'UI/UX & Telemetry Polish', maxScore: 25, awardedScore: 24, feedback: 'Intuitive HUD interface with real-time bounding boxes.' }
      ],
      totalScore: 96,
      conflictOfInterestDeclared: false,
      isSubmitted: true,
      submittedAt: '2026-03-05T16:00:00Z'
    };

    this.assignments.set(sampleAssignment.id, sampleAssignment);
    this.save();
  }

  public getAssignmentsForJudge(judgeUserId: string): JudgeAssignment[] {
    const list = Array.from(this.assignments.values()).filter(a => a.judgeUserId === judgeUserId);
    if (list.length > 0) return list;
    return Array.from(this.assignments.values());
  }

  public submitScore(assignmentId: string, rubricScores: { criteriaName: string; score: number; feedback: string }[]): boolean {
    const asg = this.assignments.get(assignmentId);
    if (!asg) return false;

    let total = 0;
    asg.rubrics = asg.rubrics.map(r => {
      const updated = rubricScores.find(s => s.criteriaName === r.criteriaName);
      if (updated) {
        total += updated.score;
        return { ...r, awardedScore: updated.score, feedback: updated.feedback };
      }
      total += r.awardedScore;
      return r;
    });

    asg.totalScore = total;
    asg.isSubmitted = true;
    asg.submittedAt = new Date().toISOString();
    this.assignments.set(assignmentId, asg);
    this.save();
    return true;
  }
}

export const judgeDb = new JudgeDatabase();
