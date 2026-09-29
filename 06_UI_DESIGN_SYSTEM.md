# 06 — UI Design System

# 1. Design Direction

## Keywords

```text
Clean
Modern
Trustworthy
Academic
Digital
Minimal
Friendly but not playful
```

The product should feel closer to:

> Research Platform + Fintech Dashboard

than:

> Survey / Rewards / Gamification website

---

# 2. Visual Personality

### Should Feel

- Reliable
- Transparent
- Simple
- Professional
- Fast

### Should NOT Feel

- Gambling-like
- Overly gamified
- Cheap “earn money” website
- Government portal
- Corporate enterprise software

---

# 3. Color System

Use a restrained palette.

```text
Primary
#2563EB

Primary Dark
#1D4ED8

Background
#F8FAFC

Surface
#FFFFFF

Text Primary
#0F172A

Text Secondary
#64748B

Border
#E2E8F0

Success
#16A34A

Warning
#D97706

Error
#DC2626
```

Use color primarily for:
- CTA
- Status
- Progress
- Important information

Do not flood the interface with bright colors.

---

# 4. Typography

Recommended:

```text
Font: Inter
```

Thai fallback:

```text
Inter, Noto Sans Thai, sans-serif
```

### Scale

```text
Display     48 / 56
H1          36 / 44
H2          28 / 36
H3          22 / 30
Body        16 / 24
Small       14 / 20
Caption     12 / 18
```

---

# 5. Spacing

Use 8px based spacing:

```text
4
8
12
16
24
32
48
64
```

Prefer consistent spacing over visual density.

---

# 6. Border Radius

```text
Small components: 8px
Cards: 12px
Large containers: 16px
Buttons: 8px
```

Avoid overly rounded “bubble” UI.

---

# 7. Buttons

## Primary

Used for:

- Start Survey
- Create Project
- Deposit & Launch
- Withdraw

Example:

```text
[Start Survey]
```

## Secondary

Used for:

- View
- Cancel
- Back
- Filters

## Destructive

Used for:

- Cancel Project
- Reject
- Delete

---

# 8. Cards

Card structure:

```text
Title
↓
Metadata
↓
Key value
↓
Secondary details
↓
CTA
```

Example:

```text
KKU Student Food Delivery

4 min · KKU Students

+฿3 Reward

87 responses remaining

[Start Survey]
```

---

# 9. Status System

### Active

```text
Green dot + Active
```

### Pending

```text
Amber dot + Pending
```

### Completed

```text
Neutral / success + Completed
```

### Paused

```text
Gray / amber + Paused
```

### Rejected

```text
Red + Rejected
```

---

# 10. Progress Bar

Use progress for recruitment.

Example:

```text
267 / 400

████████████████░░░░
66.8%
```

Show both visual progress and exact numbers.

---

# 11. Icons

Use a consistent icon library.

Recommended:

```text
Lucide Icons
```

Icons should support meaning, not replace labels when the action may be ambiguous.

---

# 12. Tables

Researcher/Admin tables should use:

```text
Clear column labels
Right-aligned numbers
Status badges
Compact actions
Hover state
```

Example:

```text
Project | Target | Completed | Budget | Status | Action
```

---

# 13. Forms

Forms should:

- Group related fields
- Use clear labels above fields
- Show helper text when needed
- Validate inline
- Avoid unnecessary required fields

Example:

```text
Reward per response
[ ฿2.00 ]

Target Responses
[ 400 ]

Estimated Budget
฿800
```

---

# 14. Empty States

Example:

```text
No active projects

Create your first research project
to start recruiting participants.

[Create Project]
```

Do not show a blank screen.

---

# 15. Trust UI

Trust is a major Product element.

Use subtle indicators:

```text
✓ Verified Participant
🔒 Secure verification
Funded Project
```

Avoid excessive badges.

---

# 16. Reward UI

Reward should always be easy to understand.

Preferred:

```text
+฿3
```

Secondary:

```text
3 Credits
```

For the Prototype, use:

> **1 Credit = ฿1 Reward Value**

Do not present Credit as an independent currency.

---

# 17. Responsive Rules

## Desktop

Sidebar + content

## Tablet

Collapsible sidebar

## Mobile

Bottom navigation:

```text
Home
Surveys
Rewards
Profile
```

Researcher:

```text
Home
Projects
Create
Billing
Profile
```

---

# 18. Interaction Principles

- Use one obvious Primary CTA per major screen
- Confirm financial actions
- Show success immediately after important actions
- Preserve user context after navigation
- Avoid unnecessary modals
- Use toast for low-risk success notifications

---

# 19. Prototype Visual Goal

The first impression should communicate:

> “This is a real product for research recruitment.”

Not:

> “This is a student project mockup.”
