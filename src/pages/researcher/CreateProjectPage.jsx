import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, ArrowRight, ShieldCheck, ExternalLink, HelpCircle, KeyRound } from 'lucide-react';
import { kkuFaculties, residenceZones } from '../../data/mockData';

export const CreateProjectPage = ({ setActiveTab }) => {
  const { researcher, createProject } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [surveyType, setSurveyType] = useState('external_google_forms');
  const [surveyUrl, setSurveyUrl] = useState('https://docs.google.com/forms/d/e/1FAIpQLSfDEMO-KKU/viewform');
  const [targetFaculty, setTargetFaculty] = useState('ทุกคณะในมหาวิทยาลัยขอนแก่น');
  const [targetResidence, setTargetResidence] = useState('ทุกพื้นที่รอบ มข.');
  const [eligibility, setEligibility] = useState('นักศึกษามหาวิทยาลัยขอนแก่น ทุกชั้นปี');
  const [targetResponses, setTargetResponses] = useState(400);
  const [reward, setReward] = useState(2);
  const [estimatedTime, setEstimatedTime] = useState(4);
  const [category, setCategory] = useState('Consumer Behavior');

  // Preview generated completion code
  const [demoCode] = useState(`KKU-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`);

  // Calculation
  const totalBudget = (Number(targetResponses) || 0) * (Number(reward) || 0);
  const hasEnoughBudget = researcher.balance >= totalBudget;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert('กรุณากรอกชื่อโปรเจกต์');
    if (!hasEnoughBudget) return alert('งบประมาณในบัญชีไม่เพียงพอ กรุณาเติมงบประมาณก่อน');

    const res = createProject({
      title,
      description: description || 'สำรวจข้อมูลงานวิจัยเพื่อการพัฒนานวัตกรรมและคุณภาพชีวิตนักศึกษา มข.',
      surveyType,
      surveyUrl,
      targetFaculty,
      targetResidence,
      eligibility,
      targetResponses,
      reward,
      estimatedTime,
      category
    });

    if (res.success) {
      setActiveTab('dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ marginBottom: '4px' }}>สร้างโปรเจกต์แบบสอบถามใหม่ (Create Survey Project)</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          ระบุประเภทแบบสอบถาม กลุ่มเป้าหมาย และงบประมาณโครงการวิจัย
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Left Column: Project Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card">
              <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '16px' }}>ข้อมูลทั่วไปของงานวิจัย</h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  ชื่อโปรเจกต์แบบสอบถาม *
                </label>
                <input
                  type="text"
                  placeholder="เช่น พฤติกรรมการใช้พื้นที่ Co-Working Space ใน มข."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  คำอธิบายหรือวัตถุประสงค์สั้น ๆ
                </label>
                <textarea
                  rows="3"
                  placeholder="ระบุวัตถุประสงค์ของแบบสอบถามเพื่อให้ผู้ตอบเข้าใจ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }}
                />
              </div>

              {/* Survey Type Selector */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  รูปแบบของแบบสอบถาม
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <label
                    onClick={() => setSurveyType('external_google_forms')}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: surveyType === 'external_google_forms' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: surveyType === 'external_google_forms' ? 'var(--color-primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    <input type="radio" name="surveyType" checked={surveyType === 'external_google_forms'} onChange={() => {}} style={{ marginRight: '6px' }} />
                    <strong>Google Forms</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>ลิงก์ภายนอก + รหัสยืนยัน</div>
                  </label>

                  <label
                    onClick={() => setSurveyType('native')}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: surveyType === 'native' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: surveyType === 'native' ? 'var(--color-primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    <input type="radio" name="surveyType" checked={surveyType === 'native'} onChange={() => {}} style={{ marginRight: '6px' }} />
                    <strong>Native Form</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>ตอบบนแพลตฟอร์ม 100%</div>
                  </label>
                </div>
              </div>

              {surveyType === 'external_google_forms' && (
                <div style={{ background: '#F8FAFC', border: '1px solid #BFDBFE', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    ลิงก์แบบสอบถาม (Google Forms / Qualtrics)
                  </label>
                  <input
                    type="url"
                    value={surveyUrl}
                    onChange={(e) => setSurveyUrl(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '10px' }}
                  />

                  {/* Completion code explanation box */}
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '4px' }}>
                      <KeyRound size={14} /> รหัสยืนยันความสมบูรณ์ที่จะถูกสร้าง: <code>{demoCode}</code>
                    </div>
                    <span>💡 นำรหัสนี้ไปวางใน Google Forms: <em>การตั้งค่า ➔ งานนำเสนอ ➔ ข้อความยืนยัน (Confirmation message)</em> เพื่อให้ผู้ตอบได้รับรหัสหลังส่งคำตอบ</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    หมวดหมู่งานวิจัย
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Consumer Behavior">Consumer Behavior</option>
                    <option value="Finance">Finance / Fintech</option>
                    <option value="Lifestyle">Lifestyle & Entertainment</option>
                    <option value="Transportation">Transportation & Campus</option>
                    <option value="Healthcare">Healthcare & Wellbeing</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    เวลาเฉลี่ยที่ใช้ (นาที)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>
            </div>

            {/* Target Demographics */}
            <div className="card">
              <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '16px' }}>กลุ่มเป้าหมาย (Demographic Targeting)</h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  คณะเป้าหมาย
                </label>
                <select
                  value={targetFaculty}
                  onChange={(e) => setTargetFaculty(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '13px' }}
                >
                  {kkuFaculties.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  พื้นที่พักอาศัยเป้าหมาย
                </label>
                <select
                  value={targetResidence}
                  onChange={(e) => setTargetResidence(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '13px' }}
                >
                  {residenceZones.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  คุณสมบัติเฉพาะที่แสดงบนการ์ด
                </label>
                <input
                  type="text"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Quota & Budget Calculation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ border: '1.5px solid var(--color-primary-subtle)', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Calculator size={20} color="var(--color-primary)" />
                <h3 className="text-h3" style={{ fontSize: '16px' }}>คำนวณงบประมาณ (Budget Calculator)</h3>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  จำนวนตัวอย่างที่ต้องการ (Target Responses)
                </label>
                <input
                  type="number"
                  min="10"
                  max="2000"
                  step="10"
                  value={targetResponses}
                  onChange={(e) => setTargetResponses(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '16px', fontWeight: 700, backgroundColor: '#FFFFFF' }}
                />
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  เช่น 400 คน สำหรับตัวอย่างระดับความเชื่อมั่น 95%
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  ค่าตอบแทนต่อคน (Reward / Response)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-text-main)' }}>฿</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="1"
                    value={reward}
                    onChange={(e) => setReward(Math.max(1, Number(e.target.value)))}
                    style={{ flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '16px', fontWeight: 700, backgroundColor: '#FFFFFF' }}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>/ คน</span>
                </div>
              </div>

              {/* Automatic Calculation Box */}
              <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  สูตรคำนวณ: {targetResponses} คน × ฿{reward} =
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>งบประมาณโครงการ:</span>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-primary)' }}>
                    ฿{totalBudget.toLocaleString()}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '12px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>งบวิจัยคงเหลือในบัญชี:</span>
                  <strong style={{ color: hasEnoughBudget ? 'var(--color-success)' : '#DC2626' }}>
                    ฿{researcher.balance.toLocaleString()}
                  </strong>
                </div>
              </div>

              {!hasEnoughBudget && (
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#991B1B', marginBottom: '16px' }}>
                  ⚠️ งบประมาณในบัญชีไม่เพียงพอ กรุณาเติมงบประมาณก่อน
                </div>
              )}

              <button
                type="submit"
                disabled={!hasEnoughBudget}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600, opacity: hasEnoughBudget ? 1 : 0.6 }}
              >
                ล็อกงบประมาณ & ปล่อยโปรเจกต์ <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
