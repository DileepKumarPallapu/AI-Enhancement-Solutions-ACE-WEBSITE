import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EventItem, StudentProfile, ReferralInvitation, NotificationItem } from '../types';
import { fetchEvents, userProfileData, sampleReferralInvitations, fallbackEvents } from '../services/api';
import { eventPersistenceDb, PersistentEvent } from '../services/db/eventPersistenceDatabase';
import { notificationDb } from '../services/db/notificationDatabase';
import { settingsDb } from '../services/db/settingsDatabase';
import { accountDb } from '../services/db/accountDatabase';

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
  const currentAcc = accountDb.getCurrentUser();
  const userId = currentAcc?.id || 'usr_student_dileep';

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return settingsDb.getUserPreferences(userId).theme || 'light';
  });

  const [user, setUser] = useState<StudentProfile>(() => {
    if (currentAcc) {
      return {
        ...userProfileData,
        name: currentAcc.fullName || currentAcc.displayName || userProfileData.name,
        email: currentAcc.email || userProfileData.email,
        college: currentAcc.college || userProfileData.college,
        department: (currentAcc.roleProfileData as any)?.department || (currentAcc.roleProfileData as any)?.major || userProfileData.department,
        year: (currentAcc.roleProfileData as any)?.year || userProfileData.year,
        avatarUrl: currentAcc.avatarUrl || userProfileData.avatarUrl,
        skills: currentAcc.skills?.verified || userProfileData.skills,
        interests: currentAcc.skills?.interested || userProfileData.interests
      };
    }
    return userProfileData;
  });

  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const [savedEvents, setSavedEvents] = useState<string[]>(() => {
    return eventPersistenceDb.getUserSavedSlugs(userId);
  });

  const [likedEvents, setLikedEvents] = useState<string[]>(() => {
    return eventPersistenceDb.getUserLikedSlugs(userId);
  });

  const [registeredEvents, setRegisteredEvents] = useState<string[]>(() => {
    return eventPersistenceDb.getUserRegistrations(userId).map(r => r.eventSlug);
  });

  const [referralInvitations, setReferralInvitations] = useState<ReferralInvitation[]>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(`ace_referrals_${userId}`) : null;
    return saved ? JSON.parse(saved) : sampleReferralInvitations;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const dbNotifs = notificationDb.getNotificationsByUser(userId);
    return dbNotifs.map(n => ({
      id: n.id,
      title: n.title,
      message: n.message,
      type: n.type as any,
      timestamp: new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: n.isRead,
      link: n.link
    }));
  });

  useEffect(() => {
    settingsDb.updatePreferences(userId, { theme });
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ace_theme', theme);
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, userId]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const loadAllEvents = useCallback(async () => {
    setIsLoadingEvents(true);
    try {
      const data = await fetchEvents();
      const persistentList = eventPersistenceDb.getPublishedEvents();

      // Merge persistent DB events into feed
      const mappedPersistent: EventItem[] = persistentList.map((p, idx) => ({
        identity: `ident-${p.id}`,
        id: Date.now() + idx,
        orgIdentity: p.organizerId,
        title: p.title,
        slug: p.slug,
        description: p.description,
        publishedAt: p.createdAt,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        status: 'APPROVED',
        bannerImages: p.bannerImage ? [p.bannerImage] : ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200'],
        mode: p.mode,
        viewCount: p.registeredCount * 3 + 120,
        likeCount: p.likeCount,
        shareCount: 25,
        isPaid: p.ticketPrice > 0,
        tags: p.tags,
        aiQualityScore: p.qualityScore,
        location: {
          id: 1,
          city: p.city,
          state: p.state,
          country: 'India',
          venue: p.venue
        },
        org: {
          identity: p.organizerId,
          id: 101,
          organizationName: p.organizerName || p.college,
          city: p.city,
          state: p.state,
          country: 'India',
          isVerified: true
        }
      }));

      const combined = [...mappedPersistent];
      data.events.forEach(e => {
        if (!combined.some(c => c.slug === e.slug || c.title.toLowerCase() === e.title.toLowerCase())) {
          combined.push(e);
        }
      });

      if (combined.length > 0) {
        setEvents(combined);
      }
    } catch (err) {
      console.error('[AppContext] Failed to load events:', err);
    } finally {
      setIsLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    loadAllEvents();
  }, [loadAllEvents]);

  const toggleSaveEvent = (slug: string) => {
    eventPersistenceDb.toggleSaveEvent(userId, slug);
    setSavedEvents(eventPersistenceDb.getUserSavedSlugs(userId));
  };

  const toggleLikeEvent = (slug: string) => {
    eventPersistenceDb.toggleLikeEvent(userId, slug);
    setLikedEvents(eventPersistenceDb.getUserLikedSlugs(userId));
  };

  const registerForEvent = (slug: string) => {
    const evt = events.find(e => e.slug === slug);
    if (!evt) return;

    eventPersistenceDb.registerUserForEvent({
      eventId: String(evt.id),
      eventSlug: evt.slug,
      eventTitle: evt.title,
      userId,
      userName: user.name,
      userEmail: user.email,
      userCollege: user.college
    });

    setRegisteredEvents(eventPersistenceDb.getUserRegistrations(userId).map(r => r.eventSlug));
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

    const updated = [...newInvites, ...referralInvitations];
    setReferralInvitations(updated);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`ace_referrals_${userId}`, JSON.stringify(updated));
    }
    setUser(prev => ({
      ...prev,
      pointsEarned: prev.pointsEarned + emails.length * 20
    }));
  };

  const markNotificationAsRead = (id: string) => {
    notificationDb.markAsRead(id);
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
