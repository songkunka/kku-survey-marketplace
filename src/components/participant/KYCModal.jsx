import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Upload, AlertCircle, CheckCircle2, Clock, FileText, Image } from 'lucide-react';
import { kkuFaculties } from '../../data/mockData';

export const KYCModal = ({ onClose }) => {
  const { participant, submitKYC } = useApp();

  const [idNumber, setIdNumber] = useState(participant.idCardNumber || '1-4099-01289-44-1');
  const [studentId, setStudentId] = useState(participant.studentId || '653040xxx-x');
  const [faculty, setFaculty] = useState(participant.faculty);
  const [year, setYear] = useState(participant.year);
  const [selectedMockImage, setSelectedMockImage] = useState(
    participant.idCardImage || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=400&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockSamples = [
    { label: 'ตัวอย่างที่ 1 (บัตรนักศึกษา มข.)', url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=400&q=80' },
    { label: 'ตัวอย่างที่ 2 (บัตรประชาชน)', url: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idNumber || idNumber.length < 13) {
      return alert('กรุณากรอกเลขประจำตัวประชาชน 13 หลักให้ถูกต้อง');
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitKYC({
        idCardNumber: idNumber,
        idCardImage: selectedMockImage,
        studentId,
        faculty,
        year
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const isVerified = participant.verificationStatus === 'Verified';
  const isPending = participant.verificationStatus === 'Pending';

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '580px' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-h3" style={{ fontSize: '18px' }}>ยืนยันตัวตนด้วยบัตรประชาชน (e-KYC)</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>เพื่อการันตีความเป็นนักศึกษาจริง และสิทธิ์รับเงินรางวัล</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}><X size={20} /></button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Status View: Verified */}
          {isVerified && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={36} color="var(--color-success)" />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                บัญชีของคุณผ่านการยืนยันตัวตนแล้ว (Verified)
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                เลขบัตรประชาชน: <strong>{participant.idCardNumber}</strong><br />
                รหัสนักศึกษา: <strong>{participant.studentId}</strong> ({participant.faculty})
              </p>
              <div style={{ backgroundColor: '#F8FAFC', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                🔒 <strong>PDPA Protected:</strong> ข้อมูลเลขบัตรและรูปภาพถูกเข้ารหัสระดับ AES-256 ผู้วิจัยจะไม่สามารถเข้าถึงข้อมูลส่วนตัวของคุณได้
              </div>
              <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
                ปิดหน้าต่าง
              </button>
            </div>
          )}

          {/* Status View: Pending */}
          {isPending && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Clock size={36} color="var(--color-warning)" />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#92400E', marginBottom: '8px' }}>
                เอกสารอยู่ระหว่างการตรวจสอบ (Pending Review)
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                ระบบได้รับข้อมูลและภาพบัตรของคุณเรียบร้อยแล้ว แอดมินกำลังตรวจสอบความถูกต้องของข้อมูล (มักใช้เวลาไม่เกิน 15-30 นาที)
              </p>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '14px', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: '#B45309', marginBottom: '20px', textAlign: 'left' }}>
                💡 <strong>เคล็ดลับสำหรับการทดสอบ (Demo):</strong> คุณสามารถสลับเป็น <strong>Admin</strong> ในแถบด้านบน เพื่อกด "อนุมัติบัตร" นี้ได้ทันที!
              </div>
              <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
                รับทราบ
              </button>
            </div>
          )}

          {/* Status View: Unverified (Upload Form) */}
          {!isVerified && !isPending && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  เลขประจำตัวประชาชน 13 หลัก *
                </label>
                <input
                  type="text"
                  placeholder="x-xxxx-xxxxx-xx-x"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '15px', fontWeight: 600 }}
                />
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  * ระบบจำกัด 1 เลขบัตรประชาชน ต่อ 1 บัญชีผู้ใช้งานเท่านั้น (ป้องกันบัญชีผี)
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    รหัสนักศึกษา มข.
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    ระดับชั้นปี
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="ชั้นปีที่ 1">ชั้นปีที่ 1</option>
                    <option value="ชั้นปีที่ 2">ชั้นปีที่ 2</option>
                    <option value="ชั้นปีที่ 3">ชั้นปีที่ 3</option>
                    <option value="ชั้นปีที่ 4">ชั้นปีที่ 4</option>
                    <option value="ปริญญาโท">ปริญญาโท</option>
                    <option value="ปริญญาเอก">ปริญญาเอก</option>
                  </select>
                </div>
              </div>

              {/* ID Card Image Upload / Picker */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  รูปภาพบัตรประชาชน / บัตรนักศึกษาด้านหน้า *
                </label>
                <div style={{ border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '16px', textAlign: 'center', background: '#F8FAFC', marginBottom: '10px' }}>
                  <img
                    src={selectedMockImage}
                    alt="ID Card Preview"
                    style={{ maxHeight: '140px', maxWidth: '100%', borderRadius: '6px', objectFit: 'cover', margin: '0 auto 10px auto', display: 'block', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    ตัวอย่างรูปบัตรที่จะใช้ส่งตรวจ
                  </div>
                </div>

                {/* Sample selector */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {mockSamples.map((s, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedMockImage(s.url)}
                      className={`btn btn-sm ${selectedMockImage === s.url ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                    >
                      <Image size={12} /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  ยกเลิก
                </button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งเอกสารยืนยันตัวตน'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
