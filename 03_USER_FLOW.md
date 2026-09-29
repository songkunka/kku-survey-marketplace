# 03 — User Flow

# 1. Overall Marketplace Flow

```text
Researcher Needs Respondents
        ↓
Create Project
        ↓
Set Target + Reward
        ↓
Deposit Budget
        ↓
Project Goes Live
        ↓
Matching Engine
        ↓
Eligible Participants
        ↓
Participant Completes Survey
        ↓
Quality Check
        ↓
Reward Released
        ↓
Project Reaches Quota
        ↓
Researcher Exports Data
```

---

# 2. Participant Onboarding

```text
Landing
 ↓
Register
 ↓
Choose Participant
 ↓
Basic Information
 ↓
Identity Verification
 ↓
Verification Success
 ↓
Complete Profile
 ↓
Participant Dashboard
```

### Edge Cases

```text
Verification Failed
→ Retry

Verification Pending
→ Limited access until verified
```

---

# 3. Participant Survey Flow

```text
Dashboard
 ↓
Survey Marketplace
 ↓
Filter / Browse
 ↓
Survey Detail
 ↓
Check Eligibility
 ↓
Start Survey
 ↓
External Survey / Prototype Survey
 ↓
Complete
 ↓
Quality Check
 ↓
Reward Added
 ↓
Success Screen
```

### Important UX

ก่อนกด Start ต้องเห็น:

```text
Reward: ฿2
Estimated Time: 4 min
Target: KKU Students
```

ผู้ใช้ไม่ควรต้องเข้า Survey ก่อนแล้วค่อยรู้ว่าได้เท่าไร

---

# 4. Duplicate Prevention Flow

```text
Participant clicks Start
        ↓
System checks:
Has participant completed this project?
        ↓
      ┌───────┴───────┐
      │               │
     YES             NO
      │               │
Show Already        Allow Start
Completed
```

Database concept:

```text
unique(project_id, participant_id)
```

---

# 5. Participant Reward Flow

```text
Survey Complete
 ↓
Reward Pending
 ↓
Quality Check
 ↓
   ┌──────────────┐
   │              │
 PASS           FAIL
   │              │
   ↓              ↓
Released       No Reward
   │
   ↓
Balance Updated
```

---

# 6. Participant Withdrawal

```text
Rewards
 ↓
Withdraw
 ↓
Enter Amount
 ↓
Select Payout Method
 ↓
Confirm
 ↓
Withdrawal Pending
 ↓
Processing
 ↓
Completed
```

Prototype:

ไม่ต้องเชื่อม Payment จริง

---

# 7. Researcher Onboarding

```text
Landing
 ↓
Register
 ↓
Choose Researcher
 ↓
Basic Profile
 ↓
Researcher Dashboard
```

---

# 8. Researcher Create Project

```text
Dashboard
 ↓
Create Project
 ↓
Project Information
 ↓
Survey Link
 ↓
Target Audience
 ↓
Quota
 ↓
Reward
 ↓
Budget Calculation
 ↓
Review
 ↓
Deposit Budget
 ↓
Launch Project
```

Budget formula:

```text
Target Responses × Reward Per Response
```

Example:

```text
400 × ฿2 = ฿800
```

---

# 9. Researcher Project Monitoring

```text
Project Dashboard
 ↓
Response Progress
 ↓
Remaining Target
 ↓
Budget Remaining
 ↓
Pause / Continue
 ↓
Complete
 ↓
Export
```

---

# 10. Researcher Cancellation

```text
Active Project
 ↓
Pause / Cancel
 ↓
Confirm
 ↓
Project Closed
 ↓
Unused Budget
→ Refund / Remaining Balance
```

Prototype สามารถแสดงเป็น Mock Action ได้

---

# 11. Admin Flow

```text
Admin Dashboard
 ↓
Review Queue
 ├── User Verification
 ├── Survey Project
 ├── Suspicious Response
 └── Withdrawal
```

ตัวอย่าง:

```text
New Project
→ Review
→ Approve
→ Live
```

หรือ:

```text
New Project
→ Reject
→ Reason
→ Researcher notified
```

---

# 12. Happy Path for Demo

## Demo A — Participant

```text
Login
→ Dashboard
→ Open Survey
→ Complete
→ Earn +2 Credit
→ Rewards
```

## Demo B — Researcher

```text
Login
→ Create Project
→ Set 400 Responses
→ Set ฿2 Reward
→ Budget = ฿800
→ Launch
→ Dashboard shows progress
```

## Demo C — Trust

```text
Verified Participant
→ Tries same survey again
→ System blocks duplicate response
```

These 3 paths should be fully clickable in the prototype.
