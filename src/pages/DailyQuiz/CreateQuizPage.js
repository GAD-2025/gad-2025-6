import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createQuiz } from '../../api/quiz';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import Field from '../../components/common/Field';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

function CreateQuizPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hint, setHint] = useState('');
  const [answer, setAnswer] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCreateQuiz = async () => {
    if (!isSaveButtonActive) {
      return;
    }

    if (!user || !user.id) {
      alert('Please log in to create a quiz.');
      return;
    }

    try {
      const response = await createQuiz({ hint, answer }, user.id);
      if (response.success) {
        navigate('/daily-quiz');
      } else {
        alert(`Failed to create quiz: ${response.message}`);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('An error occurred while creating the quiz.');
    }
  };

  const isSaveButtonActive = hint.trim() !== '' && answer.trim() !== '';

  return (
    <PageWrapper>
      <TopBarWrapper>
        <BackButton onClick={handleBackClick}>
          <ArrowLeftIcon />
        </BackButton>
        <PageTitle>Create Quiz</PageTitle>
      </TopBarWrapper>

      <ContentContainer>
        <Field label="What's the answer?" variant="quiz">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write the answer"
          />
        </Field>

        <Field
          label="Give your hint"
          variant="quiz"
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Textarea
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="Write your hint"
            style={{
              flex: 1,
            }}
          />
        </Field>

        <Button disabled={!isSaveButtonActive} onClick={handleCreateQuiz} variant="quiz">
          Send
        </Button>
      </ContentContainer>
    </PageWrapper>
  );
}

export default CreateQuizPage;

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
