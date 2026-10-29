WWMAA COMPLETE REPLACEMENT — USER LOGIN / NO DEMO DATA

Changes in this build:
- Removed the seeded demo student/member accounts from the source fallback. Existing A/B admin accounts are retained so administrators can enter the control panel.
- Removed seeded demo events, welcome announcement, and seeded demo dojos.
- Existing browser-stored demo IDs and named demo dojos/events are filtered out on load.
- New account creation now REQUIRES an initial password of at least 6 characters; account creation without a password is blocked.
- ID matching is case-insensitive and ignores surrounding spaces.
- Fixed package.json / Vite dependencies for Vercel builds.

IMPORTANT LIMITATION:
The current app stores user accounts and records in browser localStorage. A newly created account will sign in on the same browser/device only. It will NOT sync to another device or browser, and this client-side login is not production-secure. Cross-device login requires a proper Supabase Auth/backend migration. Do not store real sensitive member data until that migration is completed.

BUILD: run npm install, then npm run build. Push package.json and generated package-lock.json together with the full source to the existing WWMAA repository.
