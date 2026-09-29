import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Lock,
  Clock,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const LandingPage = () => {
  const { setCurrentRole } = useApp();

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '80px 24px 70px 24px',
          background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            <Sparkles size={14} /> นวัตกรรมเพื่อชีวิตนักศึกษา มหาวิทยาลัยขอนแก่น (KKU Student Life Innovation)
          </div>

          <h1
            className="text-display"
            style={{ fontSize: '42px', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '20px', lineHeight: 1.25 }}
          >
            ตลาดกลางกลุ่มตัวอย่างงานวิจัยและแบบสอบถามคุณภาพ <br />
            <span style={{ color: 'var(--color-primary)' }}>KKU Survey Marketplace</span>
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: 'var(--color-text-muted)',
              marginBottom: '36px',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto 36px auto'
            }}
          >
            เปลี่ยนการขอคนช่วยตอบแบบสอบถามใน Facebook Group เป็นระบบที่มีมาตรฐาน <br />
            นักวิจัยได้กลุ่มตัวอย่างตรงเป้าหมาย ไร้คนตอบซ้ำ — นักศึกษาได้รับค่าตอบแทนที่โปร่งใส ถอนได้จริง
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentRole('participant')}
              className="btn btn-primary btn-lg"
              style={{ boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}
            >
              เริ่มต้นตอบแบบสอบถาม (สำหรับผู้ตอบ) <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setCurrentRole('researcher')}
              className="btn btn-secondary btn-lg"
            >
              สร้างโปรเจกต์งานวิจัย (สำหรับ Researcher)
            </button>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '56px',
              padding: '24px',
              backgroundColor: '#F8FAFC',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>1,280+</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>นักศึกษา มข. ยืนยันตัวตนแล้ว</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>100%</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>ป้องกันการตอบซ้ำ (Duplicate Prevention)</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>8,500+</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>คำตอบงานวิจัยคุณภาพสูง</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)' }}>2–5 นาที</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>เวลาเฉลี่ยต่อแบบสอบถาม</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Facebook Post vs KKU Survey */}
      <section style={{ padding: '64px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="text-h2" style={{ marginBottom: '8px' }}>
            ทำไมต้อง KKU Survey Marketplace?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
            เปรียบเทียบระหว่างการโพสต์หาคนตอบแบบเดิมกับการใช้แพลตฟอร์มของเรา
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Old way */}
          <div
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #FECACA',
              backgroundColor: '#FFF5F5'
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#991B1B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ❌ การโพสต์ใน Facebook / LINE แบบเดิม
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#7F1D1D' }}>
              <li>• ไม่รู้ว่าจะได้คนตอบครบ 400 คนเมื่อไหร่ ต้องคอยดันโพสต์</li>
              <li>• คัดกรองคุณสมบัติไม่ได้ ใครกดเข้ามาตอบก็ได้</li>
              <li>• เสี่ยงต่อคนเดิมตอบซ้ำ หรือคนคลิกมั่ว ๆ เพื่อให้จบ</li>
              <li>• ผู้ตอบไม่มีแรงจูงใจที่ชัดเจน ของแจกสุ่มลุ้นโชคไม่ดึงดูด</li>
            </ul>
          </div>

          {/* New way */}
          <div
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid #93C5FD',
              backgroundColor: '#EFF6FF'
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ✅ KKU Survey Marketplace
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#1E3A8A' }}>
              <li>• กำหนดเป้าหมาย 400 คน ระบบจัดส่งถึงผู้ตอบตรงกลุ่มทันที</li>
              <li>• กรองสเปกได้แม่นยำ (คณะ, ชั้นปี, อายุ, พฤติกรรมเฉพาะ)</li>
              <li>• <strong>Duplicate Lock:</strong> บล็อกไม่ให้คนเดิมตอบซ้ำ 100%</li>
              <li>• ผู้ตอบได้รับค่าตอบแทนที่แน่นอน โปร่งใส ถอนเงินได้จริง</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ padding: '64px 24px', backgroundColor: '#F8FAFC', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="text-h2" style={{ marginBottom: '8px' }}>กลไกการทำงานของแพลตฟอร์ม</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
              ออกแบบให้ใช้งานง่ายทั้งสำหรับนักวิจัยและผู้ตอบแบบสอบถาม
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '16px' }}>
                1
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Researcher ตั้งโควตา & งบ</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                กำหนดจำนวนคนที่ต้องการ (เช่น 400 คน) และค่าตอบแทน (เช่น ฿2) ระบบคำนวณงบประมาณให้อัตโนมัติ (฿800)
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '16px' }}>
                2
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Matching สู่ผู้ตอบที่ตรงกลุ่ม</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                แบบสอบถามจะถูกส่งไปยัง Marketplace ของนักศึกษา มข. ที่ผ่านการยืนยันตัวตนและมีคุณสมบัติตรงเป้าหมาย
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '16px' }}>
                3
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Quality Check & จ่ายรางวัล</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                เมื่อทำเสร็จและผ่านการตรวจสอบ ผู้ตอบได้รับเครดิตทันที ส่วนระบบจะล็อกสิทธิ์เพื่อป้องกันการตอบซ้ำ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Features */}
      <section style={{ padding: '64px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="text-h2" style={{ marginBottom: '8px' }}>Trust & Safety Architecture</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
            ความน่าเชื่อถือคือหัวใจหลักของข้อมูลงานวิจัย
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{ flexShrink: 0 }}><ShieldCheck size={26} color="var(--color-primary)" /></div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Participant Verification</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>ยืนยันสถานะนักศึกษา มข. เพื่อคัดกรองตัวตนจริง ไม่ใช่บัญชีผีหรือบอท</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{ flexShrink: 0 }}><Lock size={26} color="var(--color-primary)" /></div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Budget Escrow Lock</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Researcher ต้องฝากงบไว้ล่วงหน้า การันตีผู้ตอบจะได้รับค่าตอบแทนแน่นอน 100%</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{ flexShrink: 0 }}><CheckCircle2 size={26} color="var(--color-primary)" /></div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Duplicate Prevention</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>ระบบป้องกันไม่ให้ 1 รหัสประจำตัวทำแบบสอบถามเดิมซ้ำ เพื่อความเที่ยงตรงของสถิติ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section style={{ padding: '60px 24px', background: '#0F172A', color: '#FFFFFF', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
          พร้อมสัมผัสประสบการณ์ของระบบแล้วหรือยัง?
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '15px', marginBottom: '28px' }}>
          เลือกบทบาทจำลองเพื่อเริ่มทดลองใช้งาน Interactive Prototype ได้ทันที
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentRole('participant')} className="btn btn-primary btn-lg">
            ทดลองใช้งานเป็น Participant
          </button>
          <button onClick={() => setCurrentRole('researcher')} className="btn btn-secondary btn-lg" style={{ background: '#1E293B', color: '#FFFFFF', borderColor: '#334155' }}>
            ทดลองใช้งานเป็น Researcher
          </button>
        </div>
      </section>
    </div>
  );
};
