import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, CheckCircle, Clock, ArrowRight, ShieldCheck, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { SurveyRunnerModal } from '../../components/participant/SurveyRunnerModal';
import { WithdrawalModal } from '../../components/participant/WithdrawalModal';
import { KYCModal } from '../../components/participant/KYCModal';
import { DemographicModal } from '../../components/participant/DemographicModal';

export const ParticipantDashboard = ({ setActiveTab }) => {
  const { participant, surveys } = useApp();
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const availableSurveys = surveys.filter(s => s.status === 'Active');
  const completedCount = participant.completedSurveyIds.length;
  const isVerified = participant.verificationStatus === 'Verified';

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 0 60px 0' }}>
      {/* Top Welcome Banner & Balance Card (Designref Dark Canvas Hero adaptation) */}
      <div
        style={{
          backgroundColor: '#000000',
          borderRadius: 'var(--radius-card)',
          padding: '36px 40px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '32px',
          border: '1px solid var(--color-border-dark)'
        }}
      >
        <div>
          <button
            onClick={() => setShowKYCModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: isVerified ? 'rgba(255,255,255,0.14)' : '#F59E0B',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 500,
              marginBottom: '14px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            {isVerified ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            <span>สถานะ: {participant.verificationStatus === 'Verified' ? 'ยืนยันตัวตนแล้ว (Verified)' : participant.verificationStatus === 'Pending' ? 'กำลังตรวจสอบ (Pending)' : 'ยังไม่ยืนยัน (กดเพื่อยืนยัน)'}</span>
          </button>

          <h2 className="display-sm" style={{ color: '#FFFFFF', margin: '0 0 8px 0' }}>
            สวัสดีคุณ {participant.name} 👋
          </h2>
          <p style={{ color: '#9E9E9E', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', margin: 0 }}>
            <span>{participant.faculty} • {participant.year}</span>
            <button
              onClick={() => setShowDemoModal(true)}
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-full)', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <SlidersHorizontal size={12} /> แก้ไขโปรไฟล์
            </button>
          </p>
        </div>

        <div style={{ background: '#121314', padding: '24px 28px', borderRadius: 'var(--radius-card)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#9E9E9E', marginBottom: '6px' }}>ยอดเงินรางวัลคงเหลือ</div>
          <div style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', color: 'var(--color-commerce)' }}>
            <Coins size={28} />
            <span>฿{participant.balance.toLocaleString()}.00</span>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="btn-pill btn-pill-commerce"
            style={{ height: '36px', padding: '0 18px', fontSize: '13px', marginTop: '12px' }}
          >
            แจ้งถอนเงิน <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '36px' }}>
        <div 
          className="product-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-card)', 
            backgroundColor: 'var(--color-surface-card)', 
            border: '1px solid var(--color-border-subtle)' 
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            แบบสอบถามที่ตอบแล้ว
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-title)', letterSpacing: '-0.02em' }}>
            {completedCount} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>ชุด</span>
          </div>
        </div>

        <div 
          className="product-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-card)', 
            backgroundColor: 'var(--color-surface-card)', 
            border: '1px solid var(--color-border-subtle)' 
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            แบบสอบถามที่เปิดรับตอนนี้
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
            {availableSurveys.length} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>ชุด</span>
          </div>
        </div>

        <div 
          className="product-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-card)', 
            backgroundColor: 'var(--color-surface-card)', 
            border: '1px solid var(--color-border-subtle)' 
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            พื้นที่พักอาศัยของคุณ
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-title)', letterSpacing: '-0.01em' }}>
            {participant.residenceZone || 'ย่านกังสดาล'}
          </div>
        </div>
      </div>

      {/* Recommended Survey Showcase */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', margin: 0 }}>แบบสอบถามแนะนำสำหรับคุณ</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>Pre-screened ตามคณะและพื้นที่ของคุณ</p>
          </div>
          <button
            onClick={() => setActiveTab('surveys')}
            className="filter-pill"
            style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ดูทั้งหมด ({availableSurveys.length}) <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {availableSurveys.slice(0, 2).map((s) => {
            const isCompleted = participant.completedSurveyIds.includes(s.id);
            const remaining = Math.max(0, s.targetResponses - s.completedResponses);

            return (
              <div 
                key={s.id} 
                className="product-card" 
                style={{ 
                  padding: '24px', 
                  borderRadius: 'var(--radius-card)', 
                  backgroundColor: 'var(--color-surface-card)', 
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
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

                  <h4 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text-title)' }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {s.description.slice(0, 100)}...
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>ค่าตอบแทน</div>
                      <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-commerce)' }}>
                        +฿{s.reward}.00
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>โควตาคงเหลือ</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)' }}>
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
                    className={`btn-pill ${isCompleted ? 'btn-pill-secondary' : 'btn-pill-primary'}`}
                    style={{ width: '100%', height: '42px', fontSize: '14px' }}
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
