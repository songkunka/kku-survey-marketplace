import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ShieldAlert,
  Coins,
  User,
  LogOut,
  ArrowRightLeft,
  ChevronDown
} from 'lucide-react';

export const Header = ({ onNavigate, onOpenKYC }) => {
  const { user, profile, currentMode, switchMode, logout, isAuthenticated } = useAuth();
  const { participant } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync profile values
  const userProfile = {
    full_name: profile?.full_name || participant?.name || 'ผู้ใช้งาน มข.',
    email: profile?.email || user?.email || 'student@kkumail.com',
    role: profile?.role || 'participant',
    verification_status: profile?.verification_status || participant?.verificationStatus || 'Unverified',
    reward_balance: profile?.reward_balance ?? participant?.balance ?? 150,
    research_budget: profile?.research_budget ?? 2500,
    faculty: profile?.faculty || participant?.faculty || 'คณะวิทยาการจัดการ'
  };

  const isVerified = userProfile.verification_status === 'Verified';
  const isPending = userProfile.verification_status === 'Pending';
  const isAdmin = userProfile.role === 'admin';

  return (
    <header className="h-16 bg-white border-b border-[#f3f3f3] px-6 flex justify-between items-center sticky top-0 z-50 transition-colors">
      {/* Left: Brand Identity & Active Chapter Pill */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => onNavigate && onNavigate(isAuthenticated ? (currentMode === 'participant' ? 'marketplace' : 'researcher') : 'landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-[8px] bg-[#0070d1] text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-[#0064b7] transition-colors">
            K
          </div>
          <div>
            <div className="font-light text-base tracking-wide text-black flex items-center gap-1.5 leading-tight">
              KKU Survey <span className="text-[#0070d1] font-semibold">Marketplace</span>
            </div>
            <div className="text-[11px] text-[#6b6b6b] tracking-wider uppercase">
              Research Participant Platform
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f7fa] text-[#000000] border border-[#f3f3f3]">
            {currentMode === 'participant' ? '🎓 โหมดผู้ตอบ (Participant)' : '🔬 โหมดนักวิจัย (Researcher)'}
          </span>
        )}
      </div>

      {/* Right: Authentication & Capsule Actions (designref.md) */}
      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
          /* Public Guest Menu */
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="px-5 py-2 rounded-full border border-[#cbd5e1] text-xs font-bold text-black hover:bg-[#f5f7fa] transition-colors"
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => onNavigate && onNavigate('register')}
              className="btn-pill btn-pill-primary btn-pill-sm text-xs"
            >
              สมัครสมาชิกใหม่
            </button>
          </div>
        ) : (
          /* Logged In Unified Controls */
          <div className="flex items-center gap-3">
            {/* Mode Switcher Toggle Pill (Single Account Airbnb-style) */}
            <button
              onClick={() => switchMode(currentMode === 'participant' ? 'researcher' : 'participant')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-[#e2e8f0] bg-[#f5f7fa] hover:bg-[#e2e8f0] text-black transition-all"
              title="สลับโหมดการทำงานระหว่างการตอบแบบสอบถามและการสร้างแบบสอบถาม"
            >
              <ArrowRightLeft size={13} className="text-[#0070d1]" />
              <span className="hidden md:inline">
                {currentMode === 'participant' ? 'สลับไปโหมดนักวิจัย' : 'สลับไปโหมดผู้ตอบ'}
              </span>
              <span className="md:hidden">
                {currentMode === 'participant' ? 'นักวิจัย' : 'ผู้ตอบ'}
              </span>
            </button>

            {/* Wallet Display: Commerce Orange Pill (designref.md) */}
            <div
              onClick={() => onNavigate && onNavigate(currentMode === 'participant' ? 'rewards' : 'billing')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff1eb] border border-[#ffd8cc] text-[#d53b00] cursor-pointer hover:bg-[#ffe5db] transition-colors"
              title="คลิกเพื่อดูกระเป๋าเงิน / ถอนเงิน / เติมงบ"
            >
              <Coins size={14} className="text-[#d53b00]" />
              <span className="font-bold text-xs tracking-tight">
                ฿{currentMode === 'participant'
                  ? (userProfile.reward_balance || 0).toLocaleString()
                  : (userProfile.research_budget || 0).toLocaleString()}
              </span>
              <span className="text-[11px] font-medium opacity-80 hidden sm:inline">
                {currentMode === 'participant' ? 'รางวัล' : 'งบวิจัย'}
              </span>
            </div>

            {/* User Profile Dropdown Pill */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown(prev => !prev)}
                className={`flex items-center gap-2 cursor-pointer p-1 rounded-full border transition-all ${
                  showDropdown ? 'border-[#0070d1] bg-[#f5f7fa]' : 'border-transparent hover:border-[#e2e8f0]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#181818] text-white flex items-center justify-center font-bold text-xs">
                  {userProfile.full_name?.charAt(0) || 'U'}
                </div>
                <div className="text-left hidden lg:block pr-2">
                  <div className="font-semibold text-xs text-black leading-tight">
                    {userProfile.full_name}
                  </div>
                  <div className="text-[10px] text-[#6b6b6b]">
                    {userProfile.faculty?.split('(')[0] || 'KKU'}
                  </div>
                </div>
                <ChevronDown size={14} className="text-[#6b6b6b] hidden sm:block mr-1" />
              </div>

              {/* Dropdown Menu: Strict 8px Radius (product-card from designref.md) */}
              {showDropdown && (
                <div className="absolute right-0 top-[118%] w-64 bg-white rounded-[8px] shadow-xl border border-[#f3f3f3] p-2.5 z-50 animate-fade-in">
                  <div className="p-2.5 border-b border-[#f3f3f3] mb-2">
                    <div className="font-semibold text-xs text-black">{userProfile.full_name}</div>
                    <div className="text-xs text-[#6b6b6b] mt-0.5 truncate">{userProfile.email}</div>
                    <div className="mt-2">
                      {isVerified ? (
                        <span className="badge badge-active text-[11px] py-0.5">
                          <ShieldCheck size={12} /> ยืนยันตัวตนแล้ว (KYC)
                        </span>
                      ) : isPending ? (
                        <span className="badge badge-pending text-[11px] py-0.5">
                          ⏳ รอแอดมินตรวจบัตร
                        </span>
                      ) : (
                        <button
                          onClick={() => { setShowDropdown(false); if (onOpenKYC) onOpenKYC(); }}
                          className="inline-flex items-center gap-1 bg-[#fef2f2] text-[#c81b3a] hover:bg-[#fee2e2] px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer border border-[#fecaca] transition-colors"
                        >
                          <ShieldAlert size={12} /> กดยืนยันบัตรประชาชน
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => { setShowDropdown(false); onNavigate && onNavigate('profile'); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-[4px] flex items-center gap-2 text-black hover:bg-[#f5f7fa] transition-colors"
                  >
                    <User size={15} className="text-[#6b6b6b]" /> ข้อมูลโปรไฟล์ & Demographic
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => { setShowDropdown(false); onNavigate && onNavigate('admin'); }}
                      className="w-full text-left px-3 py-2 text-xs rounded-[4px] flex items-center gap-2 text-[#d97706] bg-[#fffbeb] hover:bg-[#fef3c7] my-1 font-semibold transition-colors"
                    >
                      <ShieldCheck size={15} /> แผงควบคุม Admin
                    </button>
                  )}

                  <div className="border-t border-[#f3f3f3] my-2" />

                  <button
                    onClick={() => { setShowDropdown(false); logout(); onNavigate && onNavigate('landing'); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-[4px] flex items-center gap-2 text-[#c81b3a] hover:bg-[#fef2f2] transition-colors font-medium"
                  >
                    <LogOut size={15} /> ออกจากระบบ (Logout)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
