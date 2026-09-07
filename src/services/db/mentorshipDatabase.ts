// =========================================================================
// ACE PLATFORM — COMPLETE MENTORSHIP ECOSYSTEM DATABASE & SERVICE
// =========================================================================

import {
  Mentor,
  MentorshipAssignment,
  MentorshipRequest,
  MentorshipGoal,
  ActionPlan,
  MentorshipSession,
  MentorshipFeedback,
  MentorshipNote,
  MentorshipMessage,
  MentorResource,
  MentorshipAuditLog,
  MentorMeetingBrief,
  AcademicSchool,
  MentorshipArea,
  MentorType,
  GoalCategory
} from '../../types/mentorship';

const STORAGE_KEY_MENTORS = 'ace_mentorship_mentors_v6';
const STORAGE_KEY_ASSIGNMENTS = 'ace_mentorship_assignments_v6';
const STORAGE_KEY_REQUESTS = 'ace_mentorship_requests_v6';
const STORAGE_KEY_GOALS = 'ace_mentorship_goals_v6';
const STORAGE_KEY_ACTION_PLANS = 'ace_mentorship_action_plans_v6';
const STORAGE_KEY_SESSIONS = 'ace_mentorship_sessions_v6';
const STORAGE_KEY_FEEDBACK = 'ace_mentorship_feedback_v6';
const STORAGE_KEY_NOTES = 'ace_mentorship_notes_v6';
const STORAGE_KEY_MESSAGES = 'ace_mentorship_messages_v6';
const STORAGE_KEY_RESOURCES = 'ace_mentorship_resources_v6';
const STORAGE_KEY_AUDIT_LOGS = 'ace_mentorship_audit_v6';

export const CANONICAL_VEL_TECH_ID = 'inst-vel-tech-rangarajan-avadi';
export const CANONICAL_VEL_TECH_NAME = 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';
export const CANONICAL_VEL_TECH_ADDRESS = 'No. 42, Avadi-Vel Tech Road, Vel Nagar, Avadi, Chennai - 600062, Tamil Nadu, India';

// =========================================================================
// VEL TECH CANONICAL ACADEMIC STRUCTURE (SCHOOLS & DEPARTMENTS)
// =========================================================================
export const VEL_TECH_ACADEMIC_SCHOOLS: AcademicSchool[] = [
  {
    id: 'sch-computing',
    name: 'School of Computing',
    code: 'SOC',
    departments: [
      {
        id: 'dept-cse',
        name: 'Department of Computer Science and Engineering',
        code: 'CSE',
        schoolId: 'sch-computing',
        programs: [
          { id: 'prog-btech-cse', name: 'B.Tech Computer Science & Engineering', degree: 'B.Tech', departmentId: 'dept-cse', durationYears: 4 },
          { id: 'prog-btech-ai-ml', name: 'B.Tech CSE (Artificial Intelligence & Machine Learning)', degree: 'B.Tech', departmentId: 'dept-cse', durationYears: 4 },
          { id: 'prog-btech-data-science', name: 'B.Tech CSE (Data Science)', degree: 'B.Tech', departmentId: 'dept-cse', durationYears: 4 },
          { id: 'prog-mtech-cse', name: 'M.Tech Computer Science & Engineering', degree: 'M.Tech', departmentId: 'dept-cse', durationYears: 2 }
        ]
      },
      {
        id: 'dept-it',
        name: 'Department of Information Technology',
        code: 'IT',
        schoolId: 'sch-computing',
        programs: [
          { id: 'prog-btech-it', name: 'B.Tech Information Technology', degree: 'B.Tech', departmentId: 'dept-it', durationYears: 4 }
        ]
      }
    ]
  },
  {
    id: 'sch-ece-eee',
    name: 'School of Electrical and Communication',
    code: 'SEC',
    departments: [
      {
        id: 'dept-ece',
        name: 'Department of Electronics and Communication Engineering',
        code: 'ECE',
        schoolId: 'sch-ece-eee',
        programs: [
          { id: 'prog-btech-ece', name: 'B.Tech Electronics & Communication Engineering', degree: 'B.Tech', departmentId: 'dept-ece', durationYears: 4 }
        ]
      },
      {
        id: 'dept-eee',
        name: 'Department of Electrical and Electronics Engineering',
        code: 'EEE',
        schoolId: 'sch-ece-eee',
        programs: [
          { id: 'prog-btech-eee', name: 'B.Tech Electrical & Electronics Engineering', degree: 'B.Tech', departmentId: 'dept-eee', durationYears: 4 }
        ]
      }
    ]
  },
  {
    id: 'sch-mech-civil',
    name: 'School of Mechanical and Construction',
    code: 'SMC',
    departments: [
      {
        id: 'dept-mech',
        name: 'Department of Mechanical Engineering',
        code: 'MECH',
        schoolId: 'sch-mech-civil',
        programs: [
          { id: 'prog-btech-mech', name: 'B.Tech Mechanical Engineering', degree: 'B.Tech', departmentId: 'dept-mech', durationYears: 4 }
        ]
      },
      {
        id: 'dept-aero',
        name: 'Department of Aeronautical Engineering',
        code: 'AERO',
        schoolId: 'sch-mech-civil',
        programs: [
          { id: 'prog-btech-aero', name: 'B.Tech Aeronautical Engineering', degree: 'B.Tech', departmentId: 'dept-aero', durationYears: 4 }
        ]
      },
      {
        id: 'dept-civil',
        name: 'Department of Civil Engineering',
        code: 'CIVIL',
        schoolId: 'sch-mech-civil',
        programs: [
          { id: 'prog-btech-civil', name: 'B.Tech Civil Engineering', degree: 'B.Tech', departmentId: 'dept-civil', durationYears: 4 }
        ]
      }
    ]
  },
  {
    id: 'sch-bio',
    name: 'School of Bioengineering',
    code: 'SBE',
    departments: [
      {
        id: 'dept-biotech',
        name: 'Department of Biotechnology',
        code: 'BIOTECH',
        schoolId: 'sch-bio',
        programs: [
          { id: 'prog-btech-biotech', name: 'B.Tech Biotechnology', degree: 'B.Tech', departmentId: 'dept-biotech', durationYears: 4 }
        ]
      },
      {
        id: 'dept-biomed',
        name: 'Department of Biomedical Engineering',
        code: 'BIOMED',
        schoolId: 'sch-bio',
        programs: [
          { id: 'prog-btech-biomed', name: 'B.Tech Biomedical Engineering', degree: 'B.Tech', departmentId: 'dept-biomed', durationYears: 4 }
        ]
      }
    ]
  },
  {
    id: 'sch-sciences',
    name: 'School of Science and Humanities',
    code: 'SSH',
    departments: [
      {
        id: 'dept-physics',
        name: 'Department of Physics & Computational Sciences',
        code: 'PHYSICS',
        schoolId: 'sch-sciences',
        programs: [
          { id: 'prog-msc-physics', name: 'M.Sc Applied Physics', degree: 'M.Sc', departmentId: 'dept-physics', durationYears: 2 }
        ]
      },
      {
        id: 'dept-math',
        name: 'Department of Mathematics & Analytics',
        code: 'MATH',
        schoolId: 'sch-sciences',
        programs: [
          { id: 'prog-msc-math', name: 'M.Sc Mathematics & Computing', degree: 'M.Sc', departmentId: 'dept-math', durationYears: 2 }
        ]
      }
    ]
  },
  {
    id: 'sch-mgmt',
    name: 'School of Management',
    code: 'SOM',
    departments: [
      {
        id: 'dept-mgmt',
        name: 'Department of Management Studies',
        code: 'MGMT',
        schoolId: 'sch-mgmt',
        programs: [
          { id: 'prog-mba-general', name: 'Master of Business Administration (MBA)', degree: 'MBA', departmentId: 'dept-mgmt', durationYears: 2 },
          { id: 'prog-bba', name: 'Bachelor of Business Administration (BBA)', degree: 'BBA', departmentId: 'dept-mgmt', durationYears: 3 }
        ]
      }
    ]
  },
  {
    id: 'sch-law',
    name: 'School of Law',
    code: 'SOL',
    departments: [
      {
        id: 'dept-law',
        name: 'Department of Legal Studies & Intellectual Property',
        code: 'LAW',
        schoolId: 'sch-law',
        programs: [
          { id: 'prog-llb', name: 'B.A. LL.B. (Hons)', degree: 'LL.B', departmentId: 'dept-law', durationYears: 5 }
        ]
      }
    ]
  },
  {
    id: 'sch-media',
    name: 'School of Media Technology & Communication',
    code: 'SMTC',
    departments: [
      {
        id: 'dept-viscom',
        name: 'Department of Visual Communication & UI/UX',
        code: 'VISCOM',
        schoolId: 'sch-media',
        programs: [
          { id: 'prog-bsc-viscom', name: 'B.Sc Visual Communication', degree: 'B.Sc', departmentId: 'dept-viscom', durationYears: 3 }
        ]
      }
    ]
  },
  {
    id: 'sch-commerce',
    name: 'School of Commerce',
    code: 'SOCM',
    departments: [
      {
        id: 'dept-commerce',
        name: 'Department of Commerce & Fintech',
        code: 'COM',
        schoolId: 'sch-commerce',
        programs: [
          { id: 'prog-bcom', name: 'B.Com Professional Accounting & Fintech', degree: 'B.Com', departmentId: 'dept-commerce', durationYears: 3 }
        ]
      }
    ]
  }
];

export class MentorshipDatabase {
  private mentors: Map<string, Mentor> = new Map();
  private assignments: Map<string, MentorshipAssignment> = new Map();
  private requests: Map<string, MentorshipRequest> = new Map();
  private goals: Map<string, MentorshipGoal> = new Map();
  private actionPlans: Map<string, ActionPlan> = new Map();
  private sessions: Map<string, MentorshipSession> = new Map();
  private feedback: Map<string, MentorshipFeedback> = new Map();
  private notes: Map<string, MentorshipNote> = new Map();
  private messages: MentorshipMessage[] = [];
  private resources: Map<string, MentorResource> = new Map();
  private auditLogs: MentorshipAuditLog[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  public init() {
    if (this.isInitialized) return;
    this.loadFromStorage();
    if (this.mentors.size === 0) {
      this.seedCanonicalData();
    }
    this.isInitialized = true;
  }

  private loadFromStorage() {
    try {
      const mentorsRaw = localStorage.getItem(STORAGE_KEY_MENTORS);
      if (mentorsRaw) JSON.parse(mentorsRaw).forEach((m: Mentor) => this.mentors.set(m.id, m));

      const assignRaw = localStorage.getItem(STORAGE_KEY_ASSIGNMENTS);
      if (assignRaw) JSON.parse(assignRaw).forEach((a: MentorshipAssignment) => this.assignments.set(a.id, a));

      const reqRaw = localStorage.getItem(STORAGE_KEY_REQUESTS);
      if (reqRaw) JSON.parse(reqRaw).forEach((r: MentorshipRequest) => this.requests.set(r.id, r));

      const goalRaw = localStorage.getItem(STORAGE_KEY_GOALS);
      if (goalRaw) JSON.parse(goalRaw).forEach((g: MentorshipGoal) => this.goals.set(g.id, g));

      const planRaw = localStorage.getItem(STORAGE_KEY_ACTION_PLANS);
      if (planRaw) JSON.parse(planRaw).forEach((p: ActionPlan) => this.actionPlans.set(p.id, p));

      const sessRaw = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (sessRaw) JSON.parse(sessRaw).forEach((s: MentorshipSession) => this.sessions.set(s.id, s));

      const fbRaw = localStorage.getItem(STORAGE_KEY_FEEDBACK);
      if (fbRaw) JSON.parse(fbRaw).forEach((f: MentorshipFeedback) => this.feedback.set(f.id, f));

      const noteRaw = localStorage.getItem(STORAGE_KEY_NOTES);
      if (noteRaw) JSON.parse(noteRaw).forEach((n: MentorshipNote) => this.notes.set(n.id, n));

      const msgRaw = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (msgRaw) this.messages = JSON.parse(msgRaw);

      const resRaw = localStorage.getItem(STORAGE_KEY_RESOURCES);
      if (resRaw) JSON.parse(resRaw).forEach((r: MentorResource) => this.resources.set(r.id, r));

      const auditRaw = localStorage.getItem(STORAGE_KEY_AUDIT_LOGS);
      if (auditRaw) this.auditLogs = JSON.parse(auditRaw);
    } catch (e) {
      console.error('Failed to load mentorship database from localStorage:', e);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_MENTORS, JSON.stringify(Array.from(this.mentors.values())));
      localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(Array.from(this.assignments.values())));
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(Array.from(this.requests.values())));
      localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(Array.from(this.goals.values())));
      localStorage.setItem(STORAGE_KEY_ACTION_PLANS, JSON.stringify(Array.from(this.actionPlans.values())));
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(Array.from(this.sessions.values())));
      localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(Array.from(this.feedback.values())));
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(Array.from(this.notes.values())));
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(this.messages));
      localStorage.setItem(STORAGE_KEY_RESOURCES, JSON.stringify(Array.from(this.resources.values())));
      localStorage.setItem(STORAGE_KEY_AUDIT_LOGS, JSON.stringify(this.auditLogs));
    } catch (e) {
      console.error('Failed to save mentorship database to localStorage:', e);
    }
  }

  private seedCanonicalData() {
    this.mentors.clear();
    this.assignments.clear();
    this.requests.clear();
    this.goals.clear();
    this.actionPlans.clear();
    this.sessions.clear();
    this.feedback.clear();
    this.notes.clear();
    this.messages = [];
    this.resources.clear();
    this.auditLogs = [];

    // =========================================================================
    // VERIFIED VEL TECH FACULTY MENTORS (OFFICIAL DOMAIN LEADS)
    // =========================================================================
    const initialMentors: Mentor[] = [
      {
        id: 'men_veltech_senthil',
        userId: 'usr_mentor_senthil',
        institutionId: CANONICAL_VEL_TECH_ID,
        institutionName: CANONICAL_VEL_TECH_NAME,
        schoolId: 'sch-computing',
        schoolName: 'School of Computing',
        departmentId: 'dept-cse',
        departmentName: 'Department of Computer Science and Engineering',
        name: 'Dr. K. Senthilkumar',
        fullName: 'Dr. K. Senthilkumar, Ph.D.',
        username: 'senthilkumar_cse',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
        bio: 'Senior Professor specializing in Distributed AI Systems, Multi-Agent Architectures, and Algorithm Design. 18+ years of academic research and guiding students to national hackathon championships.',
        designation: 'Professor & Head of Computer Science',
        school: 'School of Computing',
        department: 'Department of Computer Science and Engineering',
        specialization: 'Artificial Intelligence & Distributed Algorithms',
        expertise: ['AI/ML', 'Distributed Systems', 'Python', 'Algorithm Design', 'Agentic Workflows'],
        expertiseSkills: ['AI/ML', 'Distributed Systems', 'Python', 'Algorithm Design', 'Agentic Workflows'],
        mentorType: 'ACADEMIC',
        specialties: ['ACADEMIC_CSE', 'CODING_AI_ML', 'PROJECTS_TECHNICAL'],
        mentorshipAreas: ['Academic Guidance', 'Technical Guidance', 'AI/ML', 'Research'],
        experienceYears: 18,
        yearsOfExperience: 18,
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Computer Science & Engineering (IIT Madras)',
        certifications: ['IEEE Senior Member', 'Certified Cloud Solutions Architect'],
        guidancePhilosophy: 'Empower students to understand first-principles computer science and translate theoretical algorithms into robust production code.',
        preferredCommunication: 'Video Call & Campus Lab (Room 304, Academic Block 2)',
        availability: {
          availableDays: ['Tuesday', 'Thursday', 'Saturday'],
          slots: [
            { id: 'slot_1', dayOfWeek: 'Tuesday', startTime: '14:00', endTime: '15:30', mode: 'ONLINE', locationOrRoom: 'ACE Virtual Room #1' },
            { id: 'slot_2', dayOfWeek: 'Thursday', startTime: '10:00', endTime: '11:30', mode: 'OFFLINE', locationOrRoom: 'Room 304, Academic Block 2' },
            { id: 'slot_3', dayOfWeek: 'Saturday', startTime: '10:00', endTime: '12:00', mode: 'ONLINE', locationOrRoom: 'ACE Virtual Room #1' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        maxStudents: 8,
        maxStudentsCapacity: 8,
        currentStudentCount: 0,
        currentStudentsCount: 0,
        verificationStatus: 'VERIFIED',
        isVerifiedMentor: true,
        verificationBadges: ['College Verified', 'Faculty Verified', 'ACE Verified'],
        verifiedBadgeDate: '2023-08-15',
        status: 'ACTIVE',
        rating: 4.96,
        ratingAverage: 4.96,
        ratingCount: 42,
        totalSessions: 128,
        sessionsCompletedCount: 128,
        eventsSupportedCount: 15,
        contactEmail: 'dr.senthilkumar@veltech.edu.in',
        contactPhone: '+91 94441 23456',
        officeLocation: 'Room 304, Academic Block 2, Vel Tech Avadi Campus',
        createdAt: '2024-01-10T00:00:00.000Z',
        updatedAt: '2024-01-10T00:00:00.000Z'
      },
      {
        id: 'men_veltech_jayasree',
        userId: 'usr_mentor_jayasree',
        institutionId: CANONICAL_VEL_TECH_ID,
        institutionName: CANONICAL_VEL_TECH_NAME,
        schoolId: 'sch-computing',
        schoolName: 'School of Computing',
        departmentId: 'dept-it',
        departmentName: 'Department of Information Technology',
        name: 'Prof. R. Jayasree',
        fullName: 'Prof. R. Jayasree, M.Tech.',
        username: 'jayasree_software',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
        bio: 'Passionate coding coach and full-stack systems architect. Dedicated to helping students excel in competitive programming, high-scale cloud apps, and open-source contributions.',
        designation: 'Associate Professor & Technical Systems Lead',
        school: 'School of Computing',
        department: 'Department of Information Technology',
        specialization: 'Full Stack Architecture & Cloud Systems',
        expertise: ['TypeScript', 'React', 'Node.js', 'System Design', 'Competitive Programming', 'GraphQL'],
        expertiseSkills: ['TypeScript', 'React', 'Node.js', 'System Design', 'Competitive Programming', 'GraphQL'],
        mentorType: 'TECHNICAL',
        specialties: ['WEB_DEVELOPMENT', 'CODING_AI_ML', 'PROJECTS_TECHNICAL'],
        mentorshipAreas: ['Coding Practice', 'Technical Guidance', 'Project Guidance'],
        experienceYears: 12,
        yearsOfExperience: 12,
        languages: ['English', 'Tamil', 'Telugu'],
        education: 'M.Tech in Software Systems (Anna University)',
        certifications: ['AWS Certified Developer', 'Scrum Master Certified'],
        guidancePhilosophy: 'Consistent daily problem solving combined with hands-on full-stack product building is the fastest path to mastery.',
        preferredCommunication: 'Online Video & ACE Code Sandbox',
        availability: {
          availableDays: ['Monday', 'Wednesday', 'Friday'],
          slots: [
            { id: 'slot_4', dayOfWeek: 'Monday', startTime: '15:00', endTime: '16:30', mode: 'ONLINE', locationOrRoom: 'ACE Code Sandbox Room' },
            { id: 'slot_5', dayOfWeek: 'Wednesday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE', locationOrRoom: 'ACE Code Sandbox Room' },
            { id: 'slot_6', dayOfWeek: 'Friday', startTime: '10:00', endTime: '12:00', mode: 'OFFLINE', locationOrRoom: 'Room 212, Tech Innovation Centre' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        maxStudents: 8,
        maxStudentsCapacity: 8,
        currentStudentCount: 0,
        currentStudentsCount: 0,
        verificationStatus: 'VERIFIED',
        isVerifiedMentor: true,
        verificationBadges: ['College Verified', 'Faculty Verified', 'Industry Verified'],
        verifiedBadgeDate: '2023-09-01',
        status: 'ACTIVE',
        rating: 4.92,
        ratingAverage: 4.92,
        ratingCount: 36,
        totalSessions: 94,
        sessionsCompletedCount: 94,
        eventsSupportedCount: 12,
        contactEmail: 'prof.jayasree@veltech.edu.in',
        contactPhone: '+91 94442 34567',
        officeLocation: 'Room 212, Tech Innovation Centre, Vel Tech Campus',
        createdAt: '2024-01-15T00:00:00.000Z',
        updatedAt: '2024-01-15T00:00:00.000Z'
      },
      {
        id: 'men_veltech_muralidharan',
        userId: 'usr_mentor_muralidharan',
        institutionId: CANONICAL_VEL_TECH_ID,
        institutionName: CANONICAL_VEL_TECH_NAME,
        schoolId: 'sch-computing',
        schoolName: 'School of Computing',
        departmentId: 'dept-cse',
        departmentName: 'Department of Computer Science and Engineering',
        name: 'Dr. A. Muralidharan',
        fullName: 'Dr. A. Muralidharan, Ph.D.',
        username: 'muralidharan_research',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
        bio: 'Guiding undergraduate and postgraduate scholars through international research publications, MS/Ph.D. admissions in global top 50 universities, and patented innovation projects.',
        designation: 'Professor & Dean of Research and Higher Studies',
        school: 'School of Computing',
        department: 'School of Computing',
        specialization: 'Research Methodologies & Higher Studies Advisory',
        expertise: ['Research Paper Writing', 'GRE / TOEFL Advisory', 'Patent Filing', 'Computer Vision', 'Deep Learning'],
        expertiseSkills: ['Research Paper Writing', 'GRE / TOEFL Advisory', 'Patent Filing', 'Computer Vision', 'Deep Learning'],
        mentorType: 'HIGHER_STUDIES',
        specialties: ['HIGHER_STUDIES_RESEARCH', 'DATA_SCIENCE', 'ACADEMIC_CSE'],
        mentorshipAreas: ['Higher Studies', 'Research', 'Academic Guidance'],
        experienceYears: 20,
        yearsOfExperience: 20,
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Image Processing & AI (IISc Bangalore)',
        certifications: ['ACM Distinguished Speaker', 'Published 40+ Scopus Papers'],
        guidancePhilosophy: 'High-impact research begins with a clear hypothesis, rigorous experimental discipline, and writing clarity.',
        preferredCommunication: 'Dean Office, Administrative Tower & Scheduled Google Meet',
        availability: {
          availableDays: ['Tuesday', 'Thursday'],
          slots: [
            { id: 'slot_7', dayOfWeek: 'Tuesday', startTime: '11:00', endTime: '12:30', mode: 'OFFLINE', locationOrRoom: 'Dean Office, Administrative Tower' },
            { id: 'slot_8', dayOfWeek: 'Thursday', startTime: '15:00', endTime: '17:00', mode: 'ONLINE', locationOrRoom: 'ACE Virtual Research Room' }
          ],
          sessionDurationMinutes: 60,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 3,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        maxStudents: 6,
        maxStudentsCapacity: 6,
        currentStudentCount: 0,
        currentStudentsCount: 0,
        verificationStatus: 'VERIFIED',
        isVerifiedMentor: true,
        verificationBadges: ['College Verified', 'Faculty Verified', 'ACE Verified'],
        verifiedBadgeDate: '2023-07-20',
        status: 'ACTIVE',
        rating: 4.95,
        ratingAverage: 4.95,
        ratingCount: 50,
        totalSessions: 140,
        sessionsCompletedCount: 140,
        eventsSupportedCount: 20,
        contactEmail: 'dr.muralidharan@veltech.edu.in',
        contactPhone: '+91 94443 45678',
        officeLocation: 'Dean Office, Administrative Tower, Vel Tech Campus',
        createdAt: '2024-01-05T00:00:00.000Z',
        updatedAt: '2024-01-05T00:00:00.000Z'
      },
      {
        id: 'men_veltech_priya',
        userId: 'usr_mentor_priya',
        institutionId: CANONICAL_VEL_TECH_ID,
        institutionName: CANONICAL_VEL_TECH_NAME,
        schoolId: 'sch-mgmt',
        schoolName: 'School of Management',
        departmentId: 'dept-mgmt',
        departmentName: 'Department of Training and Placements',
        name: 'Prof. V. Priya',
        fullName: 'Prof. V. Priya, MBA, B.E.',
        username: 'priya_careers',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
        bio: 'Connecting students with tier-1 technology firms, unicorns, and high-growth startups. Specialized in resume optimization, technical interview strategies, and salary negotiations.',
        designation: 'Head of Industry Relations & Placement Readiness',
        school: 'School of Management',
        department: 'Department of Training and Placements',
        specialization: 'Campus Recruitment & Industry Placement Strategy',
        expertise: ['Technical Interview Prep', 'Resume Engineering', 'Behavioral Rounds', 'Product Management', 'Salary Negotiation'],
        expertiseSkills: ['Technical Interview Prep', 'Resume Engineering', 'Behavioral Rounds', 'Product Management', 'Salary Negotiation'],
        mentorType: 'CAREER',
        specialties: ['CAREER_PLACEMENTS', 'INTERNSHIPS_RESUME'],
        mentorshipAreas: ['Career Guidance', 'Placements', 'Resume Guidance', 'Interview Preparation', 'Internships'],
        experienceYears: 14,
        yearsOfExperience: 14,
        languages: ['English', 'Tamil', 'Hindi'],
        education: 'MBA (HR & Tech Management), B.E. (CSE)',
        certifications: ['Certified Corporate Career Coach', 'SHRM-CP'],
        guidancePhilosophy: 'Every student has unique strengths. Structuring your profile story and mastering behavioral + technical rounds ensures placement success.',
        preferredCommunication: 'Placements Wing, Block 1 & Online Video',
        availability: {
          availableDays: ['Monday', 'Wednesday', 'Friday'],
          slots: [
            { id: 'slot_9', dayOfWeek: 'Monday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE', locationOrRoom: 'Placements Virtual Meet' },
            { id: 'slot_10', dayOfWeek: 'Wednesday', startTime: '11:00', endTime: '13:00', mode: 'OFFLINE', locationOrRoom: 'Placements Wing, Block 1' },
            { id: 'slot_11', dayOfWeek: 'Friday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE', locationOrRoom: 'Placements Virtual Meet' }
          ],
          sessionDurationMinutes: 30,
          breakTimeMinutes: 10,
          maxSessionsPerDay: 6,
          modesAllowed: ['ONLINE', 'OFFLINE', 'PHONE'],
          autoAcceptSessions: true
        },
        maxStudents: 10,
        maxStudentsCapacity: 10,
        currentStudentCount: 0,
        currentStudentsCount: 0,
        verificationStatus: 'VERIFIED',
        isVerifiedMentor: true,
        verificationBadges: ['College Verified', 'Industry Verified', 'ACE Verified'],
        verifiedBadgeDate: '2023-08-10',
        status: 'ACTIVE',
        rating: 4.90,
        ratingAverage: 4.90,
        ratingCount: 65,
        totalSessions: 180,
        sessionsCompletedCount: 180,
        eventsSupportedCount: 25,
        contactEmail: 'prof.priya@veltech.edu.in',
        contactPhone: '+91 94444 56789',
        officeLocation: 'Placements Wing, Block 1, Vel Tech Campus',
        createdAt: '2024-01-08T00:00:00.000Z',
        updatedAt: '2024-01-08T00:00:00.000Z'
      },
      {
        id: 'men_veltech_balasubramanian',
        userId: 'usr_mentor_balasubramanian',
        institutionId: CANONICAL_VEL_TECH_ID,
        institutionName: CANONICAL_VEL_TECH_NAME,
        schoolId: 'sch-ece-eee',
        schoolName: 'School of Electrical and Communication',
        departmentId: 'dept-ece',
        departmentName: 'Department of Electronics and Communication Engineering',
        name: 'Dr. S. Balasubramanian',
        fullName: 'Dr. S. Balasubramanian, Ph.D.',
        username: 'balasubramanian_hackathons',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
        coverPhotoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
        bio: 'Chief Mentor for National Hackathons (Smart India Hackathon, Shaastra, Pragyan). Mentors cross-functional engineering squads from ideation to winning product demos.',
        designation: 'Associate Professor & Student Innovation Hub Mentor',
        school: 'School of Electrical and Communication',
        department: 'Department of Electronics and Communication Engineering',
        specialization: 'Prototyping, Embedded AI & National Hackathon Strategy',
        expertise: ['Rapid Prototyping', 'IoT & Embedded AI', 'Pitch Deck Presentation', 'Product UI/UX', 'Hackathon Strategy'],
        expertiseSkills: ['Rapid Prototyping', 'IoT & Embedded AI', 'Pitch Deck Presentation', 'Product UI/UX', 'Hackathon Strategy'],
        mentorType: 'EVENTS_OPPORTUNITIES',
        specialties: ['EVENTS_COMPETITIONS', 'PROJECTS_TECHNICAL', 'CODING_AI_ML'],
        mentorshipAreas: ['Hackathon Guidance', 'Competition Guidance', 'Project Guidance', 'Event Guidance'],
        experienceYears: 15,
        yearsOfExperience: 15,
        languages: ['English', 'Tamil'],
        education: 'Ph.D. in Embedded Systems & AI (NIT Trichy)',
        certifications: ['Smart India Hackathon Jury Member', 'Intel Edge AI Certified'],
        guidancePhilosophy: 'Win hackathons by solving genuine user friction with working, deployable prototypes and razor-sharp pitch delivery.',
        preferredCommunication: 'Student Innovation Hub, Vel Tech Avadi Campus & Online Chat',
        availability: {
          availableDays: ['Tuesday', 'Thursday', 'Saturday'],
          slots: [
            { id: 'slot_12', dayOfWeek: 'Tuesday', startTime: '15:00', endTime: '17:00', mode: 'OFFLINE', locationOrRoom: 'Student Innovation Hub' },
            { id: 'slot_13', dayOfWeek: 'Thursday', startTime: '14:00', endTime: '16:00', mode: 'ONLINE', locationOrRoom: 'ACE Hackathon Hub Room' },
            { id: 'slot_14', dayOfWeek: 'Saturday', startTime: '14:00', endTime: '16:30', mode: 'ONLINE', locationOrRoom: 'ACE Hackathon Hub Room' }
          ],
          sessionDurationMinutes: 45,
          breakTimeMinutes: 15,
          maxSessionsPerDay: 4,
          modesAllowed: ['ONLINE', 'OFFLINE'],
          autoAcceptSessions: true
        },
        maxStudents: 8,
        maxStudentsCapacity: 8,
        currentStudentCount: 0,
        currentStudentsCount: 0,
        verificationStatus: 'VERIFIED',
        isVerifiedMentor: true,
        verificationBadges: ['College Verified', 'Faculty Verified', 'ACE Verified'],
        verifiedBadgeDate: '2023-09-12',
        status: 'ACTIVE',
        rating: 4.94,
        ratingAverage: 4.94,
        ratingCount: 38,
        totalSessions: 110,
        sessionsCompletedCount: 110,
        eventsSupportedCount: 30,
        contactEmail: 'dr.balasubramanian@veltech.edu.in',
        contactPhone: '+91 94445 67890',
        officeLocation: 'Student Innovation Hub, Vel Tech Avadi Campus',
        createdAt: '2024-01-12T00:00:00.000Z',
        updatedAt: '2024-01-12T00:00:00.000Z'
      }
    ];

    initialMentors.forEach(m => this.mentors.set(m.id, m));
    this.saveToStorage();
  }

  // =========================================================================
  // QUERY & DISCOVERY METHODS (STRICT INSTITUTION ISOLATION)
  // =========================================================================

  public getAllMentors(): Mentor[] {
    this.init();
    return Array.from(this.mentors.values());
  }

  public getMentorById(id: string): Mentor | undefined {
    this.init();
    return this.mentors.get(id);
  }

  public getMentorByUsername(username: string): Mentor | undefined {
    this.init();
    const clean = username.toLowerCase().replace('@', '').trim();
    for (const m of this.mentors.values()) {
      if (m.username.toLowerCase() === clean) return m;
    }
    return undefined;
  }

  // Strict College/Institution Isolated Search
  public getEligibleMentorsForStudent(student: { institutionId?: string; college?: string; id?: string }): Mentor[] {
    this.init();
    const targetInstitutionId = student.institutionId || CANONICAL_VEL_TECH_ID;
    return Array.from(this.mentors.values()).filter(m => {
      if (m.status !== 'ACTIVE') return false;
      if (m.verificationStatus !== 'VERIFIED') return false;
      return m.institutionId === targetInstitutionId;
    });
  }

  public getSchoolsForInstitution(institutionId: string = CANONICAL_VEL_TECH_ID): AcademicSchool[] {
    return VEL_TECH_ACADEMIC_SCHOOLS;
  }

  // Active Assignments
  public getAssignmentsForStudent(studentId: string): MentorshipAssignment[] {
    this.init();
    return Array.from(this.assignments.values()).filter(a => a.studentId === studentId && a.status === 'ACTIVE');
  }

  public getAssignmentsForMentor(mentorId: string): MentorshipAssignment[] {
    this.init();
    return Array.from(this.assignments.values()).filter(a => a.mentorId === mentorId && a.status === 'ACTIVE');
  }

  // Requests
  public getRequestsForStudent(studentId: string): MentorshipRequest[] {
    this.init();
    return Array.from(this.requests.values()).filter(r => r.studentId === studentId);
  }

  public getRequestsForMentor(mentorId: string): MentorshipRequest[] {
    this.init();
    return Array.from(this.requests.values()).filter(r => r.mentorId === mentorId && r.status === 'PENDING');
  }

  // Goals
  public getGoalsForStudent(studentId: string): MentorshipGoal[] {
    this.init();
    return Array.from(this.goals.values()).filter(g => g.studentId === studentId);
  }

  public getGoalsForMentor(mentorId: string): MentorshipGoal[] {
    this.init();
    return Array.from(this.goals.values()).filter(g => g.mentorId === mentorId);
  }

  // Action Plans
  public getActionPlansForStudent(studentId: string): ActionPlan[] {
    this.init();
    return Array.from(this.actionPlans.values()).filter(ap => ap.studentId === studentId && ap.status === 'ACTIVE');
  }

  public getActionPlansForMentor(mentorId: string): ActionPlan[] {
    this.init();
    return Array.from(this.actionPlans.values()).filter(ap => ap.mentorId === mentorId);
  }

  // Sessions
  public getAllSessions(): MentorshipSession[] {
    this.init();
    return Array.from(this.sessions.values());
  }

  public getSessionsForStudent(studentId: string): MentorshipSession[] {
    this.init();
    return Array.from(this.sessions.values())
      .filter(s => s.studentId === studentId)
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  }

  public getSessionsForMentor(mentorId: string): MentorshipSession[] {
    this.init();
    return Array.from(this.sessions.values())
      .filter(s => s.mentorId === mentorId)
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
  }

  // Notes
  public getNotesForStudent(studentId: string, isStudentViewing: boolean, requestingUserId: string): MentorshipNote[] {
    this.init();
    return Array.from(this.notes.values()).filter(n => {
      if (n.studentId !== studentId) return false;
      if (isStudentViewing && (n.type === 'PRIVATE_MENTOR_NOTE' || n.privacyLevel === 'PRIVATE_MENTOR_NOTE')) return false;
      return true;
    });
  }

  // Messages
  public getMessages(user1Id: string, user2Id: string): MentorshipMessage[] {
    this.init();
    return this.messages
      .filter(m => (m.senderId === user1Id && m.receiverId === user2Id) || (m.senderId === user2Id && m.receiverId === user1Id))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // Resources
  public getResourcesForStudent(studentId: string, institutionId: string = CANONICAL_VEL_TECH_ID): MentorResource[] {
    this.init();
    return Array.from(this.resources.values()).filter(r => 
      r.institutionId === institutionId && (!r.targetStudentId || r.targetStudentId === studentId)
    );
  }

  public getResourcesByMentor(mentorId: string): MentorResource[] {
    this.init();
    return Array.from(this.resources.values()).filter(r => r.mentorId === mentorId);
  }

  // Audit Logs
  public getAuditLogs(institutionId?: string): MentorshipAuditLog[] {
    this.init();
    if (!institutionId) return this.auditLogs;
    return this.auditLogs.filter(l => l.institutionId === institutionId);
  }

  // =========================================================================
  // MUTATION & ACTION METHODS (VALIDATED & AUDITED)
  // =========================================================================

  public createMentorshipRequest(payload: {
    student: { id: string; username: string; fullName: string; avatarUrl: string; institutionId: string; college: string; department?: string; year?: string; school?: string };
    mentorId: string;
    goalCategory: GoalCategory;
    primaryGoal: string;
    message: string;
    preferredDays: string[];
    preferredTime: string;
    preferredCommunication: string;
    assignmentType: 'PRIMARY' | 'SECONDARY';
  }): MentorshipRequest {
    this.init();
    const mentor = this.mentors.get(payload.mentorId);
    if (!mentor) throw new Error('Mentor not found.');

    // Security Check: Same Institution
    if (mentor.institutionId !== payload.student.institutionId) {
      throw new Error('Unauthorized: You can only request mentors from your own registered institution.');
    }

    // Capacity Check
    if (mentor.currentStudentCount >= mentor.maxStudents) {
      throw new Error(`Mentor capacity reached (${mentor.maxStudents} students). This mentor is currently full.`);
    }

    // Existing active request check
    const existingReq = Array.from(this.requests.values()).find(
      r => r.studentId === payload.student.id && r.mentorId === payload.mentorId && r.status === 'PENDING'
    );
    if (existingReq) throw new Error('You already have a pending mentorship request with this mentor.');

    const newReq: MentorshipRequest = {
      id: 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      studentId: payload.student.id,
      studentUsername: payload.student.username,
      studentName: payload.student.fullName,
      studentAvatar: payload.student.avatarUrl,
      studentInstitutionId: payload.student.institutionId,
      studentCollege: payload.student.college,
      studentSchool: payload.student.school,
      studentDepartment: payload.student.department || 'Computer Science and Engineering',
      studentYear: payload.student.year || '3rd Year',
      mentorId: mentor.id,
      mentorName: mentor.fullName,
      goalCategory: payload.goalCategory,
      primaryGoal: payload.primaryGoal,
      message: payload.message,
      preferredDays: payload.preferredDays,
      preferredTime: payload.preferredTime,
      preferredCommunication: payload.preferredCommunication,
      assignmentType: payload.assignmentType,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.requests.set(newReq.id, newReq);
    this.logAudit({
      actorId: payload.student.id,
      actorName: payload.student.fullName,
      actorRole: 'STUDENT',
      institutionId: payload.student.institutionId,
      action: 'MENTORSHIP_REQUEST_CREATED',
      resourceType: 'REQUEST',
      resourceId: newReq.id,
      details: `Student requested ${payload.assignmentType} mentorship with ${mentor.fullName}`
    });

    this.saveToStorage();
    return newReq;
  }

  public respondToRequest(requestId: string, accept: boolean, declineReason?: string, responderId?: string): MentorshipRequest {
    this.init();
    const req = this.requests.get(requestId);
    if (!req) throw new Error('Mentorship request not found.');

    const mentor = this.mentors.get(req.mentorId);
    if (!mentor) throw new Error('Mentor not found.');

    req.status = accept ? 'ACCEPTED' : 'REJECTED';
    req.declineReason = declineReason;
    req.respondedAt = new Date().toISOString();

    if (accept) {
      if (mentor.currentStudentCount >= mentor.maxStudents) {
        throw new Error('Cannot accept: Mentor has reached maximum student capacity.');
      }

      const assignment: MentorshipAssignment = {
        id: 'assign_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        studentId: req.studentId,
        studentUsername: req.studentUsername,
        studentName: req.studentName,
        studentAvatar: req.studentAvatar,
        studentInstitutionId: req.studentInstitutionId,
        studentCollege: req.studentCollege,
        studentSchool: req.studentSchool,
        studentDepartment: req.studentDepartment,
        studentYear: req.studentYear,
        mentorId: mentor.id,
        mentorName: mentor.fullName,
        mentorAvatar: mentor.avatarUrl,
        mentorDesignation: mentor.designation,
        mentorDepartment: mentor.department,
        assignmentType: req.assignmentType,
        specializationFocus: req.primaryGoal,
        status: 'ACTIVE',
        assignedDate: new Date().toISOString().split('T')[0],
        assignedBy: 'STUDENT_REQUEST',
        activeGoalsCount: 0,
        completedGoalsCount: 0,
        sessionsCount: 0,
        updatedAt: new Date().toISOString()
      };

      this.assignments.set(assignment.id, assignment);
      mentor.currentStudentCount += 1;
      mentor.currentStudentsCount = mentor.currentStudentCount;

      // Automatically create the initial mentorship goal
      this.createGoal({
        studentId: req.studentId,
        mentorId: mentor.id,
        mentorName: mentor.fullName,
        institutionId: req.studentInstitutionId,
        title: req.primaryGoal,
        description: `Primary mentorship roadmap initialized under ${mentor.fullName}.`,
        category: req.goalCategory,
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'HIGH',
        milestones: [
          { id: 'ms_1', monthIndex: 1, title: 'Orientation & Core Assessment', description: 'Complete diagnostic review and finalize semester milestones.', completed: false },
          { id: 'ms_2', monthIndex: 2, title: 'Execution & Technical Building', description: 'Build milestone project and attend domain coaching session.', completed: false },
          { id: 'ms_3', monthIndex: 3, title: 'Milestone Review & Verification', description: 'Review completed deliverables and schedule progress evaluation.', completed: false }
        ]
      });

      this.logAudit({
        actorId: mentor.id,
        actorName: mentor.fullName,
        actorRole: 'MENTOR',
        institutionId: mentor.institutionId,
        action: 'MENTORSHIP_REQUEST_ACCEPTED',
        resourceType: 'ASSIGNMENT',
        resourceId: assignment.id,
        details: `Mentor accepted ${req.assignmentType} mentorship for student ${req.studentName}`
      });
    } else {
      this.logAudit({
        actorId: mentor.id,
        actorName: mentor.fullName,
        actorRole: 'MENTOR',
        institutionId: mentor.institutionId,
        action: 'MENTORSHIP_REQUEST_REJECTED',
        resourceType: 'REQUEST',
        resourceId: req.id,
        details: `Mentor declined request: ${declineReason || 'No reason provided'}`
      });
    }

    this.saveToStorage();
    return req;
  }

  // Book Session (With double-booking validation)
  public bookSession(payload: {
    studentId: string;
    studentName: string;
    studentAvatar: string;
    studentUsername: string;
    institutionId: string;
    mentorId: string;
    mentorName: string;
    mentorAvatar: string;
    date: string;
    time: string;
    durationMinutes: number;
    topic: string;
    agenda?: string;
    mentorshipArea: MentorshipArea;
    mode: 'ONLINE' | 'OFFLINE' | 'PHONE' | 'CHAT';
  }): MentorshipSession {
    this.init();
    const mentor = this.mentors.get(payload.mentorId);
    if (!mentor) throw new Error('Mentor not found.');

    // Prevent Double Booking Check
    const conflict = Array.from(this.sessions.values()).find(
      s => s.mentorId === payload.mentorId && s.date === payload.date && s.time === payload.time && s.status === 'CONFIRMED'
    );
    if (conflict) {
      throw new Error(`Time slot conflict: ${mentor.fullName} already has a confirmed session on ${payload.date} at ${payload.time}.`);
    }

    const newSession: MentorshipSession = {
      id: 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      mentorId: mentor.id,
      mentorName: mentor.fullName,
      mentorAvatar: mentor.avatarUrl,
      studentId: payload.studentId,
      studentName: payload.studentName,
      studentAvatar: payload.studentAvatar,
      studentUsername: payload.studentUsername,
      institutionId: payload.institutionId,
      date: payload.date,
      time: payload.time,
      durationMinutes: payload.durationMinutes,
      topic: payload.topic,
      agenda: payload.agenda,
      mentorshipArea: payload.mentorshipArea,
      mode: payload.mode,
      meetingUrl: payload.mode === 'ONLINE' ? `https://meet.allcollegeevent.com/room-${mentor.username}-${Date.now().toString().slice(-4)}` : undefined,
      meetingLocation: payload.mode === 'OFFLINE' ? (mentor.officeLocation || 'Vel Tech Campus') : undefined,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.sessions.set(newSession.id, newSession);
    this.logAudit({
      actorId: payload.studentId,
      actorName: payload.studentName,
      actorRole: 'STUDENT',
      institutionId: payload.institutionId,
      action: 'SESSION_BOOKED',
      resourceType: 'SESSION',
      resourceId: newSession.id,
      details: `Booked session "${payload.topic}" with ${mentor.fullName} on ${payload.date} at ${payload.time}`
    });

    this.saveToStorage();
    return newSession;
  }

  // Complete Session
  public completeSession(sessionId: string, summary: string, actionItemTitles: string[] = []): MentorshipSession {
    this.init();
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found.');

    session.status = 'COMPLETED';
    session.mentorSummary = summary;
    session.actionItemsCreated = actionItemTitles;
    session.updatedAt = new Date().toISOString();

    const mentor = this.mentors.get(session.mentorId);
    if (mentor) {
      mentor.totalSessions += 1;
      mentor.sessionsCompletedCount = mentor.totalSessions;
    }

    // Auto-create action plan if tasks were submitted
    if (actionItemTitles.length > 0) {
      this.createActionPlan({
        mentorId: session.mentorId,
        mentorName: session.mentorName,
        studentId: session.studentId,
        studentName: session.studentName,
        institutionId: session.institutionId,
        title: `Follow-up Actions: ${session.topic}`,
        tasks: actionItemTitles.map((t, idx) => ({
          id: 'task_' + Date.now() + '_' + idx,
          title: t,
          description: `Action item assigned during ${session.date} guidance session.`,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          priority: 'MEDIUM',
          assignedTo: session.studentId,
          status: 'PENDING'
        }))
      });
    }

    this.logAudit({
      actorId: session.mentorId,
      actorName: session.mentorName,
      actorRole: 'MENTOR',
      institutionId: session.institutionId,
      action: 'SESSION_COMPLETED',
      resourceType: 'SESSION',
      resourceId: session.id,
      details: `Completed session "${session.topic}" and recorded notes.`
    });

    this.saveToStorage();
    return session;
  }

  // Submit Feedback & Rating
  public submitFeedback(sessionId: string, payload: {
    studentId: string;
    studentName: string;
    studentCollege: string;
    communication: number;
    helpfulness: number;
    knowledge: number;
    guidance: number;
    comment: string;
  }): MentorshipFeedback {
    this.init();
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found.');

    const ratingAvg = Number(((payload.communication + payload.helpfulness + payload.knowledge + payload.guidance) / 4).toFixed(2));
    
    session.studentFeedbackRating = ratingAvg;
    session.studentFeedbackComment = payload.comment;
    session.studentRatingDetails = {
      communication: payload.communication,
      helpfulness: payload.helpfulness,
      knowledge: payload.knowledge,
      guidance: payload.guidance
    };

    const newFeedback: MentorshipFeedback = {
      id: 'fb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      sessionId,
      mentorId: session.mentorId,
      studentId: payload.studentId,
      studentName: payload.studentName,
      studentCollege: payload.studentCollege,
      ratingAverage: ratingAvg,
      ratings: {
        communication: payload.communication,
        helpfulness: payload.helpfulness,
        knowledge: payload.knowledge,
        guidance: payload.guidance
      },
      comment: payload.comment,
      isPublicOnProfile: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.feedback.set(newFeedback.id, newFeedback);

    // Update Mentor Rating Average
    const mentor = this.mentors.get(session.mentorId);
    if (mentor) {
      const allMentorFb = Array.from(this.feedback.values()).filter(f => f.mentorId === mentor.id);
      const totalSum = allMentorFb.reduce((acc, f) => acc + f.ratingAverage, 0);
      mentor.ratingCount = allMentorFb.length;
      mentor.ratingAverage = Number((totalSum / mentor.ratingCount).toFixed(2));
      mentor.rating = mentor.ratingAverage;
    }

    this.saveToStorage();
    return newFeedback;
  }

  // Goals & Real Calculated Progress
  public createGoal(payload: {
    studentId: string;
    mentorId?: string;
    mentorName?: string;
    institutionId: string;
    title: string;
    description: string;
    category: GoalCategory;
    targetDate: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    milestones: { id: string; monthIndex: number; title: string; description: string; completed: boolean }[];
  }): MentorshipGoal {
    this.init();
    const completedCount = payload.milestones.filter(m => m.completed).length;
    const progress = payload.milestones.length > 0 ? Math.round((completedCount / payload.milestones.length) * 100) : 0;

    const newGoal: MentorshipGoal = {
      id: 'goal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      studentId: payload.studentId,
      mentorId: payload.mentorId,
      mentorName: payload.mentorName,
      institutionId: payload.institutionId,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      targetDate: payload.targetDate,
      priority: payload.priority,
      status: progress === 100 ? 'COMPLETED' : progress > 0 ? 'IN_PROGRESS' : 'NOT_STARTED',
      progress,
      progressPercentage: progress,
      milestones: payload.milestones,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.goals.set(newGoal.id, newGoal);
    this.saveToStorage();
    return newGoal;
  }

  // Toggle Milestone & Automatically Calculate Progress
  public toggleGoalMilestone(goalId: string, milestoneId: string): MentorshipGoal {
    this.init();
    const goal = this.goals.get(goalId);
    if (!goal) throw new Error('Goal not found.');

    const milestone = goal.milestones.find(m => m.id === milestoneId);
    if (!milestone) throw new Error('Milestone not found.');

    milestone.completed = !milestone.completed;
    milestone.completedAt = milestone.completed ? new Date().toISOString() : undefined;

    const completedCount = goal.milestones.filter(m => m.completed).length;
    goal.progress = Math.round((completedCount / goal.milestones.length) * 100);
    goal.progressPercentage = goal.progress;
    goal.status = goal.progress === 100 ? 'COMPLETED' : goal.progress > 0 ? 'IN_PROGRESS' : 'NOT_STARTED';
    goal.updatedAt = new Date().toISOString();

    this.saveToStorage();
    return goal;
  }

  // Action Plans
  public createActionPlan(payload: {
    mentorId: string;
    mentorName: string;
    studentId: string;
    studentName: string;
    institutionId: string;
    title: string;
    goalReference?: string;
    tasks: { id: string; title: string; description: string; dueDate: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; assignedTo: string; status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE' }[];
  }): ActionPlan {
    this.init();
    const newPlan: ActionPlan = {
      id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      mentorId: payload.mentorId,
      mentorName: payload.mentorName,
      studentId: payload.studentId,
      studentName: payload.studentName,
      institutionId: payload.institutionId,
      title: payload.title,
      goalReference: payload.goalReference,
      tasks: payload.tasks,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.actionPlans.set(newPlan.id, newPlan);
    this.saveToStorage();
    return newPlan;
  }

  public toggleTaskStatus(planId: string, taskId: string, completed: boolean, comment?: string): ActionPlan {
    this.init();
    const plan = this.actionPlans.get(planId);
    if (!plan) throw new Error('Action plan not found.');

    const task = plan.tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found.');

    task.status = completed ? 'COMPLETED' : 'PENDING';
    task.completedAt = completed ? new Date().toISOString() : undefined;
    if (comment) task.studentComment = comment;

    const allCompleted = plan.tasks.every(t => t.status === 'COMPLETED');
    if (allCompleted) plan.status = 'COMPLETED';

    plan.updatedAt = new Date().toISOString();
    this.saveToStorage();
    return plan;
  }

  // Notes
  public createNote(payload: {
    mentorId: string;
    studentId: string;
    institutionId: string;
    type: 'PRIVATE_MENTOR_NOTE' | 'STUDENT_VISIBLE_NOTE';
    topic: string;
    discussionSummary: string;
    studentConcern?: string;
    mentorRecommendation: string;
    actionItemsText?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  }): MentorshipNote {
    this.init();
    const newNote: MentorshipNote = {
      id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      mentorId: payload.mentorId,
      studentId: payload.studentId,
      institutionId: payload.institutionId,
      type: payload.type,
      privacyLevel: payload.type,
      topic: payload.topic,
      discussionSummary: payload.discussionSummary,
      studentConcern: payload.studentConcern,
      mentorRecommendation: payload.mentorRecommendation,
      actionItemsText: payload.actionItemsText,
      priority: payload.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.notes.set(newNote.id, newNote);
    this.saveToStorage();
    return newNote;
  }

  // Messaging
  public sendMessage(payload: {
    senderId: string;
    senderName: string;
    senderAvatar: string;
    senderRole: 'STUDENT' | 'MENTOR' | 'ADMIN';
    receiverId: string;
    content: string;
    embeddedEventSlug?: string;
    embeddedEventTitle?: string;
  }): MentorshipMessage {
    this.init();
    const newMsg: MentorshipMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      conversationId: `conv_${[payload.senderId, payload.receiverId].sort().join('_')}`,
      senderId: payload.senderId,
      senderName: payload.senderName,
      senderAvatar: payload.senderAvatar,
      senderRole: payload.senderRole,
      receiverId: payload.receiverId,
      content: payload.content,
      embeddedEventSlug: payload.embeddedEventSlug,
      embeddedEventTitle: payload.embeddedEventTitle,
      read: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.messages.push(newMsg);
    this.saveToStorage();
    return newMsg;
  }

  // Recommend Resource or Event
  public recommendResource(payload: {
    mentorId: string;
    mentorName: string;
    institutionId: string;
    targetStudentId?: string;
    type: 'COURSE' | 'ARTICLE' | 'VIDEO' | 'PROJECT' | 'BOOK' | 'EVENT' | 'COMPETITION' | 'LEARNING_PATH';
    title: string;
    description: string;
    url: string;
    categoryTag: string;
    recommendationReason: string;
    linkedEventSlug?: string;
    linkedEventTitle?: string;
  }): MentorResource {
    this.init();
    const newRes: MentorResource = {
      id: 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      mentorId: payload.mentorId,
      mentorName: payload.mentorName,
      institutionId: payload.institutionId,
      targetStudentId: payload.targetStudentId,
      type: payload.type,
      title: payload.title,
      description: payload.description,
      url: payload.url,
      categoryTag: payload.categoryTag,
      recommendationReason: payload.recommendationReason,
      linkedEventSlug: payload.linkedEventSlug,
      linkedEventTitle: payload.linkedEventTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.resources.set(newRes.id, newRes);
    this.saveToStorage();
    return newRes;
  }

  // =========================================================================
  // MENTOR MEETING BRIEF PREPARATION (REAL DATA SYNTHESIS)
  // =========================================================================
  public generateMentorMeetingBrief(studentId: string, studentName: string, collegeName: string, department: string, year: string): MentorMeetingBrief {
    this.init();
    const goals = this.getGoalsForStudent(studentId);
    const plans = this.getActionPlansForStudent(studentId);
    const sessions = this.getSessionsForStudent(studentId);

    const completedMilestones: string[] = [];
    goals.forEach(g => {
      g.milestones.filter(m => m.completed).forEach(m => completedMilestones.push(`[${g.category}] ${m.title}`));
    });

    const pendingTasks: { title: string; priority: string; dueDate: string }[] = [];
    plans.forEach(p => {
      p.tasks.filter(t => t.status !== 'COMPLETED').forEach(t => {
        pendingTasks.push({ title: t.title, priority: t.priority, dueDate: t.dueDate });
      });
    });

    return {
      studentName,
      collegeName,
      department,
      year,
      preparedAt: new Date().toISOString(),
      completedActivities: completedMilestones.length > 0 ? completedMilestones : ['Profile completed and registered at Vel Tech.'],
      activeGoals: goals.map(g => ({ title: g.title, progress: g.progressPercentage || g.progress || 0, category: g.category })),
      pendingTasks,
      strugglesAndBlockers: pendingTasks.length > 0 
        ? pendingTasks.map(t => `Working on pending task: ${t.title}`)
        : ['Preparing semester milestone timeline and exploring faculty domain guidance.'],
      suggestedQuestionsToAsk: [
        'How should I prioritize hackathon prep versus end-of-semester coursework?',
        'Which core architecture patterns should I demonstrate in my portfolio project?',
        'Are there specific patent or research tracks available this term in our department?'
      ],
      recommendedDiscussionTopics: goals.length > 0 
        ? goals.map(g => `Review progress on roadmap: "${g.title}"`)
        : ['Set up 3-month primary academic & technical goal roadmap.'],
      suggestedNextActions: [
        'Finalize next milestone deliverable date.',
        'Schedule follow-up review session for month-end checkpoint.'
      ]
    };
  }

  private logAudit(entry: Omit<MentorshipAuditLog, 'id' | 'timestamp'>) {
    const log: MentorshipAuditLog = {
      ...entry,
      id: 'audit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString()
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 200) this.auditLogs.pop();
  }
}

export const mentorshipDb = new MentorshipDatabase();
