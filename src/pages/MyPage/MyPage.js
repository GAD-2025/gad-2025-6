import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden'}}>
        <div style={{width: 390, height: 36, left: 0, top: 808, position: 'absolute'}}>
            <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
        </div>
        <div style={{width: 390, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 230, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'flex'}}>
                <div data-back="False" data-call-in="False" data-notch="True" data-theme="Dark" data-wifi="True" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                    <div style={{width: 17.48, height: 12.62, left: 314.26, top: 17.48, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
                    <div style={{width: 25.83, height: 12.14, left: 337.57, top: 17.48, position: 'absolute'}}>
                        <div style={{width: 19.61, height: 8.40, left: 1.87, top: 1.87, position: 'absolute', background: 'var(--Light-Ink, black)'}} />
                    </div>
                    <div style={{left: 36.87, top: 15.54, position: 'absolute', textAlign: 'center', color: 'var(--Light-Ink, black)', fontSize: 17.48, fontFamily: 'SF Pro Display', fontWeight: '600', lineHeight: 17.48, wordWrap: 'break-word'}}>19:02</div>
                </div>
                <div style={{width: 351, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 44, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', color: 'black', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>My Page</div>
                    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', flexWrap: 'wrap', alignContent: 'flex-start'}}>
                        <div onClick={() => handleCardClick('/my-page/settings')} style={{width: 169, height: 190, position: 'relative', background: '#FFF3F3', overflow: 'hidden', borderRadius: 16, cursor: 'pointer'}}>
                            <div style={{width: 138, height: 97, left: 15, top: 22, position: 'absolute', color: 'var(--Pink, #D58699)', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>User Name</div>
                            <img style={{width: 121, height: 121, left: 48.50, top: 69, position: 'absolute'}} src="https://placehold.co/121x121" />
                        </div>
                        <div onClick={() => handleCardClick('/slow-letter')} style={{width: 169, height: 190, position: 'relative', background: '#EAD7C4', overflow: 'hidden', borderRadius: 16, cursor: 'pointer'}}>
                            <div style={{width: 138, height: 97, left: 15, top: 22, position: 'absolute', color: '#A17E66', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Slow Letter</div>
                            <img style={{width: 121, height: 121, left: 48.50, top: 69, position: 'absolute'}} src="https://placehold.co/121x121" />
                        </div>
                        <div onClick={() => handleCardClick('/daily-quiz')} style={{width: 169, height: 190, position: 'relative', background: '#FFF8E2', overflow: 'hidden', borderRadius: 16, cursor: 'pointer'}}>
                            <div style={{width: 138, height: 97, left: 15, top: 22, position: 'absolute', color: '#FFC90F', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Daily Quiz</div>
                            <img style={{width: 121, height: 121, left: 48.50, top: 69, position: 'absolute'}} src="https://placehold.co/121x121" />
                        </div>
                        <div onClick={() => handleCardClick('/dday')} style={{width: 169, height: 190, position: 'relative', background: '#F4F8EA', overflow: 'hidden', borderRadius: 16, cursor: 'pointer'}}>
                            <div style={{width: 138, height: 97, left: 15, top: 22, position: 'absolute', color: '#84AF25', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>BucketList</div>
                            <img style={{width: 121, height: 121, left: 48.50, top: 69, position: 'absolute'}} src="https://placehold.co/121x121" />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', height: 88, position: 'relative', background: 'rgba(255, 255, 255, 0.90)', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.10)', overflow: 'hidden', borderTopLeftRadius: 15, borderTopRightRadius: 15, backdropFilter: 'blur(15px)'}}>
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
                            <div style={{width: 17.39, height: 7, left: 3.31, top: 14, position: 'absolute', background: 'var(--Pink, #D58699)'}} />
                            <div style={{width: 10, height: 10, left: 7, top: 3, position: 'absolute', background: 'var(--Pink, #D58699)', borderRadius: 9999}} />
                        </div>
                        <div style={{textAlign: 'center', color: 'var(--Pink, #D58699)', fontSize: 12, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 12, wordWrap: 'break-word'}}>My</div>
                    </div>
                </div>
                <div style={{width: 390, height: 36, left: 0, top: 52, position: 'absolute'}}>
                    <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default MyPage;