import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import QuizSubmitModal from '../../components/common/QuizSubmitModal';
import CorrectAnswerModal from '../../components/common/CorrectAnswerModal';
import IncorrectAnswerModal from '../../components/common/IncorrectAnswerModal';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const QuizDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Get user context
  const quiz = location.state?.quiz;

  const [answer, setAnswer] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);

  if (!quiz) {
    return <div>Quiz not found!</div>;
  }

  const isCreator = user && user.id === quiz.creator_id;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendClick = () => {
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowModal(false);
    if (answer.trim().toLowerCase() === quiz.answer.toLowerCase()) {
      setShowCorrectModal(true);
    } else {
      setShowIncorrectModal(true);
    }
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  const handleCloseCorrectModal = () => {
    setShowCorrectModal(false);
    navigate('/daily-quiz');
  };

  const handleRetry = () => {
    setShowIncorrectModal(false);
    setAnswer('');
  };

  const isButtonDisabled = answer.trim() === '';

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid #444444',
    color: '#444444',
    fontSize: 36,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    width: '100%',
    outline: 'none',
    padding: 0,
  };

  const buttonBaseStyle = {
    width: 350,
    padding: 16,
    borderRadius: 12,
    border: 'none',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    cursor: 'pointer',
    margin: '0 auto'
  };

  const buttonEnabledStyle = {
    ...buttonBaseStyle,
    background: '#FFC90F',
  };

  const buttonDisabledStyle = {
    ...buttonBaseStyle,
    background: '#E0E0E0',
    cursor: 'not-allowed',
  };

  return (
    <div style={{width: 390, height: 844, background: '#F9F9F9', overflow: 'hidden', position: 'relative'}}>
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 44}}>
        {/* Header */}
        <div data-property-1="Variant4" style={{width: '100%', height: 44, position: 'relative', overflow: 'hidden', marginBottom: 24}}>
          <div data-property-1="icon_arrow_left" onClick={handleBackClick} style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#1A1B1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{left: '50%', transform: 'translateX(-50%)', top: 10, position: 'absolute', textAlign: 'center', color: 'var(--Black, black)', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700'}}>Quiz</div>
        </div>

        {/* Quiz Card Detail */}
        <div data-property-1="Default" style={{height: 422, padding: 24, background: '#FFF8E2', boxShadow: '0px 4px 10px 4px rgba(0, 0, 0, 0.04)', overflow: 'hidden', borderRadius: 16, display: 'flex', width: 350, boxSizing: 'border-box'}}>
          <div style={{width: '100%', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
              {isCreator ? (
                // If user is the creator, show the question as text
                <div style={{alignSelf: 'stretch', color: '#444444', fontSize: 36, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.question}</div>
              ) : (
                // If user is not the creator, show the input field
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the answer"
                  style={inputStyle}
                />
              )}
              <div style={{alignSelf: 'stretch', color: '#979797', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.question}</div>
            </div>
            <div style={{alignSelf: 'stretch', textAlign: 'right', color: '#979797', fontSize: 19.93, fontFamily: 'Pretendard Variable', fontWeight: '700', wordWrap: 'break-word'}}>{quiz.created_at}</div>
          </div>
        </div>
        
        {/* Send Button */}
        <div style={{ width: '100%', marginTop: 170 }}>
          {!isCreator && ( // Only show the send button if the user is not the creator
            <button
              style={isButtonDisabled ? buttonDisabledStyle : buttonEnabledStyle}
              disabled={isButtonDisabled}
              onClick={handleSendClick}
            >
              Send
            </button>
          )}
        </div>
      </div>

      {/* Home Indicator */}
      <div style={{width: 390, height: 36, position: 'absolute', bottom: 0, left: 0}}>
        <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
      </div>

      {/* Modals */}
      {showModal && (
        <QuizSubmitModal
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}
      {showCorrectModal && (
        <CorrectAnswerModal onClose={handleCloseCorrectModal} />
      )}
      {showIncorrectModal && (
        <IncorrectAnswerModal onRetry={handleRetry} />
      )}
    </div>
  );
};
export default QuizDetailPage;
