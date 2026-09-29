# 05 — Wireframe Specification

> Wireframes describe layout and hierarchy. They are not final visual design.

# 1. Landing

```text
┌──────────────────────────────────────────────────────────┐
│ LOGO       How It Works   Researchers   Participants     │
│                                         [Login] [Start]  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              FIND THE RIGHT RESPONDENTS                  │
│              GET BETTER RESEARCH DATA                    │
│                                                          │
│          KKU-focused survey participant marketplace     │
│                                                          │
│       [Find Surveys]       [Create Project]              │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                    HOW IT WORKS                           │
│                                                          │
│   01 Create       02 Match       03 Respond     04 Earn │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ For Researchers                    For Participants      │
│ [Create Project]                   [Browse Surveys]      │
├──────────────────────────────────────────────────────────┤
│                    TRUST & SAFETY                        │
└──────────────────────────────────────────────────────────┘
```

# 2. Participant Dashboard

```text
┌───────────────┬──────────────────────────────────────────┐
│ Logo          │ Good afternoon, Max                      │
│               │                                          │
│ Dashboard     │ ┌────────┐ ┌────────┐ ┌──────────────┐ │
│ Surveys       │ │ Surveys│ │Completed│ │ Balance      │ │
│ Rewards       │ │   8    │ │   12    │ │ ฿146         │ │
│ Withdraw      │ └────────┘ └────────┘ └──────────────┘ │
│ Profile       │                                          │
│               │ Recommended Surveys                      │
│               │ ┌──────────────────────────────────────┐ │
│               │ │ KKU Food Delivery Behavior            │ │
│               │ │ 4 min · +฿3 · 87 remaining           │ │
│               │ │                         [Start]       │ │
│               │ └──────────────────────────────────────┘ │
│               │                                          │
│               │ Recent Activity                          │
└───────────────┴──────────────────────────────────────────┘
```

# 3. Survey List

```text
┌───────────────┬──────────────────────────────────────────┐
│ Sidebar        │ Surveys                                 │
│               │ [Search................] [Filter]        │
│               │                                          │
│               │ ┌──────────────┐ ┌──────────────┐       │
│               │ │ Survey A     │ │ Survey B     │       │
│               │ │ +฿3          │ │ +฿5          │       │
│               │ │ 4 min        │ │ 8 min        │       │
│               │ │ [View]       │ │ [View]       │       │
│               │ └──────────────┘ └──────────────┘       │
└───────────────┴──────────────────────────────────────────┘
```

# 4. Survey Detail

```text
┌──────────────────────────────────────────────────────────┐
│ ← Back to Surveys                                        │
│                                                          │
│ KKU Student Food Delivery Behavior                        │
│                                                          │
│ ┌───────────┐ ┌───────────┐ ┌────────────────────────┐ │
│ │ Reward    │ │ Time      │ │ Responses Remaining    │ │
│ │ ฿3        │ │ 4 min     │ │ 87                     │ │
│ └───────────┘ └───────────┘ └────────────────────────┘ │
│                                                          │
│ About this research                                     │
│ ......................................................... │
│                                                          │
│ Who can participate?                                    │
│ KKU Undergraduate Students                              │
│                                                          │
│              [Start Survey]                              │
└──────────────────────────────────────────────────────────┘
```

# 5. Participant Rewards

```text
┌───────────────┬──────────────────────────────────────────┐
│ Sidebar       │ Rewards                                  │
│               │                                          │
│               │ Available Balance                        │
│               │                                          │
│               │             ฿146.00                      │
│               │                                          │
│               │              [Withdraw]                  │
│               │                                          │
│               │ Recent Transactions                       │
│               │ ┌──────────────────────────────────────┐ │
│               │ │ Survey A                 +฿3         │ │
│               │ │ Survey B                 +฿5         │ │
│               │ │ Withdrawal               -฿50       │ │
│               │ └──────────────────────────────────────┘ │
└───────────────┴──────────────────────────────────────────┘
```

# 6. Researcher Dashboard

```text
┌───────────────┬──────────────────────────────────────────┐
│ Logo          │ Research Dashboard                      │
│               │                                          │
│ Dashboard     │ ┌────────┐ ┌────────┐ ┌──────────────┐ │
│ Projects      │ │Active  │ │Responses│ │Budget        │ │
│ Create        │ │   3    │ │  1,247  │ │ ฿2,450       │ │
│ Responses     │ └────────┘ └────────┘ └──────────────┘ │
│ Billing       │                                          │
│ Profile       │ Active Projects                         │
│               │ ┌──────────────────────────────────────┐ │
│               │ │ Food Delivery Study                  │ │
│               │ │ 267 / 400                            │ │
│               │ │ ███████████████░░░░                  │ │
│               │ │ Budget ฿266 left       [View]       │ │
│               │ └──────────────────────────────────────┘ │
│               │                     [+ Create Project]  │
└───────────────┴──────────────────────────────────────────┘
```

# 7. Create Project

```text
┌──────────────────────────────────────────────────────────┐
│ Create Research Project                                  │
│                                                          │
│ ① Basics     ② Audience     ③ Quota     ④ Reward       │
│                                                          │
│ Project Name                                              │
│ [.......................................................] │
│                                                          │
│ Survey URL                                                │
│ [.......................................................] │
│                                                          │
│ Description                                               │
│ [.......................................................] │
│ [.......................................................] │
│                                                          │
│                                      [Next →]             │
└──────────────────────────────────────────────────────────┘
```

# 8. Project Detail

```text
┌──────────────────────────────────────────────────────────┐
│ Food Delivery Study                         Active       │
│                                             [Pause]      │
├──────────────────────────────────────────────────────────┤
│ 400 TARGET     267 COMPLETED     133 LEFT     66.8%      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ Recruitment Progress                                     │
│ ████████████████░░░░░░                                  │
│ 267 / 400                                                │
│                                                          │
│ Budget                                                   │
│ Total ฿800       Used ฿534       Remaining ฿266         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Overview | Responses | Audience | Activity              │
│                                                          │
│                                         [Export Data]     │
└──────────────────────────────────────────────────────────┘
```

# 9. Prototype Screen Hierarchy

The visual hierarchy should always follow:

```text
Page Title
↓
Primary KPI / Status
↓
Primary Content
↓
Supporting Details
↓
Primary CTA
```

Avoid overwhelming users with too many cards, charts, or secondary actions.
