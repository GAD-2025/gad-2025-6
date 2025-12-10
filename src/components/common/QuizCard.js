import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Function to format date string
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(
    date.getDate()
  ).padStart(2, '0')}`;
};

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

  return (
    <div
      onClick={handleClick}
      style={{
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
      }}
    >
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
