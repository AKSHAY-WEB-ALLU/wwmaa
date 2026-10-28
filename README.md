# WWMAA V13 — Download Home + WebReader

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

## Remember me on this device (V13)
The login page includes a checked-by-default “Remember me on this device” option. When enabled, the current signed-in session is stored in this browser's local storage so the user remains signed in after closing/reopening the site on the same browser/device. Signing out clears the remembered session. Uncheck it on shared devices.

Important: this frontend stores the session locally and is not a substitute for secure server-side authentication. Anyone with access to the same browser profile may be able to use the remembered session. For production use, implement server-side sessions with secure, HttpOnly cookies.


## V13.01 APK download update

The Android WebReader APK is included at `public/downloads/wwmaa-webreader.apk`. The download landing page links to `/downloads/wwmaa-webreader.apk` and displays version V13.01. The supplied APK is copied as provided; it has not been independently installed or tested on a device.
