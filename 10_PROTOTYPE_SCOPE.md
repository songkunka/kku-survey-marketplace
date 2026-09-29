# 10 — Prototype Scope + Demo Data

# 1. Prototype Objective

Build a **high-fidelity, clickable web prototype** that demonstrates the complete service concept.

The prototype is for:

- Final Project presentation
- User testing
- Business model validation
- Demonstrating user journey
- Demonstrating marketplace mechanics

It is **not** a production system.

---

# 2. Prototype Principle

Prioritize:

```text
Flow > Backend
Clarity > Feature Count
Trust > Gamification
Realistic Data > Lorem Ipsum
```

---

# 3. Prototype Technology Assumption

The implementation tool may vary.

Recommended for a fast prototype:

```text
React / Next.js
+
Tailwind CSS
+
Mock Data
```

Alternative AI coding environments are acceptable.

No production backend is required for the first prototype.

---

# 4. Roles

Prototype must support switching between:

```text
Participant
Researcher
Admin
```

For demo purposes, use a role switcher or clearly separated demo accounts.

---

# 5. Participant Prototype

## Screens

```text
Login
↓
Dashboard
↓
Survey List
↓
Survey Detail
↓
Survey Completion
↓
Rewards
↓
Withdrawal
↓
Profile
```

## Interactions

### Start Survey

Click:

```text
[Start Survey]
```

→ Open completion simulation

### Complete Survey

Click:

```text
[Complete Survey]
```

→ Show success

→ Reward changes:

```text
Pending +฿3
```

Then simulate:

```text
Quality Passed
```

→ Balance increases by ฿3

### Duplicate Attempt

If the same Project is opened again:

```text
Already Completed
You can only complete this survey once.
```

---

# 6. Researcher Prototype

## Screens

```text
Login
↓
Researcher Dashboard
↓
Project List
↓
Create Project
↓
Review Project
↓
Project Detail
↓
Billing
```

## Create Project Interaction

Input:

```text
Target Responses = 400
Reward / Response = ฿2
```

Automatically calculate:

```text
Estimated Budget = ฿800
```

Changing either value must update the budget.

---

# 7. Project Dashboard Simulation

Default demo project:

```text
Project:
KKU Student Food Delivery Behavior

Target:
400

Completed:
267

Remaining:
133

Reward:
฿2 / response

Total Budget:
฿800

Used:
฿534

Remaining:
฿266
```

Progress:

```text
66.8%
```

---

# 8. Demo Data

## Participant

```text
Name:
Max

Role:
Participant

University:
Khon Kaen University

Faculty:
Business Administration

Year:
3

Verification:
Verified

Balance:
฿146
```

## Researcher

```text
Name:
KKU Research Lab

Role:
Researcher

Balance:
฿1,250
```

## Surveys

### Survey A

```text
Title:
KKU Student Food Delivery Behavior

Reward:
฿3

Time:
4 min

Eligibility:
KKU Undergraduate

Remaining:
87
```

### Survey B

```text
Title:
Student Mobile Banking Usage

Reward:
฿2

Time:
3 min

Eligibility:
KKU Students

Remaining:
142
```

### Survey C

```text
Title:
Campus Lifestyle & Entertainment

Reward:
฿5

Time:
7 min

Eligibility:
KKU Students Age 18–24

Remaining:
54
```

### Survey D

```text
Title:
KKU Transportation Behavior

Reward:
฿2

Time:
4 min

Eligibility:
Students who travel to campus

Remaining:
63
```

---

# 9. Demo Projects

## Project 1

```text
KKU Student Food Delivery Behavior

Target: 400
Completed: 267
Reward: ฿2
Budget: ฿800
Status: Active
```

## Project 2

```text
Student Mobile Banking Research

Target: 200
Completed: 200
Reward: ฿3
Budget: ฿600
Status: Completed
```

## Project 3

```text
KKU Gym Usage Study

Target: 150
Completed: 72
Reward: ฿4
Budget: ฿600
Status: Active
```

---

# 10. Demo Withdrawal

Participant:

```text
Available Balance: ฿146

Withdrawal Amount:
฿100

Fee:
฿5

Receives:
฿95
```

On confirm:

```text
Withdrawal Requested

Status: Processing
```

No real transfer.

---

# 11. Admin Prototype

Admin Dashboard shows:

```text
Participants       1,284
Researchers           87
Active Projects       36
Completed Responses 8,542
Pending Withdrawals   19
Fraud Flags            7
```

Review Queue:

```text
3 Projects Pending Review
7 Fraud Flags
19 Withdrawals Pending
```

---

# 12. Mock Rules

## Participant

```text
Verified = true
→ Can answer surveys
```

```text
Verified = false
→ Cannot answer surveys
```

## Survey

```text
Project status = Active
AND remaining > 0
→ Can participate
```

```text
remaining = 0
→ Project Full
```

## Duplicate

```text
completed(project, participant) = true
→ Block Start
```

## Budget

```text
target × reward
≤
researcher available balance
```

Otherwise:

```text
Insufficient Budget
```

---

# 13. Demo State Changes

The prototype should simulate these actions without real backend:

### Participant

```text
Start Survey
→ Complete
→ Reward +3
→ Balance updates
```

### Researcher

```text
Create Project
→ Budget calculated
→ Launch
→ Project appears as Active
```

### Admin

```text
Approve Project
→ Status changes Pending → Active
```

---

# 14. Out of Scope

Do NOT implement in this prototype:

- Real ID verification
- Real OCR of ID cards
- Real bank transfer
- Real payment gateway
- Production database
- Real fraud detection
- Real Google Forms response extraction
- Real KKU API
- Real notification infrastructure
- Complex admin permissions
- Production security architecture

---

# 15. Prototype Acceptance Checklist

## Product

- [ ] Visitor understands the concept
- [ ] Participant can discover a Survey
- [ ] Participant can see Reward before answering
- [ ] Participant can complete a Survey
- [ ] Reward updates visibly
- [ ] Duplicate response is blocked
- [ ] Researcher can create Project
- [ ] Budget calculates correctly
- [ ] Researcher can see recruitment progress
- [ ] Researcher can understand budget usage
- [ ] Admin can see operational overview

## UX

- [ ] Navigation is consistent
- [ ] Primary CTA is obvious
- [ ] Empty states exist
- [ ] Success/error states are clear
- [ ] Responsive layout works

## Presentation

The demo should be possible in approximately:

```text
3–5 minutes
```

using the following story:

```text
1. Researcher needs 400 responses
2. Creates a Project
3. Deposits ฿800
4. Participant sees the Survey
5. Participant completes it
6. Gets Reward
7. Researcher sees response count increase
8. Duplicate attempt is blocked
```

---

# 16. Prototype Data Relationship

```text
Researcher
   │
   ├── Project
   │      ├── Target
   │      ├── Reward
   │      ├── Budget
   │      └── Responses
   │
   └── Billing Balance

Participant
   │
   ├── Profile
   ├── Verification
   ├── Completed Projects
   └── Reward Balance
```

---

# 17. AI Coding Instruction

When generating the prototype:

1. Read all `.md` specification files first.
2. Treat the Sitemap as the navigation source of truth.
3. Treat the Page Spec as the content/layout source of truth.
4. Treat the UI Design System as the visual source of truth.
5. Treat the User Flow and Business Rules as behavior source of truth.
6. Do not invent major features not specified.
7. Prefer reusable components.
8. Use realistic Thai/English product copy rather than Lorem Ipsum.
9. Use mock data consistently across pages.
10. Keep the prototype visually polished but technically lightweight.

---

# 18. Final Prototype Definition

> A clickable high-fidelity prototype demonstrating how a verified KKU participant can discover and earn rewards from surveys while a researcher can purchase targeted responses, monitor recruitment, and manage research budget.
