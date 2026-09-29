import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, AlertTriangle, Clock, Award, ArrowRight, ExternalLink, KeyRound, ShieldAlert, Copy, Check } from 'lucide-react';

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
      <div className="modal-content max-w-2xl w-full">
        {/* Modal Header */}
        <div className="p-5 px-6 border-b border-slate-200 flex justify-between items-start bg-white rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="badge badge-active">{survey.category}</span>
              {isGoogleForms ? (
                <span className="badge bg-purple-50 text-purple-700 border border-purple-200 text-xs py-0.5 flex items-center gap-1">
                  <ExternalLink size={11} /> Google Forms
                </span>
              ) : (
                <span className="badge bg-blue-50 text-blue-700 border border-blue-200 text-xs py-0.5">
                  Native Form
                </span>
              )}
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Clock size={12} /> {survey.estimatedTime}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {survey.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              โดย: {survey.researcher}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Duplicate Block */}
          {isDuplicate && !completedState && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={24} />
              </div>
              <h4 className="text-base font-bold text-red-900 mb-2">
                ระบบตรวจพบ: คุณได้ทำแบบสอบถามนี้ไปแล้ว (Already Completed)
              </h4>
              <p className="text-xs text-red-700 mb-5 leading-relaxed">
                แพลตฟอร์ม KKU Survey มีระบบ <strong>Duplicate Prevention</strong> ป้องกันไม่ให้รหัสผู้ใช้เดิมตอบซ้ำ เพื่อรักษาความเที่ยงตรงของงานวิจัย
              </p>
              <button onClick={onClose} className="btn btn-secondary text-xs">
                กลับสู่หน้ารายการแบบสอบถาม
              </button>
            </div>
          )}

          {/* Active Survey Taking Flow */}
          {!isDuplicate && !completedState && (
            <div>
              {/* Reward and Timer bar */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 px-4 flex justify-between items-center mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-blue-600" />
                  <span className="text-xs font-semibold text-blue-900">
                    ค่าตอบแทนเมื่อทำเสร็จสมบูรณ์
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs font-medium flex items-center gap-1.5">
                    <span className={isSpeedWarning ? 'text-amber-800' : 'text-emerald-700'}>
                      {secondsElapsed}s (ขั้นต่ำ {minSeconds}s)
                    </span>
                  </div>
                  <div className="text-xl font-black text-blue-600">
                    +฿{survey.reward}.00
                  </div>
                </div>
              </div>

              {/* Speeder Detection Quality Bar */}
              <div className="mb-5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Clock size={13} className="text-slate-400" />
                    ระบบตรวจจับการเร่งตอบ (Speeder Safeguard)
                  </span>
                  <span className={isSpeedWarning ? 'text-amber-800 font-semibold' : 'text-emerald-700 font-bold'}>
                    {isSpeedWarning ? `กำลังตรวจวัด (${secondsElapsed}/${minSeconds}s)` : '✅ ผ่านเกณฑ์เวลาขั้นต่ำ'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isSpeedWarning ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${timerPercent}%` }}
                  />
                </div>
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-900 p-3.5 rounded-xl text-xs mb-4 flex gap-2.5 items-start">
                  <ShieldAlert size={18} className="text-red-600 shrink-0 mt-0.5" />
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* MODE 1: Google Forms with Completion Code Handshake */}
              {isGoogleForms ? (
                <div className="space-y-4">
                  {/* Step 1: Open Google Form & Participant Token */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                      <h4 className="text-xs font-bold text-slate-900">
                        ขั้นตอนที่ 1: เปิดทำแบบสอบถามบน Google Forms
                      </h4>
                      {/* Copy Participant Token */}
                      <button
                        type="button"
                        onClick={handleCopyToken}
                        className="text-xs bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-colors"
                        title="คลิกเพื่อคัดลอกรหัสประจำตัวผู้ตอบ"
                      >
                        {copiedToken ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedToken ? 'คัดลอกแล้ว!' : `รหัสผู้ตอบ: ${participantToken}`}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      ระบบจะเปิดหน้าต่าง Google Forms ในแท็บใหม่ เมื่อตอบคำถามครบและกดส่งแล้ว ให้นำ <strong>Completion Code</strong> ที่ปรากฏในหน้าสุดท้ายกลับมากรอกในช่องด้านล่าง
                    </p>

                    <a
                      href={survey.surveyUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setHasOpenedExternal(true)}
                      className="btn btn-secondary w-full justify-center py-3 text-xs font-bold text-blue-600 bg-white hover:bg-blue-50 border-blue-200"
                    >
                      <ExternalLink size={15} /> คลิกเปิด Google Forms เพื่อทำแบบสอบถาม
                    </a>
                  </div>

                  {/* Persistent Return Helper Notice if launched */}
                  {hasOpenedExternal && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3.5 rounded-xl text-xs flex gap-2.5 items-start animate-fade-in">
                      <KeyRound size={18} className="text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>กำลังทำแบบสอบถาม... อย่าปิดแท็บนี้!</strong> เมื่อทำเสร็จสิ้นบน Google Forms ให้นำรหัสยืนยัน (Completion Code) กลับมากรอกในขั้นตอนที่ 2 ด้านล่างเพื่อรับเงินเข้ากระเป๋าทันที
                      </div>
                    </div>
                  )}

                  {/* Step 2: Completion Code Input */}
                  <div className="bg-white border-2 border-blue-100 rounded-xl p-4">
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      ขั้นตอนที่ 2: กรอกรหัสยืนยันความสมบูรณ์ (Completion Code) *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="เช่น KKU-FOOD-2026"
                        value={completionCodeInput}
                        onChange={(e) => setCompletionCodeInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-bold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setCompletionCodeInput(survey.completionCode)}
                        className="btn btn-secondary text-xs whitespace-nowrap px-3 py-2 text-slate-600"
                        title="สำหรับใช้ในการทดสอบเดโม"
                      >
                        (Demo: วางรหัส)
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      💡 รหัสตัวอย่างของแบบสอบถามนี้คือ: <strong className="text-blue-600">{survey.completionCode}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                /* MODE 2: Native Survey Questions */
                <div className="space-y-4 mb-5">
                  {survey.sampleQuestions.map((q, idx) => (
                    <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="font-semibold text-xs text-slate-900 mb-2.5">
                        ข้อที่ {idx + 1}: {q.text}
                      </div>
                      <div className="space-y-2">
                        {q.options.map(opt => {
                          const isSelected = answers[q.id] === opt;
                          return (
                            <label
                              key={opt}
                              onClick={() => handleSelectOption(q.id, opt)}
                              className={`flex items-center gap-2.5 p-2.5 px-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                                isSelected
                                  ? 'bg-blue-50 border-blue-500 text-blue-900 font-medium'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                checked={isSelected}
                                onChange={() => handleSelectOption(q.id, opt)}
                                className="text-blue-600"
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
              <div className="flex justify-end gap-2.5 border-t border-slate-200 pt-4 mt-6">
                <button type="button" onClick={onClose} className="btn btn-secondary px-4 py-2 text-xs">
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn btn-primary px-5 py-2 text-xs font-bold"
                >
                  {submitting ? 'กำลังตรวจสอบ...' : (
                    <>
                      ยืนยัน & รับเงิน ฿{survey.reward} <ArrowRight size={14} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {completedState === 'success' && (
            <div className="text-center py-6 px-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                ยืนยันสำเร็จ! คุณได้รับค่าตอบแทน +฿{survey.reward}.00
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                ระบบได้ผ่านขั้นตอน <strong>Quality Check & Handshake Verification</strong> เรียบร้อยแล้ว<br />
                ยอดเงินคงเหลือปัจจุบันของคุณคือ: <strong className="text-blue-600">฿{participant.balance}</strong>
              </p>
              <div className="flex justify-center">
                <button onClick={onClose} className="btn btn-primary px-6 py-2.5 text-xs">
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
