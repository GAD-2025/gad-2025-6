import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 390px;
  left: 0px;
  top: 0px;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 408px;
  display: inline-flex;
`;

const HeaderSection = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
`;

const StatusBar = styled.div`
  align-self: stretch;
  height: 44px;
  position: relative;
  overflow: hidden;
  /* Assuming data attributes are for styling, not direct React props */
`;

const WifiIcon = styled.div`
  width: 17.48px;
  height: 12.62px;
  left: 314.26px;
  top: 17.48px;
  position: absolute;
  background: var(--Light-Ink, black);
`;

const BatteryIcon = styled.div`
  width: 25.83px;
  height: 12.14px;
  left: 337.56px;
  top: 17.48px;
  position: absolute;
  & > div {
    width: 19.61px;
    height: 8.40px;
    left: 1.87px;
    top: 1.87px;
    position: absolute;
    background: var(--Light-Ink, black);
  }
`;

const TimeText = styled.div`
  left: 36.87px;
  top: 15.54px;
  position: absolute;
  text-align: center;
  color: var(--Light-Ink, black);
  font-size: 17.48px;
  font-family: SF Pro Display;
  font-weight: 600;
  line-height: 17.48px;
  word-wrap: break-word;
`;

const TopBar = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  display: flex;
`;

const TopBarDefault = styled.div`
  align-self: stretch;
  height: 44px;
  position: relative;
  overflow: hidden;
`;

const ArrowLeftIcon = styled.div`
  width: 24px;
  height: 24px;
  left: 20px;
  top: 10.50px;
  position: absolute;
  & > div {
    width: 20px;
    height: 13px;
    left: 2px;
    top: 5.50px;
    position: absolute;
    background: var(--Grayscale-900, #1A1B1E);
  }
`;

const PageTitle = styled.div`
  left: 122px;
  top: 10px;
  position: absolute;
  text-align: center;
  color: var(--Black, black);
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
`;

const FormSection = styled.div`
  width: 350px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  display: flex;
`;

const InputGroup = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: flex;
`;

const InputLabel = styled.div`
  align-self: stretch;
  color: #84AF25;
  font-size: 24px;
  font-family: Pangolin;
  font-weight: 400;
  word-wrap: break-word;
`;

const InputField = styled.div`
  width: 350px;
  height: 56px;
  padding: 18px;
  background: white;
  overflow: hidden;
  border-radius: 20px;
  outline: 1px #EAEAEA solid;
  outline-offset: -1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
`;

const InputPlaceholder = styled.div`
  flex: 1 1 0;
  align-self: stretch;
  color: #DBDBDB;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 400;
  word-wrap: break-word;
`;

const CalendarIcon = styled.div`
  width: 20px;
  height: 22px;
  background: #404048;
`;

const SaveButton = styled.div`
  width: 350px;
  padding-left: 74px;
  padding-right: 74px;
  padding-top: 18px;
  padding-bottom: 18px;
  background: #D5D5D5;
  overflow: hidden;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
`;

const SaveButtonText = styled.div`
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #F1F1F1;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
`;

const BottomBar = styled.div`
  align-self: stretch;
  height: 36px;
  position: relative;
`;

const BottomBarIndicator = styled.div`
  width: 134px;
  height: 5px;
  left: 128px;
  top: 23px;
  position: absolute;
  background: black;
  border-radius: 100px;
`;


function AddDDayPage() {
  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <StatusBar>
            <WifiIcon />
            <BatteryIcon>
              <div />
            </BatteryIcon>
            <TimeText>19:02</TimeText>
          </StatusBar>
          <TopBar>
            <TopBarDefault>
              <ArrowLeftIcon>
                <div />
              </ArrowLeftIcon>
              <PageTitle>Add New D-day</PageTitle>
            </TopBarDefault>
            <FormSection>
              <InputGroup>
                <InputLabel>Event Name</InputLabel>
                <InputField>
                  <InputPlaceholder>Title of your letter</InputPlaceholder>
                </InputField>
              </InputGroup>
              <InputGroup>
                <InputLabel>Target Date</InputLabel>
                <InputField>
                  <InputPlaceholder>YYYY.MM.DD</InputPlaceholder>
                  <CalendarIcon />
                </InputField>
              </InputGroup>
              <SaveButton>
                <SaveButtonText>Save</SaveButtonText>
              </SaveButton>
            </FormSection>
          </TopBar>
        </HeaderSection>
        <BottomBar>
          <BottomBarIndicator />
        </BottomBar>
      </ContentWrapper>
    </PageContainer>
  );
}

export default AddDDayPage;
