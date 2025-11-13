import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 107, display: 'flex', height: '100%'}}>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          {/* Header */}
          <div data-property-1="Variant4" style={{alignSelf: 'stretch', height: 44, position: 'relative', overflow: 'hidden'}}>
            <div data-property-1="icon_arrow_left" style={{width: 24, height: 24, left: 20, top: 10.50, position: 'absolute', cursor: 'pointer'}} onClick={handleBackClick}>
              <div style={{width: 20, height: 13, left: 2, top: 5.50, position: 'absolute', background: '#1A1B1E'}} />
            </div>
            <div style={{left: 163, top: 10, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Create</div>
          </div>
        </div>
        <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 24, display: 'flex'}}>
            <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', color: '#FFC90F', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Title</div>
              <div data-property-1="Default" style={{width: 350, height: 56, padding: 18, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', color: '#DBDBDB', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>Title of your quiz</div>
              </div>
            </div>
            <div style={{width: 350, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', color: '#FFC90F', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400', wordWrap: 'break-word'}}>Give your hint</div>
              <div data-property-1="Default" style={{width: 350, paddingTop: 18, paddingBottom: 23, paddingLeft: 24, paddingRight: 24, background: 'white', overflow: 'hidden', borderRadius: 20, outline: '1px #EAEAEA solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div style={{height: 236, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                  <div style={{width: 314, flex: '1 1 0', color: '#DBDBDB', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>Title of your letter</div>
                  <div style={{width: 314, textAlign: 'right', color: '#DBDBDB', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word'}}>0/1000</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{height: 80, paddingLeft: 21, paddingRight: 21, paddingTop: 11, paddingBottom: 11, background: '#F3F4F6', overflow: 'hidden', borderRadius: 5, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{width: 38, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{alignSelf: 'stretch', height: 38, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 12.67, height: 3.17, left: 23.75, top: 6.33, position: 'absolute', background: '#9E9FAD'}} />
                <div style={{width: 3.17, height: 12.67, left: 28.50, top: 1.58, position: 'absolute', background: '#9E9FAD'}} />
                <div style={{width: 31.67, height: 31.67, left: 3.17, top: 3.17, position: 'absolute', background: '#9E9FAD'}} />
                <div style={{width: 26.92, height: 18.48, left: 7.92, top: 16.35, position: 'absolute', background: '#9E9FAD'}} />
                <div style={{width: 9.50, height: 9.50, left: 9.50, top: 9.50, position: 'absolute', background: '#9E9FAD'}} />
              </div>
              <div style={{alignSelf: 'stretch', textAlign: 'center', color: '#9E9FAD', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>0/2</div>
            </div>
          </div>
        </div>
      </div>
        <div data-property-1="Variant2" style={{width: 202, paddingLeft: 74, paddingRight: 74, paddingTop: 18, paddingBottom: 18, background: '#D5D5D5', overflow: 'hidden', borderRadius: 28, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#F1F1F1', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>Send</div>
        </div>    </div>
  );
};

export default CreateQuizPage;
