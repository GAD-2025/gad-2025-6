import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createDday } from '../../api/dday';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/quiz-active.svg';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

function AddDDayPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Use useAuth hook
  const [eventName, setEventName] = useState('');
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleBackClick = () => {
    navigate(-1);
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
      date: targetDate,
      content,
      matchingId: user.matching_id,
    };

    try {
      const response = await createDday(ddayData);
      navigate('/dday');
    } catch (error) {
      console.error('Failed to create D-Day:', error);
      alert(`Failed to save D-Day: ${error.message}`); // Debugging alert
    }
  };

  const isSaveButtonActive =
    eventName.trim() !== '' && content.trim() !== '' && targetDate.trim() !== '';

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    setTargetDate(today);
  }, []);

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Add New D-day</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <Field label="Event Name" variant="dday">
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Name of the event"
          />
        </Field>

        <Field
          label="Content"
          variant="dday"
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content of the event"
            style={{
              flex: 1,
            }}
          />
        </Field>

        <Field label="Target Date" variant="dday">
          <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        </Field>

        <Button disabled={!isSaveButtonActive} onClick={handleSave} variant="dday">
          Save
        </Button>
      </ContentContainer>
    </PageWrapper>
  );
}

export default AddDDayPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TopBarWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const PageTitle = styled.div`
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1; /* Allow content to grow and take available space */
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
