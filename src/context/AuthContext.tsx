import React, { createContext, useContext, useState, useEffect } from 'react';
import { Account, AccountRole, AuditLogEntry, GalleryAlbum, GalleryImage, UserRoleEnrollment } from '../types/account';
import { accountDb } from '../services/db/accountDatabase';
import { authService, RegisterPayload } from '../services/db/authService';

export interface UserWorkspace {
  role: AccountRole;
  label: string;
  icon: string;
  desc: string;
  path: string;
  badge?: string;
}

interface AuthContextType {
  currentUser: Account | null;
  user: Account | null;
  activeRole: AccountRole;
  activeWorkspace: AccountRole;
  isAuthenticated: boolean;
  availableWorkspaces: UserWorkspace[];
  login: (identifier: string, pass: string) => Promise<{ success: boolean; user?: Account; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; user?: Account; error?: string }>;
  logout: () => void;
  switchWorkspace: (role: AccountRole) => { success: boolean; error?: string };
  switchPersona: (role: AccountRole) => void; // backwards-compatible alias for switchWorkspace
  switchRolePersona: (role: AccountRole) => void; // backwards-compatible alias for switchWorkspace
  applyForRole: (role: AccountRole, metadata?: any) => UserRoleEnrollment;
  hasRoleAccess: (role: AccountRole) => boolean;
  updateProfile: (updates: Partial<Account>) => Promise<{ success: boolean; user?: Account; error?: string }>;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  sendVerificationOtp: (type: 'email' | 'phone') => Promise<{ success: boolean; message: string }>;
  verifyEmail: (code: string) => Promise<{ success: boolean; message: string }>;
  verifyPhone: (otp: string) => Promise<{ success: boolean; message: string }>;
  deactivateAccount: () => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  refreshUser: () => void;
  getAuditLogs: () => AuditLogEntry[];
  getGalleryImages: (userId?: string) => GalleryImage[];
  getGalleryAlbums: (userId?: string) => GalleryAlbum[];
  addGalleryImage: (imageData: { url: string; caption: string; albumId: string; visibility?: any }) => GalleryImage;
  deleteGalleryImage: (id: string) => boolean;
  toggleFollow: (targetId: string) => { isFollowing: boolean; targetFollowersCount: number };
  isFollowing: (targetId: string) => boolean;
  profileStrength: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Account | null>(() => accountDb.getCurrentUser());

  const refreshUser = () => {
    const user = accountDb.getCurrentUser();
    setCurrentUser(user ? { ...user } : null);
  };

  const activeRole: AccountRole = currentUser?.activeWorkspace || currentUser?.role || 'STUDENT';
  const activeWorkspace: AccountRole = activeRole;

  // Compute available workspaces strictly for THIS authenticated user
  const computeAvailableWorkspaces = (): UserWorkspace[] => {
    if (!currentUser) return [];

    const list: UserWorkspace[] = [];
    const enrollments = accountDb.getUserEnrollments(currentUser.id);
    const activeEnrs = enrollments.filter(e => e.status === 'ACTIVE');
    const userRoles = new Set<AccountRole>([
      currentUser.role,
      ...(currentUser.roles || []),
      ...activeEnrs.map(e => e.role)
    ]);

    // 1. STUDENT
    if (userRoles.has('STUDENT')) {
      const degree = (currentUser.roleProfileData as any)?.degree || 'B.Tech';
      const dept = (currentUser.roleProfileData as any)?.department || (currentUser.roleProfileData as any)?.major || 'CSE';
      list.push({
        role: 'STUDENT',
        label: 'Student Workspace',
        icon: '🎓',
        desc: `${degree} ${dept} @ ${currentUser.college}`,
        path: '/student/dashboard',
        badge: 'Verified Student'
      });
    }

    // 2. COLLEGE_AMBASSADOR
    if (userRoles.has('COLLEGE_AMBASSADOR')) {
      list.push({
        role: 'COLLEGE_AMBASSADOR',
        label: 'Campus Ambassador Workspace',
        icon: '🏆',
        desc: `${currentUser.college} Campus Lead`,
        path: '/ambassador/dashboard',
        badge: 'Campus Lead'
      });
    }

    // 3. MENTOR
    if (userRoles.has('MENTOR')) {
      list.push({
        role: 'MENTOR',
        label: 'Faculty Mentor Workspace',
        icon: '💡',
        desc: `${currentUser.college} Faculty Mentor`,
        path: '/mentor/dashboard',
        badge: 'Verified Mentor'
      });
    }

    // 4. ORGANIZER
    if (userRoles.has('ORGANIZER')) {
      const orgName = (currentUser.roleProfileData as any)?.organizationName || `${currentUser.college} Events Team`;
      list.push({
        role: 'ORGANIZER',
        label: 'Event Organizer Workspace',
        icon: '🏛️',
        desc: orgName,
        path: '/organizer/dashboard',
        badge: 'Organizer'
      });
    }

    // 5. COLLEGE
    if (userRoles.has('COLLEGE')) {
      list.push({
        role: 'COLLEGE',
        label: 'College Admin Portal',
        icon: '🏫',
        desc: currentUser.college,
        path: '/college/dashboard',
        badge: 'College Admin'
      });
    }

    // 6. ADMIN
    if (userRoles.has('ADMIN') || (currentUser.permissions && currentUser.permissions.includes('ALL_PERMISSIONS'))) {
      list.push({
        role: 'ADMIN',
        label: 'Security Superadmin Workspace',
        icon: '🛡️',
        desc: 'ACE Central Platform Directorate',
        path: '/admin/dashboard',
        badge: 'Superadmin'
      });
    }

    return list;
  };

  const availableWorkspaces = computeAvailableWorkspaces();

  const login = async (identifier: string, pass: string) => {
    const res = await authService.login(identifier, pass);
    if (res.success && res.user) {
      setCurrentUser({ ...res.user });
    }
    return res;
  };

  const register = async (payload: RegisterPayload) => {
    const res = await authService.register(payload);
    if (res.success && res.user) {
      setCurrentUser({ ...res.user });
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const switchWorkspace = (role: AccountRole): { success: boolean; error?: string } => {
    if (!currentUser) return { success: false, error: 'Not authenticated' };
    const res = authService.switchWorkspace(currentUser.id, role);
    if (res.success && res.user) {
      setCurrentUser({ ...res.user });
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const switchPersona = (role: AccountRole) => {
    switchWorkspace(role);
  };

  const switchRolePersona = (role: AccountRole) => {
    switchWorkspace(role);
  };

  const applyForRole = (role: AccountRole, metadata?: any): UserRoleEnrollment => {
    if (!currentUser) throw new Error('Not authenticated');
    const enr = accountDb.applyForRole(currentUser.id, role, currentUser.collegeId, undefined, metadata);
    refreshUser();
    return enr;
  };

  const hasRoleAccess = (role: AccountRole): boolean => {
    if (!currentUser) return false;
    return accountDb.hasActiveEnrollment(currentUser.id, role);
  };

  const updateProfile = async (updates: Partial<Account>) => {
    if (!currentUser) return { success: false, error: 'Not authenticated' };
    const res = authService.updateProfile(currentUser.id, updates);
    if (res.success && res.user) {
      setCurrentUser({ ...res.user });
    }
    return res;
  };

  const changePassword = async (oldPass: string, newPass: string) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };
    return authService.changePassword(currentUser.id, oldPass, newPass);
  };

  const sendVerificationOtp = async (type: 'email' | 'phone') => {
    return {
      success: true,
      message: `A fresh 6-digit verification code has been dispatched to your ${type}.`
    };
  };

  const verifyEmail = async (code: string) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };
    const res = await authService.verifyEmail(currentUser.id, code);
    refreshUser();
    return res;
  };

  const verifyPhone = async (otp: string) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };
    const res = await authService.verifyPhone(currentUser.id, otp);
    refreshUser();
    return res;
  };

  const deactivateAccount = async () => {
    if (!currentUser) return false;
    authService.updateProfile(currentUser.id, { status: 'DEACTIVATED' });
    logout();
    return true;
  };

  const deleteAccount = async () => {
    if (!currentUser) return false;
    accountDb.deleteAccount(currentUser.id);
    logout();
    return true;
  };

  const getAuditLogs = () => {
    return currentUser ? accountDb.getAuditLogs(currentUser.id) : [];
  };

  const getGalleryImages = (userId?: string) => {
    const targetId = userId || currentUser?.id;
    return targetId ? accountDb.getGalleryImages(targetId) : [];
  };

  const getGalleryAlbums = (userId?: string) => {
    const targetId = userId || currentUser?.id;
    return targetId ? accountDb.getGalleryAlbums(targetId) : [];
  };

  const addGalleryImage = (imageData: { url: string; caption: string; albumId: string; visibility?: any }) => {
    const newImg = accountDb.addGalleryImage({
      ...imageData,
      userId: currentUser?.id
    });
    refreshUser();
    return newImg;
  };

  const deleteGalleryImage = (id: string) => {
    if (!currentUser) return false;
    const ok = accountDb.deleteGalleryImage(id, currentUser.id);
    if (ok) refreshUser();
    return ok;
  };

  const toggleFollow = (targetId: string) => {
    if (!currentUser) throw new Error('Must be logged in to follow');
    const res = accountDb.toggleFollow(currentUser.id, targetId);
    refreshUser();
    return res;
  };

  const isFollowing = (targetId: string) => {
    if (!currentUser) return false;
    return accountDb.isFollowing(currentUser.id, targetId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser,
        activeRole,
        activeWorkspace,
        isAuthenticated: !!currentUser,
        availableWorkspaces,
        login,
        register,
        logout,
        switchWorkspace,
        switchPersona,
        switchRolePersona,
        applyForRole,
        hasRoleAccess,
        updateProfile,
        changePassword,
        sendVerificationOtp,
        verifyEmail,
        verifyPhone,
        deactivateAccount,
        deleteAccount,
        refreshUser,
        getAuditLogs,
        getGalleryImages,
        getGalleryAlbums,
        addGalleryImage,
        deleteGalleryImage,
        toggleFollow,
        isFollowing,
        profileStrength: currentUser ? (currentUser.profileStrength || 85) : 0
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
