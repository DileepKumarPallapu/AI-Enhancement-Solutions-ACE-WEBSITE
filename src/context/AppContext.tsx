import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventItem, StudentProfile, ReferralInvitation, NotificationItem } from '../types';
import { fetchEvents, userProfileData, sampleReferralInvitations, fallbackEvents } from '../services/api';

interface AppContextType {
  user: StudentProfile;
  events: EventItem[];
  savedEvents: string[];
  likedEvents: string[];
  registeredEvents: string[];
  referralInvitations: ReferralInvitation[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  isLoadingEvents: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleSaveEvent: (slug: string) => void;
  toggleLikeEvent: (slug: string) => void;
  registerForEvent: (slug: string) => void;
  sendReferralInvites: (emails: string[]) => void;
  markNotificationAsRead: (id: string) => void;
  updateUserProfile: (data: Partial<StudentProfile>) => void;
  refreshEvents: () => Promise<void>;
  giveFeedFeedback: (eventSlug: string, isRelevant: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('ace_theme') as 'light' | 'dark') || 'light';
  });

  const [user, setUser] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('ace_user_profile');
    return saved ? JSON.parse(saved) : userProfileData;
  });

  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const [savedEvents, setSavedEvents] = useState<string[]>(() => {
    const saved = localStorage.getItem('ace_saved_events');
    return saved ? JSON.parse(saved) : ['nexora-2k26-a-national-level-technical-symposium-20260901-040857-58300'];
  });

  const [likedEvents, setLikedEvents] = useState<string[]>(() => {
    const saved = localStorage.getItem('ace_liked_events');
    return saved ? JSON.parse(saved) : ['hackverse-2-0-20260901-051234'];
  });

  const [registeredEvents, setRegisteredEvents] = useState<string[]>(() => {
    const saved = localStorage.getItem('ace_registered_events');
    return saved ? JSON.parse(saved) : ['hackverse-2-0-20260901-051234'];
  });

  const [referralInvitations, setReferralInvitations] = useState<ReferralInvitation[]>(() => {
    const saved = localStorage.getItem('ace_referrals');
    return saved ? JSON.parse(saved) : sampleReferralInvitations;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Registration Closing Soon',
      message: 'Registration closes in 48 hours for NEXORA 2K26 Technical Symposium.',
      type: 'DEADLINE',
      timestamp: '10 mins ago',
      isRead: false,
      link: '/events/nexora-2k26-a-national-level-technical-symposium-20260901-040857-58300'
    },
    {
      id: 'notif-2',
      title: 'New AI Recommendation',
      message: 'We discovered 3 new Hackathons matching your Computer Science interests.',
      type: 'RECOMMENDATION',
      timestamp: '2 hours ago',
      isRead: false,
      link: '/events'
    },
    {
      id: 'notif-3',
      title: 'Referral Points Credited',
      message: '+10 ACE Reward Points awarded for successful referral join.',
      type: 'REWARD',
      timestamp: '1 day ago',
      isRead: true,
      link: '/referral'
    }
  ]);

  useEffect(() => {
    localStorage.setItem('ace_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('ace_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ace_saved_events', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    localStorage.setItem('ace_liked_events', JSON.stringify(likedEvents));
  }, [likedEvents]);

  useEffect(() => {
    localStorage.setItem('ace_registered_events', JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  useEffect(() => {
    localStorage.setItem('ace_referrals', JSON.stringify(referralInvitations));
  }, [referralInvitations]);

  const loadAllEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const data = await fetchEvents();
      if (data.events.length > 0) {
        setEvents(data.events);
      }
    } finally {
      setIsLoadingEvents(false);
    }
  };

  useEffect(() => {
    loadAllEvents();
  }, []);

  const toggleSaveEvent = (slug: string) => {
    setSavedEvents(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  const toggleLikeEvent = (slug: string) => {
    setLikedEvents(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  const registerForEvent = (slug: string) => {
    if (!registeredEvents.includes(slug)) {
      setRegisteredEvents(prev => [...prev, slug]);
    }
  };

  const sendReferralInvites = (emails: string[]) => {
    const newInvites: ReferralInvitation[] = emails.map((email, idx) => ({
      id: Date.now() + idx,
      invitedBy: user.name,
      recipientEmail: email,
      invitationDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      emailStatus: 'SENT',
      deliveryStatus: 'DELIVERED',
      status: 'PENDING'
    }));

    setReferralInvitations(prev => [...newInvites, ...prev]);
    setUser(prev => ({
      ...prev,
      pointsEarned: prev.pointsEarned + emails.length * 2
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const updateUserProfile = (data: Partial<StudentProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const giveFeedFeedback = (eventSlug: string, isRelevant: boolean) => {
    if (!isRelevant) {
      setEvents(prev => prev.filter(e => e.slug !== eventSlug));
    }
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        user,
        events,
        savedEvents,
        likedEvents,
        registeredEvents,
        referralInvitations,
        notifications,
        unreadNotificationCount,
        isLoadingEvents,
        theme,
        toggleTheme,
        toggleSaveEvent,
        toggleLikeEvent,
        registerForEvent,
        sendReferralInvites,
        markNotificationAsRead,
        updateUserProfile,
        refreshEvents: loadAllEvents,
        giveFeedFeedback
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
