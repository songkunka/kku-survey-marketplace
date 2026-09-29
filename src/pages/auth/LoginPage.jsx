import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const LoginPage = ({ onNavigate }) => {
  const { login, loginWithGoogle, isLoading } = useAuth();

  const [email, setEmail] = useState('worameth.m@kkumail.com');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await login(email, password);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      if (onNavigate) onNavigate('surveys');
    }
  };

  const handleGoogleLogin = async (customEmail) => {
    const res = await loginWithGoogle(customEmail);
    if (res.success && onNavigate) onNavigate('surveys');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)' }}>
      <div style={{ maxWidth: '440px', width: '100%', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)', padding: '36px 32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '22px',
              margin: '0 auto 14px auto',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}
          >
            K
          </div>
          <h2 className="text-h2" style={{ fontSize: '22px', marginBottom: '6px' }}>
            เข้าสู่ระบบ KKU Survey
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
            บัญชีเดี่ยวสำหรับตอบแบบสอบถาม และสร้างงานวิจัย
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px', marginBottom: '18px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              อีเมล
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="เช่น yourname@kkumail.com"
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>รหัสผ่าน</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('ระบบรีเซ็ตรหัสผ่านจะส่งลิงก์ไปยังอีเมลของคุณ'); }} style={{ fontSize: '11px', color: 'var(--color-primary)' }}>ลืมรหัสผ่าน?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', fontSize: '14px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '11px', fontSize: '15px', fontWeight: 600 }}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : (
              <>
                เข้าสู่ระบบ <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>หรือ</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Google KKU Mail Sign-in */}
        <button
          type="button"
          onClick={() => handleGoogleLogin('student.kku@kkumail.com')}
          className="btn btn-secondary"
          style={{ width: '100%', padding: '10px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px', borderColor: '#CBD5E1' }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '16px', height: '16px' }} />
          เข้าสู่ระบบด้วย KKU Mail (@kkumail.com)
        </button>

        {/* Quick Demo Credentials Help */}
        <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>⚡ บัญชีทดสอบด่วน:</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => { setEmail('worameth.m@kkumail.com'); setPassword('password123'); }}
              className="btn btn-sm btn-secondary"
              style={{ padding: '3px 8px', fontSize: '11px' }}
            >
              นศ. Max (ผู้ตอบ/วิจัย)
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@kku.ac.th'); setPassword('adminpassword'); }}
              className="btn btn-sm btn-secondary"
              style={{ padding: '3px 8px', fontSize: '11px' }}
            >
              Admin มข.
            </button>
          </div>
        </div>

        {/* Register link */}
        <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)' }}>
          ยังไม่มีบัญชีใช่หรือไม่?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('register')}
            style={{ color: 'var(--color-primary)', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
          >
            สมัครสมาชิกใหม่ที่นี่
          </button>
        </div>
      </div>
    </div>
  );
};
