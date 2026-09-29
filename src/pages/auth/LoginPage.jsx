import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

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
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-8 px-4 bg-gradient-to-b from-slate-50 to-blue-50/40">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-9">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-black text-xl mx-auto mb-3.5 shadow-md">
            K
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1.5">
            เข้าสู่ระบบ KKU Survey
          </h2>
          <p className="text-xs text-slate-500">
            บัญชีเดี่ยวสำหรับตอบแบบสอบถาม และสร้างงานวิจัย
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs mb-4 flex gap-2 items-center">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              อีเมล
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="เช่น yourname@kkumail.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">รหัสผ่าน</label>
              <a
                href="#forgot"
                onClick={(e) => { e.preventDefault(); alert('ระบบรีเซ็ตรหัสผ่านจะส่งลิงก์ไปยังอีเมลของคุณ'); }}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                ลืมรหัสผ่าน?
              </a>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full justify-center py-2.5 text-sm font-semibold"
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : (
              <>
                เข้าสู่ระบบ <ArrowRight size={16} className="ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">หรือ</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Google KKU Mail Sign-in */}
        <button
          type="button"
          onClick={() => handleGoogleLogin('student.kku@kkumail.com')}
          className="btn btn-secondary w-full justify-center py-2.5 text-xs font-semibold flex items-center gap-2 mb-4 border-slate-300 hover:bg-slate-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
          เข้าสู่ระบบด้วย KKU Mail (@kkumail.com)
        </button>

        {/* Quick Demo Credentials Help */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-500 mb-5">
          <div className="font-semibold text-slate-700 mb-1.5">⚡ บัญชีทดสอบด่วน:</div>
          <div className="flex gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => { setEmail('worameth.m@kkumail.com'); setPassword('password123'); }}
              className="btn btn-sm btn-secondary text-xs py-1 px-2.5"
            >
              นศ. Max (ผู้ตอบ/วิจัย)
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@kku.ac.th'); setPassword('adminpassword'); }}
              className="btn btn-sm btn-secondary text-xs py-1 px-2.5"
            >
              Admin มข.
            </button>
          </div>
        </div>

        {/* Register link */}
        <div className="text-center text-xs text-slate-500">
          ยังไม่มีบัญชีใช่หรือไม่?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('register')}
            className="text-blue-600 font-semibold hover:text-blue-700 ml-1"
          >
            สมัครสมาชิกใหม่ที่นี่
          </button>
        </div>
      </div>
    </div>
  );
};
