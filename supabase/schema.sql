-- ==============================================================================
-- KKU Survey Marketplace - Production Database Schema (PostgreSQL / Supabase)
-- โมเดลบัญชีเดี่ยวแบบครบวงจร (Unified Single Account Architecture)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (1 คน = 1 บัญชี = ทำได้ทั้งตอบและสร้างแบบสอบถาม)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  student_id TEXT,
  university TEXT DEFAULT 'มหาวิทยาลัยขอนแก่น',
  faculty TEXT,
  major TEXT,
  year_of_study TEXT,
  gender TEXT,
  age INTEGER,
  residence_zone TEXT,
  monthly_expense TEXT,
  primary_transport TEXT,
  delivery_app TEXT,
  
  -- KYC Identity Verification (1 เลขบัตรประชาชน ต่อ 1 บัญชีเท่านั้น)
  verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'pending', 'verified')),
  id_card_number TEXT UNIQUE,
  id_card_image_url TEXT,
  
  -- Unified Wallet
  reward_balance NUMERIC(12, 2) DEFAULT 0.00 CHECK (reward_balance >= 0),
  research_budget NUMERIC(12, 2) DEFAULT 0.00 CHECK (research_budget >= 0),
  
  -- System Flags
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Research Projects Table (สร้างโดยผู้ใช้ในโหมด Researcher)
CREATE TABLE IF NOT EXISTS public.research_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'General',
  survey_type TEXT DEFAULT 'external_google_forms' CHECK (survey_type IN ('external_google_forms', 'native')),
  survey_url TEXT,
  completion_code TEXT NOT NULL,
  minimum_time_seconds INTEGER DEFAULT 15,
  target_responses INTEGER NOT NULL CHECK (target_responses > 0),
  completed_responses INTEGER DEFAULT 0 CHECK (completed_responses >= 0),
  reward_per_response NUMERIC(10, 2) NOT NULL CHECK (reward_per_response > 0),
  total_budget NUMERIC(12, 2) NOT NULL CHECK (total_budget >= 0),
  target_faculty TEXT DEFAULT 'ทุกคณะในมหาวิทยาลัยขอนแก่น',
  target_residence TEXT DEFAULT 'ทุกพื้นที่รอบ มข.',
  eligibility TEXT DEFAULT 'นักศึกษามหาวิทยาลัยขอนแก่น ทุกชั้นปี',
  estimated_time TEXT DEFAULT '4 นาที',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Survey Responses Table (บันทึกคำตอบ & ป้องกันการตอบซ้ำ 100%)
CREATE TABLE IF NOT EXISTS public.survey_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.research_projects(id) ON DELETE CASCADE NOT NULL,
  participant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  completion_code_entered TEXT,
  elapsed_time_seconds INTEGER NOT NULL,
  reward_earned NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'flagged_speeder', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- ล็อกระดับฐานข้อมูล: 1 คนตอบโปรเจกต์เดิมได้แค่ 1 ครั้งเท่านั้น!
  CONSTRAINT unique_project_participant UNIQUE(project_id, participant_id)
);

-- 5. Transactions Table (สมุดบัญชีการเงิน - Append Only)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('reward', 'withdrawal', 'budget_deposit', 'budget_lock')),
  amount NUMERIC(12, 2) NOT NULL,
  fee NUMERIC(10, 2) DEFAULT 0.00,
  net_amount NUMERIC(12, 2) NOT NULL,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'processing', 'rejected')),
  payment_method TEXT,
  destination_account TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. KYC Verification Queue Table
CREATE TABLE IF NOT EXISTS public.kyc_verifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  id_card_number TEXT NOT NULL,
  id_card_image_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 7. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_verifications ENABLE ROW LEVEL SECURITY;

-- Policies: ทุกคนอ่านแบบสอบถามที่ Active ได้
CREATE POLICY "Public read active projects" ON public.research_projects
  FOR SELECT USING (status = 'active');

-- Policies: ผู้ใช้จัดการโปรเจกต์ของตนเองได้
CREATE POLICY "Users manage own projects" ON public.research_projects
  FOR ALL USING (auth.uid() = creator_id);

-- Policies: ผู้ใช้อ่านและอัปเดตโปรไฟล์ตนเองได้
CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies: ผู้ใช้อ่านประวัติการเงินของตนเองได้
CREATE POLICY "Users view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);
