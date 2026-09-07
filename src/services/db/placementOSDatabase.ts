export interface CampusDrive {
  id: string;
  companyName: string;
  role: string;
  driveType: 'FULL_TIME' | 'INTERNSHIP' | 'INTERN_TO_FTE';
  ctcOrStipend: string;
  location: string;
  minCgpa: number;
  eligibleDepartments: string[];
  eligibleGraduationYears: number[];
  maxBacklogsAllowed: number;
  requiredSkills: string[];
  deadline: string;
  currentStage: 'REGISTRATION' | 'SHORTLISTING' | 'ONLINE_ASSESSMENT' | 'TECHNICAL_INTERVIEWS' | 'FINAL_OFFERS' | 'COMPLETED';
  totalApplicants: number;
  shortlistedCount: number;
  offersIssued: number;
}

export interface StudentEligibilityResult {
  isEligible: boolean;
  criteriaChecks: {
    criteria: string;
    passed: boolean;
    reason: string;
  }[];
}

const STORAGE_KEY_DRIVES = 'ace_70x_campus_drives';

export const placementOSDatabase = {
  getCampusDrives(): CampusDrive[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DRIVES);
      if (raw) return JSON.parse(raw);
    } catch {}

    const defaults: CampusDrive[] = [
      {
        id: 'drive-zoho-2027',
        companyName: 'Zoho Corporation',
        role: 'Associate Software Engineer - Cloud Architecture',
        driveType: 'FULL_TIME',
        ctcOrStipend: '₹12.5L / annum',
        location: 'Chennai, Tamil Nadu',
        minCgpa: 7.5,
        eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
        eligibleGraduationYears: [2027],
        maxBacklogsAllowed: 0,
        requiredSkills: ['TypeScript', 'Node.js', 'PostgreSQL', 'Data Structures'],
        deadline: '2026-09-30T23:59:59Z',
        currentStage: 'SHORTLISTING',
        totalApplicants: 142,
        shortlistedCount: 38,
        offersIssued: 0
      },
      {
        id: 'drive-freshworks-2027',
        companyName: 'Freshworks Technologies',
        role: 'Product Development Engineer Intern',
        driveType: 'INTERNSHIP',
        ctcOrStipend: '₹40,000 / month',
        location: 'Chennai, Tamil Nadu',
        minCgpa: 8.0,
        eligibleDepartments: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication'],
        eligibleGraduationYears: [2027, 2028],
        maxBacklogsAllowed: 0,
        requiredSkills: ['React', 'TypeScript', 'REST APIs'],
        deadline: '2026-10-15T18:00:00Z',
        currentStage: 'REGISTRATION',
        totalApplicants: 94,
        shortlistedCount: 0,
        offersIssued: 0
      }
    ];
    this.saveDrives(defaults);
    return defaults;
  },

  saveDrives(drives: CampusDrive[]) {
    try {
      localStorage.setItem(STORAGE_KEY_DRIVES, JSON.stringify(drives));
    } catch {}
  },

  evaluateStudentEligibility(
    drive: CampusDrive,
    student: { department: string; cgpa: number; graduationYear: number; currentBacklogs: number; skills: string[] }
  ): StudentEligibilityResult {
    const checks = [
      {
        criteria: 'Department Eligibility',
        passed: drive.eligibleDepartments.includes(student.department),
        reason: drive.eligibleDepartments.includes(student.department)
          ? `Department ${student.department} is eligible`
          : `Requires one of: ${drive.eligibleDepartments.join(', ')}`
      },
      {
        criteria: 'Minimum CGPA',
        passed: student.cgpa >= drive.minCgpa,
        reason: student.cgpa >= drive.minCgpa
          ? `CGPA ${student.cgpa} meets minimum threshold of ${drive.minCgpa}`
          : `CGPA ${student.cgpa} is below requirement of ${drive.minCgpa}`
      },
      {
        criteria: 'Graduation Year',
        passed: drive.eligibleGraduationYears.includes(student.graduationYear),
        reason: `Graduation year ${student.graduationYear}`
      },
      {
        criteria: 'Standing Backlogs',
        passed: student.currentBacklogs <= drive.maxBacklogsAllowed,
        reason: student.currentBacklogs === 0 ? 'Zero active backlogs' : `${student.currentBacklogs} active backlogs`
      }
    ];

    const isEligible = checks.every(c => c.passed);
    return { isEligible, criteriaChecks: checks };
  }
};
