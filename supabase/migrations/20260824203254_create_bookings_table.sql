/*
# Create bookings table for Denteez Panel Beating

## Purpose
Stores appointment bookings created by clients through the AI booking assistant.
This is a single-tenant (no-auth) app — all visitors can create and view bookings.

## New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `name` (text, not null) — client's full name
  - `phone` (text, not null) — contact number
  - `email` (text, nullable) — optional email
  - `vehicle_make` (text, not null) — e.g. Toyota
  - `vehicle_model` (text, not null) — e.g. Corolla
  - `vehicle_year` (text, nullable) — e.g. 2019
  - damage_description (text, not null) — description of damage
  - `preferred_date` (date, not null) — requested appointment date
  - `preferred_time` (text, not null) — requested time slot
  - `status` (text, not null, default 'pending') — pending, confirmed, completed, cancelled
  - `created_at` (timestamptz, default now())

## Security
- RLS enabled on `bookings`.
- Anon + authenticated can CRUD (intentionally public booking system for a small business).
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  vehicle_make text NOT NULL,
  vehicle_model text NOT NULL,
  vehicle_year text,
  damage_description text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_bookings_preferred_date ON bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);