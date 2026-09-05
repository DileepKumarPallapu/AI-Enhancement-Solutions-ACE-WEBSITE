# ACE AI Event Trust Engine & Verification Architecture

## 1. Overview
The **ACE Event Trust Engine** is a deterministic multi-signal verification system combining heuristic checks, OCR poster extraction, domain validation, duplicate indexing, and risk scoring to safeguard students against fraudulent listings.

## 2. Multi-Signal Scoring Breakdown
Every submitted event is audited across 5 core dimensions to produce a **Trust Score (0–100)**:

$$\text{Trust Score} = 0.25 \times S_{\text{organizer}} + 0.25 \times S_{\text{college}} + 0.20 \times S_{\text{content}} + 0.15 \times S_{\text{reg}} + 0.15 \times S_{\text{poster}} - \text{Penalty}_{\text{dup}}$$

| Dimension | Weights | Verification Checks |
| :--- | :--- | :--- |
| **Organizer Identity** | 25% | Contact phone verification, email domain validation, historical approval rate |
| **College Registry** | 25% | Accredited university registry matching, campus ambassador mapping |
| **Content Quality** | 20% | Minimum title/description lengths, agenda completeness, eligibility rules |
| **Registration URL** | 15% | HTTPS protocol enforcement, domain trust scoring, phishing pattern guard |
| **Poster OCR Match** | 15% | Extracted dates/venues matched against form values (flags discrepancies) |

---

## 3. Human-in-the-Loop Principle
- **AI = Risk Assessment & Signal Aggregator**
- **Human (Ambassador / Admin) = Final Moderation Authority**
- Events flagged as `HIGH` or `CRITICAL` risk are blocked from auto-advancing and routed to the **Admin AI Risk Center**.
