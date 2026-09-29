import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Briefcase, ShieldCheck, Globe, RotateCcw, ShieldAlert, Clock } from 'lucide-react';

export const RoleSwitcherBar = () => {
  const {
    currentRole,
    setCurrentRole,
    resetDemoData,
    participant,
    researcher,
    setVerificationPreset,
    kycQueue
  } = useApp();

  return (
    <div className="role-switcher-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          DEMO SWITCHER:
        </span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentRole('public')}
            className={`btn btn-sm ${currentRole === 'public' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            <Globe size={12} /> หน้าแรก
          </button>

          <button
            onClick={() => setCurrentRole('participant')}
            className={`btn btn-sm ${currentRole === 'participant' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            <UserCheck size={12} /> Participant
            <span style={{ opacity: 0.85, marginLeft: '3px' }}>฿{participant.balance}</span>
            <span
              style={{
                marginLeft: '4px',
                padding: '1px 5px',
                borderRadius: '3px',
                fontSize: '9px',
                fontWeight: 700,
                backgroundColor: participant.verificationStatus === 'Verified' ? '#16A34A' : participant.verificationStatus === 'Pending' ? '#D97706' : '#DC2626',
                color: '#FFFFFF'
              }}
            >
              {participant.verificationStatus === 'Verified' ? '✓ Verified' : participant.verificationStatus === 'Pending' ? '⏳ Pending' : '✕ Unverified'}
            </span>
          </button>

          <button
            onClick={() => setCurrentRole('researcher')}
            className={`btn btn-sm ${currentRole === 'researcher' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            <Briefcase size={12} /> Researcher
            <span style={{ opacity: 0.85, marginLeft: '3px' }}>฿{researcher.balance}</span>
          </button>

          <button
            onClick={() => setCurrentRole('admin')}
            className={`btn btn-sm ${currentRole === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '3px 8px', fontSize: '11px' }}
          >
            <ShieldCheck size={12} /> Admin
            {kycQueue.length > 0 && (
              <span style={{ background: '#DC2626', color: '#FFF', padding: '1px 5px', borderRadius: '10px', fontSize: '9px', fontWeight: 700, marginLeft: '3px' }}>
                KYC: {kycQueue.length}
              </span>
            )}
          </button>
        </div>

        {/* Quick Testing Presets */}
        {currentRole === 'participant' && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#1E293B', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>
            <span style={{ color: '#64748B', fontSize: '10px' }}>ทดสอบ KYC:</span>
            <button
              onClick={() => setVerificationPreset('Unverified')}
              style={{ background: participant.verificationStatus === 'Unverified' ? '#DC2626' : 'transparent', color: '#FFF', border: 'none', borderRadius: '3px', padding: '2px 5px', fontSize: '10px', cursor: 'pointer' }}
              title="จำลองเป็นผู้ใช้ใหม่ที่ยังไม่ยืนยันบัตร"
            >
              ยังไม่ยืนยัน
            </button>
            <button
              onClick={() => setVerificationPreset('Pending')}
              style={{ background: participant.verificationStatus === 'Pending' ? '#D97706' : 'transparent', color: '#FFF', border: 'none', borderRadius: '3px', padding: '2px 5px', fontSize: '10px', cursor: 'pointer' }}
              title="จำลองสถานะกำลังรอแอดมินตรวจ"
            >
              รอตรวจ
            </button>
            <button
              onClick={() => setVerificationPreset('Verified')}
              style={{ background: participant.verificationStatus === 'Verified' ? '#16A34A' : 'transparent', color: '#FFF', border: 'none', borderRadius: '3px', padding: '2px 5px', fontSize: '10px', cursor: 'pointer' }}
              title="จำลองผู้ใช้ที่ผ่านการยืนยันแล้ว"
            >
              ยืนยันแล้ว
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={resetDemoData}
          className="btn btn-secondary btn-sm"
          style={{ padding: '3px 8px', fontSize: '11px', color: '#94A3B8', borderColor: '#334155', background: '#1E293B' }}
          title="รีเซ็ตยอดเงิน แบบสอบถาม และประวัติกลับเป็นค่าเริ่มต้น"
        >
          <RotateCcw size={12} /> รีเซ็ตข้อมูล
        </button>
      </div>
    </div>
  );
};
