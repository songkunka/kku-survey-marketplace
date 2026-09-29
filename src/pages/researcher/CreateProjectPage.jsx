import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const CreateProjectPage = ({ setActiveTab }) => {
  const { researcher, createProject } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [surveyLink, setSurveyLink] = useState('https://forms.google.com/sample-kku-research');
  const [targetFaculty, setTargetFaculty] = useState('ทุกคณะ');
  const [eligibility, setEligibility] = useState('นักศึกษามหาวิทยาลัยขอนแก่น ทุกชั้นปี');
  const [targetResponses, setTargetResponses] = useState(400);
  const [reward, setReward] = useState(2);
  const [estimatedTime, setEstimatedTime] = useState(4);
  const [category, setCategory] = useState('Consumer Behavior');

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
      surveyLink,
      targetFaculty,
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
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ marginBottom: '4px' }}>สร้างโปรเจกต์แบบสอบถามใหม่ (Create Survey Project)</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          ระบุกลุ่มเป้าหมาย จำนวนตัวอย่างที่ต้องการ และตั้งค่างบประมาณ
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Left Column: Form Fields */}
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
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    outline: 'none'
                  }}
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
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  ลิงก์แบบสอบถาม (Google Forms / Microsoft Forms / Qualtrics)
                </label>
                <input
                  type="url"
                  value={surveyLink}
                  onChange={(e) => setSurveyLink(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)'
                  }}
                />
              </div>

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

            {/* Target Audience Setting */}
            <div className="card">
              <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '16px' }}>กลุ่มเป้าหมาย (Target Audience)</h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  คณะเป้าหมาย
                </label>
                <select
                  value={targetFaculty}
                  onChange={(e) => setTargetFaculty(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}
                >
                  <option value="ทุกคณะ">ทุกคณะในมหาวิทยาลัยขอนแก่น</option>
                  <option value="คณะบริหารธุรกิจและการบัญชี">คณะบริหารธุรกิจและการบัญชี (KKUBS)</option>
                  <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                  <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
                  <option value="คณะมนุษยศาสตร์และสังคมศาสตร์">คณะมนุษยศาสตร์และสังคมศาสตร์</option>
                  <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  เงื่อนไขคุณสมบัติเฉพาะ (Eligibility)
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

          {/* Right Column: Quota, Reward & Budget Calculation */}
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
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontSize: '16px',
                    fontWeight: 700,
                    backgroundColor: '#FFFFFF'
                  }}
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
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      fontSize: '16px',
                      fontWeight: 700,
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>/ คน</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  แนะนำ ฿2 - ฿5 สำหรับแบบสอบถาม 3-7 นาที
                </div>
              </div>

              {/* Automatic Calculation Box */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  padding: '16px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  สูตรคำนวณ: {targetResponses} คน × ฿{reward} =
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>งบประมาณที่ต้องใช้:</span>
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
                  ⚠️ งบประมาณในบัญชีไม่เพียงพอ (ขาดอีก ฿{(totalBudget - researcher.balance).toLocaleString()}) กรุณาเติมเงินก่อนเปิดโปรเจกต์
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                <ShieldCheck size={14} color="#16A34A" /> Budget Escrow: เงินจะถูกกันไว้ในระบบจนกว่าจะได้คำตอบ
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
