import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
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
import SlowLetterDetailPage from './pages/SlowLetter/SlowLetterDetailPage';
import WriteLetterPage from './pages/SlowLetter/WriteLetterPage';
import AddBucketListPage from './pages/DDay/AddBucketListPage';
import BucketListDetailPage from './pages/DDay/BucketListDetailPage';
import EditBucketListPage from './pages/DDay/EditBucketListPage';
import DDayDetailPage from './pages/DDay/DDayDetailPage';
import EditDDayPage from './pages/DDay/EditDDayPage';
import SettingsPage from './pages/MyPage/SettingsPage';
import MainLayout from './components/layout/MainLayout';

import PrivateRoute from './components/common/PrivateRoute';
import { useAuth } from './context/AuthContext';
import RegistrationComplete from './pages/Auth/RegistrationComplete';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Routes>
        {/* Authentication & Onboarding Routes (without MainLayout and PrivateRoute) */}
        <Route element={<MainLayout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup/password" element={<PasswordSignUpPage />} />
          <Route path="/signup/invitation" element={<InvitationCodePage />} />
          <Route path="/signup/waiting" element={<WaitingForPartnerPage />} />
          <Route path="/registration" element={<RegistrationComplete />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        {/* Main Application Routes (with MainLayout) */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dday" element={<DDayPage />} />
            <Route path="/dday/add" element={<AddDDayPage />} />
            <Route path="/dday/add-bucket-list" element={<AddBucketListPage />} />
            <Route path="/dday/bucket-list/edit/:bucketListId" element={<EditBucketListPage />} />
            <Route path="/dday/bucket-list/:bucketListId" element={<BucketListDetailPage />} />
            <Route path="/dday/:ddayId" element={<DDayDetailPage />} />
            <Route path="/dday/edit/:ddayId" element={<EditDDayPage />} />
            <Route path="/slow-letter" element={<SlowLetterPage />} />
            <Route path="/slow-letter/write" element={<WriteLetterPage />} />
            <Route path="/slow-letter/:letterId" element={<SlowLetterDetailPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/my-page/settings" element={<SettingsPage />} />
            <Route path="/daily-quiz" element={<DailyQuizPage />} />
            <Route path="/daily-quiz/:quizId" element={<QuizDetailPage />} />
            <Route path="/create-quiz" element={<CreateQuizPage />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to={user ? '/home' : '/signin'} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;
