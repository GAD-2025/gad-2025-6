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
import SignUpPage from './pages/Auth/SignUpPage';
import AddDDayPage from './pages/DDay/AddDDayPage'; // Import AddDDayPage
import QuizDetailPage from './pages/DailyQuiz/QuizDetailPage'; // Import QuizDetailPage
import MainLayout from './components/layout/MainLayout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Temporary Navigation for Testing */}
        <nav style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/onboarding">Onboarding</Link></li>
            <li><Link to="/daily-quiz">Daily Quiz</Link></li>
            <li><Link to="/dday">D-Day</Link></li>
            <li><Link to="/dday/add">Add D-Day</Link></li> {/* Add link for AddDDayPage */}
            <li><Link to="/slow-letter">Slow Letter</Link></li>
            <li><Link to="/my-page">My Page</Link></li>
          </ul>
        </nav>

        <Routes>
          {/* Authentication & Onboarding Routes (without MainLayout) */}
          <Route path="/signup" element={<SignUpPage />} />
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