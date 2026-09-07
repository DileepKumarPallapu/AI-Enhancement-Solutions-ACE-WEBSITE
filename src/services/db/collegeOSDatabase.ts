import { getCanonicalStudent } from './canonicalDataArchitecture';

export interface CollegeDepartment {
  id: string;
  name: string;
  code: string;
  hodName: string;
  totalStudents: number;
  totalFaculty: number;
  programs: string[];
}

export interface CollegeStudentRosterItem {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  year: string;
  cgpa: number;
  verifiedSkillsCount: number;
  placementStatus: 'ELIGIBLE' | 'PLACED' | 'OPTED_OUT' | 'NOT_ELIGIBLE';
}

export interface CollegeOSData {
  institution: {
    id: string;
    name: string;
    shortName: string;
    aisheCode: string;
    city: string;
    state: string;
    verified: boolean;
  };
  metrics: {
    totalEnrolledStudents: number;
    activeDepartmentsCount: number;
    facultyMentorsCount: number;
    activeCampusDrives: number;
    activeClubsCount: number;
    totalEventRegistrations: number;
  };
  departments: CollegeDepartment[];
  students: CollegeStudentRosterItem[];
}

export const collegeOSDatabase = {
  getCollegeData(institutionId: string = 'inst-vel-tech-rangarajan-avadi'): CollegeOSData {
    return {
      institution: {
        id: 'inst-vel-tech-rangarajan-avadi',
        name: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        shortName: 'Vel Tech',
        aisheCode: 'U-0500',
        city: 'Avadi, Chennai',
        state: 'Tamil Nadu',
        verified: true
      },
      metrics: {
        totalEnrolledStudents: 6850,
        activeDepartmentsCount: 8,
        facultyMentorsCount: 142,
        activeCampusDrives: 12,
        activeClubsCount: 18,
        totalEventRegistrations: 3420
      },
      departments: [
        {
          id: 'dept-cse',
          name: 'Computer Science and Engineering',
          code: 'CSE',
          hodName: 'Dr. P. Chandrasekar',
          totalStudents: 1420,
          totalFaculty: 68,
          programs: ['B.Tech CSE', 'B.Tech AI & Data Science', 'M.Tech CSE']
        },
        {
          id: 'dept-it',
          name: 'Information Technology',
          code: 'IT',
          hodName: 'Dr. R. Kavitha',
          totalStudents: 980,
          totalFaculty: 42,
          programs: ['B.Tech IT', 'B.Tech Cyber Security']
        },
        {
          id: 'dept-ece',
          name: 'Electronics and Communication Engineering',
          code: 'ECE',
          hodName: 'Dr. M. Suresh',
          totalStudents: 1120,
          totalFaculty: 54,
          programs: ['B.Tech ECE', 'M.Tech VLSI']
        }
      ],
      students: [
        {
          id: 'usr-student-dileep-veltech',
          name: 'Dileep Kumar',
          rollNumber: 'VTU-2023-CSE-042',
          department: 'Computer Science & Engineering',
          year: '4th Year',
          cgpa: 8.9,
          verifiedSkillsCount: 7,
          placementStatus: 'ELIGIBLE'
        },
        {
          id: 'usr-student-rohan',
          name: 'Rohan Sharma',
          rollNumber: 'VTU-2023-CSE-088',
          department: 'Computer Science & Engineering',
          year: '4th Year',
          cgpa: 8.4,
          verifiedSkillsCount: 5,
          placementStatus: 'ELIGIBLE'
        },
        {
          id: 'usr-student-sneha',
          name: 'Sneha Patel',
          rollNumber: 'VTU-2024-IT-015',
          department: 'Information Technology',
          year: '3rd Year',
          cgpa: 9.1,
          verifiedSkillsCount: 6,
          placementStatus: 'ELIGIBLE'
        }
      ]
    };
  }
};
