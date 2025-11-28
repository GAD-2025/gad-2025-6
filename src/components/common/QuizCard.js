import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to format date string
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const QuizCard = ({ quiz, isHighlighted, obscureTitle }) => {
  const navigate = useNavigate();

  // Add null check for quiz
  if (!quiz) {
    console.error("QuizCard received undefined quiz prop.");
    return null; // Or render a fallback UI
  }

  const backgroundColor = isHighlighted ? '#FFF8E2' : '#FAFAFA';

  const handleClick = () => {
    navigate(`/daily-quiz/${quiz.id}`, { state: { quiz } });
  };

  const displayQuestion = obscureTitle && quiz.question ? quiz.question.replace(/./g, '█') : quiz.question;

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
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        display: 'inline-flex',
        cursor: 'pointer'
      }}
    >
      <div style={{width: 138, height: 120, flexDirection: 'column', justifyContent: 'space-between', display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', color: '#444444', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{displayQuestion}</div>
        <div style={{alignSelf: 'stretch', textAlign: 'right', color: '#979797', fontSize: 10, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{formatDate(quiz.created_at)}</div>
      </div>
    </div>
  );
};

export default QuizCard;
