import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLetters } from '../../api/letter'; // Import real API
import { useAuth } from '../../context/AuthContext'; // Import useAuth

// Helper to split data into two columns
const splitIntoColumns = (data) => {
  const column1 = data.filter((_, index) => index % 2 === 0);
  const column2 = data.filter((_, index) => index % 2 !== 0);
  return [column1, column2];
};

const getCardColor = (originalIndex) => {
  const patternIndex = originalIndex % 4;
  if (patternIndex === 0 || patternIndex === 3) {
    return '#EAD7C4'; // Brown
  } else {
    return '#FAFAFA'; // Gray
  }
};

// Function to format date string
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const SlowLetterScreen = () => {
    const [activeTab, setActiveTab] = useState('Sent'); // Default to Sent tab
    const navigate = useNavigate();
    const { user } = useAuth();

    const [sentLetters, setSentLetters] = useState([]);
    const [receivedLetters, setReceivedLetters] = useState([]); // Keep for future use

    useEffect(() => {
        if (user && user.id) {
            const fetchLetters = async () => {
                const letters = await getLetters(user.id);
                setSentLetters(letters);
            };
            fetchLetters();
        }
    }, [user]);

    const handleCardClick = (letter) => {
        navigate(`/slow-letter/${letter.id}`, { state: { letter } });
    };

    const handleWriteClick = () => {
        navigate('/slow-letter/write');
    };

    const lettersToShow = useMemo(() => (activeTab === 'Received' ? receivedLetters : sentLetters), [activeTab, receivedLetters, sentLetters]);
    const [column1, column2] = useMemo(() => splitIntoColumns(lettersToShow), [lettersToShow]);

    return (
        <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflowY: 'auto'}}>
            {/* Title */}
            <div style={{left: 20, top: 60, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400'}}>Slow Letter</div>
            
            {/* Tabs */}
            <div style={{left: 52, top: 95, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 72, display: 'inline-flex'}}>
                <div onClick={() => setActiveTab('Received')} style={{width: 106, paddingTop: 14, paddingBottom: 14, borderBottom: activeTab === 'Received' ? '3px #A17E66 solid' : 'none', justifyContent: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer'}}>
                    <div style={{textAlign: 'center', color: activeTab === 'Received' ? '#A17E66' : '#9E9FAD', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700'}}>Received</div>
                </div>
                <div onClick={() => setActiveTab('Sent')} style={{width: 106, paddingTop: 14, paddingBottom: 14, borderBottom: activeTab === 'Sent' ? '3px #A17E66 solid' : 'none', justifyContent: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer'}}>
                    <div style={{textAlign: 'center', color: activeTab === 'Sent' ? '#A17E66' : '#9E9FAD', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '700'}}>Sent</div>
                </div>
            </div>

            {/* Content */}
            <div style={{padding: '0 22px', top: 158, position: 'absolute', width: '100%', boxSizing: 'border-box'}}>
              <div style={{display: 'flex', justifyContent: 'center', gap: 8}}>
                {/* Column 1 */}
                <div style={{width: 169, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                  {column1.map((letter, index) => {
                    const originalIndex = index * 2;
                    const backgroundColor = getCardColor(originalIndex);
                    return (
                      <div key={letter.id} onClick={() => handleCardClick(letter)} style={{width: 169, height: 190, position: 'relative', background: backgroundColor, overflow: 'hidden', borderRadius: 16, cursor: 'pointer'}}>
                          <div style={{width: 138, height: 97, left: 15, top: 22, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'}}>{letter.content}</div>
                          <div style={{width: 138, left: 15, top: 156, position: 'absolute', textAlign: 'right', color: '#979797', fontSize: 10, fontFamily: 'Pretendard Variable', fontWeight: '700', wordWrap: 'break-word'}}>{formatDate(letter.created_at)}</div>
                      </div>
                    );
                  })}
                </div>
                {/* Column 2 */}
                <div style={{width: 169, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                  {column2.map((letter, index) => {
                    const originalIndex = index * 2 + 1;
                    const backgroundColor = getCardColor(originalIndex);
                    return (
                      <div key={letter.id} onClick={() => handleCardClick(letter)} style={{width: 169, height: 190, position: 'relative', background: backgroundColor, overflow: 'hidden', borderRadius: 16, cursor: 'pointer'}}>
                          <div style={{width: 138, height: 97, left: 15, top: 22, position: 'absolute', color: '#444444', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'}}>{letter.content}</div>
                          <div style={{width: 138, left: 15, top: 156, position: 'absolute', textAlign: 'right', color: '#979797', fontSize: 10, fontFamily: 'Pretendard Variable', fontWeight: '700', wordWrap: 'break-word'}}>{formatDate(letter.created_at)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating Action Button */}
            <div onClick={handleWriteClick} style={{padding: 18, position: 'fixed', right: 20, bottom: 100, background: '#0C0C0C', borderRadius: 100, cursor: 'pointer', zIndex: 1000}}>
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