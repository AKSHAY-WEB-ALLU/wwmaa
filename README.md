# WWMAA Association Portal — V10 Concept Build

A React + Vite frontend prototype for World Wide Martial Arts Association. V10 adds discipline-aware portal views, member-to-event assignment, an event selector in the top bar, dojo discipline tabs, and targeted association announcements.

## V10 changes
- **Discipline-specific accounts:** account records in `src/users.json` include `style` (`Karate`, `Kick boxing`, or `All`). Karate members see Karate events and discipline-specific information; Kick boxing members see Kick boxing information; Sensei accounts see both disciplines.
- **Restricted Senpai view:** Senpai members see their member portal and are scoped to their assigned dojo/discipline rather than the full association workspace.
- **Dojo discipline buttons:** choose Karate or Kick boxing on the Dojos page. Member attendance is also filtered to the selected discipline.
- **Student creation:** A Level can assign a discipline and choose an event of that discipline when creating a member profile.
- **Event in the top bar:** the current event is displayed in a dropdown in the top bar. A member's assigned event is selected on login when available.
- **Association announcements:** A and B administrators can publish notices for All members, Students, Senpais, Senseis, all Administrators, or a specific A Level / B Level role. Notices include Normal / Important / Urgent priority and are filtered for the signed-in role.
- **Previous modules retained:** overview, member directory, date-editable dojo attendance, events, account control, fees, belt grading, reports and CSV export.
- **Fresh V10 local storage keys:** avoids automatically reusing most V7–V9 local demo data. Existing V9 records are not automatically migrated.

## Run locally
1. Install Node.js LTS.
2. Extract this ZIP.
3. Open a terminal in the folder containing `package.json`.
4. Run `npm install`.
5. Run `npm run dev` and open the local URL printed in the terminal.

## Demo accounts
These are public demo credentials only; do not reuse real passwords.

| Access | Login ID | Password | Login tab |
|---|---|---|---|
| A Level | `WWMAA-ADMIN-001` | `A_WWMAA#6281` | Admin login → A Level |
| B Level | `WWMAA-ADMIN-002` | `B_WWMAA#4173` | Admin login → B Level |
| Karate Student | `WW-1001` | `Arjun@1001K` | Student / Senpai / Sensei |
| Karate Student | `WW-1002` | `Meera@1002K` | Student / Senpai / Sensei |
| Kick boxing Student | `WW-1003` | `Nikhil@1003K` | Student / Senpai / Sensei |
| Karate Senpai | `SN-0201` | `Sanjay@0201S` | Student / Senpai / Sensei |
| Sensei (all disciplines) | `SI-0001` | `Sensei@0001K` | Student / Senpai / Sensei |

Edit `src/users.json` to change starter accounts and their discipline. A Level can also edit accounts and set new individual passwords from Control panel. In this demo, those Control panel changes are saved only to the current browser and do not rewrite `src/users.json`.

## Prototype limitations — read before public launch
This is **not production-ready authentication**. Passwords are present in frontend source for demo use, and account permissions are enforced in client-side UI only. LocalStorage data is not shared between devices and can be changed by a technically capable user. Do not use this preview for real member, health, identity or financial information.

Before public launch, connect Supabase (or another secure backend) and implement server-side authentication, password hashing, role/discipline authorization, database policies, audit logs, secure password resets and shared database tables. Do not put service-role keys or real passwords in the frontend.
