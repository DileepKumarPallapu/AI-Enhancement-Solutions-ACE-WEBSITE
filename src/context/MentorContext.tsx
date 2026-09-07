import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Mentor,
  MentorshipAssignment,
  MentorshipRequest,
  MentorshipSession,
  MentorshipGoal,
  ActionPlan,
  MentorshipNote,
  MentorshipMessage,
  MentorResource,
  MentorshipFeedback,
  MentorMeetingBrief,
  MentorshipArea,
  GoalCategory,
  SessionMode,
  AcademicSchool
} from '../types/mentorship';
import { mentorshipDb, CANONICAL_VEL_TECH_ID, CANONICAL_VEL_TECH_NAME } from '../services/db/mentorshipDatabase';
import { useAuth } from './AuthContext';

interface MentorContextType {
  // Queries
  collegeMentors: Mentor[];
  eligibleMentors: Mentor[];
  assignedMentors: MentorshipAssignment[];
  primaryMentor: MentorshipAssignment | null;
  secondaryMentor: MentorshipAssignment | null;
  myStudents: MentorshipAssignment[];
  studentRequests: MentorshipRequest[];
  mentorRequests: MentorshipRequest[];
  studentSessions: MentorshipSession[];
  mentorSessions: MentorshipSession[];
  studentGoals: MentorshipGoal[];
  studentActionPlans: ActionPlan[];
  mentorActionPlans: ActionPlan[];
  studentNotes: MentorshipNote[];
  studentResources: MentorResource[];
  mentorResources: MentorResource[];
  activeMentorProfile: Mentor | null;
  academicSchools: AcademicSchool[];

  // Student Actions
  requestMentorship: (payload: {
    mentorId: string;
    goalCategory: GoalCategory;
    primaryGoal: string;
    message: string;
    preferredDays: string[];
    preferredTime: string;
    preferredCommunication: string;
    assignmentType: 'PRIMARY' | 'SECONDARY';
  }) => Promise<MentorshipRequest>;

  bookSession: (payload: {
    mentorId: string;
    mentorName: string;
    mentorAvatar: string;
    date: string;
    time: string;
    durationMinutes: number;
    topic: string;
    agenda?: string;
    mentorshipArea: MentorshipArea;
    mode: SessionMode;
  }) => Promise<MentorshipSession>;

  submitFeedback: (sessionId: string, payload: {
    communication: number;
    helpfulness: number;
    knowledge: number;
    guidance: number;
    comment: string;
  }) => Promise<MentorshipFeedback>;

  toggleMilestone: (goalId: string, milestoneId: string) => Promise<MentorshipGoal>;
  createStudentGoal: (payload: {
    title: string;
    description: string;
    category: GoalCategory;
    targetDate: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    milestones: { id: string; monthIndex: number; title: string; description: string; completed: boolean }[];
  }) => Promise<MentorshipGoal>;

  toggleTaskStatus: (planId: string, taskId: string, completed: boolean, comment?: string) => Promise<ActionPlan>;

  // Mentor Actions
  respondToRequest: (requestId: string, accept: boolean, declineReason?: string) => Promise<MentorshipRequest>;
  completeSession: (sessionId: string, summary: string, actionItemTitles?: string[]) => Promise<MentorshipSession>;
  createActionPlan: (payload: {
    studentId: string;
    studentName: string;
    title: string;
    tasks: { id: string; title: string; description: string; dueDate: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; assignedTo: string; status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE' }[];
  }) => Promise<ActionPlan>;

  createNote: (payload: {
    studentId: string;
    type: 'PRIVATE_MENTOR_NOTE' | 'STUDENT_VISIBLE_NOTE';
    topic: string;
    discussionSummary: string;
    studentConcern?: string;
    mentorRecommendation: string;
    actionItemsText?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  }) => Promise<MentorshipNote>;

  recommendResource: (payload: {
    targetStudentId?: string;
    type: 'COURSE' | 'ARTICLE' | 'VIDEO' | 'PROJECT' | 'BOOK' | 'EVENT' | 'COMPETITION' | 'LEARNING_PATH';
    title: string;
    description: string;
    url: string;
    categoryTag: string;
    recommendationReason: string;
    linkedEventSlug?: string;
    linkedEventTitle?: string;
  }) => Promise<MentorResource>;

  // Messaging
  sendMessage: (receiverId: string, content: string, extra?: { embeddedEventSlug?: string; embeddedEventTitle?: string }) => Promise<MentorshipMessage>;
  getMessagesWithUser: (otherUserId: string) => MentorshipMessage[];

  // Meeting Brief Generator
  generateMeetingBrief: () => MentorMeetingBrief;
  refreshMentorshipData: () => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [version, setVersion] = useState(0);

  const refreshMentorshipData = () => {
    setVersion(v => v + 1);
  };

  const studentId = currentUser?.id || 'usr_student_dileep';
  const institutionId = currentUser?.institutionId || CANONICAL_VEL_TECH_ID;

  // Active mentor profile if user is a faculty mentor
  const activeMentorProfile = currentUser
    ? mentorshipDb.getAllMentors().find(m => m.username.toLowerCase() === currentUser.username.toLowerCase() || m.userId === currentUser.id) || null
    : null;

  const mentorId = activeMentorProfile?.id || '';

  // Data queries strictly bounded by institution and user
  const collegeMentors = mentorshipDb.getEligibleMentorsForStudent({ institutionId });
  const eligibleMentors = collegeMentors;
  const assignedMentors = mentorshipDb.getAssignmentsForStudent(studentId);
  const primaryMentor = assignedMentors.find(a => a.assignmentType === 'PRIMARY') || null;
  const secondaryMentor = assignedMentors.find(a => a.assignmentType === 'SECONDARY') || null;

  const myStudents = mentorId ? mentorshipDb.getAssignmentsForMentor(mentorId) : [];
  const studentRequests = mentorshipDb.getRequestsForStudent(studentId);
  const mentorRequests = mentorId ? mentorshipDb.getRequestsForMentor(mentorId) : [];
  const studentSessions = mentorshipDb.getSessionsForStudent(studentId);
  const mentorSessions = mentorId ? mentorshipDb.getSessionsForMentor(mentorId) : [];
  const studentGoals = mentorshipDb.getGoalsForStudent(studentId);
  const studentActionPlans = mentorshipDb.getActionPlansForStudent(studentId);
  const mentorActionPlans = mentorId ? mentorshipDb.getActionPlansForMentor(mentorId) : [];
  const studentNotes = mentorshipDb.getNotesForStudent(studentId, true, studentId);
  const studentResources = mentorshipDb.getResourcesForStudent(studentId, institutionId);
  const mentorResources = mentorId ? mentorshipDb.getResourcesByMentor(mentorId) : [];
  const academicSchools = mentorshipDb.getSchoolsForInstitution(institutionId);

  // Student Actions
  const requestMentorship = async (payload: {
    mentorId: string;
    goalCategory: GoalCategory;
    primaryGoal: string;
    message: string;
    preferredDays: string[];
    preferredTime: string;
    preferredCommunication: string;
    assignmentType: 'PRIMARY' | 'SECONDARY';
  }) => {
    const studentData = {
      id: studentId,
      username: currentUser?.username || 'dileepkumar',
      fullName: currentUser?.fullName || 'Dileep Kumar Pallapu',
      avatarUrl: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      institutionId,
      college: currentUser?.college || CANONICAL_VEL_TECH_NAME,
      department: (currentUser?.roleProfileData as any)?.department || 'Computer Science and Engineering',
      year: (currentUser?.roleProfileData as any)?.year || '3rd Year',
      school: 'School of Computing'
    };

    const req = mentorshipDb.createMentorshipRequest({
      student: studentData,
      ...payload
    });
    refreshMentorshipData();
    return req;
  };

  const bookSession = async (payload: {
    mentorId: string;
    mentorName: string;
    mentorAvatar: string;
    date: string;
    time: string;
    durationMinutes: number;
    topic: string;
    agenda?: string;
    mentorshipArea: MentorshipArea;
    mode: SessionMode;
  }) => {
    const sess = mentorshipDb.bookSession({
      ...payload,
      studentId,
      studentName: currentUser?.fullName || 'Dileep Kumar Pallapu',
      studentAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      studentUsername: currentUser?.username || 'dileepkumar',
      institutionId
    });
    refreshMentorshipData();
    return sess;
  };

  const submitFeedback = async (sessionId: string, payload: {
    communication: number;
    helpfulness: number;
    knowledge: number;
    guidance: number;
    comment: string;
  }) => {
    const fb = mentorshipDb.submitFeedback(sessionId, {
      studentId,
      studentName: currentUser?.fullName || 'Dileep Kumar Pallapu',
      studentCollege: currentUser?.college || CANONICAL_VEL_TECH_NAME,
      ...payload
    });
    refreshMentorshipData();
    return fb;
  };

  const toggleMilestone = async (goalId: string, milestoneId: string) => {
    const goal = mentorshipDb.toggleGoalMilestone(goalId, milestoneId);
    refreshMentorshipData();
    return goal;
  };

  const createStudentGoal = async (payload: {
    title: string;
    description: string;
    category: GoalCategory;
    targetDate: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    milestones: { id: string; monthIndex: number; title: string; description: string; completed: boolean }[];
  }) => {
    const goal = mentorshipDb.createGoal({
      studentId,
      mentorId: primaryMentor?.mentorId,
      mentorName: primaryMentor?.mentorName,
      institutionId,
      ...payload
    });
    refreshMentorshipData();
    return goal;
  };

  const toggleTaskStatus = async (planId: string, taskId: string, completed: boolean, comment?: string) => {
    const plan = mentorshipDb.toggleTaskStatus(planId, taskId, completed, comment);
    refreshMentorshipData();
    return plan;
  };

  // Mentor Actions
  const respondToRequest = async (requestId: string, accept: boolean, declineReason?: string) => {
    const req = mentorshipDb.respondToRequest(requestId, accept, declineReason, mentorId);
    refreshMentorshipData();
    return req;
  };

  const completeSession = async (sessionId: string, summary: string, actionItemTitles?: string[]) => {
    const sess = mentorshipDb.completeSession(sessionId, summary, actionItemTitles);
    refreshMentorshipData();
    return sess;
  };

  const createActionPlan = async (payload: {
    studentId: string;
    studentName: string;
    title: string;
    tasks: { id: string; title: string; description: string; dueDate: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'; assignedTo: string; status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE' }[];
  }) => {
    const plan = mentorshipDb.createActionPlan({
      mentorId,
      mentorName: activeMentorProfile?.fullName || 'Faculty Mentor',
      institutionId,
      ...payload
    });
    refreshMentorshipData();
    return plan;
  };

  const createNote = async (payload: {
    studentId: string;
    type: 'PRIVATE_MENTOR_NOTE' | 'STUDENT_VISIBLE_NOTE';
    topic: string;
    discussionSummary: string;
    studentConcern?: string;
    mentorRecommendation: string;
    actionItemsText?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  }) => {
    const note = mentorshipDb.createNote({
      mentorId,
      institutionId,
      ...payload
    });
    refreshMentorshipData();
    return note;
  };

  const recommendResource = async (payload: {
    targetStudentId?: string;
    type: 'COURSE' | 'ARTICLE' | 'VIDEO' | 'PROJECT' | 'BOOK' | 'EVENT' | 'COMPETITION' | 'LEARNING_PATH';
    title: string;
    description: string;
    url: string;
    categoryTag: string;
    recommendationReason: string;
    linkedEventSlug?: string;
    linkedEventTitle?: string;
  }) => {
    const res = mentorshipDb.recommendResource({
      mentorId,
      mentorName: activeMentorProfile?.fullName || 'Faculty Mentor',
      institutionId,
      ...payload
    });
    refreshMentorshipData();
    return res;
  };

  // Messaging
  const sendMessage = async (receiverId: string, content: string, extra?: { embeddedEventSlug?: string; embeddedEventTitle?: string }) => {
    const isMentor = !!activeMentorProfile;
    const msg = mentorshipDb.sendMessage({
      senderId: currentUser?.id || studentId,
      senderName: currentUser?.fullName || 'Dileep Kumar Pallapu',
      senderAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      senderRole: isMentor ? 'MENTOR' : 'STUDENT',
      receiverId,
      content,
      embeddedEventSlug: extra?.embeddedEventSlug,
      embeddedEventTitle: extra?.embeddedEventTitle
    });
    refreshMentorshipData();
    return msg;
  };

  const getMessagesWithUser = (otherUserId: string) => {
    const currentId = currentUser?.id || studentId;
    return mentorshipDb.getMessages(currentId, otherUserId);
  };

  // Generate Meeting Brief
  const generateMeetingBrief = () => {
    return mentorshipDb.generateMentorMeetingBrief(
      studentId,
      currentUser?.fullName || 'Dileep Kumar Pallapu',
      currentUser?.college || CANONICAL_VEL_TECH_NAME,
      (currentUser?.roleProfileData as any)?.department || 'Computer Science & Engineering',
      (currentUser?.roleProfileData as any)?.year || '3rd Year'
    );
  };

  return (
    <MentorContext.Provider
      value={{
        collegeMentors,
        eligibleMentors,
        assignedMentors,
        primaryMentor,
        secondaryMentor,
        myStudents,
        studentRequests,
        mentorRequests,
        studentSessions,
        mentorSessions,
        studentGoals,
        studentActionPlans,
        mentorActionPlans,
        studentNotes,
        studentResources,
        mentorResources,
        activeMentorProfile,
        academicSchools,
        requestMentorship,
        bookSession,
        submitFeedback,
        toggleMilestone,
        createStudentGoal,
        toggleTaskStatus,
        respondToRequest,
        completeSession,
        createActionPlan,
        createNote,
        recommendResource,
        sendMessage,
        getMessagesWithUser,
        generateMeetingBrief,
        refreshMentorshipData
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = () => {
  const ctx = useContext(MentorContext);
  if (!ctx) throw new Error('useMentor must be used within MentorProvider');
  return ctx;
};
