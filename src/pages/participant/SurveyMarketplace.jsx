import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Clock, Award, CheckCircle, ArrowRight, ShieldAlert, Sparkles, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { SurveyRunnerModal } from '../../components/participant/SurveyRunnerModal';
import { KYCModal } from '../../components/participant/KYCModal';
import { DemographicModal } from '../../components/participant/DemographicModal';

export const SurveyMarketplace = () => {
  const { surveys, participant } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const categories = ['All', 'Consumer Behavior', 'Finance', 'Lifestyle', 'Transportation'];

  const isVerified = participant.verificationStatus === 'Verified';

  // Filter and Sort
  let filtered = surveys.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.researcher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  if (sortBy === 'reward') {
    filtered.sort((a, b) => b.reward - a.reward);
  } else if (sortBy === 'remaining') {
    filtered.sort((a, b) => (b.targetResponses - b.completedResponses) - (a.targetResponses - a.completedResponses));
  }

  const handleStartSurvey = (survey) => {
    if (!isVerified) {
      setShowKYCModal(true);
      return;
    }
    setSelectedSurvey(survey);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Verification Warning Alert if Unverified or Pending */}
      {!isVerified && (
        <div
          style={{
            backgroundColor: participant.verificationStatus === 'Pending' ? '#FEF3C7' : '#FEE2E2',
            border: `1.5px solid ${participant.verificationStatus === 'Pending' ? '#F59E0B' : '#EF4444'}`,
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldAlert size={22} color={participant.verificationStatus === 'Pending' ? '#B45309' : '#DC2626'} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: participant.verificationStatus === 'Pending' ? '#92400E' : '#991B1B' }}>
                {participant.verificationStatus === 'Pending' 
                  ? 'เอกสารยืนยันตัวตนของคุณอยู่ระหว่างการตรวจสอบ (Pending Review)'
                  : 'คุณยังไม่ได้ยืนยันตัวตนด้วยบัตรประชาชน (Unverified)'}
              </div>
              <div style={{ fontSize: '12px', color: participant.verificationStatus === 'Pending' ? '#B45309' : '#B91C1C' }}>
                {participant.verificationStatus === 'Pending'
                  ? 'เมื่อแอดมินตรวจสอบเสร็จสิ้น ระบบจะปลดล็อกสิทธิ์การตอบแบบสอบถามและรับเงินรางวัลให้ทันที'
                  : 'กรุณายืนยันตัวตน (e-KYC) เพื่อรักษามาตรฐานงานวิจัยและปลดล็อกสิทธิ์รับเงินรางวัล'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowKYCModal(true)}
            className="btn btn-sm btn-primary"
            style={{ backgroundColor: participant.verificationStatus === 'Pending' ? '#B45309' : '#DC2626' }}
          >
            {participant.verificationStatus === 'Pending' ? 'ดูสถานะการตรวจ' : 'ยืนยันตัวตนเลย (e-KYC)'}
          </button>
        </div>
      )}

      {/* Header & Demographic profile button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 className="text-h2" style={{ marginBottom: '4px' }}>ตลาดแบบสอบถาม (Survey Marketplace)</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
            แบบสอบถามที่ผ่านการ Pre-screen มาเพื่อคุณโดยเฉพาะ
          </p>
        </div>

        <button
          onClick={() => setShowDemoModal(true)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <SlidersHorizontal size={14} /> แก้ไข Demographic โปรไฟล์
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="card" style={{ padding: '16px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px', background: '#F8FAFC', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="ค้นหาชื่อแบบสอบถาม หรือชื่อผู้วิจัย..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '13px' }}
          >
            <option value="All">หมวดหมู่ทั้งหมด</option>
            {categories.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '13px' }}
          >
            <option value="default">ความเหมาะสมกับคุณ</option>
            <option value="reward">ค่าตอบแทนสูงสุด</option>
            <option value="remaining">โควตาที่เหลืออยู่</option>
          </select>
        </div>
      </div>

      {/* Survey Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px' }}>
        {filtered.map((s) => {
          const isCompleted = participant.completedSurveyIds.includes(s.id);
          const remaining = Math.max(0, s.targetResponses - s.completedResponses);
          const isFull = s.status === 'Completed' || remaining === 0;

          // Demographic matching calculation
          const facultyMatch = !s.targetFaculty || s.targetFaculty.includes('ทุกคณะ') || s.targetFaculty === participant.faculty;
          const residenceMatch = !s.targetResidence || s.targetResidence.includes('ทุกพื้นที่') || s.targetResidence === participant.residenceZone;
          const is100Match = facultyMatch && residenceMatch;

          return (
            <div
              key={s.id}
              className="card card-hover"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: isFull ? 0.75 : 1 }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-active">{s.category}</span>
                    {s.surveyType === 'external_google_forms' && (
                      <span className="badge" style={{ background: '#EDE9FE', color: '#6D28D9', fontSize: '10px' }}>
                        Google Forms
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                    <Clock size={12} /> {s.estimatedTime}
                  </span>
                </div>

                {/* Match indicator */}
                {is100Match && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
                    <Sparkles size={11} /> ตรงกับโปรไฟล์คุณ 100%
                  </div>
                )}

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px', lineHeight: 1.35 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.45, marginBottom: '14px' }}>
                  {s.description}
                </p>

                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', marginBottom: '16px' }}>
                  <div><strong>ผู้วิจัย:</strong> {s.researcher}</div>
                  <div><strong>กลุ่มเป้าหมาย:</strong> {s.eligibility}</div>
                  {s.targetResidence && !s.targetResidence.includes('ทุกพื้นที่') && (
                    <div style={{ color: '#047857' }}><strong>พื้นที่:</strong> {s.targetResidence}</div>
                  )}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500 }}>ค่าตอบแทน</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-primary)' }}>
                      +฿{s.reward}.00
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>โควตา</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: isFull ? '#DC2626' : '#334155' }}>
                      {isFull ? 'ครบโควตาแล้ว' : `${remaining} ที่เหลืออยู่`}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartSurvey(s)}
                  disabled={isCompleted || isFull}
                  className={`btn ${isCompleted ? 'btn-secondary' : isFull ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ width: '100%' }}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={15} color="var(--color-success)" /> คุณตอบแบบสอบถามนี้แล้ว
                    </>
                  ) : isFull ? (
                    'ปิดรับคำตอบแล้ว'
                  ) : !isVerified ? (
                    'ยืนยันตัวตนเพื่อเริ่มทำ'
                  ) : (
                    <>
                      เริ่มทำแบบสอบถาม <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 20px', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
            ไม่พบแบบสอบถามที่ตรงกับเงื่อนไขการค้นหา
          </p>
        </div>
      )}

      {selectedSurvey && (
        <SurveyRunnerModal
          survey={selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
        />
      )}

      {showKYCModal && <KYCModal onClose={() => setShowKYCModal(false)} />}
      {showDemoModal && <DemographicModal onClose={() => setShowDemoModal(false)} />}
    </div>
  );
};
