import React, { useState } from 'react';
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
  const [selectedHour, setSelectedHour] = useState('0');
  const [selectedMinute, setSelectedMinute] = useState('0');
  console.log(new Date().toJSON());
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
      // Calculate target date from current time + selected hours and minutes
      const now = new Date();
      const targetDateTime = new Date(
        now.getTime() +
          parseInt(selectedHour) * 60 * 60 * 1000 +
          parseInt(selectedMinute) * 60 * 1000
      );

      const response = await sendLetter({ content, targetDate: targetDateTime }, user.id);
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

  const isSendButtonActive =
    content.trim() !== '' && selectedHour.trim() !== '' && selectedMinute.trim() !== '';

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

        {/* <Field label="Target Date" variant="letter">
          <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        </Field> */}

        <TimeSelectionWrapper>
          <Field label="Hour" variant="letter" style={{ flex: 1 }}>
            <SelectWrapper>
              <TimeSelect value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                <option value="" disabled>
                  Hour
                </option>
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = String(i).padStart(2, '0');
                  return (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </TimeSelect>
              <DropdownIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#2C2C2C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </DropdownIcon>
            </SelectWrapper>
          </Field>

          <Field label="Minute" variant="letter" style={{ flex: 1 }}>
            <SelectWrapper>
              <TimeSelect
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(e.target.value)}
              >
                <option value="" disabled>
                  Minute
                </option>
                {Array.from({ length: 60 }, (_, i) => {
                  const minute = String(i).padStart(2, '0');
                  return (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  );
                })}
              </TimeSelect>
              <DropdownIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#2C2C2C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </DropdownIcon>
            </SelectWrapper>
          </Field>
        </TimeSelectionWrapper>

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

const TimeSelectionWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const SelectWrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 18px;
  background: white;
  border-radius: 20px;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
`;

const TimeSelect = styled.select`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  color: ${(props) => (props.value ? '#2c2c2c' : '#dbdbdb')};
  font-weight: ${(props) => (props.value ? '700' : '400')};

  &::placeholder {
    color: #dbdbdb;
    font-weight: 400;
  }

  option {
    color: #2c2c2c;
  }

  option:disabled {
    color: #dbdbdb;
  }
`;

const DropdownIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  pointer-events: none;

  svg {
    width: 16px;
    height: 16px;
  }
`;
