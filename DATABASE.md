# ACE Database Architecture & Data Dictionary

## 1. Overview
The ACE platform employs an explicit, type-safe schema architecture. Every entity is backed by canonical data contracts, unique UUID/prefix identifiers (`usr_`, `evt_`, `pass_`, `job_`, `rep_`), and cryptographic checksum verification.

## 2. Entity Schemas

### 2.1 StudentPassport (`studentPassportDatabase`)
- `passportId`: string (Primary Key)
- `studentId`: string (Foreign Key -> User.id)
- `canonicalAceId`: string (Unique ACE Identity, e.g. `ACE-VTU-2026-9482`)
- `primaryIdentity`: Object (Full Name, Avatar, College, Department, Program, Tier)
- `verifiedSkills`: Array<{ skillName, category, level, assessmentScore, verifiedByInstitution }>
- `proofOfWorkProjects`: Array<{ projectId, title, role, mentorScore, demoUrl, githubUrl }>
- `competitionsAndHackathons`: Array<{ competitionId, title, rank, award, verifiedDate }>
- `certificates`: Array<{ credentialId, title, issuer, issueDate, verificationUrl }>
- `mentorshipRecords`: Array<{ mentorId, mentorName, sessionsCompleted, endorsementBadge }>
- `reputationIndex`: Object<{ trustScore: number, globalRank: number, totalCoinsEarned: number }>
- `metadata`: Object<{ generatedAt: ISO8601, checksum: SHA256 }>

### 2.2 Recruiter & Talent Radar (`recruiterDatabase`)
- `RecruiterProfile`: `recruiterId`, `companyId`, `fullName`, `corporateEmail`, `verifiedStatus`
- `JobPosting`: `jobId`, `companyId`, `title`, `department`, `salaryRange`, `skillsRequired`
- `CandidateProfile`: Candidate snapshot filtered by privacy settings (`isProfilePublicToRecruiters`)
- `InterviewSchedule`: `interviewId`, `recruiterId`, `studentId`, `scheduledDate`, `meetingUrl`

### 2.3 Judge & Evaluation Engine (`judgeDatabase`)
- `JudgeProfile`: `judgeId`, `fullName`, `specialization`, `assignedCompetitions`
- `AssignedSubmission`: `submissionId`, `competitionId`, `projectTitle`, `isEvaluated`
- `RubricEvaluation`: `technicalExecution` (30), `innovation` (30), `presentation` (20), `viability` (20)
- `ConflictDeclaration`: `declarationId`, `judgeId`, `submissionId`, `reason`

### 2.4 Trust, Moderation & Reports (`trustAndReportsDatabase`)
- `ModerationReport`: `reportId`, `reporterId`, `targetType`, `category`, `status`, `evidenceUrl`
- `TrustState`: Enum (`UNVERIFIED`, `PENDING`, `VERIFIED`, `REJECTED`, `SUSPENDED`)
- `AppealRecord`: `appealId`, `reportId`, `appellantId`, `justification`, `status`
