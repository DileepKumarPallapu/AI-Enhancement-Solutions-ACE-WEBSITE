# All College Events (ACE) — Platform Architecture & System Design

## 1. Executive Summary
All College Events (ACE) is a next-generation multi-sided Student Opportunity & Career Ecosystem. The platform unifies identity verification, discovery, structured skill learning, hackathon competitions, peer engineering squads, mentor networks, and recruiter hiring pipelines into a cohesive, cryptographically verifiable architecture.

## 2. Core Architectural Pillars
```
+-----------------------------------------------------------------------------------+
|                              PRESENTATION LAYER                                   |
|  React 18 + TypeScript SPA | Tailwind CSS | Vite | Responsive Multi-Role Layouts   |
|  - Student Command Center (/student/command-center)                               |
|  - Verifiable Digital Passport (/student/passport)                                |
|  - Recruiter Talent Radar (/recruiter)                                            |
|  - AI Interview Lab (/career/interview)                                           |
|  - Project Lab & Incubator (/project-lab)                                         |
|  - Restricted Judge Evaluation Terminal (/judge)                                  |
|  - Trust, Safety & Reports (/reports)                                             |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        APPLICATION & BUSINESS LOGIC LAYER                         |
|  - Authentication & RBAC Service (6 distinct platform roles)                      |
|  - Opportunity Intelligence Engine (Role Track & Skill Matching)                  |
|  - AI Interview Evaluator & Rubric Scoring Engine                                 |
|  - Platform Domain Event Bus (Typed Event Pub/Sub Pipeline)                       |
|  - Multi-Currency & Tokenomics Engine (100 ACE Coins = ₹1 INR Reference Rule)       |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                         DATA PERSISTENCE & STORAGE LAYER                          |
|  - Canonical Database Modules with Synchronous LocalStorage & In-Memory Fallback  |
|  - Indexed Storage for Event Approvals, Mentorship, Passports, Recruiters, Judges |
|  - Cryptographic Verification & Tamper-Proof Checksum Validation                  |
+-----------------------------------------------------------------------------------+
```

## 3. Platform Domain Event Pipeline
The `platformEventBus` decouples subsystems via high-throughput domain events:
- `UserCreated` / `ProfileUpdated`
- `EventPublished` / `EventRegistered` / `EventApproved`
- `CertificateIssued` / `SkillVerified`
- `WalletTransactionCreated` / `CoinBalanceUpdated`
- `InterviewCompleted` / `SubmissionEvaluated`
- `ModerationReportFiled`

## 4. Multi-Tenant Institution Isolation
Institutions (e.g. *Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology*) maintain dedicated scopes for:
- Student Identity & Department Rosters
- Faculty Mentor Networks & Endorsements
- Institution-Exclusive Contests & Hackathons
- Campus Placement Drives & Recruiter Partnerships
