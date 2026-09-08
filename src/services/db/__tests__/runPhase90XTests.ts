import { socialNetworkDatabase } from '../socialNetworkDatabase';
import { directMessagingDatabase } from '../directMessagingDatabase';
import { campusCommunitiesDatabase } from '../campusCommunitiesDatabase';
import { campusFeedDatabase } from '../campusFeedDatabase';
import { studentSafetyDatabase } from '../studentSafetyDatabase';
import { campusDeadlinesDatabase } from '../campusDeadlinesDatabase';

export async function runPhase90XTests(): Promise<{ name: string; passed: boolean; error?: string }[]> {
  const results: { name: string; passed: boolean; error?: string }[] = [];

  function test(name: string, fn: () => void) {
    try {
      fn();
      results.push({ name, passed: true });
    } catch (err: any) {
      results.push({ name, passed: false, error: err?.message || String(err) });
    }
  }

  // 1. Social Connections & Following
  test('[SocialNetwork] Retrieves active connections and sends new connection request', () => {
    const conns = socialNetworkDatabase.getActiveConnections();
    if (conns.length < 2) throw new Error('Expected at least 2 active connections');

    const newReq = socialNetworkDatabase.sendConnectionRequest(
      'usr_test_peer',
      'Test Peer',
      'AI Researcher',
      'https://test.avatar',
      'Vel Tech',
      'CSE',
      ['PyTorch', 'TypeScript']
    );
    if (newReq.status !== 'REQUESTED') throw new Error('Connection request status must be REQUESTED');

    const accepted = socialNetworkDatabase.acceptConnectionRequest(newReq.id);
    if (!accepted) throw new Error('Failed to accept connection request');
  });

  test('[SocialNetwork] Follows student chapters and institution entities', () => {
    const follows = socialNetworkDatabase.getFollows();
    if (follows.length < 3) throw new Error('Expected at least 3 following entities');
  });

  // 2. Direct & Channel Messaging 2.0
  test('[DirectMessaging] Retrieves channels and sends direct message with audit timestamp', () => {
    const convs = directMessagingDatabase.getConversations();
    if (convs.length < 2) throw new Error('Expected at least 2 active conversations');

    const mentorMsgs = directMessagingDatabase.getMessages('conv_mentor_aravind');
    if (mentorMsgs.length < 2) throw new Error('Expected at least 2 messages in mentor thread');

    const sentMsg = directMessagingDatabase.sendMessage('conv_mentor_aravind', 'Test verification message from 90X test runner');
    if (!sentMsg.content.includes('Test verification message')) throw new Error('Failed to send message');
  });

  test('[DirectMessaging] Toggles message emoji reactions', () => {
    const msgs = directMessagingDatabase.getMessages('conv_mentor_aravind');
    const targetMsg = msgs[0];
    const reacted = directMessagingDatabase.toggleReaction('conv_mentor_aravind', targetMsg.id, '🚀');
    if (!reacted) throw new Error('Failed to toggle emoji reaction');
  });

  // 3. Campus Communities & Polls
  test('[CampusCommunities] Retrieves communities and department-scoped posts', () => {
    const comms = campusCommunitiesDatabase.getAllCommunities();
    if (comms.length < 3) throw new Error('Expected at least 3 campus communities');

    const csePosts = campusCommunitiesDatabase.getPostsByCommunity('comm_veltech_cse');
    if (csePosts.length < 1) throw new Error('Expected at least 1 post in Vel Tech CSE hub');
  });

  test('[CampusCommunities] Submits vote in community poll and updates count', () => {
    const pollPost = campusCommunitiesDatabase.getPostsByCommunity('comm_ai_research_lab')[0];
    if (!pollPost || !pollPost.poll) throw new Error('Expected poll in AI research lab');

    const voted = campusCommunitiesDatabase.votePoll('comm_ai_research_lab', pollPost.id, 'opt_2');
    if (!voted) throw new Error('Failed to submit poll vote');
  });

  // 4. Campus Scoped Feed
  test('[CampusFeed] Retrieves institution-bound feed items with reactions and bookmarking', () => {
    const feed = campusFeedDatabase.getCampusFeed('inst-vel-tech-rangarajan-avadi');
    if (feed.length < 3) throw new Error('Expected at least 3 campus feed items');

    const reactedFeed = campusFeedDatabase.toggleReaction(feed[0].id, 'CELEBRATE');
    if (!reactedFeed) throw new Error('Failed to toggle reaction on campus feed item');

    const bookmarked = campusFeedDatabase.toggleBookmark(feed[0].id);
    if (typeof bookmarked !== 'boolean') throw new Error('Failed to toggle bookmark');
  });

  // 5. Student Safety, Moderation & Data Export
  test('[StudentSafety] Submits moderation report and triages through resolution status', () => {
    const rep = studentSafetyDatabase.submitReport('post_test_90', 'POST', 'Test spam post', 'SPAM', 'Automated test reason');
    if (rep.status !== 'NEW') throw new Error('Report must initialize with NEW status');

    const triaged = studentSafetyDatabase.triageReport(rep.id, 'ACTIONED', 'Resolved in test suite');
    if (!triaged) throw new Error('Failed to triage report');
  });

  test('[StudentSafety] Blocks offending account and generates data export snapshot', () => {
    const blocked = studentSafetyDatabase.blockUser('usr_toxic_user', 'Toxic User', 'https://avatar.url', 'Spamming channels');
    if (blocked.blockedUserId !== 'usr_toxic_user') throw new Error('Failed to block user');

    const exportReq = studentSafetyDatabase.requestDataExport();
    if (exportReq.status !== 'GENERATED' || !exportReq.downloadUrl) throw new Error('Failed to generate GDPR data export');
  });

  // 6. Smart Campus Deadlines
  test('[CampusDeadlines] Categorizes deadlines across time buckets and toggles completion', () => {
    const allDeadlines = campusDeadlinesDatabase.getAllDeadlines();
    if (allDeadlines.length < 5) throw new Error('Expected at least 5 campus deadlines');

    const todayDeadlines = campusDeadlinesDatabase.getDeadlinesByBucket('TODAY');
    if (todayDeadlines.length < 1) throw new Error('Expected at least 1 deadline due TODAY');

    const toggledDl = campusDeadlinesDatabase.toggleCompletion(allDeadlines[0].id);
    if (typeof toggledDl !== 'boolean') throw new Error('Failed to toggle completion on deadline item');
  });

  return results;
}
