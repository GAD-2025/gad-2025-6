import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import bucket from '../../assets/images/mypage-bucket.png';
import quiz from '../../assets/images/mypage-quiz.png';
import letter from '../../assets/images/mypage-letter.png';
import setting from '../../assets/images/mypage-user.png';

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
  };

  return (
    <PageWrapper>
      <Header>My Page</Header>

      <CardGrid>
        <Card bgColor="#EAD7C4" onClick={() => handleCardClick('/slow-letter')}>
          <CardTitle color="#A17E66">Slow Letter</CardTitle>
          <CardImageWrapper>
            <CardImage src={letter} />
          </CardImageWrapper>
        </Card>
        <Card bgColor="#FFF8E2" onClick={() => handleCardClick('/daily-quiz')}>
          <CardTitle color="#FFC90F">Daily Quiz</CardTitle>
          <CardImageWrapper>
            <CardImage src={quiz} />
          </CardImageWrapper>
        </Card>
        <Card bgColor="#F4F8EA" onClick={() => handleCardClick('/dday')}>
          <CardTitle color="#84AF25">BucketList</CardTitle>
          <CardImageWrapper>
            <CardImage src={bucket} />
          </CardImageWrapper>
        </Card>
        <Card bgColor="#FFF3F3" onClick={() => handleCardClick('/my-page/settings')}>
          <CardTitle color="#D58699">Settings</CardTitle>
          <CardImageWrapper>
            <CardImage src={setting} />
          </CardImageWrapper>
        </Card>
      </CardGrid>
    </PageWrapper>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const Header = styled.h1`
  color: #000;
  font-family: Pangolin;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  margin: 0;
`;

const Card = styled.div`
  height: 180px;
  border-radius: 16px;
  background: ${(props) => props.bgColor || '#fff'};
  cursor: pointer;
  padding: 22px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.div`
  overflow: hidden;
  color: ${(props) => props.color || '#000'};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pangolin;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

const CardImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CardImage = styled.img`
  height: 100px;
  width: 100px;
  aspect-ratio: 1/1;
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
