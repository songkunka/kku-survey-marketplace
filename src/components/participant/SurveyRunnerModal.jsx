import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, AlertTriangle, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';

export const SurveyRunnerModal = ({ survey, onClose }) => {
  const { participant, completeSurvey } = useApp();
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [completedState, setCompletedState] = useState(null); // null | 'success' | 'duplicate'

  if (!survey) return null;

  const isDuplicate = participant.completedSurveyIds.includes(survey.id);

  const handleSelectOption = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const res = completeSurvey(survey.id);
      setSubmitting(false);
      if (res.success) {
        setCompletedState('success');
      } else if (res.reason === 'duplicate') {
        setCompletedState('duplicate');
      }
    }, 700);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        {/* Modal Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-active">{survey.category}</span>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {survey.estimatedTime}
              </span>
            </div>
            <h3 className="text-h3" style={{ fontSize: '18px', color: 'var(--color-text-main)' }}>
              {survey.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              โดย: {survey.researcher}
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {isDuplicate && !completedState && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <AlertTriangle size={24} color="#DC2626" />
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#991B1B', marginBottom: '8px' }}>
                ระบบตรวจพบ: คุณได้ทำแบบสอบถามนี้ไปแล้ว (Already Completed)
              </h4>
              <p style={{ fontSize: '14px', color: '#B91C1C', marginBottom: '16px', lineHeight: 1.5 }}>
                แพลตฟอร์ม KKU Survey มีระบบ <strong>Duplicate Prevention</strong> ล็อกรหัสประจำตัวผู้ตอบ เพื่อรักษาคุณภาพของงานวิจัย จึงไม่อนุญาตให้ตอบซ้ำได้
              </p>
              <button onClick={onClose} className="btn btn-secondary">
                กลับสู่หน้ารายการแบบสอบถาม
              </button>
            </div>
          )}

          {!isDuplicate && !completedState && (
            <div>
              {/* Reward preview banner */}
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
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-primary)' }}>
                  +฿{survey.reward}.00
                </div>
              </div>

              {/* Sample survey questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {survey.sampleQuestions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#F8FAFC', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-main)' }}>
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
                              fontSize: '13px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <input
                              type="radio"
                              name={`q-${q.id}`}
                              checked={isSelected}
                              onChange={() => handleSelectOption(q.id, opt)}
                              style={{ accentColor: 'var(--color-primary)' }}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={onClose} className="btn btn-secondary">
                  ยกเลิก
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ minWidth: '150px' }}
                >
                  {submitting ? 'กำลังตรวจสอบ...' : (
                    <>
                      ส่งคำตอบ & รับ ฿{survey.reward} <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {completedState === 'success' && (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle size={32} color="var(--color-success)" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                ยินดีด้วย! คุณได้รับค่าตอบแทน +฿{survey.reward}.00
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                ระบบได้ผ่านขั้นตอน <strong>Quality Check</strong> และเพิ่มยอดเงินเข้ากระเป๋าของคุณเรียบร้อยแล้ว<br />
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
