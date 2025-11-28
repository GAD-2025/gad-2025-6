import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook from AuthContext

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user data from AuthContext

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden'}}>
        {/* ... (other UI elements remain the same) ... */}
        <div style={{width: 390, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
            {/* ... (header elements remain the same) ... */}
            <div data-property-1="TopBar.Default" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
                <div data-property-1="icon_arrow_left" onClick={handleBackClick} style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}}>
                    <div style={{width: 20, height: 13, left: 2, top: 5.50, position: 'absolute', background: 'var(--Grayscale-900, #1A1B1E)'}} />
                </div>
                <div style={{left: 158, top: 10, position: 'absolute', textAlign: 'center', color: 'var(--Black, black)', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Setting</div>
            </div>
            <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px', width: '100%'}}>
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