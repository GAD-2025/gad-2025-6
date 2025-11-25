import React from 'react';

const QuizSubmitModal = ({ onConfirm, onCancel }) => {
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
      zIndex: 1000 // Ensure it's on top
    }}>
      <div style={{
        width: 336,
        paddingTop: 24,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        background: 'white',
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.20)',
        overflow: 'hidden',
        borderRadius: 16,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 24,
        display: 'inline-flex'
      }}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Gray-8, #28282E)', fontSize: 18, fontFamily: 'Pretendard', fontWeight: '700', lineHeight: 25.92, wordWrap: 'break-word'}}>Would you like to submit?</div>
          <div style={{alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Gray-4, #9E9FAD)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Once sent, it cannot be undone.</div>
        </div>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div
            onClick={onConfirm}
            style={{
              width: 304,
              paddingLeft: 74,
              paddingRight: 74,
              paddingTop: 18,
              paddingBottom: 18,
              background: '#F8DA72',
              overflow: 'hidden',
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              cursor: 'pointer'
            }}
          >
            <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#F1F1F1', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Submit</div>
          </div>
          <div
            onClick={onCancel}
            style={{
              width: 304,
              paddingLeft: 74,
              paddingRight: 74,
              paddingTop: 18,
              paddingBottom: 18,
              background: 'white',
              overflow: 'hidden',
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              cursor: 'pointer'
            }}
          >
            <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#D5D5D5', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSubmitModal;
