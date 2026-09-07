import {
  Account,
  AccountRole,
  AccountStatus,
  AuditLogEntry,
  GalleryAlbum,
  GalleryImage,
  PrivacyPreferences,
  UserSession,
  CollegeSearchItem,
  UserRoleEnrollment
} from '../../types/account';

export const VERIFIED_COLLEGES: CollegeSearchItem[] = [
  { id: 'inst-vel-tech-rangarajan-avadi', name: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology', city: 'Chennai', state: 'Tamil Nadu', isVerified: true },
  { id: 'col_iitm', name: 'IIT Madras (Indian Institute of Technology)', city: 'Chennai', state: 'Tamil Nadu', isVerified: true },
  { id: 'col_anna', name: 'Anna University (CEG Campus)', city: 'Chennai', state: 'Tamil Nadu', isVerified: true },
  { id: 'col_nit_trichy', name: 'NIT Trichy (National Institute of Technology)', city: 'Tiruchirappalli', state: 'Tamil Nadu', isVerified: true },
  { id: 'col_iitb', name: 'IIT Bombay', city: 'Mumbai', state: 'Maharashtra', isVerified: true },
  { id: 'col_iitd', name: 'IIT Delhi', city: 'New Delhi', state: 'Delhi', isVerified: true },
  { id: 'col_bits', name: 'BITS Pilani', city: 'Pilani', state: 'Rajasthan', isVerified: true },
  { id: 'col_vit', name: 'VIT Vellore (Vellore Institute of Technology)', city: 'Vellore', state: 'Tamil Nadu', isVerified: true },
  { id: 'col_srm', name: 'SRM Institute of Science and Technology', city: 'Chennai', state: 'Tamil Nadu', isVerified: true },
  { id: 'col_iiit_hyd', name: 'IIIT Hyderabad', city: 'Hyderabad', state: 'Telangana', isVerified: true },
  { id: 'col_rvce', name: 'RV College of Engineering', city: 'Bengaluru', state: 'Karnataka', isVerified: true },
  { id: 'col_pes', name: 'PES University', city: 'Bengaluru', state: 'Karnataka', isVerified: true }
];

const STORAGE_KEYS = {
  ACCOUNTS: 'ace_db_accounts_v3',
  ENROLLMENTS: 'ace_db_enrollments_v3',
  SESSIONS: 'ace_db_sessions_v3',
  AUDIT_LOGS: 'ace_db_audit_logs_v3',
  GALLERY_IMAGES: 'ace_db_gallery_images_v3',
  GALLERY_ALBUMS: 'ace_db_gallery_albums_v3',
  CURRENT_USER_ID: 'ace_db_current_user_id_v3'
};

export class AccountDatabase {
  private accounts: Map<string, Account> = new Map();
  private enrollments: Map<string, UserRoleEnrollment> = new Map();
  private auditLogs: AuditLogEntry[] = [];
  private galleryImages: Map<string, GalleryImage> = new Map();
  private galleryAlbums: Map<string, GalleryAlbum> = new Map();
  private currentUserId: string | null = null;

  constructor() {
    this.loadFromStorage();
    if (this.accounts.size === 0) {
      this.seedInitialData();
    }
  }

  private loadFromStorage() {
    try {
      const rawAccounts = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      if (rawAccounts) {
        const parsed = JSON.parse(rawAccounts) as Account[];
        parsed.forEach(acc => this.accounts.set(acc.id, acc));
      }

      const rawEnrollments = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      if (rawEnrollments) {
        const parsedEnrs = JSON.parse(rawEnrollments) as UserRoleEnrollment[];
        parsedEnrs.forEach(enr => this.enrollments.set(enr.id, enr));
      }

      const rawLogs = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (rawLogs) {
        this.auditLogs = JSON.parse(rawLogs);
      }

      const rawImages = localStorage.getItem(STORAGE_KEYS.GALLERY_IMAGES);
      if (rawImages) {
        const parsedImgs = JSON.parse(rawImages) as GalleryImage[];
        parsedImgs.forEach(img => this.galleryImages.set(img.id, img));
      }

      const rawAlbums = localStorage.getItem(STORAGE_KEYS.GALLERY_ALBUMS);
      if (rawAlbums) {
        const parsedAlbums = JSON.parse(rawAlbums) as GalleryAlbum[];
        parsedAlbums.forEach(alb => this.galleryAlbums.set(alb.id, alb));
      }

      this.currentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || 'usr_student_dileep';
    } catch {
      // Storage fallback
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(Array.from(this.accounts.values())));
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(Array.from(this.enrollments.values())));
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(this.auditLogs));
      localStorage.setItem(STORAGE_KEYS.GALLERY_IMAGES, JSON.stringify(Array.from(this.galleryImages.values())));
      localStorage.setItem(STORAGE_KEYS.GALLERY_ALBUMS, JSON.stringify(Array.from(this.galleryAlbums.values())));
      if (this.currentUserId) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, this.currentUserId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      }
    } catch {
      // Storage error safeguard
    }
  }

  public seedInitialData() {
    // 1. Dileep Kumar (Real Authenticated User with Student + Campus Ambassador Enrollments)
    const dileepAccount: Account = {
      id: 'usr_student_dileep',
      username: 'dileepkumar',
      email: 'dileep.kumar@veltech.edu.in',
      phoneNumber: '+91 98765 43210',
      phone: '+91 98765 43210',
      passwordHash: 'sha256:dileep_pass_123',
      role: 'STUDENT',
      roles: ['STUDENT', 'COLLEGE_AMBASSADOR'],
      activeWorkspace: 'STUDENT',
      permissions: ['STUDENT_ACCESS', 'AMBASSADOR_ACCESS'],
      collegeId: 'inst-vel-tech-rangarajan-avadi',
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      isVerified: true,
      firstName: 'Dileep',
      lastName: 'Kumar',
      displayName: 'Dileep Kumar',
      fullName: 'Dileep Kumar Pallapu',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
      coverTheme: 'cosmic_indigo',
      bio: 'B.Tech CSE student passionate about Full-Stack Systems, AI Agents, and Competitive Hackathons.',
      college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      location: 'Chennai, Tamil Nadu',
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      website: 'https://dileepkumar.dev',
      linkedin: 'https://linkedin.com/in/dileepkumar',
      github: 'https://github.com/DileepKumarPallapu',
      twitter: 'https://twitter.com/dileep_dev',
      socialLinks: {
        github: 'https://github.com/DileepKumarPallapu',
        linkedin: 'https://linkedin.com/in/dileepkumar',
        twitter: 'https://twitter.com/dileep_dev',
        website: 'https://dileepkumar.dev'
      },
      skills: {
        verified: ['React 19', 'TypeScript', 'Node.js', 'Python', 'TailwindCSS', 'PostgreSQL'],
        interested: ['Rust', 'Distributed Systems', 'LLM Fine-tuning', 'WebAssembly']
      },
      education: [
        {
          id: 'edu_1',
          institution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
          degree: 'Bachelor of Technology',
          fieldOfStudy: 'Computer Science and Engineering',
          startYear: '2022',
          endYear: '2026',
          current: true,
          isCurrent: true,
          grade: '8.9 CGPA',
          description: 'Focused on Cloud Architecture and Intelligent Autonomous Systems.'
        }
      ],
      projects: [
        {
          id: 'proj_1',
          title: 'AllCollegeEvent (ACE) Ecosystem Platform',
          name: 'AllCollegeEvent (ACE) Ecosystem Platform',
          description: 'Unified discovery, coding arena, and verification platform for Indian colleges.',
          technologies: ['React 19', 'TypeScript', 'TailwindCSS', 'Vite', 'Lucide'],
          githubUrl: 'https://github.com/DileepKumarPallapu/AI-Enhancement-Solutions-ACE-WEBSITE',
          liveUrl: 'https://allcollegeevent.vercel.app',
          visibility: 'PUBLIC'
        }
      ],
      certificates: [
        {
          id: 'cert_1',
          title: 'National Hackathon Champion 2025',
          issuer: 'ACE National Tech Council',
          issueDate: '2025-11-20',
          credentialUrl: 'https://allcollegeevent.com/verify/ACE-HACK-8839',
          isAceVerified: true,
          skills: ['Full-Stack', 'System Design']
        }
      ],
      achievements: [
        {
          id: 'ach_1',
          title: '1st Place — National AI Hackathon',
          description: 'Built generative UI pipeline in under 36 hours.',
          date: 'Nov 2025',
          category: 'HACKATHON',
          verified: true
        }
      ],
      roleProfileData: {
        college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
        degree: 'B.Tech',
        major: 'Computer Science & Engineering',
        department: 'Computer Science and Engineering',
        year: '4th Year',
        graduationYear: '2026',
        studentIdNumber: '22CS089',
        cgpa: '8.9'
      },
      privacyPreferences: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showEducation: true,
        allowDirectMessages: true,
        showActivityOnFeed: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showEducation: true,
        allowDirectMessages: true,
        showActivityOnFeed: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      sessions: [],
      stats: {
        eventsAttended: 14,
        followersCount: 342,
        reputationScore: 2450,
        projectsCount: 2,
        coinsBalance: 5000
      },
      followers: ['usr_ambassador_priya', 'usr_mentor_arun'],
      following: ['usr_ambassador_priya', 'usr_organizer_techfest'],
      followersCount: 342,
      followingCount: 18,
      pointsEarned: 2450,
      profileStrength: 95,
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    };

    // 2. Priya Sharma (Campus Ambassador Account)
    const priyaAccount: Account = {
      id: 'usr_ambassador_priya',
      username: 'priya_ambassador',
      email: 'priya.s@annauniv.edu',
      phoneNumber: '+91 94444 11223',
      phone: '+91 94444 11223',
      passwordHash: 'sha256:priya_pass_123',
      role: 'COLLEGE_AMBASSADOR',
      roles: ['COLLEGE_AMBASSADOR', 'STUDENT'],
      activeWorkspace: 'COLLEGE_AMBASSADOR',
      collegeId: 'col_anna',
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      isVerified: true,
      firstName: 'Priya',
      lastName: 'Sharma',
      displayName: 'Priya Sharma',
      fullName: 'Priya Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600',
      bio: 'Lead Campus Ambassador @ Anna University. Connecting students to nationwide hackathons.',
      college: 'Anna University (CEG Campus)',
      location: 'Chennai, Tamil Nadu',
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/priyasharma'
      },
      skills: {
        verified: ['Community Leadership', 'Event Marketing', 'Public Speaking'],
        interested: ['Tech Scouting', 'Partnerships']
      },
      education: [],
      projects: [],
      certificates: [],
      achievements: [],
      roleProfileData: {
        campusName: 'Anna University Guindy Campus',
        college: 'Anna University (CEG Campus)',
        department: 'Information Technology',
        year: '3rd Year',
        referralCount: 420,
        eventsPromotedCount: 18,
        studentsReached: 2400
      },
      privacyPreferences: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      sessions: [],
      stats: {
        eventsAttended: 28,
        followersCount: 890,
        reputationScore: 4120
      },
      followers: ['usr_student_dileep'],
      following: ['usr_student_dileep'],
      followersCount: 890,
      followingCount: 45,
      pointsEarned: 4120,
      profileStrength: 90,
      createdAt: '2025-02-10T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    };

    // 3. TechFest Club (Organizer Account)
    const organizerAccount: Account = {
      id: 'usr_organizer_techfest',
      username: 'techfest_organizer',
      email: 'organizer@shaastra.iitm.ac.in',
      phoneNumber: '+91 91234 56789',
      phone: '+91 91234 56789',
      passwordHash: 'sha256:organizer_pass_123',
      role: 'ORGANIZER',
      roles: ['ORGANIZER'],
      activeWorkspace: 'ORGANIZER',
      collegeId: 'col_iitm',
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      isVerified: true,
      firstName: 'Shaastra',
      lastName: 'Team',
      displayName: 'Shaastra IIT Madras',
      fullName: 'Shaastra Technical Team',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600',
      bio: 'Annual Technical Festival of IIT Madras. Asia’s largest student-managed tech fest.',
      college: 'IIT Madras',
      location: 'Chennai, Tamil Nadu',
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      socialLinks: {
        website: 'https://shaastra.org'
      },
      skills: {
        verified: ['Hackathon Hosting', 'Judging Criteria', 'Prize Distribution'],
        interested: []
      },
      education: [],
      projects: [],
      certificates: [],
      achievements: [],
      roleProfileData: {
        organizationName: 'Shaastra IIT Madras',
        organizerType: 'COLLEGE_FEST',
        organizationType: 'STUDENT_CLUB',
        eventsCount: 45,
        participantsCount: 12500
      },
      privacyPreferences: {
        profileVisibility: 'PUBLIC',
        showEmail: true,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        showEmail: true,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      sessions: [],
      stats: {
        eventsAttended: 50,
        followersCount: 5400,
        reputationScore: 8900
      },
      followers: ['usr_student_dileep'],
      following: [],
      followersCount: 5400,
      followingCount: 12,
      pointsEarned: 8900,
      profileStrength: 100,
      createdAt: '2024-08-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    };

    // 4. Dr. Arun Venkatesh (Faculty Mentor Account)
    const mentorAccount: Account = {
      id: 'usr_mentor_arun',
      username: 'dr_arun_mentor',
      email: 'arun.v@ai-institute.org',
      phoneNumber: '+91 98888 77766',
      phone: '+91 98888 77766',
      passwordHash: 'sha256:arun_pass_123',
      role: 'MENTOR',
      roles: ['MENTOR'],
      activeWorkspace: 'MENTOR',
      collegeId: 'inst-vel-tech-rangarajan-avadi',
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      isVerified: true,
      firstName: 'Dr. Arun',
      lastName: 'Venkatesh',
      displayName: 'Dr. Arun V',
      fullName: 'Dr. Arun Venkatesh, Ph.D.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600',
      bio: 'Principal AI Scientist & Hackathon Judge. Guiding next-gen engineers on Autonomous Agents & ML.',
      college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      location: 'Chennai, Tamil Nadu',
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/arun-ai',
        github: 'https://github.com/arun-ai-research'
      },
      skills: {
        verified: ['Deep Learning', 'PyTorch', 'System Architecture', 'Research Publication'],
        interested: ['Quantum Computing']
      },
      education: [],
      projects: [],
      certificates: [],
      achievements: [],
      roleProfileData: {
        domainExpertise: ['AI / Machine Learning', 'Computer Vision', 'Agentic Workflows'],
        yearsOfExperience: 12,
        organization: 'PSG Tech AI Research Lab'
      },
      privacyPreferences: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      sessions: [],
      stats: {
        eventsAttended: 32,
        followersCount: 1850,
        reputationScore: 6500
      },
      followers: ['usr_student_dileep'],
      following: ['usr_student_dileep'],
      followersCount: 1850,
      followingCount: 88,
      pointsEarned: 6500,
      profileStrength: 95,
      createdAt: '2024-10-10T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    };

    // 5. PSG Tech (College Admin Account)
    const collegeAccount: Account = {
      id: 'usr_college_psg',
      username: 'psg_institution',
      email: 'admin@veltech.edu.in',
      phoneNumber: '+91 422 2572177',
      phone: '+91 422 2572177',
      passwordHash: 'sha256:psg_pass_123',
      role: 'COLLEGE',
      roles: ['COLLEGE'],
      activeWorkspace: 'COLLEGE',
      collegeId: 'inst-vel-tech-rangarajan-avadi',
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      isVerified: true,
      firstName: 'PSG',
      lastName: 'Tech',
      displayName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      fullName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600',
      bio: 'Autonomous, Government Aided, NAAC A++ Accredited premier engineering institution.',
      college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      institutionId: 'inst-vel-tech-rangarajan-avadi',
      location: 'Chennai, Tamil Nadu',
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      socialLinks: {
        website: 'https://psgtech.edu'
      },
      skills: {
        verified: ['Institutional Partner', 'NAAC A++'],
        interested: []
      },
      education: [],
      projects: [],
      certificates: [],
      achievements: [],
      roleProfileData: {
        officialName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        accreditation: 'NAAC A++ (3.72 CGPA)',
        establishedYear: 1951,
        studentsCount: 8500
      },
      privacyPreferences: {
        profileVisibility: 'PUBLIC',
        showEmail: true,
        showPhone: true,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        showEmail: true,
        showPhone: true,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      sessions: [],
      stats: {
        eventsAttended: 120,
        followersCount: 12400,
        reputationScore: 15000
      },
      followers: ['usr_student_dileep'],
      following: [],
      followersCount: 12400,
      followingCount: 3,
      pointsEarned: 15000,
      profileStrength: 100,
      createdAt: '2024-06-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    };

    // 6. ACE Superadmin Account
    const adminAccount: Account = {
      id: 'usr_admin_ace',
      username: 'ace_admin',
      email: 'security@allcollegeevent.com',
      phoneNumber: '+91 80 4455 6677',
      phone: '+91 80 4455 6677',
      passwordHash: 'sha256:admin_pass_123',
      role: 'ADMIN',
      roles: ['ADMIN'],
      activeWorkspace: 'ADMIN',
      permissions: ['ALL_PERMISSIONS', 'SUPERADMIN'],
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      isVerified: true,
      firstName: 'ACE',
      lastName: 'Admin',
      displayName: 'ACE System Security',
      fullName: 'ACE Superadministrator',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
      bio: 'ACE Core Platform Engineering & National Tech Verification Lead.',
      college: 'ACE Central Directorate',
      location: 'Bengaluru, Karnataka',
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru',
      socialLinks: {
        website: 'https://allcollegeevent.com'
      },
      skills: {
        verified: ['Platform Architecture', 'Event Verification', 'Security Audit'],
        interested: []
      },
      education: [],
      projects: [],
      certificates: [],
      achievements: [],
      roleProfileData: {
        officialName: 'ACE Platform Security Directorate'
      } as any,
      privacyPreferences: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      sessions: [],
      stats: {
        eventsAttended: 99,
        followersCount: 3200,
        reputationScore: 9999
      },
      followers: [],
      following: [],
      followersCount: 3200,
      followingCount: 10,
      pointsEarned: 9999,
      profileStrength: 100,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    };

    // Seed Accounts
    const allSeedAccounts = [
      dileepAccount,
      priyaAccount,
      organizerAccount,
      mentorAccount,
      collegeAccount,
      adminAccount
    ];
    allSeedAccounts.forEach(acc => this.accounts.set(acc.id, acc));

    // Seed Role Enrollments
    const seedEnrollments: UserRoleEnrollment[] = [
      {
        id: 'enr_dileep_stu',
        userId: 'usr_student_dileep',
        role: 'STUDENT',
        collegeId: 'inst-vel-tech-rangarajan-avadi',
        collegeName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science and Engineering',
        status: 'ACTIVE',
        appliedAt: '2025-01-15T00:00:00Z',
        approvedAt: '2025-01-15T00:00:00Z',
        approvedBy: 'SYSTEM'
      },
      {
        id: 'enr_dileep_amb',
        userId: 'usr_student_dileep',
        role: 'COLLEGE_AMBASSADOR',
        collegeId: 'inst-vel-tech-rangarajan-avadi',
        collegeName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science and Engineering',
        status: 'ACTIVE',
        appliedAt: '2025-02-01T00:00:00Z',
        approvedAt: '2025-02-10T00:00:00Z',
        approvedBy: 'col_psg_admin'
      },
      {
        id: 'enr_priya_amb',
        userId: 'usr_ambassador_priya',
        role: 'COLLEGE_AMBASSADOR',
        collegeId: 'col_anna',
        collegeName: 'Anna University (CEG Campus)',
        department: 'Information Technology',
        status: 'ACTIVE',
        appliedAt: '2025-02-10T00:00:00Z',
        approvedAt: '2025-02-10T00:00:00Z',
        approvedBy: 'SYSTEM'
      },
      {
        id: 'enr_org_shaastra',
        userId: 'usr_organizer_techfest',
        role: 'ORGANIZER',
        collegeId: 'col_iitm',
        collegeName: 'IIT Madras',
        status: 'ACTIVE',
        appliedAt: '2024-08-01T00:00:00Z',
        approvedAt: '2024-08-01T00:00:00Z',
        approvedBy: 'SYSTEM'
      },
      {
        id: 'enr_mentor_arun',
        userId: 'usr_mentor_arun',
        role: 'MENTOR',
        collegeId: 'inst-vel-tech-rangarajan-avadi',
        collegeName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        department: 'Computer Science and Engineering',
        status: 'ACTIVE',
        appliedAt: '2024-10-10T00:00:00Z',
        approvedAt: '2024-10-10T00:00:00Z',
        approvedBy: 'col_psg_dean'
      },
      {
        id: 'enr_college_psg',
        userId: 'usr_college_psg',
        role: 'COLLEGE',
        collegeId: 'inst-vel-tech-rangarajan-avadi',
        collegeName: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
        status: 'ACTIVE',
        appliedAt: '2024-06-01T00:00:00Z',
        approvedAt: '2024-06-01T00:00:00Z',
        approvedBy: 'SYSTEM'
      },
      {
        id: 'enr_admin_ace',
        userId: 'usr_admin_ace',
        role: 'ADMIN',
        status: 'ACTIVE',
        appliedAt: '2024-01-01T00:00:00Z',
        approvedAt: '2024-01-01T00:00:00Z',
        approvedBy: 'SYSTEM'
      }
    ];
    seedEnrollments.forEach(enr => this.enrollments.set(enr.id, enr));

    // Seed Gallery Images
    const seedGallery: GalleryImage[] = [
      {
        id: 'gal_1',
        userId: 'usr_student_dileep',
        albumId: 'Hackathons',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
        caption: 'Winning 1st place in National Smart India Hackathon finals',
        altText: 'Smart India Hackathon prize distribution',
        category: 'HACKATHON',
        visibility: 'PUBLIC',
        likesCount: 68,
        createdAt: '2025-11-21T00:00:00Z'
      },
      {
        id: 'gal_2',
        userId: 'usr_student_dileep',
        albumId: 'Campus',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
        caption: 'Delivering technical workshop on Generative Agents at PSG Tech',
        altText: 'PSG Tech auditorium presentation',
        category: 'CAMPUS',
        visibility: 'PUBLIC',
        likesCount: 45,
        createdAt: '2026-02-14T00:00:00Z'
      }
    ];
    seedGallery.forEach(img => this.galleryImages.set(img.id, img));

    this.saveToStorage();
  }

  // Lookups
  public getAccountById(id: string): Account | undefined {
    const acc = this.accounts.get(id);
    if (!acc) return undefined;
    acc.enrollments = this.getUserEnrollments(id);
    return acc;
  }

  public getAccountByUsername(username: string): Account | undefined {
    const clean = username.toLowerCase().replace('@', '').trim();
    for (const acc of this.accounts.values()) {
      if (acc.username.toLowerCase() === clean) {
        acc.enrollments = this.getUserEnrollments(acc.id);
        return acc;
      }
    }
    return undefined;
  }

  public getAccountByEmail(email: string): Account | undefined {
    const clean = email.toLowerCase().trim();
    for (const acc of this.accounts.values()) {
      if (acc.email.toLowerCase() === clean) {
        acc.enrollments = this.getUserEnrollments(acc.id);
        return acc;
      }
    }
    return undefined;
  }

  public getAllAccounts(): Account[] {
    return Array.from(this.accounts.values());
  }

  public getCurrentUser(): Account | null {
    if (!this.currentUserId) return null;
    return this.getAccountById(this.currentUserId) || null;
  }

  public setCurrentUserId(id: string | null) {
    this.currentUserId = id;
    this.saveToStorage();
  }

  public isUsernameTaken(username: string, excludeId?: string): boolean {
    const clean = username.toLowerCase().replace('@', '').trim();
    for (const acc of this.accounts.values()) {
      if (acc.username.toLowerCase() === clean && acc.id !== excludeId) return true;
    }
    return false;
  }

  public checkUsernameAvailability(username: string): { available: boolean; suggestions: string[]; reason?: string } {
    const clean = username.toLowerCase().replace('@', '').trim();
    const taken = this.isUsernameTaken(clean);
    if (!taken) {
      return { available: true, suggestions: [] };
    }
    return {
      available: false,
      reason: 'Username is already taken by another student or institution.',
      suggestions: [
        `${clean}_ace`,
        `${clean}_dev`,
        `${clean}2026`,
        `${clean}_pro`
      ]
    };
  }

  public isEmailTaken(email: string, excludeId?: string): boolean {
    const clean = email.toLowerCase().trim();
    for (const acc of this.accounts.values()) {
      if (acc.email.toLowerCase() === clean && acc.id !== excludeId) return true;
    }
    return false;
  }

  // Role Enrollment Engine
  public getUserEnrollments(userId: string): UserRoleEnrollment[] {
    const res: UserRoleEnrollment[] = [];
    for (const enr of this.enrollments.values()) {
      if (enr.userId === userId) res.push(enr);
    }
    return res;
  }

  public hasActiveEnrollment(userId: string, role: AccountRole): boolean {
    const user = this.accounts.get(userId);
    if (!user) return false;
    if (user.role === role) return true;
    if (user.roles && user.roles.includes(role)) return true;

    for (const enr of this.enrollments.values()) {
      if (enr.userId === userId && enr.role === role && enr.status === 'ACTIVE') {
        return true;
      }
    }
    return false;
  }

  public applyForRole(
    userId: string,
    role: AccountRole,
    collegeId?: string,
    department?: string,
    metadata?: Record<string, any>
  ): UserRoleEnrollment {
    const user = this.accounts.get(userId);
    if (!user) throw new Error(`User ${userId} not found`);

    const newEnr: UserRoleEnrollment = {
      id: 'enr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      userId,
      role,
      collegeId: collegeId || user.collegeId,
      collegeName: user.college,
      department: department || (user.roleProfileData as any)?.department,
      status: 'PENDING',
      appliedAt: new Date().toISOString(),
      metadata
    };

    this.enrollments.set(newEnr.id, newEnr);
    this.logAudit(userId, userId, 'ROLE_APPLICATION_SUBMITTED', `Applied for ${role} workspace`);
    this.saveToStorage();
    return newEnr;
  }

  public approveRole(enrollmentId: string, approvedByAdminId: string): UserRoleEnrollment {
    const enr = this.enrollments.get(enrollmentId);
    if (!enr) throw new Error('Enrollment record not found');

    enr.status = 'ACTIVE';
    enr.approvedAt = new Date().toISOString();
    enr.approvedBy = approvedByAdminId;

    // Grant role in user account
    const user = this.accounts.get(enr.userId);
    if (user) {
      if (!user.roles) user.roles = [user.role];
      if (!user.roles.includes(enr.role)) {
        user.roles.push(enr.role);
      }
      this.accounts.set(user.id, user);
    }

    this.logAudit(approvedByAdminId, enr.userId, 'ROLE_ENROLLMENT_APPROVED', `Approved ${enr.role} enrollment`);
    this.saveToStorage();
    return enr;
  }

  public rejectRole(enrollmentId: string, reason?: string): UserRoleEnrollment {
    const enr = this.enrollments.get(enrollmentId);
    if (!enr) throw new Error('Enrollment record not found');

    enr.status = 'REJECTED';
    enr.notes = reason;
    this.saveToStorage();
    return enr;
  }

  public switchActiveWorkspace(userId: string, role: AccountRole): Account {
    const user = this.accounts.get(userId);
    if (!user) throw new Error(`User ${userId} not found`);

    const isAuthorized = this.hasActiveEnrollment(userId, role) || user.role === 'ADMIN';
    if (!isAuthorized) {
      throw new Error(`User does not possess an active enrollment for workspace ${role}`);
    }

    user.activeWorkspace = role;
    this.accounts.set(userId, user);
    this.logAudit(userId, userId, 'WORKSPACE_SWITCHED', `Switched active workspace to ${role}`);
    this.saveToStorage();
    return user;
  }

  // Account Mutations
  public createAccount(accountData: Account): Account {
    if (!accountData.roles) accountData.roles = [accountData.role];
    accountData.activeWorkspace = accountData.role;
    this.accounts.set(accountData.id, accountData);

    // Auto-create initial role enrollment
    const initialEnr: UserRoleEnrollment = {
      id: 'enr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      userId: accountData.id,
      role: accountData.role,
      collegeId: accountData.collegeId,
      collegeName: accountData.college,
      status: 'ACTIVE',
      appliedAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      approvedBy: 'SYSTEM_REGISTRATION'
    };
    this.enrollments.set(initialEnr.id, initialEnr);

    this.currentUserId = accountData.id;
    this.logAudit(accountData.id, accountData.id, 'ACCOUNT_CREATED', `Account registered with role ${accountData.role}`);
    this.saveToStorage();
    return accountData;
  }

  public updateAccount(id: string, updates: Partial<Account>): Account {
    const current = this.accounts.get(id);
    if (!current) throw new Error(`Account ${id} not found`);

    const updated: Account = {
      ...current,
      ...updates,
      fullName: updates.fullName || (updates.displayName ? updates.displayName : current.fullName),
      privacyPreferences: updates.privacyPreferences || updates.privacy || current.privacyPreferences,
      privacy: updates.privacy || updates.privacyPreferences || current.privacy,
      updatedAt: new Date().toISOString()
    };

    updated.profileStrength = this.calculateProfileStrength(updated);
    this.accounts.set(id, updated);
    this.logAudit(id, id, 'PROFILE_UPDATED', `Fields updated: ${Object.keys(updates).join(', ')}`);
    this.saveToStorage();
    return updated;
  }

  public deleteAccount(id: string): boolean {
    if (!this.accounts.has(id)) return false;
    this.accounts.delete(id);
    if (this.currentUserId === id) {
      this.currentUserId = null;
    }
    this.saveToStorage();
    return true;
  }

  public calculateProfileStrength(acc: Account): number {
    let score = 20;
    if (acc.avatarUrl && !acc.avatarUrl.includes('placeholder')) score += 15;
    if (acc.coverPhotoUrl) score += 10;
    if (acc.bio && acc.bio.length > 20) score += 15;
    if (acc.college) score += 10;
    if (acc.skills?.verified?.length > 0) score += 10;
    if (acc.projects?.length > 0) score += 10;
    if (acc.socialLinks?.github || acc.socialLinks?.linkedin) score += 5;
    if (acc.emailVerified) score += 5;
    return Math.min(100, score);
  }

  public toggleFollow(followerId: string, targetId: string): { isFollowing: boolean; targetFollowersCount: number } {
    const follower = this.accounts.get(followerId);
    const target = this.accounts.get(targetId);
    if (!follower || !target) throw new Error('Invalid account ids');

    const followingIdx = follower.following.indexOf(targetId);
    const followerIdx = target.followers.indexOf(followerId);
    let isNowFollowing = false;

    if (followingIdx >= 0) {
      follower.following.splice(followingIdx, 1);
      if (followerIdx >= 0) target.followers.splice(followerIdx, 1);
      follower.followingCount = follower.following.length;
      target.followersCount = target.followers.length;
      target.stats.followersCount = target.followers.length;
    } else {
      follower.following.push(targetId);
      if (followerIdx < 0) target.followers.push(followerId);
      follower.followingCount = follower.following.length;
      target.followersCount = target.followers.length;
      target.stats.followersCount = target.followers.length;
      isNowFollowing = true;
    }

    this.saveToStorage();
    return { isFollowing: isNowFollowing, targetFollowersCount: target.followers.length };
  }

  public isFollowing(followerId: string, targetId: string): boolean {
    const follower = this.accounts.get(followerId);
    return follower ? follower.following.includes(targetId) : false;
  }

  // Gallery Management
  public getGalleryImages(userId: string): GalleryImage[] {
    const res: GalleryImage[] = [];
    for (const img of this.galleryImages.values()) {
      if (img.userId === userId) res.push(img);
    }
    return res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addGalleryImage(data: { url: string; caption: string; albumId: string; visibility?: any; userId?: string }): GalleryImage {
    const targetUserId = data.userId || this.currentUserId || 'usr_student_dileep';
    const newImg: GalleryImage = {
      id: 'gal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      userId: targetUserId,
      url: data.url,
      caption: data.caption,
      albumId: data.albumId,
      visibility: data.visibility || 'PUBLIC',
      createdAt: new Date().toISOString()
    };
    this.galleryImages.set(newImg.id, newImg);
    this.saveToStorage();
    return newImg;
  }

  public deleteGalleryImage(id: string, userId: string): boolean {
    const img = this.galleryImages.get(id);
    if (!img || img.userId !== userId) return false;
    this.galleryImages.delete(id);
    this.saveToStorage();
    return true;
  }

  public getGalleryAlbums(userId: string): GalleryAlbum[] {
    const res: GalleryAlbum[] = [];
    for (const alb of this.galleryAlbums.values()) {
      if (alb.userId === userId) res.push(alb);
    }
    return res;
  }

  // Audit Logs
  public logAudit(actor: string, targetId: string, action: string, details: string) {
    const entry: AuditLogEntry = {
      id: 'log_' + Date.now(),
      actor,
      targetId,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    this.auditLogs.unshift(entry);
    if (this.auditLogs.length > 500) this.auditLogs.pop();
    this.saveToStorage();
  }

  public getAuditLogs(userId?: string): AuditLogEntry[] {
    if (!userId) return this.auditLogs;
    return this.auditLogs.filter(l => l.actor === userId || l.targetId === userId);
  }
}

export const accountDb = new AccountDatabase();
