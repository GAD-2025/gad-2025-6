import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup, login as apiLogin } from '../../api/auth'; // Import signup and login APIs
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook from AuthContext

const PasswordSignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Get login function from AuthContext
  const { name, email } = location.state || {};
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const isButtonEnabled = password.length > 0 && passwordConfirmation.length > 0;

  const handleSignUpClick = async () => {
    if (!isButtonEnabled) return;

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }
    setError('');

    try {
      const signupResponse = await signup(name, email, password);
      if (!signupResponse.success) {
        setError(signupResponse.message || "Sign up failed. Please try again.");
        return;
      }

      // Automatically log in the user after successful signup
      const loginResponse = await apiLogin(email, password);
      if (loginResponse.success) {
        login(loginResponse.user); // Update auth context
        navigate('/'); // Navigate to home page
      } else {
        setError(loginResponse.message || "Login failed after sign up.");
        // If auto-login fails, redirect to sign-in page so they can log in manually
        navigate('/signin');
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <PageWrapper>
      <Header>Password</Header>
      <Subtitle>Please set a password.</Subtitle>

      <InputContainer>
        <InputLabel>Password</InputLabel>
        <StyledInput
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputLabel>Password confirmation</InputLabel>
        <StyledInput
          type="password"
          placeholder="Confirm your password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>

      <SignUpButton onClick={handleSignUpClick} disabled={!isButtonEnabled}>
        Complete
      </SignUpButton>
    </PageWrapper>
  );
};


export default PasswordSignUpPage;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-family: 'Pretendard', sans-serif;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  height: 100vh;
  background-color: white;
  position: relative;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #292929;
  margin-bottom: 10px;
  font-family: 'Pretendard', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #9E9FAD;
  margin-bottom: 40px;
  font-family: 'Pretendard', sans-serif;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #292929;
  font-weight: 600;
  font-family: 'Pretendard', sans-serif;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;

  &:focus {
    outline: none;
    border-color: #FFC90F;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 18px;
  background-color: ${({ disabled }) => (disabled ? '#D5D5D5' : '#FF69B4')}; // Gray when disabled, Pink when enabled
  color: white;
  border: none;
  border-radius: 28px;
  font-size: 20px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  position: absolute;
  bottom: 40px;
  font-family: 'Pretendard', sans-serif;
  transition: background-color 0.3s;
`;
