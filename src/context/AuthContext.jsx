import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'kku_survey_auth_session_v3';
const USERS_STORAGE_KEY = 'kku_survey_registered_users_v3';

// Default initial accounts for seamless immediate use:
const defaultUsers = [
  {
    id: 'usr-max-student',
    email: 'worameth.m@kkumail.com',
    password: 'password123',
    full_name: 'วรเมธ นครินทร์ (Max)',
    student_id: '653040182-3',
    university: 'มหาวิทยาลัยขอนแก่น',
    faculty: 'คณะบริหารธุรกิจและการบัญชี (KKUBS)',
    major: 'Marketing (การตลาด)',
    year_of_study: 'ชั้นปีที่ 3',
    gender: 'ชาย',
    age: 21,
    residence_zone: 'ย่านกังสดาล',
    monthly_expense: '5,000 - 8,000 บาท',
    primary_transport: 'รถจักรยานยนต์ส่วนตัว',
    delivery_app: 'LINE MAN',
    verification_status: 'verified', // 'unverified' | 'pending' | 'verified'
    id_card_number: '1-4099-01289-44-1',
    id_card_image_url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=400&q=80',
    reward_balance: 146.00,
    research_budget: 1250.00,
    is_admin: false
  },
  {
    id: 'usr-admin-kku',
    email: 'admin@kku.ac.th',
    password: 'adminpassword',
    full_name: 'ผศ.ดร. ภาณุพงศ์ (Admin KKU)',
    student_id: 'STAFF-9021',
    university: 'มหาวิทยาลัยขอนแก่น',
    faculty: 'สำนักนวัตกรรมการเรียนรู้ มข.',
    major: 'Research Administration',
    year_of_study: 'อาจารย์ / บุคลากร',
    gender: 'ชาย',
    age: 38,
    residence_zone: 'ในเขตเทศบาลนครขอนแก่น',
    monthly_expense: '20,000 บาทขึ้นไป',
    primary_transport: 'รถยนต์ส่วนตัว',
    delivery_app: 'Grab',
    verification_status: 'verified',
    id_card_number: '3-4099-00999-11-0',
    id_card_image_url: '',
    reward_balance: 50.00,
    research_budget: 5000.00,
    is_admin: true
  }
];

export const AuthProvider = ({ children }) => {
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultUsers[0]; // Logged in as Max by default
  });

  // Current interface mode inside the unified account: 'participant' | 'researcher'
  const [currentMode, setCurrentMode] = useState('participant');
  const [isLoading, setIsLoading] = useState(false);

  // Sync users list to storage
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersList));
  }, [usersList]);

  // Sync current session to storage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [userProfile]);

  // Switch between Participant Mode and Researcher Mode
  const switchMode = (mode) => {
    setCurrentMode(mode);
  };

  // Login with Email & Password
  const login = async (email, password) => {
    setIsLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          setUserProfile(profile);
          setIsLoading(false);
          return { success: true };
        }
      } catch (err) {
        setIsLoading(false);
        return { success: false, message: err.message };
      }
    }

    // Local persistent database fallback
    await new Promise(r => setTimeout(r, 400));
    const matched = usersList.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    setIsLoading(false);
    if (matched) {
      setUserProfile(matched);
      return { success: true };
    }
    return { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง' };
  };

  // 1-Click Login with Google / KKU Mail
  const loginWithGoogle = async (customEmail) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 500));

    const email = customEmail || 'student.kku@kkumail.com';
    let matched = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!matched) {
      matched = {
        id: `usr-${Date.now()}`,
        email,
        password: 'google-oauth',
        full_name: 'นักศึกษา มข. (KKU Mail)',
        student_id: '663040xxx-x',
        university: 'มหาวิทยาลัยขอนแก่น',
        faculty: 'คณะวิศวกรรมศาสตร์',
        major: 'Computer Engineering',
        year_of_study: 'ชั้นปีที่ 2',
        gender: 'ไม่ระบุ',
        age: 20,
        residence_zone: 'หอพักใน มข. (หอพักนักศึกษา)',
        monthly_expense: '5,000 - 8,000 บาท',
        primary_transport: 'รถ Shuttle Bus มข. (KST)',
        delivery_app: 'LINE MAN',
        verification_status: 'unverified',
        reward_balance: 0.00,
        research_budget: 0.00,
        is_admin: false
      };
      setUsersList(prev => [matched, ...prev]);
    }

    setUserProfile(matched);
    setIsLoading(false);
    return { success: true };
  };

  // Register New Unified User
  const register = async (formData) => {
    setIsLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.full_name
            }
          }
        });
        if (error) throw error;
        if (data?.user) {
          const newProfile = {
            id: data.user.id,
            email: formData.email,
            full_name: formData.full_name,
            student_id: formData.student_id || 'ไม่ระบุ',
            university: 'มหาวิทยาลัยขอนแก่น',
            faculty: formData.faculty || 'คณะบริหารธุรกิจและการบัญชี (KKUBS)',
            major: formData.major || 'ทั่วไป',
            year_of_study: formData.year_of_study || 'ชั้นปีที่ 1',
            gender: formData.gender || 'ไม่ระบุ',
            age: Number(formData.age) || 20,
            residence_zone: formData.residence_zone || 'หอพักใน มข. (หอพักนักศึกษา)',
            monthly_expense: '5,000 - 8,000 บาท',
            primary_transport: 'รถจักรยานยนต์ส่วนตัว',
            delivery_app: 'LINE MAN',
            verification_status: 'unverified',
            reward_balance: 0.00,
            research_budget: 0.00,
            is_admin: false
          };
          await supabase.from('profiles').upsert(newProfile);
          setUserProfile(newProfile);
          setIsLoading(false);
          return { success: true };
        }
      } catch (err) {
        setIsLoading(false);
        return { success: false, message: err.message };
      }
    }

    await new Promise(r => setTimeout(r, 500));

    // Check if email already exists
    const exists = usersList.some(u => u.email.toLowerCase() === formData.email.toLowerCase());
    if (exists) {
      setIsLoading(false);
      return { success: false, message: 'อีเมลนี้ถูกใช้งานแล้วในระบบ กรุณาใช้อีเมลอื่นหรือเข้าสู่ระบบ' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      student_id: formData.student_id || 'ไม่ระบุ',
      university: 'มหาวิทยาลัยขอนแก่น',
      faculty: formData.faculty || 'คณะบริหารธุรกิจและการบัญชี (KKUBS)',
      major: formData.major || 'ทั่วไป',
      year_of_study: formData.year_of_study || 'ชั้นปีที่ 1',
      gender: formData.gender || 'ไม่ระบุ',
      age: Number(formData.age) || 20,
      residence_zone: formData.residence_zone || 'หอพักใน มข. (หอพักนักศึกษา)',
      monthly_expense: '5,000 - 8,000 บาท',
      primary_transport: 'รถจักรยานยนต์ส่วนตัว',
      delivery_app: 'LINE MAN',
      verification_status: 'unverified',
      reward_balance: 0.00,
      research_budget: 0.00,
      is_admin: false,
      created_at: new Date().toISOString()
    };

    setUsersList(prev => [newUser, ...prev]);
    setUserProfile(newUser);
    setIsLoading(false);

    return { success: true };
  };

  // Logout
  const logout = () => {
    setUserProfile(null);
  };

  // Update profile
  const updateUserProfile = (updatedFields) => {
    if (!userProfile) return;
    const next = { ...userProfile, ...updatedFields };
    setUserProfile(next);
    setUsersList(prev => prev.map(u => (u.id === next.id ? next : u)));
  };

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        isAuthenticated: Boolean(userProfile),
        isAdmin: Boolean(userProfile?.is_admin),
        currentMode,
        switchMode,
        login,
        loginWithGoogle,
        register,
        logout,
        updateUserProfile,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
