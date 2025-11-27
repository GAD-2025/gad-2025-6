import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDDayPage() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const dateInputRef = useRef(null);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCalendarIconClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleDateChange = (e) => {
    // The value from input type="date" is YYYY-MM-DD
    // We will reformat it to YYYY.MM.DD for display
    setTargetDate(e.target.value.replace(/-/g, '.'));
  };
  
  const isSaveButtonActive = eventName.trim() !== '' && targetDate.trim() !== '';
  const saveButtonBackgroundColor = isSaveButtonActive ? '#84AF25' : '#D5D5D5';

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden'}}>
        <div style={{width: 390, height: 844, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 408, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                <div data-back="False" data-call-in="False" data-notch="True" data-theme="Dark" data-wifi="True" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                    <div style={{width: 17.48, height: 12.62, left: 314.26, top: 17.48, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
                    <div style={{width: 25.83, height: 12.14, left: 337.56, top: 17.48, position: 'absolute'}}>
                        <div style={{width: 19.61, height: 8.40, left: 1.87, top: 1.87, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
                    </div>
                    <div style={{left: 36.87, top: 15.54, position: 'absolute', textAlign: 'center', color: 'var(--Light-Ink, black)', fontSize: 17.48, fontFamily: 'SF Pro Display', fontWeight: '600', lineHeight: 17.48, wordWrap: 'break-word'}}>19:02</div>
                </div>
                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
                    <div data-property-1="TopBar.Default" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                        <div data-property-1="icon_arrow_left" style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}} onClick={handleBackClick}>
                            <div style={{width: 20, height: 13, left: 2, top: 5.50, position: 'absolute', background: 'var(--Grayscale-900, #1A1B1E)'}} />
                        </div>
                        <div style={{left: 122, top: 10, position: 'absolute', textAlign: 'center', color: 'var(--Black, black)', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Add New D-day</div>
                    </div>
                    <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div style={{alignSelf: 'stretch', color: '#84AF25', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Event Name</div>
                            <div data-property-1="input.default.eye" style={{alignSelf: 'stretch', height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                <input
                                  type="text"
                                  value={eventName}
                                  onChange={(e) => setEventName(e.target.value)}
                                  placeholder="Name of the event"
                                  style={{flex: '1 1 0', alignSelf: 'stretch', border: 'none', outline: 'none', color: '#2C2C2C', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', background: 'transparent'}}
                                />
                            </div>
                        </div>
                        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div style={{alignSelf: 'stretch', color: '#84AF25', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Content</div>
                            <div data-property-1="Input.Content.Default" style={{alignSelf: 'stretch', paddingTop: 18, paddingBottom: 23, paddingLeft: 24, paddingRight: 24, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                                <textarea
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                  placeholder="Content of the event"
                                  maxLength={1000}
                                  style={{width: 314, minHeight: '236px', border: 'none', outline: 'none', resize: 'none', color: '#2C2C2C', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', background: 'transparent'}}
                                />
                            </div>
                        </div>
                        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div style={{alignSelf: 'stretch', color: '#84AF25', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Target Date</div>
                            <div style={{alignSelf: 'stretch', height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                <input
                                  type="text"
                                  readOnly
                                  value={targetDate}
                                  placeholder="YYYY.MM.DD"
                                  style={{flex: '1 1 0', alignSelf: 'stretch', border: 'none', outline: 'none', color: '#2C2C2C', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', background: 'transparent'}}
                                />
                                <input
                                    type="date"
                                    ref={dateInputRef}
                                    onChange={handleDateChange}
                                    style={{ display: 'none' }}
                                />
                                <div style={{width: 20, height: 22, background: '#404048', cursor: 'pointer'}} onClick={handleCalendarIconClick} />
                            </div>
                        </div>
                        <div data-property-1="button.default" style={{width: 350, paddingLeft: 74, paddingRight: 74, paddingTop: 18, paddingBottom: 18, background: saveButtonBackgroundColor, overflow: 'hidden', borderRadius: '28px !important', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: isSaveButtonActive ? 'pointer' : 'default'}}>
                            <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#F1F1F1', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Save</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', height: 36, position: 'relative'}}>
                <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
            </div>
        </div>
    </div>
  );
}

export default AddDDayPage;