# WWMAA realtime integration patch

This ZIP is a **patch for your existing `AKSHAY-WEB-ALLU/wwmaa` project**, not a replacement for your site's design.

## Files included
- `src/wwmaa-realtime.js` — Supabase Auth-gated load, Realtime subscription and save helper.
- `supabase/wwmaa_live_state.sql` — shared-state table with RLS and Realtime publication.
- `docs/REALTIME-INTEGRATION-NEXT-STEPS.md` — integration checklist.

## Before you push
1. Extract this ZIP.
2. Copy the folders/files into the root of your existing WWMAA repository, keeping the folder structure.
3. Install the client dependency in your project root:
   `npm install @supabase/supabase-js`
4. Commit and push the added files to `AKSHAY-WEB-ALLU/wwmaa`.
5. Add/confirm these Vercel environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Review and run `supabase/wwmaa_live_state.sql` in Supabase SQL Editor only after reviewing the security notes below.

## Important: this patch alone does NOT switch the current app to real-time
The current WWMAA app uses a custom client-side login based on `src/users.json` and browser `localStorage`. That is not a secure server-verifiable identity. The helper intentionally requires a real Supabase Auth session, so it will not sync until the login flow is migrated to Supabase Auth and the app's state setters are wired to `subscribeToWWMAAState` / `saveWWMAAState`.

I have not claimed the website is real-time just because these files exist. This patch gives you the safe starting files to push into the repo you already have.

## Security warning
Do **not** create `anon` read/write policies for student profiles, attendance, fees, or account data. Do not put a Supabase service-role key in frontend code. Before going live, migrate accounts to Supabase Auth, add a secure membership/role table, restrict writes to authorized association administrators, and remove plaintext passwords from the client-side `users.json` file. Rotate any credentials that have already been committed publicly.
