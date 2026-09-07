export interface DepartmentData {
  id: string;
  name: string;
  shortCode: string;
  institutionName: string;
  hodName: string;
  totalStudents: number;
  totalFaculty: number;
  facultyRoster: { name: string; designation: string; specialization: string }[];
  activeProjects: { title: string; lead: string; domain: string; status: string }[];
  upcomingEvents: { title: string; date: string; venue: string }[];
  recentAchievements: { title: string; studentOrTeam: string; year: string }[];
}

export const departmentHubDatabase = {
  getDepartmentById(deptId: string): DepartmentData {
    return {
      id: deptId,
      name: 'Department of Computer Science and Engineering',
      shortCode: 'CSE',
      institutionName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      hodName: 'Dr. P. Chandrasekar, M.E., Ph.D.',
      totalStudents: 1420,
      totalFaculty: 68,
      facultyRoster: [
        { name: 'Dr. P. Chandrasekar', designation: 'Professor & Head of Department', specialization: 'High Performance Computing' },
        { name: 'Dr. S. Ramanathan', designation: 'Professor', specialization: 'Distributed Systems & Cloud Architecture' },
        { name: 'Dr. K. Anitha', designation: 'Associate Professor', specialization: 'Artificial Intelligence & Computer Vision' },
        { name: 'Prof. M. Karthik', designation: 'Assistant Professor', specialization: 'Cybersecurity & Blockchain' }
      ],
      activeProjects: [
        { title: 'Vel Tech Autonomous Campus Shuttle Navigation', lead: 'AI Student Lab Squad', domain: 'Robotics & Vision', status: 'In Progress' },
        { title: 'Decentralized Academic Credential Ledger', lead: 'Blockchain Research Cell', domain: 'Cryptography', status: 'Beta Testing' }
      ],
      upcomingEvents: [
        { title: 'CSE Annual Technical Symposium: CYBERFEST 2026', date: '2026-10-05', venue: 'Vel Tech Dr. Sagunthala Auditorium' },
        { title: 'Industry Workshop on Production Kubernetes', date: '2026-09-22', venue: 'CSE Smart Lab 4' }
      ],
      recentAchievements: [
        { title: '1st Prize - National Smart India Hackathon', studentOrTeam: 'Team Vel Tech Alpha', year: '2026' },
        { title: 'Best Paper Award - IEEE International Conference on AI', studentOrTeam: 'Dileep Kumar & Dr. S. Ramanathan', year: '2026' }
      ]
    };
  }
};
