import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PencilIcon } from '../../assets/icons/li_pencil-line.svg';
import ReceivedQuizList from './ReceivedQuizList';
import CreatedQuizList from './CreatedQuizList';
import { quizData, createdQuizData } from '../../data/quizData';


const DailyQuizPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('received'); // State for active tab

  const handleCreateQuizClick = () => {
    navigate('/create-quiz');
  };

  return (
    <div style={{height: 844, position: 'relative', background: 'white', display: 'flex', flexDirection: 'column'}}>
      {/* Header */}
      <div style={{left: 20, top: 60, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Pangolin', fontWeight: '400'}}>Daily Quiz</div>

      {/* Tabs */}
      <div style={{left: 52, top: 95, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 72, display: 'inline-flex'}}>
        <div
          style={{
            width: 106,
            paddingTop: 14,
            paddingBottom: 14,
            borderBottom: activeTab === 'received' ? '3px #FFC90F solid' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('received')}
        >
          <div style={{textAlign: 'center', color: activeTab === 'received' ? '#FFC90F' : '#9E9FAD', fontSize: 16, fontWeight: '700'}}>Received</div>
        </div>
        <div
          style={{
            width: 106,
            paddingTop: 14,
            paddingBottom: 14,
            borderBottom: activeTab === 'created' ? '3px #FFC90F solid' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('created')}
        >
          <div style={{textAlign: 'center', color: activeTab === 'created' ? '#FFC90F' : '#9E9FAD', fontSize: 16, fontWeight: '700'}}>Created</div>
        </div>
      </div>

      {/* Quiz Card List */}
      {activeTab === 'received' ? (
        <ReceivedQuizList quizData={quizData} />
      ) : (
        <CreatedQuizList quizData={createdQuizData} />
      )}

      {/* Floating Action Button */}
      <div onClick={handleCreateQuizClick} style={{padding: 18, left: 310, top: 680, position: 'absolute', background: '#0C0C0C', borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
        <PencilIcon style={{width: 24, height: 24}} />
      </div>
    </div>
  );
};

export default DailyQuizPage;