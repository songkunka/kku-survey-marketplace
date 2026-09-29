import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { kkuFaculties } from '../../data/mockData';

export const RegisterPage = ({ onNavigate }) => {
  const { register, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [faculty, setFaculty] = useState('คณะวิทยาการจัดการ');
  const [yearOfStudy, setYearOfStudy] = useState('ชั้นปีที่ 2');
  const [major, setMajor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 6) {
      return setErrorMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
    }

    const res = await register({
      email,
      password,
      fullName,
      studentId,
      faculty,
      yearOfStudy,
      major
    });

    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      if (onNavigate) onNavigate('surveys');
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-8 px-4 bg-gradient-to-b from-slate-50 to-blue-50/40">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-9">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles size={13} /> 1 บัญชี ทำได้ครบทั้งตอบและสร้างแบบสอบถาม
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            สมัครสมาชิก KKU Survey
          </h2>
          <p className="text-xs text-slate-500">
            เชื่อมโยงนักศึกษากับงานวิจัยคุณภาพ มหาวิทยาลัยขอนแก่น
          </p>
        </div>

        {/* Error notice */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs mb-4 flex gap-2 items-center">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ชื่อ - นามสกุลจริง *
            </label>
            <input
              type="text"
              required
              placeholder="เช่น วรเมธ นครินทร์"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                อีเมล *
              </label>
              <input
                type="email"
                required
                placeholder="yourname@kkumail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                รหัสผ่าน *
              </label>
              <input
                type="password"
                required
                placeholder="อย่างน้อย 6 ตัวอักษร"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                รหัสนักศึกษา มข.
              </label>
              <input
                type="text"
                placeholder="เช่น 663040xxx-x"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ระดับชั้นปี
              </label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              คณะ *
            </label>
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {kkuFaculties.filter(f => !f.includes('ทุกคณะ')).map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              สาขาวิชา
            </label>
            <input
              type="text"
              placeholder="เช่น การตลาด / วิศวกรรมคอมพิวเตอร์"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full justify-center py-3 text-sm font-semibold mt-2"
          >
            {isLoading ? 'กำลังสร้างบัญชี...' : (
              <>
                สมัครสมาชิก & เริ่มต้นใช้งาน <ArrowRight size={16} className="ml-1" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 mt-5">
          มีบัญชีอยู่แล้วใช่หรือไม่?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('login')}
            className="text-blue-600 font-semibold hover:text-blue-700 ml-1"
          >
            เข้าสู่ระบบที่นี่
          </button>
        </div>
      </div>
    </div>
  );
};
