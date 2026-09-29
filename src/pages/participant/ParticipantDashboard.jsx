import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, CheckCircle, Clock, ArrowRight, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { SurveyRunnerModal } from '../../components/participant/SurveyRunnerModal';
import { WithdrawalModal } from '../../components/participant/WithdrawalModal';

export const ParticipantDashboard = ({ setActiveTab }) => {
  const { participant, surveys, transactions } = useApp();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const availableSurveys = surveys.filter(s => s.status === 'Active');
  const completedCount = participant.completedSurveyIds.length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Welcome Banner & Balance Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 32px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          boxShadow: '0 8px 20px rgba(37,99,235,0.2)'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', marginBottom: '10px' }}>
            <ShieldCheck size={14} /> บัญชีผ่านการยืนยันตัวตน (Verified Student)
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}>
            สวัสดีคุณ {participant.name} 👋
          </h2>
          <p style={{ color: '#BFDBFE', fontSize: '14px' }}>
            {participant.faculty} • {participant.year}
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', padding: '20px 24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#BFDBFE', marginBottom: '4px' }}>ยอดเงินรางวัลคงเหลือ</div>
          <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            <Coins size={26} color="#FDE047" />
            <span>฿{participant.balance.toLocaleString()}</span>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="btn btn-sm"
            style={{ backgroundColor: '#FFFFFF', color: '#1E40AF', fontWeight: 600, marginTop: '8px' }}
          >
            แจ้งถอนเงินเข้าบัญชี <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="card">
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            แบบสอบถามที่ตอบแล้ว
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {completedCount} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>ชุด</span>
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            แบบสอบถามที่เปิดรับตอนนี้
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>
            {availableSurveys.length} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>ชุด</span>
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            อัตราแลกเปลี่ยนรางวัล
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-success)' }}>
            1 Credit = ฿1.00
          </div>
        </div>
      </div>

      {/* Recommended Survey Showcase */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 className="text-h3" style={{ fontSize: '18px' }}>แบบสอบถามแนะนำสำหรับคุณ</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>คัดสรรตามคณะและระดับชั้นปีของคุณ</p>
          </div>
          <button
            onClick={() => setActiveTab('surveys')}
            style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            ดูทั้งหมด ({availableSurveys.length}) <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {availableSurveys.slice(0, 2).map((s) => {
            const isCompleted = participant.completedSurveyIds.includes(s.id);
            const remaining = Math.max(0, s.targetResponses - s.completedResponses);

            return (
              <div key={s.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-active">{s.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {s.estimatedTime}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-main)' }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.4, marginBottom: '14px' }}>
                    {s.description.slice(0, 100)}...
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ค่าตอบแทน</div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-primary)' }}>
                        +฿{s.reward}.00
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>โควตาคงเหลือ</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                        {remaining} จาก {s.targetResponses} ที่
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSurvey(s)}
                    disabled={isCompleted}
                    className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle size={15} color="var(--color-success)" /> ตอบแบบสอบถามแล้ว
                      </>
                    ) : (
                      <>
                        เริ่มตอบแบบสอบถาม <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Ledger preview */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="text-h3" style={{ fontSize: '18px' }}>ประวัติรางวัลและการเงินล่าสุด</h3>
          <button
            onClick={() => setActiveTab('rewards')}
            style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600 }}
          >
            ดูประวัติทั้งหมด
          </button>
        </div>

        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                <th style={{ padding: '12px 20px', color: 'var(--color-text-muted)', fontWeight: 600 }}>รายการ</th>
                <th style={{ padding: '12px 20px', color: 'var(--color-text-muted)', fontWeight: 600 }}>วันที่</th>
                <th style={{ padding: '12px 20px', color: 'var(--color-text-muted)', fontWeight: 600, textAlign: 'right' }}>จำนวนเงิน</th>
                <th style={{ padding: '12px 20px', color: 'var(--color-text-muted)', fontWeight: 600, textAlign: 'center' }}>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 3).map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 500 }}>{tx.title}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--color-text-muted)' }}>{tx.date}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: tx.amount > 0 ? 'var(--color-success)' : '#DC2626' }}>
                    {tx.amount > 0 ? `+฿${tx.amount}` : `฿${tx.amount}`}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    <span className="badge badge-active" style={{ fontSize: '11px' }}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Survey Runner Modal */}
      {selectedSurvey && (
        <SurveyRunnerModal
          survey={selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
        />
      )}

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <WithdrawalModal onClose={() => setShowWithdrawModal(false)} />
      )}
    </div>
  );
};
