/* ===================================================================
   Data layer
   -------------------------------------------------------------------
   Every function here returns the same shape whether DEMO_MODE is on
   (data lives in localStorage) or off (data comes from Supabase).
   Pages call these functions and never touch localStorage or
   supabaseClient directly — that's the seam that makes swapping in
   real data later a one-file change instead of a rewrite.
   =================================================================== */

const QS_STORE_KEY = 'queuesetu_demo_store_v1';

const SEED_CENTRES = [
  { id: 'c1', name: 'Kanpur Mandi Procurement Centre', location: 'Kanpur, UP', capacity_per_slot: 6 },
  { id: 'c2', name: 'Unnao Grain Collection Centre', location: 'Unnao, UP', capacity_per_slot: 5 },
  { id: 'c3', name: 'Kanpur Dehat Block Centre', location: 'Kanpur Dehat, UP', capacity_per_slot: 4 },
  { id: 'c4', name: 'Lucknow Outer Procurement Hub', location: 'Lucknow, UP', capacity_per_slot: 8 },
];

const SEED_SLOTS = [
  { id: 's1', centre_id: 'c1', time: '08:00 – 09:00', booked: 6 },
  { id: 's2', centre_id: 'c1', time: '09:00 – 10:00', booked: 3 },
  { id: 's3', centre_id: 'c1', time: '10:00 – 11:00', booked: 1 },
  { id: 's4', centre_id: 'c1', time: '11:00 – 12:00', booked: 0 },
  { id: 's5', centre_id: 'c2', time: '08:00 – 09:00', booked: 2 },
  { id: 's6', centre_id: 'c2', time: '09:00 – 10:00', booked: 5 },
  { id: 's7', centre_id: 'c2', time: '10:00 – 11:00', booked: 0 },
  { id: 's8', centre_id: 'c3', time: '08:00 – 09:00', booked: 0 },
  { id: 's9', centre_id: 'c3', time: '09:00 – 10:00', booked: 1 },
  { id: 's10', centre_id: 'c4', time: '08:00 – 09:00', booked: 4 },
  { id: 's11', centre_id: 'c4', time: '09:00 – 10:00', booked: 8 },
  { id: 's12', centre_id: 'c4', time: '10:00 – 11:00', booked: 2 },
];

const SEED_PRICES = [
  { crop: 'Wheat', variety: 'HD-2967', price: 2275, unit: 'per quintal', trend: 'up' },
  { crop: 'Paddy (Rice)', variety: 'Common', price: 2183, unit: 'per quintal', trend: 'steady' },
  { crop: 'Mustard', variety: 'Yellow', price: 5650, unit: 'per quintal', trend: 'up' },
  { crop: 'Gram (Chana)', variety: 'Desi', price: 5335, unit: 'per quintal', trend: 'down' },
  { crop: 'Potato', variety: 'Local', price: 1180, unit: 'per quintal', trend: 'steady' },
  { crop: 'Sugarcane', variety: 'Co-0238', price: 350, unit: 'per quintal', trend: 'up' },
];

const SEED_HISTORY = [
  { id: 'h1', centre: 'Kanpur Mandi Procurement Centre', crop: 'Wheat', date: '2026-06-14', quantity: '18 quintal', status: 'Completed' },
  { id: 'h2', centre: 'Unnao Grain Collection Centre', crop: 'Mustard', date: '2026-03-02', quantity: '6 quintal', status: 'Completed' },
  { id: 'h3', centre: 'Kanpur Mandi Procurement Centre', crop: 'Paddy (Rice)', date: '2025-11-20', quantity: '22 quintal', status: 'Completed' },
];

function qsLoadStore() {
  const raw = localStorage.getItem(QS_STORE_KEY);
  if (raw) return JSON.parse(raw);
  const fresh = {
    farmer: null,
    centres: SEED_CENTRES,
    slots: SEED_SLOTS,
    prices: SEED_PRICES,
    history: SEED_HISTORY,
    activeBooking: null,
  };
  localStorage.setItem(QS_STORE_KEY, JSON.stringify(fresh));
  return fresh;
}

function qsSaveStore(store) {
  localStorage.setItem(QS_STORE_KEY, JSON.stringify(store));
}

/* ---------------- Auth ---------------- */

async function qsRequestOtp(name, phone) {
  if (DEMO_MODE) {
    const store = qsLoadStore();
    store.pendingFarmer = { name, phone };
    qsSaveStore(store);
    return { ok: true };
  }
  const { error } = await supabaseClient.auth.signInWithOtp({ phone });
  if (error) return { ok: false, message: error.message };
  const store = qsLoadStore();
  store.pendingFarmer = { name, phone };
  qsSaveStore(store);
  return { ok: true };
}

async function qsVerifyOtp(phone, code) {
  if (DEMO_MODE) {
    if (code !== '1234') return { ok: false, message: 'Incorrect code. In demo mode, use 1234.' };
    const store = qsLoadStore();
    store.farmer = { ...store.pendingFarmer, id: 'demo-farmer-1' };
    qsSaveStore(store);
    return { ok: true };
  }
  const { data, error } = await supabaseClient.auth.verifyOtp({ phone, token: code, type: 'sms' });
  if (error) return { ok: false, message: error.message };
  const store = qsLoadStore();
  store.farmer = { ...store.pendingFarmer, id: data.user.id };
  qsSaveStore(store);
  // Upsert into a `farmers` profile table so name is saved alongside auth user
  await supabaseClient.from('farmers').upsert({
    id: data.user.id, name: store.farmer.name, phone,
  });
  return { ok: true };
}

function qsCurrentFarmer() {
  return qsLoadStore().farmer;
}

function qsRequireLogin() {
  if (!qsCurrentFarmer()) window.location.href = 'index.html';
}

function qsLogout() {
  const store = qsLoadStore();
  store.farmer = null;
  qsSaveStore(store);
  if (!DEMO_MODE) supabaseClient.auth.signOut();
  window.location.href = 'index.html';
}

/* ---------------- Centres & slots ---------------- */

async function qsGetCentres() {
  if (DEMO_MODE) return qsLoadStore().centres;
  const { data } = await supabaseClient.from('procurement_centres').select('*');
  return data || [];
}

async function qsGetSlots(centreId) {
  if (DEMO_MODE) return qsLoadStore().slots.filter(s => s.centre_id === centreId);
  const { data } = await supabaseClient.from('slots').select('*').eq('centre_id', centreId);
  return data || [];
}

function qsSlotStatus(slot, centre) {
  const cap = centre ? centre.capacity_per_slot : 6;
  if (slot.booked >= cap) return 'full';
  if (slot.booked / cap >= 0.7) return 'filling';
  return 'open';
}

/* ---------------- Booking ---------------- */

// Turns a centre name into a short uppercase code for token numbers,
// e.g. "Kanpur Mandi Procurement Centre" -> "KMP".
function qsCentreCode(name) {
  const code = (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
  return code || 'QS';
}

// Next sequence number for a centre's tokens, persisted so numbers keep
// climbing across bookings instead of resetting.
function qsNextTokenSeq(store, centreId) {
  if (!store.tokenSeq) store.tokenSeq = {};
  const current = store.tokenSeq[centreId] || 100; // start at 101 for a realistic-looking count
  const next = current + 1;
  store.tokenSeq[centreId] = next;
  return next;
}

async function qsCreateBooking(centreId, slotId) {
  const store = qsLoadStore();
  const centre = store.centres.find(c => c.id === centreId);
  const slot = store.slots.find(s => s.id === slotId);
  if (!slot) return { ok: false, message: 'Slot not found.' };

  const status = qsSlotStatus(slot, centre);
  if (status === 'full') {
    // suggest next open slot at same centre
    const next = store.slots.find(s => s.centre_id === centreId && qsSlotStatus(s, centre) !== 'full' && s.id !== slotId);
    return { ok: false, full: true, suggested: next || null };
  }

  slot.booked += 1;
  const queuePosition = slot.booked;
  const farmer = qsCurrentFarmer() || {};
  const tokenSeq = qsNextTokenSeq(store, centreId);
  const now = new Date();

  store.activeBooking = {
    id: 'b' + Date.now(),
    centre_id: centreId,
    centre_name: centre.name,
    centre_location: centre.location,
    slot_id: slotId,
    time: slot.time,
    queue_position: queuePosition,
    total_ahead: queuePosition - 1,
    created_at: now.toISOString(),
    token_no: `${qsCentreCode(centre.name)}-${String(tokenSeq).padStart(4, '0')}`,
    farmer_name: farmer.name || '',
    farmer_phone: farmer.phone || '',
  };
  qsSaveStore(store);

  if (!DEMO_MODE) {
    await supabaseClient.from('bookings').insert({
      farmer_id: farmer.id, centre_id: centreId, slot_id: slotId, status: 'active',
      token_no: store.activeBooking.token_no,
    });
  }

  return { ok: true, booking: store.activeBooking };
}

async function qsGetActiveBooking() {
  return qsLoadStore().activeBooking;
}

/* ---------------- Market prices ---------------- */

async function qsGetPrices() {
  if (DEMO_MODE) return qsLoadStore().prices;
  const { data } = await supabaseClient.from('market_prices').select('*').order('crop');
  return data || [];
}

/* ---------------- Crowd status ---------------- */

async function qsGetCrowdStatus() {
  const store = qsLoadStore();
  return store.centres.map(centre => {
    const slots = store.slots.filter(s => s.centre_id === centre.id);
    const totalBooked = slots.reduce((sum, s) => sum + s.booked, 0);
    const totalCapacity = slots.length * centre.capacity_per_slot || 1;
    const ratio = totalBooked / totalCapacity;
    const level = ratio >= 0.75 ? 'high' : ratio >= 0.4 ? 'medium' : 'low';
    return { ...centre, ratio, level, totalBooked, totalCapacity };
  });
}

/* ---------------- History ---------------- */

async function qsGetHistory() {
  if (DEMO_MODE) return qsLoadStore().history;
  const { data } = await supabaseClient
    .from('bookings')
    .select('*, procurement_centres(name)')
    .eq('farmer_id', qsCurrentFarmer().id)
    .eq('status', 'completed');
  return data || [];
}
