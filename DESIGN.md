---
name: KKU Survey Marketplace
description: Academic Research Participant Marketplace for Khon Kaen University
colors:
  primary: "#2563EB"
  primary-dark: "#1E3A8A"
  primary-light: "#EFF6FF"
  brand-kku: "#A73B24"
  brand-kku-hover: "#8C2F1C"
  brand-kku-light: "#FEF2F2"
  surface: "#FFFFFF"
  surface-muted: "#F8FAFC"
  surface-card: "#FFFFFF"
  border: "#E2E8F0"
  border-focus: "#3B82F6"
  text-primary: "#0F172A"
  text-secondary: "#475569"
  text-muted: "#94A3B8"
  text-inverse: "#FFFFFF"
  success: "#059669"
  success-light: "#ECFDF5"
  warning: "#D97706"
  warning-light: "#FFFBEB"
  error: "#DC2626"
  error-light: "#FEF2F2"
typography:
  display:
    fontFamily: "Inter, Noto Sans Thai, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: "1.25"
  heading:
    fontFamily: "Inter, Noto Sans Thai, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.35"
  body:
    fontFamily: "Noto Sans Thai, Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.5"
  caption:
    fontFamily: "Noto Sans Thai, Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: "1.4"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
  button-kku:
    backgroundColor: "{colors.brand-kku}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
  badge-kyc-verified:
    backgroundColor: "{colors.success-light}"
    textColor: "{colors.success}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Design System

## Overview

KKU Survey Marketplace combines **Academic Rigor** with **Modern Fintech Clarity**. The visual language feels dependable, mathematically structured, and welcoming to Khon Kaen University students and faculty. It avoids frivolous decoration, focusing instead on high information density, rapid scannability, clear monetary compensation, and transparent research integrity signals.

## Colors

- **Primary Brand (Trust Blue):** `#2563EB` (interactive states), `#1E3A8A` (headings, academic depth), `#EFF6FF` (subtle active backgrounds).
- **Heritage Accent (Mor Din Daeng Brick Red):** `#A73B24` (KKU identity badge, primary CTAs for research creation), `#8C2F1C` (hover state), `#FEF2F2` (soft accent tag).
- **Surfaces & Borders:** Crisp `#FFFFFF` card surfaces against a subtle `#F8FAFC` viewport background with refined `#E2E8F0` micro-borders.
- **Semantic Accents:**
  - Success / Payouts / KYC Verified: `#059669` / `#ECFDF5`
  - Warning / Under Review / Attention Checks: `#D97706` / `#FFFBEB`
  - Danger / Fraud / Speeder Rejection: `#DC2626` / `#FEF2F2`

## Typography

- **Headings & Financial Metrics:** **Inter** (`font-semibold`, `font-bold`) ensures numerical values (e.g. `฿35`, `8/100 คน`, `12 นาที`) are strictly monospaced or proportional for instant scannability.
- **Body & UI Labels:** **Noto Sans Thai** (`font-normal`, `font-medium`) ensures natural Thai character line-breaking and legible glyph rendering across all operating systems.
- **Type Scale:**
  - Hero Display: `30px` (24px on mobile)
  - Section Headings: `20px`
  - Card Titles: `16px`
  - Body Text: `14px`
  - Micro-metadata & Badges: `12px` / `11px`

## Layout

- **Grid & Breakpoints:** 8px base grid. Max container width `1280px` (`max-w-7xl`).
- **Sidebar & Top Navigation:**
  - Fixed Top Header (`h-16`) carrying Mode Switcher (`Participant ⇄ Researcher`), KYC badge, and Escrow balance.
  - Collapsible Sidebar (`w-64`) grouped by operational workflow (Browse, History, Analytics, Wallet).
- **Mobile-Responsive Adaptations:**
  - Mobile bottom navigation dock for participant browsing and survey completion.
  - Desktop multi-column layout for researcher dashboard and demographic screening builder.

## Elevation & Depth

- **Flat Precision with Ambient Shadows:**
  - `shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)` for survey list items and filter chips.
  - `shadow-md`: `0 4px 6px -1px rgb(0 0 0 / 0.08)` for active modals and dropdowns.
  - Subtle border definitions (`border border-slate-200`) prevent visual blurring across light displays.

## Shapes

- **Corner Radii:**
  - Inputs & Buttons: `rounded-lg` (`10px` or `8px`)
  - Badges & Pills: `rounded-full` (`9999px`)
  - Modals & Cards: `rounded-2xl` (`16px`)
- **Visual Weight:** Solid filled buttons for high-priority actions; ghost/outline buttons for secondary filters to maintain visual calm.

## Components

- **Role Switcher Bar:** Top-right pills allowing 1-click transition between `[ 🎓 สลับไปโหมดผู้ตอบ ]` and `[ 🔬 สลับไปโหมดนักวิจัย ]` with smooth color feedback.
- **Survey Card:** Clear three-part card:
  1. Header: Faculty badge + Estimated time pill + Compensation badge (`฿25`).
  2. Body: Survey title and objective description.
  3. Footer: Quota progress bar (`45/100 คน`) + Action CTA (`ทำแบบสอบถาม`).
- **KYC Verification Badge:** Status indicator (`รอตรวจสอบ`, `ยืนยันตัวตนแล้ว`, `ยังไม่ยืนยัน`) with icon.
- **Timer / Speeder Safeguard:** Countdown timer ensuring minimum honest time spent before completion code submission is unlocked.

## Do's and Don'ts

### Do's:
- Display reward amounts clearly in Thai Baht (`฿XX.00`) alongside estimated completion minutes.
- Keep Thai text natural with proper padding so Thai tone marks (วรรณยุกต์) are never clipped.
- Give instant visual feedback on state changes (wallet update, KYC approval, submission status).
- Preserve the single-account paradigm: never prompt a logged-in user to create a second account to research.

### Don'ts:
- Never use abrasive fluorescent or generic bright reds; always stick to Mor Din Daeng Brick Red (`#A73B24`).
- Never force respondents into long survey forms inside iframes; use reliable external completion code handshakes.
- Never omit the minimum completion time guardrail.
