import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ddayData } from '../../data/ddayData';
import { updateDday } from '../../api/dday';

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
    height: 8.4px;
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
  top: 10.5px;
  position: absolute;
  cursor: pointer;
  & > div {
    width: 20px;
    height: 13px;
    left: 2px;
    top: 5.5px;
    position: absolute;
    background: var(--Grayscale-900, #1a1b1e);
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
  color: #84af25;
  font-size: 24px;
  font-family: Pangolin;
  font-weight: 400;
  word-wrap: break-word;
`;

const InputField = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 18px;
  background: white;
  overflow: hidden;
  border-radius: 20px;
  outline: 1px #eaeaea solid;
  outline-offset: -1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
`;

const StyledInput = styled.input`
  flex: 1 1 0;
  align-self: stretch;
  color: #2c2c2c;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
  border: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  &::placeholder {
    color: #dbdbdb;
    font-weight: 400;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  min-height: 100px;
  color: #2c2c2c;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  box-sizing: border-box;
  overflow-y: auto;
  &::placeholder {
    color: #dbdbdb;
    font-weight: 400;
  }
`;

const CalendarIcon = styled.div`
  width: 20px;
  height: 22px;
  background: #404048;
`;

const SaveButton = styled.div`
  box-sizing: border-box;
  width: 100%;
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
  color: #f1f1f1;
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

function EditDDayPage() {
  const navigate = useNavigate();
  const { ddayId } = useParams();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const itemToEdit = location.state?.item || ddayData.find((d) => d.id === parseInt(ddayId));
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setTargetDate(itemToEdit.date);
      setDescription(itemToEdit.content);
    }
  }, [ddayId, location.state]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    try {
      const ddayUpdateData = {
        title,
        date: targetDate,
        content: description,
      };

      await updateDday(ddayId, ddayUpdateData);
      navigate('/dday');
    } catch (error) {
      console.error('Failed to update D-Day:', error);
      alert('Failed to update D-Day. Please try again.');
    }
  };

  const renderDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <TopBar>
            <TopBarDefault>
              <ArrowLeftIcon onClick={handleBackClick}>
                <div />
              </ArrowLeftIcon>
              <PageTitle>Edit D-Day</PageTitle>
            </TopBarDefault>
            <FormSection>
              <InputGroup>
                <InputLabel>Event Name</InputLabel>
                <InputField>
                  <StyledInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title of your event"
                  />
                </InputField>
              </InputGroup>
              <InputGroup>
                <InputLabel>Description</InputLabel>
                <div
                  style={{
                    width: 350,
                    paddingTop: 18,
                    paddingBottom: 18,
                    paddingLeft: 24,
                    paddingRight: 24,
                    background: 'white',
                    overflow: 'hidden',
                    borderRadius: 20,
                    outline: '1px #EAEAEA solid',
                    outlineOffset: '-1px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                  }}
                >
                  <StyledTextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description of your event"
                  />
                </div>
              </InputGroup>
              <InputGroup>
                <InputLabel>Target Date</InputLabel>
                <InputField>
                  <StyledInput
                    type="date"
                    value={renderDateFormat(targetDate)}
                    onChange={(e) => setTargetDate(e.target.value)}
                    placeholder="YYYY-MM-DD"
                  />
                </InputField>
              </InputGroup>

              <SaveButton active onClick={handleSave}>
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

export default EditDDayPage;
