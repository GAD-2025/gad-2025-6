import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  cursor: pointer;
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
  text-align: left;
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

const StyledInput = styled.input`
  flex: 1 1 0;
  align-self: stretch;
  color: #2C2C2C;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  &::placeholder {
    color: #DBDBDB;
    font-weight: 400;
  }
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
  background: ${(props) => (props.active ? '#84AF25' : '#D5D5D5')};
  overflow: hidden;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
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


function AddBucketListPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const isSaveButtonActive = title.trim() !== '' && targetDate.trim() !== '';

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
              <ArrowLeftIcon onClick={handleBackClick}>
                <div />
              </ArrowLeftIcon>
              <PageTitle>Add New Bucket List</PageTitle>
            </TopBarDefault>
            <FormSection>
              <InputGroup>
                <InputLabel>Bucket List Item</InputLabel>
                <InputField>
                  <StyledInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title of your bucket list item"
                  />
                </InputField>
              </InputGroup>
              <InputGroup>
                <InputLabel>Target Date</InputLabel>
                <InputField>
                  <StyledInput
                    type="text"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    placeholder="YYYY.MM.DD"
                  />
                  <CalendarIcon />
                </InputField>
              </InputGroup>
              <SaveButton active={isSaveButtonActive}>
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

export default AddBucketListPage;
