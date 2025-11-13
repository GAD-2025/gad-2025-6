import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BottomNav from '../../components/layout/BottomNav';
import { ReactComponent as PencilIcon } from '../../assets/icons/li_pencil-line.svg';

const DDayPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddDDayClick = () => {
    navigate('/dday/add'); // Navigate to AddDDayPage
  };

  return (
    <PageWrapper>
      <TopNav>
        <Time>19:02</Time>
        <StatusBar>
          <WifiIcon />
          <BatteryIcon>
            <BatteryFill />
          </BatteryIcon>
        </StatusBar>
      </TopNav>
      <ContentWrapper>
        <Header>
          <Title>D-day & Bucket List</Title>
          <TabWrapper>
            <Tab active>D-day</Tab>
            <Tab>Bucket List</Tab>
          </TabWrapper>
        </Header>
        <DDayCard>
          <DDayText>Time Remaining Until Reunion</DDayText>
          <DDayValue>Set D-day</DDayValue>
          <DDaySubText>Enter the date to start the excitement!</DDaySubText>
        </DDayCard>
        <DDayList>
          <DDayItem>
            <DDayItemBar />
            <DDayItemContent>
              <DDayItemInfo>
                <DDayItemDate>December 25, 2025</DDayItemDate>
                <DDayItemTitle>London trip</DDayItemTitle>
              </DDayItemInfo>
              <DDayItemDDay>D-60</DDayItemDDay>
            </DDayItemContent>
          </DDayItem>
          <DDayItem>
            <DDayItemBar />
            <DDayItemContent>
              <DDayItemInfo>
                <DDayItemDate>March 21, 2026</DDayItemDate>
                <DDayItemTitle>Our Anniversary</DDayItemTitle>
              </DDayItemInfo>
              <DDayItemDDay>D-201</DDayItemDDay>
            </DDayItemContent>
          </DDayItem>
          <DDayItem>
            <DDayItemBar />
            <DDayItemContent>
              <DDayItemInfo>
                <DDayItemDate>March 21, 2026</DDayItemDate>
                <DDayItemTitle>Next Visit to Paris</DDayItemTitle>
              </DDayItemInfo>
              <DDayItemDDay>D-201</DDayItemDDay>
            </DDayItemContent>
          </DDayItem>
        </DDayList>
      </ContentWrapper>
      <AddButton onClick={handleAddDDayClick}> {/* Add onClick handler */}
        <PencilIcon style={{ width: 24, height: 24, fill: 'white' }} />
      </AddButton>
      <BottomNav />
    </PageWrapper>
  );
};

export default DDayPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ContentWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.div`
  color: black;
  font-size: 24px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 72px;
`;

const Tab = styled.div`
  width: 106px;
  padding: 14px 37px;
  text-align: center;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => (props.active ? '#84AF25' : '#9E9FAD')};
  border-bottom: ${(props) => (props.active ? '3px #84AF25 solid' : 'none')};
`;

const DDayCard = styled.div`
  width: 350px;
  padding: 24px 54px;
  background: white;
  border-radius: 10px;
  outline: 1px #f0f0f0 solid;
  outline-offset: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const DDayText = styled.div`
  text-align: center;
  color: black;
  font-size: 12px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const DDayValue = styled.div`
  text-align: center;
  color: #84af25;
  font-size: 24px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const DDaySubText = styled.div`
  color: #404048;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const DDayList = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DDayItem = styled.div`
  width: 350px;
  height: 54px;
  position: relative;
`;

const DDayItemBar = styled.div`
  width: 12.68px;
  height: 51.69px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: #9cb06e;
  border-radius: 5.07px;
`;

const DDayItemContent = styled.div`
  width: 347.46px;
  height: 54px;
  padding: 8.24px 6.34px;
  left: 2.54px;
  top: 0px;
  position: absolute;
  background: #f4f8ea;
  border-radius: 5.07px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const DDayItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DDayItemDate = styled.div`
  color: #52555d;
  font-size: 12px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
`;

const DDayItemTitle = styled.div`
  color: black;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const DDayItemDDay = styled.div`
  color: #768554;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const AddButton = styled.div`
  padding: 18px;
  background: #0c0c0c;
  border-radius: 100px;
  position: absolute;
  right: 20px;
  bottom: 120px;
  cursor: pointer;
`;
