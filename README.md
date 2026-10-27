# World Wide Martial Arts Association Portal — V5

A responsive React + Vite starter project for WWMAA with a dark red, black and white visual theme.

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP.
3. Open a terminal in this folder.
4. Run `npm install`
5. Run `npm run dev`

## Build
Run `npm run build`. The production website is created in `dist/`.

## Important security note
This ZIP is a frontend prototype. It uses browser local storage for demonstration and is not a secure public login system. Do not use real student information or real passwords in this demo. Before public deployment, implement server-side authentication, hashed credentials, database-backed roles and authorization, audit logs, and backups. Do not rely on a role selected by the user in the browser for A/B/C access control.

## Login prototype
For preview only, the sign-in screen accepts any non-empty ID and any non-empty passcode. Use the role selector to preview Student/Senpai/Sensi, B Level, or A Level screens. This is not real authentication.


## V2 updates
- Fixed/expanded the Control Panel with an interactive Login ID Manager.
- A Level can create IDs and edit roles; B Level can view IDs.
- Added separate independent settings panels for Karate and Kick boxing.
- Added event-setting toggles for attendance, registration, and results/grading.
- Settings and IDs are demo-only and stay in the current browser session; they are not synced to a database.


## V3 visual and password policy updates
- High-impact red/black/white dojo visual direction with bolder typography and animated hover interactions.
- Updated login hero and dashboard identity.
- Explicit policy: A Level and B Level cannot view, reveal, change, or reset members' existing passwords.
- Production recommendation: password hashes only; account holders change their own passwords through secure authentication. A Level may disable accounts or trigger a one-time reset invitation without seeing a password.
- Password controls in this frontend are policy/UI only; real enforcement requires server-side authentication and database authorization.


## V3 permission clarification
- A Level AND B Level can use all association admin features: create/manage login IDs, assign roles, manage students, manage dojos, create events, and change Karate/Kick boxing settings.
- Neither A Level nor B Level can view or change an existing member password.
- This is still a frontend prototype; the same permissions must be enforced server-side for production.


## V4 updates
- Separate Student / Senpai / Sensi sign-in mode from Admin sign-in mode.
- Member mode has its own student-facing navigation and profile / attendance pages.
- A Level and B Level can create login IDs, assign roles, and set/reset account passwords in the admin UI.
- Password privacy: admins cannot retrieve an existing password. Production implementation must store salted password hashes and support admin-triggered resets by securely setting a new temporary password or sending a one-time reset flow. Do not store or log plaintext passwords.
- Important: this package is still a frontend demo. Login-mode selection is not real authentication. The production backend must validate each account's stored role and session, and enforce all permissions server-side.


## V5 user permissions and editable user file
- `src/users.json` is the starter account directory. Edit it with VS Code or Notepad to change starter user names, IDs, roles, dojo, belt, and whether a password is marked as set. Do not put real passwords in this JSON file.
- A Level UI: can create, edit, and delete user records, including administrator accounts; can set a new password in the preview (existing passwords are never revealed).
- B Level UI: can edit Senpai accounts only. Other roles and administrator accounts are view-only; B Level cannot create/delete accounts or manage passwords.
- Student/Senpai/Sensi login remains a separate sign-in mode.
- This is still a frontend demo. Login accepts non-empty values and the selected admin role is not securely verified. Edits made in the UI are in-memory only and do not write back to `src/users.json`. Before public use, connect a backend such as Supabase with real authentication, server-side role policies, and secure password reset flows.
