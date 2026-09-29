import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, User, School, BookOpen, Lock, CheckCircle2 } from 'lucide-react';

export const ParticipantProfile = () => {
  const { participant } = useApp();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ marginBottom: '4px' }}>โปรไฟล์ & ข้อมูลการยืนยันตัวตน</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          ข้อมูลนี้ใช้เพื่อการจับคู่แบบสอบถามที่ตรงกลุ่ม และรักษาความน่าเชื่อถือของงานวิจัย
        </p>
      </div>

      {/* Verification Card */}
      <div
        className="card"
        style={{
          borderLeft: '4px solid var(--color-success)',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} color="var(--color-success)" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--color-text-main)' }}>
              สถานะ: บัญชียืนยันตัวตนแล้ว (Verified Student)
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              ผ่านการตรวจสอบสถานะนักศึกษามหาวิทยาลัยขอนแก่นเรียบร้อยแล้ว
            </div>
          </div>
        </div>
        <span className="badge badge-active" style={{ fontSize: '13px', padding: '4px 12px' }}>
          <CheckCircle2 size={13} /> ยืนยันแล้ว
        </span>
      </div>

      {/* Information Details */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
          ข้อมูลนักศึกษาและการศึกษา
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>ชื่อ - นามสกุล</div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{participant.name}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>มหาวิทยาลัย</div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{participant.university}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>คณะ</div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{participant.faculty}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>สาขาวิชา</div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{participant.major}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>ระดับชั้นปี</div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{participant.year}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>รหัสนักศึกษา</div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{participant.studentId}</div>
          </div>
        </div>
      </div>

      {/* Matching Attributes */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '16px' }}>
          คุณลักษณะสำหรับ Matching แบบสอบถาม (Demographic Attributes)
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-active" style={{ background: '#F1F5F9', color: '#334155' }}>ช่วงอายุ: 20-22 ปี</span>
          <span className="badge badge-active" style={{ background: '#F1F5F9', color: '#334155' }}>ที่พักอาศัย: โซนกังสดาล</span>
          <span className="badge badge-active" style={{ background: '#F1F5F9', color: '#334155' }}>อุปกรณ์: สมาร์ตโฟน (iOS / Android)</span>
          <span className="badge badge-active" style={{ background: '#F1F5F9', color: '#334155' }}>การเดินทาง: รถจักรยานยนต์ส่วนตัว</span>
          <span className="badge badge-active" style={{ background: '#F1F5F9', color: '#334155' }}>ไลฟ์สไตล์: สั่งเดลิเวอรีเป็นประจำ</span>
        </div>
      </div>

      {/* Privacy Notice */}
      <div style={{ background: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '16px', display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
        <Lock size={18} color="#64748B" style={{ flexShrink: 0 }} />
        <div>
          <strong>Privacy by Design:</strong> ข้อมูลระบุตัวตนของคุณ (ชื่อจริง, รหัสนักศึกษา) จะถูกเก็บเป็นความลับสูงสุด และจะไม่ถูกส่งต่อไปยังผู้วิจัย ผู้วิจัยจะเห็นเฉพาะข้อมูลเชิงสถิติ (Anonymized Data) เท่านั้น
        </div>
      </div>
    </div>
  );
};
