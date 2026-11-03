# The Kumaon Crest — React site

Single-page site for The Kumaon Crest homestay, Kausani. React 18 + Vite + Tailwind v4 + Framer Motion, with a Firestore-backed enquiry form and a Cloud Function that emails each new enquiry.

## Run locally

```bash
npm install
cp .env.example .env   # add Firebase web keys + VITE_SITE_URL
npm run dev
```

The site runs without `.env`; the enquiry form then reports that enquiries are not connected.

Node 20.19+ is required (Vite 8).

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Production origin, no trailing slash. Used for canonical, Open Graph, `robots.txt`, `sitemap.xml`. |
| `VITE_FIREBASE_*` | Firebase web app config (Project settings → Your apps → Web). Public by design; security is enforced by `firestore.rules`. |

## Firebase setup

1. Create a Firebase project, enable **Firestore** (note its location, e.g. `asia-south1`), and upgrade to the **Blaze** plan (required for Cloud Functions and Secret Manager).
2. Install the CLI and link the project:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase use --add
   ```
3. Configure the notification function:
   ```bash
   cp functions/.env.example functions/.env   # set NOTIFY_EMAIL and FUNCTION_REGION
   firebase functions:secrets:set SMTP_USER   # sending mailbox, e.g. bookings@gmail.com
   firebase functions:secrets:set SMTP_PASS   # SMTP password / Gmail App Password
   cd functions && npm install && cd ..
   ```
   `FUNCTION_REGION` must match the Firestore location (`nam5` → `us-central1`, `eur3` → `europe-west1`).
   For Gmail: enable 2-Step Verification and create an App Password. Any SMTP provider works via `SMTP_HOST` / `SMTP_PORT`.
4. Deploy rules, indexes, function and hosting:
   ```bash
   npm run build
   firebase deploy
   ```

### Data model — `enquiries/{id}`

`name`, `email`, `phone`, `company`, `subject`, `message`, `createdAt` (server timestamp), `status: "New"`.
The function adds `notification.claimedAt` / `notification.sentAt` (or `notification.error`) after processing.

Clients can only create documents that pass `firestore.rules`; nothing is readable from the browser. Review enquiries in the Firebase console.

## Project structure

```
src/
  App.jsx, main.jsx
  assets/images.js          image manifest (files in public/images)
  components/
    layout/                 Header, Footer, HashScroll
    ui/                     Button, Container, SmartImage, ImageMosaic, Lightbox, FormField, …
    enquiry/EnquiryForm.jsx
    seo/                    Seo (Helmet), schema.org builders
    toast/                  ToastProvider + context
  data/siteContent.js       all copy and section data
  firebase/                 firebase.js (lazy init), enquiries.js
  hooks/                    useEnquiryForm, useActiveSection, useLightbox, useToast, …
  pages/Home.jsx
  sections/                 Hero, About, Stay, Gallery, Nearby, Discover, Contact
  styles/index.css          Tailwind v4 theme tokens (light + dark)
  utils/                    validation, motion variants, cn, site URL helpers
functions/index.js          notifyOnEnquiry (Firestore trigger → SMTP email)
firestore.rules, firestore.indexes.json, firebase.json
```

## Performance notes

- Hero image is preloaded with `fetchpriority="high"`; all other images lazy-load with intrinsic dimensions (no CLS).
- Below-the-fold sections are code-split with `React.lazy`.
- Firestore Lite is loaded only when a visitor submits the form.
- Fonts are self-hosted via Fontsource (no third-party font requests).
