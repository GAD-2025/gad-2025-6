import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quiz, isHighlighted }) => {
  const navigate = useNavigate();
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        display: 'inline-flex',
        cursor: 'pointer'
      }}
    >
      <div style={{width: 138, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 60, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', color: '#444444', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.title}</div>
          <div style={{alignSelf: 'stretch', color: '#979797', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.description}</div>
        </div>
        <div style={{alignSelf: 'stretch', textAlign: 'right', color: '#979797', fontSize: 10, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.date}</div>
      </div>
    </div>
  );
};

export default QuizCard;
