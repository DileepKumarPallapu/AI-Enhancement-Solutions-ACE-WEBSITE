# Role-Based Access Control (RBAC) Permission Matrix

| Capability / Route | Student (`USER`) | Event Organizer | Campus Ambassador | ACE Admin | Super Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Discover & Search Events | ✅ | ✅ | ✅ | ✅ | ✅ |
| Register & Get QR Pass | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit College Event | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit Own Submissions | ✅ | ✅ | ❌ | ❌ | ✅ |
| Access Submitter Hub (`/my-submissions`) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Access Organizer Center (`/organizer`) | ❌ | ✅ | ❌ | ✅ | ✅ |
| AI Content Studio (`/organizer/ai-tools`)| ❌ | ✅ | ❌ | ✅ | ✅ |
| Scan QR Check-in Console | ❌ | ✅ | ❌ | ✅ | ✅ |
| Review College Submissions (`/ambassador`)| ❌ | ❌ | ✅ | ✅ | ✅ |
| Access Admin Risk Center (`/admin/ai-risk`)| ❌ | ❌ | ❌ | ✅ | ✅ |
| Final Approve & Publish to Web | ❌ | ❌ | ❌ | ✅ | ✅ |
