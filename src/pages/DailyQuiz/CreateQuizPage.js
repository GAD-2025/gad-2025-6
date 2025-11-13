import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [hint, setHint] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleHintChange = (e) => {
    setHint(e.target.value);
  };

  const isSendButtonActive = title.trim() !== '' || hint.trim() !== '';
  const sendButtonBackgroundColor = isSendButtonActive ? '#F8DA72' : '#D5D5D5';

  return (
    <div style={{width: 390, height: 844, background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div style={{width: 390, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 107, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              {/* Status Bar */}
              <div data-back="False" data-call-in="False" data-notch="True" data-theme="Dark" data-wifi="True" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 17.48, height: 12.62, left: 314.26, top: 17.48, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
                <div style={{width: 25.83, height: 12.14, left: 337.56, top: 17.48, position: 'absolute'}}>
                  <div style={{width: 19.61, height: 8.40, left: 1.87, top: 1.87, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
                </div>
                <div style={{left: 36.87, top: 15.54, position: 'absolute', textAlign: 'center', color: 'var(--Light-Ink, black)', fontSize: 17.48, fontFamily: 'SF Pro Display', fontWeight: '600', lineHeight: 17.48, wordWrap: 'break-word'}}>19:02</div>
              </div>
              {/* Header */}
              <div data-property-1="Variant4" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                <div data-property-1="icon_arrow_left" style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}} onClick={handleBackClick}>
                  <div style={{width: 20, height: 13, left: 2, top: 5.50, position: 'absolute', background: 'var(--Grayscale-900, #1A1B1E)'}} />
                </div>
                <div style={{left: 163, top: 10, position: 'absolute', textAlign: 'center', color: 'var(--Black, black)', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Create</div>
              </div>
            </div>
            <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 24, display: 'flex'}}>
                <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                  <div style={{alignSelf: 'stretch', color: '#FFC90F', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Today’s Quiz?</div>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title of your quiz"
                    style={{
                      width: 350,
                      height: 56,
                      padding: '18px',
                      background: 'white',
                      overflow: 'hidden',
                      borderRadius: 20,
                      outline: '1px #EAEAEA solid',
                      border: 'none',
                      fontSize: 16,
                      fontFamily: 'Pretendard',
                      fontWeight: '700',
                      boxSizing: 'border-box',
                      color: '#2C2C2C'
                    }}
                  />
                </div>
                <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                  <div style={{alignSelf: 'stretch', color: '#FFC90F', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Give your hint</div>
                  <div style={{
                    width: 350,
                    paddingTop: 18,
                    paddingBottom: 23,
                    paddingLeft: 24,
                    paddingRight: 24,
                    background: 'white',
                    overflow: 'hidden',
                    borderRadius: 20,
                    outline: '1px #EAEAEA solid',
                    outlineOffset: '-1px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <textarea
                      value={hint}
                      onChange={handleHintChange}
                      placeholder="Enter your hint here"
                      maxLength={1000}
                      style={{
                        width: '100%',
                        flexGrow: 1,
                        minHeight: '100px',
                        color: '#2C2C2C',
                        fontSize: 16,
                        fontFamily: 'Pretendard',
                        fontWeight: '700',
                        wordWrap: 'break-word',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        background: 'transparent',
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                      }}
                    />
                    <div style={{width: '100%', textAlign: 'right', color: '#DBDBDB', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>{hint.length}/1000</div>
                  </div>
                </div>
              </div>
              <div style={{height: 80, paddingLeft: 21, paddingRight: 21, paddingTop: 11, paddingBottom: 11, background: 'var(--Gray-1, #F3F4F6)', overflow: 'hidden', borderRadius: 5, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div style={{width: 38, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
                  <div style={{alignSelf: 'stretch', height: 38, position: 'relative', overflow: 'hidden'}}>
                    <div style={{width: 12.67, height: 3.17, left: 23.75, top: 6.33, position: 'absolute', background: '#9E9FAD'}} />
                    <div style={{width: 3.17, height: 12.67, left: 28.50, top: 1.58, position: 'absolute', background: '#9E9FAD'}} />
                    <div style={{width: 31.67, height: 31.67, left: 3.17, top: 3.17, position: 'absolute', background: '#9E9FAD'}} />
                    <div style={{width: 26.92, height: 18.48, left: 7.92, top: 16.35, position: 'absolute', background: '#9E9FAD'}} />
                    <div style={{width: 9.50, height: 9.50, left: 9.50, top: 9.50, position: 'absolute', background: '#9E9FAD'}} />
                  </div>
                  <div style={{alignSelf: 'stretch', textAlign: 'center', color: 'var(--Gray-4, #9E9FAD)', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>0/2</div>
                </div>
              </div>
            </div>
          </div>
          <div data-property-1="Variant3" style={{width: 350, paddingLeft: 74, paddingRight: 74, paddingTop: 18, paddingBottom: 18, background: sendButtonBackgroundColor, overflow: 'hidden', borderRadius: 28, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#F1F1F1', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Send</div>
          </div>
        </div>
        {/* Home Indicator */}
        <div style={{width: 390, height: 36, position: 'relative'}}>
          <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
