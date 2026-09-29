import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Clock, Award, CheckCircle, ArrowRight, ShieldAlert, Sparkles, SlidersHorizontal, ExternalLink, Zap, Coins, Building2 } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto pb-12">
      {/* Verification Warning Alert if Unverified or Pending */}
      {!isVerified && (
        <div
          className={`p-4 px-5 rounded-2xl mb-6 flex justify-between items-center flex-wrap gap-3 border ${
            participant.verificationStatus === 'Pending'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <ShieldAlert
              size={22}
              className={participant.verificationStatus === 'Pending' ? 'text-amber-600' : 'text-red-600'}
            />
            <div>
              <div className="font-bold text-sm">
                {participant.verificationStatus === 'Pending'
                  ? 'เอกสารยืนยันตัวตนของคุณอยู่ระหว่างการตรวจสอบ (Pending Review)'
                  : 'คุณยังไม่ได้ยืนยันตัวตนด้วยบัตรประชาชน (Unverified)'}
              </div>
              <div className="text-xs opacity-90">
                {participant.verificationStatus === 'Pending'
                  ? 'เมื่อแอดมินตรวจสอบเสร็จสิ้น ระบบจะปลดล็อกสิทธิ์การตอบแบบสอบถามและรับเงินรางวัลให้ทันที'
                  : 'กรุณายืนยันตัวตน (e-KYC) เพื่อรักษามาตรฐานงานวิจัยและปลดล็อกสิทธิ์รับเงินรางวัล'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowKYCModal(true)}
            className={`btn btn-sm ${
              participant.verificationStatus === 'Pending' ? 'btn-secondary' : 'btn-primary bg-red-600 hover:bg-red-700'
            }`}
          >
            {participant.verificationStatus === 'Pending' ? 'ดูสถานะการตรวจ' : 'ยืนยันตัวตนเลย (e-KYC)'}
          </button>
        </div>
      )}

      {/* Header & Demographic profile button */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">ตลาดแบบสอบถาม (Survey Marketplace)</h2>
          <p className="text-sm text-slate-500">
            แบบสอบถามวิชาการที่ผ่านการคัดกรองตรงตามกลุ่มเป้าหมายของคุณใน มข.
          </p>
        </div>

        <button
          onClick={() => setShowDemoModal(true)}
          className="btn btn-secondary btn-sm flex items-center gap-2"
        >
          <SlidersHorizontal size={14} /> ข้อมูลประชากรศาสตร์ (Demographic)
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="card p-4 mb-4 flex gap-4 flex-wrap items-center justify-between">
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px] bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อแบบสอบถาม หรือชื่อผู้วิจัย..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none bg-transparent outline-none w-full text-xs font-medium text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex gap-2.5 items-center flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">หมวดหมู่ทั้งหมด</option>
            {categories.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">ความเหมาะสมกับคุณ</option>
            <option value="reward">ค่าตอบแทนสูงสุด</option>
            <option value="remaining">โควตาที่เหลืออยู่</option>
          </select>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap mr-1">กรองด่วน:</span>
        
        <button
          onClick={() => setQuickFilter('all')}
          className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap font-medium flex items-center gap-1.5 ${
            quickFilter === 'all'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          ✨ ทั้งหมด ({surveys.length})
        </button>

        <button
          onClick={() => setQuickFilter('quick')}
          className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap font-medium flex items-center gap-1.5 ${
            quickFilter === 'quick'
              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
          }`}
        >
          <Zap size={13} className={quickFilter === 'quick' ? 'text-white' : 'text-amber-500'} />
          ⚡ งานด่วน (&le; 5 นาที)
        </button>

        <button
          onClick={() => setQuickFilter('high_reward')}
          className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap font-medium flex items-center gap-1.5 ${
            quickFilter === 'high_reward'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
          }`}
        >
          <Coins size={13} className={quickFilter === 'high_reward' ? 'text-white' : 'text-emerald-600'} />
          💰 ค่าตอบแทนสูง (&ge; ฿20)
        </button>

        <button
          onClick={() => setQuickFilter('match')}
          className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap font-medium flex items-center gap-1.5 ${
            quickFilter === 'match'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
          }`}
        >
          <Sparkles size={13} className={quickFilter === 'match' ? 'text-white' : 'text-indigo-600'} />
          🎯 ตรงกับฉัน 100%
        </button>

        <button
          onClick={() => setQuickFilter('my_faculty')}
          className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap font-medium flex items-center gap-1.5 ${
            quickFilter === 'my_faculty'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Building2 size={13} className={quickFilter === 'my_faculty' ? 'text-white' : 'text-slate-500'} />
          🏛 {participant.faculty || 'คณะของฉัน'}
        </button>
      </div>

      {/* Survey Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              className={`card card-hover flex flex-col justify-between ${isFull ? 'opacity-75' : ''}`}
            >
              <div>
                <div className="flex justify-between items-start mb-2.5 gap-2">
                  <div className="flex gap-1.5 items-center flex-wrap">
                    <span className="badge badge-active">{s.category}</span>
                    {s.surveyType === 'external_google_forms' && (
                      <span className="badge bg-purple-50 text-purple-700 border border-purple-200 text-xs py-0.5">
                        Google Forms
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1 whitespace-nowrap font-medium">
                    <Clock size={12} /> {s.estimatedTime}
                  </span>
                </div>

                {/* Match indicator */}
                {is100Match && (
                  <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2">
                    <Sparkles size={11} /> ตรงกับโปรไฟล์คุณ 100%
                  </div>
                )}

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3.5 line-clamp-2">
                  {s.description}
                </p>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4 space-y-1">
                  <div><strong className="text-slate-700">ผู้วิจัย:</strong> {s.researcher}</div>
                  <div><strong className="text-slate-700">กลุ่มเป้าหมาย:</strong> {s.eligibility}</div>
                  {s.targetResidence && !s.targetResidence.includes('ทุกพื้นที่') && (
                    <div className="text-emerald-700 font-medium"><strong>พื้นที่:</strong> {s.targetResidence}</div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5 mt-auto">
                <div className="flex justify-between items-end mb-3.5">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">ค่าตอบแทน</div>
                    <div className="text-xl font-black text-blue-600">
                      +฿{s.reward}.00
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-medium">โควตา</div>
                    <div className={`text-xs font-semibold ${isFull ? 'text-red-600' : 'text-slate-700'}`}>
                      {isFull ? 'ครบโควตาแล้ว' : `${remaining} ที่เหลืออยู่`}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartSurvey(s)}
                  disabled={isCompleted || isFull}
                  className={`btn w-full justify-center py-2.5 text-xs font-semibold ${
                    isCompleted ? 'btn-secondary' : isFull ? 'btn-secondary opacity-60' : 'btn-primary'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={14} className="text-emerald-600 mr-1" /> คุณตอบแบบสอบถามนี้แล้ว
                    </>
                  ) : isFull ? (
                    'ปิดรับคำตอบแล้ว'
                  ) : !isVerified ? (
                    'ยืนยันตัวตนเพื่อเริ่มทำ'
                  ) : (
                    <>
                      เริ่มทำแบบสอบถาม <ArrowRight size={14} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 mt-4 shadow-sm">
          <p className="text-slate-500 text-sm mb-3">
            ไม่พบแบบสอบถามที่ตรงกับเงื่อนไขการค้นหาหรือฟิลเตอร์ที่เลือก
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setQuickFilter('all');
            }}
            className="btn btn-secondary btn-sm"
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
