export const kkuFaculties = [
  'ทุกคณะในมหาวิทยาลัยขอนแก่น',
  'คณะบริหารธุรกิจและการบัญชี (KKUBS)',
  'คณะวิศวกรรมศาสตร์',
  'คณะแพทยศาสตร์',
  'คณะพยาบาลศาสตร์',
  'คณะทันตแพทยศาสตร์',
  'คณะเภสัชศาสตร์',
  'คณะสาธารณสุขศาสตร์',
  'คณะเทคนิคการแพทย์',
  'คณะสัตวแพทยศาสตร์',
  'คณะเกษตรศาสตร์',
  'คณะวิทยาศาสตร์',
  'คณะเทคโนโลยี',
  'คณะสถาปัตยกรรมศาสตร์',
  'คณะมนุษยศาสตร์และสังคมศาสตร์',
  'คณะศึกษาศาสตร์',
  'คณะศิลปกรรมศาสตร์',
  'คณะเศรษฐศาสตร์',
  'วิทยาลัยการปกครองท้องถิ่น (COLA)',
  'วิทยาลัยนานาชาติ (KKUIC)'
];

export const residenceZones = [
  'ทุกพื้นที่รอบ มข.',
  'หอพักใน มข. (หอพักนักศึกษา)',
  'ย่านกังสดาล',
  'ย่านหลังมอ (โคลัมโบ / ประตูดินแดง)',
  'ย่านโคลัมโบ',
  'ในเขตเทศบาลนครขอนแก่น',
  'บ้านพักส่วนตัว / นอกเขตมหาวิทยาลัย'
];

export const initialParticipants = {
  id: 'usr-max',
  name: 'Max (วรเมธ)',
  role: 'Participant',
  university: 'Khon Kaen University',
  faculty: 'คณะบริหารธุรกิจและการบัญชี (KKUBS)',
  major: 'Marketing (การตลาด)',
  degree: 'ระดับปริญญาตรี',
  year: 'ชั้นปีที่ 3',
  studentId: '653040xxx-x',
  gender: 'ชาย',
  age: 21,
  birthYear: '2548',
  residenceZone: 'ย่านกังสดาล',
  monthlyExpense: '5,000 - 8,000 บาท',
  primaryTransport: 'รถจักรยานยนต์ส่วนตัว',
  deliveryApp: 'LINE MAN',
  verificationStatus: 'Verified', // 'Verified' | 'Pending' | 'Unverified'
  idCardNumber: '1-4099-01289-44-1',
  idCardImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=400&q=80',
  balance: 146,
  completedSurveyIds: []
};

export const initialResearchers = {
  id: 'usr-kku-lab',
  name: 'KKU Research Lab (รศ.ดร. นภนต์)',
  role: 'Researcher',
  affiliation: 'Khon Kaen University',
  department: 'ศูนย์วิจัยพฤติกรรมผู้บริโภค มข.',
  email: 'research.lab@kku.ac.th',
  balance: 1250, // Credit / Baht for funding surveys
};

export const initialSurveys = [
  {
    id: 'proj-1',
    title: 'KKU Student Food Delivery Behavior',
    description: 'สำรวจพฤติกรรมการสั่งอาหารผ่านแอปพลิเคชันเดลิเวอรี (Grab, LINE MAN, ShopeeFood) ของนักศึกษามหาวิทยาลัยขอนแก่น ทั้งความถี่ ยอดใช้จ่ายต่อมื้อ และช่วงเวลาที่สั่งบ่อยที่สุด',
    researcher: 'KKU Research Lab',
    researcherId: 'usr-kku-lab',
    surveyType: 'external_google_forms',
    surveyUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfDEMO-KKU-FOOD/viewform',
    completionCode: 'KKU-FOOD-2026',
    minimumTimeSeconds: 15,
    eligibility: 'นักศึกษา มข. พักย่านกังสดาล/หลังมอ',
    targetFaculty: 'ทุกคณะในมหาวิทยาลัยขอนแก่น',
    targetResidence: 'ย่านกังสดาล',
    reward: 2,
    estimatedTime: '4 นาที',
    targetResponses: 400,
    completedResponses: 267,
    status: 'Active',
    budget: 800,
    category: 'Consumer Behavior',
    questionsCount: 5,
    sampleQuestions: [
      { id: 1, text: 'คุณใช้บริการ Food Delivery บ่อยแค่ไหนต่อสัปดาห์?', options: ['1-2 ครั้ง', '3-4 ครั้ง', '5 ครั้งขึ้นไป', 'แทบไม่ได้ใช้เลย'] },
      { id: 2, text: 'แอปพลิเคชันเดลิเวอรีที่คุณใช้เป็นหลักใน มข. คือแอปใด?', options: ['LINE MAN', 'Grab', 'ShopeeFood', 'Robinhood'] },
      { id: 3, text: 'ค่าใช้จ่ายเฉลี่ยต่อมื้อที่คุณสั่งเดลิเวอรี?', options: ['ต่ำกว่า 80 บาท', '80 - 150 บาท', '150 - 250 บาท', 'มากกว่า 250 บาท'] },
      { id: 4, text: 'ปัจจัยสำคัญที่สุดในการเลือกสั่งอาหารคืออะไร?', options: ['โปรโมชัน / โค้ดส่งฟรี', 'ความรวดเร็วในการส่ง', 'มีร้านแถวกังสดาล/หลังมอที่ชอบ', 'ราคาอาหารตามจริง'] }
    ]
  },
  {
    id: 'proj-2',
    title: 'Student Mobile Banking Usage & Security Trust',
    description: 'การศึกษาทัศนคติและความไว้วางใจในการทำธุรกรรมโมบายแบงก์กิ้ง รวมถึงฟีเจอร์สแกนใบหน้าและป้องกันมิจฉาชีพ',
    researcher: 'Fintech Academic Group',
    researcherId: 'usr-fintech',
    surveyType: 'external_google_forms',
    surveyUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfDEMO-FINTECH/viewform',
    completionCode: 'KKU-BANK-7712',
    minimumTimeSeconds: 15,
    eligibility: 'KKU Students',
    targetFaculty: 'คณะบริหารธุรกิจและการบัญชี (KKUBS)',
    targetResidence: 'ทุกพื้นที่รอบ มข.',
    reward: 3,
    estimatedTime: '3 นาที',
    targetResponses: 200,
    completedResponses: 200,
    status: 'Completed',
    budget: 600,
    category: 'Finance',
    questionsCount: 4,
    sampleQuestions: [
      { id: 1, text: 'ธนาคารหลักที่คุณใช้ทำธุรกรรมเป็นประจำ?', options: ['K PLUS (กสิกร)', 'SCB EASY (ไทยพาณิชย์)', 'Krungthai NEXT (กรุงไทย)', 'TTB Touch (ทีทีบี)'] }
    ]
  },
  {
    id: 'proj-3',
    title: 'Campus Lifestyle & Entertainment Preferences',
    description: 'สำรวจรูปแบบการใช้ชีวิตยามว่าง สถานที่สังสรรค์ยอดนิยมรอบ มข. (กังสดาล, โคลัมโบ, หลังมอ) และพฤติกรรมการรับชมสตรีมมิ่ง',
    researcher: 'KKU Media & CommArts',
    researcherId: 'usr-media',
    surveyType: 'native',
    minimumTimeSeconds: 10,
    eligibility: 'KKU Students Age 18–24',
    targetFaculty: 'ทุกคณะในมหาวิทยาลัยขอนแก่น',
    targetResidence: 'ทุกพื้นที่รอบ มข.',
    reward: 5,
    estimatedTime: '7 นาที',
    targetResponses: 150,
    completedResponses: 54,
    status: 'Active',
    budget: 750,
    category: 'Lifestyle',
    questionsCount: 6,
    sampleQuestions: [
      { id: 1, text: 'ย่านรอบ มข. ที่คุณชอบไปนั่งชิลหรืออ่านหนังสือมากที่สุด?', options: ['กังสดาล', 'หลังมอ', 'โคลัมโบ', 'ศูนย์อาหารคอมเพล็กซ์'] },
      { id: 2, text: 'บริการสตรีมมิ่งที่คุณสมัครสมาชิกและดูบ่อยที่สุด?', options: ['Netflix', 'YouTube Premium', 'Disney+ Hotstar', 'Spotify'] },
      { id: 3, text: 'ช่วงเวลาที่คุณสะดวกพักผ่อนสังสรรค์มากที่สุด?', options: ['วันศุกร์ตอนเย็น', 'วันเสาร์-อาทิตย์', 'ช่วงหลังสอบเสร็จ'] }
    ]
  },
  {
    id: 'proj-4',
    title: 'KKU Campus Transportation & Shuttle Bus Study',
    description: 'ประเมินความพึงพอใจการเดินทางภายในมหาวิทยาลัย การใช้งานรถบัสกะป้อ KST และการใช้จักรยาน/มอเตอร์ไซค์ไฟฟ้า',
    researcher: 'Smart Campus Initiative',
    researcherId: 'usr-smart',
    surveyType: 'native',
    minimumTimeSeconds: 10,
    eligibility: 'นักศึกษาที่เดินทางใน มข.',
    targetFaculty: 'ทุกคณะในมหาวิทยาลัยขอนแก่น',
    targetResidence: 'ทุกพื้นที่รอบ มข.',
    reward: 2,
    estimatedTime: '4 นาที',
    targetResponses: 100,
    completedResponses: 63,
    status: 'Active',
    budget: 200,
    category: 'Transportation',
    questionsCount: 4,
    sampleQuestions: [
      { id: 1, text: 'พาหนะหลักที่คุณใช้เดินทางไปเรียนในแต่ละวัน?', options: ['รถจักรยานยนต์ส่วนตัว', 'รถ Shuttle Bus มข. (KST)', 'รถยนต์ส่วนตัว', 'เดิน'] },
      { id: 2, text: 'ความพึงพอใจต่อความถี่และความตรงต่อเวลาของ Shuttle Bus?', options: ['พึงพอใจมาก', 'ปานกลาง', 'ควรปรับปรุงเพิ่มรอบช่วงชั่วโมงเร่งด่วน'] }
    ]
  }
];

export const initialKYCQueue = [
  {
    id: 'kyc-1',
    participantId: 'usr-sudarat',
    name: 'สุดารัตน์ พรมแก้ว',
    studentId: '663020112-4',
    faculty: 'คณะวิศวกรรมศาสตร์',
    year: 'ชั้นปีที่ 2',
    idCardNumber: '1-4001-00234-55-9',
    submittedAt: '15 นาทีที่แล้ว',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    status: 'Pending'
  },
  {
    id: 'kyc-2',
    participantId: 'usr-thanakorn',
    name: 'ธนกร สัจจะพิทักษ์',
    studentId: '643040089-1',
    faculty: 'คณะเศรษฐศาสตร์',
    year: 'ชั้นปีที่ 4',
    idCardNumber: '3-4099-00123-11-2',
    submittedAt: '1 ชั่วโมงที่แล้ว',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'Pending'
  }
];

export const initialTransactions = [
  { id: 'tx-1', type: 'reward', title: 'Survey: Student Mobile Banking Research', amount: 3, date: '28 ก.ย. 2026', status: 'Completed' },
  { id: 'tx-2', type: 'reward', title: 'Survey: Campus Transportation Pulse', amount: 2, date: '25 ก.ย. 2026', status: 'Completed' },
  { id: 'tx-3', type: 'withdraw', title: 'ถอนเงินผ่านพร้อมเพย์ (PromptPay)', amount: -50, fee: 5, netAmount: 45, date: '20 ก.ย. 2026', status: 'Completed' },
  { id: 'tx-4', type: 'reward', title: 'Survey: KKU Library Facility Study', amount: 4, date: '15 ก.ย. 2026', status: 'Completed' }
];

export const initialAdminStats = {
  totalParticipants: 1284,
  totalResearchers: 87,
  activeProjects: 36,
  completedResponses: 8542,
  pendingWithdrawals: 19,
  fraudFlags: 7,
  pendingReviewProjects: 3
};
