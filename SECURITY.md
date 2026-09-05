# Security & Compliance Guide

## Core Principles
1. **Secret Isolation**: Never store API secrets or private tokens in client bundles.
2. **RBAC Protection**: Strict role checks for `USER`, `ORGANIZER`, `AMBASSADOR`, and `ADMIN`.
3. **Data Sanitization**: All rich text HTML descriptions are sanitized before rendering.
4. **Abuse Mitigation**: Anti-spam validation on referral invite loops and automated rate limits.
5. **Environment Configuration**: Documented via `.env.example`.
