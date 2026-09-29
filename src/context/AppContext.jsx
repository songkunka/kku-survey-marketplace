import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialParticipants,
  initialResearchers,
  initialSurveys,
  initialTransactions,
  initialAdminStats
} from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'kku_survey_marketplace_state_v1';

export const AppProvider = ({ children }) => {
  // Current active role for testing: 'public' | 'participant' | 'researcher' | 'admin'
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

  // Method: Complete Survey (with Duplicate Prevention!)
  const completeSurvey = (surveyId) => {
    const targetSurvey = surveys.find(s => s.id === surveyId);
    if (!targetSurvey) return { success: false, reason: 'not_found' };

    // Duplicate Check
    if (participant.completedSurveyIds.includes(surveyId)) {
      return { 
        success: false, 
        reason: 'duplicate', 
        message: 'คุณได้ตอบแบบสอบถามนี้ไปแล้ว ระบบป้องกันการตอบซ้ำ (Duplicate Prevention) ไม่อนุญาตให้ตอบซ้ำ' 
      };
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

    // 1. Update Participant
    setParticipant(prev => ({
      ...prev,
      balance: prev.balance + rewardAmount,
      completedSurveyIds: [...prev.completedSurveyIds, surveyId]
    }));

    // 2. Update Survey Progress
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

    // 3. Add to Ledger
    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'reward',
      title: `ตอบแบบสอบถาม: ${targetSurvey.title}`,
      amount: rewardAmount,
      date: 'วันนี้',
      status: 'Completed'
    };
    setTransactions(prev => [newTx, ...prev]);

    // 4. Update Admin Stats
    setAdminStats(prev => ({
      ...prev,
      completedResponses: prev.completedResponses + 1
    }));

    showToast(`ทำแบบสอบถามสำเร็จ! ได้รับ +฿${rewardAmount} เข้า Balance แล้ว`, 'success');
    return { success: true, reward: rewardAmount };
  };

  // Method: Create Project (for Researcher)
  const createProject = (projectInput) => {
    const totalBudget = projectInput.targetResponses * projectInput.reward;

    if (researcher.balance < totalBudget) {
      return {
        success: false,
        reason: 'insufficient_budget',
        message: `ยอดเงินในบัญชีไม่เพียงพอ (ต้องการ ฿${totalBudget} แต่มี ฿${researcher.balance})`
      };
    }

    // Deduct budget
    setResearcher(prev => ({
      ...prev,
      balance: prev.balance - totalBudget
    }));

    const newProject = {
      id: `proj-${Date.now()}`,
      title: projectInput.title,
      description: projectInput.description,
      researcher: researcher.name,
      researcherId: researcher.id,
      eligibility: projectInput.eligibility || 'นักศึกษา มข. ทุกชั้นปี',
      targetFaculty: projectInput.targetFaculty || 'ทุกคณะ',
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

    showToast(`สร้างโปรเจกต์ "${newProject.title}" สำเร็จ! ปล่อยขึ้น Marketplace แล้ว`, 'success');
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

    setParticipant(initialParticipants);
    setResearcher(initialResearchers);
    setSurveys(initialSurveys);
    setTransactions(initialTransactions);
    setAdminStats(initialAdminStats);

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
        toast,
        showToast,
        completeSurvey,
        createProject,
        requestWithdrawal,
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
