import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MentorProfile,
  MentorStudentAssignment,
  MentorRequest,
  MentorSession,
  MentorGoal,
  MentorActionItem,
  MentorRecommendation,
  MentorNote,
  MentorMessage,
  MentorApplication,
  MentorAnalyticsData,
  MentorshipArea,
  SessionMode,
  ActionItemPriority,
  RecommendationType
} from '../types/mentor';
import { mentorDb } from '../services/db/mentorDatabase';
import { useAuth } from './AuthContext';

interface MentorContextType {
  // Queries
  collegeMentors: MentorProfile[];
  assignedMentors: MentorStudentAssignment[];
  myStudents: MentorStudentAssignment[];
  mentorRequests: MentorRequest[];
  studentSessions: MentorSession[];
  mentorSessions: MentorSession[];
  studentGoals: MentorGoal[];
  studentActionItems: MentorActionItem[];
  mentorActionItems: MentorActionItem[];
  studentRecommendations: MentorRecommendation[];
  mentorAnalytics: MentorAnalyticsData | null;
  activeMentorProfile: MentorProfile | null;

  // Student Actions
  requestMentor: (payload: {
    mentorId: string;
    mentorName: string;
    reason: string;
    primaryGuidanceArea: MentorshipArea;
    currentGoal: string;
    helpNeededDescription: string;
    preferredCommunication: string;
    preferredDays: string[];
    preferredTime: string;
    optionalMessage?: string;
  }) => Promise<MentorRequest>;

  bookSession: (payload: {
    mentorId: string;
    mentorName: string;
    mentorAvatar: string;
    date: string;
    time: string;
    durationMinutes: number;
    topic: string;
    mentorshipArea: MentorshipArea;
    mode: SessionMode;
    meetingUrl?: string;
  }) => Promise<MentorSession>;

  submitFeedback: (sessionId: string, rating: number, comment?: string) => Promise<MentorSession>;
  toggleActionItem: (itemId: string, status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED', comment?: string) => Promise<MentorActionItem>;

  // Mentor Actions
  respondToRequest: (requestId: string, accept: boolean, declineReason?: string) => Promise<MentorRequest>;
  completeSession: (sessionId: string, summary: string, actionItemTitles?: string[]) => Promise<MentorSession>;
  createGoal: (goal: {
    studentId: string;
    title: string;
    targetCategory: 'CAREER' | 'ACADEMIC' | 'TECHNICAL' | 'EVENT' | 'COMPETITION' | 'PROJECT';
    targetDate: string;
    progressPercentage: number;
    milestones: any[];
    mentorReviewNotes?: string;
    status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  }) => Promise<MentorGoal>;

  updateGoalProgress: (goalId: string, progress: number, notes?: string) => Promise<MentorGoal>;
  createActionItem: (item: {
    studentId: string;
    title: string;
    description: string;
    priority: ActionItemPriority;
    deadline: string;
    linkedResourceUrl?: string;
  }) => Promise<MentorActionItem>;

  recommendResource: (rec: {
    studentId: string;
    type: RecommendationType;
    targetId: string;
    title: string;
    description: string;
    reason: string;
    categoryTag: string;
    actionUrl: string;
  }) => Promise<MentorRecommendation>;

  createNote: (note: {
    studentId: string;
    sessionDate: string;
    topic: string;
    discussionSummary: string;
    studentConcern?: string;
    mentorRecommendation: string;
    priority: ActionItemPriority;
    privacyLevel: 'PRIVATE_MENTOR_NOTE' | 'SHARED_WITH_STUDENT';
  }) => Promise<MentorNote>;

  sendMessage: (receiverId: string, content: string, extra?: { embeddedEventSlug?: string; embeddedEventTitle?: string }) => Promise<MentorMessage>;
  getMessagesWithUser: (otherUserId: string) => MentorMessage[];
  submitApplication: (appData: Omit<MentorApplication, 'id' | 'submittedAt' | 'status'>) => Promise<MentorApplication>;
  refreshMentorData: () => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

export const MentorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [version, setVersion] = useState(0);

  const refreshMentorData = () => {
    setVersion(v => v + 1);
  };

  const studentId = currentUser?.id || 'usr_student_dileep';
  const collegeIdOrName = currentUser?.institutionId || currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology';

  // Find if current user is an active mentor
  const activeMentorProfile = currentUser
    ? mentorDb.getAllMentors().find(m => m.username.toLowerCase() === currentUser.username.toLowerCase() || m.userId === currentUser.id) || null
    : null;

  const mentorId = activeMentorProfile?.id || '';

  const collegeMentors = mentorDb.getMentorsByCollege(collegeIdOrName);
  const assignedMentors = mentorDb.getAssignedMentorsForStudent(studentId);
  const myStudents = mentorId ? mentorDb.getAssignedStudentsForMentor(mentorId) : [];
  const mentorRequests = mentorId ? mentorDb.getRequestsForMentor(mentorId) : [];
  const studentSessions = mentorDb.getSessionsForStudent(studentId);
  const mentorSessions = mentorId ? mentorDb.getSessionsForMentor(mentorId) : [];
  const studentGoals = mentorDb.getGoalsForStudent(studentId);
  const studentActionItems = mentorDb.getActionItemsForStudent(studentId);
  const mentorActionItems = mentorId ? mentorDb.getActionItemsForMentor(mentorId) : [];
  const studentRecommendations = mentorDb.getRecommendationsForStudent(studentId);
  const mentorAnalytics = mentorId ? mentorDb.getMentorAnalytics(mentorId) : null;

  // Student Actions
  const requestMentor = async (payload: {
    mentorId: string;
    mentorName: string;
    reason: string;
    primaryGuidanceArea: MentorshipArea;
    currentGoal: string;
    helpNeededDescription: string;
    preferredCommunication: string;
    preferredDays: string[];
    preferredTime: string;
    optionalMessage?: string;
  }) => {
    const newReq = mentorDb.createMentorRequest({
      ...payload,
      studentId,
      studentUsername: currentUser?.username || 'dileepkumar',
      studentName: currentUser?.fullName || 'Dileep Kumar',
      studentAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      studentCollege: currentUser?.college || 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      studentDepartment: (currentUser?.roleProfileData as any)?.department || 'Computer Science and Engineering',
      studentYear: (currentUser?.roleProfileData as any)?.year || '4th Year'
    });
    refreshMentorData();
    return newReq;
  };

  const bookSession = async (payload: {
    mentorId: string;
    mentorName: string;
    mentorAvatar: string;
    date: string;
    time: string;
    durationMinutes: number;
    topic: string;
    mentorshipArea: MentorshipArea;
    mode: SessionMode;
    meetingUrl?: string;
  }) => {
    const sess = mentorDb.scheduleSession({
      ...payload,
      studentId,
      studentName: currentUser?.fullName || 'Dileep Kumar',
      studentAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      studentUsername: currentUser?.username || 'dileepkumar'
    });
    refreshMentorData();
    return sess;
  };

  const submitFeedback = async (sessionId: string, rating: number, comment?: string) => {
    const updated = mentorDb.submitSessionFeedback(sessionId, rating, comment);
    refreshMentorData();
    return updated;
  };

  const toggleActionItem = async (itemId: string, status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED', comment?: string) => {
    const updated = mentorDb.toggleActionItemStatus(itemId, status, comment);
    refreshMentorData();
    return updated;
  };

  // Mentor Actions
  const respondToRequest = async (requestId: string, accept: boolean, declineReason?: string) => {
    const updated = mentorDb.respondToMentorRequest(requestId, accept, declineReason);
    refreshMentorData();
    return updated;
  };

  const completeSession = async (sessionId: string, summary: string, actionItemTitles?: string[]) => {
    const updated = mentorDb.completeSession(sessionId, summary, actionItemTitles);
    refreshMentorData();
    return updated;
  };

  const createGoal = async (goal: {
    studentId: string;
    title: string;
    targetCategory: 'CAREER' | 'ACADEMIC' | 'TECHNICAL' | 'EVENT' | 'COMPETITION' | 'PROJECT';
    targetDate: string;
    progressPercentage: number;
    milestones: any[];
    mentorReviewNotes?: string;
    status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  }) => {
    const created = mentorDb.createGoal({
      ...goal,
      mentorId
    });
    refreshMentorData();
    return created;
  };

  const updateGoalProgress = async (goalId: string, progress: number, notes?: string) => {
    const updated = mentorDb.updateGoalProgress(goalId, progress, notes);
    refreshMentorData();
    return updated;
  };

  const createActionItem = async (item: {
    studentId: string;
    title: string;
    description: string;
    priority: ActionItemPriority;
    deadline: string;
    linkedResourceUrl?: string;
  }) => {
    const created = mentorDb.createActionItem({
      ...item,
      mentorId,
      mentorName: activeMentorProfile?.fullName || 'Faculty Mentor'
    });
    refreshMentorData();
    return created;
  };

  const recommendResource = async (rec: {
    studentId: string;
    type: RecommendationType;
    targetId: string;
    title: string;
    description: string;
    reason: string;
    categoryTag: string;
    actionUrl: string;
  }) => {
    const created = mentorDb.addRecommendation({
      ...rec,
      mentorId,
      mentorName: activeMentorProfile?.fullName || 'Faculty Mentor'
    });
    refreshMentorData();
    return created;
  };

  const createNote = async (note: {
    studentId: string;
    sessionDate: string;
    topic: string;
    discussionSummary: string;
    studentConcern?: string;
    mentorRecommendation: string;
    priority: ActionItemPriority;
    privacyLevel: 'PRIVATE_MENTOR_NOTE' | 'SHARED_WITH_STUDENT';
  }) => {
    const created = mentorDb.createNote({
      ...note,
      mentorId
    });
    refreshMentorData();
    return created;
  };

  const sendMessage = async (receiverId: string, content: string, extra?: { embeddedEventSlug?: string; embeddedEventTitle?: string }) => {
    const isMentorSender = !!activeMentorProfile;
    const created = mentorDb.sendMessage({
      conversationId: `conv_${currentUser?.id || 'usr'}_${receiverId}`,
      senderId: currentUser?.id || 'usr_student_dileep',
      senderName: currentUser?.fullName || 'Dileep Kumar',
      senderAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      senderRole: isMentorSender ? 'MENTOR' : 'STUDENT',
      receiverId,
      content,
      embeddedEventSlug: extra?.embeddedEventSlug,
      embeddedEventTitle: extra?.embeddedEventTitle
    });
    refreshMentorData();
    return created;
  };

  const getMessagesWithUser = (otherUserId: string) => {
    const currentId = currentUser?.id || 'usr_student_dileep';
    return mentorDb.getMessages(currentId, otherUserId);
  };

  const submitApplication = async (appData: Omit<MentorApplication, 'id' | 'submittedAt' | 'status'>) => {
    const app = mentorDb.submitMentorApplication(appData);
    refreshMentorData();
    return app;
  };

  return (
    <MentorContext.Provider
      value={{
        collegeMentors,
        assignedMentors,
        myStudents,
        mentorRequests,
        studentSessions,
        mentorSessions,
        studentGoals,
        studentActionItems,
        mentorActionItems,
        studentRecommendations,
        mentorAnalytics,
        activeMentorProfile,
        requestMentor,
        bookSession,
        submitFeedback,
        toggleActionItem,
        respondToRequest,
        completeSession,
        createGoal,
        updateGoalProgress,
        createActionItem,
        recommendResource,
        createNote,
        sendMessage,
        getMessagesWithUser,
        submitApplication,
        refreshMentorData
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
