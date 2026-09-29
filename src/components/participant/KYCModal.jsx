import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, CheckCircle2, Clock, Image } from 'lucide-react';

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
      <div className="modal-content max-w-[580px] w-full">
        {/* Header */}
        <div className="p-5 px-6 border-b border-slate-200 flex justify-between items-center bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">ยืนยันตัวตนด้วยบัตรประชาชน (e-KYC)</h3>
              <p className="text-xs text-slate-500">เพื่อการันตีความเป็นนักศึกษาจริง และสิทธิ์รับเงินรางวัล</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status View: Verified */}
          {isVerified && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                บัญชีของคุณผ่านการยืนยันตัวตนแล้ว (Verified)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                เลขบัตรประชาชน: <strong className="text-slate-900">{participant.idCardNumber}</strong><br />
                รหัสนักศึกษา: <strong className="text-slate-900">{participant.studentId}</strong> ({participant.faculty})
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 mb-5 text-left leading-relaxed">
                🔒 <strong>PDPA Protected:</strong> ข้อมูลเลขบัตรและรูปภาพถูกเข้ารหัสระดับ AES-256 ผู้วิจัยจะไม่สามารถเข้าถึงข้อมูลส่วนตัวของคุณได้
              </div>
              <button onClick={onClose} className="btn btn-primary w-full justify-center py-3">
                ปิดหน้าต่าง
              </button>
            </div>
          )}

          {/* Status View: Pending */}
          {isPending && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Clock size={36} />
              </div>
              <h4 className="text-lg font-bold text-amber-800 mb-2">
                เอกสารอยู่ระหว่างการตรวจสอบ (Pending Review)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                ระบบได้รับข้อมูลและภาพบัตรของคุณเรียบร้อยแล้ว เจ้าหน้าที่กำลังตรวจสอบความถูกต้องของข้อมูล (มักใช้เวลาไม่เกิน 15-30 นาที)
              </p>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 mb-5 text-left leading-relaxed">
                💡 <strong>เคล็ดลับสำหรับการทดสอบ (Demo):</strong> คุณสามารถสลับเป็น <strong>Admin</strong> เพื่อกด "อนุมัติบัตร" ในระบบได้ทันที!
              </div>
              <button onClick={onClose} className="btn btn-secondary w-full justify-center py-3">
                รับทราบ
              </button>
            </div>
          )}

          {/* Status View: Unverified (Upload Form) */}
          {!isVerified && !isPending && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  เลขประจำตัวประชาชน 13 หลัก *
                </label>
                <input
                  type="text"
                  placeholder="x-xxxx-xxxxx-xx-x"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
                <div className="text-xs text-slate-500 mt-1">
                  * ระบบจำกัด 1 เลขบัตรประชาชน ต่อ 1 บัญชีผู้ใช้งานเท่านั้น (ป้องกันบัญชีผี)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    รหัสนักศึกษา มข.
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    ระดับชั้นปี
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  รูปภาพบัตรประชาชน / บัตรนักศึกษาด้านหน้า *
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center bg-slate-50 mb-3">
                  <img
                    src={selectedMockImage}
                    alt="ID Card Preview"
                    className="max-h-36 max-w-full rounded-lg object-cover mx-auto mb-2.5 shadow-sm"
                  />
                  <div className="text-xs text-slate-500">
                    ตัวอย่างรูปบัตรที่จะใช้ส่งตรวจ
                  </div>
                </div>

                {/* Sample selector */}
                <div className="flex gap-2 flex-wrap">
                  {mockSamples.map((s, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedMockImage(s.url)}
                      className={`btn btn-sm ${selectedMockImage === s.url ? 'btn-primary' : 'btn-secondary'} text-xs py-1 px-2.5`}
                    >
                      <Image size={12} /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2.5 justify-end border-t border-slate-200 pt-4 mt-6">
                <button type="button" onClick={onClose} className="btn btn-secondary px-4 py-2">
                  ยกเลิก
                </button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary px-5 py-2">
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
