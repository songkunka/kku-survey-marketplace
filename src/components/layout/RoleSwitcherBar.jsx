import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Briefcase, ShieldCheck, Globe, RotateCcw } from 'lucide-react';

export const RoleSwitcherBar = () => {
  const { currentRole, setCurrentRole, resetDemoData, participant, researcher } = useApp();

  return (
    <div className="role-switcher-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          DEMO SWITCHER:
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setCurrentRole('public')}
            className={`btn btn-sm ${currentRole === 'public' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            <Globe size={13} /> หน้าแรก (Public)
          </button>
          <button
            onClick={() => setCurrentRole('participant')}
            className={`btn btn-sm ${currentRole === 'participant' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            <UserCheck size={13} /> Participant (ผู้ตอบ)
            <span style={{ fontSize: '11px', opacity: 0.85, marginLeft: '4px' }}>฿{participant.balance}</span>
          </button>
          <button
            onClick={() => setCurrentRole('researcher')}
            className={`btn btn-sm ${currentRole === 'researcher' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            <Briefcase size={13} /> Researcher (คนทำวิจัย)
            <span style={{ fontSize: '11px', opacity: 0.85, marginLeft: '4px' }}>฿{researcher.balance}</span>
          </button>
          <button
            onClick={() => setCurrentRole('admin')}
            className={`btn btn-sm ${currentRole === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            <ShieldCheck size={13} /> Admin
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: '#64748B', fontSize: '11px', display: 'none', md: 'inline' }}>
          Mock Data จำลองใน LocalStorage
        </span>
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
