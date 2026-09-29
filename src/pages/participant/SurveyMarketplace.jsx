import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Clock,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  SlidersHorizontal,
  Zap,
  Coins,
  Building2,
  ExternalLink
} from 'lucide-react';
import { SurveyRunnerModal } from '../../components/participant/SurveyRunnerModal';
import { KYCModal } from '../../components/participant/KYCModal';
import { DemographicModal } from '../../components/participant/DemographicModal';

export const SurveyMarketplace = () => {
  const { surveys, participant } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [quickFilter, setQuickFilter] = useState('all'); // 'all' | 'quick' | 'high_reward' | 'match' | 'my_faculty'
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

    // Quick filter evaluation
    let matchQuick = true;
    const durationNumber = parseInt(s.estimatedTime, 10) || 0;
    const facultyMatch = !s.targetFaculty || s.targetFaculty.includes('ทุกคณะ') || s.targetFaculty.includes(participant.faculty);
    const residenceMatch = !s.targetResidence || s.targetResidence.includes('ทุกพื้นที่') || s.targetResidence === participant.residenceZone;
    const is100Match = facultyMatch && residenceMatch;

    if (quickFilter === 'quick') {
      matchQuick = durationNumber > 0 && durationNumber <= 5;
    } else if (quickFilter === 'high_reward') {
      matchQuick = s.reward >= 20;
    } else if (quickFilter === 'match') {
      matchQuick = is100Match;
    } else if (quickFilter === 'my_faculty') {
      matchQuick = facultyMatch;
    }

    return matchSearch && matchCat && matchQuick;
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
    <div className="max-w-6xl mx-auto pb-16">
      {/* Verification Warning Alert if Unverified or Pending */}
      {!isVerified && (
        <div
          className={`p-4 px-5 rounded-[8px] mb-8 flex justify-between items-center flex-wrap gap-3 border ${
            participant.verificationStatus === 'Pending'
              ? 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]'
              : 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldAlert
              size={22}
              className={participant.verificationStatus === 'Pending' ? 'text-[#d97706]' : 'text-[#c81b3a]'}
            />
            <div>
              <div className="font-bold text-xs">
                {participant.verificationStatus === 'Pending'
                  ? 'เอกสารยืนยันตัวตนของคุณอยู่ระหว่างการตรวจสอบ (Pending Review)'
                  : 'คุณยังไม่ได้ยืนยันตัวตนด้วยบัตรประชาชน (Unverified)'}
              </div>
              <div className="text-[11px] opacity-90 mt-0.5">
                {participant.verificationStatus === 'Pending'
                  ? 'เมื่อเจ้าหน้าที่ตรวจสอบเสร็จสิ้น ระบบจะปลดล็อกสิทธิ์การตอบแบบสอบถามและรับเงินรางวัลให้ทันที'
                  : 'กรุณายืนยันตัวตน (e-KYC) เพื่อรักษามาตรฐานงานวิจัยและปลดล็อกสิทธิ์รับเงินรางวัล'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowKYCModal(true)}
            className="btn-pill btn-pill-sm text-xs bg-[#c81b3a] text-white hover:bg-[#aa2f00]"
          >
            {participant.verificationStatus === 'Pending' ? 'ดูสถานะการตรวจ' : 'ยืนยันตัวตนเลย (e-KYC)'}
          </button>
        </div>
      )}

      {/* Header & Demographic Profile Button */}
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4 border-b border-[#f3f3f3] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-light text-black tracking-tight mb-1">
            ตลาดแบบสอบถาม (Survey Marketplace)
          </h1>
          <p className="text-xs sm:text-sm text-[#6b6b6b]">
            แบบสอบถามวิชาการที่ผ่านการคัดกรองตรงตามกลุ่มเป้าหมายของคุณในมหาวิทยาลัยขอนแก่น
          </p>
        </div>

        <button
          onClick={() => setShowDemoModal(true)}
          className="px-4 py-2 rounded-full border border-[#cbd5e1] bg-white hover:bg-[#f5f7fa] text-xs font-semibold text-black flex items-center gap-2 transition-colors"
        >
          <SlidersHorizontal size={14} className="text-[#0070d1]" />
          <span>แก้ไข Demographic โปรไฟล์</span>
        </button>
      </div>

      {/* Signature Search Bar (support-search-bar from designref.md) */}
      <div className="mb-6">
        <div className="support-search-bar">
          <Search size={18} className="text-[#6b6b6b]" />
          <input
            type="text"
            placeholder="ค้นหาชื่อแบบสอบถาม หรือชื่อผู้วิจัย..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter and Sorting Row (filter-pill from designref.md) */}
      <div className="flex justify-between items-center flex-wrap gap-3 mb-8">
        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setQuickFilter('all')}
            className={`filter-pill ${quickFilter === 'all' ? 'active' : ''}`}
          >
            ✨ ทั้งหมด ({surveys.length})
          </button>

          <button
            onClick={() => setQuickFilter('quick')}
            className={`filter-pill ${quickFilter === 'quick' ? 'active' : ''}`}
          >
            <Zap size={13} className={quickFilter === 'quick' ? 'text-white' : 'text-[#d53b00]'} />
            ⚡ งานด่วน (&le; 5 นาที)
          </button>

          <button
            onClick={() => setQuickFilter('high_reward')}
            className={`filter-pill ${quickFilter === 'high_reward' ? 'active' : ''}`}
          >
            <Coins size={13} className={quickFilter === 'high_reward' ? 'text-white' : 'text-[#d53b00]'} />
            💰 ค่าตอบแทนสูง (&ge; ฿20)
          </button>

          <button
            onClick={() => setQuickFilter('match')}
            className={`filter-pill ${quickFilter === 'match' ? 'active' : ''}`}
          >
            <Sparkles size={13} className={quickFilter === 'match' ? 'text-white' : 'text-[#0070d1]'} />
            🎯 ตรงกับฉัน 100%
          </button>

          <button
            onClick={() => setQuickFilter('my_faculty')}
            className={`filter-pill ${quickFilter === 'my_faculty' ? 'active' : ''}`}
          >
            <Building2 size={13} className={quickFilter === 'my_faculty' ? 'text-white' : 'text-[#6b6b6b]'} />
            🏛 {participant.faculty || 'คณะของฉัน'}
          </button>
        </div>

        {/* Categories & Sorting Dropdowns */}
        <div className="flex gap-2.5 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-[4px] border border-[#cbd5e1] bg-white text-xs font-medium text-black focus:outline-none focus:border-[#0070d1]"
          >
            <option value="All">หมวดหมู่ทั้งหมด</option>
            {categories.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-[4px] border border-[#cbd5e1] bg-white text-xs font-medium text-black focus:outline-none focus:border-[#0070d1]"
          >
            <option value="default">ความเหมาะสมกับคุณ</option>
            <option value="reward">ค่าตอบแทนสูงสุด</option>
            <option value="remaining">โควตาที่เหลืออยู่</option>
          </select>
        </div>
      </div>

      {/* Survey Grid: Strict 8px Radius Product Cards (designref.md product-card) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map((s) => {
          const isCompleted = participant.completedSurveyIds.includes(s.id);
          const remaining = Math.max(0, s.targetResponses - s.completedResponses);
          const isFull = s.status === 'Completed' || remaining === 0;

          // Demographic matching calculation
          const facultyMatch = !s.targetFaculty || s.targetFaculty.includes('ทุกคณะ') || s.targetFaculty.includes(participant.faculty);
          const residenceMatch = !s.targetResidence || s.targetResidence.includes('ทุกพื้นที่') || s.targetResidence === participant.residenceZone;
          const is100Match = facultyMatch && residenceMatch;

          return (
            <div
              key={s.id}
              className="product-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-card)',
                backgroundColor: 'var(--color-surface-card)',
                border: '1px solid var(--color-border-subtle)',
                padding: '24px',
                opacity: isFull ? 0.7 : 1
              }}
            >
              <div>
                {/* Card Top Strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-active">{s.category}</span>
                    {s.surveyType === 'external_google_forms' && (
                      <span className="badge" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-primary)', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                        <ExternalLink size={10} style={{ marginRight: '4px' }} /> Google Forms
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    <Clock size={12} /> {s.estimatedTime}
                  </span>
                </div>

                {/* Match Tag */}
                {is100Match && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                    <Sparkles size={11} /> ตรงกับโปรไฟล์คุณ 100%
                  </div>
                )}

                {/* Survey Title & Description */}
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-title)', lineHeight: 1.4, margin: '0 0 8px 0' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                  {s.description}
                </p>

                {/* Metadata Box: Inset flat panel */}
                <div style={{ fontSize: '12px', color: 'var(--color-text-body)', backgroundColor: '#FFFFFF', padding: '12px 14px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border-subtle)', marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong style={{ color: 'var(--color-text-title)' }}>ผู้วิจัย:</strong> {s.researcher}</div>
                  <div><strong style={{ color: 'var(--color-text-title)' }}>กลุ่มเป้าหมาย:</strong> {s.eligibility}</div>
                  {s.targetResidence && !s.targetResidence.includes('ทุกพื้นที่') && (
                    <div style={{ color: '#059669', fontWeight: 500 }}><strong>พื้นที่:</strong> {s.targetResidence}</div>
                  )}
                </div>
              </div>

              {/* Card Footer: Reward & Full-Radius Capsule Pill CTA */}
              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>ค่าตอบแทนจริง</div>
                    {/* Commerce Orange Pill value (designref.md) */}
                    <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-commerce)', letterSpacing: '-0.02em', marginTop: '2px' }}>
                      +฿{s.reward}.00
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>โควตา</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: isFull ? 'var(--color-commerce)' : 'var(--color-text-title)' }}>
                      {isFull ? 'ครบโควตาแล้ว' : `${remaining} ที่เหลืออยู่`}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartSurvey(s)}
                  disabled={isCompleted || isFull}
                  className={`btn-pill ${isCompleted ? 'btn-pill-secondary' : isFull ? 'btn-pill-secondary' : 'btn-pill-primary'}`}
                  style={{ width: '100%', height: '42px', fontSize: '14px', opacity: isFull ? 0.6 : 1 }}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={15} className="text-[#059669]" /> คุณตอบแบบสอบถามนี้แล้ว
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
        <div className="text-center py-20 px-6 bg-[#f5f7fa] rounded-[8px] border border-[#f3f3f3] mt-6">
          <p className="text-[#6b6b6b] text-sm mb-4">
            ไม่พบแบบสอบถามที่ตรงกับเงื่อนไขการค้นหาหรือฟิลเตอร์ที่เลือก
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setQuickFilter('all');
            }}
            className="px-5 py-2 rounded-full border border-[#cbd5e1] text-xs font-bold text-black hover:bg-white"
          >
            ล้างตัวกรองทั้งหมด
          </button>
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
