import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import HomePage from './pages/Home/HomePage';
import DDayPage from './pages/DDay/DDayPage';
import SlowLetterPage from './pages/SlowLetter/SlowLetterPage';
import MyPage from './pages/MyPage/MyPage';
import DailyQuizPage from './pages/DailyQuiz/DailyQuizPage';
import CreateQuizPage from './pages/DailyQuiz/CreateQuizPage';
import QuizDetailPage from './pages/DailyQuiz/QuizDetailPage';
import MainLayout from './components/layout/MainLayout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dday" element={<DDayPage />} />
            <Route path="/slow-letter" element={<SlowLetterPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/daily-quiz" element={<DailyQuizPage />} />
            <Route path="/daily-quiz/:quizId" element={<QuizDetailPage />} />
            <Route path="/create-quiz" element={<CreateQuizPage />} />
            <Route path="*" element={<Navigate to="/daily-quiz" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;