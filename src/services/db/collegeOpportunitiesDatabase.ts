export interface CollegeOpportunity {
  id: string;
  title: string;
  institutionId: string;
  institutionName: string;
  departmentScope: string[];
  category: 'CAMPUS' | 'DEPARTMENT' | 'CAREER' | 'COMPETITION' | 'LEARNING' | 'INTERNSHIP' | 'SCHOLARSHIP';
  description: string;
  eligibility: string;
  deadline: string;
  curatedBy: string;
  isCollegeEndorsed: boolean;
  link: string;
}

export const collegeOpportunitiesDatabase = {
  getCollegeOpportunities(institutionId: string = 'inst-vel-tech-rangarajan-avadi'): CollegeOpportunity[] {
    return [
      {
        id: 'copp-1',
        title: 'Vel Tech R&D Autonomous Robotics Fellowship 2026',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        departmentScope: ['Computer Science & Engineering', 'Information Technology', 'Robotics & AI'],
        category: 'INTERNSHIP',
        description: 'Semester-long sponsored research fellowship working on unmanned ground vehicles with ₹20,000 monthly stipend.',
        eligibility: 'B.Tech CSE/IT/ECE 3rd or 4th year with CGPA >= 7.5',
        deadline: '2026-09-30T23:59:59Z',
        curatedBy: 'Dean of Research & Innovation, Vel Tech',
        isCollegeEndorsed: true,
        link: '/opportunities'
      },
      {
        id: 'copp-2',
        title: 'Vel Tech Smart India Hackathon Internal Ideation Round',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        departmentScope: ['All Departments'],
        category: 'COMPETITION',
        description: 'Mandatory internal college selection round to nominate official Vel Tech teams for Smart India Hackathon 2026.',
        eligibility: 'All active Vel Tech students',
        deadline: '2026-09-20T18:00:00Z',
        curatedBy: 'Institution Innovation Council (IIC) Vel Tech',
        isCollegeEndorsed: true,
        link: '/competitions'
      },
      {
        id: 'copp-3',
        title: 'Amazon Web Services (AWS) Sponsored Cloud Certification Voucher',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        departmentScope: ['Computer Science & Engineering', 'Information Technology'],
        category: 'SCHOLARSHIP',
        description: '100% fee waiver exam vouchers for AWS Solutions Architect Associate for top 50 student performers.',
        eligibility: 'Must have completed AWS Cloud Foundation module on ACE Learning Hub',
        deadline: '2026-10-10T23:59:59Z',
        curatedBy: 'Department of CSE Placements Cell',
        isCollegeEndorsed: true,
        link: '/learn'
      }
    ];
  }
};
