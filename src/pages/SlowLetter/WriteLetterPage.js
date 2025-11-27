import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WriteLetterPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const isSendButtonActive = title.trim() !== '' || content.trim() !== '';
  const sendButtonBackgroundColor = isSendButtonActive ? '#A17E66' : '#D5D5D5';

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
                <div style={{left: 163, top: 10, position: 'absolute', textAlign: 'center', color: 'var(--Black, black)', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Write Letter</div>
              </div>
            </div>
            <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                  <div style={{alignSelf: 'stretch', color: '#A17E66', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Title</div>
                  <div data-property-1="input.default.eye" style={{width: 350, height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Title of your letter"
                      style={{
                        flex: '1 1 0',
                        alignSelf: 'stretch',
                        color: '#DBDBDB',
                        fontSize: 16,
                        fontFamily: 'Pretendard',
                        fontWeight: '400',
                        wordWrap: 'break-word',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                  <div style={{alignSelf: 'stretch', color: '#A17E66', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Context</div>
                  <div data-property-1="Input.Content.Default" style={{
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
                      value={content}
                      onChange={handleContentChange}
                      placeholder="Type your message"
                      maxLength={1000}
                      style={{
                        width: '100%',
                        flexGrow: 1,
                        minHeight: '236px',
                        color: '#DBDBDB',
                        fontSize: 16,
                        fontFamily: 'Pretendard',
                        fontWeight: '400',
                        wordWrap: 'break-word',
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        background: 'transparent',
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                      }}
                    />
                    <div style={{width: '100%', textAlign: 'right', color: '#DBDBDB', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>{content.length}/1000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-property-1="button.default" style={{width: 350, paddingLeft: 74, paddingRight: 74, paddingTop: 18, paddingBottom: 18, background: sendButtonBackgroundColor, overflow: 'hidden', borderRadius: '28px !important', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
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

export default WriteLetterPage;