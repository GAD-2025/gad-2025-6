import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { sendLetter } from '../../api/letter';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

function WriteLetterPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const hours = String(new Date().getHours()).padStart(2, '0');
    const today = `${year}-${month}-${day}T${hours}:00`;
    setTargetDate(today);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendLetter = async () => {
    if (!isSendButtonActive) {
      alert('Send button is not active.');
      return;
    }

    if (!user || !user.id) {
      alert('Please log in to send a letter.');
      return;
    }

    try {
      const response = await sendLetter({ content, targetDate }, user.id);
      if (response.success) {
        navigate('/slow-letter/sented', {
          state: { letter: response.letter },
        });
      } else {
        alert(`Failed to send letter: ${response.message}`);
      }
    } catch (error) {
      console.error('Error sending letter:', error);
      alert('An error occurred while sending the letter.');
    }
  };

  const isSendButtonActive = content.trim() !== '' && targetDate.trim() !== '';

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Write Letter</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <Field
          label="Content"
          variant="letter"
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a letter"
            style={{
              flex: 1,
            }}
          />
        </Field>

        <Field label="Target Date" variant="letter">
          <Input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </Field>

        <Button disabled={!isSendButtonActive} onClick={handleSendLetter} variant="letter">
          Send
        </Button>
      </ContentContainer>
    </PageWrapper>
  );
}

export default WriteLetterPage;

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
