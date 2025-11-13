import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { quizData, createdQuizData } from '../../data/quizData';

const QuizDetailPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const location = useLocation();
  const quizFromState = location.state?.quiz;

  const allQuizzes = [...quizData, ...createdQuizData];
  const quiz = quizFromState || allQuizzes.find(q => q.id === parseInt(quizId));

  if (!quiz) {
    return <div>Quiz not found!</div>; // Handle case where quiz is not found
  }

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={{width: 390, height: 844, background: '#F9F9F9', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
      <div style={{width: 390, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 274, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            {/* Status Bar */}
            <div data-back="False" data-call-in="False" data-notch="True" data-theme="Dark" data-wifi="True" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 17.48, height: 12.62, left: 314.26, top: 17.48, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
              <div style={{width: 25.83, height: 12.14, left: 337.56, top: 17.48, position: 'absolute'}}>
                <div style={{width: 19.61, height: 8.40, left: 1.87, top: 1.87, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
              </div>
              <div style={{left: 36.87, top: 15.54, position: 'absolute', textAlign: 'center', color: 'var(--Light-Ink, black)', fontSize: 17.48, fontFamily: 'SF Pro Display', fontWeight: '600', lineHeight: 17.48, wordWrap: 'break-word'}}>19:02</div>
            </div>
            {/* Header with Back Button */}
            <div data-property-1="Variant4" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
              <div data-property-1="icon_arrow_left" onClick={handleBackClick} style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}}>
                <div style={{width: 20, height: 13, left: 2, top: 5.50, position: 'absolute', background: 'var(--Grayscale-900, #1A1B1E)'}} />
              </div>
              <div style={{left: 173, top: 10, position: 'absolute', textAlign: 'center', color: 'var(--Black, black)', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Quiz</div>
            </div>
          </div>
          {/* Quiz Card Detail */}
          <div data-property-1="Default" style={{height: 422, padding: 24, background: '#FFF8E2', boxShadow: '0px 4px 10px 4px rgba(0, 0, 0, 0.04)', overflow: 'hidden', borderRadius: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{width: 302, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                <div style={{alignSelf: 'stretch', color: '#444444', fontSize: 36, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.title}</div>
                <div style={{alignSelf: 'stretch', color: '#979797', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.description}</div>
              </div>
              <div style={{alignSelf: 'stretch', textAlign: 'right', color: '#979797', fontSize: 19.93, fontFamily: 'Pretendard Variable', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.date}</div>
            </div>
          </div>
        </div>
        {/* Home Indicator */}
        <div style={{alignSelf: 'stretch', height: 36, position: 'relative'}}>
          <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
        </div>
      </div>
    </div>
  );
};

export default QuizDetailPage;
