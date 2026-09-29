import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Download, PauseCircle, PlayCircle, Users, Coins, CheckCircle, BarChart3, Clock } from 'lucide-react';

export const ProjectDetailPage = ({ project, setActiveTab }) => {
  const { surveys } = useApp();

  // If no project selected, fallback to the first one
  const targetProject = project || surveys[0];

  if (!targetProject) return null;

  const progress = Math.min(100, Math.round((targetProject.completedResponses / targetProject.targetResponses) * 100));
  const remaining = Math.max(0, targetProject.targetResponses - targetProject.completedResponses);
  const budgetUsed = targetProject.completedResponses * targetProject.reward;
  const budgetRemaining = targetProject.budget - budgetUsed;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button
        onClick={() => setActiveTab('dashboard')}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '20px' }}
      >
        <ArrowLeft size={14} /> กลับหน้ารวมโปรเจกต์
      </button>

      {/* Top Banner */}
      <div className="card" style={{ padding: '28px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge ${targetProject.status === 'Active' ? 'badge-active' : 'badge-completed'}`}>
                {targetProject.status === 'Active' ? 'กำลังเปิดรับคำตอบ' : 'เสร็จสมบูรณ์'}
              </span>
              <span className="badge" style={{ background: '#F1F5F9', color: '#475569' }}>
                {targetProject.category}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                {targetProject.estimatedTime}
              </span>
            </div>
            <h2 className="text-h2" style={{ fontSize: '24px', color: 'var(--color-text-main)', marginBottom: '8px' }}>
              {targetProject.title}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', maxWidth: '700px' }}>
              {targetProject.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => alert(`Export ข้อมูลดิบ (Raw Data) จำนวน ${targetProject.completedResponses} รายการ สำเร็จ!`)}
              className="btn btn-primary"
            >
              <Download size={15} /> Export Dataset (.CSV)
            </button>
          </div>
        </div>

        {/* Progress Display */}
        <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '14px' }}>
            <div>
              <strong>ความคืบหน้าการเก็บข้อมูล:</strong> {targetProject.completedResponses} จาก {targetProject.targetResponses} คน ({progress}%)
            </div>
            <div style={{ color: 'var(--color-text-muted)' }}>
              คงเหลืออีก {remaining} คน
            </div>
          </div>
          <div className="progress-bar-container" style={{ height: '10px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: targetProject.status === 'Completed' ? '#16A34A' : '#2563EB' }} />
          </div>
        </div>
      </div>

      {/* Numerical Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>เป้าหมายทั้งหมด</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>{targetProject.targetResponses} คน</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>ได้คำตอบแล้ว</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-success)' }}>{targetProject.completedResponses} คน</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>งบประมาณที่ใช้ไป</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>฿{budgetUsed.toLocaleString()}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>งบคงเหลือในโปรเจกต์</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#475569' }}>฿{budgetRemaining.toLocaleString()}</div>
        </div>
      </div>

      {/* Target & Demographics Summary */}
      <div className="card">
        <h3 className="text-h3" style={{ fontSize: '16px', marginBottom: '16px' }}>สเปกกลุ่มตัวอย่างและข้อกำหนด</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', fontSize: '13px' }}>
          <div>
            <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>กลุ่มเป้าหมาย (Audience):</div>
            <div style={{ fontWeight: 600 }}>{targetProject.eligibility}</div>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>คณะที่เปิดรับ:</div>
            <div style={{ fontWeight: 600 }}>{targetProject.targetFaculty}</div>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>ค่าตอบแทนต่อคน:</div>
            <div style={{ fontWeight: 600 }}>฿{targetProject.reward}.00 / Response</div>
          </div>
          <div>
            <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>ระบบตรวจป้องกันการตอบซ้ำ:</div>
            <div style={{ fontWeight: 600, color: 'var(--color-success)' }}>เปิดใช้งาน (Unique Participant ID)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
