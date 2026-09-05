export type CompetitionMode = 'ONLINE' | 'OFFLINE' | 'HYBRID';

export type CompetitionStatus = 
  | 'REGISTRATION_OPEN'
  | 'REGISTRATION_CLOSED'
  | 'LIVE'
  | 'JUDGING'
  | 'RESULTS_PENDING'
  | 'COMPLETED';

export interface CompetitionPrize {
  position: 1 | 2 | 3 | 4 | 5;
  title: string;
  coins: number;
  cashEquivalent: string;
  additionalReward?: string;
}

export interface CompetitionProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  starterCode: string;
  testCases: { input: string; expectedOutput: string; isHidden?: boolean }[];
  explanation: string;
}

export interface Competition {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  college: string;
  mode: CompetitionMode;
  category: 'Coding' | 'Hackathon' | 'Quiz' | 'AI' | 'Data' | 'UI/UX' | 'Aptitude';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  participantsCount: number;
  status: CompetitionStatus;
  bannerImage?: string;
  description: string;
  rules: string[];
  prizes: CompetitionPrize[];
  problems: CompetitionProblem[];
  durationMinutes: number;
  isTeamAllowed: boolean;
  maxTeamSize: number;
}

export interface CompetitionRegistration {
  id: string;
  competitionId: string;
  studentId: string;
  studentName: string;
  college: string;
  registeredAt: string;
  teamName?: string;
  teamMembers?: string[];
  status: 'CONFIRMED' | 'PENDING';
}

export interface CompetitionWinnerRecord {
  competitionId: string;
  competitionTitle: string;
  position: 1 | 2 | 3;
  coinsWon: number;
  cashEquivalent: string;
  wonAt: string;
  certificateId: string;
  claimed: boolean;
}
