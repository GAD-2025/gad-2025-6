import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login as apiLogin } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    try {
      const result = await apiLogin(email, password);
      if (result.success) {
        login(result.user); // Update context state
        navigate('/my-page'); // Navigate to my page on successful login
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const isButtonEnabled = email.length > 0 && password.length > 0;

  return (
    <PageWrapper>
      <Header>TODAK</Header>
      <InputContainer>
        <StyledInput
          type="email"
          placeholder="Write your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Write your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <LoginButton onClick={handleLogin} disabled={!isButtonEnabled}>
        Log In
      </LoginButton>
      <SignUpLink onClick={handleSignUpClick}>Sign up</SignUpLink>
      
      <SocialLoginContainer>
        <Divider>
          <DividerLine />
          <DividerText>Social login</DividerText>
          <DividerLine />
        </Divider>
        <SocialButtons>
            {/* Keeping the social login buttons as they were */}
            <div style={{width: 44, height: 44, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 43, height: 43, left: 0.50, top: 0.50, position: 'absolute', background: 'white'}} />
                <div style={{width: 20, height: 20, left: 12, top: 12, position: 'absolute', background: 'black'}} />
                <div style={{width: 9.60, height: 9.40, left: 22, top: 20.18, position: 'absolute', background: '#4285F4'}} />
                <div style={{width: 15.55, height: 8.10, left: 13.06, top: 23.90, position: 'absolute', background: '#34A853'}} />
                <div style={{width: 4.40, height: 8.98, left: 12, top: 17.51, position: 'absolute', background: '#FBBC04'}} />
                <div style={{width: 15.63, height: 8.10, left: 13.06, top: 12, position: 'absolute', background: '#E94235'}} />
                <div style={{width: 43, height: 43, left: 0.50, top: 0.50, position: 'absolute', outline: '1px var(--Gray-1, #F3F4F6) solid', outlineOffset: '-0.50px'}} />
            </div>
            <div style={{width: 44, height: 44, position: 'relative', background: '#FEE500', overflow: 'hidden', borderRadius: 50}}>
                <div style={{width: 20, height: 20, left: 12, top: 12, position: 'absolute', background: 'var(--kakao-logo, black)'}} />
            </div>
        </SocialButtons>
      </SocialLoginContainer>
    </PageWrapper>
  );
};

export default SignInPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  height: 100vh;
  background-color: white;
  gap: 40px;
`;

const Header = styled.h1`
  font-size: 57.74px;
  font-family: 'Pangolin', sans-serif;
  color: #292929;
  margin-bottom: 40px;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 18px;
  border: 1px solid #EAEAEA;
  border-radius: 20px;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;

  &::placeholder {
    color: #DBDBDB;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 18px;
  background-color: ${({ disabled }) => (disabled ? '#D5D5D5' : '#FF69B4')};
  color: white;
  border: none;
  border-radius: 28px;
  font-size: 20px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const SignUpLink = styled.div`
  color: #1E1E1E;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  margin-top: -20px;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 350px;
  margin-top: 60px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

const DividerLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #9E9FAD;
`;

const DividerText = styled.span`
  color: #9E9FAD;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 16px;
`;
