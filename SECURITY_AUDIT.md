# Security & Authorization Audit

## 1. Authorization Enforcement
- Client-side and server-side route guards prevent unauthorized access to `/admin/ai-risk` and `/ambassador/event-approvals`.
- All mutation actions (Approve, Request Changes, Reject) require validated role signatures.

## 2. Anti-Spam & Submission Rate Limits
- Throttles excessive submissions from new accounts.
- Sanitizes all rich-text input strings to prevent Cross-Site Scripting (XSS).
