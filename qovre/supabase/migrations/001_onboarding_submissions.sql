-- Run this in Supabase SQL editor: Dashboard → SQL Editor → New query
-- Project: qovre | Table: onboarding_submissions

CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL    DEFAULT NOW(),

  -- Top-level fields for easy querying / filtering
  category       TEXT        NOT NULL,   -- web | saas | ai
  status         TEXT        NOT NULL    DEFAULT 'new',
                                         -- new | reviewed | proposal_sent | won | lost
  sla_level      TEXT,                   -- essential | growth | partner
  hosting        TEXT,                   -- qovre | own
  traffic_level  TEXT,                   -- low | medium | high | enterprise
  security_level TEXT,                   -- standard | advanced | enterprise
  scalability    TEXT,                   -- fixed | moderate | high

  -- Contact
  name           TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  company        TEXT,
  file_name      TEXT,

  -- Full form state for detail panel
  payload        JSONB       NOT NULL    DEFAULT '{}'
);

-- Indexes for dashboard ordering / filtering
CREATE INDEX IF NOT EXISTS idx_onboarding_created_at ON onboarding_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_onboarding_status     ON onboarding_submissions (status);
CREATE INDEX IF NOT EXISTS idx_onboarding_category   ON onboarding_submissions (category);

-- Row-level security: only service_role key can read/write (admin dashboard uses it)
ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access (used by API routes)
CREATE POLICY "service_role_full_access" ON onboarding_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
