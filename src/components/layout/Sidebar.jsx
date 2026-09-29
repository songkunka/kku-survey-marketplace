import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Wallet,
  User,
  PlusCircle,
  FolderKanban,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Users,
  CheckSquare
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { currentRole, surveys, participant } = useApp();

  const participantNav = [
    { id: 'dashboard', label: 'Dashboard ภาพรวม', icon: LayoutDashboard },
    { 
      id: 'surveys', 
      label: 'ตลาดแบบสอบถาม', 
      icon: FileText, 
      badge: surveys.filter(s => s.status === 'Active' && !participant.completedSurveyIds.includes(s.id)).length 
    },
    { id: 'rewards', label: 'กระเป๋าเงิน & ถอนเงิน', icon: Wallet },
    { id: 'profile', label: 'ข้อมูลและยืนยันตัวตน', icon: User }
  ];

  const researcherNav = [
    { id: 'dashboard', label: 'Dashboard สรุปผล', icon: LayoutDashboard },
    { id: 'projects', label: 'โปรเจกต์ของฉัน', icon: FolderKanban, badge: surveys.length },
    { id: 'create', label: 'สร้างโปรเจกต์ใหม่', icon: PlusCircle, highlight: true },
    { id: 'billing', label: 'งบประมาณ & การเงิน', icon: CreditCard }
  ];

  const adminNav = [
    { id: 'dashboard', label: 'ภาพรวมระบบ Admin', icon: LayoutDashboard },
    { id: 'verification', label: 'ตรวจยืนยันตัวตน (KYC)', icon: Users, badge: 3 },
    { id: 'reviews', label: 'อนุมัติแบบสอบถาม', icon: CheckSquare, badge: 2 },
    { id: 'withdrawals', label: 'คำขอถอนเงิน', icon: Wallet, badge: 5 },
    { id: 'fraud', label: 'ตรวจจับ Fraud & บอท', icon: AlertTriangle, badge: 1 }
  ];

  const navItems = currentRole === 'participant'
    ? participantNav
    : currentRole === 'researcher'
    ? researcherNav
    : adminNav;

  return (
    <aside className="layout-sidebar">
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-light)', padding: '0 8px 8px 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {currentRole === 'participant' && 'เมนูผู้ตอบแบบสอบถาม'}
          {currentRole === 'researcher' && 'เมนูนักวิจัย / เจ้าของโปรเจกต์'}
          {currentRole === 'admin' && 'เมนูผู้ดูแลระบบ (Admin)'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                color: isActive 
                  ? 'var(--color-primary)' 
                  : item.highlight 
                  ? '#1D4ED8' 
                  : 'var(--color-text-main)',
                backgroundColor: isActive 
                  ? 'var(--color-primary-light)' 
                  : item.highlight
                  ? '#EFF6FF'
                  : 'transparent',
                textAlign: 'left',
                border: item.highlight && !isActive ? '1px dashed #BFDBFE' : 'none',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = item.highlight ? '#EFF6FF' : 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : '#E2E8F0',
                    color: isActive ? '#FFFFFF' : '#475569',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: '10px'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }}>
        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
          <strong>KKU Research Shield</strong><br />
          ป้องกันข้อมูลรั่วไหล และคัดกรองกลุ่มตัวอย่างที่มีคุณภาพสูง
        </div>
      </div>
    </aside>
  );
};
