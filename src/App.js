import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'; // Re-added Link
import './App.css';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import HomePage from './pages/Home/HomePage';
import DDayPage from './pages/DDay/DDayPage';
import SlowLetterPage from './pages/SlowLetter/SlowLetterPage';
import MyPage from './pages/MyPage/MyPage';
import DailyQuizPage from './pages/DailyQuiz/DailyQuizPage';
import CreateQuizPage from './pages/DailyQuiz/CreateQuizPage';
import SignInPage from './pages/Auth/SignInPage'; // Changed from SignUpPage
import SignUpPage from './pages/Auth/SignUpPage'; // Added for the new page
import PasswordSignUpPage from './pages/Auth/PasswordSignUpPage'; // Added for the password step
import InvitationCodePage from './pages/Auth/InvitationCodePage'; // Added for the invitation code step
import WaitingForPartnerPage from './pages/Auth/WaitingForPartnerPage'; // Added for the waiting step
import AddDDayPage from './pages/DDay/AddDDayPage'; // Import AddDDayPage
import QuizDetailPage from './pages/DailyQuiz/QuizDetailPage'; // Import QuizDetailPage
import MainLayout from './components/layout/MainLayout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>


        <Routes>
          {/* Authentication & Onboarding Routes (without MainLayout) */}
          <Route path="/signin" element={<SignInPage />} /> {/* Changed from /signup */}
          <Route path="/signup" element={<SignUpPage />} /> {/* Added for new page */}
          <Route path="/signup/password" element={<PasswordSignUpPage />} /> {/* Added for password step */}
          <Route path="/signup/invitation" element={<InvitationCodePage />} /> {/* Added for invitation code step */}
          <Route path="/signup/waiting" element={<WaitingForPartnerPage />} /> {/* Added for waiting step */}
          {/* <Route path="/user-info" element={<UserInfoPage />} /> Removed route */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Main Application Routes (with MainLayout) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dday" element={<DDayPage />} />
            <Route path="/dday/add" element={<AddDDayPage />} /> {/* Add route for AddDDayPage */}
            <Route path="/slow-letter" element={<SlowLetterPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/daily-quiz" element={<DailyQuizPage />} />
            <Route path="/daily-quiz/:quizId" element={<QuizDetailPage />} />
            <Route path="/create-quiz" element={<CreateQuizPage />} />
            {/* Fallback route for main app */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;