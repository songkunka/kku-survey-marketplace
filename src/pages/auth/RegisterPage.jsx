import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { kkuFaculties } from '../../data/mockData';

export const RegisterPage = ({ onNavigate }) => {
  const { register, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [faculty, setFaculty] = useState('คณะบริหารธุรกิจและการบัญชี (KKUBS)');
  const [major, setMajor] = useState('Marketing');
  const [yearOfStudy, setYearOfStudy] = useState('ชั้นปีที่ 1');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 6) {
      setErrorMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    const res = await register({
      full_name: fullName,
      email,
      password,
      student_id: studentId,
      faculty,
      major,
      year_of_study: yearOfStudy
    });

    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      if (onNavigate) onNavigate('surveys');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', backgroundColor: 'var(--color-bg-subtle)' }}>
      <div 
        style={{ 
          maxWidth: '520px', 
          width: '100%', 
          backgroundColor: '#FFFFFF', 
          borderRadius: 'var(--radius-card)', 
          border: '1px solid var(--color-border-subtle)', 
          boxShadow: 'var(--shadow-dropdown)', 
          padding: '40px 36px' 
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '16px'
            }}
          >
            <Sparkles size={14} /> 1 บัญชี ทำได้ครบทั้งตอบและสร้างแบบสอบถาม
          </div>
          <h2 className="display-sm" style={{ marginBottom: '6px', color: 'var(--color-text-title)' }}>
            สมัครสมาชิก KKU Survey
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: 0 }}>
            เชื่อมโยงนักศึกษากับงานวิจัยคุณภาพ มหาวิทยาลัยขอนแก่น
          </p>
        </div>

        {/* Error notice */}
        {errorMessage && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px 14px', borderRadius: 'var(--radius-card)', fontSize: '13px', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
              ชื่อ - นามสกุลจริง *
            </label>
            <input
              type="text"
              required
              placeholder="เช่น วรเมธ นครินทร์"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', outline: 'none', fontSize: '14px', backgroundColor: '#FFFFFF', color: 'var(--color-text-body)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
                อีเมล *
              </label>
              <input
                type="email"
                required
                placeholder="yourname@kkumail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', outline: 'none', fontSize: '14px', backgroundColor: '#FFFFFF', color: 'var(--color-text-body)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
                รหัสผ่าน *
              </label>
              <input
                type="password"
                required
                placeholder="อย่างน้อย 6 ตัวอักษร"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', outline: 'none', fontSize: '14px', backgroundColor: '#FFFFFF', color: 'var(--color-text-body)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
                รหัสนักศึกษา มข.
              </label>
              <input
                type="text"
                placeholder="เช่น 663040xxx-x"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', fontSize: '14px', backgroundColor: '#FFFFFF', color: 'var(--color-text-body)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
                ระดับชั้นปี
              </label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
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

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
              คณะ *
            </label>
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', fontSize: '14px', color: 'var(--color-text-body)' }}
            >
              {kkuFaculties.filter(f => !f.includes('ทุกคณะ')).map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
              สาขาวิชา
            </label>
            <input
              type="text"
              placeholder="เช่น การตลาด / วิศวกรรมคอมพิวเตอร์"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: 'var(--radius-input)', border: '1px solid var(--color-border)', fontSize: '14px', backgroundColor: '#FFFFFF', color: 'var(--color-text-body)' }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-pill btn-pill-primary"
            style={{ width: '100%', height: '48px', fontSize: '15px', marginBottom: '20px' }}
          >
            {isLoading ? 'กำลังสร้างบัญชี...' : (
              <>
                สมัครสมาชิก & เริ่มต้นใช้งาน <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)' }}>
          มีบัญชีอยู่แล้วใช่หรือไม่?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('login')}
            style={{ color: 'var(--color-primary)', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
          >
            เข้าสู่ระบบที่นี่
          </button>
        </div>
      </div>
    </div>
  );
};
