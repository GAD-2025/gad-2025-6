import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const isButtonEnabled = name.length > 0 && email.length > 0;

    const handleNextClick = () => {
        if (isButtonEnabled) {
            navigate('/signup/password', { state: { name, email } });
        }
    };

    const handleBackClick = () => {
        navigate('/login');
    };

    return (
        <div style={{width: '100%', height: '100vh', background: 'white', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            
            {/* Top Bar & Header */}
            <div style={{alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {/* Status Bar */}
                <div data-back="False" data-call-in="False" data-notch="True" data-theme="Dark" data-wifi="True" style={{alignSelf: 'stretch', height: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'}}>
                    <div style={{textAlign: 'center', color: 'var(--Light-Ink, black)', fontSize: 14, fontFamily: 'SF Pro Display', fontWeight: '600', lineHeight: '14px'}}>19:02</div>
                    <div style={{display: 'flex', gap: 5, alignItems: 'center'}}> {/* Container for battery and wifi icons */}
                        <div style={{width: 12.24, height: 8.83, background: 'var(--Light-Ink, black)'}} /> {/* Wifi icon */}
                        <div style={{width: 18.08, height: 8.50, position: 'relative'}}> {/* Battery icon */}
                            <div style={{width: 13.73, height: 5.88, position: 'absolute', left: 1.31, top: 1.31, background: 'var(--Light-Ink, black)'}} />
                        </div>
                    </div>
                </div>
                {/* Back button */}
                <div data-property-1="TopBar.x" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                    <div data-property-1="icon_arrow_left" style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}} onClick={handleBackClick}>
                        <div style={{width: 20, height: 13, left: 2, top: 5.50, position: 'absolute', background: 'var(--Grayscale-900, #1A1B1E)'}} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 48, paddingBottom: 100}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16}}>
                    <div style={{alignSelf: 'stretch', color: 'var(--Black, black)', fontSize: 24, fontFamily: 'Pretendard', fontWeight: '700'}}>Sign up</div>
                    <div style={{alignSelf: 'stretch', color: 'var(--Gray-4, #9E9FAD)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700'}}>Welcome to TODAK!</div>
                </div>
                <div style={{alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24}}>
                    <div style={{width: 350, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8}}>
                        <div style={{alignSelf: 'stretch', color: '#D58699', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', paddingLeft: 18}}>Name</div>
                        <input
                            type="text"
                            placeholder="Write your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{alignSelf: 'stretch', height: 56, padding: 18, background: 'white', borderRadius: 20, border: '1px #EAEAEA solid', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', boxSizing: 'border-box'}}
                        />
                    </div>
                    <div style={{width: 350, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8}}>
                        <div style={{alignSelf: 'stretch', color: '#D58699', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', paddingLeft: 18}}>E-mail</div>
                        <input
                            type="email"
                            placeholder="Write your e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{alignSelf: 'stretch', height: 56, padding: 18, background: 'white', borderRadius: 20, border: '1px #EAEAEA solid', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', boxSizing: 'border-box'}}
                        />
                    </div>
                </div>
            </div>

            {/* Next Button */}
            <div style={{width: '100%', paddingBottom: 60, paddingTop: 20, display: 'flex', justifyContent: 'center'}}>
                <button
                    onClick={handleNextClick}
                    disabled={!isButtonEnabled}
                    style={{width: 350, paddingTop: 18, paddingBottom: 18, background: isButtonEnabled ? '#FF69B4' : '#D5D5D5', borderRadius: 28, border: 'none', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', cursor: isButtonEnabled ? 'pointer' : 'not-allowed'}}
                >
                    Next
                </button>
            </div>

            {/* Home Indicator */}
            <div style={{width: 390, height: 36, position: 'relative'}}>
                <div style={{width: 134, height: 5, left: 128, top: 23, position: 'absolute', background: 'black', borderRadius: 100}} />
            </div>
        </div>
    );
};

export default SignUpPage;
