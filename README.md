# AllCollegeEvent (ACE) — 2026/2027 AI-Powered Student Opportunity Ecosystem

## Overview
AllCollegeEvent (ACE) is India's premier AI-driven college opportunity ecosystem connecting students with verified technical symposiums, hackathons, workshops, research conferences, cultural fests, contests, and internships.

---

## 🚀 Key Modernization Highlights & Features

1. **Brand & Design System**:
   - Signature ACE brand aesthetic (`#7F00FF` primary violet, subtle gradients, translucent glassmorphism).
   - Responsive on all devices (320px to 1920px) with desktop 3-pane discovery and mobile bottom sheets.

2. **Personalized AI Discovery Feed**:
   - "Discover Events That Move Your Future" Hero with natural-language query parser.
   - Profile-aware recommendation engine ranking events based on student department, skills, and city.
   - Active 👍 Relevant / 👎 Not interested feedback buttons that refine the student feed in real time.

3. **ACE AI Opportunity Assistant ("Ask Zuzu / ACE AI")**:
   - Floating intelligent drawer grounded in real loaded event data.
   - Quick prompt pills for beginner hackathons, free workshops, certificates, and referral perks.

4. **Refer & Earn Dashboard (`/referral`)**:
   - Preserves user code `ACE-05648B7B` and real invite ledger (Sent, Delivered, Pending, Failed).
   - Multi-email invitation input with instant point crediting (+10 Points per referral).

5. **9-Step Event Creation Wizard & AI Content Assistant**:
   - Step-by-step organizer publishing flow with autosave and live validation.
   - 1-click AI copywriter for SEO descriptions, highlights, and tags.
   - 0–100 Event Quality Verification Scorer.

6. **Student Opportunity Center (`/dashboard`) & Profile (`/dashboard/profile`)**:
   - Matches active profile `Pallapu Dileep Kumar` (Verified student, 80% gauge, CSE @ Hindustan Institute of Technology).
   - Dedicated Event Calendar with Google Calendar export.

---

## 🛠 Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend Integration**: Connected to `https://api.allcollegeeventz.com/api` with offline-first fallback
- **State Management**: React Context with LocalStorage persistence

---

## 📦 Getting Started & Running Locally

```bash
# 1. Navigate to the project
cd allcollegeevent

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🏗 Production Build

```bash
npm run build
npm run preview
```
