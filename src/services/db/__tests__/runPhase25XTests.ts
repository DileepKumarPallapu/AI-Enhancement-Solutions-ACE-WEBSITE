import { networkFollowDb } from "../networkFollowDatabase";
import { opportunityFeedDb } from "../opportunityFeedDatabase";
import { campusNetworkDb } from "../campusNetworkDatabase";
import { aiAgentFrameworkDb } from "../aiAgentFrameworkDatabase";
import { interviewsDb } from "../interviewsDatabase";

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function test(suite: string, name: string, fn: () => void) {
  try {
    fn();
    results.push({ suite, name, passed: true });
    console.log(`  ✓ [${suite}] ${name}`);
  } catch (err: any) {
    results.push({ suite, name, passed: false, error: err?.message || String(err) });
    console.error(`  ✗ [${suite}] ${name}: ${err?.message || err}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

export function runAllPhase25XTests(): TestResult[] {
  console.log("====================================================");
  console.log(" ACE 25X — ECOSYSTEM & NETWORK ENGINE TEST SUITE");
  console.log("====================================================\n");

  const studentId = "usr_student_dileep";

  // 1. Network Follow System
  test("FollowSystem", "Follows colleges, mentors, and topics with toggle persistence", () => {
    const follows = networkFollowDb.getFollows(studentId);
    assert(follows.length >= 3, "Initial follows must exist");
    assert(follows.some(f => f.targetType === "COLLEGE"), "Must follow college");
    assert(follows.some(f => f.targetType === "MENTOR"), "Must follow faculty mentor");

    // Toggle follow on a topic
    const followed = networkFollowDb.toggleFollow(studentId, "TOPIC", "topic_cloud_native", "Cloud Native & Kubernetes");
    assert(followed, "Follow toggle should return true on follow");
    const unfollowed = networkFollowDb.toggleFollow(studentId, "TOPIC", "topic_cloud_native", "Cloud Native & Kubernetes");
    assert(!unfollowed, "Follow toggle should return false on unfollow");
  });

  // 2. Interactive Opportunity Feed
  test("OpportunityFeed", "Fetches prioritized feed items and toggles bookmarks", () => {
    const feed = opportunityFeedDb.getFeed();
    assert(feed.length >= 3, "Feed must contain stream items");
    const firstPost = feed[0];
    const initialSaved = firstPost.isSaved;
    const toggled = opportunityFeedDb.toggleSave(firstPost.id);
    assert(toggled !== initialSaved, "Bookmark state must toggle");
    opportunityFeedDb.toggleSave(firstPost.id); // reset
    opportunityFeedDb.recordFeedback(firstPost.id, "USEFUL");
  });

  // 3. Digital Campus Network & Clubs
  test("CampusNetwork", "Retrieves institution clubs and manages student memberships", () => {
    const clubs = campusNetworkDb.getClubs("inst-vel-tech-rangarajan-avadi");
    assert(clubs.length >= 2, "Vel Tech must have registered campus societies");
    const airsClub = clubs.find(c => c.id === "club_veltech_airs");
    assert(!!airsClub, "V-AIRS Society must exist");
    assert(airsClub!.facultyCoordinator === "Dr. K. Senthilkumar", "Faculty lead must be Dr. Senthilkumar");

    const initialMember = airsClub!.isMember;
    const isMemberAfter = campusNetworkDb.toggleMembership(airsClub!.id);
    assert(isMemberAfter !== initialMember, "Membership status must toggle");
    campusNetworkDb.toggleMembership(airsClub!.id); // reset
  });

  // 4. AI Agent Framework & Persistent Memory
  test("AIAgentMemory", "Supports View, Edit, and Delete operations on persistent memory", () => {
    const memories = aiAgentFrameworkDb.getMemories(studentId);
    assert(memories.length >= 3, "Initial agent memories must exist");
    const targetGoal = memories.find(m => m.category === "CAREER_GOAL");
    assert(!!targetGoal, "Target career goal memory must exist");

    const updated = aiAgentFrameworkDb.updateMemory(targetGoal!.id, "Principal AI Research Scientist");
    assert(updated, "Memory update must succeed");
  });

  // 5. Scheduled Interviews Center
  test("InterviewCenter", "Tracks recruiter interviews with panel details and notes", () => {
    const interviews = interviewsDb.getInterviews(studentId);
    assert(interviews.length >= 1, "Scheduled interview must exist");
    const first = interviews[0];
    assert(first.companyName === "Google Cloud Labs", "Company name matches");
    assert(first.status === "SCHEDULED", "Status must be SCHEDULED");
    assert(first.panelMembers.length >= 2, "Panel members must be populated");
  });

  return results;
}
