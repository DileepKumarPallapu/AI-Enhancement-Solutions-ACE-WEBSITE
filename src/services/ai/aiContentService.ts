export interface GeneratedCopyInput {
  title: string;
  eventType: string;
  collegeName?: string;
  department?: string;
  keywords?: string;
}

export interface GeneratedCopyOutput {
  description: string;
  shortDescription: string;
  highlights: string[];
  faqs: { question: string; answer: string }[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  socialCaption: string;
}

export function generateAiEventContent(input: GeneratedCopyInput): GeneratedCopyOutput {
  const title = input.title || 'National Technical Symposium 2026';
  const college = input.collegeName || 'Hindustan Institute of Technology';
  const dept = input.department || 'Computer Science and Engineering';

  return {
    description: `Join us for ${title}, a premier inter-collegiate symposium hosted by the Department of ${dept} at ${college}. This flagship opportunity brings together ambitious student creators, researchers, and coders across India to showcase innovation, solve real-world industry challenges, and compete for cash prize pools and publication support.`,
    shortDescription: `Premier national level ${input.eventType.toLowerCase()} at ${college} featuring cash prizes, workshops, and verified certificates.`,
    highlights: [
      'Cash prize pool and trophies for top 3 rankers',
      'Tamper-proof digital delegate certificates verified by ACE',
      'Networking with industry leaders and technical mentors',
      'Complimentary lunch & welcome delegate kit for all attendees'
    ],
    faqs: [
      {
        question: 'Who is eligible to participate?',
        answer: 'Open to all bona-fide engineering, arts, science, and polytechnic students with a valid college ID card.'
      },
      {
        question: 'Will certificates be provided?',
        answer: 'Yes, all registered attendees who participate on event day will receive verified digital certificates.'
      }
    ],
    tags: ['Hackathon', 'Technical Symposium', 'Coding', 'Engineering', dept, 'Tamil Nadu'],
    seoTitle: `${title} | ${college} - AllCollegeEvent`,
    seoDescription: `Register for ${title} hosted by ${college}. Discover schedule, registration link, and prize details on AllCollegeEvent.`,
    socialCaption: `🚀 Big news! ${title} is officially live on AllCollegeEvent! Compete, build, and win cash prizes at ${college}. Register now: https://allcollegeevent.com/events/`
  };
}
