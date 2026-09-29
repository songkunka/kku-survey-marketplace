import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialParticipants,
  initialResearchers,
  initialSurveys,
  initialTransactions,
  initialAdminStats,
  initialKYCQueue
} from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'kku_survey_marketplace_state_v2';

export const AppProvider = ({ children }) => {
  // Current active role: 'public' | 'participant' | 'researcher' | 'admin'
  const [currentRole, setCurrentRole] = useState('participant');

  const [participant, setParticipant] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_participant`);
    return saved ? JSON.parse(saved) : initialParticipants;
  });

  const [researcher, setResearcher] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_researcher`);
    return saved ? JSON.parse(saved) : initialResearchers;
  });

  const [surveys, setSurveys] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_surveys`);
    return saved ? JSON.parse(saved) : initialSurveys;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [adminStats, setAdminStats] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_adminStats`);
    return saved ? JSON.parse(saved) : initialAdminStats;
  });

  const [kycQueue, setKycQueue] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_kycQueue`);
    return saved ? JSON.parse(saved) : initialKYCQueue;
  });

  // Notifications or toast messages
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_participant`, JSON.stringify(participant));
  }, [participant]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_researcher`, JSON.stringify(researcher));
  }, [researcher]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_surveys`, JSON.stringify(surveys));
  }, [surveys]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_adminStats`, JSON.stringify(adminStats));
  }, [adminStats]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_kycQueue`, JSON.stringify(kycQueue));
  }, [kycQueue]);

  // Method: Complete Survey with Code Handshake & Speeder Detection
  const completeSurvey = (surveyId, submittedCode, elapsedTimeSeconds = 20) => {
    const targetSurvey = surveys.find(s => s.id === surveyId);
    if (!targetSurvey) return { success: false, reason: 'not_found' };

    // 1. Duplicate Check
    if (participant.completedSurveyIds.includes(surveyId)) {
      return { 
        success: false, 
        reason: 'duplicate', 
        message: 'ระบบตรวจพบการตอบซ้ำ (Duplicate Prevention) คุณได้ทำแบบสอบถามนี้ไปแล้ว' 
      };
    }

    // 2. Speeder Detection Trap
    const minTime = targetSurvey.minimumTimeSeconds || 10;
    if (elapsedTimeSeconds < minTime) {
      return {
        success: false,
        reason: 'speeder',
        message: `ระบบตรวจพบความเร็วในการตอบผิดปกติ (ใช้เวลา ${elapsedTimeSeconds} วินาที จากเกณฑ์ขั้นต่ำ ${minTime} วินาที) เพื่อรักษาคุณภาพงานวิจัย กรุณาอ่านและตรวจสอบคำถามก่อนกดส่ง`
      };
    }

    // 3. Completion Code Handshake for External Google Forms
    if (targetSurvey.surveyType === 'external_google_forms') {
      const cleanSubmitted = (submittedCode || '').trim().toUpperCase();
      const expectedCode = (targetSurvey.completionCode || '').trim().toUpperCase();

      if (!cleanSubmitted) {
        return {
          success: false,
          reason: 'empty_code',
          message: 'กรุณากรอกรหัสยืนยันความสมบูรณ์ (Completion Code) ที่ได้รับจากหน้าจบของ Google Forms'
        };
      }

      if (cleanSubmitted !== expectedCode) {
        return {
          success: false,
          reason: 'invalid_code',
          message: `รหัสยืนยันไม่ถูกต้อง (คุณกรอก: "${submittedCode}") กรุณาทำแบบสอบถามให้เสร็จแล้วคัดลอกรหัสมาวางใหม่อีกครั้ง`
        };
      }
    }

    // Check if quota already reached
    if (targetSurvey.completedResponses >= targetSurvey.targetResponses) {
      return {
        success: false,
        reason: 'full',
        message: 'แบบสอบถามนี้มีผู้ตอบครบตามโควตาแล้ว'
      };
    }

    const rewardAmount = targetSurvey.reward;

    // Update Participant
    setParticipant(prev => ({
      ...prev,
      balance: prev.balance + rewardAmount,
      completedSurveyIds: [...prev.completedSurveyIds, surveyId]
    }));

    // Update Survey Progress
    setSurveys(prev => prev.map(s => {
      if (s.id === surveyId) {
        const nextCompleted = s.completedResponses + 1;
        return {
          ...s,
          completedResponses: nextCompleted,
          status: nextCompleted >= s.targetResponses ? 'Completed' : s.status
        };
      }
      return s;
    }));

    // Add to Ledger
    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'reward',
      title: `ตอบแบบสอบถาม: ${targetSurvey.title}`,
      amount: rewardAmount,
      date: 'วันนี้',
      status: 'Completed'
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update Admin Stats
    setAdminStats(prev => ({
      ...prev,
      completedResponses: prev.completedResponses + 1
    }));

    showToast(`ยืนยันรหัสถูกต้อง! ได้รับ +฿${rewardAmount}.00 เข้ากระเป๋าเรียบร้อยแล้ว`, 'success');
    return { success: true, reward: rewardAmount };
  };

  // Method: Submit e-KYC (Identity Verification)
  const submitKYC = ({ idCardNumber, idCardImage, studentId, faculty, year }) => {
    // Check duplicate ID card in queue
    const isDuplicate = kkuQueueCheck(idCardNumber);
    if (isDuplicate) {
      return { success: false, message: 'เลขประจำตัวประชาชนนี้ถูกใช้งานลงทะเบียนในระบบแล้ว' };
    }

    const newKycEntry = {
      id: `kyc-${Date.now()}`,
      participantId: participant.id,
      name: participant.name,
      studentId: studentId || participant.studentId,
      faculty: faculty || participant.faculty,
      year: year || participant.year,
      idCardNumber: idCardNumber,
      submittedAt: 'เมื่อสักครู่',
      image: idCardImage || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=400&q=80',
      status: 'Pending'
    };

    setKycQueue(prev => [newKycEntry, ...prev]);
    setParticipant(prev => ({
      ...prev,
      verificationStatus: 'Pending',
      idCardNumber,
      idCardImage: newKycEntry.image
    }));

    showToast('ส่งเอกสารยืนยันตัวตนเรียบร้อยแล้ว แอดมินกำลังตรวจสอบความถูกต้อง', 'success');
    return { success: true };
  };

  const kkuQueueCheck = (idNumber) => {
    return kycQueue.some(k => k.idCardNumber === idNumber && k.status === 'Approved');
  };

  // Method: Admin Approve KYC
  const approveKYC = (kycId) => {
    const target = kycQueue.find(k => k.id === kycId);
    if (!target) return;

    setKycQueue(prev => prev.filter(k => k.id !== kycId));

    // If matches current participant, update participant status to Verified
    if (target.participantId === participant.id) {
      setParticipant(prev => ({
        ...prev,
        verificationStatus: 'Verified'
      }));
    }

    setAdminStats(prev => ({
      ...prev,
      totalParticipants: prev.totalParticipants + 1
    }));

    showToast(`อนุมัติการยืนยันตัวตนของ "${target.name}" เรียบร้อยแล้ว`, 'success');
  };

  // Method: Admin Reject KYC
  const rejectKYC = (kycId, reason = 'ภาพบัตรไม่ชัดเจนหรือข้อมูลไม่ตรงกับฐานข้อมูล') => {
    const target = kycQueue.find(k => k.id === kycId);
    setKycQueue(prev => prev.filter(k => k.id !== kycId));

    if (target && target.participantId === participant.id) {
      setParticipant(prev => ({
        ...prev,
        verificationStatus: 'Unverified'
      }));
    }

    showToast(`ปฏิเสธการยืนยันตัวตน (${reason})`, 'info');
  };

  // Method: Update Demographic Attributes
  const updateDemographics = (data) => {
    setParticipant(prev => ({
      ...prev,
      ...data
    }));
    showToast('บันทึกข้อมูลประชากรศาสตร์ (Demographics) สำเร็จ', 'success');
  };

  // Quick Preset Switcher for testing
  const setVerificationPreset = (status) => {
    setParticipant(prev => ({
      ...prev,
      verificationStatus: status
    }));
    showToast(`สลับสถานะผู้ใช้เป็น: ${status}`, 'info');
  };

  // Method: Create Project (with auto-generated Completion Code)
  const createProject = (projectInput) => {
    const totalBudget = projectInput.targetResponses * projectInput.reward;

    if (researcher.balance < totalBudget) {
      return {
        success: false,
        reason: 'insufficient_budget',
        message: `งบประมาณในบัญชีไม่เพียงพอ (ต้องการ ฿${totalBudget} แต่มี ฿${researcher.balance})`
      };
    }

    // Deduct budget
    setResearcher(prev => ({
      ...prev,
      balance: prev.balance - totalBudget
    }));

    // Auto-generate Prolific-style completion code
    const generatedCode = `KKU-${Math.random().toString(36).substring(2, 6).toUpperCase()}-2026`;

    const newProject = {
      id: `proj-${Date.now()}`,
      title: projectInput.title,
      description: projectInput.description,
      researcher: researcher.name,
      researcherId: researcher.id,
      surveyType: projectInput.surveyType || 'external_google_forms',
      surveyUrl: projectInput.surveyUrl || 'https://docs.google.com/forms/d/sample',
      completionCode: generatedCode,
      minimumTimeSeconds: 15,
      eligibility: projectInput.eligibility || 'นักศึกษา มข. ทุกชั้นปี',
      targetFaculty: projectInput.targetFaculty || 'ทุกคณะในมหาวิทยาลัยขอนแก่น',
      targetResidence: projectInput.targetResidence || 'ทุกพื้นที่รอบ มข.',
      reward: Number(projectInput.reward),
      estimatedTime: `${projectInput.estimatedTime || 4} นาที`,
      targetResponses: Number(projectInput.targetResponses),
      completedResponses: 0,
      status: 'Active',
      budget: totalBudget,
      category: projectInput.category || 'General',
      questionsCount: 5,
      sampleQuestions: [
        { id: 1, text: 'คุณมีความคิดเห็นอย่างไรเกี่ยวกับหัวข้อนี้?', options: ['เห็นด้วยอย่างยิ่ง', 'เห็นด้วย', 'ไม่เห็นด้วย'] },
        { id: 2, text: 'คุณใช้งานบริการนี้บ่อยเพียงใด?', options: ['ทุกวัน', 'สัปดาห์ละ 2-3 ครั้ง', 'นานๆ ครั้ง'] }
      ]
    };

    setSurveys(prev => [newProject, ...prev]);
    setAdminStats(prev => ({
      ...prev,
      activeProjects: prev.activeProjects + 1
    }));

    showToast(`สร้างโปรเจกต์สำเร็จ! รหัสยืนยัน Google Forms คือ: ${generatedCode}`, 'success');
    return { success: true, project: newProject };
  };

  // Method: Withdrawal
  const requestWithdrawal = (amount, method, account) => {
    const fee = 5;
    const totalDeduction = Number(amount);

    if (participant.balance < totalDeduction) {
      return { success: false, message: 'ยอดเงินคงเหลือไม่เพียงพอ' };
    }

    setParticipant(prev => ({
      ...prev,
      balance: prev.balance - totalDeduction
    }));

    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'withdraw',
      title: `ถอนเงิน (${method}) บัญชี: ${account}`,
      amount: -totalDeduction,
      fee: fee,
      netAmount: totalDeduction - fee,
      date: 'วันนี้',
      status: 'Processing'
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast(`ส่งคำขอถอนเงิน ฿${totalDeduction} สำเร็จ (สถานะ: กำลังดำเนินการ)`, 'success');
    return { success: true };
  };

  // Method: Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_participant`);
    localStorage.removeItem(`${STORAGE_KEY}_researcher`);
    localStorage.removeItem(`${STORAGE_KEY}_surveys`);
    localStorage.removeItem(`${STORAGE_KEY}_transactions`);
    localStorage.removeItem(`${STORAGE_KEY}_adminStats`);
    localStorage.removeItem(`${STORAGE_KEY}_kycQueue`);

    setParticipant(initialParticipants);
    setResearcher(initialResearchers);
    setSurveys(initialSurveys);
    setTransactions(initialTransactions);
    setAdminStats(initialAdminStats);
    setKycQueue(initialKYCQueue);

    showToast('รีเซ็ตข้อมูลการสาธิต (Demo Data) เรียบร้อยแล้ว', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        participant,
        researcher,
        surveys,
        transactions,
        adminStats,
        kycQueue,
        toast,
        showToast,
        completeSurvey,
        createProject,
        requestWithdrawal,
        submitKYC,
        approveKYC,
        rejectKYC,
        updateDemographics,
        setVerificationPreset,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
