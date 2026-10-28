-- AutoBuzz: Signal-to-Story Marketing Operating System
-- PostgreSQL Schema & Row Level Security (RLS) Migrations

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Marketing Signals Table
CREATE TABLE IF NOT EXISTS public.autobuzz_signals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'product_launch', 'website_update', 'customer_question', 
    'search_opportunity', 'seasonal_event', 'lead_inquiry', 
    'performance_change', 'announcement'
  )),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('urgent', 'high', 'medium', 'low')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'converted', 'dismissed')),
  source TEXT NOT NULL DEFAULT 'manual',
  source_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Campaign Stories & Narratives
CREATE TABLE IF NOT EXISTS public.autobuzz_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id TEXT NOT NULL,
  signal_id UUID REFERENCES public.autobuzz_signals(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  objective TEXT NOT NULL,
  primary_channel TEXT NOT NULL,
  supported_channels TEXT[] DEFAULT ARRAY['facebook', 'instagram', 'youtube_shorts', 'email'],
  narrative JSONB NOT NULL,
  video_storyboard JSONB,
  hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
  utm_campaign TEXT NOT NULL,
  utm_source TEXT NOT NULL,
  utm_medium TEXT NOT NULL,
  target_url TEXT NOT NULL,
  approval_status TEXT NOT NULL DEFAULT 'draft' CHECK (approval_status IN ('draft', 'in_review', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Campaign Experiments Table
CREATE TABLE IF NOT EXISTS public.autobuzz_experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id TEXT NOT NULL,
  story_id UUID REFERENCES public.autobuzz_stories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  hypothesis TEXT NOT NULL,
  channel TEXT NOT NULL,
  variant_a TEXT NOT NULL,
  variant_b TEXT NOT NULL,
  primary_metric TEXT NOT NULL,
  target_conversion_rate NUMERIC(5,2) NOT NULL,
  actual_conversion_rate NUMERIC(5,2),
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'running', 'concluded', 'inconclusive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Social Posts Table
CREATE TABLE IF NOT EXISTS public.autobuzz_social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id TEXT NOT NULL,
  story_id UUID REFERENCES public.autobuzz_stories(id) ON DELETE SET NULL,
  channel TEXT NOT NULL,
  content TEXT NOT NULL,
  content_bn TEXT NOT NULL,
  media_url TEXT,
  scheduled_at TIMESTAMPTZ,
  approval_status TEXT NOT NULL DEFAULT 'draft' CHECK (approval_status IN ('draft', 'approved', 'rejected')),
  publishing_status TEXT NOT NULL DEFAULT 'draft' CHECK (publishing_status IN ('draft', 'scheduled', 'published', 'failed')),
  published_url TEXT,
  error_detail TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  idempotency_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CRM Leads Table
CREATE TABLE IF NOT EXISTS public.autobuzz_crm_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  source_signal_id UUID REFERENCES public.autobuzz_signals(id) ON DELETE SET NULL,
  utm_campaign TEXT,
  consent_status TEXT NOT NULL DEFAULT 'opted_in' CHECK (consent_status IN ('opted_in', 'pending', 'unsubscribed')),
  lifecycle_stage TEXT NOT NULL DEFAULT 'lead' CHECK (lifecycle_stage IN ('subscriber', 'lead', 'mql', 'sql', 'opportunity', 'customer')),
  notes TEXT[] DEFAULT ARRAY[]::TEXT[],
  assigned_to TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Automations & Workflows Table
CREATE TABLE IF NOT EXISTS public.autobuzz_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
  edges JSONB NOT NULL DEFAULT '[]'::jsonb,
  execution_count INTEGER NOT NULL DEFAULT 0,
  success_count INTEGER NOT NULL DEFAULT 0,
  failure_count INTEGER NOT NULL DEFAULT 0,
  last_executed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Workflow Execution Trace Logs Table
CREATE TABLE IF NOT EXISTS public.autobuzz_execution_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID REFERENCES public.autobuzz_workflows(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('running', 'success', 'failed', 'retrying')),
  payload JSONB DEFAULT '{}'::jsonb,
  error_message TEXT,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security (RLS) Enablement
ALTER TABLE public.autobuzz_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autobuzz_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autobuzz_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autobuzz_social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autobuzz_crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autobuzz_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autobuzz_execution_logs ENABLE ROW LEVEL SECURITY;

-- Workspace Isolation RLS Policies
CREATE POLICY "Allow workspace member access on signals"
  ON public.autobuzz_signals
  FOR ALL
  USING (workspace_id = current_setting('request.jwt.claims', true)::json->>'workspace_id');

CREATE POLICY "Allow workspace member access on stories"
  ON public.autobuzz_stories
  FOR ALL
  USING (workspace_id = current_setting('request.jwt.claims', true)::json->>'workspace_id');

CREATE POLICY "Allow workspace member access on crm leads"
  ON public.autobuzz_crm_leads
  FOR ALL
  USING (workspace_id = current_setting('request.jwt.claims', true)::json->>'workspace_id');
