import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Wallet, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet size={20} color="var(--color-primary)" />
            <h3 className="text-h3" style={{ fontSize: '18px' }}>แจ้งถอนเงินรางวัล</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {!submitted ? (
            <form onSubmit={handleWithdraw}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>ยอดเงินที่สามารถถอนได้</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                  ฿{participant.balance.toLocaleString()}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
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
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    outline: 'none',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                />
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  ขั้นต่ำ ฿50 (ยอดเงินสูงสุดไม่เกิน ฿{participant.balance})
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  ช่องทางรับเงิน
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="PromptPay">พร้อมเพย์ (PromptPay)</option>
                  <option value="Kasikorn Bank">ธนาคารกสิกรไทย (KBANK)</option>
                  <option value="SCB">ธนาคารไทยพาณิชย์ (SCB)</option>
                  <option value="Krungthai">ธนาคารกรุงไทย (KTB)</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  หมายเลขบัญชี / เบอร์พร้อมเพย์
                </label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)'
                  }}
                />
              </div>

              {/* Summary Calculation */}
              <div style={{ background: '#F1F5F9', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '24px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>ยอดถอน:</span>
                  <span>฿{numAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>ค่าธรรมเนียมระบบ:</span>
                  <span style={{ color: '#DC2626' }}>-฿{fee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', borderTop: '1px solid #CBD5E1', paddingTop: '8px' }}>
                  <span>ยอดเงินที่จะได้รับสุทธิ:</span>
                  <span style={{ color: 'var(--color-primary)' }}>฿{netAmount.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  ยกเลิก
                </button>
                <button type="submit" disabled={!isValid} className="btn btn-primary" style={{ opacity: isValid ? 1 : 0.6 }}>
                  ยืนยันการถอน <ArrowRight size={15} />
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <CheckCircle2 size={28} color="var(--color-success)" />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
                ส่งคำขอถอนเงินเรียบร้อยแล้ว
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                ระบบกำลังดำเนินการโอนเงินจำนวน <strong>฿{netAmount}</strong> เข้าบัญชี {account} (สถานะ: Processing)
              </p>
              <button onClick={onClose} className="btn btn-primary">
                ปิดหน้าต่าง
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
