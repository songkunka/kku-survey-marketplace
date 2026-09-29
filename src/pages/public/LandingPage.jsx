import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Lock,
  Clock,
  Sparkles,
  Zap,
  FolderKanban,
  Coins
} from 'lucide-react';

export const LandingPage = ({ onNavigate }) => {
  const { isAuthenticated, switchMode } = useAuth();

  const handleStartParticipant = () => {
    switchMode('participant');
    if (onNavigate) {
      onNavigate(isAuthenticated ? 'surveys' : 'register');
    }
  };

  const handleStartResearcher = () => {
    switchMode('researcher');
    if (onNavigate) {
      onNavigate(isAuthenticated ? 'projects' : 'register');
    }
  };

  return (
    <div className="bg-white">
      {/* CHAPTER 1: Dark Canvas Hero Band (designref.md hero-band-dark) */}
      <section className="bg-[#000000] text-white py-20 md:py-28 px-6 border-b border-[#181818] relative overflow-hidden">
        {/* Subtle cinematic glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0070d1]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* KKU Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#181818] text-[#cccccc] border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#A73B24]" />
            <span>แพลตฟอร์มงานวิจัยและกลุ่มตัวอย่าง มหาวิทยาลัยขอนแก่น</span>
          </div>

          {/* Airy Display Headline (Weight 300 from designref.md) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.2] mb-6">
            ตลาดกลางกลุ่มตัวอย่างงานวิจัย <br className="hidden sm:inline" />
            <span className="text-[#0070d1] font-normal">คุณภาพสูงและรวดเร็ว</span> แห่ง มข.
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            บัญชีเดี่ยว 1 Account ทำได้ทั้งตอบแบบสอบถามเพื่อรับเงินจริงผ่าน PromptPay <br className="hidden md:inline" />
            และสร้างแบบสอบถามเก็บข้อมูลวิจัยได้ตรงกลุ่มเป้าหมาย ป้องกันคนตอบซ้ำด้วย e-KYC 100%
          </p>

          {/* Full-Radius Capsule CTA Pills (designref.md button-primary & button-secondary-dark) */}
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={handleStartParticipant}
              className="btn-pill btn-pill-primary shadow-lg shadow-[#0070d1]/25 hover:shadow-[#0070d1]/40"
            >
              เริ่มต้นตอบแบบสอบถาม (รับเงินรางวัล) <ArrowRight size={17} />
            </button>
            <button
              onClick={handleStartResearcher}
              className="btn-pill btn-pill-secondary-dark"
            >
              สร้างแบบสอบถามงานวิจัย (สำหรับผู้วิจัย)
            </button>
          </div>

          {/* 4-Up Metrics Strip (designref.md surface-dark-card) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 p-6 rounded-[8px] bg-[#121314] border border-white/10 text-left">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">1,280+</div>
              <div className="text-xs text-[#cccccc] mt-1 font-normal">นักศึกษา มข. ยืนยันตัวตนแล้ว</div>
            </div>
            <div className="p-3 border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-light text-[#0070d1] tracking-tight">100%</div>
              <div className="text-xs text-[#cccccc] mt-1 font-normal">ล็อกป้องกันคนตอบซ้ำ (Unique ID)</div>
            </div>
            <div className="p-3 border-t md:border-t-0 md:border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-light text-[#d53b00] tracking-tight">8,500+</div>
              <div className="text-xs text-[#cccccc] mt-1 font-normal">คำตอบงานวิจัยคุณภาพสูง</div>
            </div>
            <div className="p-3 border-t md:border-t-0 md:border-l border-white/10">
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">2–5 นาที</div>
              <div className="text-xs text-[#cccccc] mt-1 font-normal">เวลาเฉลี่ยรับค่าตอบแทนเข้ากระเป๋า</div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: Light Canvas Showcase Band (designref.md hero-band-light) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-light text-black tracking-tight mb-3">
            ทำไมต้อง KKU Survey Marketplace?
          </h2>
          <p className="text-sm sm:text-base text-[#6b6b6b] max-w-xl mx-auto">
            เปรียบเทียบระหว่างการโพสต์หาคนตอบแบบเดิมกับการเก็บข้อมูลผ่านแพลตฟอร์มตัวจริง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old way */}
          <div className="p-7 rounded-[8px] bg-[#fef2f2] border border-[#fecaca]">
            <div className="text-base font-bold text-[#c81b3a] mb-4 flex items-center gap-2">
              <span>❌</span> การโพสต์ใน Facebook / LINE กลุ่มแบบเดิม
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-[#991b1b] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#c81b3a] font-bold">•</span>
                <span>ไม่รู้ว่าจะได้คนตอบครบ 400 คนเมื่อไหร่ ต้องคอยดันโพสต์ทั้งวัน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c81b3a] font-bold">•</span>
                <span>คัดกรองคุณสมบัติไม่ได้ ใครกดเข้ามาตอบก็ได้ ข้อมูลอาจไม่ตรงคณะ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c81b3a] font-bold">•</span>
                <span>เสี่ยงคนเดิมตอบซ้ำเพื่อเอาสิทธิ์ชิงโชค หรือคนคลิกมั่วจนเสียค่าสถิติ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c81b3a] font-bold">•</span>
                <span>ผู้ตอบไม่มีแรงจูงใจที่แน่นอน สุ่มแจกของรางวัลไม่ดึงดูดใจ</span>
              </li>
            </ul>
          </div>

          {/* New way: Cool-tinted card from designref.md */}
          <div className="p-7 rounded-[8px] bg-[#f5f7fa] border border-[#cbd5e1] shadow-sm">
            <div className="text-base font-bold text-[#0070d1] mb-4 flex items-center gap-2">
              <span>✅</span> KKU Survey Marketplace
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-black leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#0070d1] font-bold">•</span>
                <span>กำหนดเป้าหมาย 400 คน ระบบส่งตรงถึงกลุ่มตัวอย่างที่มีคุณสมบัติทันที</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0070d1] font-bold">•</span>
                <span>คัดกรองแม่นยำ (19 คณะใน มข., ชั้นปี, ย่านหอพักกังสดาล/หลังมอ)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0070d1] font-bold">•</span>
                <span><strong>Speeder & Duplicate Lock:</strong> บล็อกคนตอบซ้ำและคนกดส่งไวเกินจริง 100%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0070d1] font-bold">•</span>
                <span>ผู้ตอบได้รับเงินรางวัลแน่นอน โปร่งใส ถอนเข้า PromptPay ได้ทันที</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: Trust & Safety Architecture (designref.md product-card grid) */}
      <section className="py-20 px-6 bg-[#f5f7fa] border-y border-[#f3f3f3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-light text-black tracking-tight mb-3">
              Trust & Safety Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#6b6b6b]">
              ความน่าเชื่อถือคือหัวใจหลักของข้อมูลงานวิจัย มหาวิทยาลัยขอนแก่น
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[8px] border border-[#e2e8f0]">
              <div className="w-12 h-12 rounded-full bg-[#f5f7fa] flex items-center justify-center text-[#0070d1] mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-base font-semibold text-black mb-2">Participant Verification</h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                ยืนยันตัวตนด้วยบัตรประชาชน 13 หลัก (e-KYC) ตรวจสอบสถานะนักศึกษา มข. จริง ป้องกันบัญชีผีและบอท 100%
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-[#e2e8f0]">
              <div className="w-12 h-12 rounded-full bg-[#fff1eb] flex items-center justify-center text-[#d53b00] mb-4">
                <Coins size={24} />
              </div>
              <h4 className="text-base font-semibold text-black mb-2">Escrow Budget Lock</h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                งบประมาณงานวิจัยถูกล็อกในระบบ Escrow ปลอดภัย การันตีผู้ตอบได้รับค่าตอบแทนเมื่อทำเสร็จสมบูรณ์
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-[#e2e8f0]">
              <div className="w-12 h-12 rounded-full bg-[#f5f7fa] flex items-center justify-center text-[#0070d1] mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-base font-semibold text-black mb-2">Duplicate & Speeder Shield</h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                ระบบตรวจจับเวลาขั้นต่ำและการกดซ้ำ ป้องกันไม่ให้ส่งคำตอบมั่วซั่ว เพื่อข้อมูลสถิติวิจัยที่นำไปตีพิมพ์ได้จริง
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 4: Signature Blue Action Band (designref.md hero-band-blue) */}
      <section className="bg-[#0070d1] text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight mb-4">
            พร้อมยกระดับงานวิจัยและสร้างรายได้เสริมใน มข. แล้วหรือยัง?
          </h2>
          <p className="text-sm sm:text-base text-white/80 mb-8 font-normal leading-relaxed">
            สมัครบัญชีเดียว ทำได้ทั้งตอบแบบสอบถามเพื่อรับเงิน และสร้างโปรเจกต์งานวิจัยของคุณเอง
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleStartParticipant}
              className="px-8 py-3.5 rounded-full bg-white text-[#0070d1] font-bold text-sm hover:bg-[#f5f7fa] transition-all shadow-md"
            >
              เริ่มต้นใช้งานฟรีทันที (Sign Up)
            </button>
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="px-8 py-3.5 rounded-full border border-white text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              เข้าสู่ระบบ (Sign In)
            </button>
          </div>
        </div>
      </section>

      {/* CHAPTER 5: Footer Section (designref.md footer-section) */}
      <footer className="bg-[#121314] text-white py-12 px-6 border-t border-[#181818]">
        <div className="max-w-5xl mx-auto flex justify-between items-center flex-wrap gap-6 text-xs text-[#cccccc]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-[4px] bg-[#0070d1] text-white flex items-center justify-center font-bold text-xs">
              K
            </div>
            <div>
              <span className="font-semibold text-white">KKU Survey Marketplace</span> &copy; 2026 Khon Kaen University
            </div>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">เงื่อนไขการใช้งาน</span>
            <span className="hover:text-white cursor-pointer">นโยบายความเป็นส่วนตัว (PDPA)</span>
            <span className="hover:text-white cursor-pointer">ติดต่อช่วยเหลือ</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
