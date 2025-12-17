import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteQuiz, submitQuizAnswer, getQuizById } from '../../api/quiz';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
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

const TopBarWrapper = styled.div`
  width: 100%;
  position: relative;
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

const QuizCard = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff8e2;
  border-radius: 16px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.04);
  padding: 24px;
  box-sizing: border-box;
`;

const QuizInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const QuizAnswer = styled.div`
  text-align: left;
  color: #444;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const QuizInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #444444;
  color: #444444;
  font-size: 36px;
  font-family: 'Pretendard';
  font-weight: 700;
  width: 100%;
  outline: none;
  padding: 0;

  &::placeholder {
    color: #979797;
  }
`;

const QuizHint = styled.div`
  color: #979797;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;

const QuizImageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const QuizImage = styled.img`
  max-height: 200px;
  object-fit: contain;
  display: block;
  border-radius: 12px;
`;

const QuizDate = styled.div`
  width: 100%;
  color: #979797;
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const ModalContent = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalTitle = styled.div`
  color: #28282e;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
`;

const ModalDescription = styled.div`
  color: #9e9fad;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 8px;
`;

const QuizDetailPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const quizData = await getQuizById(quizId);
        if (quizData) {
          setQuiz(quizData);
          setAttemptCount(quizData.attempt_count || 0);
          setRemainingAttempts(3 - (quizData.attempt_count || 0));
        } else {
          console.error('Quiz not found');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  if (!quiz) {
    return <PageWrapper>Quiz not found!</PageWrapper>;
  }

  const isCreator = user && user.id === quiz.creator_id;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendClick = async () => {
    if (answer.trim() === '') return;

    try {
      const result = await submitQuizAnswer(quiz.id, answer);

      if (result.success) {
        // 시도 횟수 업데이트
        setAttemptCount(result.attempt_count);
        setRemainingAttempts(result.remaining_attempts);

        if (result.correct) {
          setShowCorrectModal(true);
        } else {
          // 오답 처리
          setErrorMessage(result.message);
          setShowIncorrectModal(true);
        }

        // 퀴즈 데이터 다시 가져오기
        const updatedQuiz = await getQuizById(quizId);
        if (updatedQuiz) {
          setQuiz(updatedQuiz);
        }
      } else {
        // 에러 처리 (시도 횟수 초과 등)
        setErrorMessage(result.message);
        if (result.attempt_count !== undefined) {
          setAttemptCount(result.attempt_count);
          setRemainingAttempts(result.remaining_attempts);
        }
        alert(result.message);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('An error occurred while submitting your answer.');
    }
  };

  const handleCancelSubmit = () => {};

  const handleConfirmModal = () => {
    setShowCorrectModal(false);
    setShowIncorrectModal(false);
    // 정답이거나 남은 기회가 없으면 목록으로 이동
    if (showCorrectModal || remainingAttempts === 0) {
      navigate('/daily-quiz');
    }
    // 오답이지만 기회가 남았으면 모달만 닫기
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        const response = await deleteQuiz(quiz.id);
        if (response.success) {
          navigate('/daily-quiz');
        } else {
          alert(`Failed to delete quiz: ${response.message}`);
        }
      } catch (err) {
        console.error('Error deleting quiz:', err);
        alert('An error occurred while deleting the quiz.');
      }
    }
  };

  const isButtonDisabled = answer.trim() === '' || quiz.is_solve || attemptCount >= 3;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  };

  return (
    <>
      <PageWrapper>
        <TopBarWrapper>
          <BackButton onClick={handleBackClick}>
            <ArrowLeftIcon />
          </BackButton>
          <PageTitle>Quiz</PageTitle>
        </TopBarWrapper>
        <QuizCard>
          <QuizInfo>
            {/* 이미지가 있으면 표시 */}
            {quiz.image_url && (
              <QuizImageWrapper>
                <QuizImage src={quiz.image_url} alt="Quiz" />
              </QuizImageWrapper>
            )}

            {isCreator || quiz.is_solve ? (
              <QuizAnswer>{quiz.answer}</QuizAnswer>
            ) : (
              <>
                <QuizInput
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer"
                  disabled={attemptCount >= 3}
                />
                {attemptCount > 0 && (
                  <div
                    style={{
                      color: '#FF6B6B',
                      fontSize: '14px',
                      marginTop: '8px',
                      fontWeight: '600',
                    }}
                  >
                    remaining count : {remainingAttempts}/3
                  </div>
                )}
              </>
            )}
            <QuizHint>{quiz.hint}</QuizHint>
          </QuizInfo>
          <QuizDate>{formatDate(quiz.created_at)}</QuizDate>
        </QuizCard>
        {isCreator ? (
          <ButtonWrapper>
            <Button variant="quiz" onClick={handleDeleteClick}>
              Delete
            </Button>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <Button variant="quiz" onClick={handleSendClick} disabled={isButtonDisabled}>
              Send
            </Button>
          </ButtonWrapper>
        )}
      </PageWrapper>
      <Modal open={showCorrectModal} onClose={handleCancelSubmit}>
        <ModalContent>
          <ModalTitle>Congratulation! 😊</ModalTitle>
          <ModalDescription>{`The answer is ${quiz.answer}.`}</ModalDescription>
          <Button variant="quiz" onClick={handleConfirmModal}>
            Confirm
          </Button>
        </ModalContent>
      </Modal>
      <Modal open={showIncorrectModal} onClose={handleCancelSubmit}>
        <ModalContent>
          <ModalTitle>
            Nice try!
            <br />
            But that one's off 😢
          </ModalTitle>
          <ModalDescription>
            {remainingAttempts > 0 ? (
              <>
                You have ${remainingAttempts} attempts remaining.
                <br />
                Try again!
              </>
            ) : (
              <>
                You have used all 3 attempts.
                <br />
                The answer is "{quiz?.answer}"
              </>
            )}
          </ModalDescription>
          <Button variant="quiz" onClick={handleConfirmModal}>
            Confirm
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuizDetailPage;
