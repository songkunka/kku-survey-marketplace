# KKU Survey Marketplace — Interactive Web Prototype

> **Research Participant Marketplace สำหรับมหาวิทยาลัยขอนแก่น**  
> ตลาดกลางจัดหากลุ่มตัวอย่างคุณภาพสำหรับงานวิจัยและแบบสอบถาม พร้อมระบบ Incentive & Participant Verification

---

## 🌟 ฟีเจอร์หลักใน Prototype (Features)

1. **Role Switcher Bar:** แถบสลับบทบาทด้านบน เพื่อทดสอบและสาธิต 4 มุมมอง:
   - **Public Landing Page:** หน้าแรกแนะนำบริการ เปรียบเทียบกับกลุ่ม Facebook
   - **Participant (ผู้ตอบแบบสอบถาม):** ดูโควตา, ตอบแบบสอบถาม, รับเครดิต (฿2 - ฿5), ถอนเงินเข้าบัญชีจริง
   - **Researcher (นักวิจัย/คนทำโปรเจกต์):** สร้างโปรเจกต์ คำนวณงบประมาณอัตโนมัติ (จำนวนคน × ค่าตอบแทน), ติดตามความคืบหน้าแบบ Real-time, Export CSV
   - **Admin (ผู้ดูแลระบบ):** Dashboard ภาพรวมระบบ, อนุมัติแบบสอบถาม, อนุมัติการถอนเงิน
2. **Interactive Mock Database (LocalStorage):**
   - ตอบแบบสอบถามเสร็จ ➔ ยอดเงินเพิ่มขึ้นทันที + ความคืบหน้าของ Researcher อัปเดตทันที
   - **Duplicate Prevention:** ระบบบล็อกไม่ให้ผู้ใช้เดิมตอบแบบสอบถามเดิมซ้ำ 100%
   - มีปุ่ม **"รีเซ็ตข้อมูล"** สำหรับเริ่มทดสอบใหม่ได้ตลอดเวลา
3. **Design System:** สไตล์ Academic + Fintech Dashboard สะอาดตา น่าเชื่อถือ โทนสีน้ำเงิน `#2563EB` ตามมาตรฐาน [06_UI_DESIGN_SYSTEM.md](./06_UI_DESIGN_SYSTEM.md)

---

## 🚀 การติดตั้งและรันในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. รันเซิร์ฟเวอร์ทดสอบ
npm run dev

# 3. ทดสอบ Build เพื่อ Production
npm run build
```

---

## ☁️ การนำขึ้น GitHub และ Deploy สู่ Vercel / Netlify

### วิธีที่ 1: Deploy ผ่าน Vercel (แนะนำ - เร็วที่สุด)
1. Push โค้ดขึ้น GitHub repository
2. เข้าสู่ [vercel.com](https://vercel.com) แล้วล็อกอินด้วย GitHub
3. กด **"Add New Project"** ➔ เลือก Repository นี้
4. Vercel จะตรวจจับว่าเป็น Vite อัตโนมัติ (Build Command: `npm run build`, Output Directory: `dist`)
5. มีไฟล์ `vercel.json` ป้องกันปัญหา Error 404 สำหรับ Single Page Application (SPA) ให้เรียบร้อยแล้ว
6. กด **Deploy** ➔ ได้ URL พร้อมแชร์ทันที!

### วิธีที่ 2: Deploy ผ่าน Netlify
1. เข้าสู่ [netlify.com](https://netlify.com) ➔ ล็อกอินด้วย GitHub
2. กด **"Add new site"** ➔ **"Import an existing project"** ➔ เลือก Repository นี้
3. ตั้งค่า Build Command: `npm run build` และ Publish directory: `dist`
4. มีไฟล์ `public/_redirects` รองรับ SPA Routing เรียบร้อยแล้ว
5. กด **Deploy site** ➔ ได้ URL เว็บไซต์ทันที

---

## 🎯 แผนการนำเสนอ Demo ใน 3-5 นาที (Pitching Story)

1. **เปิดหน้าแรก (Public):** ชี้ให้เห็น Pain Point การขอคนตอบในกลุ่ม Facebook ที่คุมคุณภาพไม่ได้
2. **สลับเป็น Researcher:** สร้างโปรเจกต์ใหม่ กรอก 400 คน × ฿2 ➔ ระบบคิดงบ ฿800 ➔ กดปล่อยโปรเจกต์
3. **สลับเป็น Participant:** จะเห็นแบบสอบถามใหม่โผล่ใน Marketplace ทันที ➔ กดตอบ ➔ ผ่านการตรวจสอบ ➔ ได้รับ +฿2 เข้ายอด Balance ทันที
4. **แสดง Trust & Safety:** ลองกดตอบแบบสอบถามเดิมอีกครั้ง ➔ ระบบจะขึ้นกล่องสีแดงล็อกการตอบซ้ำ (Duplicate Prevention) ทันที
