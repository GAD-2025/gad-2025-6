import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createBucketList } from '../../api/bucketlist';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/Component 43.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/Component 47.svg';

function AddBucketListPage() {
  const navigate = useNavigate();
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
    if (!isSaveButtonActive) return;

    // TODO: Replace with actual user ID from auth context
    const userId = 1;

    const bucketListData = {
      userId,
      content,
      target_date: rawDate,
    };

    try {
      await createBucketList(bucketListData);
      navigate('/dday');
    } catch (error) {
      console.error('Failed to create Bucket List item:', error);
      alert(`Failed to save Bucket List: ${error.message}`);
    }
  };
  
  const isSaveButtonActive = content.trim() !== '' && targetDate.trim() !== '';

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Add New Bucket List</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <InputGroup>
          <Label>Bucket List Item</Label>
          <StyledInput
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content of your bucket list item"
          />
        </InputGroup>

        <InputGroup>
          <Label>Target Date</Label>
          <DateInputWrapper>
            <StyledInput
              type="text"
              readOnly
              value={targetDate}
              placeholder="YYYY.MM.DD"
            />
            <HiddenDateInput
                type="date"
                ref={dateInputRef}
                onChange={handleDateChange}
            />
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

export default AddBucketListPage;

// Styled components copied and adapted from AddDDayPage for consistency

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 44px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 44px; /* Space for status bar */
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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 16px;
  padding-bottom: 20px;
  overflow-y: auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  color: #84AF25;
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
  outline: 1px #EAEAEA solid;
  border: none;
  color: #2C2C2C;
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
  outline: 1px #EAEAEA solid;
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
`;

const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10px; 
  margin-top: auto; /* Push save button to the bottom */
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
  color: #F1F1F1;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  word-wrap: break-word;
`;
