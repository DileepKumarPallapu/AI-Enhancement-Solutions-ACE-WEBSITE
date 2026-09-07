# ACE Security, Cryptography & Platform Hardening

## 1. Cryptographic Verifications
- Every Student Passport, Certificate, and Official Submission generates a tamper-proof SHA-256 integrity hash.
- Verification URLs allow any employer or university to validate certificates without authentication.

## 2. Defenses Against Common Web Vulnerabilities
- **XSS Prevention**: All user inputs sanitized before rendering; strict React JSX escaping.
- **CSRF Protection**: SameSite cookie policies and double-submit bearer tokens.
- **Rate Limiting**: Tiered token bucket rate limiting on authentication and AI evaluation endpoints.
- **SQL / Injection Defense**: Parametric queries and typed schema validation.
