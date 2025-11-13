import React from 'react';
<<<<<<< HEAD
import styled from 'styled-components';
import homeBackgroundImage from '../../assets/images/홈배경화면.jpeg';
import BottomNav from '../../components/layout/BottomNav';

const HomePage = () => {
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
          <QuizCard>
            <QuizTitle>Daily Quiz</QuizTitle>
            <QuizQuestion>What is "I miss you." in Korean?</QuizQuestion>
          </QuizCard>
        </CardsWrapper>
      </ContentWrapper>
      <BottomNav />
    </PageWrapper>
=======
import { Link } from 'react-router-dom'; // Import Link
import homeBackgroundImage from '../../assets/images/홈배경화면.jpeg'; // Import the background image

const HomePage = () => {
  return (
    <div style={{width: 390, height: 844, position: 'relative', background: 'white', overflow: 'hidden'}}>
      {/* Background Image */}
      <img style={{width: '100%', height: '100%', position: 'absolute', objectFit: 'cover', objectPosition: 'center'}} src={homeBackgroundImage} alt="Background" />
      {/* Foreground Image - Keep as placeholder for now, as no specific image was provided for this */}
      <img style={{width: 387, height: 258, left: 2, top: 483, position: 'absolute'}} src="https://placehold.co/387x258" alt="Foreground" />
      <div style={{width: 390, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 507, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 15, display: 'flex'}}>
          {/* Content below status bar */}
          <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 11, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 11, display: 'inline-flex'}}>
              <div style={{width: 229, height: 71, position: 'relative', background: '#F4F8EA', overflow: 'hidden', borderRadius: 16}}>
                <div style={{height: 39, left: 19, top: 16, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                  <div style={{color: '#84AF25', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>D-22</div>
                  <div style={{width: 140, height: 39, color: 'black', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>London trip London trip London trip</div>
                </div>
              </div>
              <div style={{width: 110, height: 71, background: '#A17E66', borderRadius: 5}} />
              <div style={{color: 'white', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>New!</div>
              <div style={{width: 27, height: 27, background: '#D83F3F', borderRadius: 9999}} />
              <div style={{color: 'white', fontSize: 17.61, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 23.48, wordWrap: 'break-word'}}>2</div>
              <div style={{width: 27.12, height: 16.08, background: '#F3F4F6', outline: '1px #F3F4F6 solid', outlineOffset: '-0.50px'}} />
            </div>
            <Link to="/daily-quiz" style={{textDecoration: 'none', cursor: 'pointer', alignSelf: 'stretch'}}> {/* Added Link */}
              <div style={{alignSelf: 'stretch', height: 94, position: 'relative', background: '#FFF8E2', overflow: 'hidden', borderRadius: 16}}>
                <div style={{width: 302, height: 54, left: 24, top: 20, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                  <div style={{alignSelf: 'stretch', color: '#FFC90F', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Daily Quiz</div>
                  <div style={{alignSelf: 'stretch', flex: '1 1 0', color: '#979797', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>What is "I miss you." in Korean?</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
>>>>>>> 4feaa5b6be8e936c8ce8eb355cfb1ff58793b4e0
  );
};

export default HomePage;

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