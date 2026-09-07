import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { MentorProvider } from './context/MentorContext';
import { ToastProvider } from './context/ToastContext';
import { WorkflowProvider } from './context/WorkflowContext';
import { ManagementProvider } from './context/ManagementContext';
import { LearnPlayProvider } from './context/LearnPlayContext';
import { ArcadeProvider } from './context/ArcadeContext';
import { CompetitionProvider } from './context/CompetitionContext';

// Layout & Common
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AceAiAssistant } from './components/ai/AceAiAssistant';
import { RequireRole } from './components/auth/RequireRole';

// Public Pages
import { HomePage } from './pages/HomePage';
import { EventsExplorerPage } from './pages/EventsExplorerPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { HackathonsPage } from './pages/HackathonsPage';
import { ForYouPage } from './pages/ForYouPage';
import { SearchPage } from './pages/SearchPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ProjectShowcasePage } from './pages/ProjectShowcasePage';
import { PresentationDemoPage } from './pages/PresentationDemoPage';
import { BlogPage } from './pages/BlogPage';
import { CollegesPage } from './pages/CollegesPage';
import { CommunityPage } from './pages/community/CommunityPage';
import { ReferralPage } from './pages/ReferralPage';
import { RewardsPage } from './pages/RewardsPage';
import { ContestsPage } from './pages/ContestsPage';

// Public Mentor Pages
import { MentorsLandingPage } from './pages/mentors/MentorsLandingPage';
import { MentorPublicProfilePage } from './pages/mentors/MentorPublicProfilePage';
import { BecomeMentorPage } from './pages/mentors/BecomeMentorPage';

// Student Workspace Mentor Pages
import { StudentFindMentorPage } from './pages/student/mentor/StudentFindMentorPage';
import { StudentMentorDashboardPage } from './pages/student/mentor/StudentMentorDashboardPage';
import { StudentMentorSessionsPage } from './pages/student/mentor/StudentMentorSessionsPage';
import { StudentMentorGoalsPage } from './pages/student/mentor/StudentMentorGoalsPage';
import { StudentMentorMessagesPage } from './pages/student/mentor/StudentMentorMessagesPage';

// Mentor Dedicated Workspace Pages
import { MentorDashboardPage } from './pages/mentor/MentorDashboardPage';
import { MentorStudentListPage } from './pages/mentor/MentorStudentListPage';
import { MentorStudentDossierPage } from './pages/mentor/MentorStudentDossierPage';
import { MentorSessionsPage } from './pages/mentor/MentorSessionsPage';
import { MentorCalendarPage } from './pages/mentor/MentorCalendarPage';
import { MentorMessagesPage } from './pages/mentor/MentorMessagesPage';
import { MentorEventGuidancePage } from './pages/mentor/MentorEventGuidancePage';
import { MentorLearningGuidancePage } from './pages/mentor/MentorLearningGuidancePage';
import { MentorAnalyticsPage } from './pages/mentor/MentorAnalyticsPage';

// College & Admin Mentor Pages
import { CollegeMentorsPage } from './pages/college/CollegeMentorsPage';
import { AdminMentorsPage } from './pages/admin/AdminMentorsPage';

// Competitions System
import { CompetitionsHubPage } from './pages/competitions/CompetitionsHubPage';
import { CompetitionDetailPage } from './pages/competitions/CompetitionDetailPage';
import { CompetitionRoomPage } from './pages/competitions/CompetitionRoomPage';
import { CompetitionResultsPage } from './pages/competitions/CompetitionResultsPage';

// AI 2.0 Course Recommendations & Intelligence
import { PersonalizedLearningPathPage } from './pages/ai/PersonalizedLearningPathPage';
import { AdminCourseIntelligencePage } from './pages/admin/AdminCourseIntelligencePage';

// Coding & Learning Pages
import { CodingHomePage } from './pages/coding/CodingHomePage';
import { CodingProblemPage } from './pages/coding/CodingProblemPage';
import { CodingGamesPage } from './pages/coding/CodingGamesPage';
import { CodingHistoryPage } from './pages/coding/CodingHistoryPage';
import { LearningHubPage } from './pages/learning/LearningHubPage';
import { LearnPlayDashboardPage } from './pages/learnplay/LearnPlayDashboardPage';
import { DailyMissionsPage } from './pages/learnplay/DailyMissionsPage';
import { MicroTasksPage } from './pages/learnplay/MicroTasksPage';
import { SkillTreePage } from './pages/learnplay/SkillTreePage';
import { GameLauncherPage } from './pages/coding/games/GameLauncherPage';

// Student Workspace Pages
import { StudentPortalPage } from './pages/StudentPortalPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { StudentCareerPage } from './pages/student/StudentCareerPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { ResumeBuilderPage } from './pages/student/ResumeBuilderPage';
import { StudentWalletPage } from './pages/student/StudentWalletPage';
import { StudentWalletHistoryPage } from './pages/student/StudentWalletHistoryPage';
import { StudentRewardsPage } from './pages/student/StudentRewardsPage';
import { PlayAndEarnPage } from './pages/student/PlayAndEarnPage';
import { StudentSkillsPage } from './pages/student/StudentSkillsPage';
import { StudentAnalyticsPage } from './pages/student/StudentAnalyticsPage';
import { StudentAchievementsPage } from './pages/student/StudentAchievementsPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentEventsPage } from './pages/student/StudentEventsPage';
import { StudentCompetitionsPage } from './pages/student/StudentCompetitionsPage';
import { StudentWinsPage } from './pages/student/StudentWinsPage';
import { MySubmissionsPage } from './pages/MySubmissionsPage';

// Organizer Workspace Pages
import { OrganizerDashboardPage } from './pages/OrganizerDashboardPage';
import { OrganizerAiToolsPage } from './pages/OrganizerAiToolsPage';
import { SubmitEventPage } from './pages/SubmitEventPage';

// Campus Ambassador Workspace Pages
import { AmbassadorDashboardPage } from './pages/ambassador/AmbassadorDashboardPage';
import { AmbassadorCampaignsPage } from './pages/ambassador/AmbassadorCampaignsPage';
import { AmbassadorStudentsPage } from './pages/ambassador/AmbassadorStudentsPage';
import { AmbassadorTasksPage } from './pages/ambassador/AmbassadorTasksPage';
import { AmbassadorApprovalsPage } from './pages/AmbassadorApprovalsPage';
import { AmbassadorPage } from './pages/AmbassadorPage';

// College Institutional Workspace Pages
import { CollegePortalPage } from './pages/college/CollegePortalPage';

// ACE Admin Control Center Pages
import { AdminAiRiskCenterPage } from './pages/AdminAiRiskCenterPage';
import { AdminEventApprovalsPage } from './pages/AdminEventApprovalsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminCoinEconomyPage } from './pages/admin/AdminCoinEconomyPage';
import { SupportCenterPage } from './pages/support/SupportCenterPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterWizardPage } from './pages/auth/RegisterWizardPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { VerifyPhonePage } from './pages/auth/VerifyPhonePage';

// Profile Pages
import { PublicProfilePage } from './pages/profile/PublicProfilePage';
import { ProfileGalleryPage } from './pages/profile/ProfileGalleryPage';
import { EditProfilePage } from './pages/profile/EditProfilePage';

// Settings Pages Suite
import { SettingsLayout } from './pages/settings/SettingsLayout';
import { SettingsHubPage } from './pages/settings/SettingsHubPage';
import { ProfileSettingsPage } from './pages/settings/ProfileSettingsPage';
import { PhotoManagementPage } from './pages/settings/PhotoManagementPage';
import { SecuritySettingsPage } from './pages/settings/SecuritySettingsPage';
import { PrivacySettingsPage } from './pages/settings/PrivacySettingsPage';
import { DangerZonePage } from './pages/settings/DangerZonePage';

// Feature Directory & Error Pages
import { ExploreDirectoryPage } from './pages/ExploreDirectoryPage';
import { NotFoundPage, ForbiddenPage } from './pages/ErrorPages';

// Static & Utility Pages
import { EventComparisonPage } from './pages/EventComparisonPage';
import { LocationPage } from './pages/LocationPage';
import { AboutPage, ContactPage, FaqPage, PrivacyPage } from './pages/StaticPages';

export function App() {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  return (
    <AppProvider>
      <AuthProvider>
        <MentorProvider>
          <ToastProvider>
            <WorkflowProvider>
              <ManagementProvider>
                <LearnPlayProvider>
                  <ArcadeProvider>
                    <CompetitionProvider>
                      <Router>
                        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
                          <Navbar onOpenAiChat={() => setIsAiDrawerOpen(true)} />

                          <main className="flex-1">
                            <Routes>
                              {/* Public Discovery */}
                              <Route path="/" element={<HomePage onOpenAiAssistant={() => setIsAiDrawerOpen(true)} />} />
                              <Route path="/events" element={<EventsExplorerPage />} />
                              <Route path="/events/:slug" element={<EventDetailPage />} />
                              <Route path="/hackathons" element={<HackathonsPage />} />
                              <Route path="/for-you" element={<ForYouPage />} />
                              <Route path="/search" element={<SearchPage />} />
                              <Route path="/certificates" element={<CertificatesPage />} />
                              <Route path="/verify-certificate/:id" element={<CertificatesPage />} />
                              <Route path="/project-showcase" element={<ProjectShowcasePage />} />
                              <Route path="/project-showcase/demo" element={<PresentationDemoPage />} />
                              <Route path="/blog" element={<BlogPage />} />
                              <Route path="/colleges" element={<CollegesPage />} />
                              <Route path="/community" element={<CommunityPage />} />
                              <Route path="/referral" element={<ReferralPage />} />
                              <Route path="/rewards" element={<RewardsPage />} />
                              <Route path="/rewards/vouchers" element={<RewardsPage />} />
                              <Route path="/contest" element={<ContestsPage />} />
                              <Route path="/contests" element={<ContestsPage />} />

                              {/* Public Mentor Ecosystem */}
                              <Route path="/mentors" element={<MentorsLandingPage />} />
                              <Route path="/mentor/:username" element={<MentorPublicProfilePage />} />
                              <Route path="/become-mentor" element={<BecomeMentorPage />} />

                              {/* Student Workspace Mentor Routes */}
                              <Route path="/student/mentors" element={<StudentFindMentorPage />} />
                              <Route path="/student/mentor" element={<StudentMentorDashboardPage />} />
                              <Route path="/student/mentor/sessions" element={<StudentMentorSessionsPage />} />
                              <Route path="/student/mentor/goals" element={<StudentMentorGoalsPage />} />
                              <Route path="/student/mentor/messages" element={<StudentMentorMessagesPage />} />

                              {/* Mentor Dedicated Workspace Routes */}
                              <Route path="/mentor" element={<RequireRole allowedRoles={['MENTOR']}><MentorDashboardPage /></RequireRole>} />
                              <Route path="/mentor/dashboard" element={<RequireRole allowedRoles={['MENTOR']}><MentorDashboardPage /></RequireRole>} />
                              <Route path="/mentor/students" element={<RequireRole allowedRoles={['MENTOR']}><MentorStudentListPage /></RequireRole>} />
                              <Route path="/mentor/students/:studentId" element={<RequireRole allowedRoles={['MENTOR']}><MentorStudentDossierPage /></RequireRole>} />
                              <Route path="/mentor/sessions" element={<RequireRole allowedRoles={['MENTOR']}><MentorSessionsPage /></RequireRole>} />
                              <Route path="/mentor/calendar" element={<RequireRole allowedRoles={['MENTOR']}><MentorCalendarPage /></RequireRole>} />
                              <Route path="/mentor/messages" element={<RequireRole allowedRoles={['MENTOR']}><MentorMessagesPage /></RequireRole>} />
                              <Route path="/mentor/events" element={<RequireRole allowedRoles={['MENTOR']}><MentorEventGuidancePage /></RequireRole>} />
                              <Route path="/mentor/learning" element={<RequireRole allowedRoles={['MENTOR']}><MentorLearningGuidancePage /></RequireRole>} />
                              <Route path="/mentor/analytics" element={<RequireRole allowedRoles={['MENTOR']}><MentorAnalyticsPage /></RequireRole>} />

                              {/* College & Admin Mentor Management */}
                              <Route path="/college/mentors" element={<CollegeMentorsPage />} />
                              <Route path="/admin/mentors" element={<AdminMentorsPage />} />

                              {/* Competitions Hub & Online Rooms */}
                              <Route path="/competitions" element={<CompetitionsHubPage />} />
                              <Route path="/competitions/:id" element={<CompetitionDetailPage />} />
                              <Route path="/competitions/:id/room" element={<CompetitionRoomPage />} />
                              <Route path="/competitions/:id/results" element={<CompetitionResultsPage />} />

                              {/* Coding & Learning Hub */}
                              <Route path="/coding" element={<CodingHomePage onOpenAiChat={() => setIsAiDrawerOpen(true)} />} />
                              <Route path="/coding/practice" element={<CodingProblemPage />} />
                              <Route path="/coding/practice/:id" element={<CodingProblemPage />} />
                              <Route path="/coding/games" element={<CodingGamesPage />} />
                              <Route path="/coding/history" element={<CodingHistoryPage />} />
                              <Route path="/coding/contests" element={<ContestsPage />} />
                              <Route path="/coding/leaderboard" element={<AmbassadorPage />} />
                              <Route path="/learn" element={<LearningHubPage />} />
                              <Route path="/learn/:pathId" element={<LearningHubPage />} />

                              {/* Learn & Play Ecosystem */}
                              <Route path="/learn-play" element={<LearnPlayDashboardPage />} />
                              <Route path="/learn-play/daily" element={<DailyMissionsPage />} />
                              <Route path="/learn-play/tasks" element={<MicroTasksPage />} />
                              <Route path="/learn-play/skill-tree" element={<SkillTreePage />} />
                              <Route path="/learn-play/paths" element={<LearningHubPage />} />
                              <Route path="/coding/games/:gameId" element={<GameLauncherPage />} />

                              {/* Student Workspace, Competitions & Wallet */}
                              <Route path="/student" element={<StudentPortalPage onOpenAiChat={() => setIsAiDrawerOpen(true)} />} />
                              <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                              <Route path="/dashboard" element={<StudentDashboardPage />} />
                              <Route path="/dashboard/profile" element={<StudentProfilePage />} />
                              <Route path="/student/career" element={<StudentCareerPage />} />
                              <Route path="/student/applications" element={<StudentCareerPage />} />
                              <Route path="/student/saved" element={<StudentDashboardPage />} />
                              <Route path="/student/projects" element={<StudentProfilePage />} />
                              <Route path="/student/resume" element={<ResumeBuilderPage />} />
                              <Route path="/student/wallet" element={<StudentWalletPage />} />
                              <Route path="/student/wallet/history" element={<StudentWalletHistoryPage />} />
                              <Route path="/student/wallet/rewards" element={<StudentRewardsPage />} />
                              <Route path="/student/rewards" element={<StudentRewardsPage />} />
                              <Route path="/student/rewards/history" element={<StudentWalletHistoryPage />} />
                              <Route path="/student/play-earn" element={<PlayAndEarnPage />} />
                              <Route path="/student/earn" element={<PlayAndEarnPage />} />
                              <Route path="/student/skills" element={<StudentSkillsPage />} />
                              <Route path="/student/analytics" element={<StudentAnalyticsPage />} />
                              <Route path="/student/achievements" element={<StudentAchievementsPage />} />
                              <Route path="/student/notifications" element={<StudentNotificationsPage />} />
                              <Route path="/student/events" element={<StudentEventsPage />} />
                              <Route path="/student/competitions" element={<StudentCompetitionsPage />} />
                              <Route path="/student/wins" element={<StudentWinsPage />} />
                              <Route path="/ai/recommendations" element={<PersonalizedLearningPathPage />} />
                              <Route path="/ai/learning-path" element={<PersonalizedLearningPathPage />} />
                              <Route path="/student/learning-recommendations" element={<PersonalizedLearningPathPage />} />
                              <Route path="/student/ai-learning" element={<PersonalizedLearningPathPage />} />
                              <Route path="/my-submissions" element={<MySubmissionsPage />} />

                              {/* Organizer Workspace */}
                              <Route path="/organizer" element={<RequireRole allowedRoles={['ORGANIZER']}><OrganizerDashboardPage /></RequireRole>} />
                              <Route path="/organizer/dashboard" element={<RequireRole allowedRoles={['ORGANIZER']}><OrganizerDashboardPage /></RequireRole>} />
                              <Route path="/organizer/create" element={<RequireRole allowedRoles={['ORGANIZER']}><SubmitEventPage /></RequireRole>} />
                              <Route path="/organizer/ai-tools" element={<RequireRole allowedRoles={['ORGANIZER']}><OrganizerAiToolsPage /></RequireRole>} />
                              <Route path="/submit-event" element={<SubmitEventPage />} />
                              <Route path="/submit-event/:id" element={<SubmitEventPage />} />
                              <Route path="/create-event" element={<SubmitEventPage />} />

                              {/* Campus Ambassador Workspace */}
                              <Route path="/ambassador" element={<RequireRole allowedRoles={['COLLEGE_AMBASSADOR']}><AmbassadorDashboardPage /></RequireRole>} />
                              <Route path="/ambassador/dashboard" element={<RequireRole allowedRoles={['COLLEGE_AMBASSADOR']}><AmbassadorDashboardPage /></RequireRole>} />
                              <Route path="/ambassador/campaigns" element={<RequireRole allowedRoles={['COLLEGE_AMBASSADOR']}><AmbassadorCampaignsPage /></RequireRole>} />
                              <Route path="/ambassador/students" element={<RequireRole allowedRoles={['COLLEGE_AMBASSADOR']}><AmbassadorStudentsPage /></RequireRole>} />
                              <Route path="/ambassador/tasks" element={<RequireRole allowedRoles={['COLLEGE_AMBASSADOR']}><AmbassadorTasksPage /></RequireRole>} />
                              <Route path="/campus-ambassador" element={<AmbassadorPage />} />
                              <Route path="/ambassador/event-approvals" element={<RequireRole allowedRoles={['COLLEGE_AMBASSADOR']}><AmbassadorApprovalsPage /></RequireRole>} />
                              <Route path="/ambassador/event-approvals/:id" element={<RequireRole allowedRoles={['COLLEGE_AMBASSADOR']}><AmbassadorApprovalsPage /></RequireRole>} />

                              {/* College Institutional Workspace */}
                              <Route path="/college" element={<RequireRole allowedRoles={['COLLEGE']}><CollegePortalPage /></RequireRole>} />
                              <Route path="/college/dashboard" element={<RequireRole allowedRoles={['COLLEGE']}><CollegePortalPage /></RequireRole>} />

                              {/* ACE Super Admin Workspace */}
                              <Route path="/admin" element={<RequireRole allowedRoles={['ADMIN']}><AdminAiRiskCenterPage /></RequireRole>} />
                              <Route path="/admin/ai-risk" element={<RequireRole allowedRoles={['ADMIN']}><AdminAiRiskCenterPage /></RequireRole>} />
                              <Route path="/admin/event-approvals" element={<RequireRole allowedRoles={['ADMIN']}><AdminEventApprovalsPage /></RequireRole>} />
                              <Route path="/admin/moderation" element={<RequireRole allowedRoles={['ADMIN']}><AdminEventApprovalsPage /></RequireRole>} />
                              <Route path="/admin/audit-logs" element={<RequireRole allowedRoles={['ADMIN']}><AdminAuditLogsPage /></RequireRole>} />
                              <Route path="/admin/reports" element={<RequireRole allowedRoles={['ADMIN']}><AdminReportsPage /></RequireRole>} />
                              <Route path="/admin/settings/coin-economy" element={<RequireRole allowedRoles={['ADMIN']}><AdminCoinEconomyPage /></RequireRole>} />
                              <Route path="/admin/coin-economy" element={<RequireRole allowedRoles={['ADMIN']}><AdminCoinEconomyPage /></RequireRole>} />
                              <Route path="/admin/rewards" element={<RequireRole allowedRoles={['ADMIN']}><AdminCoinEconomyPage /></RequireRole>} />
                              <Route path="/admin/course-intelligence" element={<RequireRole allowedRoles={['ADMIN']}><AdminCourseIntelligencePage /></RequireRole>} />
                              <Route path="/admin/ai/intelligence" element={<RequireRole allowedRoles={['ADMIN']}><AdminCourseIntelligencePage /></RequireRole>} />

                              {/* Support Center */}
                              <Route path="/support" element={<SupportCenterPage />} />

                              {/* Authentication Ecosystem */}
                              <Route path="/login" element={<LoginPage />} />
                              <Route path="/auth/login" element={<LoginPage />} />
                              <Route path="/register" element={<RegisterWizardPage />} />
                              <Route path="/auth/register" element={<RegisterWizardPage />} />
                              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                              <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                              <Route path="/reset-password" element={<ResetPasswordPage />} />
                              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
                              <Route path="/verify-email" element={<VerifyEmailPage />} />
                              <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
                              <Route path="/verify-phone" element={<VerifyPhonePage />} />
                              <Route path="/auth/verify-phone" element={<VerifyPhonePage />} />

                              {/* Live Public & Self Profile Ecosystem */}
                              <Route path="/profile" element={<PublicProfilePage />} />
                              <Route path="/profile/edit" element={<EditProfilePage />} />
                              <Route path="/profile/:username" element={<PublicProfilePage />} />
                              <Route path="/u/:username" element={<PublicProfilePage />} />
                              <Route path="/profile/gallery" element={<ProfileGalleryPage />} />
                              <Route path="/profile/:username/gallery" element={<ProfileGalleryPage />} />

                              {/* Account Settings Suite */}
                              <Route path="/settings" element={<SettingsLayout />}>
                                <Route index element={<SettingsHubPage />} />
                                <Route path="profile" element={<ProfileSettingsPage />} />
                                <Route path="photos" element={<PhotoManagementPage />} />
                                <Route path="security" element={<SecuritySettingsPage />} />
                                <Route path="privacy" element={<PrivacySettingsPage />} />
                                <Route path="danger-zone" element={<DangerZonePage />} />
                              </Route>

                              {/* Master Feature Directory & Error Routes */}
                              <Route path="/explore" element={<ExploreDirectoryPage />} />
                              <Route path="/all-features" element={<ExploreDirectoryPage />} />
                              <Route path="/forbidden" element={<ForbiddenPage />} />

                              {/* Static & Location Utilities */}
                              <Route path="/compare" element={<EventComparisonPage />} />
                              <Route path="/location/:city" element={<LocationPage />} />
                              <Route path="/locations/:country/:city" element={<LocationPage />} />
                              <Route path="/about" element={<AboutPage />} />
                              <Route path="/contact" element={<ContactPage />} />
                              <Route path="/faq" element={<FaqPage />} />
                              <Route path="/privacy" element={<PrivacyPage />} />

                              {/* Catch-all 404 handler */}
                              <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                          </main>

                          <Footer />
                          <AceAiAssistant isOpen={isAiDrawerOpen} onClose={() => setIsAiDrawerOpen(false)} />
                        </div>
                      </Router>
                    </CompetitionProvider>
                  </ArcadeProvider>
                </LearnPlayProvider>
              </ManagementProvider>
            </WorkflowProvider>
          </ToastProvider>
        </MentorProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
