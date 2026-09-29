import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Users, Briefcase, FileText, CheckCircle2, AlertTriangle, Wallet, Check, X, Eye, Image } from 'lucide-react';

export const AdminDashboard = () => {
  const { adminStats, kycQueue, approveKYC, rejectKYC, showToast } = useApp();

  const [pendingProjects, setPendingProjects] = useState([
    { id: 'rev-1', title: 'การใช้บริการรถตู้โดยสารขอนแก่น-อุดรธานี', owner: 'อาจารย์คณะวิทยาการจัดการ', budget: '฿600' },
    { id: 'rev-2', title: 'ทัศนคติต่อร้านอาหารคลีนในศูนย์อาหาร มข.', owner: 'กลุ่มวิจัยวิทยาศาสตร์การกีฬา', budget: '฿450' }
  ]);

  const [pendingWithdrawals, setPendingWithdrawals] = useState([
    { id: 'w-1', name: 'สุดารัตน์ พ.', amount: '฿100', account: '081-xxx-9921 (PromptPay)' },
    { id: 'w-2', name: 'ณภัทร ร.', amount: '฿250', account: '124-x-xxx78-9 (KBANK)' }
  ]);

  const [previewImage, setPreviewImage] = useState(null);

  const handleApproveProject = (id) => {
    setPendingProjects(prev => prev.filter(p => p.id !== id));
    showToast('อนุมัติโครงการแบบสอบถามเรียบร้อยแล้ว', 'success');
  };

  const handleApproveWithdrawal = (id) => {
    setPendingWithdrawals(prev => prev.filter(w => w.id !== id));
    showToast('อนุมัติและโอนเงินตามคำขอถอนเงินเรียบร้อยแล้ว', 'success');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ marginBottom: '4px' }}>Admin Operational Overview</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          ภาพรวมการปฏิบัติการ ตรวจสอบบัตรประชาชน และอนุมัติโครงการวิจัย
        </p>
      </div>

      {/* Admin KPIs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        <div className="card">
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Participants</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-primary)' }}>{adminStats.totalParticipants.toLocaleString()}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Researchers</div>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>{adminStats.totalResearchers}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>KYC คอยตรวจ</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: kycQueue.length > 0 ? '#D97706' : '#16A34A' }}>{kycQueue.length}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Responses</div>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>{adminStats.completedResponses.toLocaleString()}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Pending Payouts</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#D97706' }}>{pendingWithdrawals.length}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Fraud Flags</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#DC2626' }}>{adminStats.fraudFlags}</div>
        </div>
      </div>

      {/* KYC Verification Queue (Primary New Feature!) */}
      <div className="card" style={{ marginBottom: '28px', border: '1.5px solid #FCD34D' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#D97706" />
            <h3 className="text-h3" style={{ fontSize: '17px' }}>คิวตรวจสอบบัตรประชาชน & บัตรนักศึกษา (e-KYC Verification Queue)</h3>
          </div>
          <span className="badge badge-pending">{kycQueue.length} รายการค้างตรวจ</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {kycQueue.map((k) => (
            <div
              key={k.id}
              style={{
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <img
                  src={k.image}
                  alt="ID Preview"
                  onClick={() => setPreviewImage(k.image)}
                  style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CBD5E1', cursor: 'pointer' }}
                  title="คลิกเพื่อดูรูปขนาดใหญ่"
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#78350F' }}>
                    {k.name} <span style={{ fontSize: '12px', fontWeight: 400, color: '#92400E' }}>({k.studentId})</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#92400E', marginTop: '2px' }}>
                    {k.faculty} • {k.year} • ส่งเมื่อ: {k.submittedAt}
                  </div>
                  <div style={{ fontSize: '11px', color: '#B45309', marginTop: '2px' }}>
                    เลขบัตร 13 หลัก: <strong>{k.idCardNumber}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => approveKYC(k.id)}
                  className="btn btn-primary btn-sm"
                  style={{ backgroundColor: '#15803D' }}
                >
                  <Check size={14} /> อนุมัติบัตร (Verify)
                </button>
                <button
                  onClick={() => rejectKYC(k.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#B91C1C' }}
                >
                  <X size={14} /> ปฏิเสธ
                </button>
              </div>
            </div>
          ))}

          {kycQueue.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
              ✓ ไม่มีเอกสารบัตรประชาชนค้างตรวจในระบบ
            </div>
          )}
        </div>
      </div>

      {/* Review Queues */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Project Approval Queue */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="text-h3" style={{ fontSize: '16px' }}>อนุมัติแบบสอบถาม ({pendingProjects.length})</h3>
            <span className="badge badge-pending">Project Review</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingProjects.map((p) => (
              <div key={p.id} style={{ background: '#F8FAFC', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{p.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                  เจ้าของ: {p.owner} • งบประมาณ: {p.budget}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleApproveProject(p.id)} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    <Check size={14} /> อนุมัติ
                  </button>
                  <button onClick={() => handleApproveProject(p.id)} className="btn btn-secondary btn-sm">
                    <X size={14} /> ปฏิเสธ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Approvals */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="text-h3" style={{ fontSize: '16px' }}>คำขอถอนเงิน ({pendingWithdrawals.length})</h3>
            <span className="badge badge-pending">Payout Queue</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingWithdrawals.map((w) => (
              <div key={w.id} style={{ background: '#F8FAFC', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{w.name}</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{w.amount}</div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                  บัญชี: {w.account}
                </div>
                <button onClick={() => handleApproveWithdrawal(w.id)} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  <Check size={14} /> ยืนยันการโอนเงิน (Mark Paid)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="modal-backdrop" onClick={() => setPreviewImage(null)}>
          <div className="modal-content" style={{ maxWidth: '480px', padding: '16px', textAlign: 'center' }}>
            <img src={previewImage} alt="ID Document" style={{ width: '100%', borderRadius: '8px' }} />
            <button onClick={() => setPreviewImage(null)} className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }}>
              ปิดภาพ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
