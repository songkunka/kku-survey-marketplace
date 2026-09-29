import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/layout/RoleSwitcherBar';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/public/LandingPage';
import { ParticipantDashboard } from './pages/participant/ParticipantDashboard';
import { SurveyMarketplace } from './pages/participant/SurveyMarketplace';
import { RewardsPage } from './pages/participant/RewardsPage';
import { ParticipantProfile } from './pages/participant/ParticipantProfile';

import { ResearcherDashboard } from './pages/researcher/ResearcherDashboard';
import { CreateProjectPage } from './pages/researcher/CreateProjectPage';
import { ProjectDetailPage } from './pages/researcher/ProjectDetailPage';
import { BillingPage } from './pages/researcher/BillingPage';

import { AdminDashboard } from './pages/admin/AdminDashboard';

const MainAppContent = () => {
  const { currentRole } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);

  // If Public Landing Page
  if (currentRole === 'public') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <RoleSwitcherBar />
        <Header />
        <main style={{ flex: 1 }}>
          <LandingPage />
        </main>
        <Toast />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <RoleSwitcherBar />
      <Header />

      <div className="layout-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="layout-content">
          {/* Participant Views */}
          {currentRole === 'participant' && (
            <>
              {activeTab === 'dashboard' && <ParticipantDashboard setActiveTab={setActiveTab} />}
              {activeTab === 'surveys' && <SurveyMarketplace />}
              {activeTab === 'rewards' && <RewardsPage />}
              {activeTab === 'profile' && <ParticipantProfile />}
            </>
          )}

          {/* Researcher Views */}
          {currentRole === 'researcher' && (
            <>
              {(activeTab === 'dashboard' || activeTab === 'projects') && (
                <ResearcherDashboard
                  setActiveTab={setActiveTab}
                  setSelectedProject={setSelectedProject}
                />
              )}
              {activeTab === 'create' && <CreateProjectPage setActiveTab={setActiveTab} />}
              {activeTab === 'project-detail' && (
                <ProjectDetailPage
                  project={selectedProject}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === 'billing' && <BillingPage />}
            </>
          )}

          {/* Admin Views */}
          {currentRole === 'admin' && (
            <AdminDashboard />
          )}
        </main>
      </div>

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
