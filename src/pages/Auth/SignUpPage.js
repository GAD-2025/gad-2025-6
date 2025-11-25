import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isButtonEnabled = name.length > 0 && email.length > 0;

  const handleNextClick = () => {
    if (isButtonEnabled) {
      navigate('/signup/password', { state: { name, email } });
    }
  };

  return (
    <PageWrapper>
      <Header>Sign Up</Header>
      <Subtitle>Welcome to TODAK!</Subtitle>

      <InputContainer>
        <InputLabel>Name</InputLabel>
        <StyledInput
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputLabel>E-mail</InputLabel>
        <StyledInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputContainer>

      <NextButton onClick={handleNextClick} disabled={!isButtonEnabled}>
        Next
      </NextButton>
    </PageWrapper>
  );
};

export default SignUpPage;

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

const NextButton = styled.button`
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
