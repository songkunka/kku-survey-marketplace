import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  Award,
  ArrowRight,
  ExternalLink,
  KeyRound,
  ShieldAlert,
  Copy,
  Check
} from 'lucide-react';

export const SurveyRunnerModal = ({ survey, onClose }) => {
  const { participant, completeSurvey } = useApp();

  const [answers, setAnswers] = useState({});
  const [completionCodeInput, setCompletionCodeInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completedState, setCompletedState] = useState(null); // null | 'success' | 'duplicate'
  const [errorMessage, setErrorMessage] = useState('');
  const [hasOpenedExternal, setHasOpenedExternal] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Real-time Speeder Detection Timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!survey) return null;

  const isDuplicate = participant.completedSurveyIds.includes(survey.id);
  const isGoogleForms = survey.surveyType === 'external_google_forms';
  const minSeconds = survey.minimumTimeSeconds || 15;
  const isSpeedWarning = secondsElapsed < minSeconds;
  const timerPercent = Math.min(100, Math.round((secondsElapsed / minSeconds) * 100));

  const participantToken = `KKU-${participant.studentId ? participant.studentId.replace(/[^0-9]/g, '').slice(-6) : '882041'}`;

  const handleCopyToken = () => {
    navigator.clipboard?.writeText(participantToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleSelectOption = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    setTimeout(() => {
      const res = completeSurvey(survey.id, completionCodeInput, secondsElapsed);
      setSubmitting(false);

      if (res.success) {
        setCompletedState('success');
      } else {
        if (res.reason === 'duplicate') {
          setCompletedState('duplicate');
        } else {
          setErrorMessage(res.message);
        }
      }
    }, 600);
  };

  return (
    <div className="modal-backdrop">
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '680px', 
          width: '95%', 
          borderRadius: 'var(--radius-card)', 
          backgroundColor: '#FFFFFF', 
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-dropdown)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#FFFFFF' }}>
          <div style={{ flex: 1, paddingRight: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-active">{survey.category}</span>
              {isGoogleForms ? (
                <span className="badge" style={{ backgroundColor: 'var(--color-surface-card)', color: 'var(--color-primary)', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  <ExternalLink size={11} style={{ marginRight: '4px' }} /> Google Forms
                </span>
              ) : (
                <span className="badge" style={{ backgroundColor: 'var(--color-surface-card)', color: 'var(--color-primary)', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  Native Form
                </span>
              )}
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                <Clock size={12} /> {survey.estimatedTime}
              </span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', lineHeight: 1.3, margin: '0 0 4px 0' }}>
              {survey.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0, fontWeight: 400 }}>
              โดย: {survey.researcher}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              color: 'var(--color-text-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-input)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Duplicate Block */}
          {isDuplicate && !completedState && (
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-[8px] p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#fee2e2] text-[#c81b3a] flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={24} />
              </div>
              <h4 className="text-base font-bold text-[#c81b3a] mb-2">
                ระบบตรวจพบ: คุณได้ทำแบบสอบถามนี้ไปแล้ว (Already Completed)
              </h4>
              <p className="text-xs text-[#991b1b] mb-5 leading-relaxed">
                แพลตฟอร์ม KKU Survey มีระบบ <strong>Duplicate Prevention</strong> ป้องกันไม่ให้รหัสผู้ใช้เดิมตอบซ้ำ เพื่อรักษาความเที่ยงตรงของงานวิจัย
              </p>
              <button
                onClick={onClose}
                className="btn-pill btn-pill-secondary-light btn-pill-sm mx-auto"
              >
                กลับสู่หน้ารายการแบบสอบถาม
              </button>
            </div>
          )}

          {/* Active Survey Taking Flow */}
          {!isDuplicate && !completedState && (
            <div>
              {/* Reward & Speeder Safeguard Box (designref product-card) */}
              <div className="product-card mb-5 p-4 flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fff1eb] text-[#d53b00] flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-[#6b6b6b] font-medium">ค่าตอบแทนเมื่อทำเสร็จ</div>
                    <div className="text-xl font-light text-[#d53b00] tracking-tight">
                      +฿{survey.reward}.00
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-black flex items-center gap-1.5 justify-end">
                    <Clock size={13} className="text-[#6b6b6b]" />
                    <span>{secondsElapsed}s / เกณฑ์ขั้นต่ำ {minSeconds}s</span>
                  </div>
                  <div className="text-[11px] text-[#6b6b6b] mt-0.5">
                    {isSpeedWarning ? '⚠️ ใช้เวลาอ่านตอบอย่างตั้งใจ' : '✅ ผ่านเกณฑ์เวลาขั้นต่ำแล้ว'}
                  </div>
                </div>
              </div>

              {/* Speeder Quality Progress Bar */}
              <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full transition-all duration-500 ${
                    isSpeedWarning ? 'bg-[#d97706]' : 'bg-[#059669]'
                  }`}
                  style={{ width: `${timerPercent}%` }}
                />
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="bg-[#fef2f2] border border-[#fecaca] text-[#c81b3a] p-3.5 rounded-[4px] text-xs mb-4 flex gap-2.5 items-start">
                  <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* MODE 1: Google Forms with Completion Code Handshake */}
              {isGoogleForms ? (
                <div className="space-y-4">
                  {/* Step 1: Open Google Form & Participant Token */}
                  <div className="bg-[#f5f7fa] border border-[#e2e8f0] rounded-[8px] p-5">
                    <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                      <h4 className="text-xs font-bold text-black uppercase tracking-wider">
                        ขั้นตอนที่ 1: เปิดทำแบบสอบถามบน Google Forms
                      </h4>
                      {/* Copy Participant Token */}
                      <button
                        type="button"
                        onClick={handleCopyToken}
                        className="text-xs bg-white border border-[#cbd5e1] hover:bg-[#e2e8f0] text-black px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold transition-colors"
                        title="คลิกเพื่อคัดลอกรหัสประจำตัวผู้ตอบ"
                      >
                        {copiedToken ? <Check size={12} className="text-[#059669]" /> : <Copy size={12} />}
                        <span>{copiedToken ? 'คัดลอกแล้ว!' : `รหัสผู้ตอบ: ${participantToken}`}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#6b6b6b] leading-relaxed mb-4">
                      ระบบจะเปิดหน้าต่าง Google Forms ในแท็บใหม่ เมื่อตอบคำถามครบและกดส่งแล้ว ให้นำ <strong>Completion Code</strong> ที่แสดงในหน้าสุดท้ายกลับมากรอกในช่องด้านล่างนี้
                    </p>

                    <a
                      href={survey.surveyUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setHasOpenedExternal(true)}
                      className="btn-pill btn-pill-secondary-light w-full justify-center text-xs font-bold"
                    >
                      <ExternalLink size={15} /> คลิกเปิด Google Forms เพื่อทำแบบสอบถาม
                    </a>
                  </div>

                  {/* Persistent Return Helper Notice if launched */}
                  {hasOpenedExternal && (
                    <div className="bg-[#f5f7fa] border-l-4 border-[#0070d1] text-black p-4 rounded-[4px] text-xs flex gap-3 items-start animate-fade-in shadow-sm">
                      <KeyRound size={20} className="text-[#0070d1] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#0070d1]">กำลังทำแบบสอบถาม... อย่าปิดแท็บนี้!</strong> เมื่อส่งแบบสอบถามใน Google Forms แล้ว ให้นำรหัสยืนยันกลับมากรอกในขั้นตอนที่ 2 ด้านล่างเพื่อรับเงินทันที
                      </div>
                    </div>
                  )}

                  {/* Step 2: Completion Code Input (4px radius input) */}
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', padding: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '8px' }}>
                      ขั้นตอนที่ 2: กรอกรหัสยืนยันความสมบูรณ์ (Completion Code) *
                    </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="เช่น KKU-FOOD-2026"
                        value={completionCodeInput}
                        onChange={(e) => setCompletionCodeInput(e.target.value)}
                        style={{
                          flex: 1,
                          height: '44px',
                          padding: '0 14px',
                          borderRadius: 'var(--radius-input)',
                          border: '1px solid var(--color-border)',
                          fontSize: '14px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          backgroundColor: '#FFFFFF',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setCompletionCodeInput(survey.completionCode)}
                        className="filter-pill"
                        style={{ height: '44px', fontSize: '12px', flexShrink: 0, padding: '0 16px' }}
                        title="สำหรับใช้ในการทดสอบเดโม"
                      >
                        วางรหัสตัวอย่าง
                      </button>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                      💡 รหัสตัวอย่างของแบบสอบถามนี้คือ: <strong style={{ color: 'var(--color-primary)' }}>{survey.completionCode}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                /* MODE 2: Native Survey Questions */
                <div className="space-y-4 mb-5">
                  {survey.sampleQuestions.map((q, idx) => (
                    <div key={q.id} className="bg-[#f5f7fa] p-4 rounded-[8px] border border-[#e2e8f0]">
                      <div className="font-semibold text-xs text-black mb-3">
                        ข้อที่ {idx + 1}: {q.text}
                      </div>
                      <div className="space-y-2">
                        {q.options.map(opt => {
                          const isSelected = answers[q.id] === opt;
                          return (
                            <label
                              key={opt}
                              onClick={() => handleSelectOption(q.id, opt)}
                              className={`flex items-center gap-2.5 p-3 rounded-[4px] border cursor-pointer text-xs transition-colors ${
                                isSelected
                                  ? 'bg-white border-[#0070d1] text-[#0070d1] font-bold shadow-sm'
                                  : 'bg-white border-[#e2e8f0] text-black hover:bg-[#f5f7fa]'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                checked={isSelected}
                                onChange={() => handleSelectOption(q.id, opt)}
                                className="text-[#0070d1]"
                              />
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons: 48px Height Pill Buttons (designref.md) */}
              <div className="flex justify-end gap-3 border-t border-[#f3f3f3] pt-5 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-pill btn-pill-secondary-light btn-pill-sm text-xs"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-pill btn-pill-commerce btn-pill-sm text-xs"
                >
                  {submitting ? 'กำลังตรวจสอบ...' : (
                    <>
                      ยืนยัน & รับเงิน ฿{survey.reward} <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {completedState === 'success' && (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-xl font-light text-black mb-2">
                ยืนยันสำเร็จ! คุณได้รับค่าตอบแทน +฿{survey.reward}.00
              </h3>
              <p className="text-xs sm:text-sm text-[#6b6b6b] mb-6 leading-relaxed">
                ระบบได้ผ่านขั้นตอน <strong>Quality Check & Handshake Verification</strong> เรียบร้อยแล้ว<br />
                ยอดเงินคงเหลือปัจจุบันของคุณคือ: <strong className="text-[#d53b00] text-base">฿{participant.balance}</strong>
              </p>
              <div className="flex justify-center">
                <button
                  onClick={onClose}
                  className="btn-pill btn-pill-primary text-xs"
                >
                  กลับสู่หน้าตลาดแบบสอบถาม
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
