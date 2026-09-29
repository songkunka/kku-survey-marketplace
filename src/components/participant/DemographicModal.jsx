import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserCheck, Check } from 'lucide-react';
import { kkuFaculties, residenceZones } from '../../data/mockData';

export const DemographicModal = ({ onClose }) => {
  const { participant, updateDemographics } = useApp();

  const [faculty, setFaculty] = useState(participant.faculty);
  const [major, setMajor] = useState(participant.major || 'Marketing');
  const [year, setYear] = useState(participant.year);
  const [gender, setGender] = useState(participant.gender || 'ชาย');
  const [age, setAge] = useState(participant.age || 21);
  const [residenceZone, setResidenceZone] = useState(participant.residenceZone || 'ย่านกังสดาล');
  const [monthlyExpense, setMonthlyExpense] = useState(participant.monthlyExpense || '5,000 - 8,000 บาท');
  const [primaryTransport, setPrimaryTransport] = useState(participant.primaryTransport || 'รถจักรยานยนต์ส่วนตัว');
  const [deliveryApp, setDeliveryApp] = useState(participant.deliveryApp || 'LINE MAN');

  const handleSave = (e) => {
    e.preventDefault();
    updateDemographics({
      faculty,
      major,
      year,
      gender,
      age: Number(age),
      residenceZone,
      monthlyExpense,
      primaryTransport,
      deliveryApp
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '620px', 
          borderRadius: 'var(--radius-card)', 
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-dropdown)',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-card)', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', margin: 0 }}>ข้อมูลประชากรศาสตร์ (Demographic Profile)</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>ข้อมูลนี้ช่วยให้ระบบจับคู่แบบสอบถามที่ตรงกับคุณ 100%</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              color: 'var(--color-text-muted)', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              padding: '6px',
              borderRadius: 'var(--radius-input)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>คณะ</label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
              >
                {kkuFaculties.filter(f => !f.includes('ทุกคณะ')).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>สาขาวิชา</label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', fontSize: '14px', color: 'var(--color-text-body)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>ชั้นปี</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
              >
                <option value="ชั้นปีที่ 1">ชั้นปีที่ 1</option>
                <option value="ชั้นปีที่ 2">ชั้นปีที่ 2</option>
                <option value="ชั้นปีที่ 3">ชั้นปีที่ 3</option>
                <option value="ชั้นปีที่ 4">ชั้นปีที่ 4</option>
                <option value="ปริญญาโท">ปริญญาโท</option>
                <option value="ปริญญาเอก">ปริญญาเอก</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>เพศสภาพ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
              >
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="LGBTQ+">LGBTQ+</option>
                <option value="ไม่ต้องการระบุ">ไม่ต้องการระบุ</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>อายุ (ปี)</label>
              <input
                type="number"
                min="16"
                max="60"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', fontSize: '14px', color: 'var(--color-text-body)' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>พื้นที่พักอาศัยรอบ มข.</label>
            <select
              value={residenceZone}
              onChange={(e) => setResidenceZone(e.target.value)}
              style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
            >
              {residenceZones.filter(r => !r.includes('ทุกพื้นที่')).map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>ยานพาหนะหลัก</label>
              <select
                value={primaryTransport}
                onChange={(e) => setPrimaryTransport(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
              >
                <option value="รถจักรยานยนต์ส่วนตัว">รถจักรยานยนต์ส่วนตัว</option>
                <option value="รถ Shuttle Bus มข. (KST)">รถ Shuttle Bus มข. (KST)</option>
                <option value="รถยนต์ส่วนตัว">รถยนต์ส่วนตัว</option>
                <option value="เดิน / จักรยาน">เดิน / จักรยาน</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>แอปส่งอาหารที่ใช้ประจำ</label>
              <select
                value={deliveryApp}
                onChange={(e) => setDeliveryApp(e.target.value)}
                style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
              >
                <option value="LINE MAN">LINE MAN</option>
                <option value="Grab">Grab</option>
                <option value="ShopeeFood">ShopeeFood</option>
                <option value="ไม่ได้ใช้เดลิเวอรี">ไม่ได้ใช้เดลิเวอรี</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '18px' }}>
            <button type="button" onClick={onClose} className="btn-pill btn-pill-secondary">
              ยกเลิก
            </button>
            <button type="submit" className="btn-pill btn-pill-primary">
              <Check size={16} /> บันทึกโปรไฟล์
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
