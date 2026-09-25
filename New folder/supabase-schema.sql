-- QueueSetu — Supabase schema
-- Paste this into Supabase Dashboard → SQL Editor → New query → Run

create table if not exists farmers (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  phone text not null,
  created_at timestamptz default now()
);

create table if not exists procurement_centres (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  capacity_per_slot int not null default 6
);

create table if not exists slots (
  id uuid primary key default gen_random_uuid(),
  centre_id uuid references procurement_centres(id) on delete cascade,
  time_label text not null,
  booked int not null default 0
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid references farmers(id) on delete cascade,
  centre_id uuid references procurement_centres(id),
  slot_id uuid references slots(id),
  status text not null default 'active', -- active | completed | cancelled
  crop text,
  quantity text,
  token_no text, -- printable token number shown on the farmer's slip
  created_at timestamptz default now()
);

create table if not exists market_prices (
  id uuid primary key default gen_random_uuid(),
  crop text not null,
  variety text,
  price numeric not null,
  unit text default 'per quintal',
  trend text default 'steady', -- up | down | steady
  updated_at timestamptz default now()
);

-- Row Level Security: farmers can only see/edit their own rows
alter table farmers enable row level security;
alter table bookings enable row level security;

create policy "Farmers can view own profile" on farmers
  for select using (auth.uid() = id);
create policy "Farmers can update own profile" on farmers
  for update using (auth.uid() = id);
create policy "Farmers can insert own profile" on farmers
  for insert with check (auth.uid() = id);

create policy "Farmers can view own bookings" on bookings
  for select using (auth.uid() = farmer_id);
create policy "Farmers can create own bookings" on bookings
  for insert with check (auth.uid() = farmer_id);

-- procurement_centres, slots, market_prices are public read (no RLS needed
-- for reading), but lock down writes to authenticated staff only if you
-- build an officer dashboard later.
alter table procurement_centres enable row level security;
alter table slots enable row level security;
alter table market_prices enable row level security;

create policy "Anyone can read centres" on procurement_centres for select using (true);
create policy "Anyone can read slots" on slots for select using (true);
create policy "Anyone can read prices" on market_prices for select using (true);

-- Sample seed data — replace with your real Kanpur-belt centres
insert into procurement_centres (name, location, capacity_per_slot) values
  ('Kanpur Mandi Procurement Centre', 'Kanpur, UP', 6),
  ('Unnao Grain Collection Centre', 'Unnao, UP', 5),
  ('Kanpur Dehat Block Centre', 'Kanpur Dehat, UP', 4);
