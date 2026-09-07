# ACE API Specifications & Domain Contracts

## 1. REST / RPC Route Inventory

### 1.1 Passport & Identity
- `GET /api/v1/student/passport/:studentId` -> Return full canonical passport
- `GET /api/v1/student/passport/:studentId/export` -> JSON export payload
- `GET /api/v1/verify/passport/:token` -> Public cryptographic verification

### 1.2 Talent Radar & Recruiter
- `GET /api/v1/recruiter/candidates?roleTrack=&minScore=` -> Query verified student pool
- `POST /api/v1/recruiter/jobs` -> Post campus internship / job opening
- `POST /api/v1/recruiter/shortlist` -> Add student to interview queue
- `POST /api/v1/recruiter/interviews` -> Schedule live video interview

### 1.3 AI Interview Simulation
- `GET /api/v1/interview/questions?category=&difficulty=` -> Fetch curated question bank
- `POST /api/v1/interview/sessions` -> Initialize mock interview session
- `POST /api/v1/interview/submit` -> Submit answer and receive AI rubric feedback

### 1.4 Judge Evaluation
- `GET /api/v1/judge/submissions` -> Get assigned hackathon projects
- `POST /api/v1/judge/evaluations` -> Submit official rubric scores
- `POST /api/v1/judge/conflicts` -> Declare conflict of interest and reassign

### 1.5 Trust & Safety
- `POST /api/v1/reports` -> File moderation ticket
- `GET /api/v1/reports` -> List moderation queue
- `POST /api/v1/appeals` -> File appeal against action
