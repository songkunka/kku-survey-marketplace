import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, FolderKanban, CheckCircle2, Users, Coins, ArrowRight, Download, Eye } from 'lucide-react';

export const ResearcherDashboard = ({ setActiveTab, setSelectedProject }) => {
  const { researcher, surveys } = useApp();

  const activeProjects = surveys.filter(s => s.status === 'Active');
  const totalCompleted = surveys.reduce((acc, curr) => acc + curr.completedResponses, 0);
  const totalTarget = surveys.reduce((acc, curr) => acc + curr.targetResponses, 0);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="text-h2" style={{ marginBottom: '4px' }}>Researcher Dashboard</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
            จัดการและติดตามความคืบหน้าการเก็บข้อมูลกลุ่มตัวอย่างงานวิจัย
          </p>
        </div>

        <button
          onClick={() => setActiveTab('create')}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 600 }}
        >
          <PlusCircle size={18} /> สร้างโปรเจกต์แบบสอบถามใหม่
        </button>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="card">
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            งบประมาณวิจัยคงเหลือ
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-primary)' }}>
            ฿{researcher.balance.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            สำหรับเปิดโปรเจกต์ใหม่
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            โปรเจกต์ที่กำลังทำงาน (Active)
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-main)' }}>
            {activeProjects.length} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>/ {surveys.length} โปรเจกต์</span>
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
            จำนวนผู้ตอบทั้งหมดที่ได้
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-success)' }}>
            {totalCompleted} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-muted)' }}>/ {totalTarget} คน</span>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="text-h3" style={{ fontSize: '18px' }}>รายการโปรเจกต์งานวิจัยของคุณ</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {surveys.map((project) => {
            const progress = Math.min(100, Math.round((project.completedResponses / project.targetResponses) * 100));
            const remaining = Math.max(0, project.targetResponses - project.completedResponses);
            const budgetUsed = project.completedResponses * project.reward;

            return (
              <div key={project.id} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className={`badge ${project.status === 'Active' ? 'badge-active' : 'badge-completed'}`}>
                        {project.status === 'Active' ? 'กำลังเปิดรับคำตอบ' : 'เสร็จสมบูรณ์แล้ว'}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        กลุ่มเป้าหมาย: {project.eligibility}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {project.title}
                    </h4>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>งบประมาณโปรเจกต์</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      ฿{project.budget.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-text-muted)' }}>({project.reward}บ./คน)</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Numerical stats */}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '13px' }}>
                    <div>
                      <strong>ความคืบหน้า:</strong> {project.completedResponses} จาก {project.targetResponses} คน ({progress}%)
                    </div>
                    <div style={{ color: 'var(--color-text-muted)' }}>
                      เหลืออีก {remaining} คน • ใช้เงินไป ฿{budgetUsed} / ฿{project.budget}
                    </div>
                  </div>

                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: project.status === 'Completed' ? '#16A34A' : '#2563EB' }} />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    onClick={() => {
                      if (setSelectedProject) setSelectedProject(project);
                      setActiveTab('project-detail');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    <Eye size={14} /> ดูรายละเอียด & Data
                  </button>
                  <button
                    onClick={() => alert(`Export ข้อมูล ${project.completedResponses} ชุดคำตอบเป็นไฟล์ CSV สำเร็จ!`)}
                    className="btn btn-primary btn-sm"
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
