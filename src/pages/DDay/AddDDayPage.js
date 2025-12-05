import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createDday } from '../../api/dday';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/day-default.svg'; // Assuming this is the arrow left icon
import { ReactComponent as CalendarIcon } from '../../assets/icons/quiz-active.svg';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

function AddDDayPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Use useAuth hook
  const [eventName, setEventName] = useState('');
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [rawDate, setRawDate] = useState('');
  const dateInputRef = useRef(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCalendarIconClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setRawDate(dateValue); // Keep YYYY-MM-DD for the API
    setTargetDate(dateValue.replace(/-/g, '.')); // Format to YYYY.MM.DD for display
  };

  const handleSave = async () => {
    if (!isSaveButtonActive) {
      alert('Save button is not active.'); // Debugging alert
      return;
    }

    if (!user || !user.id || !user.matching_id) {
      alert('User not authenticated or not matched.');
      return;
    }

    const ddayData = {
      userId: user.id,
      title: eventName,
      date: rawDate,
      content,
      matchingId: user.matching_id,
    };

    try {
      const response = await createDday(ddayData);
      alert('D-Day saved successfully! Navigating back to the list.'); // Debugging alert
      navigate('/dday');
    } catch (error) {
      console.error('Failed to create D-Day:', error);
      alert(`Failed to save D-Day: ${error.message}`); // Debugging alert
    }
  };

  const isSaveButtonActive =
    eventName.trim() !== '' && content.trim() !== '' && targetDate.trim() !== '';
  const saveButtonBackgroundColor = isSaveButtonActive ? '#84AF25' : '#D5D5D5';

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
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Add New D-day</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <InputGroup>
          <Label>Event Name</Label>
          <StyledInput
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Name of the event"
          />
        </InputGroup>

        <InputGroup>
          <Label>Content</Label>
          <StyledTextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content of the event"
            maxLength={1000}
          />
        </InputGroup>

        <InputGroup>
          <Label>Target Date</Label>
          <DateInputWrapper>
            <StyledInput type="text" readOnly value={targetDate} placeholder="YYYY.MM.DD" />
            <HiddenDateInput type="date" ref={dateInputRef} onChange={handleDateChange} />
            <CalendarButton onClick={handleCalendarIconClick}>
              <CalendarIcon style={{ width: 20, height: 20 }} />
            </CalendarButton>
          </DateInputWrapper>
        </InputGroup>

        <SaveButtonWrapper>
          <SaveButton active={isSaveButtonActive} onClick={handleSave}>
            Save
          </SaveButton>
        </SaveButtonWrapper>
      </ContentContainer>
    </PageWrapper>
  );
}

export default AddDDayPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh; /* Use vh to ensure it takes full viewport height */
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopNav = styled.div`
  width: 390px; /* Assuming a fixed width for the nav bar */
  height: 44px;
  position: relative;
  overflow: hidden; /* Keep overflow hidden for the top nav itself */
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

const TopBarWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 44px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.div`
  position: absolute;
  left: 20px;
  top: 10.5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  // ArrowLeftIcon already has styles, may need to adjust fill if it's black by default
  svg {
    fill: #1a1b1e; // Adjust color if needed
  }
`;

const PageTitle = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const ContentContainer = styled.div`
  width: 350px;
  flex: 1; /* Allow content to grow and take available space */
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 16px;
  padding-bottom: 20px; /* Add some padding at the bottom */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  color: #84af25;
  font-size: 24px;
  font-family: 'Pangolin', sans-serif;
  font-weight: 400;
`;

const StyledInput = styled.input`
  flex: 1;
  align-self: stretch;
  height: 56px;
  padding: 18px;
  background: white;
  border-radius: 20px;
  outline: 1px #eaeaea solid;
  border: none;
  color: #2c2c2c;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  background: transparent;
  box-sizing: border-box; /* Include padding in element's total width and height */
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 236px;
  padding: 18px 24px;
  background: white;
  border-radius: 20px;
  outline: 1px #eaeaea solid;
  border: none;
  resize: none;
  color: #2c2c2c;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  background: transparent;
  box-sizing: border-box;
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 18px;
  background: white;
  border-radius: 20px;
  outline: 1px #eaeaea solid;
  box-sizing: border-box;
`;

const HiddenDateInput = styled.input`
  display: none;
`;

const CalendarButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  // CalendarIcon already has styles, may need to adjust fill if it's black by default
  svg {
    fill: #404048; // Adjust color if needed
  }
`;

const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px; /* Space above the button */
`;

const SaveButton = styled.div`
  width: 350px;
  padding: 18px 74px;
  background: ${(props) => (props.active ? '#84AF25' : '#D5D5D5')};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
  color: #f1f1f1;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  word-wrap: break-word;
`;
