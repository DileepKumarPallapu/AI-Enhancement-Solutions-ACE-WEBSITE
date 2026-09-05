import { Competition } from '../types/competition';

export const COMPETITIONS_DATA: Competition[] = [
  {
    id: 'comp-python-2026',
    slug: 'ace-python-coding-championship-2026',
    title: 'ACE National Python Championship 2026',
    organizer: 'Department of Computer Science & Engineering',
    college: 'Hindustan Institute of Technology, Coimbatore',
    mode: 'ONLINE',
    category: 'Coding',
    difficulty: 'Intermediate',
    startDate: 'Sep 10, 2026',
    endDate: 'Sep 10, 2026',
    registrationDeadline: 'Sep 09, 2026',
    participantsCount: 480,
    status: 'REGISTRATION_OPEN',
    durationMinutes: 60,
    isTeamAllowed: false,
    maxTeamSize: 1,
    description: 'Premier national competitive programming challenge testing algorithm optimization, recursion, and string manipulation under strict timer constraints.',
    rules: [
      'Paste is strictly disabled inside the code editor to ensure fair play.',
      'All code submissions execute within an isolated sandboxed judge.',
      'Server-side countdown timer will automatically lock submissions at round completion.',
      'Top 3 verified winners earn direct ACE Coin prizes credited to their student wallets.'
    ],
    prizes: [
      { position: 1, title: '1st Place Champion', coins: 5000, cashEquivalent: '₹50.00 value', additionalReward: 'Gold Medal Certificate' },
      { position: 2, title: '2nd Place Runner-Up', coins: 2000, cashEquivalent: '₹20.00 value', additionalReward: 'Silver Medal Certificate' },
      { position: 3, title: '3rd Place Finalist', coins: 1000, cashEquivalent: '₹10.00 value', additionalReward: 'Bronze Medal Certificate' }
    ],
    problems: [
      {
        id: 'prob-1',
        title: 'Two Sum Target Pairs',
        difficulty: 'Easy',
        points: 100,
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        inputFormat: 'Array of integers nums and integer target',
        outputFormat: 'Indices array [i, j]',
        constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
        sampleInput: '[2, 7, 11, 15], target = 9',
        sampleOutput: '[0, 1]',
        starterCode: `function solution(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        testCases: [
          { input: JSON.stringify([[2, 7, 11, 15], 9]), expectedOutput: '[0,1]' },
          { input: JSON.stringify([[3, 2, 4], 6]), expectedOutput: '[1,2]' },
          { input: JSON.stringify([[3, 3], 6]), expectedOutput: '[0,1]' }
        ],
        explanation: 'Using a Hash Map gives optimal O(N) linear time complexity.'
      },
      {
        id: 'prob-2',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        points: 200,
        description: 'Given a string s, find the length of the longest substring without repeating characters.',
        inputFormat: 'String s',
        outputFormat: 'Integer representing max substring length',
        constraints: ['0 <= s.length <= 5 * 10^4'],
        sampleInput: '"abcabcbb"',
        sampleOutput: '3',
        starterCode: `function solution(s) {
  let set = new Set();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
        testCases: [
          { input: JSON.stringify('abcabcbb'), expectedOutput: '3' },
          { input: JSON.stringify('bbbbb'), expectedOutput: '1' },
          { input: JSON.stringify('pwwkew'), expectedOutput: '3' }
        ],
        explanation: 'Sliding window technique achieves O(N) time with O(min(m, n)) space.'
      }
    ]
  },
  {
    id: 'comp-sql-2026',
    slug: 'all-india-sql-database-sprint-2026',
    title: 'All-India SQL Database Sprint 2026',
    organizer: 'School of Information Technology',
    college: 'PSG College of Technology, Coimbatore',
    mode: 'ONLINE',
    category: 'Data',
    difficulty: 'Intermediate',
    startDate: 'Sep 15, 2026',
    endDate: 'Sep 15, 2026',
    registrationDeadline: 'Sep 14, 2026',
    participantsCount: 320,
    status: 'REGISTRATION_OPEN',
    durationMinutes: 45,
    isTeamAllowed: false,
    maxTeamSize: 1,
    description: 'High-speed relational query writing challenge involving complex joins, subqueries, group aggregations, and window functions.',
    rules: [
      'Standard ANSI SQL syntax evaluated against live test schemas.',
      'Execution time is measured for tie-breaking.',
      'Top 3 performers earn 5,000, 2,000, and 1,000 ACE Coins.'
    ],
    prizes: [
      { position: 1, title: '1st Place Database Master', coins: 5000, cashEquivalent: '₹50.00 value' },
      { position: 2, title: '2nd Place Runner-Up', coins: 2000, cashEquivalent: '₹20.00 value' },
      { position: 3, title: '3rd Place Finalist', coins: 1000, cashEquivalent: '₹10.00 value' }
    ],
    problems: []
  },
  {
    id: 'comp-hack-2026',
    slug: 'hackverse-national-hackathon-2026',
    title: 'HACKVERSE 2.0 National Hackathon',
    organizer: 'ACE Student Chapter',
    college: 'Anna University, Chennai',
    mode: 'HYBRID',
    category: 'Hackathon',
    difficulty: 'Advanced',
    startDate: 'Oct 02, 2026',
    endDate: 'Oct 04, 2026',
    registrationDeadline: 'Sep 28, 2026',
    participantsCount: 650,
    status: 'REGISTRATION_OPEN',
    durationMinutes: 2880,
    isTeamAllowed: true,
    maxTeamSize: 4,
    description: '48-hour build sprint addressing AI for Education, Web3 Decentralized Identity, and Smart Campus Solutions with prize pools exceeding ₹1,50,000 + 50,000 Coins.',
    rules: [
      'Teams of 2-4 students permitted from any recognized college.',
      'Code must be committed to GitHub repositories created during the hackathon.',
      'Working prototype presentation mandatory for final round evaluation.'
    ],
    prizes: [
      { position: 1, title: 'Grand Hackathon Winner', coins: 10000, cashEquivalent: '₹100.00 + ₹50,000 Cash' },
      { position: 2, title: 'First Runner-Up', coins: 5000, cashEquivalent: '₹50.00 + ₹25,000 Cash' },
      { position: 3, title: 'Second Runner-Up', coins: 2500, cashEquivalent: '₹25.00 + ₹10,000 Cash' }
    ],
    problems: []
  }
];
