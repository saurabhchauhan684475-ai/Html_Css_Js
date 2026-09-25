# QueueSetu

A farmer procurement slot-booking and queue-tracking web app.

## Run it right now (demo mode, zero setup)

Just open `index.html` in a browser — or, better, serve the folder so
relative paths behave (double-clicking the file works too, but a local
server avoids occasional browser file:// quirks):

```bash
cd queuesetu
python3 -m http.server 5500
# open http://localhost:5500
```

The app runs in **demo mode** automatically: no Supabase keys needed.
- Log in with any name + 10-digit number.
- OTP code is always **1234**.
- Centres, slots, prices, and history are pre-seeded fake data stored in
  your browser's localStorage — booking a slot actually updates the
  numbers, refresh-safe.

This is enough to build, demo, and present the whole flow today.

## Connect real data (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon
   public** key.
3. Open `js/supabase-client.js` and paste them in as `SUPABASE_URL` and
   `SUPABASE_ANON_KEY`.
4. In the Supabase **SQL Editor**, run `supabase-schema.sql` from this
   folder — it creates all five tables plus basic row-level security.
5. In **Authentication → Providers**, enable **Phone**. You'll need a
   Twilio account (free trial credit covers a hackathon demo) — Supabase's
   docs walk through connecting it in about five minutes.
6. Reload the app. `DEMO_MODE` turns itself off automatically once real
   keys are detected — nothing else to change.

## Deploy

Push this folder to a GitHub repo, then import it into
[Vercel](https://vercel.com) as a static site (no build step needed —
it's plain HTML/CSS/JS). Every push to `main` auto-redeploys.

## Project structure

```
queuesetu/
├── index.html            landing page + login (name, phone, OTP)
├── home.html              welcome dashboard + farmer service hub
├── raise-request.html     pick centre → pick slot → get queue position
├── track-request.html     live queue position for your active booking
├── slip.html              printable token slip for the active booking
├── market-prices.html     today's mandi rates
├── crowd-status.html      how busy each centre is right now
├── history.html           past completed procurements
├── help.html               FAQ + contact
├── weather.html            weather planning + farm checklist (demo data)
├── schemes.html            farmer government scheme directory
├── crop-advisory.html      crop-care guidance for common crops
├── documents.html          farmer document checklist
├── css/style.css          shared design system
├── js/supabase-client.js  Supabase setup + demo-mode switch
├── js/data.js             all data access — same functions work in
│                          demo mode or live mode, so pages never touch
│                          localStorage or supabaseClient directly
├── js/nav.js              fills in farmer name + logout on every page
└── supabase-schema.sql    run this in Supabase once you're ready
```

## What's still a placeholder / what to build next

- **Market prices**: currently seeded fake data. For real rates, pull
  from Agmarknet or data.gov.in's mandi price APIs and cache the result
  into the `market_prices` table (e.g. a daily scheduled job).
- **Realtime updates**: Track a Request and Crowd Status currently
  re-fetch once on page load. Wire them to
  `supabaseClient.channel(...).on('postgres_changes', ...)` on the
  `bookings` table so the numbers move live without a refresh — this is
  a strong thing to show live in front of judges.
- **Officer/procurement-centre dashboard**: not built here — this repo
  is the farmer-facing side only.
- **Offline / low-connectivity fallback**: worth having an answer ready
  for judges even if not fully built — e.g. an SMS/IVR path for booking
  and status checks for farmers without reliable data access.


## Bilingual UI
All primary navigation/actions and the new farmer-service pages support English and Hindi. Use the English / हिन्दी switcher in the top bar. The selected language is saved in localStorage. New farmer services include weather planning, government schemes, crop advisory, and a document checklist. Weather/advisory content is demo/educational content and should be connected to verified live sources before production use.
