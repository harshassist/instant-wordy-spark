
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('candidate', 'recruiter', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE public.application_status AS ENUM ('pending', 'reviewing', 'interview', 'offer', 'rejected', 'withdrawn');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE public.employment_type AS ENUM ('full_time', 'part_time', 'contract', 'temporary', 'internship', 'remote');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE public.subscription_plan AS ENUM ('free', 'basic', 'premium', 'enterprise');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'incomplete');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.user_role NOT NULL DEFAULT 'candidate',
  full_name text,
  headline text,
  bio text,
  location text,
  experience_years integer DEFAULT 0,
  education text[],
  skills text[],
  cv_url text,
  completion_pct integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id uuid REFERENCES public.profiles(id),
  name text NOT NULL,
  description text,
  website text,
  logo_url text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_recruiter_org UNIQUE (recruiter_id)
);

CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  salary_range text,
  employment_type public.employment_type NOT NULL,
  requirements text[],
  is_active boolean DEFAULT true,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  status public.application_status DEFAULT 'pending',
  cover_letter text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_job_candidate UNIQUE (job_id, candidate_id)
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan public.subscription_plan DEFAULT 'free',
  status public.subscription_status DEFAULT 'active',
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.update_profile_completion()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  total_fields int := 8;
  completed_fields int := 0;
BEGIN
  IF NEW.full_name IS NOT NULL AND NEW.full_name <> '' THEN completed_fields := completed_fields+1; END IF;
  IF NEW.location IS NOT NULL AND NEW.location <> '' THEN completed_fields := completed_fields+1; END IF;
  IF NEW.headline IS NOT NULL AND NEW.headline <> '' THEN completed_fields := completed_fields+1; END IF;
  IF NEW.bio IS NOT NULL AND NEW.bio <> '' THEN completed_fields := completed_fields+1; END IF;
  IF COALESCE(NEW.experience_years, 0) > 0 THEN completed_fields := completed_fields+1; END IF;
  IF COALESCE(array_length(NEW.education,1), 0) > 0 THEN completed_fields := completed_fields+1; END IF;
  IF COALESCE(array_length(NEW.skills,1), 0) > 0 THEN completed_fields := completed_fields+1; END IF;
  IF NEW.cv_url IS NOT NULL AND NEW.cv_url <> '' THEN completed_fields := completed_fields+1; END IF;
  NEW.completion_pct := (completed_fields::numeric / total_fields * 100)::int;
  NEW.updated_at := NOW();
  RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END $$;

CREATE TRIGGER trg_profile_completion
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.update_profile_completion();

CREATE TRIGGER trg_org_touch
BEFORE UPDATE ON public.organizations
FOR EACH ROW EXECUTE PROCEDURE public.touch_updated_at();

CREATE TRIGGER trg_job_touch
BEFORE UPDATE ON public.jobs
FOR EACH ROW EXECUTE PROCEDURE public.touch_updated_at();

CREATE TRIGGER trg_app_touch
BEFORE UPDATE ON public.applications
FOR EACH ROW EXECUTE PROCEDURE public.touch_updated_at();

CREATE TRIGGER trg_sub_touch
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW EXECUTE PROCEDURE public.touch_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own profile read" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "own profile edit" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "public jobs" ON public.jobs
  FOR SELECT USING (is_active AND is_approved);

UPDATE public.profiles SET full_name = full_name;
