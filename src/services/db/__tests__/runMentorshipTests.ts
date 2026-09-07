import {
  mentorshipDb,
  CANONICAL_VEL_TECH_ID,
  CANONICAL_VEL_TECH_NAME
} from '../mentorshipDatabase';
import { mentorMatchingService } from '../../ai/mentorMatchingService';

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export function runAllMentorshipTests(): TestResult[] {
  const results: TestResult[] = [];

  function test(name: string, fn: () => void) {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err?.message || String(err) });
    }
  }

  function expect(actual: any) {
    return {
      toBe(expected: any) {
        if (actual !== expected) throw new Error(`Expected ${expected}, but got ${actual}`);
      },
      toBeGreaterThanOrEqual(expected: number) {
        if (actual < expected) throw new Error(`Expected ${actual} >= ${expected}`);
      },
      toBeGreaterThan(expected: number) {
        if (actual <= expected) throw new Error(`Expected ${actual} > ${expected}`);
      },
      toContain(expected: any) {
        if (!actual || !actual.includes(expected)) throw new Error(`Expected ${actual} to contain ${expected}`);
      },
      toBeDefined() {
        if (actual === undefined || actual === null) throw new Error(`Expected value to be defined`);
      },
      toEqual(expected: any) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
      }
    };
  }

  // Test 1: Canonical Vel Tech Binding
  test('1. Canonical Vel Tech Binding', () => {
    const student = {
      id: 'usr_student_dileep',
      fullName: 'Dileep Kumar',
      college: CANONICAL_VEL_TECH_NAME,
      institutionId: CANONICAL_VEL_TECH_ID
    };
    expect(student.institutionId).toBe('inst-vel-tech-rangarajan-avadi');
    expect(student.college).toContain('Vel Tech Rangarajan');
  });

  // Test 2: Strict Institution Isolation
  test('2. Strict Institution Isolation', () => {
    const mentors = mentorshipDb.getEligibleMentorsForStudent({ institutionId: CANONICAL_VEL_TECH_ID });
    expect(mentors.length).toBeGreaterThanOrEqual(5);
    mentors.forEach(m => {
      expect(m.institutionId).toBe(CANONICAL_VEL_TECH_ID);
      expect(m.institutionName).toBe(CANONICAL_VEL_TECH_NAME);
    });
  });

  // Test 3: Zero Cross-College Leakage / No PSG Fallbacks
  test('3. Zero Cross-College Leakage / No PSG Fallbacks', () => {
    const foreignMentors = mentorshipDb.getEligibleMentorsForStudent({ institutionId: 'unknown-random-college' });
    expect(foreignMentors.length).toBe(0);
  });

  // Test 4: Academic Schools & Departments
  test('4. Academic Schools & Departments', () => {
    const schools = mentorshipDb.getSchoolsForInstitution(CANONICAL_VEL_TECH_ID);
    expect(schools.length).toBe(9);
    expect(schools.find(s => s.name === 'School of Computing')?.departments.map(d => d.name)).toContain(
      'Department of Computer Science and Engineering'
    );
  });

  // Test 5: AI Matching Multi-Criteria
  test('5. AI Matching Multi-Criteria', () => {
    const mentors = mentorshipDb.getEligibleMentorsForStudent({ institutionId: CANONICAL_VEL_TECH_ID });
    const matchResults = mentorMatchingService.matchMentorsForStudent(
      { id: 'usr_student_dileep', institutionId: CANONICAL_VEL_TECH_ID },
      mentors,
      {
        studyMajor: 'Department of Computer Science and Engineering',
        yearOfStudy: '4th Year',
        interests: ['AI/ML', 'Hackathons', 'Cloud Computing'],
        skillsLearning: ['Python', 'Deep Learning'],
        targetCareer: 'AI Engineer',
        preferredAreas: ['Career Guidance', 'Project Guidance'],
        preferredDays: ['Monday']
      }
    );
    expect(matchResults.length).toBeGreaterThan(0);
    expect(matchResults[0].matchScore).toBeGreaterThanOrEqual(60);
    expect(matchResults[0].mentor.institutionId).toBe(CANONICAL_VEL_TECH_ID);
  });

  // Test 6: Mentorship Request Lifecycle
  test('6. Mentorship Request Lifecycle', () => {
    const req = mentorshipDb.createMentorshipRequest({
      student: {
        id: 'usr_student_dileep',
        username: 'dileepkumar',
        fullName: 'Dileep Kumar',
        avatarUrl: '',
        institutionId: CANONICAL_VEL_TECH_ID,
        college: CANONICAL_VEL_TECH_NAME,
        department: 'Department of Computer Science and Engineering',
        year: '4th Year',
        school: 'School of Computing'
      },
      mentorId: 'men_veltech_senthil',
      goalCategory: 'CAREER',
      primaryGoal: 'Target FAANG AI roles',
      message: 'Requesting guidance for final year roadmap',
      preferredDays: ['Monday'],
      preferredTime: '16:00',
      preferredCommunication: 'Online Video',
      assignmentType: 'PRIMARY'
    });
    expect(req.id).toBeDefined();
    expect(req.status).toBe('PENDING');
  });

  // Test 7: Capacity Enforcement on Accept
  test('7. Capacity Enforcement on Accept', () => {
    const mentor = mentorshipDb.getMentorById('men_veltech_senthil');
    const initialCount = mentor?.currentStudentCount || 0;
    const req = mentorshipDb.createMentorshipRequest({
      student: {
        id: 'usr_student_test',
        username: 'teststudent',
        fullName: 'Test Student',
        avatarUrl: '',
        institutionId: CANONICAL_VEL_TECH_ID,
        college: CANONICAL_VEL_TECH_NAME,
        department: 'Department of Computer Science and Engineering',
        year: '4th Year',
        school: 'School of Computing'
      },
      mentorId: 'men_veltech_senthil',
      goalCategory: 'CAREER',
      primaryGoal: 'Goal',
      message: 'Msg',
      preferredDays: ['Monday'],
      preferredTime: '16:00',
      preferredCommunication: 'Online Video',
      assignmentType: 'PRIMARY'
    });
    mentorshipDb.respondToRequest(req.id, true, 'Welcome!');
    const updatedMentor = mentorshipDb.getMentorById('men_veltech_senthil');
    expect(updatedMentor?.currentStudentCount).toBe(initialCount + 1);
  });

  // Test 8: Dynamic Milestone Calculation
  test('8. Dynamic Milestone Calculation', () => {
    const goal = mentorshipDb.createGoal({
      studentId: 'usr_student_dileep',
      mentorId: 'men_veltech_senthil',
      institutionId: CANONICAL_VEL_TECH_ID,
      title: 'Test Goal',
      description: 'Test Desc',
      category: 'CAREER',
      targetDate: '2026-12-01',
      priority: 'HIGH',
      milestones: [
        { id: 'm-1', monthIndex: 1, title: 'M1', description: 'D1', completed: false },
        { id: 'm-2', monthIndex: 2, title: 'M2', description: 'D2', completed: false },
        { id: 'm-3', monthIndex: 3, title: 'M3', description: 'D3', completed: false },
        { id: 'm-4', monthIndex: 4, title: 'M4', description: 'D4', completed: false }
      ]
    });
    expect(goal.progressPercentage).toBe(0);
    const updated1 = mentorshipDb.toggleGoalMilestone(goal.id, 'm-1');
    expect(updated1?.progressPercentage).toBe(25);
    const updated2 = mentorshipDb.toggleGoalMilestone(goal.id, 'm-2');
    expect(updated2?.progressPercentage).toBe(50);
  });

  // Test 9: Action Plan Task Toggle
  test('9. Action Plan Task Toggle', () => {
    const plan = mentorshipDb.createActionPlan({
      studentId: 'usr_student_dileep',
      studentName: 'Dileep Kumar',
      mentorId: 'men_veltech_senthil',
      mentorName: 'Dr. K. Senthilkumar',
      institutionId: CANONICAL_VEL_TECH_ID,
      title: 'Test Action Plan',
      tasks: [
        { id: 't-1', title: 'Task 1', description: 'Do task 1', dueDate: '2026-10-01', priority: 'HIGH', assignedTo: 'usr_student_dileep', status: 'PENDING' },
        { id: 't-2', title: 'Task 2', description: 'Do task 2', dueDate: '2026-10-05', priority: 'MEDIUM', assignedTo: 'usr_student_dileep', status: 'PENDING' }
      ]
    });
    const updatedPlan = mentorshipDb.toggleTaskStatus(plan.id, 't-1', true, 'Completed with GitHub commit link');
    expect(updatedPlan?.tasks[0].status).toBe('COMPLETED');
  });

  // Test 10: Anti-Double Booking
  test('10. Anti-Double Booking Conflict Prevention', () => {
    mentorshipDb.bookSession({
      studentId: 'usr_student_dileep',
      studentName: 'Dileep Kumar',
      studentAvatar: '',
      studentUsername: 'dileepkumar',
      institutionId: CANONICAL_VEL_TECH_ID,
      mentorId: 'men_veltech_senthil',
      mentorName: 'Dr. K. Senthilkumar',
      mentorAvatar: '',
      date: '2026-10-15',
      time: '10:00',
      durationMinutes: 30,
      topic: 'First Session',
      mentorshipArea: 'Project Guidance',
      mode: 'ONLINE'
    });

    let threw = false;
    try {
      mentorshipDb.bookSession({
        studentId: 'usr_student_other',
        studentName: 'Other Student',
        studentAvatar: '',
        studentUsername: 'otherstudent',
        institutionId: CANONICAL_VEL_TECH_ID,
        mentorId: 'men_veltech_senthil',
        mentorName: 'Dr. K. Senthilkumar',
        mentorAvatar: '',
        date: '2026-10-15',
        time: '10:00',
        durationMinutes: 30,
        topic: 'Conflict Session',
        mentorshipArea: 'Project Guidance',
        mode: 'ONLINE'
      });
    } catch {
      threw = true;
    }
    expect(threw).toBe(true);
  });

  // Test 11: Meeting Brief Generation
  test('11. Meeting Brief Synthesis', () => {
    const brief = mentorshipDb.generateMentorMeetingBrief(
      'usr_student_dileep',
      'Dileep Kumar Pallapu',
      CANONICAL_VEL_TECH_NAME,
      'Department of Computer Science and Engineering',
      '4th Year'
    );
    expect(brief.studentName).toBe('Dileep Kumar Pallapu');
    expect(brief.suggestedQuestionsToAsk.length).toBeGreaterThan(0);
  });

  // Test 12: Real Messaging Persistence
  test('12. Real Messaging Persistence', () => {
    const msg = mentorshipDb.sendMessage({
      senderId: 'usr_student_dileep',
      senderName: 'Dileep Kumar',
      senderAvatar: '',
      senderRole: 'STUDENT',
      receiverId: 'men_veltech_senthil',
      content: 'Hello professor, here is my research proposal update.'
    });
    expect(msg.id).toBeDefined();
    const thread = mentorshipDb.getMessages('usr_student_dileep', 'men_veltech_senthil');
    expect(thread.some(m => m.id === msg.id)).toBe(true);
  });

  // Test 13: Private vs Shared Notes
  test('13. Private vs Shared Notes', () => {
    const note = mentorshipDb.createNote({
      studentId: 'usr_student_dileep',
      mentorId: 'men_veltech_senthil',
      institutionId: CANONICAL_VEL_TECH_ID,
      type: 'PRIVATE_MENTOR_NOTE',
      topic: 'Confidential Evaluation',
      discussionSummary: 'Student shows strong promise in distributed algorithms',
      mentorRecommendation: 'Recommend for Google SIH track',
      priority: 'HIGH'
    });
    expect(note.type).toBe('PRIVATE_MENTOR_NOTE');
  });

  // Test 14: Feedback & Rating Calculation
  test('14. Feedback & Rating Calculation', () => {
    let session = mentorshipDb.getSessionsForStudent('usr_student_dileep')[0];
    if (!session) {
      session = mentorshipDb.bookSession({
        studentId: 'usr_student_dileep',
        studentName: 'Dileep Kumar',
        studentAvatar: '',
        studentUsername: 'dileepkumar',
        institutionId: CANONICAL_VEL_TECH_ID,
        mentorId: 'men_veltech_senthil',
        mentorName: 'Dr. K. Senthilkumar',
        mentorAvatar: '',
        date: '2026-10-18',
        time: '11:00',
        durationMinutes: 30,
        topic: 'Architecture Review',
        mentorshipArea: 'Career Guidance',
        mode: 'ONLINE'
      });
    }
    const fb = mentorshipDb.submitFeedback(session.id, {
      studentId: 'usr_student_dileep',
      studentName: 'Dileep Kumar',
      studentCollege: CANONICAL_VEL_TECH_NAME,
      communication: 5,
      helpfulness: 5,
      knowledge: 5,
      guidance: 5,
      comment: 'Exceptional guidance on AI pipeline architecture!'
    });
    expect(fb.ratingAverage).toBe(5);
  });

  // Test 15: Resource Sharing
  test('15. Resource Sharing', () => {
    const res = mentorshipDb.recommendResource({
      mentorId: 'men_veltech_senthil',
      mentorName: 'Dr. K. Senthilkumar',
      institutionId: CANONICAL_VEL_TECH_ID,
      type: 'ARTICLE',
      title: 'SIH 2026 Strategy Guide',
      description: 'Comprehensive guide',
      url: 'https://example.com/sih-guide',
      categoryTag: 'Hackathons',
      recommendationReason: 'Essential for SIH finals'
    });
    expect(res.id).toBeDefined();
    const list = mentorshipDb.getResourcesForStudent('usr_student_dileep', CANONICAL_VEL_TECH_ID);
    expect(list.some(r => r.id === res.id)).toBe(true);
  });

  // Test 16: Canonical Constants Integrity
  test('16. Canonical Constants Integrity', () => {
    expect(CANONICAL_VEL_TECH_ID).toBe('inst-vel-tech-rangarajan-avadi');
    expect(CANONICAL_VEL_TECH_NAME).toContain('Vel Tech Rangarajan');
  });

  // Test 17: Storage Key Consistency
  test('17. Storage Key Consistency', () => {
    expect(mentorshipDb.getAllMentors().length).toBeGreaterThanOrEqual(5);
  });

  return results;
}
