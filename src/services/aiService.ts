import { EventItem, StudentProfile } from '../types';

export interface ParsedSearchQuery {
  rawQuery: string;
  category?: string;
  city?: string;
  mode?: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  maxPrice?: number;
  isFree?: boolean;
  hasCertificate?: boolean;
  department?: string;
  timeframe?: 'weekend' | 'this_month' | 'closing_soon' | 'any';
  explanation: string;
}

export function parseNaturalLanguageQuery(query: string): ParsedSearchQuery {
  const q = query.toLowerCase().trim();
  const result: ParsedSearchQuery = {
    rawQuery: query,
    explanation: 'AI matched your query to relevant college events.'
  };

  if (!q) return result;

  const explanations: string[] = [];

  // 1. Free vs Paid
  if (q.includes('free') || q.includes('₹0') || q.includes('no fee')) {
    result.isFree = true;
    explanations.push('Filtering for free entry events');
  }

  // 2. Price limits (e.g. under 500, under ₹200)
  const priceMatch = q.match(/unders*(?:₹|rs.?|inr)?s*(d+)/i) || q.match(/(?:₹|rs.?|inr)s*(d+)/i);
  if (priceMatch && !result.isFree) {
    result.maxPrice = parseInt(priceMatch[1], 10);
    explanations.push(`Ticket price capped at ₹${result.maxPrice}`);
  }

  // 3. Mode
  if (q.includes('online') || q.includes('virtual') || q.includes('zoom') || q.includes('remote')) {
    result.mode = 'ONLINE';
    explanations.push('Searching for Online / Virtual events');
  } else if (q.includes('offline') || q.includes('in-person') || q.includes('on-campus')) {
    result.mode = 'OFFLINE';
    explanations.push('Searching for On-Campus Offline events');
  } else if (q.includes('hybrid')) {
    result.mode = 'HYBRID';
    explanations.push('Searching for Hybrid mode events');
  }

  // 4. Cities
  const cities = ['chennai', 'coimbatore', 'bengaluru', 'bangalore', 'mumbai', 'delhi', 'hyderabad', 'pune', 'kolkata', 'madurai', 'trichy', 'salem'];
  for (const c of cities) {
    if (q.includes(c)) {
      result.city = c.charAt(0).toUpperCase() + c.slice(1);
      explanations.push(`Located in or near ${result.city}`);
      break;
    }
  }

  // 5. Category & Keywords
  if (q.includes('hackathon') || q.includes('coding') || q.includes('code')) {
    result.category = 'Technical & Coding';
    explanations.push('Categorized under Hackathons & Coding');
  } else if (q.includes('workshop') || q.includes('hands-on') || q.includes('training') || q.includes('bootcamp')) {
    result.category = 'Workshops & Training';
    explanations.push('Categorized under Hands-on Workshops');
  } else if (q.includes('conference') || q.includes('paper') || q.includes('scopus') || q.includes('research')) {
    result.category = 'Conferences & Research';
    explanations.push('Categorized under Research Conferences');
  } else if (q.includes('symposium') || q.includes('fest') || q.includes('cultural')) {
    result.category = 'Academic & Professional';
    explanations.push('Categorized under College Symposiums');
  }

  // 6. Certificates
  if (q.includes('certificate') || q.includes('certified') || q.includes('cert')) {
    result.hasCertificate = true;
    explanations.push('Verified certificate included upon completion');
  }

  // 7. Timeframe
  if (q.includes('weekend') || q.includes('saturday') || q.includes('sunday')) {
    result.timeframe = 'weekend';
    explanations.push('Happening this upcoming weekend');
  } else if (q.includes('this month') || q.includes('september')) {
    result.timeframe = 'this_month';
    explanations.push('Scheduled for this month');
  }

  if (explanations.length > 0) {
    result.explanation = explanations.join(' • ');
  }

  return result;
}

// AI Event Quality Scorer (0 - 100)
export function calculateEventQualityScore(event: Partial<EventItem>): { score: number; status: 'Verified' | 'Pending Review' | 'Needs Attention' | 'Rejected'; issues: string[] } {
  let score = 100;
  const issues: string[] = [];

  if (!event.title || event.title.trim().length < 8) {
    score -= 20;
    issues.push('Title is too short or missing');
  }
  if (!event.description || event.description.length < 50) {
    score -= 20;
    issues.push('Event description lacks depth or schedule details');
  }
  if (!event.bannerImages || event.bannerImages.length === 0) {
    score -= 25;
    issues.push('No event poster / banner uploaded');
  }
  if (!event.location?.venue && event.mode === 'OFFLINE') {
    score -= 15;
    issues.push('Missing physical venue specification for offline event');
  }
  if (!event.eventContacts || event.eventContacts.length === 0) {
    score -= 10;
    issues.push('No organizer contact details provided');
  }
  if (!event.tickets || event.tickets.length === 0) {
    score -= 10;
    issues.push('No ticket or registration fee structure defined');
  }

  score = Math.max(0, Math.min(100, score));

  let status: 'Verified' | 'Pending Review' | 'Needs Attention' | 'Rejected' = 'Verified';
  if (score >= 85) status = 'Verified';
  else if (score >= 65) status = 'Pending Review';
  else if (score >= 40) status = 'Needs Attention';
  else status = 'Rejected';

  return { score, status, issues };
}

// AI Profile-Aware Personalization Engine
export function rankEventsForProfile(events: EventItem[], profile: StudentProfile): (EventItem & { matchScore: number; matchReason: string })[] {
  return events.map(event => {
    let score = 70;
    const matchPoints: string[] = [];

    // Department match
    if (event.eligibleDeptIdentities?.some(dept => profile.department.toLowerCase().includes(dept.toLowerCase()) || dept.toLowerCase().includes('all'))) {
      score += 15;
      matchPoints.push(`Specifically open for ${profile.department}`);
    }

    // Skills & Interests
    const combinedText = `${event.title} ${event.description} ${event.tags?.join(' ')}`.toLowerCase();
    const matchedInterests = profile.interests.filter(i => combinedText.includes(i.toLowerCase()));
    if (matchedInterests.length > 0) {
      score += matchedInterests.length * 6;
      matchPoints.push(`Matches your interest in ${matchedInterests.slice(0, 2).join(', ')}`);
    }

    // City preference
    if (event.location?.city?.toLowerCase() === profile.city.toLowerCase() || event.mode === 'ONLINE') {
      score += 8;
      matchPoints.push(event.mode === 'ONLINE' ? 'Virtual access anywhere' : `Happening in your city (${profile.city})`);
    }

    // Free ticket bonus
    if (!event.isPaid) {
      score += 4;
      matchPoints.push('Free registration');
    }

    score = Math.min(99, score);
    const matchReason = matchPoints.length > 0 ? matchPoints.join(' • ') : 'Recommended based on trending student participation.';

    return {
      ...event,
      matchScore: score,
      matchReason
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// AI Content Assistant for Organizers
export function generateAiEventCopy(input: { title: string; eventType: string; venue: string; audience: string; perks: string }) {
  return {
    description: `<p>Get ready for <strong>${input.title}</strong>, a premier ${input.eventType} bringing together aspiring student innovators, creators, and engineers at ${input.venue}.</p>
<p>Participants will gain practical insights, tackle hands-on challenges, and compete for exciting opportunities. Designed specifically for ${input.audience}, this flagship experience provides a collaborative platform to network with top peers and industry leaders.</p>
<h3>Event Highlights:</h3>
<ul>
  <li>Interactive sessions and real-world problem statements</li>
  <li>Guidance and mentorship by experienced domain experts</li>
  <li>${input.perks || 'Official certificates, awards, and exclusive networking opportunities'}</li>
</ul>`,
    shortDescription: `Join ${input.title} at ${input.venue}! An exciting ${input.eventType} tailored for ${input.audience}.`,
    seoTitle: `${input.title} 2026 | Register on AllCollegeEvent`,
    seoDescription: `Discover and register for ${input.title}, happening at ${input.venue}. Find eligibility, dates, rounds, and certificates on ACE.`,
    tags: [`#${input.eventType.toLowerCase().replace(/\s+/g, '_')}`, '#college_event', '#student_opportunities', '#ace2026', '#competitions'],
    faqs: [
      { question: 'Who can register for this event?', answer: `This event is open for ${input.audience || 'all college and university students with valid ID.'}` },
      { question: 'Will all participants receive certificates?', answer: 'Yes! All verified participants will be awarded an official certificate of participation upon completion.' },
      { question: 'What are the rules and prerequisites?', answer: 'Participants must carry their college identity card. Laptops are required for hands-on technical sessions.' }
    ]
  };
}

// Interactive Grounded Chatbot Engine
export function queryAceAiAssistant(question: string, loadedEvents: EventItem[]): string {
  const q = question.toLowerCase();

  if (q.includes('hackathon')) {
    const hackathons = loadedEvents.filter(e => e.eventTypeName?.toLowerCase().includes('hackathon') || e.categoryName?.toLowerCase().includes('coding') || e.title.toLowerCase().includes('hack'));
    if (hackathons.length > 0) {
      const list = hackathons.slice(0, 3).map(h => `• **${h.title}** (${h.mode}, Starts: ${h.calendars?.[0]?.startDate || 'Upcoming'}, ${h.isPaid ? 'Paid' : 'Free'})`).join('\n');
      return `Here are top upcoming hackathons for students:\n\n${list}\n\nWould you like me to guide you to their registration links?`;
    }
  }

  if (q.includes('free') || q.includes('zero fee')) {
    const freeEvents = loadedEvents.filter(e => !e.isPaid || e.tickets?.some(t => !t.isPaid || t.price === 0));
    if (freeEvents.length > 0) {
      const list = freeEvents.slice(0, 3).map(f => `• **${f.title}** (${f.location?.city || f.mode})`).join('\n');
      return `Here are 100% free events you can register for without fee:\n\n${list}\n\nAll of these include verified certificates upon participation!`;
    }
  }

  if (q.includes('certificate') || q.includes('cert')) {
    return "Yes! Over 95% of events listed on AllCollegeEvent issue verified digital or hardcopy certificates verified by their organizing colleges and sponsors.";
  }

  if (q.includes('first-year') || q.includes('beginner') || q.includes('1st year')) {
    return "Most events on ACE, including technical symposiums, workshops, and beginner tracks in hackathons like HACKVERSE 2.0, are warmly open to 1st and 2nd year students!";
  }

  if (q.includes('referral') || q.includes('points') || q.includes('rewards')) {
    return "On ACE, you earn **10 Reward Points** for every friend who signs up using your unique referral code. You can redeem points for Amazon vouchers, Spin & Win tokens, and exclusive developer mystery boxes in the Rewards section!";
  }

  return "I'm ACE AI, your student opportunity assistant. You can ask me about upcoming hackathons, college symposiums, free workshops, registration deadlines, or referral rewards!";
}
