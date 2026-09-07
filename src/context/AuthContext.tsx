import React, { createContext, useContext, useState, useEffect } from 'react';
import { Account, AccountRole, AuditLogEntry, GalleryAlbum, GalleryImage } from '../types/account';
import { accountDb } from '../services/db/accountDatabase';
import { authService, RegisterPayload } from '../services/db/authService';

interface AuthContextType {
  currentUser: Account | null;
  activeRole: AccountRole;
  isAuthenticated: boolean;
  login: (identifier: string, pass: string) => Promise<{ success: boolean; user?: Account; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; user?: Account; error?: string }>;
  logout: () => void;
  switchPersona: (role: AccountRole) => void;
  switchRolePersona: (role: AccountRole) => void;
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

  const switchPersona = (role: AccountRole) => {
    const targetUser = authService.switchPersona(role);
    setCurrentUser({ ...targetUser });
  };

  const switchRolePersona = (role: AccountRole) => {
    switchPersona(role);
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
    const target = userId || currentUser?.id;
    return target ? accountDb.getGalleryImages(target) : [];
  };

  const getGalleryAlbums = (userId?: string) => {
    const target = userId || currentUser?.id;
    return target ? accountDb.getGalleryAlbums(target) : [];
  };

  const addGalleryImage = (imageData: { url: string; caption: string; albumId: string; visibility?: any }) => {
    const img = accountDb.addGalleryImage(imageData);
    refreshUser();
    return img;
  };

  const deleteGalleryImage = (id: string) => {
    if (!currentUser) return false;
    const res = accountDb.deleteGalleryImage(id, currentUser.id);
    if (res) refreshUser();
    return res;
  };

  const toggleFollow = (targetId: string) => {
    if (!currentUser) throw new Error('Not logged in');
    const res = accountDb.toggleFollow(currentUser.id, targetId);
    refreshUser();
    return res;
  };

  const isFollowing = (targetId: string) => {
    return currentUser ? accountDb.isFollowing(currentUser.id, targetId) : false;
  };

  const profileStrength = currentUser ? currentUser.profileStrength || 80 : 0;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole: currentUser?.role || 'STUDENT',
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        switchPersona,
        switchRolePersona,
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
        profileStrength
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
