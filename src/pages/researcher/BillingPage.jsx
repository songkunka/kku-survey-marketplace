import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, Plus, CreditCard, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const BillingPage = () => {
  const { researcher, showToast } = useApp();
  const [depositAmount, setDepositAmount] = useState('1000');

  const handleDeposit = (e) => {
    e.preventDefault();
    const val = Number(depositAmount);
    if (!val || val <= 0) return;
    researcher.balance += val;
    showToast(`เติมงบประมาณสำเร็จ +฿${val.toLocaleString()} เรียบร้อยแล้ว`, 'success');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ marginBottom: '4px' }}>งบประมาณและการเงิน (Research Budget & Billing)</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          จัดการยอดเงินในบัญชีสำหรับตั้งค่าตอบแทนผู้ตอบแบบสอบถาม
        </p>
      </div>

      {/* Balance Card */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
          color: '#FFFFFF',
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
          <div style={{ fontSize: '13px', color: '#A7F3D0', marginBottom: '4px' }}>งบประมาณพร้อมใช้งาน (Available Balance)</div>
          <div style={{ fontSize: '36px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Coins size={32} />
            <span>฿{researcher.balance.toLocaleString()}.00</span>
          </div>
          <div style={{ fontSize: '12px', color: '#D1FAE5', marginTop: '4px' }}>
            พร้อมสำหรับจัดสรรให้กับโครงการวิจัยใหม่
          </div>
        </div>

        <form onSubmit={handleDeposit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: 'none', fontWeight: 600, fontSize: '14px', backgroundColor: '#FFFFFF', color: '#065F46' }}
          >
            <option value="500">+ ฿500.00</option>
            <option value="1000">+ ฿1,000.00</option>
            <option value="2000">+ ฿2,000.00</option>
            <option value="5000">+ ฿5,000.00</option>
          </select>
          <button
            type="submit"
            className="btn btn-sm"
            style={{ backgroundColor: '#FFFFFF', color: '#065F46', padding: '10px 16px', fontWeight: 700, fontSize: '14px' }}
          >
            <Plus size={16} /> เติมงบประมาณ (Demo)
          </button>
        </form>
      </div>

      {/* Recent Ledger */}
      <div className="card">
        <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '16px' }}>ประวัติการตัดงบและเติมเงิน</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>รายการ</th>
              <th style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>วันที่</th>
              <th style={{ padding: '12px 16px', color: 'var(--color-text-muted)', textAlign: 'right' }}>จำนวนเงิน</th>
              <th style={{ padding: '12px 16px', color: 'var(--color-text-muted)', textAlign: 'center' }}>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '12px 16px', fontWeight: 500 }}>เติมงบประมาณวิจัย (PromptPay QR)</td>
              <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>28 ก.ย. 2026</td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--color-success)' }}>+฿2,000.00</td>
              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                <span className="badge badge-active" style={{ fontSize: '11px' }}>สำเร็จ</span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '12px 16px', fontWeight: 500 }}>ล็อกงบ: KKU Student Food Delivery Behavior</td>
              <td style={{ padding: '12px 16px', color: 'var(--color-text-muted)' }}>27 ก.ย. 2026</td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#DC2626' }}>-฿800.00</td>
              <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                <span className="badge badge-active" style={{ fontSize: '11px' }}>ล็อกในระบบ</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
