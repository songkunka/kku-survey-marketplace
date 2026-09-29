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
      <div className="modal-content max-w-lg w-full rounded-[8px] bg-white border border-[#f3f3f3]">
        {/* Header */}
        <div className="p-5 px-6 border-b border-[#f3f3f3] flex justify-between items-center bg-white rounded-t-[8px]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f5f7fa] text-[#0070d1] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-black">ยืนยันตัวตนด้วยบัตรประชาชน (e-KYC)</h3>
              <p className="text-xs text-[#6b6b6b]">เพื่อการันตีความเป็นนักศึกษาจริง และสิทธิ์รับเงินรางวัล</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#6b6b6b] hover:text-black p-1.5 rounded-full hover:bg-[#f5f7fa] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status View: Verified */}
          {isVerified && (
            <div className="text-center py-5">
              <div className="w-16 h-16 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-lg font-light text-black mb-2">
                บัญชีของคุณผ่านการยืนยันตัวตนแล้ว (Verified)
              </h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed mb-6 font-normal">
                เลขบัตรประชาชน: <strong className="text-black">{participant.idCardNumber}</strong><br />
                รหัสนักศึกษา: <strong className="text-black">{participant.studentId}</strong> ({participant.faculty})
              </p>
              <div className="bg-[#f5f7fa] p-4 rounded-[4px] border border-[#e2e8f0] text-xs text-[#6b6b6b] mb-6 text-left leading-relaxed">
                🔒 <strong>PDPA Protected:</strong> ข้อมูลเลขบัตรและภาพถ่ายถูกเข้ารหัสระดับ AES-256 ผู้วิจัยจะไม่สามารถเข้าถึงข้อมูลส่วนบุคคลของคุณได้
              </div>
              <button
                onClick={onClose}
                className="btn-pill btn-pill-primary w-full justify-center"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          )}

          {/* Status View: Pending */}
          {isPending && (
            <div className="text-center py-5">
              <div className="w-16 h-16 rounded-full bg-[#fffbeb] text-[#d97706] flex items-center justify-center mx-auto mb-4">
                <Clock size={36} />
              </div>
              <h4 className="text-lg font-light text-[#92400e] mb-2">
                เอกสารอยู่ระหว่างการตรวจสอบ (Pending Review)
              </h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed mb-6">
                ระบบได้รับข้อมูลและภาพบัตรของคุณเรียบร้อยแล้ว แอดมินกำลังตรวจสอบความถูกต้องของข้อมูล (มักใช้เวลาไม่เกิน 15-30 นาที)
              </p>
              <div className="bg-[#fffbeb] border border-[#fde68a] p-4 rounded-[4px] text-xs text-[#92400e] mb-6 text-left leading-relaxed">
                💡 <strong>เคล็ดลับสำหรับการทดสอบ (Demo):</strong> คุณสามารถสลับเป็น <strong>Admin</strong> ในเมนูโปรไฟล์ เพื่อกด "อนุมัติบัตร" ในระบบได้ทันที!
              </div>
              <button
                onClick={onClose}
                className="btn-pill btn-pill-secondary-light w-full justify-center"
              >
                รับทราบ
              </button>
            </div>
          )}

          {/* Status View: Unverified (Upload Form) */}
          {!isVerified && !isPending && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wider">
                  เลขประจำตัวประชาชน 13 หลัก *
                </label>
                <input
                  type="text"
                  placeholder="x-xxxx-xxxxx-xx-x"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-[4px] border border-[#cbd5e1] text-sm font-semibold tracking-wider focus:outline-none focus:border-[#0070d1] bg-white"
                />
                <div className="text-[11px] text-[#6b6b6b] mt-1">
                  * ระบบจำกัด 1 เลขบัตรประชาชน ต่อ 1 บัญชีผู้ใช้งานเท่านั้น (ป้องกันบัญชีผี)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wider">
                    รหัสนักศึกษา มข.
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#cbd5e1] text-sm focus:outline-none focus:border-[#0070d1] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wider">
                    ระดับชั้นปี
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[#cbd5e1] text-sm focus:outline-none focus:border-[#0070d1] bg-white"
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
                <label className="block text-xs font-semibold text-black mb-1.5 uppercase tracking-wider">
                  รูปภาพบัตรประชาชน / บัตรนักศึกษาด้านหน้า *
                </label>
                <div className="border border-dashed border-[#cbd5e1] rounded-[8px] p-4 text-center bg-[#f5f7fa] mb-3">
                  <img
                    src={selectedMockImage}
                    alt="ID Card Preview"
                    className="max-h-36 max-w-full rounded-[4px] object-cover mx-auto mb-2 shadow-sm"
                  />
                  <div className="text-[11px] text-[#6b6b6b]">
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                        selectedMockImage === s.url
                          ? 'bg-[#0070d1] text-white border-[#0070d1]'
                          : 'bg-white text-black border-[#cbd5e1] hover:bg-[#f5f7fa]'
                      }`}
                    >
                      <Image size={11} className="inline mr-1" /> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t border-[#f3f3f3] pt-5 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-pill btn-pill-secondary-light btn-pill-sm text-xs"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill btn-pill-primary btn-pill-sm text-xs"
                >
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
