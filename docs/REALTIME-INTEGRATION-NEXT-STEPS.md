# Remaining integration work

- [ ] Migrate WWMAA sign-in from the browser-only `users.json` password check to Supabase Auth.
- [ ] Add a protected membership table mapping `auth.users.id` to WWMAA member ID, role, and dojo.
- [ ] Restrict `wwmaa_live_state` writes to approved association administrators using that membership table (the starter SQL currently allows authenticated users to write; tighten before production).
- [ ] Wire the `App` state arrays (`students`, `attendanceRecords`, `events`, `feeRecords`, `gradingRecords`, `announcements`, `surveys`, `dojos`) to initial shared-state loading and realtime events.
- [ ] Replace browser-only `localStorage` persistence with authorized database writes for the shared records.
- [ ] Decide whether student/attendance/fee data should be split into separate tables with per-dojo access instead of one JSON document.
- [ ] Test with two separate browser sessions/devices and verify an update appears on the other device.
- [ ] Remove any plaintext credentials from `src/users.json` and rotate credentials previously committed to the repository.
- [ ] Keep the existing CSS and visual components unchanged unless a UI change is explicitly requested.
