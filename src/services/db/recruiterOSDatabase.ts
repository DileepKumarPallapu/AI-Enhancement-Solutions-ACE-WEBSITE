export interface CandidateApplication {
  id: string;
  studentId: string;
  studentName: string;
  institutionName: string;
  department: string;
  cgpa: number;
  targetRole: string;
  verifiedSkills: string[];
  verifiedProjectsCount: number;
  status: 'APPLIED' | 'SHORTLISTED' | 'ASSESSMENT_SENT' | 'INTERVIEW_SCHEDULED' | 'OFFER_EXTENDED' | 'REJECTED';
  matchScore: number;
  appliedDate: string;
}

const STORAGE_KEY_APPLICATIONS = 'ace_70x_recruiter_candidates';

export const recruiterOSDatabase = {
  getCandidates(): CandidateApplication[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: CandidateApplication[] = [
      {
        id: 'cand-1',
        studentId: 'usr-student-dileep-veltech',
        studentName: 'Dileep Kumar',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute',
        department: 'Computer Science & Engineering',
        cgpa: 8.9,
        targetRole: 'Associate Software Engineer - Cloud Architecture',
        verifiedSkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
        verifiedProjectsCount: 2,
        status: 'SHORTLISTED',
        matchScore: 94,
        appliedDate: '2026-09-02T14:30:00Z'
      },
      {
        id: 'cand-2',
        studentId: 'usr-student-rohan',
        studentName: 'Rohan Sharma',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute',
        department: 'Computer Science & Engineering',
        cgpa: 8.4,
        targetRole: 'Associate Software Engineer - Cloud Architecture',
        verifiedSkills: ['Python', 'Docker', 'Machine Learning'],
        verifiedProjectsCount: 1,
        status: 'APPLIED',
        matchScore: 82,
        appliedDate: '2026-09-03T11:20:00Z'
      }
    ];
    this.saveCandidates(defaults);
    return defaults;
  },

  saveCandidates(candidates: CandidateApplication[]) {
    try {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(candidates));
    } catch {}
  },

  updateCandidateStatus(id: string, status: CandidateApplication['status']): CandidateApplication | undefined {
    const all = this.getCandidates();
    const target = all.find(c => c.id === id);
    if (target) {
      target.status = status;
      this.saveCandidates(all);
    }
    return target;
  }
};
