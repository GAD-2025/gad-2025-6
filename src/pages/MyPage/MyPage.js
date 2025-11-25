import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleLogin = () => {
    navigate('/signin');
  }

  return (
    <PageWrapper>
      <Header>My Page</Header>
      
      {user ? (
        <UserInfoCard>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfoCard>
      ) : (
        <UserInfoCard>
            <p>You are not logged in.</p>
            <LoginButton onClick={handleLogin}>Go to Login</LoginButton>
        </UserInfoCard>
      )}

      <CardGrid>
        <Card bgColor="#EAD7C4" onClick={() => handleCardClick('/slow-letter')}>
          <CardTitle color="#A17E66">Slow Letter</CardTitle>
          <CardImage src="https://placehold.co/121x121" />
        </Card>
        <Card bgColor="#FFF8E2" onClick={() => handleCardClick('/daily-quiz')}>
          <CardTitle color="#FFC90F">Daily Quiz</CardTitle>
          <CardImage src="https://placehold.co/121x121" />
        </Card>
        <Card bgColor="#F4F8EA" onClick={() => handleCardClick('/dday')}>
          <CardTitle color="#84AF25">BucketList</CardTitle>
          <CardImage src="https://placehold.co/121x121" />
        </Card>
         <Card bgColor="#FFF3F3" onClick={() => handleCardClick('/my-page/settings')}>
          <CardTitle color="#D58699">Settings</CardTitle>
          <CardImage src="https://placehold.co/121x121" />
        </Card>
      </CardGrid>
    </PageWrapper>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  padding: 20px;
  padding-top: 60px;
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 24px;
  font-family: 'Pangolin', sans-serif;
  margin-bottom: 20px;
`;

const UserInfoCard = styled.div`
  background-color: #f3f4f6;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const UserName = styled.h2`
  font-size: 22px;
  font-weight: bold;
  font-family: 'Pretendard', sans-serif;
  margin: 0 0 5px 0;
`;

const UserEmail = styled.p`
  font-size: 16px;
  color: #6b7280;
  font-family: 'Pretendard', sans-serif;
  margin: 0 0 15px 0;
`;

const LogoutButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

const LoginButton = styled(LogoutButton)`
    background-color: #3b82f6;
    &:hover {
        background-color: #2563eb;
    }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Card = styled.div`
  background: ${({ bgColor }) => bgColor || '#FFF3F3'};
  border-radius: 16px;
  padding: 20px;
  position: relative;
  height: 190px;
  cursor: pointer;
  overflow: hidden;
`;

const CardTitle = styled.div`
  color: ${({ color }) => color || '#D58699'};
  font-size: 20px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
`;

const CardImage = styled.img`
  width: 121px;
  height: 121px;
  position: absolute;
  bottom: -20px;
  right: -20px;
`;