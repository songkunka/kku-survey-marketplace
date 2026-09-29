import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, Eye, Download } from 'lucide-react';

export const ResearcherDashboard = ({ setActiveTab, setSelectedProject }) => {
  const { researcher, surveys } = useApp();

  const activeProjects = surveys.filter(s => s.status === 'Active');
  const totalCompleted = surveys.reduce((acc, curr) => acc + curr.completedResponses, 0);
  const totalTarget = surveys.reduce((acc, curr) => acc + curr.targetResponses, 0);

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 0 60px 0' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="display-md" style={{ marginBottom: '4px', color: 'var(--color-text-title)' }}>
            Researcher Dashboard
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', margin: 0 }}>
            จัดการและติดตามความคืบหน้าการเก็บข้อมูลกลุ่มตัวอย่างงานวิจัย
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create')}
          className="btn-pill btn-pill-primary"
          style={{ height: '44px', padding: '0 22px', fontSize: '14px' }}
        >
          <PlusCircle size={18} /> สร้างโปรเจกต์แบบสอบถามใหม่
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '36px' }}>
        <div 
          className="product-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-card)', 
            backgroundColor: 'var(--color-surface-card)', 
            border: '1px solid var(--color-border-subtle)' 
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            งบประมาณวิจัยคงเหลือ
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-commerce)', letterSpacing: '-0.02em' }}>
            ฿{researcher.balance.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            สำหรับเปิดโปรเจกต์ใหม่
          </div>
        </div>

        <div 
          className="product-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-card)', 
            backgroundColor: 'var(--color-surface-card)', 
            border: '1px solid var(--color-border-subtle)' 
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            โปรเจกต์ที่กำลังทำงาน (Active)
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-title)', letterSpacing: '-0.02em' }}>
            {activeProjects.length} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>/ {surveys.length} โปรเจกต์</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            เก็บข้อมูลตามโควตา
          </div>
        </div>

        <div 
          className="product-card" 
          style={{ 
            padding: '24px', 
            borderRadius: 'var(--radius-card)', 
            backgroundColor: 'var(--color-surface-card)', 
            border: '1px solid var(--color-border-subtle)' 
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            จำนวนผู้ตอบทั้งหมดที่ได้
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
            {totalCompleted} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>/ {totalTarget} คน</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            รวมทุกโปรเจกต์ที่เปิดรับ
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', margin: 0 }}>
            รายการโปรเจกต์งานวิจัยของคุณ
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {surveys.map((project) => {
            const progress = Math.min(100, Math.round((project.completedResponses / project.targetResponses) * 100));
            const remaining = Math.max(0, project.targetResponses - project.completedResponses);
            const budgetUsed = project.completedResponses * project.reward;

            return (
              <div 
                key={project.id} 
                className="product-card" 
                style={{ 
                  padding: '26px', 
                  borderRadius: 'var(--radius-card)', 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid var(--color-border-subtle)' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span className={`badge ${project.status === 'Active' ? 'badge-active' : 'badge-completed'}`}>
                        {project.status === 'Active' ? 'กำลังเปิดรับคำตอบ' : 'เสร็จสมบูรณ์แล้ว'}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        กลุ่มเป้าหมาย: {project.eligibility}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-title)', margin: 0 }}>
                      {project.title}
                    </h4>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>งบประมาณโปรเจกต์</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-commerce)' }}>
                      ฿{project.budget.toLocaleString()} <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-text-muted)' }}>({project.reward}บ./คน)</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Numerical stats */}
                <div style={{ background: 'var(--color-bg-subtle)', padding: '16px 20px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border-subtle)', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '13px' }}>
                    <div>
                      <strong style={{ color: 'var(--color-text-title)' }}>ความคืบหน้า:</strong> {project.completedResponses} จาก {project.targetResponses} คน ({progress}%)
                    </div>
                    <div style={{ color: 'var(--color-text-muted)' }}>
                      เหลืออีก {remaining} คน • ใช้เงินไป ฿{budgetUsed} / ฿{project.budget}
                    </div>
                  </div>

                  <div className="progress-bar-container" style={{ height: '6px', borderRadius: 'var(--radius-full)', backgroundColor: '#E2E8F0' }}>
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${progress}%`, 
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: project.status === 'Completed' ? 'var(--color-success)' : 'var(--color-primary)' 
                      }} 
                    />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    onClick={() => {
                      if (setSelectedProject) setSelectedProject(project);
                      setActiveTab('project-detail');
                    }}
                    className="btn-pill btn-pill-secondary"
                    style={{ height: '36px', padding: '0 16px', fontSize: '13px' }}
                  >
                    <Eye size={14} /> ดูรายละเอียด & Data
                  </button>
                  <button
                    onClick={() => alert(`Export ข้อมูล ${project.completedResponses} ชุดคำตอบเป็นไฟล์ CSV สำเร็จ!`)}
                    className="btn-pill btn-pill-primary"
                    style={{ height: '36px', padding: '0 16px', fontSize: '13px' }}
                  >
                    <Download size={14} /> Export Results (CSV)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
