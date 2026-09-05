# Multi-Level Event Submission & Approval Workflow Audit

## 1. Executive Summary
AllCollegeEvent enforces a strict, multi-stage approval pipeline. **Anyone can submit an event, but only events with complete verification become publicly visible.**

```mermaid
graph TD
    Submitter([Student / Faculty / Club]) -->|Submits Event| SubmissionEngine[Event Submission Pipeline]
    SubmissionEngine -->|Status: PENDING_COLLEGE_AMBASSADOR| AmbassadorQueue[College Ambassador Review]
    
    AmbassadorQueue -->|Request Changes| SubmitterNotif[Notify Submitter - Same Form Reopens]
    SubmitterNotif -->|Resubmit| AmbassadorQueue
    AmbassadorQueue -->|Approve| AdminQueue[ACE Super Admin Review]
    
    AdminQueue -->|Request Changes| SubmitterNotif
    AdminQueue -->|Approve| OrgConfirmCheck{Submitted on Behalf?}
    
    OrgConfirmCheck -->|Yes| OrgQueue[Organizer Confirmation]
    OrgConfirmCheck -->|No| FinalPub[FINAL_APPROVED & PUBLISHED]
    
    OrgQueue -->|Confirm| FinalPub
    OrgQueue -->|Request Changes| SubmitterNotif
    
    FinalPub --> LivePublic[Visible on Homepage, Explorer & Search]
```

---

## 2. Detailed Status Transitions

| Status | Trigger Event | Next Permitted Roles | Public Visibility |
| :--- | :--- | :--- | :--- |
| `DRAFT` | User saves draft | Submitter | ❌ Private |
| `PENDING_COLLEGE_AMBASSADOR` | User submits event | Campus Ambassador | ❌ Private |
| `CHANGES_REQUESTED_BY_AMBASSADOR` | Ambassador flags fields | Original Submitter | ❌ Private |
| `COLLEGE_AMBASSADOR_APPROVED` | Ambassador approves | ACE Super Admin | ❌ Private |
| `PENDING_ACE_ADMIN` | Forwarded to Admin | ACE Super Admin | ❌ Private |
| `CHANGES_REQUESTED_BY_ADMIN` | Admin flags fields | Original Submitter | ❌ Private |
| `ACE_ADMIN_APPROVED` | Admin approves | System / Organizer | ❌ Private |
| `PENDING_ORGANIZER_CONFIRMATION`| Sent for org confirmation | Organizer | ❌ Private |
| `CHANGES_REQUESTED_BY_ORGANIZER`| Org flags fields | Original Submitter | ❌ Private |
| `FINAL_APPROVED` | All approvals cleared | System Dispatcher | ❌ Transient |
| `PUBLISHED` | Live deployment | All Users / Search | ✅ **100% Public** |
| `REJECTED` | Reviewer rejects listing | None (Archived) | ❌ Private |

---

## 3. The "Same Form" Resubmission Rule
When changes are requested by an Ambassador, Admin, or Organizer:
1. Submitter is notified with the exact comments and flagged fields.
2. Clicking **[Update Event]** opens the **identical 8-step form** with all previously entered fields pre-populated.
3. Flagged fields are badged with `⚠ Update Required`.
4. After editing, submitter clicks **[Resubmit for Verification]** and the event returns directly to the reviewing stage without restarting the entire workflow.

---

## 4. Security & Access Control
- **Server-Side Filtering**: Only events with `status === 'PUBLISHED'` are returned by public discovery endpoints.
- **Zero Client Bypass**: No client request can update `status` to `PUBLISHED` without passing validation:
  `collegeApproval === 'APPROVED' && adminApproval === 'APPROVED' && organizerConfirmation === 'CONFIRMED'`
