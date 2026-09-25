/* ===================================================================
   Supabase client setup
   -------------------------------------------------------------------
   1. Create a free project at https://supabase.com
   2. Project Settings → API → copy "Project URL" and "anon public" key
   3. Paste them below.
   4. Run supabase-schema.sql in the Supabase SQL editor to create tables.
   5. In Authentication → Providers, enable Phone auth (needs a Twilio
      account — free trial credit is enough for a hackathon demo).

   Until you fill these in, the app runs in DEMO_MODE automatically:
   fake OTP ("use 1234"), fake farmers, fake centres/slots/prices, all
   stored in localStorage. Every screen works end-to-end in demo mode,
   so you can build and present without waiting on Supabase setup.
   =================================================================== */

const SUPABASE_URL = 'YOUR_SUPABASE_URL';       // e.g. https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;

const supabaseConfigured =
  SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
  SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY' &&
  typeof window.supabase !== 'undefined';

if (supabaseConfigured) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const DEMO_MODE = !supabaseConfigured;

if (DEMO_MODE) {
  console.info(
    '%cQueueSetu is running in DEMO MODE (no Supabase keys set). ' +
    'Any OTP is accepted with the code 1234. See js/supabase-client.js to connect real data.',
    'color:#1f4d3a;font-weight:600;'
  );
}
