import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, ArrowUpRight, ArrowDownLeft, HelpCircle } from 'lucide-react';
import { WithdrawalModal } from '../../components/participant/WithdrawalModal';

export const RewardsPage = () => {
  const { participant, transactions } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 0 60px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 className="display-md" style={{ marginBottom: '4px', color: 'var(--color-text-title)' }}>
          กระเป๋าเงิน & ค่าตอบแทน (Rewards & Wallet)
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: 0 }}>
          ติดตามผลตอบแทนจากการตอบแบบสอบถาม และทำเรื่องถอนเงินเข้าบัญชีจริง
        </p>
      </div>

      {/* Balance Card */}
      <div
        className="product-card"
        style={{
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-card)',
          padding: '32px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            ยอดเงินที่สามารถถอนได้ (Available Balance)
          </div>
          <div style={{ fontSize: '40px', fontWeight: 700, color: 'var(--color-commerce)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Coins size={36} />
            <span>฿{participant.balance.toLocaleString()}.00</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            อัตราคงที่: <strong>1 Credit = 1.00 บาทไทย</strong> (ไม่มีหมดอายุ)
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-pill btn-pill-commerce"
          style={{ height: '48px', padding: '0 28px', fontSize: '15px' }}
        >
          <ArrowUpRight size={18} /> แจ้งถอนเงิน
        </button>
      </div>

      {/* Info Notice */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-card)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}
      >
        <HelpCircle size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
        <div>
          <strong style={{ color: 'var(--color-text-title)' }}>เงื่อนไขการถอนเงิน:</strong> ถอนขั้นต่ำ ฿50 ต่อครั้ง • ค่าธรรมเนียมระบบ ฿5 ต่อรายการ • ระบบจะโอนเงินผ่านระบบพร้อมเพย์หรือบัญชีธนาคารภายใน 24 ชั่วโมง
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '18px' }}>
          บันทึกประวัติการเงิน (Transaction Ledger)
        </h3>

        <div className="product-card" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border-subtle)', backgroundColor: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border-subtle)', textAlign: 'left' }}>
                <th style={{ padding: '14px 20px', color: 'var(--color-text-muted)', fontWeight: 600 }}>ประเภท</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-text-muted)', fontWeight: 600 }}>รายละเอียด</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-text-muted)', fontWeight: 600 }}>วันที่</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-text-muted)', fontWeight: 600, textAlign: 'right' }}>จำนวน</th>
                <th style={{ padding: '14px 20px', color: 'var(--color-text-muted)', fontWeight: 600, textAlign: 'center' }}>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const isPositive = tx.amount > 0;
                return (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: isPositive ? 'var(--color-success)' : '#DC2626'
                        }}
                      >
                        {isPositive ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                        {isPositive ? 'รับรางวัล' : 'ถอนเงิน'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--color-text-title)' }}>
                      {tx.title}
                    </td>
                    <td style={{ padding: '14px 20px', color: 'var(--color-text-muted)' }}>
                      {tx.date}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: isPositive ? 'var(--color-success)' : '#DC2626' }}>
                      {isPositive ? `+฿${tx.amount}.00` : `฿${tx.amount}.00`}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <span className={`badge ${tx.status === 'Completed' ? 'badge-active' : 'badge-pending'}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <WithdrawalModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
