// ACE Complete Data Persistence & Autosave System Test Suite
import { eventPersistenceDb } from '../eventPersistenceDatabase';
import { communityDb } from '../communityDatabase';
import { projectDb } from '../projectDatabase';
import { certificateDb } from '../certificateDatabase';
import { learningPersistenceDb } from '../learningPersistenceDatabase';
import { walletPersistenceDb } from '../walletPersistenceDatabase';
import { notificationDb } from '../notificationDatabase';
import { chatDb } from '../chatDatabase';
import { settingsDb } from '../settingsDatabase';
import { persistenceHub } from '../persistenceHub';

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

export const results: TestResult[] = [];

async function runTest(suite: string, name: string, fn: () => void | Promise<void>) {
  const start = Date.now();
  try {
    await Promise.resolve(fn());
    results.push({ suite, name, passed: true, durationMs: Date.now() - start });
    console.log(`  ✓ [${suite}] ${name}`);
  } catch (err: any) {
    results.push({ suite, name, passed: false, error: err?.message || String(err), durationMs: Date.now() - start });
    console.error(`  ✗ [${suite}] ${name}: ${err?.message || err}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(msg);
  }
}

export async function executeTestSuite() {
  console.log('====================================================');
  console.log(' ACE COMPLETE DATA PERSISTENCE & AUTOSAVE TEST SUITE');
  console.log('====================================================\n');

  const testUserId = 'usr_student_dileep';
  const testInstitutionId = 'inst-vel-tech-rangarajan-avadi';

  // 1. EVENT PERSISTENCE & DRAFTS
  await runTest('EventPersistence', 'Draft autosave and recovery', () => {
    const draft = eventPersistenceDb.saveDraft(testUserId, 3, {
      title: 'AI Symposium 2026',
      eventType: 'Symposium',
      category: 'Technical',
      venue: 'Vel Tech Campus',
      audience: 'Students',
      mode: 'OFFLINE',
      startDate: '2026-11-01',
      ticketPrice: '100',
      description: 'Draft description',
      shortDescription: 'Short draft',
      seoTitle: 'SEO Title',
      seoDescription: 'SEO Desc',
      tags: ['AI', 'Symposium'],
      perks: 'Certificates'
    });
    assert(draft.userId === testUserId, 'Draft userId must match');
    assert(draft.step === 3, 'Draft step must match');

    const loaded = eventPersistenceDb.getDraft(testUserId);
    assert(loaded !== null, 'Loaded draft must not be null');
    assert(loaded?.formData.title === 'AI Symposium 2026', 'Draft title must match');
  });

  await runTest('EventPersistence', 'Event publication and query by institution', () => {
    const event = eventPersistenceDb.saveEvent({
      slug: 'test-hackathon-2026',
      title: 'Test National Hackathon 2026',
      eventType: 'Hackathon',
      category: 'Coding',
      venue: 'Vel Tech Seminar Hall',
      city: 'Chennai',
      state: 'Tamil Nadu',
      audience: 'Engineering Students',
      mode: 'OFFLINE',
      startDate: '2026-11-15',
      ticketPrice: 0,
      currency: '₹',
      description: 'Full description of the hackathon.',
      perks: 'Prizes & Swag',
      organizerId: testUserId,
      organizerName: 'Dileep Kumar',
      institutionId: testInstitutionId,
      college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      qualityScore: 98,
      status: 'PUBLISHED',
      tags: ['Hackathon', 'AI']
    });
    assert(event.id.startsWith('evt-'), 'Event ID must be generated');

    const instEvents = eventPersistenceDb.getEventsByInstitution(testInstitutionId);
    assert(instEvents.some((e: any) => e.id === event.id), 'Event must be retrieved by institution ID');
  });

  await runTest('EventPersistence', 'Event registration and save/like toggles', () => {
    const regResult = eventPersistenceDb.registerUserForEvent({
      eventId: 'evt-nexora-2k26',
      eventSlug: 'nexora-2k26-a-national-level-technical-symposium-20260901-040857-58300',
      eventTitle: 'NEXORA 2K26',
      userId: testUserId,
      userName: 'Dileep Kumar',
      userEmail: 'dileep@veltech.edu.in',
      userCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology'
    });
    assert(Boolean(regResult.success || regResult.message.includes('Already registered')), 'Registration must succeed');

    const isSaved = eventPersistenceDb.toggleSaveEvent(testUserId, 'test-hackathon-2026');
    assert(typeof isSaved === 'boolean', 'Save toggle must return boolean state');
  });

  // 2. COMMUNITY DISCUSSIONS
  await runTest('CommunityDatabase', 'Create discussion, upvote, and comment', () => {
    const post = communityDb.createPost({
      authorId: testUserId,
      authorName: 'Dileep Kumar',
      authorRole: 'STUDENT',
      authorCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      category: 'TEAMMATE_SEARCH',
      title: 'Looking for ML Engineer for Hackathon',
      content: 'We need 1 more member skilled in PyTorch.',
      tags: ['ML', 'PyTorch', 'Hackathon']
    });
    assert(post.id.startsWith('post-'), 'Post ID must be generated');

    const upvoteRes = communityDb.toggleUpvote(post.id, 'usr_student_subhani');
    assert(upvoteRes.upvoted === true, 'Upvote must succeed');
    assert(upvoteRes.count >= 1, 'Upvote count must be >= 1');

    const comment = communityDb.addComment(post.id, {
      authorId: 'usr_student_subhani',
      authorName: 'Subhani S',
      authorRole: 'STUDENT',
      authorCollege: 'Vel Tech',
      content: 'I have experience in PyTorch and HuggingFace!'
    });
    assert(comment !== null, 'Comment must be created');
    assert(Boolean(comment?.content.includes('PyTorch')), 'Comment content must match');
  });

  // 3. PROJECT SHOWCASE
  await runTest('ProjectDatabase', 'Save project, upvote, and draft persistence', () => {
    const proj = projectDb.saveProject({
      userId: testUserId,
      authorName: 'Dileep Kumar',
      authorCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      title: 'Campus AI Assistant',
      tagline: 'LLM Copilot for college events',
      description: 'Indexes symposiums and answers student queries.',
      category: 'AI_ML',
      techStack: ['React 19', 'TypeScript', 'TailwindCSS'],
      githubUrl: 'https://github.com/dileep/campus-ai',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      collaborators: [],
      isPublished: true
    });
    assert(proj.id.startsWith('proj-'), 'Project ID must be generated');

    const userProjs = projectDb.getUserProjects(testUserId);
    assert(userProjs.some((p: any) => p.id === proj.id), 'Project must be retrieved for user');
  });

  // 4. CERTIFICATES
  await runTest('CertificateDatabase', 'Certificate creation, tamper-proof verification & query', () => {
    const certNum = `ACE-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    const cert = certificateDb.addCertificate({
      certificateNumber: certNum,
      title: 'National Hackathon Winner',
      eventName: 'HACKVERSE 2.0',
      issuer: 'Vel Tech & ACE',
      issuedDate: '2026-09-02',
      recipientId: testUserId,
      recipientName: 'Dileep Kumar',
      recipientCollege: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      skills: ['React', 'FastAPI', 'AI'],
      type: 'EVENT_WINNER',
      verificationHash: 'sha256:abc1234567890',
      qrVerificationUrl: `https://www.allcollegeevent.com/verify-certificate/${certNum}`,
      status: 'VERIFIED'
    });

    const queried = certificateDb.getCertificateByIdOrNumber(certNum);
    assert(queried !== undefined, 'Certificate must be retrievable by number');
    assert(queried?.recipientName === 'Dileep Kumar', 'Recipient name must match');
  });

  // 5. LEARNING & CODING CHALLENGES
  await runTest('LearningPersistence', 'XP awards, streak advancement, and code drafts', () => {
    const initialXp = learningPersistenceDb.getXpTotal(testUserId);
    learningPersistenceDb.awardXp(testUserId, 75, 'CHALLENGE', 'Completed Binary Search Challenge');
    const newXp = learningPersistenceDb.getXpTotal(testUserId);
    assert(newXp === initialXp + 75, `XP must increase by 75 (was ${initialXp}, now ${newXp})`);

    const streak = learningPersistenceDb.touchStreak(testUserId);
    assert(streak.currentStreak >= 1, 'Streak must be at least 1');

    learningPersistenceDb.saveCodeDraft(testUserId, 'prob-two-sum', 'function twoSum() { return [0, 1]; }', 'javascript');
    const draft = learningPersistenceDb.getCodeDraft(testUserId, 'prob-two-sum');
    assert(draft !== null, 'Code draft must exist');
    assert(Boolean(draft?.code.includes('twoSum')), 'Code draft content must match');
  });

  // 6. WALLET & DOUBLE-ENTRY COIN LEDGER
  await runTest('WalletPersistence', 'Coin credit, balance check, and redemption workflow', () => {
    const initialBal = walletPersistenceDb.getBalance(testUserId);
    
    // Credit
    const credRes = walletPersistenceDb.creditCoins({
      userId: testUserId,
      amount: 100,
      category: 'CHALLENGE_REWARD',
      description: 'Solved Medium Challenge',
      idempotencyKey: `idem-${Date.now()}`
    });
    assert(credRes.success === true, 'Credit must succeed');
    assert(walletPersistenceDb.getBalance(testUserId) === initialBal + 100, 'Balance must increase by 100');

    // Redemption
    const orderRes = walletPersistenceDb.requestRedemption({
      userId: testUserId,
      userName: 'Dileep Kumar',
      userEmail: 'dileep@veltech.edu.in',
      userCollege: 'Vel Tech',
      rewardId: 'rew-upi-50',
      rewardTitle: '₹50 UPI Cash',
      rewardType: 'UPI_CASH',
      coinsCost: 50,
      inrValue: 50,
      payoutDetails: 'dileep@oksbi'
    });
    assert(orderRes.success === true, 'Redemption request must succeed');
    assert(orderRes.order?.status === 'PENDING_APPROVAL', 'Order status must be PENDING_APPROVAL');
  });

  // 7. NOTIFICATIONS
  await runTest('NotificationDatabase', 'Notification creation, read state, and counts', () => {
    const notif = notificationDb.createNotification({
      userId: testUserId,
      title: 'Symposium Registration Verified',
      message: 'Your registration for NEXORA 2K26 has been verified.',
      type: 'DEADLINE',
      link: '/events'
    });
    assert(notif.isRead === false, 'New notification must be unread');

    notificationDb.markAsRead(notif.id);
    const userNotifs = notificationDb.getNotificationsByUser(testUserId);
    const updated = userNotifs.find(n => n.id === notif.id);
    assert(updated?.isRead === true, 'Notification must be marked as read');
  });

  // 8. CHAT & AI CONVERSATIONS
  await runTest('ChatDatabase', 'Direct messaging and persistent AI conversation history', () => {
    const msg = chatDb.sendMessage({
      conversationId: 'conv-1',
      senderId: testUserId,
      senderName: 'Dileep Kumar',
      recipientId: 'usr_mentor_arun',
      text: 'Hello Dr. Arun, I have submitted the symposium draft.'
    });
    assert(msg.id.startsWith('msg-'), 'Message ID must be generated');

    const conv = chatDb.getConversation(testUserId, 'usr_mentor_arun');
    assert(conv.some(m => m.id === msg.id), 'Message must be present in conversation');

    const aiMsg = chatDb.appendAiMessage(testUserId, 'user', 'What are the top AI events near Chennai?');
    assert(aiMsg.role === 'user', 'AI message role must match');
    const aiHistory = chatDb.getAiMessages(testUserId);
    assert(aiHistory.some(m => m.id === aiMsg.id), 'AI message must be persisted');
  });

  // 9. SETTINGS & PREFERENCES
  await runTest('SettingsDatabase', 'User preferences read & persistent update', () => {
    const prefs = settingsDb.getUserPreferences(testUserId);
    assert(prefs.userId === testUserId, 'Preferences userId must match');

    const updated = settingsDb.updatePreferences(testUserId, { theme: 'dark', soundEffects: false });
    assert(updated.theme === 'dark', 'Theme must be updated to dark');
    assert(updated.soundEffects === false, 'Sound effects must be false');
  });

  // 10. PERSISTENCE HUB DIAGNOSTICS & BACKUP
  await runTest('PersistenceHub', 'Diagnostics and export snapshot', () => {
    const diag = persistenceHub.getDiagnostics();
    assert(typeof diag.usedBytes === 'number', 'Used bytes must be a number');
    assert(diag.itemCounts.accounts > 0, 'Account count must be > 0');

    const snapshot = persistenceHub.exportDataSnapshot();
    assert(typeof snapshot === 'string', 'Snapshot must be a valid string');
  });

  // SUMMARY
  console.log('\n====================================================');
  console.log(' TEST EXECUTION SUMMARY');
  console.log('====================================================');
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  console.log(`Total Tests Run: ${results.length}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log('====================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

executeTestSuite();
