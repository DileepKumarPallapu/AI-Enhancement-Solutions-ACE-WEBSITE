// ACE 25X Scheduled Interview Tracker Database
// Recruiter panel information, schedule dates, meeting URLs, and prep feedback

export interface ScheduledInterviewItem {
  id: string;
  studentId: string;
  companyName: string;
  companyLogoUrl: string;
  roleTitle: string;
  scheduledDate: string;
  meetingUrl: string;
  panelMembers: string[];
  status: 'SCHEDULED' | 'COMPLETED' | 'OFFER_EXTENDED' | 'REJECTED';
  prepNotes?: string;
}

class InterviewsDatabase {
  private interviews: Map<string, ScheduledInterviewItem> = new Map();

  constructor() {
    this.seedInitial();
  }

  private seedInitial() {
    const initial: ScheduledInterviewItem[] = [
      {
        id: 'int_01',
        studentId: 'usr_student_dileep',
        companyName: 'Google Cloud Labs',
        companyLogoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
        roleTitle: 'Autonomous AI Agents Research Fellow',
        scheduledDate: '2026-03-15T14:30:00Z',
        meetingUrl: 'https://meet.google.com/ace-fellowship-interview',
        panelMembers: ['Principal AI Scientist', 'Staff Distributed Systems Lead'],
        status: 'SCHEDULED',
        prepNotes: 'Review multi-agent consensus protocols, KV cache optimization, and edge Jetson Nano SLAM architecture.'
      }
    ];

    initial.forEach(i => this.interviews.set(i.id, i));
  }

  public getInterviews(studentId: string): ScheduledInterviewItem[] {
    return Array.from(this.interviews.values()).filter(i => i.studentId === studentId);
  }
}

export const interviewsDb = new InterviewsDatabase();
