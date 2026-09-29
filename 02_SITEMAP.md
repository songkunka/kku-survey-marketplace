# 02 — Website Sitemap

## 1. Information Architecture

```text
KKU Survey Marketplace
│
├── Public
│   ├── Landing Page
│   ├── How It Works
│   ├── Trust & Safety
│   ├── FAQ
│   ├── Login
│   └── Register
│
├── Participant
│   ├── Dashboard
│   ├── Surveys
│   │   ├── Survey List
│   │   └── Survey Detail
│   ├── Rewards
│   │   ├── Balance
│   │   ├── Transaction History
│   │   └── Withdrawal
│   ├── Profile
│   ├── Verification
│   └── Notifications
│
├── Researcher
│   ├── Dashboard
│   ├── Projects
│   │   ├── Project List
│   │   ├── Create Project
│   │   └── Project Detail
│   ├── Responses
│   ├── Billing
│   │   ├── Balance
│   │   └── Transactions
│   ├── Profile
│   └── Notifications
│
└── Admin
    ├── Dashboard
    ├── Users
    ├── Verification
    ├── Projects
    ├── Responses
    ├── Withdrawals
    ├── Fraud Review
    └── Settings
```

---

# 2. Navigation

## Participant Sidebar

```text
Dashboard
Surveys
Rewards
Withdraw
Profile
Notifications
```

## Researcher Sidebar

```text
Dashboard
My Projects
Create Project
Responses
Billing
Profile
Notifications
```

## Admin Sidebar

```text
Dashboard
Users
Verification
Projects
Responses
Withdrawals
Fraud Review
```

---

# 3. Public Navigation

Header:

```text
Logo
How It Works
For Researchers
For Participants
FAQ
[Login]
[Get Started]
```

Landing Page sections:

```text
Hero
↓
How It Works
↓
For Researchers
↓
For Participants
↓
Trust & Safety
↓
FAQ
↓
CTA
↓
Footer
```

---

# 4. Page Priority

## P0 — Prototype Must Show

### Public
- Landing
- Login
- Register

### Participant
- Dashboard
- Survey List
- Survey Detail
- Rewards
- Withdrawal
- Profile

### Researcher
- Dashboard
- Project List
- Create Project
- Project Detail
- Billing

### Admin
- Dashboard

---

## P1 — Show if Time Allows

- Notifications
- Response analytics
- Verification detail
- Admin Users
- Admin Project Review
- Fraud Review

---

# 5. Route Naming

```text
/
 /how-it-works
 /login
 /register

 /participant
 /participant/surveys
 /participant/surveys/:id
 /participant/rewards
 /participant/withdraw
 /participant/profile

 /researcher
 /researcher/projects
 /researcher/projects/new
 /researcher/projects/:id
 /researcher/responses
 /researcher/billing
 /researcher/profile

 /admin
 /admin/users
 /admin/projects
 /admin/withdrawals
 /admin/fraud
```

---

# 6. Prototype Navigation Rule

AI/Developer should avoid dead-end pages.

Every major screen must provide a visible next action or navigation back to the relevant dashboard.
