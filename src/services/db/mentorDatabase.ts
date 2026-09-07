import {
  MentorProfile,
  MentorStudentAssignment,
  MentorSession,
  MentorGoal,
  MentorActionItem,
  MentorRecommendation,
  MentorNote,
  MentorMessage,
  MentorApplication,
  MentorRequest,
  MentorAnalyticsData,
  MentorFilterOptions,
  MentorSpecialty,
  MentorshipArea,
  MentorAvailabilityConfig
} from '../../types/mentor';

const STORAGE_KEY_MENTORS = 'ace_mentors_v5';
const STORAGE_KEY_ASSIGNMENTS = 'ace_mentor_assignments_v5';
const STORAGE_KEY_REQUESTS = 'ace_mentor_requests_v5';
const STORAGE_KEY_SESSIONS = 'ace_mentor_sessions_v5';
const STORAGE_KEY_GOALS = 'ace_mentor_goals_v5';
const STORAGE_KEY_ACTION_ITEMS = 'ace_mentor_actions_v5';
const STORAGE_KEY_RECOMMENDATIONS = 'ace_mentor_recs_v5';
const STORAGE_KEY_NOTES = 'ace_mentor_notes_v5';
const STORAGE_KEY_MESSAGES = 'ace_mentor_messages_v5';
const STORAGE_KEY_APPLICATIONS = 'ace_mentor_applications_v5';

const CANONICAL_VEL_TECH_NAME = 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';
const CANONICAL_VEL_TECH_ID = 'inst-vel-tech-rangarajan-avadi';

export class MentorDatabase {
  private mentors: Map<string, MentorProfile> = new Map();
  private assignments: Map<string, MentorStudentAssignment> = new Map();
  private requests: Map<string, MentorRequest> = new Map();
  private sessions: Map<string, MentorSession> = new Map();
  private goals: Map<string, MentorGoal> = new Map();
  private actionItems: Map<string, MentorActionItem> = new Map();
  private recommendations: Map<string, MentorRecommendation> = new Map();
  private notes: Map<string, MentorNote> = new Map();
  private messages: MentorMessage[] = [];
  private applications: Map<string, MentorApplication> = new Map();
  private isInitialized = false;

  constructor() {
    this.init();
  }

  public init() {
    if (this.isInitialized) return;
    this.loadFromStorage();
    if (this.mentors.size === 0) {
      this.seedInitialData();
    }
    this.isInitialized = true;
  }

  private loadFromStorage() {
    try {
      const mentorsRaw = localStorage.getItem(STORAGE_KEY_MENTORS);
      if (mentorsRaw) {
        const arr: MentorProfile[] = JSON.parse(mentorsRaw);
        arr.forEach(m => this.mentors.set(m.id, m));
      }

      const assignRaw = localStorage.getItem(STORAGE_KEY_ASSIGNMENTS);
      if (assignRaw) {
        const arr: MentorStudentAssignment[] = JSON.parse(assignRaw);
        arr.forEach(a => this.assignments.set(a.id, a));
      }

      const reqRaw = localStorage.getItem(STORAGE_KEY_REQUESTS);
      if (reqRaw) {
        const arr: MentorRequest[] = JSON.parse(reqRaw);
        arr.forEach(r => this.requests.set(r.id, r));
      }

      const sessRaw = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (sessRaw) {
        const arr: MentorSession[] = JSON.parse(sessRaw);
        arr.forEach(s => this.sessions.set(s.id, s));
      }

      const goalRaw = localStorage.getItem(STORAGE_KEY_GOALS);
      if (goalRaw) {
        const arr: MentorGoal[] = JSON.parse(goalRaw);
        arr.forEach(g => this.goals.set(g.id, g));
      }

      const actRaw = localStorage.getItem(STORAGE_KEY_ACTION_ITEMS);
      if (actRaw) {
        const arr: MentorActionItem[] = JSON.parse(actRaw);
        arr.forEach(ai => this.actionItems.set(ai.id, ai));
      }

      const recRaw = localStorage.getItem(STORAGE_KEY_RECOMMENDATIONS);
      if (recRaw) {
        const arr: MentorRecommendation[] = JSON.parse(recRaw);
        arr.forEach(r => this.recommendations.set(r.id, r));
      }

      const noteRaw = localStorage.getItem(STORAGE_KEY_NOTES);
      if (noteRaw) {
        const arr: MentorNote[] = JSON.parse(noteRaw);
        arr.forEach(n => this.notes.set(n.id, n));
      }

      const msgRaw = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (msgRaw) {
        this.messages = JSON.parse(msgRaw);
      }

      const appRaw = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (appRaw) {
        const arr: MentorApplication[] = JSON.parse(appRaw);
        arr.forEach(app => this.applications.set(app.id, app));
      }
    } catch (e) {
      console.error('Failed to load mentor DB from localStorage:', e);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_MENTORS, JSON.stringify(Array.from(this.mentors.values())));
      localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(Array.from(this.assignments.values())));
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(Array.from(this.requests.values())));
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(Array.from(this.sessions.values())));
      localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(Array.from(this.goals.values())));
      localStorage.setItem(STORAGE_KEY_ACTION_ITEMS, JSON.stringify(Array.from(this.actionItems.values())));
      localStorage.setItem(STORAGE_KEY_RECOMMENDATIONS, JSON.stringify(Array.from(this.recommendations.values())));
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(Array.from(this.notes.values())));
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(this.messages));
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(Array.from(this.applications.values())));
    } catch (e) {
      console.error('Failed to save mentor DB to localStorage:', e);
    }
  }

  private seedInitialData() {
    this.mentors.clear();
    this.assignments.clear();
    this.sessions.clear();
    this.goals.clear();
    this.actionItems.clear();
    this.recommendations.clear();
    this.notes.clear();
    this.messages = [];

    // =========================================================================
    // VEL TECH RANGARAJAN DR. SAGUNTHALA R&D INSTITUTE FACULTY MENTOR TEAM
    // =========================================================================
    const velTechMentors: MentorProfile[] = [
      {
        id: 'men_veltech_senthil',
        userId: 'usr_mentor_senthil',
        fullName: 'Dr. K. Senthilkumar, Ph.D.',
        username: 'senthilkumar_cse',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
        designation: 'Professor & Head of Computer Science',
        department: 'Department of Computer Science and Engineering',
        collegeId: CANONICAL_VEL_TECH_ID,
        collegeName: CANONICAL_VEL_TECH_NAME,
        yearsOfExperience: 18,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2023-08-15',
        mentorSince: '2023',
        specialties: ['ACADEMIC_CSE', 'CODING_AI_ML', 'PROJECTS_TECHNICAL'],
        mentorshipAreas: ['Academic Guidance', 'Technical Guidance', 'AI/ML', 'Research'],
        expertiseSkills: ['Artificial Intelligence', 'Distributed Systems', 'Python', 'Algorithm Design', 'Agentic Workflows'],
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Computer Science & Engineering (IIT Madras)',
        certifications: ['IEEE Senior Member', 'Certified Cloud Solutions Architect'],
        professionalBio: 'Senior Professor specializing in Distributed AI Systems, Multi-Agent Architectures, and Algorithm Design. 18+ years of academic research and guiding students to national hackathon championships.',
        guidancePhilosophy: 'Empower students to understand first-principles computer science and translate theoretical algorithms into robust production code.',
        preferredCommunication: 'Video Call & Campus Lab (Room 304, Academic Block 2)',
        maxStudentsCapacity: 8,
        currentStudentsCount: 0,
        ratingAverage: 4.96,
        ratingCount: 42,
        sessionsCompletedCount: 128,
        eventsSupportedCount: 15,
        availability: {
          availableDays: ['Tuesday', 'Thursday', 'Saturday'],
          slots: [
            { id: 'slot_1', dayOfWeek: 'Tuesday', startTime: '14:00', endTime: '15:30', mode: 'ONLINE' },
            { id: 'slot_2', dayOfWeek: 'Thursday', startTime: '10:00', endTime: '11:30', mode: 'OFFLINE' },
            { id: 'slot_3', dayOfWeek: 'Saturday', startTime: '10:00', endTime: '12:00', mode: 'ONLINE' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        status: 'ACTIVE',
        createdAt: '2024-01-10T00:00:00.000Z'
      },
      {
        id: 'men_veltech_jayasree',
        userId: 'usr_mentor_jayasree',
        fullName: 'Prof. R. Jayasree, M.Tech.',
        username: 'jayasree_software',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
        designation: 'Associate Professor & Technical Systems Lead',
        department: 'Department of Information Technology',
        collegeId: CANONICAL_VEL_TECH_ID,
        collegeName: CANONICAL_VEL_TECH_NAME,
        yearsOfExperience: 12,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2023-09-01',
        mentorSince: '2023',
        specialties: ['WEB_DEVELOPMENT', 'CODING_AI_ML', 'PROJECTS_TECHNICAL'],
        mentorshipAreas: ['Coding Practice', 'Technical Guidance', 'Project Guidance'],
        expertiseSkills: ['TypeScript', 'React', 'Node.js', 'System Design', 'Competitive Programming', 'GraphQL'],
        languages: ['English', 'Tamil', 'Telugu'],
        education: 'M.Tech in Software Systems (Anna University)',
        certifications: ['AWS Certified Developer', 'Scrum Master Certified'],
        professionalBio: 'Passionate coding coach and full-stack systems architect. Dedicated to helping students excel in competitive programming, high-scale cloud apps, and open-source contributions.',
        guidancePhilosophy: 'Consistent daily problem solving combined with hands-on full-stack product building is the fastest path to mastery.',
        preferredCommunication: 'Online Video & ACE Code Sandbox',
        maxStudentsCapacity: 8,
        currentStudentsCount: 0,
        ratingAverage: 4.92,
        ratingCount: 36,
        sessionsCompletedCount: 94,
        eventsSupportedCount: 12,
        availability: {
          availableDays: ['Monday', 'Wednesday', 'Friday'],
          slots: [
            { id: 'slot_4', dayOfWeek: 'Monday', startTime: '15:00', endTime: '16:30', mode: 'ONLINE' },
            { id: 'slot_5', dayOfWeek: 'Wednesday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE' },
            { id: 'slot_6', dayOfWeek: 'Friday', startTime: '10:00', endTime: '12:00', mode: 'OFFLINE' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        status: 'ACTIVE',
        createdAt: '2024-01-15T00:00:00.000Z'
      },
      {
        id: 'men_veltech_muralidharan',
        userId: 'usr_mentor_muralidharan',
        fullName: 'Dr. A. Muralidharan, Ph.D.',
        username: 'muralidharan_research',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
        designation: 'Professor & Dean of Research and Higher Studies',
        department: 'School of Computing',
        collegeId: CANONICAL_VEL_TECH_ID,
        collegeName: CANONICAL_VEL_TECH_NAME,
        yearsOfExperience: 20,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2023-07-20',
        mentorSince: '2023',
        specialties: ['HIGHER_STUDIES_RESEARCH', 'DATA_SCIENCE', 'ACADEMIC_CSE'],
        mentorshipAreas: ['Higher Studies', 'Research', 'Academic Guidance'],
        expertiseSkills: ['Research Paper Writing', 'GRE / TOEFL Advisory', 'Patent Filing', 'Computer Vision', 'Deep Learning'],
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Image Processing & AI (IISc Bangalore)',
        certifications: ['ACM Distinguished Speaker', 'Published 40+ Scopus Papers'],
        professionalBio: 'Guiding undergraduate and postgraduate scholars through international research publications, MS/Ph.D. admissions in global top 50 universities, and patented innovation projects.',
        guidancePhilosophy: 'High-impact research begins with a clear hypothesis, rigorous experimental discipline, and writing clarity.',
        preferredCommunication: 'Dean Office, Administrative Tower & Scheduled Google Meet',
        maxStudentsCapacity: 6,
        currentStudentsCount: 0,
        ratingAverage: 4.95,
        ratingCount: 50,
        sessionsCompletedCount: 140,
        eventsSupportedCount: 20,
        availability: {
          availableDays: ['Tuesday', 'Thursday'],
          slots: [
            { id: 'slot_7', dayOfWeek: 'Tuesday', startTime: '11:00', endTime: '12:30', mode: 'OFFLINE' },
            { id: 'slot_8', dayOfWeek: 'Thursday', startTime: '15:00', endTime: '17:00', mode: 'ONLINE' }
          ],
          sessionDurationMinutes: 60,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 3,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        status: 'ACTIVE',
        createdAt: '2024-01-05T00:00:00.000Z'
      },
      {
        id: 'men_veltech_priya',
        userId: 'usr_mentor_priya',
        fullName: 'Prof. V. Priya, MBA, B.E.',
        username: 'priya_careers',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
        designation: 'Head of Industry Relations & Placement Readiness',
        department: 'Department of Training and Placements',
        collegeId: CANONICAL_VEL_TECH_ID,
        collegeName: CANONICAL_VEL_TECH_NAME,
        yearsOfExperience: 14,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2023-08-10',
        mentorSince: '2023',
        specialties: ['CAREER_PLACEMENTS', 'INTERNSHIPS_RESUME'],
        mentorshipAreas: ['Career Guidance', 'Placements', 'Resume Guidance', 'Interview Preparation', 'Internships'],
        expertiseSkills: ['Technical Interview Prep', 'Resume Engineering', 'Behavioral Rounds', 'Product Management', 'Salary Negotiation'],
        languages: ['English', 'Tamil', 'Hindi'],
        education: 'MBA (HR & Tech Management), B.E. (CSE)',
        certifications: ['Certified Corporate Career Coach', 'SHRM-CP'],
        professionalBio: 'Connecting students with tier-1 technology firms, unicorns, and high-growth startups. Specialized in resume optimization, technical interview strategies, and salary negotiations.',
        guidancePhilosophy: 'Every student has unique strengths. Structuring your profile story and mastering behavioral + technical rounds ensures placement success.',
        preferredCommunication: 'Placements Wing, Block 1 & Online Video',
        maxStudentsCapacity: 10,
        currentStudentsCount: 0,
        ratingAverage: 4.90,
        ratingCount: 65,
        sessionsCompletedCount: 180,
        eventsSupportedCount: 25,
        availability: {
          availableDays: ['Monday', 'Wednesday', 'Friday'],
          slots: [
            { id: 'slot_9', dayOfWeek: 'Monday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE' },
            { id: 'slot_10', dayOfWeek: 'Wednesday', startTime: '11:00', endTime: '13:00', mode: 'OFFLINE' },
            { id: 'slot_11', dayOfWeek: 'Friday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE' }
          ],
          sessionDurationMinutes: 30,
          breakTimeMinutes: 10,
          maxSessionsPerDay: 6,
          modesAllowed: ['ONLINE', 'OFFLINE', 'PHONE'],
          autoAcceptSessions: true
        },
        status: 'ACTIVE',
        createdAt: '2024-01-08T00:00:00.000Z'
      },
      {
        id: 'men_veltech_balasubramanian',
        userId: 'usr_mentor_balasubramanian',
        fullName: 'Dr. S. Balasubramanian, Ph.D.',
        username: 'balasubramanian_hackathons',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
        designation: 'Associate Professor & Student Innovation Hub Mentor',
        department: 'Department of Electronics and Computer Engineering',
        collegeId: CANONICAL_VEL_TECH_ID,
        collegeName: CANONICAL_VEL_TECH_NAME,
        yearsOfExperience: 15,
        isVerifiedMentor: true,
        verifiedBadgeDate: '2023-09-12',
        mentorSince: '2023',
        specialties: ['EVENTS_COMPETITIONS', 'PROJECTS_TECHNICAL', 'CODING_AI_ML'],
        mentorshipAreas: ['Hackathon Guidance', 'Competition Guidance', 'Project Guidance', 'Event Guidance'],
        expertiseSkills: ['Rapid Prototyping', 'IoT & Embedded AI', 'Pitch Deck Presentation', 'Product UI/UX', 'Hackathon Strategy'],
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Embedded Systems & AI (NIT Trichy)',
        certifications: ['Smart India Hackathon Jury Member', 'Intel Edge AI Certified'],
        professionalBio: 'Chief Mentor for National Hackathons (Smart India Hackathon, Shaastra, Pragyan). Mentors cross-functional engineering squads from ideation to winning product demos.',
        guidancePhilosophy: 'Win hackathons by solving genuine user friction with working, deployable prototypes and razor-sharp pitch delivery.',
        preferredCommunication: 'Student Innovation Hub, Vel Tech Avadi Campus & Online Chat',
        maxStudentsCapacity: 8,
        currentStudentsCount: 0,
        ratingAverage: 4.94,
        ratingCount: 38,
        sessionsCompletedCount: 110,
        eventsSupportedCount: 30,
        availability: {
          availableDays: ['Tuesday', 'Thursday', 'Saturday'],
          slots: [
            { id: 'slot_12', dayOfWeek: 'Tuesday', startTime: '15:00', endTime: '17:00', mode: 'OFFLINE' },
            { id: 'slot_13', dayOfWeek: 'Thursday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE' },
            { id: 'slot_14', dayOfWeek: 'Saturday', startTime: '14:00', endTime: '16:30', mode: 'ONLINE' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        status: 'ACTIVE',
        createdAt: '2024-01-12T00:00:00.000Z'
      }
    ];

    velTechMentors.forEach(m => this.mentors.set(m.id, m));
    this.saveToStorage();
  }

  // --- QUERY & DISCOVERY METHODS ---

  public getAllMentors(): MentorProfile[] {
    this.init();
    return Array.from(this.mentors.values());
  }

  public getMentorById(id: string): MentorProfile | undefined {
    this.init();
    return this.mentors.get(id);
  }

  public getMentorByUsername(username: string): MentorProfile | undefined {
    this.init();
    const clean = username.toLowerCase().replace('@', '').trim();
    for (const m of this.mentors.values()) {
      if (m.username.toLowerCase() === clean) return m;
    }
    return undefined;
  }

  // Strict College/Institution Isolated Search
  public getMentorsByCollege(collegeIdOrName: string): MentorProfile[] {
    this.init();
    if (!collegeIdOrName) return [];
    const clean = collegeIdOrName.toLowerCase().trim();
    return Array.from(this.mentors.values()).filter(m => {
      if (m.status !== 'ACTIVE') return false;
      const mColId = (m.collegeId || '').toLowerCase();
      const mColName = (m.collegeName || '').toLowerCase();
      return mColId === clean || mColName === clean || mColName.includes(clean);
    });
  }

  // Strict Student Eligible Mentor Finder
  public getEligibleMentorsForStudent(student: { institutionId?: string; college?: string; id?: string }): MentorProfile[] {
    this.init();
    const targetInstitution = student.institutionId || student.college || CANONICAL_VEL_TECH_NAME;
    return this.getMentorsByCollege(targetInstitution);
  }

  public getAssignedMentorsForStudent(studentId: string): MentorStudentAssignment[] {
    this.init();
    return Array.from(this.assignments.values()).filter(a => a.studentId === studentId && a.status === 'ACTIVE');
  }

  public getAssignedStudentsForMentor(mentorId: string): MentorStudentAssignment[] {
    this.init();
    return Array.from(this.assignments.values()).filter(a => a.mentorId === mentorId && a.status === 'ACTIVE');
  }

  public getRequestsForMentor(mentorId: string): MentorRequest[] {
    this.init();
    return Array.from(this.requests.values()).filter(r => r.mentorId === mentorId && r.status === 'PENDING');
  }

  public getSessionsForStudent(studentId: string): MentorSession[] {
    this.init();
    return Array.from(this.sessions.values())
      .filter(s => s.studentId === studentId)
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  }

  public getSessionsForMentor(mentorId: string): MentorSession[] {
    this.init();
    return Array.from(this.sessions.values())
      .filter(s => s.mentorId === mentorId)
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  }

  public getGoalsForStudent(studentId: string): MentorGoal[] {
    this.init();
    return Array.from(this.goals.values()).filter(g => g.studentId === studentId);
  }

  public getActionItemsForStudent(studentId: string): MentorActionItem[] {
    this.init();
    return Array.from(this.actionItems.values()).filter(ai => ai.studentId === studentId);
  }

  public getActionItemsForMentor(mentorId: string): MentorActionItem[] {
    this.init();
    return Array.from(this.actionItems.values()).filter(ai => ai.mentorId === mentorId);
  }

  public getRecommendationsForStudent(studentId: string): MentorRecommendation[] {
    this.init();
    return Array.from(this.recommendations.values()).filter(r => r.studentId === studentId);
  }

  public getNotesForStudent(studentId: string, isStudentViewing: boolean): MentorNote[] {
    this.init();
    return Array.from(this.notes.values()).filter(n => {
      if (n.studentId !== studentId) return false;
      if (isStudentViewing && n.privacyLevel === 'PRIVATE_MENTOR_NOTE') return false;
      return true;
    });
  }

  public getMessages(user1Id: string, user2Id: string): MentorMessage[] {
    this.init();
    return this.messages
      .filter(m => 
        (m.senderId === user1Id && m.receiverId === user2Id) ||
        (m.senderId === user2Id && m.receiverId === user1Id)
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // --- MUTATION METHODS ---

  public createMentorRequest(req: Omit<MentorRequest, 'id' | 'createdAt' | 'status'>): MentorRequest {
    this.init();
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
    this.init();
    const req = this.requests.get(requestId);
    if (!req) throw new Error('Request not found');

    req.status = accept ? 'ACCEPTED' : 'DECLINED';
    req.declineReason = declineReason;
    req.respondedAt = new Date().toISOString();

    if (accept) {
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

      const mentor = this.mentors.get(req.mentorId);
      if (mentor) {
        mentor.currentStudentsCount += 1;
      }
    }

    this.saveToStorage();
    return req;
  }

  public scheduleSession(sessionData: Omit<MentorSession, 'id' | 'createdAt' | 'status'>): MentorSession {
    this.init();
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
    this.init();
    const sess = this.sessions.get(sessionId);
    if (!sess) throw new Error('Session not found');

    sess.status = 'COMPLETED';
    sess.mentorSummary = summary;
    sess.actionItemsCreated = actionItemTitles || [];

    const mentor = this.mentors.get(sess.mentorId);
    if (mentor) {
      mentor.sessionsCompletedCount += 1;
    }

    this.saveToStorage();
    return sess;
  }

  public submitSessionFeedback(sessionId: string, rating: number, comment?: string): MentorSession {
    this.init();
    const sess = this.sessions.get(sessionId);
    if (!sess) throw new Error('Session not found');

    sess.studentFeedbackRating = rating;
    sess.studentFeedbackComment = comment;

    const mentor = this.mentors.get(sess.mentorId);
    if (mentor) {
      const currentTotal = mentor.ratingAverage * mentor.ratingCount;
      mentor.ratingCount += 1;
      mentor.ratingAverage = Number(((currentTotal + rating) / mentor.ratingCount).toFixed(2));
    }

    this.saveToStorage();
    return sess;
  }

  public createGoal(goalData: Omit<MentorGoal, 'id' | 'createdAt' | 'updatedAt'>): MentorGoal {
    this.init();
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
    this.init();
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
    this.init();
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

  public toggleActionItemStatus(itemId: string, status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED', studentComment?: string): MentorActionItem {
    this.init();
    const item = this.actionItems.get(itemId);
    if (!item) throw new Error('Action item not found');

    item.status = status;
    if (studentComment) item.studentComment = studentComment;
    if (status === 'COMPLETED') item.completedAt = new Date().toISOString();

    this.saveToStorage();
    return item;
  }

  public addRecommendation(rec: Omit<MentorRecommendation, 'id' | 'createdAt' | 'status'>): MentorRecommendation {
    this.init();
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
    this.init();
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
    this.init();
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

  public submitMentorApplication(appData: Omit<MentorApplication, 'id' | 'submittedAt' | 'status'>): MentorApplication {
    this.init();
    const newApp: MentorApplication = {
      ...appData,
      id: 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString()
    };
    this.applications.set(newApp.id, newApp);
    this.saveToStorage();
    return newApp;
  }

  public getMentorAnalytics(mentorId: string): MentorAnalyticsData {
    this.init();
    const mentor = this.mentors.get(mentorId);
    const assignedStudents = Array.from(this.assignments.values()).filter(a => a.mentorId === mentorId);
    const completedSessions = Array.from(this.sessions.values()).filter(s => s.mentorId === mentorId && s.status === 'COMPLETED');
    const pendingSessions = Array.from(this.sessions.values()).filter(s => s.mentorId === mentorId && s.status === 'CONFIRMED');
    const recs = Array.from(this.recommendations.values()).filter(r => r.mentorId === mentorId);

    return {
      mentorId,
      studentsAssigned: assignedStudents.length,
      activeStudents: assignedStudents.filter(a => a.status === 'ACTIVE').length,
      sessionsCompleted: completedSessions.length,
      sessionsPending: pendingSessions.length,
      eventRecommendationsCount: recs.length,
      eventRegistrationsInfluenced: Math.round(recs.length * 0.75),
      learningRecommendationsCount: recs.filter(r => r.type === 'COURSE' || r.type === 'CODING_PROBLEM').length,
      goalsCompletedCount: Array.from(this.goals.values()).filter(g => g.mentorId === mentorId && g.status === 'COMPLETED').length,
      actionItemsCompletedCount: Array.from(this.actionItems.values()).filter(a => a.mentorId === mentorId && a.status === 'COMPLETED').length,
      averageRating: mentor ? mentor.ratingAverage : 4.9,
      feedbackEntriesCount: mentor ? mentor.ratingCount : 0,
      monthlySessionTrends: [
        { month: 'Oct', count: 12 },
        { month: 'Nov', count: 18 },
        { month: 'Dec', count: 24 },
        { month: 'Jan', count: 32 }
      ],
      eventEngagementRate: 88
    };
  }
}

export const mentorDb = new MentorDatabase();
