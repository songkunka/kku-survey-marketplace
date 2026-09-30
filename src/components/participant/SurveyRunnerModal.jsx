import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, AlertTriangle, Clock, Award, ArrowRight, ExternalLink, KeyRound, ShieldAlert } from 'lucide-react';

export const SurveyRunnerModal = ({ survey, onClose }) => {
  const { participant, completeSurvey } = useApp();

  const [answers, setAnswers] = useState({});
  const [completionCodeInput, setCompletionCodeInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completedState, setCompletedState] = useState(null); // null | 'success' | 'duplicate'
  const [errorMessage, setErrorMessage] = useState('');
  
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
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        {/* Modal Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-active">{survey.category}</span>
              {isGoogleForms ? (
                <span className="badge" style={{ background: '#EDE9FE', color: '#6D28D9' }}>
                  <ExternalLink size={11} /> Google Forms
                </span>
              ) : (
                <span className="badge" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                  Native Form
                </span>
              )}
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {survey.estimatedTime}
              </span>
            </div>
            <h3 className="text-h3" style={{ fontSize: '18px', color: 'var(--color-text-main)' }}>
              {survey.title}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              โดย: {survey.researcher}
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* Duplicate Block */}
          {isDuplicate && !completedState && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <AlertTriangle size={24} color="#DC2626" />
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#991B1B', marginBottom: '8px' }}>
                ระบบตรวจพบ: คุณได้ทำแบบสอบถามนี้ไปแล้ว (Already Completed)
              </h4>
              <p style={{ fontSize: '14px', color: '#B91C1C', marginBottom: '16px', lineHeight: 1.5 }}>
                แพลตฟอร์ม KKU Survey มีระบบ <strong>Duplicate Prevention</strong> ป้องกันไม่ให้รหัสผู้ใช้เดิมตอบซ้ำ เพื่อรักษาความเที่ยงตรงของงานวิจัย
              </p>
              <button onClick={onClose} className="btn btn-secondary">
                กลับสู่หน้ารายการแบบสอบถาม
              </button>
            </div>
          )}

          {/* Active Survey Taking Flow */}
          {!isDuplicate && !completedState && (
            <div>
              {/* Reward and Timer bar */}
              <div
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={20} color="var(--color-primary)" />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-primary-dark)' }}>
                    ค่าตอบแทนเมื่อทำเสร็จสมบูรณ์
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ fontSize: '12px', color: isSpeedWarning ? '#D97706' : '#15803D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {secondsElapsed}s (เกณฑ์ขั้นต่ำ: {minSeconds}s)
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--color-primary)' }}>
                    +฿{survey.reward}.00
                  </div>
                </div>
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', padding: '12px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* MODE 1: Google Forms with Completion Code Handshake */}
              {isGoogleForms ? (
                <div>
                  <div style={{ background: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '18px', marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px', color: 'var(--color-text-main)' }}>
                      ขั้นตอนการทำแบบสอบถาม Google Forms:
                    </h4>
                    <ol style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                      <li>คลิกปุ่มด้านล่างเพื่อเปิดแบบสอบถามในแท็บใหม่</li>
                      <li>ตอบคำถามใน Google Forms ให้ครบถ้วนแล้วกดส่ง</li>
                      <li>ในหน้าสุดท้าย (ข้อความยืนยันการส่ง) ให้คัดลอก <strong>รหัสยืนยัน (Completion Code)</strong> กลับมากรอกในช่องด้านล่างนี้</li>
                    </ol>

                    <a
                      href={survey.surveyUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                      style={{ width: '100%', borderColor: '#CBD5E1', backgroundColor: '#FFFFFF', padding: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', justifyContent: 'center', gap: '8px' }}
                    >
                      <ExternalLink size={16} /> 1. เปิด Google Forms เพื่อทำแบบสอบถาม
                    </a>
                  </div>

                  {/* Completion Code Input */}
                  <div style={{ background: '#FFFFFF', border: '1.5px solid #BFDBFE', borderRadius: 'var(--radius-sm)', padding: '18px', marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-main)' }}>
                      2. กรอกรหัสยืนยันความสมบูรณ์ (Completion Code) *
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <input
                          type="text"
                          placeholder="เช่น KKU-FOOD-2026"
                          value={completionCodeInput}
                          onChange={(e) => setCompletionCodeInput(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontSize: '15px',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setCompletionCodeInput(survey.completionCode)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '11px', whiteSpace: 'nowrap' }}
                        title="สำหรับใช้ในการนำเสนอเดโม"
                      >
                        (Demo: วางรหัส)
                      </button>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                      💡 รหัสตัวอย่างของแบบสอบถามนี้คือ: <strong style={{ color: 'var(--color-primary)' }}>{survey.completionCode}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                /* MODE 2: Native Survey Questions */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '20px' }}>
                  {survey.sampleQuestions.map((q, idx) => (
                    <div key={q.id} style={{ background: '#F8FAFC', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '10px' }}>
                        ข้อที่ {idx + 1}: {q.text}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {q.options.map(opt => {
                          const isSelected = answers[q.id] === opt;
                          return (
                            <label
                              key={opt}
                              onClick={() => handleSelectOption(q.id, opt)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '9px 12px',
                                borderRadius: '6px',
                                background: isSelected ? 'var(--color-primary-light)' : '#FFFFFF',
                                border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                                cursor: 'pointer',
                                fontSize: '13px'
                              }}
                            >
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                checked={isSelected}
                                onChange={() => handleSelectOption(q.id, opt)}
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

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ minWidth: '160px' }}
                >
                  {submitting ? 'กำลังตรวจสอบ...' : (
                    <>
                      ยืนยัน & รับเงิน ฿{survey.reward} <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {completedState === 'success' && (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle size={32} color="var(--color-success)" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                ยืนยันสำเร็จ! คุณได้รับค่าตอบแทน +฿{survey.reward}.00
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                ระบบได้ผ่านขั้นตอน <strong>Quality Check & Handshake Verification</strong> เรียบร้อยแล้ว<br />
                ยอดเงินคงเหลือปัจจุบันของคุณคือ: <strong style={{ color: 'var(--color-primary)' }}>฿{participant.balance}</strong>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={onClose} className="btn btn-primary">
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
