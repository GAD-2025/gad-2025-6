import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

// Function to format date string
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
};

// Status Badge Component
const StatusBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 700;
  background: ${(props) => (props.solved ? '#4CAF50' : '#FF9800')};
  color: white;
`;

const QuizCard = ({ quiz, isHighlighted }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  // Add null check for quiz
  if (!quiz) {
    console.error('QuizCard received undefined quiz prop.');
    return null; // Or render a fallback UI
  }

  const backgroundColor = isHighlighted ? '#FFF8E2' : '#FAFAFA';

  const handleClick = () => {
    navigate(`/daily-quiz/${quiz.id}`, { state: { quiz } });
  };

  // 제출 가능 여부 체크
  const canAttempt = () => {
    if (!quiz.submitted_at) return true;
    const lastSubmit = new Date(quiz.submitted_at);
    const now = new Date();
    const hoursSinceSubmit = (now - lastSubmit) / (1000 * 60 * 60);
    return hoursSinceSubmit >= 24;
  };

  // 배지 표시 조건
  const showBadge = user?.id !== quiz.creator_id;
  const isSolved = quiz.is_solve === 1;
  const isWaiting = !canAttempt() && !isSolved;

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        alignSelf: 'stretch',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 22,
        paddingBottom: 22,
        background: backgroundColor,
        overflow: 'hidden',
        borderRadius: 16,
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        cursor: 'pointer',
        height: 180,
        gap: 16,
        opacity: isWaiting ? 0.6 : 1,
      }}
    >
      {/* 상태 배지 */}
      {showBadge && isSolved && <StatusBadge solved>Solved ✓</StatusBadge>}
      {showBadge && isWaiting && <StatusBadge>Wait 24h ⏰</StatusBadge>}

      <div style={{}}>
        <div
          style={{
            alignSelf: 'stretch',
            color: '#444444',
            fontSize: 20,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          {quiz.is_solve || user?.id === quiz.creator_id ? quiz.answer : '???'}
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          display: 'inline-flex',
        }}
      >
        <div
          style={{
            width: '100%',
            color: '#979797',
            fontSize: 14,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            flex: 1,
            textAlign: 'left',
          }}
        >
          {quiz.hint}
        </div>
        <div
          style={{
            width: '100%',
            alignSelf: 'stretch',
            textAlign: 'right',
            color: '#979797',
            fontSize: 10,
            fontFamily: 'Pretendard',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          {formatDate(quiz.created_at)}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
