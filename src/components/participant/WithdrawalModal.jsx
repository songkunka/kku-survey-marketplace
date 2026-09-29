import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WithdrawalModal = ({ onClose }) => {
  const { participant, requestWithdrawal } = useApp();
  const [amount, setAmount] = useState('100');
  const [method, setMethod] = useState('PromptPay');
  const [account, setAccount] = useState('089-xxx-4567 (พร้อมเพย์ เบอร์โทร)');
  const [submitted, setSubmitted] = useState(false);

  const numAmount = Number(amount) || 0;
  const fee = 5;
  const netAmount = Math.max(0, numAmount - fee);
  const isValid = numAmount >= 50 && numAmount <= participant.balance;

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const res = requestWithdrawal(numAmount, method, account);
    if (res.success) {
      setSubmitted(true);
    }
  };

  return (
    <div className="modal-backdrop">
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '480px', 
          borderRadius: 'var(--radius-card)', 
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-dropdown)',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-card)', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', margin: 0 }}>แจ้งถอนเงินรางวัล</h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              color: 'var(--color-text-muted)', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
          {!submitted ? (
            <form onSubmit={handleWithdraw}>
              <div style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '16px 20px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border-subtle)', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>ยอดเงินที่สามารถถอนได้</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-commerce)', letterSpacing: '-0.02em', marginTop: '4px' }}>
                  ฿{participant.balance.toLocaleString()}.00
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
                  จำนวนเงินที่ต้องการถอน (บาท)
                </label>
                <input
                  type="number"
                  min="50"
                  max={participant.balance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-input)',
                    border: '1px solid var(--color-border)',
                    outline: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-text-title)'
                  }}
                />
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  ขั้นต่ำ ฿50 (ยอดเงินสูงสุดไม่เกิน ฿{participant.balance})
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
                  ช่องทางรับเงิน
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 12px',
                    borderRadius: 'var(--radius-input)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '14px',
                    color: 'var(--color-text-body)'
                  }}
                >
                  <option value="PromptPay">พร้อมเพย์ (PromptPay)</option>
                  <option value="Kasikorn Bank">ธนาคารกสิกรไทย (KBANK)</option>
                  <option value="SCB">ธนาคารไทยพาณิชย์ (SCB)</option>
                  <option value="Krungthai">ธนาคารกรุงไทย (KTB)</option>
                </select>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
                  หมายเลขบัญชี / เบอร์พร้อมเพย์
                </label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-input)',
                    border: '1px solid var(--color-border)',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-text-body)'
                  }}
                />
              </div>

              {/* Summary Calculation */}
              <div style={{ background: 'var(--color-bg-subtle)', padding: '16px 20px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border-subtle)', marginBottom: '24px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>ยอดถอน:</span>
                  <span style={{ fontWeight: 500, color: 'var(--color-text-title)' }}>฿{numAmount.toLocaleString()}.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>ค่าธรรมเนียมระบบ:</span>
                  <span style={{ color: '#DC2626', fontWeight: 500 }}>-฿{fee}.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '10px', marginTop: '6px' }}>
                  <span style={{ color: 'var(--color-text-title)' }}>ยอดเงินที่จะได้รับสุทธิ:</span>
                  <span style={{ color: 'var(--color-commerce)' }}>฿{netAmount.toLocaleString()}.00</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '18px' }}>
                <button type="button" onClick={onClose} className="btn-pill btn-pill-secondary">
                  ยกเลิก
                </button>
                <button type="submit" disabled={!isValid} className="btn-pill btn-pill-commerce" style={{ opacity: isValid ? 1 : 0.6 }}>
                  ยืนยันการถอน <ArrowRight size={15} />
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0 10px 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={32} color="var(--color-success)" />
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-title)', marginBottom: '8px' }}>
                ส่งคำขอถอนเงินเรียบร้อยแล้ว
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                ระบบกำลังดำเนินการโอนเงินจำนวน <strong style={{ color: 'var(--color-commerce)' }}>฿{netAmount}.00</strong> เข้าบัญชี {account} (สถานะ: Processing)
              </p>
              <button onClick={onClose} className="btn-pill btn-pill-primary" style={{ height: '42px', padding: '0 28px' }}>
                ปิดหน้าต่าง
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
