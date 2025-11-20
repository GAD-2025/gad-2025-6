import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const WaitingForPartnerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const myCode = location.state?.myCode || '...'; // Get code from route state

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <PageWrapper>
      <Spinner />
      <Header>Waiting for your partner...</Header>
      <Subtitle>Share your code with them to connect.</Subtitle>

      <MyCodeDisplay>
        <span>Your Code: <strong>{myCode}</strong></span>
      </MyCodeDisplay>

      <CancelButton onClick={handleGoBack}>Cancel</CancelButton>
    </PageWrapper>
  );
};

export default WaitingForPartnerPage;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  height: 100vh;
  background-color: white;
  position: relative;
  text-align: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #FFC90F;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
  margin-bottom: 30px;
`;

const Header = styled.h1`
  font-size: 28px;
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

const MyCodeDisplay = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  background-color: #FAFAFA;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  color: #292929;
  margin-bottom: 40px;

  strong {
    font-weight: bold;
    color: #FFC90F;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 18px;
  background-color: #D5D5D5;
  color: white;
  border: none;
  border-radius: 28px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  font-family: 'Pretendard', sans-serif;

  &:hover {
    background-color: #b0b0b0;
  }
`;
