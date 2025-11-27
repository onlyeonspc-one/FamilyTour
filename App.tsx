import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SchedulePage from './components/SchedulePage';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);

  return (
    <div className="mx-auto max-w-md bg-[#1F1A18] min-h-screen shadow-2xl relative overflow-hidden">
        {/* 
            Container constrained to max-w-md to simulate mobile view on desktop 
            while filling screen on mobile devices.
        */}
      {currentView === ViewState.LANDING && (
        <LandingPage 
          onNavigateDay1={() => setCurrentView(ViewState.SCHEDULE_DAY_1)} 
          onNavigateDay2={() => setCurrentView(ViewState.SCHEDULE_DAY_2)} 
        />
      )}
      
      {currentView === ViewState.SCHEDULE_DAY_1 && (
        <SchedulePage day={1} onBack={() => setCurrentView(ViewState.LANDING)} />
      )}

      {currentView === ViewState.SCHEDULE_DAY_2 && (
        <SchedulePage day={2} onBack={() => setCurrentView(ViewState.LANDING)} />
      )}
    </div>
  );
};

export default App;