# 01 — Product Requirements Document (PRD)

## 1. Product

**Working Name:** KKU Survey Marketplace

**Product Type:** Research Participant Marketplace

**Primary Goal:**
ช่วยให้นักศึกษา/นักวิจัยสามารถหา Respondents ที่ตรงกลุ่มได้ง่ายขึ้น ขณะเดียวกันเปิดโอกาสให้นักศึกษา KKU และชุมชนใกล้เคียงได้รับ Incentive จากการตอบแบบสอบถาม

---

## 2. Product Principles

1. **Research-first** — เริ่มจากปัญหาการหา Sample ไม่ใช่เริ่มจาก Technology
2. **Trust-first** — Verification, Budget Lock และ Quality Control ต้องสร้างความเชื่อมั่น
3. **Simple** — ฝั่ง Researcher สร้าง Project ได้ภายในไม่กี่ขั้นตอน
4. **Transparent** — จำนวนคนที่ต้องการ, Reward, Budget และสถานะต้องชัดเจน
5. **Privacy by Design** — เก็บข้อมูลเท่าที่จำเป็น และแยกข้อมูลยืนยันตัวตนออกจาก Research Dataset
6. **MVP-first** — Prototype เน้นพิสูจน์ Service Flow ก่อนสร้างระบบเต็ม

---

# 3. User Roles

## 3.1 Participant

นักศึกษาหรือบุคคลในกลุ่มเป้าหมายที่เข้ามาตอบแบบสอบถาม

### Goals
- หา Survey ที่ตรงกับตนเอง
- ใช้เวลาไม่นาน
- รู้ Reward ก่อนเริ่ม
- ได้รับ Reward ตามเงื่อนไข
- ถอนเงินได้ง่าย

### Core Actions
- Register
- Verify Identity
- Complete Profile
- Browse Surveys
- Start Survey
- Complete Survey
- View Reward
- Request Withdrawal

---

## 3.2 Researcher

นักศึกษา อาจารย์ นักวิจัย หรือในอนาคต SME/Startup ที่ต้องการ Respondents

### Goals
- หา Respondents ให้ครบ
- ได้กลุ่มเป้าหมายที่ตรง
- ควบคุม Budget
- ติดตาม Progress
- Export Data

### Core Actions
- Register
- Create Project
- Set Target
- Set Reward
- Deposit Budget
- Launch Project
- Monitor Responses
- Export Results

---

## 3.3 Admin

ผู้ดูแล Platform

### Goals
- รักษาคุณภาพและความปลอดภัย
- ตรวจ Survey
- ตรวจ Fraud
- จัดการ Withdrawal
- Monitor Marketplace

### Core Actions
- Manage Users
- Review Verification
- Approve / Reject Project
- Review Suspicious Response
- Process Withdrawal
- View Platform Analytics

---

# 4. Functional Requirements

## 4.1 Authentication

### Must Have
- Email / phone based login
- Password / OTP concept
- Role selection
- Logout
- Basic account recovery

### Prototype
ใช้ Mock Authentication ได้

---

## 4.2 Identity Verification

### Requirement
ผู้ใช้ต้องผ่าน Verification ก่อนตอบ Survey

### Prototype
แสดง Verification Flow จำลอง

```text
Upload ID
→ Verification Processing
→ Verified
```

ไม่ต้องเชื่อมระบบตรวจบัตรจริงใน Prototype

---

## 4.3 Participant Profile

Fields:
- Display Name
- University
- Faculty
- Major
- Year
- Age Range
- Other matching attributes

### Rule
แสดงเฉพาะข้อมูลที่จำเป็นต่อ Matching

---

## 4.4 Survey Marketplace

Participant ต้องสามารถ:
- ดู Survey ที่แนะนำ
- Filter
- Sort
- ดู Reward
- ดู Estimated Time
- ดู Eligibility
- ดูจำนวนที่ยังเหลือ

### Survey Card

```text
Survey Title
Researcher
Reward
Estimated Time
Target
Remaining
[Start Survey]
```

---

## 4.5 Create Survey Project

Researcher ต้องสามารถกำหนด:
- Project Name
- Description
- Survey URL
- Total Responses
- Reward / Response
- Target Audience
- Quota
- Start Date
- End Date

---

## 4.6 Project Budget

Formula:

```text
Reward Budget
= Target Responses × Reward Per Response
```

Example:

```text
400 × ฿2
= ฿800
```

Researcher ต้องมี Budget เพียงพอก่อนเปิด Project

---

## 4.7 Response Tracking

Project Dashboard แสดง:
- Target
- Completed
- Remaining
- Progress %
- Budget Remaining
- Status

---

## 4.8 Reward Ledger

เมื่อ Participant ทำ Survey สำเร็จ:

```text
Pending
→ Quality Check
→ Released
```

Prototype สามารถจำลองให้ Reward Released ทันทีหลัง Complete

---

## 4.9 Withdrawal

Participant:
- เห็น Balance
- กำหนดจำนวนถอน
- เลือกวิธีรับเงิน
- ดูสถานะ Withdrawal

Prototype ใช้ Mock Status:

```text
Pending
Processing
Completed
```

---

# 5. Non-Functional Requirements

## Performance
- Dashboard ควรโหลดเร็ว
- Navigation ต้องลื่น
- UI ไม่ควรมี Loading ที่ไม่จำเป็นใน Prototype

## Security
- ไม่มี Sensitive ID data ใน UI ของ Researcher
- Role-based access
- ไม่แสดงข้อมูลผู้ใช้เกินสิทธิ

## Accessibility
- อ่านง่าย
- Contrast เพียงพอ
- Button มี Label ชัดเจน
- รองรับ Desktop และ Mobile layout เบื้องต้น

---

# 6. MVP Product Boundary

### Included
- Auth
- Participant Profile
- Researcher Dashboard
- Survey Marketplace
- Create Project
- Project Dashboard
- Reward Balance
- Withdrawal UI
- Admin Overview
- Mock data

### Excluded
- Real payment gateway
- Real ID verification
- Native survey builder
- Production fraud engine
- Real bank transfer
- Advanced analytics
- AI matching

---

# 7. Success Criteria for Prototype

Prototype ถือว่าสื่อ Product ได้ เมื่อผู้ดูสามารถเข้าใจได้ภายในไม่กี่นาทีว่า:

1. Researcher สร้าง Survey Project อย่างไร
2. Participant หา Survey และรับ Reward อย่างไร
3. Platform ป้องกันการตอบซ้ำ/สร้าง Trust อย่างไร
4. เงินไหลจาก Researcher → Participant อย่างไร
5. ทำไม Solution นี้ดีกว่าการโพสต์หา Respondents ใน Facebook

---

# 8. Product Vocabulary

| Term | Meaning |
|---|---|
| Project | งาน Survey หนึ่งงานของ Researcher |
| Participant | ผู้ตอบ Survey |
| Reward | ค่าตอบแทนต่อ Survey |
| Budget | งบที่ Researcher ฝากสำหรับ Project |
| Credit | หน่วยมูลค่า Reward ภายใน Prototype |
| Response | คำตอบจาก Participant |
| Quota | จำนวนที่ต้องการในแต่ละกลุ่ม |
| Verification | กระบวนการยืนยันตัวตน |
| Quality Check | ตรวจสอบคุณภาพ Response |

> Prototype ใช้คำว่า **Credit** แทน Coin เพื่อให้ดูเป็น Platform Balance มากกว่าสกุลเงินใหม่
