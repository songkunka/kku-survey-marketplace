import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/common/Toast';
import { KYCModal } from './components/participant/KYCModal';
import { DemographicModal } from './components/participant/DemographicModal';

// Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

import { ParticipantDashboard } from './pages/participant/ParticipantDashboard';
import { SurveyMarketplace } from './pages/participant/SurveyMarketplace';
import { RewardsPage } from './pages/participant/RewardsPage';
import { ParticipantProfile } from './pages/participant/ParticipantProfile';

import { ResearcherDashboard } from './pages/researcher/ResearcherDashboard';
import { CreateProjectPage } from './pages/researcher/CreateProjectPage';
import { ProjectDetailPage } from './pages/researcher/ProjectDetailPage';
import { BillingPage } from './pages/researcher/BillingPage';

import { AdminDashboard } from './pages/admin/AdminDashboard';

const MainApp = () => {
  const { isAuthenticated, currentMode, isAdmin } = useAuth();
  
  // Navigation View: 'landing' | 'login' | 'register' | 'surveys' | 'dashboard' | 'rewards' | 'profile' | 'projects' | 'create' | 'project-detail' | 'billing' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return isAuthenticated ? 'surveys' : 'landing';
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // If user is not authenticated and views guest pages
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onNavigate={setCurrentView} currentTab={currentView} />
        <main style={{ flex: 1 }}>
          {currentView === 'login' && <LoginPage onNavigate={setCurrentView} />}
          {currentView === 'register' && <RegisterPage onNavigate={setCurrentView} />}
          {currentView !== 'login' && currentView !== 'register' && (
            <LandingPage onNavigate={setCurrentView} />
          )}
        </main>
        <Toast />
      </div>
    );
  }

  // If authenticated user is on landing/login/register, auto route to dashboard
  const activeTab = (currentView === 'landing' || currentView === 'login' || currentView === 'register')
    ? (currentMode === 'participant' ? 'surveys' : 'projects')
    : currentView;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        onNavigate={setCurrentView}
        currentTab={activeTab}
        onOpenKYC={() => setShowKYCModal(true)}
      />

      <div className="layout-container">
        <Sidebar activeTab={activeTab} setActiveTab={setCurrentView} />

        <main className="layout-content">
          {/* Participant Views */}
          {activeTab === 'dashboard' && <ParticipantDashboard setActiveTab={setCurrentView} />}
          {activeTab === 'surveys' && <SurveyMarketplace />}
          {activeTab === 'rewards' && <RewardsPage />}
          {activeTab === 'profile' && <ParticipantProfile />}

          {/* Researcher Views */}
          {activeTab === 'projects' && (
            <ResearcherDashboard
              setActiveTab={setCurrentView}
              setSelectedProject={setSelectedProject}
            />
          )}
          {activeTab === 'create' && <CreateProjectPage setActiveTab={setCurrentView} />}
          {activeTab === 'project-detail' && (
            <ProjectDetailPage
              project={selectedProject}
              setActiveTab={setCurrentView}
            />
          )}
          {activeTab === 'billing' && <BillingPage />}

          {/* Admin View */}
          {activeTab === 'admin' && (
            isAdmin ? <AdminDashboard /> : <ParticipantDashboard setActiveTab={setCurrentView} />
          )}
        </main>
      </div>

      {showKYCModal && <KYCModal onClose={() => setShowKYCModal(false)} />}
      {showDemoModal && <DemographicModal onClose={() => setShowDemoModal(false)} />}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}
