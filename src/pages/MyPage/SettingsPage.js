import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook from AuthContext

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user data from AuthContext
  const [partnerCode, setPartnerCode] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handlePartnerCodeConnect = () => {
    console.log("Connecting with partner code:", partnerCode);
    // Future API call to connect with partner will go here
    alert(`Connecting with code: ${partnerCode}`);
  };

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden'}}>
        {/* ... (other UI elements remain the same) ... */}
        <div style={{width: '100%', position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: 390, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
              {/* ... (header elements remain the same) ... */}
              <div data-property-1="TopBar.Default" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                  <div data-property-1="icon_arrow_left" onClick={handleBackClick} style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}}>
                      <div style={{width: 20, height: 13, left: 2, top: 5.50, position: 'absolute', background: 'var(--Grayscale-900, #1A1B1E)'}} />
                  </div>
                  <div style={{left: 158, top: 10, position: 'absolute', textAlign: 'center', color: 'var(--Black, black)', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Setting</div>
              </div>
            </div>
            <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: 390, marginTop: 100}}>
                {user ? (
                    <>
                        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div style={{alignSelf: 'stretch', color: '#D58699', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Name</div>
                            <div data-property-1="input.default.eye" style={{width: 350, height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', alignSelf: 'stretch', color: '#2C2C2C', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{user.name}</div>
                            </div>
                        </div>
                        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div style={{alignSelf: 'stretch', color: '#D58699', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>E-mail</div>
                            <div data-property-1="input.default.eye" style={{width: 350, height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', alignSelf: 'stretch', color: '#2C2C2C', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{user.email}</div>
                            </div>
                        </div>
                        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div style={{alignSelf: 'stretch', color: '#D58699', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>My Invitation Code</div>
                            <div data-property-1="input.default.eye" style={{width: 350, height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                <div style={{flex: '1 1 0', alignSelf: 'stretch', color: '#2C2C2C', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>{user.user_code}</div>
                            </div>
                        </div>
                        {/* New Section for Partner's Invitation Code */}
                        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                            <div style={{alignSelf: 'stretch', color: '#D58699', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Enter Partner's Code</div>
                            <div style={{width: 350, display: 'flex', gap: 8}}>
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    value={partnerCode}
                                    onChange={(e) => setPartnerCode(e.target.value)}
                                    style={{
                                        flexGrow: 1,
                                        height: 56,
                                        padding: '0 18px',
                                        background: 'white',
                                        borderRadius: 20,
                                        border: '1px #EAEAEA solid',
                                        fontSize: 16,
                                        fontFamily: 'Pretendard',
                                        fontWeight: '700',
                                        color: '#2C2C2C'
                                    }}
                                />
                                <button
                                    onClick={handlePartnerCodeConnect}
                                    style={{
                                        height: 56,
                                        padding: '0 24px',
                                        background: '#FF69B4',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 16,
                                        fontFamily: 'Pretendard',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default SettingsPage;