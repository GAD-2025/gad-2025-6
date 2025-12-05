import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import { getUserById } from '../../api/auth'; // Import getUserById from auth API

const WaitingForPartnerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refreshUser } = useAuth(); // Get user and refreshUser from AuthContext
  const myCode = location.state?.myCode || (user ? user.user_code : '...'); // Use user.user_code if available

  useEffect(() => {
    if (!user || !user.id) {
      // If user is not logged in or user ID is not available, navigate to sign-in
      navigate('/signin');
      return;
    }

    const checkMatchingStatus = async () => {
      try {
        const response = await getUserById(user.id); // Using getUserById to refresh user data
        if (response.success && response.user && response.user.matching_id) {
          // If a matching_id is found, update the context and navigate
          refreshUser(user.id); // Ensure the latest user data with matching_id is in context
          navigate('/onboarding'); // Navigate to onboarding or home
        }
      } catch (error) {
        console.error('Error checking matching status:', error);
      }
    };

    // Poll every 5 seconds
    const intervalId = setInterval(checkMatchingStatus, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [user, navigate, refreshUser]);

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
