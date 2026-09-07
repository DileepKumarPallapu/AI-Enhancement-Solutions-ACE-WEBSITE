// ACE 25X Digital Campus Network & Club Management Database
// Institution network, club rosters, student leaders, and department challenges

export interface CollegeClub {
  id: string;
  institutionId: string;
  name: string;
  department: string;
  facultyCoordinator: string;
  presidentName: string;
  membersCount: number;
  description: string;
  activeProjectsCount: number;
  upcomingEventsCount: number;
  category: string;
  isMember: boolean;
}

class CampusNetworkDatabase {
  private clubs: Map<string, CollegeClub> = new Map();

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const initial: CollegeClub[] = [
      {
        id: 'club_veltech_airs',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        name: 'Vel Tech AI & Robotics Society (V-AIRS)',
        department: 'Computer Science & Engineering',
        facultyCoordinator: 'Dr. K. Senthilkumar',
        presidentName: 'Dileep Kumar Pallapu',
        membersCount: 340,
        description: 'Building autonomous drones, edge SLAM perception robots, and multi-agent systems. 18+ hackathon championship titles.',
        activeProjectsCount: 6,
        upcomingEventsCount: 2,
        category: 'Technical & Robotics',
        isMember: true
      },
      {
        id: 'club_veltech_oss',
        institutionId: 'inst-vel-tech-rangarajan-avadi',
        name: 'Vel Tech Open Source Developers Guild',
        department: 'Information Technology',
        facultyCoordinator: 'Dr. M. Anandan',
        presidentName: 'Sneha R',
        membersCount: 215,
        description: 'Advancing open-source contributions, distributed cloud architectures, and developer tooling.',
        activeProjectsCount: 4,
        upcomingEventsCount: 1,
        category: 'Open Source & Cloud',
        isMember: false
      }
    ];

    initial.forEach(c => this.clubs.set(c.id, c));
  }

  public getClubs(institutionId: string): CollegeClub[] {
    return Array.from(this.clubs.values()).filter(c => c.institutionId === institutionId);
  }

  public toggleMembership(clubId: string): boolean {
    const club = this.clubs.get(clubId);
    if (!club) return false;
    club.isMember = !club.isMember;
    club.membersCount += club.isMember ? 1 : -1;
    this.clubs.set(clubId, club);
    return club.isMember;
  }
}

export const campusNetworkDb = new CampusNetworkDatabase();
