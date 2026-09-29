import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRightLeft, 
  Coins, 
  ShieldCheck, 
  ShieldAlert, 
  LogOut, 
  User, 
  LayoutDashboard,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const Header = ({ onNavigate, onOpenKYC }) => {
  const { user, profile, currentMode, switchMode, logout, isAuthenticated } = useAuth();
  const { participant } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync state between DB profile and local demo participant
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
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex justify-between items-center sticky top-0 z-30 shadow-sm">
      {/* Left: Brand Identity & Current Role */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => onNavigate && onNavigate(isAuthenticated ? (currentMode === 'participant' ? 'marketplace' : 'researcher') : 'landing')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-black text-lg shadow-sm">
            K
          </div>
          <div>
            <div className="font-bold text-base text-slate-900 flex items-center gap-1.5 leading-tight">
              KKU Survey <span className="text-blue-600 font-semibold">Marketplace</span>
            </div>
            <div className="text-xs text-slate-400">
              Research Participant Platform
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border hidden sm:inline-flex items-center gap-1 ${
            currentMode === 'participant'
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            {currentMode === 'participant' ? '🎓 โหมดผู้ตอบ (Participant)' : '🔬 โหมดนักวิจัย (Researcher)'}
          </span>
        )}
      </div>

      {/* Right: Authentication & Mode Switcher */}
      <div className="flex items-center gap-3.5">
        {!isAuthenticated ? (
          /* Public Guest Menu */
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="btn btn-secondary btn-sm px-4 py-2 font-semibold text-xs"
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => onNavigate && onNavigate('register')}
              className="btn btn-primary btn-sm px-4 py-2 font-semibold text-xs"
            >
              สมัครสมาชิกใหม่
            </button>
          </div>
        ) : (
          /* Logged In Unified User Menu */
          <div className="flex items-center gap-3">
            {/* Mode Switcher Toggle (Like Airbnb) */}
            <button
              onClick={() => switchMode(currentMode === 'participant' ? 'researcher' : 'participant')}
              className={`btn btn-sm text-xs font-semibold py-1.5 px-3 flex items-center gap-1.5 border transition-all ${
                currentMode === 'participant'
                  ? 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
              title="สลับโหมดการทำงานระหว่างการตอบแบบสอบถามและการสร้างแบบสอบถาม"
            >
              <ArrowRightLeft size={13} className="text-blue-600" />
              <span className="hidden md:inline">
                {currentMode === 'participant' ? 'สลับไปโหมดนักวิจัย (Researcher)' : 'สลับไปโหมดผู้ตอบ (Participant)'}
              </span>
              <span className="md:hidden">
                {currentMode === 'participant' ? 'โหมดนักวิจัย' : 'โหมดผู้ตอบ'}
              </span>
            </button>

            {/* Wallet Display */}
            <div
              onClick={() => onNavigate && onNavigate(currentMode === 'participant' ? 'rewards' : 'billing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-xs cursor-pointer transition-colors ${
                currentMode === 'participant'
                  ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="คลิกเพื่อดูกระเป๋าเงิน / ถอนเงิน / เติมงบ"
            >
              <Coins size={15} className={currentMode === 'participant' ? 'text-blue-600' : 'text-emerald-600'} />
              <span>
                ฿{currentMode === 'participant'
                  ? (userProfile.reward_balance || 0).toLocaleString()
                  : (userProfile.research_budget || 0).toLocaleString()}
              </span>
              <span className="text-xs font-normal opacity-75">
                {currentMode === 'participant' ? 'รางวัล' : 'งบวิจัย'}
              </span>
            </div>

            {/* User Profile Dropdown Menu */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown(prev => !prev)}
                className={`flex items-center gap-2 cursor-pointer p-1.5 rounded-lg transition-colors ${
                  showDropdown ? 'bg-slate-100' : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                  {userProfile.full_name?.charAt(0) || 'U'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-semibold text-xs text-slate-900 leading-tight">
                    {userProfile.full_name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {userProfile.faculty?.split('(')[0] || 'KKU'}
                  </div>
                </div>
              </div>

              {/* Dropdown Menu Box */}
              {showDropdown && (
                <div className="absolute right-0 top-[115%] w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="p-2.5 border-b border-slate-100 mb-1.5">
                    <div className="font-semibold text-xs text-slate-900">{userProfile.full_name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{userProfile.email}</div>
                    <div className="mt-2">
                      {isVerified ? (
                        <span className="badge badge-active text-xs py-0.5">
                          <ShieldCheck size={12} /> ยืนยันตัวตนแล้ว (KYC)
                        </span>
                      ) : isPending ? (
                        <span className="badge badge-pending text-xs py-0.5">
                          ⏳ รอแอดมินตรวจบัตร
                        </span>
                      ) : (
                        <button
                          onClick={() => { setShowDropdown(false); if (onOpenKYC) onOpenKYC(); }}
                          className="inline-flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer border border-red-200 transition-colors"
                        >
                          <ShieldAlert size={12} /> กดยืนยันบัตรประชาชน
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => { setShowDropdown(false); onNavigate && onNavigate('profile'); }}
                    className="w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center gap-2 text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <User size={15} className="text-slate-400" /> ข้อมูลโปรไฟล์ & Demographic
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => { setShowDropdown(false); onNavigate && onNavigate('admin'); }}
                      className="w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center gap-2 text-amber-800 bg-amber-50 hover:bg-amber-100 my-1 font-semibold transition-colors"
                    >
                      <ShieldCheck size={15} /> แผงควบคุม Admin
                    </button>
                  )}

                  <div className="border-t border-slate-100 my-1.5" />

                  <button
                    onClick={() => { setShowDropdown(false); logout(); onNavigate && onNavigate('landing'); }}
                    className="w-full text-left px-2.5 py-2 text-xs rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
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
