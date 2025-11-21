import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { Link } from 'react-router-dom'; // Import Link
import homeBackgroundImage from '../../assets/images/홈배경화면.jpeg'; // Import the background image


const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleOnboardingClick = () => {
    navigate('/onboarding');
  };

  return (
    <PageWrapper>
      <BackgroundImage src={homeBackgroundImage} alt="Background" />
      <ContentWrapper>
        <TopNav>
          <Time>19:02</Time>
          <StatusBar>
            <WifiIcon />
            <BatteryIcon>
              <BatteryFill />
            </BatteryIcon>
          </StatusBar>
        </TopNav>
        <CardsWrapper>
          <CardRow>
            <DDayCard>
              <DDayValue>D-22</DDayValue>
              <DDayText>London trip London trip London trip</DDayText>
            </DDayCard>
            <NewLetterCard>
              <NewLetterText>New!</NewLetterText>
              <NewLetterCount>2</NewLetterCount>
            </NewLetterCard>
          </CardRow>
          <Link to="/daily-quiz" style={{ textDecoration: 'none' }}>
            <QuizCard>
              <QuizTitle>Daily Quiz</QuizTitle>
              <QuizQuestion>What is "I miss you." in Korean?</QuizQuestion>
            </QuizCard>
          </Link>
        </CardsWrapper>
      </ContentWrapper>
      <FabWrapper>
        <SignInFab onClick={handleSignInClick}>
          Sign In
        </SignInFab>
        <OnboardingFab onClick={handleOnboardingClick}>
          Onboarding
        </OnboardingFab>
      </FabWrapper>
    </PageWrapper>
  );
};


const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: white;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  object-position: center;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const TopNav = styled.div`
  width: 390px;
  height: 44px;
  position: relative;
  overflow: hidden;
`;

const Time = styled.div`
  position: absolute;
  left: 36.87px;
  top: 15.54px;
  text-align: center;
  color: black;
  font-size: 17.48px;
  font-family: SF Pro Display, sans-serif;
  font-weight: 600;
  line-height: 17.48px;
`;

const StatusBar = styled.div`
  position: absolute;
  right: 14.5px;
  top: 17.48px;
  display: flex;
  gap: 5px;
`;

const WifiIcon = styled.div`
  width: 17.48px;
  height: 12.62px;
  background: black;
`;

const BatteryIcon = styled.div`
  width: 25.83px;
  height: 12.14px;
  position: relative;
`;

const BatteryFill = styled.div`
  width: 19.61px;
  height: 8.4px;
  left: 1.87px;
  top: 1.87px;
  position: absolute;
  background: black;
`;

const CardsWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 11px;
`;

const DDayCard = styled.div`
  width: 229px;
  height: 71px;
  background: #f4f8ea;
  border-radius: 16px;
  padding: 16px 19px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DDayValue = styled.div`
  color: #84af25;
  font-size: 20px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const DDayText = styled.div`
  width: 140px;
  height: 39px;
  color: black;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NewLetterCard = styled.div`
  width: 110px;
  height: 71px;
  background: #a17e66;
  border-radius: 5px;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewLetterText = styled.div`
  font-size: 20px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const NewLetterCount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 27px;
  height: 27px;
  background: #d83f3f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 17.61px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
`;

const QuizCard = styled.div`
  height: 94px;
  background: #fff8e2;
  border-radius: 16px;
  padding: 20px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuizTitle = styled.div`
  color: #ffc90f;
  font-size: 20px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
  line-height: 20px;
`;

const QuizQuestion = styled.div`
  color: #979797;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const FabWrapper = styled.div`
  position: absolute;
  bottom: 108px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SignInFab = styled.div`
  background-color: #0C0C0C;
  color: white;
  border-radius: 100px;
  padding: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const OnboardingFab = styled(SignInFab)`
  background-color: #1E90FF; // A different color to distinguish
`;


export default HomePage;