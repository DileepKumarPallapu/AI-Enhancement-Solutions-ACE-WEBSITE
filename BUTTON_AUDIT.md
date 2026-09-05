# Button & Interactive Action Audit

| Page | Element / Button | Expected Action | Actual Action | API / Route | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Navbar** | Logo | Navigate Home | Navigates to `/` | Client Router | Verified ✓ |
| **Navbar** | Discover | Open Explorer | Navigates to `/events` | Client Router | Verified ✓ |
| **Navbar** | Hackathons | Open Hackathons | Navigates to `/hackathons` | Client Router | Verified ✓ |
| **Navbar** | For You | Open Feed | Navigates to `/for-you` | Client Router | Verified ✓ |
| **Navbar** | Theme Switcher | Toggle Light/Dark | Switches theme & saves in localStorage | DOM ClassList | Verified ✓ |
| **Navbar** | Ask ACE | Open AI Assistant | Expands floating AI drawer | React State | Verified ✓ |
| **Navbar** | Create Event | Launch Wizard | Navigates to `/create-event` | Client Router | Verified ✓ |
| **Hero** | Ask ACE Search | Submit Natural Query | Parses intent & filters events | NLP Parser | Verified ✓ |
| **Hero** | Explore Events | Discover listings | Navigates to `/events` | Client Router | Verified ✓ |
| **Hero** | Personalize Feed | Configure profile | Navigates to `/dashboard/profile`| Client Router | Verified ✓ |
| **EventCard** | Save (Bookmark) | Toggle bookmark | Saves to localStorage & shows toast | Toast + Context | Verified ✓ |
| **EventCard** | Share | Share dialog | Copies link or triggers Web Share | Clipboard API | Verified ✓ |
| **EventCard** | Register | Open Registration | Triggers registration modal | Modal + State | Verified ✓ |
| **Referral** | Copy Link | Copy link to clipboard | Copies `https://allcollegeevent.com/r/ACE-...` | Clipboard API | Verified ✓ |
| **Referral** | Send Invites | Dispatch emails | Appends invites to ledger & awards pts | Context State | Verified ✓ |
| **Organizer** | Scan QR Check-in| Check in student | Updates attendance status & shows toast | State + Toast | Verified ✓ |
