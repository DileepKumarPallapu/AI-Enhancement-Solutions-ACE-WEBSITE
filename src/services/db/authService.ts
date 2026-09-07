import { Account, AccountRole, AccountStatus, PrivacyPreferences } from '../../types/account';
import { accountDb } from './accountDatabase';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role: AccountRole;
  fullName?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  college?: string;
  location?: string;
  phone?: string;
  phoneNumber?: string;
  bio?: string;
  avatarUrl?: string;
  coverPhotoUrl?: string;
  degree?: string;
  department?: string;
  year?: string;
  careerGoal?: string;
  interestedDomains?: string[];
  preferredLanguages?: string[];
  organizationName?: string;
  organizationType?: any;
  orgDescription?: string;
  roleProfileData?: any;
}

export class AuthService {
  public async register(payload: RegisterPayload): Promise<{ success: boolean; user?: Account; error?: string }> {
    const cleanUsername = payload.username.toLowerCase().replace('@', '').trim();
    const cleanEmail = payload.email.toLowerCase().trim();

    if (accountDb.isUsernameTaken(cleanUsername)) {
      return { success: false, error: 'Username is already taken. Please pick another one.' };
    }

    if (accountDb.isEmailTaken(cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const calculatedName = payload.fullName || payload.displayName || `${payload.firstName || ''} ${payload.lastName || ''}`.trim() || 'New User';
    const names = calculatedName.split(' ');
    const firstName = payload.firstName || names[0] || 'User';
    const lastName = payload.lastName || names.slice(1).join(' ') || '';
    const phoneNum = payload.phone || payload.phoneNumber || '';
    const userCollege = payload.college || 'PSG College of Technology';
    const userLocation = payload.location || 'Coimbatore, Tamil Nadu';

    const newAccount: Account = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      username: cleanUsername,
      email: cleanEmail,
      phoneNumber: phoneNum,
      phone: phoneNum,
      passwordHash: 'sha256:' + payload.password,
      role: payload.role,
      status: 'ACTIVE',
      emailVerified: false,
      phoneVerified: false,
      isVerified: false,
      firstName,
      lastName,
      displayName: calculatedName,
      fullName: calculatedName,
      avatarUrl: payload.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
      coverPhotoUrl: payload.coverPhotoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
      bio: payload.bio || payload.orgDescription || 'New ACE Member eager to explore campus hackathons and competitions.',
      college: userCollege,
      location: userLocation,
      country: 'India',
      state: userLocation.split(',')[1]?.trim() || 'Tamil Nadu',
      city: userLocation.split(',')[0]?.trim() || 'Coimbatore',
      socialLinks: {},
      skills: { verified: [], interested: payload.interestedDomains || ['AI', 'Web Development'] },
      education: [
        {
          id: 'edu_' + Date.now(),
          institution: userCollege,
          degree: payload.degree || 'Undergraduate',
          fieldOfStudy: payload.department || 'Engineering / Science',
          startYear: '2023',
          endYear: '2027',
          current: true,
          isCurrent: true
        }
      ],
      projects: [],
      certificates: [],
      achievements: [],
      roleProfileData: payload.roleProfileData || {
        degree: payload.degree,
        department: payload.department,
        year: payload.year,
        organizationName: payload.organizationName
      },
      privacyPreferences: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showEducation: true,
        allowDirectMessages: true,
        showActivityOnFeed: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      privacy: {
        profileVisibility: 'PUBLIC',
        showEmail: false,
        showPhone: false,
        showCollege: true,
        showLocation: true,
        showSkills: true,
        showProjects: true,
        showEducation: true,
        allowDirectMessages: true,
        showActivityOnFeed: true,
        showGallery: 'PUBLIC',
        showAchievements: true,
        showSocialLinks: true,
        allowFollowers: true
      },
      sessions: [],
      stats: {
        eventsAttended: 0,
        followersCount: 0,
        reputationScore: 500,
        coinsBalance: 500
      },
      followers: [],
      following: [],
      followersCount: 0,
      followingCount: 0,
      pointsEarned: 500,
      profileStrength: 55,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    const created = accountDb.createAccount(newAccount);
    return { success: true, user: created };
  }

  public async login(identifier: string, pass: string): Promise<{ success: boolean; user?: Account; error?: string }> {
    const clean = identifier.trim();
    let account = accountDb.getAccountByUsername(clean);
    if (!account) {
      account = accountDb.getAccountByEmail(clean);
    }

    if (!account) {
      return { success: false, error: 'No account found with this username or email.' };
    }

    if (account.status === 'DEACTIVATED') {
      accountDb.updateAccount(account.id, { status: 'ACTIVE' });
    }

    accountDb.setCurrentUserId(account.id);
    accountDb.updateAccount(account.id, { lastLoginAt: new Date().toISOString() });
    return { success: true, user: accountDb.getAccountById(account.id) };
  }

  public logout() {
    accountDb.setCurrentUserId(null);
  }

  public switchPersona(role: AccountRole): Account {
    const map: Record<AccountRole, string> = {
      STUDENT: 'usr_student_dileep',
      COLLEGE_AMBASSADOR: 'usr_ambassador_priya',
      ORGANIZER: 'usr_organizer_techfest',
      MENTOR: 'usr_mentor_arun',
      COLLEGE: 'usr_college_psg',
      ADMIN: 'usr_admin_ace'
    };

    const targetId = map[role] || 'usr_student_dileep';
    let user = accountDb.getAccountById(targetId);
    if (!user) {
      accountDb.seedInitialData();
      user = accountDb.getAccountById(targetId)!;
    }
    accountDb.setCurrentUserId(user.id);
    return user;
  }

  public updateProfile(userId: string, updates: Partial<Account>): { success: boolean; user?: Account; error?: string } {
    try {
      const updated = accountDb.updateAccount(userId, updates);
      return { success: true, user: updated };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to update profile' };
    }
  }

  public async forgotPassword(email: string): Promise<{ success: boolean; message: string; resetToken?: string; debugToken?: string }> {
    const user = accountDb.getAccountByEmail(email);
    if (!user) {
      return { success: false, message: 'No registered account found with this email address.' };
    }
    const token = 'rst_' + Math.random().toString(36).substring(2, 12);
    accountDb.logAudit(user.id, user.id, 'FORGOT_PASSWORD_REQUESTED', `Password reset token generated: ${token}`);
    return {
      success: true,
      message: 'Password reset link dispatched to your email address.',
      resetToken: token,
      debugToken: token
    };
  }

  public async resetPassword(token: string, newPass: string): Promise<{ success: boolean; message: string; error?: string }> {
    const currentUser = accountDb.getCurrentUser() || accountDb.getAccountById('usr_student_dileep');
    if (!currentUser) return { success: false, message: 'Invalid or expired reset token.', error: 'Invalid reset token' };
    accountDb.updateAccount(currentUser.id, { passwordHash: 'sha256:' + newPass });
    accountDb.logAudit(currentUser.id, currentUser.id, 'PASSWORD_RESET', 'Password successfully reset via token');
    return { success: true, message: 'Password has been successfully reset. You can now login.' };
  }

  public async changePassword(userId: string, oldPass: string, newPass: string): Promise<{ success: boolean; message: string }> {
    const user = accountDb.getAccountById(userId);
    if (!user) return { success: false, message: 'User not found' };
    accountDb.updateAccount(userId, { passwordHash: 'sha256:' + newPass });
    accountDb.logAudit(userId, userId, 'PASSWORD_CHANGED', 'Password successfully updated');
    return { success: true, message: 'Password changed successfully.' };
  }

  public async verifyEmail(userId: string, code: string): Promise<{ success: boolean; message: string }> {
    const user = accountDb.getAccountById(userId);
    if (!user) return { success: false, message: 'User not found' };
    accountDb.updateAccount(userId, { emailVerified: true });
    accountDb.logAudit(userId, userId, 'EMAIL_VERIFIED', `Email verified with code ${code}`);
    return { success: true, message: 'Email successfully verified!' };
  }

  public async verifyPhone(userId: string, code: string): Promise<{ success: boolean; message: string }> {
    const user = accountDb.getAccountById(userId);
    if (!user) return { success: false, message: 'User not found' };
    accountDb.updateAccount(userId, { phoneVerified: true });
    accountDb.logAudit(userId, userId, 'PHONE_VERIFIED', `Phone verified with SMS OTP ${code}`);
    return { success: true, message: 'Phone successfully verified!' };
  }
}

export const authService = new AuthService();
