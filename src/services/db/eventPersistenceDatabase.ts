// ACE Persistent Event Database Layer
// Handles published events, event drafts, registrations, saves, and likes

export interface PersistentEvent {
  id: string;
  slug: string;
  title: string;
  eventType: string; // Hackathon, Symposium, Workshop, Conference, Contest, Webinar
  category: string;
  venue: string;
  city: string;
  state: string;
  audience: string;
  mode: 'OFFLINE' | 'ONLINE' | 'HYBRID';
  startDate: string;
  endDate?: string;
  ticketPrice: number;
  currency: string;
  description: string;
  shortDescription?: string;
  perks: string;
  bannerImage?: string;
  organizerId: string;
  organizerName: string;
  institutionId: string;
  college: string;
  qualityScore: number;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
  tags: string[];
  registeredCount: number;
  likeCount: number;
  saveCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventDraft {
  id: string;
  userId: string;
  step: number;
  formData: {
    title: string;
    eventType: string;
    category: string;
    venue: string;
    audience: string;
    mode: string;
    startDate: string;
    ticketPrice: string;
    description: string;
    shortDescription: string;
    seoTitle: string;
    seoDescription: string;
    tags: string[];
    perks: string;
  };
  lastSavedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCollege: string;
  ticketType: string;
  ticketPrice: number;
  teamName?: string;
  registeredAt: string;
  status: 'CONFIRMED' | 'ATTENDED' | 'CANCELLED';
  qrCodeUrl: string;
}

const STORAGE_KEYS = {
  EVENTS: 'ace_persistent_events_v2',
  DRAFTS: 'ace_event_drafts_v2',
  REGISTRATIONS: 'ace_event_registrations_v2',
  SAVED: 'ace_saved_event_slugs_v2',
  LIKED: 'ace_liked_event_slugs_v2'
};

const SEED_EVENTS: PersistentEvent[] = [
  {
    id: 'evt-nexora-2k26',
    slug: 'nexora-2k26-a-national-level-technical-symposium-20260901-040857-58300',
    title: 'NEXORA 2K26 — National Level Technical Symposium',
    eventType: 'Symposium',
    category: 'Technical & Engineering',
    venue: 'Department of Computer Science & Engineering, Vel Tech Campus',
    city: 'Chennai',
    state: 'Tamil Nadu',
    audience: 'UG / PG Engineering & Computer Science Students',
    mode: 'OFFLINE',
    startDate: '2026-10-15',
    endDate: '2026-10-16',
    ticketPrice: 150,
    currency: '₹',
    description: 'NEXORA 2K26 is the premier national technical symposium bringing together 2000+ tech leaders for paper presentations, live coding hack battles, and AI engineering challenges.',
    shortDescription: 'National level technical symposium featuring 10+ competitive tracks, workshops, and ₹1,00,000 in cash prizes.',
    perks: 'Cash Prizes ₹1,00,000 + Scopus Indexed Paper Publication + Certificates + Kit',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
    organizerId: 'usr_student_dileep',
    organizerName: 'CSE Student Association',
    institutionId: 'inst-vel-tech-rangarajan-avadi',
    college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    qualityScore: 96,
    status: 'PUBLISHED',
    tags: ['Artificial Intelligence', 'Paper Presentation', 'Web3', 'Competitive Coding'],
    registeredCount: 342,
    likeCount: 128,
    saveCount: 89,
    createdAt: '2026-09-01T04:08:57Z',
    updatedAt: '2026-09-02T10:00:00Z'
  },
  {
    id: 'evt-hackverse-2-0',
    slug: 'hackverse-2-0-20260901-051234',
    title: 'HACKVERSE 2.0 — 36-Hour Autonomous AI Hackathon',
    eventType: 'Hackathon',
    category: 'Technical & Coding',
    venue: 'Innovation & Incubation Center, Vel Tech Campus',
    city: 'Chennai',
    state: 'Tamil Nadu',
    audience: 'All College Coders & Innovators',
    mode: 'HYBRID',
    startDate: '2026-10-24',
    endDate: '2026-10-26',
    ticketPrice: 0,
    currency: '₹',
    description: 'Build production-grade AI agents, LLM toolchains, and distributed robotics software during an intense 36-hour sprint with top industry mentors.',
    shortDescription: 'Flagship 36-hour national hackathon with ₹2,50,000 prize pool and direct interview pipelines.',
    perks: '₹2,50,000 Cash Pool + Cloud Credits ($500/team) + Direct Hiring Interviews + Food & Swag',
    bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    organizerId: 'usr_student_dileep',
    organizerName: 'Vel Tech Hackers Guild',
    institutionId: 'inst-vel-tech-rangarajan-avadi',
    college: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    qualityScore: 98,
    status: 'PUBLISHED',
    tags: ['Hackathon', 'Autonomous Agents', 'FastAPI', 'React', 'Open Source'],
    registeredCount: 890,
    likeCount: 420,
    saveCount: 312,
    createdAt: '2026-09-01T05:12:34Z',
    updatedAt: '2026-09-03T14:30:00Z'
  }
];

class EventPersistenceDatabase {
  private events: PersistentEvent[] = [];
  private drafts: Record<string, EventDraft> = {};
  private registrations: EventRegistration[] = [];
  private savedSlugsByUser: Record<string, string[]> = {};
  private likedSlugsByUser: Record<string, string[]> = {};

  constructor() {
    this.hydrate();
  }

  private hydrate() {
    try {
      if (typeof localStorage === 'undefined') return;

      const rawEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
      this.events = rawEvents ? JSON.parse(rawEvents) : SEED_EVENTS;

      const rawDrafts = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      this.drafts = rawDrafts ? JSON.parse(rawDrafts) : {};

      const rawRegs = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      this.registrations = rawRegs ? JSON.parse(rawRegs) : [];

      const rawSaved = localStorage.getItem(STORAGE_KEYS.SAVED);
      this.savedSlugsByUser = rawSaved ? JSON.parse(rawSaved) : {
        'usr_student_dileep': ['nexora-2k26-a-national-level-technical-symposium-20260901-040857-58300']
      };

      const rawLiked = localStorage.getItem(STORAGE_KEYS.LIKED);
      this.likedSlugsByUser = rawLiked ? JSON.parse(rawLiked) : {
        'usr_student_dileep': ['hackverse-2-0-20260901-051234']
      };
    } catch (e) {
      console.error('[EventPersistenceDatabase] Hydration error:', e);
      this.events = SEED_EVENTS;
    }
  }

  private persistEvents() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(this.events));
    }
  }

  private persistDrafts() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(this.drafts));
    }
  }

  private persistRegistrations() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(this.registrations));
    }
  }

  private persistSaved() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(this.savedSlugsByUser));
    }
  }

  private persistLiked() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LIKED, JSON.stringify(this.likedSlugsByUser));
    }
  }

  // --- Events API ---
  public getAllEvents(): PersistentEvent[] {
    return [...this.events];
  }

  public getPublishedEvents(): PersistentEvent[] {
    return this.events.filter(e => e.status === 'PUBLISHED');
  }

  public getEventBySlug(slug: string): PersistentEvent | undefined {
    return this.events.find(e => e.slug === slug);
  }

  public getEventById(id: string): PersistentEvent | undefined {
    return this.events.find(e => e.id === id);
  }

  public getEventsByOrganizer(userId: string): PersistentEvent[] {
    return this.events.filter(e => e.organizerId === userId);
  }

  public getEventsByInstitution(institutionId: string): PersistentEvent[] {
    return this.events.filter(e => e.institutionId === institutionId);
  }

  public saveEvent(event: Omit<PersistentEvent, 'id' | 'createdAt' | 'updatedAt' | 'registeredCount' | 'likeCount' | 'saveCount'> & { id?: string }): PersistentEvent {
    const now = new Date().toISOString();
    if (event.id) {
      const idx = this.events.findIndex(e => e.id === event.id);
      if (idx >= 0) {
        const updated: PersistentEvent = {
          ...this.events[idx],
          ...event,
          updatedAt: now
        };
        this.events[idx] = updated;
        this.persistEvents();
        return updated;
      }
    }

    const newId = event.id || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newEvent: PersistentEvent = {
      ...event,
      id: newId,
      registeredCount: 0,
      likeCount: 0,
      saveCount: 0,
      createdAt: now,
      updatedAt: now
    };
    this.events.unshift(newEvent);
    this.persistEvents();
    return newEvent;
  }

  public deleteEvent(id: string): boolean {
    const initialLen = this.events.length;
    this.events = this.events.filter(e => e.id !== id);
    if (this.events.length !== initialLen) {
      this.persistEvents();
      return true;
    }
    return false;
  }

  // --- Drafts API ---
  public saveDraft(userId: string, step: number, formData: EventDraft['formData']): EventDraft {
    const draft: EventDraft = {
      id: `draft-${userId}`,
      userId,
      step,
      formData,
      lastSavedAt: new Date().toISOString()
    };
    this.drafts[userId] = draft;
    this.persistDrafts();
    return draft;
  }

  public getDraft(userId: string): EventDraft | null {
    return this.drafts[userId] || null;
  }

  public clearDraft(userId: string): void {
    if (this.drafts[userId]) {
      delete this.drafts[userId];
      this.persistDrafts();
    }
  }

  // --- Registrations API ---
  public registerUserForEvent(params: {
    eventId: string;
    eventSlug: string;
    eventTitle: string;
    userId: string;
    userName: string;
    userEmail: string;
    userCollege: string;
    ticketType?: string;
    ticketPrice?: number;
    teamName?: string;
  }): { success: boolean; registration?: EventRegistration; message: string } {
    const existing = this.registrations.find(r => r.userId === params.userId && r.eventId === params.eventId);
    if (existing) {
      return { success: false, message: 'Already registered for this event.' };
    }

    const newReg: EventRegistration = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      eventId: params.eventId,
      eventSlug: params.eventSlug,
      eventTitle: params.eventTitle,
      userId: params.userId,
      userName: params.userName,
      userEmail: params.userEmail,
      userCollege: params.userCollege,
      ticketType: params.ticketType || 'General Delegate Pass',
      ticketPrice: params.ticketPrice || 0,
      teamName: params.teamName,
      registeredAt: new Date().toISOString(),
      status: 'CONFIRMED',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ACE-REG-${params.eventId}-${params.userId}`
    };

    this.registrations.unshift(newReg);
    this.persistRegistrations();

    // Increment count on event
    const evt = this.events.find(e => e.id === params.eventId || e.slug === params.eventSlug);
    if (evt) {
      evt.registeredCount = (evt.registeredCount || 0) + 1;
      this.persistEvents();
    }

    return { success: true, registration: newReg, message: 'Registration confirmed successfully!' };
  }

  public getUserRegistrations(userId: string): EventRegistration[] {
    return this.registrations.filter(r => r.userId === userId);
  }

  public isUserRegistered(userId: string, eventIdOrSlug: string): boolean {
    return this.registrations.some(r => r.userId === userId && (r.eventId === eventIdOrSlug || r.eventSlug === eventIdOrSlug));
  }

  // --- Saved & Liked API ---
  public getUserSavedSlugs(userId: string): string[] {
    return this.savedSlugsByUser[userId] || [];
  }

  public toggleSaveEvent(userId: string, slug: string): boolean {
    const list = this.savedSlugsByUser[userId] || [];
    let isSavedNow = false;
    if (list.includes(slug)) {
      this.savedSlugsByUser[userId] = list.filter(s => s !== slug);
      isSavedNow = false;
    } else {
      this.savedSlugsByUser[userId] = [...list, slug];
      isSavedNow = true;
    }
    this.persistSaved();

    const evt = this.events.find(e => e.slug === slug);
    if (evt) {
      evt.saveCount = Math.max(0, (evt.saveCount || 0) + (isSavedNow ? 1 : -1));
      this.persistEvents();
    }
    return isSavedNow;
  }

  public getUserLikedSlugs(userId: string): string[] {
    return this.likedSlugsByUser[userId] || [];
  }

  public toggleLikeEvent(userId: string, slug: string): boolean {
    const list = this.likedSlugsByUser[userId] || [];
    let isLikedNow = false;
    if (list.includes(slug)) {
      this.likedSlugsByUser[userId] = list.filter(s => s !== slug);
      isLikedNow = false;
    } else {
      this.likedSlugsByUser[userId] = [...list, slug];
      isLikedNow = true;
    }
    this.persistLiked();

    const evt = this.events.find(e => e.slug === slug);
    if (evt) {
      evt.likeCount = Math.max(0, (evt.likeCount || 0) + (isLikedNow ? 1 : -1));
      this.persistEvents();
    }
    return isLikedNow;
  }
}

export const eventPersistenceDb = new EventPersistenceDatabase();
