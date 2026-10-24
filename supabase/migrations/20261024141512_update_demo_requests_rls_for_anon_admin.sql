-- Allow the anon role to read and update demo_requests (no-auth admin dashboard)
-- The admin page now runs without login, so it operates as the anon role.

-- Grant SELECT and UPDATE to anon (previously only INSERT was granted to anon)
GRANT SELECT, UPDATE, DELETE ON demo_requests TO anon;

-- Add SELECT policy for anon so the admin dashboard can list all requests
DROP POLICY IF EXISTS "anon_select_demo_requests" ON demo_requests;
CREATE POLICY "anon_select_demo_requests"
ON demo_requests FOR SELECT
TO anon, authenticated
USING (true);

-- Add UPDATE policy for anon so the admin dashboard can change request status
DROP POLICY IF EXISTS "anon_update_demo_requests" ON demo_requests;
CREATE POLICY "anon_update_demo_requests"
ON demo_requests FOR UPDATE
TO anon, authenticated
USING (true) WITH CHECK (true);

-- Add DELETE policy for anon so the admin dashboard can remove requests
DROP POLICY IF EXISTS "anon_delete_demo_requests" ON demo_requests;
CREATE POLICY "anon_delete_demo_requests"
ON demo_requests FOR DELETE
TO anon, authenticated
USING (true);
