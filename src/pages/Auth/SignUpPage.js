import React from 'react';

const SignUpPage = () => {
  return (
    <div style={{width: 390, height: 844, background: 'white', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 136, display: 'inline-flex'}}>
      <div style={{width: 390, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 126, display: 'flex'}}>
        {/* Removed status bar as it's handled globally */}
        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 44, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', textAlign: 'center', color: '#292929', fontSize: 57.74, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>TODAK</div>
              <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
                  <div data-property-1="input.default.eye" style={{width: 350, height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', color: '#DBDBDB', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>Write your email</div>
                  </div>
                  <div data-property-1="input.default.eyes" style={{width: 350, height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', color: '#DBDBDB', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>Write your password</div>
                    <div data-property-1="close" style={{width: 24, height: 24, position: 'relative'}}>
                      <div style={{width: 20, height: 10, left: 2, top: 8, position: 'absolute', background: 'var(--Gray-8, #28282E)'}} />
                    </div>
                  </div>
                </div>
                <div data-property-1="button.default" style={{width: 350, paddingLeft: 74, paddingRight: 74, paddingTop: 18, paddingBottom: 18, background: '#D5D5D5', overflow: 'hidden', borderRadius: 28, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                  <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#F1F1F1', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Log In</div>
                </div>
              </div>
            </div>
            <div style={{alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--gray8, #1E1E1E)', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '700', textDecoration: 'underline', wordWrap: 'break-word'}}>Sign up</div>
          </div>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
              <div style={{width: 125, height: 1, background: 'var(--Gray-4, #9E9FAD)'}} />
              <div style={{color: 'var(--Gray-4, #9E9FAD)', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Social login</div>
              <div style={{width: 125, height: 1, background: 'var(--Gray-4, #9E9FAD)'}} />
            </div>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
              <div style={{width: 44, height: 44, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 43, height: 43, left: 0.50, top: 0.50, position: 'absolute', background: 'white'}} />
                <div style={{width: 20, height: 20, left: 12, top: 12, position: 'absolute', background: 'black'}} />
                <div style={{width: 9.60, height: 9.40, left: 22, top: 20.18, position: 'absolute', background: '#4285F4'}} />
                <div style={{width: 15.55, height: 8.10, left: 13.06, top: 23.90, position: 'absolute', background: '#34A853'}} />
                <div style={{width: 4.40, height: 8.98, left: 12, top: 17.51, position: 'absolute', background: '#FBBC04'}} />
                <div style={{width: 15.63, height: 8.10, left: 13.06, top: 12, position: 'absolute', background: '#E94235'}} />
                <div style={{width: 43, height: 43, left: 0.50, top: 0.50, position: 'absolute', outline: '1px var(--Gray-1, #F3F4F6) solid', outlineOffset: '-0.50px'}} />
              </div>
              <div style={{width: 44, height: 44, position: 'relative', background: '#FEE500', overflow: 'hidden', borderRadius: 50}}>
                <div style={{width: 20, height: 20, left: 12, top: 12, position: 'absolute', background: 'var(--kakao-logo, black)'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed bottom home indicator as it's handled globally */}
    </div>
  );
};

export default SignUpPage;
