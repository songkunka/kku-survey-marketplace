import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Wallet,
  User,
  PlusCircle,
  FolderKanban,
  CreditCard,
  AlertTriangle,
  Users,
  CheckSquare
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { surveys, participant, kycQueue } = useApp();
  const { currentMode } = useAuth();

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
    { id: 'dashboard', label: 'Dashboard ภาพรวม', icon: LayoutDashboard },
    { id: 'projects', label: 'โปรเจกต์ที่ฉันสร้าง', icon: FolderKanban, badge: surveys.length },
    { id: 'create', label: 'สร้างโปรเจกต์ใหม่', icon: PlusCircle, highlight: true },
    { id: 'billing', label: 'งบวิจัย & การเงิน', icon: CreditCard }
  ];

  const adminNav = [
    { id: 'dashboard', label: 'ภาพรวมระบบ Admin', icon: LayoutDashboard },
    { id: 'verification', label: 'ตรวจบัตรประชาชน (e-KYC)', icon: Users, badge: kycQueue.length },
    { id: 'reviews', label: 'อนุมัติแบบสอบถาม', icon: CheckSquare, badge: 2 },
    { id: 'withdrawals', label: 'คำขอถอนเงิน', icon: Wallet, badge: 2 },
    { id: 'fraud', label: 'ตรวจจับ Fraud & บอท', icon: AlertTriangle, badge: 1 }
  ];

  const effectiveMode = activeTab === 'admin' ? 'admin' : currentMode;

  const navItems = effectiveMode === 'admin'
    ? adminNav
    : currentMode === 'researcher'
    ? researcherNav
    : participantNav;

  return (
    <aside className="layout-sidebar bg-white border-r border-[#f3f3f3]">
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <div className="text-[11px] font-bold text-[#6b6b6b] px-3 py-2 uppercase tracking-wider">
          {effectiveMode === 'admin'
            ? 'แผงควบคุมแอดมิน (Admin)'
            : currentMode === 'researcher'
            ? 'โหมดนักวิจัย (Researcher)'
            : 'โหมดผู้ตอบแบบสอบถาม'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-[8px] text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#f5f7fa] text-[#0070d1] border-l-2 border-[#0070d1]'
                  : item.highlight
                  ? 'bg-[#fff1eb] text-[#d53b00] hover:bg-[#ffe5db]'
                  : 'text-black hover:bg-[#f5f7fa]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} className={isActive ? 'text-[#0070d1]' : item.highlight ? 'text-[#d53b00]' : 'text-[#6b6b6b]'} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#0070d1] text-white'
                      : item.highlight
                      ? 'bg-[#d53b00] text-white'
                      : 'bg-[#e2e8f0] text-black'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#f3f3f3] bg-[#f5f7fa]">
        <div className="text-xs text-[#6b6b6b] leading-relaxed">
          <strong className="text-black">KKU Research Shield</strong><br />
          บัญชีเดี่ยว 1 คน 1 สิทธิ์ พร้อมระบบคุ้มครองข้อมูล PDPA
        </div>
      </div>
    </aside>
  );
};
