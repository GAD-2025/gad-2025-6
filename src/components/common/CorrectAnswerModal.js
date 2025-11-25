import React from 'react';

const CorrectAnswerModal = ({ onClose }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(81.22, 81.22, 81.22, 0.80)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        width: 336,
        padding: '32px 16px',
        background: 'white',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.20)',
        borderRadius: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        display: 'inline-flex'
      }}>
        <div style={{alignSelf: 'stretch', textAlign: 'center', color: '#28282E', fontSize: 18, fontFamily: 'Pretendard', fontWeight: '700'}}>
          Correct!
        </div>
        <div
          onClick={onClose}
          style={{
            width: 304,
            padding: '18px 74px',
            background: '#F8DA72',
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            display: 'inline-flex'
          }}
        >
          <div style={{color: 'white', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700'}}>
            OK
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectAnswerModal;
