import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, CheckCircle, Clock, ArrowRight, ShieldCheck, ShieldAlert, Sparkles, SlidersHorizontal } from 'lucide-react';
import { SurveyRunnerModal } from '../../components/participant/SurveyRunnerModal';
import { WithdrawalModal } from '../../components/participant/WithdrawalModal';
import { KYCModal } from '../../components/participant/KYCModal';
import { DemographicModal } from '../../components/participant/DemographicModal';

export const ParticipantDashboard = ({ setActiveTab }) => {
  const { participant, surveys, transactions } = useApp();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const availableSurveys = surveys.filter(s => s.status === 'Active');
  const completedCount = participant.completedSurveyIds.length;
  const isVerified = participant.verificationStatus === 'Verified';

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
          marginBottom: '28px',
          boxShadow: '0 8px 20px rgba(37,99,235,0.2)'
        }}
      >
        <div>
          <button
            onClick={() => setShowKYCModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: isVerified ? 'rgba(255,255,255,0.18)' : '#F59E0B',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              marginBottom: '10px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            {isVerified ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            <span>สถานะ: {participant.verificationStatus === 'Verified' ? 'ยืนยันตัวตนแล้ว (Verified)' : participant.verificationStatus === 'Pending' ? 'กำลังตรวจสอบ (Pending)' : 'ยังไม่ยืนยัน (กดเพื่อยืนยัน)'}</span>
          </button>

          <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}>
            สวัสดีคุณ {participant.name} 👋
          </h2>
          <p style={{ color: '#BFDBFE', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>{participant.faculty} • {participant.year}</span>
            <button
              onClick={() => setShowDemoModal(true)}
              style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <SlidersHorizontal size={11} /> แก้ไขโปรไฟล์
            </button>
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
            พื้นที่พักอาศัยของคุณ
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {participant.residenceZone || 'ย่านกังสดาล'}
          </div>
        </div>
      </div>

      {/* Recommended Survey Showcase */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 className="text-h3" style={{ fontSize: '18px' }}>แบบสอบถามแนะนำสำหรับคุณ</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Pre-screened ตามคณะและพื้นที่ของคุณ</p>
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
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span className="badge badge-active">{s.category}</span>
                      {s.surveyType === 'external_google_forms' && (
                        <span className="badge" style={{ background: '#EDE9FE', color: '#6D28D9', fontSize: '10px' }}>Google Forms</span>
                      )}
                    </div>
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
                    onClick={() => {
                      if (!isVerified) {
                        setShowKYCModal(true);
                      } else {
                        setSelectedSurvey(s);
                      }
                    }}
                    disabled={isCompleted}
                    className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle size={15} color="var(--color-success)" /> ตอบแบบสอบถามแล้ว
                      </>
                    ) : !isVerified ? (
                      'ยืนยันตัวตนเพื่อเริ่มทำ'
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

      {/* Modals */}
      {selectedSurvey && (
        <SurveyRunnerModal
          survey={selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
        />
      )}

      {showWithdrawModal && (
        <WithdrawalModal onClose={() => setShowWithdrawModal(false)} />
      )}

      {showKYCModal && (
        <KYCModal onClose={() => setShowKYCModal(false)} />
      )}

      {showDemoModal && (
        <DemographicModal onClose={() => setShowDemoModal(false)} />
      )}
    </div>
  );
};
