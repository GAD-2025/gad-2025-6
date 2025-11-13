import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import HomePage from './pages/Home/HomePage';
import DDayPage from './pages/DDay/DDayPage';
import SlowLetterPage from './pages/SlowLetter/SlowLetterPage';
import MyPage from './pages/MyPage/MyPage';
import DailyQuizPage from './pages/DailyQuiz/DailyQuizPage';
import CreateQuizPage from './pages/DailyQuiz/CreateQuizPage';
import MainLayout from './components/layout/MainLayout';

function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(
    () => JSON.parse(localStorage.getItem('isOnboardingComplete')) || false
  );

  useEffect(() => {
    localStorage.setItem('isOnboardingComplete', JSON.stringify(isOnboardingComplete));
  }, [isOnboardingComplete]);

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!isOnboardingComplete ? (
            <Route path="*" element={<OnboardingPage onComplete={handleOnboardingComplete} />} />
          ) : (
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dday" element={<DDayPage />} />
              <Route path="/slow-letter" element={<SlowLetterPage />} />
              <Route path="/my-page" element={<MyPage />} />
              <Route path="/daily-quiz" element={<DailyQuizPage />} />
              <Route path="/create-quiz" element={<CreateQuizPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;