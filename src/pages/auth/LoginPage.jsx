import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

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
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', backgroundColor: 'var(--color-bg-subtle)' }}>
      <div 
        style={{ 
          maxWidth: '440px', 
          width: '100%', 
          backgroundColor: '#FFFFFF', 
          borderRadius: 'var(--radius-card)', 
          border: '1px solid var(--color-border-subtle)', 
          boxShadow: 'var(--shadow-dropdown)', 
          padding: '40px 36px' 
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-card)',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '22px',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 12px rgba(0, 112, 209, 0.25)'
            }}
          >
            K
          </div>
          <h2 className="display-sm" style={{ marginBottom: '6px', color: 'var(--color-text-title)' }}>
            เข้าสู่ระบบ KKU Survey
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: 0 }}>
            บัญชีเดี่ยวสำหรับตอบแบบสอบถาม และสร้างงานวิจัย
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px 14px', borderRadius: 'var(--radius-card)', fontSize: '13px', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)', marginBottom: '6px' }}>
              อีเมล
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--color-text-muted)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="เช่น yourname@kkumail.com"
                style={{ 
                  width: '100%', 
                  height: '44px',
                  padding: '0 14px 0 40px', 
                  borderRadius: 'var(--radius-input)', 
                  border: '1px solid var(--color-border)', 
                  outline: 'none', 
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-text-body)'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-body)' }}>รหัสผ่าน</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('ระบบรีเซ็ตรหัสผ่านจะส่งลิงก์ไปยังอีเมลของคุณ'); }} style={{ fontSize: '12px', color: 'var(--color-primary)', textDecoration: 'none' }}>ลืมรหัสผ่าน?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--color-text-muted)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', 
                  height: '44px',
                  padding: '0 14px 0 40px', 
                  borderRadius: 'var(--radius-input)', 
                  border: '1px solid var(--color-border)', 
                  outline: 'none', 
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-text-body)'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-pill btn-pill-primary"
            style={{ width: '100%', height: '48px', fontSize: '15px' }}
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
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>หรือ</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
        </div>

        {/* Google KKU Mail Sign-in */}
        <button
          type="button"
          onClick={() => handleGoogleLogin('student.kku@kkumail.com')}
          className="btn-pill btn-pill-secondary"
          style={{ width: '100%', height: '44px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '16px', height: '16px' }} />
          เข้าสู่ระบบด้วย KKU Mail (@kkumail.com)
        </button>

        {/* Quick Demo Credentials Help */}
        <div style={{ background: 'var(--color-bg-subtle)', padding: '14px 16px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border-subtle)', fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-text-title)', marginBottom: '8px' }}>⚡ บัญชีทดสอบด่วน:</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => { setEmail('worameth.m@kkumail.com'); setPassword('password123'); }}
              className="filter-pill"
              style={{ fontSize: '11px', padding: '4px 12px' }}
            >
              นศ. Max (ผู้ตอบ/วิจัย)
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@kku.ac.th'); setPassword('adminpassword'); }}
              className="filter-pill"
              style={{ fontSize: '11px', padding: '4px 12px' }}
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
