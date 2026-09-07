import {
  MentorProfile,
  MentorStudentAssignment,
  MentorRequest,
  MentorSession,
  MentorNote,
  MentorGoal,
  MentorActionItem,
  MentorRecommendation,
  MentorMessage,
  MentorApplication,
  MentorStudentInsight,
  MentorAnalyticsData,
  MentorSpecialty,
  MentorshipArea
} from '../../types/mentor';

const STORAGE_KEYS = {
  MENTOR_PROFILES: 'ace_db_mentor_profiles_v2',
  MENTOR_ASSIGNMENTS: 'ace_db_mentor_assignments_v2',
  MENTOR_REQUESTS: 'ace_db_mentor_requests_v2',
  MENTOR_SESSIONS: 'ace_db_mentor_sessions_v2',
  MENTOR_NOTES: 'ace_db_mentor_notes_v2',
  MENTOR_GOALS: 'ace_db_mentor_goals_v2',
  MENTOR_ACTION_ITEMS: 'ace_db_mentor_action_items_v2',
  MENTOR_RECOMMENDATIONS: 'ace_db_mentor_recommendations_v2',
  MENTOR_MESSAGES: 'ace_db_mentor_messages_v2',
  MENTOR_APPLICATIONS: 'ace_db_mentor_applications_v2'
};

export class MentorDatabase {
  private mentors: Map<string, MentorProfile> = new Map();
  private assignments: Map<string, MentorStudentAssignment> = new Map();
  private requests: Map<string, MentorRequest> = new Map();
  private sessions: Map<string, MentorSession> = new Map();
  private notes: Map<string, MentorNote> = new Map();
  private goals: Map<string, MentorGoal> = new Map();
  private actionItems: Map<string, MentorActionItem> = new Map();
  private recommendations: Map<string, MentorRecommendation> = new Map();
  private messages: MentorMessage[] = [];
  private applications: Map<string, MentorApplication> = new Map();

  constructor() {
    this.loadFromStorage();
    if (this.mentors.size === 0) {
      this.seedInitialMentorsData();
    }
  }

  private loadFromStorage() {
    try {
      const rawMentors = localStorage.getItem(STORAGE_KEYS.MENTOR_PROFILES);
      if (rawMentors) {
        (JSON.parse(rawMentors) as MentorProfile[]).forEach(m => this.mentors.set(m.id, m));
      }

      const rawAssignments = localStorage.getItem(STORAGE_KEYS.MENTOR_ASSIGNMENTS);
      if (rawAssignments) {
        (JSON.parse(rawAssignments) as MentorStudentAssignment[]).forEach(a => this.assignments.set(a.id, a));
      }

      const rawRequests = localStorage.getItem(STORAGE_KEYS.MENTOR_REQUESTS);
      if (rawRequests) {
        (JSON.parse(rawRequests) as MentorRequest[]).forEach(r => this.requests.set(r.id, r));
      }

      const rawSessions = localStorage.getItem(STORAGE_KEYS.MENTOR_SESSIONS);
      if (rawSessions) {
        (JSON.parse(rawSessions) as MentorSession[]).forEach(s => this.sessions.set(s.id, s));
      }

      const rawNotes = localStorage.getItem(STORAGE_KEYS.MENTOR_NOTES);
      if (rawNotes) {
        (JSON.parse(rawNotes) as MentorNote[]).forEach(n => this.notes.set(n.id, n));
      }

      const rawGoals = localStorage.getItem(STORAGE_KEYS.MENTOR_GOALS);
      if (rawGoals) {
        (JSON.parse(rawGoals) as MentorGoal[]).forEach(g => this.goals.set(g.id, g));
      }

      const rawActionItems = localStorage.getItem(STORAGE_KEYS.MENTOR_ACTION_ITEMS);
      if (rawActionItems) {
        (JSON.parse(rawActionItems) as MentorActionItem[]).forEach(ai => this.actionItems.set(ai.id, ai));
      }

      const rawRecs = localStorage.getItem(STORAGE_KEYS.MENTOR_RECOMMENDATIONS);
      if (rawRecs) {
        (JSON.parse(rawRecs) as MentorRecommendation[]).forEach(rec => this.recommendations.set(rec.id, rec));
      }

      const rawMsgs = localStorage.getItem(STORAGE_KEYS.MENTOR_MESSAGES);
      if (rawMsgs) {
        this.messages = JSON.parse(rawMsgs);
      }

      const rawApps = localStorage.getItem(STORAGE_KEYS.MENTOR_APPLICATIONS);
      if (rawApps) {
        (JSON.parse(rawApps) as MentorApplication[]).forEach(app => this.applications.set(app.id, app));
      }
    } catch {
      // Fallback
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.MENTOR_PROFILES, JSON.stringify(Array.from(this.mentors.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_ASSIGNMENTS, JSON.stringify(Array.from(this.assignments.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_REQUESTS, JSON.stringify(Array.from(this.requests.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_SESSIONS, JSON.stringify(Array.from(this.sessions.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_NOTES, JSON.stringify(Array.from(this.notes.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_GOALS, JSON.stringify(Array.from(this.goals.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_ACTION_ITEMS, JSON.stringify(Array.from(this.actionItems.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_RECOMMENDATIONS, JSON.stringify(Array.from(this.recommendations.values())));
      localStorage.setItem(STORAGE_KEYS.MENTOR_MESSAGES, JSON.stringify(this.messages));
      localStorage.setItem(STORAGE_KEYS.MENTOR_APPLICATIONS, JSON.stringify(Array.from(this.applications.values())));
    } catch {
      // quota safeguard
    }
  }

  public seedInitialMentorsData() {
    const seedMentors: MentorProfile[] = [
      // PSG COLLEGE OF TECHNOLOGY MENTOR TEAM (5 Specializations)
      {
        id: 'men_psg_arun',
        userId: 'usr_mentor_arun',
        username: 'dr_arun_mentor',
        fullName: 'Dr. Arun Venkatesh, Ph.D.',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600',
        collegeId: 'col_psg',
        collegeName: 'PSG College of Technology',
        department: 'Computer Science and Engineering',
        designation: 'Principal Scientist & Visiting Professor',
        yearsOfExperience: 14,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2024-06-01',
        mentorSince: 'June 2024',
        specialties: ['ACADEMIC_CSE', 'CODING_AI_ML', 'PROJECTS_TECHNICAL'],
        mentorshipAreas: ['Academic Guidance', 'Technical Guidance', 'AI/ML', 'Research', 'Coding Practice'],
        expertiseSkills: ['PyTorch', 'Distributed Systems', 'Agentic AI', 'Computer Vision', 'Python'],
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Artificial Intelligence, IISc Bangalore',
        certifications: ['AWS Certified Solutions Architect', 'NVIDIA Deep Learning Certified Instructor'],
        professionalBio: 'Senior AI researcher with 14+ years in academia and industrial R&D. Helping engineering students build rock-solid fundamentals in algorithms and autonomous AI systems.',
        guidancePhilosophy: 'Focus on first-principles thinking, rigorous mathematical foundations, and building end-to-end production systems rather than surface-level tutorials.',
        preferredCommunication: 'ACE In-App Video & Messaging',
        maxStudentsCapacity: 30,
        currentStudentsCount: 18,
        ratingAverage: 4.95,
        ratingCount: 38,
        sessionsCompletedCount: 94,
        eventsSupportedCount: 16,
        status: 'ACTIVE',
        createdAt: '2024-06-01T00:00:00Z',
        availability: {
          availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
          slots: [
            { id: 's_1', dayOfWeek: 'Monday', startTime: '16:30', endTime: '18:30', mode: 'ONLINE', locationOrLink: 'https://meet.ace.edu/room/dr-arun-mon' },
            { id: 's_2', dayOfWeek: 'Wednesday', startTime: '17:00', endTime: '19:00', mode: 'ONLINE', locationOrLink: 'https://meet.ace.edu/room/dr-arun-wed' },
            { id: 's_3', dayOfWeek: 'Saturday', startTime: '10:00', endTime: '13:00', mode: 'ONLINE', locationOrLink: 'https://meet.ace.edu/room/dr-arun-sat' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'CHAT', 'PHONE'],
          autoAcceptSessions: false
        }
      },
      {
        id: 'men_psg_malathi',
        userId: 'usr_mentor_malathi',
        username: 'malathi_career_mentor',
        fullName: 'Prof. Malathi Ramanathan',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600',
        collegeId: 'col_psg',
        collegeName: 'PSG College of Technology',
        department: 'Information Technology & Placement Cell',
        designation: 'Associate Dean of Placements & Career Counseling',
        yearsOfExperience: 16,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2024-05-15',
        mentorSince: 'May 2024',
        specialties: ['CAREER_PLACEMENTS', 'INTERNSHIPS_RESUME'],
        mentorshipAreas: ['Career Guidance', 'Placements', 'Internships', 'Resume Guidance', 'Interview Preparation'],
        expertiseSkills: ['Technical Interviews', 'Resume Architecture', 'Product Company Prep', 'System Design', 'Behavioral HR'],
        languages: ['English', 'Tamil', 'Hindi'],
        education: 'M.Tech CSE, Anna University; Executive MBA, IIM Kozhikode',
        certifications: ['Certified Career Strategist (PARWCC)', 'SHRM-CP'],
        professionalBio: 'Placed over 4,500+ engineering graduates across Tier-1 tech firms (Google, Microsoft, Amazon, Qualcomm, Cisco). Specializes in resume tailoring, salary negotiation, and cracking rigorous SDE interviews.',
        guidancePhilosophy: 'Every student has a unique technical story. We translate your projects and problem-solving grit into high-impact resumes that pass both ATS and engineering hiring managers.',
        preferredCommunication: 'ACE In-App Video, Weekend Clinics',
        maxStudentsCapacity: 35,
        currentStudentsCount: 24,
        ratingAverage: 4.92,
        ratingCount: 52,
        sessionsCompletedCount: 142,
        eventsSupportedCount: 12,
        status: 'ACTIVE',
        createdAt: '2024-05-15T00:00:00Z',
        availability: {
          availableDays: ['Tuesday', 'Thursday', 'Saturday'],
          slots: [
            { id: 's_4', dayOfWeek: 'Tuesday', startTime: '16:00', endTime: '18:00', mode: 'ONLINE' },
            { id: 's_5', dayOfWeek: 'Thursday', startTime: '16:00', endTime: '18:00', mode: 'ONLINE' },
            { id: 's_6', dayOfWeek: 'Saturday', startTime: '14:00', endTime: '17:00', mode: 'OFFLINE', locationOrLink: 'Placement Cell Room 204' }
          ],
          sessionDurationMinutes: 30,
          breakTimeMinutes: 10,
          maxSessionsPerDay: 5,
          modesAllowed: ['ONLINE', 'OFFLINE', 'CHAT'],
          autoAcceptSessions: true
        }
      },
      {
        id: 'men_psg_karthik',
        userId: 'usr_mentor_karthik',
        username: 'karthik_events_mentor',
        fullName: 'Er. Karthik Sundaram',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600',
        collegeId: 'col_psg',
        collegeName: 'PSG College of Technology',
        department: 'Computer Science and Engineering',
        designation: 'Hackathon Coach & Club Faculty Advisor',
        yearsOfExperience: 9,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2024-07-10',
        mentorSince: 'July 2024',
        specialties: ['EVENTS_COMPETITIONS', 'CODING_AI_ML'],
        mentorshipAreas: ['Hackathon Guidance', 'Competition Guidance', 'Event Guidance', 'Leadership'],
        expertiseSkills: ['Rapid Prototyping', 'Pitch Deck Building', 'Competitive Programming', 'Smart India Hackathon', 'Hackathon Strategy'],
        languages: ['English', 'Tamil'],
        education: 'M.E. Software Engineering, PSG Tech',
        certifications: ['Grand Finalist SIH 2022 Coach', 'Google Cloud Certified Engineer'],
        professionalBio: 'Mentored 32 winning teams across Smart India Hackathon, Shaastra Techfest, and Global Hackathons. Guides students through team formation, problem statement breakdown, and pitch mastery.',
        guidancePhilosophy: 'Hackathons are won in the first 4 hours of problem definition and the last 3 minutes of the pitch demo. Speed, polish, and real business validation win.',
        preferredCommunication: 'Discord, ACE In-App Chat, Lab Demos',
        maxStudentsCapacity: 25,
        currentStudentsCount: 14,
        ratingAverage: 4.88,
        ratingCount: 29,
        sessionsCompletedCount: 68,
        eventsSupportedCount: 28,
        status: 'ACTIVE',
        createdAt: '2024-07-10T00:00:00Z',
        availability: {
          availableDays: ['Tuesday', 'Wednesday', 'Sunday'],
          slots: [
            { id: 's_7', dayOfWeek: 'Tuesday', startTime: '17:30', endTime: '19:30', mode: 'ONLINE' },
            { id: 's_8', dayOfWeek: 'Sunday', startTime: '10:00', endTime: '13:00', mode: 'ONLINE' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'CHAT'],
          autoAcceptSessions: false
        }
      },
      {
        id: 'men_psg_suresh',
        userId: 'usr_mentor_suresh',
        username: 'suresh_projects_mentor',
        fullName: 'Dr. Suresh Kumar N',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
        collegeId: 'col_psg',
        collegeName: 'PSG College of Technology',
        department: 'Computer Science and Engineering',
        designation: 'Professor of Cloud Computing & Distributed Systems',
        yearsOfExperience: 18,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2024-04-01',
        mentorSince: 'April 2024',
        specialties: ['PROJECTS_TECHNICAL', 'WEB_DEVELOPMENT', 'CYBERSECURITY'],
        mentorshipAreas: ['Project Guidance', 'Technical Guidance', 'Coding Practice'],
        expertiseSkills: ['Kubernetes', 'GoLang', 'Microservices', 'PostgreSQL', 'System Architecture', 'React'],
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Distributed Systems, IIT Madras',
        certifications: ['Certified Kubernetes Administrator (CKA)', 'Red Hat Certified Architect'],
        professionalBio: 'Specialist in taking student semester projects and scaling them to production-grade open source projects with clean architecture, CI/CD, and robust microservices.',
        guidancePhilosophy: 'Do not build toy projects. Build software that handles failures gracefully, has automated unit tests, and can be deployed with a single commit.',
        preferredCommunication: 'GitHub Reviews & ACE Sessions',
        maxStudentsCapacity: 30,
        currentStudentsCount: 16,
        ratingAverage: 4.96,
        ratingCount: 44,
        sessionsCompletedCount: 110,
        eventsSupportedCount: 15,
        status: 'ACTIVE',
        createdAt: '2024-04-01T00:00:00Z',
        availability: {
          availableDays: ['Thursday', 'Friday', 'Saturday'],
          slots: [
            { id: 's_9', dayOfWeek: 'Thursday', startTime: '17:00', endTime: '19:00', mode: 'ONLINE' },
            { id: 's_10', dayOfWeek: 'Saturday', startTime: '11:00', endTime: '13:00', mode: 'ONLINE' }
          ],
          sessionDurationMinutes: 60,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 3,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: false
        }
      },
      {
        id: 'men_psg_meera',
        userId: 'usr_mentor_meera',
        username: 'meera_higherstudies_mentor',
        fullName: 'Dr. Meera Natarajan',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600',
        collegeId: 'col_psg',
        collegeName: 'PSG College of Technology',
        department: 'Higher Education Advisory & Research Cell',
        designation: 'Advisor — International Graduate Programs & GATE Guidance',
        yearsOfExperience: 12,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2024-08-01',
        mentorSince: 'August 2024',
        specialties: ['HIGHER_STUDIES_RESEARCH', 'ACADEMIC_CSE'],
        mentorshipAreas: ['Higher Studies', 'Research', 'Academic Guidance'],
        expertiseSkills: ['GRE/TOEFL Strategy', 'GATE CSE', 'SOP Writing', 'Research Paper Publishing', 'Scholarship Grants'],
        languages: ['English', 'Tamil'],
        education: 'Postdoc, EPFL Switzerland; Ph.D. NIT Trichy',
        certifications: ['IEEE Senior Member', 'Fulbright Alumni Mentor'],
        professionalBio: 'Guided 300+ students to top global universities (CMU, Stanford, ETH Zurich, TU Munich, NUS) with full scholarships and prestigious research assistantships.',
        guidancePhilosophy: 'A compelling Statement of Purpose is built over 2 years of targeted research, genuine problem engagement, and meaningful faculty recommendations.',
        preferredCommunication: 'ACE In-App Video & Document Reviews',
        maxStudentsCapacity: 25,
        currentStudentsCount: 11,
        ratingAverage: 4.98,
        ratingCount: 22,
        sessionsCompletedCount: 54,
        eventsSupportedCount: 8,
        status: 'ACTIVE',
        createdAt: '2024-08-01T00:00:00Z',
        availability: {
          availableDays: ['Monday', 'Thursday', 'Saturday'],
          slots: [
            { id: 's_11', dayOfWeek: 'Monday', startTime: '18:00', endTime: '20:00', mode: 'ONLINE' },
            { id: 's_12', dayOfWeek: 'Saturday', startTime: '09:00', endTime: '11:00', mode: 'ONLINE' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 3,
          modesAllowed: ['ONLINE'],
          autoAcceptSessions: false
        }
      },

      // ANNA UNIVERSITY MENTOR TEAM
      {
        id: 'men_anna_ramesh',
        userId: 'usr_mentor_anna_ramesh',
        username: 'ramesh_anna_mentor',
        fullName: 'Dr. Ramesh K',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600',
        collegeId: 'col_anna',
        collegeName: 'Anna University',
        department: 'Information Technology',
        designation: 'Professor & Head of Department',
        yearsOfExperience: 20,
        isVerifiedMentor: true,
        mentorSince: 'January 2024',
        specialties: ['ACADEMIC_CSE', 'PROJECTS_TECHNICAL'],
        mentorshipAreas: ['Academic Guidance', 'Technical Guidance'],
        expertiseSkills: ['Algorithms', 'Cybersecurity', 'Database Design'],
        languages: ['English', 'Tamil'],
        education: 'Ph.D. Anna University',
        certifications: ['CISSP', 'CEH'],
        professionalBio: 'Senior academician with two decades of engineering curriculum leadership.',
        guidancePhilosophy: 'Integrity in engineering and continuous mastery of technical fundamentals.',
        preferredCommunication: 'ACE In-App',
        maxStudentsCapacity: 30,
        currentStudentsCount: 15,
        ratingAverage: 4.85,
        ratingCount: 19,
        sessionsCompletedCount: 45,
        eventsSupportedCount: 10,
        status: 'ACTIVE',
        createdAt: '2024-01-15T00:00:00Z',
        availability: {
          availableDays: ['Tuesday', 'Friday'],
          slots: [{ id: 's_13', dayOfWeek: 'Tuesday', startTime: '16:00', endTime: '18:00', mode: 'ONLINE' }],
          sessionDurationMinutes: 30,
          breakTimeMinutes: 10,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE'],
          autoAcceptSessions: true
        }
      }
    ];

    seedMentors.forEach(m => this.mentors.set(m.id, m));

    // Seed Active Mentorship Assignments for @dileepkumar (PSG Tech)
    const seedAssignments: MentorStudentAssignment[] = [
      {
        id: 'assign_1',
        studentId: 'usr_student_dileep',
        studentUsername: 'dileepkumar',
        studentName: 'Dileep Kumar Pallapu',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        studentCollege: 'PSG College of Technology',
        studentDepartment: 'Computer Science and Engineering',
        studentYear: '4th Year',
        mentorId: 'men_psg_arun',
        mentorName: 'Dr. Arun Venkatesh, Ph.D.',
        assignmentType: 'PRIMARY',
        primaryMentorshipArea: 'AI/ML',
        status: 'ACTIVE',
        assignedDate: '2026-08-01',
        lastSessionDate: '2026-09-02',
        nextFollowUpDate: '2026-09-15',
        notesCount: 3,
        activeGoalsCount: 2
      },
      {
        id: 'assign_2',
        studentId: 'usr_student_dileep',
        studentUsername: 'dileepkumar',
        studentName: 'Dileep Kumar Pallapu',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        studentCollege: 'PSG College of Technology',
        studentDepartment: 'Computer Science and Engineering',
        studentYear: '4th Year',
        mentorId: 'men_psg_malathi',
        mentorName: 'Prof. Malathi Ramanathan',
        assignmentType: 'SECONDARY',
        primaryMentorshipArea: 'Career Guidance',
        status: 'ACTIVE',
        assignedDate: '2026-08-15',
        lastSessionDate: '2026-08-28',
        nextFollowUpDate: '2026-09-18',
        notesCount: 2,
        activeGoalsCount: 1
      }
    ];
    seedAssignments.forEach(a => this.assignments.set(a.id, a));

    // Seed Sessions
    const seedSessions: MentorSession[] = [
      {
        id: 'sess_1',
        studentId: 'usr_student_dileep',
        studentName: 'Dileep Kumar Pallapu',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        studentUsername: 'dileepkumar',
        mentorId: 'men_psg_arun',
        mentorName: 'Dr. Arun Venkatesh, Ph.D.',
        mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        date: '2026-09-10',
        time: '17:00',
        durationMinutes: 45,
        topic: 'Autonomous Multi-Agent Architecture Review & SIH Prep',
        mentorshipArea: 'Technical Guidance',
        mode: 'ONLINE',
        meetingUrl: 'https://meet.ace.edu/room/dr-arun-dileep-review',
        status: 'CONFIRMED',
        createdAt: '2026-09-04T10:00:00Z'
      },
      {
        id: 'sess_2',
        studentId: 'usr_student_dileep',
        studentName: 'Dileep Kumar Pallapu',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        studentUsername: 'dileepkumar',
        mentorId: 'men_psg_arun',
        mentorName: 'Dr. Arun Venkatesh, Ph.D.',
        mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        date: '2026-09-02',
        time: '16:30',
        durationMinutes: 45,
        topic: 'Fine-Tuning LLMs vs RAG for Campus Knowledge Engine',
        mentorshipArea: 'AI/ML',
        mode: 'ONLINE',
        status: 'COMPLETED',
        mentorSummary: 'Discussed trade-offs between local quantized models (Llama 3.1 8B) and hybrid vector embeddings. Dileep has solid grasp of Redis caching and tool calling protocols.',
        studentFeedbackRating: 5,
        studentFeedbackComment: 'Extremely insightful! Dr. Arun pointed out key latency bottlenecks in streaming tokens that saved us hours of debugging.',
        studentFeedbackSubmittedAt: '2026-09-02T18:00:00Z',
        createdAt: '2026-08-29T00:00:00Z'
      }
    ];
    seedSessions.forEach(s => this.sessions.set(s.id, s));

    // Seed Goals (Student Success Plan)
    const seedGoals: MentorGoal[] = [
      {
        id: 'goal_1',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_arun',
        title: 'Master Autonomous AI Engineering & Win National Hackathon',
        targetCategory: 'TECHNICAL',
        targetDate: '2026-11-30',
        progressPercentage: 70,
        status: 'ACTIVE',
        milestones: [
          { id: 'm_1', monthIndex: 1, title: 'Multi-Agent State Graph Orchestration', description: 'Implement cyclic supervisor-agent state graph in Python & TypeScript.', completed: true, linkedOpportunity: 'coding-problem-14' },
          { id: 'm_2', monthIndex: 2, title: 'Generative UI Streaming Component Library', description: 'Build real-time interactive widgets rendered directly in agent conversation.', completed: true, linkedOpportunity: 'hackathon-national-ai' },
          { id: 'm_3', monthIndex: 3, title: 'End-to-End Multi-Tenant Deployment on Cloud', description: 'Dockerize microservices with Redis rate-limiting and low-latency embeddings.', completed: false, linkedOpportunity: 'project-showcase-ace' }
        ],
        mentorReviewNotes: 'Milestones 1 & 2 completed ahead of schedule. Ready for national hackathon competition round.',
        createdAt: '2026-08-05T00:00:00Z',
        updatedAt: '2026-09-03T00:00:00Z'
      },
      {
        id: 'goal_2',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_malathi',
        title: 'Tier-1 SDE Product Company Placement Readiness',
        targetCategory: 'CAREER',
        targetDate: '2026-12-15',
        progressPercentage: 85,
        status: 'ACTIVE',
        milestones: [
          { id: 'm_4', monthIndex: 1, title: '150 Hard LeetCode / ACE Coding Problems', description: 'Focus on Dynamic Programming, Graphs, and Segment Trees.', completed: true },
          { id: 'm_5', monthIndex: 2, title: 'High-Level & Low-Level System Design Portfolio', description: 'Document architecture for distributed message queues and caching.', completed: true },
          { id: 'm_6', monthIndex: 3, title: 'Mock Technical & Behavioral Interviews', description: 'Conduct 3 mock interview rounds with senior engineers.', completed: false }
        ],
        mentorReviewNotes: 'Resume reviewed and verified with high score. Mock interview scheduled for next week.',
        createdAt: '2026-08-16T00:00:00Z',
        updatedAt: '2026-09-01T00:00:00Z'
      }
    ];
    seedGoals.forEach(g => this.goals.set(g.id, g));

    // Seed Action Items
    const seedActionItems: MentorActionItem[] = [
      {
        id: 'act_1',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_arun',
        mentorName: 'Dr. Arun Venkatesh, Ph.D.',
        title: 'Complete Distributed Lock & Concurrency Coding Challenge',
        description: 'Practice Redis Redlock implementation for concurrent task execution before Friday.',
        priority: 'HIGH',
        deadline: '2026-09-12',
        status: 'IN_PROGRESS',
        linkedResourceUrl: '/coding/practice',
        createdAt: '2026-09-02T17:30:00Z'
      },
      {
        id: 'act_2',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_malathi',
        mentorName: 'Prof. Malathi Ramanathan',
        title: 'Refine GitHub Readme for Autonomous Agent Orchestrator',
        description: 'Add architecture mermaid diagrams and benchmark latency numbers to GitHub repository.',
        priority: 'MEDIUM',
        deadline: '2026-09-14',
        status: 'PENDING',
        createdAt: '2026-09-01T15:00:00Z'
      }
    ];
    seedActionItems.forEach(ai => this.actionItems.set(ai.id, ai));

    // Seed Mentor Recommendations (Event & Learning Guidance)
    const seedRecommendations: MentorRecommendation[] = [
      {
        id: 'rec_1',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_arun',
        mentorName: 'Dr. Arun Venkatesh, Ph.D.',
        type: 'HACKATHON',
        targetId: 'shaastra-hackathon-2026',
        title: 'Shaastra National Techfest AI Arena',
        description: '36-hour flagship hackathon at IIT Madras with enterprise problem statements.',
        reason: 'Matches your expertise in Agentic systems; exceptional opportunity to compete on a national stage.',
        categoryTag: 'AI & Hackathon',
        actionUrl: '/events/shaastra-hackathon-2026',
        status: 'REGISTERED',
        createdAt: '2026-09-01T12:00:00Z'
      },
      {
        id: 'rec_2',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_arun',
        mentorName: 'Dr. Arun Venkatesh, Ph.D.',
        type: 'CODING_PROBLEM',
        targetId: 'distributed-queue-design',
        title: 'Distributed Message Queue Concurrency Challenge',
        description: 'Test your thread safety and consumer group offset management in TypeScript/Go.',
        reason: 'Essential prerequisite for the upcoming technical round.',
        categoryTag: 'Systems Design',
        actionUrl: '/coding',
        status: 'RECOMMENDED',
        createdAt: '2026-09-03T09:00:00Z'
      }
    ];
    seedRecommendations.forEach(r => this.recommendations.set(r.id, r));

    // Seed Notes (Private & Shared)
    const seedNotes: MentorNote[] = [
      {
        id: 'note_1',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_arun',
        sessionDate: '2026-09-02',
        topic: 'AI Agent Architecture',
        discussionSummary: 'Reviewed streaming response lifecycles and tool execution loops.',
        studentConcern: 'Handling backpressure when external tools take longer than 5 seconds.',
        mentorRecommendation: 'Advised implementing optimistic UI states and worker thread timeouts.',
        priority: 'HIGH',
        privacyLevel: 'SHARED_WITH_STUDENT',
        createdAt: '2026-09-02T17:45:00Z',
        updatedAt: '2026-09-02T17:45:00Z'
      },
      {
        id: 'note_2',
        studentId: 'usr_student_dileep',
        mentorId: 'men_psg_arun',
        sessionDate: '2026-09-02',
        topic: 'Private Faculty Assessment',
        discussionSummary: 'Student shows exceptional technical initiative. Well on track for Top 1% national recognition.',
        mentorRecommendation: 'Nominate for National Youth Innovator Award.',
        priority: 'MEDIUM',
        privacyLevel: 'PRIVATE_MENTOR_NOTE',
        createdAt: '2026-09-02T18:00:00Z',
        updatedAt: '2026-09-02T18:00:00Z'
      }
    ];
    seedNotes.forEach(n => this.notes.set(n.id, n));

    // Seed Messages
    this.messages = [
      {
        id: 'msg_1',
        conversationId: 'conv_arun_dileep',
        senderId: 'men_psg_arun',
        senderName: 'Dr. Arun Venkatesh, Ph.D.',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        senderRole: 'MENTOR',
        receiverId: 'usr_student_dileep',
        content: 'Hi Dileep, I reviewed your PR for the Agent state machine. The timeout handler is clean and ready. Looking forward to our session on Thursday!',
        read: true,
        createdAt: '2026-09-03T11:00:00Z'
      },
      {
        id: 'msg_2',
        conversationId: 'conv_arun_dileep',
        senderId: 'usr_student_dileep',
        senderName: 'Dileep Kumar',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        senderRole: 'STUDENT',
        receiverId: 'men_psg_arun',
        content: 'Thank you Dr. Arun! I will benchmark the concurrent requests today and share the metrics report before our call.',
        read: true,
        createdAt: '2026-09-03T11:15:00Z'
      }
    ];

    this.saveToStorage();
  }

  // --- QUERY & DISCOVERY METHODS ---

  public getAllMentors(): MentorProfile[] {
    return Array.from(this.mentors.values());
  }

  public getMentorById(id: string): MentorProfile | undefined {
    return this.mentors.get(id);
  }

  public getMentorByUsername(username: string): MentorProfile | undefined {
    const clean = username.toLowerCase().replace('@', '').trim();
    for (const m of this.mentors.values()) {
      if (m.username.toLowerCase() === clean) return m;
    }
    return undefined;
  }

  public getMentorsByCollege(collegeIdOrName: string): MentorProfile[] {
    const clean = collegeIdOrName.toLowerCase().trim();
    return Array.from(this.mentors.values()).filter(
      m => m.collegeId.toLowerCase() === clean || m.collegeName.toLowerCase().includes(clean)
    );
  }

  public getAssignedMentorsForStudent(studentId: string): MentorStudentAssignment[] {
    return Array.from(this.assignments.values()).filter(
      a => a.studentId === studentId && a.status === 'ACTIVE'
    );
  }

  public getAssignedStudentsForMentor(mentorId: string): MentorStudentAssignment[] {
    return Array.from(this.assignments.values()).filter(
      a => a.mentorId === mentorId && a.status === 'ACTIVE'
    );
  }

  public getRequestsForMentor(mentorId: string): MentorRequest[] {
    return Array.from(this.requests.values()).filter(r => r.mentorId === mentorId);
  }

  public getRequestsForStudent(studentId: string): MentorRequest[] {
    return Array.from(this.requests.values()).filter(r => r.studentId === studentId);
  }

  public getSessionsForStudent(studentId: string): MentorSession[] {
    return Array.from(this.sessions.values())
      .filter(s => s.studentId === studentId)
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  }

  public getSessionsForMentor(mentorId: string): MentorSession[] {
    return Array.from(this.sessions.values())
      .filter(s => s.mentorId === mentorId)
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  }

  public getGoalsForStudent(studentId: string): MentorGoal[] {
    return Array.from(this.goals.values()).filter(g => g.studentId === studentId);
  }

  public getActionItemsForStudent(studentId: string): MentorActionItem[] {
    return Array.from(this.actionItems.values()).filter(ai => ai.studentId === studentId);
  }

  public getActionItemsForMentor(mentorId: string): MentorActionItem[] {
    return Array.from(this.actionItems.values()).filter(ai => ai.mentorId === mentorId);
  }

  public getRecommendationsForStudent(studentId: string): MentorRecommendation[] {
    return Array.from(this.recommendations.values()).filter(r => r.studentId === studentId);
  }

  public getNotesForStudent(studentId: string, isStudentViewing: boolean): MentorNote[] {
    return Array.from(this.notes.values()).filter(n => {
      if (n.studentId !== studentId) return false;
      if (isStudentViewing && n.privacyLevel === 'PRIVATE_MENTOR_NOTE') return false;
      return true;
    });
  }

  public getMessages(user1Id: string, user2Id: string): MentorMessage[] {
    return this.messages
      .filter(m => 
        (m.senderId === user1Id && m.receiverId === user2Id) ||
        (m.senderId === user2Id && m.receiverId === user1Id)
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // --- MUTATION METHODS ---

  public createMentorRequest(req: Omit<MentorRequest, 'id' | 'createdAt' | 'status'>): MentorRequest {
    const mentor = this.mentors.get(req.mentorId);
    if (!mentor) throw new Error('Mentor not found');

    const newReq: MentorRequest = {
      ...req,
      id: 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      status: mentor.currentStudentsCount >= mentor.maxStudentsCapacity ? 'WAITLISTED' : 'PENDING',
      createdAt: new Date().toISOString()
    };

    this.requests.set(newReq.id, newReq);
    this.saveToStorage();
    return newReq;
  }

  public respondToMentorRequest(requestId: string, accept: boolean, declineReason?: string): MentorRequest {
    const req = this.requests.get(requestId);
    if (!req) throw new Error('Request not found');

    req.status = accept ? 'ACCEPTED' : 'DECLINED';
    req.declineReason = declineReason;
    req.respondedAt = new Date().toISOString();

    if (accept) {
      // Create student assignment
      const newAssignment: MentorStudentAssignment = {
        id: 'assign_' + Date.now(),
        studentId: req.studentId,
        studentUsername: req.studentUsername,
        studentName: req.studentName,
        studentAvatar: req.studentAvatar,
        studentCollege: req.studentCollege,
        studentDepartment: req.studentDepartment,
        studentYear: req.studentYear,
        mentorId: req.mentorId,
        mentorName: req.mentorName,
        assignmentType: 'PRIMARY',
        primaryMentorshipArea: req.primaryGuidanceArea,
        status: 'ACTIVE',
        assignedDate: new Date().toISOString().split('T')[0],
        notesCount: 0,
        activeGoalsCount: 0
      };
      this.assignments.set(newAssignment.id, newAssignment);

      // Increment mentor student count
      const mentor = this.mentors.get(req.mentorId);
      if (mentor) {
        mentor.currentStudentsCount += 1;
      }
    }

    this.saveToStorage();
    return req;
  }

  public scheduleSession(sessionData: Omit<MentorSession, 'id' | 'createdAt' | 'status'>): MentorSession {
    const newSession: MentorSession = {
      ...sessionData,
      id: 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };
    this.sessions.set(newSession.id, newSession);
    this.saveToStorage();
    return newSession;
  }

  public completeSession(sessionId: string, summary: string, actionItemTitles?: string[]): MentorSession {
    const sess = this.sessions.get(sessionId);
    if (!sess) throw new Error('Session not found');

    sess.status = 'COMPLETED';
    sess.mentorSummary = summary;
    sess.actionItemsCreated = actionItemTitles || [];

    // Increment mentor completed sessions
    const mentor = this.mentors.get(sess.mentorId);
    if (mentor) {
      mentor.sessionsCompletedCount += 1;
    }

    this.saveToStorage();
    return sess;
  }

  public submitSessionFeedback(sessionId: string, rating: number, comment?: string): MentorSession {
    const sess = this.sessions.get(sessionId);
    if (!sess) throw new Error('Session not found');

    sess.studentFeedbackRating = rating;
    sess.studentFeedbackComment = comment;
    sess.studentFeedbackSubmittedAt = new Date().toISOString();

    // Recalculate mentor average rating
    const mentor = this.mentors.get(sess.mentorId);
    if (mentor) {
      const allFeedbackSessions = Array.from(this.sessions.values()).filter(
        s => s.mentorId === mentor.id && s.studentFeedbackRating !== undefined
      );
      const sum = allFeedbackSessions.reduce((acc, curr) => acc + (curr.studentFeedbackRating || 0), 0);
      mentor.ratingAverage = Number((sum / (allFeedbackSessions.length || 1)).toFixed(2));
      mentor.ratingCount = allFeedbackSessions.length;
    }

    this.saveToStorage();
    return sess;
  }

  public createGoal(goalData: Omit<MentorGoal, 'id' | 'createdAt' | 'updatedAt'>): MentorGoal {
    const newGoal: MentorGoal = {
      ...goalData,
      id: 'goal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.goals.set(newGoal.id, newGoal);
    this.saveToStorage();
    return newGoal;
  }

  public updateGoalProgress(goalId: string, progress: number, notes?: string): MentorGoal {
    const goal = this.goals.get(goalId);
    if (!goal) throw new Error('Goal not found');

    goal.progressPercentage = Math.min(100, Math.max(0, progress));
    if (progress === 100) goal.status = 'COMPLETED';
    if (notes) goal.mentorReviewNotes = notes;
    goal.updatedAt = new Date().toISOString();

    this.saveToStorage();
    return goal;
  }

  public createActionItem(item: Omit<MentorActionItem, 'id' | 'createdAt' | 'status'>): MentorActionItem {
    const newAct: MentorActionItem = {
      ...item,
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    this.actionItems.set(newAct.id, newAct);
    this.saveToStorage();
    return newAct;
  }

  public toggleActionItemStatus(itemId: string, status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED', comment?: string): MentorActionItem {
    const item = this.actionItems.get(itemId);
    if (!item) throw new Error('Action item not found');

    item.status = status;
    if (status === 'COMPLETED') {
      item.completedAt = new Date().toISOString();
    }
    if (comment) item.studentComment = comment;

    this.saveToStorage();
    return item;
  }

  public addRecommendation(rec: Omit<MentorRecommendation, 'id' | 'createdAt' | 'status'>): MentorRecommendation {
    const newRec: MentorRecommendation = {
      ...rec,
      id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      status: 'RECOMMENDED',
      createdAt: new Date().toISOString()
    };
    this.recommendations.set(newRec.id, newRec);
    this.saveToStorage();
    return newRec;
  }

  public createNote(note: Omit<MentorNote, 'id' | 'createdAt' | 'updatedAt'>): MentorNote {
    const newNote: MentorNote = {
      ...note,
      id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.notes.set(newNote.id, newNote);
    this.saveToStorage();
    return newNote;
  }

  public sendMessage(msg: Omit<MentorMessage, 'id' | 'createdAt' | 'read'>): MentorMessage {
    const newMsg: MentorMessage = {
      ...msg,
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      read: false,
      createdAt: new Date().toISOString()
    };
    this.messages.push(newMsg);
    this.saveToStorage();
    return newMsg;
  }

  public submitMentorApplication(app: Omit<MentorApplication, 'id' | 'submittedAt' | 'status'>): MentorApplication {
    const newApp: MentorApplication = {
      ...app,
      id: 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString()
    };
    this.applications.set(newApp.id, newApp);
    this.saveToStorage();
    return newApp;
  }

  public getMentorApplications(): MentorApplication[] {
    return Array.from(this.applications.values());
  }

  public getMentorAnalytics(mentorId: string): MentorAnalyticsData {
    const mentor = this.mentors.get(mentorId);
    const assigned = this.getAssignedStudentsForMentor(mentorId);
    const sessions = this.getSessionsForMentor(mentorId);
    const completedSessions = sessions.filter(s => s.status === 'COMPLETED');
    const recs = Array.from(this.recommendations.values()).filter(r => r.mentorId === mentorId);
    const eventRecs = recs.filter(r => r.type === 'EVENT' || r.type === 'HACKATHON' || r.type === 'COMPETITION');
    const registeredEvents = eventRecs.filter(r => r.status === 'REGISTERED' || r.status === 'ATTENDED');
    const goals = Array.from(this.goals.values()).filter(g => g.mentorId === mentorId);
    const completedGoals = goals.filter(g => g.status === 'COMPLETED');
    const actions = Array.from(this.actionItems.values()).filter(ai => ai.mentorId === mentorId);
    const completedActions = actions.filter(ai => ai.status === 'COMPLETED');
    const feedbackList = sessions.filter(s => s.studentFeedbackRating !== undefined);

    return {
      mentorId,
      studentsAssigned: assigned.length,
      activeStudents: assigned.filter(a => a.status === 'ACTIVE').length,
      sessionsCompleted: completedSessions.length,
      sessionsPending: sessions.filter(s => s.status === 'CONFIRMED' || s.status === 'REQUESTED').length,
      eventRecommendationsCount: eventRecs.length,
      eventRegistrationsInfluenced: registeredEvents.length,
      learningRecommendationsCount: recs.filter(r => r.type === 'COURSE' || r.type === 'CODING_PROBLEM').length,
      goalsCompletedCount: completedGoals.length,
      actionItemsCompletedCount: completedActions.length,
      averageRating: mentor ? mentor.ratingAverage : 4.9,
      feedbackEntriesCount: feedbackList.length,
      eventEngagementRate: eventRecs.length > 0 ? Math.round((registeredEvents.length / eventRecs.length) * 100) : 0,
      monthlySessionTrends: [
        { month: 'Jun', count: 12 },
        { month: 'Jul', count: 18 },
        { month: 'Aug', count: 24 },
        { month: 'Sep', count: completedSessions.length }
      ]
    };
  }
}

export const mentorDb = new MentorDatabase();
