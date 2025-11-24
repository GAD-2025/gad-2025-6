import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { receivedLetters, sentLetters } from '../../data/letterData';

const SlowLetterScreen = () => {
    const [activeTab, setActiveTab] = useState('Received');
    const navigate = useNavigate();

    const handleCardClick = (letter) => {
        navigate(`/slow-letter/${letter.id}`, { state: { letter } });
    };

    const handleWriteClick = () => {
        navigate('/slow-letter/write');
    };

    const lettersToShow = activeTab === 'Received' ? receivedLetters : sentLetters;

    return (
        <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden'}}>
            <div style={{width: 390, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex'}}>
                <div data-back="False" data-call-in="False" data-notch="True" data-theme="Dark" data-wifi="True" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                    <div style={{width: 17.48, height: 12.62, left: 314.26, top: 17.48, position: 'absolute', background: 'black'}} />
                    <div style={{width: 25.83, height: 12.14, left: 337.57, top: 17.48, position: 'absolute'}}>
                        <div style={{width: 19.61, height: 8.40, left: 1.87, top: 1.87, position: 'absolute', background: 'black'}} />
                    </div>
                    <div style={{left: 36.87, top: 15.54, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 17.48, fontFamily: 'SF Pro Display', fontWeight: '600', lineHeight: 17.48, wordWrap: 'break-word'}}>19:02</div>
                </div>
                <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 5, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', color: 'black', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Slow Letter</div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
                        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 72, display: 'inline-flex'}}>
                            <div data-property-1={activeTab === 'Received' ? 'Clicked' : 'unclicked'} onClick={() => setActiveTab('Received')} style={{width: 106, paddingLeft: 37, paddingRight: 37, paddingTop: 14, paddingBottom: 14, overflow: 'hidden', borderBottom: activeTab === 'Received' ? '3px #A17E66 solid' : 'none', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', cursor: 'pointer'}}>
                                <div style={{textAlign: 'center', color: activeTab === 'Received' ? '#A17E66' : '#9E9FAD', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Received</div>
                            </div>
                            <div data-property-1={activeTab === 'Sent' ? 'Clicked' : 'unclicked'} onClick={() => setActiveTab('Sent')} style={{width: 106, paddingLeft: 37, paddingRight: 37, paddingTop: 14, paddingBottom: 14, overflow: 'hidden', borderBottom: activeTab === 'Sent' ? '3px #A17E66 solid' : 'none', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', cursor: 'pointer'}}>
                                <div style={{textAlign: 'center', color: activeTab === 'Sent' ? '#A17E66' : '#9E9FAD', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Sent</div>
                            </div>
                        </div>
                        <div style={{width: '100%', height: '100%', padding: 16, background: '#EAD7C4', overflow: 'hidden', borderRadius: 10, outline: '1px #A17E66 solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                            <div style={{width: 278, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
                                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
                                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                                        <div style={{alignSelf: 'stretch', color: 'var(--gray8, #1E1E1E)', fontSize: 18, fontFamily: 'Ownglyph PDH', fontWeight: '400', wordWrap: 'break-word'}}>Letters I’ve Sent</div>
                                        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                            <div style={{width: 38, height: 38, position: 'relative', background: '#A17E66', overflow: 'hidden', borderRadius: 5}}>
                                                <div style={{width: 20, height: 14, left: 9, top: 12, position: 'absolute', background: '#F3F4F6', outline: '1px #F3F4F6 solid', outlineOffset: '-0.50px'}} />
                                            </div>
                                            <div style={{width: 253, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
                                                <div style={{alignSelf: 'stretch', color: 'var(--gray8, #1E1E1E)', fontSize: 16, fontFamily: 'Ownglyph PDH', fontWeight: '400', wordWrap: 'break-word'}}>To: name (city)</div>
                                                <div style={{alignSelf: 'stretch', color: 'var(--gray8, #1E1E1E)', fontSize: 16, fontFamily: 'Ownglyph PDH', fontWeight: '400', wordWrap: 'break-word'}}>Status: Arrives in Ndays</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{width: 171, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                                        <div style={{alignSelf: 'stretch', color: 'var(--gray8, #1E1E1E)', fontSize: 18, fontFamily: 'Ownglyph PDH', fontWeight: '400', wordWrap: 'break-word'}}>Letters for Me</div>
                                        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                                            <div style={{width: 38, height: 38, position: 'relative', background: '#A17E66', overflow: 'hidden', borderRadius: 5}}>
                                                <div style={{width: 20, height: 14, left: 9, top: 12, position: 'absolute', background: '#F3F4F6', outline: '1px #F3F4F6 solid', outlineOffset: '-0.50px'}} />
                                            </div>
                                            <div style={{width: 125, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex'}}>
                                                <div style={{alignSelf: 'stretch', color: 'var(--gray8, #1E1E1E)', fontSize: 16, fontFamily: 'Ownglyph PDH', fontWeight: '400', wordWrap: 'break-word'}}>From: name (city)</div>
                                                <div style={{alignSelf: 'stretch', color: 'var(--gray8, #1E1E1E)', fontSize: 16, fontFamily: 'Ownglyph PDH', fontWeight: '400', wordWrap: 'break-word'}}>Status: Read</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{alignSelf: 'stretch', height: 784, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex', flexWrap: 'wrap', alignContent: 'flex-start'}}>
                            {lettersToShow.map((letter, index) => (
                                <div key={letter.id} onClick={() => handleCardClick(letter)} style={{width: 169, height: 190, position: 'relative', background: index % 2 === 0 ? '#EAD7C4' : '#FAFAFA', overflow: 'hidden', borderRadius: 16, cursor: 'pointer'}}>
                                    <div style={{width: 138, height: 97, left: 15, top: 22, position: 'absolute', color: '#444444', fontSize: 20, fontFamily: 'Pretendard Variable', fontWeight: '700', wordWrap: 'break-word'}}>{letter.title}</div>
                                    <div style={{width: 138, left: 15, top: 156, position: 'absolute', textAlign: 'right', color: '#979797', fontSize: 10, fontFamily: 'Pretendard Variable', fontWeight: '700', wordWrap: 'break-word'}}>{letter.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: 390, height: 88, left: 0, top: 756, position: 'absolute', background: 'rgba(255, 255, 255, 0.90)', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.10)', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15, backdropFilter: 'blur(15px)'}}>
                <div style={{left: 21.50, top: 12, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 52, display: 'inline-flex'}}>
                    <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div data-property-1="Default" style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 14, height: 16.05, left: 5, top: 4.95, position: 'absolute', outline: '2px #33363F solid', outlineOffset: '-1px'}} />
                            <div style={{width: 5, height: 6, left: 9.50, top: 15, position: 'absolute', borderRadius: 1, border: '2px #33363F solid'}} />
                        </div>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 12, wordWrap: 'break-word'}}>Home</div>
                    </div>
                    <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div data-property-1="envelope" style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 20, height: 16, left: 2.01, top: 4, position: 'absolute', background: '#2A343D'}} />
                        </div>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 12, wordWrap: 'break-word'}}>Letter</div>
                    </div>
                    <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div data-property-1="folder" style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 18, height: 18, left: 3, top: 2.99, position: 'absolute', background: '#2A343D'}} />
                        </div>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 12, wordWrap: 'break-word'}}>Quiz</div>
                    </div>
                    <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div data-property-1="calendar" style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 18.03, height: 19, left: 3.01, top: 2.02, position: 'absolute', background: '#2A343D'}} />
                        </div>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 12, wordWrap: 'break-word'}}>D-day</div>
                    </div>
                    <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div data-property-1="my.fill" style={{width: 24, height: 24, position: 'relative'}}>
                            <div style={{width: 17.39, height: 7, left: 3.31, top: 14, position: 'absolute', background: '#7B5D49'}} />
                            <div style={{width: 10, height: 10, left: 7, top: 3, position: 'absolute', background: '#7B5D49', borderRadius: 9999}} />
                        </div>
                        <div style={{textAlign: 'center', color: '#7B5D49', fontSize: 12, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 12, wordWrap: 'break-word'}}>My</div>
                    </div>
                </div>
                <div style={{width: 390, height: 36, left: 0, top: 52, position: 'absolute'}}>
                    <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
                </div>
            </div>
            <div onClick={handleWriteClick} style={{padding: 18, left: 310, top: 680, position: 'absolute', background: '#0C0C0C', overflow: 'hidden', borderRadius: 100, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
                <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                    <div style={{width: 11, height: 2, left: 11, top: 19, position: 'absolute', background: 'white'}} />
                    <div style={{width: 19.12, height: 19.12, left: 2, top: 1.88, position: 'absolute', background: 'white'}} />
                    <div style={{width: 5, height: 5, left: 14, top: 4, position: 'absolute', background: 'white'}} />
                </div>
            </div>
        </div>
    );
};

export default SlowLetterScreen;