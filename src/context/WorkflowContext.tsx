import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventSubmissionData, WorkflowStatus, RequestedChangesInfo, EventRevision, ApprovalComment } from '../types/workflow';
import { useToast } from './ToastContext';

interface WorkflowContextType {
  submissions: EventSubmissionData[];
  getSubmissionById: (id: string) => EventSubmissionData | undefined;
  getSubmissionBySlug: (slug: string) => EventSubmissionData | undefined;
  getUserSubmissions: (userEmail: string) => EventSubmissionData[];
  getAmbassadorSubmissions: (collegeName: string) => EventSubmissionData[];
  getAdminSubmissions: () => EventSubmissionData[];
  createOrUpdateSubmission: (data: Partial<EventSubmissionData>, isDraft?: boolean) => EventSubmissionData;
  ambassadorApprove: (id: string, comments?: string) => void;
  ambassadorRequestChanges: (id: string, fields: string[], comments: string) => void;
  ambassadorReject: (id: string, comments: string) => void;
  adminApprove: (id: string, comments?: string) => void;
  adminRequestChanges: (id: string, fields: string[], comments: string) => void;
  adminReject: (id: string, comments: string) => void;
  organizerConfirm: (id: string, comments?: string) => void;
  organizerRequestChanges: (id: string, fields: string[], comments: string) => void;
  organizerReject: (id: string, comments: string) => void;
  resubmitEvent: (id: string, updatedData: Partial<EventSubmissionData>, submitterNote: string) => void;
  publishedEvents: EventSubmissionData[];
}

const initialSubmissions: EventSubmissionData[] = [
  {
    id: 'ACE-EVT-2026-000184',
    slug: 'ai-agents-hackathon-2026-hit',
    title: 'Autonomous AI Agents Hackathon 2026',
    eventType: 'Hackathon',
    category: 'Technical & Coding',
    shortDescription: 'Build next-gen autonomous LLM agents and multi-agent coordination systems in 24 hours.',
    fullDescription: 'Join hundreds of collegiate developers to build autonomous agent architectures, RAG pipelines, and automated reasoning tools.',
    college: {
      name: 'Hindustan Institute of Technology',
      department: 'Computer Science and Engineering',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      website: 'https://hindustan.ac.in'
    },
    organizer: {
      name: 'ACE AI Club & Dept of CSE',
      email: 'organizer.ai@hindustan.ac.in',
      phone: '+91 98401 23456',
      type: 'Department',
      isSubmittingOnBehalf: true
    },
    schedule: {
      startDate: '2026-09-28',
      endDate: '2026-09-29',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      regStart: '2026-09-01',
      regDeadline: '2026-09-25',
      timezone: 'Asia/Kolkata (IST)'
    },
    location: {
      mode: 'OFFLINE',
      venue: 'Main Auditorium & Turing Computing Labs',
      building: 'APJ Abdul Kalam Block',
      room: 'Lab 301 & 302',
      city: 'Coimbatore',
      address: 'Othakkalmandapam, Coimbatore, Tamil Nadu 641032',
      mapsUrl: 'https://maps.google.com'
    },
    registration: {
      type: 'FREE',
      url: 'https://hindustan.ac.in/events/ai-hackathon',
      maxParticipants: 200,
      teamSize: '2-4 Members',
      eligibility: 'All Engineering & Tech Undergrads',
      requiredSkills: ['Python', 'LangChain', 'React', 'FastAPI']
    },
    prizes: {
      prizePool: '₹1,50,000',
      firstPrize: '₹75,000 + Internship Fast-track',
      secondPrize: '₹45,000',
      thirdPrize: '₹30,000',
      certificate: true,
      certificateType: 'Participation',
      accommodation: true,
      food: true
    },
    media: {
      posterUrl: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/b9228fbd-8694-44c7-94f7-d1b80968788c-Screenshot-2026-08-31-at-3.00.07-PM.webp'
    },
    additional: {
      rules: 'Standard hackathon code of conduct applies. All projects must be fresh commits on GitHub during hackathon hours.',
      faqs: [
        { question: 'Is accommodation provided?', answer: 'Yes, dorm facilities are available for outstation teams.' },
        { question: 'Are beginners welcome?', answer: 'Yes, dedicated mentors from Google & AWS will guide first-time hackers.' }
      ],
      contactPerson: 'Dr. S. K. Narayanan (HOD CSE) - 98401 23456',
      socialLinks: {
        website: 'https://hindustan.ac.in',
        github: 'https://github.com/hit-cse-ai'
      }
    },
    aiQuality: {
      score: 96,
      issues: [],
      checks: [
        { label: 'Event information complete', passed: true },
        { label: 'Organizer identity verified', passed: true },
        { label: 'Poster resolution verified', passed: true },
        { label: 'Valid registration deadline', passed: true },
        { label: 'No duplicate event detected', passed: true }
      ]
    },
    status: 'PENDING_COLLEGE_AMBASSADOR',
    currentStage: 'College Ambassador Review',
    submittedBy: {
      id: 'usr-dileep-01',
      name: 'Pallapu Dileep Kumar',
      email: 'dileepkumarpallapu28@gmail.com',
      role: 'STUDENT'
    },
    submittedAt: '02 Sep 2026, 10:30 AM',
    lastUpdatedAt: '02 Sep 2026, 10:30 AM',
    requestedChanges: null,
    revisions: [
      {
        version: 1,
        author: 'Pallapu Dileep Kumar',
        role: 'STUDENT',
        timestamp: '02 Sep 2026, 10:30 AM',
        summary: 'Initial event submission',
        statusAfter: 'PENDING_COLLEGE_AMBASSADOR'
      }
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Pallapu Dileep Kumar',
        role: 'Submitter',
        timestamp: '02 Sep 2026, 10:30 AM',
        comment: 'Submitted on behalf of CSE Dept for national collegiate participation.',
        stage: 'Submission'
      }
    ]
  },
  {
    id: 'ACE-EVT-2026-000182',
    slug: 'national-cyber-defense-summit-kce',
    title: 'National Cyber Defense & Ethical Hacking Summit',
    eventType: 'Symposium',
    category: 'Technical & Coding',
    shortDescription: 'State level CTF competition, red-teaming workshops, and bug-bounty keynote.',
    fullDescription: 'Full day cybersecurity conference with hands-on labs and live capture-the-flag challenge.',
    college: {
      name: 'Karpagam College of Engineering',
      department: 'Information Technology',
      city: 'Coimbatore',
      state: 'Tamil Nadu'
    },
    organizer: {
      name: 'KCE Infosec Society',
      email: 'infosec@kce.ac.in',
      phone: '+91 94432 11223',
      type: 'Club',
      isSubmittingOnBehalf: true
    },
    schedule: {
      startDate: '2026-10-05',
      endDate: '2026-10-05',
      startTime: '09:30 AM',
      endTime: '04:30 PM',
      regDeadline: '2026-10-01',
      timezone: 'Asia/Kolkata (IST)'
    },
    location: {
      mode: 'OFFLINE',
      venue: 'Main Seminar Hall 2',
      city: 'Coimbatore',
      address: 'Myleripalayam, Othakkalmandapam, Coimbatore, Tamil Nadu 641032'
    },
    registration: {
      type: 'PAID',
      fee: 250,
      url: 'https://kce.ac.in/cyber-summit',
      maxParticipants: 150,
      eligibility: 'All college students with valid ID'
    },
    prizes: {
      prizePool: '₹50,000',
      certificate: true,
      certificateType: 'Participation',
      accommodation: false,
      food: true
    },
    media: {
      posterUrl: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/55392a78-124c-4139-982b-2f3fcfdb6252-WhatsApp-Image-2026-08-31-at-9.37.06-PM.webp'
    },
    additional: {
      faqs: [],
      socialLinks: {}
    },
    aiQuality: {
      score: 88,
      issues: ['Venue room number missing', 'Official payment QR needs verification'],
      checks: [
        { label: 'Event information complete', passed: true },
        { label: 'Organizer identity verified', passed: true },
        { label: 'Poster resolution verified', passed: true },
        { label: 'Valid registration deadline', passed: true },
        { label: 'No duplicate event detected', passed: true }
      ]
    },
    status: 'CHANGES_REQUESTED_BY_AMBASSADOR',
    currentStage: 'Submitter Revision Required',
    submittedBy: {
      id: 'usr-dileep-01',
      name: 'Pallapu Dileep Kumar',
      email: 'dileepkumarpallapu28@gmail.com',
      role: 'STUDENT'
    },
    submittedAt: '01 Sep 2026, 04:15 PM',
    lastUpdatedAt: '02 Sep 2026, 09:00 AM',
    requestedChanges: {
      requestedBy: 'KCE Campus Ambassador',
      role: 'COLLEGE_AMBASSADOR',
      fields: ['venue', 'registrationUrl'],
      comments: 'Please specify the exact lab block for the CTF room and verify the UPI payment handle link.',
      timestamp: '02 Sep 2026, 09:00 AM'
    },
    revisions: [
      {
        version: 1,
        author: 'Pallapu Dileep Kumar',
        role: 'STUDENT',
        timestamp: '01 Sep 2026, 04:15 PM',
        summary: 'Initial submission',
        statusAfter: 'PENDING_COLLEGE_AMBASSADOR'
      },
      {
        version: 2,
        author: 'KCE Campus Ambassador',
        role: 'CAMPUS_AMBASSADOR',
        timestamp: '02 Sep 2026, 09:00 AM',
        summary: 'Requested venue & registration URL updates',
        changedFields: ['venue', 'registrationUrl'],
        statusAfter: 'CHANGES_REQUESTED_BY_AMBASSADOR'
      }
    ],
    comments: [
      {
        id: 'c-2',
        author: 'KCE Campus Ambassador',
        role: 'Campus Ambassador',
        timestamp: '02 Sep 2026, 09:00 AM',
        comment: 'Please specify the exact lab block for the CTF room and verify the UPI payment handle link.',
        stage: 'Ambassador Review'
      }
    ]
  },
  {
    id: 'ACE-EVT-2026-000179',
    slug: 'nexora-2k26-national-technical-symposium',
    title: 'NEXORA 2K26 – National Level Technical Symposium',
    eventType: 'Symposium',
    category: 'Technical & Coding',
    shortDescription: 'Flagship inter-collegiate technical fest featuring Paper Presentation, Web Design, Coding Relay, and Tech Quiz.',
    fullDescription: 'NEXORA 2K26 brings together the brightest minds across Tamil Nadu colleges for a high-intensity symposium with cash prizes and Scopus journal publishing support.',
    college: {
      name: 'Hindustan Institute of Technology',
      department: 'Computer Science & Engineering',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      website: 'https://hindustan.ac.in'
    },
    organizer: {
      name: 'CSE Student Association (CETA)',
      email: 'ceta@hindustan.ac.in',
      phone: '+91 98401 99887',
      type: 'Department',
      isSubmittingOnBehalf: false
    },
    schedule: {
      startDate: '2026-09-18',
      endDate: '2026-09-18',
      startTime: '09:00 AM',
      endTime: '04:30 PM',
      regDeadline: '2026-09-15',
      timezone: 'Asia/Kolkata (IST)'
    },
    location: {
      mode: 'OFFLINE',
      venue: 'Auditorium 1 & CSE Seminar Hall',
      city: 'Coimbatore',
      address: 'Othakkalmandapam, Coimbatore, Tamil Nadu 641032'
    },
    registration: {
      type: 'PAID',
      fee: 200,
      url: 'https://hindustan.ac.in/ceta/nexora2k26',
      maxParticipants: 300,
      eligibility: 'Open to all Engineering, MCA & BCA students'
    },
    prizes: {
      prizePool: '₹60,000',
      certificate: true,
      certificateType: 'Participation',
      accommodation: false,
      food: true
    },
    media: {
      posterUrl: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/f51086a4-6da5-4202-a169-be54848039c3-poster.png'
    },
    additional: {
      faqs: [],
      socialLinks: {}
    },
    aiQuality: {
      score: 98,
      issues: [],
      checks: [
        { label: 'Event information complete', passed: true },
        { label: 'Organizer identity verified', passed: true },
        { label: 'Poster resolution verified', passed: true },
        { label: 'Valid registration deadline', passed: true },
        { label: 'No duplicate event detected', passed: true }
      ]
    },
    status: 'PUBLISHED',
    currentStage: 'Published on Platform',
    submittedBy: {
      id: 'usr-ceta-01',
      name: 'CETA Student Secretary',
      email: 'ceta@hindustan.ac.in',
      role: 'ORGANIZER'
    },
    submittedAt: '28 Aug 2026, 11:00 AM',
    lastUpdatedAt: '30 Aug 2026, 02:00 PM',
    requestedChanges: null,
    revisions: [
      {
        version: 1,
        author: 'CETA Student Secretary',
        role: 'ORGANIZER',
        timestamp: '28 Aug 2026, 11:00 AM',
        summary: 'Submitted event',
        statusAfter: 'PENDING_COLLEGE_AMBASSADOR'
      },
      {
        version: 2,
        author: 'HIT Campus Ambassador',
        role: 'CAMPUS_AMBASSADOR',
        timestamp: '29 Aug 2026, 09:30 AM',
        summary: 'College Ambassador approved',
        statusAfter: 'PENDING_ACE_ADMIN'
      },
      {
        version: 3,
        author: 'ACE Super Admin',
        role: 'ACE_ADMIN',
        timestamp: '30 Aug 2026, 02:00 PM',
        summary: 'ACE Admin final approval and publication',
        statusAfter: 'PUBLISHED'
      }
    ],
    comments: [
      {
        id: 'c-3',
        author: 'HIT Campus Ambassador',
        role: 'Campus Ambassador',
        timestamp: '29 Aug 2026, 09:30 AM',
        comment: 'Verified with CSE Dept HOD. Looks great!',
        stage: 'Ambassador Review'
      },
      {
        id: 'c-4',
        author: 'ACE Super Admin',
        role: 'ACE Admin',
        timestamp: '30 Aug 2026, 02:00 PM',
        comment: 'AI Quality score 98/100. Approved for publication.',
        stage: 'Admin Review'
      }
    ]
  }
];

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  
  const [submissions, setSubmissions] = useState<EventSubmissionData[]>(() => {
    const saved = localStorage.getItem('ace_event_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  useEffect(() => {
    localStorage.setItem('ace_event_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const getSubmissionById = (id: string) => submissions.find(s => s.id === id);
  const getSubmissionBySlug = (slug: string) => submissions.find(s => s.slug === slug);
  const getUserSubmissions = (email: string) => submissions.filter(s => s.submittedBy?.email?.toLowerCase() === email.toLowerCase());
  const getAmbassadorSubmissions = (collegeName: string) => submissions.filter(s => s.college?.name?.toLowerCase().includes(collegeName.toLowerCase()) || s.status === 'PENDING_COLLEGE_AMBASSADOR');
  const getAdminSubmissions = () => submissions;

  const createOrUpdateSubmission = (data: Partial<EventSubmissionData>, isDraft = false): EventSubmissionData => {
    let submission: EventSubmissionData;
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    if (data.id && submissions.some(s => s.id === data.id)) {
      // Update existing
      submission = submissions.find(s => s.id === data.id)!;
      const updated: EventSubmissionData = {
        ...submission,
        ...data,
        status: isDraft ? 'DRAFT' : 'PENDING_COLLEGE_AMBASSADOR',
        currentStage: isDraft ? 'Draft Saved' : 'College Ambassador Review',
        requestedChanges: null, // cleared upon resubmission
        lastUpdatedAt: now,
        revisions: [
          ...submission.revisions,
          {
            version: submission.revisions.length + 1,
            author: data.submittedBy?.name || submission.submittedBy.name,
            role: data.submittedBy?.role || submission.submittedBy.role,
            timestamp: now,
            summary: isDraft ? 'Saved draft updates' : 'Updated and resubmitted event',
            statusAfter: isDraft ? 'DRAFT' : 'PENDING_COLLEGE_AMBASSADOR'
          }
        ]
      };
      setSubmissions(prev => prev.map(s => s.id === data.id ? updated : s));
      showToast(isDraft ? 'Event draft saved ✓' : 'Event resubmitted for verification ✓', 'success');
      return updated;
    } else {
      // Brand new submission
      const newId = `ACE-EVT-2026-${String(submissions.length + 185).padStart(6, '0')}`;
      const newSlug = (data.title || 'new-college-event')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

      submission = {
        id: newId,
        slug: newSlug,
        title: data.title || 'Untitled College Event',
        eventType: data.eventType || 'Symposium',
        category: data.category || 'Technical & Coding',
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        college: data.college || { name: 'Hindustan Institute of Technology', department: 'CSE', city: 'Coimbatore', state: 'Tamil Nadu' },
        organizer: data.organizer || { name: 'Student Association', email: 'student@college.edu', phone: '+91 90000 00000', type: 'Student', isSubmittingOnBehalf: false },
        schedule: data.schedule || { startDate: '2026-10-10', endDate: '2026-10-10', startTime: '09:00 AM', endTime: '05:00 PM', regDeadline: '2026-10-05', timezone: 'Asia/Kolkata (IST)' },
        location: data.location || { mode: 'OFFLINE', venue: 'Campus Auditorium', city: 'Coimbatore' },
        registration: data.registration || { type: 'FREE', maxParticipants: 100 },
        prizes: data.prizes || { certificate: true, accommodation: false, food: false },
        media: data.media || { posterUrl: 'https://ace-web-qa.s3.ap-south-1.amazonaws.com/events/b9228fbd-8694-44c7-94f7-d1b80968788c-Screenshot-2026-08-31-at-3.00.07-PM.webp' },
        additional: data.additional || { faqs: [], socialLinks: {} },
        aiQuality: data.aiQuality || { score: 92, issues: [], checks: [{ label: 'Event info complete', passed: true }] },
        status: isDraft ? 'DRAFT' : 'PENDING_COLLEGE_AMBASSADOR',
        currentStage: isDraft ? 'Draft' : 'College Ambassador Review',
        submittedBy: data.submittedBy || { id: 'usr-current', name: 'Pallapu Dileep Kumar', email: 'dileepkumarpallapu28@gmail.com', role: 'STUDENT' },
        submittedAt: now,
        lastUpdatedAt: now,
        requestedChanges: null,
        revisions: [
          {
            version: 1,
            author: data.submittedBy?.name || 'Pallapu Dileep Kumar',
            role: 'STUDENT',
            timestamp: now,
            summary: isDraft ? 'Draft created' : 'Event submitted for approval',
            statusAfter: isDraft ? 'DRAFT' : 'PENDING_COLLEGE_AMBASSADOR'
          }
        ],
        comments: [
          {
            id: 'c-init',
            author: data.submittedBy?.name || 'Pallapu Dileep Kumar',
            role: 'Submitter',
            timestamp: now,
            comment: 'Event created and submitted for verification.',
            stage: 'Submission'
          }
        ]
      };
      setSubmissions(prev => [submission, ...prev]);
      showToast(isDraft ? 'Draft saved ✓' : `Event ${newId} submitted for Ambassador review ✓`, 'success');
      return submission;
    }
  };

  const ambassadorApprove = (id: string, comments = 'Approved by College Ambassador.') => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'PENDING_ACE_ADMIN',
        currentStage: 'ACE Admin Review',
        lastUpdatedAt: now,
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: 'Campus Ambassador',
            role: 'CAMPUS_AMBASSADOR',
            timestamp: now,
            summary: 'Ambassador verified & approved event',
            statusAfter: 'PENDING_ACE_ADMIN'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: 'Campus Ambassador',
            role: 'Campus Ambassador',
            timestamp: now,
            comment: comments,
            stage: 'Ambassador Review'
          }
        ]
      };
    }));
    showToast('Event approved and forwarded to ACE Admin ✓', 'success');
  };

  const ambassadorRequestChanges = (id: string, fields: string[], comments: string) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'CHANGES_REQUESTED_BY_AMBASSADOR',
        currentStage: 'Changes Requested by Ambassador',
        lastUpdatedAt: now,
        requestedChanges: {
          requestedBy: 'Campus Ambassador',
          role: 'COLLEGE_AMBASSADOR',
          fields,
          comments,
          timestamp: now
        },
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: 'Campus Ambassador',
            role: 'CAMPUS_AMBASSADOR',
            timestamp: now,
            summary: `Requested changes on: ${fields.join(', ')}`,
            changedFields: fields,
            statusAfter: 'CHANGES_REQUESTED_BY_AMBASSADOR'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: 'Campus Ambassador',
            role: 'Campus Ambassador',
            timestamp: now,
            comment: comments,
            stage: 'Ambassador Review'
          }
        ]
      };
    }));
    showToast('Change request sent to original submitter ✓', 'info');
  };

  const ambassadorReject = (id: string, comments: string) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'REJECTED',
        currentStage: 'Rejected by Ambassador',
        lastUpdatedAt: now,
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: 'Campus Ambassador',
            role: 'CAMPUS_AMBASSADOR',
            timestamp: now,
            summary: 'Event rejected',
            statusAfter: 'REJECTED'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: 'Campus Ambassador',
            role: 'Campus Ambassador',
            timestamp: now,
            comment: comments,
            stage: 'Ambassador Review'
          }
        ]
      };
    }));
    showToast('Event submission rejected.', 'error');
  };

  const adminApprove = (id: string, comments = 'Approved by ACE Admin.') => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      const requiresOrgConfirm = s.organizer?.isSubmittingOnBehalf;
      const nextStatus: WorkflowStatus = requiresOrgConfirm ? 'PENDING_ORGANIZER_CONFIRMATION' : 'PUBLISHED';
      const nextStage = requiresOrgConfirm ? 'Organizer Confirmation Required' : 'Published on Platform';

      return {
        ...s,
        status: nextStatus,
        currentStage: nextStage,
        lastUpdatedAt: now,
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: 'ACE Super Admin',
            role: 'ACE_ADMIN',
            timestamp: now,
            summary: requiresOrgConfirm ? 'Admin approved, sent for organizer confirmation' : 'Admin approved and published live',
            statusAfter: nextStatus
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: 'ACE Super Admin',
            role: 'ACE Admin',
            timestamp: now,
            comment: comments,
            stage: 'Admin Review'
          }
        ]
      };
    }));
    showToast('Event approved by ACE Admin ✓', 'success');
  };

  const adminRequestChanges = (id: string, fields: string[], comments: string) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'CHANGES_REQUESTED_BY_ADMIN',
        currentStage: 'Changes Requested by ACE Admin',
        lastUpdatedAt: now,
        requestedChanges: {
          requestedBy: 'ACE Admin',
          role: 'ACE_ADMIN',
          fields,
          comments,
          timestamp: now
        },
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: 'ACE Super Admin',
            role: 'ACE_ADMIN',
            timestamp: now,
            summary: `Admin requested changes on: ${fields.join(', ')}`,
            changedFields: fields,
            statusAfter: 'CHANGES_REQUESTED_BY_ADMIN'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: 'ACE Super Admin',
            role: 'ACE Admin',
            timestamp: now,
            comment: comments,
            stage: 'Admin Review'
          }
        ]
      };
    }));
    showToast('Admin requested changes from submitter ✓', 'info');
  };

  const adminReject = (id: string, comments: string) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'REJECTED',
        currentStage: 'Rejected by ACE Admin',
        lastUpdatedAt: now,
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: 'ACE Super Admin',
            role: 'ACE_ADMIN',
            timestamp: now,
            summary: 'Admin rejected event submission',
            statusAfter: 'REJECTED'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: 'ACE Super Admin',
            role: 'ACE Admin',
            timestamp: now,
            comment: comments,
            stage: 'Admin Review'
          }
        ]
      };
    }));
    showToast('Event rejected by ACE Admin.', 'error');
  };

  const organizerConfirm = (id: string, comments = 'Confirmed by Event Organizer.') => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'PUBLISHED',
        currentStage: 'Published on Platform',
        lastUpdatedAt: now,
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: s.organizer.name,
            role: 'ORGANIZER',
            timestamp: now,
            summary: 'Organizer confirmed and published live',
            statusAfter: 'PUBLISHED'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: s.organizer.name,
            role: 'Organizer',
            timestamp: now,
            comment: comments,
            stage: 'Organizer Confirmation'
          }
        ]
      };
    }));
    showToast('Organizer confirmed! Event is now PUBLISHED live on ACE ✓', 'success');
  };

  const organizerRequestChanges = (id: string, fields: string[], comments: string) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'CHANGES_REQUESTED_BY_ORGANIZER',
        currentStage: 'Changes Requested by Organizer',
        lastUpdatedAt: now,
        requestedChanges: {
          requestedBy: s.organizer.name,
          role: 'ORGANIZER',
          fields,
          comments,
          timestamp: now
        },
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: s.organizer.name,
            role: 'ORGANIZER',
            timestamp: now,
            summary: `Organizer requested changes on: ${fields.join(', ')}`,
            changedFields: fields,
            statusAfter: 'CHANGES_REQUESTED_BY_ORGANIZER'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: s.organizer.name,
            role: 'Organizer',
            timestamp: now,
            comment: comments,
            stage: 'Organizer Confirmation'
          }
        ]
      };
    }));
    showToast('Organizer requested modifications from submitter ✓', 'info');
  };

  const organizerReject = (id: string, comments: string) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        status: 'REJECTED',
        currentStage: 'Rejected by Organizer',
        lastUpdatedAt: now,
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: s.organizer.name,
            role: 'ORGANIZER',
            timestamp: now,
            summary: 'Organizer rejected event representation',
            statusAfter: 'REJECTED'
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: s.organizer.name,
            role: 'Organizer',
            timestamp: now,
            comment: comments,
            stage: 'Organizer Confirmation'
          }
        ]
      };
    }));
    showToast('Event rejected by Organizer.', 'error');
  };

  const resubmitEvent = (id: string, updatedData: Partial<EventSubmissionData>, submitterNote: string) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setSubmissions(prev => prev.map(s => {
      if (s.id !== id) return s;
      
      // Determine where it returns to
      let nextStatus: WorkflowStatus = 'PENDING_COLLEGE_AMBASSADOR';
      let nextStage = 'College Ambassador Review';

      if (s.status === 'CHANGES_REQUESTED_BY_ADMIN') {
        nextStatus = 'PENDING_ACE_ADMIN';
        nextStage = 'ACE Admin Review';
      } else if (s.status === 'CHANGES_REQUESTED_BY_ORGANIZER') {
        nextStatus = 'PENDING_ORGANIZER_CONFIRMATION';
        nextStage = 'Organizer Confirmation';
      }

      return {
        ...s,
        ...updatedData,
        status: nextStatus,
        currentStage: nextStage,
        requestedChanges: null, // Cleared after resubmit
        lastUpdatedAt: now,
        revisions: [
          ...s.revisions,
          {
            version: s.revisions.length + 1,
            author: s.submittedBy.name,
            role: s.submittedBy.role,
            timestamp: now,
            summary: `Resubmitted with updates: ${submitterNote}`,
            statusAfter: nextStatus
          }
        ],
        comments: [
          ...s.comments,
          {
            id: 'c-' + Date.now(),
            author: s.submittedBy.name,
            role: 'Submitter',
            timestamp: now,
            comment: `Updated fields: ${submitterNote}`,
            stage: 'Submitter Revision'
          }
        ]
      };
    }));
    showToast('Event resubmitted for verification ✓', 'success');
  };

  // Critical Business Rule: Only status === 'PUBLISHED' events are exposed
  const publishedEvents = submissions.filter(s => s.status === 'PUBLISHED');

  return (
    <WorkflowContext.Provider
      value={{
        submissions,
        getSubmissionById,
        getSubmissionBySlug,
        getUserSubmissions,
        getAmbassadorSubmissions,
        getAdminSubmissions,
        createOrUpdateSubmission,
        ambassadorApprove,
        ambassadorRequestChanges,
        ambassadorReject,
        adminApprove,
        adminRequestChanges,
        adminReject,
        organizerConfirm,
        organizerRequestChanges,
        organizerReject,
        resubmitEvent,
        publishedEvents
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) throw new Error('useWorkflow must be used within WorkflowProvider');
  return context;
};
