# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19, Vite, Tailwind CSS, Lucide React, Supabase (PostgreSQL & Auth)

## Users

1. **KKU Students (Undergraduate & Graduate):**
   - Goal: Earn fair, instant monetary rewards (e.g. 15–50 THB) during study breaks by completing high-quality academic surveys.
   - Situation: Looking for legitimate, fast payouts via PromptPay and a spam-free survey feed tailored to their faculty and interests.
2. **KKU Researchers, Lecturers & Graduate Students:**
   - Goal: Recruit verified, authentic respondents meeting specific demographic criteria (faculty, year, gender, habits) rapidly for academic theses, institutional research, or independent studies.
   - Situation: Previously relied on begging in LINE groups or Facebook pages; needs fast recruitment with fraud prevention and verifiable data.
3. **Institutional & Platform Administrators:**
   - Goal: Review e-KYC citizen ID submissions, moderate research projects for ethics compliance, and oversee financial escrow integrity.

*Note: Single Unified Account Model — Every student or researcher operates under 1 verified account, toggling between Participant and Researcher modes seamlessly.*

## Product Purpose

KKU Survey Marketplace is Khon Kaen University's premier academic research participant marketplace (the "Prolific for KKU"). It solves the painful, slow, and unreliable process of survey data collection in academia by connecting researchers with verified student participants through an escrow-backed incentive engine, rigorous fraud prevention, and seamless external survey integration.

## Positioning

The only verified academic survey marketplace tailored specifically to Khon Kaen University's ecosystem. Unlike generic survey panels (Toluna, YouGov, Viewfruit), KKU Survey Marketplace offers:
- **Instant Local Micro-payouts:** PromptPay micro-transfers (from 20 THB minimum) with zero redemption delays.
- **Academic Rigor & Anti-Fraud:** 13-digit Thai Citizen ID verification, KKU Mail verification, Speeder Detection timers, and Attention Check auditing.
- **External Platform Agnostic:** Seamless handshake with existing Google Forms, Microsoft Forms, and Qualtrics via dynamic completion codes without forcing researchers to migrate surveys.

## Operating Context

- **Academic Calendar & Campus Life:** Peak survey demands happen near midterm/final project deadlines and thesis proposal seasons across 19 KKU faculties.
- **Device Ecosystem:** 75% mobile access for participants completing short surveys on smartphones; desktop/tablet for researchers configuring screening criteria and analyzing CSV datasets.
- **Integration Workflow:** Researchers paste their Google Forms/MS Forms link; platform injects completion code redirects; participants complete surveys externally and enter/redirect completion tokens to trigger escrow release.

## Capabilities and Constraints

- **Single Unified Account:** 1 Thai Citizen ID per account with role switcher (`Participant ⇄ Researcher`) in header.
- **Identity & Demographics (e-KYC):** 13-digit Thai ID verification, student ID validation, and demographic profiling (19 faculties, year of study, GPA, campus zone, living arrangement, monthly allowance).
- **External Handshake Engine:** Completion Code verification, minimum completion duration checks (Speeder Detection), and dispute handling.
- **Escrow Wallet:** Deposit via PromptPay QR, fund lock upon project launch, automatic payout upon approval, and PromptPay cash-out.
- **Backend Infrastructure:** Supabase PostgreSQL database (`profiles`, `research_projects`, `survey_responses`, `transactions`, `kyc_verifications`) with Row Level Security (RLS).

## Brand Commitments

- **Name:** KKU Survey Marketplace (ตลาดแบบสอบถามและงานวิจัย มข.)
- **Aesthetic:** Academic Rigor meets Modern Fintech (Crisp, Trustworthy, Professional).
- **Core Colors:**
  - Trust / Academic Blue: Primary `#2563EB` & `#1E3A8A`
  - Mor Din Daeng Brick Red (KKU Heritage Accent): `#A73B24` / `#C84B31`
  - Slate Neutrals: `#0F172A`, `#1E293B`, `#F8FAFC`
  - Emerald Success: `#059669` / `#10B981`
- **Typography:** Inter (Headings & Metrics) paired with Noto Sans Thai (Thai typography)

## Evidence on Hand

- Fully functional interactive web application running on Vite (`http://localhost:3000/`)
- Relational PostgreSQL database schema in `supabase/schema.sql`
- Connected Supabase cloud database project at `https://jqrrmbagfjtfgkxndyae.supabase.co`
- UI Design System specifications in `06_UI_DESIGN_SYSTEM.md` and `10_PROTOTYPE_SCOPE.md`

## Product Principles

1. **Absolute Data Integrity:** Never pay for speeders, bots, or duplicate responses; protect academic research validity at all costs.
2. **Frictionless Dual-Role Flow:** Every participant is a potential researcher; switching roles must take 1 click without separate registrations.
3. **Transparent Escrow:** Researchers know their budget is safe until valid responses are verified; participants know their effort is guaranteed fair pay upon honest completion.
4. **Campus Respect & Trust:** Honor KKU's academic culture with clean, accessible design that feels native to Khon Kaen University students and faculty.
