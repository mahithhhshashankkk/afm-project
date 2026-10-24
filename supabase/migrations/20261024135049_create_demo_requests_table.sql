/*
# Create demo_requests table

1. New Tables
- `demo_requests`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — full name of the person requesting the demo
  - `email` (text, not null) — work email for follow-up
  - `institution` (text, not null) — college/university name
  - `residents` (text, not null) — selected resident range (e.g. "200–500")
  - `message` (text, nullable) — optional message about campus waste challenges
  - `status` (text, not null, default 'pending') — tracks request lifecycle: pending, contacted, demo_scheduled, closed
  - `created_at` (timestamptz, default now()) — when the request was submitted

2. Security
- Enable RLS on `demo_requests`.
- This is a no-auth marketing site (no sign-in screen), so the frontend operates as the `anon` role.
- Grant INSERT to `anon, authenticated` so visitors can submit demo requests.
- Grant SELECT/UPDATE/DELETE to `authenticated` only — staff who sign in to the admin panel can manage requests; anonymous visitors cannot read or modify other people's submissions.
- INSERT policy for anon/authenticated uses `WITH CHECK (true)` — any visitor can submit a demo request, which is the intended public behavior for a marketing site contact form.
- No SELECT policy for anon — visitors cannot enumerate other people's submissions (email addresses, institution names, etc. are private).

3. Indexes
- Index on `created_at DESC` for the admin list view (most recent first).
- Index on `status` for filtering by request lifecycle stage.
- Index on `email` for deduplication lookups.
*/

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  institution text NOT NULL,
  residents text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON demo_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON demo_requests TO authenticated;

-- INSERT: anyone (anon or authenticated) can submit a demo request
DROP POLICY IF EXISTS "anon_insert_demo_request" ON demo_requests;
CREATE POLICY "anon_insert_demo_request"
ON demo_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- SELECT: only authenticated staff can view requests
DROP POLICY IF EXISTS "authenticated_select_demo_requests" ON demo_requests;
CREATE POLICY "authenticated_select_demo_requests"
ON demo_requests FOR SELECT
TO authenticated
USING (true);

-- UPDATE: only authenticated staff can update request status
DROP POLICY IF EXISTS "authenticated_update_demo_requests" ON demo_requests;
CREATE POLICY "authenticated_update_demo_requests"
ON demo_requests FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- DELETE: only authenticated staff can delete requests
DROP POLICY IF EXISTS "authenticated_delete_demo_requests" ON demo_requests;
CREATE POLICY "authenticated_delete_demo_requests"
ON demo_requests FOR DELETE
TO authenticated
USING (true);

CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests (status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests (email);
