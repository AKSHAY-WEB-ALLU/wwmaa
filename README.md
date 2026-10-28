# WWMAA V12 — Download Home + WebReader

## Routes
- `/` — app-download landing page only: Android APK download CTA and iOS Add to Home Screen instructions.
- `/worldwidemartalart` — existing WWMAA WebReader application.

## Run locally
```bash
npm install
npm run dev
```

## Build for Vercel
```bash
npm run build
```
Deploy this project folder (`wwmaa_v7`) as the Vercel project root. The included `vercel.json` rewrites SPA routes to the app entry; static files should be deployed from `public/`.

## Android APK
The landing page links to `/downloads/wwmaa-webreader.apk`. The supplied project did not include an APK binary. Before deploying, create `public/downloads/` and place the final, signed Android APK there with the exact filename `wwmaa-webreader.apk`. Do not rename a random file to `.apk`; it must be a valid signed Android package.

## iOS
An Android APK cannot be installed on iPhone/iPad. The iOS card opens `/worldwidemartalart` and explains how to open it in Safari and choose Share → Add to Home Screen. This is a web app shortcut, not an IPA or App Store build.

## Existing app data and security
The WebReader is preserved as the existing frontend prototype. Its records/authentication are browser-local and are not production-grade shared authentication. This packaging change does not deploy the project or configure a backend.
