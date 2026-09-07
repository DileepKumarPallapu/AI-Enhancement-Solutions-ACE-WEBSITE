# ACE Role-Based Access Control (RBAC) & Permissions

## 1. Defined Roles
1. `STUDENT`: Access to Command Center, Passport, Opportunity Radar, Interview Prep, Squads, Wallet.
2. `MENTOR` / `FACULTY`: Mentee assignment management, Action Plans, Session Bookings, Endorsements.
3. `RECRUITER`: Talent search, candidate shortlist, job creation, interview dispatch.
4. `ORGANIZER`: Event creation, ticket management, QR check-in scanner, analytics.
5. `JUDGE`: Restricted submission queue, conflict-of-interest declarations, rubric grading.
6. `ADMIN` / `SUPERADMIN`: Platform settings, moderation queue, user trust state, audit logs.

## 2. Privacy & Data Boundary Policy
- **Student Private Data Boundary**: Recruiter search queries CANNOT access student wallets, private mentor notes, internal disciplinary records, or rejected job applications.
- **Judge Anonymization Boundary**: Submissions can be evaluated in blind review mode where personal identifiers are redacted until scores are finalized.
