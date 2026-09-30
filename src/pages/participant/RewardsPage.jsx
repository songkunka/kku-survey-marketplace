import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, ArrowUpRight, ArrowDownLeft, ShieldCheck, HelpCircle } from 'lucide-react';
import { WithdrawalModal } from '../../components/participant/WithdrawalModal';

export const RewardsPage = () => {
  const { participant, transactions } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ marginBottom: '4px' }}>กระเป๋าเงิน & ค่าตอบแทน (Rewards & Wallet)</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          ติดตามผลตอบแทนจากการตอบแบบสอบถาม และทำเรื่องถอนเงินเข้าบัญชีจริง
        </p>
      </div>

      {/* Balance Card */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
          border: '1.5px solid #BFDBFE',
          padding: '28px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            ยอดเงินที่สามารถถอนได้ (Available Balance)
          </div>
          <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Coins size={32} />
            <span>฿{participant.balance.toLocaleString()}.00</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            อัตราคงที่: <strong>1 Credit = 1.00 บาทไทย</strong> (ไม่มีหมดอายุ)
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-lg"
          style={{ minWidth: '160px' }}
        >
          <ArrowUpRight size={18} /> แจ้งถอนเงิน
        </button>
      </div>

      {/* Info Notice */}
      <div
        style={{
          backgroundColor: '#F1F5F9',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 18px',
          display: 'flex',
          gap: '12px',
          marginBottom: '28px',
          fontSize: '13px',
          color: 'var(--color-text-muted)'
        }}
      >
        <HelpCircle size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>เงื่อนไขการถอนเงิน:</strong> ถอนขั้นต่ำ ฿50 ต่อครั้ง • ค่าธรรมเนียมระบบ ฿5 ต่อรายการ • ระบบจะโอนเงินผ่านระบบพร้อมเพย์หรือบัญชีธนาคารภายใน 24 ชั่วโมง
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-h3" style={{ fontSize: '18px', marginBottom: '16px' }}>
          บันทึกประวัติการเงิน (Transaction Ledger)
        </h3>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
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
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
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
                    <td style={{ padding: '14px 20px', fontWeight: 500 }}>
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
