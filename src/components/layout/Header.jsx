import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, ShieldAlert, Coins, User, Sparkles, LogOut, ArrowRightLeft, FolderKanban, CheckSquare, PlusCircle } from 'lucide-react';

export const Header = ({ onNavigate, currentTab, onOpenKYC }) => {
  const { userProfile, isAuthenticated, isAdmin, currentMode, switchMode, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const isVerified = userProfile?.verification_status === 'verified';
  const isPending = userProfile?.verification_status === 'pending';

  return (
    <header
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Left: Brand Logo & Mode Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          onClick={() => onNavigate && onNavigate(isAuthenticated ? 'surveys' : 'landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '17px',
              boxShadow: '0 2px 6px rgba(37,99,235,0.3)'
            }}
          >
            K
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              KKU Survey <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Marketplace</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Research Participant Platform
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '4px',
              background: currentMode === 'participant' ? 'var(--color-primary-light)' : '#ECFDF5',
              color: currentMode === 'participant' ? 'var(--color-primary-dark)' : '#065F46',
              border: `1px solid ${currentMode === 'participant' ? 'var(--color-primary-subtle)' : '#A7F3D0'}`
            }}
          >
            {currentMode === 'participant' ? '🎓 โหมดผู้ตอบ (Participant)' : '🔬 โหมดนักวิจัย (Researcher)'}
          </span>
        )}
      </div>

      {/* Right: Authentication & Mode Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {!isAuthenticated ? (
          /* Public Guest Menu */
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '7px 16px', fontWeight: 600 }}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => onNavigate && onNavigate('register')}
              className="btn btn-primary btn-sm"
              style={{ padding: '7px 16px', fontWeight: 600 }}
            >
              สมัครสมาชิกใหม่
            </button>
          </div>
        ) : (
          /* Logged In Unified User Menu */
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mode Switcher Toggle (Like Airbnb) */}
            <button
              onClick={() => switchMode(currentMode === 'participant' ? 'researcher' : 'participant')}
              className="btn btn-sm btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                borderColor: currentMode === 'participant' ? '#CBD5E1' : '#A7F3D0',
                backgroundColor: currentMode === 'participant' ? '#F8FAFC' : '#ECFDF5'
              }}
              title="สลับโหมดการทำงานระหว่างการตอบแบบสอบถามและการสร้างแบบสอบถาม"
            >
              <ArrowRightLeft size={13} color="var(--color-primary)" />
              {currentMode === 'participant' ? 'สลับไปโหมดนักวิจัย (Researcher)' : 'สลับไปโหมดผู้ตอบ (Participant)'}
            </button>

            {/* Wallet Display */}
            <div
              onClick={() => onNavigate && onNavigate(currentMode === 'participant' ? 'rewards' : 'billing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: currentMode === 'participant' ? 'var(--color-primary-light)' : '#ECFDF5',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${currentMode === 'participant' ? 'var(--color-primary-subtle)' : '#A7F3D0'}`,
                color: currentMode === 'participant' ? 'var(--color-primary-dark)' : '#065F46',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer'
              }}
              title="คลิกเพื่อดูกระเป๋าเงิน / ถอนเงิน / เติมงบ"
            >
              <Coins size={15} color={currentMode === 'participant' ? '#2563EB' : '#059669'} />
              <span>
                ฿{currentMode === 'participant'
                  ? (userProfile.reward_balance || 0).toLocaleString()
                  : (userProfile.research_budget || 0).toLocaleString()}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.8 }}>
                {currentMode === 'participant' ? 'รางวัล' : 'งบวิจัย'}
              </span>
            </div>

            {/* User Profile Dropdown Menu */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowDropdown(prev => !prev)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: showDropdown ? 'var(--color-surface-hover)' : 'transparent'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#334155',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
                >
                  {userProfile.full_name?.charAt(0) || 'U'}
                </div>
                <div style={{ textAlign: 'left', display: 'none', md: 'block' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {userProfile.full_name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                    {userProfile.faculty?.split('(')[0] || 'KKU'}
                  </div>
                </div>
              </div>

              {/* Dropdown Menu Box */}
              {showDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '115%',
                    width: '240px',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--color-border)',
                    padding: '8px',
                    zIndex: 1000
                  }}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--color-border)', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{userProfile.full_name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{userProfile.email}</div>
                    <div style={{ marginTop: '6px' }}>
                      {isVerified ? (
                        <span className="badge badge-active" style={{ fontSize: '10px' }}>
                          <ShieldCheck size={11} /> บัญชียืนยันตัวตนแล้ว (KYC)
                        </span>
                      ) : isPending ? (
                        <span className="badge badge-pending" style={{ fontSize: '10px' }}>
                          ⏳ รอแอดมินตรวจบัตร
                        </span>
                      ) : (
                        <button
                          onClick={() => { setShowDropdown(false); if (onOpenKYC) onOpenKYC(); }}
                          className="badge"
                          style={{ background: '#FEE2E2', color: '#B91C1C', cursor: 'pointer', border: 'none', fontSize: '10px' }}
                        >
                          <ShieldAlert size={11} /> กดยืนยันบัตรประชาชน
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => { setShowDropdown(false); onNavigate && onNavigate('profile'); }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '13px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F1F5F9'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <User size={15} color="var(--color-text-muted)" /> ข้อมูลโปรไฟล์ & Demographic
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => { setShowDropdown(false); onNavigate && onNavigate('admin'); }}
                      style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '13px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', color: '#92400E', background: '#FEF3C7', margin: '4px 0' }}
                    >
                      <ShieldCheck size={15} /> แผงควบคุม Admin
                    </button>
                  )}

                  <div style={{ borderTop: '1px solid var(--color-border)', margin: '6px 0' }} />

                  <button
                    onClick={() => { setShowDropdown(false); logout(); onNavigate && onNavigate('landing'); }}
                    style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '13px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
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
