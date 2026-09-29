# 04 — Page Specification

# Global Layout

## Desktop

```text
┌─────────────────────────────────────────────────────┐
│ Logo                              Notification User │
├───────────────┬─────────────────────────────────────┤
│ Sidebar       │ Main Content                        │
│               │                                     │
│ Navigation    │                                     │
│               │                                     │
└───────────────┴─────────────────────────────────────┘
```

## Mobile

```text
┌─────────────────────┐
│ Logo      Bell      │
├─────────────────────┤
│                     │
│ Main Content        │
│                     │
├─────────────────────┤
│ Home Surveys Reward │
└─────────────────────┘
```

---

# 1. Landing Page

## Purpose
อธิบาย Value Proposition ในไม่กี่วินาที

### Hero

Headline:

> Find the Right Respondents. Get Better Research Data.

Subheadline:

> KKU-focused survey recruitment with verified participants and rewards.

CTA:

```text
[Find Surveys]
[Create a Research Project]
```

### Sections

1. Hero
2. How It Works
3. For Participants
4. For Researchers
5. Trust & Safety
6. FAQ
7. CTA

---

# 2. Participant Dashboard

## Header
- Greeting
- Notification
- Reward Balance
- Profile

## Main KPI

```text
Available Surveys
Completed Surveys
Current Balance
```

## Main Sections

### Recommended Surveys

Survey cards:

```text
KKU Student Food Delivery
4 min
+฿3
87 responses left
[Start]
```

### Recent Activity

```text
Survey completed     +฿2
Withdrawal           -฿50
Reward released      +฿5
```

---

# 3. Survey List

## Header

```text
Surveys
[Search]
[Filter]
```

## Filters

- Reward
- Time
- Faculty
- Year
- Eligibility

## Card

```text
Title
Researcher
Description
Reward
Estimated Time
Eligibility
Remaining
[View Survey]
```

---

# 4. Survey Detail

## Hero

```text
Survey Title

Reward     ฿3
Time       4 min
Remaining 87
```

## Information

- About this research
- Who can participate
- What you need to do
- Reward conditions
- Privacy note

CTA:

```text
[Start Survey]
```

---

# 5. Survey Completion Success

```text
✓ Survey Completed

Reward
+3 Credits

Status
Pending Quality Check

[View Rewards]
[Back to Surveys]
```

---

# 6. Participant Rewards

## Balance

```text
Available Balance
฿146.00

[Withdraw]
```

## Stats

```text
Earned This Month
Completed Surveys
Total Withdrawn
```

## Transaction History

Columns:

```text
Date
Description
Amount
Status
```

---

# 7. Withdrawal Page

## Balance

```text
Available: ฿146
```

## Form

```text
Amount
Payout Method
Account
```

CTA:

```text
[Request Withdrawal]
```

Show minimum withdrawal and fee clearly.

---

# 8. Participant Profile

Sections:

### Personal
- Display Name
- University
- Faculty
- Major
- Year

### Verification

```text
Identity
✓ Verified
```

### Preferences

- Survey categories
- Notifications

---

# 9. Researcher Dashboard

## KPI

```text
Active Projects
Total Responses
Response Rate
Research Budget
```

## Active Projects

```text
Project
Progress
Responses
Budget
Status
Action
```

CTA:

```text
[+ Create Project]
```

---

# 10. Project List

Tabs:

```text
All
Active
Draft
Completed
Paused
```

Cards / Table:

```text
Project Name
Target
Completed
Reward
Budget
Status
[View]
```

---

# 11. Create Project

## Step 1 — Basics

```text
Project Name
Description
Survey URL
```

## Step 2 — Audience

```text
University
Faculty
Year
Age Range
Other Eligibility
```

## Step 3 — Quota

```text
Total Responses

Optional:
Male
Female
Year 1
Year 2
Year 3
Year 4
```

## Step 4 — Reward

```text
Reward / Response: ฿2

Target: 400

Estimated Research Budget:
฿800
```

## Step 5 — Review

Summary card:

```text
Target
Reward
Budget
Audience
Duration
```

CTA:

```text
[Deposit & Launch]
```

---

# 12. Project Detail

## Header

```text
Project Name
Status: Active
[Pause]
```

## KPI

```text
400 Target
267 Completed
133 Remaining
66.8% Progress
```

## Budget

```text
Total Budget ฿800
Used ฿534
Remaining ฿266
```

## Recruitment Chart

แสดง progress แบบง่าย

```text
████████████████░░░░
267 / 400
```

## Tabs

```text
Overview
Responses
Audience
Activity
```

CTA:

```text
[Export Data]
```

---

# 13. Researcher Billing

## Balance

```text
Research Credits
฿1,250
```

Buttons:

```text
[Add Funds]
[Transaction History]
```

---

# 14. Admin Dashboard

## KPI

```text
Participants
Researchers
Active Projects
Completed Responses
Pending Withdrawals
Flags
```

## Review Queue

```text
Project Review
Identity Review
Fraud Review
Withdrawal Review
```

Admin page is primarily operational and does not need elaborate visual design for MVP.

---

# 15. Shared Components

- Button
- Input
- Select
- Search
- Filter
- Card
- Badge
- Progress Bar
- Modal
- Toast
- Empty State
- Table
- Status Indicator
- Confirmation Dialog
