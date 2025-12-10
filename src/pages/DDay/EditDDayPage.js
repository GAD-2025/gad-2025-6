import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { updateDday, getDdayById } from '../../api/dday';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

function EditDDayPage() {
  const navigate = useNavigate();
  const { ddayId } = useParams();
  const [eventName, setEventName] = useState('');
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDday = async () => {
      if (!ddayId) {
        setError('D-day ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getDdayById(ddayId);
        if (response.success) {
          const dday = response.dday;
          setEventName(dday.title);
          setContent(dday.content);
          setTargetDate(dday.date.split('T')[0]);
        } else {
          setError(response.message || 'Failed to fetch D-day.');
        }
      } catch (err) {
        setError('An error occurred while fetching D-day.');
        console.error('Error fetching D-day:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDday();
  }, [ddayId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    if (!isSaveButtonActive) {
      return;
    }

    const ddayData = {
      title: eventName,
      date: targetDate,
      content,
    };

    try {
      const response = await updateDday(ddayId, ddayData);
      if (response.success) {
        navigate('/dday');
      } else {
        alert(`Failed to update D-Day: ${response.message}`);
      }
    } catch (error) {
      console.error('Failed to update D-Day:', error);
      alert(`Failed to update D-Day: ${error.message}`);
    }
  };

  const isSaveButtonActive =
    eventName.trim() !== '' && content.trim() !== '' && targetDate.trim() !== '';

  if (loading) {
    return (
      <PageWrapper>
        <LoadingMessage>Loading D-day...</LoadingMessage>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Edit D-day</PageTitle>
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

export default EditDDayPage;

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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #2c2c2c;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  font-size: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  padding: 20px;
`;
