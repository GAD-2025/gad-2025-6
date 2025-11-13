import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import homeBackgroundImage from '../../assets/images/홈배경화면.jpeg'; // Import the background image

const HomePage = () => {
  return (
    <div style={{width: 390, height: 844, position: 'relative', background: 'white', overflow: 'hidden'}}>
      {/* Background Image */}
      <img style={{width: '100%', height: '100%', position: 'absolute', objectFit: 'cover', objectPosition: 'center'}} src={homeBackgroundImage} alt="Background" />
      {/* Foreground Image - Keep as placeholder for now, as no specific image was provided for this */}
      <img style={{width: 387, height: 258, left: 2, top: 483, position: 'absolute'}} src="https://placehold.co/387x258" alt="Foreground" />
      <div style={{width: 390, left: 0, top: 0, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 507, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 15, display: 'flex'}}>
          {/* Content below status bar */}
          <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 11, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 11, display: 'inline-flex'}}>
              <div style={{width: 229, height: 71, position: 'relative', background: '#F4F8EA', overflow: 'hidden', borderRadius: 16}}>
                <div style={{height: 39, left: 19, top: 16, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                  <div style={{color: '#84AF25', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>D-22</div>
                  <div style={{width: 140, height: 39, color: 'black', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>London trip London trip London trip</div>
                </div>
              </div>
              <div style={{width: 110, height: 71, background: '#A17E66', borderRadius: 5}} />
              <div style={{color: 'white', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>New!</div>
              <div style={{width: 27, height: 27, background: '#D83F3F', borderRadius: 9999}} />
              <div style={{color: 'white', fontSize: 17.61, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 23.48, wordWrap: 'break-word'}}>2</div>
              <div style={{width: 27.12, height: 16.08, background: '#F3F4F6', outline: '1px #F3F4F6 solid', outlineOffset: '-0.50px'}} />
            </div>
            <Link to="/daily-quiz" style={{textDecoration: 'none', cursor: 'pointer', alignSelf: 'stretch'}}> {/* Added Link */}
              <div style={{alignSelf: 'stretch', height: 94, position: 'relative', background: '#FFF8E2', overflow: 'hidden', borderRadius: 16}}>
                <div style={{width: 302, height: 54, left: 24, top: 20, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                  <div style={{alignSelf: 'stretch', color: '#FFC90F', fontSize: 20, fontFamily: 'Pangolin', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Daily Quiz</div>
                  <div style={{alignSelf: 'stretch', flex: '1 1 0', color: '#979797', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>What is "I miss you." in Korean?</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
